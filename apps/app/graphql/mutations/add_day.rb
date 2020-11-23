module Mutations
  class AddDay < BaseMutation
    argument :weight, Float, required: true
    argument :note, String, required: false

    type Types::DayType

    def resolve(weight: weight, note: note)
      Day.create!(weight: weight, note: note)
    end
  end
end