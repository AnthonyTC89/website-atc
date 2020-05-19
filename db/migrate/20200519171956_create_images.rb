class CreateImages < ActiveRecord::Migration[6.0]
  def change
    create_table :images do |t|
      t.string :location
      t.string :key
      t.string :bucket
      t.boolean :status, default: true

      t.timestamps
    end
  end
end
