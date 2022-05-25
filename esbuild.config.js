const esbuild = require('esbuild')

const config = {
    entryPoints: ['src/index.ts'],
    outfile: 'dist/index-min.js',
    bundle: true,
    minify: true,
    platform: 'browser',
    sourcemap: false,
    target: 'es2020'
}

esbuild.build(config).catch(() => process.exit(1))
