import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { playPause, setActiveSong } from '../redux/features/playerSlice'
import { useGetRelatedSongsQuery, useGetSongDetailsQuery } from '../redux/services/ShazamCoreApi'
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components'

const SongDetails = () => {
  const dispatch = useDispatch()
  const { songid } = useParams()
  const { activeSong, isPlaying } = useSelector((state) => state.player)

  const { data: songData, isFetching: isFetchSongDetail } = useGetSongDetailsQuery({ songid })
  const { data, isFetching: isFetchRelatedSong, error } = useGetRelatedSongsQuery({ songid })

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }))
    dispatch(playPause(true))
  }
  const handlePauseClick = () => {
    dispatch(playPause(false))
  }

  if (isFetchSongDetail || isFetchRelatedSong) {
    return <Loader title="Searching for song Details..." />
  }
  if (error) return <Error />

  return (
    <div className="flex flex-col">
      <DetailsHeader artistID="" songData={songData} />
      <div className="mb-10">
        <h2 className="font-bold text-3xl text-white">Lyrics:</h2>
        <div className="mt-5">
          {songData?.sections && songData?.sections[1].type === 'LYRICS' ? (
            songData.sections[1].text.map((lyric, i) => (
              <p key={i} className="mb-2 text-gray-300 text-lg ">
                {lyric}
              </p>
            ))
          ) : (
            <p className="text-2xl text-white font-bold">Sorry,no lyrics found!</p>
          )}
        </div>
      </div>
      <RelatedSongs
        data={data.data}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
        artistID=""
      />
    </div>
  )
}

export default SongDetails
