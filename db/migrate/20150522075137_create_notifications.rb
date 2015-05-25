class CreateNotifications < ActiveRecord::Migration
  def change
    create_table :notifications do |t|
      t.references :user, index: true
      t.references :grow, index: true
      t.text :content
      t.boolean :dismissed

      t.timestamps
    end
  end
end
