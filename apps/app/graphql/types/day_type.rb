module Types
  class DayType < Types::BaseObject
    field :id, ID, null: false
    field :weight, Float, null: false
    field :note, String, null: false
  end
end
