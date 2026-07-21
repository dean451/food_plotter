require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "valid user saves with a downcased email" do
    user = User.new(email: "Grower@Example.com")
    assert user.save
    assert_equal "grower@example.com", user.email
  end

  test "rejects a duplicate email regardless of case" do
    dup = User.new(email: users(:dean).email.upcase)
    assert_not dup.valid?
    assert_includes dup.errors[:email], "has already been taken"
  end
end
