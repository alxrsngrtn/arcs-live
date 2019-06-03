/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { DiagnosticSeverity, TextDocumentSyncKind } from 'vscode-languageserver';
import { Manifest } from '../../runtime/manifest.js';
import { LspLoader } from './lspLoader.js';
import { jsonrpc, normalizeUri, uri2path } from './util.js';
export const handlers = {
    // tslint:disable-next-line: no-any
    initialize: (params, context) => {
        context.rootPath =
            params.rootPath || uri2path(params.rootUri);
        const result = {
            capabilities: {
                // Tell the client that the server works in FULL text document sync mode
                textDocumentSync: TextDocumentSyncKind.Full,
                hoverProvider: false,
                signatureHelpProvider: {
                    triggerCharacters: ['(', ','],
                },
                definitionProvider: false,
                typeDefinitionProvider: false,
                referencesProvider: false,
                documentSymbolProvider: false,
                workspaceSymbolProvider: false,
                xworkspaceReferencesProvider: false,
                xdefinitionProvider: false,
                xdependenciesProvider: false,
                completionProvider: {
                    resolveProvider: false,
                    triggerCharacters: ['.'],
                },
                codeActionProvider: false,
                renameProvider: false,
                executeCommandProvider: {
                    commands: [],
                },
                xpackagesProvider: false,
            }
        };
        return result;
    },
    textDocumentCompletion: async (params, context) => {
        const uri = params.textDocument.uri;
        context.logger.info(`Completing for : ${uri}...`);
        return undefined;
    },
    textDocumentDidSave: async (params, context) => {
        params = params;
        const uri = params.textDocument.uri;
        context.logger.info(`Handling save for: ${uri}...`);
        return publishDiagnostics(uri, context);
    },
    textDocumentDidChange: async (params, context) => {
        params = params;
        const uri = params.textDocument.uri;
        context.logger.info(`Handling changes for: ${uri}...`);
        return publishDiagnostics(uri, context);
    },
    textDocumentDidOpen: async (params, context) => {
        params = params;
        const uri = params.textDocument.uri;
        context.logger.info(`Opened: ${uri}...`);
        return publishDiagnostics(uri, context);
    }
};
async function publishDiagnostics(uri, context) {
    const diagnosticParams = await gatherDiagnostics(uri, context);
    return {
        jsonrpc,
        method: 'textDocument/publishDiagnostics',
        params: diagnosticParams
    };
}
async function gatherDiagnostics(uri, context) {
    const path = uri2path(normalizeUri(uri));
    // TODO(cypher1): Catch exception and list them for later.
    const errors = [];
    try {
        const manifest = await Manifest.load(path, new LspLoader(context));
        errors.push(...Manifest.getErrors(manifest));
    }
    catch (e) {
        errors.push(e);
    }
    const diagnostics = errors.map(convertToDiagnostic);
    return { uri, diagnostics };
}
function convertToDiagnostic(error) {
    const convertLocation = (loc) => ({
        character: loc.column,
        line: loc.line - 1,
    });
    const stripPreamble = (msg) => {
        // Remove preamble.
        msg = msg.replace(/^(Parse|Post-parse) [^\n]*line [0-9]*.\n/g, '');
        // Remove preview of code.
        msg = msg.replace(/\n.*/g, '');
        return msg;
    };
    const range = {
        start: convertLocation(error.location.start),
        end: convertLocation(error.location.end)
    };
    return {
        range,
        message: stripPreamble(error.message),
        code: error.key,
        severity: DiagnosticSeverity.Error,
        source: error.location.filename || 'aml'
    };
}
//# sourceMappingURL=handlers.js.map