FactoryBot.define do
  factory :user do
    username { "MyString" }
    password_digest { "MyString" }
    token { "MyString" }
    auth_token { "MyString" }
    status { 1 }
  end
end
