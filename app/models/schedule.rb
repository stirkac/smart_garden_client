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
  validates_presence_of :grow

  scope :present, ->(){ where(Schedule.arel_table[:time].gt(DateTime.now)) }


  def self.not_updated
    query = <<-SQL

    SELECT "schedules".* FROM "schedules"  
    WHERE ("schedules"."time" >= '#{1.day.ago}' 
    	AND "schedules"."time" < '#{1.hour.ago}'
    	AND "schedules"."id" NOT IN (
    		SELECT schedules.id FROM schedules
    		INNER JOIN "notifications" ON "notifications"."schedule_id" = "schedules"."id"
    		WHERE "notifications"."id" IS NOT NULL 
    		GROUP BY schedules.id
    	)
    )
    SQL
    self.find_by_sql(query)
  end



end
