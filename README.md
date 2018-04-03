# wk
wk is a command line tool for generating boilerplate code for basic web components


## Installing

visit following link to download & install nodejs

	https://nodejs.org


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

run **build** command to make an optimized production build

	wk build

## Builtin Functionality

### Global Data Store
wk exposes a global variable named **Store** which has following methods for managing global data

- set(key,value)
- get(key)
- has(key)
- delete(key)

usage example:

	store.set("somekey","anyvalue");
	store.set("anotherkey",132);
	store.get("anotherkey");

*located in /classes/store.ts*

this feature is completely optional and can be deleted safely

### Event Dispatcher
publish/subscribe pattern is implemented in wk with following global functions

- pub(event)
- sub(event,handler)
- unsub(event,handler)
	
usage example:

	// some component fires an event
	pub("SOME_EVENT");

	// another component gets notified when that event is fired (published)
	sub("SOME_EVENT",function()
	{

	});

*located in /classes/dispatcher.js*

this feature is completely optional and can be deleted safely

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
