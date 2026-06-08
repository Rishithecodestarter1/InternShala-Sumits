// VideoCard.jsx - Displays one video thumbnail card and links to its video player page.
import { Link } from 'react-router-dom'

function formatViews(views = 0) {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M views`
  if (views >= 1000) return `${Math.round(views / 1000)}K views`
  return `${views} views`
}

function VideoCard({ video, showOwnerActions = false, onEdit, onDelete }) {
  return (
    <article className="video-card">
      <Link to={`/watch/${video._id}`}>
        <img className="video-card__thumbnail" src={video.thumbnailUrl} alt={video.title} loading="lazy" />
        <h2 className="video-card__title">{video.title}</h2>
        <p className="video-card__channel">{video.channelName}</p>
        <p className="video-card__meta">{formatViews(video.views)}</p>
      </Link>
      {showOwnerActions && (
        <div className="video-card__actions">
          <button className="secondary-button" type="button" onClick={() => onEdit(video)}>
            Edit
          </button>
          <button className="danger-button" type="button" onClick={() => onDelete(video)}>
            Delete
          </button>
        </div>
      )}
    </article>
  )
}

export default VideoCard
