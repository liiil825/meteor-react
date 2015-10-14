const {
  Navigation,
  History,
  Link
} = ReactRouter;

AuthJoinPage = React.createClass({
  mixins: [Navigation, History],
  getInitialState() {
    return {
      errors: {}
    };
  },
  onSubmit(event) {
    event.preventDefault();

    const email = event.target.email.value,
          password = event.target.password.value,
          confirm = event.target.confirm.value,

          errors = {};

    if (! email) {
      errors.email = 'Email required';
    }

    if (! password) {
      errors.password = 'Password required';
    }

    if (confirm !== password) {
      errors.confirm = 'Please confirm your password';
    }

    this.setState({
      errors: errors
    });

    if (! _.isEmpty(errors)) {
      // Form errors found, do not create user
      return;
    }

    Accounts.createUser({
      email: email,
      password: password
    }, (error) => {
      if (error) {
        this.setState({
          errors: { 'none': error.reason }
        });

        return;
      }

      this.history.pushState(null, '/');
      // this.transitionTo('root');
    });
  },
  render() {
    return (
      <div className="page auth">
        <nav>
          <MenuOpenToggle />
        </nav>

        <div className="content-scrollable">
          <div className="wrapper-auth">
            <h1 className="title-auth">Join.</h1>
            <p className="subtitle-auth">
              Joining allows you to make private lists
            </p>

            <form onSubmit={ this.onSubmit }>
              <AuthErrors errors={this.state.errors} />

              <AuthFormInput
                hasError={!!this.state.errors.email}
                type="email"
                name="email"
                label="Your Email"
                isRequired="true"
                iconClass="icon-email" />

              <AuthFormInput
                hasError={!!this.state.errors.password}
                type="password"
                name="password"
                label="Password"
                isRequired="true"
                iconClass="icon-lock" />

              <AuthFormInput
                hasError={!!this.state.errors.confirm}
                type="password"
                name="confirm"
                label="Confirm Password"
                iconClass="icon-lock" />

              <button type="submit" className="btn-primary">
                Join Now
              </button>
            </form>
          </div>

          <Link to="/signin" className="link-auth-alt">
            Have an account? Sign in.
          </Link>
        </div>
      </div>
    );
  }
});

