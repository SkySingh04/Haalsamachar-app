import React from 'react'

const SpotifyCard = ({trackLink} : {trackLink : string} ) => {
    const trackId = trackLink.split("/").pop();
    
  return (
    <div className='mt-4'>
      <iframe  src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`} width="500" height="200" frameBorder="0" allowFullScreen={false} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    </div>
  )
}

export default SpotifyCard
