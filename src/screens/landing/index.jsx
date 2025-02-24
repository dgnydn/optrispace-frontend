import React from 'react'
import Link from 'next/link'
import { Container, Divider, Button, Header, List } from 'semantic-ui-react'

export const LandingScreen = ({ isSmallScreen }) => {
  return (
    <>
      <Container textAlign="center" fluid>
        <Header
          as="h1"
          style={{
            fontSize: isSmallScreen ? '3.5em' : '5em',
            fontWeight: 'bold',
            marginBottom: 0,
            marginTop: isSmallScreen ? null : '0.7em',
          }}
        >
          OptriSpace
        </Header>

        <Header
          as="h2"
          style={{
            fontSize: isSmallScreen ? '1.3em' : '1.8em',
            fontWeight: 'normal',
            marginTop: isSmallScreen ? '0.8em' : '1.3em',
          }}
        >
          No middlemen. No paperwork.
          <br />
          Fast & Secure Payments.
        </Header>

        <Divider style={{ marginTop: isSmallScreen ? '1em' : '3em' }} hidden />

        <Button.Group size="huge">
          <Link href="/sign_up" passHref>
            <Button primary>Register</Button>
          </Link>

          <Button.Or />

          <Link href="/sign_in" passHref>
            <Button primary>Log In</Button>
          </Link>
        </Button.Group>
      </Container>

      <Divider style={{ marginTop: isSmallScreen ? '2em' : '5em' }} />

      <Container text textAlign="justified">
        <Header
          as="h2"
          content="What is OptriSpace"
          style={{
            fontSize: isSmallScreen ? '1.5em' : '1.8em',
            fontWeight: 'normal',
            marginTop: isSmallScreen ? '1.0em' : '1.3em',
          }}
        />

        <p>
          We are OptriSpace - an international team who got together to face a
          challenge and build a brand-new platform for people like us:
          freelancers, managers and entrepreneurs. We provide a platform for
          people looking for jobs or for professionals for their projects.
        </p>

        <p>
          Our platform is based on the blockchain technology and uses
          cryptocurrency as a payment method. That makes OptriSpace secure and
          fast. Smart Contracts protect customers and freelancers from third
          parties and middlemen. Smart Contracts handle all logic depends on
          terms and conditions which have to be signed by both participants.
        </p>

        <Header
          as="h2"
          content="How OptriSpace works"
          style={{
            fontSize: isSmallScreen ? '1.5em' : '1.8em',
            fontWeight: 'normal',
            marginTop: isSmallScreen ? '1.0em' : '1.3em',
          }}
        />

        <Header as="h3" content="1. Customer posts a job on the platform" />

        <p>
          A customer lists a particular task on the platform and picks a person
          who wants to work with upon this task. Both of them use our internal
          messaging system to discuss terms and conditions (price, acceptance
          criteria, etc.) of a future contract.
        </p>

        <Header
          as="h3"
          content="2. Freelancer agrees to terms, accepts and signs the contract"
        />

        <p>
          At this stage the freelancer has to accept the contract on our
          platform.
          <br />
          After that the customer will be able to create a Smart Contract on
          blockchain.
        </p>

        <Header as="h3" content="3. Customer funds the Smart Contract" />

        <p>
          The customer initiates transaction on blockchain to send money from
          own wallet to Smart Contract address. The funds are held on the Smart
          Contract address until all conditions have been met.
        </p>

        <Header
          as="h3"
          content="4. Freelancer starts working on the task and delivers a result"
        />

        <p>
          The freelancer can&apos;t request money before the customer accepts
          the job result. The freelancer has to do best to finish the task to
          get paid.
        </p>

        <Header as="h3" content="5. Customer approves money withdrawal" />

        <p>
          The customer gets the work result and approves money withdrawal from
          the Smart Contract by the freelancer.
        </p>

        <Header as="h3" content="6. Freelancer withdraws money" />

        <p>
          Freelancer requests money from the Smart Contract to it&apos;s own
          crypto wallet.
        </p>

        <Header
          as="h2"
          content="What is inside?"
          style={{
            fontSize: isSmallScreen ? '1.5em' : '1.8em',
            fontWeight: 'normal',
            marginTop: isSmallScreen ? '1.0em' : '1.3em',
          }}
        />

        <List bulleted>
          <List.Item>
            Powered by{' '}
            <Link
              href="https://github.com/optriment/optrispace-contract"
              passHref
            >
              <a
                href="https://github.com/optriment/optrispace-contract"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                Smart Contracts
              </a>
            </Link>
          </List.Item>
          <List.Item>
            All of our code is{' '}
            <Link href="https://github.com/optriment" passHref>
              <a
                href="https://github.com/optriment"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                open source
              </a>
            </Link>
          </List.Item>
          <List.Item>All payments in crypto</List.Item>
          <List.Item>No paperwork</List.Item>
          <List.Item>No middlemen</List.Item>
        </List>

        <Header
          as="h2"
          content="What network do we use?"
          style={{
            fontSize: isSmallScreen ? '1.5em' : '1.8em',
            fontWeight: 'normal',
            marginTop: isSmallScreen ? '1.0em' : '1.3em',
          }}
        />

        <p>
          Binance Smart Chain.
          <br />
          Our main currency is the native currency of this network (BNB).
        </p>
      </Container>
    </>
  )
}
