class NotificationMailer < ActionMailer::Base
  default :to => (ENV['OPENSHIFT_LOGIN'])

  def status_notification_email(grow: nil, status: nil)
  	@status=status
  	@grow=grow
    mail(to: grow.user.email, from: ENV["OPENSHIFT_LOGIN"], subject: "Notification from your garden #{grow.name}")
  end

  def scheduled_notification_email(grow: nil, schedule: nil)
  	@schedule=schedule
  	@grow=grow
  	mail(to: grow.user.email, from: ENV["OPENSHIFT_LOGIN"], subject: "Scheduled event from your garden #{grow.name}")
  end
end
