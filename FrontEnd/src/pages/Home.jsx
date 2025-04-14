import Gallery from "../components/Gallery/Gallery";
import Loader from "../components/Loader/Loader";
import Search from "../components/SearchSection/Search";
import Footer from "../components/Footer/Footer";



const allArtworks = [
  {
    id: 1,
    title: "Sunset Dreams",
    artist: "John Doe",
    price: 150,
    category: "Landscape",
    tags: ["modern", "oil painting"],
    image: "/assets/img-01.jpg",
  },
  {
    id: 2,
    title: "Portrait of Light",
    artist: "Jane Smith",
    price: 220,
    category: "Portrait",
    tags: ["vibrant", "oil painting"],
    image: "/assets/img-02.jpg",
  },
  {
    id: 3,
    title: "Ocean Mood",
    artist: "John Doe",
    price: 180,
    category: "Landscape",
    tags: ["sea", "nature"],
    image: "/assets/img-03.jpg",
  },
  {
    id: 4,
    title: "Urban Spirit",
    artist: "Jane Smith",
    price: 300,
    category: "Portrait",
    tags: ["modern", "city"],
    image: "/assets/img-04.jpg",
  },
];

function Home(){
    return(
        <>
        <Loader/>
        <Search />
        <Gallery artworks={allArtworks} />
        <Footer />
        </>
    );
};

export default Home;