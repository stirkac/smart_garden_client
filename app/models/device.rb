class Device < ActiveRecord::Base
	validates_presence_of :api_location
	
	scope :present, ->(){ where(created_at: (DateTime.now-1.hour)..DateTime.now) }
end
