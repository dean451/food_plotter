class PlantCompanion < ApplicationRecord
  belongs_to :plant
  belongs_to :companion, class_name: "Plant"

  validates :relationship, inclusion: { in: %w[beneficial harmful] }
  validates :plant_id, uniqueness: { scope: :companion_id }
end
