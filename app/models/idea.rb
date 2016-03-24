class Idea < ActiveRecord::Base
  default_scope { order(created_at: :desc) }

  validates :quality, numericality: {only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 2}
  validates :title, presence: true
  validates :body, presence: true
end
