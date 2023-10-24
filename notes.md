# Notes for the project

## What data to recieve?

1. Artist Metadata

   - id
   - Name
   - Followers
   - Popularity
   - Genre
   - Image
   - ProfileUrl

2. Artist's Top Tracks
   - Fetch Artist's top 3 tracks
   - Track:
     -- id
     -- name
     -- preview url
     -- external playable url
     -- duration
     -- album-images (640, 300, 64)
     -- album-name
     -- album-release date

## How to fetch it?

1. Get the Artist id
   - https://api.spotify.com/v1/search
   - eg: https://api.spotify.com/v1/search?q=Niall+Horon&type=artist&limit=1
   - "1Hsdzj7Dlq2I7tHP7501T4"
2. Get the Artist metadata
   - https://api.spotify.com/v1/artists/{id}
3. Fetch the top tracks
   - https://api.spotify.com/v1/artists/{id}/top-tracks

## What to display to the User?

- A card containing the artist info and its top 3 songs (maybe a preview)
