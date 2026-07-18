class Api::V1::AuthController < ApplicationController
  def request_link
    email = params[:email].to_s.strip.downcase
    return render json: { error: "Email required" }, status: :unprocessable_entity if email.blank?

    link = MagicLink.create_for(email:)
    MagicLinkMailer.send_link(email, link.token, yard_token: params[:yard_token]).deliver_now

    resp = { ok: true }
    # Surface the link in development so you can click it without SMTP configured
    resp[:dev_link] = verify_url(link.token, params[:yard_token]) if Rails.env.development?
    render json: resp
  end

  def verify
    link = MagicLink.find_by(token: params[:token])
    return redirect_to "#{app_url}?auth=error", allow_other_host: true unless link&.valid_for_use?

    link.consume!
    user = User.find_or_create_by!(email: link.email)

    if (yt = params[:yard]).present?
      yard = Yard.find_by(token: yt)
      yard&.update!(user:) if yard&.user.nil?
    end

    request.session[:user_id] = user.id

    target = params[:yard].present? ? "#{app_url}/#{params[:yard]}" : app_url
    redirect_to target, allow_other_host: true
  end

  def me
    if (user = current_user)
      render json: {
        email: user.email,
        yards: user.yards.order(:created_at).map { |y| { token: y.token, name: y.name } }
      }
    else
      render json: {}
    end
  end

  def logout
    request.session.delete(:user_id)
    render json: { ok: true }
  end

  private

  def app_url
    Rails.env.development? ? "http://localhost:5173" : (ENV.fetch("APP_URL", request.base_url))
  end

  def verify_url(link_token, yard_token = nil)
    base = "#{app_url}/api/v1/auth/verify/#{link_token}"
    yard_token.present? ? "#{base}?yard=#{yard_token}" : base
  end
end
