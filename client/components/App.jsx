App = React.createClass({
  render: function () {
    var appBodyClass = '';
      // <div id='container' className={ appBodyClass }>
      //     { this.props.children }
      // </div>

    return this.props.children;
  }
});

