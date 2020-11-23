module Types
  class MutationType < Types::BaseObject
    field :add_day, mutation: Mutations::AddDay
  end
end
