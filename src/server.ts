import { app } from "./app";


app.listen({
  host: '0.0.0.0', // vai fazer com que a aplicação ficar acessível a outras aplicações frontEnd
  port: 3333
})
  .then(() => {
    console.log('🚀 HTTP Server running!')
  })