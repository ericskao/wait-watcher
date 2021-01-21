module Mutations
  class AddDay < BaseMutation
    argument :weight, Float, required: true
    argument :note, String, required: false
    # argument :date, String, required: true

    type Types::DayType

    def resolve(weight: weight, note: note)
      Day.create!(weight: weight, note: note)
    end
  end
end