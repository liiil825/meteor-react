App = React.createClass({
  getInitialState: function() {
      return {};
  },
  render: function () {
    return (
      <div>
        <h1>Meteor-React Demo</h1>
        <div>
          {/* This is where our view components will be rendered */}
          { this.props.children }
        </div>
      </div>
    );
  }
});

