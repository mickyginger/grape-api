class CreateBoats < ActiveRecord::Migration[5.2]
  def change
    create_table :boats do |t|
      t.string :name
      t.integer :length
      t.string :color
      t.float :hp
      t.string :image
      t.integer :crew
      t.json :location
    end
  end
end
