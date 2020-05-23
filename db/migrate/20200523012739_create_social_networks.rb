class CreateSocialNetworks < ActiveRecord::Migration[6.0]
  def change
    create_table :social_networks do |t|
      t.string :name
      t.string :href
      t.string :src
      t.boolean :status, default: true

      t.timestamps
    end
  end
end
