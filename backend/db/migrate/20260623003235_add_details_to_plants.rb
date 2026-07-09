class AddDetailsToPlants < ActiveRecord::Migration[8.1]
  def change
    add_column :plants, :water_needs, :string
    add_column :plants, :sun, :string
    add_column :plants, :deer_resistant, :boolean
    add_column :plants, :attracts, :string
    add_column :plants, :native_notes, :text
  end
end
