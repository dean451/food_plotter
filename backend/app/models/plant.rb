class Plant < ApplicationRecord
  has_many :beds
  has_many :plant_companions, dependent: :destroy
  has_many :plant_companions_as_companion, class_name: 'PlantCompanion', foreign_key: :companion_id, dependent: :destroy

  validates :name, presence: true
  validates :spacing_ft, numericality: { greater_than: 0 }

  SEASONS = %w[spring summer fall winter perennial].freeze
  validates :season, inclusion: { in: SEASONS }, allow_nil: true

  def companion_data
    outgoing = plant_companions.includes(:companion).map do |pc|
      { id: pc.companion.id, name: pc.companion.name, emoji: pc.companion.emoji, relationship: pc.relationship, notes: pc.notes }
    end
    incoming = plant_companions_as_companion.includes(:plant).map do |pc|
      { id: pc.plant.id, name: pc.plant.name, emoji: pc.plant.emoji, relationship: pc.relationship, notes: pc.notes }
    end
    (outgoing + incoming).uniq { |c| c[:id] }
  end
end
