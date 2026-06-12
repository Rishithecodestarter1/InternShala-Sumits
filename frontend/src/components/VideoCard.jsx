// VideoCard.jsx - Displays one video thumbnail card and links to its video player page.
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatDate, formatViews } from '../utils/formatters.js'

function VideoCard({ video, showOwnerActions = false, onEdit, onDelete }) {
  const [hasImageError, setHasImageError] = useState(false)
  const title = video.title || 'Untitled video'

  return (
    <article className="video-card">
      <Link to={`/watch/${video._id}`}>
        {video.thumbnailUrl && !hasImageError ? (
          <img className="video-card__thumbnail" src={video.thumbnailUrl} alt={title} loading="lazy" onError={() => setHasImageError(true)} />
        ) : (
          <div className="video-card__thumbnail video-card__thumbnail--fallback" aria-label={title}>
            <span>{title}</span>
          </div>
        )}
        <h2 className="video-card__title">{title}</h2>
        <p className="video-card__channel">{video.channelName}</p>
        <p className="video-card__meta">
          {formatViews(video.views)} {video.uploadDate ? `· ${formatDate(video.uploadDate)}` : ''}
        </p>
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
