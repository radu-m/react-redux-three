var React = require('react');
var TodoList = require('./TodoList');

var App = React.createClass({
  render: function() {
    return (
      <div>
        <TodoList />
      </div>
    );
  },
});

module.exports = App;
