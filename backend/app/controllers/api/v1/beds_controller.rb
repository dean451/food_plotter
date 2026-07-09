class Api::V1::BedsController < ApplicationController
  before_action :set_yard

  def create
    bed = @yard.beds.new(bed_params)
    if bed.save
      render json: bed.as_json(include: :plant).merge('extra_plants' => bed.extra_plant_data), status: :created
    else
      render json: bed.errors, status: :unprocessable_entity
    end
  end

  def update
    bed = @yard.beds.find(params[:id])
    if bed.update(bed_params)
      render json: bed.as_json(include: :plant).merge('extra_plants' => bed.extra_plant_data)
    else
      render json: bed.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @yard.beds.find(params[:id]).destroy
    head :no_content
  end

  def clear
    @yard.beds.destroy_all
    head :no_content
  end

  private

  def set_yard
    @yard = Yard.find_by!(token: params[:yard_token] || params[:token])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Garden not found' }, status: :not_found
  end

  def bed_params
    params.require(:bed).permit(:name, :x, :y, :width, :height, :rotation, :material, :depth, :emoji, :plant_id, extra_plant_ids: [])
  end
end
