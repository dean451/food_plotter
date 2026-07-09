class CreateYards < ActiveRecord::Migration[8.1]
  def change
    create_table :yards do |t|
      t.string :name
      t.decimal :width
      t.decimal :height
      t.string :unit, default: "ft"

      t.timestamps
    end
  end
end
