import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Shimmer2 from './Shimmer2';


const Pokedetails = () => {

  const [Pokedata , setPokedata] = useState([]);
  const [loading , setloading] = useState(false);

const { id } = useParams()
 
  // console.log(id);
  
  const fetchData = async () => {
    setloading(true)
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)  
    const data = await res.json();
    // console.log(data);
    setPokedata(data)
    setloading(false)

    // data.results.forEach(async (item) => {
    //   const res1 = await fetch(item.url);
    //   const data1 = await res1.json();
    //   fetch(item)
    //   // console.log(data1);
    //   setPokedata((previous) => [...previous, data1]);


    // })
  }


  console.log(Pokedata)
    // console.log(Pokedata[0],"Pokemon")
      useEffect(() => {
        fetchData();
      }, []);

      // if(Pokedata.length === 0){
      //     return <Shimmer2/>
      // }

  
   return(

      <>
      { loading == true ? <Shimmer2/> : 
      <>

     
      <div className='w-full h-screen bg-red-800 capitalize p-4'>
      <h1 className='text-black text-center capitalize font-bold text-6xl '>{Pokedata.name}</h1>
      <div className='flex justify-center m-4 '>
        <img src={Pokedata.sprites?.other?.['official-artwork'].front_default} alt={Pokedata.name} />
      </div>
      <div className='flex justify-center'>
        <div className='m-3 p-4'>
          <p className='text-center font-bold text-3xl'> Weight {Pokedata.weight / 10}KG</p>
          <p className='text-center font-bold text-3xl m-2'> height {Pokedata.height / 10 }M</p>
        </div>
      </div>
      </div>
      </>
       }
      </>
  )



  

}
export default Pokedetails