// channelRoutes.js - Create and fetch channels. Channel creation requires authentication.
import express from 'express'
import { createChannel, getChannel, getChannelVideos } from '../controllers/channelController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', protect, createChannel)
router.get('/:id', getChannel)
router.get('/:id/videos', getChannelVideos)

export default router
