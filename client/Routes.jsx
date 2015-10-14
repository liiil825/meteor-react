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
          <Route name="test" path="test" component={Test}/>
          <Route name="option" path="option" component={Option}/>
          <Route name="dialog" path="dialog" component={Dialog}/>
          <Route name="items" path="items" component={Items}/>
          <Route name='item' path='item/:id' component={Item} />
          <Route name="join" path="/join" component={AuthJoinPage}/>
          <Route name="signin" path="/signin" component={AuthSignInPage}/>
        </Route>
        <ReactRouter.Redirect from='/' to='/items' />
      </Router>
    );
  }
});

