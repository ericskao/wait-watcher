module Types
  class DayType < Types::BaseObject
    field :id, ID, null: false
    field :weight, Float, null: true
    field :note, String, null: true
    field :date, String, null: false
  end
end
