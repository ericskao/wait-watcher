# == Schema Information
#
# Table name: days
#
#  id         :bigint           not null, primary key
#  date       :date
#  note       :text
#  weight     :float
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Day < ApplicationRecord
end
