# wk
*CLI for writing web applications*

wk imposes a simple approach that utilizes
html, css and javascript for writing web applications

i wrote this out of frustration with current js development methods (aka: js frameworks)

*this project is under active development and it is subjected to change*
### Usage

this CLI tool is available through npm

	npm i -g wk-toolkit


### Initializing a project

	wk init

- Checks if current folder has already initialized
- Creates boilerplate folders/files for a project if not initialized before

### Starting development server

	wk start

- Starts the file server that hosts the web application on 127.0.0.1 in an available port
- Starts a file watcher that concatanates the source files (css, js, html) upon change
- Opens a browser window that runs the web application

### Making a production build

	wk build

- Clones **./public** folder  as **./build**
- Minifies & merges all javascript and css code under **./src** folder and puts them into **./build** folder with a time seed



## Migration Notes 0.3.0 to 0.3.1
August-26-2019

folder structure is changed with this release (this is a breaking change)

- www is changed to public
since this folder is for serving static files,
i thought it would be a good idea to name it www/, 
(just like default apache root folder name)
but no one get the reference and i decided to change its name to public/
which is inspired from create-react-app 

- src is kept same
src is a good abbrevetion for name 'source' so i kept it as it is

- com is moved under src and renamed as src/components

folder name 'com' has an undesired resemblance with Android package names 
( eg: com.foo.bar ) i thought having 3 letter base folder names looked cool 
( www, src, com) but every developer that tried to use wk, 
complained with these cryptic namings.


## Migration Notes 0.2.22 to 0.3.0
August-18-2019

i have decided to make a breaking change to wk and dropped typescript support 

even though i love typescript and typed languages for programming, 
i had some negative experiences with 'typescript' so far 

- typescript transpiler is slow and getting slower with each release.
i have tried lots of things but there is no way for me to solve this problem
(i have even experimented alternative compiler 'sucrase')
- typescript language is growing very rapidly and wk uses outdated typescript
features like triple-slash-reference-directives and namespace keyword.wk already
encourages to use a small subset of typescript language, the statement 
'wk is a toolkit for developing web apps with typescript' is getting less true
with each typescript release (which is too frequent for my taste)
- even it is very easy to understand how it works, typescript is 
complexifying wk for new learners, new wk users are always asking typescript
related questions instead of wk architecture to understand a project written
with wk
- as of aug 2019, es6 'class' and 'extends' keyword is very well supported by
major browsers, which makes one of the transpilation reasons fade away
- one less dependency in the project always feels good


### what is gained by dropping typescript

- faster build times (5-10 seconds to 10-50 milliseconds)
- less things to learn for new wk users
- smaller codebase for maintaining wk development itself

### what is lost by dropping typescript

- very helpful type checks
- smart autocomplete, code navigation

still, i am not convinced that dropping typescript is a good idea,
since wk is still in an experimental stage, i may re-introduce typescript 
in the future



