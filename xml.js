const { DOMParser } = require('xmldom');

const getAttributesById = (nodeId, source) => {
    const parser = new DOMParser();
    xml = parser.parseFromString(source, 'text/xml');
    const parseNode = (node) => {
        if (node.nodeType === node.ELEMENT_NODE) {
            const attributes = {};
            for (let i = 0; i < node.attributes.length; i++) {
                const attribute = node.attributes[i];
                attributes[attribute.nodeName] = attribute.nodeValue;
            }
            if (attributes['id'] === nodeId) {
                return attributes;
            }

            if (node.childNodes.length > 0) {
                for (let i = 0; i < node.childNodes.length; i++) {
                    const childNode = node.childNodes[i];
                    const attributes = parseNode(childNode);
                    if (attributes) return attributes;
                }
            }
        }
    };
    return parseNode(xml.documentElement);
};

module.exports = getAttributesById;