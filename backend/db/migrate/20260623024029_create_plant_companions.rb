class CreatePlantCompanions < ActiveRecord::Migration[8.1]
  def change
    create_table :plant_companions do |t|
      t.references :plant, null: false, foreign_key: true
      t.references :companion, null: false, foreign_key: { to_table: :plants }
      t.string :relationship
      t.text :notes

      t.timestamps
    end
  end
end
