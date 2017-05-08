# Node Testing Tool

Node based testing tool that allows to compare content and test links. 

#### Installation

Install dependencies of the project.

```sh
	npm install
```

#### Run node app

```sh
	npm start
```

#### How to use?

When the app starts, you could select between options.

![Main menu](http://i.imgur.com/GFxPwoh.png)

##### Compare Content

This feature allows to compare content of modules between production and localhost sites.
 

You could update default domains on app/modules/config 


 
![Compare menu](http://i.imgur.com/AUgDIa3.png)

##### Links Testing
This feature allows to check if links are working as expected and let us know if there are errors with them.
![links menu](http://i.imgur.com/qIwwuo3.png)

### Resources Used:

 * [Request](https://github.com/request/request) to handle HTTP/HTTPS requests.
 * [Cheerio](https://cheerio.js.org/) to manipulate DOM from server side.
 * [diff](https://github.com/kpdecker/jsdiff) to compare content.