import { PrismaClient } from '@prisma/client'
import express from 'express'
import cors from 'cors';


const prisma = new PrismaClient()
const app = express()

app.use(express.json())
app.use(cors())

app.get("/presentations", async (req, res) => {
  try {
    const presentations = await prisma.presentation.findMany({
      include: {
        speaker: true,
        attendees: true
      }
    })
    res.status(200).json(presentations)
  } catch (error) {
    res.status(501).json({ error: "No presentation was found in the database" })
  }
})

app.post("/presentation", async (req, res) => {
  const { details, room, speaker } = req.body

  try {
    const presentation = await prisma.presentation.create({
      data: {
        details,
        room: +room,
        speaker: {
          create: speaker
        },
      },
    })
    res.status(200).json(presentation)
  } catch (error) {
    res.status(501).json({ error: "Presentation cannot be created in the database" })
  }
})

app.post("/attendees", async (req, res) => {
  const { name, company, email } = req.body

  try {
    const attendee = await prisma.attendee.create({
      data: {
        name,
        company,
        email,
      },
    })
    res.status(200).json(attendee)
  } catch (error) {
    res.status(501).json({ error: "Attendee cannot be created in the database" })
  }
})

app.put("/presentations/:presentation_id/attendees/:attendee_email", async (req, res) => {
  const { presentation_id, attendee_email } = req.params

  try {
    const presentation = await prisma.presentation.update({
      where: { id: presentation_id },
      data: {
        attendees: {
          connect: { email: attendee_email },
        },
      },
    })

    res.status(200).json(presentation)
  } catch (error) {
    console.log(error, 'error')
    res.status(501).json({ error: `Attendee with email ${attendee_email} does not exist in the database` })
  }
})

export { app };