TodoNewItem = React.createClass({
  onSubmit: function(event) {
    event.preventDefault();
    var input = event.target.planNew,
        plan = {
          name: input.value.trim()
        };
    if (plan.name) {
      Meteor.call('/plans/new', plan, function(err) {
        if (err) console.log(err);
      });
    }
    input.value = "";
  },
  render: function() {
    return (
      <div className="plan-new-container">
        <form className="form-new-plan" onSubmit={ this.onSubmit }>
          <input id="planNew" name="planNew" className="input-plan-new" type="text" placeholder="输入计划名称" />
          <ul className="plan-new-icons l-show">
            <li>
              <input id="checkPlanNew" name="inputType" className="l-hidden" type="radio" value="0" onChange={ this.onChange } className="plan-new" />
              <label htmlFor="checkPlanNew">
                <i className="fa-plus-circle"></i>
              </label>
            </li>
          </ul>
        </form>
      </div>
    );
  }
});
