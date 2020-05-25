class SocialNetwork < ApplicationRecord
  validates :href, presence: true, uniqueness: true
  validates :src, presence: true, uniqueness: true
  validates :name, presence: true, uniqueness: true
end
