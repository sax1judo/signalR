node rmdir.js && node --max-old-space-size=8192 node_modules/webpack/bin/webpack.js && npm run webpack-build && node merger.js