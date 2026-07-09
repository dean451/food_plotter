class MagicLinkMailer < ApplicationMailer
  def send_link(email, token, yard_token: nil)
    @verify_url = verify_url(token, yard_token)
    mail(to: email, subject: 'Sign in to Food Plotter')
  end

  private

  def verify_url(token, yard_token)
    app = Rails.env.development? ? 'http://localhost:5173' : (ENV.fetch('APP_URL', 'http://localhost:5173'))
    base = "#{app}/api/v1/auth/verify/#{token}"
    yard_token.present? ? "#{base}?yard=#{yard_token}" : base
  end
end
