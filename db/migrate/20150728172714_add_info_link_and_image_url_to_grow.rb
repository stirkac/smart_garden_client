class AddInfoLinkAndImageUrlToGrow < ActiveRecord::Migration
  def change
    add_column :grows, :info_link, :string
    add_column :grows, :image_url, :string
  end
end
