import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  useGetArtistDetailsQuery,
  useGetArtistTopSongsQuery,
} from '../redux/services/ShazamCoreApi'
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components'

const ArtistDetails = () => {
  const { id: artistId } = useParams()
  const { activeSong, isPlaying } = useSelector((state) => state.player)
  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    error,
  } = useGetArtistDetailsQuery({ artistId })
  const {
    data: artistTopSongs,
    isFetching: isFetchingArtistTopSongs,
    error: artistTopSongError,
  } = useGetArtistTopSongsQuery({ artistId })

  if (isFetchingArtistDetails || isFetchingArtistTopSongs) {
    return <Loader title="Searching for artist Details..." />
  }
  if (error || artistTopSongError) return <Error />

  return (
    <div className="flex flex-col">
      <DetailsHeader artistID={artistId} artistData={artistData} />

      <RelatedSongs
        data={artistTopSongs.data}
        isPlaying={isPlaying}
        activeSong={activeSong}
        artistID={artistId}
      />
    </div>
  )
}

export default ArtistDetails
