class AddUserToBoats < ActiveRecord::Migration[5.2]
  def change
    add_reference :boats, :user, foreign_key: true
  end
end
