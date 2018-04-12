# wk

wk is a lightweight web framework for typescript with an almost-zero overhead. All provided functionality (router, event dispatcher, global data store) are optional and can be removed if not needed.

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

## Builtin Functionality

### Global Data Store
wk exposes a global variable named **Store** which has following methods for managing global data

- set(key: number,value)
- get(key: number)
- has(key: number)
- delete(key: number)

usage example:

	var SOME_KEY = 0;
	var OTHER_KEY = 1;
	store.set(SOME_KEY, "anyvalue");
	store.set(OTHER_KEY, 132);
	store.get(OTHER_KEY);

*located in /classes/store.ts*

this feature is completely optional and can be deleted safely

### Event Dispatcher
publish/subscribe pattern is implemented in wk with following global functions

- pub(event: number)
- sub(event: number,handler)
- unsub(event: number,handler)
	
usage example:

	var SOME_EVENT = 0;
	var OTHER_EVENT = 1;
	// some component fires an event
	pub(SOME_EVENT);

	// another component gets notified when that event is fired (published)
	sub(SOME_EVENT,function()
	{

	});

*located in /classes/dispatcher.ts*

this feature is completely optional and can be deleted safely

### Components

Components are the bare bones of the wk. Every component has its own ts,html and css file 
and  starts with a call to base class contructor.

	super(root,"component-name");

which populates the **root** element with the markup writen in .html file of that component.


### Router

	not documented yet



### Templates
templates are simple .html files with no logic and style attached to them

they are used for creating non-primitive html elements

example:

A simple "div" element can be created like this

    var d = document.createElement("div");
    
More complex UI items can be defined in a template

let's say we have created a template file comment-section.html with the following content

	<div class="comment-section">
		<img class="image">
		<div class="user-details">
			<strong class="user-id"></strong>
			<div class="user-name"></div>        
		</div>
	</div>


dom node that contains above content can be created by calling createTemplate method of the root object.

	var d = root.createTemplate("comment-section");

creates a dom node that contains the content of the template given

templates are child elements of components, a template can't be shared between 2 different component

#### Rules

- template and parent component name must be different
- template files must be placed under parent component folder


### Conventions

1. class, mamespace and interface names are PascalCase
2. file, folder, html attributes and html class names are kebap-case
3. method and variables are camelCase
4. braces are in Allman Style
