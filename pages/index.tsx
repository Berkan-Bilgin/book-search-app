import React, { useState } from 'react';
import { useGoogleBooksSearch } from '@/hooks/useGoogleBooksSearch';
import BookCard from '@/components/BookCard';
import Link from 'next/link';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const { books, setBooks, loading, error } = useGoogleBooksSearch(submittedQuery, 12);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedQuery(searchQuery);
    console.log(books);
  };

  const resetSearch = () => {
    setBooks([]);
    setSearchQuery('');
    setSubmittedQuery('');
  };

  return (
    <div>
      <header className="bg-violet-600 text-white py-4 fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <h1
            className="text-lg font-bold cursor-pointer"
            onClick={resetSearch}
          >
            My Book Search App
          </h1>
          <form onSubmit={handleSubmit} className="flex-shrink-0 ml-4">
            <div className="flex">
              <input
                className="text-black w-64 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Search for books"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="ml-2 px-4 py-2 bg-orange-600 text-white rounded-md"
                type="submit"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </header>
      <div className="container mx-auto px-4 py-16">
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            books.map((book) => <BookCard key={book.id} book={book} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default App;