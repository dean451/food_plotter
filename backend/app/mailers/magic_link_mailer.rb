class MagicLinkMailer < ApplicationMailer
  def send_link(email, token, yard_token: nil)
    @verify_url = verify_url(token, yard_token)
    mail(to: email, subject: "Sign in to Food Plotter")
  end

  private

  def verify_url(token, yard_token)
    app = if Rails.env.development?
      "http://localhost:5173"
    else
      # No sensible fallback here — a mailer has no request to read a host
      # from, unlike Api::V1::AuthController#app_url. Fail loudly rather than
      # mail someone a link to their own laptop.
      ENV.fetch("APP_URL") { raise "Set APP_URL (e.g. https://your-app.fly.dev) via `fly secrets set` — magic-link emails need it to build a real verify link" }
    end
    base = "#{app}/api/v1/auth/verify/#{token}"
    yard_token.present? ? "#{base}?yard=#{yard_token}" : base
  end
end
