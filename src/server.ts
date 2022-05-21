import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

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

app.put('/presentation/:presentation_id/attendees', async (req, res) => {
  const { presentation_id } = req.params
  const { name, company, email } = req.body
  try {
    const post = await prisma.presentation.update({
      where: { id: presentation_id },
      data: {
        attendee: {
          create: {
            name,
            company,
            email
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