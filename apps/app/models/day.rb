# == Schema Information
#
# Table name: days
#
#  id            :bigint           not null, primary key
#  alcohol       :boolean
#  antihistamine :boolean
#  bone_broth    :boolean
#  coffee        :boolean
#  collagen      :boolean
#  date          :date
#  exercise      :boolean
#  fish_oil      :boolean
#  hemp_oil      :boolean
#  itch_rating   :integer
#  moisturized   :boolean
#  multivitamin  :boolean
#  note          :text
#  probiotic     :boolean
#  sleep_rating  :integer
#  vitamin_d     :boolean
#  weight        :float
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class Day < ApplicationRecord
end
