import React from 'react';
import ComponentWrapper from '../General/ComponentWrapper';
import '../../style/General/Pagination.scss';

const Pagination = props => {
	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<nav className="paginationMyWrapper">
			<ul className="pagination">
				{pageNumbers.length <= 1 ? null : (
					<ComponentWrapper>
						<li className={props.activePage !== 1 ? 'page-item ' : 'page-item disabled'}>
							<span className="page-link" onClick={() => props.paginate('previous')}>
								Previous
							</span>
						</li>
						{pageNumbers.map(number => (
							<li key={number} className={props.activePage !== number ? 'page-item' : 'page-item active'}>
								<a onClick={() => props.paginate(number)} className="page-link">
									{number}
								</a>
							</li>
						))}
						<li className={props.activePage !== pageNumbers.length ? 'page-item ' : 'page-item disabled'}>
							<a className="page-link" onClick={() => props.paginate('next')}>
								Next
							</a>
						</li>
					</ComponentWrapper>
				)}
			</ul>
		</nav>
	);
};
export default Pagination;
