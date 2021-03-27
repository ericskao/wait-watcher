module Mutations
  class AddDay < BaseMutation
    argument :weight, Float, required: true
    argument :note, String, required: false
    argument :date, String, required: true
    argument :sleep_rating, Integer, required: false
    argument :itch_rating, Integer, required: false
    argument :antihistamine, Boolean, required: false
    argument :bone_broth, Boolean, required: false
    argument :multivitamin, Boolean, required: false
    argument :vitamin_d, Boolean, required: false
    argument :fish_oil, Boolean, required: false
    argument :probiotic, Boolean, required: false
    argument :collagen, Boolean, required: false
    argument :exercise, Boolean, required: false
    argument :moisturized, Boolean, required: false
    argument :hemp_oil, Boolean, required: false
    argument :coffee, Boolean, required: false
    argument :alcohol, Boolean, required: false


    type Types::DayType

      def resolve(weight:, note:, date:, antihistamine: antihistamine, sleep_rating: sleep_rating, itch_rating: itch_rating, bone_broth: bone_broth, multivitamin: multivitamin, vitamin_d: vitamin_d, fish_oil: fish_oil, probiotic: probiotic, collagen: collagen, exercise: exercise, moisturized: moisturized, hemp_oil: hemp_oil, coffee: coffee, alcohol: alcohol)
      existing_record = Day.find_by(date: date.to_date)
      if existing_record
        existing_record.update(weight: weight, note: note, antihistamine: antihistamine, sleep_rating: sleep_rating, itch_rating: itch_rating, bone_broth: bone_broth, multivitamin: multivitamin, vitamin_d: vitamin_d, fish_oil: fish_oil, probiotic: probiotic, collagen: collagen, exercise: exercise, moisturized: moisturized, hemp_oil: hemp_oil, coffee: coffee, alcohol: alcohol)
        existing_record

        existing_record
      else
        Day.create!(weight: weight, note: note, date: date.to_date, antihistamine: antihistamine,sleep_rating: sleep_rating, itch_rating: itch_rating, bone_broth: bone_broth, multivitamin: multivitamin, vitamin_d: vitamin_d, fish_oil: fish_oil, probiotic: probiotic, collagen: collagen, exercise: exercise, moisturized: moisturized, hemp_oil: hemp_oil, coffee: coffee, alcohol: alcohol)
      end
    end
  end
end
