Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    namespace :v1 do
      get "health", to: "health#index"
      get "zone_lookup/:zip", to: "zone_lookup#show", constraints: { zip: /\d{5}/ }
      resources :plants, only: [ :index ]
      resources :yards, param: :token do
        resources :beds, except: [ :index ]
        member { delete "beds", to: "beds#clear" }
      end
      scope :auth do
        post   "request",       to: "auth#request_link"
        get    "verify/:token", to: "auth#verify",      as: :auth_verify
        get    "me",            to: "auth#me"
        delete "logout",        to: "auth#logout"
      end
    end
  end

  # SPA catch-all: serve index.html for any non-API path (client-side routing)
  idx = Rails.root.join("public/index.html")
  get "*path", to: proc {
    idx.exist? ? [ 200, { "content-type" => "text/html; charset=utf-8" }, [ idx.read ] ] : [ 404, {}, [ "Not found" ] ]
  }, constraints: ->(req) { !req.path.start_with?("/api/", "/up") }
end
