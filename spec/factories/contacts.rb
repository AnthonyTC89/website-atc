FactoryBot.define do
  factory :contact do
    title { "MyString" }
    email { "MyString" }
    mobile { "MyString" }
    address { "MyString" }
    zoom { 1 }
    lat { "9.99" }
    lng { "9.99" }
    status { false }
    image { nil }
  end
end
