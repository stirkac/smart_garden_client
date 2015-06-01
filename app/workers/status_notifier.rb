class StatusNotifier
  include Sidekiq::Worker
  include Sidetiq::Schedulable

  recurrence { minutely }
  sidekiq_options retry: false

  def perform options={}
    Grow.not_up_to_date.find_each do |grow|
      current_status = HTTParty.get(grow.api_location + "/current")
      if current_status.code < 400
        unless (current_status["humidity"].between?(grow.hum_low, grow.hum_high) and current_status["temperature"].between?(grow.temp_low, grow.temp_high))
          status=Status.new current_status
          if status.save!
            Notification.new(grow: grow, status: status, dismissed: false, content: "params_not_in_range").save!
          end
        end
      end
    end
  end

end
