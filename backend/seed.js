// seed.js - Run once with "npm run seed" to populate MongoDB with sample data for testing.
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import Channel from './models/Channel.js'
import Comment from './models/Comment.js'
import User from './models/User.js'
import Video from './models/Video.js'
import { error as logError, info, success } from './utils/colorLog.js'

dotenv.config({ quiet: true })

const sampleVideos = [
  {
    title: 'Learn React in 30 Minutes',
    thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: 'A quick tutorial to get started with React components, props, and state.',
    views: 15200,
    likes: [],
    dislikes: [],
    category: 'Education',
  },
  {
    title: 'JavaScript Array Methods Explained',
    thumbnailUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    description: 'Understand map, filter, reduce, and find with beginner-friendly examples.',
    views: 9800,
    likes: [],
    dislikes: [],
    category: 'Web Development',
  },
  {
    title: 'Data Structures for Interviews',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    description: 'A practical overview of arrays, stacks, queues, linked lists, and trees.',
    views: 22100,
    likes: [],
    dislikes: [],
    category: 'Education',
  },
  {
    title: 'Relaxing Coding Music Mix',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    description: 'A calm music session for long study and coding practice.',
    views: 30200,
    likes: [],
    dislikes: [],
    category: 'Music',
  },
  {
    title: 'Gaming UI Design Breakdown',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    description: 'Learn how readable HUDs and game menus are designed.',
    views: 11200,
    likes: [],
    dislikes: [],
    category: 'Gaming',
  },
  {
    title: 'Entertainment Editing Tricks',
    thumbnailUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    description: 'Simple editing ideas that make short videos more fun to watch.',
    views: 13400,
    likes: [],
    dislikes: [],
    category: 'Entertainment',
  },
  {
    title: 'Tech News Weekly Roundup',
    thumbnailUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
    description: 'A quick weekly roundup of developer tools, launches, and platform news.',
    views: 6800,
    likes: [],
    dislikes: [],
    category: 'News',
  },
  {
    title: 'Sports Analytics Dashboard Walkthrough',
    thumbnailUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    description: 'A dashboard walkthrough for sports stats and match insights.',
    views: 7400,
    likes: [],
    dislikes: [],
    category: 'Sports',
  },
  {
    title: 'CSS Layout Crash Course',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    description: 'Build cleaner layouts with flexbox, grid, spacing, and responsive rules.',
    views: 18600,
    likes: [],
    dislikes: [],
    category: 'Education',
  },
  {
    title: 'Comedy Timing for Short Videos',
    thumbnailUrl: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    description: 'A practical look at pacing, reaction shots, and short-form editing rhythm.',
    views: 9400,
    likes: [],
    dislikes: [],
    category: 'Entertainment',
  },
  {
    title: 'Focus Beats for Study Sessions',
    thumbnailUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    description: 'A steady background playlist for revision, coding practice, and deep work.',
    views: 27400,
    likes: [],
    dislikes: [],
    category: 'Music',
  },
  {
    title: 'Esports Strategy Basics',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    description: 'Understand map control, cooldown timing, and team communication basics.',
    views: 12100,
    likes: [],
    dislikes: [],
    category: 'Gaming',
  },
  {
    title: 'Football Match Analysis',
    thumbnailUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    description: 'Breaking down pressing, transitions, and chance creation from a match replay.',
    views: 15800,
    likes: [],
    dislikes: [],
    category: 'Sports',
  },
  {
    title: 'AI Tools News Brief',
    thumbnailUrl: 'https://images.unsplash.com/photo-1495020689067-958852a7765e',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
    description: 'A concise update on useful AI tools, developer releases, and product changes.',
    views: 10900,
    likes: [],
    dislikes: [],
    category: 'News',
  },
  {
    title: 'Cooking a Simple Pasta Dinner',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    description: 'A beginner-friendly pasta dinner with pantry ingredients and calm pacing.',
    views: 8300,
    likes: [],
    dislikes: [],
    category: 'Cooking',
  },
  {
    title: 'Live Stream Setup Guide',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    description: 'Set up lighting, microphone levels, scenes, and a simple live workflow.',
    views: 6700,
    likes: [],
    dislikes: [],
    category: 'Live',
  },
]

