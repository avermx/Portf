import { useEffect, useState, useRef } from "react";
import { Link, Outlet } from "react-router-dom";

import Shimmer from "./shimmer";
import { pokemonNames } from "../../text";


const Pokecard = () => {
  const [pokemonName, setpokemonName] = useState([]);
  const [loading, setLoading] = useState(false)
  const [currentButtonNo, setCurrentButtonNo] = useState([]);
  const [seach, setseach] = useState("");
  const [name, setName] = useState("");
  const [firstIndex, setFirstIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(10)

  let arry = Array.from({ length: Math.ceil(1302 / 20) }, (_, index) => index + 1);
  const [Page, setPage] = useState(arry.slice(firstIndex, endIndex));
  const [offset, setoffset] = useState(0);

  // const buttonRefs = useRef([]);


  const handleclick = (i, item) => {

    setCurrentButtonNo(item)

    if (item === 1) {
      return setoffset(0)
    }
    setoffset(item * 20);
    // console.log(item, "I: ", i)

    if (i === 9) {
      setFirstIndex((prev) => prev + 5)
      setEndIndex((prev) => prev + 5);
      // setPage(arry.slice(firstIndex ,endIndex ))
    }


    if (i === 0) {
      if (firstIndex === 0) {
        // console.log("returned");
        return
      }


      setFirstIndex((prev) => prev - 5)
      setEndIndex((prev) => prev - 5);
      // setPage(arry.slice(firstIndex ,endIndex ))
    }





  }




  const handleclick1 = (e) => {
    setName(e)

  }
  useEffect(() => {
    setPage(arry.slice(firstIndex, endIndex))
  }, [firstIndex, endIndex])
  // console.log(firstIndex,endIndex)









  const fetchData = async () => {
    setpokemonName([])
    setLoading(true)
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);
    const data = await res.json();

    data.results.forEach(async (item) => {
      const res1 = await fetch(item.url);
      const data1 = await res1.json();
      fetch(item)
      // console.log(data1);
      setpokemonName((previous) => [...previous, data1]);
      // setFilteredpoke((previous) => [...previous, data1]);
      setLoading(false)
    })


    // const rawData = [...data1]

    // console.log(data,'hello');

    // console.log(data.results);
  };

  useEffect(() => {
    fetchData1();
  }, []);


  const fetchData1 = async () => {

   
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await res.json();
    console.log(data);

    data.results.forEach(async (item) => {
      const res1 = await fetch(item.url);
      const data1 = await res1.json();
      fetch(item)
      // console.log(data1);
      // setpokemonName((previous) => [...previous, data1]);
      // setFilteredpoke((previous) => [...previous, data1]);
      setLoading(false)
    })


    // const rawData = [...data1]

    // console.log(data,'hello');

  };



  // console.log(seach);

  // console.log(pokemonName[0]);
  useEffect(() => {
    fetchData();
  }, [offset,name]);




  const seachdata = pokemonName.filter((item) => (

    item.name.includes(seach)

  ));
  const seachdata1 = pokemonNames.filter((item) => (

    seach.trim() !== "" && item.toLowerCase().includes(seach.toLowerCase())

  )).slice(0, 5)



  // console.log(seachdata1);







  // const arr = [1,2,3,4,5,6,7,8,9]
  // console.log(offset);

  // const handleclick1 = (index)=>{ 
  // offset( index)

  // }





  // setPage()
  // console.log(Page + 10)

  // if(pokemonName.length === 0){
  //   return <Shimmer/>
  // }









  return (

    <>


      {loading == true ? <Shimmer /> : <>
        <div className="flex justify-center bg-sky-500">
          <div>
            <input className="border rounded-lg py-0.5  " type="input" value={seach} onChange={(e) => setseach(e.target.value)} />
            {
              seachdata1.map((e) => (
                <div className="rounded-sm w-44 justify-center">
                  <button className="" onClick={() => handleclick1(e)}>
                    <h1 className="bg-white font-bold text-center" >{e}</h1>
                  </button>
                </div>
              ))
            }

            {/* <button className="p-2 m-2 border bg-orange-200 rounded-md" onClick={() => {
            const fileterpoke = pokemonName.filter((res) => (res.name.includes(seach)))
            
            setFilteredpoke(fileterpoke)
            // console.log(fileterpoke);
          }}>seach</button> */}

            {/* {
            pokemonName.map((item)=>{
              console.log(item.name.startsWith(seach))
              return(

              <h1>
                {item.name.startsWith(seach)}
           
                
              </h1>
               
              ) 
})
          
          } */}

          </div>
        </div>
        <div className=" p-7 flex flex-wrap bg-sky-500 justify-between" >
          {
            seachdata.map((item, index) => (
              <Link to={`/pokedetails/${item.id}`} key={index}>
                <div className="p-3 m-3 border border-black bg-black rounded-3xl relative">
                  <label className="absolute -top-0.5 -left-0.5 w-9 bg-gray-600 text-center rounded-r-xl">{item.id}</label>
                  <div className="w-[200px] bg-green-300 rounded-xl">
                    <img className="hover:scale-125 transition-all " src={item?.sprites?.other?.['official-artwork'].front_default} />
                  </div>
                  <h1 className="text-center font-bold mt-3 text-white">{item.name}</h1>
                  <div className=" mx- p-1 text-white">
                    <div className={item?.types.length >= 2 ? " flex justify-between capitalize" : "text-center capitalize"} >
                      <p>{item?.types[1]?.type.name}</p>
                      <p>{item?.types[0]?.type.name}</p>
                    </div>
                  </div>
                </div>


              </Link>
            ))}

        </div>
        {/* <div className="p-2 m-4 flex w-[100vw] gap-4 justify-center">{
  arr.map((ele)=>(
    <button className="border p-4 rounded-lg" onClick={()=>handleclick(ele)}>{ele}</button> 
    ))
    }
    </div>        */}
        {

          <>

            <div className="flex px-10 gap-3 flex-wrap justify-center ">
              {/* <h1>hello</h1>
          <button className="px-3 border rounded-lg justify-between" onClick={() => handleclick(i)}>
            { }
          </button> */}

              {Page.map((item, i) => (

                <button key={i} className={`p-5 border rounded-lg ${item === currentButtonNo ? "bg-gray-500" : ""}`} onClick={() => handleclick(i, item)}>
                  {item}
                </button>

              ))
              }

            </div>

          </>
        }
      </>
      }
    </>
  );

};

export default Pokecard;


