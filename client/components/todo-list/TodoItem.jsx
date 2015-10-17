TodoItem = React.createClass({
  getInitialState() {
    return {
      isOpenOrEdit: false,
      onFoucs: 0,
      headEdit: false,
      describeEdit: false
    };
  },
  propTypes: {
    plan: React.PropTypes.object,
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
      input = this.refs.txtHeader.getDOMNode();
      input.focus();
      input.setSelectionRange(0, input.value.length);
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
    if (!this.state.isOpenOrEdit) return;

    var txtDescClass = "l-hidden",
        labelClass = "l-hidden";
    if (this.state.describeEdit) {
      txtDescClass = "";
      textarea = this.refs.txtDesc.getDOMNode();
      textarea.focus();
      textarea.setSelectionRange(0, textarea.value.length);
    } else
      labelClass = "";
    return (
      <div>
        <h4>计划描述<i onClick={ this.toggleDescEdit } className="fa-edit"></i></h4>
        <label className={labelClass}>
          { this.props.plan.describe }
        </label>
        <textarea ref="txtDesc" name="describe" onBlur={ this.toggleDescEdit } className={txtDescClass} value={ this.props.plan.describe }></textarea>
      </div>
    );
  },
  renderItemTimes: function() {
    var isOpenOrEdit = this.state.isOpenOrEdit;
    function renderTime(time, name) {
      return isOpenOrEdit
              ? <input type="datetime-local" name={ name } defaultValue={ time } />
              : <label>{ time }</label>;
    }
    return (
      <p className="plan-item-times">
        <sub className="font-small">
          开始时间
          { renderTime(this.props.plan.startAt, "startAt") }
        </sub>
        <sub className="font-small">
          结束时间
          { renderTime(this.props.plan.endAt, "endAt") }
        </sub>
      </p>
    );
  },
  renderItenButtons: function() {
    if ( this.state.isOpenOrEdit ) {
      // <button className="btn-right">加入任务</button>
      return (
        <p className="plan-item-buttons">
          <button type="submit" className="btn-left">完成</button>
        </p>
      );
    }
  },
  onFocus: function(event) {
    this.setState({ isOpenOrEdit: true });
    this.state.onFoucs++;
  },
  onSubmit: function(event) {
    event.preventDefault();
    var form = event.target;
    console.dir(form);
    this.props.plan.describe = form.describe.value;
    this.props.plan.startAt = form.startAt.value;
    this.props.plan.endAt = form.endAt.value;
    Meteor.call('/plans/update', this.props.plan, function(err){
      if (err)  console.log('err ' + id);
    });
  },
  render: function() {
    var className = "plan-item",
        colors = this.props.colors,
        index = this.props.index;
    if ( colors && colors.length > 0)
      className += " " + colors[index % colors.length ];
    return (
      <li className={ className } onClick={ this.onFocus }>
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
