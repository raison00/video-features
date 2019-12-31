NEW Video Features for MEW 2.0
-----------


What is the mobile enhanced web platform? It's the Creative Platform on MEW 2.0 that supports responsive/adaptive marketing content.


 Folder
 -------
 ce/campaign- CE files are uploaded under this folder. Every campaign has its own folder.

 Please remember folder name should be smaller case.

 clientModule
 -------------
 Client side javascript are uploaded in this folder. 
  clientModule/scripts/lib--- vendor library
  clientModule/scripts/template--- Handlebar template files
  clientModule/scripts/views--- Backbone views
  clientModule/test --- karma unit testing files


 serverModule
 -------------
 Node server related are uploaded in this folder.
  serverModule/expressTemplates --- express handlebar templates
  serverModule/test --- Mocha unit testing files

------------------------------------------------------------------------------------------------
Getting Started with CreativeJS
------------------------------------------------------------------------------------------------
	Required Installations (check package.json for versions)
		- nodejs
		- grunt
		- grunt-cli


------------------------------------------------------------------------------------------------
Grunt and How to start localhost?
------------------------------------------------------------------------------------------------		
We use grunt to do the main project automation work. Use grunt -h to show what tasks can be run, or take a look at the Gruntfile.js

Commands
--------
 grunt 
   - Default task to compile handlebars,server-side and client-side unit testing and starts local server.

 grunt unitTesting
   - Task to run server-side and client-side unit testing

 grunt start
   -  Task to localhost

 grunt createTemplate:directory/fileName
   - Task to create .hbs file from boilerplate template.
   Parameters required to pass
   ---------------------------
   (campaign folder name that is created under /CE/campaign)/(file that has to be created under campaign folder)  
   EX: grunt createTemplate:bops/page3
 grunt buildLib  
  - Task to build shared header and footer library for mobile and desktop.

 grunt nexus-staging --buildVersion ${BUILD_NUMBER} 

------------------------------------------------------------------------------------------------
Adding coremetrics Tags
------------------------------------------------------------------------------------------------

We are using the mobile library eluminate.js and the helper library called cmcustom-mcom.js, both are located
in clientModule/scripts/coremetrics.
The functions that will post coremetrics tags are located in cmcustom-mcom.js file, and to enable this functionality
there are the steps:
1.- When you create a new project using grunt, you will notice the following entry in the <head> section:
    {{>coremetricsHeader}}
   This will enable the coremetrics framework. Please review the file serverModule/expressTemplates/coremetricsHeader.hbs
   to make sure the constant data is ok, such as the coremetrics client id.
2.- You can now add any coremetrics tag by adding a DOM event in the html tag, and then its attributes. These attributes can be added in the cmcustom-mcom.js file instead if desired.
some examples are:

 <a href="#" onclick="javascript:cmCreateLinkClickTag('PageID','Name','/target','/currentpage','/referingurl')">Click me</a>
 <img src="/assets/testCE/bops_01.gif" onclick="javascript:cmCreateLinkClickTag('pageIDForImage','link click for image','/assets/testCE/bops_01.gif','/currentpage','/refering


------------------------------------------------------------------------------------------------
Logging
------------------------------------------------------------------------------------------------
This will enable a heroku add:on in heroku to start logging events

In the heroku repo do:
$ heroku addons:create logentries
for documentation enter
$ heroku addons:docs logentries

After that, in the heroku dashboard you can access the logentries add:on to start monitoring events.



