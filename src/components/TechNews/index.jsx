'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTechNews,resetTechNews  } from '@/src/features/techNewsSlice';
import NewsCard from '../NewsCard'; // Adjust the path if needed

const TechNews = () => {
  const dispatch = useDispatch();
  const { items, status, error, hasMore } = useSelector((state) => state.techNews);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(resetTechNews());
    dispatch(fetchTechNews(1));
    setPage(1);
  }, [dispatch]);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop
      >= document.documentElement.offsetHeight - 100
    ) {
      if (status !== 'loading' && hasMore) {
        setPage((prev) => prev + 1);
      }
    }
  }, [status, hasMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="w-full">
      <div className="mx-auto lg:w-[40%] w-full p-4 md:w-[70%]">
        <h2 className="text-2xl font-semibold mb-6">📰 Tech News</h2>

        {items.map((news, index) => (
          <NewsCard key={index} news={news} />
        ))}

        {status === 'loading' && <p className="text-sm text-gray-500">Loading more news...</p>}
        {status === 'failed' && <p className="text-red-500">Error: {error}</p>}
        {!hasMore && <p className="text-center mt-4 text-sm text-gray-400">You've reached the end!</p>}
      </div>
    </div>
  );
};

export default TechNews;
