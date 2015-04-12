class CreateGrows < ActiveRecord::Migration
  def change
    create_table :grows do |t|
      t.references :user, index: true
      t.string :api_location
      t.date :start
      t.date :end
      t.string :name
      t.text :description
      t.float :temp_low
      t.float :temp_high
      t.float :hum_low
      t.float :hum_high

      t.timestamps
    end
  end
end
