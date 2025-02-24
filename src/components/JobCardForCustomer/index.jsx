import React from 'react'
import { Container, Segment, Grid } from 'semantic-ui-react'
import { JobCardHeader } from '../JobCardHeader'
import { FormattedDescription } from '../FormattedDescription'
import Applications from './Applications'
import { useJobApplications } from '../../hooks/useJobApplications'
import { useAuth } from '../../hooks'
import JustOneSecond from '../JustOneSecond'
import ErrorWrapper from '../ErrorWrapper'
import isJobOwner from '../../lib/job'
import { ShareButtons } from '../ShareButtons/ShareButtons'

export const JobCardForCustomer = ({
  job,
  coinSymbol,
  domain,
  blockchainViewAddressURL,
}) => {
  const { isLoading: personLoading, token, person } = useAuth()
  const {
    applications,
    isLoading: applicationsLoading,
    error: applicationsError,
  } = useJobApplications(token, job.id)

  if (personLoading) {
    return <JustOneSecond title="Loading profile..." />
  }

  if (!isJobOwner(job, person)) {
    return <ErrorWrapper header="You do not have access to this job" />
  }

  if (applicationsLoading) {
    return <JustOneSecond title="Loading applications..." />
  }

  if (applicationsError) {
    return (
      <ErrorWrapper
        header="Unable to load applications"
        error={applicationsError}
      />
    )
  }

  return (
    <Grid stackable>
      <Grid.Row>
        <Grid.Column>
          <Segment>
            <Segment basic>
              <JobCardHeader
                job={job}
                coinSymbol={coinSymbol}
                blockchainViewAddressURL={blockchainViewAddressURL}
              />
            </Segment>
            <Segment basic>
              <Container text fluid>
                <FormattedDescription description={job.description} />
              </Container>
            </Segment>
          </Segment>
          <ShareButtons domain={domain} job={job} />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          {job.applications_count > 0 && (
            <Applications
              job={job}
              applications={applications}
              blockchainViewAddressURL={blockchainViewAddressURL}
              coinSymbol={coinSymbol}
            />
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}
