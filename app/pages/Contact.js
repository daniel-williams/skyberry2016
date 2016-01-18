import React, {PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';

import {ContactForm, CoverBillboard, ModalBox} from '../components';
import constants from '../constants';


export default React.createClass({
  render: function () {
    return (
      <div className='Contact'>
        <CoverBillboard imgSrc='/content/images/jumbo5.jpg'>
          <ModalBox headline='Get In Touch'>
            <div>
              <div className='center'>+1 503 272 1022</div>
              <div className='center'><a href='mailto:contact@skyberrystudio.com'>contact@skyberrystudio.com</a></div>
              <IconButtonBar links={constants.links.skyberry} size={48} className='mt' />
            </div>
          </ModalBox>
        </CoverBillboard>
        <Row className='mt-tpl'>
          <Col xs={12} className='center'>
            <h1>We'd Love to Hear From You</h1>
          </Col>
        </Row>
        <Row className='mt'>
          <Col lg={4} md={3} sm={2} className='hidden-xs' />
          <Col lg={4} md={6} sm={8} className='center'>
            <ContactForm {...this.props} />
          </Col>
          <Col lg={4} md={3} sm={2} className='hidden-xs' />
        </Row>
      </div>
    );
  },




});
