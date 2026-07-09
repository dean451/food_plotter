class AddExtraPlantIdsToBeds < ActiveRecord::Migration[8.1]
  def change
    add_column :beds, :extra_plant_ids, :text, default: '[]'
  end
end
