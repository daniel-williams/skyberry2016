import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

import {CoverBillboard, IconButtonBar, ModalBox, Staff} from '../components';
import constants from '../constants';
require('./About.less');


export default React.createClass({

  render: function () {
    return (
      <div id='About'>
        {this.renderBillboard()}
        {this.renderTalent()}
        {this.renderChooseSkyberry()}
      </div>
    );
  },
  renderBillboard: function() {
    return (
      <CoverBillboard imgSrc='/content/images/jumbo1.jpg'>
        <ModalBox headline='Meet Skyberry'>
          <p>Creative and technical, Skyberry is focused on enabling the small business.</p>
          <button className='sky btn btn-sky' style={{width:'50%'}}>Watch Video</button>
        </ModalBox>
      </CoverBillboard>
    );
  },
  renderTalent: function() {
    let linksForLacey = constants.links.lacey;
    let linksForDaniel = constants.links.daniel;

    return (
      <Grid>
        <Row className='mv'>
          <Col xs={12}>
            <h1>Skyberry Studio is</h1>
          </Col>
        </Row>
        <Row>
          <Col sm={6} xs={12}>
            <Staff name='Lacey Johnston' title='I produce meaningful design that communicates ideas' imgSrc='/content/images/staff-lacey-johnston.png'>
              <p>Lacey Johnston founded Skyberry in 2006, with a passion for great design, an abundance of creativity, and a drive to exhaust every pencil she comes into contact with. She is also Co-Founder of DesignOBot, an online service for Creative Professionals.</p>
              <p>After attending Portland Community College, Lacey began a career in executive administration and human resources. Feeling the creative itch and growing restless, she decided to pursue her dreams in graphic & print design. Now, with years of award winning design and publications, she continues to do what she loves, every day. Her areas of expertise are in brand identity design, print collateral, web design and illustration.</p>
              <p>When she's not in the studio designing, you might find Lacey swimming at the local gym, working with paper crafts, golfing, cooking, or gaming.</p>
            </Staff>
          </Col>
          <Col xs={12} align='center' className='mb-dbl visible-xs xs-center'>
            <h4>Connect with Lacey</h4>
            <IconButtonBar links={linksForLacey} size='48px' />
          </Col>
          <Col sm={6} xs={12}>
            <Staff name='Daniel Williams' title='I solve business problems using technology' imgSrc='/content/images/staff-daniel-williams.png'>
              <p>Having held the position of Technical Director at numerous companies, including Landacorp, Multimedia Resources Inc., High Technology Solutions, and Coffey Communications, Daniel Williams brings a wealth of knowledge and experience to Skyberry Studio. Drawing on expertise from diverse spaces such as healthcare, content management, client relationship management, digital advertising, content distribution, finance and commerce, Daniel has been architecting end-to-end solutions for almost two decades.</p>
              <p>Daniel is a Microsoft Certified Professional (MCP) & Certified Solutions Expert (MCSE+I). At Oregon Institute of Technology, he studied Laser Electro-Optical Technology. He enjoys cooking, reading, gaming, and oh yes, coffee.</p>
            </Staff>
          </Col>
          <Col xs={12} className='mb-dbl visible-xs xs-center'>
            <h4>Connect with Daniel</h4>
            <IconButtonBar links={linksForDaniel} size='48px' />
          </Col>
        </Row>
        <Row className='mb-dbl hidden-xs'>
          <Col sm={6} xs={12} className='staff-connect'>
            <h4>Connect with Lacey</h4>
            <IconButtonBar links={linksForLacey} size='48px' />
          </Col>
          <Col sm={6} xs={12} className='staff-connect'>
            <h4>Connect with Daniel</h4>
            <IconButtonBar links={linksForDaniel} size='48px' />
          </Col>
        </Row>
      </Grid>
    );
  },
  renderChooseSkyberry: function() {
    return (
      <Grid className='choose-skyberry'>
        <Row>
          <Col xs={12}>
            <h1 className='xs-center'>Be successful. Be carefree. <span className='xl'>Call Skyberry</span>.</h1>
          </Col>
        </Row>
        <Row className='mt'>
          <Col md={6} sm={12}>
            <Row>
              <Col sm={6} xs={12}>
                <h3>We are here for you</h3>
                <p>Skyberry has chosen to remain small so we can provide the personal attention you'll appreciate. We are responsive, friendly, experienced and are continually searching for ways to make you successful. Best of all, we are always here for you when you need us.</p>
              </Col>
              <Col sm={6} xs={12}>
                <h3>Awards &amp; Publications</h3>
                <p>Our work has been published in industry books, magazines and newspapers. We've won over a dozen awards for web design, including being selected amoung the "Top Web Design Firms of 2012" by the International Business Times.</p>
              </Col>
            </Row>
          </Col>
          <Col md={6} sm={12}>
            <Row>
              <Col sm={6} xs={12}>
                <h3>The Great Northwest</h3>
                <p>Founded in Portland Oregon in 2006, Skyberry moved to the Seattle area in 2014. Our studio is located in Bothell, overlooking the wildlife preserve at North Creek. We support local organizations whenever we can. We also believe in the power of office pets!</p>
              </Col>
              <Col sm={6} xs={12}>
                <h3>Focused &amp; Experienced</h3>
                <p>For over 10 years, team Skyberry has been helping clients with brand identity and graphic design needs. Skyberry has almost 20 years of experience developing mission critial apps and websites!</p>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className='mt mb-trpl'>
          <Col xs={12} align='center'>
            <button className='btn btn-sky'>Get your Free Project Consultation</button>
          </Col>
        </Row>
      </Grid>
    );
  },

});
