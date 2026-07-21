require "test_helper"

class PlantTest < ActiveSupport::TestCase
  test "valid plant fixture saves" do
    plant = Plant.new(name: "Zucchini", spacing_ft: 3.0, season: "summer")
    assert plant.valid?
    assert plant.save
  end

  test "requires a name" do
    plant = Plant.new(spacing_ft: 3.0)
    assert_not plant.valid?
    assert_includes plant.errors[:name], "can't be blank"
  end

  test "companion_data returns both outgoing and incoming relationships" do
    companions = plants(:tomato).companion_data
    assert_equal 1, companions.length
    assert_equal plants(:basil).id, companions.first[:id]
    assert_equal "beneficial", companions.first[:relationship]
  end
end
