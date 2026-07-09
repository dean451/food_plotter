class AddTokenToYards < ActiveRecord::Migration[8.1]
  def up
    add_column :yards, :token, :string
    Yard.find_each { |y| y.update_columns(token: SecureRandom.hex(8)) }
    change_column_null :yards, :token, false
    add_index :yards, :token, unique: true
  end

  def down
    remove_index :yards, :token
    remove_column :yards, :token
  end
end
