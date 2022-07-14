# Boilerplate for MC CloudPages

## The idea or the goal of this repo
Instead of having for each MC CloudPage a separate repository and making general updates to each of them, we now have only one repo. With the usage of partials and multiple entries we can easily separate the output of the landingpages.

### Steps to do
1. Files to create
	i. Create a handlebars file  ./src/your-new-site.handlebars. you may also need a partial which you put into ./src/partials/.
	ii. Create a js file in ./src/scripts/your-new-site.js

2. in webpack.config.js
	i. Add your new handlebars file from step 1.1 to the array "htmlPageNames"
	ii. Add your js file from step 1.2 to the config.entry as value and give it an identical key name

After the build there will be for each item in the "htmlPageNames" array a folder in ./dist.

Thats it.
