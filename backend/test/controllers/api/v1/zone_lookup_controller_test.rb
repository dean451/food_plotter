require "test_helper"

class Api::V1::ZoneLookupControllerTest < ActionDispatch::IntegrationTest
  # This controller just proxies phzmapi.org (see the class comment on
  # ZoneLookupController) — stub the network call rather than hitting the
  # real upstream from the test suite.
  test "show returns the zone for a valid zip" do
    fake_response = Struct.new(:body).new({ zone: "8b" }.to_json)
    def fake_response.is_a?(klass)
      klass == Net::HTTPSuccess ? true : super
    end

    Net::HTTP.stub(:start, fake_response) do
      get "/api/v1/zone_lookup/78701"
    end

    assert_response :success
    assert_equal({ "zone" => "8b" }, JSON.parse(response.body))
  end
end
