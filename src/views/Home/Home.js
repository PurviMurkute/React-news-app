import React, { useState, useEffect } from 'react';
import './Home.css';
import axios from 'axios';
import NewsArticle from '../../components/NewsArticle/NewsArticle';

function Home() {
    const [news, setNews] = useState([]);
    const [searchQuery, setSearchQuery] = useState("pune")

    const loadNews = async () => {
        try {
            const response = await axios.get(`https://newsapi.org/v2/everything?q=${searchQuery}&from=2024-05-18&sortBy=publishedAt&apiKey=${process.env.REACT_APP_API_KEY}`)
            setNews(response.data.articles)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadNews()
    }, [])

    useEffect(() => {
        loadNews()
    }, [searchQuery])

    return (
        <div>
            <h1>News App</h1>

            <input type='text' className='search-input' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

            <div className='news-conteiner'>

                {
                    news.map((newsArticle, index) => {
                        const { author, title, description, url, urlToImage, publishedAt } = newsArticle
                        return (
                            <NewsArticle author={author} title={title} description={description} url={url} urlToImage={urlToImage} publishedAt={publishedAt} key={index} />
                        )
                    }
                    )
                }
            </div>
        </div>
    )
}

export default Home