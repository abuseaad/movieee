import React from 'react'

function VideosCard({Videos}) {
    functtion onFavoriteClick() {
        alert("clicked")
    }
  return <div className='videos-card'>
    <div className='videos-poster'>
        img src={Videos.url} alt={Videos.title} />
        <div className='videos-overlay'>
            <button className='favorite-btn' onClick={onFavoriteClick}>❤</button>
    </div>
  </div>
 
}

export default VideosCard