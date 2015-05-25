class Notification < ActiveRecord::Base
	#id: integer, 
	#user_id: integer, 
	#grow_id: integer, 
	#content: text, 
	#dismissed: boolean, 
	#created_at: datetime, 
	#updated_at: datetime
	
  belongs_to :user
  belongs_to :grow
end
