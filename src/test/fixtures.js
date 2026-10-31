export const users = [
  {
    _id: 'user-1',
    name: 'Ada Lovelace',
  },
  {
    _id: 'user-2',
    name: 'Grace Hopper',
  },
]

export const subreddits = [
  {
    _id: 'subreddit-1',
    name: 'frontend',
    description: 'Frontend development discussions',
  },
  {
    _id: 'subreddit-2',
    name: 'testing',
    description: 'Software testing discussions',
  },
]

export const threads = [
  {
    _id: 'thread-1',
    title: 'How do you organize React features?',
    content: 'I am looking for practical ways to keep a growing app maintainable.',
    author: users[0],
    subreddit: subreddits[0],
    voteCount: 4,
    createdAt: '2026-01-15T12:00:00.000Z',
  },
  {
    _id: 'thread-2',
    title: 'What belongs in an integration test?',
    content: 'Which boundaries do you keep real in your frontend tests?',
    author: users[1],
    subreddit: subreddits[1],
    voteCount: 2,
    createdAt: '2026-01-14T12:00:00.000Z',
  },
]

export const comments = [
  {
    _id: 'comment-1',
    thread: threads[0]._id,
    content: 'Start with the user-facing feature boundary and mock only the network.',
    user: users[1],
    voteCount: 3,
    createdAt: '2026-01-15T13:00:00.000Z',
  },
  {
    _id: 'comment-2',
    thread: threads[0]._id,
    content: 'Keeping the store and async thunks real makes the test more valuable.',
    user: users[0],
    voteCount: 1,
    createdAt: '2026-01-15T14:00:00.000Z',
  },
]
