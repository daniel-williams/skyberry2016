import React, {PropTypes} from 'react';
// import PureRender from 'react-addons-pure-render-mixin';
import {Row, Col} from 'react-bootstrap';

import {SkySelect} from '../../components';


export default React.createClass({
  displayName: 'AccountSelector',

  // mixins: [PureRender],

  propTypes: {
    hasFetched: PropTypes.bool,
    accountOptions: PropTypes.array,
    accountSlug: PropTypes.string,
    changeAccount: PropTypes.func,
  },
  getDefaultProps: function() {
    return {
      hasFetched: false,
      accountOptions: [],
      accountSlug: '',
      changeAccount: function() { console.log('OKEY'); },
    }
  },

  render: function() {
    return this.props.hasFetched && this.renderSelector();
  },

  renderSelector: function() {
    return (
      <Row className='controls'>
        <div className='form-inline col col-xs-12  mb-half'>
          <SkySelect
            label='Accounts'
            name='accounts'
            options={this.props.accountOptions}
            selected={this.props.accountSlug}
            onChange={this.props.changeAccount} />
        </div>
      </Row>
    );
  },

});
