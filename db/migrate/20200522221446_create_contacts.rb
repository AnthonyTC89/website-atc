class CreateContacts < ActiveRecord::Migration[6.0]
  def change
    create_table :contacts do |t|
      t.string :title
      t.string :email
      t.string :mobile
      t.string :address
      t.integer :zoom
      t.decimal :lat
      t.decimal :lng
      t.boolean :status, default: true
      t.references :image, null: false, foreign_key: true

      t.timestamps
    end
  end
end
