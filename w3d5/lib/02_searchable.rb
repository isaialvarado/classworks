require_relative 'db_connection'
require_relative '01_sql_object'

module Searchable
  def where(params)
    if params.is_a?(Hash)
      where_line = params.keys.map { |key| "#{key} = ?" }.join(" AND ")
      attribute_values = params.values
    else
      where_line = params
      attribute_values = []
    end

    results = DBConnection.execute(<<-SQL, attribute_values)
      SELECT
        *
      FROM
        #{table_name}
      WHERE
        #{where_line}
    SQL

    parse_all(results)
  end
end

class SQLObject
  extend Searchable
end
