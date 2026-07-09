class MagicLink < ApplicationRecord
  EXPIRY = 15.minutes

  before_validation :set_token_and_expiry, on: :create

  validates :email, :token, :expires_at, presence: true

  def self.create_for(email:)
    where(email: email.downcase, used_at: nil).destroy_all
    create!(email: email.downcase)
  end

  def valid_for_use?
    used_at.nil? && expires_at > Time.current
  end

  def consume!
    update!(used_at: Time.current)
  end

  private

  def set_token_and_expiry
    self.expires_at ||= EXPIRY.from_now
    self.token ||= loop do
      t = SecureRandom.urlsafe_base64(32)
      break t unless MagicLink.exists?(token: t)
    end
  end
end
