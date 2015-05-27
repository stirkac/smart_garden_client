# Preview all emails at http://localhost:3000/rails/mailers/status_notification_mailer
class StatusNotificationMailerPreview < ActionMailer::Preview
	def status_notification_email
		grow=Grow.first
		status = HTTParty.get(grow.api_location + "/current")
    StatusNotificationMailer.status_notification_email(status: status, grow: grow)
  end
end
