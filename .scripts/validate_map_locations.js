#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '../');

// Function to emit GitHub Actions annotations
function emitAnnotation(type, message, file, line = 1) {
    if (type === 'error')
        process.exitCode = 1;
    console.log(`::${type} file=${file},line=${line}::${message}`);
}

// Update the cache and getLineNumber function to use async versions of readFile
const fileContentCache = {};

async function getLineNumber(filePath, key) {
    if (!fileContentCache[filePath]) {
        fileContentCache[filePath] = await fs.promises.readFile(filePath, 'utf8');
    }
    const fileContent = fileContentCache[filePath];
    const lines = fileContent.split('\n');
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(`"${key}"`)) {
            return i + 1; // Line numbers are 1-based
        }
    }
    return 1; // Default to the first line if not found
}

// Function to validate mapLocations
async function validateMapLocations(folderPath) {
    const configPath = path.join(folderPath, 'config.json');
    if (!fs.existsSync(configPath)) {
        emitAnnotation('error', `config.json not found in ${folderPath}`, folderPath);
        return;
    }

    const configData = require(configPath).mapLocations;

    for (const file of fs.readdirSync(folderPath)) {
        if (file === 'config.json' || !file.endsWith('.json')) continue;

        const filePath = path.join(folderPath, file);
        const fileData = require(filePath);

        if (fileData.mapLocations) {
            for (const [key, value] of Object.entries(fileData.mapLocations)) {
                const lineNumber = await getLineNumber(filePath, key);
                if (Array.isArray(configData[key])) {
                    if (!Array.isArray(value)) {
                        emitAnnotation('error', `Expected an array for key ${key} in ${folderPath}/${file}, but found a non-array value`, filePath, lineNumber);
                        continue;
                    }

                    if (value.length !== configData[key].length) {
                        emitAnnotation('error', `Expected ${configData[key].length} elements for key ${key} in ${folderPath}/${file}, but found ${value.length}`, filePath, lineNumber);
                    }
                } else if (!configData[key]) {
                    emitAnnotation('warning', `Key ${key} does not, or no longer exists in ${folderPath}/config.json`, filePath, lineNumber);
                }
            }
        }
    }
}

// Iterate through each folder
for (const folder of fs.readdirSync(baseDir)) {
    if (folder.startsWith('.') || folder === 'node_modules') continue; // Skip hidden folders and node_modules
    const folderPath = path.join(baseDir, folder);
    if (fs.lstatSync(folderPath).isDirectory()) {
        validateMapLocations(folderPath);
    }
}