import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMovieById } from '../../api/useMovie';
import Loading from '../../components/Loading/Loading';
import NotFound from '../../components/NotFound/NotFound';
import Button from '../../components/Button/Button';
import './Details.css';



const Details = () => {
        let { imdbId } = useParams();
        const {movie, isLoading} = useMovieById(imdbId);
        const storedIds = localStorage.getItem('favorites')?.split(',');

        const [isFavorite,setIsFavorite] = useState(storedIds?.includes(imdbId));

        const addFavorite = () => {
                localStorage.setItem("favorites", `${storedIds},${imdbId}`);
                setIsFavorite(true);
        }

        const removeFavorite = () => {
               const updatedIds = storedIds.filter((id) => id !== imdbId)
               localStorage.setItem("favorites", updatedIds.join(',')); 
               setIsFavorite(false);
        }


        const handleButtonClick = () => {
                if(isFavorite) {
                        removeFavorite();
                }
                else {
                        addFavorite();
                }
        }

        if(isLoading) return <Loading />
        if(!movie) return <NotFound showDetails={false}/>

        return (
                <div className='detailsWrapper'>
                        <img className="details-image" src={movie.Poster === "N/A" ? '../../public/notImage.svg' : movie.Poster} alt={`${movie.Title} Poster`} />
                        <div className='details-info'>
                                <h2>{movie.Title}</h2>
                                <p className='kpis'>{`${movie.Language} / ${movie.Runtime} / ${movie.Year}`}</p>
                                <Button 
                                text={isFavorite ? "Remove Favorite" : "Make it Favorite"}
                                handleClick={handleButtonClick}/>
                        </div>
                        <div className='moreInfo'>
                                <div className='gender'>
                                        <p className='gender-title'>THE GENRES</p>
                                        <p className='gender-kpi'>{`${movie.Genre}`}</p>
                                </div>
                                <div className='rating'>
                                        <p className='rating-title'>RATING</p>
                                        <p className='rating-kpi'>{`${movie.imdbRating}/10`}</p>
                                </div>
                        </div>
                        <p className='plot'>{movie.Plot}</p>
                </div>
        )   
}

export default Details;