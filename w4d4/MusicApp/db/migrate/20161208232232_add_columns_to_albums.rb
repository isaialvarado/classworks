class AddColumnsToAlbums < ActiveRecord::Migration
  def change
    add_column :albums, :album_type, :string, null: false
    add_column :albums, :year, :integer, null: false
  end
end
