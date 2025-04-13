import Gallery from "../components/Gallery/Gallery";
import Loader from "../components/Loader/Loader";
import Search from "../components/SearchSection/Search";
import Footer from "../components/Footer/Footer";

function Home(){
    return(
        <>
        <Loader/>
        <Search />
        <Gallery />
        <Footer />
        </>
    );
};

export default Home;