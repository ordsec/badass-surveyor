import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="Badass Surveyor"
        description="$5.00 for 5 email credits"
        // amount is in USD cents
        amount={500}
        // this is not a token but a callback
        // that will be executed after token
        // representing the charge is received
        // from Stripe's API - think of it as
        // onTokenReceived or something
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">
          Add Credits
        </button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);
