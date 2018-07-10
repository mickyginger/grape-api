class CreateCriminals < ActiveRecord::Migration[5.2]
  def change
    create_table :criminals do |t|
      t.string :name
      t.text :crimes, array: true, default: []
      t.string :image
      t.string :status
      t.date :dob
      t.json :last_known_location
    end
  end
end
