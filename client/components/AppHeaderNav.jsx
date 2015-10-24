AppHeaderNav = React.createClass({
  getInitialState() {
    return {
      hidden: false,
      isLogin: Meteor.userId()
    };
  },
  renderName: function() {
    var className = "app-head",
        f = this.state.isLoin,
        s = { __html: '' };
    if (f) {
      s.__html = Meteor.users.username + "，欢迎您"
      className += " s-login";
    }
    return (
      <span className={ className } dangerouslySetInnerHTML={ s }>
      </span>
    );
  },
  renderHeading: function() {
    return (
    <h4 className="app-head-container">
      { this.renderName() }
      <ul className="app-head-nav">
        <li>计划</li>
        <li>任务</li>
        <li>查看</li>
        <li>退出</li>
        <li>
          <i onClick={ this.toggleSwitch } className="fa-arrow-circle-up fa-head-hide"></i>
        </li>
      </ul>
    </h4>
   );
  },
  renderLogo: function() {
    return (
      <i onClick={ this.toggleSwitch } className="fa-arrow-circle-down fa-head-show"></i>
    );
  },
  toggleSwitch: function(event) {
    event.preventDefault();
    var s = this.state.hidden;
    this.setState({ hidden: !s });
  },
  render: function() {
    return !this.state.hidden? this.renderHeading(): this.renderLogo();
  }
});
