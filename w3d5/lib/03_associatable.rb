require_relative '02_searchable'
require 'active_support/inflector'
require 'byebug'

# Phase IIIa
class AssocOptions
  attr_accessor(
    :foreign_key,
    :class_name,
    :primary_key
  )

  def model_class
    self.class_name.constantize
  end

  def table_name
    model_class.table_name
  end
end

class BelongsToOptions < AssocOptions

  def initialize(name, options = {})
    default = {
      foreign_key: "#{name}_id".to_sym,
      class_name: name.to_s.camelcase,
      primary_key: :id
    }

    default.keys.each do |key|
      self.send("#{key}=", options[key] || default[key])
    end
  end
end

class HasManyOptions < AssocOptions

  def initialize(name, self_class_name, options = {})
    default = {
      foreign_key: "#{self_class_name.underscore}_id".to_sym,
      class_name: name.to_s.singularize.camelcase,
      primary_key: :id
    }

    default.keys.each do |key|
      self.send("#{key}=", options[key] || default[key])
    end
  end
end

module Associatable
  # Phase IIIb
  def belongs_to(name, options = {})
    options = BelongsToOptions.new(name, options)

    define_method(name) do
      key_val = self.send(options.foreign_key)
      primary_key = options.primary_key
      options.model_class.where(primary_key => key_val).first
    end
  end

  def has_many(name, options = {})
    options = HasManyOptions.new(name, self.name, options)

    define_method(name) do
      key_val = self.send(options.primary_key)
      foreign_key = options.foreign_key
      options.model_class.where(foreign_key => key_val)
    end
  end

  def assoc_options
    # Wait to implement this in Phase IVa. Modify `belongs_to`, too.
  end
end

class SQLObject
  extend Associatable
end
