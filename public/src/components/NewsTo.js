import React from 'react';
const NewsTo = (props)=> {
 
 let {title, description ,imageurl,newsurl,author,date,source} = props;
    return (
      <div className='my-3'>
      <div className="card" >
        <div style={{
          display:'flex',
          justifyContent:'flex-end',
          position: 'absolute',
          right: '0'
        }
        }>
        <span className=" badge rounded-pill bg-danger">{source}</span>
        </div>
        
  <img src= {!imageurl?"https://belvoir-university-health.s3.amazonaws.com/media/2017/08/07181351/meteorite-and-moon-crop.jpg":imageurl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p className='card-text'><small className='text-danger'>By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
    <a rel="noreferrer" href={newsurl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
  </div>
</div>
      </div>
    )

}

export default NewsTo
