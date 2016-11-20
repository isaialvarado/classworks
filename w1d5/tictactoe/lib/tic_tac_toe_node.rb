require_relative 'tic_tac_toe'

class TicTacToeNode
  def initialize(board, next_mover_mark, prev_move_pos = nil)
    @current_board = board
    @next_mover_mark = next_mover_mark
    @prev_move_pos = prev_move_pos
  end

  def losing_node?(evaluator)
    if @current_board.over? && @current_board.winner != evaluator
      return true
    end

    if @current_board.over? && @current_board.winner? == nil || evaluator
      return false
    end

    until @current_board.over?

    end

  end

  def winning_node?(evaluator)
  end

  # This method generates an array of all moves that can be made after
  # the current move.
  def children
    empty_positions = create_empty_positions

    empty_positions.each do |empty_position|
      next_board = @current_board[empty_position] = next_mover_mark
      next_mark = @next_mover_mark == :x ? :o : :x
      TicTacToeNode.new(next_board.dup, next_mark, @next_mover_mark)
      # call soemthing here like loser_mark?
    end
  end

  def create_empty_positions
    empty_positions = []

    @current_board.each_with_index do |row, index1|
      row.each_with_index do |col, index2|
        if @current_board.empty?([index1, index2])
          empty_positions << [index1, index2]
        end
      end
    end
    empty_positions
  end

end
