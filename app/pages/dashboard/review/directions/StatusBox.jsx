import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import {Icon} from '../../../../components';
import StepStatus from './StepStatus';


export default React.createClass({
  displayName: 'StatusBox',

  mixins: [PureRender],

  propTypes: {
    status: PropTypes.oneOf([
      StepStatus.HIDDEN,
      StepStatus.TODO,
      StepStatus.CURRENT,
      StepStatus.COMPLETED
    ]),
  },
  getDefaultProps: function() {
    return {
      status: StepStatus.TODO,
    };
  },

  render: function() {
    const status = this.props.status;

    if(status === StepStatus.HIDDEN) { return; }

    var cssNames = classnames('cbx', {
      current: status === StepStatus.CURRENT,
      completed: status === StepStatus.COMPLETED,
    });

    return (
      <div className='status-box'>
        <div className={cssNames}>
          {this.renderIcon()}
        </div>
      </div>
    );
  },
  renderIcon: function() {
    return this.props.status === StepStatus.COMPLETED
      ? <Icon className='glyphicon glyphicon-ok' />
      : <span> </span>;
  },

});
