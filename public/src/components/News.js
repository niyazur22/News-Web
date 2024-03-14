import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import NewsTo from './NewsTo';
import Spinner from './Spinner';


const News = (props)=>{
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  
 
 const capitalizeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
 
 const updateNews =  async ()=>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4c80fd3ac67f41b3a1c92c662495acdf&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)

    props.setProgress(100);
  }
  useEffect(() => {
    document.title =`${capitalizeFirstLetter(props.category)} - NewsMonkey`;
      updateNews();
      // eslint-disable-next-line
  }, [])

   // console.log("cdm");
    //let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4c80fd3ac67f41b3a1c92c662495acdf&page=1&pageSize=${props.pageSize}`;
    //setState({loading:true});
    //let data = await fetch(url);
    //let parsedData = await data.json()
    //console.log(parsedData);
    //setState({articles: parsedData.articles, totalArticles:parsedData.totalResults, loading:false})
    


  //const handlePrevClick = async()=>{
    // console.log("Previous");
    //let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4c80fd3ac67f41b3a1c92c662495acdf&page=${page -1}&pageSize=${props.pageSize}`;
   // setState({loading:true});
    //let data = await fetch(url);
    //let parsedData = await data.json()
   // console.log(parsedData);
   // setState({
      //page: page -1,
      //articles: parsedData.articles,
     // loading:false
    //})
    //setPage(page-1)
    //updateNews();
   //}
 // const  handleNextClick = async ()=>{
    // 
  //console.log("Next");
    //if(! (page + 1 > Math.ceil(totalResults/props.pageSize))){
    //let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4c80fd3ac67f41b3a1c92c662495acdf&page=${page +1}&pageSize=${props.pageSize}`;
    //setState({loading:true});
    //let data = await fetch(url);
    //let parsedData = await data.json()
    //setState({
      //page: page +1,
      //articles: parsedData.articles,
      //loading:false
    //})
  //}
  // setPage(page+1)
   //updateNews();
   //}

  const fetchMoreData = async () => {
   const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4c80fd3ac67f41b3a1c92c662495acdf&page=${page+1}&pageSize=${props.pageSize}`;
   setPage(page+1)
   let data = await fetch(url);
   let parsedData = await data.json()
   setArticles( articles.concat(parsedData.articles))
   setTotalResults(parsedData.totalResults)
  };
 
    return (
      
      <>
      <div className='container my-3'>
      <h1 className='text-center' style={{margin:'35px 0px',marginTop:'90px'}}>   NewsMonkey - Top  {capitalizeFirstLetter(props.category)} Headlines!! </h1>
      </div>
      
       {loading && <Spinner/>}
       <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className='container '>
        <div className="row">
        { articles.map((element)=>{
     return <div className="col-md-4"key={element.url}>
 <NewsTo   title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 85):""} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
 </div>    
        })}
             
        </div>
        </div>
        </InfiniteScroll>

        {/*<div className="container d-flex justify-content-between">
        <button disabled={page<=1}type="button" className="btn btn-dark" onClick={handlePrevClick}> &larr; Previous</button>
        <button disabled={page +1 > Math.ceil(totalResults/props.pageSize)}type="button" className="btn btn-dark"onClick={handleNextClick}> Next &rarr;</button>

      </div>*/}
      
      </>
    )
  
}
News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
} 

export default News
