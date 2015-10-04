const {
  Router,
  Route,
  IndexRoute,
  history
} = ReactRouter;
const browserHistory = history.createHistory();

Routes = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function () {
    return (
      <Router history={browserHistory}>
        <Route component={App}>
          <Route name="items" path="items" component={Items}/>
          <Route name='item' path='item/:id' component={Item} />
        </Route>
        <ReactRouter.Redirect from='/' to='/items' />
      </Router>
    );
  }
});

