import React, { useState } from 'react';
import Image from 'next/image';

type Book = {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: {
      thumbnail?: string;
    };
    pageCount?: number;
    publishedDate?: string;
  };
};

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const thumbnail =
    book.volumeInfo.imageLinks?.thumbnail ||
    'https://via.placeholder.com/128x193.png?text=No+Image';
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDetailsClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="w-full  p-4">
      <div className="bg-white rounded-lg shadow-md h-full flex flex-col">
        <div className="relative w-full h-48 rounded-t-lg overflow-hidden">
          <Image
            src={thumbnail}
            alt={book.volumeInfo.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-4 flex-grow">
          <h3 className="text-lg font-semibold mb-2">{book.volumeInfo.title}</h3>
          <p className="text-sm text-gray-600">
            {book.volumeInfo.authors
              ? book.volumeInfo.authors.join(', ')
              : 'Unknown Author'}
          </p>
          <button
            className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-md"
            onClick={handleDetailsClick}
          >
            Details
          </button>
        </div>
      </div>
      <style jsx>{`
        .h-48 {
          height: 12rem;
        }
      `}</style>
      {/* Book details modal */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg mx-auto">
            <h2 className="text-xl font-bold mb-4">{book.volumeInfo.title}</h2>
            <p>Page Count: {book.volumeInfo.pageCount || 'N/A'}</p>
            <p>Published Date: {book.volumeInfo.publishedDate || 'N/A'}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {isModalOpen && <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 overflow-hidden" />}
    </div>
  );
};

export default BookCard;