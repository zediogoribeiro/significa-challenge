import { useEffect, useState } from "react";
import './Home.css'; 
import { useMovie } from "../../api/useMovie";
import LookingForSomething from "../../components/LookingForSomething/LookingForSomething";
import NotFound from "../../components/NotFound/NotFound";
import Loading from "../../components/Loading/Loading";
import Button from "../../components/Button/Button";

const Home = ({ searchValue }) => {
    const [allMovies, setAllMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalMovies, setTotalMovies] = useState(0);

    const { movies, isLoading } = useMovie(searchValue, page);

    useEffect(() => {
        setAllMovies([]);
        setPage(1);
        setTotalMovies(0);
    }, [searchValue]);

    useEffect(() => {
        if (movies && movies.Search) {
            setTotalMovies(movies.totalResults);
            setAllMovies((actualMovies) => [...actualMovies, ...movies.Search]);
        }
    }, [movies]);

    const handleClick = () => {
        setPage((prevPage) => (prevPage + 1));
    };

    if (searchValue.length === 0) {
        return <LookingForSomething />
    }

    if (isLoading && allMovies.length === 0) return <Loading />;
    if (!allMovies.length) return <NotFound search={searchValue}/>;

    return (
        <>
            <div className="cardsContainer">
                {allMovies.map((movie) => (
                    <a href={`/details/${movie.imdbID}`} key={movie.imdbID} className="card">
                        <img className="card-image" src={movie.Poster === "N/A" ? '../../public/notImage.svg' : movie.Poster} alt={movie.Title}/>
                        <p className='card-title'>{movie.Title}</p>
                    </a>
                ))}  
            </div>
            {allMovies.length < totalMovies ? (
                <div className="buttonWrapper">
                    <Button text="Show more" handleClick={handleClick} />
                </div>
            ) : <></>}
        </>
    );
}

export default Home;
