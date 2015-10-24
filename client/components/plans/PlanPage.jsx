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
    this.props.items =  this.data.plans.map(function(plan, i) {
      return <TodoItem key={ Math.random() } plan={ plan } colors={ colorClass } index={ i } />
    });
    return this.props.items;
  },
  closeItem: function(event) {
    debugger;
    this.props.items.forEach(function(item) {
      item.props.isOpenOrEdit = false;
    });
  },
  render: function() {
    return (
      <div className="page-container" onClick={ this.closeItem }>
        <AppHeaderNav />
        <PlanNewItem />
        <ul className="page-plan-items l-list">
          { this.renderItem() }
        </ul>
      </div>
    );
  }
});

