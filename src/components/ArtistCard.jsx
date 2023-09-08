import { useNavigate } from 'react-router-dom'

const ArtistCard = ({ track }) => {
  const navigate = useNavigate()
  console.log(track)
  return (
    <div
      className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-70 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
      onClick={() => navigate(`/artists/${track?.artists && track?.artists[0]?.adamid}`)}>
      <div className="relative w-full h-56 group">
        <img alt="cover_art" src={track?.images?.background} />
      </div>
      <div className="flex flex-col mt-2">
        <p className="text-gray-300 text-lg truncate mt-1">{track?.subtitle}</p>
      </div>
    </div>
  )
}

export default ArtistCard
