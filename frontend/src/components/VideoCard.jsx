const VideoCard = ({ title, views, timeAgo, username, duration, thumbnail }) => {


  return (
    <div className="bg-black rounded overflow-hidden text-white">
      <div className="relative bg-gray-800 h-40 flex items-center justify-center">
        <span className="absolute bottom-1 right-1 text-xs bg-black px-1">{duration}</span>
        <img src={thumbnail} alt="thumbnail" className="w-full h-full object-cover" />
      </div>
      <div className="p-2">
        <h2 className="font-semibold text-sm">{title}</h2>
        <p className="text-xs text-gray-400">{views} Views · {timeAgo}</p>
        <p className="text-xs text-gray-300">{username}</p>
      </div>
    </div>
  );
};

export default VideoCard;
