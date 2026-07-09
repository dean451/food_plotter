class CreatePlants < ActiveRecord::Migration[8.1]
  def change
    create_table :plants do |t|
      t.string :name
      t.string :emoji
      t.decimal :spacing_ft
      t.string :season
      t.integer :days_to_harvest

      t.timestamps
    end
  end
end
