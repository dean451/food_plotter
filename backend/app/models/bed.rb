class Bed < ApplicationRecord
  belongs_to :yard
  belongs_to :plant, optional: true

  serialize :extra_plant_ids, coder: JSON

  def extra_plant_data
    ids = extra_plant_ids.presence || []
    return [] if ids.empty?
    Plant.where(id: ids).map { |p| p.as_json(only: %i[id name emoji spacing_ft season]) }
  end

  validates :name, presence: true
  validates :width, :height, :depth, numericality: { greater_than: 0 }
  validates :rotation, inclusion: { in: [ 0, 90, 180, 270 ] }

  def perimeter
    2 * (width + height)
  end

  def soil_volume_cubic_yards
    (width * height * depth) / 27.0
  end
end
