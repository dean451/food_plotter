require "test_helper"

class Api::V1::YardsControllerTest < ActionDispatch::IntegrationTest
  test "create makes a new yard and returns it" do
    assert_difference("Yard.count", 1) do
      post "/api/v1/yards", params: { yard: { name: "Side Lot", width: 12, height: 8 } }
    end
    assert_response :created
    body = JSON.parse(response.body)
    assert_equal "Side Lot", body["name"]
    assert_not_nil body["token"]
  end

  test "show returns the yard with its beds" do
    get "/api/v1/yards/#{yards(:backyard).token}"
    assert_response :success
    body = JSON.parse(response.body)
    assert_equal "Backyard", body["name"]
    assert_equal 1, body["beds"].length
    assert_equal "Tomato Bed", body["beds"].first["name"]
  end

  test "show 404s for an unknown token" do
    get "/api/v1/yards/does-not-exist"
    assert_response :not_found
  end

  test "update saves changes and returns the updated yard" do
    patch "/api/v1/yards/#{yards(:backyard).token}", params: { yard: { name: "Renamed Yard" } }
    assert_response :success
    assert_equal "Renamed Yard", yards(:backyard).reload.name
  end
end
