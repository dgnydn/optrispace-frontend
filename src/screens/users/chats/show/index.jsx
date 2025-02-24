import Link from 'next/link'
import React from 'react'
import { Grid, List, Header, Segment } from 'semantic-ui-react'
import { Chat } from '../../../../components/Chat'
import ErrorWrapper from '../../../../components/ErrorWrapper'
import JustOneSecond from '../../../../components/JustOneSecond'
import { useApplication } from '../../../../hooks/useApplication'
import { formatDateTime } from '../../../../lib/formatDate'

export const ChatScreen = ({ chat, token, coinSymbol }) => {
  const createdAt = formatDateTime(chat.created_at)
  const parts = chat.topic.split(':')
  const resourceId = parts[2]

  const {
    application,
    isLoading: applicationLoading,
    error: applicationError,
  } = useApplication(token, resourceId)

  if (applicationLoading) {
    return <JustOneSecond title="Loading application..." />
  }

  if (applicationError) {
    return (
      <ErrorWrapper
        header="Unable to load application"
        error={applicationError}
      />
    )
  }

  return (
    <Segment basic>
      <Header as="h2">
        <Link href={`/jobs/${application.job_id}`} passHref>
          <a>{application.job_title}</a>
        </Link>
      </Header>

      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={10} verticalAlign="top">
            <Segment>
              <Chat chatId={chat.id} token={token} />
            </Segment>
          </Grid.Column>

          <Grid.Column width={6} verticalAlign="top">
            <Segment>
              <Header as="h2" content="Information" />

              <List divided relaxed>
                <List.Item>
                  <b>Chat started:</b> {createdAt}
                </List.Item>
                <List.Item>
                  <b>Job budget:</b> {application.job_budget + ' ' + coinSymbol}
                </List.Item>
                <List.Item>
                  <b>Applicant&apos;s price:</b>
                  {' ' + application.price + ' ' + coinSymbol}
                </List.Item>
              </List>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}
