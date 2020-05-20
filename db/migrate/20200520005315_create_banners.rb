class CreateBanners < ActiveRecord::Migration[6.0]
  def change
    create_table :banners do |t|
      t.string :title
      t.string :subtitle
      t.string :body
      t.string :caption
      t.boolean :status, default: true
      t.references :image, null: false, foreign_key: true

      t.timestamps
    end
  end
end
