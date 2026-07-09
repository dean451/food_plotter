class AddPlantIdToBeds < ActiveRecord::Migration[8.1]
  def change
    add_reference :beds, :plant, null: true, foreign_key: true
  end
end
