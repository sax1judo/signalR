import React from 'react';

const PageNumberInfoWrapper = props => {
	var numberFrom;
	var numberTo;

	if (props.postsPerPage * props.activePage === props.postsPerPage) {
		numberFrom = 1;
	} else {
		numberFrom = props.postsPerPage * props.activePage - props.postsPerPage + 1;
	}
	numberTo = props.postsPerPage * props.activePage;
	numberTo > props.totalPosts ? (numberTo = props.totalPosts) : (numberTo = numberTo);
	return (
		<div style={{ position: 'absolute', left: '0' }}>
			Showing {numberFrom} of {props.totalPosts} entries
		</div>
	);
};
export default PageNumberInfoWrapper;
