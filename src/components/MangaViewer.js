import React, { useState, useEffect } from 'react';
import { getChapterDetails } from '../api';
import './MangaViewer.css';

const MangaViewer = ({ chapterId, nextChapterId, previousChapterId }) => {
  const [chapterData, setChapterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  useEffect(() => {
    const fetchChapterDetails = async () => {
      const response = await getChapterDetails(chapterId);
      setChapterData(response.data);
      setCurrentPageIndex(0);
      setLoading(false);
    };

    fetchChapterDetails();
  }, [chapterId]);

  if (loading) {
    return;
  }

  if (!chapterData) {
    return <div>No chapter data available</div>;
  }

  const handlePageClick = (event) => {
    const clickPosition = event.clientX;
    const screenWidth = window.innerWidth;

    if (clickPosition < screenWidth / 2) {
      goToNextPage();
    } else {
      goToPreviousPage();
    }
  };

  const goToNextPage = () => {
    if (currentPageIndex < chapterData.pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    } else if (nextChapterId) {
      setLoading(true);
      getChapterDetails(nextChapterId).then((response) => {
        setChapterData(response.data);
        setCurrentPageIndex(0);
        setLoading(false);
      });
    }
  };

  const goToPreviousPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    } else if (previousChapterId) {
      setLoading(true);
      getChapterDetails(previousChapterId).then((response) => {
        setChapterData(response.data);
        setCurrentPageIndex(response.data.pages.length - 1);
        setLoading(false);
      });
    }
  };

  const currentPage = chapterData.pages[currentPageIndex];

  return (
    <div className="viewer-container" onClick={handlePageClick}>
      <div className="image-container">
        <img
          src={currentPage.image.file}
          alt={`Page ${currentPage.page_index}`}
          className="responsive-image"
        />
      </div>
      <p>{currentPageIndex + 1} / {chapterData.pages.length}</p>
    </div>
  );
};

export default MangaViewer;
