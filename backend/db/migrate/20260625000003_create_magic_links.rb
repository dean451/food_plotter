class CreateMagicLinks < ActiveRecord::Migration[8.1]
  def change
    create_table :magic_links do |t|
      t.string :token, null: false
      t.string :email, null: false
      t.datetime :expires_at, null: false
      t.datetime :used_at
      t.timestamps
    end
    add_index :magic_links, :token, unique: true
  end
end
