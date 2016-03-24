require 'rails_helper'

RSpec.describe Idea, type: :model do
  it { should validate_presence_of :title}
  it { should validate_presence_of :body}
  it { should validate_numericality_of(:quality).is_less_than_or_equal_to(2)
                                                .is_greater_than_or_equal_to(0)}
end
