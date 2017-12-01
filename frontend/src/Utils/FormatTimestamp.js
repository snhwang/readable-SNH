import {format} from 'date-fns'

const FormatTimestamp = (timestamp) => (
  format(new Date(timestamp), 'MMM D, YYYY, h:mma')
)

export default FormatTimestamp