import React from 'react';
import Navbar from '../components/Navbar';

const HomePage = () => {
  return (
    <>
    <Navbar/>
    <div className="relative  overflow-hidden">
      
      <div className="min-h-screen relative ">
      <video src="popcorn.mp4"
        autoPlay
        loop
        muted
        className="absolute  w-full h-full object-cover"
      >
      </video>
     
      <div className='absolute inset-0 flex items-center justify-center'>
        </div> 
      </div>
    </div>
{/* separator */}
<div className='h-2  w-full bg-slate-900' ></div>

{/* 1st section */}
<div className='py-10 text-white'>
  <div className='flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2'>
    {/* left side */}
    <div className='flex-1 text-center md:text-left'>
    <h2 className='text-4xl  md:text-5xl font-extrabold mb-4'>Enjoy your favorite movies</h2>
     <p className='text-lg md:text-xl'>Discover new releases, timeless classics.Stay updated on the latest films and explore personalized recommendations on our movie website.</p>
    </div>
    {/* right side */}
    <div className='flex-1 mb-2'>
     <img src="pop.jpg" alt="" className='mt-4 ' />
    </div>
  </div>

{/* separator */}
<div className='h-2  w-full bg-slate-900' ></div>

{/* 2nd section */}
<div className='py-10 text-white'>
  <div className='flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2'>
    {/* left side */}
    <div className='flex-1 '>
    <img src="section2.gif" alt=""/>
    </div>
    {/* right side */}
    <div className='flex-1 '>
    <div className='flex-1 text-center md:text-left ml-1 p-4'>
    <h2 className='text-4xl  md:text-5xl font-extrabold mb-4'>Enjoy your favorite movies</h2>
     <p className='text-lg md:text-xl'>Discover new releases, timeless classics.Stay updated on the latest films and explore personalized recommendations on our movie website.</p>
    </div>
    </div>
  </div>
</div>
</div>
</>
  );
};


export default HomePage;

