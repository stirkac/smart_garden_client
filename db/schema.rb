# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150630093319) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "devices", force: true do |t|
    t.string   "api_location"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "grows", force: true do |t|
    t.integer  "user_id"
    t.string   "api_location"
    t.date     "start"
    t.date     "end"
    t.string   "name"
    t.text     "description"
    t.float    "temp_low"
    t.float    "temp_high"
    t.float    "hum_low"
    t.float    "hum_high"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "allow_sharing"
  end

  add_index "grows", ["user_id"], name: "index_grows_on_user_id", using: :btree

  create_table "notifications", force: true do |t|
    t.integer  "grow_id"
    t.text     "content"
    t.boolean  "dismissed"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "status_id"
    t.integer  "schedule_id"
  end

  add_index "notifications", ["grow_id"], name: "index_notifications_on_grow_id", using: :btree
  add_index "notifications", ["schedule_id"], name: "index_notifications_on_schedule_id", using: :btree
  add_index "notifications", ["status_id"], name: "index_notifications_on_status_id", using: :btree

  create_table "schedules", force: true do |t|
    t.integer  "grow_id"
    t.datetime "time"
    t.text     "title"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "schedules", ["grow_id"], name: "index_schedules_on_grow_id", using: :btree

  create_table "statuses", force: true do |t|
    t.float    "temperature"
    t.float    "humidity"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true, using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
