import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.get(`/presentations`, async (req, res) => {
  try {
    const result = await prisma.attendee.findMany()
    res.json(result)
  } catch (error) {
    res.json({ error: "No presentation was found in the database" })
  }
})

app.post(`/presentation`, async (req, res) => {
  const { details, room, speaker } = req.body

  try {
    const result = await prisma.presentation.create({
      data: {
        details,
        room,
        speaker: {
          create: speaker
        },
      },
    })
    res.json(result)
  } catch (error) {
    res.json({ error: "Presentation cannot be created in the database" })
  }
})

app.post(`/attendees`, async (req, res) => {
  const { name, company, email } = req.body

  try {
    const result = await prisma.attendee.create({
      data: {
        name,
        company,
        email,
      },
    })
    res.json(result)
  } catch (error) {
    res.json({ error: "Attendee cannot be created in the database" })
  }
})

app.put('/presentation/:presentation_id/:attendee_id', async (req, res) => {
  const { presentation_id, attendee_id } = req.params

  const attendee = await prisma.attendee.findUnique({
    where: { id: attendee_id }
  })

  if (!attendee) {
    return res.json({ error: `Attendee with ID ${attendee_id} does not exist in the database` })
  }

  try {
    const post = await prisma.presentation.update({
      where: { id: presentation_id },
      data: {
        attendee: {
          create: {
            ...attendee
          }
        },
      },
    })

    res.json(post)
  } catch (error) {
    res.json({ error: `Presentation with ID ${presentation_id} does not exist in the database` })
  }
})

export { app };