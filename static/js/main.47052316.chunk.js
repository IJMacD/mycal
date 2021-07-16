(this.webpackJsonpmycal=this.webpackJsonpmycal||[]).push([[0],{10:function(e,t,n){},11:function(e,t,n){},13:function(e,t,n){"use strict";n.r(t);var a=n(1),i=n.n(a),r=n(4),c=n.n(r),s=(n(10),n(2)),o=(n(11),n(5));new function e(){Object(o.a)(this,e),this.epoch=2444238.5,this.ecliptic_longitude_epoch=278.83354,this.ecliptic_longitude_perigee=282.596403,this.eccentricity=.016718,this.sun_smaxis=149585e3,this.sun_angular_size_smaxis=.533128,this.moon_mean_longitude_epoch=64.975464,this.moon_mean_perigee_epoch=349.383063,this.node_mean_longitude_epoch=151.950429,this.moon_inclination=5.145396,this.moon_eccentricity=.0549,this.moon_angular_size=.5181,this.moon_smaxis=384401,this.moon_parallax=.9507,this.synodic_month=29.53058868,this.lunations_base=2423436,this.earth_radius=6378.16};function l(e,t){var n=Object(a.useState)((function(){var n=localStorage.getItem(e);if(n)try{return JSON.parse(n)}catch(a){}return t instanceof Function?t():t})),i=Object(s.a)(n,2),r=i[0],c=i[1];return[r,Object(a.useCallback)((function(t){localStorage.setItem(e,JSON.stringify(t)),c(t)}),[e])]}var u=n(0),h={english:["Monday","Tuesday","Wedensday","Thursday","Friday","Sauturday","Sunday"],norse:["Moon day","Tiw's day","Woden's day","Thor's day","Freya's day","Sauturn's day","Sun day"],french:["lundi","mardi","mercredi","jeudi","vendredi","samedi","dimanche"],planets:["Moon","Mars","Mercury","Jupiter","Venus","Saturn","Sun"],latin:["di\u0113s L\u016bnae","di\u0113s M\u0101rtis","di\u0113s Mercuri\u012b","di\u0113s Iovis","di\u0113s Veneris","di\u0113s S\u0101turn\u012b","di\u0113s S\u014dlis"],japanese:["\u6708","\u706b","\u6c34","\u6728","\u91d1","\u571f","\u65e5"],astronomical:["\u263d\ufe0e","\u2642","\u263f","\u2643","\u2640","\u2644","\u2609"],babylonian:["Sin","Nergal","Nabu","Marduk","Ishtar","Shabattu","Shamash"],greek:["\u1f21\u03bc\u03ad\u03c1\u1fb1 \u03a3\u03b5\u03bb\u03ae\u03bd\u03b7\u03c2","\u1f21\u03bc\u03ad\u03c1\u1fb1 \u1f0c\u03c1\u03b5\u03c9\u03c2","\u1f21\u03bc\u03ad\u03c1\u1fb1 \u1f19\u03c1\u03bc\u03bf\u1fe6","\u1f21\u03bc\u03ad\u03c1\u1fb1 \u0394\u03b9\u03cc\u03c2","\u1f21\u03bc\u03ad\u03c1\u1fb1 \u1f08\u03c6\u03c1\u03bf\u03b4\u1fd1\u0301\u03c4\u03b7\u03c2","\u1f21\u03bc\u03ad\u03c1\u1fb1 \u039a\u03c1\u03cc\u03bd\u03bf\u03c5","\u1f21\u03bc\u03ad\u03c1\u1fb1 \u1f29\u03bb\u03af\u03bf\u03c5"],hebrew:["\u05e9\u05e0\u05d9","\u05e9\u05dc\u05d9\u05e9\u05d9","\u05e8\u05d1\u05d9\u05e2\u05d9","\u05d7\u05de\u05d9\u05e9\u05d9","\u05e9\u05d9\u05e9\u05d9","\u05e9\u05d1\u05ea","\u05e8\u05d0\u05e9\u05d5\u05df"]};var d=function(){var e=l("mycal.holocene",!0),t=Object(s.a)(e,2),n=t[0],a=t[1],i=l("mycal.dayname","english"),r=Object(s.a)(i,2),c=r[0],o=r[1],d=l("mycal.julianAtNoon",!1),g=Object(s.a)(d,2),b=g[0],p=g[1],v=l("mycal.monthBands",!1),O=Object(s.a)(v,2),m=O[0],x=O[1],y=function(e,t){for(var n=[],a=0;a<t;a++){for(var i=[],r=0;r<7;r++)i.push(new Date(e)),e.setDate(e.getDate()+1);n.push(i)}return n}(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Date;return new Date(e.getFullYear(),e.getMonth(),e.getDate()-e.getDay()+1)}(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Date;return new Date(e.getFullYear(),e.getMonth())}()),100),f={fontSize:"0.5em"},D=h[c]||[];function M(e){var t=new Date,n=t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth(),a=e.getMonth()%2;return"Day ".concat(n?"Day-CurrentMonth":""," ").concat(a?"Day-MonthEven":"Day-MonthOdd")}return Object(u.jsxs)("div",{className:"App",children:[Object(u.jsxs)("div",{className:"App-Options",children:[Object(u.jsxs)("label",{children:[Object(u.jsx)("span",{children:"Year"})," ",Object(u.jsxs)("select",{value:n?"1":"0",onChange:function(e){return a("1"===e.target.value)},style:{fontSize:"1em"},children:[Object(u.jsx)("option",{value:"0",children:"Gregorian"}),Object(u.jsx)("option",{value:"1",children:"Holocene Era"})]})]}),Object(u.jsxs)("label",{children:[Object(u.jsx)("span",{children:"Day Names"})," ",Object(u.jsxs)("select",{value:c,onChange:function(e){return o(e.target.value)},style:{fontSize:"1em"},children:[Object(u.jsx)("option",{value:"english",children:"English"}),Object(u.jsx)("option",{value:"norse",children:"Norse"}),Object(u.jsx)("option",{value:"planets",children:"Planets"}),Object(u.jsx)("option",{value:"french",children:"French"}),Object(u.jsx)("option",{value:"latin",children:"Latin"}),Object(u.jsx)("option",{value:"japanese",children:"Japanese"}),Object(u.jsx)("option",{value:"astronomical",children:"Astronomical"}),Object(u.jsx)("option",{value:"babylonian",children:"Babylonian"}),Object(u.jsx)("option",{value:"greek",children:"Greek"}),Object(u.jsx)("option",{value:"hebrew",children:"Hebrew"})]})]}),Object(u.jsxs)("label",{children:[Object(u.jsx)("span",{children:"Julian"})," ",Object(u.jsxs)("select",{value:b?"1":"0",onChange:function(e){return p("1"===e.target.value)},style:{fontSize:"1em"},children:[Object(u.jsx)("option",{value:"0",children:"At Midnight"}),Object(u.jsx)("option",{value:"1",children:"From Noon"})]})]}),Object(u.jsxs)("label",{children:[Object(u.jsx)("span",{children:"Month Bands"})," ",Object(u.jsx)("input",{type:"checkbox",checked:m,onChange:function(e){return x(e.target.checked)}})]})]}),Object(u.jsxs)("table",{className:m?"MonthBands":"",children:[Object(u.jsx)("thead",{children:Object(u.jsxs)("tr",{children:[Object(u.jsx)("th",{}),D.map((function(e,t){return Object(u.jsx)("th",{style:f,children:e},t)})),Object(u.jsx)("th",{})]})}),Object(u.jsx)("tbody",{children:y.map((function(e,t){var a=e.some((function(e){return 1===e.getDate()})),i=Date.now()>=+e[0]&&Date.now()<+e[0]+6048e5,r=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Date,t=new Date(e),n=(e.getDay()+6)%7;t.setDate(t.getDate()-n+3);var a=+t;t.setMonth(0,1),4!==t.getDay()&&t.setMonth(0,1+(4-t.getDay()+7)%7);return 1+Math.ceil((a-+t)/6048e5)}(e[0]);return Object(u.jsxs)("tr",{className:i?"Week Week-Current":"Week",children:[Object(u.jsxs)("th",{style:{textAlign:"right"},children:[(1===r||0===t)&&(n?1e4:0)+e[6].getFullYear()+"-","W",r]}),e.map((function(e){return Object(u.jsx)("td",{className:M(e),children:Object(u.jsx)(j,{date:e,julianAtNoon:b})},+e)})),Object(u.jsx)("th",{className:M(e[6]),children:a&&e[6].getMonth()+1})]},+e[0])}))})]})]})};function j(e){var t=e.date,n=e.julianAtNoon,a=void 0!==n&&n,i={padding:"0.5em",margin:"0.25em",border:"1px solid #CCC",background:+t===+function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Date;return new Date(e.getFullYear(),e.getMonth(),e.getDate())}()?"#FFFFCC":"transparent",position:"relative"};return Object(u.jsxs)("div",{style:i,children:[t.getDate(),Object(u.jsx)("div",{style:{position:"absolute",top:0,right:"0.25em",lineHeight:"0.5em"},children:Object(u.jsx)(g,{date:t})}),Object(u.jsx)("span",{style:{fontSize:"0.5em",display:"block"},children:b(t)+(a?1:0)})]})}function g(e){var t=e.date,n=p(t),a="\xa0",i="";return v(t,n[0])?(a="\ud83c\udf11",i=O(n[0])):v(t,n[1])?(a="\ud83c\udf13",i=O(n[1])):v(t,n[2])?(a="\ud83c\udf15",i=O(n[2])):v(t,n[3])?(a="\ud83c\udf17",i=O(n[3])):v(t,n[4])&&(a="\ud83c\udf11",i=O(n[4])),Object(u.jsx)("span",{style:{fontSize:"0.5em"},title:i,children:a})}function b(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Date,t=e.getUTCFullYear(),n=e.getUTCMonth()+1,a=e.getUTCDate();n<3&&(t--,n+=12);var i=t/100|0,r=i/4|0,c=2-i+r,s=365.25*(t+4716)|0,o=30.6001*(n+1)|0,l=e.getUTCHours(),u=l<12?1:0;return c+a+s+o-1524-u}function p(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Date,t=(b(e)-2451545)/36525,n=29.5305888531+2.1621e-7*t-3.64e-10*t*t,a=86400*n*1e3,i=new Date("2021-01-13T05:00:00Z"),r=+e-+i,c=r/a|0,s=new Date(+i+c*a),o=new Date(+s+1/4*a),l=new Date(+s+.5*a),u=new Date(+s+3/4*a),h=new Date(+s+a);return[s,o,l,u,h]}function v(e,t){return e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate()}function O(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Date;return"".concat(e.getHours().toString().padStart(2,"0"),":").concat(e.getMinutes().toString().padStart(2,"0"))}var m=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,14)).then((function(t){var n=t.getCLS,a=t.getFID,i=t.getFCP,r=t.getLCP,c=t.getTTFB;n(e),a(e),i(e),r(e),c(e)}))};c.a.render(Object(u.jsx)(i.a.StrictMode,{children:Object(u.jsx)(d,{})}),document.getElementById("root")),m()}},[[13,1,2]]]);
//# sourceMappingURL=main.47052316.chunk.js.map