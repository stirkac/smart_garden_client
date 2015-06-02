class Notification < ActiveRecord::Base
	#id: integer, 
	#user_id: integer, 
	#grow_id: integer, 
	#content: text, 
	#dismissed: boolean, 
	#created_at: datetime, 
	#updated_at: datetime
	
  belongs_to :grow
  belongs_to :status

  scope :not_dismissed, ->(){ where.not(dismissed: true).order("created_at DESC")}

  validates_presence_of :grow
  after_commit :notify_user, on: :create

  def notify_user
    StatusNotificationMailer.status_notification_email(status: status, grow: grow).deliver
  end

end
