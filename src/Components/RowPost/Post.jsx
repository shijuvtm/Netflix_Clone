import React,{useEffect,useState} from 'react'
import './Post.css'
import axios from'../../axios'
import {IMAGE_URL,API_KEY } from '../../constants/constants'
import Youtube from 'react-youtube'
function Post(props) {
  const[movies,setMovies]=useState([])
  const[urlid,setUrlid]=useState('')
  useEffect(()=>{
    axios.get(props.url).then((response)=>{
      console.log(response.data.results)
      setMovies(response.data.results)
    }).catch(err=>{
      alert("Network Error");
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
    console.log(id);
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
      if(response.data.results.length!==0){
        setUrlid(response.data.results[0])
      }else{
        console.log("Trailer not available");
      }
    })
  }
  return (
    <div className='row'>
        <h2>{props.title}</h2>
        <div className='posters'>
          {movies.map((obj)=>
           <img onClick={()=>handleMovie(obj.id)} className={props.isSmall ? "smallPoster":"poster"} alt='poster' src={`${IMAGE_URL+obj.backdrop_path}`} />
           
          )}
           

        </div>
       {urlid && <Youtube opts={opts} videoId={urlid.key}/>  }
    </div>
  )
}

export default Post