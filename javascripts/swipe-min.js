require(["esri/map","esri/layers/ArcGISTiledMapServiceLayer","dojo/dom","dojo/on","dojo/dom-class","dojo/domReady!"],function(b,j,p,h,g){map1=new b("map1",{basemap:"topo",center:[100.69828872684525,33.24237112174851],zoom:4,sliderStyle:"small"});var q=new j("http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",{id:"toplayer"});var l=map1.id+"_toplayer";var i=null;map1.addLayer(q);var k=false;var c=false;h(p.byId("verticalswipe"),"click",function(){k=!k});h(p.byId("horizontalswipe"),"click",function(){c=!c});h(q,"load",function(){h(map1,"mouse-move",function(B){i=i?i:document.getElementById(map1.id+"_toplayer");var z=B.screenPoint.x;var y=B.screenPoint.y;var t=i.style.height;var D=i.style.width;var w=parseInt(t.substring(0,t.lastIndexOf("px")));var C=parseInt(D.substring(0,D.lastIndexOf("px")));var E=r(i);var v=-E.y+"px";var A=-E.x+"px";var u,x;u=c?(y-E.y)+"px":(w-E.y)+"px";clipright=k?(z-E.x)+"px":(C-E.x)+"px";console.log("rect("+v+","+clipright+","+u+","+A+")");i.style.clip="rect("+v+","+clipright+","+u+","+A+")"})});function r(z){var w,y,v=z.style;if(v["-webkit-transform"]){var A=v["-webkit-transform"];var u=A.replace(/translate\(|px|\s|\)/,"").split(",");w=parseInt(u[0]);y=parseInt(u[1])}else{if(v.transform){var t=v.transform;var x=t.replace(/px|\s|translate3d\(|px|\)/g,"").split(",");w=parseInt(x[0]);y=parseInt(x[1])}else{w=parseInt(z.style.left.replace("px",""));y=parseInt(z.style.top.replace("px",""))}}return{x:w,y:y}}var s=new b("map2",{basemap:"topo",center:[100.69828872684525,33.24237112174851],zoom:4,sliderStyle:"small"});var d=new j("http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",{id:"toplayer"});var o=s.id+"_toplayer";var m=null;s.addLayer(d);var e=false;var f=false;h(p.byId("verticalswipeanim"),"click",function(){e=!e});h(p.byId("horizontalswipeanim"),"click",function(){f=!f});var n=false;function a(v,F){m=m?m:document.getElementById(v);var t=m.style.height;var D=m.style.width;var x=parseInt(t.substring(0,t.lastIndexOf("px")));var B=parseInt(D.substring(0,D.lastIndexOf("px")));var E=r(m);var w=-E.y+"px";var z=-E.x+"px";var u,y;u=(x-E.y)+"px";clipright=(B-E.x)+"px";m.style["-webkit-transition"]="none";m.style["-moz-transition"]="none";m.style.transition="none";if(F){var C=e?z:clipright;var A=f?w:u;m.style.clip="rect("+w+","+C+","+A+","+z+")";setTimeout(function(){n=true;m.style["-webkit-transition"]="all 2s ease-in";m.style["-moz-transition"]="all 2s ease-in";m.style.transition="all 2s ease-in";m.style.clip="rect("+w+","+clipright+","+u+","+z+")"},10)}else{m.style.clip="rect("+w+","+clipright+","+u+","+z+")";setTimeout(function(){n=false;u=f?w:u;clipright=e?z:clipright;m.style["-webkit-transition"]="all 2s ease-in";m.style["-moz-transition"]="all 2s ease-in";m.style.transition="all 2s ease-in";m.style.clip="rect("+w+","+clipright+","+u+","+z+")"},10)}}h(p.byId("showbt"),"click",function(){a(o,false)});h(p.byId("hidebt"),"click",function(){a(o,true)});h(s,"mouse-drag-start",function(){m.style["-webkit-transition"]="inherit";m.style["-moz-transition"]="inherit";m.style.transition="inherit";m.style.clip=n?"inherit":"rect(0px,0px,0px,0px)"})});