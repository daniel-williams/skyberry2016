import React, {PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';

import {getBootstrapBreakpoint} from '../utils/BootstrapUtils';
import constants from '../constants';

import ImageLoader from './ImageLoader';
require('./ImageBoard.less');


const DEFAULT_COLUMNS = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
};
const DEFAULT_IMAGES = Array(9).fill({src: constants.porfolioSlug});

export default React.createClass({
  displayName: 'ImageBoard',

  propTypes: {
      images: PropTypes.array,
      columns: PropTypes.object,
      border: PropTypes.string,
  },
  getDefaultProps: function() {
      return {
          columns: DEFAULT_COLUMNS,
          images: DEFAULT_IMAGES,
      };
  },
  getInitialState: function() {
    return {};
  },
  setBreakpoint: function() {
    let currentBreakpoint = getBootstrapBreakpoint(true);
    if(currentBreakpoint != this.state.breakpoint) {
      this.state.breakpoint = currentBreakpoint;
      this.forceUpdate();
    }
  },
  // Computed
  isColumnsValid: function(num) {
    return (num >= 1 && num <= 12);
  },
  getRowCount: function() {
    return Math.floor(this.props.images.length / this.props.columns[this.state.breakpoint]);
  },
  getFrameClasses: function() {
      let result= ['frame'];
      for(let k in this.props.columns) {
          let cols = this.props.columns[k];
          if(this.isColumnsValid(cols)) {
              let colSpan = 12 / cols;
              result.push('col-' + k + '-' + colSpan);
          }
      }
      return result.join(' ');
  },

  getFrameStyle: function() {
      let cssStyle = {};
      if(this.props.border) {
          cssStyle.border = this.props.border;
      }
      return cssStyle;
  },

  getImageClasses: function() {
      return ('img-responsive');
  },

  getImageStyle: function() {
      let cssStyle = {};
      return cssStyle;
  },

  getImageSource: function(item) {
      return item.src || '/files/' + item.filename;
  },

  componentWillMount: function() {
      this.setBreakpoint();
  },
  componentDidMount: function() {
      window.addEventListener('resize', this.setBreakpoint);
  },
  componentWillUnmount: function() {
      window.removeEventListener('resize', this.setBreakpoint);
  },

  render: function() {
    let frameClasses = this.getFrameClasses();
    let frameStyle = this.getFrameStyle();
    let imageClasses = this.getImageClasses();
    let imageStyle = this.getImageStyle();
    let rowCount = this.getRowCount();
    let colCount = this.props.columns[this.state.breakpoint];
    let rows = [];
    for(let i = 1; i <= rowCount; i++) {
      rows.push(
        <Row key={i}>
          {this.renderRow(i, colCount, frameClasses, frameStyle, imageClasses)}
        </Row>
      );
    }

    return (
      <div className='sky image-board mt-dbl'>
        {rows}
      </div>
    );
  },

  renderRow: function(rowIndex, colCount, frameClasses, frameStyle, imageClasses) {
    let itemOffset = (rowIndex * colCount) - colCount;
    let cols = [];
    for(let i = 0; i < colCount; i++) {
      let src = this.getImageSource(this.props.images[itemOffset + i]);
      cols.push(
        <div className={frameClasses} style={frameStyle} key={src + i}>
          <ImageLoader src={src} className={imageClasses} />
        </div>
      );
    }
    return cols;
  },

});
