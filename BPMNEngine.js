const BPMN = require('bpmn-engine');
const Emitter = require('node:events');
const camunda = require('camunda-bpmn-moddle/resources/camunda.json');
const getAttributesById = require('./xml.js');
const TagManager = require('./BPMNTagManager.js');

const tagger = new TagManager();

function execute(name, source, variables, listener, onError, onSuccess) {
    const engine = new BPMN.Engine({
        name: name,
        source: source,
        moddleOptions: {
            camunda
        }
    });

    if (!listener)
        listener = new Emitter.EventEmitter();

    listener.on('activity.enter', (api, engineApi) => {
        const attr = getAttributesById(api.id, source);
        if (attr['tags:actionTag']) {
            tagger.invokeAction(attr['tags:actionTag'], api, engineApi);
        }
        if (attr['tags:eventTag']) {
            tagger.postEvent(attr['tags:eventTag'], api, engine);
        }
    });

    engine.execute({
        listener,
        variables,
        services: {
            isEqual: (input, value) => input === value,
            isNotEqual: (input, value) => input !== value,
            isGreater: (input, value) => input > value,
            isLess: (input, value) => input < value,
            isGreaterEqual: (input, value) => input >= value,
            isLessEqual: (input, value) => input <= value,
        }
    },
        (err, execution) => {
            if (err) {
                onError(err);
                return;
            }
            onSuccess(execution);
        });
}

module.exports = {
    execute: execute,
    tagger: tagger
}