class AlbumsController < ApplicationController
  before_action :get_album, only: [:new, :show, :edit, :update, :destroy]
  before_action :require_login

  def show
    if @album
      render :show
    else
      redirect_to bands_url
    end
  end

  def new
    @band = Band.find_by(id: params[:band_id])

    render :new
  end

  def create
    album = Album.new(album_params)

    if album.save
      redirect_to album_url(album)
    else
      flash.now[:message] = album.errors.full_messages
      render :new
    end
  end

  def edit
    render :edit
  end

  def update
    if @album.update(album_params)
      redirect_to album_url(@album)
    else
      flash.now[:message] = @album.errors.full_messages
      render :edit
    end
  end

  def destroy
    band = @album.band_id
    @album.destroy
    redirect_to band_url(band)
  end

  private

  def get_album
    @album = Album.find_by(id: params[:id])
  end

  def album_params
    params.require(:album).permit(:name, :band_id)
  end
end
