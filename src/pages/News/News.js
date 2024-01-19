import { useEffect, useState } from "react";
import NewsCard from "../../cards/NewsCard/NewsCard";
import "./News.css";

const News = () => {
  const [newsArticles, setNewsArticles] = useState([]);

  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/everything?domains=reviewjournal.com&apiKey=eb9981dc9ef248d49d1e1404f50ef53f"
    )
      .then((data) => {
        if (!data.ok) {
          console.error("Error");
        }
        return data.json();
      })
      .then((data) => {
        setNewsArticles(data.articles);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      <div className="news-main-container">
        {newsArticles.map((article) => {
          return (
            <>
              <NewsCard
                Title={article.title}
                URL={article.url}
                IMG={article.urlToImage}
                Text={article.content}
                Author={article.author}
                Source={article.source.name}
                Date={article.publishedAt}
              />
            </>
          );
        })}
      </div>
    </>
  );
};

export default News;
