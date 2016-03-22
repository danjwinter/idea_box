class Idea < ActiveRecord::Base
  default_scope { order(created_at: :desc) }

  before_save :default_quality

  private

  def default_quality
    self.quality ||= 'swill'
  end
end
