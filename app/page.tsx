'use client'

import "./q/globals.css"


export default function Page(){
    
    return(
        <div className=" place-items-center lg:m-45 m-20 text-xl lg:text-2xl">
            <h1 className="lg:text-4xl  text-bold text-2xl">Di-kreyol</h1>
            <form method="get" action="/q" className=" xl:m-4  xl:w-100 w-60 shadow-md bg-clo  xl:pl-3 rounded-2xl">
            <label>
            <input name="search" placeholder="Mete mo a!" className="rounded-l-2xl xl:w-90 w-50 placeholder:italic placeholder:text-center focus:outline-none focus:pl-4"/>
            <button type="submit" className=" rounded-r-2xl place-items-center pt-1 hover:text-blue-500"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
</button> 
         </label>
             </form>
                </div>
    )
}