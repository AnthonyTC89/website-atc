# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_05_26_015331) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "abouts", force: :cascade do |t|
    t.string "title"
    t.string "text"
    t.boolean "status", default: true
    t.bigint "image_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["image_id"], name: "index_abouts_on_image_id"
  end

  create_table "banners", force: :cascade do |t|
    t.string "title"
    t.string "subtitle"
    t.string "body"
    t.string "caption"
    t.boolean "status", default: true
    t.bigint "image_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["image_id"], name: "index_banners_on_image_id"
  end

  create_table "contacts", force: :cascade do |t|
    t.string "title"
    t.string "email"
    t.string "mobile"
    t.string "address"
    t.integer "zoom"
    t.decimal "lat"
    t.decimal "lng"
    t.boolean "status", default: true
    t.bigint "image_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["image_id"], name: "index_contacts_on_image_id"
  end

  create_table "images", force: :cascade do |t|
    t.string "location"
    t.string "key"
    t.string "bucket"
    t.boolean "status", default: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "products", force: :cascade do |t|
    t.string "title"
    t.string "text"
    t.boolean "status", default: true
    t.bigint "image_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["image_id"], name: "index_products_on_image_id"
  end

  create_table "social_networks", force: :cascade do |t|
    t.string "name"
    t.string "href"
    t.string "src"
    t.boolean "status", default: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.string "token"
    t.string "auth_token"
    t.integer "status", default: 3
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "abouts", "images"
  add_foreign_key "banners", "images"
  add_foreign_key "contacts", "images"
  add_foreign_key "products", "images"
end
