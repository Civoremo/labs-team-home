import React from 'react';

// ------------- gql Imports ---------------------- //
import { Query } from 'react-apollo';
import { FIND_EVENTS_BY_TEAM } from '../../constants/queries';

// ------------- Component Imports ---------------------- //
import Activity from './Activity';
import ActivityModal from './ActivityModal';
import { StyledProgressSpinner } from '../../app-styles';
import Select from '@material-ui/core/Select';
import styled from 'styled-components';
import { MenuItem } from '@material-ui/core';
import { colors } from '../../colorVariables';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const ContainerDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const FormDiv = styled.div`
	width: 97%;
	display: flex;
	flex-direction: row-reverse;
`;
const StyledOutline = styled(OutlinedInput).attrs(() => ({
	labelWidth: 10
}))`
	height: 30px;
	border-radius: 5px;
`;

const StyledSelect = styled(Select)`
	background-color: rgb(143, 136, 150, 0.75);
	margin-left: 10px;
	color: ${colors.text};
`;

const SortForm = styled.form`
	height: 50px;
	margin-top: 20px;
	font-size: 16px;
	color: white;
`;

export default class ActivityTimeline extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			eventDetailOpen: false,
			currentEvent: null,
			sortOption: 'all'
		};
	}

	toggleEventDetail = event => {
		this.setState(prevState => ({
			eventDetailOpen: !prevState.eventDetailOpen,
			currentEvent: event
		}));
	};

	sortChange = e => {
		this.setState({ sortOption: e.target.value });
	};

	render() {
		// console.log('current props from activity timeline: ', this.props);
		return (
			<ContainerDiv>
				<FormDiv>
					<SortForm>
						<label>
							Sort:
							<StyledSelect
								value={this.state.sortOption}
								onChange={this.sortChange}
								input={<StyledOutline name="Sort" />}
							>
								<MenuItem value="all">All</MenuItem>
								<MenuItem value="message">Message</MenuItem>
								<MenuItem value="message comment">Message Comment</MenuItem>
								<MenuItem value="folder">Folder</MenuItem>
								<MenuItem value="document">Document</MenuItem>
								<MenuItem value="document comment">Document Comment</MenuItem>
								<MenuItem value="team">Team</MenuItem>
								<MenuItem value="user">User</MenuItem>
							</StyledSelect>
						</label>
					</SortForm>
				</FormDiv>
				{/* Queries for all Events, reflected every 5000ms (5 seconds)*/}
				<Query
					query={FIND_EVENTS_BY_TEAM}
					variables={{ team: this.props.team._id }} // limit: Int and offset: Int --available as variables
					pollInterval={5000}
				>
					{({ loading, error, data: { findEventsByTeam }, fetchMore }) => {
						if (loading) return <StyledProgressSpinner />;
						if (error) return <p>Error!</p>;

						if (findEventsByTeam && findEventsByTeam.length > 0) {
							findEventsByTeam.map(event => {
								if (typeof event.createdAt === 'string' && event.createdAt) {
									event.createdAt = new Date(parseInt(event.createdAt, 10));
								}
								return event;
							});

							// findEventsByTeam.sort((a, b) => {
							// 	if (a.createdAt < b.createdAt) return 1;
							// 	if (a.createdAt > b.createdAt) return -1;
							// 	return 0;
							// });

							const sortedEvents = findEventsByTeam.filter(event => {
								if (event.object_string === this.state.sortOption) {
									console.log('Event Object: ', event.object_string);
									return event;
								} else {
									if (this.state.sortOption === 'all') {
										return event;
									} else {
										return null;
									}
								}
							});

							return (
								<>
									{sortedEvents.map((event, index) => {
										if (event.user !== null) {
											return (
												<Activity
													event={event}
													key={index}
													own={
														event.user._id === this.props.currentUser._id
															? 'true'
															: 'false'
													}
													clickHandler={e => {
														e.preventDefault();
														e.stopPropagation();
														this.toggleEventDetail(event);
													}}
												/>
											);
										}
										return (
											<div key={index}>
												There is an event here but it was not recorded properly
											</div>
										);
									})}
									{/* Code Below is to Enable Pagination - Query above needs pollInterval commented out 
										to prevent refetching of data and override the pagination fetched*/}

									{/* <button
										onClick={e => {
											e.preventDefault();
											fetchMore({
												variables: { offset: findEventsByTeam.length },
												updateQuery: (prev, { fetchMoreResult }) => {
													if (!fetchMoreResult) return prev;
													return Object.assign({}, prev, {
														findEventsByTeam: [
															...prev.findEventsByTeam,
															...fetchMoreResult.findEventsByTeam
														]
													});
												}
											});
										}}
									>
										More ...
									</button> */}
								</>
							);
						} else {
							return <div> No events </div>;
						}
					}}
				</Query>
				<ActivityModal
					open={this.state.eventDetailOpen}
					hideModal={() => this.toggleEventDetail(null)}
					event={this.state.currentEvent}
					currentUser={this.props.currentUser}
					team={this.props.team}
					stopProp={e => e.stopPropagation()}
					{...this.props}
				/>
			</ContainerDiv>
		);
	}
}
