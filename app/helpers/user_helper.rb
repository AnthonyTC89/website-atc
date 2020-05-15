require 'jwt'

module UserHelper
  @@private_key = ENV['REACT_APP_PRIVATE_KEY_JWT']
  
  def encode(payload)
    JWT.encode(payload, @@private_key, 'HS256')
  end

  def decode(token)
    JWT.decode(token, @@private_key, true, { :algorithm => 'HS256' })[0]
  end
end