async function seedDatabase() {
  await connectDB()
  info('Clearing old youtube-clone sample data...')

  await Promise.all([User.deleteMany({}), Channel.deleteMany({}), Video.deleteMany({}), Comment.deleteMany({})])

  const password = await bcrypt.hash('password123', 12)

  const john = await User.create({
    username: 'JohnDoe',
    email: 'john@example.com',
    password,
    avatar: '',
  })

  const jane = await User.create({
    username: 'JaneCoder',
    email: 'jane@example.com',
    password,
    avatar: '',
  })

  const channel = await Channel.create({
    channelName: 'Code with John',
    owner: john._id.toString(),
    description: 'Coding tutorials and tech reviews by John Doe.',
    channelBanner: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72',
    subscribers: 5200,
  })

  await User.findByIdAndUpdate(john._id, { $addToSet: { channels: channel._id.toString() } })

  const createdVideos = await Video.insertMany(
    sampleVideos.map((video) => ({
      ...video,
      channelId: channel._id.toString(),
      channelName: channel.channelName,
      uploader: john._id.toString(),
    })),
  )

  await Channel.findByIdAndUpdate(channel._id, {
    $set: { videos: createdVideos.map((video) => video._id.toString()) },
  })

  await Comment.insertMany([
    {
      videoId: createdVideos[0]._id.toString(),
      userId: jane._id.toString(),
      username: jane.username,
      text: 'Great video. Very helpful!',
    },
    {
      videoId: createdVideos[1]._id.toString(),
      userId: john._id.toString(),
      username: john.username,
      text: 'Practice these methods with real examples.',
    },
    {
      videoId: createdVideos[2]._id.toString(),
      userId: jane._id.toString(),
      username: jane.username,
      text: 'This helped me revise before interviews.',
    },
    {
      videoId: createdVideos[3]._id.toString(),
      userId: john._id.toString(),
      username: john.username,
      text: 'Perfect background track for a late coding session.',
    },
    {
      videoId: createdVideos[4]._id.toString(),
      userId: jane._id.toString(),
      username: jane.username,
      text: 'The HUD examples made the design choices easy to understand.',
    },
    {
      videoId: createdVideos[5]._id.toString(),
      userId: john._id.toString(),
      username: john.username,
      text: 'The pacing tips are simple but useful for short videos.',
    },
    {
      videoId: createdVideos[6]._id.toString(),
      userId: jane._id.toString(),
      username: jane.username,
      text: 'Nice quick summary of what changed this week.',
    },
    {
      videoId: createdVideos[7]._id.toString(),
      userId: john._id.toString(),
      username: john.username,
      text: 'The dashboard view makes the stats much easier to explain.',
    },
    {
      videoId: createdVideos[8]._id.toString(),
      userId: jane._id.toString(),
      username: jane.username,
      text: 'Flexbox and grid finally clicked for me here.',
    },
    {
      videoId: createdVideos[9]._id.toString(),
      userId: john._id.toString(),
      username: john.username,
      text: 'Great reminder that timing matters as much as the joke.',
    },
    {
      videoId: createdVideos[10]._id.toString(),
      userId: jane._id.toString(),
      username: jane.username,
      text: 'Adding this to my study playlist.',
    },
    {
      videoId: createdVideos[11]._id.toString(),
      userId: john._id.toString(),
      username: john.username,
      text: 'Clear strategy notes for beginners.',
    },
    {
      videoId: createdVideos[12]._id.toString(),
      userId: jane._id.toString(),
      username: jane.username,
      text: 'The match breakdown is easy to follow.',
    },
    {
      videoId: createdVideos[13]._id.toString(),
      userId: john._id.toString(),
      username: john.username,
      text: 'Short and useful news format.',
    },
    {
      videoId: createdVideos[14]._id.toString(),
      userId: jane._id.toString(),
      username: jane.username,
      text: 'Simple recipe and very beginner friendly.',
    },
    {
      videoId: createdVideos[15]._id.toString(),
      userId: john._id.toString(),
      username: john.username,
      text: 'The setup checklist is practical for first streams.',
    },
  ])

  success('Database seeded successfully')
  process.exit(0)
}

seedDatabase().catch((error) => {
  logError(error.message || 'Seed failed')
  process.exit(1)
})
