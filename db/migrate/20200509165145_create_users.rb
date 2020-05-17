class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      t.string :password_digest
      t.string :token
      t.string :auth_token
      t.integer :status, default: 3

      t.timestamps
    end
  end
end
