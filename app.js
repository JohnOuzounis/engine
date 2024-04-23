const engine = require('./BPMNEngine');
const server = require('./server');

engine.tagger.addAction('decision', (api, engine) => {
    engine.definitions['0'].environment.variables["approval"] = "boba";
});

engine.tagger.addAction('end1', (api, engine) => {
    console.log('reached end1');
});

engine.tagger.addAction('end2', (api, engine) => {
    console.log('reached end2');
});

engine.tagger.addEvent('start', 'Diagram has started!');
engine.tagger.addEvent('finish', 'Diagram has finished!');

server.start();