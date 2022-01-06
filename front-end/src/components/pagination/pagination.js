import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className='pagination justify-content-center'>
                <li class="page-item " >
                    <button disabled={currentPage <= 1} onClick={() => paginate(currentPage - 1)} class="page-link" href="#!">
                        Previous
                    </button>
                </li>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <a onClick={() => paginate(number)} href='#!' className='page-link'>
                            {number}
                        </a>
                    </li>
                ))}
                <li class="page-item">
                    <button disabled={currentPage >= Math.ceil(totalPosts / postsPerPage) } onClick={() => paginate(currentPage + 1)} class="page-link" href="#!">
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;