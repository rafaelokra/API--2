const express = require('express');

const app = express();

app.get("/message/:id/:user", (request, response) => {
    const {id,user} = request.params

    response.send(`
    Mensagem Id: ${id}.
    Para o usuario: ${user}.
 `);
});


const PORT = 4444;
app.listen(PORT, () => console.log(`server is running on Port ${PORT}`));