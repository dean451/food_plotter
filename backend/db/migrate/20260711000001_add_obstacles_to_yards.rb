class AddObstaclesToYards < ActiveRecord::Migration[8.1]
  def change
    add_column :yards, :obstacles, :json, null: false, default: []
  end
end
