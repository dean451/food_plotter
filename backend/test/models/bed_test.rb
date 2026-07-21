require "test_helper"

class BedTest < ActiveSupport::TestCase
  test "valid bed saves" do
    bed = Bed.new(name: "New Bed", yard: yards(:backyard), width: 4, height: 4, depth: 1, rotation: 90)
    assert bed.save
  end

  test "perimeter and soil volume compute from dimensions" do
    bed = beds(:tomato_bed)
    assert_equal 16.0, bed.perimeter
    assert_in_delta 16.0 / 27.0, bed.soil_volume_cubic_yards, 0.0001
  end

  test "rotation must be one of the four right angles" do
    bed = Bed.new(name: "Crooked Bed", yard: yards(:backyard), width: 4, height: 4, depth: 1, rotation: 45)
    assert_not bed.valid?
    assert_includes bed.errors[:rotation], "is not included in the list"
  end

  test "extra_plant_data looks up plants by id" do
    bed = beds(:tomato_bed)
    bed.update!(extra_plant_ids: [ plants(:basil).id ])
    names = bed.extra_plant_data.map { |p| p["name"] }
    assert_includes names, "Basil"
  end
end
