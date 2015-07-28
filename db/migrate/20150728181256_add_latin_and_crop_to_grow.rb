class AddLatinAndCropToGrow < ActiveRecord::Migration
  def change
    add_column :grows, :latin, :string
    add_column :grows, :crop, :datetime
  end
end
