import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { playPause, setActiveSong } from '../redux/features/playerSlice'
import PlayPause from './PlayPause'

const SongCard = ({ song, i, isPlaying, activeSong, data }) => {
  const dispatch = useDispatch()
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }))
    dispatch(playPause(true))
  }
  const handlePauseClick = () => {
    dispatch(playPause(false))
  }

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-70 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.title === song.title ? 'flex bg-black bg-opacity-70' : 'hidden'
          }`}>
          <PlayPause
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePlay={handlePlayClick}
            handlePause={handlePauseClick}
          />
        </div>
        <img alt="cover_art" src={song?.images?.coverart} />
      </div>
      <div className="flex flex-col mt-4">
        <p className="font-semibold text-white text-lg truncate">
          <Link to={`/songs/${song?.key}`}>{song?.title}</Link>
        </p>
        <p className="text-gray-300 text-sm truncate mt-1">
          <Link to={song?.artists ? `/artists/${song?.artists[0].adamid}` : '/top-artists'}>
            {song?.subtitle}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SongCard
