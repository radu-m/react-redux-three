var React = require('react');
var TodoActions = require('../actions/TodoActions');

var Todo = React.createClass({
  render: function() {
    var liClassName = 'row';
    return (
      <li className="row todo-item">
        <input
          className="col-md-2"
          type="checkbox"
          // Stupid ajax converts boolean to string
          checked={this.props.todo.checked === 'true'}
          onChange={event => {
            this.props.todo.checked =
              this.props.todo.checked === 'true' ? 'false' : 'true';
            TodoActions.editTodo(this.props.todo);
          }}
        />
        <h3 className="col-md-8">
          {this.props.todo.todo}
        </h3>
        <button
          type="button"
          className="col-md-2"
          className="btn btn-danger"
          onClick={event => TodoActions.deleteTodo(this.props.todo.id)}
        >
          Delete
        </button>
      </li>
    );
  },
});

module.exports = Todo;
