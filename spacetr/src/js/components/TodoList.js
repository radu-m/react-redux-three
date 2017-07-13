var React = require('react');
var TodoActions = require('../actions/TodoActions');
var TodoStore = require('../stores/TodoStore');
var Todo = require('./Todo');

function getTodoListState() {
  var todos = TodoStore.getAll();
  todos.sort((a, b) => {
    return a.created_date - b.created_date;
  });
  return { todos: todos };
}

var TodoList = React.createClass({
  getInitialState: function() {
    return getTodoListState();
  },

  componentDidMount: function() {
    TodoStore.addChangeListener(this._onChange);
  },

  componentUnmount: function() {
    TodoStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div className="todo-list">
        <h1>Todo List</h1>
        <div>
          <ul>
            {this.state.todos.map(todo => {
              return <Todo todo={todo} />;
            })}
          </ul>
          <div className="row new-todo-area">
            <input className="col-md-8" type="text" ref="todoText" />
            <button
              type="button"
              className="col-md-4 btn btn-success save-todo-button"
              onClick={event => {
                if (this.refs.todoText.value !== '') {
                  TodoActions.createTodo({
                    todo: this.refs.todoText.value,
                  });
                }
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  },

  // Update view state when change is received
  _onChange: function() {
    this.setState(getTodoListState());
  },
});

module.exports = TodoList;
