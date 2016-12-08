class Track < ActiveRecord::Base
  validates :name, :album_id, presence: true

  belongs_to :album
end
