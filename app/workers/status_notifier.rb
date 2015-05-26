class StatusNotifier
  include Sidekiq::Worker
  include Sidetiq::Schedulable

  recurrence { minutely }
  sidekiq_options retry: false

  def perform options={}
    Grow.eager_load(:user).find_each do |grow|
      grow_status = HTTParty.get(grow.api_location + "/current")
      if grow_status.code < 400
        unless (grow_status["humidity"].between?(grow.hum_low, grow.hum_high) and grow_status["temperature"].between?(grow.temp_low, grow.temp_high))
          notify_user(status: grow_status, grow: grow)
        end
      end
    end
  end
  
  def notify_user (status:, grow:)
    StatusNotificationMailer.status_notification_email(status: status, grow: grow).deliver
  end
  

end
