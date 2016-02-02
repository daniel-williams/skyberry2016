

export default {

  getProjectName: function() {
    return this.props.project ? this.props.project.name : '';
  },

  renderClose: function() {
    return (
      <Col className='pull-right'>
        <button className='btn btn-default' onClick={this.close}>Close</button>
      </Col>
    );
  },

}
