/**
 * Test suite for JSDoc Turtle RDF Plugin
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

describe('JSDoc Turtle RDF Plugin', () => {
    const outputDir = './test-docs';
    const turtleFile = path.join(outputDir, 'api-documentation.ttl');

    beforeAll(() => {
        // Clean up previous test outputs
        if (fs.existsSync(outputDir)) {
            fs.rmSync(outputDir, { recursive: true });
        }
    });

    afterAll(() => {
        // Clean up test outputs
        if (fs.existsSync(outputDir)) {
            fs.rmSync(outputDir, { recursive: true });
        }
    });

    it('should generate Turtle RDF file', () => {
        // Run JSDoc with plugin
        execSync(`jsdoc -c jsdoc.conf.json example.js -d ${outputDir}`, { stdio: 'pipe' });
        
        // Check if Turtle file was created
        expect(fs.existsSync(turtleFile)).to.be.true;
    });

    it('should contain RDF namespaces', () => {
        const content = fs.readFileSync(turtleFile, 'utf8');
        
        expect(content).to.include('@prefix foaf:');
        expect(content).to.include('@prefix dcterms:');
        expect(content).to.include('@prefix jsdoc:');
        expect(content).to.include('@prefix rdfs:');
    });

    it('should contain class information', () => {
        const content = fs.readFileSync(turtleFile, 'utf8');
        
        expect(content).to.include('UserManager');
        expect(content).to.include('jsdoc:kind');
        expect(content).to.include('"class"');
    });

    it('should contain function parameters', () => {
        const content = fs.readFileSync(turtleFile, 'utf8');
        
        expect(content).to.include('jsdoc:hasParameter');
        expect(content).to.include('jsdoc:parameterType');
    });

    it('should contain return information', () => {
        const content = fs.readFileSync(turtleFile, 'utf8');
        
        expect(content).to.include('jsdoc:returns');
        expect(content).to.include('jsdoc:returnType');
    });

    it('should contain examples', () => {
        const content = fs.readFileSync(turtleFile, 'utf8');
        
        expect(content).to.include('jsdoc:hasExample');
    });

    it('should contain author information', () => {
        const content = fs.readFileSync(turtleFile, 'utf8');
        
        expect(content).to.include('dcterms:creator');
        expect(content).to.include('John Developer');
    });
});