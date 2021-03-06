class User < ApplicationRecord
  has_secure_password
  has_secure_token
  has_secure_token :auth_token

  validates :username, length: { minimum: 5 }, uniqueness: true 
  validates :email, presence: true, uniqueness: true
  validates_format_of :email, with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
end
