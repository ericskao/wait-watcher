require 'test_helper'

class Mutations::AddDayTest < ActiveSupport::TestCase
  def perform(user: nil, **args)
    Mutations::AddDay.new(object:nil, field:nil, context: {}).resolve(args)
  end

  test 'add a new day' do
    day = perform(weight: 150.0, note: 'Today\'s weight')

    assert day.persisted?
    assert_equal day.weight, 150.0
    assert_equal day.note, 'Today\'s weight'
  end
end
