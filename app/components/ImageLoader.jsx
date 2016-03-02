import React, {PropTypes} from 'react';
import classnames from 'classnames';


export default React.createClass({
    displayName: 'ImageLoader',

    propTypes: {
        src: PropTypes.string,
        responsive: PropTypes.bool,
    },
    getDefaultProps: function() {
      return {
        responsive: true,
      };
    },
    getInitialState: function() {
        return {
            loaded: false,
        };
    },
    componentDidMount: function() {
        var img = new Image();
        img.onload = this.handleLoaded;
        img.src = this.props.src;
    },
    render: function() {
      const cssNames = classnames(this.props.className, {
        loaded: this.state.loaded,
        loading: !this.state.loaded,
        'img-responsive': this.props.responsive,
      });
      return <img {...this.props} className={cssNames} />;
    },


    handleLoaded: function(event) {
        this.setState({
          loaded: true
        });
        if(this.props.onLoad) {
          this.props.onLoad(event);
        }
    },

});
