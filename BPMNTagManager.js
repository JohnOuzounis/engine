class BPMNTagManager {
    constructor() {
        this.actionTags = {};
        this.eventTags = {};
    }

    addAction(tag, functor) {
        this.actionTags[tag] = functor;
    }

    addEvent(tag, description) {
        this.eventTags[tag] = description;
    }

    invokeAction(tag, eventData, engine) {
        const functor = this.actionTags[tag];
        if (functor && typeof functor === 'function') {
            functor(eventData, engine);
        } else {
            console.error(`Action tag "${tag}" does not have a corresponding functor.`);
        }
    }

    postEvent(tag, eventData, engine) {
        const description = this.eventTags[tag];
        if (description) {
            if (!engine.environment.output['events'])
                engine.environment.output['events'] = [];
            engine.environment.output['events'].push({ id: eventData.id, tag: tag, description: description });
        }
    }
}

module.exports = BPMNTagManager;