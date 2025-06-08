'use client'

import {Suspense, useEffect, useState} from "react";
import {supabase} from "../db";
import { useSearchParams } from "next/navigation";
import Search from "../SearchBar/Search";


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
  const [num, setNum] = useState(0)
  const [role, setRole] = useState(20)
  const [comb, setComb] = useState(1)
  
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
  {/*bouton next ak prev mo dispo*/}
  const next = ()=> {
    if (role < word.length) {
    setNum((comb)*20)
    setRole((comb+1)*20)
    setComb(comb+1)
  }}
  const prev= ()=>{
    if (num>0) {
    setNum((comb-2)*20)
    setRole((comb-1)*20)
    setComb(comb-1)
  }}
          
  return (
    <div className="min-h-screen flex flex-col">
      {/* Search bar avek back button nan menm liy */}
      <div className="flex items-center w-full px-4 mb-6 mt-4 gap-2">
        <div className="shrink-0">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <span className="hidden sm:inline">Retounen</span>
          </button>
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
        {/* Mo disponib */}
        <div className="bg-white rounded-lg shadow p-4 ">
          <h2 className="font-bold text-xl mb-3 bg-clo pl-2">Mo disponib:</h2>
          <ul className="columns-2 h-60 md:columns-3 lg:columns-4 md:h-35">
            {word.slice(num,role).map((user) => (
              <li key={user.id}>
                <a href={`/results?search=${user.word}`} className="hover:text-blue-500 cursor-pointer">
                  {user.word}
                </a>
              </li>
            ))}
          </ul>
            {/*button next*/}
          <div className="text-center italic ">
          {comb-1 > 0 ?<button className="mr-2 hover:text-[#6FE6FC]" onClick={prev}>avan</button>:null}
          {comb-1 > 0 ?(<button className="mr-2 h-6 w-6 rounded-lg border-1 border-sky-200">{comb-1}</button>): null}
          
          <button className="mr-2 h-6 w-6 rounded-lg font-bold bg-clo">{comb} </button>
          {role < word.length ?<button className="mr-2 h-6 w-6 rounded-lg border-1 border-sky-200 "> {comb+1} </button>:null}
          {role < word.length ?<button onClick={next} className="hover:text-[#6FE6FC]">
           suivan
          </button>: null}
           </div>
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
