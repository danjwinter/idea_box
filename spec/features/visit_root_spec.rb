require 'rails_helper'

RSpec.describe do
  describe "when you visit root" do
    it "shows the default info and displays a new idea form" do

      visit root_path

      expect(page).to have_content 'Ideas, Yo!'
    end
  end
end
