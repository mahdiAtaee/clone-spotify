import { useDispatch } from 'react-redux'
import PlayPause from './PlayPause'
import { playPause, setActiveSong } from '../redux/features/playerSlice'

function Header({ artistImg, artistName, songName, song, data, i, isPlaying, activeSong }) {
  const dispatch = useDispatch()
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }))
    dispatch(playPause(true))
  }
  const handlePauseClick = () => {
    dispatch(playPause(false))
  }
  return (
    <div className="flex justify-between items-center p-3">
      <div className="flex flex-col justify-start items-baseline">
        <h1 className="font-bold text-6xl text-white pb-8">Suggest for You</h1>
        <p className="text-3xl text-white">{songName}</p>
        <h1 className="text-2xl text-white">{artistName}</h1>
        <button
          type="button"
          className="border-none rounded-full bg-blue-400 w-32 h-16 mt-5 text-white text-xl flex items-center justify-center">
          <span className="font-bold text-xl mr-5">Play</span>
          <PlayPause
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePlay={handlePlayClick}
            handlePause={handlePauseClick}
          />
        </button>
      </div>
      <div className="w-1/3 h-full">
        <img src={artistImg} alt="Artist" className="w-full h-full rounded-full border-4" />
      </div>
    </div>
  )
}

export default Header
