'use client'

import {useEffect, useState} from "react";
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

export default function Home() {
  const [word, setWord] =useState<user[]>([])
    const [loding, setLoding] = useState(true)
    const [name, setName] = useState("")
    const[nam, setNam] = useState(" ")
    
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
    <div className="place-items-center  text-2xl  mr-16 ml-16 bg-neutral-100 col-span-1,50 shadow-lg">

       <form method="get" className="m-4 shadow-md bg-sky-200 pl-3 rounded-2xl">
        
        <label>
        <input type='text' name="search" placeholder="Mete mo a!" className="rounded-l-2xl placeholder:italic placeholder:text-center focus:outline-none focus:pl-4" onChange={(e) =>setNam(e.target.value)}/>
        <button type="submit" className=" rounded-r-2xl place-items-center pt-1 hover:text-blue-500" onClick={()=>setName(nam)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg></button>
        </label>
        
    </form>
    <div>
    <div style={{ padding: 20 }}>
    <h1 className="font-bold text-center text-6xl">Diksyonè kreyol</h1>

    {loding ? (
      <p>Loding...</p>
    ) : (
      <ul className="pr-50 pl-50 text-lg">
        {fil.map((user) => (
          <li key={user.id}>
            <span className="font-bold">{user.word}:</span>  {user.def}
            <div className="mt-3"><span className="font-bold">Sinonim:</span> {user.sino}</div> 
           <div className="mt-3"> <span className="font-bold">Kont: </span>{user.kont}</div> 
          </li>
        ))}
      </ul>
    )}
  </div>
  </div>

  </div>

  <div className="ml-16 mr-16 mt-6 columns-10 bg-neutral-100 shadow-lg inset-shadow-2xs  "> <ul>
    <span className="font-bold m-2">Mo disponib:</span>
        {word.map((user) => (
        <li key={user.id} onClick={(b)=>setName(user.word)}>
          <button>
          {user.word}
          </button> 
        </li>
        ))}
      </ul></div>

    </div>
  );
}
