module Types
  class DayType < Types::BaseObject
    field :id, ID, null: false
    field :weight, Float, null: true
    field :note, String, null: true
    field :date, String, null: false
    field :antihistamine, Boolean, null: true
    # field :itch_rating, Number, null: true
    # field :sleep_rating, Number, null: true
  end
end
