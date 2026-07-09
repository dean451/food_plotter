class CreateBeds < ActiveRecord::Migration[8.1]
  def change
    create_table :beds do |t|
      t.references :yard, null: false, foreign_key: true
      t.string :name
      t.decimal :x
      t.decimal :y
      t.decimal :width
      t.decimal :height
      t.integer :rotation, default: 0
      t.string :material
      t.decimal :depth

      t.timestamps
    end
  end
end
