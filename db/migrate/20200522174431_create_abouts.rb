class CreateAbouts < ActiveRecord::Migration[6.0]
  def change
    create_table :abouts do |t|
      t.string :title
      t.string :text
      t.boolean :status, default: true
      t.references :image, null: false, foreign_key: true

      t.timestamps
    end
  end
end
