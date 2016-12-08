class BandsController < ApplicationController
  before_action :get_band, only: [:show, :edit, :update, :destroy]
  before_action :require_login

  def index
    @bands = Band.all

    render :index
  end

  def show
    if @band
      render :show
    else
      redirect_to bands_url
    end
  end

  def new
    render :new
  end

  def create
    band = Band.new(band_params)

    if band.save
      redirect_to bands_url(band)
    else
      flash.now[:message] = band.errors.full_messages
      render :new
    end
  end

  def edit
    render :edit
  end

  def update
    if @band.update(band_params)
      redirect_to bands_url(@band)
    else
      flash.now[:message] = band.errors.full_messages
      render :edit
    end
  end

  def destroy
    @band.destroy
    redirect_to bands_url
  end

  private

  def get_band
    @band = Band.find_by(id: params[:id])
  end

  def band_params
    params.require(:band).permit(:name)
  end
end
