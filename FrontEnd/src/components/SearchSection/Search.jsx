import heroImage from '../../assets/images/hero.jpg'; 
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Search() {
    return (
        <div 
            className="h-[250px] bg-no-repeat bg-cover bg-center flex items-center justify-center px-3"
            style={{
                backgroundImage: `url(${heroImage})`,
            }}
        >
            <div className="w-full flex items-center justify-center">
                <form className="flex bg-white shadow-md w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
                    <input 
                        className="flex-grow w-full px-3 sm:px-4 py-2 sm:py-3 text-[#C08B6F] border-none focus:outline-none focus:ring-4 focus:ring-[#C08B6F] placeholder:text-[#C08B6F] focus:shadow-lg transition-shadow duration-300"
                        type="search" 
                        placeholder="Search" 
                        aria-label="Search" 
                    />
                    <button 
                        className="text-[#3D2B1F] bg-[#C08B6F] border-none w-12 sm:w-16 h-12 sm:h-14 hover:bg-[#8B5E3C] hover:text-[#C08B6F] focus:outline-none focus:ring-2 focus:ring-[#C08B6F] flex items-center justify-center"
                        type="submit"
                    >
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Search;
