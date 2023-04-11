export const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
  return formattedDate
}
