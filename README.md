# wk

wk is a lightweight web framework for typescript with an almost-zero overhead.

Unlike all other major frameworks , wk appreciates imperative programming

## Installing

visit [nodejs website](https://nodejs.org) to download & install nodejs


install typescript and wk CLI

	npm i -g typescript
	npm i -g wk


## Usage

create an empty folder and navigate to it

	mkdir your-project
	cd your-project

run **init** command to generate boilerplate files
	
	wk init

run **start** command to start a web server and file watcher that compiles your files on file change

	wk start

run **new** command to create a new component folder with ts/html/css files in it

	wk new component-name


you can write any kebap-case name for your component

run **build** command to make an optimized production build

	wk build

### Components

Components are the bare bones of the wk. Every component has its own ts,html and css file 
and  starts with a call to base class contructor.

	super(root,"component-name");

which populates the **root** element with the markup writen in .html file of that component.


### Router

	not documented yet

### Conventions

1. class, namespace and interface names are PascalCase
2. file, folder, html attributes are kebap-case
3. method and variables are camelCase
4. braces are in Allman Style
