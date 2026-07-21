require "test_helper"

class Api::V1::HealthControllerTest < ActionDispatch::IntegrationTest
  test "index reports ok" do
    get "/api/v1/health"
    assert_response :success
    assert_equal "ok", JSON.parse(response.body)["status"]
  end
end
