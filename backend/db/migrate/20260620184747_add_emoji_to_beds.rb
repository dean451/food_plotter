class AddEmojiToBeds < ActiveRecord::Migration[8.1]
  def change
    add_column :beds, :emoji, :string
  end
end
