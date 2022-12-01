import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { setActiveSong, playPause } from '../redux/features';
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from '../redux/services';

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data, isFetching: isFetchingRelatedSongs, error } = useGetSongRelatedQuery({ songId });
  const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery({ songId });

  if (isFetchingSongDetails && isFetchingRelatedSongs) return <Loader title="Searching song details..." />;
  if (isFetchingSongDetails || isFetchingRelatedSongs) return <Loader title="Searching song details..." />;

  if (error) return <Error />;

  const handlePause = () => dispatch(playPause(false));

  const handlePlay = ({ song, idx }) => {
    dispatch(setActiveSong({ song, data, idx }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col">
      <DetailsHeader
        artistId=""
        songData={songData}
      />

      <div className="mt-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>

        <div className="mt-5">
          {songData?.sections[1].type === 'LYRICS' ? (
            songData?.sections[1]?.text.map((line, i) => (
              <p
                key={`lyrics-${line}-${i}`}
                className="text-gray-400 text-base my-1"
              >
                {line}
              </p>
            ))
          ) : (
            <p className="text-gray-400 text-base my-1">Sorry, No lyrics found!</p>
          )}
        </div>
      </div>

      <RelatedSongs
        data={data}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePlay={handlePlay}
        handlePause={handlePause}
      />
    </div>
  );
};

export default SongDetails;
