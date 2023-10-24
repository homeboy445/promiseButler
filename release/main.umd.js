!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.promiseManager=t():e.promiseManager=t()}(self,(()=>(()=>{"use strict";var e={902:(e,t)=>{var o;Object.defineProperty(t,"__esModule",{value:!0}),t.FETCH_MODES=void 0,function(e){e.SEQUENTIAL="SEQUENTIAL",e.BATCHED="BATCHED",e.PIPELINING="PIPELINING",e.PARALLEL="PARALLEL"}(o||(t.FETCH_MODES=o={}))},732:function(e,t){var o=this&&this.__awaiter||function(e,t,o,r){return new(o||(o=Promise))((function(n,i){function s(e){try{u(r.next(e))}catch(e){i(e)}}function l(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?n(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(s,l)}u((r=r.apply(e,t||[])).next())}))},r=this&&this.__generator||function(e,t){var o,r,n,i,s={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return i={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function l(l){return function(u){return function(l){if(o)throw new TypeError("Generator is already executing.");for(;i&&(i=0,l[0]&&(s=0)),s;)try{if(o=1,r&&(n=2&l[0]?r.return:l[0]?r.throw||((n=r.return)&&n.call(r),0):r.next)&&!(n=n.call(r,l[1])).done)return n;switch(r=0,n&&(l=[2&l[0],n.value]),l[0]){case 0:case 1:n=l;break;case 4:return s.label++,{value:l[1],done:!1};case 5:s.label++,r=l[1],l=[0];continue;case 7:l=s.ops.pop(),s.trys.pop();continue;default:if(!((n=(n=s.trys).length>0&&n[n.length-1])||6!==l[0]&&2!==l[0])){s=0;continue}if(3===l[0]&&(!n||l[1]>n[0]&&l[1]<n[3])){s.label=l[1];break}if(6===l[0]&&s.label<n[1]){s.label=n[1],n=l;break}if(n&&s.label<n[2]){s.label=n[2],s.ops.push(l);break}n[2]&&s.ops.pop(),s.trys.pop();continue}l=t.call(e,s)}catch(e){l=[6,e],r=0}finally{o=n=0}if(5&l[0])throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}([l,u])}}};Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e){var t=e.batchSize,o=e.debugMode,r=e.batchWiseCallback;this.requestsArr=[],this.globalPromiseStore={promise:Promise.resolve(),pending:!1},this.BATCH_SIZE=6,this.batchWiseCallback=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t]},this.promiseResolvedStore={resolve:function(e){}},this.debugMode=!1,this.debugMode=null!=o?o:this.debugMode,this.BATCH_SIZE=null!=t?t:this.BATCH_SIZE,this.batchWiseCallback=null!=r?r:this.batchWiseCallback,this.log("Input params are: ",arguments)}return e.prototype.log=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this.debugMode&&console.log.apply(console,e)},e.prototype.processPromise=function(e,t){return o(this,void 0,void 0,(function(){var o=this;return r(this,(function(r){switch(r.label){case 0:return this.globalPromiseStore.pending?[4,this.globalPromiseStore.promise]:[3,2];case 1:return r.sent(),[2,this.processPromise(e,t)];case 2:return this.log("Adding the promise in the array! ",t),this.requestsArr.push(e().then((function(e){var r,n;o.promiseResolvedStore[t]=e,null===(n=null===(r=o.promiseResolvedStore)||void 0===r?void 0:r.resolve)||void 0===n||n.call(r,t)})).catch((function(e){return o.promiseResolvedStore[t]=e}))),this.requestsArr.length==this.BATCH_SIZE&&(this.globalPromiseStore={promise:Promise.all(this.requestsArr).then((function(){o.log("A batch got completed!"),o.batchWiseCallback(o.requestsArr),o.requestsArr=[],o.globalPromiseStore.pending=!1})),pending:!0}),[2]}}))}))},e.prototype.dispatch=function(e){return o(this,void 0,void 0,(function(){var t=this;return r(this,(function(o){switch(o.label){case 0:return this.globalPromiseStore.pending?[4,this.globalPromiseStore.promise]:[3,2];case 1:o.sent(),o.label=2;case 2:return[2,new Promise((function(o){t.promiseResolvedStore.resolve=function(r){t.log("The promise at index",r," is complete!"),e.length-1==r&&(t.log("All of the promises are resolved!"),delete t.promiseResolvedStore.resolve,o(Object.values(t.promiseResolvedStore)))},e.forEach(t.processPromise.bind(t))}))]}}))}))},e}();t.default=n},773:function(e,t){var o=this&&this.__awaiter||function(e,t,o,r){return new(o||(o=Promise))((function(n,i){function s(e){try{u(r.next(e))}catch(e){i(e)}}function l(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?n(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(s,l)}u((r=r.apply(e,t||[])).next())}))},r=this&&this.__generator||function(e,t){var o,r,n,i,s={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return i={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function l(l){return function(u){return function(l){if(o)throw new TypeError("Generator is already executing.");for(;i&&(i=0,l[0]&&(s=0)),s;)try{if(o=1,r&&(n=2&l[0]?r.return:l[0]?r.throw||((n=r.return)&&n.call(r),0):r.next)&&!(n=n.call(r,l[1])).done)return n;switch(r=0,n&&(l=[2&l[0],n.value]),l[0]){case 0:case 1:n=l;break;case 4:return s.label++,{value:l[1],done:!1};case 5:s.label++,r=l[1],l=[0];continue;case 7:l=s.ops.pop(),s.trys.pop();continue;default:if(!((n=(n=s.trys).length>0&&n[n.length-1])||6!==l[0]&&2!==l[0])){s=0;continue}if(3===l[0]&&(!n||l[1]>n[0]&&l[1]<n[3])){s.label=l[1];break}if(6===l[0]&&s.label<n[1]){s.label=n[1],n=l;break}if(n&&s.label<n[2]){s.label=n[2],s.ops.push(l);break}n[2]&&s.ops.pop(),s.trys.pop();continue}l=t.call(e,s)}catch(e){l=[6,e],r=0}finally{o=n=0}if(5&l[0])throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}([l,u])}}};Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e){var t=e.debugMode,o=e.slotSize;this.requestSlots={},this.SLOT_SIZE=6,this.requestCounter=0,this.globalPromiseStore={resolve:function(e){},reject:function(){},resolvedPromises:{}},this.promiseRequestStore={},this.debugMode=!1,this.debugMode=null!=t?t:this.debugMode,this.SLOT_SIZE=null!=o?o:this.SLOT_SIZE}return e.prototype.log=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this.debugMode&&console.log.apply(console,e)},e.prototype.executePromise=function(e,t){return o(this,void 0,void 0,(function(){var n,i,s,l,u,a=this;return r(this,(function(c){return n=e.next(),i=n.value,n.done||!i?[2,Promise.resolve()]:(s=i.promiseCallback,l=i.index,u="".concat(t,".").concat(++this.requestCounter),this.promiseRequestStore[u]=!1,this.log("Assigning the promise callback at index: ",l,", to slot: ",t),[2,this.requestSlots[t].then((function(){var e=s();return a.log("Outcome of the promise of index: ",l," ",e),e})).catch((function(e){return a.log("promise failed in slot: ",t),e})).then((function(n){return o(a,void 0,void 0,(function(){return r(this,(function(o){switch(o.label){case 0:return this.log("promise at index: ",l," is complete!"),delete this.promiseRequestStore[u],this.globalPromiseStore.resolvedPromises[l]=n,[4,this.executePromise(e,t)];case 1:return o.sent(),0===Object.keys(this.promiseRequestStore).length&&(this.globalPromiseStore.resolve(Object.values(this.globalPromiseStore.resolvedPromises)),this.promiseRequestStore={done:!0}),[2]}}))}))}))])}))}))},e.prototype.dispatch=function(e){return o(this,void 0,void 0,(function(){var t=this;return r(this,(function(o){return[2,new Promise((function(o,n){var i=function(){var t;return r(this,(function(o){switch(o.label){case 0:t=0,o.label=1;case 1:return t<e.length?[4,{promiseCallback:e[t],index:t}]:[3,4];case 2:o.sent(),o.label=3;case 3:return t++,[3,1];case 4:return[2]}}))}();t.globalPromiseStore={resolve:o,reject:n,resolvedPromises:{}};for(var s=0;s<t.SLOT_SIZE;s++)t.requestSlots[s]=Promise.resolve(),t.executePromise(i,s)}))]}))}))},e}();t.default=n},131:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e){var t,o=e.debugMode;this.requestPromise=Promise.resolve(),this.debugMode=!1,this.debugMode=null!==(t=this.debugMode)&&void 0!==t?t:o}return e.prototype.log=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this.debugMode&&console.log.apply(console,e)},e.prototype.dispatch=function(e){var t=this,o={},r=this;return new Promise((function(n){e.forEach((function(e,t){r.requestPromise=r.requestPromise.then((function(){return e().then((function(e){r.log("The promise of index: ",t," is successfull!"),o[t]=e})).catch((function(e){r.log("The promise of index: ",t," is failed!"),o[t]=e}))}))})),r.requestPromise=t.requestPromise.then((function(){r.log("The promise is complete!"),n(Object.values(o))}))}))},e}();t.default=o},607:function(e,t,o){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.getModeObject=void 0;const n=o(902),i=r(o(732)),s=r(o(773)),l=r(o(131));t.getModeObject=(e={debugMode:!1})=>({[n.FETCH_MODES.SEQUENTIAL]:()=>{const t=new l.default(e);return t.dispatch.bind(t)},[n.FETCH_MODES.BATCHED]:(t=6,o=((...e)=>{}))=>{const r=new i.default({...e,batchSize:t,batchWiseCallback:o});return r.dispatch.bind(r)},[n.FETCH_MODES.PIPELINING]:(t=6)=>{const o=new s.default({...e,slotSize:t});return o.dispatch.bind(o)}})}},t={};return function o(r){var n=t[r];if(void 0!==n)return n.exports;var i=t[r]={exports:{}};return e[r].call(i.exports,i,i.exports,o),i.exports}(607)})()));