import styled from 'styled-components';
import { useState,useEffect } from 'react';
import { motion } from 'framer-motion';
import {Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';


const Searched = () => {

  const [searched, setSearched] = useState([]);
  let params = useParams();

  useEffect(()=>{
    getSearched(params.search)
  },[params.search]);

  const getSearched = async (name)=>{
    const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=4abe2b3e1ba94fd2864018d91ed3a0bb&query=${name}`)
    const recipes= await data.json();
    setSearched(recipes.results)

  }
  return (
    <Grid
        animate={{opacity:1}}
       initial={{opacity:0}}
       exit={{opacity:0}}
       transition={{duration: 0.4}}
    >
      {searched.map(item=>{
        return(
          <Card key={item.id}>
            <Link to={'/recipe/' + item.id}>
             <Overlay/>
            <img src={item.image} alt={item.title} />
            <p>{item.title}</p>
            </Link>
          </Card>
        )
      })}

    </Grid>
  )
}

const Grid = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    gap:1rem;
  
`
const Card = styled.div`
  min-height:20rem;
  border-radius:1.25rem;
  overflow:hidden;
  position:relative;
  p{
    position:absolute;
    z-index:5;
    bottom:10%;
    left:50%;
    transform:translateX(-50%);
    font-size:1rem;
    font-weight:300;
    text-align:center;
    color:#fff;
    
  }
  img{
    border-radius:2rem;
    position:absolute;
    object-fit:cover;
    left:0;
    width:100%;
    height:100%;
  }
`
const Overlay = styled.div`
 border-radius:1.7rem;
  z-index: 3;
  position:absolute;
  width:100%;
  height:100%;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%)
`


export default Searched