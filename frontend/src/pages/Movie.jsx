import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu, Play, Info } from 'lucide-react';
import useGetTrendingContent from '../hooks/useGetTrendingContent';
import { MOVIES_CATEGORIES, ORIGINAL_IMG_BASE_URL, TV_CATEGORIES } from '../constants/ImagePath.js';
import MovieSlider from '../components/MovieSlider.jsx';
import { useContentStore } from '../store/content.js';


const Movie = () => {
  const [mobileMenu, setmobileMenu] = useState(false);
  const [user, setUser] = useState({});
  const { contentType, setContentType } = useContentStore()
  console.log('content:', contentType);

  const navigate = useNavigate();


  const { trendingContent } = useGetTrendingContent(contentType)
  console.log('trending:', trendingContent);

  const toggleMobileMenu = () => {
    setmobileMenu(!mobileMenu);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };


  return (
    <>
      {/* Header Section */}
      <header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20'>
        <div className='flex items-center justify-between my-2 px-1'>
          <div className='flex items-center'>
            <Link to={'/'}>
              <img className='w-14 ml-2' src='/movie.gif' alt='movie' />
            </Link>
            <div className='ml-4 mt-2 text-white text-2xl font-bold'>FliveNix</div>
          </div>
        </div>
        <div className='hidden sm:flex gap-10 items-center text-white text-xl font-semibold'>
          <Link to={'/movies'} className='hover:underline' onClick={() => setContentType('movie')}>
            Movies
          </Link>
          <Link to={'/tvshows'} className='hover:underline' onClick={() => setContentType('tv')}>
            TV Shows
          </Link>

        </div>
        <div className='flex gap-3 items-center z-50'>
          <button
            onClick={handleLogout}
            className='bg-red-500 text-white rounded-md border p-2 font-semibold hover:bg-red-600 transition duration-300'
          >
            Logout
          </button>
          <div className='sm:hidden'>
            <Menu className='size-6 cursor-pointer text-white' onClick={toggleMobileMenu} />
          </div>
        </div>
        {/* Mobile Menu */}
        {mobileMenu && (
          <div className='w-full sm:hidden mt-4 z-50 bg-white rounded-lg text-black font-semibold'>
            <Link to={'/movies'} className='hover:underline block pl-4 py-2'  onClick={() => {
        setContentType('movie'); // Set content type to movie
        toggleMobileMenu();      // Close the mobile menu
      }}>
              Movies
            </Link>
            <Link to={'/tvshows'} className='hover:underline block pl-4 py-2' onClick={() => {
              setContentType('tv'); // Set content type to movie
              toggleMobileMenu();      // Close the mobile menu
            }}>
              TV Shows
            </Link>
          </div>
        )}
      </header>

      {/* Main Movie Section */}
      {/* Main Movie Section */}
<div className='relative'>
  {/* Background Image for Mobile */}
  <div className='sm:hidden'>
    <img
      src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path}
      alt=''
      className='w-full h-auto object-contain'
    />
  </div>

  {/* Background Image for Desktop */}
  <div className='hidden sm:block h-screen'>
    <img
      src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path}
      alt=''
      className='absolute top-0 left-0 w-full h-full object-cover'
    />
    
    {/* Dark Overlay */}
    <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10' />
  </div>

  {/* Movie Info */}
  <div className='relative z-20 flex flex-col justify-center text-white max-w-2xl mx-auto h-full px-8 py-6 sm:py-0'>
    <h1 className='text-3xl sm:text-6xl font-extrabold leading-tight'>
      {trendingContent?.title || trendingContent?.name}
    </h1>
    <p className='text-md sm:text-lg mt-2'>
      {trendingContent?.release_date?.split("-")[0] || trendingContent?.first_air_date.split("-")[0]}{" "}
      | {trendingContent?.adult ? "18+" : "PG-13"}
    </p>

    <p className='text-sm sm:text-lg mt-4'>
      {trendingContent?.overview?.length > 200
        ? trendingContent.overview.slice(0, 200) + '...'
        : trendingContent?.overview}
    </p>

          {/* Buttons */}
          <div className='flex mt-8 mb-6'>
            <Link
              to={`/watch/${trendingContent?.id}`}
              className='bg-white text-black font-bold py-2 px-4 rounded-md flex items-center hover:bg-gray-300 transition duration-300'
            >
              <Play className='w-6 h-6 mr-2 fill-black' />
              Play
            </Link>
            <Link
              to={`/watch/${trendingContent?.id}`}
              className='bg-gray-500 text-white font-semibold py-2 px-4 rounded-md flex items-center hover:bg-gray-400 ml-4 transition duration-300'
            >
              <Info className='w-6 h-6 mr-2' />
              More Info
            </Link>
          </div>
        </div>
      </div>

      {/* slider */}
      <div className='flex gap-10 flex-col py-10'>
        {contentType === 'movie' ? (
          MOVIES_CATEGORIES.map((category) => <MovieSlider key={category} category={category} />)
        ) : (TV_CATEGORIES.map((category) => <MovieSlider key={category} category={category} />)
        )}
      </div>
    </>
  );
};

export default Movie;
