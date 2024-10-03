import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user from localStorage on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className='w-full  fixed top-0 z-40 text-white'>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4"> {/* Space between icon and title */}
          <Link to="/">
            <img className='w-16' src="/movie.gif" alt="movie" />
          </Link>
          <div className="text-lg md:text-2xl font-bold mt-6">FliveNix</div>
        </div>

        <div className="flex items-center space-x-6 gap-4"> {/* Space between Movie link and welcome message */}
          {user && (
            <Link to="/user/movie">
              <h2 className="text-lg md:text-2xl font-bold underline cursor-pointer ml-8 mt-6 md:mt-0">Movie</h2>
            </Link>
          )}
          {user ? (
            <div className="flex items-center">
              <img src="user.gif" alt="" className='w-10 h-10 mr-2 rounded-full' />
              <span className="text-lg md:text-2xl font-semibold">Welcome, {user.username}</span>
            </div>
          ) : (
            <Link to="/user/signup">
              <button className="bg-transparent hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-full border border-white">
                Sign Up
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
