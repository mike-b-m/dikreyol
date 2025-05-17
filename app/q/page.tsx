'use client'

import {Suspense, useEffect, useState} from "react";
import {supabase} from "./db";
import { useSearchParams } from "next/navigation.js";

import "./globals.css"

type user ={
  id: number
  word: string
  def: string
  sino: string
  kont: string

}

function Home() {
  const [word, setWord] =useState<user[]>([])
  const [loding, setLoding] = useState(true)
  const [nam ,setNam] = useState("")
    
    const searchpara = useSearchParams();
    const search = searchpara.get('search') || '';

    useEffect(()=> { const dab = async ()=>{
      const { data, error } = await supabase.from('words').select('*')
      if (error) console.error(error)
      else setWord(data)
      setLoding(false)  
    }
    dab()
    }, []);
    
    const n = search.charAt(0).toUpperCase() + search.slice(1).toLowerCase()
  const fil= word.filter(wd =>wd.word === n)
          
  return (

    <div className="">
      <div className="place-items-center"> 
      
        <form method="get" className="xl:m-4 text-xl xl:w-100 w-60 shadow-md bg-clo xl:pl-3 rounded-2xl">
        <label>
        <input type='text' name="search" placeholder="Mete mo a!" className="rounded-l-2xl xl:w-90 w-50 placeholder:italic placeholder:text-center focus:outline-none focus:pl-4" onChange={(e) =>setNam(e.target.value)}/>
        <button type="submit" className=" rounded-r-2xl place-items-center pt-1 hover:text-blue-500" ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg></button>
        </label>
        
    </form>
    </div> 

    <div className="place-items-center w-150 text-2xl  xl:ml-1 ml-1">
   
    <div className={nam}>
    <div style={{ padding: 20 }}>
    

    {loding ? (
      <p>Loding...</p>
    ) : (
      <ul className=" md:pl-10 md:text-lg text-sm">
        {fil.map((user) => (
          <li key={user.id}>
            <div className="font-bold bg-clo pl-2 mb-4">{user.word} </div>  
            {user.def}
            <h1 className="bg-clo h-1 mt-2 mb-2">_</h1>

            <div className=""><span className="font-bold">Sinonim:</span> {user.sino}</div> 
            <h1 className="bg-clo h-1 mt-2 mb-2">_</h1>

           <div className=""> <span className="font-bold">Kont: </span>{user.kont}</div> 
          </li>
        ))}
      </ul>
    )}
  </div>
  </div>

  </div>

<div className="w-150">
    <h1 className="bg-clo font-bold m-2 lg:ml-15  lg:mt-6 pl-2">Mo disponib:</h1>
    <ul className="lg:ml-16 lg:columns-5  columns-4 ">
        {word.map((user) => (
        <li key={user.id}>
          <button>
          {user.word}
          </button> 
        </li>
        ))}
      </ul></div>

    </div>
  );
}
export default function Page(){
  return(
    <Suspense>
      <Home/>
    </Suspense>
  )
}