class Schedule < ActiveRecord::Base
	#id: integer, 
	#grow_id: integer, 
	#time: datetime, 
	#title: text, 
	#created_at: datetime, 
	#updated_at: datetime
	
  belongs_to :grow
  validates_presence_of :time
  validates_presence_of :title
  
end
