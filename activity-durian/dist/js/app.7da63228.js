(function(e){function t(t){for(var r,o,i=t[0],u=t[1],f=t[2],l=0,s=[];l<i.length;l++)o=i[l],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&s.push(a[o][0]),a[o]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);d&&d(t);while(s.length)s.shift()();return c.push.apply(c,f||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],r=!0,o=1;o<n.length;o++){var i=n[o];0!==a[i]&&(r=!1)}r&&(c.splice(t--,1),e=u(u.s=n[0]))}return e}var r={},o={app:0},a={app:0},c=[];function i(e){return u.p+"js/"+({}[e]||e)+"."+{"chunk-00bf0b44":"78154bc7","chunk-05006504":"e7195eaf","chunk-05413bd2":"7d55e23b","chunk-09cfbd79":"3f40fd14","chunk-530aa010":"69b953b5","chunk-d269734c":"bb0d1332"}[e]+".js"}function u(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n={"chunk-00bf0b44":1,"chunk-05006504":1,"chunk-d269734c":1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-00bf0b44":"501bef5c","chunk-05006504":"05c1d09d","chunk-05413bd2":"31d6cfe0","chunk-09cfbd79":"31d6cfe0","chunk-530aa010":"31d6cfe0","chunk-d269734c":"62781fb7"}[e]+".css",a=u.p+r,c=document.getElementsByTagName("link"),i=0;i<c.length;i++){var f=c[i],l=f.getAttribute("data-href")||f.getAttribute("href");if("stylesheet"===f.rel&&(l===r||l===a))return t()}var s=document.getElementsByTagName("style");for(i=0;i<s.length;i++){f=s[i],l=f.getAttribute("data-href");if(l===r||l===a)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var r=t&&t.target&&t.target.src||a,c=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=r,delete o[e],d.parentNode.removeChild(d),n(c)},d.href=a;var p=document.getElementsByTagName("head")[0];p.appendChild(d)})).then((function(){o[e]=0})));var r=a[e];if(0!==r)if(r)t.push(r[2]);else{var c=new Promise((function(t,n){r=a[e]=[t,n]}));t.push(r[2]=c);var f,l=document.createElement("script");l.charset="utf-8",l.timeout=120,u.nc&&l.setAttribute("nonce",u.nc),l.src=i(e);var s=new Error;f=function(t){l.onerror=l.onload=null,clearTimeout(d);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;s.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",s.name="ChunkLoadError",s.type=r,s.request=o,n[1](s)}a[e]=void 0}};var d=setTimeout((function(){f({type:"timeout",target:l})}),12e4);l.onerror=l.onload=f,document.head.appendChild(l)}return Promise.all(t)},u.m=e,u.c=r,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(n,r,function(t){return e[t]}.bind(null,r));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/",u.oe=function(e){throw console.error(e),e};var f=window["webpackJsonp"]=window["webpackJsonp"]||[],l=f.push.bind(f);f.push=t,f=f.slice();for(var s=0;s<f.length;s++)t(f[s]);var d=l;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},2147:function(e,t,n){"use strict";function r(e){var t=(new Date).addDays(7),n=JSON.stringify({token:e,date:t});localStorage.setItem("token",n)}function o(){var e=localStorage.getItem("token");if(e){var t=JSON.parse(e),n=t.token,r=t.date,o=Date.parse(r),c=new Date;return c.getTime()>o?void a():n}}function a(){return localStorage.removeItem("token")}function c(e){localStorage.setItem("recomendId",e)}function i(){return localStorage.getItem("recomendId")}function u(e){localStorage.setItem("userInfo",JSON.stringify(e))}function f(e){localStorage.setItem("key",e)}function l(){return localStorage.getItem("key")}function s(e){localStorage.setItem("frist1",e)}function d(){return localStorage.getItem("frist1")}function p(e){localStorage.setItem("frist2",e)}function h(){return localStorage.getItem("frist2")}function g(e){localStorage.setItem("frist3",e)}function m(){return localStorage.getItem("frist3")}function v(e){localStorage.setItem("again",e)}function b(){return localStorage.getItem("again")}function y(e){localStorage.setItem("keydata",e)}function w(){return localStorage.getItem("keydata")}n.d(t,"n",(function(){return r})),n.d(t,"f",(function(){return o})),n.d(t,"a",(function(){return a})),n.d(t,"m",(function(){return c})),n.d(t,"e",(function(){return i})),n.d(t,"o",(function(){return u})),n.d(t,"k",(function(){return f})),n.d(t,"c",(function(){return l})),n.d(t,"p",(function(){return s})),n.d(t,"g",(function(){return d})),n.d(t,"q",(function(){return p})),n.d(t,"h",(function(){return h})),n.d(t,"r",(function(){return g})),n.d(t,"i",(function(){return m})),n.d(t,"j",(function(){return v})),n.d(t,"b",(function(){return b})),n.d(t,"l",(function(){return y})),n.d(t,"d",(function(){return w})),Date.prototype.addDays=function(e){var t=new Date(this.valueOf());return t.setDate(t.getDate()+e),t}},2395:function(e,t,n){},"3bda":function(e,t,n){(function(e){n("c975"),n("ac1f"),n("5319");var t=n("7037");(function(n,r){"use strict";"object"===t(e)&&"object"===t(e.exports)?e.exports=n.document?r(n,!0):function(e){if(!e.document)throw new Error("Geetest requires a window with a document");return r(e)}:r(n)})("undefined"!==typeof window?window:this,(function(e,n){"use strict";if("undefined"===typeof e)throw new Error("Geetest requires browser environment");var r=e.document,o=e.Math,a=r.getElementsByTagName("head")[0];function c(e){this._obj=e}function i(e){var t=this;new c(e)._each((function(e,n){t[e]=n}))}c.prototype={_each:function(e){var t=this._obj;for(var n in t)t.hasOwnProperty(n)&&e(n,t[n]);return this}},i.prototype={api_server:"api.geetest.com",protocol:"http://",type_path:"/gettype.php",fallback_config:{slide:{static_servers:["static.geetest.com","dn-staticdown.qbox.me"],type:"slide",slide:"/static/js/geetest.0.0.0.js"},fullpage:{static_servers:["static.geetest.com","dn-staticdown.qbox.me"],type:"fullpage",fullpage:"/static/js/fullpage.0.0.0.js"}},_get_fallback_config:function(){var e=this;return f(e.type)?e.fallback_config[e.type]:e.new_captcha?e.fallback_config.fullpage:e.fallback_config.slide},_extend:function(e){var t=this;new c(e)._each((function(e,n){t[e]=n}))}};var u=function(e){return"number"===typeof e},f=function(e){return"string"===typeof e},l=function(e){return"boolean"===typeof e},s=function(e){return"object"===t(e)&&null!==e},d=function(e){return"function"===typeof e},p={},h={},g=function(){return parseInt(1e4*o.random())+(new Date).valueOf()},m=function(e,t){var n=r.createElement("script");n.charset="UTF-8",n.async=!0,n.onerror=function(){t(!0)};var o=!1;n.onload=n.onreadystatechange=function(){o||n.readyState&&"loaded"!==n.readyState&&"complete"!==n.readyState||(o=!0,setTimeout((function(){t(!1)}),0))},n.src=e,a.appendChild(n)},v=function(e){return e.replace(/^https?:\/\/|\/$/g,"")},b=function(e){return e=e.replace(/\/+/g,"/"),0!==e.indexOf("/")&&(e="/"+e),e},y=function(e){if(!e)return"";var t="?";return new c(e)._each((function(e,n){(f(n)||u(n)||l(n))&&(t=t+encodeURIComponent(e)+"="+encodeURIComponent(n)+"&")})),"?"===t&&(t=""),t.replace(/&$/,"")},w=function(e,t,n,r){t=v(t);var o=b(n)+y(r);return t&&(o=e+t+o),o},k=function(e,t,n,r,o){var a=function a(c){var i=w(e,t[c],n,r);m(i,(function(e){e?c>=t.length-1?o(!0):a(c+1):o(!1)}))};a(0)},_=function(t,n,r,o){if(s(r.getLib))return r._extend(r.getLib),void o(r);if(r.offline)o(r._get_fallback_config());else{var a="geetest_"+g();e[a]=function(t){"success"===t.status?o(t.data):t.status?o(r._get_fallback_config()):o(t),e[a]=void 0;try{delete e[a]}catch(n){}},k(r.protocol,t,n,{gt:r.gt,callback:a},(function(e){e&&o(r._get_fallback_config())}))}},S=function(e,t){var n={networkError:"网络错误"};if("function"!==typeof t.onError)throw new Error(n[e]);t.onError(n[e])},j=function(){return!!e.Geetest};j()&&(h.slide="loaded");var I=function(t,n){var r=new i(t);t.https?r.protocol="https://":t.protocol||(r.protocol=e.location.protocol+"//"),_([r.api_server||r.apiserver],r.type_path,r,(function(t){var o=t.type,a=function(){r._extend(t),n(new e.Geetest(r))};p[o]=p[o]||[];var c=h[o]||"init";"init"===c?(h[o]="loading",p[o].push(a),k(r.protocol,t.static_servers||t.domains,t[o]||t.path,null,(function(e){if(e)h[o]="fail",S("networkError",r);else{h[o]="loaded";for(var t=p[o],n=0,a=t.length;n<a;n+=1){var c=t[n];d(c)&&c()}p[o]=[]}}))):"loaded"===c?a():"fail"===c?S("networkError",r):"loading"===c&&p[o].push(a)}))};return e.initGeetest=I,I}))}).call(this,n("62e4")(e))},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container",attrs:{id:"app"}},[n("router-view")],1)},a=[],c=(n("7c55"),n("2877")),i={},u=Object(c["a"])(i,o,a,!1,null,null,null),f=u.exports,l=n("8c4f"),s=n("2147"),d=(n("caad"),n("ac1f"),n("2532"),n("466d"),n("1276"),{isWeChatUrl:function(){var e=window.location.href,t=e.match(/\?/g);return!!t&&t.length>=2||/from=/.test(e)},getProjectUrl:function(){var e=window.location;return e.origin+e.pathname+e.hash},getRecomendId:function(){var e=window.location.href;if(e.includes("recomend_id")){var t=e.split("?recomend_id=")[1];return t}},getKey:function(){var e=window.location.href;if(e.includes("key")){var t=e.split("?key=")[1];return t}}});r["a"].use(l["a"]);var p=[{path:"/login",name:"Login",component:function(e){return n.e("chunk-05006504").then(function(){var t=[n("a55b")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/",name:"Home",component:function(e){return n.e("chunk-d269734c").then(function(){var t=[n("bb51")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/web",name:"Web",component:function(e){return n.e("chunk-05413bd2").then(function(){var t=[n("34fd")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/weixin",name:"weixin",component:function(e){return n.e("chunk-530aa010").then(function(){var t=[n("4cbc")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/rule",name:"rule",component:function(e){return n.e("chunk-09cfbd79").then(function(){var t=[n("2dd9")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/tips",name:"tips",component:function(e){return n.e("chunk-00bf0b44").then(function(){var t=[n("e710")];e.apply(null,t)}.bind(this)).catch(n.oe)}}],h=new l["a"]({routes:p});h.beforeEach((function(e,t,n){if(d.isWeChatUrl()&&(window.location.href=d.getProjectUrl()),d.getKey()){var r=d.getKey();Object(s["c"])()!=r&&Object(s["a"])()}var o=Object(s["e"])(),a=d.getKey();a&&Object(s["k"])(a),o||(o=d.getRecomendId(),o&&Object(s["m"])(o)),n()}));var g=h,m=n("bc3a"),v=n.n(m),b=!0,y={getFirstTimeEnter:function(){return b},setEnter:function(){b=!1}},w=n("5596"),k=n("2bb1"),_=n("e41f"),S=n("f600"),j=n("39d1"),I=n("ad06"),O=n("28a2");n("157a");r["a"].prototype.axios=v.a,n("3bda");var E=Object(s["f"])();E&&y.setEnter(),r["a"].prototype.$initGeet=initGeetest,r["a"].config.productionTip=!1,r["a"].use(w["a"]).use(k["a"]).use(_["a"]).use(S["a"]).use(j["a"]).use(I["a"]).use(O["a"]),new r["a"]({router:g,render:function(e){return e(f)}}).$mount("#app")},"7c55":function(e,t,n){"use strict";var r=n("2395"),o=n.n(r);o.a}});
//# sourceMappingURL=app.7da63228.js.map