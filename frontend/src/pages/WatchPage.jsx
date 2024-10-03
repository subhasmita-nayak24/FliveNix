import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useContentStore } from '../store/content'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ReactPlayer from 'react-player'
import { formatReleaseDate } from "../utils/dateFunction";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from '../constants/ImagePath'



const WatchPage = () => {
    const { id } = useParams()
    const { contentType } = useContentStore() // Ensure you're getting contentType correctly
    const [trailers, setTrailers] = useState([])
    const [currentTrailerIndex, setCurrentTrailerIndex] = useState(0)
    const [loading, setLoading] = useState(true)
    const [similarContent, setsimilarContent] = useState([])
    const [content, setContent] = useState({})
    const sliderRef = useRef(null)

    useEffect(() => {
        const getTrailers = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/${contentType}/${id}/trailers`)
                setTrailers(res.data.trailers)
            } catch (error) {
                if (error.message.includes("404")) {
                    setTrailers([]);
                }
            }
            setLoading(false)
        }
        getTrailers()
    }, [contentType, id])


    useEffect(() => {
        const getSimilarContent = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/${contentType}/${id}/similar`)
                setsimilarContent(res.data.similar)
            } catch (error) {
                if (error.message.includes("404")) {
                    setsimilarContent([]);
                }
            }
            setLoading(false)
        }
        getSimilarContent()
    }, [contentType, id])
    // console.log('similar:', similarContent);

    useEffect(() => {
        const getContentDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/${contentType}/${id}/details`)
                setContent(res.data.content)
            } catch (error) {
                if (error.message.includes("404")) {
                    setContent(null);
                }
            }
            setLoading(false)
        }
        getContentDetails()
    }, [contentType, id])
    // console.log('details:', content);

    const handleNext = () => {
        if (currentTrailerIndex < trailers.length - 1) {
            setCurrentTrailerIndex(currentTrailerIndex + 1)
        }
    }

    const handlePrev = () => {
        if (currentTrailerIndex > 0) {
            setCurrentTrailerIndex(currentTrailerIndex - 1)
        }
    }

    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: 'smooth' })
        }
    }
    const scrollRight = () => {
        sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: 'smooth' })
    }


    return (
        <>
            <header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20'>
                <div className='flex items-center justify-between my-2 px-1'>
                    <div className='flex items-center'>
                        <Link to={'/'}>
                            <img className='w-14 ml-2' src='/movie.gif' alt='movie' />
                        </Link>
                        <div className='ml-4 mt-2 text-white text-2xl font-bold'>FliveNix</div>
                    </div>
                </div>
            </header>
            <div className='bg-black min-h-screen text-white'>
                <div className='mx-auto px-4 py-8 h-full'>
                    {trailers.length > 0 && (
                        <div className='flex justify-between items-center mb-4'>
                            <button className={`bg-gray-500 py-2 px-4 rounded-lg ${currentTrailerIndex === 0 ? 'cursor-not-allowed opacity-50' : ""}}
                                `}
                                disabled={currentTrailerIndex === 0}
                                onClick={handlePrev}

                            >
                                <ChevronLeft size={24} />
                            </button>

                            <button className={`bg-gray-500 py-2 px-4 rounded-lg ${currentTrailerIndex === trailers.length - 1 ? 'cursor-not-allowed opacity-50' : ""}}
                                `}
                                disabled={currentTrailerIndex === trailers.length - 1}
                                onClick={handleNext}
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    )}
                    <div className='aspect-video mb-8 p-2 sm:px-10 md:px-32'>
                        {trailers.length > 0 && (
                            <ReactPlayer
                                controls={true}
                                width={"100%"}
                                height={"70vh"}
                                className='mx-auto overflow-hidden rounded-lg'
                                url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIndex].key}`}
                            />
                        )}
                        {trailers?.length === 0 && (
                            <h2 className='text-xl text-center mt-5'>
                                No trailers available for{" "}
                                <span className='font-bold text-red-600'>{content?.title || content?.name}</span> 😥
                            </h2>
                        )}
                    </div>
                    {/* movie details */}
                    <div className='flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto'>
                        <div className='mb-4 md:mb-0 '>
                            <h2 className='text-5xl font-bold text-balance'>{content?.title || content?.name}</h2>
                            <p className='mt-2 text-lg'>
                                {formatReleaseDate(content?.release_date || content?.first_air_date)} |{" "}
                                {content?.adult ? (
                                    <span className='text-red-600'>18+</span>
                                ) : (
                                    <span className='text-green-600'>PG-13</span>
                                )}{" "}</p>
                            <p className='mt-4 text-lg'>{content?.overview}</p>
                        </div>
                        <img src={ORIGINAL_IMG_BASE_URL + content.poster_path} alt="" className='max-h-[600px] rounded-md' />
                    </div>
                    {similarContent.length > 0 && (
                        <div className='mt-12 max-w-5xl mx-auto relative'>
                            <h3 className='font-bold text-3xl mb-4'>Similar Movies/Tv Shows</h3>
                            <div className='flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group' ref={sliderRef}>
                                {similarContent.map((content) => {
                                    if (content.poster_path === null) return null;
                                    return (
                                        <Link key={content.id} to={`/watch/${content.id}`} className='w-52 flex-none'>
                                            <img src={SMALL_IMG_BASE_URL + content.poster_path} alt="" className='w-full h-auto rounded-md' />
                                            <h4 className='mt-2 text-lg font-semibold'>{content.title || content.name}</h4>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default WatchPage
