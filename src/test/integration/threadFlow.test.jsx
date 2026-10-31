import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderApp } from '../renderApp.jsx'

describe('thread flow', () => {
  it('fetches and displays the thread feed', async () => {
    renderApp()

    expect(await screen.findByText('How do you organize React features?')).toBeInTheDocument()
    expect(screen.getByText('What belongs in an integration test?')).toBeInTheDocument()
    expect(screen.getByText('r/frontend')).toBeInTheDocument()
  })

  it('creates a thread in a selected community', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(screen.getByRole('button', { name: /create/i }))
    const communitySelect = await screen.findByRole('combobox')
    await user.selectOptions(communitySelect, 'subreddit-1')
    await user.type(
      screen.getByPlaceholderText("What's on your mind?"),
      'Integration test thread',
    )
    await user.type(
      screen.getByPlaceholderText('Share your thoughts...'),
      'Verify the thread creation flow.',
    )
    await user.click(screen.getByRole('button', { name: /post thread/i }))

    expect(
      await screen.findByText('Integration test thread'),
    ).toBeInTheDocument()
    expect(screen.queryByText('✏️ Create New Thread')).not.toBeInTheDocument()
  })

  it.each([
    ['upvotes', 'Upvote item', '5'],
    ['downvotes', 'Downvote item', '3'],
  ])('updates the visible count when a thread %s', async (_action, label, count) => {
    const user = userEvent.setup()
    renderApp()

    await screen.findByText('How do you organize React features?')
    const thread = screen
      .getByText('How do you organize React features?')
      .closest('.thread-card')

    await user.click(within(thread).getByRole('button', { name: label }))

    await waitFor(() => {
      const currentThread = screen
        .getByText('How do you organize React features?')
        .closest('.thread-card')
      expect(within(currentThread).getByText(count)).toBeInTheDocument()
    })
  })

  it('fetches a thread by ID when opening its comments', async () => {
    const user = userEvent.setup()
    renderApp()

    await screen.findByText('How do you organize React features?')
    const thread = screen
      .getByText('How do you organize React features?')
      .closest('.thread-card')
    await user.click(within(thread).getByRole('link', { name: /view comments/i }))

    const threadHeading = await screen.findByRole('heading', {
      name: 'How do you organize React features?',
    })
    expect(threadHeading).toBeInTheDocument()
    expect(
      within(threadHeading.closest('.single-thread-card')).getByText(
        'Ada Lovelace',
      ),
    ).toBeInTheDocument()
  })

  it('shows a not-found message when the thread endpoint returns 404', async () => {
    renderApp('/thread/missing-thread')

    expect(await screen.findByText('Thread not found')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Go Back' })).toBeInTheDocument()
  })
})
