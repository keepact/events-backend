import { app } from './server'
import cors from 'cors';

const PORT = process.env.PORT || 3000

app.use(cors())
app.listen(PORT, () =>
  console.log(`🚀 Server ready at: http://localhost:${PORT}`),
)
