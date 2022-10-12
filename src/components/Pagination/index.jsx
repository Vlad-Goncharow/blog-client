import React from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';

import s from './Pagination.module.scss';

function Pagination({ items, setDocs }) {
  // ======== pageCount
  const [pageCount, setPageCount] = React.useState(0);
  // ======== pageCount

  // ======== itemOffset
  const [itemOffset, setItemOffset] = React.useState(0);
  // ======== itemOffset

  // ======== all posts
  const { posts } = useSelector((store) => store.posts);
  // ======== all posts

  // ======== calculate page count
  React.useEffect(() => {
    if (!posts.loading) {
      const endOffset = itemOffset + 8;
      setPageCount(Math.ceil(items?.length / 8));
      setDocs(items.slice(itemOffset, endOffset));
    }
  }, [posts.loading, itemOffset, items]);
  // ======== calculate page count

  // ======== change current page
  const handlePageClick = React.useCallback(
    (event) => {
      const newOffset = (event.selected * 8) % items?.length;
      setItemOffset(newOffset);
      document.documentElement.scrollTop = 0;
    },
    [items.length],
  );
  // ======== change current page

  return (
    <>
      {posts.loading === false && items.length <= 8 ? null : (
        <ReactPaginate
          breakLabel="..."
          nextLabel="Вперед"
          onPageChange={handlePageClick}
          pageRangeDisplayed={4}
          pageCount={pageCount}
          previousLabel="Назад"
          renderOnZeroPageCount={null}
          containerClassName={s.pagination}
          pageLinkClassName={s.pagination__item}
          activeLinkClassName={s.pagination__item_selected}
          previousClassName={s.pagination__prev}
          nextClassName={s.pagination__next}
          disabledClassName={s.pagination__dis}
          breakLinkClassName={s.pagination__break}
        />
      )}
    </>
  );
}

export default Pagination;
