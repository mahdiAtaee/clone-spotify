import { useDispatch, useSelector } from 'react-redux'
import { Error, Loader, SongCard } from '../components'
import { genres } from '../assets/constants'
import { useGetTopChartsQuery } from '../redux/services/ShazamCoreApi'

const Discover = () => {
  const genreTitle = 'Pop'
  const { data, isFetching, error } = useGetTopChartsQuery()
  const dispatch = useDispatch()
  const { isPlaying, activeSong } = useSelector((state) => state.player)
  console.log(data)
  if (isFetching) return <Loader title="Songs is Loading..." />
  if (error) return <Error />
  return (
    <div className="d-flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white">Discover {genreTitle}</h2>
        <select
          onChange={() => {}}
          value=""
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5">
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
