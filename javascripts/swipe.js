require(["esri/map","esri/layers/ArcGISTiledMapServiceLayer", "dojo/dom","dojo/on","dojo/dom-class","dojo/domReady!"], function(Map,ArcGISTiledMapServiceLayer,dom,on,domClass) {
        var  map1 = new Map("map1", {
          basemap: "topo",
          center: [-122.45,37.75], // long, lat
          zoom: 8,
          sliderStyle: "small"
        });
   var map1toplayer=new ArcGISTiledMapServiceLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',{id:'toplayer'});//渲染之后的div的 id为 map_toplayer 即是 map div的 id+加下划线+图层layer

   var  map1toplayerid=map1.id+'_toplayer';
   var map1toplayerdiv=null;
   map1.addLayer(map1toplayer);
   var isverticalswipe=false;
   var ishorizontalswipe=false; 
   on(dom.byId('verticalswipe'),"click",function(){
     isverticalswipe=!isverticalswipe;
   });
 on(dom.byId('horizontalswipe'),"click",function(){
      ishorizontalswipe=!ishorizontalswipe;
   });
//因为地图在缩放或者平移过程中，承载layer的 div会发生水平或者垂直方向的transform。所以计算出来
on( map1toplayer,'load',function(){
  on(map1,'mouse-move',function(e){ 
     map1toplayerdiv=map1toplayerdiv?map1toplayerdiv:document.getElementById(map1.id+'_toplayer');  
  var  offsetX=e.screenPoint.x;
  var  offsetY=e.screenPoint.y;
  var  mapheightpx=map1toplayerdiv.style.height;
  var  mapwidthpx=map1toplayerdiv.style.width;
  var  mapheight=parseInt(mapheightpx.substring(0,mapheightpx.lastIndexOf('px')));//去掉单位px 取出数值
  var  mapwidth=parseInt(mapwidthpx.substring(0,mapwidthpx.lastIndexOf('px'))); 
  var  origin=getLayerTransform(map1toplayerdiv);
  var  cliptop=-origin.y+"px"; 
  var  clipleft=-origin.x+"px";//clip的左上起点
  var clipbottom,cliplright;   
      clipbottom=ishorizontalswipe?(offsetY-origin.y)+'px':(mapheight-origin.y)+'px';
      clipright=isverticalswipe?(offsetX-origin.x)+"px":(mapwidth-origin.x)+"px";
      console.log('rect('+cliptop+','+clipright+','+clipbottom+','+clipleft+')');
      map1toplayerdiv.style.clip='rect('+cliptop+','+clipright+','+clipbottom+','+clipleft+')';
  });
})

//获取图层右上角的坐标
function getLayerTransform(layer) {
   // var layer = document.getElementById(layerid);
   
    var xorigin, yorigin, layerstyle = layer.style;
//chrome
    if (layerstyle['-webkit-transform']) {
        var s = layerstyle['-webkit-transform'];//格式为"translate(0px, 0px)"
        var xyarray = s.replace(/translate\(|px|\s|\)/, '').split(',');
        xorigin = parseInt(xyarray[0]);
        yorigin = parseInt(xyarray[1]);
    }
//firefox
    else if (layerstyle['transform']) {
        //layer.style['transform'] 格式为"translate3d(xpx,ypx,zpx)" 这样的字符串，现在通过匹配转为[z,y,z]的数组,分别将 px,translate3d,空格
        // var xyzarray=layerstyle.replace(/px/g,'').replace(/ /g,'').replace('translate3d(','').replace(')','').split(',')
        var layertransforstring=layerstyle['transform'];
        var xyz = layertransforstring.replace(/px|\s|translate3d\(|px|\)/g, '').split(',');
        xorigin = parseInt(xyz[0]);
        yorigin = parseInt(xyz[1]);
    }
//ie 8+
    else {
        xorigin = parseInt(layer.style.left.replace('px', ''));
        yorigin = parseInt(layer.style.top.replace('px', ''));
    }
    return {
        x: xorigin,
        y: yorigin
    }
}
//
//
///
///
///
///下面的代码是针对的第二个Map  动画实现主要是结合css3中的 transition 请查阅相关资料
///
///
///
var  map2 = new Map("map2", {
          basemap: "topo",
          center: [-122.45,37.75], // long, lat
          zoom: 8,
          sliderStyle: "small"
        });
var map2toplayer=new ArcGISTiledMapServiceLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',{id:'toplayer'});//渲染之后的div的 id为 map_toplayer 即是 map div的 id+加下划线+图层layer
   var  map12toplayerid=map2.id+'_toplayer';
   var  map2toplayerdiv=null;
   map2.addLayer(map2toplayer);

var isverticalswipeanim=false;
var ishorizontalswipeanim=false;
  on(dom.byId('verticalswipeanim'),"click",function(){
     isverticalswipeanim=!isverticalswipeanim;
   });
 on(dom.byId('horizontalswipeanim'),"click",function(){
      ishorizontalswipeanim=!ishorizontalswipeanim;
   });
function startanima(layerid,show){
  map2toplayerdiv=map2toplayerdiv?map2toplayerdiv:document.getElementById(layerid);
  var mapheightpx=map2toplayerdiv.style.height;
  var mapwidthpx=map2toplayerdiv.style.width;
  var mapheight=parseInt(mapheightpx.substring(0,mapheightpx.lastIndexOf('px')));//去掉单位px 取出数值
  var  mapwidth=parseInt(mapwidthpx.substring(0,mapwidthpx.lastIndexOf('px'))); 
  var origin=getLayerTransform(map2toplayerdiv);
 var  cliptop=-origin.y+"px"; 
  var clipleft=-origin.x+"px";//clip的左上起点
  var clipbottom,cliplright;   
      clipbottom=(mapheight-origin.y)+'px';
      clipright=(mapwidth-origin.x)+"px";
        map2toplayerdiv.style['-webkit-transition']= 'none';//取消动画
        map2toplayerdiv.style['-moz-transition']= 'none';
        map2toplayerdiv.style['transition']= 'none';
        if(show){ 
          var clipleft1= isverticalswipeanim?clipleft:clipright;
          var clipbottom1=ishorizontalswipeanim?cliptop:clipbottom
          map2toplayerdiv.style.clip='rect('+cliptop+','+clipleft1+','+clipbottom1+','+clipleft+')';
           setTimeout(function(){
          map2toplayerdiv.style['-webkit-transition']= 'all 2s ease-in';
          map2toplayerdiv.style['-moz-transition']= 'all 2s ease-in' ;
          map2toplayerdiv.style['transition']= 'all 2s ease-in'  ;  
          map2toplayerdiv.style.clip='rect('+cliptop+','+clipright+','+clipbottom+','+clipleft+')';
        }, 10)}
        else
        {

          map2toplayerdiv.style.clip='rect('+cliptop+','+clipright+','+clipbottom+','+clipleft+')';
       setTimeout(function(){
          clipbottom=ishorizontalswipeanim?cliptop:clipbottom;
          clipright=isverticalswipeanim?clipleft:clipright;
          map2toplayerdiv.style['-webkit-transition']= 'all 2s ease-in';
          map2toplayerdiv.style['-moz-transition']= 'all 2s ease-in'
          map2toplayerdiv.style['transition']= 'all 2s ease-in'        
          map2toplayerdiv.style.clip='rect('+cliptop+','+clipright+','+clipbottom+','+clipleft+')';
        }, 10);
        }
       
     
}
on(dom.byId('showbt'),'click',function(){
  startanima(map12toplayerid,false);
})
on(dom.byId('hidebt'),'click',function(){
  startanima(map12toplayerid,true);
})


});