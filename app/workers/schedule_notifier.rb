class ScheduleNotifier
  include Sidekiq::Worker
  include Sidetiq::Schedulable

  recurrence { minutely }
  sidekiq_options retry: false

  def perform options={}
    Schedule.not_updated.each do |schedule|
    	Notification.new(grow: grow, schedule: schedule, dismissed: false, content: "scheduled_notification").save!
    end
  end

end
