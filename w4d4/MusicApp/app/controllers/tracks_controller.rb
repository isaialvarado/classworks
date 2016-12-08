class TracksController < ApplicationController
  before_action :get_track, only: [:show, :edit, :update, :destroy]
  before_action :require_login
end
