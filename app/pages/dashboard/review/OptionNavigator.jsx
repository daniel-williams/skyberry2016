import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';
import {Row, Col} from 'react-bootstrap';
import classnames from 'classnames';


export default React.createClass({
  displayName: 'OptionNavigator',

  mixins: [PureRender],

  propTypes: {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
      })
    ).isRequired,
    viewingId: PropTypes.string,
    selectedId: PropTypes.string,
    onClick: PropTypes.func,
  },
  getDefaultProps: function() {
    return {
      items: [],
      onClick: function() {},
    };
  },
  hasMultipleOptions: function() {
    return this.props.items.length > 1;
  },
  hasSingleOption: function() {
    return this.props.items.length === 1;
  },
  render: function() {
    return (
      <Row className='mb-half'>
        <Col xs={12}>
          <h2>Design Options</h2>
        </Col>
        {this.hasMultipleOptions() && this.renderOptionNavigator()}
        {this.hasSingleOption() && this.renderOptionTitle()}
      </Row>
    );
  },
  renderOptionNavigator: function() {
    const items = this.props.items.map(item => {
      var cssnames = classnames('item', {
        selected: item.id === this.props.selectedId,
        viewing: item.id === this.props.viewingId,
      });
      return (
        <div key={item.id} data-key={item.id} className={cssnames} onClick={() => this.props.onClick(item.id)}>
          <div>
            {item.title}
          </div>
        </div>
      );
    });
    return (
      <Col xs={12} className='options clearfix'>
        {items}
      </Col>
    );
  },
  renderOptionTitle: function() {
    return <Col xs={12}>{this.props.items[0].title}</Col>;
  }

});
