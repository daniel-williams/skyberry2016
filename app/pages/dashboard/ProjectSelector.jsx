import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';
import {Row, Col} from 'react-bootstrap';

import {Selector} from '../../components';


const NO_PROJECTS_FOUND = [
  {name: 'No projects found.', value: ''}
];

export default React.createClass({
  displayName: 'ProjectSelector',

  mixins: [PureRender],

  propTypes: {
    hasFetched: PropTypes.bool,
    options: PropTypes.array,
    projectSlug: PropTypes.string,
    changeProject: PropTypes.func,
  },
  getDefaultProps: function() {
    return {
      hasFetched: false,
      options: [],
      projectSlug: '',
      changeProject: function() {},
    }
  },
  getProjectOptions: function() {
    return this.props.options.length > 0 ?
      this.props.options :
      NO_PROJECTS_FOUND;
  },

  render: function() {
    return this.props.hasFetched && this.renderSelector();
  },

  renderSelector: function() {
    return (
      <Row className='controls'>
        <div className='form-inline col col-xs-12  mb-half'>
          <Selector
            label='Projects'
            options={this.props.options}
            selected={this.props.projectSlug}
            onChange={this.props.changeProject} />
        </div>
      </Row>
    );
  },

});
