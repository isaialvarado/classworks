require 'byebug'

class PolyTreeNode
  attr_reader :parent, :children, :value

  def initialize(value)
    @value = value
    @parent = nil
    @children = []
  end

  def parent=(parent_node)
    if parent_node.nil?
      @parent = nil
    else
      @parent.children.delete(self) if @parent
      @parent = parent_node
      parent_node.children << self
    end
  end

  def add_child(child_node)
    child_node.parent = self
  end

  def remove_child(child_node)
    raise "Node not a child" unless @children.include?(child_node)
    child_node.parent = nil
  end

  def dfs(target_value)
    return self if self.value == target_value

    self.children.each do |child|

      found = child.dfs(target_value)
      return found unless found.nil?
    end
    nil
  end

  def bfs(target_value)
    queue = [self]

    until queue.empty?
      test_node = queue.shift

      return test_node if test_node.value == target_value
      
      test_node.children.each do |child|
        # return child if child.value == target_value
        queue << child
      end
    end

    nil
  end


end
