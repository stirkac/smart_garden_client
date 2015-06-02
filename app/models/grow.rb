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

  def self.not_updated
    query = <<-SQL
      SELECT grows.* FROM grows
      WHERE grows.id NOT IN (
        SELECT grows.id FROM grows
        INNER JOIN "notifications" ON "notifications"."grow_id" = "grows"."id" 
        WHERE ( notifications.created_at > '#{2.hours.ago}' ) 
        GROUP BY grows.id
      )
      UNION ( SELECT grows.* FROM grows INNER JOIN "notifications" ON "notifications"."grow_id" = "grows"."id" WHERE "notifications"."id" IS NULL)
    SQL
    self.find_by_sql(query)
  end

  belongs_to :user
  validates_presence_of :user
  has_many :schedules
  has_many :notifications

end
