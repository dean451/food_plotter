require "test_helper"

class Api::V1::BedsControllerTest < ActionDispatch::IntegrationTest
  setup { @yard = yards(:backyard) }

  test "create adds a bed to the yard" do
    assert_difference("@yard.beds.count", 1) do
      post "/api/v1/yards/#{@yard.token}/beds",
        params: { bed: { name: "Herb Spiral", x: 0, y: 0, width: 3, height: 3, depth: 1, rotation: 0 } }
    end
    assert_response :created
    assert_equal "Herb Spiral", JSON.parse(response.body)["name"]
  end

  test "update changes an existing bed" do
    bed = beds(:tomato_bed)
    patch "/api/v1/yards/#{@yard.token}/beds/#{bed.id}", params: { bed: { name: "Renamed Bed" } }
    assert_response :success
    assert_equal "Renamed Bed", bed.reload.name
  end

  test "destroy removes a single bed" do
    bed = beds(:tomato_bed)
    assert_difference("@yard.beds.count", -1) do
      delete "/api/v1/yards/#{@yard.token}/beds/#{bed.id}"
    end
    assert_response :no_content
  end

  test "clear removes every bed in the yard" do
    delete "/api/v1/yards/#{@yard.token}/beds"
    assert_response :no_content
    assert_equal 0, @yard.beds.count
  end
end
