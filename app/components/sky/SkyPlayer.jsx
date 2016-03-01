import React, {PropTypes} from 'react';

import SkySlide from './SkySlide';
import './SkyPlayer.less';

let nextTimer = null;

export default React.createClass({
  displayName: 'SkyPlayer',

  propTypes: {
    items: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.arrayOf(PropTypes.element)
    ]).isRequired,
    duration: PropTypes.number,
    onNext: PropTypes.func,
    onPrev: PropTypes.func,
  },
  getDefaultProps: function() {
    return {
      items: ['slide 1', 'slide 2', 'slide 3'],
      duration: 10000,
      onNext: function() {},
      onPrev: function() {},
    };
  },
  componentWillMount: function() {
    this.setState({
      // slides: this.buildSlides(this.props.items),
      // duration: this.props.duration,
      current: 0,
    }, this.setNextTimer);
  },
  componentWillReceiveProps: function(nextProps) {
    // if(nextTimer) {
    //   clearInterval(nextTimer);
    // }
    this.setState({
      // slides: this.buildSlides(nextProps.items),
      // duraction: nextProps.duration,
      current: this.state.current < nextProps.items.length ? this.state.current : 0,
    }, this.setNextTimer);
  },
  componentWillUnmount: function() {
    if(nextTimer) {
      clearInterval(nextTimer);
    }
  },

  setNextTimer: function() {
    if(nextTimer != null) {
      console.log('clearInterval');
      clearInterval(nextTimer);
    }
    console.log('setNextTimer');
    nextTimer = setInterval(this.nextSlide, this.props.duration);
  },
  nextSlide: function() {
    console.log('NEXT SLIDE');
    let current = this.state.current + 1;
    if(current >= this.props.items.length) {
      current = 0;
    }
    this.setState({
      current: current,
    });
  },
  render: function() {
    var slides = this.props.items.map((item, idx) => {
      return (
        <SkySlide key={idx} active={idx === this.state.current}>
          {item}
        </SkySlide>
      );
    });
    return (
      <div className='sky-player'>
        {slides}
      </div>
    );
  },
});
