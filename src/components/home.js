import React, { Component } from 'react';
import { Icon } from 'antd';
import { connect } from 'react-redux';

class Home extends Component {
	componentDidUpdate = prevProps => {
		const {
			history,
			user: {
				details: { _id }
			},
			state: { stateRehydrated }
        } = this.props;

		if (!prevProps.state.stateRehydrated && stateRehydrated) {
			if (typeof _id === 'undefined') {
				history.push('/auth/login');
			} else {
				history.push('/dashboard');
			}
		}
    };

	render = () => {
		return (
			<div className="page-loader-container">
				<Icon type="loading" />
			</div>
		);
	};
}

const mapStateToProps = ({ state, user }) => {
	return { state, user };
};

export default connect(
	mapStateToProps,
	{}
)(Home);
