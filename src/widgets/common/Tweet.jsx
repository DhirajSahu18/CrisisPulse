// TweetCard.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';



const TweetCard = () => {
  const [articles , setArticles ] = useState([])
  const calculateTimeDifferenceInHours = (givenDate) => {
    const givenDateTime = new Date(givenDate);
  const currentDate = new Date();

  const timeDifferenceInMilliseconds = currentDate - givenDateTime;
  const timeDifferenceInHours = timeDifferenceInMilliseconds / (1000 * 60 * 60);

  if (timeDifferenceInHours < 1) {
    const minutes = Math.floor(timeDifferenceInHours * 60);
    return `${minutes}min`;
  } else if (timeDifferenceInHours < 24) {
    return `${Math.floor(timeDifferenceInHours)}h`;
  } else {
    const days = Math.floor(timeDifferenceInHours / 24);
    return `${days}d`;
  }
  };
  const apiKey = 'da88552810e548d9961d63dccac69eb5';
  const apiUrl = 'https://newsapi.org/v2/everything?q=volcano+tsunami&sortBy=publishedAt';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}&apiKey=${apiKey}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('News data:', data?.articles);
        setArticles((data.articles))
      } catch (error) {
        console.error('Error fetching news data:', error.message);
      }
    };

    // Call the function to fetch data when the component mounts
    fetchData();
  }, []);
  
  
  return (<div className='flex flex-wrap justify-around gap-5'>
    {articles && articles.map((article)=>(
      <Link to={article.url}>
      <div className="bg-white border border-gray-300 p-4 rounded-md shadow-md w-80">
      <div className="flex items-center mb-2">
        <div className="rounded-full bg-blue-500 h-8 w-8 flex items-center justify-center text-white font-bold mr-2">
        {article.author[0]}
        </div>
        <div className="font-bold">{article.author}</div>
        <div className="text-gray-500 ml-auto">{ calculateTimeDifferenceInHours(article.publishedAt)}</div>
      </div>
      <p className="text-gray-800">{article.title}</p>
      <div className="mt-4">
        <img
          src={article.urlToImage} // Replace with your image URL
          alt="Tweet Image"
          className="rounded-md w-full h-40 object-cover"
        />
      </div>
    </div>
    </Link>
    ))
    }
    </div>
  );
};

export default TweetCard;
