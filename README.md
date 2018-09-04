# wk

wk is a CLI tool for writing web applications with typescript

## installing

visit [nodejs website](https://nodejs.org) to download & install nodejs


install typescript and wk CLI

	npm i -g typescript
	npm i -g wk-toolkit

## usage

run **init** command to generate boilerplate files
	
	wk init

run **start** command to start a web server and file watcher that compiles your ts files on file change

	wk start

run **new** command to create a new component folder with ts/html/css files in it

	wk new component-name


you can write any kebap-case name for your component

run **build** command to make an optimized production build

	wk build


*run **wk** to see list all commands*

### components

components are the bare bones of the wk. every component has its own ts,html and css file 
and starts with a call to base class contructor.

	super(root,MARKUP_COMPONENT_ENUM);

which populates the **root** element with the markup writen in .html file of that component.


### conventions

1. class, namespace and interface names are PascalCase
2. file, folder, html attributes are kebap-case
3. method and variables are camelCase
4. braces are in allman style
