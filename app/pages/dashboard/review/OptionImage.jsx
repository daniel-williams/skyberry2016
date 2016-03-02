import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';
import {Row, Col} from 'react-bootstrap';
import classnames from 'classnames';

import constants from '../../../constants';
import {ImageLoader} from '../../../components';


export default React.createClass({
  displayName: 'OptionImage',

  mixins: [PureRender],

  propTypes: {
    option: PropTypes.object,
  },
  getDefaultProps: function() {
    return {
      option: null,
    };
  },
  hasOption: function() {
    return !!this.props.option;
  },

  render: function() {
    return this.hasOption() && (
      <div className='wrap'>
        <ImageLoader src={constants.routes.files + this.props.option.filename} />
      </div>
    );
  },

});
