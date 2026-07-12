# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_07_11_000001) do
  create_table "beds", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.decimal "depth"
    t.string "emoji"
    t.text "extra_plant_ids", default: "[]"
    t.decimal "height"
    t.string "material"
    t.string "name"
    t.integer "plant_id"
    t.integer "rotation", default: 0
    t.datetime "updated_at", null: false
    t.decimal "width"
    t.decimal "x"
    t.decimal "y"
    t.integer "yard_id", null: false
    t.index ["plant_id"], name: "index_beds_on_plant_id"
    t.index ["yard_id"], name: "index_beds_on_yard_id"
  end

  create_table "magic_links", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email", null: false
    t.datetime "expires_at", null: false
    t.string "token", null: false
    t.datetime "updated_at", null: false
    t.datetime "used_at"
    t.index ["token"], name: "index_magic_links_on_token", unique: true
  end

  create_table "plant_companions", force: :cascade do |t|
    t.integer "companion_id", null: false
    t.datetime "created_at", null: false
    t.text "notes"
    t.integer "plant_id", null: false
    t.string "relationship"
    t.datetime "updated_at", null: false
    t.index ["companion_id"], name: "index_plant_companions_on_companion_id"
    t.index ["plant_id"], name: "index_plant_companions_on_plant_id"
  end

  create_table "plants", force: :cascade do |t|
    t.string "attracts"
    t.string "category"
    t.datetime "created_at", null: false
    t.integer "days_to_harvest"
    t.boolean "deer_resistant"
    t.string "emoji"
    t.string "name"
    t.text "native_notes"
    t.string "season"
    t.decimal "spacing_ft"
    t.string "sun"
    t.datetime "updated_at", null: false
    t.string "water_needs"
    t.string "zone_max"
    t.string "zone_min"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  create_table "yards", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "hardiness_zone"
    t.decimal "height"
    t.string "name"
    t.json "obstacles", default: [], null: false
    t.string "token", null: false
    t.string "unit", default: "ft"
    t.datetime "updated_at", null: false
    t.integer "user_id"
    t.decimal "width"
    t.index ["token"], name: "index_yards_on_token", unique: true
    t.index ["user_id"], name: "index_yards_on_user_id"
  end

  add_foreign_key "beds", "plants"
  add_foreign_key "beds", "yards"
  add_foreign_key "plant_companions", "plants"
  add_foreign_key "plant_companions", "plants", column: "companion_id"
  add_foreign_key "yards", "users"
end
