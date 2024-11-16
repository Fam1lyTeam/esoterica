import { config } from './config'
import app from './app'

const start = async () => {
  app.listen(config.port, () => {
    console.log('Server listen at ' + config.port)
  })
}

start()