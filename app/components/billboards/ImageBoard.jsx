import React, {PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';

import {getBootstrapBreakpoint} from '../../utils/BootstrapUtils';
import ImageLoader from '../ImageLoader';

require('./ImageBoard.less');


const DEFAULT_COLUMNS = {
  xxs: 1,
  xs: 2,
  sm: 3,
  md: 4,
  lg: 4,
};
const DEFAULT_IMAGES = [];

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
    let currentBreakpoint = getBootstrapBreakpoint(true, true);
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
    return (
      <div className='sky-image-board'>
        {this.renderRows()}
      </div>
    );
  },

  renderRows: function() {
    const frameClasses = this.getFrameClasses();
    const frameStyle = this.getFrameStyle();
    const imageStyle = this.getImageStyle();
    const rowCount = this.getRowCount();
    const colCount = this.props.columns[this.state.breakpoint];
    let rows = [];
    for(let i = 1; i <= rowCount; i++) {
      rows.push(
        <div className='clearfix' key={i}>
          {this.renderCols(i, colCount, frameClasses, frameStyle)}
        </div>
      );
    }
    return rows;
  },

  renderCols: function(rowIndex, colCount, frameClasses, frameStyle) {
    let itemOffset = (rowIndex * colCount) - colCount;
    let cols = [];
    for(let i = 0; i < colCount; i++) {
      let src = this.getImageSource(this.props.images[itemOffset + i]);
      cols.push(
        <div className={frameClasses} style={frameStyle} key={src + i}>
          <ImageLoader src={src} />
        </div>
      );
    }
    return cols;
  },

});
