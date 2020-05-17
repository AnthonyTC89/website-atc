# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

username = ENV['ADMIN_USERNAME']
password = ENV['ADMIN_PASSWORD']
email = ENV['ADMIN_EMAIL']

User.create(username: username, email: email, password: password, password_confirmation: password, status: 1)
