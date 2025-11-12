const VideoCard = ({ title, views, timeAgo, username, duration, thumbnail }) => {
  return (
    <div className="bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] rounded-xl overflow-hidden text-white shadow-md hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
      {/* Thumbnail */}
      <div className="relative h-44 w-full overflow-hidden">
        <img
          src={thumbnail}
          alt="thumbnail"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <span className="absolute bottom-2 right-2 text-xs bg-black/70 px-2 py-0.5 rounded-md">
          {duration}
        </span>
      </div>

      {/* Info Section */}
      <div className="p-3">
        <h2 className="font-semibold text-sm text-gray-100 line-clamp-2 hover:text-blue-400 transition-colors duration-200">
          {title}
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          {views} views · {timeAgo}
        </p>
        <p className="text-xs text-gray-300 mt-1">{username}</p>
      </div>
    </div>
  );
};

export default VideoCard;

