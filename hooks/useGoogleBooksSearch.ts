import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "AIzaSyCo6ZgvGdxWZARMmTWDHHvKne-7BT54IMs";

export const useGoogleBooksSearch = (query: string, maxResults: number = 10) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!query) return;

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&key=${API_KEY}`
        );
        setBooks(response.data.items);
      } catch (error) {
        console.log("Hata detayları:", error.response.data);
        setError(error);
      }

      setLoading(false);
    };

    fetchBooks();
  }, [query, maxResults]);

  return { books, loading, error, setBooks };
};