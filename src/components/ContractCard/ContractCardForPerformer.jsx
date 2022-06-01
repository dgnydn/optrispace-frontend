import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { Button, Container, Grid, Segment, Step } from 'semantic-ui-react'
import { acceptContract, sendContract } from '../../lib/api'
import ErrorWrapper from '../ErrorWrapper'

import TitleDescription from './TitleDescription'
import Sidebar from './Sidebar'

import Web3Context from '../../context/web3-context'
import WalletIsNotInstalled from '../WalletIsNotInstalled'
import { JustOneSecondBlockchain } from '../JustOneSecond'
import WrongBlockchainNetwork from '../WrongBlockchainNetwork'
import ConnectWallet from '../ConnectWallet'

export default function ContractCardForPerformer({ contract, token }) {
  const router = useRouter()

  const {
    isLoading: isLoadingWeb3,
    isWalletInstalled,
    isWalletConnected,
    isCorrectNetwork,
    connectWallet,
    currentAccount,
    token: tokenContract,
    tokenDecimals,
    tokenSymbol,
    isWalletReady,
  } = useContext(Web3Context)

  const [error, setError] = useState(undefined)

  const [txLoading, setTxLoading] = useState(false)
  const [txStatus, setTxStatus] = useState('')

  const isWalletRequired = ['created', 'approved'].includes(contract.status)

  const walletReady = isWalletRequired && isWalletReady

  console.log({
    isWalletRequired,
    isWalletInstalled,
    isWalletConnected,
    isCorrectNetwork,
    currentAccount,
    isWalletReady,
    walletReady,
  })

  const accept = async () => {
    if (!walletReady) {
      return
    }

    try {
      await acceptContract(token, contract.id, currentAccount)
      router.reload()
    } catch (err) {
      console.error({ err })
      setError(err)
    }
  }

  const send = async () => {
    try {
      await sendContract(token, contract.id)
      router.reload()
    } catch (err) {
      console.error({ err })
      setError(err)
    }
  }

  const requestMoney = async () => {
    if (!walletReady) {
      return
    }

    setTxLoading(true)
    setTxStatus('Requesting money from Smart Contract...')
    setError(null)

    const price = parseFloat(contract.price) * 10 ** tokenDecimals

    try {
      let transferFromTx = await tokenContract.transferFrom(
        contract.contract_address,
        currentAccount,
        price
      )

      await transferFromTx.wait()

      // TODO: Send request to backend to change contract status to 'ended'
      router.reload()
    } catch (err) {
      console.error({ err })
      setError(
        'Unable to request money: ' + (err.data?.message || err?.message || err)
      )
    } finally {
      setTxStatus('')
      setTxLoading(false)
    }
  }

  const statuses = {
    created: 1,
    accepted: 2,
    deployed: 3,
    sent: 4,
    approved: 5,
    ended: 6,
  }

  const currentStep = statuses[contract.status] + 1

  if (isWalletRequired) {
    if (!isWalletInstalled) {
      return <WalletIsNotInstalled />
    }

    if (!isCorrectNetwork) {
      return <WrongBlockchainNetwork router={router} />
    }
  }

  return (
    <>
      {isWalletRequired &&
        isWalletInstalled &&
        isCorrectNetwork &&
        currentAccount === '' && (
          <ConnectWallet connectWallet={connectWallet} />
        )}

      <Segment basic>
        <Step.Group ordered width={5} fluid>
          <Step completed>
            <Step.Content>
              <Step.Title>
                {currentStep > statuses['created'] ? 'Created' : 'Create'}
              </Step.Title>
              <Step.Description>Customer</Step.Description>
            </Step.Content>
          </Step>

          <Step
            active={contract.status === 'created'}
            completed={currentStep > statuses['accepted']}
            disabled={currentStep < statuses['accepted']}
          >
            <Step.Content>
              <Step.Title>
                {currentStep > statuses['accepted'] ? 'Accepted' : 'Accept'}
              </Step.Title>
              <Step.Description>Me</Step.Description>
            </Step.Content>
          </Step>

          <Step
            active={contract.status === 'accepted'}
            completed={currentStep > statuses['deployed']}
            disabled={currentStep < statuses['deployed']}
          >
            <Step.Content>
              <Step.Title>
                {currentStep > statuses['deployed'] ? 'Funded' : 'Fund'}
              </Step.Title>
              <Step.Description>Customer</Step.Description>
            </Step.Content>
          </Step>

          <Step
            active={contract.status === 'deployed'}
            completed={currentStep > statuses['sent']}
            disabled={currentStep < statuses['sent']}
          >
            <Step.Content>
              <Step.Title>
                {currentStep > statuses['sent']
                  ? 'Review Requested'
                  : 'In Progress'}
              </Step.Title>
              <Step.Description>Me</Step.Description>
            </Step.Content>
          </Step>

          <Step
            active={contract.status === 'sent'}
            completed={currentStep > statuses['approved']}
            disabled={currentStep < statuses['approved']}
          >
            <Step.Content>
              <Step.Title>
                {currentStep > statuses['approved'] ? 'Approved' : 'Review'}
              </Step.Title>
              <Step.Description>Customer</Step.Description>
            </Step.Content>
          </Step>
        </Step.Group>
      </Segment>

      <Grid container stackable verticalAlign="top">
        <Grid.Row>
          <Grid.Column>
            {error && (
              <ErrorWrapper header="Failed to perform action" error={error} />
            )}
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={10}>
            <TitleDescription job={contract} />
          </Grid.Column>

          <Grid.Column width={6}>
            {contract.status === 'created' && (
              <>
                {isLoadingWeb3 ? (
                  <JustOneSecondBlockchain />
                ) : (
                  <Container textAlign="right">
                    <Button
                      primary
                      content="Accept contract"
                      labelPosition="left"
                      icon="check"
                      disabled={!walletReady}
                      onClick={accept}
                    />
                  </Container>
                )}
              </>
            )}

            {contract.status === 'deployed' && (
              <Container textAlign="right">
                <a
                  href={`https://testnet.bscscan.com/address/${contract.contract_address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button>Open contract…</Button>
                </a>

                <Button
                  primary
                  content="Request Review"
                  labelPosition="left"
                  icon="ship"
                  onClick={send}
                />
              </Container>
            )}

            {contract.status === 'approved' && (
              <>
                {isLoadingWeb3 || txLoading ? (
                  <JustOneSecondBlockchain
                    message={txStatus !== '' && txStatus}
                  />
                ) : (
                  <Container textAlign="right">
                    <Button
                      primary
                      content="Request Money"
                      labelPosition="left"
                      icon="money"
                      disabled={!walletReady}
                      onClick={requestMoney}
                    />
                  </Container>
                )}
              </>
            )}

            <Sidebar contract={contract} tokenSymbol={tokenSymbol} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}
