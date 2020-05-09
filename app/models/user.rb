class User < ApplicationRecord
  has_secure_password
  has_secure_token
  has_secure_token :auth_token

  validates :username, length: { minimum: 5 }, uniqueness: true 
end
