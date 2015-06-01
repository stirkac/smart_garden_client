class AddAllowSharingToGrow < ActiveRecord::Migration
  def change
    add_column :grows, :allow_sharing, :boolean
  end
end
