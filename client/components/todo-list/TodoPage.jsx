const {
  History
} = ReactRouter;

TodoPage = React.createClass({
  mixins: [ReactMeteorData, History],
  getMeteorData: function() {
    Meteor.subscribe('plans');
    return {
      plans: PlansCollection.find({}).fetch()
    };
  },
  renderItem: function() {
    var colorClass = ["bgc-bright1", "bgc-bright2", "bgc-bright3", "bgc-bright4", "bgc-bright5", "bgc-bright6", ];
    return this.data.plans.map(function(plan, i) {
      return <TodoItem plan={ plan } colors={ colorClass } index={ i } />
    });
  },
  closeItem: function(event) {
    event.preventDefault();
  },
  render: function() {
    return (
      <div className="page-container" onClick={ this.closeItem }>
        <AppHeaderNav />
        <TodoNewItem />
        <ul className="page-plan-items l-list">
          { this.renderItem() }
        </ul>
      </div>
    );
  }
});
