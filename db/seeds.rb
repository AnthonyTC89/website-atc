# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

admin = ENV['ADMIN_USERNAME']
password = ENV['ADMIN_PASSWORD']
email = ENV['ADMIN_EMAIL']

User.create(username: admin, email: email, password: password, password_confirmation: password, status: 1)
