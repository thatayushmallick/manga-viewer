import React, { useEffect, useState } from 'react';
import { getBookDetails, getChapterDetails } from '../api';
import './ChapterList.css'; // Import the CSS file

const ChapterList = ({ bookId, onSelectChapter }) => {
  const [chapterIds, setChapterIds] = useState([]);
  const [chapters, setChapters] = useState([]);

  // Fetch book details by bookId
  useEffect(() => {
    if (bookId) {
      getBookDetails(bookId)
        .then((res) => {
          console.log("Book details:", res.data);
          setChapterIds(res.data.chapter_ids || []); // Set the chapter IDs
        })
        .catch((error) => {
          console.error("Error fetching book details:", error);
        });
    }
  }, [bookId]);

  // Fetch each chapter detail by chapterId
  useEffect(() => {
    if (chapterIds.length > 0) {
      const fetchChapters = async () => {
        try {
          const chapterPromises = chapterIds.map((id) =>
            getChapterDetails(id)
          );
          const chapterResponses = await Promise.all(chapterPromises);
          setChapters(chapterResponses.map((res) => res.data)); // Set chapter details
        } catch (error) {
          console.error("Error fetching chapters:", error);
        }
      };

      fetchChapters();
    }
  }, [chapterIds]);

  return (
    <div className="chapter-list-container"> {/* Add this class */}
      {chapters.map((chapter) => (
        <button key={chapter.id} onClick={() => onSelectChapter(chapter.id)}>
          {chapter.title}
        </button>
      ))}
    </div>
  );
};

export default ChapterList;
