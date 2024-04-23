const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;
const engine = require('./BPMNEngine');

app.use(express.json());
app.use(cors());

app.post('/api/execute', async (req, res) => {
    try {
        const { name, source, variables } = req.body;

        engine.execute(name, source, variables, null,
            (err) => {
                res.status(422).json({ message: `${err.message}` });
            },
            (execution) => {
                res.json({ message: execution.environment.output });
            });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
});

function start() {
    app.listen(port, () => { console.log(`Server started on port ${port}`); });
}

module.exports = {
    start: start
}