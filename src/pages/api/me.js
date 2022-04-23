export default async function me(req, res) {
  try {
    res.status(200).json({ id: 'A2nMCgcDpSGzDhWRXWjb2T' })
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
}
