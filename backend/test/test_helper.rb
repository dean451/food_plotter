ENV["RAILS_ENV"] ||= "test"
require_relative "../config/environment"
require "rails/test_help"

# The magic-link mailer refuses to build a verify link without this (see
# app/mailers/magic_link_mailer.rb) — production gets it from a real secret,
# tests just need any value.
ENV["APP_URL"] ||= "https://test.example"

module ActiveSupport
  class TestCase
    # Run tests in parallel with specified workers
    parallelize(workers: :number_of_processors)

    # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
    fixtures :all
  end
end
