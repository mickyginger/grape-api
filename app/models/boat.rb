class Boat < ActiveRecord::Base
  has_many :comments, dependent: :destroy
  belongs_to :user

  validates :name, presence: true
  validates :crew, presence: true
  validates :hp, presence: true
  validates :image, presence: true
  validates :location, presence: true
  validates :length, presence: true
  validates :color, presence: true
end
