Test = React.createClass({
  onClick: function() {
    var foo = 'abc';
    with ({ foo: 'bar'}) {
      function f() {
        alert(foo);
      }
      (function() {
        alert(foo);
      })();
      f();
    }
  },
  onClick: function() {
    var foo = function() {
      alert(1);
    };

    foo();

    var foo = function() {
      alert(2);
    }
  },
  getInitialState: function() {
    return {
      clientX: 0,
      clientY: 0
    };
  },
  onMouseDown: function(event) {
    event = event || window.event;
    this.state.moving = !0;
    this.state.clientX = event.clientX;
    this.state.clientY = event.clientY;
    event.target.className += ' absolutiable';
    console.log( 'down' );
  },
  onMouseUp: function(event) {
    var className = ' ' + event.target.className + ' ';
    event.target.className = className.replace(/ absolutiable /, '').trim();
    this.state.moving = !1;
    console.log( 'move' );
  },
  onMouseMove: function (event) {
    event.preventDefault();
    event.stopPropagation();
    if (! this.state.moving ) return;
    console.log( event.target );
    var newClientX = event.clientX,
        newClientY = event.clientY,
        elem = event.target,
        style = window.getComputedStyle(elem),
        left = parseInt( style.left ) || 0,
        top = parseInt( style.top ) || 0,
        maxLeft = screen.width - style.width.replace(/px/, ''),
        maxTop = screen.height - style.height.replace(/px/, ''),
        styleText = '';

    left = left + newClientX - this.state.clientX;
    top = top + newClientY - this.state.clientY;
    left = left < 0 ? 0 : left;
    top = top < 0 ? 0 : top;
    left = left > (maxLeft) ? (maxLeft) : left;

    styleText = 'left:' + left + 'px;' +
                'top:' + top + 'px';
    elem.style.cssText = styleText;
    this.state.clientX = newClientX;
    this.state.clientY = newClientY;
    console.log( styleText );
  },
  onClick: function(event) {
    console.log(event.target.innerText);
  },
  onKeyUp: function(event) {
    console.log( event.keyCode );
  },
  render: function() {
    return (
      <div className="parent">
        <aside>aside</aside>
        <article>article</article>
      </div>
    );
  },
  // render: function() {
  //   // <div className="test-app" onMouseMove={ this.onMouseMove }><p refs="move" className="move" onMouseDown={ this.onMouseDown } onMouseUp={ this.onMouseUp }>Hello World</p></div>
  //   return (
  //     <div className="test-app">
  //       <ul onClick={ this.onClick }>
  //         <li>l1</li>
  //         <li>l2</li>
  //         <li>l3</li>
  //         <li>l4</li>
  //         <li>l5</li>
  //       </ul>
  //       <form>
  //         <input type="tel" name="b" value="50" /> +
  //         <input onKeyUp={ this.onKeyUp } type="number" name="a" value="10" /> =
  //         <output name="result"></output>
  //       </form>
  //       <div>Choose a browser from this list:</div>
  //       <input list="browsers" />
  //       <datalist id="browsers">
  //         <option value="Chrome" />
  //         <option value="Firefox" />
  //         <option value="Internet Explorer" />
  //         <option value="Opera" />
  //         <option value="Safari" />
  //       </datalist>
  //     </div>
  //   );
  // }
});

