class Status < ActiveRecord::Base
	#id: integer, 
	#temperature: float, 
	#humidity: float, 
	#created_at: datetime, 
	#updated_at: datetime
	
	has_many :notifications

end
