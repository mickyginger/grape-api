class AddUserToCriminals < ActiveRecord::Migration[5.2]
  def change
    add_reference :criminals, :user, foreign_key: true
  end
end
