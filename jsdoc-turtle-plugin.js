/**
 * JSDoc Turtle RDF Plugin
 * Converts JSDoc comments to Turtle RDF format
 */

import factory from 'rdf-ext';
import fs from 'fs';
import path from 'path';

// RDF namespaces
const namespaces = {
    foaf: factory.namedNode('http://xmlns.com/foaf/0.1/'),
    dcterms: factory.namedNode('http://purl.org/dc/terms/'),
    rdfs: factory.namedNode('http://www.w3.org/2000/01/rdf-schema#'),
    jsdoc: factory.namedNode('http://example.org/jsdoc#'),
    xsd: factory.namedNode('http://www.w3.org/2001/XMLSchema#')
};

class TurtleRDFPlugin {
    constructor() {
        this.dataset = factory.dataset();
        this.baseUri = 'http://example.org/api/';
    }

    /**
     * Create RDF triple
     */
    addTriple(subject, predicate, object) {
        const triple = factory.quad(subject, predicate, object);
        this.dataset.add(triple);
    }

    /**
     * Process JSDoc doclet to RDF
     */
    processDoclet(doclet) {
        if (!doclet.longname || doclet.undocumented) return;

        const subject = factory.namedNode(this.baseUri + doclet.longname);

        // Basic metadata
        this.addTriple(subject, namespaces.rdfs + 'label', factory.literal(doclet.name));
        this.addTriple(subject, namespaces.dcterms + 'description', factory.literal(doclet.description || ''));

        // Kind (function, class, etc.)
        this.addTriple(subject, namespaces.jsdoc + 'kind', factory.literal(doclet.kind));

        // Parameters
        if (doclet.params) {
            doclet.params.forEach((param, index) => {
                const paramNode = factory.namedNode(this.baseUri + doclet.longname + '/param/' + index);
                this.addTriple(subject, namespaces.jsdoc + 'hasParameter', paramNode);
                this.addTriple(paramNode, namespaces.rdfs + 'label', factory.literal(param.name));
                this.addTriple(paramNode, namespaces.dcterms + 'description', factory.literal(param.description || ''));
                if (param.type) {
                    this.addTriple(paramNode, namespaces.jsdoc + 'parameterType', factory.literal(param.type.names.join('|')));
                }
            });
        }

        // Returns
        if (doclet.returns) {
            doclet.returns.forEach((ret, index) => {
                const returnNode = factory.namedNode(this.baseUri + doclet.longname + '/return/' + index);
                this.addTriple(subject, namespaces.jsdoc + 'returns', returnNode);
                this.addTriple(returnNode, namespaces.dcterms + 'description', factory.literal(ret.description || ''));
                if (ret.type) {
                    this.addTriple(returnNode, namespaces.jsdoc + 'returnType', factory.literal(ret.type.names.join('|')));
                }
            });
        }

        // Examples
        if (doclet.examples) {
            doclet.examples.forEach((example, index) => {
                const exampleNode = factory.namedNode(this.baseUri + doclet.longname + '/example/' + index);
                this.addTriple(subject, namespaces.jsdoc + 'hasExample', exampleNode);
                this.addTriple(exampleNode, namespaces.rdfs + 'label', factory.literal(example));
            });
        }

        // Author
        if (doclet.author) {
            doclet.author.forEach(author => {
                this.addTriple(subject, namespaces.dcterms + 'creator', factory.literal(author));
            });
        }

        // Version
        if (doclet.version) {
            this.addTriple(subject, namespaces.dcterms + 'hasVersion', factory.literal(doclet.version));
        }

        // Since
        if (doclet.since) {
            this.addTriple(subject, namespaces.dcterms + 'created', factory.literal(doclet.since));
        }
    }

    /**
     * Write RDF dataset to Turtle file
     */
    async writeTurtle(outputPath) {
        const writer = factory.formats.writers.get('text/turtle');
        const output = writer.import(this.dataset.toStream());

        const chunks = [];
        output.on('data', chunk => chunks.push(chunk));

        return new Promise((resolve, reject) => {
            output.on('end', () => {
                const turtle = Buffer.concat(chunks).toString();
                const prefixes = `@prefix foaf: <${namespaces.foaf.value}> .
@prefix dcterms: <${namespaces.dcterms.value}> .
@prefix rdfs: <${namespaces.rdfs.value}> .
@prefix jsdoc: <${namespaces.jsdoc.value}> .
@prefix xsd: <${namespaces.xsd.value}> .

`;
                fs.writeFileSync(outputPath, prefixes + turtle);
                resolve();
            });
            output.on('error', reject);
        });
    }
}

// Plugin instance
let plugin;

/**
 * JSDoc plugin exports
 */
export const handlers = {
    /**
     * Initialize plugin
     */
    beforeParse: function (e) {
        plugin = new TurtleRDFPlugin();
    },

    /**
     * Process each doclet
     */
    newDoclet: function (e) {
        plugin.processDoclet(e.doclet);
    },

    /**
     * Write RDF output after processing
     */
    processingComplete: function (e) {
        const outputDir = e.destination || './out';
        const turtleFile = path.join(outputDir, 'api-documentation.ttl');

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        plugin.writeTurtle(turtleFile).then(() => {
            console.log(`Turtle RDF documentation written to: ${turtleFile}`);
        }).catch(err => {
            console.error('Error writing Turtle file:', err);
        });
    }
};

export function definePlugin(dictionary) {
    dictionary.turtleRdf = {
        mustHaveValue: false
    };
}