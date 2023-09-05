import Songbar from './SongBar'

const RelatedSongs = ({
  data,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
  artistID,
}) => (
  <div className="flex flex-col">
    <p className="font-bold text-2xl text-white">Related Songs:</p>

    <div className="mt-6 w-full flex flex-col">
      {data?.map((song, i) => (
        <Songbar
          key={song?.key ? `${song?.key}-${artistID}` : `${song?.id}-${artistID}`}
          song={song}
          i={i}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
          artistId={artistID}
        />
      ))}
    </div>
  </div>
)

export default RelatedSongs
