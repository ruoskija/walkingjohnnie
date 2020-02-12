# walkingjohnnie

This is just some messing around with javascript and the canvas element.

walkingjohnnie is a visualization of a "[random walk](https://en.wikipedia.org/wiki/Random_walk_hypothesis)".

## running

You need to serve index.html with an http server. If you simply open the local file in the browser, there will be a "same origin" type of error. This is because `walking.js` uses javascripts `import` feature.

To serve http content, you can use e.g. [http-server](https://www.npmjs.com/package/http-server).
