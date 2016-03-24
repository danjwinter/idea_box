require 'rails_helper'

RSpec.describe do
  describe "when you visit root" do
    it "shows the default info and displays a new idea form" do

      visit root_path

      within('.header') do
        expect(page).to have_content 'Ideas, Yo!'
      end

      within('.search-box') do
        expect(page).to have_content 'Search'
      end

      within('.edit-instructions') do
        expect(page).to have_content 'Click on a title or body to edit'
        expect(page).to have_content 'Press Enter to save your changes'
      end

      within('.new-idea') do
        expect(page).to have_content 'Add a New Idea'
        expect(page).to have_content 'Title'
        expect(page).to have_content 'Body'
      end
    end
  end
end
