module Types
  class QueryType < Types::BaseObject
    field :day, Types::DayType, null: true, description: 'Get a Day by date' do
      argument :date, String, required: false, description: 'Date (string)'
    end

    field :days, [Types::DayType], null: false, description: 'Get range of days' do
      argument :start_date, String, required: false, description: 'Range start'
      argument :end_date, String, required: false, description: 'Range end date'
    end

    def day(date: nil)
      Day.find_by(date: date || Date.today)
    end

    def days(start_date: nil, end_date: nil)
      Day.where(date: start_date..end_date)
    end
  end
end
