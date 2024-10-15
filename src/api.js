import axios from 'axios';

const API_URL = 'http://52.195.171.228:8080/';

export const getBooks = () => axios.get(`${API_URL}books/`);
export const getBookDetails = (bookId) => axios.get(`${API_URL}books/${bookId}/`);
export const getChapterDetails = (chapterId) => axios.get(`${API_URL}chapters/${chapterId}/`);
