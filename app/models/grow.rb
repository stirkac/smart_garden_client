class Grow < ActiveRecord::Base
  #t.string :api_location
  #t.date :start
  #t.date :end
  #t.string :name
  #t.text :description
  #t.float :temp_low
  #t.float :temp_high
  #t.float :hum_low
  #t.float :hum_high
  
  belongs_to :user
  validates_presence_of :user
  has_many :schedules
  has_many :notifications
end
