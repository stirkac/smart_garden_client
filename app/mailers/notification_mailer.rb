class NotificationMailer < ActionMailer::Base
  default :to => (ENV['LOGGER_MAIL'])

  def status_notification_email(grow:, status:)
  	@status=status
  	@grow=grow
    mail(to: grow.user.email, from: ENV["EMAIL"], subject: "Notification from your garden #{grow.name}")
  end

  def scheduled_notification_email(grow:, schedule:)
  	@schedule=schedule
  	@grow=grow
  	mail(to: grow.user.email, from: ENV["EMAIL"], subject: "Scheduled event from your garden #{grow.name}")
  end
end
