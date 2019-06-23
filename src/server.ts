import './config/env.config'
import app from './app'

app.listen({ port: 4000 }, () => {
    console.log('Server rocking on PORT', 4000)
})
