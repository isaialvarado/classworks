class Album < ActiveRecord::Base
  validates :name, :band_id, :album_type, :year, presence: true

  has_many :tracks, dependent: :destroy
  belongs_to :band
end
