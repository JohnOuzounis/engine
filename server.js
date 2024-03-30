const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;
const BPMN = require('bpmn-engine');

app.use(express.json());
app.use(cors());

app.post('/api/execute', async (req, res) => {
    try {
        const { name, source, variables } = req.body;
        const engine = new BPMN.Engine({
            name: name,
            source: source,
            variables: variables,
        });
        engine.execute((err, execution) => {
            if (err) {
                res.status(422).json({ message: `${err.message}` });
                return;
            }
            res.json({ message: `Execution completed with id ${execution.environment.variables.id}` });
        });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
});

app.listen(port, () => { console.log(`Server started on port ${port}`); });