import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';
import {Row, Col} from 'react-bootstrap';


export default React.createClass({
  displayName: 'Proofs',

  mixins: [PureRender],

  propTypes: {
    items: PropTypes.array,
  },
  getDefaultProps: function() {
    return {
      items: [],
    };
  },

  render: function() {
    const proofs = this.props.items.map(item => {
      return (
        <Col xs={12} key={item.id}>
          <a href='#'>{item.filenameOriginal}</a>
        </Col>
      );
    });
    return (
      <Row className='mb'>
        <Col xs={12}><h2>Proofs</h2></Col>
        {proofs}
      </Row>
    );
  },

});
