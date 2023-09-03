import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { playPause, setActiveSong } from '../redux/features/playerSlice'
import { useGetSongDetailsQuery } from '../redux/services/ShazamCoreApi'
import { DetailsHeader } from '../components'

const SongDetails = () => {
  const dispatch = useDispatch()
  const { songid } = useParams()
  const { activeSong, isPlaying } = useSelector((state) => state.player)
  console.log(songid)
  const { data: songData, isFetching: isFetchSongDetail } = useGetSongDetailsQuery({ songid })
  console.log(songData)
  return (
    <div className="flex flex-col">
      {/* <DetailsHeader songData={songData} /> */}
      <div className="mb-10">
        <h2 className="font-bold text-3xl text-white">Lyrics:</h2>

        <div className="mt-5">{/* {songData ? } */}</div>
      </div>
    </div>
  )
}

export default SongDetails
