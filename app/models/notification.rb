class Notification < ActiveRecord::Base
	#id: integer, 
	#user_id: integer, 
	#grow_id: integer, 
	#content: text, 
	#dismissed: boolean, 
	#created_at: datetime, 
	#updated_at: datetime
	
  Notification::ContentTypes = %w( params_not_in_range scheduled_notification )

  belongs_to :grow
  belongs_to :status
  belongs_to :schedule

  scope :not_dismissed, ->(){ where.not(dismissed: true).order("created_at DESC")}
  scope :by_grow, ->(grow_id){ where(grow_id: grow_id) }

  validates_presence_of :grow
  validates_inclusion_of :content, in: Notification::ContentTypes
  
  after_commit :notify_user, on: :create

  def notify_user
    logger.info("Sending notification for reason: "+content)
    case self[:content]
    when "params_not_in_range"
      NotificationMailer.status_notification_email(status: status, grow: grow).deliver
    when "scheduled_notification"
      NotificationMailer.scheduled_notification_email(schedule: schedule, grow: grow).deliver
    end
  end

end
