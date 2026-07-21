require "test_helper"

class YardTest < ActiveSupport::TestCase
  test "valid yard saves and gets an auto-generated token" do
    yard = Yard.new(name: "Front Yard", width: 10, height: 10)
    assert yard.save
    assert_not_nil yard.token
  end

  test "requires a name and positive dimensions" do
    yard = Yard.new(width: 0, height: -1)
    assert_not yard.valid?
    assert_includes yard.errors[:name], "can't be blank"
    assert_includes yard.errors[:width], "must be greater than 0"
    assert_includes yard.errors[:height], "must be greater than 0"
  end

  test "destroying a yard destroys its beds" do
    yard = yards(:backyard)
    assert_difference("Bed.count", -1) { yard.destroy }
  end
end
