class Product < ApplicationRecord
  belongs_to :image
  validates :title, presence: true, uniqueness: true
  validates :text, presence: true, uniqueness: true
end
