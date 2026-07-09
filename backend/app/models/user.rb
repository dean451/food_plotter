class User < ApplicationRecord
  has_many :yards, dependent: :nullify

  validates :email, presence: true,
    uniqueness: { case_sensitive: false },
    format: { with: URI::MailTo::EMAIL_REGEXP }

  before_save { self.email = email.downcase }
end
