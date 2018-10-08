const { parsed: env } = require('dotenv').load()
const Discord = require('discord.js')
const client = new Discord.Client()

let timer = null

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('presenceUpdate', (oldMember, newMember) => {
  if (oldMember.id !== env.BOT) return
  if (oldMember.presence.status === newMember.presence.status) return
  console.log(oldMember.presence.status, newMember.presence.status)
  if (newMember.presence.status === 'offline' && !timer) {
    timer = setTimeout(() => {
      client.channels.get(env.CHANNEL).send(env.MESSAGE)
    }, 3 * 60 * 1000)
  } else if (newMember.presence.status === 'online') {
    clearTimeout(timer)
    timer = null
  }
})

client.login(env.TOKEN)
