class AddScheduleToNotification < ActiveRecord::Migration
  def change
    add_reference :notifications, :schedule, index: true
  end
end
