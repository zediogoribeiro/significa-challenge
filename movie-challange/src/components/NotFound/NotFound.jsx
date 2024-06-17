import "./NotFound.css";

const NotFound = ({search, showDetails = true}) => {
        return  <div className="notFoundWrapper">
                    <img src="../../public/notFound.svg" alt="notFoundImage"/>
                    <h2>
                        Sorry, we did not found anything
                        <span> </span> 
                        <span className={!showDetails ? 'hideDetails' : ''}>
                             with <span className="searchNotFound">{`${search}`}</span>
                        </span>
                    </h2>
                </div>
}

export default NotFound;
