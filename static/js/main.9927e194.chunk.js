(this.webpackJsonpwalkingjohnnie=this.webpackJsonpwalkingjohnnie||[]).push([[0],{10:function(e,t,n){e.exports=n(20)},15:function(e,t,n){},20:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),o=n(7),r=n.n(o),s=(n(15),n(1)),l=n(2),h=n(4),u=n(3),c=n(5);function m(e,t){for(var n=[],a=0;a<t;a++){for(var i=[],o=0;o<e;o++)i.push("");n.push(i)}return n}var d=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:640,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:400,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:2;Object(s.a)(this,e),this.width=t,this.height=n,this.boxSize=a,this.canvas=document.createElement("canvas"),this.canvas.width=t*a,this.canvas.height=n*a,this.canvas.id="game",document.getElementById("gamecanvasdiv").appendChild(this.canvas),this.context=this.canvas.getContext("2d"),this.drawingState=m(t,n),this.nextDrawingState=m(t,n)}return Object(l.a)(e,[{key:"clear",value:function(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height)}},{key:"addToNextDrawing",value:function(e,t,n){var a=t,i=e;a>=0&&i>=0&&a<this.height&&i<this.width&&(this.nextDrawingState[a][i]=n)}},{key:"update",value:function(){var e=this,t=this.boxSize;(function(e,t){var n=[],a=e.length;if(0===a)return console.log("Empty olderState"),[];for(var i=e[0].length,o=0;o<a;o++)for(var r=0;r<i;r++){var s=e[o][r],l=t[o][r];s!==l&&n.push({x:r,y:o,color:l})}return n})(this.drawingState,this.nextDrawingState).forEach((function(n){""!==n.color&&(e.context.fillStyle=n.color,e.context.fillRect(n.x*t,n.y*t,t,t),e.drawingState[n.y][n.x]=n.color)}))}}]),e}(),g=function(){function e(){Object(s.a)(this,e),this.finished=!0,this.timer=setTimeout((function(){}),1)}return Object(l.a)(e,[{key:"start",value:function(e){var t=this;this.finished=!1,this.timer=setTimeout((function(){return t.finished=!0}),e)}},{key:"hasFinished",value:function(){return this.finished}},{key:"forceToFinish",value:function(){clearTimeout(this.timer),this.finished=!0}}]),e}();function f(e){return Math.floor(Math.random()*e)}var p=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"#609609",i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"#070707";Object(s.a)(this,e),this.x=t,this.y=n,this.color=i,this.trailColor=a}return Object(l.a)(e,[{key:"step",value:function(){switch(f(4)){case 0:this.x+=1;break;case 1:this.y+=1;break;case 2:this.y-=1;break;default:this.x-=1}}},{key:"isOutsideArea",value:function(e,t){return this.x<0||this.x>=e||this.y<0||this.y>=t}},{key:"isInsideArea",value:function(e,t){return!this.isOutsideArea(e,t)}},{key:"distanceFrom",value:function(e,t){return function(e,t,n,a){var i=e-n,o=t-a;return Math.floor(Math.sqrt(i*i+o*o))}(this.x,this.y,e,t)}}]),e}(),v=function(){function e(t,n){Object(s.a)(this,e),this.width=t,this.height=n,this.agents=[],this.distanceCounter=new Map,this.maxDistance=1,this.origin={x:Math.floor(t/2),y:Math.floor(n/2)}}return Object(l.a)(e,[{key:"spawnAgent",value:function(){this.agents.push(new p(this.origin.x,this.origin.y,"rgb("+f(255).toString()+","+f(255).toString()+","+f(255).toString()+")"))}},{key:"getAgentXs",value:function(){var e=this,t=[];return this.agents.forEach((function(n){t.push(n.x-e.origin.x)})),t}},{key:"getAgentYs",value:function(){var e=this,t=[];return this.agents.forEach((function(n){t.push(n.y-e.origin.y)})),t}}]),e}(),y=function(){function e(t,n,a,i){Object(s.a)(this,e),this.areaWidth=t,this.areaHeight=n,this.boxSize=a,this.numberOfAgents=i,this.loopInterval=100,this.paused=!0,this.limitSpeed=!0,this.distancePlotTimer=new g,this.speedLimitTimer=new g,this.world=new v(t,n),this.gameCanvas=new d(t,n,a);for(var o=0;o<i;o++)this.world.spawnAgent()}return Object(l.a)(e,[{key:"loop",value:function(){var e=this;if(this.limitSpeed)if(this.speedLimitTimer.hasFinished())this.speedLimitTimer.start(this.loopInterval);else if(!this.paused)return void window.requestAnimationFrame((function(){return e.loop()}));this.world.agents.forEach((function(t){t.isInsideArea(e.world.width,e.world.height)&&e.gameCanvas.addToNextDrawing(t.x,t.y,t.trailColor),t.step(),t.isInsideArea(e.world.width,e.world.height)&&e.gameCanvas.addToNextDrawing(t.x,t.y,t.color)})),(this.distancePlotTimer.hasFinished()||this.paused)&&this.distancePlotTimer.start(1111),this.gameCanvas.update(),this.paused||window.requestAnimationFrame((function(){return e.loop()}))}},{key:"togglePause",value:function(){var e=this;this.paused=!this.paused,this.distancePlotTimer.forceToFinish(),this.paused||window.requestAnimationFrame((function(){return e.loop()}))}},{key:"stepOnce",value:function(){var e=this;this.paused&&(this.speedLimitTimer.forceToFinish(),this.distancePlotTimer.forceToFinish(),window.requestAnimationFrame((function(){return e.loop()})))}},{key:"setFPS",value:function(e){e&&(e<1?e=1:e>30&&(e=30),this.speedLimitTimer.forceToFinish(),this.distancePlotTimer.forceToFinish(),this.loopInterval=1e3/e)}},{key:"toggleSpeedLimit",value:function(e){this.limitSpeed=e,this.speedLimitTimer.forceToFinish(),this.distancePlotTimer.forceToFinish()}},{key:"getAgentXs",value:function(){return this.world.getAgentXs()}},{key:"getAgentYs",value:function(){return this.world.getAgentYs()}}]),e}();function w(e){return i.a.createElement("div",{id:"gamecontrols",className:"container"},i.a.createElement("div",{className:"container"},i.a.createElement("p",{style:{margin:"0px",textShadow:"1px 1px grey"}},"Speed Controls")),i.a.createElement("div",null,i.a.createElement(P,{onPauseButtonClick:e.onPauseButtonClick,gameIsPaused:e.gameIsPaused}),i.a.createElement(S,{onStepButtonClick:e.onStepButtonClick,gameIsPaused:e.gameIsPaused})),i.a.createElement(E,{gameFPS:e.gameFPS,gameSpeedLimitIsOn:e.gameSpeedLimitIsOn,onFPSChange:e.onFPSChange}),i.a.createElement(k,{gameSpeedLimitIsOn:e.gameSpeedLimitIsOn,onSpeedLimitButtonClick:e.onSpeedLimitButtonClick}))}function P(e){return i.a.createElement("button",{id:"pauseButton",onClick:e.onPauseButtonClick},e.gameIsPaused?"Resume":"Pause")}function S(e){return e.gameIsPaused?i.a.createElement("button",{id:"stepButton",onClick:e.onStepButtonClick},"Step"):null}function E(e){return i.a.createElement("div",{className:"container"},i.a.createElement("input",{type:"range",min:"1",max:"30",value:e.gameSpeedLimitIsOn?e.gameFPS:30,step:"1",id:"FPSSlider",onChange:function(t){return e.onFPSChange(t.target.value)}}),i.a.createElement("label",{htmlFor:"FPSSlider"},"Speed"))}function k(e){return i.a.createElement("div",null,i.a.createElement("button",{onClick:e.onSpeedLimitButtonClick},e.gameSpeedLimitIsOn?" Switch to turbo speed":"Switch to normal speed"))}var x=n(8),b=n.n(x),C=n(9),O=n.n(C)()(b.a);function F(e){return i.a.createElement(O,{data:[{x:e.xPlotXs,y:e.xPlotYs,marker:{color:"rgb(24,29,44)"},type:"bar"}],layout:{title:{text:"Distribution of Johnnies' x-axis positions",font:{size:12}},xaxis:{title:{text:"position",font:{size:12}}},yaxis:{title:{text:"number of Johnnies",font:{size:12}}},bargap:0}})}function I(e){return i.a.createElement(O,{data:[{x:e.yPlotXs,y:e.yPlotYs,marker:{color:"rgb(24,29,44)"},type:"bar",orientation:"h"}],layout:{title:{text:"Distribution of Johnnies' y-axis positions",font:{size:12}},xaxis:{title:{text:"number of Johnnies",font:{size:12}}},yaxis:{title:{text:"position",font:{size:12}}},bargap:0}})}var T=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(h.a)(this,Object(u.a)(t).call(this,e))).state={game:null,gameIsPaused:!0,gameSpeedLimitIsOn:!0,gameFPS:10,xPlotXs:[0],xPlotYs:[1],yPlotXs:[1],yPlotYs:[0]},n}return Object(c.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return i.a.createElement("div",null,i.a.createElement("div",{className:"container"},i.a.createElement(Y,null),i.a.createElement(w,{gameIsPaused:this.state.gameIsPaused,gameSpeedLimitIsOn:this.state.gameSpeedLimitIsOn,gameFPS:this.state.gameFPS,onPauseButtonClick:function(){return e.togglePause()},onStepButtonClick:function(){return e.state.game.stepOnce()},onFPSChange:function(t){return e.changeFPS(t)},onSpeedLimitButtonClick:function(){return e.changeSpeedLimiter()}})),i.a.createElement(A,{refreshPlots:function(){return e.refreshPlots()},xPlotXs:this.state.xPlotXs,xPlotYs:this.state.xPlotYs,yPlotXs:this.state.yPlotXs,yPlotYs:this.state.yPlotYs,renderXPlot:this.props.renderXPlot,renderYPlot:this.props.renderYPlot}))}},{key:"componentDidMount",value:function(){var e=window.screen.availWidth,t=this.props.gameScale?this.props.gameScale:4,n=this.props.gameAgents?this.props.gameAgents:1,a=e<640?e:640,i=Math.floor(5/8*a),o=Math.floor(a/t),r=Math.floor(i/t),s=new y(o,r,t,n);this.setState({game:s})}},{key:"togglePause",value:function(){this.state.game.togglePause(),this.setState({gameIsPaused:!this.state.gameIsPaused})}},{key:"changeSpeedLimiter",value:function(){var e=!this.state.gameSpeedLimitIsOn;this.setState({gameSpeedLimitIsOn:e}),this.state.game.toggleSpeedLimit(e)}},{key:"changeFPS",value:function(e){(e=Math.floor(e))<0||e>60||(this.state.game.setFPS(e),this.setState({gameFPS:e}))}},{key:"refreshPlots",value:function(){this.refreshXPlot(),this.refreshYPlot()}},{key:"refreshXPlot",value:function(){var e=new Map,t=0,n=0,a=this.state.game.getAgentXs(),i=!0,o=!1,r=void 0;try{for(var s,l=a[Symbol.iterator]();!(i=(s=l.next()).done);i=!0){var h=s.value;h>t&&(t=h),h<n&&(n=h),e.has(h)?e.set(h,e.get(h)+1):e.set(h,1)}}catch(f){o=!0,r=f}finally{try{i||null==l.return||l.return()}finally{if(o)throw r}}for(var u=t>-n?t:-n,c=[],m=[],d=-u;d<=u;d++){c.push(d);var g=e.has(d)?e.get(d):0;m.push(g)}this.setState({xPlotXs:c,xPlotYs:m})}},{key:"refreshYPlot",value:function(){var e=new Map,t=0,n=0,a=this.state.game.getAgentYs(),i=!0,o=!1,r=void 0;try{for(var s,l=a[Symbol.iterator]();!(i=(s=l.next()).done);i=!0){var h=s.value;h>t&&(t=h),h<n&&(n=h),e.has(h)?e.set(h,e.get(h)+1):e.set(h,1)}}catch(f){o=!0,r=f}finally{try{i||null==l.return||l.return()}finally{if(o)throw r}}for(var u=t>-n?t:-n,c=[],m=[],d=-u;d<=u;d++){c.push(d);var g=e.has(d)?e.get(d):0;m.push(g)}this.setState({yPlotXs:m,yPlotYs:c})}}]),t}(a.Component);function A(e){var t=e.renderXPlot,n=e.renderYPlot;return i.a.createElement("div",{className:"container"},i.a.createElement("button",{onClick:function(){return e.refreshPlots()},style:{width:120,height:65,backgroundColor:"red"}},"DEV-refresh-plot"),t&&i.a.createElement(F,{xPlotXs:e.xPlotXs,xPlotYs:e.xPlotYs}),n&&i.a.createElement(I,{yPlotXs:e.yPlotXs,yPlotYs:e.yPlotYs}))}function Y(){return i.a.createElement("div",{id:"gamecanvasdiv"})}function X(){return i.a.createElement("div",{className:"solocontainer"},i.a.createElement("div",null,i.a.createElement(B,null),i.a.createElement(J,null),i.a.createElement(T,{renderXPlot:!1,renderYPlot:!1}),i.a.createElement(N,null)))}function L(){return i.a.createElement("div",null,i.a.createElement("div",null,i.a.createElement(T,{renderXPlot:!0,renderYPlot:!1,gameAgents:15,gameScale:8})),i.a.createElement("div",{className:"container"},i.a.createElement(D,null)))}function j(){return i.a.createElement("div",null,i.a.createElement("div",{className:"container"},i.a.createElement("p",null,"This is page 3")),i.a.createElement("div",null,i.a.createElement(T,{renderXPlot:!0,renderYPlot:!0,gameAgents:1500,gameScale:4})))}function B(){return i.a.createElement("div",{className:"solocontainer"},i.a.createElement("div",{id:"introtext"},i.a.createElement("h1",null,"The Walking Johnnie"),i.a.createElement("p",null,"Johnnies are little dark dots."),i.a.createElement("p",null,"They like to move around."),i.a.createElement("p",null,"They leave a colorful trail behind.")))}function J(){return i.a.createElement("div",{className:"textcontent"},i.a.createElement("p",null,"A Walking Johnnie will move either up, down, left or right with an equal one out of four propability for each direction. It will never stand still."),i.a.createElement("p",null,"Below is one randomly moving Johnnie wandering around in a box. Try unpausing him using the speed controls below!"))}function N(){return i.a.createElement("div",{className:"textcontent"},i.a.createElement("p",null,"Where did your Johnnie walk to? Do you think there is any point in trying to guess that beforehand? How likely is it for the johnnie to return to its starting position?"),i.a.createElement("br",null),i.a.createElement("p",null,"If we forget the up-down movement for a second, how will the Johhnie move? When it moves up or down, it doesn't move left or right. So when ignoring vertical moves, our meningful options are moving left or moving right."),i.a.createElement("p",null,"Imagine fipping a coin and moving the Johnnie left on heads and right on tails. Then, for the Johnnie to be back at the center, you would have to flip exactly the same amount of heads as tails. Five heads and seven tails would place the Johnnie two steps right from the center. Getting to ten squares west in only ten steps would translate to flipping a coin and it landing on heads ten times in a row."),i.a.createElement("p",null,"You might think that the Johnnie would not move far from the center. After all, there is an equal chance of moving left and moving right. Surely the walking dark dot will undo each upward movement with a downward movement, at least on average?"))}function D(){return i.a.createElement("div",{className:"regularsize placeholder container"},i.a.createElement("p",null,"placeholder content"))}var M=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(h.a)(this,Object(u.a)(t).call(this,e))).state={page:1},n}return Object(c.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this,t=null;return 1===this.state.page?t=i.a.createElement(X,null):2===this.state.page?t=i.a.createElement(L,null):3===this.state.page&&(t=i.a.createElement(j,null)),i.a.createElement("div",{className:"App"},i.a.createElement("button",{onClick:function(){return e.setState({page:1})},style:{width:120,height:65,backgroundColor:"red"}},"DEV-test-button page1"),i.a.createElement("button",{onClick:function(){return e.setState({page:2})},style:{width:120,height:65,backgroundColor:"red"}},"DEV-test-button page2"),i.a.createElement("button",{onClick:function(){return e.setState({page:3})},style:{width:120,height:65,backgroundColor:"red"}},"DEV-test-button page3"),t)}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(M,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[10,1,2]]]);
//# sourceMappingURL=main.9927e194.chunk.js.map