import React, { useEffect, useState } from 'react'
import './Banner.css'
import axios from'../../axios'
import { API_KEY,IMAGE_URL } from '../../constants/constants'
import Youtube from 'react-youtube'


function Banner() {
  const[movie,setMovie]=useState()
  const[id1,setId1]=useState('')
  useEffect(()=>{
    axios.get(`/trending/all/week?api_key=${API_KEY}&language=en-US`).then((response)=>{
      console.log(response.data.results[0])
      setMovie(response.data.results[0])
    })
  },[])
  const opts={
    height:'390',
    width:'100%',
    playerVars:{
      autoplay:1,
      control:1,
    },
  };
  const handleMovie=(id)=>{
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response)=>{
      if(response.data.results.length!==0){
        setId1(response.data.results[0])
      }
      else{
        console.log("Trailer not available");
       }
    })
  
  }

  return (
    <div>
      {id1 && <Youtube opts={opts} videoId={id1.key}/> }
    <div style={{backgroundImage:`url(${movie ? IMAGE_URL+movie.backdrop_path:""})`}} className='banner' >
       
        <div className='content'>
          
            <h1 className='title'>{movie? (movie.title || movie.name): ""}</h1>
            <div className='banner_buttons'>
                <button onClick={()=>handleMovie(movie.id)} className='button'>Play</button>
                <button className='button'>My list</button>
            </div>
            <h1 className='description'>{movie? movie.overview:""}</h1>
        </div>

        <div className="fade_bottom"></div>
       
    </div></div>
  )
}

export default Banner