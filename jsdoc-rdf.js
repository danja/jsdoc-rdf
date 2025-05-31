import factory from 'rdf-ext';
import fs from 'fs';
import path from 'path';

const namespaces = {
    rdf: factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#'),
    foaf: factory.namedNode('http://xmlns.com/foaf/0.1/'),
    dcterms: factory.namedNode('http://purl.org/dc/terms/'),
    rdfs: factory.namedNode('http://www.w3.org/2000/01/rdf-schema#'),
    jsdoc: factory.namedNode('http://example.org/jsdoc#'),
    xsd: factory.namedNode('http://www.w3.org/2001/XMLSchema#'),
    doap: factory.namedNode('http://usefulinc.com/ns/doap#')
};

class TurtleRDFPlugin {
    constructor(config = {}) {
        this.dataset = factory.dataset();
        this.baseUri = config.baseUri || 'http://example.org/api/';
        this.config = config;
        this.addStaticTriples();
    }

    /**
     * Add static DOAP project information
     */
    addStaticTriples() {
        const project = factory.namedNode('https://github.com/danny-ayers/jsdoc-turtle-rdf-plugin');
        const author = factory.namedNode('https://danny.ayers.name#me');

        // Project triples - using rdf:type properly
        this.addTriple(project, factory.namedNode(namespaces.rdf.value + 'type'), factory.namedNode(namespaces.doap.value + 'Project'));
        this.addTriple(project, factory.namedNode(namespaces.doap.value + 'name'), factory.literal('JSDoc Turtle RDF Plugin'));
        this.addTriple(project, factory.namedNode(namespaces.doap.value + 'maintainer'), author);
        
        // Author triples - using rdf:type properly  
        this.addTriple(author, factory.namedNode(namespaces.rdf.value + 'type'), factory.namedNode(namespaces.foaf.value + 'Person'));
        this.addTriple(author, factory.namedNode(namespaces.foaf.value + 'name'), factory.literal('Danny Ayers'));
        this.addTriple(author, factory.namedNode(namespaces.foaf.value + 'mbox'), factory.namedNode('mailto:danny.ayers@gmail.com'));
    }

    /**
     * Add RDF triple to dataset
     */
    addTriple(subject, predicate, object) {
        const triple = factory.quad(subject, predicate, object);
        this.dataset.add(triple);
    }

