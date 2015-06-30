class CreateDevices < ActiveRecord::Migration
  def change
    create_table :devices do |t|
      t.string :api_location

      t.timestamps
    end
  end
end
