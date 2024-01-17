import "./Card.css";
import { Link } from "react-router-dom";

const Card = ({Title, Text, URL, IMG }) => {
  return (
    <>
      <div className="card-container">
        <div className="card-img-container">
            <img src={IMG}></img>
        </div>
        <div className="card-title-container">
          <h1>{Title}</h1>
        </div>
        <div className="card-text-container">
          <p>
            {Text}
          </p>
        </div>
        <div className="card-button-container">
          <Link to={URL}>
            <button>{Title}</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Card;
