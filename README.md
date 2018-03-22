# wk
wk is a command line tool for generating boilerplate code for basic web components

## templates
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

### rules

- template and parent component name must be different
- template files must be placed under parent component folder
