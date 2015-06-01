class RemoveUserFromNotification < ActiveRecord::Migration
  def change
    remove_reference :notifications, :user, index: true
  end
end
