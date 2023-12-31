import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Error, Loader, SongCard } from '../components'
import { genres } from '../assets/constants'
import { useGetTopChartsQuery } from '../redux/services/ShazamCoreApi'
import { selectGenreListId } from '../redux/features/playerSlice'
import Header from '../components/Header'

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function createData(data, randomSongNum) {
  return data?.tracks && data?.tracks[randomSongNum]
}

const Discover = () => {
  const [randomSongNum, setRandomSongNum] = useState(0)
  useEffect(() => {
    setRandomSongNum(generateRandomNumber(0, 20))
  }, [])
  const genreTitle = 'Pop'
  const { data, isFetching, error } = useGetTopChartsQuery()
  const dispatch = useDispatch()
  const { isPlaying, activeSong, genreListId } = useSelector((state) => state.player)
  if (isFetching) return <Loader title="Songs is Loading..." />
  if (error) return <Error />

  const randomSong = createData(data, randomSongNum)

  return (
    <div className="d-flex flex-col">
      <div className="w-full mt-4 mb-5">
        <Header
          artistImg={randomSong?.images?.coverart}
          artistName={randomSong?.subtitle}
          songName={randomSong?.title}
          song={randomSong}
          data={data}
          i={1}
          isPlaying={isPlaying}
          activeSong={activeSong}
        />
      </div>
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white">Discover {genreTitle}</h2>
        <select
          onChange={(e) => {
            dispatch(selectGenreListId(e.target.value))
          }}
          value={genreListId || 'Pop'}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5 cursor-pointer">
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.tracks?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
          />
        ))}
      </div>
    </div>
  )
}

export default Discover
