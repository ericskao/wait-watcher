module Mutations
  class AddDay < BaseMutation
    argument :weight, Float, required: true
    argument :note, String, required: false
    argument :date, String, required: true

    type Types::DayType

    def resolve(weight:, note:, date:)
      existing_record = Day.find_by(date: date.to_date)
      if existing_record
        existing_record.update(weight: weight, note: note)
        existing_record
      else
        Day.create!(weight: weight, note: note, date: date.to_date)
      end
    end
  end
end
