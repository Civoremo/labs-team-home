import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

const styles = theme => ({
	'@global': {
		body: {
			backgroundColor: theme.palette.common.white
		}
	},

	toolbarTitle: {
		flex: 1
	},
	layout: {
		width: 'auto',
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
			width: 900,
			marginLeft: 'auto',
			marginRight: 'auto'
		}
	},
	heroContent: {
		maxWidth: 600,
		margin: '0 auto',
		padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
	},
	cardHeader: {
		backgroundColor: theme.palette.grey[200]
	},
	cardPricing: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'baseline',
		marginBottom: theme.spacing.unit * 2
	},
	cardActions: {
		[theme.breakpoints.up('sm')]: {
			paddingBottom: theme.spacing.unit * 2
		}
	},

	footer: {
		marginTop: theme.spacing.unit * 8,
		borderTop: `1px solid ${theme.palette.divider}`,
		padding: `${theme.spacing.unit * 6}px 0`
	}
});

const tiers = [
	{
		title: 'Free',
		price: '0',
		description: [
			'Up to 5 users per team',
			'Help center access',
			'Email support'
		],
		buttonText: 'Sign up for free',
		buttonVariant: 'outlined'
	},
	{
		title: 'Premium',
		subheader: 'Most popular',
		price: '10',
		description: [
			'Unlimited Users (per team)',
			'Help center access',
			'Priority email support'
		],
		buttonText: 'Get started',
		buttonVariant: 'contained'
	},
	{
		title: 'Enterprise',
		price: '50',
		description: ['Multiple teams?', 'Special requirements?', 'Contact us!'],
		buttonText: 'Contact us',
		buttonVariant: 'outlined'
	}
];
const footers = [
	{
		title: 'Company',
		description: ['Team', 'History', 'Contact us', 'Locations']
	},
	{
		title: 'Features',
		description: [
			'Cool stuff',
			'Random feature',
			'Team feature',
			'Developer stuff',
			'Another one'
		]
	},
	{
		title: 'Resources',
		description: [
			'Resource',
			'Resource name',
			'Another resource',
			'Final resource'
		]
	},
	{
		title: 'Legal',
		description: ['Privacy policy', 'Terms of use']
	}
];

const ModifiedTypography = styled(Typography)`
	color: #ffffff;
`;

const ModifiedButton = styled(Button)`
	background-color: purple;
	color: #ffffff;
`;

function Pricing(props) {
	const { classes } = props;

	return (
		<React.Fragment>
			<CssBaseline />

			<main className={classes.layout}>
				{/* Hero unit */}
				<div className={classes.heroContent}>
					<ModifiedTypography
						component="h1"
						variant="h2"
						align="center"
						color="textPrimary"
						gutterBottom
					>
						Our Pricing
					</ModifiedTypography>
					<ModifiedTypography
						variant="h6"
						align="center"
						color="textSecondary"
						component="p"
					>
						Our pricing system is simple and flexible for our users. If your
						company has special considerations, please contact us at your
						earliest convinience. We will be happy to build out a custom,
						enterprise solution to your buisness needs.
					</ModifiedTypography>
				</div>
				{/* End hero unit */}
				<Grid container spacing={40} alignItems="flex-end">
					{tiers.map(tier => (
						// Enterprise card is full width at sm breakpoint
						<Grid
							item
							key={tier.title}
							xs={12}
							sm={tier.title === 'Enterprise' ? 12 : 6}
							md={4}
						>
							<Card>
								<CardHeader
									title={tier.title}
									subheader={tier.subheader}
									titleTypographyProps={{ align: 'center' }}
									subheaderTypographyProps={{ align: 'center' }}
									action={tier.title === 'Pro' ? <StarIcon /> : null}
									className={classes.cardHeader}
								/>
								<CardContent>
									<div className={classes.cardPricing}>
										<Typography component="h2" variant="h3" color="textPrimary">
											${tier.price}
										</Typography>
										<Typography variant="h6" color="textSecondary">
											/mo
										</Typography>
									</div>
									{tier.description.map(line => (
										<Typography variant="subtitle1" align="center" key={line}>
											{line}
										</Typography>
									))}
								</CardContent>
								<CardActions className={classes.cardActions}>
									<ModifiedButton
										fullWidth
										variant={tier.buttonVariant}
										color="primary"
									>
										{tier.buttonText}
									</ModifiedButton>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			</main>
			{/* Footer */}
			<footer className={classNames(classes.footer, classes.layout)}>
				<Grid container spacing={32} justify="space-evenly">
					{footers.map(footer => (
						<Grid item xs key={footer.title}>
							<ModifiedTypography variant="h6" color="textPrimary" gutterBottom>
								{footer.title}
							</ModifiedTypography>
							{footer.description.map(item => (
								<ModifiedTypography
									key={item}
									variant="subtitle1"
									color="textSecondary"
								>
									{item}
								</ModifiedTypography>
							))}
						</Grid>
					))}
				</Grid>
			</footer>
			{/* End footer */}
		</React.Fragment>
	);
}

Pricing.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Pricing);
