class AddUserIdToYards < ActiveRecord::Migration[8.1]
  def change
    add_reference :yards, :user, null: true, foreign_key: true
  end
end
