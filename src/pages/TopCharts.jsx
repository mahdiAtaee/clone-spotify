import { useSelector } from 'react-redux'
import { Error, Loader, SongCard } from '../components'
import { useGetTopChartsQuery } from '../redux/services/ShazamCoreApi'

const TopCharts = () => {
  const { data, isFetching, error } = useGetTopChartsQuery()
  const { isPlaying, activeSong } = useSelector((state) => state.player)
  if (isFetching) return <Loader title="Songs is Loading..." />
  if (error) return <Error />

  return (
    <div className="d-flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white">Discover Top Charts</h2>
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

export default TopCharts
