require "test_helper"

class MagicLinkTest < ActiveSupport::TestCase
  test "create_for generates a token and expiry, and is valid for use" do
    link = MagicLink.create_for(email: "Grower@Example.com")
    assert_not_nil link.token
    assert link.expires_at > Time.current
    assert_equal "grower@example.com", link.email
    assert link.valid_for_use?
  end

  test "create_for clears any previous unused link for the same email" do
    first = MagicLink.create_for(email: "grower@example.com")
    MagicLink.create_for(email: "grower@example.com")
    assert_not MagicLink.exists?(id: first.id)
  end

  test "consume! marks the link used, so it's no longer valid" do
    link = MagicLink.create_for(email: "grower@example.com")
    link.consume!
    assert_not link.valid_for_use?
  end
end
