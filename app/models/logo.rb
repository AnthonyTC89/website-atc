class Logo < ApplicationRecord
  belongs_to :image, optional: true

  validates :text, presence: true
end
