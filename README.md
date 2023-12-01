# performance manager

Performance manager is a graphical system intented to allow a rigorous, ontology-based management of digital project files.

1. [Overview](#overview)
2. [Usage](#usage)
3. [Setup](#setup)
4. [Roadmap](#roadmap)

## Overview

Created by Jacob Hart, this is a solution for busy technicians who are asked to provide documentation for digital perfomance files. The idea is that, as quckly and as easily as possible, files in a root project folder are tracked, documented and classed according to an ontology data representation chosen (or created) by the user. Once a project is finished, this content can be uploaded to a database system like [Heurist](https://heuristnetwork.org/), and the content uploaded and stored on a service like [Nakala](https://www.nakala.fr/). This was initally created for [Art Zoyd Studios](https://artzoydstudios.com/) in the contexte of electroacoustic music, but it could arguably be used for any digital project where it could be interested to track changes, and store content according to a specific ontology.

## Usage

_Coming soon - with pictures and gifs! :)_

## Setup

Performance manager is a svelte application that runs in the browser. This is for maximum portability and cross-platform support. One day, it may be published online, and there are also plans for converting it into a standalone application using [tauri](https://tauri.app/), but for now, you must run a local server to use it.

### nodejs

You must first have nodejs installed on your system. We recommend using [nvm](https://github.com/nvm-sh/nvm), or you can download [nodejs](https://nodejs.org/en) from here and install it.

### Clone this repo

Clone this repo somewhere onto your machine. Once this is done, it is advised that you create your own working branch - this is because project files and data will be stored in the cloned directory, and this is not something that should be kept on the main branch. It will also allow you to easily pull updates from the main branch without any conflict issues.

### Install modules

The first time you run the app, and possibly after you have updated, you will fist need to install the nodejs modules. To do this, cd to the repo, and run:

```shell
npm i
```

### Run local server

Now you can use the app. To launch the local server, cd to the repo and run:

```shell
npm run dev
```

You can then head to Chrome and access the app at [http://localhost:5173/](http://localhost:5173/). To kill the server, hit `Control + C` in the terminal.

## Roadmap

### Priority

- [ ] Add selected file to record button functionality
- [ ] Programatic record/file assignment by ontology
- [ ] File explorer filtering + search
- [ ] Hide all/show all
- [ ] Record removal
- [ ] Record relations
- [ ] Date field formating
- [ ] String list formating
- [ ] Save project
- [ ] Freezes
- [ ] Project loading
- [ ] Network visualisation

### If possible

- [ ] Tauri app
- [ ] Refactor record list and file list system (this would require a lot of work...)
- [ ] Heurist and Nakala upload
- [ ] Ontology maker