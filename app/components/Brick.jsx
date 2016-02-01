import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';


export default React.createClass({
  displayName: 'Brick',

  mixins: [PureRender],

  render: function() {
    let cssNames = this.props.className + ' col';
    if(this.props.inline) {
      cssNames = cssName + ' inline';
    }
    if(this.props.center) {
      cssNames = cssName + ' center';
    }
    return (
      <div className={cssNames}>
        {this.props.children}
      </div>
    );
  },

});
