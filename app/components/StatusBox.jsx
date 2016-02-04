import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

// import './StatusBox.less';


export default React.createClass({
  displayName: 'StatusBox',

  mixins: [PureRender],

  propTypes: {
    isCompleted: PropTypes.bool,
    isCurrent: PropTypes.bool,
    isHidden: PropTypes.bool,
  },
  getDefaultProps: function() {
    return {
      isCompleted: false,
      isCurrent: false,
      isHidden: false,
    };
  },

  render: function() {
    if(this.props.isHidden) { return; }

    var icon = this.props.isCompleted ? <i className='icon-arrow-up' /> : <i className='icon-arrow-down' />;
    var cssNames = classnames('cbx', {
      completed: this.props.isCompleted,
      active: this.props.isCurrent,
    });

    return (
      <div className='status-box'>
        <div className={cssNames}>
          {icon}
        </div>
      </div>
    );
  },

});
