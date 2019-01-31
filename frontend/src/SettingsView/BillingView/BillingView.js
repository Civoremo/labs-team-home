import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Logo from '../../assets/TH_favicon.png';

const STRIPE_SOURCE = gql`
	mutation setPremium($team: ID!, $amount: Int!, $token: String!) {
		setPremium(input: { id: $team, charge: $amount, source: $token }) {
			_id
		}
	}
`;

const BillingView = () => {
	const publishableKey = 'pk_test_GedRIIhEwHrV1xzzkxMsRuUX';

	return (
		<Mutation mutation={STRIPE_SOURCE}>
			{(setPremium, { data }) => (
				<StripeCheckout
					label="Go Premium" //Component button text
					name="TeamHome" //Modal Header
					description="Upgrade to a premium account today."
					panelLabel="Go Premium" //Submit button in modal
					amount={999} //Amount in cents $9.99
					token={token =>
						setPremium({
							variables: {
								//need to un hard code this later
								team: '5c37dc6d9c1469aa08f703e2',
								amount: 999,
								token: token.id
							}
						})
							.then(res => {
								console.log(res);
								alert('Payment Success');
							})
							.catch(err => {
								console.log(err);
								alert('Payment Error');
							})
					}
					stripeKey={publishableKey}
					// image={Logo} //Pop-in header image
					image="https://i.imgur.com/JZmk8zB.jpg" //use above when not prod
					billingAddress={false}
				/>
			)}
		</Mutation>
	);
};

export default BillingView;
