class StatusNotificationMailer < ActionMailer::Base
  default :to => (ENV['LOGGER_MAIL'])

  def status_notification_email(grow:, status:)
  	@status=status
  	@grow=grow
    mail(to: grow.user.email, subject: "Notification from your garden #{grow.name}")
  end
end
