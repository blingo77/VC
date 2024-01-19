import "./NewsCard.css";
import { Link } from "react-router-dom";

const NewsCard = ({ Title, Text, URL, IMG, Author, Source, Date }) => {
  return (
    <>
      <Link to={URL} target="_blank">
        <div className="news-card-container">
          <div className="news-card-img-container">
            <img src={IMG}></img>
          </div>
          <div className="news-card-title-container">
            <h1>{Title}</h1>
          </div>
          <div className="news-card-author-container">
            <p><strong>By: {Author} @{Source}</strong></p>
          </div>
          <div className="news-card-text-container">
            <p>{Text}</p>
          </div>

        </div>
      </Link>
    </>
  );
};

export default NewsCard;
