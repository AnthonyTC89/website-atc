class SocialNetwork < ApplicationRecord
  validates :href, presence: true
  validates :src, presence: true
  validates :name, presence: true
end
