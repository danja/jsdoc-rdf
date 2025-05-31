/**
 * Test suite for JSDoc Turtle RDF Plugin
 * @author Danny Ayers <danny.ayers@gmail.com>
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
        
        // Generate documentation first
        try {
            execSync(`jsdoc -c jsdoc.conf.json example.js -d ${outputDir}`, { 
                stdio: 'pipe',
                encoding: 'utf8'
            });
        } catch (error) {
            console.error('JSDoc execution failed:', error.message);
            throw error;
        }
    });

    afterAll(() => {
        // Clean up test outputs
        if (fs.existsSync(outputDir)) {
            fs.rmSync(outputDir, { recursive: true });
        }
    });

    it('should generate Turtle RDF file', () => {
        // Check if Turtle file was created
        expect(fs.existsSync(turtleFile)).toBe(true);
        
        // Verify file has content
        const stats = fs.statSync(turtleFile);
        expect(stats.size).toBeGreaterThan(0);
    });

    it('should contain RDF namespaces', () => {
        const content = fs.readFileSync(turtleFile, 'utf8');
        
        expect(content).toContain('@prefix foaf:');
        expect(content).toContain('@prefix dcterms:');
        expect(content).toContain('@prefix jsdoc:');
        expect(content).toContain('@prefix rdfs:');
        expect(content).toContain('@prefix doap:');
    });

    it('should contain class information', () => {
        const content = fs.readFileSync(turtleFile, 'utf8');
        
        expect(content).toContain('UserManager');
        expect(content).toContain('jsdoc:kind');
        expect(content).toContain('"class"');
    });

    it('should contain function parameters', () => {
        const content = fs.readFileSync(turtleFile, 'utf8');
        
        expect(content).toContain('jsdoc:hasParameter');
        expect(content).toContain('jsdoc:parameterType');
    });

    it('should contain return information', () => {
        const content = fs.readFileSync(turtleFile, 'utf8');
        
        expect(content).toContain('jsdoc:returns');
        expect(content).toContain('jsdoc:returnType');
    });

    it('should contain examples', () => {
        const content = fs.readFileSync(turtleFile, 'utf8');
        
        expect(content).toContain('jsdoc:hasExample');
    });

    it('should contain author information', () => {
        const content = fs.readFileSync(turtleFile, 'utf8');
        
        expect(content).toContain('dcterms:creator');
        expect(content).toContain('John Developer');
    });

    it('should contain DOAP project information', () => {
        const content = fs.readFileSync(turtleFile, 'utf8');
        
        expect(content).toContain('doap:Project');
        expect(content).toContain('doap:maintainer');
        expect(content).toContain('Danny Ayers');
        expect(content).toContain('danny.ayers@gmail.com');
    });

    it('should be valid Turtle syntax', () => {
        const content = fs.readFileSync(turtleFile, 'utf8');
        
        // Basic syntax checks
        expect(content).toContain('@prefix');
        expect(content).toMatch(/\s+\.\s*$/m); // Should end statements with dots
        expect(content).not.toContain('undefined');
        expect(content).not.toContain('null');
    });
});