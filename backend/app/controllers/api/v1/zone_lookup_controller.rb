require "net/http"

# Proxies USDA zone-by-zip lookups to phzmapi.org — the upstream sends no CORS
# headers, so the browser can't call it directly.
class Api::V1::ZoneLookupController < ApplicationController
  def show
    uri = URI("https://phzmapi.org/#{params[:zip]}.json")
    res = Net::HTTP.start(uri.host, uri.port, use_ssl: true, open_timeout: 5, read_timeout: 5) do |http|
      http.get(uri.path)
    end
    if res.is_a?(Net::HTTPSuccess)
      data = JSON.parse(res.body)
      render json: { zone: data["zone"] }
    else
      render json: { error: "Zip code not found" }, status: :not_found
    end
  rescue StandardError => e
    Rails.logger.warn("zone lookup failed: #{e.class}: #{e.message}")
    render json: { error: "Zone lookup unavailable" }, status: :bad_gateway
  end
end
