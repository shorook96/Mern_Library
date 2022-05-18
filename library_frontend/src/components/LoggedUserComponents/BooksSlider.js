import PaginationComponent from './PaginationComponent';
import { UseAuth } from '../Helpers/Auth';

const BooksSlider = () => {
  const { user } = UseAuth();

  return (
    <>
      {/* <PaginationComponent
        itemsCount={books.length}
        RenderComponent={ItemComponent}
        contentPerPage={6}
        title="books"
        buttonConst={3}
        siblingCount={6}
      /> */}

      <PaginationComponent />
    </>
  );
};

export default BooksSlider;
