import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import Helmet from 'react-helmet';

import {CoverBillboard, IconButtonBar, ModalBox, SkyButton, Staff} from '../components';
import constants from '../constants';
require('./About.less');


export default React.createClass({

  render: function () {
    return (
      <div id='About'>
        <Helmet
          title='About Skyberry Studio : Graphic Design & Web Development Seattle'
          meta={[{
            'name': 'description',
            'content': 'Skyberry Studio is an expert in brand identity, logo design and graphic design. With 20 years of experience developing mission critical apps and websites.'
          }]}
        />
        {this.renderBillboard()}
        {this.renderTalent()}
        {this.renderChooseSkyberry()}
      </div>
    );
  },
  renderBillboard: function() {
    return (
      <CoverBillboard imgSrc='/content/images/jumbo1.jpg' overlayOpacity={30}>
        <ModalBox headline='Meet Skyberry'>
          <p>Armed with oodles of creativity, modern cultural sensibilities, and undying technology obsession, Skyberry stands uniquely poised to inject your business with hip design, and cutting-edge development.</p>
          <SkyButton
            isPrimary
            size='lg'
            onClick={() => window.open('https://www.youtube.com/user/SkyberryStudio', '_blank')}>Watch Videos</SkyButton>
        </ModalBox>
      </CoverBillboard>
    );
  },
  renderTalent: function() {
    let linksForLacey = constants.links.lacey;
    let linksForDaniel = constants.links.daniel;

    return (
      <Grid>
        <Row className='mt-dbl'>
          <Col sm={6} xs={12}>
            <Staff name='Lacey Johnston' title='I produce meaningful design that communicates ideas' imgSrc='/content/images/staff-lacey-johnston.png'>
              <p>Lacey Johnston has a passion for minimalist, modern design and routinely monitors the latest trends to spark creativity. She finds great joy in building brand identities and takes pride in seeing her work come to life.</p>
              <p>After attending Portland Community College, Lacey began a career in executive administration. She thrived in that role thanks to her organization and communication skills, as well as her ability to streamline daily procedures. After becoming well-versed in business management & start-ups, she decided to try her hand at starting her own business. In 2006, Lacey founded Skyberry Studio.  Now, with years of award-winning designs and publications, she continues to do what she loves. Her areas of expertise are branding, print & graphic design, web design and video editing.</p>
              <p>When she's not in the studio, you might find Lacey swimming at the local gym, golfing, cooking, or gaming. Originally from the Portland area, Lacey currently lives in Seattle Washington.</p>
            </Staff>
          </Col>
          <Col xs={12} className='staff-connect visible-xs xs-center'>
            <h4>Connect with Lacey</h4>
            <IconButtonBar links={linksForLacey} size={48} />
          </Col>
          <Col sm={6} xs={12}>
            <Staff name='Daniel Williams' title='I solve business problems using technology' imgSrc='/content/images/staff-daniel-williams.png'>
              <p>Having held the position of Technical Director at numerous companies, including Landacorp, Multimedia Resources Inc., High Technology Solutions, and Coffey Communications, Daniel Williams brings a wealth of knowledge and experience to Skyberry Studio. Drawing on expertise from diverse spaces such as healthcare, content management, client relationship management, digital advertising, content distribution, finance and commerce, Daniel has been architecting end-to-end solutions for almost two decades.</p>
              <p>Daniel is a full-stack developer and has advanced knowledge of both client and server side technologies. Daniel's current focus is on responsive SPA type web applications, using frameworks like React and AngularJS, building backend APIs, and streamlining development processes.</p>
              <p>Daniel is a Microsoft Certified Professional (MCP) & Certified Solutions Expert (MCSE+I). At Oregon Institute of Technology, he studied Laser Electro-Optical Technology. He enjoys cooking, reading, gaming, and oh yes, coffee.</p>
            </Staff>
          </Col>
          <Col xs={12} className='staff-connect visible-xs xs-center'>
            <h4>Connect with Daniel</h4>
            <IconButtonBar links={linksForDaniel} size={48} />
          </Col>
        </Row>
        <Row className='hidden-xs'>
          <Col sm={6} xs={12} className='staff-connect'>
            <h4>Connect with Lacey</h4>
            <IconButtonBar links={linksForLacey} size={48} />
          </Col>
          <Col sm={6} xs={12} className='staff-connect'>
            <h4>Connect with Daniel</h4>
            <IconButtonBar links={linksForDaniel} size={48} />
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
            <h1>Be successful. Be carefree. Call Skyberry!</h1>
          </Col>
        </Row>
        <Row className='mt-half'>
          <Col md={6} sm={12}>
            <Row>
              <Col sm={6} xs={12} className='mb'>
                <h3>We are here for you</h3>
                <p>Skyberry has chosen to remain small so we can provide the personal attention you'll appreciate. We are responsive, friendly, experienced and are continually searching for ways to make you successful. Best of all, we are always here for you when you need us.</p>
              </Col>
              <Col sm={6} xs={12} className='mb'>
                <h3>Awards &amp; Publications</h3>
                <p>Our work has been published in industry books, magazines and newspapers. We've won over a dozen awards for web design, including being selected among the "Top Web Design Firms of 2012" by the International Business Times.</p>
              </Col>
            </Row>
          </Col>
          <Col md={6} sm={12}>
            <Row>
              <Col sm={6} xs={12} className='mb'>
                <h3>The Great Northwest</h3>
                <p>Founded in Portland Oregon in 2006, Skyberry moved to Seattle in 2014 and is located in downtown Seattle in Belltown. We support local organizations whenever we can. We also believe in the power of office pets!</p>
              </Col>
              <Col sm={6} xs={12} className='mb'>
                <h3>Focused &amp; Experienced</h3>
                <p>For over 10 years, team Skyberry has been helping clients with brand identity and graphic design needs. Skyberry has almost 20 years of experience developing mission critical apps and websites!</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  },

});
