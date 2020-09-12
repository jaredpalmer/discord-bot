// Command purpose:
// provide information about the bot itself

const deployDate = new Date()
const rtf = new Intl.RelativeTimeFormat('en', {style: 'long', numeric: 'auto'})

const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24
const week = day * 7
const month = day * 30
const quarter = month * 3
const year = day * 365.25

function getAppropriateTimeframe(ms) {
  const fix = n => Number(n.toFixed(1))

  if (Math.abs(ms) > year) return rtf.format(fix(ms / year), 'year')
  if (Math.abs(ms) > quarter) return rtf.format(fix(ms / quarter), 'quarter')
  if (Math.abs(ms) > month) return rtf.format(fix(ms / month), 'month')
  if (Math.abs(ms) > week) return rtf.format(fix(ms / week), 'week')
  if (Math.abs(ms) > day) return rtf.format(fix(ms / day), 'day')
  if (Math.abs(ms) > hour) return rtf.format(fix(ms / hour), 'hour')
  if (Math.abs(ms) > minute) return rtf.format(fix(ms / minute), 'minute')

  return rtf.format(fix(ms / second), 'second')
}

async function info(message) {
  const relativeDeployTime = getAppropriateTimeframe(
    deployDate.getTime() - new Date(),
  )

  const result = await message.channel.send(
    `
Here's some info about the currently running bot:

  Deployed at: ${deployDate.toUTCString()} (${relativeDeployTime})
  `.trim(),
  )
  return result
}
info.description = 'Gives information about the bot (deploy date etc.)'

module.exports = info