class MigratePlantIdToExtraPlantIds < ActiveRecord::Migration[8.1]
  def up
    Bed.where.not(plant_id: nil).find_each do |bed|
      existing_ids = bed.extra_plant_ids || []
      new_ids = existing_ids.include?(bed.plant_id) ? existing_ids : [bed.plant_id] + existing_ids
      bed.update!(extra_plant_ids: new_ids, plant_id: nil)
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
