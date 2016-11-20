require_relative 'polytreenode'
require 'byebug'

class KnightPathFinder

  MOVES = [
    [-2, -1], [-2, 1], [-1, 2], [1, 2],
    [2, 1], [2, -1], [1, -2], [-1, -2]
  ]

  def self.valid_moves(pos)
    x, y = pos
    valid = []

    MOVES.each do |xmove, ymove|
      x_new = x + xmove
      y_new = y + ymove
      next if x_new < 0 || x_new > 7
      next if y_new < 0 || y_new > 7

      valid << [x_new, y_new]
    end

    valid
  end

  attr_reader :visited, :root

  def initialize(start_pos)
    @start_pos = start_pos
    @visited = [start_pos]
  end

  def new_move_positions(pos)
    moves = KnightPathFinder.valid_moves(pos)

    valid_moves = moves.reject { |move| @visited.include?(move) }

    @visited += valid_moves

    valid_moves
  end

  def build_move_tree
    tree_base = PolyTreeNode.new(@start_pos)
    @root = tree_base

    queue = [tree_base]

    until queue.empty?
      current_node = queue.shift
      current_position = current_node.value
      child_positions = new_move_positions(current_position)

      child_positions.each do |child_position|
        child = PolyTreeNode.new(child_position)
        current_node.add_child(child)
        queue << child
      end
    end
  end

  def find_path(end_pos)
    final_node = @root.dfs(end_pos)
    trace_path_back(final_node)
  end

  def trace_path_back(final_node)
    queue = [final_node]
    current_node = final_node
    path = []
    # debugger
    until current_node == @root
      current_node = queue.shift
      path.unshift(current_node.value)
      queue << current_node.parent
    end
    path
  end

end
