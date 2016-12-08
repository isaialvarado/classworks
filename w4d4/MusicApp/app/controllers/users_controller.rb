class UsersController < ApplicationController
  before_action :redirect, only: [:new]

  def new
    render :new
  end

  def show
    @user = User.find_by(id: params[:id])

    if @user
      render :show
    else
      flash[:message] = "User #{params[:id]} does not exist."
      redirect_to bands_url
    end
  end

  def create
    user = User.new(user_params)

    if user.save
      login_user(user)
      redirect_to bands_url
    else
      flash.now[:message] = user.errors.full_messages
      render :new
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end

  def redirect
    redirect_to user_url(user_params) if logged_in?
  end
end
