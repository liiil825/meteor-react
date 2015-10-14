Dialog = React.createClass({
  render: function() {
    return (
      <form action="">
        <fieldset>
          <legend>登陆</legend>
          <div>
            <label htmlFor="username">用户名</label>
            <input id="username" name="username" type="text" placeholder="email" />
          </div>
          <div>
            <h4>爱好</h4>
            <input id="hobby1" type="checkbox" name="hobby" value="0" />
            <label htmlFor="hobby1">音乐</label>
            <input id="hobby2" type="checkbox" name="hobby" value="1" />
            <label htmlFor="hobby2">运动</label>
            <input id="hobby3" type="checkbox" name="hobby" value="2" />
            <label htmlFor="hobby3">阅读</label>
          </div>
          <div>
            <h4>性别</h4>
            <input id="male" name="gender" type="radio" value="1" />
            <label htmlFor="male">男</label>
            <input id="female" name="gender" type="radio" value="2" />
            <label htmlFor="female">女</label>
          </div>
        </fieldset>
      </form>
    );
  }
});

