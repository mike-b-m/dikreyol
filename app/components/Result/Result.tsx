'use client'

import {Suspense, useEffect, useState} from "react";
import {supabase} from "../db";
import { useSearchParams } from "next/navigation";
import Search from "../SearchBar/Search";
import BackButton from "../BackButton/BackButton";


type user = {
  id: number
  word: string
  def: string
  sino: string
  kont: string

}

function Result() {
  const [word, setWord] = useState<user[]>([])
  const [loding, setLoding] = useState(true)
    
    const searchpara = useSearchParams();
    const search = searchpara.get('search') || '';
    
    // loading data 
    useEffect(()=> { const dab = async ()=>{
      const { data, error } = await supabase.from('words').select('*')
      if (error) console.error(error)
      else setWord(data)
      setLoding(false)  
    }
    dab()
    }, []);
    
    const n = search.charAt(0).toUpperCase() + search.slice(1).toLowerCase()
  const fil = word.filter(wd =>wd.word === n)
  
  // Display 12 random words excluding the searched word
  const otherWords = word.filter(w => w.word !== n);
  const displayWords = otherWords.sort(() => 0.5 - Math.random()).slice(0, 12);
          
  return (
    <div className="min-h-screen flex flex-col">
      {/* Search bar avek back button nan menm liy */}
      <div className="flex items-center w-full px-4 mb-6 mt-4 gap-2">
        <div className="shrink-0">
          <BackButton />
        </div>
        <div className="flex-1 flex justify-center">
          <Search word={search} />
        </div>
      </div>
      {/* Sa sipoze vinn on 2x2 grid*/}
      <div className="px-4">
        {/* Definisyon */}
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <h2 className="font-bold text-xl mb-3">Definisyon:</h2>
          <div className="text-lg">
            {loding ? (
              <p>Chajman...</p>
            ) : fil.length > 0 ? (
              <ul className="md:text-lg text-sm">
                {fil.map((user) => (
                  <li key={user.id}>
                    <div className="font-bold bg-clo pl-2 mb-4">{user.word}</div>
                    {user.def}
                    <h1 className="bg-clo h-1 mt-2 mb-2">_</h1>
                    <div><span className="font-bold">Sinonim:</span> {user.sino}</div>
                    <h1 className="bg-clo h-1 mt-2 mb-2">_</h1>
                    <div><span className="font-bold">Antonim: </span>{user.kont}</div>
                  </li>
                ))}
              </ul>
            ) : search ? (
              <p className="text-center p-4">Mo sa pa nan diksyone nou. Ou kapab ajoute l!</p>
            ) : null}
          </div>
        </div>
        {/* Lot Mot */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="font-bold text-xl mb-3 bg-clo pl-2">Lot Mot:</h2>
          <ul className="columns-2 md:columns-3 lg:columns-4">
            {displayWords.map((user) => (
              <li key={user.id}>
                <a href={`/results?search=${user.word}`} className="hover:text-blue-500 cursor-pointer">
                  {user.word}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default function Page(){
  return (
    <Suspense fallback={<div className="text-center">Chajman...</div>}>
      <Result/>
    </Suspense>
  )
}