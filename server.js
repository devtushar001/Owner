import express from 'express';

const app = express();
const PORT = 10011

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: `Server running on port 10011`
    })
})

app.listen(PORT, () => {
    console.log(`Server up on ${PORT}`)
})