Option = React.createClass({
  getInitialState: function() {
    var data = {
      list: [{
        name: '第一级1',
        value: '1',
        list: [{
          name: '第二级1.1',
          value: '1.1',
          list: [{
            name: '第三级1.1.1',
            value: '1.1.1',
            list: [{
              name: '第四级1.1.1.1',
              value: '1.1.1.1',
              list: []
            }]
          },{
            name: '第三级1.1.2',
            value: '1.1.2',
            list: []
          },{
            name: '第三级1.1.3',
            value: '1.1.3',
            list: []
          }]},{
          name: '第二级1.2',
          value: '1.2',
          list: [{
            name: '第三级1.2.1',
            value: '1.2.1',
            list: []
          },{
            name: '第三级1.2.2',
            value: '1.2.2',
            list: []
          },{
            name: '第三级1.2.3',
            value: '1.2.3',
            list: []
          }]
        }]},{
        name: '第一级2',
        value: '2',
        list: [{
          name: '第二级2.1',
          value: '2.1',
          list: [{
            name: '第三级2.1.1',
            value: '2.1.1',
            list: []
          },{
            name: '第三级2.1.2',
            value: '2.1.2',
            list: []
          },{
            name: '第三级2.1.3',
            value: '2.1.3',
            list: []
          }]},{
          name: '第二级2.2',
          value: '2.2',
          list: [{
            name: '第三级2.2.1',
            value: '2.2.1',
            list: []
          },{
            name: '第三级2.2.2',
            value: '2.2.2',
            list: []
          },{
            name: '第三级2.2.3',
            value: '2.2.3',
            list: []
          }]}
        ]}
      ],
      track: ["1"]
    };
    return data;
  },
  onChange: function(event) {
    event.preventDefault();
    var target = event.target,
        value = target.value,
        track = value.split('.'),
        data = this.state.list[track[0]];

    this.setState({ 'track': track });
  },
  getSelectId: function(value) {
    return "sel" + value.split('.').length;
  },
  getNextSelectId: function(value) {
    return "sel" + ( value.split('.').length + 1);
  },
  dataToEl: function(list, track) {
    var data = list,
        child = track.map(function(item) {
            (function() {
              data = data.list
                              ? data.list[item - 1]
                              : data[item - 1].list;
              console.log( data );
            })()
            return this.dataToSelect(data);
          }.bind(this));
    var result = (
      <div>
        { this.dataToSelect(list) }
        { child }
      </div>
    );
    return result;
  },
  dataToSelect: function(list) {
    if (! list || !list.length) return;
    var selects = (
      <select data-value={ list[0].value } onChange={ this.onChange } defaultValue="0">
        <option value="0">请选择</option>
        { this.dataToOption(list) }
      </select>
    );
    return selects;
  },
  dataToOption: function(list) {
    if (! list) return;
    var options = list.map(function(item) {
      return (
        <option value={ item.value }>{ item.name }</option>
      );
    });
    return options;
  },
  render: function() {
    return (
      <div className="app" onClick={ this.onClick } >
        { this.dataToEl(this.state.list, this.state.track) }
      </div>
    );
  }
});

