import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Pokedetails from "./Pokedetails";


const Pokecard = () => {
  const [pokemonName, setpokemonName] = useState([]);
  // const [page, setpage] = useState([2]);
  const [seach, setseach] = useState("");
  const [filteredpoke, setFilteredpoke] = useState([]);
  const [firstIndex,setFirstIndex] = useState(0)
  const [endIndex,setEndIndex]=useState(9)
  
  let arry = Array.from({ length: Math.ceil(1302 / 20) }, (_, index) => index + 1);
  const [Page , setPage] = useState(arry.slice(firstIndex,endIndex));
  const [offset, setoffset] = useState(0);
const handleclick = (i) => {

  setoffset(i * 20);
  console.log("I: ", i)

 if (i === 8){
    setFirstIndex((prev)=>prev+5)
    setEndIndex((prev)=>prev+5);
    setPage(arry.slice(firstIndex,endIndex))
 } 
 else {
  console.log("false part")
 }


 if (i === 0){

 }
}
// console.log(firstIndex,endIndex)
  const fetchData = async () => {
    setFilteredpoke([])
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);
    const data = await res.json();

    data.results.forEach(async (item) => {
      const res1 = await fetch(item.url);
      const data1 = await res1.json();
      fetch(item)
      // console.log(data1);
      setpokemonName((previous) => [...previous, data1]);
      setFilteredpoke((previous) => [...previous, data1]);

    })


    // const rawData = [...data1]

    // console.log(data,'hello');

    // console.log(data.results);
  };
  // console.log(seach);

  // console.log(pokemonName[0]);
  useEffect(() => {
    fetchData();
  }, [offset]);


  // const arr = [1,2,3,4,5,6,7,8,9]
  // console.log(offset);

  // const handleclick1 = (index)=>{ 
  // offset( index)

  // }


 

  
  // setPage()
  // console.log(Page + 10)
  
  


  return (
    <>
      <div className="flex justify-center bg-sky-500">
        <div>
          <input className="border rounded-lg py-0.5  " type="input" value={seach} onChange={(e) => setseach(e.target.value)} />
          <button className="p-2 m-2 border bg-orange-200 rounded-md" onClick={() => {
            const fileterpoke = pokemonName.filter((res) => (res.name.includes(seach)))
            setFilteredpoke(fileterpoke)
            // console.log(fileterpoke);
          }}>seach</button>

        </div>
      </div>
      <div className=" p-7 flex flex-wrap bg-sky-500 justify-between" >
        {
          filteredpoke.map((item, index) => (
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
   
        <div className="flex justify-around gap-3 flex-wrap">
          {/* <h1>hello</h1>
          <button className="px-3 border rounded-lg justify-between" onClick={() => handleclick(i)}>
            { }
          </button> */}
          
          {Page.map((item,i)=>(
           
          <button key={i} className="p-4 border rounded-lg" onClick={()=>handleclick(i)}>
            {item}
          </button>
             
          ))
           }
          
        </div>

        </>
      }

    </>
  );
  
};

export default Pokecard;


