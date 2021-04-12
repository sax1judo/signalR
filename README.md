# multigame-platform
Client solution for multi-game platform

## Available scripts

To compile project run:

## `compile.bat`

To watch for project's change and live compile run:

## `watch.bat` 

Note: it ONLY watch when changes occurs in `.js` files!

To build project for production run:

## `build.bat`

Note: build process will minify and and remove unnecessary code.

--------------------------------------------

# Folder structure

## `src`        - all application sources
- `assets`      - images, videos and other resources
- `components`  - `.jsx` / `.js` source files
- `scripts`     - functional parts of an application 
- `style`       - `.scss` files 
- `index.html`  - original index file 
- `index.js`    - starting point of an application 

## `public`     - live-ready folder
- This folder contains all files and `index.html` is the starting point. 
- `compile` and `build` use this folder so only one version can be available at the time.