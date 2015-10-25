const {
  Router,
  Route,
  IndexRoute,
  history
} = ReactRouter;
const browserHistory = history.createHistory();

Routes = React.createClass({
  render: function () {
    return (
      <Router history={browserHistory}>
        <Route component={App}>
          <Route name="plan" path="plans" component={PlanPage}/>
        </Route>
        <ReactRouter.Redirect from='/' to='/plans' />
      </Router>
    );
  }
});

$(document).ready(function() {
  React.render(<Routes/>, document.body);
});

