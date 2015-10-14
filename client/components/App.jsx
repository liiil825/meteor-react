App = React.createClass({
  render: function () {
    let appBodyClass = '';

    return (
      <div id='container' className={ appBodyClass }>
        <h1>Meteor-React</h1>
        <div>
          {/* This is where our view components will be rendered */}
          { this.props.children }
        </div>
      </div>
    );
  }
});

