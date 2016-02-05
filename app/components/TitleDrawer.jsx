import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';
import {Row, Col} from 'react-bootstrap';
import classnames from 'classnames';

import './TitleDrawer.less';


export default React.createClass({
  displayName: 'TitleDrawer',

  mixins: [PureRender],

  propTypes: {
    title: PropTypes.any,
    open: PropTypes.bool,
    onClick: PropTypes.func,
  },
  getDefaultProps: function() {
    return {
      title: 'Title',
      open: true,
      onClick: function() {console.log('click');},
    };
  },

  render: function() {
    let drawerCssNames = classnames('drawer', {
        'open': this.props.open,
    });
    let iconCssNames = classnames('toggle', 'glyphicon', {
      'glyphicon-minus': this.props.open,
      'glyphicon-plus': !this.props.open
    });

    return (
      <div className='title-drawer'>
        <Row>
          <Col xs={12} className='title stack' onClick={this.props.onClick}>
            <i className={iconCssNames} />
            {this.props.title}
          </Col>
        </Row>
        <Row>
          <Col xs={12} className={drawerCssNames}>
            <div className={'shim'}>
              {this.props.children}
            </div>
          </Col>
        </Row>
      </div>
    );
  },

});
