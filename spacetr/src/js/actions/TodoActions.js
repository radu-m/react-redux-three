var TodoDispatcher = require('../dispatcher/TodoDispatcher');
var TodoConstants = require('../constants/TodoConstants');

var TodoActions = {
  deleteTodo: function(id) {
    TodoDispatcher.handleViewAction({
      actionType: TodoConstants.DELETE,
      id: id,
    });
  },

  editTodo: function(todo) {
    TodoDispatcher.handleViewAction({
      actionType: TodoConstants.EDIT,
      todo: todo,
    });
  },
  createTodo: function(todo) {
    TodoDispatcher.handleViewAction({
      actionType: TodoConstants.CREATE,
      todo: todo,
    });
  },
};

module.exports = TodoActions;
