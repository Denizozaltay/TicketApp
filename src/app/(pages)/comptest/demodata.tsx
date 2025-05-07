export const ticketDemoData = [
    {
        id: '1',
        username: 'jdoe',
        title: 'Cannot log in',
        content: 'I keep getting an error when trying to log in.',
        userId: 'u1',
        createdAt: new Date('2024-12-01T10:30:00Z'),
        isArchived: false,
      },
      {
        id: '2',
        username: 'asmith',
        title: 'Feature request: Dark mode',
        content: 'It would be nice to have a dark mode in the UI.',
        userId: 'u2',
        createdAt: new Date('2025-01-15T14:10:00Z'),
        isArchived: false,
      }
]

export const ticketmsgDemoData = [
    {
        id: 'msg1',
        content: 'I am still waiting for a reply on this ticket.',
        ticketId: '1',
        userId: 'u1',
        createdAt: new Date('2025-05-05T10:15:00Z'),
      },
      {
        id: 'msg2',
        content: 'We are looking into the issue and will update you shortly.',
        ticketId: '1',
        userId: 'support1',
        createdAt: new Date('2025-05-05T10:45:00Z'),
      },
      {
        id: 'msg3',
        content: 'Thank you, I appreciate the quick response.',
        ticketId: '1',
        userId: 'u1',
        createdAt: new Date('2025-05-05T11:00:00Z'),
      },
]