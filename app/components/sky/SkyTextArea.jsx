import React, {PropTypes} from 'react';
import Formsy from 'formsy-react';


export default React.createClass({
  mixins: [Formsy.Mixin],

  propTypes: {
    label: PropTypes.string,
  },
  changeValue: function (event) {
    this.setValue(event.currentTarget.value);
  },
  componentDidMount: function() {
    this.autoGrow(this.refs.el);
  },
  render: function () {
    var cssNames = this.showError() ? ' has-error' : '';
    var errorMessage = this.showError() ? <span className='help-block'>{this.getErrorMessage()}</span> : null;

    return (
      <div className={'form-group' + cssNames}>
        {this.props.label && <label className='control-label'>{this.props.label}</label>}
        <textarea
          {...this.props}
          name={this.props.name}
          value={this.getValue()}
          onChange={this.changeValue}
          onkeyup='autoGrow(this)'
          ref='el'></textarea>
        {errorMessage}
      </div>
    );
  },

  autoGrow(el) {
    el.style.height = '20px';
    el.style.height = (el.scrollHeight + 20) + 'px';
  },

});
