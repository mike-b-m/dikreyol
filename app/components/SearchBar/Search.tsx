export default function Search({ word = "" }: { word?: string }) {
    return (
        <div className="flex justify-center w-full px-4">
            <form 
                method="get" 
                action="/results" 
                className="w-full max-w-md mx-auto rounded-full shadow-md overflow-hidden"
            >
                <label className="flex w-full bg-clo rounded-full">
                    <input 
                        name="search" 
                        placeholder="Antre yon mo" 
                        className="w-full py-3 px-5 rounded-l-full focus:outline-none placeholder:italic"
                        defaultValue={word}
                    />
                    <button 
                        type="submit" 
                        className="bg-clo px-4 rounded-r-full hover:bg-opacity-80 transition-colors"
                        aria-label="Search"
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth="2.5" 
                            stroke="currentColor" 
                            className="w-6 h-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button> 
                </label>
            </form>
        </div>
    )
}