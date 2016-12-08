class CreateBands < ActiveRecord::Migration
  def change
    create_table :bands do |t|
    t.string :name, null: false
    t.integer :album_id

    t.timestamps
    end
  end
end
