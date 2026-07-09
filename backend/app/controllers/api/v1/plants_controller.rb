class Api::V1::PlantsController < ApplicationController
  def index
    plants = Plant.all.order(:name)
                  .includes(:plant_companions, :plant_companions_as_companion)
    render json: plants.map { |p| p.as_json.merge('companions' => p.companion_data) }
  end
end
