import React, { useState } from 'react';
import BookList from './components/BookList';
import ChapterList from './components/ChapterList';
import MangaViewer from './components/MangaViewer';
import { getBookDetails } from './api'; // Import the API function to fetch book details

const App = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [chapterIds, setChapterIds] = useState([]);

  const handleSelectBook = async (bookId) => {
    setSelectedBook(bookId);
    setSelectedChapter(null);
    const ids = await getChapterIds(bookId); // Fetch chapter IDs for the selected book
    setChapterIds(ids);
  };

  const getChapterIds = async (bookId) => {
    const response = await getBookDetails(bookId); // Fetch book details
    return response.data.chapter_ids; // Extract chapter IDs
  };

  const currentChapterIndex = chapterIds.indexOf(selectedChapter);
  const nextChapterId = chapterIds[currentChapterIndex + 1];
  const previousChapterId = chapterIds[currentChapterIndex - 1];

  return (
    <div>
      <BookList onSelectBook={handleSelectBook} />
      {selectedBook && (
        <ChapterList bookId={selectedBook} onSelectChapter={setSelectedChapter} />
      )}
      {selectedChapter && (
        <MangaViewer
          chapterId={selectedChapter}
          nextChapterId={nextChapterId}
          previousChapterId={previousChapterId}
        />
      )}
    </div>
  );
};

export default App;
