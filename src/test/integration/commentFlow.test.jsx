import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderApp } from '../renderApp.jsx'

const firstCommentCard = () =>
  screen
    .getByText(
      'Start with the user-facing feature boundary and mock only the network.',
    )
    .closest('.comment-card')

describe('comment flow', () => {
  it('fetches comments for the selected thread', async () => {
    renderApp('/thread/thread-1')

    expect(
      await screen.findByText(
        'Start with the user-facing feature boundary and mock only the network.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Keeping the store and async thunks real makes the test more valuable.',
      ),
    ).toBeInTheDocument()
    expect(screen.getByText('2 total')).toBeInTheDocument()
  })

  it('adds a comment to the current thread', async () => {
    const user = userEvent.setup()
    renderApp('/thread/thread-1')

    await screen.findByText('2 total')
    await user.type(
      screen.getByPlaceholderText('Write a comment...'),
      'This comment was posted through the UI.',
    )
    await user.click(screen.getByRole('button', { name: /post comment/i }))

    expect(
      await screen.findByText('This comment was posted through the UI.'),
    ).toBeInTheDocument()
    expect(screen.getByText('3 total')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Write a comment...')).toHaveValue('')
  })

  it('updates a comment count after an upvote', async () => {
    const user = userEvent.setup()
    renderApp('/thread/thread-1')

    await screen.findByText(
      'Start with the user-facing feature boundary and mock only the network.',
    )
    const comment = firstCommentCard()
    await user.click(within(comment).getByRole('button', { name: 'Upvote' }))

    await waitFor(() => {
      expect(within(firstCommentCard()).getByText('4')).toBeInTheDocument()
    })
  })

  it('updates a comment count after a downvote', async () => {
    const user = userEvent.setup()
    renderApp('/thread/thread-1')

    await screen.findByText(
      'Start with the user-facing feature boundary and mock only the network.',
    )
    const comment = firstCommentCard()
    await user.click(within(comment).getByRole('button', { name: 'Downvote' }))

    await waitFor(() => {
      expect(within(firstCommentCard()).getByText('2')).toBeInTheDocument()
    })
  })
})
