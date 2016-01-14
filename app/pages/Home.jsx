import React from 'react';
import PureRender from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRender],

  render: function() {
    return <div>what up!?</div>;
  },

});
