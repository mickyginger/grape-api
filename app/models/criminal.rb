class Criminal < ActiveRecord::Base
  belongs_to :user

  has_and_belongs_to_many :associates, class_name: "Criminal", foreign_key: "associate_id", join_table: "associates"
end
