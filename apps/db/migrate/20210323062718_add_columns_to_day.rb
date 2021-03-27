class AddColumnsToDay < ActiveRecord::Migration[5.2]
  def change
    add_column :days, :sleep_rating, :integer
    add_column :days, :itch_rating, :integer
    add_column :days, :antihistamine, :boolean
    add_column :days, :bone_broth, :boolean
    add_column :days, :multivitamin, :boolean
    add_column :days, :vitamin_d, :boolean
    add_column :days, :fish_oil, :boolean
    add_column :days, :probiotic, :boolean
    add_column :days, :collagen, :boolean
    add_column :days, :exercise, :boolean
    add_column :days, :moisturized, :boolean
    add_column :days, :hemp_oil, :boolean
    add_column :days, :coffee, :boolean
    add_column :days, :alcohol, :boolean
  end
end
