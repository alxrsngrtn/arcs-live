"use strict";
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt
const fs = require('fs');
const os = require('os');
const path = require('path');
// Use saneSpawn or saneSpawnWithOutput instead, this is not cross-platform.
// tslint:disable-next-line: variable-name
const _DO_NOT_USE_spawn = require('child_process').spawnSync;
const minimist = require('minimist');
const chokidar = try_require('chokidar');
const semver = require('semver');
function try_require(dep) {
    try {
        return require(dep);
    }
    catch (e) {
        return null;
    }
}
const projectRoot = path.resolve(__dirname, '..');
process.chdir(projectRoot);
let keepProcessAlive = false;
const sources = {
    peg: [{
            grammar: 'src/runtime/manifest-parser.peg',
            astNodes: 'src/runtime/manifest-ast-nodes.ts',
            output: 'src/gen/runtime/manifest-parser.ts',
            railroad: 'manifest-railroad.html',
            tspegjs: {
                noTsLint: false,
                tslintIgnores: 'no-any, only-arrow-functions, max-line-length, trailing-comma, interface-name, switch-default, object-literal-shorthand',
                customHeader: `
// DO NOT EDIT, AUTOGENERATED from src/runtime/manifest-parser.peg
import * as AstNode from '../../runtime/manifest-ast-nodes.js';
`
            }
        }, {
            grammar: 'src/dataflow/analysis/assertion-parser.peg',
            output: 'src/gen/dataflow/analysis/assertion-parser.ts',
            railroad: 'flow-assertion-railroad.html',
            tspegjs: {
                noTsLint: false,
                tslintIgnores: 'no-any, only-arrow-functions, max-line-length, trailing-comma, interface-name, switch-default, object-literal-shorthand, prefer-const',
                customHeader: `
// DO NOT EDIT, AUTOGENERATED from src/dataflow/analysis/assertion-parser.peg
`
            },
        }]
};
const steps = {
    peg: [peg, railroad],
    railroad: [railroad],
    test: [peg, railroad, build, runTests],
    webpack: [peg, railroad, build, webpack],
    build: [peg, build],
    watch: [watch],
    lint: [peg, build, lint, tslint],
    tslint: [peg, build, tslint],
    check: [check],
    clean: [clean],
    unit: [unit],
    health: [health],
    bundle: [build, bundle],
    schema2proto: [build, schema2proto],
    default: [check, peg, railroad, build, runTests, webpack, lint, tslint],
};
const eslintCache = '.eslint_sigh_cache';
const coverageDir = 'coverage';
// Files to be deleted by clean, if they aren't in one of the cleanDirs.
const cleanFiles = ['manifest-railroad.html', 'flow-assertion-railroad.html', eslintCache];
const cleanDirs = ['shell/build', 'shells/lib/build', 'build', 'dist', 'src/gen', 'test-output', coverageDir];
// RE pattern to exclude when finding within project source files.
const srcExclude = /\b(node_modules|deps|build|third_party)\b/;
// RE pattern to exclude when finding within project built files.
const buildExclude = /\b(node_modules|deps|src|third_party)\b/;
function* findProjectFiles(dir, exclude, predicate) {
    const tests = [];
    for (const entry of fs.readdirSync(dir)) {
        if (entry.startsWith('.') || (exclude && exclude.test(entry))) {
            continue;
        }
        const fullPath = path.join(dir, entry);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            yield* findProjectFiles(fullPath, exclude, predicate);
        }
        else if (predicate(fullPath)) {
            yield fullPath;
        }
    }
}
function readProjectFile(relativePath) {
    return fs.readFileSync(path.resolve(projectRoot, relativePath), 'utf-8');
}
function fixPathForWindows(path) {
    if (path[0] === '/') {
        return path;
    }
    return '/' + path.replace(new RegExp(String.fromCharCode(92, 92), 'g'), '/');
}
function targetIsUpToDate(relativeTarget, relativeDeps) {
    const target = path.resolve(projectRoot, relativeTarget);
    if (!fs.existsSync(target)) {
        return false;
    }
    const targetTime = fs.statSync(target).mtimeMs;
    for (const relativePath of relativeDeps) {
        if (fs.statSync(path.resolve(projectRoot, relativePath)).mtimeMs > targetTime) {
            return false;
        }
    }
    console.log(`Skipping step; '${relativeTarget}' is up-to-date`);
    return true;
}
function check() {
    const nodeRequiredVersion = require('../package.json').engines.node;
    const npmRequiredVersion = require('../package.json').engines.npm;
    if (!semver.satisfies(process.version, nodeRequiredVersion)) {
        throw new Error(`at least node ${nodeRequiredVersion} is required, you have ${process.version}`);
    }
    const npmCmd = saneSpawnWithOutput('npm', ['-v']);
    const npmVersion = String(npmCmd.stdout);
    if (!semver.satisfies(npmVersion, npmRequiredVersion)) {
        throw new Error(`at least npm ${npmRequiredVersion} is required, you have ${npmVersion}`);
    }
    return true;
}
function clean() {
    for (const file of cleanFiles) {
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
            console.log('Removed', file);
        }
    }
    const recursiveDelete = (dir) => {
        for (let entry of fs.readdirSync(dir)) {
            entry = path.join(dir, entry);
            if (fs.statSync(entry).isDirectory()) {
                recursiveDelete(entry);
            }
            else {
                fs.unlinkSync(entry);
            }
        }
        fs.rmdirSync(dir);
    };
    for (const buildDir of cleanDirs) {
        if (fs.existsSync(buildDir)) {
            recursiveDelete(buildDir);
            console.log('Removed', buildDir);
        }
    }
    return true;
}
// Run unit tests on the parts of this tool itself.
function unit() {
    const dummySrc = 'src/foo.js';
    const dummyDest = 'build/foo.js';
    const success = linkUnit(dummySrc, dummyDest);
    if (fs.existsSync(dummySrc)) {
        fs.unlinkSync(dummySrc);
    }
    if (fs.existsSync(dummyDest)) {
        fs.unlinkSync(dummyDest);
    }
    return success;
}
function linkUnit(dummySrc, dummyDest) {
    fs.writeFileSync(dummySrc, 'Just some nonsense');
    if (!link([dummySrc])) {
        console.error('Dummy link failed when it should have succeeded.');
        return false;
    }
    if (!fs.existsSync(dummyDest)) {
        console.error('Dummy link succeeded, but new hard link does not exist.');
        return false;
    }
    if (!link([dummySrc])) {
        console.error('Attempted idempotent link failed when it should have succeeded.');
        return false;
    }
    fs.unlinkSync(dummyDest);
    fs.writeFileSync(dummyDest, 'Some different nonsense, a bit longer this time');
    if (!link([dummySrc])) {
        console.error('Differing destination exists, but link failed');
        return false;
    }
    return true;
}
function peg() {
    const peg = require('pegjs');
    const tsPegjsPlugin = require('ts-pegjs');
    const ts = require('typescript');
    for (const pegsrc of sources.peg) {
        if (targetIsUpToDate(pegsrc.output, [pegsrc.grammar])) {
            continue;
        }
        const options = {
            format: 'bare',
            output: 'source',
            trace: false,
            plugins: [tsPegjsPlugin],
            tspegjs: pegsrc.tspegjs,
            returnTypes: {}
        };
        // If an ast-nodes file has been specified, use the TypeScript compiler to build an AST tree 
        // of that file and extract the list of exported interfaces and types. The ts-pegjs plugin
        // uses these to correctly type the node objects generated by the pegjs parser.
        if (pegsrc.astNodes) {
            const program = ts.createProgram([pegsrc.astNodes], {});
            program.getTypeChecker(); // Required, not sure why
            program.getSourceFiles().filter(f => f.fileName === pegsrc.astNodes).forEach(f => {
                ts.forEachChild(f, node => {
                    if ([ts.SyntaxKind.InterfaceDeclaration, ts.SyntaxKind.TypeAliasDeclaration].includes(node.kind) &&
                        (ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Export) !== 0) {
                        const name = node.name.getText();
                        options.returnTypes[name] = `AstNode.${name}`;
                    }
                });
            });
        }
        const source = peg.generate(readProjectFile(pegsrc.grammar), options);
        const outputFile = path.resolve(projectRoot, pegsrc.output);
        const dir = path.dirname(outputFile);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(outputFile, source);
    }
    return true;
}
function railroad() {
    // railroad rendering logic taken from GrammKit/cli.js
    const { transform } = require('grammkit/lib/util');
    const handlebars = require('handlebars');
    const diagramStyle = 'node_modules/grammkit/app/diagram.css';
    const appStyle = 'node_modules/grammkit/app/app.css';
    const baseTemplate = 'node_modules/grammkit/template/viewer.html';
    for (const pegsrc of sources.peg) {
        const deps = [pegsrc.grammar, diagramStyle, appStyle, baseTemplate];
        if (targetIsUpToDate(pegsrc.railroad, deps)) {
            continue;
        }
        const result = transform(readProjectFile(pegsrc.grammar));
        const grammars = result.procesedGrammars.map(({ rules, references, name }) => {
            rules = rules.map(rule => {
                const ref = references[rule.name] || {};
                return {
                    name: rule.name,
                    diagram: rule.diagram,
                    usedBy: ref.usedBy,
                    references: ref.references
                };
            });
            return { name, rules };
        });
        const data = {
            title: `Railroad diagram for ${pegsrc.grammar}`,
            style: readProjectFile(diagramStyle) + '\n' + readProjectFile(appStyle),
            grammars
        };
        const template = handlebars.compile(readProjectFile(baseTemplate));
        fs.writeFileSync(path.resolve(projectRoot, pegsrc.railroad), template(data));
    }
    return true;
}
function build() {
    if (!tsc()) {
        console.log('build::tsc failed');
        return false;
    }
    if (!link(findProjectFiles('src', null, fullPath => /\.js$/.test(fullPath)))) {
        console.log('build::link failed');
        return false;
    }
    return true;
}
function tsc() {
    const result = saneSpawnWithOutput('node_modules/.bin/tsc', ['--diagnostics']);
    if (result.success) {
        console.log(result.stdout);
    }
    return result.success;
}
function makeLink(src, dest) {
    try {
        // First we have to ensure the entire path is there.
        const dir = path.dirname(dest);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.linkSync(src, dest);
    }
    catch (lerr) {
        console.error(`Error linking ${src} to ${dest} ${lerr.message}`);
        return false;
    }
    return true;
}
function link(srcFiles) {
    let success = true;
    for (const src of srcFiles) {
        const srcStats = fs.statSync(src);
        const dest = src.replace('src', 'build');
        try {
            const destStats = fs.statSync(dest);
            // This would have thrown if dest didn't exist, so it does.
            if (JSON.stringify(srcStats) !== JSON.stringify(destStats)) {
                // They aren't the same. This is likely due to switching branches.
                // Just remove the destination and make the link.
                fs.unlinkSync(dest);
                if (!makeLink(src, dest)) {
                    success = false;
                }
            }
        }
        catch (err) {
            // If the error was that the dest does not exist, we make the link.
            if (err.code === 'ENOENT') {
                if (!makeLink(src, dest)) {
                    success = false;
                }
            }
            else {
                console.error(`Unexpected stat error: ${err.message}`);
                success = false;
            }
        }
    }
    return success;
}
function tslint(args) {
    const options = minimist(args, {
        boolean: ['fix'],
    });
    const fixArgs = options.fix ? ['--fix'] : [];
    let success = true;
    for (const target of ['.', 'tools']) {
        const result = saneSpawnWithOutput('node_modules/.bin/tslint', ['-p', target, ...fixArgs]);
        if (result.stdout) {
            console.log(result.stdout);
        }
        success = success && result.success;
    }
    return success;
}
function lint(args) {
    const CLIEngine = require('eslint').CLIEngine;
    const options = minimist(args, {
        boolean: ['fix'],
    });
    const jsSources = [...findProjectFiles(process.cwd(), srcExclude, fullPath => {
            if (/build[/\\]/.test(fullPath) || /gen[/\\]/.test(fullPath) || /dist[/\\]/.test(fullPath)) {
                return false;
            }
            return /\.[jt]s$/.test(fullPath);
        })];
    const cli = new CLIEngine({
        useEsLintRc: false,
        configFile: '.eslintrc.json',
        fix: options.fix,
        cacheLocation: eslintCache,
        cache: true
    });
    const report = cli.executeOnFiles(jsSources);
    const formatter = cli.getFormatter();
    console.log(formatter(report.results));
    if (options.fix) {
        CLIEngine.outputFixes(report);
    }
    return report.errorCount === 0;
}
function webpack() {
    const result = saneSpawnWithOutput('npm', ['run', 'build:webpack']);
    if (result.stdout) {
        console.log(result.stdout);
    }
    return result.success;
}
function spawnWasSuccessful(result, opts = {}) {
    if (result.status === 0 && !result.error) {
        return true;
    }
    for (const x of [result.stdout, result.stderr]) {
        if (x && !opts.dontWarnOnFailure) {
            console.warn(x.toString().trim());
        }
    }
    if (result.error && !opts.dontWarnOnFailure) {
        console.warn(result.error);
    }
    return false;
}
// make spawn work more or less the same way cross-platform
function saneSpawn(cmd, args, opts) {
    cmd = path.normalize(cmd);
    opts = opts || {};
    opts.shell = true;
    // it's OK, I know what I'm doing
    const result = _DO_NOT_USE_spawn(cmd, args, opts);
    return spawnWasSuccessful(result, opts);
}
// make spawn work more or less the same way cross-platform
function saneSpawnWithOutput(cmd, args, opts) {
    cmd = path.normalize(cmd);
    opts = opts || {};
    opts.shell = true;
    // it's OK, I know what I'm doing
    const result = _DO_NOT_USE_spawn(cmd, args, opts);
    return { success: spawnWasSuccessful(result, opts), stdout: result.stdout.toString(), stderr: result.stderr.toString() };
}
function runTests(args) {
    const options = minimist(args, {
        string: ['grep'],
        inspect: ['inspect'],
        explore: ['explore'],
        coverage: ['coverage'],
        exceptions: ['exceptions'],
        boolean: ['manual', 'all'],
        repeat: ['repeat'],
        alias: { g: 'grep' },
    });
    const testsInDir = dir => findProjectFiles(dir, buildExclude, fullPath => {
        // TODO(wkorman): Integrate shell testing more deeply into sigh testing. For
        // now we skip including shell tests in the normal sigh test flow and intend
        // to instead run them via a separate 'npm test' command.
        if (fullPath.startsWith(path.normalize(`${dir}/shell`))) {
            return false;
        }
        // TODO(sjmiles): `artifacts` was moved from `arcs\shell\` to `arcs`, added
        // this statement to match the above filter.
        if (fullPath.startsWith(path.normalize(`${dir}/artifacts/`))) {
            return false;
        }
        const isSelectedTest = options.all || (options.manual === fullPath.includes('manual_test'));
        return /-tests?.js$/.test(fullPath) && isSelectedTest;
    });
    function buildTestRunner() {
        const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'sigh-'));
        const chain = [];
        const mochaInstanceFile = fixPathForWindows(path.resolve(__dirname, '../build/platform/mocha-node.js'));
        for (const test of testsInDir(process.cwd())) {
            chain.push(`
        import {mocha} from '${mochaInstanceFile}';
        mocha.suite.emit('pre-require', global, '${test}', mocha);
      `);
            chain.push(`
        import '${fixPathForWindows(test)}';
      `);
            chain.push(`
        import {mocha} from '${mochaInstanceFile}';
        mocha.suite.emit('require', null, '${test}', mocha);
        mocha.suite.emit('post-require', global, '${test}', mocha);
      `);
        }
        const chainImports = chain.map((entry, i) => {
            const file = path.join(tempDir, `chain${i}.js`);
            fs.writeFileSync(file, entry);
            return `import '${fixPathForWindows(file)}';`;
        });
        if (options.explore) {
            chainImports.push(`
      import {DevtoolsConnection} from '${fixPathForWindows(path.resolve(__dirname, '../build/runtime/debug/devtools-connection.js'))}';
      console.log("Waiting for Arcs Explorer");
      DevtoolsConnection.ensure();
    `);
        }
        const runner = `
      import {mocha} from '${mochaInstanceFile}';
      ${chainImports.join('\n      ')}
      (async () => {
        ${options.explore ? 'await DevtoolsConnection.onceConnected;' : ''}
        let runner = mocha
            .grep(${JSON.stringify(options.grep || '')})
            .run(function(failures) {
              process.on("exit", function() {
                process.exit(failures > 0 ? 1 : 0);
              });
            });
        process.on('unhandledRejection', (reason, promise) => {
          runner.abort();
          throw reason;
        });
      })();
    `;
        const runnerFile = path.join(tempDir, 'runner.js');
        fs.writeFileSync(runnerFile, runner);
        return runnerFile;
    }
    const extraFlags = [];
    if (options.inspect) {
        extraFlags.push('--inspect-brk');
    }
    if (options.exceptions) {
        extraFlags.push('--print_all_exceptions');
    }
    const runner = buildTestRunner();
    // Spawn processes as needed to repeat tests specified by 'repeat' flag.
    const repeatCount = Number(options.repeat) || 1;
    const testResults = [];
    const failedRuns = [];
    for (let i = 1; i < repeatCount + 1; i++) {
        console.log('RUN %s STARTING [%s]:', i, new Date().toLocaleTimeString());
        if (options.coverage) {
            process.env.NODE_V8_COVERAGE = coverageDir;
        }
        const coveragePrefix = options.coverage ? ` node_modules/.bin/c8 -r html` : '';
        const testResult = saneSpawn(`${coveragePrefix} node`, [
            '--experimental-modules',
            '--trace-warnings',
            '--no-deprecation',
            ...extraFlags,
            '--loader',
            fixPathForWindows(path.join(__dirname, '../tools/custom-loader.mjs')),
            '-r',
            'source-map-support/register.js',
            runner
        ], { stdio: 'inherit' });
        if (testResult === false) {
            failedRuns.push(i);
        }
        testResults.push(testResult);
    }
    console.log('%s runs completed. %s runs failed.', repeatCount, failedRuns.length);
    if (failedRuns.length > 0) {
        console.log('Failed runs: ', failedRuns);
    }
    if (options.coverage) {
        console.log(`Visit 'file:///${process.cwd()}/coverage/index.html' in the browser for a coverage report.`);
    }
    return testResults.filter(x => !x).length === 0;
}
// Watches for file changes, then runs the steps for the first item in args, passing the remaining items.
function watch(args) {
    if (chokidar === null) {
        console.log('\nthe sigh watch subcommand requires chokidar to be installed. Please run \'npm install --no-save chokidar\' then try again\n');
        return false;
    }
    const command = args.shift() || 'webpack';
    const watcher = chokidar.watch('.', {
        ignored: new RegExp(`(node_modules|build/|.git|user-test/|test-output/|${eslintCache}|bundle-cli.js)`),
        persistent: true
    });
    keepProcessAlive = true; // Tell the runner to not exit.
    let timeout = null;
    const changes = new Set();
    watcher.on('change', path => {
        if (timeout) {
            clearTimeout(timeout);
        }
        changes.add(path);
        timeout = setTimeout(() => {
            console.log(`\nRebuilding due to changes to:\n  ${[...changes].join('\n  ')}`);
            changes.clear();
            runSteps(command, args);
            timeout = null;
        }, 500);
    });
    return true;
}
function health(args) {
    const options = minimist(args, {
        boolean: ['migration', 'types', 'tests', 'nullChecks', 'floatingPromises'],
    });
    if ((options.migration && 1 || 0) + (options.types && 1 || 0) + (options.tests && 1 || 0) > 1) {
        console.error('Please select only one detailed report at a time');
        return false;
    }
    // Utility function for counting / displaying errors caused by adding new TsLint rules.
    // tslint:disable-next-line: no-any
    function runTsLintWithModifiedConfig(modifier, lineMatch) {
        const pathToTsLintConfig = './config/tslint.base.json';
        // Read and parse existing TsLint config.
        const tsLintConfig = fs.readFileSync(pathToTsLintConfig, 'utf-8');
        const tsLintConfigNoComments = tsLintConfig.replace(/ *\/\/.*\n/g, '');
        const parsedConfig = JSON.parse(tsLintConfigNoComments);
        modifier(parsedConfig);
        // Write the modified TsLint config.
        fs.writeFileSync(pathToTsLintConfig, JSON.stringify(parsedConfig, null, '  '), 'utf-8');
        const tslintOutput = saneSpawnWithOutput('node_modules/.bin/tslint', ['--project', '.'], { dontWarnOnFailure: true }).stdout;
        // Recover original TsLint config.
        fs.writeFileSync(pathToTsLintConfig, tsLintConfig, 'utf-8');
        return tslintOutput.split('\n').filter(line => line.match(lineMatch));
    }
    function runNoFloatingPromisesCheck() {
        return runTsLintWithModifiedConfig(config => config.rules['no-floating-promises'] = true, 'Promises must be handled appropriately');
    }
    const migrationFiles = () => [...findProjectFiles('src', null, fullPath => fullPath.endsWith('.js')
            && !fullPath.includes('/artifacts/')
            && !fullPath.includes('\\artifacts\\')
            && !fullPath.includes('\\runtime\\build\\')
            && !fullPath.includes('/runtime/build/'))];
    if (options.migration) {
        console.log('JS files to migrate:\n');
        return saneSpawn('node_modules/.bin/sloc', ['-details', '--keys source', ...migrationFiles()], { stdio: 'inherit' });
    }
    if (options.nullChecks) {
        return saneSpawn('node_modules/.bin/tsc', ['--strictNullChecks'], { stdio: 'inherit' });
    }
    if (options.types) {
        return saneSpawn('node_modules/.bin/type-coverage', ['--strict', '--detail'], { stdio: 'inherit' });
    }
    if (options.tests) {
        runSteps('test', ['--coverage']);
        return saneSpawn('node_modules/.bin/c8', ['report'], { stdio: 'inherit' });
    }
    if (options.floatingPromises) {
        console.log(runNoFloatingPromisesCheck().join('\n'));
        return true;
    }
    // Generating coverage report from tests.
    runSteps('test', ['--coverage']);
    const line = () => console.log('+---------------------+--------+--------+---------------------------+');
    const show = (a, b, c, d) => console.log(`| ${String(a).padEnd(20, ' ')}| ${String(b).padEnd(7, ' ')}| ${String(c).padEnd(7, ' ')}| ${String(d).padEnd(26, ' ')}|`);
    line();
    show('Category', 'Result', 'Points', 'Detailed report');
    line();
    const slocOutput = saneSpawnWithOutput('node_modules/.bin/sloc', ['--detail', '--keys source', ...migrationFiles()]).stdout;
    const jsLocCount = String(slocOutput).match(/Source *: *(\d+)/)[1];
    const jsLocPoints = Number(jsLocCount) / 5;
    show('JS LOC to migrate', jsLocCount, jsLocPoints.toFixed(1), 'health --migration');
    const c8Output = saneSpawnWithOutput('node_modules/.bin/c8', ['report']).stdout;
    const testCovPercent = String(c8Output).match(/All files *\| *([.\d]+)/)[1];
    const testCovPoints = (100 - Number(testCovPercent)) * 20;
    show('Test Coverage', testCovPercent + '%', testCovPoints.toFixed(1), 'health --tests');
    const typeCoverageOutput = saneSpawnWithOutput('node_modules/.bin/type-coverage', ['--strict']).stdout;
    const typeCovPercent = String(typeCoverageOutput).match(/(\d+\.\d+)%/)[1];
    const typeCovPoints = (100 - Number(typeCovPercent)) * 30;
    show('Type Coverage', typeCovPercent + '%', typeCovPoints.toFixed(1), 'health --types');
    const nullChecksOutput = saneSpawnWithOutput('node_modules/.bin/tsc', ['--strictNullChecks'], { dontWarnOnFailure: true }).stdout;
    const nullChecksErrors = (String(nullChecksOutput).match(/error TS/g) || []).length;
    const nullChecksPoints = (nullChecksErrors / 10);
    show('Null Errors', nullChecksErrors, nullChecksPoints.toFixed(1), 'health --nullChecks');
    const floatingPromisesCount = runNoFloatingPromisesCheck().length;
    const floatingPromisesPoints = floatingPromisesCount / 10;
    show('Floating Promises', floatingPromisesCount, floatingPromisesPoints, 'health --floatingPromises');
    line();
    // For go/arcs-paydown, team tech-debt paydown exercise.
    const points = jsLocPoints + testCovPoints + typeCovPoints + nullChecksPoints + floatingPromisesPoints;
    show('Points available', '', points.toFixed(1), 'go/arcs-paydown');
    line();
    return true;
}
// E.g. $ ./tools/sigh bundle -o restaurants.zip particles/Restaurants/Restaurants.recipes
function bundle(args) {
    return saneSpawn(`node`, [
        '--experimental-modules',
        '--loader',
        fixPathForWindows(path.join(__dirname, '../tools/custom-loader.mjs')),
        `build/tools/bundle-cli.js`,
        ...args
    ], { stdio: 'inherit' });
}
// E.g. $ ./tools/sigh schema2proto -o particles/native/wasm/proto particles/Restaurants/Restaurants.recipes
function schema2proto(args) {
    return saneSpawn(`node`, [
        '--experimental-modules',
        '--loader',
        fixPathForWindows(path.join(__dirname, '../tools/custom-loader.mjs')),
        `build/tools/schema2proto.js`,
        ...args
    ], { stdio: 'inherit' });
}
// Looks up the steps for `command` and runs each with `args`.
function runSteps(command, args) {
    const funcs = steps[command];
    if (funcs === undefined) {
        console.log(`Unknown command: '${command}'`);
        console.log('Available commands are:', Object.keys(steps).join(', '));
        process.exit(2);
    }
    console.log(`😌 ${command}`);
    let result = false;
    try {
        for (const func of funcs) {
            console.log(`🙋 ${func.name}`);
            if (!func(args)) {
                console.log(`🙅 ${func.name}`);
                return false;
            }
            console.log(`🙆 ${func.name}`);
        }
        result = true;
    }
    catch (e) {
        console.error(e);
    }
    finally {
        console.log(result ? '🎉' : '😱');
    }
    return result;
}
const result = runSteps(process.argv[2] || 'default', process.argv.slice(3));
if (!keepProcessAlive) { // the watch command is running.
    process.exit(result ? 0 : 1);
}
