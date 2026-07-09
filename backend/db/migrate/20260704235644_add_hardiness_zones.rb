class AddHardinessZones < ActiveRecord::Migration[8.1]
  def change
    add_column :plants, :zone_min, :string
    add_column :plants, :zone_max, :string
    add_column :yards, :hardiness_zone, :string
  end
end
