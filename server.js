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

        engine.tagger.addAction('hello', (api) => { console.log('hellooo') });
        engine.tagger.addAction('decision', (api, engine) => {
            engine.definitions['0'].environment.variables["approval"] = "boba";
        });
        engine.tagger.addAction('end1', (api, engine) => {
            console.log('reached end1');
        });
        engine.tagger.addAction('end2', (api, engine) => {
            console.log('reached end2');
        });

        engine.execute(name, source, variables, null,
            (err) => {
                res.status(422).json({ message: `${err.message}` });
            },
            (execution) => {
                res.json({ message: `Execution completed with id ${execution.environment.variables.id}` });
            });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
});

app.listen(port, () => { console.log(`Server started on port ${port}`); });