import React, { useEffect,useRef,useState} from 'react'
import { useContentStore } from '../store/content.js'
import { Link } from 'react-router-dom'
import axios from  'axios'
import {SMALL_IMG_BASE_URL} from '../constants/ImagePath.js'
import { ChevronLeft,ChevronRight } from 'lucide-react'

const MovieSlider = ({category}) => {
    const {contentType} = useContentStore()
    const [content, setcontent] = useState([])
    const [showArrows, setshowArrows] = useState(false)

    const sliderRef = useRef(null)

    const formattedContentType = contentType==='movie'?'Movies':'Tv Shows'
    const formattedCategory = category.replaceAll("_"," ")

    useEffect(()=>{
       const getContent = async()=>{
        try{
           const res = await axios.get(`http://localhost:3000/api/${contentType}/${category}`)
           setcontent(Array.isArray(res.data.content) ? res.data.content : []);
       }catch(error){
        console.error('Error fetching content:', error);
       }
    }
       getContent()
    },[contentType,category])

    const scrollLeft = ()=>{
      if(sliderRef.current){
        sliderRef.current.scrollBy({left:-sliderRef.current.offsetWidth,behavior:'smooth'})
      }
    }
    const scrollRight = ()=>{
        sliderRef.current.scrollBy({left:sliderRef.current.offsetWidth,behavior:'smooth'})
    }
    
  return (
    <div className='text-white relative px-5 md:px-20' onMouseEnter={()=>setshowArrows(true)} onMouseLeave={()=> setshowArrows(false)}>
        <h2 className='font-bold mb-4 text-2xl'>
      {formattedCategory} {formattedContentType}
      </h2>
     <div className='flex space-x-4 overflow-x-scroll scrollbar-hide' ref={sliderRef}>
     {content.map((item)=>(
      <Link to={`/watch/${item.id}`} className='min-w-[250px] relative group' key={item.id}>
        <div className='rounded-lg overflow-hidden'>
        <img src={SMALL_IMG_BASE_URL+item.backdrop_path} alt="" className='transition-transform duration-300 ease-in-out group-hover:scale-125'/>
        </div>
        <p className='mt-2 text-center'>{item.title || item.name}</p>
      </Link>
     ))}
     </div>
     {showArrows && (
      <>
      <button className='absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center size-10 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white' onClick={scrollLeft}>
        
        <ChevronLeft className='size={24}'/>

      </button>
      <button className='absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center size-10 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white'onClick={scrollRight}>
        
        <ChevronRight className='size={24}'/>

      </button>
      </>
     )}
    </div>
  )
}

export default MovieSlider
