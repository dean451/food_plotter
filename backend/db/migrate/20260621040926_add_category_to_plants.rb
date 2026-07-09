class AddCategoryToPlants < ActiveRecord::Migration[8.1]
  def change
    add_column :plants, :category, :string
  end
end
