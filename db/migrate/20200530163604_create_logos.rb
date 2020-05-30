class CreateLogos < ActiveRecord::Migration[6.0]
  def change
    create_table :logos do |t|
      t.string :text
      t.boolean :status, default: true
      t.references :image, null: false, foreign_key: true

      t.timestamps
    end
  end
end
