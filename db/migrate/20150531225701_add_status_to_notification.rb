class AddStatusToNotification < ActiveRecord::Migration
  def change
    add_reference :notifications, :status, index: true
  end
end
