class Api::V1::YardsController < ApplicationController
  def index
    yards = current_user ? current_user.yards.includes(beds: :plant) : []
    render json: yards.map { |y| serialize_yard(y) }
  end

  def show
    yard = Yard.includes(beds: :plant).find_by!(token: params[:token])
    render json: serialize_yard(yard)
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Garden not found" }, status: :not_found
  end

  def create
    yard = Yard.new(yard_params)
    yard.user = current_user if current_user
    if yard.save
      render json: yard, status: :created
    else
      render json: yard.errors, status: :unprocessable_entity
    end
  end

  def update
    yard = Yard.find_by!(token: params[:token])
    if yard.update(yard_params)
      render json: serialize_yard(yard)
    else
      render json: yard.errors, status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Garden not found" }, status: :not_found
  end

  private

  def serialize_yard(yard)
    yard.as_json.merge(
      "beds" => yard.beds.map { |b|
        b.as_json(include: :plant).merge("extra_plants" => b.extra_plant_data)
      }
    )
  end

  def yard_params
    params.require(:yard).permit(:name, :width, :height, :unit, :hardiness_zone, :region,
                                 obstacles: %i[id kind x y width height])
  end
end
