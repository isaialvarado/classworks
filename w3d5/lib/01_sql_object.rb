require_relative 'db_connection'
require 'active_support/inflector'
# NB: the attr_accessor we wrote in phase 0 is NOT used in the rest
# of this project. It was only a warm up.

class SQLObject

  def self.columns
    return @column_names if @column_names

    table = DBConnection.execute2(<<-SQL)
      SELECT
        *
      FROM
        #{table_name}
    SQL

    @column_names = table.first.map(&:to_sym)
  end

  def self.finalize!
    columns.each do |col_name|
      define_method(col_name) do
        self.attributes[col_name]
      end

      define_method("#{col_name}=") do |value|
        self.attributes[col_name] = value
      end
    end
  end

  def self.table_name=(table_name)
    @table_name = table_name
  end

  def self.table_name
    @table_name || self.to_s.tableize
  end

  def self.all
    rows = DBConnection.execute(<<-SQL)
      SELECT
        *
      FROM
        #{table_name}
    SQL

    parse_all(rows)
  end

  def self.parse_all(results)
    results.map { |row| self.new(row) }
  end

  def self.find(id)
    row = DBConnection.execute(<<-SQL, id)
      SELECT
        *
      FROM
        #{table_name}
      WHERE
        id = ?
      LIMIT
        1
    SQL
    return nil if row.empty?

    self.new(row.first)
  end

  def initialize(params = {})
    params.each do |attr_name, value|
      attr_name = attr_name.to_sym

      unless self.class.columns.include?(attr_name)
        raise "unknown attribute '#{attr_name}'"
      end

      send("#{attr_name}=", value)
    end
  end

  def attributes
    @attributes ||= {}
  end

  def attribute_values
    self.class.columns.map { |col_name| send(col_name) }
  end

  def insert
    col_names_array = self.class.columns
    col_names = col_names_array.join(", ")
    question_marks = (["?"] * col_names_array.size).join(", ")

    DBConnection.execute(<<-SQL, attribute_values)
      INSERT INTO
        #{self.class.table_name} (#{col_names})
      VALUES
        (#{question_marks})
    SQL

    self.id = DBConnection.last_insert_row_id
  end

  def update
    col_names_array = self.class.columns.drop(1)
    set_string = col_names_array.map { |col_name| "#{col_name} = ?" }.join(", ")
    attribute_values = self.attribute_values.rotate

    DBConnection.execute(<<-SQL, attribute_values)
      UPDATE
        #{self.class.table_name}
      SET
        #{set_string}
      WHERE
        id = ?
    SQL
  end

  def save
    if self.id
      update
    else
      insert
    end
  end
end
