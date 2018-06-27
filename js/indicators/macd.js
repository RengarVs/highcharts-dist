/*
  Highcharts JS v6.1.1 (2018-06-27)

 Indicator series type for Highstock

 (c) 2010-2017 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(m){"object"===typeof module&&module.exports?module.exports=m:m(Highcharts)})(function(m){(function(b){function m(e,b,g,k,a,c,d,p){e=0>d?g[k-1]:g[k-1][d];return[b[k-1],void 0===c?p:e*a+c*(1-a)]}var q=b.isArray;b=b.seriesType;b("ema","sma",{params:{index:0,period:14}},{getValues:function(e,b){var g=b.period,k=e.xData,a=(e=e.yData)?e.length:0,c=2/(g+1),d=0,p=0,u=[],r=[],h=[],f=-1,t=[],l;if(k.length<g)return!1;for(q(e[0])&&(f=b.index?b.index:0);d<g;)t.push([k[d],0>f?e[d]:e[d][f]]),p+=0>f?e[d]:
e[d][f],d++;b=p/g;for(g=d;g<a;g++)l=m(t,k,e,g,c,l,f,b),u.push(l),r.push(l[0]),h.push(l[1]),l=l[1],t.push([k[g],0>f?e[g]:e[g][f]]);l=m(t,k,e,g,c,l,f);u.push(l);r.push(l[0]);h.push(l[1]);return{values:u,xData:r,yData:h}}})})(m);(function(b){var m=b.seriesType,q=b.each,e=b.merge,n=b.defined,g=b.seriesTypes.sma,k=b.seriesTypes.ema;m("macd","sma",{params:{shortPeriod:12,longPeriod:26,signalPeriod:9,period:26},signalLine:{zones:[],styles:{lineWidth:1,lineColor:void 0}},macdLine:{zones:[],styles:{lineWidth:1,
lineColor:void 0}},threshold:0,groupPadding:.1,pointPadding:.1,states:{hover:{halo:{size:0}}},tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eValue: {point.MACD}\x3cbr/\x3eSignal: {point.signal}\x3cbr/\x3eHistogram: {point.y}\x3cbr/\x3e'},dataGrouping:{approximation:"averages"},minPointLength:0},{nameComponents:["longPeriod","shortPeriod","signalPeriod"],pointArrayMap:["y","signal","MACD"],parallelArrays:["x","y","signal",
"MACD"],pointValKey:"y",markerAttribs:b.noop,getColumnMetrics:b.seriesTypes.column.prototype.getColumnMetrics,crispCol:b.seriesTypes.column.prototype.crispCol,init:function(){g.prototype.init.apply(this,arguments);this.options=e({signalLine:{styles:{lineColor:this.color}},macdLine:{styles:{color:this.color}}},this.options);this.macdZones={zones:this.options.macdLine.zones,startIndex:0};this.signalZones={zones:this.macdZones.zones.concat(this.options.signalLine.zones),startIndex:this.macdZones.zones.length};
this.resetZones=!0},toYData:function(a){return[a.y,a.signal,a.MACD]},translate:function(){var a=this,c=["plotSignal","plotMACD"];b.seriesTypes.column.prototype.translate.apply(a);q(a.points,function(d){q([d.signal,d.MACD],function(p,b){null!==p&&(d[c[b]]=a.yAxis.toPixels(p,!0))})})},destroy:function(){this.graph=null;this.graphmacd=this.graphmacd.destroy();this.graphsignal=this.graphsignal.destroy();g.prototype.destroy.apply(this,arguments)},drawPoints:b.seriesTypes.column.prototype.drawPoints,drawGraph:function(){for(var a=
this,c=a.points,d=c.length,b=a.options,k=a.zones,r={options:{gapSize:b.gapSize}},h=[[],[]],f;d--;)f=c[d],n(f.plotMACD)&&h[0].push({plotX:f.plotX,plotY:f.plotMACD,isNull:!n(f.plotMACD)}),n(f.plotSignal)&&h[1].push({plotX:f.plotX,plotY:f.plotSignal,isNull:!n(f.plotMACD)});q(["macd","signal"],function(c,d){a.points=h[d];a.options=e(b[c+"Line"].styles,r);a.graph=a["graph"+c];a.currentLineZone=c+"Zones";a.zones=a[a.currentLineZone].zones;g.prototype.drawGraph.call(a);a["graph"+c]=a.graph});a.points=c;
a.options=b;a.zones=k;a.currentLineZone=null},getZonesGraphs:function(a){var c=g.prototype.getZonesGraphs.call(this,a),d=c;this.currentLineZone&&(d=c.splice(this[this.currentLineZone].startIndex+1),d.length?d.splice(0,0,a[0]):d=[a[0]]);return d},applyZones:function(){var a=this.zones;this.zones=this.signalZones.zones;g.prototype.applyZones.call(this);this.options.macdLine.zones.length&&this.graphmacd.hide();this.zones=a},getValues:function(a,c){var d=0,b=[],g=[],e=[],h,f;if(a.xData.length<c.longPeriod)return!1;
h=k.prototype.getValues(a,{period:c.shortPeriod});f=k.prototype.getValues(a,{period:c.longPeriod});h=h.values;f=f.values;for(a=1;a<=h.length;a++)n(f[a-1])&&n(f[a-1][1])&&n(h[a+c.shortPeriod+1])&&n(h[a+c.shortPeriod+1][0])&&b.push([h[a+c.shortPeriod+1][0],0,null,h[a+c.shortPeriod+1][1]-f[a-1][1]]);for(a=0;a<b.length;a++)g.push(b[a][0]),e.push([0,null,b[a][3]]);c=k.prototype.getValues({xData:g,yData:e},{period:c.signalPeriod,index:2});c=c.values;for(a=0;a<b.length;a++)b[a][0]>=c[0][0]&&(b[a][2]=c[d][1],
e[a]=[0,c[d][1],b[a][3]],null===b[a][3]?(b[a][1]=0,e[a][0]=0):(b[a][1]=b[a][3]-c[d][1],e[a][0]=b[a][3]-c[d][1]),d++);return{values:b,xData:g,yData:e}}})})(m)});