import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

import { Error, Loader, SongCard } from '../components'
import { useGetSongsByCountryQuery } from '../redux/services/ShazamCoreApi'

const CountryTracks = () => {
  const [country, setCountry] = useState('')
  const [loading, setLoading] = useState(true)
  const { activeSong, isPlaying } = useSelector((state) => state.player)
  const { data, isFetching, error } = useGetSongsByCountryQuery(country)

  useEffect(() => {
    axios
      .get('https://geo.ipify.org/api/v2/country?apiKey=at_l4FZaMfh6xTV3RSSZoTMHz1OmIqio')
      .then((res) => setCountry(res?.data?.location?.country))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [country])

  if (isFetching && loading) return <Loader title="loading songs around you..." />
  if (error && country) return <Error />

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around You <span className="font-bold text-white text-2xl">{country}</span>
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.tracks?.map((song, i) => (
          <SongCard
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            key={song?.key}
          />
        ))}
      </div>
    </div>
  )
}

export default CountryTracks
