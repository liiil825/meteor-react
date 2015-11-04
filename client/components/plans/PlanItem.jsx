injectTapEventPlugin();

var {
  AppCanvas,
  AppBar,
  Styles,
  RaisedButton,
  DatePicker
} = MUI;
var { ThemeManager, LightRawTheme } = Styles;

PlanItem = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager(LightRawTheme)
    };
  },

  getInitialState: function() {
    return {
      isEditing: false,
      onFoucs: 0,
      headEdit: false,
      describeEdit: false
    };
  },
  propTypes: {
    an: React.PropTypes.object,
    index: React.PropTypes.number,
    colors: React.PropTypes.array
  },
  toggleHeaderEdit: function(event) {
    var isHeadEdit = !this.state.headEdit;
    this.setState({'headEdit': isHeadEdit });
    if (! isHeadEdit) {
      this.props.plan.name = this.refs.txtHeader.getDOMNode().value;
    }
  },
  toggleDescEdit: function(event) {
    var isDescEdit = !this.state.describeEdit;
    this.setState({'describeEdit': isDescEdit });
    if (! isDescEdit ) {
      this.props.plan.describe = this.refs.txtDesc.getDOMNode().value;
    }
  },
  renderHeader: function() {
    var headClass = "",
        inputClass = "",
        input = "";
    if (this.state.headEdit) {
      headClass = "l-hidden";
      // input = this.refs.txtHeader.getDOMNode();
      // input.focus();
      // input.setSelectionRange(0, input.value.length);
    } else inputClass = "l-hidden";
    return (
      <h3>
          <span className={ headClass }>{ this.props.plan.name }</span>
          <i onClick={ this.toggleHeaderEdit } className={ "fa-edit " + headClass }></i>
          <input ref="txtHeader" name="name" className={ inputClass } onBlur={ this.toggleHeaderEdit } type="text" defaultValue={ this.props.plan.name }/>
      </h3>
    );
  },
  renderItemTabs: function(array) {
    if (!array || array.length == 0) return null;
    var colors = this.props.colors;
    var result = array.map(function(item, i) {
        return (
          <span className={ colors[i%colors.length] }>{item.name}</span>

        );
      }.bind(this));
    return result;
  },
  renderItemDescibe: function() {
    if (!this.state.isEditing) return;

    var txtDescClass = "l-hidden",
        labelClass = "l-hidden";
    if (this.state.describeEdit) {
      txtDescClass = "";
    } else
      labelClass = "";
    return (
      <div>
        <h4>计划描述<i onClick={ this.toggleDescEdit } className="fa-edit"></i></h4>
        <label className={labelClass}>
          { this.props.plan.describe }
        </label>
        <textarea ref="txtDesc" name="describe" onBlur={ this.toggleDescEdit } className={txtDescClass} defaultValue={ this.props.plan.describe }></textarea>
      </div>
    );
  },
  componentDidUpdate: function() {
    if (this.state.headEdit) {
      input = this.refs.txtHeader.getDOMNode();
      input.focus();
      input.setSelectionRange(0, input.value.length);
    }
    if (this.state.describeEdit) {
      txtDescClass = "";
      textarea = this.refs.txtDesc.getDOMNode();
      textarea.focus();
      textarea.setSelectionRange(0, textarea.value.length);
    }
  },
  renderItemTimes: function() {
    var isEditing = this.state.isEditing;
    function renderTime(time, name) {
      return isEditing
              // ? <input type="date" name={ name } defaultValue={ time } />
              ? <DatePicker name={ name } hintText={ time } defaultValue={ time } mode="landscape" />
              : <label>{ time }</label>;
    }
    return (
      <p className="plan-item-times">
        <sub className="font-small">
          开始时间
          { renderTime(this.props.plan.startAt, "startAt") }
        </sub>
      </p>
    );
  },
  renderItenButtons: function() {
    if ( this.state.isEditing ) {
      // <button className="btn-right">加入任务</button>
      return (
        <p className="plan-item-buttons">
          <button type="submit" className="btn-left">提交</button>
          <button type="button" onClick={ this.handleRemove } className="btn-right">删除</button>
        </p>
      );
    }
  },
  handleRemove: function(event) {
    Meteor.call('/plans/del', this.props.plan._id);
  },
  handleClick: function(event) {
    this.setState({ isEditing: true });
  },
  onSubmit: function(event) {
    event.preventDefault();
    var form = event.target;
    this.props.plan.describe = form.describe.value;
    this.props.plan.startAt = form.startAt.value;
    Meteor.call('/plans/reset', this.props.plan, function(err){
      if (err)  console.log('err ' + id);
      this.setState({ isEditing: false });
    }.bind(this));
  },
  render: function() {
    var className = "plan-item l-",
        colors = this.props.colors,
        index = this.props.index;
    if ( colors && colors.length > 0)
      className += " " + colors[index % colors.length ];
    return (
      <li className={ className } onClick={ this.handleClick } >
        <form onSubmit={ this.onSubmit }>
          { this.renderHeader() }
          { this.renderItemTabs( this.props.plan.types ) }
          { this.renderItemDescibe() }
          { this.renderItemTimes() }
          { this.renderItenButtons() }
        </form>
      </li>
    );
  }
});

