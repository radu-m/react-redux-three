var TodoDispatcher = require('../dispatcher/TodoDispatcher');
var TodoConstants = require('../constants/TodoConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var TodoAPI = require('../utils/TodoAPI.js');

var CHANGE_EVENT = 'change';
const URL = '/todo';
const TYPE = 'todo';

var _todos;

var TodoStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  getAll: function() {
    if (!_todos) {
      this.loadAllTodos();
      return [];
    }
    return _todos;
  },
  deleteTodo: function(id) {
    $.ajax({
      url: URL + '/' + id,
      type: 'DELETE',
      success: () => {
        _todos = _todos.filter(t => {
          return t.id !== id;
        });

        this.emitChange();
      },
    });
  },
  editTodo: function(todo) {
    $.ajax({
      url: URL + '/' + todo.id,
      type: 'PUT',
      data: todo,
      success: () => {
        for (var i = 0; i < _todos.length; i++) {
          if (todo.id === _todos[i].id) {
            _todos[i] = todo;
            break;
          }
        }

        this.emitChange();
      },
    });
  },

  createTodo: function(todo) {
    todo.type = TYPE;
    todo.checked = false;
    todo.created_date = new Date().getTime();

    $.ajax({
      url: URL,
      type: 'POST',
      data: todo,
      success: (d, s, re) => {
        todo.id = re.getResponseHeader('Location');
        _todos.push(todo);

        this.emitChange();
      },
    });
  },

  loadAllTodos: function() {
    $.ajax({
      url: URL,
      type: 'GET',
      success: todos => {
        _todos = todos;
        this.emitChange();
      },
    });
  },
});

TodoDispatcher.register(function(payload) {
  var action = payload.action;

  switch (action.actionType) {
    case TodoConstants.DELETE:
      TodoStore.deleteTodo(action.id);
      break;
    case TodoConstants.EDIT:
      TodoStore.editTodo(action.todo);
      break;
    case TodoConstants.CREATE:
      TodoStore.createTodo(action.todo);
      break;
    default:
      break;
  }

  return true;
});

module.exports = TodoStore;
