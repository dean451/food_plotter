require "test_helper"

class Api::V1::PlantsControllerTest < ActionDispatch::IntegrationTest
  test "index returns all plants, alphabetized, with companion data" do
    get "/api/v1/plants"
    assert_response :success
    body = JSON.parse(response.body)
    assert_equal [ "Basil", "Tomato" ], body.map { |p| p["name"] }
    tomato = body.find { |p| p["name"] == "Tomato" }
    assert_equal 1, tomato["companions"].length
    assert_equal "Basil", tomato["companions"].first["name"]
  end
end