    /**
     * Process JSDoc doclet into RDF triples
     */
    processDoclet(doclet) {
        console.log('Processing doclet:', doclet.longname, doclet.kind, doclet.undocumented);
        
        // Skip if no longname or if it's a system doclet
        if (!doclet.longname || doclet.kind === 'package' || doclet.undocumented) {
            console.log('Skipping doclet:', doclet.longname || 'unnamed');
            return;
        }
        
        // Skip anonymous functions and internal members
        if (doclet.longname.startsWith('(') || doclet.longname.includes('.')) {
            return;
        }

        // Create a safe URI for the subject
        const safeLongname = doclet.longname.replace(/#/g, '/').replace(/\./g, '/');
        const subject = factory.namedNode(this.baseUri + safeLongname);
        
        console.log('Adding doclet to RDF:', doclet.longname, 'as', subject.value);

        this.addTriple(subject, factory.namedNode(namespaces.rdfs.value + 'label'), factory.literal(doclet.name));
        this.addTriple(subject, factory.namedNode(namespaces.dcterms.value + 'description'), factory.literal(doclet.description || ''));

        // Kind (function, class, etc.)
        this.addTriple(subject, factory.namedNode(namespaces.jsdoc.value + 'kind'), factory.literal(doclet.kind));

        // Namespace
        if (doclet.memberof) {
            const memberOf = factory.namedNode(this.baseUri + doclet.memberof);
            this.addTriple(subject, factory.namedNode(namespaces.jsdoc.value + 'memberOf'), memberOf);
        }

        // Access level
        if (doclet.access) {
            this.addTriple(subject, factory.namedNode(namespaces.jsdoc.value + 'access'), factory.literal(doclet.access));
        }

        // Modifiers
        if (doclet.scope) {
            this.addTriple(subject, factory.namedNode(namespaces.jsdoc.value + 'scope'), factory.literal(doclet.scope));
        }
        if (doclet.readonly) {
            this.addTriple(subject, factory.namedNode(namespaces.jsdoc.value + 'readonly'), factory.literal('true', factory.namedNode(namespaces.xsd.value + 'boolean')));
        }
        if (doclet.deprecated) {
            this.addTriple(subject, factory.namedNode(namespaces.jsdoc.value + 'deprecated'), factory.literal('true', factory.namedNode(namespaces.xsd.value + 'boolean')));
        }
        if (doclet.abstract) {
            this.addTriple(subject, factory.namedNode(namespaces.jsdoc.value + 'abstract'), factory.literal('true', factory.namedNode(namespaces.xsd.value + 'boolean')));
        }
        if (doclet.override) {
            this.addTriple(subject, factory.namedNode(namespaces.jsdoc.value + 'override'), factory.literal('true', factory.namedNode(namespaces.xsd.value + 'boolean')));
        }

        // Inheritance
        if (doclet.augments) {
            doclet.augments.forEach(parent => {
                const parentNode = factory.namedNode(this.baseUri + parent);
                this.addTriple(subject, factory.namedNode(namespaces.jsdoc.value + 'extends'), parentNode);
            });
        }
        if (doclet.implements) {
            doclet.implements.forEach(impl => {
                const implNode = factory.namedNode(this.baseUri + impl);
                this.addTriple(subject, factory.namedNode(namespaces.jsdoc.value + 'implements'), implNode);
            });
        }

        if (doclet.params) {
            doclet.params.forEach((param, index) => {
                const paramNode = factory.namedNode(this.baseUri + doclet.longname + '/param/' + index);
                this.addTriple(subject, factory.namedNode(namespaces.jsdoc.value + 'hasParameter'), paramNode);
                this.addTriple(paramNode, factory.namedNode(namespaces.rdfs.value + 'label'), factory.literal(param.name));
                this.addTriple(paramNode, factory.namedNode(namespaces.dcterms.value + 'description'), factory.literal(param.description || ''));
                if (param.type) {
                    this.addTriple(paramNode, factory.namedNode(namespaces.jsdoc.value + 'parameterType'), factory.literal(param.type.names.join('|')));
                }
                if (param.optional) {
                    this.addTriple(paramNode, factory.namedNode(namespaces.jsdoc.value + 'optional'), factory.literal('true', factory.namedNode(namespaces.xsd.value + 'boolean')));
                }
                if (param.defaultvalue !== undefined) {
                    this.addTriple(paramNode, factory.namedNode(namespaces.jsdoc.value + 'defaultValue'), factory.literal(String(param.defaultvalue)));
                }
            });
        }

        if (doclet.returns) {
            doclet.returns.forEach((ret, index) => {
                const returnNode = factory.namedNode(this.baseUri + doclet.longname + '/return/' + index);
                this.addTriple(subject, factory.namedNode(namespaces.jsdoc.value + 'returns'), returnNode);
                this.addTriple(returnNode, factory.namedNode(namespaces.dcterms.value + 'description'), factory.literal(ret.description || ''));
                if (ret.type) {
                    this.addTriple(returnNode, factory.namedNode(namespaces.jsdoc.value + 'returnType'), factory.literal(ret.type.names.join('|')));
                }
            });
        }

        if (doclet.exceptions) {
            doclet.exceptions.forEach((exc, index) => {
                const excNode = factory.namedNode(this.baseUri + doclet.longname + '/throws/' + index);
                this.addTriple(subject, factory.namedNode(namespaces.jsdoc.value + 'throws'), excNode);
                this.addTriple(excNode, factory.namedNode(namespaces.dcterms.value + 'description'), factory.literal(exc.description || ''));
                if (exc.type) {
                    this.addTriple(excNode, factory.namedNode(namespaces.jsdoc.value + 'exceptionType'), factory.literal(exc.type.names.join('|')));
                }
            });
        }

        if (doclet.examples) {
            doclet.examples.forEach((example, index) => {
                const exampleNode = factory.namedNode(this.baseUri + doclet.longname + '/example/' + index);
                this.addTriple(subject, factory.namedNode(namespaces.jsdoc.value + 'hasExample'), exampleNode);
                this.addTriple(exampleNode, factory.namedNode(namespaces.rdfs.value + 'label'), factory.literal(example));
            });
        }

        if (doclet.see) {
            doclet.see.forEach(ref => {
                this.addTriple(subject, factory.namedNode(namespaces.rdfs.value + 'seeAlso'), factory.literal(ref));
            });
        }

        if (doclet.todo) {
            doclet.todo.forEach(todo => {
                this.addTriple(subject, factory.namedNode(namespaces.jsdoc.value + 'todo'), factory.literal(todo));
            });
        }

        if (doclet.author) {
            doclet.author.forEach(author => {
                this.addTriple(subject, factory.namedNode(namespaces.dcterms.value + 'creator'), factory.literal(author));
            });
        }

        if (doclet.version) {
            this.addTriple(subject, factory.namedNode(namespaces.dcterms.value + 'hasVersion'), factory.literal(doclet.version));
        }

        if (doclet.since) {
            this.addTriple(subject, factory.namedNode(namespaces.dcterms.value + 'created'), factory.literal(doclet.since));
        }
    }

    /**
     * Convert dataset to Turtle string
     */
    toTurtle() {
        const prefixes = `@prefix rdf: <${namespaces.rdf.value}> .
@prefix foaf: <${namespaces.foaf.value}> .
@prefix dcterms: <${namespaces.dcterms.value}> .
@prefix rdfs: <${namespaces.rdfs.value}> .
@prefix jsdoc: <${namespaces.jsdoc.value}> .
@prefix xsd: <${namespaces.xsd.value}> .
@prefix doap: <${namespaces.doap.value}> .

`;

        let turtle = '';
        const subjects = new Set();
        
        // Collect all subjects
        for (const quad of this.dataset) {
            subjects.add(quad.subject.value);
        }

        console.log('Found subjects:', subjects.size);

        // Generate Turtle for each subject
        for (const subjectValue of subjects) {
            const subject = factory.namedNode(subjectValue);
            const quads = [...this.dataset.match(subject)];
            
            if (quads.length > 0) {
                turtle += `<${subjectValue}>\n`;
                
                quads.forEach((quad, index) => {
                    const predicate = this.abbreviateUri(quad.predicate.value);
                    const object = this.formatObject(quad.object);
                    const separator = index === quads.length - 1 ? ' .' : ' ;';
                    turtle += `    ${predicate} ${object}${separator}\n`;
                });
                turtle += '\n';
            }
        }

        return prefixes + turtle;
    }

    /**
     * Abbreviate URI using known prefixes
     */
    abbreviateUri(uri) {
        // Special case for rdf:type
        if (uri === namespaces.rdf.value + 'type') {
            return 'a';
        }
        
        for (const [prefix, ns] of Object.entries(namespaces)) {
            if (uri.startsWith(ns.value)) {
                return `${prefix}:${uri.substring(ns.value.length)}`;
            }
        }
        return `<${uri}>`;
    }

    /**
     * Format RDF object for Turtle output
     */
    formatObject(object) {
        if (object.termType === 'NamedNode') {
            return this.abbreviateUri(object.value);
        } else if (object.termType === 'Literal') {
            if (object.datatype && object.datatype.value !== 'http://www.w3.org/2001/XMLSchema#string') {
                return `"${object.value}"^^${this.abbreviateUri(object.datatype.value)}`;
            }
            return `"${object.value.replace(/"/g, '\\"')}"`;
        }
        return object.value;
    }
}

let plugin;

/**
 * JSDoc plugin handlers
 */
export const handlers = {
    /**
     * Initialize plugin before parsing
     */
    beforeParse: function (e) {
        const config = e.env?.conf?.rdfConfig || {};
        plugin = new TurtleRDFPlugin(config);
    },

    /**
     * Process each doclet
     */
    newDoclet: function (e) {
        if (plugin) {
            plugin.processDoclet(e.doclet);
        }
    },

    /**
     * Write RDF output after processing completion
     */
    processingComplete: function (e) {
        if (!plugin) return;
        
        const outputDir = e.destination || './docs';
        const turtleFile = path.join(outputDir, 'api-documentation.ttl');

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        try {
            const turtle = plugin.toTurtle();
            fs.writeFileSync(turtleFile, turtle);
            console.log(`Turtle RDF documentation written to: ${turtleFile}`);
        } catch (err) {
            console.error('Error writing Turtle file:', err);
        }
    }
};

export function definePlugin(dictionary) {
    dictionary.turtleRdf = {
        mustHaveValue: false
    };
}