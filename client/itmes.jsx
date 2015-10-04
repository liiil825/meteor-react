const {
  History
} = ReactRouter;
Meteor.subscribe("items");

Items = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    return {
      items: ItemsCollection.find({}).fetch()
    };
  },
  getInitialState: function() {
    return {
      items: ItemsCollection.find({}).fetch()
    };
  },
  addItem: function(e) {
    e.preventDefault();
    var item = React.findDOMNode(this.refs.input).value;

    Meteor.call('addItem', item, function(err, id){
      if (err)  console.log('err ' + id);
    });

    React.findDOMNode(this.refs.input).value = "";
  },
  handleRemove: function(e) {
    e.preventDefault();
    Meteor.call('removeItem', $(e.target).data('id'));
  },
  render: function () {
    var items = this.data.items.map(function (item) {
      return (
        <li key={item._id}>
          <ReactRouter.Link to={'/item/' + item._id}>
            {item.content}
            <button onClick={ this.handleRemove } className="ex_del" data-id={item._id}>X</button>
          </ReactRouter.Link>
        </li>
      );
    }.bind(this));
    return (
      <div>
        <ul>
          { items }
        </ul>
        <form onSubmit={this.addItem}>
          <input type="text" ref="input"/>
          <button type="submit">Add Item</button>
        </form>
      </div>
    );
  }
});

Item = React.createClass({
  mixins: [ReactMeteorData, History],
  contextTypes: {
    router: React.PropTypes.func
  },
  startMeteorSubscriptions: function() {
    Meteor.subscribe('items');
  },
  getMeteorData: function() {
    var id = this.props.params.id;
    return {
      item: ItemsCollection.findOne(id)
    };
  },
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
    React.findDOMNode(this.refs.itemContent).value = this.data.item.content;
  },
  transTo: function(err) {
    if( !err ) {
      this.history.pushState(null, '/items', 'query');
    } else {
      console.log( err );
    }
  },
  updateItem: function(event) {
    event.preventDefault();
    var item = {
      id: this.props.params.id,
      content: React.findDOMNode(this.refs.itemContent).value
    }

    Meteor.call('updateItem', item, this.transTo.bind(this));

  },
  render: function() {
    var defaultValue = !!this.state.data ? this.state.data.content : ''

    return (
      <div>
        <h2>Edit</h2>
        <form onSubmit={this.updateItem}>
          <input type="text" ref="itemContent" defaultValue={defaultValue}/>
          <button type="submit">Change</button>
        </form>
      </div>
    );
  }
});

