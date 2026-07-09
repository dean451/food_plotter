class Yard < ApplicationRecord
  belongs_to :user, optional: true
  has_many :beds, dependent: :destroy

  validates :name, presence: true
  validates :width, :height, numericality: { greater_than: 0 }

  before_create :generate_token

  private

  def generate_token
    self.token ||= loop do
      t = SecureRandom.hex(8)
      break t unless Yard.exists?(token: t)
    end
  end
end
