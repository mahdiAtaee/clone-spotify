/* eslint-disable arrow-body-style */
/* eslint-disable import/no-unresolved */
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper/modules'
import { setActiveSong, playPause } from '../redux/features/playerSlice'
import { useGetTopChartsQuery } from '../redux/services/ShazamCoreApi'
import PlayPause from './PlayPause'
import 'swiper/css'
import 'swiper/css/free-mode'

const TopChartSong = ({ song, i, activeSong, isPlaying, handlePlayClick, handlePauseClick }) => (
  <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer">
    <h3 className="text-white text-base font-bold mr-3">{i + 1}.</h3>
    <div className="flex-1 flex justify-between items-center">
      <img src={song?.images?.coverart} alt={song?.title} className="w-20 h-20 rounded-lg" />
      <div className="flex-1 flex flex-col justify-center items-start ml-3">
        <Link to={`/songs/${song?.key}`} className="font-bold text-white text-xl">
          {song?.title}
        </Link>
        <Link to={`/artists/${song?.artists[0].adamid}`} className="text-base text-gray-300 mt-1">
          {song?.subtitle}
        </Link>
      </div>
      <PlayPause
        song={song}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePlay={handlePlayClick}
        handlePause={handlePauseClick}
      />
    </div>
  </div>
)

const TopPlay = () => {
  const divRef = useRef(null)
  const dispatch = useDispatch()
  const { activeSong, isPlaying } = useSelector((state) => state.player)
  const { data } = useGetTopChartsQuery()
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' })
  })

  const topSongs = data?.tracks?.slice(0, 5)

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }))
    dispatch(playPause(true))
  }
  const handlePauseClick = () => {
    dispatch(playPause(false))
  }

  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col">
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-white font-bold text-2xl">Top Charts</h1>
          <Link to="/top-charts">
            <p className="text-gray-400 text-base cursor-pointer ">See more</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {topSongs?.map((song, i) => (
            <TopChartSong
              key={song.key}
              song={song}
              i={i}
              activeSong={activeSong}
              isPlaying={isPlaying}
              handlePlayClick={() => handlePlayClick(song, i)}
              handlePauseClick={handlePauseClick}
            />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-white font-bold text-2xl">Top Artists</h1>
          <Link to="/top-artists">
            <p className="text-gray-400 text-base cursor-pointer ">See more</p>
          </Link>
        </div>

        <Swiper
          slidesPerView="auto"
          spaceBetween={5}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4">
          {topSongs?.map((song) => (
            <SwiperSlide
              key={song?.key}
              style={{ width: '25%', height: 'auto' }}
              className="shadow-lg animate-slideright">
              <Link to={`/artists/${song?.artists[0].adamid}`}>
                <img src={song?.images.background} className="rounded-full w-full object-cover" />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default TopPlay
