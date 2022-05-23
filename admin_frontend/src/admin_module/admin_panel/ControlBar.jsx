import { useState } from 'react';

export default function ControlBar({pagesCount, changeDisplayedPage, reloadList}){

    const [currentPage, setCurrentPage] = useState(0);
    
    const navigateToPage = (pageNumber) => {
        pageNumber = Math.min(pagesCount - 1, pageNumber);
        pageNumber = Math.max(0, pageNumber);
        changeDisplayedPage(pageNumber);
        setCurrentPage(pageNumber);
    }



    return(
        <div className="d-flex justify-content-between controlBarContainer">
            <div className="d-flex justify-content-between controlBar">
                <span className="controlBarBadge badge bg-info text-dark">Current Page: {currentPage + 1}</span>
                <button type="button" className="controlBarButton btn btn-dark"  onClick={() => navigateToPage(0)} >First</button>
                <button type="button" className="controlBarButton btn btn-secondary" onClick={() => navigateToPage(currentPage - 1)}>&lt;</button>
                <button type="button" className="controlBarButton btn btn-success" onClick={reloadList}>Reload List</button>
                <button type="button" className="controlBarButton btn btn-secondary" onClick={() => navigateToPage(currentPage + 1)}>&gt;</button>
                <button type="button" className="controlBarButton btn btn-dark" onClick={() => navigateToPage(pagesCount - 1)}>Last</button>
                <span className="controlBarBadge badge bg-info text-dark">Pages Count: {pagesCount}</span>
            </div>
        </div>
    );
}