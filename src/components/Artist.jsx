import Tracks from "./Tracks";

export default function Artist({ artist }) {
  return (
    <div className="w-full h-full flex flex-col p-4 sm:p-10 text-white font-inter">
      <div className="flex items-center">
        <img
          src={artist.imageURL}
          className="w-40 h-40 rounded-full mr-4 sm:mr-12"
        />
        <div className="flex-1 mt-2 sm:mt-0 flex flex-col">
          <a
            href={artist.profileURL}
            className="text-3xl sm:text-5xl hover:underline cursor-pointer"
            target="_blank"
          >
            {artist.name}
          </a>
          <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 mt-4">
            <span>{artist.followers}</span>
            <span>{artist.popularity}</span>
            <span>{artist.genre}</span>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="text-4xl mb-6">TOP TRACKS</div>
        <Tracks tracks={artist.topThreeTracks} />
      </div>
    </div>
  );
}
