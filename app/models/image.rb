class Image < ApplicationRecord
  validates :bucket, presence: true
  validates :key, presence: true, uniqueness: true
  validates :location, presence: true, uniqueness: true
end
