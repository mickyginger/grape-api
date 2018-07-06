class Comment < ActiveRecord::Base
  belongs_to :boat

  validates :content, presence: true
end
