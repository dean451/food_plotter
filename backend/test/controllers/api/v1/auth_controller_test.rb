require "test_helper"

class Api::V1::AuthControllerTest < ActionDispatch::IntegrationTest
  test "request_link creates a magic link and emails it" do
    assert_difference("MagicLink.count", 1) do
      assert_emails 1 do
        post "/api/v1/auth/request", params: { email: "grower@example.com" }
      end
    end
    assert_response :success
    assert_equal({ "ok" => true }, JSON.parse(response.body))
  end

  test "verify consumes the link, creates the user, and starts a session" do
    link = MagicLink.create_for(email: "grower@example.com")
    get "/api/v1/auth/verify/#{link.token}"
    assert_response :redirect

    assert link.reload.used_at.present?
    user = User.find_by(email: "grower@example.com")
    assert_not_nil user
  end

  test "me returns the signed-in user's yards" do
    link = MagicLink.create_for(email: users(:dean).email)
    get "/api/v1/auth/verify/#{link.token}"

    get "/api/v1/auth/me"
    assert_response :success
    body = JSON.parse(response.body)
    assert_equal users(:dean).email, body["email"]
  end

  test "logout clears the session" do
    link = MagicLink.create_for(email: users(:dean).email)
    get "/api/v1/auth/verify/#{link.token}"

    delete "/api/v1/auth/logout"
    assert_response :success

    get "/api/v1/auth/me"
    assert_equal({}, JSON.parse(response.body))
  end
end
