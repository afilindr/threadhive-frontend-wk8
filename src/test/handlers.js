import { http, HttpResponse } from 'msw'
import { COMMENT_API, SUBREDDIT_API, THREAD_API } from '../config/apiConfig.js'
import { comments, subreddits, threads, users } from './fixtures.js'

const API_BASE_URL = 'http://localhost:3000/api'

const apiResponse = (data, init) =>
  HttpResponse.json({ data }, init)

const copy = (value) => structuredClone(value)

export const handlers = [
  http.get(`${API_BASE_URL}${THREAD_API.GET_ALL}`, () =>
    apiResponse(copy(threads)),
  ),
  http.get(`${API_BASE_URL}${THREAD_API.GET_BY_ID(':id')}`, ({ params }) => {
    const thread = threads.find((item) => item._id === params.id)
    if (!thread) {
      return HttpResponse.json({ message: 'Thread not found' }, { status: 404 })
    }

    return apiResponse(copy(thread))
  }),
  http.post(`${API_BASE_URL}${THREAD_API.CREATE}`, async ({ request }) => {
    const body = await request.json()
    const subreddit = subreddits.find(
      (item) => item._id === body.subreddit || item.name === body.subreddit,
    )

    if (!body.title || !body.content || !subreddit) {
      return HttpResponse.json(
        { message: 'Title, content, and a valid subreddit are required' },
        { status: 400 },
      )
    }

    return apiResponse(
      {
        _id: 'thread-created',
        title: body.title,
        content: body.content,
        author: copy(users[0]),
        subreddit: copy(subreddit),
        voteCount: 0,
        createdAt: '2026-01-16T12:00:00.000Z',
      },
      { status: 201 },
    )
  }),
  http.post(`${API_BASE_URL}${THREAD_API.UPVOTE(':id')}`, ({ params }) => {
    const thread = threads.find((item) => item._id === params.id)
    if (!thread) {
      return HttpResponse.json({ message: 'Thread not found' }, { status: 404 })
    }

    return apiResponse({ ...copy(thread), voteCount: thread.voteCount + 1 })
  }),
  http.post(`${API_BASE_URL}${THREAD_API.DOWNVOTE(':id')}`, ({ params }) => {
    const thread = threads.find((item) => item._id === params.id)
    if (!thread) {
      return HttpResponse.json({ message: 'Thread not found' }, { status: 404 })
    }

    return apiResponse({ ...copy(thread), voteCount: thread.voteCount - 1 })
  }),
  http.get(
    `${API_BASE_URL}${COMMENT_API.GET_BY_THREAD(':threadId')}`,
    ({ params }) =>
      apiResponse(
        copy(comments.filter((comment) => comment.thread === params.threadId)),
      ),
  ),
  http.post(`${API_BASE_URL}${COMMENT_API.CREATE}`, async ({ request }) => {
    const body = await request.json()
    if (!body.thread || !body.content) {
      return HttpResponse.json(
        { message: 'Thread and content are required' },
        { status: 400 },
      )
    }

    return apiResponse(
      {
        _id: 'comment-created',
        thread: body.thread,
        content: body.content,
        user: copy(users[0]),
        voteCount: 0,
        createdAt: '2026-01-16T12:01:00.000Z',
      },
      { status: 201 },
    )
  }),
  http.post(`${API_BASE_URL}${COMMENT_API.UPVOTE(':id')}`, ({ params }) => {
    const comment = comments.find((item) => item._id === params.id)
    if (!comment) {
      return HttpResponse.json({ message: 'Comment not found' }, { status: 404 })
    }

    return apiResponse({ ...copy(comment), voteCount: comment.voteCount + 1 })
  }),
  http.post(`${API_BASE_URL}${COMMENT_API.DOWNVOTE(':id')}`, ({ params }) => {
    const comment = comments.find((item) => item._id === params.id)
    if (!comment) {
      return HttpResponse.json({ message: 'Comment not found' }, { status: 404 })
    }

    return apiResponse({ ...copy(comment), voteCount: comment.voteCount - 1 })
  }),
  http.get(`${API_BASE_URL}${SUBREDDIT_API.GET_ALL}`, () =>
    apiResponse(copy(subreddits)),
  ),
]
