import express from 'express';
import env from 'dotenv';

env.config();

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: `Server running on port ${port}`
    });
});

app.listen(port, () => {
    console.log(`Server up on ${port}`);
});
