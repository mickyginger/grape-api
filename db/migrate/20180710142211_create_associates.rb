class CreateAssociates < ActiveRecord::Migration[5.2]
  def change
    create_table :associates do |t|
      t.integer :criminal_id
      t.integer :associate_id
    end
  end
end
