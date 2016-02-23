import React, {PropTypes} from 'react';
import PureRender from 'react-addons-pure-render-mixin';
import {Grid, Row, Col} from 'react-bootstrap';

import {formatDate} from '../../utils/DateUtils';
import {formatMoney} from '../../utils/MoneyUtils';
import {Fetching} from '../../components';
import AccountSelector from './AccountSelector';
import './Billing.less';


export default React.createClass({
  displayName: 'Billing',

  mixins: [PureRender],

  componentWillMount: function() {
    this.fetchAsNeeded();
  },
  componentWillReceiveProps(nextProps) {
    if(!nextProps.isFetching) {
      this.fetchAsNeeded(nextProps);
    }
  },
  fetchAsNeeded: function(useProps) {
    const props = useProps || this.props;
    if(!props.isFetching && !props.hasFetchedProject && !!props.accountSlug) {
      props.fetchAccountAsNeeded(props.accountSlug);
    }
  },
  isFetching: function() {
    return this.props.isFetching || this.props.isFetchingDetails;
  },
  getSelectedAccountName: function() {
    return this.props.account
      ? this.props.account.name
      : '';
  },
  hasAccountOptions: function() {
    return this.props.accountOptions.length > 1;
  },
  hasInvoices: function() {
    return this.props.account && this.props.account.invoices && this.props.account.invoices.length > 0;
  },
  hasPayments: function() {
    return this.props.account && this.props.account.payments && this.props.account.payments.length > 0;
  },
  getInvoices: function() {
    return [] && this.props.account && this.props.account.invoices || [];
  },
  getPayments: function() {
    return [] && this.props.account && this.props.account.payments || [];
  },
  getBalance: function() {
    const invoicesTotal = this.getInvoices().reduce((accum, invoice) => {
      accum += invoice.amount;
      return accum;
    }, 0);
    const paymentsTotal = this.getPayments().reduce((accum, payment) => {
      accum += payment.amount;
      return accum;
    }, 0);
    return invoicesTotal - paymentsTotal;
  },


  render: function() {
    return (
      <div id='billing' className='mt'>
        <Grid fluid={true}>
          <Row>
            <Col xs={12}>
              <h1><span>Billing</span><span className="accent"> for </span><span className="nowrap">{this.getSelectedAccountName()}</span></h1>
            </Col>
          </Row>
          {this.hasAccountOptions() && this.renderAccountSelector()}
          {this.isFetching()
            ? <Fetching />
            : this.renderBillingContent()}
        </Grid>
      </div>
    );
  },
  renderAccountSelector: function() {
    return (
      <AccountSelector
        hasFetched={this.props.hasFetchedAccounts}
        accountOptions={this.props.accountOptions}
        accountSlug={this.props.accountSlug}
        changeAccount={this.props.changeAccount} />
    );
  },
  renderBillingContent: function() {
    return (

      <Row>
        <Col xs={12}>
          {this.renderBillingSummary()}
        </Col>
        <Col xs={12}>
          {this.renderPaymentSummary()}
        </Col>
        <Col xs={12}>
          {this.renderInvoiceSummary()}
        </Col>
      </Row>

    );
  },

  renderPaymentSummary: function() {
    return (
      <fieldset className='mt'>
        <legend><h2>Payments</h2></legend>
        {this.hasPayments()
          ? this.renderPayments()
          : this.renderNoPaymentsFound()
        }
      </fieldset>
    );
  },
  renderPayments: function() {
    const payments = this.props.account.payments.map(item => {
      return (
        <div className='tbl-row' key={item.id}>
          <div className='money'>{formatMoney(item.amount)}</div>
          <div>{item.paymentType}</div>
          <div className='date'>{formatDate(item.paymentDate)}</div>
        </div>
      );
    });

    return (
      <div className='tbl'>
        <div className='tbl-row head'>
          <div>Amount</div>
          <div>Payment&nbsp;Type</div>
          <div className='date'>Payment&nbsp;Date</div>
        </div>
        {payments}
      </div>
    );
  },
  renderNoPaymentsFound: function() {
    return (
      <p>no payments found...</p>
    )
  },

  renderInvoiceSummary: function() {
    return (
      <fieldset className='mt'>
        <legend><h2>Invoices</h2></legend>
        {this.hasInvoices()
          ? this.renderInvoices()
          : this.renderNoInvoicesFound()
        }
      </fieldset>
    );
  },
  renderInvoices: function() {
    const invoices = this.props.account.invoices.map(item => {
      return (
        <div className='tbl-row' key={item.invoiceNumber}>
          <div className='id'>{item.invoiceNumber}</div>
          <div className='money'>{formatMoney(item.amount)}</div>
          <div className='date'>{formatDate(item.sentDate)}</div>
          <div className='date'>{formatDate(item.dueDate)}</div>
          <div className='link'><a href={'/api/documents/' + item.id}>{item.filenameOriginal}</a></div>
        </div>
      );
    });

    return (
      <div className='tbl'>
        <div className='tbl-row head'>
          <div className='id'>#</div>
          <div>Amount</div>
          <div className='date'>Invoice&nbsp;Date</div>
          <div className='date'>Due&nbsp;Date</div>
          <div></div>
        </div>
        {invoices}
      </div>
    );
  },
  renderNoInvoicesFound: function() {
    return (
      <p>no invoices found...</p>
    )
  },

  renderBillingSummary: function() {
    const balance = this.getBalance();
    const hasBalance = balance > 0;
    const amountDue = formatMoney(balance);

    return (
      <fieldset className='mt'>
        <legend><h2>Billing Summary</h2></legend>
        <div className='tbl'>
          <div className='tbl-row'>
            <div className="d_item">Balance</div>
            <div className="d_data">{amountDue}</div>
            <div>
              {hasBalance
                ? this.renderPaymentOptions(balance)
                : this.renderNoBlance()}
            </div>
          </div>
        </div>
        </fieldset>
    );
  },
  renderNoBlance: function() {
    return (
      <div id="pay_thankYou">
        <div className="d_item">Thank you for your business!</div>
      </div>
    );
  },
  renderPaymentOptions: function(balance) {
    return (
      <div className="paypal-wrap">
        <div className="paypal">
          <form action="https://www.paypal.com/cgi-bin/webscr" method="post" id="frm-paypal">
            <input type="hidden" name="cmd" value="_xclick" />
            <input type="hidden" name="business" value="lacey@skyberrystudio.com" />
            <input type="hidden" name="amount" value={balance} />
            <input type="hidden" name="item_name" value="Payment via www.skyberrystudio.com website for @Model.User.FirstName @Model.User.LastName, account #@Model.Account.Number." />
            <input type="hidden" name="custom" value={balance} />
            <input type="hidden" name="invoice" value="" />
            <input type="hidden" name="image_url" value="https://skyberrystudio.com/images/skyberry_logo_190x50.png" />
            <input type="hidden" name="cpp_header_image" value="https://skyberrystudio.com/images/skyberry_logo_750x50.png" />
            <input type="hidden" name="cpp_headerback_color" value="e6e6e6" />
            <input type="hidden" name="cpp_headerborder_color" value="e6e6e6" />
            <input type="hidden" name="no_note" value="1" />
            <input type="hidden" name="no_shipping" value="1" />
            <input type="hidden" name="return" value="https://skyberrystudio.com/my-account/summary" />
            <input type="hidden" name="cancel_return" value="https://skyberrystudio.com/my-account/summary" />
            <input type="hidden" name="rm" value="2" />
            <input type="hidden" name="cbt" value="Return to Skyberry Studio&trade;." />
            <button type="submit" className="btn btn-sky mv-half">Pay Now</button>
          </form>
        </div>
        <div className="pay-now">
          <img src="/content/images/paypal-payments.png" className='img-responsive' alt="PayPal payment options" />
        </div>
      </div>
    );
  },

});
