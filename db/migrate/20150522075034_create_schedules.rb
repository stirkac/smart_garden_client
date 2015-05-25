class CreateSchedules < ActiveRecord::Migration
  def change
    create_table :schedules do |t|
      t.references :grow, index: true
      t.datetime :time
      t.text :title

      t.timestamps
    end
  end
end
