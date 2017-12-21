
//${TRANSCODEATSTART_BEGIN}
(function() {
//${TRANSCODEATSTART_END}


//${CONFIG_BEGIN}
var CFG_CD="";
var CFG_COMPILERVARS="PKGVERS=1.3.0";
var CFG_COMPILERVARS_IMPLEMENTED="1";
var CFG_CONFIG="release";
var CFG_EVENTCALLBACK_IMPLEMENTED="1";
var CFG_GRAPH2DDEVICE_IMPLEMENTED="1";
var CFG_HOST="winnt";
var CFG_LANG="js";
var CFG_MODPATH="";
var CFG_SAFEMODE="0";
var CFG_SYSTOOLS_IMPLEMENTED="1";
var CFG_TARGET="html5";
//${CONFIG_END}

//${METADATA_BEGIN}
var META_DATA="";
//${METADATA_END}

//${TRANSCODE_BEGIN}

// Javascript runtime.
//
// Placed into the public domain 24/02/2011.
// No warranty implied; use at your own risk.

//***** JavaScript Runtime *****

var D2R=0.017453292519943295;
var R2D=57.29577951308232;

var err_info="";
var err_stack=[];

var dbg_index=0;

function push_err(){
	err_stack.push( err_info );
}

function pop_err(){
	err_info=err_stack.pop();
}

function stackTrace(){
	if( !err_info.length ) return "";
	var str=err_info+"\n";
	for( var i=err_stack.length-1;i>0;--i ){
		str+=err_stack[i]+"\n";
	}
	return str;
}

function print( str ){
	var cons=document.getElementById( "GameConsole" );
	if( cons ){
		cons.value+=str+"\n";
		cons.scrollTop=cons.scrollHeight-cons.clientHeight;
	}else if( window.console!=undefined ){
		window.console.log( str );
	}
	return 0;
}

function alertError( err ){
	if( typeof(err)=="string" && err=="" ) return;
	alert( "Runtime Error : "+err.toString()+"\n\n"+stackTrace() );
}

function error( err ){
	throw err;
}

function debugLog( str ){
	if( window.console!=undefined ) window.console.log( str );
}

function debugStop(){
	debugger;	//	error( "STOP" );
}

function dbg_object( obj ){
	if( obj ) return obj;
	error( "Null object access" );
}

function dbg_charCodeAt( str,index ){
	if( index<0 || index>=str.length ) error( "Character index out of range" );
	return str.charCodeAt( index );
}

function dbg_array( arr,index ){
	if( index<0 || index>=arr.length ) error( "Array index out of range" );
	dbg_index=index;
	return arr;
}

function new_bool_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=false;
	return arr;
}

function new_number_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=0;
	return arr;
}

function new_string_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]='';
	return arr;
}

function new_array_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=[];
	return arr;
}

function new_object_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=null;
	return arr;
}

function resize_bool_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=false;
	return arr;
}

function resize_number_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=0;
	return arr;
}

function resize_string_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]="";
	return arr;
}

function resize_array_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=[];
	return arr;
}

function resize_object_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=null;
	return arr;
}

function string_compare( lhs,rhs ){
	var n=Math.min( lhs.length,rhs.length ),i,t;
	for( i=0;i<n;++i ){
		t=lhs.charCodeAt(i)-rhs.charCodeAt(i);
		if( t ) return t;
	}
	return lhs.length-rhs.length;
}

function string_replace( str,find,rep ){	//no unregex replace all?!?
	var i=0;
	for(;;){
		i=str.indexOf( find,i );
		if( i==-1 ) return str;
		str=str.substring( 0,i )+rep+str.substring( i+find.length );
		i+=rep.length;
	}
}

function string_trim( str ){
	var i=0,i2=str.length;
	while( i<i2 && str.charCodeAt(i)<=32 ) i+=1;
	while( i2>i && str.charCodeAt(i2-1)<=32 ) i2-=1;
	return str.slice( i,i2 );
}

function string_startswith( str,substr ){
	return substr.length<=str.length && str.slice(0,substr.length)==substr;
}

function string_endswith( str,substr ){
	return substr.length<=str.length && str.slice(str.length-substr.length,str.length)==substr;
}

function string_tochars( str ){
	var arr=new Array( str.length );
	for( var i=0;i<str.length;++i ) arr[i]=str.charCodeAt(i);
	return arr;
}

function string_fromchars( chars ){
	var str="",i;
	for( i=0;i<chars.length;++i ){
		str+=String.fromCharCode( chars[i] );
	}
	return str;
}

function object_downcast( obj,clas ){
	if( obj instanceof clas ) return obj;
	return null;
}

function object_implements( obj,iface ){
	if( obj && obj.implments && obj.implments[iface] ) return obj;
	return null;
}

function extend_class( clas ){
	var tmp=function(){};
	tmp.prototype=clas.prototype;
	return new tmp;
}

function ThrowableObject(){
}

ThrowableObject.prototype.toString=function(){ 
	return "Uncaught Exception"; 
}




function jsCompilerVarGetFromDefine(sDef, sKey) {   
	if (sDef.length === 0)
        return "";
        
   var iStartPos=0;
    
	for(;;){
        if (iStartPos>=sDef.length) 
            return "";
            
        var iKeySepPos=sDef.indexOf("=", iStartPos);
        if (iKeySepPos === -1) 
            return "";

        var iValSepPos=sDef.indexOf(";", iKeySepPos);
    
        var sFoundKey=sDef.slice(iStartPos,iKeySepPos);
        if (sFoundKey.length === 0) 
            return "";
                
        if (sFoundKey.toUpperCase()==sKey.toUpperCase()) {
            var sVal="";
            if (iValSepPos === -1) 
                sVal = sDef.slice(iKeySepPos+1);
            else
                sVal = sDef.slice(iKeySepPos+1, iValSepPos);
            return sVal;            
        }
        
        if (iValSepPos === -1) 
            return "";
        
        iStartPos = iValSepPos+1;
  	}
   return "";
}

function jsCompilerVarGet(sKey) {   
    if(!sKey || !(typeof sKey === 'string'))
        return "";

    if (typeof(CFG_COMPILERVARS) !== "undefined") {
       return jsCompilerVarGetFromDefine(CFG_COMPILERVARS, sKey);
    }
    
    if (typeof(CFG_DEFAULTCOMPILERVARS) !== "undefined") {
       return jsCompilerVarGetFromDefine(CFG_DEFAULTCOMPILERVARS, sKey);
    }

    return "";    
}


// get milliseconds  
function jsGetMilliseconds() {
    return new Date().getTime();
}

// get host+port
function jsGetHost() {
    return window.location.host;
}        

// loading string (sync) from a given url 
function jsLoadStringFromURL(url) {   
    if(!url || !(typeof url === 'string')){return ""};

	try{
    	var xhr=new XMLHttpRequest();
    	xhr.open( "GET", url, false );
    	
    	xhr.send( null );
    	
    	if( xhr.status==200 || xhr.status==0 ) return xhr.responseText;
	}catch(e){
        // catch any exception, ignore it and return empty string
    }    
    
	
	return "";
}

// Ursprünglich Module mojo.graphics
// aber hier vereinfacht/reduziert


// check http://www.w3schools.com/tags/ref_canvas.asp 
//   and http://chimera.labs.oreilly.com/books/1234000001654/ch05.html
//       http://www.mobtowers.com/html5-canvas-crisp-lines-every-time/
//       http://www.html5rocks.com/de/tutorials/canvas/performance/
//
// drawing donuts
//   see http://hmkcode.com/html5-canvas-draw-donut-chart/
//
/*
            var X = 180;
            var Y = 180;
            var outterRadius = 150;
            var innerRadius = 110;
 
            // 1. get a reference to myCanvas element.
            var c = document.getElementById("myCanvas");
             
            // 2. get canvas context
            var context = c.getContext("2d");
             
            // 3. draw donut chart
             
            // RED
            setRadialGradient("#DC1C29", "#B7161B");
            drawDonut(Math.PI * 0.32, Math.PI * 0.5);
             
            // GREEN
            setRadialGradient("#84BC3D", "#5B8829");
            drawDonut(Math.PI*0.5 , Math.PI* 1.5);
             
            // BLUE
            setRadialGradient("#27A1D4", "#2182AD");
            drawDonut(Math.PI * 1.5, Math.PI*2);
             
            // YELLOW
            setRadialGradient("#ECCF2D", "#F1C433");
            drawDonut(0, Math.PI*.32);
             
            //-------------------------------------------
            // drawDonut() function drawes 2 full or partial circles inside each other one clockwise and the other is counter-clockwise
            function drawDonut(sRadian, eRadian){
                 
                context.beginPath();
                    context.arc(X, Y, outterRadius, sRadian, eRadian, false); // Outer: CCW
                    context.arc(X, Y, innerRadius, eRadian, sRadian, true); // Inner: CW
                context.closePath();
                 
                // add shadow
                addShadow();
                                 
                context.fill();
            }
             
            function addShadow(){
                context.shadowColor = "#333";
                context.shadowBlur = 5;
                context.shadowOffsetX = 0;
                context.shadowOffsetY = 0;
            }
             
            function setRadialGradient(sgc, bgc){
                var grd = context.createRadialGradient(X, Y, innerRadius + 5, X, Y, outterRadius);
                grd.addColorStop(0,sgc);
                grd.addColorStop(1,bgc);
                context.fillStyle = grd;
            }
*/


function Graphic2DDevice(){
    this.canvas=null;
    this.id=null;
    this.width=0;
    this.height=0;
    this.gc=null;
    
    this.r=255;
    this.b=255;
    this.g=255;
    this.lw=1;
    this.lc="butt";
    this.lj="miter";
    this.ldsz=0;
    this.font="12px";
    this.fontsize=12;
    this.color="rgb(255,255,255)"
    this.alpha=1;    
    this.blend="source-over";
    this.ix=1;this.iy=0;
    this.jx=0;this.jy=1;
    this.tx=0;this.ty=0;
    this.tformed=false;
    this.scissorX=0;
    this.scissorY=0;
    this.scissorWidth=0;
    this.scissorHeight=0;
    this.clipped=false;
    this.speclinehandling=true;
}

Graphic2DDevice.prototype.BindToElementID=function( id ){
    this.id             = id;
    this.canvas         = document.getElementById( id );
    var scaleFactor    = window.devicePixelRatio || 1;   
    var displayWidth    = Math.floor(this.canvas.clientWidth  * scaleFactor);
    var displayHeight   = Math.floor(this.canvas.clientHeight * scaleFactor);
    this.canvas.width   = displayWidth;
    this.canvas.height  = displayHeight;
    this.width          = displayWidth;
    this.height         = displayHeight;
    this.gc=this.canvas.getContext( '2d' );
}

Graphic2DDevice.prototype.IsValid=function(){
    if( !this.canvas )
        return false;
    if( !this.gc )
       return false;
    if ( !document.getElementById( this.id )) 
        return false;
    return true;
}
    
Graphic2DDevice.prototype.Release=function(){
    this.canvas=null;
    this.gc=null;
}

Graphic2DDevice.prototype.BeginRender=function(){
    if( !this.canvas )
       return 0;
    this.width=this.canvas.width;
    this.height=this.canvas.height;
    if( !this.gc )
       return 0;
    this.gc.save();
    return 1;
}

Graphic2DDevice.prototype.EndRender=function(){
    if( this.gc ) this.gc.restore();
}

Graphic2DDevice.prototype.Width=function(){
    return this.width;
}

Graphic2DDevice.prototype.Height=function(){
    return this.height;
}

Graphic2DDevice.prototype.SetAlpha=function( alpha ){
    this.alpha=alpha;
    this.gc.globalAlpha=alpha;
}

Graphic2DDevice.prototype.SetColor=function( r,g,b ){
    this.r=r;
    this.g=g;
    this.b=b;
    this.color="rgb("+(r|0)+","+(g|0)+","+(b|0)+")";
    this.gc.fillStyle=this.color;
    this.gc.strokeStyle=this.color;
}

Graphic2DDevice.prototype.SetLineWidth=function( w ){
    this.lw=w;
    this.gc.lineWidth=w;
}

Graphic2DDevice.prototype.SetLineCap=function( c ){
    switch(c) {
    case 1:
        this.lc="round";
        break;
    default:
        this.lc="butt";
        break;    
    }
    this.gc.lineCap=this.lc;
}

Graphic2DDevice.prototype.SetLineJoin=function( j ){
    switch(j) {
    case 1:
        this.lj="round";
        break;
    case 2:
        this.lj="bevel";
        break;
    default:
        this.lj="miter";
        break;    
    }
    this.gc.lineJoin=this.lj;
}

Graphic2DDevice.prototype.SetBlend=function( blend ){
    switch( blend ){
    case 1:
        this.blend="lighter";
        break;
    case 2:
        this.blend="xor";
        break;
    default:
        this.blend="source-over";
    }
    this.gc.globalCompositeOperation=this.blend;
}

Graphic2DDevice.prototype.SetLineDash=function(sz){
    this.ldsz=sz;
    if ( this.gc.setLineDash ) {
       if (sz===0) {
          this.gc.setLineDash([1,0]);
       }
       else {
          this.gc.setLineDash([sz]);
       }
    }
}

Graphic2DDevice.prototype.SetScissor=function( x,y,w,h ){
    this.scissorX=x;
    this.scissorY=y;
    this.scissorWidth=w;
    this.scissorHeight=h;
    this.clipped=(x!=0 || y!=0 || w!=this.canvas.width || h!=this.canvas.height);
    this.gc.restore();
    this.gc.save();
    if( this.clipped ){
        this.gc.beginPath();
        this.gc.rect( x,y,w,h );
        this.gc.clip();
        this.gc.closePath();
    }
    this.gc.fillStyle=this.color;
    this.gc.strokeStyle=this.color;    
    this.gc.globalAlpha=this.alpha;    
    this.gc.globalCompositeOperation=this.blend;
    if( this.tformed ) this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
}

Graphic2DDevice.prototype.SetMatrix=function( ix,iy,jx,jy,tx,ty ){
    this.ix=ix;this.iy=iy;
    this.jx=jx;this.jy=jy;
    this.tx=tx;this.ty=ty;
    this.gc.setTransform( ix,iy,jx,jy,tx,ty );
    this.tformed=(ix!=1 || iy!=0 || jx!=0 || jy!=1 || tx!=0 || ty!=0);
}

Graphic2DDevice.prototype.Clear=function( r,g,b ){
    if( this.tformed ) this.gc.setTransform( 1,0,0,1,0,0 );
    this.gc.fillStyle="rgb("+(r|0)+","+(g|0)+","+(b|0)+")";
    this.gc.globalAlpha=1;
    this.gc.globalCompositeOperation="source-over";
    this.gc.fillRect( 0,0,this.canvas.width,this.canvas.height );
    this.gc.fillStyle=this.color;
    this.gc.globalAlpha=this.alpha;
    this.gc.globalCompositeOperation=this.blend;
    if( this.tformed ) this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
}

Graphic2DDevice.prototype.DrawPoint=function( x,y ){
    /*if( this.tformed ){
        var px=x;
        x=px * this.ix + y * this.jx + this.tx;
        y=px * this.iy + y * this.jy + this.ty;
        this.gc.setTransform( 1,0,0,1,0,0 );
        this.gc.fillRect( x,y,1,1 );
        this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
    }else*/
    {
        this.gc.fillRect( x,y,1,1 );
    }
}

Graphic2DDevice.prototype.DrawRect=function( x,y,w,h,f ){
    if( w<0 ){ x+=w;w=-w; }
    if( h<0 ){ y+=h;h=-h; }   
    if (f) {
        if( w<=0 || h<=0 ) return;
        this.gc.fillRect( x,y,w,h );
    } else {
        if ( this.speclinehandling ) {
            if( w<this.lw || h<this.lw) return;
            this.DrawLine(x, y, x+w, y );
            this.DrawLine(x+w-this.lw, y, x+w-this.lw, y+h );
            this.DrawLine(x+w-this.lw, y+h-this.lw, x, y+h-this.lw );
            this.DrawLine(x, y+h-this.lw, x, y );
        }else {
            if( w<=0 || h<=0 ) return;
            this.gc.strokeRect( x,y,w,h );
        }
    }
}

Graphic2DDevice.prototype.DrawLine=function( x1,y1,x2,y2 ){
    /*if( this.tformed ){
        var x1_t=x1 * this.ix + y1 * this.jx + this.tx;
        var y1_t=x1 * this.iy + y1 * this.jy + this.ty;
        var x2_t=x2 * this.ix + y2 * this.jx + this.tx;
        var y2_t=x2 * this.iy + y2 * this.jy + this.ty;
        this.gc.setTransform( 1,0,0,1,0,0 );
          this.gc.beginPath();
          this.gc.moveTo( x1_t,y1_t );
          this.gc.lineTo( x2_t,y2_t );
          this.gc.stroke();
          this.gc.closePath();
        this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
    }else*/
    {
        if (this.speclinehandling && (x1==x2 || y1==y2) && this.ldsz==0 ) {
            var w=x2-x1
            var h=y2-y1        
            if( w<0 ){ x1+=w;w=-w; }
            if( h<0 ){ y1+=h;h=-h; }
            if (w==0) {
                w = w + this.lw;
            }
            if (h==0) {
                h = h + this.lw;
            }
            if ( w<=0 || h<=0 ) return;
            this.gc.fillRect(x1, y1, w, h);
        } else {
              this.gc.beginPath();
              this.gc.moveTo( x1,y1 );
              this.gc.lineTo( x2,y2 );
              this.gc.stroke();
              this.gc.closePath();
        }
    }
}

Graphic2DDevice.prototype.DrawCurve=function(x1, y1, cpx, cpy, x2, y2) {
    this.gc.beginPath();
    this.gc.moveTo( x1,y1 );
    this.gc.quadraticCurveTo(cpx, cpy, x2, y2);
    this.gc.stroke();
    this.gc.closePath();
}


Graphic2DDevice.prototype.PieDrawingIsClockwise=function() {
   return true;
}


Graphic2DDevice.prototype.DrawPie=function(x, y, r, sDeg, eDeg, p, f) {
    var sRadian = (sDeg*Math.PI)/180;
    var eRadian = (eDeg*Math.PI)/180 + 0.00001;  // add some minimal fraction to overcom same end/start position
    
    this.gc.beginPath();

    if ( p>=1 && p<=99) {
        // donut
        var inner_r=r * (100-p) / 100;
        this.gc.arc(x, y, r,       sRadian, eRadian, true);   // Outer: ccw
        this.gc.arc(x, y, inner_r, eRadian, sRadian, false);  // Inner: cw
    }
    else {
        // pie
        this.gc.moveTo(x,y);
        this.gc.arc(x, y, r,       sRadian, eRadian, true);  // Outer: ccw
    }
    
    this.gc.closePath();    
    
    if (f) {
        this.gc.fill();
    }
    else {
        this.gc.stroke();
    }
}

Graphic2DDevice.prototype.DrawPoly=function( verts, f ){
    if( verts.length<2 ) return;   
    if (f || this.speclinehandling===false ) {
        this.gc.beginPath();
        this.gc.moveTo( verts[0],verts[1] );
        for( var i=2;i<verts.length;i+=2 ){
            this.gc.lineTo( verts[i],verts[i+1] );
        }
        if (f) {
             this.gc.fill();
        }
        else {
             this.gc.stroke();
        }
        this.gc.closePath();
    }
    else {
        for( var i=2;i<verts.length;i+=2 ){
            this.DrawLine(verts[i-2],verts[i-1], verts[i],verts[i+1])
        }
    }    
}

Graphic2DDevice.prototype.DrawOval=function( x,y,w,h,f ){
    if( w<0 ){ x+=w;w=-w; }
    if( h<0 ){ y+=h;h=-h; }
    if( w<=0 || h<=0 ) return;
    //
      var w2=w/2,h2=h/2;
    this.gc.save();
    this.gc.translate( x+w2,y+h2 );
    this.gc.scale( w2,h2 );
      this.gc.beginPath();
    this.gc.arc( 0,0,1,0,Math.PI*2,false );
      this.gc.closePath();
    this.gc.restore();
    if (f) {
      this.gc.fill();
    }
    else {
      this.gc.stroke();
    }
}

Graphic2DDevice.prototype.BeginPath=function() {
    this.gc.beginPath();
}
Graphic2DDevice.prototype.StrokePath=function(f) {
    if (f) {
       this.gc.fill();
    }
    else {
       this.gc.stroke();
    }
}
Graphic2DDevice.prototype.ClosePath=function() {
    this.gc.closePath();
}
Graphic2DDevice.prototype.MoveTo=function( x,y ){
    this.gc.moveTo(x, y);
}    
Graphic2DDevice.prototype.LineTo=function( x2,y2 ){
    this.gc.lineTo(x2, y2);
}    
Graphic2DDevice.prototype.CurveTo=function(cpx, cpy, x2, y2) {
    this.gc.quadraticCurveTo(cpx, cpy, x2, y2);
}


Graphic2DDevice.prototype.ReadPixels=function( pixels,x,y,width,height){

    var imgData=this.gc.getImageData( x,y,width,height );
    
    var p=imgData.data,i=0,j=0,px,py;
    
    for( py=0;py<height;++py ){
        for( px=0;px<width;++px ){
            pixels[j++]=(p[i+3]<<24)|(p[i]<<16)|(p[i+1]<<8)|p[i+2];
            i+=4;
        }
    }
}

Graphic2DDevice.prototype.WritePixels=function( pixels,x,y,width,height ){

    var imgData=this.gc.createImageData( width,height );

    var p=imgData.data,i=0,j=0,px,py,argb;
    
    for( py=0;py<height;++py ){
        for( px=0;px<width;++px ){
            argb=pixels[j++];
            p[i]=(argb>>16) & 0xff;
            p[i+1]=(argb>>8) & 0xff;
            p[i+2]=argb & 0xff;
            p[i+3]=(argb>>24) & 0xff;
            i+=4;
        }
    }
    
    this.gc.putImageData( imgData,x,y );
} 


Graphic2DDevice.prototype.SetFont=function( f, s, b ) {
    var scaleFactor    = window.devicePixelRatio || 1;   
    var sz = s * scaleFactor;
    if (b) {
        this.font="bold " + sz+"px " + f;
    }
    else {
        this.font=sz+"px " + f;
    }
    this.fontsize = sz;
    this.gc.font=this.font;
}

Graphic2DDevice.prototype.DrawText=function(s, x, y, atRight){
    if (atRight==true) {
        this.gc.textAlign="start"; 
    } else {
        this.gc.textAlign="end"; 
    }
    this.gc.textBaseline="top"; 
    this.gc.fillText(s,x,y);
}

Graphic2DDevice.prototype.GetTextWidth=function( s ){
    var tm = this.gc.measureText(s);    
    return tm.width;
}

Graphic2DDevice.prototype.GetFontHeight=function(){
    return this.fontsize;
}

Graphic2DDevice.prototype.GetFontDescentHeight=function(){
    // canvas text-height does not have an info about fontmetrics
    // so we asssume a FIX percentage of fontheight is the descent from baseline to bottom
    return this.fontsize * 0.19;
}




function EventCallback(){}
EventCallback.prototype.onMouse=function(ev,data,x,y){}
EventCallback.prototype.onTouch=function(ev,data,x,y){}
EventCallback.prototype.onResize=function(w,h){}



function EventType(){}
EventType.Click=4;
EventType.MouseDown=5;
EventType.MouseUp=6;
EventType.MouseMove=7;
EventType.TouchDown=8;
EventType.TouchUp=9;
EventType.TouchMove=10;
EventType.Resize=20;



function WindowsResizeEventDispatcher(){   
    this.timer_id=undefined;
    this.eventmap=[];
}
WindowsResizeEventDispatcher.prototype.register=function(event) {
    this.eventmap.push(event);
}
WindowsResizeEventDispatcher.prototype.remove=function(event) {
    var i = this.eventmap.indexOf(event);
    if(i != -1) {
        this.eventmap.splice(i, 1);
    }
}
WindowsResizeEventDispatcher.prototype.onResizeDelayed=function() {
    var resizeDispatcher = WindowsResizeEventDispatcherInstance.getInstance();

    if(resizeDispatcher.timer_id != undefined) {
        clearTimeout(resizeDispatcher.timer_id);
        resizeDispatcher.timer_id = undefined;
    }
    resizeDispatcher.timer_id = setTimeout(function() {
        resizeDispatcher.timer_id = undefined;       
        for (var index = 0; index < resizeDispatcher.eventmap.length; index++) {
            resizeDispatcher.eventmap[index].onResize();
        }        
    }, 50);
}                
WindowsResizeEventDispatcher.prototype.onResizeImmediate=function() {
    var resizeDispatcher = WindowsResizeEventDispatcherInstance.getInstance();
    for (var index = 0; index < resizeDispatcher.eventmap.length; index++) {
        resizeDispatcher.eventmap[index].onResize();
    };
}                
var WindowsResizeEventDispatcherInstance = (function () {
    var instance;
 
    function createInstance() {
        var object = new WindowsResizeEventDispatcher()   
        window.addEventListener("resize", object.onResizeImmediate);
        return object;
    }
 
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();


function BindEvents(){
    this.id=null;
    this.canvas=null;
    this.cb=null;
    this.old_onclick=null;
    this.old_onmousedown=null;
    this.old_onmouseup=null;
    this.old_onmousemove=null;
    this.old_onmouseleave=null;
    this.resizeInterval=null;
    this.resizeIntervalStep=0;
}

BindEvents.prototype.register=function(device, eventcb, mouseevents, touchevents, resizeevent){
    if(!device.canvas)
       return false;
    
    this.id=device.id;
    this.canvas=device.canvas;
    this.cb=eventcb;

    // store current listeners
    this.old_onclick       = this.canvas.onclick
    this.old_onmousedown   = this.canvas.onmousedown
    this.old_onmouseup     = this.canvas.onmouseup
    this.old_onmousemove   = this.canvas.onmousemove
    this.old_onmouseleave  = this.canvas.onmouseleave
       
    
    function hidePopups(e){
       // LOFweb special clean-up method to close popups
       if (typeof(Logismata) !== "undefined") {
          if (typeof(Logismata.Panels) !== "undefined") {
             if (Logismata.Panels.hidePopups) {
                 Logismata.Panels.hidePopups(e, false);
             }
          }
       }
    }
    function eatEvent(e){
        if( e.stopPropagation ){
            e.stopPropagation();
            e.preventDefault();
        }else{
            e.cancelBubble=true;
            e.returnValue=false;
        }
    }
    
    var thisBinding=this;
    
    function mouseX(e){
        var rect = thisBinding.canvas.getBoundingClientRect();
        var realToCSSPixels = window.devicePixelRatio || 1;
        return Math.floor((e.clientX - rect.left) * realToCSSPixels);
    }    
    function mouseY(e){
        var rect = thisBinding.canvas.getBoundingClientRect();
        var realToCSSPixels = window.devicePixelRatio || 1;
        return Math.floor((e.clientY - rect.top) * realToCSSPixels);
    }   
    if ( mouseevents === true ) {
        this.canvas.onclick=function(e)     { hidePopups(e); thisBinding.cb.onMouse(EventType.Click,     e.which, mouseX(e), mouseY(e)); eatEvent(e); }
        this.canvas.onmousedown=function(e) { hidePopups(e); thisBinding.cb.onMouse(EventType.MouseDown, e.which, mouseX(e), mouseY(e)); eatEvent(e); }
        this.canvas.onmouseup=function(e)   {                thisBinding.cb.onMouse(EventType.MouseUp,   e.which, mouseX(e), mouseY(e)); eatEvent(e); }
        this.canvas.onmousemove=function(e) {                thisBinding.cb.onMouse(EventType.MouseMove, 0,       mouseX(e), mouseY(e)); eatEvent(e); }
        this.canvas.onmouseleave=function(e){                thisBinding.cb.onMouse(EventType.MouseUp,   e.which, mouseX(e), mouseY(e)); eatEvent(e); }
    }
    
    if ( touchevents === true ) {
    }
    
    if ( resizeevent === true ) {
        var resizeDispatcher = WindowsResizeEventDispatcherInstance.getInstance();
        resizeDispatcher.register(this);
    }    
    return true;
}
BindEvents.prototype.onResize=function(){
    // many of today's browsers do not support Fifth Edition
    // so we must provide an implementation for older browsers
    // here is another standalone one
    if (!('bind' in Function.prototype)) {   
        Function.prototype.bind= function(owner) {
            var that= this;
            var args= Array.prototype.slice.call(arguments, 1);
            return function() {
                return that.apply(owner,
                    args.length===0? arguments : arguments.length===0? args :
                    args.concat(Array.prototype.slice.call(arguments, 0))
                );
            };
        };
    }
    
    // in some situation, we can't trust canvas clientwidth/clientheight, especially in 
    // situations where canvas is located in cascading tables with relative width
    // for that we call the resize n times wih some delays as interval
    
    var intervalDuration = 1000;
    var delay = 50;
    var steps = Math.min(100, Math.max(1,intervalDuration/delay));
    
    window.clearInterval(this.resizeInterval);
    this.resizeIntervalStep = steps;
    this.doResizeInterval();
    this.resizeInterval = window.setInterval(this.doResizeInterval.bind(this), delay);
}
BindEvents.prototype.doResizeInterval=function(){
    this.resizeIntervalStep = this.resizeIntervalStep - 1;
    if (this.resizeIntervalStep < 0 )  {
        //print("canvas id " + this.id + " onresize interval end");
        window.clearInterval(this.resizeInterval);
        return;
    }
        
    var realToCSSPixels = window.devicePixelRatio || 1;
    var displayWidth  = Math.floor(this.canvas.clientWidth  * realToCSSPixels);
    var displayHeight = Math.floor(this.canvas.clientHeight * realToCSSPixels);
    
    if (this.canvas.width  != displayWidth ||
        this.canvas.height != displayHeight) {
        
        //print("canvas id " + this.id + " onresize step " + this.resizeIntervalStep + "   new size: before=" + this.canvas.width + "  now="+displayWidth);
     
        this.canvas.width  = displayWidth;
        this.canvas.height = displayHeight;
        this.cb.onResize(this.canvas.width, this.canvas.height);
    }
}
BindEvents.prototype.ensureCorrectSize=function(){
    // in some situation, we can't trust canvas clientwidth/clientheight, even not on creation
    // therefore we use the onResize behaviour to ensure the correct canvas/drawing size
    this.onResize();
}
BindEvents.prototype.release=function(){
    var resizeDispatcher = WindowsResizeEventDispatcherInstance.getInstance();
    resizeDispatcher.remove(this);

    window.clearInterval(this.resizeInterval);

    // restore current listeners
    this.canvas.onclick       = this.old_onclick;
    this.canvas.onmousedown   = this.old_onmousedown;
    this.canvas.onmouseup     = this.old_onmouseup;
    this.canvas.onmousemove   = this.old_onmousemove;
    this.canvas.onmouseleave  = this.old_onmouseleave;

    this.id=null;
    this.canvas=null;
    this.cb=null;
    this.old_onclick=null;
    this.old_onmousedown=null;
    this.old_onmouseup=null;
    this.old_onmousemove=null;
    this.old_onmouseleave=null;
}

function c_API(){
	Object.call(this);
}
c_API.m_createGraph=function(t_id,t_data,t_bgcolor,t_mouseevents,t_resizeevent){
	var t_panel=c_GraphController.m_createPanel(t_id,t_data);
	t_panel.p_setBackground(c_Color.m_new2.call(new c_Color,t_bgcolor));
	t_panel.p_bindEvents(t_mouseevents,t_mouseevents,t_resizeevent);
	t_panel.p_draw();
}
c_API.m_redrawGraph=function(t_id){
	var t_panel=c_GraphController.m_getPanel(t_id);
	if(t_panel!=null){
		t_panel.p_redraw();
	}
}
c_API.m_releaseGraph=function(t_id){
	c_GraphController.m_releasePanel(t_id);
}
c_API.m_exportAsEMF=function(t_id,t_bRealSize){
	var t_panel=c_GraphController.m_getPanel(t_id);
	if(t_panel!=null){
		return t_panel.p_exportAsEMF(t_bRealSize);
	}
	var t_empty=[];
	return t_empty;
}
c_API.m_dumpAsEMF=function(t_id,t_bRealSize){
	var t_panel=c_GraphController.m_getPanel(t_id);
	if(t_panel!=null){
		return t_panel.p_dumpAsEMF(t_bRealSize);
	}
	return "";
}
c_API.m_initPrototypes=function(){
	var t_i=0;
	if(t_i==1){
		c_API.m_createGraph("","","",false,false);
		c_API.m_redrawGraph("");
		c_API.m_releaseGraph("");
		c_API.m_exportAsEMF("",false);
		c_API.m_dumpAsEMF("",false);
	}
}
function c_GraphPanel(){
	Object.call(this);
	this.m__graph=null;
	this.m__id="";
	this.m__draw=null;
	this.m__callback=null;
	this.m__data=null;
}
c_GraphPanel.prototype.p_release=function(){
	if(this.m__graph!=null){
		this.m__graph.p_release();
	}
	if(this.m__draw!=null){
		this.m__draw.p_release();
	}
	if(this.m__callback!=null){
		this.m__callback.release();
	}
	this.m__graph=null;
	this.m__draw=null;
	this.m__callback=null;
}
c_GraphPanel.m_new=function(){
	return this;
}
c_GraphPanel.prototype.p_setBackground=function(t_c){
	this.m__graph.p_setBackgroundColor(c_Color.m_white);
	this.m__data.m__options.m__BGColor=t_c;
}
c_GraphPanel.prototype.p_bindEvents=function(t_mouseevents,t_touchevents,t_resizeevent){
	this.m__callback=(c_GraphEventCallback.m_new.call(new c_GraphEventCallback,this.m__graph,this.m__draw));
	this.m__graph.p_bindEvents2(this.m__callback,t_mouseevents,t_touchevents,t_resizeevent);
}
c_GraphPanel.prototype.p_draw=function(){
	this.m__draw.p_draw2(this.m__graph);
	if(this.m__graph!=null){
		if(this.m__graph.m__bindevents!=null){
			this.m__graph.m__bindevents.ensureCorrectSize();
		}
	}
}
c_GraphPanel.prototype.p_redraw=function(){
	this.m__draw.p_redraw2(this.m__graph);
	if(this.m__graph!=null){
		if(this.m__graph.m__bindevents!=null){
			this.m__graph.m__bindevents.ensureCorrectSize();
		}
	}
}
c_GraphPanel.prototype.p_exportAsEMF=function(t_bRealSize){
	var t_g=null;
	t_g=c_Graph2DwithEMFExport.m_cloneFrom(this.m__graph,t_bRealSize);
	this.m__draw.p_redraw2(t_g);
	this.m__draw.p_redraw2(this.m__graph);
	var t_w=null;
	t_w=t_g.m__toemf.p_finish();
	var t_export=[];
	t_export=resize_number_array(t_export,t_w.m__len);
	for(var t_i=0;t_i<t_w.m__len;t_i=t_i+1){
		t_export[t_i]=t_w.m__buf[t_i];
	}
	t_w=null;
	t_g=null;
	return t_export;
}
c_GraphPanel.prototype.p_dumpAsEMF=function(t_bRealSize){
	var t_g=null;
	t_g=c_Graph2DwithEMFExport.m_cloneFrom(this.m__graph,t_bRealSize);
	this.m__draw.p_redraw2(t_g);
	this.m__draw.p_redraw2(this.m__graph);
	var t_w=null;
	t_w=t_g.m__toemf.p_finish();
	return t_g.m__toemf.p_dump();
}
function c_GraphController(){
	Object.call(this);
}
c_GraphController.m__panels=null;
c_GraphController.m_ceanupInvalidPanels=function(){
	var t_=c_GraphController.m__panels.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_p=t_.p_NextObject();
		if(t_p.m__graph.p_isValid()==false){
			c_GraphController.m__panels.p_Remove(t_p.m__id);
			t_p.p_release();
		}
	}
}
c_GraphController.m_getPanel=function(t_id){
	if(c_GraphController.m__panels.p_Contains(t_id)){
		return c_GraphController.m__panels.p_Get(t_id);
	}
	return null;
}
c_GraphController.m_releasePanel=function(t_id){
	var t_p=c_GraphController.m_getPanel(t_id);
	if(t_p!=null){
		c_GraphController.m__panels.p_Remove(t_id);
		t_p.p_release();
		t_p=null;
	}
}
c_GraphController.m_registerPanel=function(t_id){
	c_GraphController.m_releasePanel(t_id);
	var t_p=c_GraphPanel.m_new.call(new c_GraphPanel);
	t_p.m__id=t_id;
	c_GraphController.m__panels.p_Add(t_id,t_p);
	return t_p;
}
c_GraphController.m_createPanel=function(t_id,t_data){
	c_GraphController.m_ceanupInvalidPanels();
	var t_holder=c_GraphicHolder.m_new.call(new c_GraphicHolder);
	var t_p=c_GraphController.m_registerPanel(t_id);
	t_p.m__graph=c_Graph2D.m_new.call(new c_Graph2D);
	t_p.m__graph.p_bindToElementID(t_id);
	if(t_holder.p_setData(t_data)==false){
		t_p.m__data=c_GraphicData.m_new.call(new c_GraphicData);
		t_p.m__data.m__options=c_GraphicOptions.m_new.call(new c_GraphicOptions);
		t_p.m__draw=(c_DrawNoData.m_new.call(new c_DrawNoData));
	}else{
		t_p.m__data=object_downcast((t_holder.m__data.p_getObject(0)),c_GraphicData);
		t_p.m__draw=(c_DrawGraphicData.m_new.call(new c_DrawGraphicData,t_p.m__data));
	}
	return t_p;
}
function c_Map(){
	Object.call(this);
	this.m_root=null;
}
c_Map.m_new=function(){
	return this;
}
c_Map.prototype.p_Values=function(){
	return c_MapValues.m_new.call(new c_MapValues,this);
}
c_Map.prototype.p_FirstNode=function(){
	if(!((this.m_root)!=null)){
		return null;
	}
	var t_node=this.m_root;
	while((t_node.m_left)!=null){
		t_node=t_node.m_left;
	}
	return t_node;
}
c_Map.prototype.p_Compare=function(t_lhs,t_rhs){
}
c_Map.prototype.p_FindNode=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return t_node;
			}
		}
	}
	return t_node;
}
c_Map.prototype.p_RotateLeft=function(t_node){
	var t_child=t_node.m_right;
	t_node.m_right=t_child.m_left;
	if((t_child.m_left)!=null){
		t_child.m_left.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_left){
			t_node.m_parent.m_left=t_child;
		}else{
			t_node.m_parent.m_right=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_left=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map.prototype.p_RotateRight=function(t_node){
	var t_child=t_node.m_left;
	t_node.m_left=t_child.m_right;
	if((t_child.m_right)!=null){
		t_child.m_right.m_parent=t_node;
	}
	t_child.m_parent=t_node.m_parent;
	if((t_node.m_parent)!=null){
		if(t_node==t_node.m_parent.m_right){
			t_node.m_parent.m_right=t_child;
		}else{
			t_node.m_parent.m_left=t_child;
		}
	}else{
		this.m_root=t_child;
	}
	t_child.m_right=t_node;
	t_node.m_parent=t_child;
	return 0;
}
c_Map.prototype.p_DeleteFixup=function(t_node,t_parent){
	while(t_node!=this.m_root && (!((t_node)!=null) || t_node.m_color==1)){
		if(t_node==t_parent.m_left){
			var t_sib=t_parent.m_right;
			if(t_sib.m_color==-1){
				t_sib.m_color=1;
				t_parent.m_color=-1;
				this.p_RotateLeft(t_parent);
				t_sib=t_parent.m_right;
			}
			if((!((t_sib.m_left)!=null) || t_sib.m_left.m_color==1) && (!((t_sib.m_right)!=null) || t_sib.m_right.m_color==1)){
				t_sib.m_color=-1;
				t_node=t_parent;
				t_parent=t_parent.m_parent;
			}else{
				if(!((t_sib.m_right)!=null) || t_sib.m_right.m_color==1){
					t_sib.m_left.m_color=1;
					t_sib.m_color=-1;
					this.p_RotateRight(t_sib);
					t_sib=t_parent.m_right;
				}
				t_sib.m_color=t_parent.m_color;
				t_parent.m_color=1;
				t_sib.m_right.m_color=1;
				this.p_RotateLeft(t_parent);
				t_node=this.m_root;
			}
		}else{
			var t_sib2=t_parent.m_left;
			if(t_sib2.m_color==-1){
				t_sib2.m_color=1;
				t_parent.m_color=-1;
				this.p_RotateRight(t_parent);
				t_sib2=t_parent.m_left;
			}
			if((!((t_sib2.m_right)!=null) || t_sib2.m_right.m_color==1) && (!((t_sib2.m_left)!=null) || t_sib2.m_left.m_color==1)){
				t_sib2.m_color=-1;
				t_node=t_parent;
				t_parent=t_parent.m_parent;
			}else{
				if(!((t_sib2.m_left)!=null) || t_sib2.m_left.m_color==1){
					t_sib2.m_right.m_color=1;
					t_sib2.m_color=-1;
					this.p_RotateLeft(t_sib2);
					t_sib2=t_parent.m_left;
				}
				t_sib2.m_color=t_parent.m_color;
				t_parent.m_color=1;
				t_sib2.m_left.m_color=1;
				this.p_RotateRight(t_parent);
				t_node=this.m_root;
			}
		}
	}
	if((t_node)!=null){
		t_node.m_color=1;
	}
	return 0;
}
c_Map.prototype.p_RemoveNode=function(t_node){
	var t_splice=null;
	var t_child=null;
	if(!((t_node.m_left)!=null)){
		t_splice=t_node;
		t_child=t_node.m_right;
	}else{
		if(!((t_node.m_right)!=null)){
			t_splice=t_node;
			t_child=t_node.m_left;
		}else{
			t_splice=t_node.m_left;
			while((t_splice.m_right)!=null){
				t_splice=t_splice.m_right;
			}
			t_child=t_splice.m_left;
			t_node.m_key=t_splice.m_key;
			t_node.m_value=t_splice.m_value;
		}
	}
	var t_parent=t_splice.m_parent;
	if((t_child)!=null){
		t_child.m_parent=t_parent;
	}
	if(!((t_parent)!=null)){
		this.m_root=t_child;
		return 0;
	}
	if(t_splice==t_parent.m_left){
		t_parent.m_left=t_child;
	}else{
		t_parent.m_right=t_child;
	}
	if(t_splice.m_color==1){
		this.p_DeleteFixup(t_child,t_parent);
	}
	return 0;
}
c_Map.prototype.p_Remove=function(t_key){
	var t_node=this.p_FindNode(t_key);
	if(!((t_node)!=null)){
		return 0;
	}
	this.p_RemoveNode(t_node);
	return 1;
}
c_Map.prototype.p_Contains=function(t_key){
	return this.p_FindNode(t_key)!=null;
}
c_Map.prototype.p_Get=function(t_key){
	var t_node=this.p_FindNode(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return null;
}
c_Map.prototype.p_InsertFixup=function(t_node){
	while(((t_node.m_parent)!=null) && t_node.m_parent.m_color==-1 && ((t_node.m_parent.m_parent)!=null)){
		if(t_node.m_parent==t_node.m_parent.m_parent.m_left){
			var t_uncle=t_node.m_parent.m_parent.m_right;
			if(((t_uncle)!=null) && t_uncle.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle.m_color=1;
				t_uncle.m_parent.m_color=-1;
				t_node=t_uncle.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_right){
					t_node=t_node.m_parent;
					this.p_RotateLeft(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight(t_node.m_parent.m_parent);
			}
		}else{
			var t_uncle2=t_node.m_parent.m_parent.m_left;
			if(((t_uncle2)!=null) && t_uncle2.m_color==-1){
				t_node.m_parent.m_color=1;
				t_uncle2.m_color=1;
				t_uncle2.m_parent.m_color=-1;
				t_node=t_uncle2.m_parent;
			}else{
				if(t_node==t_node.m_parent.m_left){
					t_node=t_node.m_parent;
					this.p_RotateRight(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map.prototype.p_Add=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				return false;
			}
		}
	}
	t_node=c_Node.m_new.call(new c_Node,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
function c_StringMap(){
	c_Map.call(this);
}
c_StringMap.prototype=extend_class(c_Map);
c_StringMap.m_new=function(){
	c_Map.m_new.call(this);
	return this;
}
c_StringMap.prototype.p_Compare=function(t_lhs,t_rhs){
	return string_compare(t_lhs,t_rhs);
}
function c_MapValues(){
	Object.call(this);
	this.m_map=null;
}
c_MapValues.m_new=function(t_map){
	this.m_map=t_map;
	return this;
}
c_MapValues.m_new2=function(){
	return this;
}
c_MapValues.prototype.p_ObjectEnumerator=function(){
	return c_ValueEnumerator.m_new.call(new c_ValueEnumerator,this.m_map.p_FirstNode());
}
function c_ValueEnumerator(){
	Object.call(this);
	this.m_node=null;
}
c_ValueEnumerator.m_new=function(t_node){
	this.m_node=t_node;
	return this;
}
c_ValueEnumerator.m_new2=function(){
	return this;
}
c_ValueEnumerator.prototype.p_HasNext=function(){
	return this.m_node!=null;
}
c_ValueEnumerator.prototype.p_NextObject=function(){
	var t_t=this.m_node;
	this.m_node=this.m_node.p_NextNode();
	return t_t.m_value;
}
function c_Node(){
	Object.call(this);
	this.m_left=null;
	this.m_right=null;
	this.m_parent=null;
	this.m_value=null;
	this.m_key="";
	this.m_color=0;
}
c_Node.prototype.p_NextNode=function(){
	var t_node=null;
	if((this.m_right)!=null){
		t_node=this.m_right;
		while((t_node.m_left)!=null){
			t_node=t_node.m_left;
		}
		return t_node;
	}
	t_node=this;
	var t_parent=this.m_parent;
	while(((t_parent)!=null) && t_node==t_parent.m_right){
		t_node=t_parent;
		t_parent=t_parent.m_parent;
	}
	return t_parent;
}
c_Node.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node.m_new2=function(){
	return this;
}
function c_Graph2DBase(){
	Object.call(this);
	this.m__deviceWidth=.0;
	this.m__deviceHeight=.0;
}
c_Graph2DBase.m_new=function(){
	return this;
}
c_Graph2DBase.prototype.p_setColor=function(t_c){
}
c_Graph2DBase.prototype.p_setColor2=function(t_r,t_g,t_b){
}
c_Graph2DBase.prototype.p_setColor3=function(t_r,t_g,t_b,t_a){
}
c_Graph2DBase.prototype.p_setStroke=function(t_s){
}
c_Graph2DBase.prototype.p_setBlend=function(t_blend){
}
c_Graph2DBase.prototype.p_setFont=function(t_family,t_size,t_bold){
}
c_Graph2DBase.prototype.p_setFont2=function(t_f){
}
c_Graph2DBase.prototype.p_clear=function(t_c){
}
c_Graph2DBase.prototype.p_clear2=function(t_r,t_g,t_b){
}
c_Graph2DBase.prototype.p_clear3=function(){
}
c_Graph2DBase.prototype.p_getDeviceWidth=function(){
	return this.m__deviceWidth;
}
c_Graph2DBase.prototype.p_getDeviceHeight=function(){
	return this.m__deviceHeight;
}
c_Graph2DBase.prototype.p_setLineWidth=function(t_w){
}
c_Graph2DBase.prototype.p_drawLine=function(t_x1,t_y1,t_x2,t_y2){
}
c_Graph2DBase.prototype.p_drawLine2=function(t_pFrom,t_pTo){
}
c_Graph2DBase.prototype.p_drawCircle=function(t_x,t_y,t_r,t_filled){
}
c_Graph2DBase.prototype.p_drawCircle2=function(t_p,t_r,t_filled){
}
c_Graph2DBase.prototype.p_getFontHeight=function(){
	return 0.0;
}
c_Graph2DBase.prototype.p_getFontHeight2=function(t_font){
	return 0.0;
}
c_Graph2DBase.prototype.p_floatSize=function(t_percent,t_font){
	return t_percent*this.p_getFontHeight2(t_font)/100.0;
}
c_Graph2DBase.prototype.p_getTextWidth=function(t_s){
	return 0.0;
}
c_Graph2DBase.prototype.p_getTextWidth2=function(t_s,t_font){
	return 0.0;
}
c_Graph2DBase.prototype.p_drawText=function(t_s,t_x,t_y,t_atRight){
}
c_Graph2DBase.prototype.p_drawOval=function(t_x,t_y,t_w,t_h,t_filled){
}
c_Graph2DBase.prototype.p_drawOval2=function(t_r,t_filled){
}
c_Graph2DBase.prototype.p_drawRect=function(t_x,t_y,t_w,t_h,t_filled){
}
c_Graph2DBase.prototype.p_drawRect2=function(t_r,t_filled){
}
c_Graph2DBase.prototype.p_getMultiLineTextRect=function(t_text){
	var t_r=c_Rectangle.m_new2.call(new c_Rectangle);
	var t_slines=t_text.split("\\n");
	var t_lines=bb_math_Max(1,t_slines.length);
	var t_=t_slines;
	var t_2=0;
	while(t_2<t_.length){
		var t_s=t_[t_2];
		t_2=t_2+1;
		t_s=string_trim(t_s);
		t_r.m__w=bb_math_Max2(t_r.m__w,this.p_getTextWidth(t_s));
	}
	t_r.m__h=(t_lines)*this.p_getFontHeight();
	return t_r;
}
c_Graph2DBase.prototype.p_getMultiLineTextRect2=function(t_s,t_font){
	this.p_setFont2(t_font);
	return this.p_getMultiLineTextRect(t_s);
}
c_Graph2DBase.prototype.p_drawPoly=function(t_verts,t_filled){
}
c_Graph2DBase.prototype.p_drawPoly2=function(t_points,t_filled){
}
c_Graph2DBase.prototype.p_moveTo=function(t_x,t_y){
}
c_Graph2DBase.prototype.p_moveTo2=function(t_pTo){
}
c_Graph2DBase.prototype.p_lineTo=function(t_x2,t_y2){
}
c_Graph2DBase.prototype.p_lineTo2=function(t_pTo){
}
c_Graph2DBase.prototype.p_curveTo=function(t_cpx,t_cpy,t_x2,t_y2){
}
c_Graph2DBase.prototype.p_curveTo2=function(t_pCtrl,t_pTo){
}
c_Graph2DBase.prototype.p_beginPath=function(){
}
c_Graph2DBase.prototype.p_strokePath=function(t_f){
}
c_Graph2DBase.prototype.p_closePath=function(){
}
c_Graph2DBase.prototype.p_setLineDash=function(t_sz){
}
c_Graph2DBase.prototype.p_pieDrawingIsClockwise=function(){
	return true;
}
c_Graph2DBase.prototype.p_drawPie=function(t_x,t_y,t_r,t_sDeg,t_eDeg,t_p,t_filled){
}
c_Graph2DBase.prototype.p_getFontDescentHeight=function(){
	return 0.0;
}
c_Graph2DBase.prototype.p_getFontDescentHeight2=function(t_font){
	return 0.0;
}
function c_Graph2D(){
	c_Graph2DBase.call(this);
	this.m__device=null;
	this.m__bindevents=null;
	this.m__elementid="";
	this.m__background=c_Color.m_white;
	this.m__mapToGrid=true;
	this.m__ctx=c_Graph2DContext.m_new.call(new c_Graph2DContext);
	this.m__rendering=false;
}
c_Graph2D.prototype=extend_class(c_Graph2DBase);
c_Graph2D.prototype.p_isValid=function(){
	return this.m__device.IsValid();
}
c_Graph2D.prototype.p_release=function(){
	this.m__device.Release();
	this.m__device=null;
	if(this.m__bindevents!=null){
		this.m__bindevents.release();
		this.m__bindevents=null;
	}
}
c_Graph2D.m_new=function(){
	c_Graph2DBase.m_new.call(this);
	this.m__device=(new Graphic2DDevice);
	return this;
}
c_Graph2D.m_new2=function(t_device){
	c_Graph2DBase.m_new.call(this);
	this.m__device=t_device;
	this.m__deviceWidth=this.m__device.Width();
	this.m__deviceHeight=this.m__device.Height();
	return this;
}
c_Graph2D.prototype.p_bindToElementID=function(t_id){
	this.m__elementid=t_id;
	this.m__device.BindToElementID(t_id);
	this.m__deviceWidth=this.m__device.Width();
	this.m__deviceHeight=this.m__device.Height();
}
c_Graph2D.prototype.p_setBackgroundColor=function(t_c){
	this.m__background=t_c;
}
c_Graph2D.prototype.p_bindEvents2=function(t_cb,t_mouseevents,t_touchevents,t_resizeevent){
	this.m__bindevents=(new BindEvents);
	this.m__bindevents.register(this.m__device,t_cb,t_mouseevents,t_touchevents,t_resizeevent);
}
c_Graph2D.prototype.p_isRendering=function(){
	return this.m__rendering;
}
c_Graph2D.prototype.p_setColor=function(t_c){
	if(t_c!=null){
		this.m__ctx.m_col=t_c.p_clone();
		this.m__device.SetColor((t_c.m__r),(t_c.m__g),(t_c.m__b));
		this.m__device.SetAlpha(t_c.m__a);
	}
}
c_Graph2D.prototype.p_setColor2=function(t_r,t_g,t_b){
	this.m__ctx.m_col.p_set5(((t_r)|0),((t_g)|0),((t_b)|0));
	this.m__device.SetColor(t_r,t_g,t_b);
}
c_Graph2D.prototype.p_setColor3=function(t_r,t_g,t_b,t_a){
	this.m__device.SetColor(t_r,t_g,t_b);
	this.m__device.SetAlpha(t_a);
}
c_Graph2D.prototype.p_M=function(t_v){
	if(this.m__mapToGrid){
		return bb_utils_round(t_v);
	}
	return t_v;
}
c_Graph2D.prototype.p_setStroke=function(t_s){
	if(t_s!=null){
		this.m__ctx.m_stroke=t_s.p_clone();
		this.m__device.SetLineWidth(this.p_M(t_s.m__width));
		this.m__device.SetLineCap(t_s.m__cap);
		this.m__device.SetLineJoin(t_s.m__join);
	}
}
c_Graph2D.prototype.p_setBlend=function(t_blend){
	this.m__ctx.m_blend=t_blend;
	this.m__device.SetBlend(this.m__ctx.m_blend);
}
c_Graph2D.prototype.p_setFont=function(t_family,t_size,t_bold){
	this.m__ctx.m_font.m__fam=t_family;
	this.m__ctx.m_font.m__size=(t_size);
	this.m__ctx.m_font.m__bold=t_bold;
	this.m__device.SetFont(this.m__ctx.m_font.m__fam,((this.m__ctx.m_font.m__size)|0),this.m__ctx.m_font.m__bold);
}
c_Graph2D.prototype.p_setFont2=function(t_f){
	if(t_f!=null){
		this.m__ctx.m_font=t_f.p_clone();
		this.m__device.SetFont(this.m__ctx.m_font.m__fam,((this.m__ctx.m_font.m__size)|0),this.m__ctx.m_font.m__bold);
	}
}
c_Graph2D.prototype.p_setMatrix=function(t_m){
	this.m__ctx.m_matrix=t_m;
	this.m__ctx.m_matrix.m__dirty=true;
}
c_Graph2D.prototype.p_setScissor=function(t_x,t_y,t_width,t_height){
	this.m__ctx.m_scissor.p_set8(t_x,t_y,t_width,t_height);
	this.m__device.SetScissor(this.p_M(this.m__ctx.m_scissor.m__x),this.p_M(this.m__ctx.m_scissor.m__y),this.p_M(this.m__ctx.m_scissor.m__w),this.p_M(this.m__ctx.m_scissor.m__h));
}
c_Graph2D.prototype.p_setScissor2=function(t_rect){
	this.p_setScissor(t_rect.m__x,t_rect.m__y,t_rect.m__w,t_rect.m__h);
}
c_Graph2D.prototype.p_clear=function(t_c){
	if(t_c!=null){
		this.m__device.Clear((t_c.m__r),(t_c.m__g),(t_c.m__b));
	}else{
		this.m__device.Clear(255.0,255.0,255.0);
	}
}
c_Graph2D.prototype.p_clear2=function(t_r,t_g,t_b){
	this.m__device.Clear(t_r,t_g,t_b);
}
c_Graph2D.prototype.p_clear3=function(){
	this.m__device.Clear(255.0,255.0,255.0);
}
c_Graph2D.prototype.p_beginRender=function(t_bNewDrawing){
	if(this.m__rendering){
		return false;
	}
	if(this.m__device.BeginRender()==0){
		return false;
	}
	this.m__deviceWidth=this.m__device.Width();
	this.m__deviceHeight=this.m__device.Height();
	this.m__rendering=true;
	if(t_bNewDrawing){
		this.p_setColor(this.m__ctx.m_col);
		this.p_setStroke(this.m__ctx.m_stroke);
		this.p_setBlend(this.m__ctx.m_blend);
		this.p_setFont2(this.m__ctx.m_font);
		this.p_setMatrix(this.m__ctx.m_matrix);
		this.p_setScissor(0.0,0.0,this.m__deviceWidth,this.m__deviceHeight);
		this.p_clear(this.m__background);
	}
	return true;
}
c_Graph2D.prototype.p_setLineWidth=function(t_w){
	this.m__ctx.m_stroke.m__width=t_w;
	this.m__device.SetLineWidth(this.p_M(t_w));
}
c_Graph2D.prototype.p_updateMatrix=function(){
	if(this.m__ctx.m_matrix.m__dirty){
		this.m__device.SetMatrix(this.m__ctx.m_matrix.m__a,this.m__ctx.m_matrix.m__b,this.m__ctx.m_matrix.m__c,this.m__ctx.m_matrix.m__d,this.m__ctx.m_matrix.m__e,this.m__ctx.m_matrix.m__f);
		this.m__ctx.m_matrix.m__dirty=false;
	}
}
c_Graph2D.prototype.p_drawLine=function(t_x1,t_y1,t_x2,t_y2){
	this.p_updateMatrix();
	this.m__device.DrawLine(this.p_M(t_x1),this.p_M(t_y1),this.p_M(t_x2),this.p_M(t_y2));
}
c_Graph2D.prototype.p_drawLine2=function(t_pFrom,t_pTo){
	this.p_drawLine(t_pFrom.m__x,t_pFrom.m__y,t_pTo.m__x,t_pTo.m__y);
}
c_Graph2D.prototype.p_drawCircle=function(t_x,t_y,t_r,t_filled){
	this.p_updateMatrix();
	this.m__device.DrawOval(this.p_M(t_x-t_r),this.p_M(t_y-t_r),this.p_M(t_r*2.0),this.p_M(t_r*2.0),t_filled);
}
c_Graph2D.prototype.p_drawCircle2=function(t_p,t_r,t_filled){
	this.p_drawCircle(t_p.m__x,t_p.m__y,t_r,t_filled);
}
c_Graph2D.prototype.p_endRender=function(){
	if(this.m__rendering){
		this.m__rendering=false;
		this.m__device.EndRender();
	}
}
c_Graph2D.prototype.p_getFontHeight=function(){
	return this.m__device.GetFontHeight();
}
c_Graph2D.prototype.p_getFontHeight2=function(t_font){
	this.p_setFont2(t_font);
	return this.m__device.GetFontHeight();
}
c_Graph2D.prototype.p_drawRect=function(t_x,t_y,t_w,t_h,t_filled){
	this.p_updateMatrix();
	this.m__device.DrawRect(this.p_M(t_x),this.p_M(t_y),this.p_M(t_w),this.p_M(t_h),t_filled);
}
c_Graph2D.prototype.p_drawRect2=function(t_r,t_filled){
	this.p_drawRect(t_r.m__x,t_r.m__y,t_r.m__w,t_r.m__h,t_filled);
}
c_Graph2D.prototype.p_setLineDash=function(t_sz){
	this.m__device.SetLineDash(t_sz);
}
c_Graph2D.prototype.p_getTextWidth=function(t_s){
	return this.m__device.GetTextWidth(t_s);
}
c_Graph2D.prototype.p_getTextWidth2=function(t_s,t_font){
	this.p_setFont2(t_font);
	return this.m__device.GetTextWidth(t_s);
}
c_Graph2D.prototype.p_drawText=function(t_s,t_x,t_y,t_atRight){
	this.m__device.DrawText(t_s,this.p_M(t_x),this.p_M(t_y),t_atRight);
}
c_Graph2D.prototype.p_pieDrawingIsClockwise=function(){
	return this.m__device.PieDrawingIsClockwise();
}
c_Graph2D.prototype.p_drawPie=function(t_x,t_y,t_r,t_sDeg,t_eDeg,t_p,t_filled){
	this.p_updateMatrix();
	this.m__device.DrawPie(this.p_M(t_x),this.p_M(t_y),this.p_M(t_r),t_sDeg,t_eDeg,t_p,t_filled);
}
c_Graph2D.prototype.p_getFontDescentHeight=function(){
	return this.m__device.GetFontDescentHeight();
}
c_Graph2D.prototype.p_getFontDescentHeight2=function(t_font){
	this.p_setFont2(t_font);
	return this.m__device.GetFontDescentHeight();
}
c_Graph2D.prototype.p_drawPoly=function(t_verts,t_filled){
	this.p_updateMatrix();
	if(this.m__mapToGrid){
		var t_vertsInt=[];
		t_vertsInt=resize_number_array(t_vertsInt,t_verts.length);
		for(var t_i=0;t_i<t_verts.length;t_i=t_i+1){
			t_vertsInt[t_i]=this.p_M(t_verts[t_i]);
		}
		this.m__device.DrawPoly(t_vertsInt,t_filled);
	}else{
		this.m__device.DrawPoly(t_verts,t_filled);
	}
}
c_Graph2D.prototype.p_beginPath=function(){
	this.m__device.BeginPath();
}
c_Graph2D.prototype.p_strokePath=function(t_f){
	this.m__device.StrokePath(t_f);
}
c_Graph2D.prototype.p_closePath=function(){
	this.m__device.ClosePath();
}
c_Graph2D.prototype.p_moveTo=function(t_x,t_y){
	this.p_updateMatrix();
	this.m__device.MoveTo(this.p_M(t_x),this.p_M(t_y));
}
c_Graph2D.prototype.p_moveTo2=function(t_pTo){
	this.p_moveTo(t_pTo.m__x,t_pTo.m__y);
}
c_Graph2D.prototype.p_lineTo=function(t_x2,t_y2){
	this.p_updateMatrix();
	this.m__device.LineTo(this.p_M(t_x2),this.p_M(t_y2));
}
c_Graph2D.prototype.p_lineTo2=function(t_pTo){
	this.p_lineTo(t_pTo.m__x,t_pTo.m__y);
}
c_Graph2D.prototype.p_curveTo=function(t_cpx,t_cpy,t_x2,t_y2){
	this.p_updateMatrix();
	this.m__device.CurveTo(this.p_M(t_cpx),this.p_M(t_cpy),this.p_M(t_x2),this.p_M(t_y2));
}
c_Graph2D.prototype.p_curveTo2=function(t_pCtrl,t_pTo){
	this.p_curveTo(t_pCtrl.m__x,t_pCtrl.m__y,t_pTo.m__x,t_pTo.m__y);
}
c_Graph2D.prototype.p_drawOval=function(t_x,t_y,t_w,t_h,t_filled){
	this.p_updateMatrix();
	this.m__device.DrawOval(this.p_M(t_x),this.p_M(t_y),this.p_M(t_w),this.p_M(t_h),t_filled);
}
c_Graph2D.prototype.p_drawOval2=function(t_r,t_filled){
	this.p_drawOval(t_r.m__x,t_r.m__y,t_r.m__w,t_r.m__h,t_filled);
}
c_Graph2D.prototype.p_writePixels=function(t_pixels,t_x,t_y,t_width,t_height){
	this.m__device.WritePixels(t_pixels,this.p_M(t_x),this.p_M(t_y),this.p_M(t_width),this.p_M(t_height));
}
c_Graph2D.prototype.p_writePixels2=function(t_pixels,t_r){
	this.m__device.WritePixels(t_pixels,this.p_M(t_r.m__x),this.p_M(t_r.m__y),this.p_M(t_r.m__w),this.p_M(t_r.m__h));
}
c_Graph2D.prototype.p_readPixels=function(t_pixels,t_x,t_y,t_width,t_height){
	this.m__device.ReadPixels(t_pixels,this.p_M(t_x),this.p_M(t_y),this.p_M(t_width),this.p_M(t_height));
}
c_Graph2D.prototype.p_readPixels2=function(t_pixels,t_r){
	this.m__device.ReadPixels(t_pixels,this.p_M(t_r.m__x),this.p_M(t_r.m__y),this.p_M(t_r.m__w),this.p_M(t_r.m__h));
}
function c_DrawBase(){
	Object.call(this);
}
c_DrawBase.prototype.p_release=function(){
}
c_DrawBase.m_new=function(){
	return this;
}
c_DrawBase.prototype.p_draw2=function(t_g){
}
c_DrawBase.prototype.p_redraw2=function(t_g){
}
c_DrawBase.prototype.p_getHotspotAt=function(t_x,t_y){
}
function c_GraphicHolder(){
	Object.call(this);
	this.m__palette=c_Collection.m_new.call(new c_Collection);
	this.m__data=c_Collection.m_new.call(new c_Collection);
	this.m__containers=c_Collection.m_new.call(new c_Collection);
	this.m__nodata=true;
	this.implments={c_IDeserializableGraphObject:1};
}
c_GraphicHolder.m_new=function(){
	return this;
}
c_GraphicHolder.prototype.p_getGraphicData=function(t_sName){
	var t_=this.m__data.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		var t_data=object_downcast((t_o),c_GraphicData);
		if(t_data.m__name==t_sName){
			return t_data;
		}
	}
	return null;
}
c_GraphicHolder.prototype.p_linkGraphicData=function(){
	var t_=this.m__containers.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_oc=t_.p_NextObject();
		var t_cont=object_downcast((t_oc),c_GraphicContainer);
		var t_2=t_cont.m__descriptions.p_ObjectEnumerator();
		while(t_2.p_HasNext()){
			var t_od=t_2.p_NextObject();
			var t_desc=object_downcast((t_od),c_GraphicDescription);
			t_desc.m__data=this.p_getGraphicData(t_desc.m__name);
		}
	}
}
c_GraphicHolder.prototype.p_deserialize=function(t_stream){
	var t_i=0;
	var t_j=0;
	var t_p=null;
	for(t_i=0;t_i<3;t_i=t_i+1){
		t_p=c_Palette.m_new.call(new c_Palette);
		this.m__palette.p_add(t_p);
		for(t_j=0;t_j<256;t_j=t_j+1){
			var t_v=t_stream.p_nextInt();
			t_p.p_set2(t_j,c_Color.m_new3.call(new c_Color,t_v));
		}
	}
	t_stream.p_nextInt();
	t_stream.p_setPalette(object_downcast((this.m__palette.p_getObject(0)),c_Palette));
	while(t_stream.p_hasNext()){
		var t_type=t_stream.p_nextInt();
		var t_1=t_type;
		if(t_1==4){
			var t_o=c_GraphicData.m_new.call(new c_GraphicData);
			t_o.p_deserialize(t_stream.p_nextObject());
			this.m__data.p_add(t_o);
		}else{
			if(t_1==8){
				var t_o2=c_GraphicContainer.m_new.call(new c_GraphicContainer);
				t_o2.p_deserialize(t_stream.p_nextObject());
				this.m__containers.p_add(t_o2);
			}else{
				throw c_LException.m_new.call(new c_LException,"falscher Objekttyp");
			}
		}
	}
	this.p_linkGraphicData();
}
c_GraphicHolder.prototype.p_setData=function(t_data){
	try{
		var t_stream=c_GraphObjectStream.m_new.call(new c_GraphObjectStream);
		t_stream.p_setBuffer(t_data);
		t_stream.p_readVersionInformation();
		var t_type=t_stream.p_nextInt();
		if(t_type==13){
			this.p_deserialize(t_stream);
		}else{
			throw c_LException.m_new.call(new c_LException,"falscher Typ");
		}
		this.m__nodata=false;
		return true;
	}catch(_eek_){
		if(t_err=object_downcast(_eek_,ThrowableObject)){
			this.m__nodata=true;
		}else{
			throw _eek_;
		}
	}
	return false;
}
function c_GraphObjectStream(){
	Object.call(this);
	this.m__buf=[];
	this.m__pos=0;
	this.m__size=0;
	this.m__version=c_Version.m_new2.call(new c_Version);
	this.m__pal=null;
}
c_GraphObjectStream.m_new=function(){
	this.m__buf=[];
	this.m__pos=0;
	this.m__size=0;
	return this;
}
c_GraphObjectStream.prototype.p_setBuffer=function(t_buf){
	this.m__buf=string_tochars(t_buf);
	this.m__pos=0;
	this.m__size=t_buf.length;
}
c_GraphObjectStream.m_new2=function(t_buf){
	this.p_setBuffer(t_buf);
	return this;
}
c_GraphObjectStream.prototype.p_hasNext=function(){
	if(this.m__pos<this.m__size){
		return true;
	}
	return false;
}
c_GraphObjectStream.prototype.p_read=function(){
	var t_c=-1;
	if(this.m__pos<this.m__size){
		t_c=this.m__buf[this.m__pos];
		this.m__pos=this.m__pos+1;
	}
	return t_c;
}
c_GraphObjectStream.prototype.p_nextToken=function(){
	var t_i=0;
	var t_curpos=this.m__pos;
	while(this.p_hasNext()){
		t_i=this.p_read();
		if(t_i==-1){
			return string_fromchars(this.m__buf.slice(t_curpos,this.m__pos));
		}
		if(t_i==44){
			return string_fromchars(this.m__buf.slice(t_curpos,this.m__pos-1));
		}
	}
	return string_fromchars(this.m__buf.slice(t_curpos,this.m__pos));
}
c_GraphObjectStream.prototype.p_nextInt=function(){
	var t_s=this.p_nextToken();
	return parseInt((t_s),10);
}
c_GraphObjectStream.prototype.p_readVersionInformation=function(){
	var t_major=this.p_nextInt();
	var t_minor=this.p_nextInt();
	this.m__version.p_set(t_major,t_minor);
	return this.m__version;
}
c_GraphObjectStream.prototype.p_setPalette=function(t_p){
	this.m__pal=t_p;
}
c_GraphObjectStream.prototype.p_copyBuffer=function(t_buf,t_offset,t_len){
	if(t_offset+t_len>t_buf.length){
		t_len=t_buf.length-t_offset;
		if(t_len<0){
			t_len=0;
		}
	}
	this.m__buf=resize_number_array(this.m__buf,t_len);
	this.m__pos=0;
	this.m__size=t_len;
	var t_i=0;
	for(t_i=0;t_i<t_len;t_i=t_i+1){
		this.m__buf[t_i]=t_buf[t_i+t_offset];
	}
}
c_GraphObjectStream.prototype.p_nextObject=function(){
	var t_n=this.p_nextInt();
	var t_stream=c_GraphObjectStream.m_new.call(new c_GraphObjectStream);
	t_stream.m__pal=this.m__pal;
	t_stream.p_copyBuffer(this.m__buf,this.m__pos,t_n);
	this.m__pos=this.m__pos+t_n+1;
	return t_stream;
}
c_GraphObjectStream.prototype.p_nextString=function(){
	var t_n=this.p_nextInt();
	var t_s="";
	if(this.m__pos+t_n>this.m__size){
		t_n=this.m__size-this.m__pos;
	}
	t_s=string_fromchars(this.m__buf.slice(this.m__pos,this.m__pos+t_n));
	this.m__pos=this.m__pos+t_n+1;
	return t_s;
}
c_GraphObjectStream.prototype.p_nextDouble=function(){
	var t_s=this.p_nextToken();
	return parseFloat(t_s);
}
c_GraphObjectStream.prototype.p_nextBoolean=function(){
	var t_i=this.p_read();
	var t_fd=this.p_read();
	if(t_fd!=44 && t_fd!=-1){
		return false;
	}
	if(t_i==49){
		return true;
	}
	return false;
}
c_GraphObjectStream.prototype.p_nextColor=function(){
	var t_i=this.p_nextInt();
	if(t_i>=0){
		var t_col=this.m__pal.p_get(t_i);
		if(t_col==null){
			return c_Color.m_black;
		}
		return t_col;
	}
	return null;
}
c_GraphObjectStream.prototype.p_nextFont=function(){
	var t_type=this.p_nextInt();
	if(t_type==6){
		var t_ostr=this.p_nextObject();
		var t_fam=t_ostr.p_nextString();
		var t_size=t_ostr.p_nextDouble();
		t_ostr.p_nextBoolean();
		t_ostr.p_nextBoolean();
		t_ostr.p_nextInt();
		t_size=t_size/10.0;
		return c_Font.m_new.call(new c_Font,t_fam,t_size,false);
	}
	throw c_LException.m_new.call(new c_LException,"falscher Objekttyp");
}
function c_Version(){
	Object.call(this);
	this.m__major=0;
	this.m__minor=0;
}
c_Version.prototype.p_set=function(t_major,t_minor){
	this.m__major=t_major;
	this.m__minor=t_minor;
}
c_Version.m_new=function(t_major,t_minor){
	this.p_set(t_major,t_minor);
	return this;
}
c_Version.m_new2=function(){
	return this;
}
function c_SerializedType(){
	Object.call(this);
}
function c_Palette(){
	Object.call(this);
	this.m_colors=c_Collection.m_new.call(new c_Collection);
}
c_Palette.m_new=function(){
	return this;
}
c_Palette.prototype.p_set2=function(t_i,t_c){
	this.m_colors.p_replace(t_i,(t_c));
}
c_Palette.prototype.p_get=function(t_i){
	return object_downcast((this.m_colors.p_getObject(t_i)),c_Color);
}
function c_Collection(){
	Object.call(this);
	this.m__len=0;
	this.m__sz=0;
	this.m__i=[];
}
c_Collection.m_new=function(){
	this.m__len=0;
	this.m__sz=5;
	this.m__i=new_object_array(this.m__sz);
	return this;
}
c_Collection.prototype.p_add=function(t_elt){
	this.m__len+=1;
	if(this.m__len>this.m__sz){
		this.m__sz=this.m__sz*2;
		this.m__i=resize_object_array(this.m__i,this.m__sz);
	}
	this.m__i[this.m__len-1]=t_elt;
}
c_Collection.prototype.p_setLength=function(t_l){
	if(t_l>=this.m__sz){
		this.m__sz=t_l+1;
		this.m__i=resize_object_array(this.m__i,this.m__sz);
	}
	this.m__len=t_l;
}
c_Collection.prototype.p_replace=function(t_pos,t_elt){
	if(t_pos<0){
		return;
	}
	if(t_pos>=this.m__len){
		this.p_setLength(t_pos+1);
	}
	this.m__i[t_pos]=t_elt;
}
c_Collection.prototype.p_getObject=function(t_i){
	if(t_i>=0 && t_i<this.m__len){
		return this.m__i[t_i];
	}
	return null;
}
c_Collection.prototype.p_ObjectEnumerator=function(){
	return c_CollectionEnumerator.m_new.call(new c_CollectionEnumerator,this);
}
c_Collection.prototype.p_length=function(){
	return this.m__len;
}
c_Collection.prototype.p_getArray=function(){
	return this.m__i.slice(0,this.m__len);
}
c_Collection.prototype.p_addAll=function(t_arr){
	if(t_arr.length==0){
		return;
	}
	if(this.m__len+t_arr.length>this.m__sz){
		this.m__sz=this.m__len+t_arr.length+2;
		this.m__i=resize_object_array(this.m__i,this.m__sz);
	}
	for(var t_i=0;t_i<t_arr.length;t_i=t_i+1){
		this.m__i[this.m__len]=t_arr[t_i];
		this.m__len=this.m__len+1;
	}
}
c_Collection.prototype.p_invert=function(){
	var t_e1=null;
	var t_e2=null;
	var t_j=0;
	for(var t_i=0;t_i<this.m__len;t_i=t_i+1){
		t_j=this.m__len-1-t_i;
		if(t_i>=t_j){
			break;
		}
		t_e1=this.m__i[t_i];
		t_e2=this.m__i[t_j];
		this.m__i[t_i]=t_e2;
		this.m__i[t_j]=t_e1;
	}
}
c_Collection.prototype.p_clear3=function(){
	this.m__len=0;
	for(var t_i=0;t_i<this.m__len;t_i=t_i+1){
		this.m__i[t_i]=null;
	}
}
c_Collection.prototype.p_compareItem=function(t_e1,t_e2){
	error("Unable to compare items");
	return 0;
}
c_Collection.prototype.p_qsort=function(t_min,t_max,t_ccsgn){
	var t_mid_value=null;
	var t_hi=0;
	var t_lo=0;
	var t_i=0;
	if(t_min>=t_max){
		return;
	}
	t_i=(((t_min+t_max)/2)|0);
	t_mid_value=this.m__i[t_i];
	this.m__i[t_i]=this.m__i[t_min];
	t_lo=t_min;
	t_hi=t_max;
	do{
		while(this.p_compareItem(this.m__i[t_hi],t_mid_value)*t_ccsgn>=0){
			t_hi=t_hi-1;
			if(t_hi<=t_lo){
				break;
			}
		}
		if(t_hi<=t_lo){
			this.m__i[t_lo]=t_mid_value;
			break;
		}
		this.m__i[t_lo]=this.m__i[t_hi];
		t_lo=t_lo+1;
		while(this.p_compareItem(this.m__i[t_lo],t_mid_value)*t_ccsgn<0){
			t_lo=t_lo+1;
			if(t_lo>=t_hi){
				break;
			}
		}
		if(t_lo>=t_hi){
			t_lo=t_hi;
			this.m__i[t_hi]=t_mid_value;
			break;
		}
		this.m__i[t_hi]=this.m__i[t_lo];
	}while(!(false));
	this.p_qsort(t_min,t_lo-1,t_ccsgn);
	this.p_qsort(t_lo+1,t_max,t_ccsgn);
}
c_Collection.prototype.p_sortArray=function(t_ascending){
	var t_ccsgn=-1;
	if(t_ascending){
		t_ccsgn=1;
	}
	this.p_qsort(0,this.p_length()-1,t_ccsgn);
}
function c_Color(){
	Object.call(this);
	this.m__r=0;
	this.m__g=0;
	this.m__b=0;
	this.m__a=.0;
}
c_Color.m_new=function(){
	this.m__r=0;
	this.m__g=0;
	this.m__b=0;
	this.m__a=1.0;
	return this;
}
c_Color.prototype.p_set3=function(t_s){
	if(t_s==""){
		return;
	}
	if(t_s.charCodeAt(0)==35){
		var t_hr="";
		var t_hg="";
		var t_hb="";
		if(t_s.length==7){
			t_hr=t_s.slice(1,3);
			t_hg=t_s.slice(3,5);
			t_hb=t_s.slice(5,7);
		}else{
			if(t_s.length==4){
				t_hr=t_s.slice(1,2)+t_s.slice(1,2);
				t_hg=t_s.slice(2,3)+t_s.slice(2,3);
				t_hb=t_s.slice(3,4)+t_s.slice(3,4);
			}else{
				return;
			}
		}
		this.m__r=c_HexFormatter.m_toDec(t_hr);
		this.m__g=c_HexFormatter.m_toDec(t_hg);
		this.m__b=c_HexFormatter.m_toDec(t_hb);
	}else{
		if(t_s.indexOf(",",0)>-1){
			var t_token=t_s.split(",");
			if(t_token.length>=3){
				this.m__r=parseInt((string_trim(t_token[0])),10);
				this.m__g=parseInt((string_trim(t_token[1])),10);
				this.m__b=parseInt((string_trim(t_token[2])),10);
			}
			if(t_token.length==4){
				this.m__a=parseFloat(string_trim(t_token[3]));
			}
		}
	}
}
c_Color.prototype.p_set4=function(t_v){
	this.m__r=t_v&255;
	this.m__g=t_v>>8&255;
	this.m__b=t_v>>16&255;
	this.m__a=1.0;
}
c_Color.prototype.p_set5=function(t_r,t_g,t_b){
	this.m__r=t_r;
	this.m__g=t_g;
	this.m__b=t_b;
}
c_Color.prototype.p_set6=function(t_r,t_g,t_b,t_a){
	this.m__r=t_r;
	this.m__g=t_g;
	this.m__b=t_b;
	this.m__a=t_a;
}
c_Color.m_new2=function(t_s){
	this.p_set3(t_s);
	return this;
}
c_Color.m_new3=function(t_v){
	this.p_set4(t_v);
	return this;
}
c_Color.m_new4=function(t_r,t_g,t_b,t_a){
	this.p_set6(t_r,t_g,t_b,t_a);
	return this;
}
c_Color.m_lightGray=null;
c_Color.m_black=null;
c_Color.m_white=null;
c_Color.prototype.p_clone=function(){
	return c_Color.m_new4.call(new c_Color,this.m__r,this.m__g,this.m__b,this.m__a);
}
c_Color.prototype.p_getHLS=function(){
	var t_c=c_ColorHLS.m_new.call(new c_ColorHLS);
	t_c.p_setColor(this);
	return t_c;
}
c_Color.prototype.p_getTextColor=function(){
	var t_hls=this.p_getHLS();
	if(t_hls.m__h>130 && t_hls.m__h<190){
		if(t_hls.m__l<150){
			return c_Color.m_white;
		}
	}else{
		if(t_hls.m__l<100){
			return c_Color.m_white;
		}
	}
	return c_Color.m_black;
}
c_Color.prototype.p_equals=function(t_c){
	if(t_c.m__r==this.m__r && t_c.m__g==this.m__g && t_c.m__b==this.m__b && t_c.m__a==this.m__a){
		return true;
	}
	return false;
}
c_Color.prototype.p_ToString=function(){
	return String(this.m__r)+","+String(this.m__g)+","+String(this.m__b)+","+String(this.m__a);
}
function c_HexFormatter(){
	Object.call(this);
}
c_HexFormatter.m_toDec=function(t_hx){
	var t_rv=0;
	var t_lookup="0123456789abcdef";
	t_hx=t_hx.toLowerCase();
	for(var t_i=0;t_i<t_hx.length;t_i=t_i+1){
		t_rv*=16;
		var t_idx=t_lookup.indexOf(t_hx.slice(t_i,t_i+1),0);
		if(t_idx<0){
			error("Error parsing Hex string!");
		}
		t_rv+=t_idx;
	}
	return t_rv;
}
c_HexFormatter.m_toHex=function(t_dec){
	var t_rv="";
	if(t_dec<=0){
		return "0";
	}
	while(t_dec>0){
		if(t_dec % 16<10){
			t_rv=t_rv+String(t_dec % 16);
		}else{
			t_rv=t_rv+String.fromCharCode(97+t_dec % 16-10);
		}
		t_dec=((t_dec/16)|0);
	}
	return t_rv;
}
function c_GraphicData(){
	Object.call(this);
	this.m__name="";
	this.m__yFormat="";
	this.m__yFormatAdd="";
	this.m__title1="";
	this.m__title2="";
	this.m__options=null;
	this.m__sets=c_Collection.m_new.call(new c_Collection);
	this.m__ts=c_Collection.m_new.call(new c_Collection);
	this.m__yticks=c_Collection.m_new.call(new c_Collection);
	this.m__minT=0;
	this.m__maxT=0;
	this.m__min=.0;
	this.m__max=.0;
	this.m__minSumPlus=.0;
	this.m__maxSumPlus=.0;
	this.m__minSumMinus=.0;
	this.m__maxSumMinus=.0;
	this.m__must_create_std_yticks=false;
	this.implments={c_IDeserializableGraphObject:1};
}
c_GraphicData.m_new=function(){
	return this;
}
c_GraphicData.prototype.p_calculatePeriodClamp=function(){
	this.m__minT=c_Limitation.m_limits.m__MAX_INT;
	this.m__maxT=c_Limitation.m_limits.m__MIN_INT;
	if(this.m__ts.p_length()>0){
		var t_=this.m__ts.p_ObjectEnumerator();
		while(t_.p_HasNext()){
			var t_ots=t_.p_NextObject();
			var t_ts=object_downcast((t_ots),c_GraphicTimeSection);
			this.m__minT=bb_math_Min(this.m__minT,t_ts.m__start);
			this.m__maxT=bb_math_Max(this.m__maxT,t_ts.m__start+t_ts.m__duration);
		}
	}else{
		var t_2=this.m__sets.p_ObjectEnumerator();
		while(t_2.p_HasNext()){
			var t_oset=t_2.p_NextObject();
			var t_set=object_downcast((t_oset),c_GraphicDataSet);
			this.m__minT=bb_math_Min(this.m__minT,t_set.m__start);
			this.m__maxT=bb_math_Max(this.m__maxT,t_set.m__end);
		}
	}
}
c_GraphicData.prototype.p_deserialize=function(t_stream){
	this.m__name=t_stream.p_nextString();
	this.m__yFormat=t_stream.p_nextString();
	t_stream.p_nextString();
	this.m__yFormatAdd=t_stream.p_nextString();
	t_stream.p_nextString();
	t_stream.p_nextInt();
	t_stream.p_nextDouble();
	t_stream.p_nextDouble();
	t_stream.p_nextInt();
	t_stream.p_nextInt();
	t_stream.p_nextDouble();
	t_stream.p_nextDouble();
	t_stream.p_nextDouble();
	t_stream.p_nextDouble();
	t_stream.p_nextDouble();
	t_stream.p_nextDouble();
	this.m__title1=t_stream.p_nextString();
	this.m__title2=t_stream.p_nextString();
	t_stream.p_nextBoolean();
	if(t_stream.p_nextInt()==7){
		this.m__options=c_GraphicOptions.m_new.call(new c_GraphicOptions);
		this.m__options.p_deserialize(t_stream.p_nextObject());
	}else{
		throw c_LException.m_new.call(new c_LException,"falscher Objekttyp");
	}
	while(t_stream.p_hasNext()){
		var t_type=t_stream.p_nextInt();
		var t_1=t_type;
		if(t_1==2){
			var t_o=c_GraphicDataSet.m_new.call(new c_GraphicDataSet);
			t_o.p_deserialize(t_stream.p_nextObject());
			this.m__sets.p_add(t_o);
		}else{
			if(t_1==3){
				var t_o2=c_GraphicTimeSection.m_new.call(new c_GraphicTimeSection);
				t_o2.p_deserialize(t_stream.p_nextObject());
				this.m__ts.p_add(t_o2);
			}else{
				if(t_1==5){
					var t_o3=c_GraphicYData.m_new.call(new c_GraphicYData);
					t_o3.p_deserialize(t_stream.p_nextObject());
					this.m__yticks.p_add(t_o3);
				}else{
					throw c_LException.m_new.call(new c_LException,"falscher Objekttyp");
				}
			}
		}
	}
	this.p_calculatePeriodClamp();
}
c_GraphicData.prototype.p_prepareDiscreteValues=function(t_scaleWhenSwitchedOff){
	this.m__min=c_Limitation.m_limits.m__MAX_FLOAT;
	this.m__max=-c_Limitation.m_limits.m__MAX_FLOAT;
	this.m__minSumPlus=c_Limitation.m_limits.m__MAX_FLOAT;
	this.m__maxSumPlus=-c_Limitation.m_limits.m__MAX_FLOAT;
	this.m__minSumMinus=-c_Limitation.m_limits.m__MAX_FLOAT;
	this.m__maxSumMinus=c_Limitation.m_limits.m__MAX_FLOAT;
	if(this.m__sets.p_length()==0){
		this.m__min=0.0;
		this.m__max=0.0;
		this.m__minSumPlus=0.0;
		this.m__maxSumPlus=0.0;
		this.m__minSumMinus=0.0;
		this.m__maxSumMinus=0.0;
		return;
	}
	var t_slots=0;
	var t_start=c_Limitation.m_limits.m__MAX_INT;
	var t_ende=0;
	var t_=this.m__sets.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_oset=t_.p_NextObject();
		var t_set=object_downcast((t_oset),c_GraphicDataSet);
		t_start=bb_math_Min(t_start,t_set.m__start);
		t_ende=bb_math_Max(t_ende,t_set.m__end);
	}
	t_slots=t_ende-t_start;
	var t_plusStart=new_number_array(t_slots);
	var t_plusEnd=new_number_array(t_slots);
	var t_minusStart=new_number_array(t_slots);
	var t_minusEnd=new_number_array(t_slots);
	for(var t_i=0;t_i<t_slots;t_i=t_i+1){
		t_plusStart[t_i]=0.0;
		t_plusEnd[t_i]=0.0;
		t_minusStart[t_i]=0.0;
		t_minusEnd[t_i]=0.0;
	}
	var t_hasSwichtedOffs=false;
	var t_2=this.m__sets.p_ObjectEnumerator();
	while(t_2.p_HasNext()){
		var t_oset2=t_2.p_NextObject();
		var t_set2=object_downcast((t_oset2),c_GraphicDataSet);
		if(t_set2.m__hidden || t_set2.m__switchedoff){
			if(t_set2.m__switchedoff){
				t_hasSwichtedOffs=true;
			}
			continue;
		}
		var t_curslot=t_set2.m__start-t_start;
		var t_3=t_set2.m__items.p_ObjectEnumerator();
		while(t_3.p_HasNext()){
			var t_oitem=t_3.p_NextObject();
			var t_item=object_downcast((t_oitem),c_GraphicItem);
			for(var t_k=0;t_k<t_item.m__duration;t_k=t_k+1){
				if(t_set2.m__drawAsLine || this.m__options.m__gt==2){
					this.m__maxSumPlus=bb_math_Max2(this.m__maxSumPlus,bb_math_Max2(bb_math_Max2(0.0,t_item.m__start),bb_math_Max2(0.0,t_item.m__end)));
					this.m__maxSumMinus=bb_math_Min2(this.m__maxSumMinus,bb_math_Min2(bb_math_Min2(0.0,t_item.m__start),bb_math_Min2(0.0,t_item.m__end)));
				}else{
					t_plusStart[t_curslot]+=bb_math_Max2(0.0,t_item.m__start);
					t_plusEnd[t_curslot]+=bb_math_Max2(0.0,t_item.m__end);
					t_minusStart[t_curslot]+=bb_math_Min2(0.0,t_item.m__start);
					t_minusEnd[t_curslot]+=bb_math_Min2(0.0,t_item.m__end);
				}
				t_curslot+=1;
			}
		}
	}
	for(var t_i2=0;t_i2<t_slots;t_i2=t_i2+1){
		this.m__maxSumPlus=bb_math_Max2(this.m__maxSumPlus,bb_math_Max2(t_plusStart[t_i2],t_plusEnd[t_i2]));
		this.m__minSumPlus=bb_math_Min2(this.m__minSumPlus,bb_math_Min2(t_plusStart[t_i2],t_plusEnd[t_i2]));
		this.m__maxSumMinus=bb_math_Min2(this.m__maxSumMinus,bb_math_Min2(t_minusStart[t_i2],t_minusEnd[t_i2]));
		this.m__minSumMinus=bb_math_Max2(this.m__minSumMinus,bb_math_Max2(t_minusStart[t_i2],t_minusEnd[t_i2]));
	}
	this.m__maxSumPlus=bb_math_Max2(this.m__maxSumPlus,0.0);
	this.m__minSumPlus=bb_math_Max2(this.m__minSumPlus,0.0);
	this.m__maxSumMinus=bb_math_Min2(this.m__maxSumMinus,0.0);
	this.m__minSumMinus=bb_math_Min2(this.m__minSumMinus,0.0);
	this.m__max=this.m__maxSumPlus;
	this.m__min=this.m__maxSumMinus;
	if(t_scaleWhenSwitchedOff==false || t_hasSwichtedOffs==false){
		var t_4=this.m__yticks.p_ObjectEnumerator();
		while(t_4.p_HasNext()){
			var t_otick=t_4.p_NextObject();
			var t_yT=object_downcast((t_otick),c_GraphicYData);
			this.m__max=bb_math_Max2(this.m__max,t_yT.m__y);
			this.m__min=bb_math_Min2(this.m__min,t_yT.m__y);
		}
	}
}
c_GraphicData.prototype.p_generateStandardYAxis=function(t_graphheigh){
	this.m__yticks.p_clear3();
	this.p_prepareDiscreteValues(true);
	var t_noTicks=0.3*Math.sqrt(t_graphheigh);
	var t_ymin=this.m__min;
	var t_ymax=this.m__max;
	var t_delta=(t_ymax-t_ymin)/t_noTicks;
	var t_dec=((-Math.floor(Math.log(t_delta)/Math.log(10.0)))|0);
	var t_maxDec=3;
	if(t_dec>t_maxDec){
		t_dec=t_maxDec;
	}
	var t_magn=Math.pow(10.0,(-t_dec));
	var t_norm=t_delta/t_magn;
	var t_size=.0;
	if(t_norm<1.5){
		t_size=1.0;
	}else{
		if(t_norm<3.0){
			t_size=2.0;
			if(t_norm>2.25 && t_dec+1<=t_maxDec){
				t_size=2.5;
				t_dec+=1;
			}
		}else{
			if(t_norm<6.5){
				t_size=5.0;
			}else{
				t_size=10.0;
			}
		}
	}
	t_size*=t_magn;
	var t_rMaxE=0.0;
	var t_rMinE=0.0;
	var t_rTempMax=0.0;
	var t_rTempMin=0.0;
	t_rMaxE=t_ymax;
	while(t_rTempMax<t_ymax){
		t_rTempMax=t_rTempMax+t_size;
	}
	t_ymax=t_rTempMax-t_size;
	t_rMinE=t_ymin;
	while(t_rTempMin>t_ymin){
		t_rTempMin=t_rTempMin-t_size;
	}
	t_ymin=t_rTempMin+t_size;
	var t_rYValue=0.0;
	while(t_rYValue<=t_ymax){
		var t_ytick=c_GraphicYData.m_new.call(new c_GraphicYData);
		t_ytick.m__y=t_rYValue;
		this.m__yticks.p_add(t_ytick);
		t_rYValue=t_rYValue+t_size;
	}
	if(t_rMaxE>0.0){
		var t_ytick2=c_GraphicYData.m_new.call(new c_GraphicYData);
		t_ytick2.m__y=t_ymax+t_size;
		this.m__yticks.p_add(t_ytick2);
	}
	t_rYValue=0.0;
	while(t_rYValue>=t_ymin){
		var t_ytick3=c_GraphicYData.m_new.call(new c_GraphicYData);
		t_ytick3.m__y=t_rYValue;
		this.m__yticks.p_add(t_ytick3);
		t_rYValue=t_rYValue-t_size;
	}
	if(t_rMinE<0.0){
		var t_ytick4=c_GraphicYData.m_new.call(new c_GraphicYData);
		t_ytick4.m__y=t_ymin-t_size;
		this.m__yticks.p_add(t_ytick4);
	}
}
c_GraphicData.prototype.p_formatY=function(t_val){
	if(this.m__yFormat!=""){
		return c_NumericFormater.m_convert2(t_val,this.m__yFormat)+this.m__yFormatAdd;
	}else{
		return c_NumericFormater.m_convert2(t_val,"###'###'###'##9")+this.m__yFormatAdd;
	}
}
function c_GraphicOptions(){
	Object.call(this);
	this.m__gt=0;
	this.m__legend=0;
	this.m__graphicBox=false;
	this.m__barFillPercent=.0;
	this.m__showTime=0;
	this.m__useStartValue=false;
	this.m__showOverBar=false;
	this.m__pieRotationStart=.0;
	this.m__pie3D=false;
	this.m__pie3DRotation=.0;
	this.m__pie3DHeight=.0;
	this.m__piePercentLabels=false;
	this.m__piePulloutSegmentString="";
	this.m__sortPie=0;
	this.m__pieCenter=false;
	this.m__pieShowLabels=false;
	this.m__pieLabelColorized=false;
	this.m__pieRounded=false;
	this.m__pieTotal="";
	this.m__legendPercent=false;
	this.m__piePulloutDistance=.0;
	this.m__pieTextDistance=.0;
	this.m__pieDonatPercSize=.0;
	this.m__darkness3D=0;
	this.m__arrowPercentX=.0;
	this.m__arrowPercentY=.0;
	this.m__arrowPercentTS=.0;
	this.m__defaultFont=c_Font.m_new.call(new c_Font,"Arial",10.0,false);
	this.m__fontX=null;
	this.m__fontY=null;
	this.m__fontLegend=null;
	this.m__fontLegSum=null;
	this.m__fontTS=null;
	this.m__fontTitle1=null;
	this.m__fontTitle2=null;
	this.m__textInSegFont=null;
	this.m__showGrid=0;
	this.m__gridLineColor=null;
	this.m__gridLineWidth=.0;
	this.m__xAxis=false;
	this.m__yAxis=false;
	this.m__xAxisLineWidth=.0;
	this.m__xAxisLineColor=null;
	this.m__xAxisTextColor=null;
	this.m__yAxisLineWidth=.0;
	this.m__yAxisLineColor=null;
	this.m__yAxisTextColor=null;
	this.m__displayTSNames=false;
	this.m__tsLineColor=null;
	this.m__tsLineWidth=.0;
	this.m__graphLineWidth=.0;
	this.m__borderColor=null;
	this.m__borderWidth=.0;
	this.m__borderUseSetColor=false;
	this.m__legendBoxColor=null;
	this.m__legendBoxWidth=.0;
	this.m__legendBoxUseSetColor=false;
	this.m__legendGapPercent=.0;
	this.m__legendBoxPercent=.0;
	this.m__legendColumn=false;
	this.m__legendNameAsTitle=false;
	this.m__legendName="";
	this.m__legendBoxRound=false;
	this.m__centerTick=false;
	this.m__centerTickText=false;
	this.m__gridStroke=null;
	this.m__xAxisStroke=null;
	this.m__yAxisStroke=null;
	this.m__tsStroke=null;
	this.m__graphStroke=null;
	this.m__borderStroke=null;
	this.m__legendBoxStroke=null;
	this.m__legendOrientation=0;
	this.m__piePrefixSetLabel=false;
	this.m__m_iAxisDistance=.0;
	this.m__textInSegColor=null;
	this.m__legendNullVal="";
	this.m__legendValRepl="";
	this.m__m_iLegendSumStyle=0;
	this.m__m_iLineText=0;
	this.m__m_bLegendOrder=false;
	this.m__pieLegendNoZeroVal=false;
	this.m__TSBrackGround=false;
	this.m__TSBGColor=null;
	this.m__TSFrame=false;
	this.m__TSFrameColor=null;
	this.m__TSvLines=false;
	this.m__BGColor=null;
	this.m__stackedBarAlign=0;
	this.m__defaultStroke=c_Stroke.m_new.call(new c_Stroke,1.0);
	this.implments={c_IDeserializableGraphObject:1};
}
c_GraphicOptions.prototype.p_createStrokes=function(){
	this.m__gridStroke=c_Stroke.m_new.call(new c_Stroke,this.m__gridLineWidth);
	this.m__xAxisStroke=c_Stroke.m_new.call(new c_Stroke,this.m__xAxisLineWidth);
	this.m__yAxisStroke=c_Stroke.m_new.call(new c_Stroke,this.m__yAxisLineWidth);
	this.m__tsStroke=c_Stroke.m_new.call(new c_Stroke,this.m__tsLineWidth);
	this.m__graphStroke=c_Stroke.m_new.call(new c_Stroke,this.m__graphLineWidth);
	this.m__borderStroke=c_Stroke.m_new.call(new c_Stroke,this.m__borderWidth);
	this.m__legendBoxStroke=c_Stroke.m_new.call(new c_Stroke,this.m__legendBoxWidth);
}
c_GraphicOptions.prototype.p_reset=function(){
	this.m__gt=0;
	this.m__legend=0;
	this.m__graphicBox=false;
	this.m__barFillPercent=100.0;
	this.m__showTime=2000;
	this.m__useStartValue=false;
	this.m__showOverBar=true;
	this.m__pieRotationStart=30.0;
	this.m__pie3D=true;
	this.m__pie3DRotation=30.0;
	this.m__pie3DHeight=360.0;
	this.m__piePercentLabels=true;
	this.m__piePulloutSegmentString="-1";
	this.m__sortPie=0;
	this.m__pieCenter=false;
	this.m__pieShowLabels=true;
	this.m__pieLabelColorized=false;
	this.m__pieRounded=true;
	this.m__pieTotal="";
	this.m__legendPercent=false;
	this.m__piePulloutDistance=36.0;
	this.m__pieTextDistance=72.0;
	this.m__pieDonatPercSize=100.0;
	this.m__darkness3D=75;
	this.m__arrowPercentX=70.0;
	this.m__arrowPercentY=70.0;
	this.m__arrowPercentTS=70.0;
	this.m__fontX=this.m__defaultFont.p_clone();
	this.m__fontY=this.m__defaultFont.p_clone();
	this.m__fontLegend=this.m__defaultFont.p_clone();
	this.m__fontLegSum=this.m__defaultFont.p_clone();
	this.m__fontTS=this.m__defaultFont.p_clone();
	this.m__fontTitle1=this.m__defaultFont.p_clone();
	this.m__fontTitle2=this.m__defaultFont.p_clone();
	this.m__textInSegFont=this.m__defaultFont.p_clone();
	this.m__showGrid=0;
	this.m__gridLineColor=c_Color.m_lightGray;
	this.m__gridLineWidth=1.0;
	this.m__xAxis=true;
	this.m__yAxis=true;
	this.m__xAxisLineWidth=1.0;
	this.m__xAxisLineColor=c_Color.m_black;
	this.m__xAxisTextColor=c_Color.m_black;
	this.m__yAxisLineWidth=1.0;
	this.m__yAxisLineColor=c_Color.m_black;
	this.m__yAxisTextColor=c_Color.m_black;
	this.m__displayTSNames=true;
	this.m__tsLineColor=c_Color.m_black;
	this.m__tsLineWidth=1.0;
	this.m__graphLineWidth=3.0;
	this.m__borderColor=c_Color.m_black;
	this.m__borderWidth=0.0;
	this.m__borderUseSetColor=false;
	this.m__legendBoxColor=c_Color.m_black;
	this.m__legendBoxWidth=1.0;
	this.m__legendBoxUseSetColor=false;
	this.m__legendGapPercent=100.0;
	this.m__legendBoxPercent=100.0;
	this.m__legendColumn=false;
	this.m__legendNameAsTitle=false;
	this.m__legendName="";
	this.m__legendBoxRound=false;
	this.m__centerTick=false;
	this.m__centerTickText=false;
	this.p_createStrokes();
}
c_GraphicOptions.m_new=function(){
	this.p_reset();
	this.p_createStrokes();
	return this;
}
c_GraphicOptions.prototype.p_deserialize=function(t_stream){
	this.p_reset();
	this.m__gt=t_stream.p_nextInt();
	this.m__legend=t_stream.p_nextInt();
	this.m__graphicBox=t_stream.p_nextBoolean();
	this.m__barFillPercent=t_stream.p_nextDouble();
	this.m__showTime=t_stream.p_nextInt();
	this.m__useStartValue=t_stream.p_nextBoolean();
	this.m__showOverBar=t_stream.p_nextBoolean();
	this.m__pieRotationStart=t_stream.p_nextDouble();
	this.m__pie3D=t_stream.p_nextBoolean();
	this.m__pie3DRotation=t_stream.p_nextDouble();
	this.m__pie3DHeight=t_stream.p_nextDouble();
	this.m__piePercentLabels=t_stream.p_nextBoolean();
	this.m__piePulloutSegmentString=t_stream.p_nextString();
	this.m__pieShowLabels=t_stream.p_nextBoolean();
	this.m__pieRounded=t_stream.p_nextBoolean();
	this.m__pieTotal=t_stream.p_nextString();
	this.m__legendPercent=t_stream.p_nextBoolean();
	this.m__piePulloutDistance=t_stream.p_nextDouble();
	this.m__pieTextDistance=t_stream.p_nextDouble();
	this.m__darkness3D=t_stream.p_nextInt();
	t_stream.p_nextInt();
	this.m__arrowPercentX=t_stream.p_nextDouble();
	this.m__arrowPercentY=t_stream.p_nextDouble();
	this.m__arrowPercentTS=t_stream.p_nextDouble();
	this.m__showGrid=t_stream.p_nextInt();
	this.m__gridLineColor=t_stream.p_nextColor();
	this.m__gridLineWidth=(t_stream.p_nextInt());
	this.m__xAxis=t_stream.p_nextBoolean();
	this.m__yAxis=t_stream.p_nextBoolean();
	this.m__xAxisLineWidth=(t_stream.p_nextInt());
	this.m__yAxisLineWidth=(t_stream.p_nextInt());
	this.m__xAxisLineColor=t_stream.p_nextColor();
	this.m__yAxisLineColor=t_stream.p_nextColor();
	this.m__xAxisTextColor=t_stream.p_nextColor();
	this.m__yAxisTextColor=t_stream.p_nextColor();
	this.m__displayTSNames=t_stream.p_nextBoolean();
	this.m__tsLineColor=t_stream.p_nextColor();
	this.m__tsLineWidth=(t_stream.p_nextInt());
	this.m__graphLineWidth=(t_stream.p_nextInt());
	this.m__borderColor=t_stream.p_nextColor();
	this.m__borderWidth=(t_stream.p_nextInt());
	this.m__borderUseSetColor=t_stream.p_nextBoolean();
	this.m__legendBoxColor=t_stream.p_nextColor();
	this.m__legendBoxWidth=(t_stream.p_nextInt());
	this.m__legendBoxWidth=1.0;
	this.m__legendBoxUseSetColor=t_stream.p_nextBoolean();
	this.m__legendGapPercent=t_stream.p_nextDouble();
	this.m__legendOrientation=t_stream.p_nextInt();
	this.m__legendBoxPercent=t_stream.p_nextDouble();
	this.m__legendColumn=t_stream.p_nextBoolean();
	this.m__legendNameAsTitle=t_stream.p_nextBoolean();
	this.m__legendName=t_stream.p_nextString();
	this.m__centerTick=t_stream.p_nextBoolean();
	this.m__centerTickText=t_stream.p_nextBoolean();
	this.m__piePrefixSetLabel=t_stream.p_nextBoolean();
	this.m__m_iAxisDistance=(t_stream.p_nextInt());
	t_stream.p_nextBoolean();
	t_stream.p_nextInt();
	t_stream.p_nextInt();
	t_stream.p_nextBoolean();
	t_stream.p_nextBoolean();
	this.m__textInSegColor=(c_Color.m_new3.call(new c_Color,t_stream.p_nextInt()));
	t_stream.p_nextInt();
	t_stream.p_nextBoolean();
	t_stream.p_nextBoolean();
	t_stream.p_nextBoolean();
	this.m__legendNullVal=t_stream.p_nextString();
	this.m__legendValRepl=t_stream.p_nextString();
	t_stream.p_nextBoolean();
	this.m__m_iLegendSumStyle=t_stream.p_nextInt();
	this.m__m_iLineText=t_stream.p_nextInt();
	this.m__m_bLegendOrder=t_stream.p_nextBoolean();
	this.m__pieLegendNoZeroVal=t_stream.p_nextBoolean();
	t_stream.p_nextBoolean();
	this.m__TSBrackGround=t_stream.p_nextBoolean();
	this.m__TSBGColor=(c_Color.m_new3.call(new c_Color,t_stream.p_nextInt()));
	this.m__TSFrame=t_stream.p_nextBoolean();
	this.m__TSFrameColor=(c_Color.m_new3.call(new c_Color,t_stream.p_nextInt()));
	this.m__TSvLines=t_stream.p_nextBoolean();
	t_stream.p_nextInt();
	this.m__BGColor=t_stream.p_nextColor();
	this.m__sortPie=t_stream.p_nextInt();
	this.m__stackedBarAlign=t_stream.p_nextInt();
	this.m__fontX=t_stream.p_nextFont();
	this.m__fontY=t_stream.p_nextFont();
	this.m__fontLegend=t_stream.p_nextFont();
	this.m__fontTS=t_stream.p_nextFont();
	this.m__fontTitle1=t_stream.p_nextFont();
	this.m__fontTitle2=t_stream.p_nextFont();
	this.m__textInSegFont=t_stream.p_nextFont();
	this.m__fontLegSum=t_stream.p_nextFont();
	this.p_createStrokes();
}
function c_GraphType(){
	Object.call(this);
}
function c_LegendType(){
	Object.call(this);
}
function c_SortPie(){
	Object.call(this);
}
function c_Font(){
	Object.call(this);
	this.m__fam="";
	this.m__size=.0;
	this.m__bold=false;
}
c_Font.m_new=function(t_f,t_s,t_b){
	this.m__fam=t_f;
	this.m__size=t_s;
	this.m__bold=t_b;
	return this;
}
c_Font.m_new2=function(){
	return this;
}
c_Font.prototype.p_clone=function(){
	return c_Font.m_new.call(new c_Font,this.m__fam,this.m__size,this.m__bold);
}
function c_Stroke(){
	Object.call(this);
	this.m__width=.0;
	this.m__cap=0;
	this.m__join=0;
}
c_Stroke.m_new=function(t_w){
	this.m__width=t_w;
	this.m__cap=0;
	this.m__join=0;
	return this;
}
c_Stroke.m_new2=function(t_w,t_c,t_j){
	this.m__width=t_w;
	this.m__cap=t_c;
	this.m__join=t_j;
	return this;
}
c_Stroke.m_new3=function(){
	return this;
}
c_Stroke.prototype.p_clone=function(){
	return c_Stroke.m_new2.call(new c_Stroke,this.m__width,this.m__cap,this.m__join);
}
function c_LException(){
	ThrowableObject.call(this);
	this.m__error="";
}
c_LException.prototype=extend_class(ThrowableObject);
c_LException.m_new=function(t_error){
	this.m__error=t_error;
	c_LDebug.m_stop();
	return this;
}
c_LException.m_new2=function(){
	return this;
}
function c_LDebug(){
	Object.call(this);
}
c_LDebug.m_stop=function(){
}
function c_GraphicDataSet(){
	Object.call(this);
	this.m__name="";
	this.m__color=null;
	this.m__legend="";
	this.m__start=0;
	this.m__type=0;
	this.m__drawAsPane=false;
	this.m__drawAsLine=false;
	this.m__isBlankSeparator=false;
	this.m__isLineSeparator=false;
	this.m__hidden=false;
	this.m__showinfo=false;
	this.m__items=c_Collection.m_new.call(new c_Collection);
	this.m__end=0;
	this.m__switchedoff=false;
	this.m__linetype=0;
	this.implments={c_IDeserializableGraphObject:1};
}
c_GraphicDataSet.m_new=function(){
	return this;
}
c_GraphicDataSet.prototype.p_setType=function(t_type){
	this.m__type=t_type;
	this.m__drawAsPane=false;
	this.m__drawAsLine=false;
	this.m__isBlankSeparator=false;
	this.m__isLineSeparator=false;
	this.m__hidden=false;
	this.m__showinfo=true;
	if((t_type&1)==1){
		this.m__drawAsLine=true;
	}else{
		this.m__drawAsPane=true;
	}
	if((t_type&2)==2){
		this.m__hidden=true;
	}
	if((t_type&4)==4){
		this.m__isBlankSeparator=true;
	}
	if((t_type&8)==8){
		this.m__isLineSeparator=true;
	}
}
c_GraphicDataSet.prototype.p_deserialize=function(t_stream){
	this.m__name=t_stream.p_nextString();
	this.m__color=t_stream.p_nextColor();
	this.m__legend=t_stream.p_nextString();
	this.m__start=t_stream.p_nextInt();
	t_stream.p_nextInt();
	t_stream.p_nextBoolean();
	var t_iType=t_stream.p_nextInt();
	this.p_setType(t_iType);
	if(this.m__color.m__r==254 && this.m__color.m__g==254 && this.m__color.m__b==254){
		this.m__hidden=true;
		this.m__showinfo=true;
	}
	while(t_stream.p_hasNext()){
		var t_type=t_stream.p_nextInt();
		var t_1=t_type;
		if(t_1==1){
			var t_o=c_GraphicItem.m_new.call(new c_GraphicItem);
			t_o.p_deserialize(t_stream.p_nextObject());
			this.m__items.p_add(t_o);
		}else{
			throw c_LException.m_new.call(new c_LException,"falscher Objekttyp");
		}
	}
	this.m__end=this.m__start;
	var t_=this.m__items.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o2=t_.p_NextObject();
		var t_item=object_downcast((t_o2),c_GraphicItem);
		this.m__end+=t_item.m__duration;
	}
}
c_GraphicDataSet.prototype.p_isZero=function(){
	var t_=this.m__items.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		var t_item=object_downcast((t_o),c_GraphicItem);
		if(t_item.m__start!=0.0 || t_item.m__end!=0.0){
			return false;
		}
	}
	return true;
}
c_GraphicDataSet.prototype.p_mustDrawAsPlane=function(){
	if(this.m__drawAsPane==true && this.m__hidden==false && this.m__switchedoff==false){
		if(this.p_isZero()==false){
			return true;
		}
	}
	return false;
}
c_GraphicDataSet.prototype.p_mustDrawAsLine=function(){
	if(this.m__drawAsLine==true && this.m__hidden==false && this.m__switchedoff==false){
		if(this.p_isZero()==false){
			return true;
		}
	}
	return false;
}
c_GraphicDataSet.prototype.p_drawHoricontalLine=function(){
	if((this.m__linetype&16)==16){
		return true;
	}
	return false;
}
c_GraphicDataSet.prototype.p_drawCurvedLine=function(){
	if((this.m__linetype&8)==8){
		return true;
	}
	return false;
}
c_GraphicDataSet.prototype.p_isLineStyleDASH=function(){
	if((this.m__linetype&2)==2){
		return true;
	}
	return false;
}
c_GraphicDataSet.prototype.p_isLineStyleDOTS=function(){
	if((this.m__linetype&1)==1){
		return true;
	}
	return false;
}
c_GraphicDataSet.prototype.p_getItemForPeriod=function(t_period){
	if(t_period==0){
		var t_item=object_downcast((this.m__items.p_getObject(0)),c_GraphicItem);
		return t_item;
	}
	if(t_period<this.m__start || t_period>this.m__end){
		return null;
	}
	var t_current=this.m__start;
	var t_=this.m__items.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		var t_item2=object_downcast((t_o),c_GraphicItem);
		if(t_current+t_item2.m__duration>t_period){
			return t_item2;
		}
		t_current+=t_item2.m__duration;
	}
	return null;
}
function c_GraphicItem(){
	Object.call(this);
	this.m__start=.0;
	this.m__end=.0;
	this.m__duration=1;
	this.implments={c_IDeserializableGraphObject:1};
}
c_GraphicItem.m_new=function(){
	return this;
}
c_GraphicItem.prototype.p_deserialize=function(t_stream){
	this.m__start=t_stream.p_nextDouble();
	this.m__end=t_stream.p_nextDouble();
	this.m__duration=t_stream.p_nextInt();
}
function c_CollectionEnumerator(){
	Object.call(this);
	this.m__arr=null;
	this.m__curr=0;
}
c_CollectionEnumerator.m_new=function(t_arr){
	this.m__arr=t_arr;
	this.m__curr=-1;
	return this;
}
c_CollectionEnumerator.m_new2=function(){
	return this;
}
c_CollectionEnumerator.prototype.p_HasNext=function(){
	if(this.m__curr+1<this.m__arr.p_length()){
		return true;
	}
	return false;
}
c_CollectionEnumerator.prototype.p_NextObject=function(){
	this.m__curr+=1;
	return this.m__arr.p_getObject(this.m__curr);
}
function c_GraphicTimeSection(){
	Object.call(this);
	this.m__tstitle="";
	this.m__start=0;
	this.m__duration=0;
	this.m__xtext="";
	this.m__helperTick=false;
	this.m__inspecttitle="";
	this.implments={c_IDeserializableGraphObject:1};
}
c_GraphicTimeSection.m_new=function(){
	return this;
}
c_GraphicTimeSection.prototype.p_deserialize=function(t_stream){
	this.m__tstitle=t_stream.p_nextString();
	this.m__start=t_stream.p_nextInt();
	this.m__duration=t_stream.p_nextInt();
	this.m__xtext=t_stream.p_nextString();
	this.m__helperTick=t_stream.p_nextBoolean();
	this.m__inspecttitle=t_stream.p_nextString();
}
function c_GraphicYData(){
	Object.call(this);
	this.m__y=.0;
	this.implments={c_IDeserializableGraphObject:1};
}
c_GraphicYData.m_new=function(){
	return this;
}
c_GraphicYData.prototype.p_deserialize=function(t_stream){
	this.m__y=t_stream.p_nextDouble();
}
function c_Limitation(){
	Object.call(this);
	this.m__MAX_INT=2147483647;
	this.m__MIN_INT=-2147483648;
	this.m__MAX_FLOAT=(2.0-Math.pow(2.0,-23.0))*Math.pow(2.0,127.0);
}
c_Limitation.m_new=function(){
	return this;
}
c_Limitation.m_limits=null;
function bb_math_Min(t_x,t_y){
	if(t_x<t_y){
		return t_x;
	}
	return t_y;
}
function bb_math_Min2(t_x,t_y){
	if(t_x<t_y){
		return t_x;
	}
	return t_y;
}
function bb_math_Max(t_x,t_y){
	if(t_x>t_y){
		return t_x;
	}
	return t_y;
}
function bb_math_Max2(t_x,t_y){
	if(t_x>t_y){
		return t_x;
	}
	return t_y;
}
function c_GraphicContainer(){
	Object.call(this);
	this.m__name="";
	this.m__descriptions=c_Collection.m_new.call(new c_Collection);
	this.implments={c_IDeserializableGraphObject:1};
}
c_GraphicContainer.m_new=function(){
	return this;
}
c_GraphicContainer.prototype.p_deserialize=function(t_stream){
	this.m__name=t_stream.p_nextString();
	while(t_stream.p_hasNext()){
		var t_type=t_stream.p_nextInt();
		var t_1=t_type;
		if(t_1==10){
			var t_o=c_GraphicDescription.m_new.call(new c_GraphicDescription);
			t_o.p_deserialize(t_stream.p_nextObject());
			this.m__descriptions.p_add(t_o);
		}else{
			if(t_1==9){
				t_stream.p_nextObject();
			}else{
				throw c_LException.m_new.call(new c_LException,"falscher Objekttyp");
			}
		}
	}
}
function c_GraphicDescription(){
	Object.call(this);
	this.m__name="";
	this.m__from=.0;
	this.m__to=.0;
	this.m__minY=.0;
	this.m__maxY=.0;
	this.m__data=null;
	this.implments={c_IDeserializableGraphObject:1};
}
c_GraphicDescription.m_new=function(){
	return this;
}
c_GraphicDescription.prototype.p_deserialize=function(t_stream){
	this.m__name=t_stream.p_nextString();
	this.m__from=t_stream.p_nextDouble();
	this.m__to=t_stream.p_nextDouble();
	this.m__minY=t_stream.p_nextDouble();
	this.m__maxY=t_stream.p_nextDouble();
}
function c_DrawNoData(){
	c_DrawBase.call(this);
}
c_DrawNoData.prototype=extend_class(c_DrawBase);
c_DrawNoData.m_new=function(){
	c_DrawBase.m_new.call(this);
	return this;
}
c_DrawNoData.prototype.p_release=function(){
}
c_DrawNoData.prototype.p_draw2=function(t_g){
	var t_paint=null;
	var t_mustEndRender=false;
	if(t_g.p_isRendering()==false){
		t_g.p_beginRender(true);
		t_mustEndRender=true;
	}
	t_paint=c_NoDataPainter.m_new2.call(new c_NoDataPainter);
	t_paint.p_draw2(t_g);
	if(t_mustEndRender){
		t_g.p_endRender();
	}
	return true;
}
c_DrawNoData.prototype.p_redraw2=function(t_g){
	return this.p_draw2(t_g);
}
c_DrawNoData.prototype.p_getHotspotAt=function(t_x,t_y){
	return null;
}
function c_DrawGraphicData(){
	c_DrawBase.call(this);
	this.m__data=null;
	this.m__painter=null;
	this.m__hotspots=null;
}
c_DrawGraphicData.prototype=extend_class(c_DrawBase);
c_DrawGraphicData.m_new=function(t_d){
	c_DrawBase.m_new.call(this);
	this.m__data=t_d;
	this.m__painter=(c_NullPainter.m_new.call(new c_NullPainter,this));
	var t_1=this.m__data.m__options.m__gt;
	if(t_1==0){
		this.m__painter=(c_AreaPainter.m_new.call(new c_AreaPainter,this));
	}else{
		if(t_1==1){
			this.m__painter=(c_PiePainter.m_new.call(new c_PiePainter,this));
		}else{
			if(t_1==4){
				this.m__painter=(c_StackedBarPainter.m_new.call(new c_StackedBarPainter,this));
			}else{
				if(t_1==2){
					this.m__painter=(c_ClusteredBarPainter.m_new.call(new c_ClusteredBarPainter,this));
				}
			}
		}
	}
	return this;
}
c_DrawGraphicData.m_new2=function(){
	c_DrawBase.m_new.call(this);
	return this;
}
c_DrawGraphicData.prototype.p_release=function(){
	this.m__data=null;
	if(this.m__painter!=null){
		this.m__painter.p_release();
	}
	this.m__painter=null;
	this.m__hotspots=null;
}
c_DrawGraphicData.prototype.p_prepare=function(t_g){
	this.m__painter.p_prepareGraph(t_g);
}
c_DrawGraphicData.prototype.p_draw2=function(t_g){
	var t_mustEndRender=false;
	this.m__hotspots=c_Collection.m_new.call(new c_Collection);
	if(this.m__painter==null){
		return false;
	}
	if(t_g.p_isRendering()==false){
		t_g.p_beginRender(true);
		t_mustEndRender=true;
	}
	this.p_prepare(t_g);
	if(this.m__data.m__options.m__legend!=3){
		this.m__hotspots.p_addAll(this.m__painter.p_draw2(t_g).p_getArray());
	}
	this.m__hotspots.p_addAll(this.m__painter.p_drawLegend(t_g).p_getArray());
	if(t_mustEndRender){
		t_g.p_endRender();
	}
	return true;
}
c_DrawGraphicData.prototype.p_redraw2=function(t_g){
	return this.p_draw2(t_g);
}
c_DrawGraphicData.prototype.p_getHotspotAt=function(t_x,t_y){
	if(this.m__hotspots==null){
		return null;
	}
	var t_p=c_Point.m_new2.call(new c_Point,t_x,t_y);
	var t_=this.m__hotspots.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		var t_h=object_downcast((t_o),c_HotSpot);
		if(t_p.p_isInRectangle(t_h.m__bounds)){
			return t_h;
		}
	}
	return null;
}
function c_Painter(){
	Object.call(this);
	this.m__dd=null;
	this.m__data=null;
	this.m__options=null;
	this.m__legendpanel=null;
	this.m__fullsize=true;
	this.m__bounds=null;
	this.m__g=null;
	this.m__margin=null;
	this.m__min_margin_left=.0;
	this.m__min_margin_right=.0;
}
c_Painter.m_new=function(t_dd){
	this.m__dd=t_dd;
	this.m__data=this.m__dd.m__data;
	this.m__options=this.m__data.m__options;
	return this;
}
c_Painter.m_new2=function(){
	return this;
}
c_Painter.prototype.p_release=function(){
	this.m__dd=null;
	this.m__data=null;
	this.m__options=null;
	this.m__legendpanel=null;
}
c_Painter.prototype.p_prepareData=function(){
}
c_Painter.prototype.p_prepareMargins=function(){
}
c_Painter.prototype.p_getDatasetForLegends=function(){
	return c_Collection.m_new.call(new c_Collection);
}
c_Painter.prototype.p_prepareLegend=function(){
	this.m__legendpanel=null;
	if(this.m__options.m__gt==3 || this.m__options.m__legend==0){
		return;
	}
	var t_maxHorizontalWidth=this.m__bounds.m__w-bb_math_Max2(this.m__min_margin_left,this.m__margin.m__left)-bb_math_Max2(this.m__min_margin_right,this.m__margin.m__right);
	this.m__legendpanel=c_LegendPanel.m_new.call(new c_LegendPanel,this.m__data,this.p_getDatasetForLegends());
	this.m__legendpanel.p_calculateDimension((this.m__g),t_maxHorizontalWidth);
	var t_rect=this.m__legendpanel.m__bounds;
	var t_1=this.m__legendpanel.m__type;
	if(t_1==2){
		t_rect.m__y=this.m__bounds.m__y+this.m__bounds.m__h-t_rect.m__h-5.0-1.0;
		t_rect.m__x=this.m__bounds.m__x+bb_math_Max2(this.m__min_margin_left,this.m__margin.m__left);
		this.m__margin.m__bottom+=t_rect.m__h+10.0;
	}else{
		if(t_1==1){
			t_rect.m__y=this.m__bounds.m__y+5.0;
			t_rect.m__x=this.m__bounds.m__x+bb_math_Max2(this.m__min_margin_left,this.m__margin.m__left);
			this.m__margin.m__top+=t_rect.m__h+10.0;
		}else{
			if(t_1==3){
				t_rect.m__y=this.m__bounds.m__y+5.0;
				t_rect.m__x=this.m__bounds.m__x+bb_math_Max2(this.m__min_margin_left,this.m__margin.m__left);
			}else{
				if(t_1==4){
					t_rect.m__y=this.m__bounds.m__y+this.m__margin.m__top;
					if(this.m__min_margin_right-this.m__margin.m__right>t_rect.m__w+10.0){
						t_rect.m__x=this.m__bounds.m__x+this.m__bounds.m__w-this.m__min_margin_right+10.0;
						this.m__margin.m__right=this.m__min_margin_right;
					}else{
						t_rect.m__x=this.m__bounds.m__x+this.m__bounds.m__w-t_rect.m__w-this.m__margin.m__right;
						this.m__margin.m__right+=t_rect.m__w+10.0;
					}
				}
			}
		}
	}
	this.m__legendpanel.m__bounds=t_rect;
}
c_Painter.prototype.p_prepareGraph=function(t_gArea){
	if(this.m__fullsize || this.m__bounds==null){
		this.m__bounds=c_Rectangle.m_new.call(new c_Rectangle,0.0,0.0,t_gArea.p_getDeviceWidth(),t_gArea.p_getDeviceHeight());
	}
	this.m__g=c_Graph2DPanel.m_new2.call(new c_Graph2DPanel,t_gArea,this.m__bounds);
	this.p_prepareData();
	this.m__margin=c_Margin.m_new.call(new c_Margin,5.0);
	if(this.m__options.m__legend!=3){
		this.p_prepareMargins();
	}
	this.p_prepareLegend();
	this.m__margin.m__left=bb_math_Max2(this.m__min_margin_left,this.m__margin.m__left);
	this.m__margin.m__right=bb_math_Max2(this.m__min_margin_right,this.m__margin.m__right);
}
c_Painter.prototype.p_draw2=function(t_gArea){
	return c_Collection.m_new.call(new c_Collection);
}
c_Painter.prototype.p_drawLegend=function(t_gArea){
	if(this.m__legendpanel!=null){
		var t_paint=c_LegendPainter.m_new.call(new c_LegendPainter,this.m__legendpanel);
		return t_paint.p_draw2(t_gArea);
	}
	return c_Collection.m_new.call(new c_Collection);
}
c_Painter.prototype.p_mustDrawBorderAroundItems=function(){
	if(this.m__options.m__borderUseSetColor==false && this.m__options.m__borderWidth>0.0){
		return true;
	}
	return false;
}
function c_NullPainter(){
	c_Painter.call(this);
}
c_NullPainter.prototype=extend_class(c_Painter);
c_NullPainter.m_new=function(t_dd){
	c_Painter.m_new.call(this,t_dd);
	return this;
}
c_NullPainter.m_new2=function(){
	c_Painter.m_new2.call(this);
	return this;
}
function c_AreaPainter(){
	c_Painter.call(this);
	this.m__graphheaderheight=.0;
	this.m__min=.0;
	this.m__max=.0;
	this.m__arrow=.0;
	this.m__validBoundary=false;
	this.m__xScaleFactor=.0;
	this.m__yScaleFactor=.0;
	this.m__neutrum=.0;
	this.m__xAxisItems=null;
	this.m__yAxisItems=null;
	this.m__TextItems=null;
}
c_AreaPainter.prototype=extend_class(c_Painter);
c_AreaPainter.m_new=function(t_dd){
	c_Painter.m_new.call(this,t_dd);
	return this;
}
c_AreaPainter.m_new2=function(){
	c_Painter.m_new2.call(this);
	return this;
}
c_AreaPainter.prototype.p_prepareData=function(){
}
c_AreaPainter.prototype.p_getDatasetForLegends=function(){
	var t_legitems=c_Collection.m_new.call(new c_Collection);
	var t_=this.m__data.m__sets.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_oset=t_.p_NextObject();
		var t_ds=object_downcast((t_oset),c_GraphicDataSet);
		if(t_ds.m__hidden==false && t_ds.m__legend!=""){
			t_legitems.p_add(t_ds);
		}
	}
	t_legitems.p_invert();
	return t_legitems;
}
c_AreaPainter.prototype.p_calculateTimeSectionHeight=function(t_g){
	var t_=this.m__data.m__ts.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_ots=t_.p_NextObject();
		var t_ts=object_downcast((t_ots),c_GraphicTimeSection);
		if(t_ts.m__tstitle!=""){
			var t_tsArrowSize=t_g.p_floatSize(this.m__options.m__arrowPercentTS,this.m__options.m__fontTS);
			var t_h=t_g.p_getFontHeight2(this.m__options.m__fontTS);
			t_h+=t_tsArrowSize;
			return t_h;
		}
	}
	return 0.0;
}
c_AreaPainter.prototype.p_calculateYArrowHeight=function(t_g){
	if(this.m__options.m__yAxis){
		if(this.m__options.m__arrowPercentY>0.0){
			var t_h=t_g.p_floatSize(this.m__options.m__arrowPercentY,this.m__options.m__fontY);
			t_h=t_h+5.0;
			return t_h;
		}
	}
	return 5.0;
}
c_AreaPainter.prototype.p_mustDrawXAxisOnTop=function(){
	if(this.m__options.m__gt==0){
		return false;
	}
	if(this.m__data.m__min<0.0 && this.m__data.m__max==0.0){
		return true;
	}
	return false;
}
c_AreaPainter.prototype.p_calculateXAxisTextHeight=function(t_g){
	var t_lines=1;
	var t_=this.m__data.m__ts.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_ots=t_.p_NextObject();
		var t_ts=object_downcast((t_ots),c_GraphicTimeSection);
		if(t_ts.m__helperTick==false){
			if(t_ts.m__xtext!=""){
				var t_slines=t_ts.m__xtext.split("\\n");
				t_lines=bb_math_Max(t_lines,t_slines.length);
			}
		}
	}
	return t_g.p_getFontHeight2(this.m__options.m__fontX)*(t_lines);
}
c_AreaPainter.prototype.p_calculateXArrowWidth=function(t_g){
	if(this.m__options.m__xAxis){
		if(this.m__options.m__arrowPercentX>0.0){
			var t_w=t_g.p_floatSize(this.m__options.m__arrowPercentX,this.m__options.m__fontX);
			t_w=t_w+5.0;
			return t_w;
		}
	}
	return 0.0;
}
c_AreaPainter.prototype.p_calculateMargin=function(t_g){
	this.m__data.p_prepareDiscreteValues(true);
	var t_hTitle=.0;
	var t_hTS=this.p_calculateTimeSectionHeight(t_g);
	var t_hYArr=this.p_calculateYArrowHeight(t_g);
	if(this.m__data.m__title1!=""){
		t_hTitle=t_g.p_getFontHeight2(this.m__options.m__fontTitle1);
	}
	if(this.m__data.m__title2!=""){
		t_hTitle+=t_g.p_getFontHeight2(this.m__options.m__fontTitle2);
	}
	this.m__margin.m__top+=t_hTitle;
	if(t_hTitle>0.0){
		this.m__margin.m__top=this.m__margin.m__top+5.0;
	}
	this.m__margin.m__top+=t_hTS;
	if(t_hTS>0.0){
		this.m__margin.m__top=this.m__margin.m__top+5.0;
	}
	if(this.m__options.m__xAxis){
		if(this.p_mustDrawXAxisOnTop()){
			this.m__margin.m__bottom+=t_hYArr;
		}else{
			this.m__margin.m__top+=t_hYArr;
		}
		if(this.p_mustDrawXAxisOnTop()){
			this.m__margin.m__top+=this.p_calculateXAxisTextHeight(t_g);
			this.m__margin.m__top=this.m__margin.m__top+10.0;
			this.m__margin.m__top=this.m__margin.m__top+6.0;
		}else{
			this.m__margin.m__bottom+=this.p_calculateXAxisTextHeight(t_g);
			this.m__margin.m__bottom=this.m__margin.m__bottom+5.0;
			this.m__margin.m__bottom=this.m__margin.m__bottom+6.0;
		}
	}
	if(this.m__options.m__yAxis){
		if(this.m__data.m__must_create_std_yticks){
			this.m__data.p_generateStandardYAxis((this.m__bounds.m__h-this.m__margin.m__top-this.m__margin.m__bottom)|0);
		}
		var t_maxWidth=.0;
		var t_font=this.m__options.m__fontY;
		var t_=this.m__data.m__yticks.p_ObjectEnumerator();
		while(t_.p_HasNext()){
			var t_otick=t_.p_NextObject();
			var t_yT=object_downcast((t_otick),c_GraphicYData);
			t_maxWidth=bb_math_Max2(t_maxWidth,t_g.p_getTextWidth2(this.m__data.p_formatY(t_yT.m__y),t_font));
		}
		t_maxWidth=bb_math_Max2(t_maxWidth,t_g.p_getTextWidth2(this.m__data.p_formatY(this.m__data.m__min),t_font));
		t_maxWidth=bb_math_Max2(t_maxWidth,t_g.p_getTextWidth2(this.m__data.p_formatY(this.m__data.m__max),t_font));
		this.m__margin.m__left+=t_maxWidth;
		this.m__margin.m__left=this.m__margin.m__left+5.0;
		this.m__margin.m__left=this.m__margin.m__left+6.0;
		this.m__margin.m__left=this.m__margin.m__left+1.0;
	}
	var t_wXArr=this.p_calculateXArrowWidth(t_g);
	this.m__margin.m__right+=t_wXArr;
	this.m__graphheaderheight=this.m__margin.m__top-5.0;
}
c_AreaPainter.prototype.p_prepareMargins=function(){
	this.p_calculateMargin(this.m__g);
}
c_AreaPainter.prototype.p_calculateScaling=function(){
	this.m__validBoundary=true;
	if(this.m__data.m__maxT-this.m__data.m__minT==0){
		this.m__xScaleFactor=0.0;
	}else{
		this.m__xScaleFactor=(this.m__bounds.m__w-this.m__margin.m__left-this.m__margin.m__right)/(this.m__data.m__maxT-this.m__data.m__minT);
		if(this.m__xScaleFactor<0.0){
			this.m__xScaleFactor=0.0;
			this.m__validBoundary=false;
		}
	}
	if(this.m__max-this.m__min==0.0){
		this.m__yScaleFactor=0.0;
	}else{
		this.m__yScaleFactor=(this.m__bounds.m__h-this.m__margin.m__top-this.m__margin.m__bottom)/(this.m__max-this.m__min);
		if(this.m__yScaleFactor<0.0){
			this.m__yScaleFactor=0.0;
			this.m__validBoundary=false;
		}
	}
}
c_AreaPainter.prototype.p_prepareForPainting=function(){
	if(this.m__min>0.0){
		this.m__neutrum=this.m__min;
	}else{
		if(this.m__max<0.0){
			this.m__neutrum=this.m__max;
		}else{
			this.m__neutrum=0.0;
		}
	}
	this.m__xAxisItems=c_Collection.m_new.call(new c_Collection);
	this.m__yAxisItems=c_Collection.m_new.call(new c_Collection);
	this.m__TextItems=c_Collection.m_new.call(new c_Collection);
}
c_AreaPainter.prototype.p_scaleX=function(t_value){
	if(this.m__xScaleFactor==0.0){
		return 0.0;
	}
	return this.m__margin.m__left+(t_value-(this.m__data.m__minT))*this.m__xScaleFactor;
}
c_AreaPainter.prototype.p_createXAxisItem=function(t_ts){
	var t_ti=null;
	t_ti=c_TicItem.m_new2.call(new c_TicItem,t_ts);
	t_ti.m__x=this.p_scaleX(t_ts.m__start);
	if(this.p_mustDrawXAxisOnTop()){
		t_ti.m__y=this.m__bounds.m__y+this.m__margin.m__top;
	}else{
		t_ti.m__y=this.m__bounds.m__h-this.m__margin.m__bottom;
	}
	t_ti.m__bounds=this.m__g.p_getMultiLineTextRect2(t_ti.m__text,this.m__options.m__fontX);
	t_ti.m__bounds.m__x=t_ti.m__x;
	if(this.m__options.m__centerTickText){
		t_ti.m__bounds.m__x-=t_ti.m__bounds.m__w/2.0;
	}
	if(this.p_mustDrawXAxisOnTop()){
		t_ti.m__bounds.m__y=t_ti.m__y-6.0-5.0-t_ti.m__bounds.m__h;
	}else{
		t_ti.m__bounds.m__y=t_ti.m__y+6.0+5.0;
	}
	t_ti.m__bounds.p_repositionXtoBound(this.m__bounds);
	t_ti.m__textcolor=this.m__options.m__xAxisTextColor;
	t_ti.m__font=this.m__options.m__fontX;
	if(this.m__options.m__centerTickText){
		t_ti.m__textalign=1;
	}else{
		t_ti.m__textalign=0;
	}
	t_ti.m__pt1.m__x=t_ti.m__x;
	t_ti.m__pt2.m__x=t_ti.m__x;
	if(this.m__options.m__centerTick){
		t_ti.m__pt1.m__y=t_ti.m__y-6.0;
		t_ti.m__pt2.m__y=t_ti.m__y+6.0;
	}else{
		if(this.p_mustDrawXAxisOnTop()){
			t_ti.m__pt1.m__y=t_ti.m__y-6.0-1.0;
			t_ti.m__pt2.m__y=t_ti.m__y;
		}else{
			t_ti.m__pt1.m__y=t_ti.m__y;
			t_ti.m__pt2.m__y=t_ti.m__y+6.0+1.0;
		}
	}
	t_ti.m__stroke=this.m__options.m__xAxisStroke;
	t_ti.m__tickcolor=this.m__options.m__xAxisLineColor;
	return t_ti;
}
c_AreaPainter.prototype.p_collectXAxisItems=function(){
	var t_spaceX=4.0;
	var t_spaceY=4.0;
	if(this.m__options.m__xAxis==false){
		return;
	}
	var t_cLastTextPlace=null;
	var t_=this.m__data.m__ts.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_ots=t_.p_NextObject();
		var t_ts=object_downcast((t_ots),c_GraphicTimeSection);
		if(t_ts.m__helperTick==false){
			if(t_ts.m__xtext!=""){
				var t_ti=this.p_createXAxisItem(t_ts);
				if(t_ti.m__bounds.p_isOverlapping(t_cLastTextPlace,t_spaceX,t_spaceY)==false){
					t_cLastTextPlace=t_ti.m__bounds;
					this.m__xAxisItems.p_add(t_ti);
				}
			}
		}
	}
}
c_AreaPainter.prototype.p_scaleY=function(t_value){
	if(this.m__yScaleFactor==0.0){
		return this.m__bounds.m__h-this.m__margin.m__bottom;
	}
	return this.m__margin.m__top+(this.m__max-t_value)*this.m__yScaleFactor;
}
c_AreaPainter.prototype.p_createYAxisItem=function(t_value){
	var t_ti=null;
	if(t_value<this.m__min || t_value>this.m__max){
		return null;
	}
	t_ti=c_TicItem.m_new.call(new c_TicItem);
	t_ti.m__from=t_value;
	t_ti.m__to=t_value;
	t_ti.m__text=this.m__data.p_formatY(t_value);
	t_ti.m__x=this.m__margin.m__left;
	t_ti.m__y=this.p_scaleY(t_value);
	t_ti.m__bounds=this.m__g.p_getMultiLineTextRect2(t_ti.m__text,this.m__options.m__fontY);
	t_ti.m__bounds.m__x=t_ti.m__x-t_ti.m__bounds.m__w-6.0-5.0;
	t_ti.m__bounds.m__y=t_ti.m__y-t_ti.m__bounds.m__h/2.0+1.0;
	t_ti.m__textcolor=this.m__options.m__yAxisTextColor;
	t_ti.m__font=this.m__options.m__fontY;
	t_ti.m__textalign=0;
	if(this.m__options.m__centerTick){
		t_ti.m__pt1.m__x=t_ti.m__x-6.0;
		t_ti.m__pt2.m__x=t_ti.m__x+6.0;
	}else{
		t_ti.m__pt1.m__x=t_ti.m__x-6.0-1.0;
		t_ti.m__pt2.m__x=t_ti.m__x;
	}
	t_ti.m__pt1.m__y=t_ti.m__y;
	t_ti.m__pt2.m__y=t_ti.m__y;
	t_ti.m__stroke=this.m__options.m__yAxisStroke;
	t_ti.m__tickcolor=this.m__options.m__yAxisLineColor;
	return t_ti;
}
c_AreaPainter.prototype.p_collectYAxisItems=function(){
	var t_spaceX=4.0;
	var t_spaceY=4.0;
	if(this.m__options.m__yAxis==false){
		return;
	}
	var t_hasSwitchedOffItems=false;
	var t_=this.m__data.m__sets.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_oset=t_.p_NextObject();
		var t_ds=object_downcast((t_oset),c_GraphicDataSet);
		if(t_ds.m__hidden==false && t_ds.m__switchedoff==true){
			t_hasSwitchedOffItems=true;
			break;
		}
	}
	var t_mustShowMinMaxTicks=false;
	var t_vec=c_DynamicFloatArray.m_new.call(new c_DynamicFloatArray);
	t_vec.p_add2(0.0);
	if(this.m__data.m__yticks.p_length()==0 || t_hasSwitchedOffItems==true){
		t_mustShowMinMaxTicks=true;
		if(t_vec.p_contains(this.m__min)==false){
			t_vec.p_add2(this.m__min);
		}
		if(t_vec.p_contains(this.m__max)==false){
			t_vec.p_add2(this.m__max);
		}
	}
	var t_2=this.m__data.m__yticks.p_ObjectEnumerator();
	while(t_2.p_HasNext()){
		var t_otick=t_2.p_NextObject();
		var t_yT=object_downcast((t_otick),c_GraphicYData);
		if(t_vec.p_contains(t_yT.m__y)==false){
			t_vec.p_add2(t_yT.m__y);
		}
	}
	t_vec.p_sortArray(true);
	var t_tiNull=this.p_createYAxisItem(0.0);
	if(t_tiNull==null){
		return;
	}
	this.m__yAxisItems.p_add(t_tiNull);
	if(t_mustShowMinMaxTicks==true){
		var t_tiMin=this.p_createYAxisItem(this.m__min);
		var t_tiMax=this.p_createYAxisItem(this.m__max);
		if(t_tiMin!=null && t_tiMin.m__bounds.p_isOverlapping(t_tiNull.m__bounds,t_spaceX,t_spaceY)==false){
			this.m__yAxisItems.p_add(t_tiMin);
		}
		if(t_tiMax!=null && t_tiMax.m__bounds.p_isOverlapping(t_tiNull.m__bounds,t_spaceX,t_spaceY)==false){
			this.m__yAxisItems.p_add(t_tiMax);
		}
	}
	var t_iNullPos=-1;
	for(var t_i=0;t_i<t_vec.p_length();t_i=t_i+1){
		if(t_vec.p_get(t_i)==0.0){
			t_iNullPos=t_i;
			break;
		}
	}
	for(var t_i2=t_iNullPos;t_i2>=0;t_i2=t_i2+-1){
		var t_over=false;
		var t_nextti=this.p_createYAxisItem(t_vec.p_get(t_i2));
		if(t_nextti==null){
			continue;
		}
		var t_3=this.m__yAxisItems.p_ObjectEnumerator();
		while(t_3.p_HasNext()){
			var t_o=t_3.p_NextObject();
			var t_ti=object_downcast((t_o),c_TicItem);
			if(t_nextti.m__bounds.p_isOverlapping(t_ti.m__bounds,t_spaceX,t_spaceY)){
				t_over=true;
				break;
			}
		}
		if(t_over==false){
			this.m__yAxisItems.p_add(t_nextti);
		}
	}
	for(var t_i3=t_iNullPos+1;t_i3<t_vec.p_length();t_i3=t_i3+1){
		var t_over2=false;
		var t_nextti2=this.p_createYAxisItem(t_vec.p_get(t_i3));
		if(t_nextti2==null){
			continue;
		}
		var t_4=this.m__yAxisItems.p_ObjectEnumerator();
		while(t_4.p_HasNext()){
			var t_o2=t_4.p_NextObject();
			var t_ti2=object_downcast((t_o2),c_TicItem);
			if(t_nextti2.m__bounds.p_isOverlapping(t_ti2.m__bounds,t_spaceX,t_spaceY)){
				t_over2=true;
				break;
			}
		}
		if(t_over2==false){
			this.m__yAxisItems.p_add(t_nextti2);
		}
	}
}
c_AreaPainter.prototype.p_paintBackground=function(){
	if(this.m__options.m__BGColor!=null){
		this.m__g.p_setColor(this.m__options.m__BGColor);
		this.m__g.p_drawRect2(this.m__bounds,true);
	}
}
c_AreaPainter.prototype.p_paintVGrid=function(t_ti){
	var t_x=t_ti.m__x;
	var t_y=t_ti.m__y;
	this.m__g.p_setColor(this.m__options.m__gridLineColor);
	this.m__g.p_setStroke(this.m__options.m__gridStroke);
	this.m__g.p_drawLine(t_x,this.m__margin.m__top,t_x,t_y);
}
c_AreaPainter.prototype.p_paintHGrid=function(t_ti){
	var t_y=t_ti.m__y;
	if(t_ti.m__from==0.0){
		this.m__g.p_setColor(this.m__options.m__yAxisLineColor);
		this.m__g.p_setStroke(this.m__options.m__yAxisStroke);
	}else{
		this.m__g.p_setColor(this.m__options.m__gridLineColor);
		this.m__g.p_setStroke(this.m__options.m__gridStroke);
	}
	this.m__g.p_drawLine(this.m__margin.m__left,t_y,this.m__bounds.m__w-this.m__margin.m__right,t_y);
}
c_AreaPainter.prototype.p_paintBackgroundGrids=function(){
	if(this.m__options.m__showGrid==11 || this.m__options.m__showGrid==13){
		var t_=this.m__xAxisItems.p_ObjectEnumerator();
		while(t_.p_HasNext()){
			var t_o=t_.p_NextObject();
			var t_ti=object_downcast((t_o),c_TicItem);
			this.p_paintVGrid(t_ti);
		}
	}
	if(this.m__options.m__showGrid==11 || this.m__options.m__showGrid==12){
		var t_2=this.m__yAxisItems.p_ObjectEnumerator();
		while(t_2.p_HasNext()){
			var t_o2=t_2.p_NextObject();
			var t_ti2=object_downcast((t_o2),c_TicItem);
			this.p_paintHGrid(t_ti2);
		}
	}
}
c_AreaPainter.prototype.p_createPlaneItem=function(t_ds,t_period,t_item,t_bStartInPosArea,t_plane,t_ps){
	var t_valueStart=t_item.m__start;
	var t_valueEnd=t_item.m__end;
	var t_timeStart=t_period;
	var t_timeEnd=t_period+t_item.m__duration;
	if(t_period<this.m__data.m__minT){
		t_valueStart+=(this.m__data.m__minT-t_period)*(t_valueEnd-t_valueStart)/(t_item.m__duration);
		t_timeStart=this.m__data.m__minT;
	}
	if(t_period+t_item.m__duration>this.m__data.m__maxT){
		t_valueEnd+=(this.m__data.m__maxT-t_period)*(t_valueEnd-t_valueStart)/(t_item.m__duration);
		t_timeEnd=this.m__data.m__maxT;
	}
	var t_periodlength=t_timeEnd-t_timeStart;
	var t_increment=(t_valueEnd-t_valueStart)/(t_periodlength);
	var t_value=t_valueStart;
	if(t_valueStart!=0.0 || t_valueEnd!=0.0){
		t_plane.p_moveTo(this.p_scaleX(t_timeStart),this.p_scaleY(this.m__neutrum));
		for(var t_t=t_timeStart;t_t<=t_timeEnd;t_t=t_t+1){
			if(t_t==t_timeStart){
				var t_vs=t_ps.p_addValueStart(t_t,t_valueStart,t_bStartInPosArea);
				t_plane.p_lineTo4(this.p_scaleX(t_t),this.p_scaleY(t_vs),false);
				t_ps.p_setNode(t_t);
			}else{
				if(t_t==t_timeEnd){
					var t_ve=t_ps.p_addValueEnd(t_t,t_valueEnd,t_bStartInPosArea);
					t_plane.p_lineTo4(this.p_scaleX(t_t),this.p_scaleY(t_ve),false);
					t_ps.p_setNode(t_t);
				}else{
					var t_vs2=t_ps.p_addValueStart(t_t,t_value,t_bStartInPosArea);
					var t_ve2=t_ps.p_addValueEnd(t_t,t_value,t_bStartInPosArea);
					if(t_ps.p_isNode(t_t)){
						t_plane.p_lineTo4(this.p_scaleX(t_t),this.p_scaleY(t_ve2),false);
						if(t_ve2!=t_vs2){
							t_plane.p_lineTo4(this.p_scaleX(t_t),this.p_scaleY(t_vs2),false);
						}
					}
				}
			}
			t_value+=t_increment;
		}
		t_plane.p_lineTo4(this.p_scaleX(t_timeEnd),this.p_scaleY(this.m__neutrum),false);
		t_plane.p_lineTo4(this.p_scaleX(t_timeStart),this.p_scaleY(this.m__neutrum),false);
	}
	return t_timeEnd;
}
c_AreaPainter.prototype.p_createPlane=function(t_ds,t_ps){
	var t_period=t_ds.m__start;
	var t_t=t_period;
	var t_plane=c_GeneralPath.m_new.call(new c_GeneralPath);
	var t_bStartInPosArea=true;
	var t_=t_ds.m__items.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_oitem=t_.p_NextObject();
		var t_item=object_downcast((t_oitem),c_GraphicItem);
		if(t_period>this.m__data.m__maxT){
			break;
		}else{
			if(t_period+t_item.m__duration<this.m__data.m__minT){
			}else{
				if(t_item.m__start>0.0){
					t_bStartInPosArea=true;
					break;
				}else{
					if(t_item.m__start<0.0){
						t_bStartInPosArea=false;
						break;
					}
				}
			}
		}
	}
	var t_2=t_ds.m__items.p_ObjectEnumerator();
	while(t_2.p_HasNext()){
		var t_oitem2=t_2.p_NextObject();
		var t_item2=object_downcast((t_oitem2),c_GraphicItem);
		if(t_period>this.m__data.m__maxT){
			break;
		}else{
			if(t_period+t_item2.m__duration<this.m__data.m__minT){
			}else{
				t_t=this.p_createPlaneItem(t_ds,t_period,t_item2,t_bStartInPosArea,t_plane,t_ps);
			}
		}
		t_period+=t_item2.m__duration;
	}
	return t_plane;
}
c_AreaPainter.prototype.p_paintCollectedPlanes=function(t_planes){
	var t_=t_planes.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		var t_shape=object_downcast((t_o),c_Plane);
		this.m__g.p_setColor(t_shape.m__color);
		t_shape.p_draw3((this.m__g),true);
	}
}
c_AreaPainter.prototype.p_paintCollectedPlaneBorders=function(t_planes){
}
c_AreaPainter.prototype.p_paintPlanes=function(){
	var t_stacker=c_PlaneStacker.m_new.call(new c_PlaneStacker,this.m__data);
	var t_planes=c_Collection.m_new.call(new c_Collection);
	var t_=this.m__data.m__sets.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_oset=t_.p_NextObject();
		var t_ds=object_downcast((t_oset),c_GraphicDataSet);
		if(t_ds.p_mustDrawAsPlane()){
			var t_shape=null;
			t_shape=this.p_createPlane(t_ds,t_stacker);
			t_planes.p_add(c_Plane.m_new.call(new c_Plane,t_shape,t_ds.m__color));
		}
	}
	t_planes.p_invert();
	this.p_paintCollectedPlanes(t_planes);
	this.p_paintCollectedPlaneBorders(t_planes);
}
c_AreaPainter.prototype.p_paintForegroundGrids=function(){
	if(this.m__options.m__showGrid==1 || this.m__options.m__showGrid==3){
		var t_=this.m__xAxisItems.p_ObjectEnumerator();
		while(t_.p_HasNext()){
			var t_o=t_.p_NextObject();
			var t_ti=object_downcast((t_o),c_TicItem);
			this.p_paintVGrid(t_ti);
		}
	}
	if(this.m__options.m__showGrid==1 || this.m__options.m__showGrid==2){
		var t_2=this.m__yAxisItems.p_ObjectEnumerator();
		while(t_2.p_HasNext()){
			var t_o2=t_2.p_NextObject();
			var t_ti2=object_downcast((t_o2),c_TicItem);
			this.p_paintHGrid(t_ti2);
		}
	}
}
c_AreaPainter.prototype.p_paintTicks=function(){
	var t_=this.m__xAxisItems.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		var t_ti=object_downcast((t_o),c_TicItem);
		c_ItemPainter.m_draw((this.m__g),(t_ti));
	}
	var t_2=this.m__yAxisItems.p_ObjectEnumerator();
	while(t_2.p_HasNext()){
		var t_o2=t_2.p_NextObject();
		var t_ti2=object_downcast((t_o2),c_TicItem);
		c_ItemPainter.m_draw((this.m__g),(t_ti2));
	}
}
c_AreaPainter.prototype.p_paintTexts=function(){
	var t_=this.m__TextItems.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		var t_ti=object_downcast((t_o),c_TextItem);
		c_ItemPainter.m_draw((this.m__g),(t_ti));
	}
}
c_AreaPainter.prototype.p_getLastLineEndExtension=function(){
	return 0.0;
}
c_AreaPainter.prototype.p_createHoricontalLineItem=function(t_ds,t_period,t_item,t_curve){
	var t_valueStart=t_item.m__start;
	var t_valueEnd=t_item.m__end;
	var t_timeStart=t_period;
	var t_timeEnd=t_period+t_item.m__duration;
	var t_lastItem=false;
	if(t_period<this.m__data.m__minT){
		t_valueStart+=(this.m__data.m__minT-t_period)*(t_valueEnd-t_valueStart)/(t_item.m__duration);
		t_timeStart=this.m__data.m__minT;
	}else{
		if(t_period+t_item.m__duration>this.m__data.m__maxT){
			t_valueEnd+=(this.m__data.m__maxT-t_period)*(t_valueEnd-t_valueStart)/(t_item.m__duration);
			t_timeEnd=this.m__data.m__maxT;
			t_lastItem=true;
		}else{
			if(t_period+t_item.m__duration==this.m__data.m__maxT){
				t_lastItem=true;
			}
		}
	}
	var t_x1=this.p_scaleX(t_timeStart);
	var t_x2=this.p_scaleX(t_timeEnd);
	var t_y2=this.p_scaleY(t_valueEnd);
	if(t_lastItem){
		t_x2+=this.p_getLastLineEndExtension();
	}
	t_curve.p_moveTo(t_x1,t_y2);
	t_curve.p_lineTo4(t_x2,t_y2,false);
}
c_AreaPainter.prototype.p_paintVArrow=function(t_startX,t_startY,t_size){
	if(t_size<2.0 && t_size>-2.0){
		return;
	}
	var t_tip=c_GeneralPath.m_new.call(new c_GeneralPath);
	t_tip.p_moveTo(t_startX,t_startY-t_size);
	t_tip.p_lineTo4(t_startX-t_size*0.4,t_startY,false);
	t_tip.p_lineTo4(t_startX+t_size*0.4,t_startY,false);
	this.m__g.p_setStroke(this.m__options.m__yAxisStroke);
	t_tip.p_draw3((this.m__g),true);
}
c_AreaPainter.prototype.p_drawClipMarker=function(t_x1,t_x2,t_maxClipped){
	var t_x=t_x1+(t_x2-t_x1)/2.0;
	var t_y=.0;
	var t_a=.0;
	if(t_maxClipped){
		t_y=this.p_scaleY(this.m__max);
		t_a=this.m__arrow;
	}else{
		t_y=this.p_scaleY(this.m__min);
		t_a=-this.m__arrow;
	}
	this.m__g.p_drawLine(t_x,t_y,t_x,t_y-t_a);
	this.p_paintVArrow(t_x,t_y-t_a,t_a);
}
c_AreaPainter.prototype.p_createCurveItem=function(t_ds,t_period,t_item,t_curve){
	var t_valueStart=t_item.m__start;
	var t_valueEnd=t_item.m__end;
	var t_timeStart=t_period;
	var t_timeEnd=t_period+t_item.m__duration;
	var t_lastItem=false;
	if(t_period<this.m__data.m__minT){
		t_valueStart+=(this.m__data.m__minT-t_period)*(t_valueEnd-t_valueStart)/(t_item.m__duration);
		t_timeStart=this.m__data.m__minT;
	}else{
		if(t_period+t_item.m__duration>this.m__data.m__maxT){
			t_valueEnd+=(this.m__data.m__maxT-t_period)*(t_valueEnd-t_valueStart)/(t_item.m__duration);
			t_timeEnd=this.m__data.m__maxT;
			t_lastItem=true;
		}else{
			if(t_period+t_item.m__duration==this.m__data.m__maxT){
				t_lastItem=true;
			}
		}
	}
	var t_x1=this.p_scaleX(t_timeStart);
	var t_x2=this.p_scaleX(t_timeEnd);
	var t_y1=this.p_scaleY(t_valueStart);
	var t_y2=this.p_scaleY(t_valueEnd);
	if(t_lastItem){
		t_x2+=this.p_getLastLineEndExtension();
	}
	if(t_valueStart>this.m__max || t_valueStart<this.m__min || t_valueEnd>this.m__max || t_valueEnd<this.m__min){
		var t_clipx1=t_x1;
		var t_clipx2=t_x2;
		var t_clipy1=t_y1;
		var t_clipy2=t_y2;
		var t_d=t_x2-t_x1;
		var t_ymax=this.p_scaleY(this.m__max);
		var t_ymin=this.p_scaleY(this.m__min);
		if(t_valueStart>this.m__max && t_valueEnd>this.m__max){
			t_curve.p_addLineSegment(t_x1,t_ymax,t_x2,t_ymax,t_ds.p_drawCurvedLine());
			this.p_drawClipMarker(t_x1,t_x2,true);
		}else{
			if(t_valueStart<this.m__min && t_valueEnd<this.m__min){
				t_curve.p_addLineSegment(t_x1,t_ymin,t_x2,t_ymin,t_ds.p_drawCurvedLine());
				this.p_drawClipMarker(t_x1,t_x2,false);
			}else{
				if(t_valueStart>this.m__max){
					t_clipx1+=t_d*(t_y1-t_ymax)/(t_y1-t_y2);
					t_clipy1=t_ymax;
				}else{
					if(t_valueStart<this.m__min){
						t_clipx1+=t_d*(t_y2-t_ymin)/(t_y2-t_y1);
						t_clipy1=t_ymin;
					}
				}
				if(t_valueEnd>this.m__max){
					t_clipx2=t_x1+t_d*(t_y2-t_ymax)/(t_y2-t_y1);
					t_clipy2=t_ymax;
				}else{
					if(t_valueEnd<this.m__min){
						t_clipx2=t_x1+t_d*(t_y2-t_ymin)/(t_y1-t_y2);
						t_clipy2=t_ymin;
					}
				}
				if(t_clipx1>t_x1){
					t_curve.p_addLineSegment(t_x1,t_clipy1,t_clipx1,t_clipy1,t_ds.p_drawCurvedLine());
					this.p_drawClipMarker(t_x1,t_clipx1,t_clipy1==t_ymax);
				}
				t_curve.p_addLineSegment(t_clipx1,t_clipy1,t_clipx2,t_clipy2,t_ds.p_drawCurvedLine());
				if(t_clipx2<t_x2){
					t_curve.p_addLineSegment(t_clipx2,t_clipy2,t_x2,t_clipy2,t_ds.p_drawCurvedLine());
					this.p_drawClipMarker(t_clipx2,t_x2,t_clipy2==t_ymax);
				}
			}
		}
	}else{
		t_curve.p_addLineSegment(t_x1,t_y1,t_x2,t_y2,t_ds.p_drawCurvedLine());
	}
}
c_AreaPainter.prototype.p_createCurve=function(t_ds){
	var t_curve=c_GeneralPath.m_new.call(new c_GeneralPath);
	if(t_ds.m__items.p_length()==0){
		return t_curve;
	}
	var t_period=t_ds.m__start;
	var t_=t_ds.m__items.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_oitem=t_.p_NextObject();
		var t_item=object_downcast((t_oitem),c_GraphicItem);
		if(t_period>this.m__data.m__maxT){
			break;
		}else{
			if(t_period+t_item.m__duration<this.m__data.m__minT){
			}else{
				if(t_ds.p_drawHoricontalLine()){
					this.p_createHoricontalLineItem(t_ds,t_period,t_item,t_curve);
				}else{
					this.p_createCurveItem(t_ds,t_period,t_item,t_curve);
				}
			}
		}
		t_period+=t_item.m__duration;
	}
	return t_curve;
}
c_AreaPainter.prototype.p_paintCurves=function(){
	this.m__g.p_setStroke(this.m__options.m__graphStroke);
	var t_=this.m__data.m__sets.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_oset=t_.p_NextObject();
		var t_ds=object_downcast((t_oset),c_GraphicDataSet);
		if(t_ds.p_mustDrawAsLine()){
			var t_shape=null;
			t_shape=this.p_createCurve(t_ds);
			if(t_ds.p_isLineStyleDASH()){
				var t_dash=((this.m__options.m__graphStroke.m__width*3.0)|0);
				this.m__g.p_setLineDash(t_dash);
			}else{
				if(t_ds.p_isLineStyleDOTS()){
					var t_dots=((this.m__options.m__graphStroke.m__width)|0);
					this.m__g.p_setLineDash(t_dots);
				}else{
					this.m__g.p_setLineDash(0);
				}
			}
			this.m__g.p_setColor(t_ds.m__color);
			t_shape.p_draw3((this.m__g),false);
		}
	}
	this.m__g.p_setLineDash(0);
}
c_AreaPainter.prototype.p_paintHArrow=function(t_startX,t_startY,t_size){
	if(t_size<2.0 && t_size>-2.0){
		return;
	}
	var t_tip=c_GeneralPath.m_new.call(new c_GeneralPath);
	t_tip.p_moveTo(t_startX+t_size,t_startY);
	t_tip.p_lineTo4(t_startX,t_startY+t_size*0.4,false);
	t_tip.p_lineTo4(t_startX,t_startY-t_size*0.4,false);
	this.m__g.p_setStroke(this.m__options.m__xAxisStroke);
	t_tip.p_draw3((this.m__g),true);
}
c_AreaPainter.prototype.p_paintAxes=function(){
	var t_bottom=this.m__bounds.m__h-this.m__margin.m__bottom;
	var t_right=this.m__bounds.m__w-this.m__margin.m__right;
	if(this.m__options.m__yAxis){
		this.m__g.p_setColor(this.m__options.m__yAxisLineColor);
		this.m__g.p_setStroke(this.m__options.m__yAxisStroke);
		this.m__g.p_drawLine(this.m__margin.m__left,this.m__margin.m__top,this.m__margin.m__left,t_bottom);
		if(this.m__options.m__arrowPercentY>0.0){
			if(this.p_mustDrawXAxisOnTop()){
				this.m__g.p_drawLine(this.m__margin.m__left,t_bottom,this.m__margin.m__left,t_bottom+5.0);
				this.p_paintVArrow(this.m__margin.m__left,t_bottom+5.0,this.m__g.p_floatSize(this.m__options.m__arrowPercentY,this.m__options.m__fontY)*-1.0);
			}else{
				this.m__g.p_drawLine(this.m__margin.m__left,this.m__margin.m__top-5.0,this.m__margin.m__left,this.m__margin.m__top);
				this.p_paintVArrow(this.m__margin.m__left,this.m__margin.m__top-5.0,this.m__g.p_floatSize(this.m__options.m__arrowPercentY,this.m__options.m__fontY));
			}
		}
		this.m__g.p_setColor(this.m__options.m__yAxisTextColor);
		var t_y=this.m__margin.m__top-this.m__graphheaderheight;
		if(this.m__data.m__title1!=""){
			this.m__g.p_setFont2(this.m__options.m__fontTitle1);
			var t_left=bb_math_Max2(0.0,this.m__margin.m__left-this.m__g.p_getTextWidth(this.m__data.m__title1)/2.0);
			this.m__g.p_drawText(this.m__data.m__title1,t_left,t_y,true);
			t_y+=this.m__g.p_getFontHeight();
		}
		if(this.m__data.m__title1!=""){
			this.m__g.p_setFont2(this.m__options.m__fontTitle2);
			var t_left2=bb_math_Max2(0.0,this.m__margin.m__left-this.m__g.p_getTextWidth(this.m__data.m__title2)/2.0);
			this.m__g.p_drawText(this.m__data.m__title2,t_left2,t_y,true);
			t_y+=this.m__g.p_getFontHeight();
		}
	}
	if(this.m__options.m__xAxis){
		var t_y0=this.p_scaleY(0.0);
		this.m__g.p_setColor(this.m__options.m__xAxisLineColor);
		this.m__g.p_setStroke(this.m__options.m__xAxisStroke);
		this.m__g.p_drawLine(this.m__margin.m__left,t_y0,t_right,t_y0);
		if(this.m__options.m__arrowPercentX>0.0){
			this.m__g.p_drawLine(t_right,t_y0,t_right+5.0,t_y0);
			this.p_paintHArrow(t_right+5.0,t_y0,this.m__g.p_floatSize(this.m__options.m__arrowPercentX,this.m__options.m__fontX));
		}
		if(this.p_mustDrawXAxisOnTop()==false){
			if(this.m__min<0.0){
				this.m__g.p_setColor(this.m__options.m__gridLineColor);
				this.m__g.p_setStroke(this.m__options.m__gridStroke);
				this.m__g.p_drawLine(this.m__margin.m__left,t_bottom,t_right,t_bottom);
			}
		}
	}
}
c_AreaPainter.prototype.p_paintTimeSections=function(){
	var t_tsArrowSize=this.m__g.p_floatSize(this.m__options.m__arrowPercentTS,this.m__options.m__fontTS);
	this.m__g.p_setColor(this.m__options.m__tsLineColor);
	this.m__g.p_setStroke(this.m__options.m__tsStroke);
	this.m__g.p_setFont2(this.m__options.m__fontTS);
	var t_fontheight=this.m__g.p_getFontHeight();
	var t_yAH=this.p_calculateYArrowHeight(this.m__g);
	var t_tsH=this.p_calculateTimeSectionHeight(this.m__g);
	var t_yT=this.m__margin.m__top-t_yAH-t_tsH;
	if(this.p_mustDrawXAxisOnTop()){
		t_yT-=this.p_calculateXAxisTextHeight(this.m__g);
		t_yT=t_yT-10.0;
		t_yT=t_yT-6.0;
	}
	var t_yL=t_yT+t_fontheight;
	var t_=this.m__data.m__ts.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_ots=t_.p_NextObject();
		var t_ts=object_downcast((t_ots),c_GraphicTimeSection);
		if(t_ts.m__tstitle!=""){
			var t_x1=this.p_scaleX(t_ts.m__start);
			var t_x2=this.p_scaleX(t_ts.m__start+t_ts.m__duration);
			var t_maxTextwidth=t_x2-t_x1-2.0*t_tsArrowSize;
			this.m__g.p_drawLine(t_x1+t_tsArrowSize,t_yL,t_x2-t_tsArrowSize,t_yL);
			if(this.m__options.m__TSvLines){
			}
			if(t_maxTextwidth>t_tsArrowSize){
				this.p_paintHArrow(t_x1+t_tsArrowSize,t_yL,t_tsArrowSize*-1.0);
				this.p_paintHArrow(t_x2-t_tsArrowSize,t_yL,t_tsArrowSize);
				this.m__g.p_drawLine(t_x1,t_yT,t_x1,t_yL+t_tsArrowSize/2.0);
				this.m__g.p_drawLine(t_x2,t_yT,t_x2,t_yL+t_tsArrowSize/2.0);
				if(this.m__options.m__displayTSNames){
					var t_disptext=t_ts.m__tstitle;
					var t_textwidth=this.m__g.p_getTextWidth(t_disptext);
					if(t_textwidth>t_maxTextwidth){
						var t_text="";
						t_disptext="";
						for(var t_i=t_ts.m__tstitle.length-1;t_i>0;t_i=t_i+-1){
							t_text=string_fromchars(string_tochars(t_ts.m__tstitle).slice(0,t_i))+"..";
							t_textwidth=this.m__g.p_getTextWidth(t_text);
							if(t_textwidth<t_maxTextwidth){
								t_disptext=t_text;
								break;
							}
						}
					}
					if(t_disptext!=""){
						this.m__g.p_drawText(t_disptext,t_x1+(t_x2-t_x1)/2.0-t_textwidth/2.0,t_yT,true);
					}
				}
			}
		}
	}
}
c_AreaPainter.prototype.p_paintBorder=function(){
	if(this.m__options.m__graphicBox){
		this.m__g.p_setColor(c_Color.m_black);
		this.m__g.p_setStroke(this.m__options.m__defaultStroke);
		this.m__g.p_drawRect2(this.m__bounds,false);
	}
}
c_AreaPainter.prototype.p_paintElements=function(){
	this.p_paintBackground();
	this.p_paintBackgroundGrids();
	this.p_paintPlanes();
	this.p_paintForegroundGrids();
	this.p_paintTicks();
	this.p_paintTexts();
	this.p_paintCurves();
	this.p_paintAxes();
	this.p_paintTimeSections();
	this.p_paintBorder();
	var t_hotspots=c_Collection.m_new.call(new c_Collection);
	var t_ghsp=c_GraphicHotSpot.m_new.call(new c_GraphicHotSpot,this.m__data);
	t_ghsp.m__bounds=this.m__margin.p_getInnerRect(this.m__bounds);
	t_ghsp.m__grapharea=this.m__bounds;
	t_ghsp.m__xScaleFactor=this.m__xScaleFactor;
	t_hotspots.p_add(t_ghsp);
	return t_hotspots;
}
c_AreaPainter.prototype.p_draw2=function(t_gArea){
	var t_hotspots=c_Collection.m_new.call(new c_Collection);
	if(this.m__g==null){
		return t_hotspots;
	}
	this.m__data.p_prepareDiscreteValues(true);
	this.m__min=this.m__data.m__min;
	this.m__max=this.m__data.m__max;
	if(this.m__options.m__arrowPercentY>0.0){
		this.m__arrow=this.m__g.p_floatSize(this.m__options.m__arrowPercentY,this.m__options.m__fontY);
	}else{
		this.m__arrow=this.m__g.p_getFontHeight2(this.m__options.m__fontY);
	}
	this.p_calculateScaling();
	this.p_prepareForPainting();
	this.p_collectXAxisItems();
	this.p_collectYAxisItems();
	if(this.m__validBoundary){
		t_hotspots=this.p_paintElements();
	}
	return t_hotspots;
}
function c_PiePainter(){
	c_Painter.call(this);
	this.m__PieElements=null;
	this.m__deviceorientcw=false;
	this.m__pie_x=.0;
	this.m__pie_y=.0;
	this.m__elementsum=.0;
	this.m__pie_r=.0;
}
c_PiePainter.prototype=extend_class(c_Painter);
c_PiePainter.m_new=function(t_dd){
	c_Painter.m_new.call(this,t_dd);
	return this;
}
c_PiePainter.m_new2=function(){
	c_Painter.m_new2.call(this);
	return this;
}
c_PiePainter.prototype.p_collectPieElements=function(){
	var t_pe=null;
	var t_idx=0;
	this.m__PieElements=c_PieCollection.m_new.call(new c_PieCollection);
	this.m__PieElements.m__sort=this.m__options.m__sortPie;
	var t_=this.m__data.m__sets.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_oset=t_.p_NextObject();
		var t_ds=object_downcast((t_oset),c_GraphicDataSet);
		if(t_ds.m__drawAsPane==false || t_ds.m__hidden==true){
			continue;
		}
		var t_item=t_ds.p_getItemForPeriod(0);
		if(t_item==null){
			continue;
		}
		t_pe=c_PieElement.m_new.call(new c_PieElement);
		t_pe.m__set=t_ds;
		t_pe.m__color=t_ds.m__color;
		t_pe.m__idx=t_idx;
		if(this.m__options.m__useStartValue){
			t_pe.m__value=t_item.m__start;
		}else{
			t_pe.m__value=t_item.m__end;
		}
		if(t_pe.m__value<0.0){
			t_pe.m__value=bb_math_Abs2(t_pe.m__value);
			var t_sPullPieIdxs=this.m__options.m__piePulloutSegmentString.split(" ");
			var t_2=t_sPullPieIdxs;
			var t_3=0;
			while(t_3<t_2.length){
				var t_s=t_2[t_3];
				t_3=t_3+1;
				var t_i=parseInt((string_trim(t_s)),10);
				if(t_i==t_pe.m__idx || t_i==-1){
					t_pe.m__pulledout=true;
				}
			}
		}
		this.m__PieElements.p_add(t_pe);
		t_idx+=1;
	}
	this.m__PieElements.p_sortArray(true);
	var t_cntRealPies=0;
	var t_4=this.m__PieElements.p_ObjectEnumerator();
	while(t_4.p_HasNext()){
		var t_o=t_4.p_NextObject();
		t_pe=object_downcast((t_o),c_PieElement);
		if(t_pe.m__value==0.0 || t_pe.m__set.m__switchedoff==true){
			continue;
		}
		t_cntRealPies+=1;
	}
	if(t_cntRealPies<2){
		var t_5=this.m__PieElements.p_ObjectEnumerator();
		while(t_5.p_HasNext()){
			var t_o2=t_5.p_NextObject();
			t_pe=object_downcast((t_o2),c_PieElement);
			t_pe.m__pulledout=false;
		}
	}
}
c_PiePainter.prototype.p_prepareData=function(){
	this.p_collectPieElements();
}
c_PiePainter.prototype.p_prepareMargins=function(){
}
c_PiePainter.prototype.p_getDatasetForLegends=function(){
	var t_pe=null;
	var t_legitems=c_Collection.m_new.call(new c_Collection);
	var t_=this.m__PieElements.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		t_pe=object_downcast((t_o),c_PieElement);
		if(t_pe.m__value==0.0 && this.m__options.m__pieLegendNoZeroVal==true){
			continue;
		}
		if(t_pe.m__set.m__legend!=""){
			t_legitems.p_add(t_pe.m__set);
		}
	}
	return t_legitems;
}
c_PiePainter.prototype.p_prepareLegend=function(){
	c_Painter.prototype.p_prepareLegend.call(this);
	if(this.m__legendpanel==null){
		return;
	}
	if(this.m__legendpanel.m__type==4){
		var t_maxh=this.m__bounds.m__h-this.m__margin.m__top-this.m__margin.m__bottom;
		this.m__legendpanel.m__bounds.m__y=this.m__bounds.m__y+this.m__margin.m__top+t_maxh/2.0-this.m__legendpanel.m__bounds.m__h/2.0;
	}
}
c_PiePainter.m_adjustDegree=function(t_d,t_cw){
	var t_deg=t_d;
	t_deg=t_deg % 360.0;
	if(t_deg<0.0){
		t_deg=(360.0-t_deg % 360.0) % 360.0;
	}
	if(t_cw){
		t_deg=c_PiePainter.m_adjustDegree(360.0-t_deg,false);
	}
	return t_deg;
}
c_PiePainter.prototype.p_preparePieElements=function(){
	var t_pe=null;
	this.m__elementsum=0.0;
	var t_=this.m__PieElements.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		t_pe=object_downcast((t_o),c_PieElement);
		if(t_pe.m__set.m__switchedoff==true){
			continue;
		}
		this.m__elementsum+=t_pe.m__value;
	}
	var t_curarc=this.m__options.m__pieRotationStart;
	var t_first=true;
	var t_perc=.0;
	var t_str="";
	var t_2=this.m__PieElements.p_ObjectEnumerator();
	while(t_2.p_HasNext()){
		var t_o2=t_2.p_NextObject();
		t_pe=object_downcast((t_o2),c_PieElement);
		if(t_pe.m__value==0.0 || t_pe.m__set.m__switchedoff==true){
			continue;
		}
		t_perc=t_pe.m__value/this.m__elementsum;
		t_pe.m__arc=360.0*t_perc;
		if(t_first){
			if(this.m__options.m__pieCenter==true){
				t_curarc=90.0-t_pe.m__arc/2.0;
			}
			t_first=false;
		}
		t_pe.m__startarc=t_curarc;
		t_pe.m__endarc=t_curarc+t_pe.m__arc;
		t_pe.m__devstartarc=c_PiePainter.m_adjustDegree(t_pe.m__startarc,this.m__deviceorientcw);
		t_pe.m__devendarc=c_PiePainter.m_adjustDegree(t_pe.m__endarc,this.m__deviceorientcw);
		t_pe.m__middlearc=c_PiePainter.m_adjustDegree(t_pe.m__startarc+t_pe.m__arc/2.0,false);
		t_curarc=t_pe.m__endarc;
		var t_devmiddlearc=c_PiePainter.m_adjustDegree(t_pe.m__middlearc,this.m__deviceorientcw);
		t_pe.m__devmiddlearc_cos_x=Math.cos((t_devmiddlearc)*D2R);
		t_pe.m__devmiddlearc_sin_y=Math.sin((t_devmiddlearc)*D2R);
		if(t_pe.m__pulledout){
			t_pe.m__pulled_x=t_pe.m__devmiddlearc_cos_x*this.m__options.m__piePulloutDistance;
			t_pe.m__pulled_y=t_pe.m__devmiddlearc_sin_y*this.m__options.m__piePulloutDistance;
		}
		if(t_pe.m__pulledout || this.m__options.m__pieShowLabels){
			if(t_perc>=0.02){
				t_pe.m__ti=c_TextItem.m_new.call(new c_TextItem);
				t_pe.m__ti.m__font=this.m__options.m__fontLegend.p_clone();
				if(this.m__options.m__pieLabelColorized){
					t_pe.m__ti.m__textcolor=t_pe.m__set.m__color;
				}else{
					t_pe.m__ti.m__textcolor=this.m__options.m__legendBoxColor;
				}
				if(this.m__options.m__piePrefixSetLabel){
					t_pe.m__ti.m__text=t_pe.m__set.m__legend+" ";
				}
				if(this.m__options.m__piePercentLabels){
					t_pe.m__ti.m__text=t_pe.m__ti.m__text+string_trim(c_StringFormatter.m_format("%d %%",String(bb_utils_round(t_perc*100.0)),"","","","","","","","",""));
				}else{
					t_pe.m__ti.m__text=t_pe.m__ti.m__text+string_trim(c_NumericFormater.m_convert2(bb_utils_round(t_pe.m__value),"###'###'###'##9"));
				}
				t_pe.m__ti.m__text=string_trim(t_pe.m__ti.m__text);
				t_pe.m__ti.m__text=string_replace(t_pe.m__ti.m__text,"<br>","\\n");
				t_pe.m__ti.m__bounds=this.m__g.p_getMultiLineTextRect2(t_pe.m__ti.m__text,t_pe.m__ti.m__font);
			}
		}
	}
}
c_PiePainter.prototype.p_updateTextItemBounds=function(t_pe,t_x,t_y,t_r,t_txtdist){
	if(t_pe==null){
		return;
	}
	if(t_pe.m__ti==null){
		return;
	}
	t_pe.m__ti.m__bounds.m__x=t_x;
	t_pe.m__ti.m__bounds.m__y=t_y;
	t_pe.m__ti.m__bounds.m__x+=t_pe.m__devmiddlearc_cos_x*t_r;
	t_pe.m__ti.m__bounds.m__y+=t_pe.m__devmiddlearc_sin_y*t_r;
	t_pe.m__ti.m__bounds.m__x+=t_pe.m__pulled_x;
	t_pe.m__ti.m__bounds.m__y+=t_pe.m__pulled_y;
	if(t_txtdist>0.0){
		var t_ax=t_pe.m__devmiddlearc_cos_x*t_txtdist;
		var t_ay=t_pe.m__devmiddlearc_sin_y*t_txtdist;
		var t_h2=t_pe.m__ti.m__bounds.m__h/2.0;
		var t_f2=this.m__g.p_getFontHeight2(t_pe.m__ti.m__font)/2.0;
		var t_2=t_pe.p__middlearc_quatrant();
		if(t_2==1){
			if(bb_math_Abs2(t_ax)>t_f2){
				t_ax-=t_f2;
			}
			if(bb_math_Abs2(t_ay)>t_h2){
				t_ay-=t_h2;
			}
		}else{
			if(t_2==2){
				if(bb_math_Abs2(t_ax)>t_f2){
					t_ax+=t_f2;
				}
				if(bb_math_Abs2(t_ay)>t_h2){
					t_ay-=t_h2;
				}
			}else{
				if(t_2==3){
					if(bb_math_Abs2(t_ax)>t_f2){
						t_ax+=t_f2;
					}
					if(bb_math_Abs2(t_ay)>t_h2){
						t_ay-=t_h2;
					}
				}else{
					if(t_2==4){
						if(bb_math_Abs2(t_ax)>t_f2){
							t_ax-=t_f2;
						}
						if(bb_math_Abs2(t_ay)>t_h2){
							t_ay-=t_h2;
						}
					}
				}
			}
		}
		t_pe.m__ti.m__bounds.m__x+=t_ax;
		t_pe.m__ti.m__bounds.m__y+=t_ay;
	}
	var t_3=t_pe.p__middlearc_quatrant();
	if(t_3==1){
		t_pe.m__ti.m__bounds.m__y-=t_pe.m__ti.m__bounds.m__h;
		t_pe.m__ti.m__textalign=0;
	}else{
		if(t_3==2){
			t_pe.m__ti.m__bounds.m__x-=t_pe.m__ti.m__bounds.m__w;
			t_pe.m__ti.m__bounds.m__y-=t_pe.m__ti.m__bounds.m__h;
			t_pe.m__ti.m__textalign=2;
		}else{
			if(t_3==3){
				t_pe.m__ti.m__bounds.m__x-=t_pe.m__ti.m__bounds.m__w;
				t_pe.m__ti.m__textalign=2;
			}else{
				if(t_3==4){
					t_pe.m__ti.m__textalign=0;
				}
			}
		}
	}
}
c_PiePainter.prototype.p_evaluateRadius=function(t_guess,t_scope){
	var t_pe=null;
	var t_rect=null;
	var t_radius=.0;
	var t_maxw=this.m__bounds.m__w-this.m__margin.m__left-this.m__margin.m__right;
	var t_maxright=this.m__bounds.m__w-this.m__margin.m__right;
	var t_maxh=this.m__bounds.m__h-this.m__margin.m__top-this.m__margin.m__bottom;
	var t_maxbottom=this.m__bounds.m__h-this.m__margin.m__bottom;
	t_radius=t_guess;
	if(t_radius<0.0){
		return 0.0;
	}
	if(t_scope>=20){
		return t_radius;
	}
	var t_=this.m__PieElements.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		t_pe=object_downcast((t_o),c_PieElement);
		if(t_pe.m__value==0.0 || t_pe.m__set.m__switchedoff==true){
			continue;
		}
		if(t_pe.m__ti!=null){
			this.p_updateTextItemBounds(t_pe,this.m__pie_x,this.m__pie_y,t_radius,this.m__options.m__pieTextDistance);
			if(this.m__margin.m__top>t_pe.m__ti.m__bounds.m__y){
				var t_d=this.m__margin.m__top-t_pe.m__ti.m__bounds.m__y;
				if(t_d>0.5){
					t_radius=t_radius-t_d;
					t_radius=this.p_evaluateRadius(t_radius,t_scope+1);
				}
			}
			if(this.m__margin.m__left>t_pe.m__ti.m__bounds.m__x){
				var t_d2=this.m__margin.m__left-t_pe.m__ti.m__bounds.m__x;
				if(t_d2>0.5){
					t_radius=t_radius-t_d2;
					t_radius=this.p_evaluateRadius(t_radius,t_scope+1);
				}
			}
			if(t_pe.m__ti.m__bounds.m__x+t_pe.m__ti.m__bounds.m__w>t_maxright){
				var t_d3=t_pe.m__ti.m__bounds.m__x+t_pe.m__ti.m__bounds.m__w-t_maxright;
				if(t_d3>0.5){
					t_radius=t_radius-t_d3;
					t_radius=this.p_evaluateRadius(t_radius,t_scope+1);
				}
			}
			if(t_pe.m__ti.m__bounds.m__y+t_pe.m__ti.m__bounds.m__h>t_maxbottom){
				var t_d4=t_pe.m__ti.m__bounds.m__y+t_pe.m__ti.m__bounds.m__h-t_maxbottom;
				if(t_d4>0.5){
					t_radius=t_radius-t_d4;
					t_radius=this.p_evaluateRadius(t_radius,t_scope+1);
				}
			}
		}
		if(t_pe.m__pulledout){
			var t_maxr=bb_math_Min2(t_maxw/2.0,t_maxh/2.0);
			if(t_radius+this.m__options.m__piePulloutDistance>t_maxr){
				t_radius=t_maxr-this.m__options.m__piePulloutDistance;
				t_radius=this.p_evaluateRadius(t_radius,t_scope+1);
			}
		}
	}
	return t_radius;
}
c_PiePainter.prototype.p_dropPieLables=function(){
	var t_pe=null;
	var t_=this.m__PieElements.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		t_pe=object_downcast((t_o),c_PieElement);
		t_pe.m__ti=null;
	}
}
c_PiePainter.prototype.p_paintBackground=function(){
	if(this.m__options.m__BGColor!=null){
		this.m__g.p_setColor(this.m__options.m__BGColor);
		this.m__g.p_drawRect2(this.m__bounds,true);
	}
}
c_PiePainter.prototype.p_paintPieElements=function(){
	var t_pe=null;
	var t_=this.m__PieElements.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		t_pe=object_downcast((t_o),c_PieElement);
		if(t_pe.m__value==0.0 || t_pe.m__set.m__switchedoff==true){
			continue;
		}
		this.m__g.p_setColor(t_pe.m__color);
		this.m__g.p_drawPie(this.m__pie_x+t_pe.m__pulled_x,this.m__pie_y+t_pe.m__pulled_y,this.m__pie_r,t_pe.m__devstartarc,t_pe.m__devendarc,this.m__options.m__pieDonatPercSize,true);
	}
	if(this.p_mustDrawBorderAroundItems()){
		this.m__g.p_setStroke(this.m__options.m__borderStroke);
		this.m__g.p_setColor(this.m__options.m__borderColor);
		var t_2=this.m__PieElements.p_ObjectEnumerator();
		while(t_2.p_HasNext()){
			var t_o2=t_2.p_NextObject();
			t_pe=object_downcast((t_o2),c_PieElement);
			if(t_pe.m__value==0.0 || t_pe.m__set.m__switchedoff==true){
				continue;
			}
			this.m__g.p_drawPie(this.m__pie_x+t_pe.m__pulled_x,this.m__pie_y+t_pe.m__pulled_y,this.m__pie_r,t_pe.m__devstartarc,t_pe.m__devendarc,this.m__options.m__pieDonatPercSize,false);
		}
	}
}
c_PiePainter.prototype.p_paintPieLables=function(){
	var t_pe=null;
	var t_spaceX=4.0;
	var t_spaceY=4.0;
	var t_cLastTextPlace=null;
	var t_=this.m__PieElements.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		t_pe=object_downcast((t_o),c_PieElement);
		if(t_pe.m__value==0.0 || t_pe.m__set.m__switchedoff==true){
			continue;
		}
		if(t_pe.m__ti!=null){
			this.p_updateTextItemBounds(t_pe,this.m__pie_x,this.m__pie_y,this.m__pie_r,this.m__options.m__pieTextDistance);
			if(t_pe.m__ti.m__bounds.p_isOverlapping(t_cLastTextPlace,t_spaceX,t_spaceY)==false){
				t_cLastTextPlace=t_pe.m__ti.m__bounds;
				c_ItemPainter.m_draw((this.m__g),(t_pe.m__ti));
			}
		}
	}
}
c_PiePainter.prototype.p_paintBorder=function(){
	if(this.m__options.m__graphicBox){
		this.m__g.p_setColor(c_Color.m_black);
		this.m__g.p_setStroke(this.m__options.m__defaultStroke);
		this.m__g.p_drawRect2(this.m__bounds,false);
	}
}
c_PiePainter.prototype.p_paintElements=function(){
	this.p_paintBackground();
	this.p_paintPieElements();
	this.p_paintPieLables();
	this.p_paintBorder();
	var t_hotspots=c_Collection.m_new.call(new c_Collection);
	return t_hotspots;
}
c_PiePainter.prototype.p_draw2=function(t_gArea){
	var t_hotspots=c_Collection.m_new.call(new c_Collection);
	if(this.m__g==null){
		return t_hotspots;
	}
	this.m__deviceorientcw=this.m__g.p_pieDrawingIsClockwise();
	var t_maxw=this.m__bounds.m__w-this.m__margin.m__left-this.m__margin.m__right;
	var t_maxh=this.m__bounds.m__h-this.m__margin.m__top-this.m__margin.m__bottom;
	this.m__pie_x=this.m__bounds.m__x+this.m__margin.m__left+t_maxw/2.0;
	this.m__pie_y=this.m__bounds.m__y+this.m__margin.m__top+t_maxh/2.0;
	this.p_preparePieElements();
	var t_maxr=bb_math_Min2(t_maxw/2.0,t_maxh/2.0);
	this.m__pie_r=this.p_evaluateRadius(t_maxr,0);
	if(this.m__pie_r<t_maxr*0.5){
		this.p_dropPieLables();
		this.m__pie_r=t_maxr;
	}
	t_hotspots=this.p_paintElements();
	return t_hotspots;
}
function c_BarBasePainter(){
	c_AreaPainter.call(this);
	this.m__segwidth=.0;
	this.m__hasoffset=false;
}
c_BarBasePainter.prototype=extend_class(c_AreaPainter);
c_BarBasePainter.m_new=function(t_dd){
	c_AreaPainter.m_new.call(this,t_dd);
	this.m__segwidth=bb_math_Min2(100.0,this.m__options.m__barFillPercent);
	this.m__segwidth=bb_math_Max2(0.0,this.m__segwidth);
	if(this.m__segwidth>1.0 && this.m__segwidth<99.0){
		this.m__hasoffset=true;
	}
	return this;
}
c_BarBasePainter.m_new2=function(){
	c_AreaPainter.m_new2.call(this);
	return this;
}
c_BarBasePainter.prototype.p_paintCollectedPlaneBorders=function(t_planes){
	if(this.p_mustDrawBorderAroundItems()){
		this.m__g.p_setStroke(this.m__options.m__borderStroke);
		this.m__g.p_setColor(this.m__options.m__borderColor);
		var t_=t_planes.p_ObjectEnumerator();
		while(t_.p_HasNext()){
			var t_o=t_.p_NextObject();
			var t_shape=object_downcast((t_o),c_Plane);
			t_shape.p_draw3((this.m__g),false);
		}
	}
}
c_BarBasePainter.prototype.p_getLastLineEndExtension=function(){
	if(this.p_mustDrawBorderAroundItems()){
		return this.m__options.m__borderWidth;
	}
	return 0.0;
}
c_BarBasePainter.prototype.p_createHoricontalLineItem=function(t_ds,t_period,t_item,t_curve){
	var t_valueStart=t_item.m__start;
	var t_valueEnd=t_item.m__end;
	var t_timeStart=t_period;
	var t_timeEnd=t_period+t_item.m__duration;
	var t_lastItem=false;
	var t_periodlength=t_timeEnd-t_timeStart;
	var t_rXOffset=.0;
	if(this.m__hasoffset){
		t_rXOffset=(100.0-this.m__segwidth)/100.0/2.0*(t_periodlength)*this.m__xScaleFactor;
	}
	if(t_period<this.m__data.m__minT){
		t_valueStart+=(this.m__data.m__minT-t_period)*(t_valueEnd-t_valueStart)/(t_item.m__duration);
		t_timeStart=this.m__data.m__minT;
	}else{
		if(t_period+t_item.m__duration>this.m__data.m__maxT){
			t_valueEnd+=(this.m__data.m__maxT-t_period)*(t_valueEnd-t_valueStart)/(t_item.m__duration);
			t_timeEnd=this.m__data.m__maxT;
			t_lastItem=true;
		}else{
			if(t_period+t_item.m__duration==this.m__data.m__maxT){
				t_lastItem=true;
			}
		}
	}
	var t_value=.0;
	if(this.m__options.m__useStartValue){
		t_value=t_valueStart;
	}else{
		t_value=t_valueEnd;
	}
	var t_x1=this.p_scaleX(t_timeStart);
	var t_x2=this.p_scaleX(t_timeEnd);
	var t_y2=this.p_scaleY(t_value);
	if(t_lastItem){
		t_x2+=this.p_getLastLineEndExtension();
	}
	t_curve.p_moveTo(t_x1+t_rXOffset,t_y2);
	t_curve.p_lineTo4(t_x2-t_rXOffset,t_y2,false);
}
c_BarBasePainter.prototype.p_createXAxisForBarChart=function(t_ts){
	var t_ti=null;
	t_ti=c_TicItem.m_new2.call(new c_TicItem,t_ts);
	t_ti.m__x=this.p_scaleX(t_ts.m__start);
	if(this.p_mustDrawXAxisOnTop()){
		t_ti.m__y=this.m__bounds.m__y+this.m__margin.m__top;
	}else{
		t_ti.m__y=this.m__bounds.m__h-this.m__margin.m__bottom;
	}
	t_ti.m__bounds=this.m__g.p_getMultiLineTextRect2(t_ti.m__text,this.m__options.m__fontX);
	if(this.m__options.m__centerTickText){
		t_ti.m__bounds.m__x=this.p_scaleX((t_ts.m__start)+(t_ts.m__duration)/2.0);
		t_ti.m__bounds.m__x-=t_ti.m__bounds.m__w/2.0;
	}else{
		t_ti.m__bounds.m__x=t_ti.m__x;
	}
	if(this.p_mustDrawXAxisOnTop()){
		t_ti.m__bounds.m__y=t_ti.m__y-6.0-5.0-t_ti.m__bounds.m__h;
	}else{
		t_ti.m__bounds.m__y=t_ti.m__y+6.0+5.0;
	}
	t_ti.m__bounds.p_repositionXtoBound(this.m__bounds);
	t_ti.m__textcolor=this.m__options.m__xAxisTextColor;
	t_ti.m__font=this.m__options.m__fontX;
	if(this.m__options.m__centerTickText){
		t_ti.m__textalign=1;
	}else{
		t_ti.m__textalign=0;
	}
	t_ti.m__pt1.m__x=t_ti.m__x;
	t_ti.m__pt2.m__x=t_ti.m__x;
	if(this.m__options.m__centerTick){
		t_ti.m__pt1.m__y=t_ti.m__y-6.0;
		t_ti.m__pt2.m__y=t_ti.m__y+6.0;
	}else{
		if(this.p_mustDrawXAxisOnTop()){
			t_ti.m__pt1.m__y=t_ti.m__y-6.0-1.0;
			t_ti.m__pt2.m__y=t_ti.m__y;
		}else{
			t_ti.m__pt1.m__y=t_ti.m__y;
			t_ti.m__pt2.m__y=t_ti.m__y+6.0+1.0;
		}
	}
	t_ti.m__stroke=this.m__options.m__xAxisStroke;
	t_ti.m__tickcolor=this.m__options.m__xAxisLineColor;
	return t_ti;
}
c_BarBasePainter.prototype.p_createValuetextInBar=function(t_ds,t_x1,t_x2,t_y0,t_yVal,t_value){
	var t_ti=c_TextItem.m_new.call(new c_TextItem);
	var t_maxWidth=t_x2-t_x1;
	var t_maxHeight=bb_math_Abs2(this.p_scaleY(t_value)-t_y0);
	var t_dist=.0;
	var t_descent=this.m__g.p_getFontDescentHeight2(this.m__options.m__textInSegFont);
	t_dist=2.0;
	if(this.p_mustDrawBorderAroundItems()){
		t_dist-=this.m__options.m__borderWidth;
	}
	t_ti.m__textcolor=this.m__options.m__textInSegColor;
	if(t_ti.m__textcolor==null){
		t_ti.m__textcolor=t_ds.m__color.p_getTextColor();
	}
	t_ti.m__font=this.m__options.m__textInSegFont;
	t_ti.m__text=this.m__data.p_formatY(t_value);
	t_ti.m__bounds=this.m__g.p_getMultiLineTextRect2(t_ti.m__text,this.m__options.m__textInSegFont);
	if(t_ti.m__bounds.m__w>t_maxWidth-t_dist || t_ti.m__bounds.m__h>t_maxHeight-t_dist){
		return;
	}
	t_ti.m__bounds.m__x=t_x1+t_maxWidth/2.0-t_ti.m__bounds.m__w/2.0;
	if(t_yVal<t_y0){
		t_ti.m__bounds.m__y=t_yVal+t_maxHeight/2.0-t_ti.m__bounds.m__h/2.0+t_descent/2.0;
	}else{
		t_ti.m__bounds.m__y=t_yVal-t_maxHeight/2.0-t_ti.m__bounds.m__h/2.0+t_descent/2.0;
	}
	this.m__TextItems.p_add(t_ti);
}
function c_StackedBarPainter(){
	c_BarBasePainter.call(this);
}
c_StackedBarPainter.prototype=extend_class(c_BarBasePainter);
c_StackedBarPainter.m_new=function(t_dd){
	c_BarBasePainter.m_new.call(this,t_dd);
	return this;
}
c_StackedBarPainter.m_new2=function(){
	c_BarBasePainter.m_new2.call(this);
	return this;
}
c_StackedBarPainter.prototype.p_createCenteredXAxisItem=function(t_ts){
	var t_ti=null;
	t_ti=c_TicItem.m_new2.call(new c_TicItem,t_ts);
	t_ti.m__x=this.p_scaleX((t_ts.m__start)+(t_ts.m__duration)/2.0);
	if(this.p_mustDrawXAxisOnTop()){
		t_ti.m__y=this.m__bounds.m__y+this.m__margin.m__top;
	}else{
		t_ti.m__y=this.m__bounds.m__h-this.m__margin.m__bottom;
	}
	t_ti.m__bounds=this.m__g.p_getMultiLineTextRect2(t_ti.m__text,this.m__options.m__fontX);
	t_ti.m__bounds.m__x=this.p_scaleX((t_ts.m__start)+(t_ts.m__duration)/2.0);
	t_ti.m__bounds.m__x-=t_ti.m__bounds.m__w/2.0;
	if(this.p_mustDrawXAxisOnTop()){
		t_ti.m__bounds.m__y=t_ti.m__y-6.0-5.0-t_ti.m__bounds.m__h;
	}else{
		t_ti.m__bounds.m__y=t_ti.m__y+6.0+5.0;
	}
	t_ti.m__bounds.p_repositionXtoBound(this.m__bounds);
	t_ti.m__textcolor=this.m__options.m__xAxisTextColor;
	t_ti.m__font=this.m__options.m__fontX;
	t_ti.m__textalign=1;
	t_ti.m__pt1.m__x=t_ti.m__x;
	t_ti.m__pt2.m__x=t_ti.m__x;
	if(this.m__options.m__centerTick){
		t_ti.m__pt1.m__y=t_ti.m__y-6.0;
		t_ti.m__pt2.m__y=t_ti.m__y+6.0;
	}else{
		if(this.p_mustDrawXAxisOnTop()){
			t_ti.m__pt1.m__y=t_ti.m__y-6.0-1.0;
			t_ti.m__pt2.m__y=t_ti.m__y;
		}else{
			t_ti.m__pt1.m__y=t_ti.m__y;
			t_ti.m__pt2.m__y=t_ti.m__y+6.0+1.0;
		}
	}
	t_ti.m__stroke=this.m__options.m__xAxisStroke;
	t_ti.m__tickcolor=this.m__options.m__xAxisLineColor;
	return t_ti;
}
c_StackedBarPainter.prototype.p_createXAxisItem=function(t_ts){
	if(this.m__options.m__stackedBarAlign!=0){
		return this.p_createCenteredXAxisItem(t_ts);
	}else{
		return this.p_createXAxisForBarChart(t_ts);
	}
}
c_StackedBarPainter.prototype.p_createPlaneItem=function(t_ds,t_period,t_item,t_bStartInPosArea,t_plane,t_ps){
	var t_valueStart=t_item.m__start;
	var t_valueEnd=t_item.m__end;
	var t_timeStart=t_period;
	var t_timeEnd=t_period+t_item.m__duration;
	if(t_period<this.m__data.m__minT){
		t_valueStart+=(this.m__data.m__minT-t_period)*(t_valueEnd-t_valueStart)/(t_item.m__duration);
		t_timeStart=this.m__data.m__minT;
	}
	if(t_period+t_item.m__duration>this.m__data.m__maxT){
		t_valueEnd+=(this.m__data.m__maxT-t_period)*(t_valueEnd-t_valueStart)/(t_item.m__duration);
		t_timeEnd=this.m__data.m__maxT;
	}
	var t_periodlength=t_timeEnd-t_timeStart;
	var t_rXOffset=.0;
	if(this.m__hasoffset){
		t_rXOffset=(100.0-this.m__segwidth)/100.0/2.0*(t_periodlength)*this.m__xScaleFactor;
	}
	var t_value=.0;
	if(this.m__options.m__useStartValue){
		t_value=t_valueStart;
	}else{
		t_value=t_valueEnd;
	}
	for(var t_t=t_timeStart;t_t<=t_timeEnd;t_t=t_t+1){
		if(t_t==t_timeStart){
			t_ps.p_addValueStart(t_t,t_value,t_bStartInPosArea);
			t_ps.p_setNode(t_t);
		}else{
			if(t_t==t_timeEnd){
				t_ps.p_addValueEnd(t_t,t_value,t_bStartInPosArea);
				t_ps.p_setNode(t_t);
			}else{
				t_ps.p_addValueStart(t_t,t_value,t_bStartInPosArea);
				t_ps.p_addValueEnd(t_t,t_value,t_bStartInPosArea);
			}
		}
	}
	var t_vs=.0;
	if(t_value>0.0){
		t_vs=t_ps.p_addValueStart(t_timeStart,0.0,true);
	}else{
		t_vs=t_ps.p_addValueStart(t_timeStart,0.0,false);
	}
	if(t_value!=0.0){
		t_plane.p_moveTo(this.p_scaleX(t_timeStart)+t_rXOffset,this.p_scaleY(this.m__neutrum));
		t_plane.p_lineTo4(this.p_scaleX(t_timeStart)+t_rXOffset,this.p_scaleY(t_vs),false);
		t_plane.p_lineTo4(this.p_scaleX(t_timeEnd)-t_rXOffset,this.p_scaleY(t_vs),false);
		t_plane.p_lineTo4(this.p_scaleX(t_timeEnd)-t_rXOffset,this.p_scaleY(this.m__neutrum),false);
		t_plane.p_closePath();
		if(this.m__options.m__showOverBar){
			this.p_createValuetextInBar(t_ds,this.p_scaleX(t_timeStart)+t_rXOffset,this.p_scaleX(t_timeEnd)+-t_rXOffset,this.p_scaleY(this.m__neutrum),this.p_scaleY(t_vs),t_value);
		}
	}
	return t_timeEnd;
}
function c_ClusteredBarPainter(){
	c_BarBasePainter.call(this);
}
c_ClusteredBarPainter.prototype=extend_class(c_BarBasePainter);
c_ClusteredBarPainter.m_new=function(t_dd){
	c_BarBasePainter.m_new.call(this,t_dd);
	return this;
}
c_ClusteredBarPainter.m_new2=function(){
	c_BarBasePainter.m_new2.call(this);
	return this;
}
c_ClusteredBarPainter.prototype.p_createXAxisItem=function(t_ts){
	return this.p_createXAxisForBarChart(t_ts);
}
c_ClusteredBarPainter.prototype.p_createClusteredPlane=function(t_ds,t_period,t_setnr,t_setsperperiod){
	var t_plane=c_GeneralPath.m_new.call(new c_GeneralPath);
	var t_periodwidth=1.0*this.m__xScaleFactor;
	var t_rXOffset=.0;
	if(this.m__hasoffset){
		t_rXOffset=(100.0-this.m__segwidth)/100.0/2.0*this.m__xScaleFactor;
	}
	var t_setwidth=(t_periodwidth-2.0*t_rXOffset)/(t_setsperperiod);
	var t_segoffset=t_rXOffset+(t_setnr)*t_setwidth;
	var t_itemperiod=t_ds.m__start;
	var t_=t_ds.m__items.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_oitem=t_.p_NextObject();
		var t_item=object_downcast((t_oitem),c_GraphicItem);
		if(t_item==null){
			continue;
		}
		if(t_period>=t_itemperiod && t_period<t_itemperiod+t_item.m__duration){
			var t_value=.0;
			if(this.m__options.m__useStartValue){
				t_value=t_item.m__start;
			}else{
				t_value=t_item.m__end;
			}
			if(t_value!=0.0){
				t_plane.p_moveTo(this.p_scaleX(t_itemperiod)+t_segoffset,this.p_scaleY(this.m__neutrum));
				t_plane.p_lineTo4(this.p_scaleX(t_itemperiod)+t_segoffset,this.p_scaleY(t_value),false);
				t_plane.p_lineTo4(this.p_scaleX(t_itemperiod)+t_segoffset+t_setwidth,this.p_scaleY(t_value),false);
				t_plane.p_lineTo4(this.p_scaleX(t_itemperiod)+t_segoffset+t_setwidth,this.p_scaleY(this.m__neutrum),false);
				t_plane.p_closePath();
				if(this.m__options.m__showOverBar){
					this.p_createValuetextInBar(t_ds,this.p_scaleX(t_itemperiod)+t_segoffset,this.p_scaleX(t_itemperiod)+t_segoffset+t_setwidth,this.p_scaleY(this.m__neutrum),this.p_scaleY(t_value),t_value);
				}
			}
			break;
		}
		t_itemperiod+=t_item.m__duration;
	}
	return t_plane;
}
c_ClusteredBarPainter.prototype.p_paintPlanes=function(){
	var t_planes=c_Collection.m_new.call(new c_Collection);
	var t_setsperperiod=0;
	var t_=this.m__data.m__sets.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_oset=t_.p_NextObject();
		var t_ds=object_downcast((t_oset),c_GraphicDataSet);
		if(t_ds.p_mustDrawAsPlane()){
			t_setsperperiod+=1;
		}
	}
	for(var t_period=this.m__data.m__minT;t_period<this.m__data.m__maxT;t_period=t_period+1){
		var t_setnr=0;
		var t_2=this.m__data.m__sets.p_ObjectEnumerator();
		while(t_2.p_HasNext()){
			var t_oset2=t_2.p_NextObject();
			var t_ds2=object_downcast((t_oset2),c_GraphicDataSet);
			if(t_ds2.p_mustDrawAsPlane()){
				var t_shape=null;
				t_shape=this.p_createClusteredPlane(t_ds2,t_period,t_setnr,t_setsperperiod);
				t_planes.p_add(c_Plane.m_new.call(new c_Plane,t_shape,t_ds2.m__color));
				t_setnr+=1;
			}
		}
	}
	t_planes.p_invert();
	this.p_paintCollectedPlanes(t_planes);
	this.p_paintCollectedPlaneBorders(t_planes);
}
function c_GraphEventCallback(){
	EventCallback.call(this);
	this.m__g=null;
	this.m__dbase=null;
	this.m__hotspot=null;
	this.m__start_inspect_on_move=false;
}
c_GraphEventCallback.prototype=extend_class(EventCallback);
c_GraphEventCallback.m_new=function(t_g,t_dbase){
	this.m__g=t_g;
	this.m__dbase=t_dbase;
	return this;
}
c_GraphEventCallback.m_new2=function(){
	return this;
}
c_GraphEventCallback.prototype.release=function(){
	this.m__g=null;
	this.m__dbase=null;
}
c_GraphEventCallback.prototype.onKey=function(t_event,t_data){
}
c_GraphEventCallback.prototype.p_redraw=function(){
	if(this.m__dbase!=null){
		this.m__dbase.p_redraw2(this.m__g);
	}
	return 0;
}
c_GraphEventCallback.prototype.onMouse=function(t_event,t_data,t_x,t_y){
	var t_1=t_event;
	if(t_1==4){
		this.m__hotspot=null;
	}else{
		if(t_1==5){
			if(t_data==1){
				this.m__hotspot=this.m__dbase.p_getHotspotAt(t_x,t_y);
				if((this.m__hotspot)!=null){
					if(this.m__hotspot.p_onDown((this),t_x,t_y)){
						this.p_redraw();
					}
				}
			}
		}else{
			if(t_1==6){
				if(this.m__hotspot!=null){
					if(this.m__hotspot.p_onUp((this),t_x,t_y)){
						this.p_redraw();
					}
				}
				this.m__hotspot=null;
			}else{
				if(t_1==7){
					if(this.m__start_inspect_on_move && this.m__hotspot==null){
						this.m__hotspot=this.m__dbase.p_getHotspotAt(t_x,t_y);
						if((this.m__hotspot)!=null){
							if(this.m__hotspot.p_onDown((this),t_x,t_y)){
								this.p_redraw();
								return;
							}
						}
					}
					if(this.m__hotspot!=null){
						if(this.m__hotspot.p_onMove((this),t_x,t_y)){
							this.p_redraw();
						}
					}
				}
			}
		}
	}
}
c_GraphEventCallback.prototype.onTouch=function(t_event,t_data,t_x,t_y){
}
c_GraphEventCallback.prototype.onResize=function(t_w,t_h){
	this.p_redraw();
}
function c_Graph2DwithEMFExport(){
	c_Graph2D.call(this);
	this.m__realsize=false;
	this.m__toemf=null;
}
c_Graph2DwithEMFExport.prototype=extend_class(c_Graph2D);
c_Graph2DwithEMFExport.m_new=function(){
	c_Graph2D.m_new.call(this);
	return this;
}
c_Graph2DwithEMFExport.m_cloneFrom=function(t_g,t_bRealSize){
	var t_dest=c_Graph2DwithEMFExport.m_new.call(new c_Graph2DwithEMFExport);
	t_dest.m__elementid=t_g.m__elementid;
	t_dest.m__device=t_g.m__device;
	t_dest.m__background=t_g.m__background;
	t_dest.m__mapToGrid=t_g.m__mapToGrid;
	t_dest.m__ctx=t_g.m__ctx;
	t_dest.m__realsize=t_bRealSize;
	return t_dest;
}
c_Graph2DwithEMFExport.prototype.p_release=function(){
	c_Graph2D.prototype.p_release.call(this);
	this.m__toemf=null;
}
c_Graph2DwithEMFExport.prototype.p_beginRender=function(t_bNewDrawing){
	if(c_Graph2D.prototype.p_beginRender.call(this,t_bNewDrawing)==false){
		return false;
	}
	if(this.m__realsize==false){
		this.m__deviceWidth=845.0;
		this.m__deviceHeight=495.0;
	}
	this.m__toemf=c_EMFDocument.m_new.call(new c_EMFDocument);
	this.m__toemf.p_setDimension(this.p_getDeviceWidth(),this.p_getDeviceHeight());
	return true;
}
c_Graph2DwithEMFExport.prototype.p_getCurrentPenStyle=function(){
	var t_penStyle=0;
	t_penStyle=0;
	var t_1=this.m__ctx.m_stroke.m__join;
	if(t_1==0){
		t_penStyle=t_penStyle|8192;
	}else{
		if(t_1==1){
			t_penStyle=t_penStyle;
		}else{
			if(t_1==2){
				t_penStyle=t_penStyle|4096;
			}
		}
	}
	var t_2=this.m__ctx.m_stroke.m__cap;
	if(t_2==0){
		t_penStyle=t_penStyle|512;
	}else{
		if(t_2==1){
			t_penStyle=t_penStyle;
		}
	}
	return t_penStyle;
}
c_Graph2DwithEMFExport.prototype.p_drawRect=function(t_x,t_y,t_w,t_h,t_filled){
	c_Graph2D.prototype.p_drawRect.call(this,t_x,t_y,t_w,t_h,t_filled);
	if(t_filled){
		this.m__toemf.p_setBrush(this.m__ctx.m_col,0);
	}else{
		this.m__toemf.p_setBrush(this.m__ctx.m_col,1);
	}
	this.m__toemf.p_setPen(this.m__ctx.m_col,this.p_getCurrentPenStyle(),((this.m__ctx.m_stroke.m__width)|0));
	this.m__toemf.p_setRectangle(t_x,t_y,t_w,t_h);
}
c_Graph2DwithEMFExport.prototype.p_drawRect2=function(t_r,t_filled){
	this.p_drawRect(t_r.m__x,t_r.m__y,t_r.m__w,t_r.m__h,t_filled);
}
c_Graph2DwithEMFExport.prototype.p_drawLine=function(t_x1,t_y1,t_x2,t_y2){
	c_Graph2D.prototype.p_drawLine.call(this,t_x1,t_y1,t_x2,t_y2);
	this.m__toemf.p_setPen(this.m__ctx.m_col,this.p_getCurrentPenStyle(),((this.m__ctx.m_stroke.m__width)|0));
	this.m__toemf.p_moveTo(t_x1,t_y1);
	this.m__toemf.p_lineTo(t_x2,t_y2);
}
c_Graph2DwithEMFExport.prototype.p_drawLine2=function(t_pFrom,t_pTo){
	this.p_drawLine(t_pFrom.m__x,t_pFrom.m__y,t_pTo.m__x,t_pTo.m__y);
}
c_Graph2DwithEMFExport.prototype.p_drawPoly=function(t_verts,t_filled){
	c_Graph2D.prototype.p_drawPoly.call(this,t_verts,t_filled);
	if(t_filled){
		this.m__toemf.p_setBrush(this.m__ctx.m_col,0);
		this.m__toemf.p_setPen(this.m__ctx.m_col,this.p_getCurrentPenStyle(),((this.m__ctx.m_stroke.m__width)|0));
		this.m__toemf.p_setPolygon(t_verts);
	}else{
		this.m__toemf.p_setBrush(this.m__ctx.m_col,1);
		this.m__toemf.p_setPen(this.m__ctx.m_col,this.p_getCurrentPenStyle(),((this.m__ctx.m_stroke.m__width)|0));
		this.m__toemf.p_setPolyline(t_verts);
	}
}
c_Graph2DwithEMFExport.prototype.p_pieDrawingIsClockwise=function(){
	return c_Graph2D.prototype.p_pieDrawingIsClockwise.call(this);
}
c_Graph2DwithEMFExport.prototype.p_drawPie=function(t_x,t_y,t_r,t_sDeg,t_eDeg,t_p,t_filled){
	c_Graph2D.prototype.p_drawPie.call(this,t_x,t_y,t_r,t_sDeg,t_eDeg,t_p,t_filled);
}
c_Graph2DwithEMFExport.prototype.p_beginPath=function(){
	c_Graph2D.prototype.p_beginPath.call(this);
	this.m__toemf.p_beginPath();
}
c_Graph2DwithEMFExport.prototype.p_strokePath=function(t_f){
	c_Graph2D.prototype.p_strokePath.call(this,t_f);
	this.m__toemf.p_strokePath(t_f);
}
c_Graph2DwithEMFExport.prototype.p_closePath=function(){
	c_Graph2D.prototype.p_closePath.call(this);
	this.m__toemf.p_closePath();
}
c_Graph2DwithEMFExport.prototype.p_moveTo=function(t_x,t_y){
	c_Graph2D.prototype.p_moveTo.call(this,t_x,t_y);
	this.m__toemf.p_moveTo(t_x,t_y);
}
c_Graph2DwithEMFExport.prototype.p_moveTo2=function(t_pTo){
	this.p_moveTo(t_pTo.m__x,t_pTo.m__y);
}
c_Graph2DwithEMFExport.prototype.p_lineTo=function(t_x2,t_y2){
	c_Graph2D.prototype.p_lineTo.call(this,t_x2,t_y2);
	this.m__toemf.p_setPen(this.m__ctx.m_col,this.p_getCurrentPenStyle(),((this.m__ctx.m_stroke.m__width)|0));
	this.m__toemf.p_lineTo(t_x2,t_y2);
}
c_Graph2DwithEMFExport.prototype.p_lineTo2=function(t_pTo){
	this.p_lineTo(t_pTo.m__x,t_pTo.m__y);
}
c_Graph2DwithEMFExport.prototype.p_curveTo=function(t_cpx,t_cpy,t_x2,t_y2){
	c_Graph2D.prototype.p_curveTo.call(this,t_cpx,t_cpy,t_x2,t_y2);
	this.m__toemf.p_setPen(this.m__ctx.m_col,this.p_getCurrentPenStyle(),((this.m__ctx.m_stroke.m__width)|0));
	this.m__toemf.p_lineTo(t_x2,t_y2);
}
c_Graph2DwithEMFExport.prototype.p_curveTo2=function(t_pCtrl,t_pTo){
	this.p_curveTo(t_pCtrl.m__x,t_pCtrl.m__y,t_pTo.m__x,t_pTo.m__y);
}
c_Graph2DwithEMFExport.prototype.p_drawText=function(t_s,t_x,t_y,t_atRight){
	c_Graph2D.prototype.p_drawText.call(this,t_s,t_x,t_y,t_atRight);
	this.m__toemf.p_setFont2(this.m__ctx.m_font);
	this.m__toemf.p_setTextColor(this.m__ctx.m_col);
	this.m__toemf.p_setText(t_s,t_x,t_y,t_atRight);
}
function c_Graph2DContext(){
	Object.call(this);
	this.m_col=c_Color.m_black;
	this.m_stroke=c_Stroke.m_new.call(new c_Stroke,1.0);
	this.m_blend=0;
	this.m_font=c_Font.m_new.call(new c_Font,"Arial",12.0,false);
	this.m_matrix=c_Matrix.m_new.call(new c_Matrix,1.0,0.0,0.0,1.0,0.0,0.0);
	this.m_scissor=c_Rectangle.m_new2.call(new c_Rectangle);
}
c_Graph2DContext.m_new=function(){
	return this;
}
function c_EMFWriter(){
	Object.call(this);
	this.m__sz=0;
	this.m__buf=[];
	this.m__pos=0;
	this.m__len=0;
}
c_EMFWriter.m_new=function(){
	this.m__sz=32000;
	this.m__buf=resize_number_array(this.m__buf,this.m__sz);
	return this;
}
c_EMFWriter.prototype.p_reserveNext=function(t_len){
	if(this.m__sz<=this.m__pos+t_len){
		this.m__sz=(((this.m__pos)*1.5+(t_len))|0);
		this.m__buf=resize_number_array(this.m__buf,this.m__sz);
	}
}
c_EMFWriter.prototype.p_wI4=function(t_v){
	this.p_reserveNext(4);
	var t_i0=0;
	var t_i1=0;
	var t_i2=0;
	var t_i3=0;
	t_i0=t_v&255;
	t_i1=t_v>>8&255;
	t_i2=t_v>>16&255;
	t_i3=t_v>>24&255;
	this.m__buf[this.m__pos]=t_i0;
	this.m__buf[this.m__pos+1]=t_i1;
	this.m__buf[this.m__pos+2]=t_i2;
	this.m__buf[this.m__pos+3]=t_i3;
	this.m__pos+=4;
	this.m__len=bb_math_Max(this.m__len,this.m__pos);
}
c_EMFWriter.prototype.p_wI2=function(t_v){
	this.p_reserveNext(2);
	var t_i0=0;
	var t_i1=0;
	t_i0=t_v&255;
	t_i1=t_v>>8&255;
	this.m__buf[this.m__pos]=t_i0;
	this.m__buf[this.m__pos+1]=t_i1;
	this.m__pos+=2;
	this.m__len=bb_math_Max(this.m__len,this.m__pos);
}
c_EMFWriter.prototype.p_wI1=function(t_v){
	this.p_reserveNext(1);
	var t_i0=0;
	t_i0=t_v&255;
	this.m__buf[this.m__pos]=t_i0;
	this.m__pos+=1;
	this.m__len=bb_math_Max(this.m__len,this.m__pos);
}
c_EMFWriter.prototype.p_wRect=function(t_rect){
	if(t_rect==null){
		this.p_wI4(0);
		this.p_wI4(0);
		this.p_wI1(255);
		this.p_wI1(255);
		this.p_wI1(255);
		this.p_wI1(255);
		this.p_wI1(255);
		this.p_wI1(255);
		this.p_wI1(255);
		this.p_wI1(255);
	}else{
		this.p_wI4((t_rect.m__x)|0);
		this.p_wI4((t_rect.m__y)|0);
		this.p_wI4((t_rect.m__x+t_rect.m__w)|0);
		this.p_wI4((t_rect.m__y+t_rect.m__h)|0);
	}
}
c_EMFWriter.prototype.p_wBool=function(t_b){
	this.p_reserveNext(1);
	if(t_b){
		this.m__buf[this.m__pos]=1;
	}else{
		this.m__buf[this.m__pos]=0;
	}
	this.m__pos+=1;
	this.m__len=bb_math_Max(this.m__len,this.m__pos);
}
c_EMFWriter.prototype.p_wStr=function(t_s){
	this.p_reserveNext(t_s.length*2);
	for(var t_i=0;t_i<t_s.length;t_i=t_i+1){
		var t_v=t_s.charCodeAt(t_i);
		this.m__buf[this.m__pos]=t_v&255;
		this.m__buf[this.m__pos+1]=t_v>>8&255;
		this.m__pos+=2;
		this.m__len=bb_math_Max(this.m__len,this.m__pos);
	}
}
c_EMFWriter.prototype.p_wInts=function(t_vs,t_len){
	this.p_reserveNext(t_vs.length);
	for(var t_i=0;t_i<t_len;t_i=t_i+1){
		this.m__buf[this.m__pos]=t_vs[t_i];
		this.m__pos+=1;
		this.m__len=bb_math_Max(this.m__len,this.m__pos);
	}
}
function c_EMFDocument(){
	Object.call(this);
	this.m__objects=c_Collection.m_new.call(new c_Collection);
	this.m__records=c_Collection.m_new.call(new c_Collection);
	this.m__header=c_EMFHeader.m_new.call(new c_EMFHeader);
	this.m__devicePointSize=.0;
	this.m__deviceScale=35.299999999999997;
	this.m__curPenIdx=0;
	this.m__curBrushIdx=0;
	this.m__curFontIdx=0;
	this.m__curFontSize=.0;
	this.m__curTextCol=null;
}
c_EMFDocument.prototype.p_addDeleteObject=function(t_idx){
	if(t_idx>-1){
		var t_r=c_EMFDeleteObjectRecord.m_new.call(new c_EMFDeleteObjectRecord);
		t_r.m__intindex=t_idx;
		this.m__records.p_add(t_r);
	}
}
c_EMFDocument.prototype.p_getRecordByType=function(t_t){
	var t_=this.m__records.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		var t_r=object_downcast((t_o),c_EMFBinaryRecord);
		if(t_r.m__type==t_t){
			return t_r;
		}
	}
	return null;
}
c_EMFDocument.prototype.p_finish=function(){
	var t_w=c_EMFWriter.m_new.call(new c_EMFWriter);
	for(var t_i=0;t_i<this.m__objects.p_length();t_i=t_i+1){
		this.p_addDeleteObject(t_i);
	}
	if(this.p_getRecordByType(14)==null){
		this.m__records.p_add(c_EMFEndOfFileRecord.m_new.call(new c_EMFEndOfFileRecord));
	}
	this.m__header.p_write(t_w);
	var t_=this.m__records.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		var t_r=object_downcast((t_o),c_EMFBinaryRecord);
		t_r.p_write(t_w);
	}
	this.m__header.m__metafileSize=t_w.m__len;
	this.m__header.m__numOfHandles=this.m__objects.p_length()+1;
	this.m__header.m__numberOfRecords=this.m__records.p_length()+1;
	t_w.m__pos=0;
	this.m__header.p_write(t_w);
	return t_w;
}
c_EMFDocument.prototype.p_dump=function(){
	var t_s="";
	t_s="ptsize:"+String(this.m__devicePointSize)+"\n";
	t_s=t_s+("devscale:"+String(this.m__deviceScale)+"\n");
	t_s=t_s+(this.m__header.p_ToString()+"\n");
	var t_=this.m__records.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		var t_r=object_downcast((t_o),c_EMFBinaryRecord);
		t_s=t_s+(t_r.p_ToString()+"\n");
	}
	return t_s;
}
c_EMFDocument.prototype.p_setDevicePointSize=function(t_devicePointSize){
	this.m__devicePointSize=t_devicePointSize;
	this.m__header.m__frameRight=((bb_utils_trunc((this.m__header.m__boundsRight)*t_devicePointSize*100.0))|0);
	this.m__header.m__frameBottom=((bb_utils_trunc((this.m__header.m__boundsBottom)*t_devicePointSize*100.0))|0);
	this.m__header.m__widthDevMM=((bb_utils_trunc((this.m__header.m__widthDevPixels)*t_devicePointSize))|0);
	this.m__header.m__heightDevMM=((bb_utils_trunc((this.m__header.m__heightDevPixels)*t_devicePointSize))|0);
}
c_EMFDocument.prototype.p_setWindowOrg=function(t_x,t_y){
	var t_r=object_downcast((this.p_getRecordByType(10)),c_EMFSetWindowOrgRecord);
	if(t_r==null){
		t_r=c_EMFSetWindowOrgRecord.m_new.call(new c_EMFSetWindowOrgRecord);
		this.m__records.p_add(t_r);
	}
	t_r.m__x=((t_x)|0);
	t_r.m__y=((t_y)|0);
}
c_EMFDocument.prototype.p_setBkMode=function(t_transparent){
	var t_r=c_EMFSetBkModeRecord.m_new.call(new c_EMFSetBkModeRecord);
	if(t_transparent){
		t_r.p_setTransparent();
	}
	this.m__records.p_add(t_r);
}
c_EMFDocument.m_new=function(){
	this.p_setDevicePointSize(0.01);
	this.p_setWindowOrg(0.0,0.0);
	this.m__curPenIdx=-1;
	this.m__curBrushIdx=-1;
	this.m__curFontIdx=-1;
	this.m__records.p_add(c_EMFSetMapModeRecord.m_new.call(new c_EMFSetMapModeRecord));
	this.p_setBkMode(true);
	return this;
}
c_EMFDocument.prototype.p_setWindowExt=function(t_w,t_h){
	var t_r=object_downcast((this.p_getRecordByType(9)),c_EMFSetWindowExtRecord);
	if(t_r==null){
		t_r=c_EMFSetWindowExtRecord.m_new.call(new c_EMFSetWindowExtRecord);
		this.m__records.p_add(t_r);
	}
	t_r.m__w=((t_w)|0);
	t_r.m__h=((t_h)|0);
}
c_EMFDocument.prototype.p_setDimension=function(t_w,t_h){
	this.m__header.m__boundsRight=((bb_utils_round(t_w*this.m__deviceScale))|0);
	this.m__header.m__boundsBottom=((bb_utils_round(t_h*this.m__deviceScale))|0);
	this.m__header.m__widthDevPixels=((bb_utils_round(t_w*this.m__deviceScale))|0);
	this.m__header.m__heightDevPixels=((bb_utils_round(t_h*this.m__deviceScale))|0);
	this.p_setDevicePointSize(this.m__devicePointSize);
	this.p_setWindowOrg(0.0,0.0);
	this.p_setWindowExt(t_w,t_h);
}
c_EMFDocument.prototype.p_findBrushIndex=function(t_search){
	var t_idx=0;
	var t_=this.m__objects.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		var t_r=object_downcast((t_o),c_EMFBinaryRecord);
		if(t_r.m__type==39){
			var t_b=object_downcast((t_o),c_EMFCreateBrushIndirectRecord);
			if(t_b.m__col.p_equals(t_search.m__col) && t_b.m__style==t_search.m__style && t_b.m__hatch==t_search.m__hatch){
				return t_idx;
			}
		}
		t_idx+=1;
	}
	return -1;
}
c_EMFDocument.prototype.p_addSelectObject=function(t_idx){
	if(t_idx>-1){
		var t_r=c_EMFSelectObjectRecord.m_new.call(new c_EMFSelectObjectRecord);
		t_r.m__intindex=t_idx;
		this.m__records.p_add(t_r);
	}
}
c_EMFDocument.prototype.p_setBrush=function(t_c,t_brushstyle){
	var t_r=c_EMFCreateBrushIndirectRecord.m_new.call(new c_EMFCreateBrushIndirectRecord);
	t_r.m__col=t_c;
	t_r.m__style=t_brushstyle;
	var t_idx=this.p_findBrushIndex(t_r);
	if(t_idx==-1){
		this.m__records.p_add(t_r);
		this.m__objects.p_add(t_r);
		t_idx=this.p_findBrushIndex(t_r);
		t_r.m__intindex=t_idx;
	}
	if(this.m__curBrushIdx!=t_idx){
		this.m__curBrushIdx=t_idx;
		this.p_addSelectObject(t_idx);
	}
}
c_EMFDocument.prototype.p_findPenIndex=function(t_search){
	var t_idx=0;
	var t_=this.m__objects.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		var t_r=object_downcast((t_o),c_EMFBinaryRecord);
		if(t_r.m__type==38){
			var t_p=object_downcast((t_o),c_EMFCreatePenIndirectRecord);
			if(t_p.m__col.p_equals(t_search.m__col) && t_p.m__style==t_search.m__style && t_p.m__width==t_search.m__width){
				return t_idx;
			}
		}
		t_idx+=1;
	}
	return -1;
}
c_EMFDocument.prototype.p_setPen=function(t_c,t_penstyle,t_size){
	var t_r=c_EMFCreatePenIndirectRecord.m_new.call(new c_EMFCreatePenIndirectRecord);
	t_r.m__col=t_c;
	t_r.m__style=t_penstyle;
	t_r.m__width=(((t_size)*this.m__deviceScale)|0);
	var t_idx=this.p_findPenIndex(t_r);
	if(t_idx==-1){
		this.m__records.p_add(t_r);
		this.m__objects.p_add(t_r);
		t_idx=this.p_findPenIndex(t_r);
		t_r.m__intindex=t_idx;
	}
	if(this.m__curPenIdx!=t_idx){
		this.m__curPenIdx=t_idx;
		this.p_addSelectObject(t_idx);
	}
}
c_EMFDocument.prototype.p_scaleX=function(t_v){
	return ((bb_utils_round(t_v*this.m__deviceScale))|0);
}
c_EMFDocument.prototype.p_scaleY=function(t_v){
	return ((bb_utils_round(t_v*this.m__deviceScale))|0);
}
c_EMFDocument.prototype.p_setRectangle=function(t_x,t_y,t_w,t_h){
	var t_r=c_EMFRectangleRecord.m_new.call(new c_EMFRectangleRecord);
	t_r.m__rect=c_Rectangle.m_new.call(new c_Rectangle,(this.p_scaleX(t_x)),(this.p_scaleY(t_y)),(this.p_scaleX(t_w)),(this.p_scaleY(t_h)));
	this.m__records.p_add(t_r);
}
c_EMFDocument.prototype.p_moveTo=function(t_x,t_y){
	var t_r=c_EMFMoveToRecord.m_new.call(new c_EMFMoveToRecord);
	t_r.m__x=this.p_scaleX(t_x);
	t_r.m__y=this.p_scaleY(t_y);
	this.m__records.p_add(t_r);
}
c_EMFDocument.prototype.p_lineTo=function(t_x,t_y){
	var t_r=c_EMFLineToRecord.m_new.call(new c_EMFLineToRecord);
	t_r.m__x=this.p_scaleX(t_x);
	t_r.m__y=this.p_scaleY(t_y);
	this.m__records.p_add(t_r);
}
c_EMFDocument.prototype.p_setPolygon=function(t_verts){
	var t_r=c_EMFPolygonRecord.m_new.call(new c_EMFPolygonRecord);
	t_r.m__points=resize_number_array(t_r.m__points,t_verts.length);
	for(var t_i=0;t_i<t_verts.length;t_i=t_i+2){
		t_r.m__points[t_i]=this.p_scaleX(t_verts[t_i]);
		t_r.m__points[t_i+1]=this.p_scaleY(t_verts[t_i+1]);
	}
	this.m__records.p_add(t_r);
}
c_EMFDocument.prototype.p_setPolyline=function(t_verts){
	var t_r=c_EMFPolylineRecord.m_new.call(new c_EMFPolylineRecord);
	t_r.m__points=resize_number_array(t_r.m__points,t_verts.length);
	for(var t_i=0;t_i<t_verts.length;t_i=t_i+2){
		t_r.m__points[t_i]=this.p_scaleX(t_verts[t_i]);
		t_r.m__points[t_i+1]=this.p_scaleY(t_verts[t_i+1]);
	}
	this.m__records.p_add(t_r);
}
c_EMFDocument.prototype.p_beginPath=function(){
	var t_r=c_EMFBeginPathRecord.m_new.call(new c_EMFBeginPathRecord);
	this.m__records.p_add(t_r);
}
c_EMFDocument.prototype.p_closePath=function(){
	var t_r=c_EMFEndPathRecord.m_new.call(new c_EMFEndPathRecord);
	this.m__records.p_add(t_r);
}
c_EMFDocument.prototype.p_strokePath=function(t_f){
	this.p_closePath();
	if(t_f){
		var t_r=c_EMFFillPathRecord.m_new.call(new c_EMFFillPathRecord);
		this.m__records.p_add(t_r);
	}else{
		var t_r2=c_EMFStrokePathRecord.m_new.call(new c_EMFStrokePathRecord);
		this.m__records.p_add(t_r2);
	}
}
c_EMFDocument.prototype.p_findFontIndex=function(t_search){
	var t_idx=0;
	var t_=this.m__objects.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		var t_r=object_downcast((t_o),c_EMFBinaryRecord);
		if(t_r.m__type==82){
			var t_f=object_downcast((t_o),c_EMFCreateFontIndirectRecord);
			if(t_f.m__facename==t_search.m__facename && t_f.m__height==t_search.m__height && t_f.m__bold==t_search.m__bold){
				return t_idx;
			}
		}
		t_idx+=1;
	}
	return -1;
}
c_EMFDocument.prototype.p_setFont2=function(t_font){
	var t_r=c_EMFCreateFontIndirectRecord.m_new.call(new c_EMFCreateFontIndirectRecord);
	t_r.m__facename=t_font.m__fam;
	t_r.m__height=t_font.m__size*this.m__deviceScale*1.2;
	t_r.m__bold=t_font.m__bold;
	this.m__curFontSize=t_font.m__size;
	var t_idx=this.p_findFontIndex(t_r);
	if(t_idx==-1){
		this.m__records.p_add(t_r);
		this.m__objects.p_add(t_r);
		t_idx=this.p_findFontIndex(t_r);
		t_r.m__intindex=t_idx;
	}
	if(this.m__curFontIdx!=t_idx){
		this.m__curFontIdx=t_idx;
		this.p_addSelectObject(t_idx);
	}
}
c_EMFDocument.prototype.p_setTextColor=function(t_c){
	if(this.m__curTextCol!=null){
		if(this.m__curTextCol.p_equals(t_c)){
			return;
		}
	}
	var t_r=c_EMFSetTextColorRecord.m_new.call(new c_EMFSetTextColorRecord);
	t_r.m__col=t_c.p_clone();
	this.m__curTextCol=t_r.m__col;
	this.m__records.p_add(t_r);
}
c_EMFDocument.prototype.p_setTextAlign=function(t_atRight){
	var t_r=c_EMFSetTextAlignRecord.m_new.call(new c_EMFSetTextAlignRecord);
	if(t_atRight==false){
		t_r.m__mode=2;
	}
	this.m__records.p_add(t_r);
}
c_EMFDocument.prototype.p_setText=function(t_s,t_x,t_y,t_atRight){
	this.p_setTextAlign(t_atRight);
	var t_r=c_EMFTextoutRecord.m_new.call(new c_EMFTextoutRecord);
	t_r.m__text=t_s;
	t_r.m__x=this.p_scaleX(t_x);
	t_r.m__y=this.p_scaleY(t_y-this.m__curFontSize*0.2);
	this.m__records.p_add(t_r);
}
function c_EMFBinaryRecord(){
	Object.call(this);
	this.m__type=0;
	this.m__size=0;
}
c_EMFBinaryRecord.m_new=function(t_t,t_params){
	this.m__type=t_t;
	this.m__size=8+t_params*4;
	return this;
}
c_EMFBinaryRecord.m_new2=function(){
	return this;
}
c_EMFBinaryRecord.prototype.p_write=function(t_w){
	t_w.p_wI4(this.m__type);
	t_w.p_wI4(this.m__size);
}
c_EMFBinaryRecord.prototype.p_userfriendlyType=function(){
	return "???";
}
c_EMFBinaryRecord.prototype.p_ToString=function(){
	var t_s="";
	t_s="R/"+this.p_userfriendlyType();
	for(var t_i=t_s.length;t_i<20;t_i=t_i+1){
		t_s=t_s+".";
	}
	t_s=t_s+" ";
	return t_s;
}
function c_EMFSelectObjectIndexRecord(){
	c_EMFBinaryRecord.call(this);
	this.m__intindex=0;
}
c_EMFSelectObjectIndexRecord.prototype=extend_class(c_EMFBinaryRecord);
c_EMFSelectObjectIndexRecord.m_new=function(t_t){
	c_EMFBinaryRecord.m_new.call(this,t_t,1);
	return this;
}
c_EMFSelectObjectIndexRecord.m_new2=function(){
	c_EMFBinaryRecord.m_new2.call(this);
	return this;
}
c_EMFSelectObjectIndexRecord.prototype.p_write=function(t_w){
	c_EMFBinaryRecord.prototype.p_write.call(this,t_w);
	t_w.p_wI4(this.m__intindex+1);
}
c_EMFSelectObjectIndexRecord.prototype.p_userfriendlyType=function(){
	return "selectobject";
}
c_EMFSelectObjectIndexRecord.prototype.p_ToString=function(){
	var t_s="";
	t_s=c_EMFBinaryRecord.prototype.p_ToString.call(this);
	t_s=t_s+("index="+String(this.m__intindex+1));
	return t_s;
}
function c_EMFDeleteObjectRecord(){
	c_EMFSelectObjectIndexRecord.call(this);
}
c_EMFDeleteObjectRecord.prototype=extend_class(c_EMFSelectObjectIndexRecord);
c_EMFDeleteObjectRecord.m_new=function(){
	c_EMFSelectObjectIndexRecord.m_new.call(this,40);
	return this;
}
c_EMFDeleteObjectRecord.prototype.p_userfriendlyType=function(){
	return "deleteobject";
}
function c_EMFEndOfFileRecord(){
	c_EMFBinaryRecord.call(this);
}
c_EMFEndOfFileRecord.prototype=extend_class(c_EMFBinaryRecord);
c_EMFEndOfFileRecord.m_new=function(){
	c_EMFBinaryRecord.m_new.call(this,14,3);
	return this;
}
c_EMFEndOfFileRecord.prototype.p_write=function(t_w){
	c_EMFBinaryRecord.prototype.p_write.call(this,t_w);
	t_w.p_wI4(0);
	t_w.p_wI4(16);
	t_w.p_wI4(this.m__size);
}
c_EMFEndOfFileRecord.prototype.p_userfriendlyType=function(){
	return "eof";
}
c_EMFEndOfFileRecord.prototype.p_ToString=function(){
	var t_s="";
	t_s=c_EMFBinaryRecord.prototype.p_ToString.call(this);
	return t_s;
}
function c_EMFHeader(){
	c_EMFBinaryRecord.call(this);
	this.m__boundsLeft=0;
	this.m__boundsTop=0;
	this.m__boundsRight=1000;
	this.m__boundsBottom=1000;
	this.m__frameLeft=0;
	this.m__frameTop=0;
	this.m__frameRight=1000;
	this.m__frameBottom=1000;
	this.m__signature=1179469088;
	this.m__version=65536;
	this.m__metafileSize=0;
	this.m__numberOfRecords=0;
	this.m__numOfHandles=0;
	this.m__reserved=0;
	this.m__sizeOfDescrip=0;
	this.m__offsOfDescrip=0;
	this.m__numPalEntries=0;
	this.m__widthDevPixels=1000;
	this.m__heightDevPixels=1000;
	this.m__widthDevMM=10;
	this.m__heightDevMM=10;
}
c_EMFHeader.prototype=extend_class(c_EMFBinaryRecord);
c_EMFHeader.m_new=function(){
	c_EMFBinaryRecord.m_new.call(this,1,20);
	return this;
}
c_EMFHeader.prototype.p_write=function(t_w){
	c_EMFBinaryRecord.prototype.p_write.call(this,t_w);
	t_w.p_wI4(this.m__boundsLeft);
	t_w.p_wI4(this.m__boundsTop);
	t_w.p_wI4(this.m__boundsRight);
	t_w.p_wI4(this.m__boundsBottom);
	t_w.p_wI4(this.m__frameLeft);
	t_w.p_wI4(this.m__frameTop);
	t_w.p_wI4(this.m__frameRight);
	t_w.p_wI4(this.m__frameBottom);
	t_w.p_wI4(this.m__signature);
	t_w.p_wI4(this.m__version);
	t_w.p_wI4(this.m__metafileSize);
	t_w.p_wI4(this.m__numberOfRecords);
	t_w.p_wI2(this.m__numOfHandles);
	t_w.p_wI2(this.m__reserved);
	t_w.p_wI4(this.m__sizeOfDescrip);
	t_w.p_wI4(this.m__offsOfDescrip);
	t_w.p_wI4(this.m__numPalEntries);
	t_w.p_wI4(this.m__widthDevPixels);
	t_w.p_wI4(this.m__heightDevPixels);
	t_w.p_wI4(this.m__widthDevMM);
	t_w.p_wI4(this.m__heightDevMM);
}
c_EMFHeader.prototype.p_ToString=function(){
	var t_s="";
	t_s=c_EMFBinaryRecord.prototype.p_ToString.call(this);
	t_s=t_s+("bounds:"+String(this.m__boundsRight)+"/"+String(this.m__boundsBottom)+"  ");
	t_s=t_s+("frame:"+String(this.m__frameRight)+"/"+String(this.m__frameBottom)+"  ");
	t_s=t_s+("devpix:"+String(this.m__widthDevPixels)+"/"+String(this.m__heightDevPixels)+"  ");
	t_s=t_s+("devmm:"+String(this.m__widthDevMM)+"/"+String(this.m__heightDevMM)+"  ");
	return t_s;
}
c_EMFHeader.prototype.p_userfriendlyType=function(){
	return "header";
}
function bbMain(){
	c_API.m_initPrototypes();
	return 0;
}
function c_NoDataPainter(){
	Object.call(this);
	this.m__nd=null;
}
c_NoDataPainter.m_new=function(t_nd){
	this.m__nd=t_nd;
	return this;
}
c_NoDataPainter.m_new2=function(){
	return this;
}
c_NoDataPainter.prototype.p_draw2=function(t_g){
	var t_w=.0;
	var t_h=.0;
	var t_r=20.0;
	t_w=t_g.p_getDeviceWidth();
	t_h=t_g.p_getDeviceHeight();
	var t_col=c_Color.m_new4.call(new c_Color,210,5,((t_r)|0),0.3);
	t_g.p_setLineWidth(t_r/3.0);
	t_g.p_setColor(t_col);
	t_g.p_drawLine(t_w/2.0-t_r+6.0,t_h/2.0-t_r+6.0,t_w/2.0+t_r-6.0,t_h/2.0+t_r-6.0);
	t_g.p_setColor(t_g.m__background);
	t_g.p_drawCircle(t_w/2.0,t_h/2.0,t_r,false);
	t_g.p_setColor(t_col);
	t_g.p_drawCircle(t_w/2.0,t_h/2.0,t_r,false);
}
function bb_math_Abs(t_x){
	if(t_x>=0){
		return t_x;
	}
	return -t_x;
}
function bb_math_Abs2(t_x){
	if(t_x>=0.0){
		return t_x;
	}
	return -t_x;
}
function bb_math_Sgn(t_x){
	if(t_x<0){
		return -1;
	}
	return ((t_x>0)?1:0);
}
function bb_math_Sgn2(t_x){
	if(t_x<0.0){
		return -1.0;
	}
	if(t_x>0.0){
		return 1.0;
	}
	return 0.0;
}
function bb_utils_round(t_x){
	var t_f=bb_math_Abs2(t_x);
	return Math.floor(t_f+0.5000000001)*bb_math_Sgn2(t_x);
}
function bb_utils_isZero(t_f,t_precision){
	var t_r=Math.pow(10.0,(-t_precision))/2.0;
	if(bb_math_Abs2(t_f)<t_r){
		return true;
	}
	return false;
}
function bb_utils_round2(t_x,t_factor){
	if(bb_utils_isZero(t_factor,8)){
		return t_x;
	}
	var t_f=bb_math_Abs2(t_x);
	return Math.floor(t_f/t_factor+0.5000000001)*t_factor*bb_math_Sgn2(t_x);
}
function c_Matrix(){
	Object.call(this);
	this.m__a=.0;
	this.m__b=.0;
	this.m__c=.0;
	this.m__d=.0;
	this.m__e=.0;
	this.m__f=.0;
	this.m__dirty=false;
}
c_Matrix.prototype.p_set7=function(t_a,t_b,t_c,t_d,t_e,t_f){
	this.m__a=t_a;
	this.m__b=t_b;
	this.m__c=t_c;
	this.m__d=t_d;
	this.m__e=t_e;
	this.m__f=t_f;
	this.m__dirty=false;
}
c_Matrix.m_new=function(t_a,t_b,t_c,t_d,t_e,t_f){
	this.p_set7(t_a,t_b,t_c,t_d,t_e,t_f);
	return this;
}
c_Matrix.m_new2=function(){
	return this;
}
function c_Rectangle(){
	Object.call(this);
	this.m__x=.0;
	this.m__y=.0;
	this.m__w=.0;
	this.m__h=.0;
}
c_Rectangle.prototype.p_set8=function(t_x,t_y,t_w,t_h){
	this.m__x=t_x;
	this.m__y=t_y;
	this.m__w=t_w;
	this.m__h=t_h;
}
c_Rectangle.m_new=function(t_x,t_y,t_w,t_h){
	this.p_set8(t_x,t_y,t_w,t_h);
	return this;
}
c_Rectangle.m_new2=function(){
	return this;
}
c_Rectangle.prototype.p_getInnerRect=function(t_outer){
	return c_Rectangle.m_new.call(new c_Rectangle,t_outer.m__x+this.m__x,t_outer.m__y+this.m__y,this.m__w,this.m__h);
}
c_Rectangle.prototype.p_getOuterBounds=function(t_rect){
	var t_r=c_Rectangle.m_new2.call(new c_Rectangle);
	t_r.m__x=bb_math_Min2(this.m__x,t_rect.m__x);
	t_r.m__y=bb_math_Min2(this.m__y,t_rect.m__y);
	t_r.m__w=bb_math_Max2(this.m__x+this.m__w,t_rect.m__x+t_rect.m__w)-t_r.m__x;
	t_r.m__h=bb_math_Max2(this.m__y+this.m__h,t_rect.m__y+t_rect.m__h)-t_r.m__y;
	return t_r;
}
c_Rectangle.prototype.p_repositionXtoBound=function(t_bounds){
	if(this.m__x+this.m__w>t_bounds.m__w){
		this.m__x=t_bounds.m__w-this.m__w;
	}
	this.m__x=bb_math_Max2(t_bounds.m__x,this.m__x);
}
c_Rectangle.prototype.p_isOverlapping=function(t_rect,t_minDistX,t_minDistY){
	if(t_rect==null){
		return false;
	}
	if(t_rect.m__x>this.m__x+this.m__w+t_minDistX || t_rect.m__x+t_rect.m__w<this.m__x-t_minDistX || t_rect.m__y>this.m__y+this.m__h+t_minDistY || t_rect.m__y+t_rect.m__h<this.m__y-t_minDistY){
		return false;
	}
	return true;
}
function c_Point(){
	Object.call(this);
	this.m__x=.0;
	this.m__y=.0;
}
c_Point.m_new=function(t_p){
	this.m__x=t_p.m__x;
	this.m__y=t_p.m__y;
	return this;
}
c_Point.m_new2=function(t_x,t_y){
	this.m__x=t_x;
	this.m__y=t_y;
	return this;
}
c_Point.m_new3=function(){
	return this;
}
c_Point.prototype.p_clone=function(){
	return c_Point.m_new2.call(new c_Point,this.m__x,this.m__y);
}
c_Point.prototype.p_isInRectangle=function(t_r){
	if(this.m__x>=t_r.m__x && this.m__x<=t_r.m__x+t_r.m__w && this.m__y>=t_r.m__y && this.m__y<=t_r.m__y+t_r.m__h){
		return true;
	}
	return false;
}
function c_LegendPanel(){
	Object.call(this);
	this.m__options=null;
	this.m__type=0;
	this.m__vertical=false;
	this.m__legendItems=c_Collection.m_new.call(new c_Collection);
	this.m__bounds=c_Rectangle.m_new2.call(new c_Rectangle);
}
c_LegendPanel.m_new=function(t_data,t_collDataSet){
	this.m__options=t_data.m__options;
	this.m__type=this.m__options.m__legend;
	this.m__vertical=false;
	if(this.m__type==4 || this.m__type==3 && this.m__options.m__legendColumn){
		this.m__vertical=true;
	}
	if(this.m__options.m__legendNameAsTitle && this.m__options.m__legendName!=""){
		var t_item=c_InspectTitleItem.m_new.call(new c_InspectTitleItem,this.m__options.m__legendName);
		this.m__legendItems.p_add(t_item);
	}
	var t_=t_collDataSet.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_oset=t_.p_NextObject();
		var t_ds=object_downcast((t_oset),c_GraphicDataSet);
		var t_item2=c_LegendItem.m_new.call(new c_LegendItem,t_ds,this.m__options.m__legendBoxRound);
		this.m__legendItems.p_add(t_item2);
	}
	return this;
}
c_LegendPanel.m_new2=function(){
	return this;
}
c_LegendPanel.prototype.p_calculateDimension=function(t_g,t_maxHorizontalWidth){
	var t_gapSizeV=t_g.p_floatSize(this.m__options.m__legendGapPercent,this.m__options.m__fontLegend);
	var t_gapSizeH=t_gapSizeV;
	var t_first=true;
	var t_nextX=5.0;
	var t_nextY=5.0;
	this.m__bounds.m__w=0.0;
	this.m__bounds.m__h=0.0;
	var t_=this.m__legendItems.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		var t_item=object_downcast((t_o),c_DrawItem);
		t_item.p_calculateDimension2(t_g,this.m__options);
	}
	if(this.m__vertical){
		var t_2=this.m__legendItems.p_ObjectEnumerator();
		while(t_2.p_HasNext()){
			var t_o2=t_2.p_NextObject();
			var t_item2=object_downcast((t_o2),c_DrawItem);
			if(t_first==false){
				t_nextY+=t_gapSizeV;
			}
			t_first=false;
			t_item2.m__bounds.m__x=5.0;
			t_item2.m__bounds.m__w=t_item2.m__bounds.m__w+5.0;
			t_item2.m__bounds.m__y=t_nextY;
			t_nextY=t_item2.m__bounds.m__y+t_item2.m__bounds.m__h;
			this.m__bounds.m__w=bb_math_Max2(this.m__bounds.m__w,t_item2.m__bounds.m__x+t_item2.m__bounds.m__w);
			this.m__bounds.m__h=t_nextY+5.0;
		}
	}else{
		var t_3=this.m__legendItems.p_ObjectEnumerator();
		while(t_3.p_HasNext()){
			var t_o3=t_3.p_NextObject();
			var t_item3=object_downcast((t_o3),c_DrawItem);
			if(t_first==false){
				t_nextX+=t_gapSizeH;
			}
			t_first=false;
			if(t_nextX+t_item3.m__bounds.m__w+5.0>t_maxHorizontalWidth){
				t_nextX=5.0;
				t_nextY=this.m__bounds.m__h+t_gapSizeV/2.0;
			}
			t_item3.m__bounds.m__x=t_nextX;
			t_item3.m__bounds.m__y=t_nextY;
			t_item3.m__bounds.m__h=t_item3.m__bounds.m__h+5.0;
			t_nextX=t_item3.m__bounds.m__x+t_item3.m__bounds.m__w;
			this.m__bounds.m__w=t_item3.m__bounds.m__x+t_item3.m__bounds.m__w;
			this.m__bounds.m__h=t_item3.m__bounds.m__y+t_item3.m__bounds.m__h;
		}
	}
}
function c_Graph2DPanel(){
	c_Graph2DBase.call(this);
	this.m__g2d=null;
	this.m__bounds=null;
}
c_Graph2DPanel.prototype=extend_class(c_Graph2DBase);
c_Graph2DPanel.m_new=function(){
	c_Graph2DBase.m_new.call(this);
	return this;
}
c_Graph2DPanel.m_new2=function(t_g2d,t_rect){
	c_Graph2DBase.m_new.call(this);
	this.m__g2d=t_g2d;
	this.m__bounds=t_rect;
	return this;
}
c_Graph2DPanel.prototype.p_transX=function(t_x){
	return this.m__bounds.m__x+t_x;
}
c_Graph2DPanel.prototype.p_transY=function(t_y){
	return this.m__bounds.m__y+t_y;
}
c_Graph2DPanel.prototype.p_transRect=function(t_r){
	var t_newR=c_Rectangle.m_new2.call(new c_Rectangle);
	t_newR.m__x=this.p_transX(t_r.m__x);
	t_newR.m__y=this.p_transY(t_r.m__y);
	t_newR.m__w=t_r.m__w;
	t_newR.m__h=t_r.m__h;
	return t_newR;
}
c_Graph2DPanel.prototype.p_getFontHeight=function(){
	return this.m__g2d.p_getFontHeight();
}
c_Graph2DPanel.prototype.p_getFontHeight2=function(t_font){
	return this.m__g2d.p_getFontHeight2(t_font);
}
c_Graph2DPanel.prototype.p_setColor=function(t_c){
	this.m__g2d.p_setColor(t_c);
}
c_Graph2DPanel.prototype.p_setColor2=function(t_r,t_g,t_b){
	this.m__g2d.p_setColor2(t_r,t_g,t_b);
}
c_Graph2DPanel.prototype.p_setColor3=function(t_r,t_g,t_b,t_a){
	this.m__g2d.p_setColor3(t_r,t_g,t_b,t_a);
}
c_Graph2DPanel.prototype.p_drawRect=function(t_x,t_y,t_w,t_h,t_filled){
	this.m__g2d.p_drawRect(this.p_transX(t_x),this.p_transY(t_y),t_w,t_h,t_filled);
}
c_Graph2DPanel.prototype.p_drawRect2=function(t_r,t_filled){
	this.m__g2d.p_drawRect2(this.p_transRect(t_r),t_filled);
}
c_Graph2DPanel.prototype.p_setStroke=function(t_s){
	this.m__g2d.p_setStroke(t_s);
}
c_Graph2DPanel.prototype.p_drawLine=function(t_x1,t_y1,t_x2,t_y2){
	this.m__g2d.p_drawLine(this.p_transX(t_x1),this.p_transY(t_y1),this.p_transX(t_x2),this.p_transY(t_y2));
}
c_Graph2DPanel.prototype.p_drawLine2=function(t_pFrom,t_pTo){
	this.m__g2d.p_drawLine(this.p_transX(t_pFrom.m__x),this.p_transY(t_pFrom.m__y),this.p_transX(t_pTo.m__x),this.p_transY(t_pTo.m__y));
}
c_Graph2DPanel.prototype.p_setLineDash=function(t_sz){
	this.m__g2d.p_setLineDash(t_sz);
}
c_Graph2DPanel.prototype.p_setFont=function(t_family,t_size,t_bold){
	this.m__g2d.p_setFont(t_family,t_size,t_bold);
}
c_Graph2DPanel.prototype.p_setFont2=function(t_f){
	this.m__g2d.p_setFont2(t_f);
}
c_Graph2DPanel.prototype.p_getTextWidth=function(t_s){
	return this.m__g2d.p_getTextWidth(t_s);
}
c_Graph2DPanel.prototype.p_getTextWidth2=function(t_s,t_font){
	return this.m__g2d.p_getTextWidth2(t_s,t_font);
}
c_Graph2DPanel.prototype.p_drawText=function(t_s,t_x,t_y,t_atRight){
	this.m__g2d.p_drawText(t_s,this.p_transX(t_x),this.p_transY(t_y),t_atRight);
}
c_Graph2DPanel.prototype.p_pieDrawingIsClockwise=function(){
	return this.m__g2d.p_pieDrawingIsClockwise();
}
c_Graph2DPanel.prototype.p_drawPie=function(t_x,t_y,t_r,t_sDeg,t_eDeg,t_p,t_filled){
	this.m__g2d.p_drawPie(t_x,t_y,t_r,t_sDeg,t_eDeg,t_p,t_filled);
}
c_Graph2DPanel.prototype.p_getFontDescentHeight=function(){
	return this.m__g2d.p_getFontDescentHeight();
}
c_Graph2DPanel.prototype.p_getFontDescentHeight2=function(t_font){
	return this.m__g2d.p_getFontDescentHeight2(t_font);
}
c_Graph2DPanel.prototype.p_clear=function(t_c){
	this.m__g2d.p_setColor(t_c);
	this.m__g2d.p_drawRect2(this.m__bounds,true);
}
c_Graph2DPanel.prototype.p_clear2=function(t_r,t_g,t_b){
	this.m__g2d.p_setColor2(t_r,t_g,t_b);
	this.m__g2d.p_drawRect2(this.m__bounds,true);
}
c_Graph2DPanel.prototype.p_clear3=function(){
	this.m__g2d.p_setColor(c_Color.m_white);
	this.m__g2d.p_drawRect2(this.m__bounds,true);
}
c_Graph2DPanel.prototype.p_setLineWidth=function(t_w){
	this.m__g2d.p_setLineWidth(t_w);
}
c_Graph2DPanel.prototype.p_setBlend=function(t_blend){
	this.m__g2d.p_setBlend(t_blend);
}
c_Graph2DPanel.prototype.p_drawOval=function(t_x,t_y,t_w,t_h,t_filled){
	this.m__g2d.p_drawOval(this.p_transX(t_x),this.p_transY(t_y),t_w,t_h,t_filled);
}
c_Graph2DPanel.prototype.p_drawOval2=function(t_r,t_filled){
	this.m__g2d.p_drawOval2(this.p_transRect(t_r),t_filled);
}
c_Graph2DPanel.prototype.p_drawCircle=function(t_x,t_y,t_r,t_filled){
	this.p_drawOval(t_x-t_r,t_y-t_r,t_r*2.0,t_r*2.0,t_filled);
}
c_Graph2DPanel.prototype.p_drawCircle2=function(t_p,t_r,t_filled){
	this.p_drawCircle(t_p.m__x,t_p.m__y,t_r,t_filled);
}
c_Graph2DPanel.prototype.p_drawPoly=function(t_verts,t_filled){
	var t_vertsTrans=[];
	t_vertsTrans=resize_number_array(t_vertsTrans,t_verts.length);
	for(var t_i=0;t_i<t_verts.length;t_i=t_i+2){
		t_vertsTrans[t_i]=this.p_transX(t_verts[t_i]);
		t_vertsTrans[t_i+1]=this.p_transY(t_verts[t_i+1]);
	}
	this.m__g2d.p_drawPoly(t_vertsTrans,t_filled);
}
c_Graph2DPanel.prototype.p_drawPoly2=function(t_points,t_filled){
	var t_vertsTrans=[];
	var t_i=0;
	t_vertsTrans=resize_number_array(t_vertsTrans,t_points.length*2);
	var t_=t_points;
	var t_2=0;
	while(t_2<t_.length){
		var t_p=t_[t_2];
		t_2=t_2+1;
		t_vertsTrans[t_i]=this.p_transX(t_p.m__x);
		t_vertsTrans[t_i+1]=this.p_transY(t_p.m__y);
		t_i+=2;
	}
	this.m__g2d.p_drawPoly(t_vertsTrans,t_filled);
}
c_Graph2DPanel.prototype.p_beginPath=function(){
	this.m__g2d.p_beginPath();
}
c_Graph2DPanel.prototype.p_strokePath=function(t_f){
	this.m__g2d.p_strokePath(t_f);
}
c_Graph2DPanel.prototype.p_closePath=function(){
	this.m__g2d.p_closePath();
}
c_Graph2DPanel.prototype.p_moveTo=function(t_x,t_y){
	this.m__g2d.p_moveTo(this.p_transX(t_x),this.p_transY(t_y));
}
c_Graph2DPanel.prototype.p_moveTo2=function(t_pTo){
	this.m__g2d.p_moveTo(this.p_transX(t_pTo.m__x),this.p_transY(t_pTo.m__y));
}
c_Graph2DPanel.prototype.p_lineTo=function(t_x2,t_y2){
	this.m__g2d.p_lineTo(this.p_transX(t_x2),this.p_transY(t_y2));
}
c_Graph2DPanel.prototype.p_lineTo2=function(t_pTo){
	this.m__g2d.p_lineTo(this.p_transX(t_pTo.m__x),this.p_transY(t_pTo.m__y));
}
c_Graph2DPanel.prototype.p_curveTo=function(t_cpx,t_cpy,t_x2,t_y2){
	this.m__g2d.p_curveTo(this.p_transX(t_cpx),this.p_transY(t_cpy),this.p_transX(t_x2),this.p_transY(t_y2));
}
c_Graph2DPanel.prototype.p_curveTo2=function(t_pCtrl,t_pTo){
	this.m__g2d.p_curveTo(this.p_transX(t_pCtrl.m__x),this.p_transY(t_pCtrl.m__y),this.p_transX(t_pTo.m__x),this.p_transY(t_pTo.m__y));
}
function c_Margin(){
	Object.call(this);
	this.m__top=.0;
	this.m__left=.0;
	this.m__bottom=.0;
	this.m__right=.0;
}
c_Margin.m_new=function(t_w){
	this.m__top=t_w;
	this.m__left=t_w;
	this.m__bottom=t_w;
	this.m__right=t_w;
	return this;
}
c_Margin.m_new2=function(t_t,t_l,t_b,t_r){
	this.m__top=t_t;
	this.m__left=t_l;
	this.m__bottom=t_b;
	this.m__right=t_r;
	return this;
}
c_Margin.m_new3=function(){
	return this;
}
c_Margin.prototype.p_getInnerRect=function(t_outer){
	return c_Rectangle.m_new.call(new c_Rectangle,t_outer.m__x+this.m__left,t_outer.m__y+this.m__top,t_outer.m__w-(this.m__left+this.m__right),t_outer.m__h-(this.m__top+this.m__bottom));
}
function c_DrawItem(){
	Object.call(this);
	this.m__typ=0;
	this.m__bounds=c_Rectangle.m_new2.call(new c_Rectangle);
}
c_DrawItem.m_new=function(){
	return this;
}
c_DrawItem.prototype.p_calculateDimension2=function(t_g,t_options){
}
c_DrawItem.prototype.p_setWidth=function(t_w){
	this.m__bounds.m__w=t_w;
}
function c_InspectTitleItem(){
	c_DrawItem.call(this);
	this.m__title="";
	this.m__font=null;
	this.m__color=null;
}
c_InspectTitleItem.prototype=extend_class(c_DrawItem);
c_InspectTitleItem.m_new=function(t_tit){
	c_DrawItem.m_new.call(this);
	this.m__typ=20;
	this.m__title=t_tit;
	return this;
}
c_InspectTitleItem.m_new2=function(){
	c_DrawItem.m_new.call(this);
	return this;
}
c_InspectTitleItem.prototype.p_calculateDimension2=function(t_g,t_options){
	this.m__color=t_options.m__legendBoxColor;
	this.m__font=t_options.m__fontLegSum.p_clone();
	var t_fontHeigth=t_g.p_getFontHeight2(this.m__font);
	var t_textwidth=t_g.p_getTextWidth2(this.m__title,this.m__font);
	this.m__bounds.m__w=t_textwidth;
	this.m__bounds.m__h=t_fontHeigth+5.0;
}
function c_LegendItem(){
	c_DrawItem.call(this);
	this.m__ds=null;
	this.m__roundBox=false;
	this.m__boxRect=null;
	this.m__boxcolor=null;
	this.m__legendBoxUseSetColor=false;
	this.m__color=null;
	this.m__stroke=null;
	this.m__font=null;
	this.m__textRect=null;
	this.m__text="";
}
c_LegendItem.prototype=extend_class(c_DrawItem);
c_LegendItem.m_new=function(t_ds,t_round){
	c_DrawItem.m_new.call(this);
	this.m__typ=10;
	this.m__ds=t_ds;
	this.m__roundBox=t_round;
	return this;
}
c_LegendItem.m_new2=function(){
	c_DrawItem.m_new.call(this);
	return this;
}
c_LegendItem.prototype.p_calculateDimension2=function(t_g,t_options){
	this.m__font=t_options.m__fontLegend;
	this.m__color=t_options.m__legendBoxColor;
	this.m__stroke=t_options.m__legendBoxStroke;
	this.m__text=this.m__ds.m__legend;
	this.m__boxcolor=this.m__ds.m__color;
	this.m__legendBoxUseSetColor=t_options.m__legendBoxUseSetColor;
	var t_fontHeigth=t_g.p_getFontHeight2(this.m__font);
	var t_descent=t_g.p_getFontDescentHeight2(this.m__font);
	var t_textwidth=t_g.p_getTextWidth2(this.m__text,this.m__font);
	var t_boxSize=t_options.m__legendBoxPercent*t_fontHeigth/100.0;
	var t_h=bb_math_Max2(t_boxSize,t_fontHeigth);
	var t_ml=t_h/2.0;
	this.m__boxRect=c_Rectangle.m_new.call(new c_Rectangle,0.0,t_ml-t_boxSize/2.0,t_boxSize,t_boxSize);
	this.m__textRect=c_Rectangle.m_new.call(new c_Rectangle,t_boxSize+5.0,t_ml-t_fontHeigth/2.0+t_descent,t_textwidth,t_fontHeigth);
	if(this.m__ds.m__drawAsLine && this.m__roundBox==false){
		this.m__boxRect.m__y+=t_boxSize/4.0;
		this.m__boxRect.m__h-=t_boxSize/2.0;
	}
	this.m__bounds=this.m__boxRect.p_getOuterBounds(this.m__textRect);
	this.m__bounds.m__x=0.0;
	this.m__bounds.m__y=0.0;
}
function c_LegendPainter(){
	Object.call(this);
	this.m__legendpanel=null;
	this.m__bounds=null;
}
c_LegendPainter.m_new=function(t_panel){
	this.m__legendpanel=t_panel;
	this.m__bounds=this.m__legendpanel.m__bounds;
	return this;
}
c_LegendPainter.m_new2=function(){
	return this;
}
c_LegendPainter.prototype.p_draw2=function(t_gArea){
	var t_g=null;
	t_g=c_Graph2DPanel.m_new2.call(new c_Graph2DPanel,t_gArea,this.m__bounds);
	var t_=this.m__legendpanel.m__legendItems.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		var t_item=object_downcast((t_o),c_DrawItem);
		c_ItemPainter.m_draw((t_g),t_item);
	}
	var t_rBoxRect=null;
	var t_rTextRect=null;
	var t_hotspots=c_Collection.m_new.call(new c_Collection);
	var t_2=this.m__legendpanel.m__legendItems.p_ObjectEnumerator();
	while(t_2.p_HasNext()){
		var t_o2=t_2.p_NextObject();
		var t_drawitem=object_downcast((t_o2),c_DrawItem);
		if(t_drawitem.m__typ!=10){
			continue;
		}
		var t_item2=object_downcast((t_o2),c_LegendItem);
		t_rBoxRect=t_item2.m__boxRect.p_getInnerRect(t_item2.m__bounds);
		t_rTextRect=t_item2.m__textRect.p_getInnerRect(t_item2.m__bounds);
		var t_lhsp=c_LegendHotSpot.m_new.call(new c_LegendHotSpot,t_item2);
		t_lhsp.m__bounds=t_g.p_transRect(t_rBoxRect.p_getOuterBounds(t_rTextRect));
		t_hotspots.p_add(t_lhsp);
	}
	return t_hotspots;
}
function c_ItemPainter(){
	Object.call(this);
}
c_ItemPainter.m_drawTextItem=function(t_g,t_item){
	if(t_item.m__text==""){
		return;
	}
	t_g.p_setColor(t_item.m__textcolor);
	t_g.p_setFont2(t_item.m__font);
	var t_texty=t_item.m__bounds.m__y;
	var t_fontHeight=t_g.p_getFontHeight();
	var t_slines=t_item.m__text.split("\\n");
	var t_=t_slines;
	var t_2=0;
	while(t_2<t_.length){
		var t_s=t_[t_2];
		t_2=t_2+1;
		t_s=string_trim(t_s);
		var t_22=t_item.m__textalign;
		if(t_22==1){
			var t_textWidth=t_g.p_getTextWidth(t_s);
			t_g.p_drawText(t_s,t_item.m__bounds.m__x+(t_item.m__bounds.m__w-t_textWidth)/2.0,t_texty,true);
		}else{
			if(t_22==2){
				t_g.p_drawText(t_s,t_item.m__bounds.m__x+t_item.m__bounds.m__w,t_texty,false);
			}else{
				t_g.p_drawText(t_s,t_item.m__bounds.m__x,t_texty,true);
			}
		}
		t_texty+=t_fontHeight;
	}
}
c_ItemPainter.m_drawTicItem=function(t_g,t_item){
	c_ItemPainter.m_drawTextItem(t_g,(t_item));
	t_g.p_setColor(t_item.m__tickcolor);
	t_g.p_setStroke(t_item.m__stroke);
	t_g.p_drawLine2(t_item.m__pt1,t_item.m__pt2);
}
c_ItemPainter.m_drawLegendItem=function(t_g,t_item){
	var t_r=null;
	t_r=t_item.m__boxRect.p_getInnerRect(t_item.m__bounds);
	if(t_item.m__ds.m__switchedoff==false){
		t_g.p_setColor(t_item.m__boxcolor);
		if(t_item.m__roundBox){
			t_g.p_drawOval2(t_r,true);
		}else{
			t_g.p_drawRect2(t_r,true);
		}
		if(t_item.m__legendBoxUseSetColor==false){
			t_g.p_setColor(t_item.m__color);
			t_g.p_setStroke(t_item.m__stroke);
			if(t_item.m__roundBox){
				t_g.p_drawOval2(t_r,false);
			}else{
				t_g.p_drawRect2(t_r,false);
			}
		}
	}else{
		if(t_item.m__legendBoxUseSetColor==true){
			t_g.p_setColor(t_item.m__boxcolor);
		}else{
			t_g.p_setColor(t_item.m__color);
		}
		t_g.p_setStroke(t_item.m__stroke);
		if(t_item.m__roundBox){
			t_g.p_drawOval2(t_r,false);
		}else{
			t_g.p_drawRect2(t_r,false);
		}
	}
	t_g.p_setColor(t_item.m__color);
	t_g.p_setFont2(t_item.m__font);
	t_r=t_item.m__textRect.p_getInnerRect(t_item.m__bounds);
	t_g.p_drawText(t_item.m__text,t_r.m__x,t_r.m__y,true);
}
c_ItemPainter.m_drawTitleItem=function(t_g,t_item){
	var t_r=null;
	t_g.p_setFont2(t_item.m__font);
	t_g.p_setColor(t_item.m__color);
	t_r=t_item.m__bounds;
	t_g.p_drawText(t_item.m__title,t_r.m__x,t_r.m__y,true);
}
c_ItemPainter.m_drawLineItem=function(t_g,t_item){
	var t_r=null;
	t_r=t_item.m__bounds;
	t_g.p_setColor(t_item.m__linecolor);
	t_g.p_drawLine(t_r.m__x,t_r.m__y,t_r.m__x+t_r.m__w,t_r.m__y);
}
c_ItemPainter.m_drawSeperatorItem=function(t_g,t_item){
}
c_ItemPainter.m_drawValueItem=function(t_g,t_item){
	var t_r=null;
	if(t_item.m__hidden==false){
		t_r=t_item.m__boxRect.p_getInnerRect(t_item.m__bounds);
		t_g.p_setColor(t_item.m__boxcolor);
		t_g.p_drawRect2(t_r,true);
		if(t_item.m__ds.m__switchedoff || t_item.m__legendBoxUseSetColor==false){
			t_g.p_setColor(t_item.m__color);
			t_g.p_drawRect2(t_r,false);
		}
	}
	t_g.p_setColor(t_item.m__color);
	t_g.p_setFont2(t_item.m__font);
	t_r=t_item.m__textRect.p_getInnerRect(t_item.m__bounds);
	t_g.p_drawText(t_item.m__text,t_r.m__x,t_r.m__y,true);
	t_r=t_item.m__valueRect.p_getInnerRect(t_item.m__bounds);
	t_g.p_drawText(t_item.m__value,t_r.m__x+t_r.m__w,t_r.m__y,false);
}
c_ItemPainter.m_draw=function(t_g,t_item){
	var t_1=t_item.m__typ;
	if(t_1==1){
		c_ItemPainter.m_drawTextItem(t_g,object_downcast((t_item),c_TextItem));
	}else{
		if(t_1==2){
			c_ItemPainter.m_drawTicItem(t_g,object_downcast((t_item),c_TicItem));
		}else{
			if(t_1==10){
				c_ItemPainter.m_drawLegendItem(t_g,object_downcast((t_item),c_LegendItem));
			}else{
				if(t_1==20){
					c_ItemPainter.m_drawTitleItem(t_g,object_downcast((t_item),c_InspectTitleItem));
				}else{
					if(t_1==21){
						c_ItemPainter.m_drawLineItem(t_g,object_downcast((t_item),c_InspectLineItem));
					}else{
						if(t_1==22){
							c_ItemPainter.m_drawSeperatorItem(t_g,object_downcast((t_item),c_InspectSeparatorItem));
						}else{
							if(t_1==23){
								c_ItemPainter.m_drawValueItem(t_g,object_downcast((t_item),c_InspectValueItem));
							}
						}
					}
				}
			}
		}
	}
}
function c_TextItem(){
	c_DrawItem.call(this);
	this.m__text="";
	this.m__textcolor=null;
	this.m__font=null;
	this.m__textalign=0;
}
c_TextItem.prototype=extend_class(c_DrawItem);
c_TextItem.m_new=function(){
	c_DrawItem.m_new.call(this);
	this.m__typ=1;
	return this;
}
function c_Alignment(){
	Object.call(this);
}
function c_TicItem(){
	c_TextItem.call(this);
	this.m__tickcolor=null;
	this.m__stroke=null;
	this.m__pt1=c_Point.m_new3.call(new c_Point);
	this.m__pt2=c_Point.m_new3.call(new c_Point);
	this.m__from=.0;
	this.m__to=.0;
	this.m__x=.0;
	this.m__y=.0;
}
c_TicItem.prototype=extend_class(c_TextItem);
c_TicItem.m_new=function(){
	c_TextItem.m_new.call(this);
	this.m__typ=2;
	return this;
}
c_TicItem.m_new2=function(t_ts){
	c_TextItem.m_new.call(this);
	this.m__typ=2;
	this.m__from=(t_ts.m__start);
	this.m__to=(t_ts.m__start+t_ts.m__duration);
	this.m__text=t_ts.m__xtext;
	return this;
}
function c_InspectLineItem(){
	c_DrawItem.call(this);
	this.m__linecolor=c_Color.m_black;
}
c_InspectLineItem.prototype=extend_class(c_DrawItem);
c_InspectLineItem.prototype.p_calculateDimension2=function(t_g,t_options){
	this.m__bounds.m__h=6.0;
}
c_InspectLineItem.m_new=function(){
	c_DrawItem.m_new.call(this);
	this.m__typ=21;
	return this;
}
function c_InspectSeparatorItem(){
	c_DrawItem.call(this);
}
c_InspectSeparatorItem.prototype=extend_class(c_DrawItem);
c_InspectSeparatorItem.prototype.p_calculateDimension2=function(t_g,t_options){
	var t_fontHeigth=t_g.p_getFontHeight2(t_options.m__fontLegend);
	this.m__bounds.m__h=t_fontHeigth;
}
c_InspectSeparatorItem.m_new=function(){
	c_DrawItem.m_new.call(this);
	this.m__typ=22;
	return this;
}
function c_InspectValueItem(){
	c_LegendItem.call(this);
	this.m__hidden=false;
	this.m__valueRect=null;
	this.m__value="";
	this.m__valueMinWidth=.0;
}
c_InspectValueItem.prototype=extend_class(c_LegendItem);
c_InspectValueItem.prototype.p_calculateDimension2=function(t_g,t_options){
	c_LegendItem.prototype.p_calculateDimension2.call(this,t_g,t_options);
	if(this.m__valueMinWidth<1.0){
		this.m__valueMinWidth=t_g.p_getTextWidth2("99'999'999",t_options.m__fontLegend);
	}
	var t_textwidth=bb_math_Max2(this.m__valueMinWidth,t_g.p_getTextWidth2(this.m__value+"  ",t_options.m__fontLegend));
	this.m__valueRect=c_Rectangle.m_new2.call(new c_Rectangle);
	this.m__valueRect.m__x=this.m__textRect.m__x+this.m__textRect.m__w+5.0;
	this.m__valueRect.m__y=this.m__textRect.m__y;
	this.m__valueRect.m__w=t_textwidth;
	this.m__valueRect.m__h=this.m__textRect.m__h;
	this.m__bounds=this.m__bounds.p_getOuterBounds(this.m__valueRect);
	this.m__bounds.m__h=this.m__bounds.m__h+5.0;
}
c_InspectValueItem.m_new=function(t_ds,t_val){
	c_LegendItem.m_new.call(this,t_ds,false);
	this.m__typ=23;
	this.m__value=c_NumericFormater.m_convert2(t_val,"###'###'###'##9");
	this.m__hidden=this.m__ds.m__hidden;
	return this;
}
c_InspectValueItem.m_new2=function(){
	c_LegendItem.m_new2.call(this);
	return this;
}
c_InspectValueItem.prototype.p_setWidth=function(t_w){
	this.m__valueRect.m__x-=this.m__bounds.m__w-t_w;
	c_DrawItem.prototype.p_setWidth.call(this,t_w);
}
function c_HotSpot(){
	Object.call(this);
	this.m__bounds=null;
}
c_HotSpot.m_new=function(){
	return this;
}
c_HotSpot.prototype.p_onDown=function(t_cb,t_x,t_y){
	return false;
}
c_HotSpot.prototype.p_onUp=function(t_cb,t_x,t_y){
	return false;
}
c_HotSpot.prototype.p_onMove=function(t_cb,t_x,t_y){
	return false;
}
function c_LegendHotSpot(){
	c_HotSpot.call(this);
	this.m__item=null;
}
c_LegendHotSpot.prototype=extend_class(c_HotSpot);
c_LegendHotSpot.m_new=function(t_item){
	c_HotSpot.m_new.call(this);
	this.m__item=t_item;
	return this;
}
c_LegendHotSpot.m_new2=function(){
	c_HotSpot.m_new.call(this);
	return this;
}
c_LegendHotSpot.prototype.p_onUp=function(t_cb,t_x,t_y){
	if(this.m__item.m__ds.m__switchedoff){
		this.m__item.m__ds.m__switchedoff=false;
	}else{
		this.m__item.m__ds.m__switchedoff=true;
	}
	return true;
}
function c_NumericFormater(){
	Object.call(this);
}
c_NumericFormater.m__intern_thous_sep=0;
c_NumericFormater.m__intern_dec_point=0;
c_NumericFormater.m_validPicture=function(t_pic){
	var t_picBuf=string_tochars(t_pic);
	var t_picLen=t_pic.length;
	var t_picch=0;
	var t_beforePoint=false;
	if(t_picLen>32){
		return false;
	}
	t_beforePoint=true;
	for(var t_i=0;t_i<t_picLen;t_i=t_i+1){
		t_picch=t_picBuf[t_i];
		if(t_beforePoint){
			if(t_picch==46 || t_picch==68){
				t_beforePoint=false;
			}else{
				if(t_picch!=35 && t_picch!=57 && t_picch!=39 && t_picch!=84){
					return false;
				}
			}
		}else{
			if(t_picch!=35 && t_picch!=57){
				return false;
			}
		}
	}
	return true;
}
c_NumericFormater.m_findPointIn=function(t_buf){
	for(var t_i=0;t_i<t_buf.length;t_i=t_i+1){
		if(t_buf[t_i]==68 || t_buf[t_i]==46){
			return t_i;
		}
	}
	return -1;
}
c_NumericFormater.m_convert=function(t_real,t_pic,t_thousSep,t_decPoint){
	if(c_NumericFormater.m_validPicture(t_pic)==false){
		return "<invalid picture>";
	}
	var t_i=0;
	var t_picBuf=string_tochars(t_pic);
	var t_picLen=t_pic.length;
	var t_picDecP=0;
	t_picDecP=c_NumericFormater.m_findPointIn(t_picBuf);
	if(t_picDecP==-1){
		t_picDecP=t_picLen;
	}
	var t_isNeg=false;
	if(t_real<0.0){
		t_isNeg=true;
		t_real=-t_real;
	}
	var t_maxVal=1.0;
	for(t_i=0;t_i<t_picLen;t_i=t_i+1){
		if(t_i==t_picDecP){
			break;
		}
		if(t_picBuf[t_i]==35 || t_picBuf[t_i]==57){
			t_maxVal=t_maxVal*10.0;
		}
	}
	t_maxVal=t_maxVal-1.0;
	if(t_real>t_maxVal){
		t_real=t_maxVal;
	}
	var t_frmStr="";
	var t_tmpStr="";
	var t_fragLen=bb_math_Min(8,bb_math_Max(0,t_picLen-t_picDecP-1));
	if(t_fragLen==0){
		t_real=bb_utils_round(t_real);
	}
	t_frmStr="%"+String(t_picLen)+"."+String(t_fragLen)+"f";
	t_tmpStr=c_StringFormatter.m_format(t_frmStr,String(t_real),"","","","","","","","","");
	var t_tmpBuf=string_tochars(t_tmpStr);
	var t_tmpLen=t_tmpStr.length;
	var t_tmpDecP=0;
	t_tmpDecP=c_NumericFormater.m_findPointIn(t_tmpBuf);
	if(t_tmpDecP==-1){
		t_tmpDecP=t_tmpLen;
	}
	var t_tmpB=new_number_array(64);
	var t_tmpBLen=0;
	var t_tmpA=new_number_array(10);
	var t_tmpALen=0;
	var t_ch=0;
	var t_picch=0;
	var t_p=0;
	t_i=t_tmpDecP-1;
	for(t_p=t_picDecP-1;t_p>=0;t_p=t_p+-1){
		if(t_i<0){
			break;
		}
		t_picch=t_picBuf[t_p];
		if(t_picch==35){
			t_ch=t_tmpBuf[t_i];
			t_i-=1;
			if(t_ch==48){
				t_ch=32;
			}
		}else{
			if(t_picch==57){
				t_ch=t_tmpBuf[t_i];
				t_i-=1;
				if(t_ch==32){
					t_ch=48;
				}
			}else{
				if(t_picch==84 || t_picch==39){
					t_ch=39;
				}
			}
		}
		t_tmpB[t_tmpBLen]=t_ch;
		t_tmpBLen+=1;
	}
	t_i=t_tmpDecP+1;
	for(t_p=t_picDecP+1;t_p<t_picLen;t_p=t_p+1){
		if(t_i>t_tmpLen){
			break;
		}
		t_picch=t_picBuf[t_p];
		if(t_picch==35){
			t_ch=t_tmpBuf[t_i];
			t_i+=1;
			if(t_ch==48){
				t_ch=32;
			}
		}else{
			if(t_picch==57){
				t_ch=t_tmpBuf[t_i];
				t_i+=1;
				if(t_ch==32){
					t_ch=48;
				}
			}
		}
		t_tmpA[t_tmpALen]=t_ch;
		t_tmpALen+=1;
	}
	var t_merge=new_number_array(64);
	var t_mergeLen=0;
	var t_needDecPoint=true;
	for(t_i=t_tmpBLen-1;t_i>=0;t_i=t_i+-1){
		t_ch=t_tmpB[t_i];
		if(t_ch==32){
			if(t_mergeLen>0){
				t_ch=48;
			}
		}
		if(t_ch==39){
			if(t_mergeLen>0){
				t_merge[t_mergeLen]=t_thousSep;
				t_mergeLen+=1;
			}
		}else{
			if(t_ch!=32){
				if(t_mergeLen==0 && t_isNeg){
					t_merge[t_mergeLen]=45;
					t_mergeLen+=1;
				}
				t_merge[t_mergeLen]=t_ch;
				t_mergeLen+=1;
			}
		}
	}
	if(t_tmpALen>0){
		for(t_i=0;t_i<t_tmpALen;t_i=t_i+1){
			t_ch=t_tmpA[t_i];
			if(t_ch>=48 && t_ch<=57){
				for(t_i=t_i-1;t_i>=0;t_i=t_i+-1){
					if(t_tmpA[t_i]==32){
						t_tmpA[t_i]=48;
					}
				}
				break;
			}
		}
		for(t_i=0;t_i<t_tmpALen;t_i=t_i+1){
			t_ch=t_tmpA[t_i];
			if(t_ch!=32){
				if(t_mergeLen==0){
					if(t_isNeg){
						t_merge[t_mergeLen]=45;
						t_mergeLen+=1;
					}
					t_merge[t_mergeLen]=48;
					t_mergeLen+=1;
				}
				if(t_needDecPoint){
					t_merge[t_mergeLen]=t_decPoint;
					t_mergeLen+=1;
					t_needDecPoint=false;
				}
				t_merge[t_mergeLen]=t_ch;
				t_mergeLen+=1;
			}
		}
	}
	return string_fromchars(t_merge.slice(0,t_mergeLen));
}
c_NumericFormater.m_convert2=function(t_real,t_pic){
	return c_NumericFormater.m_convert(t_real,t_pic,c_NumericFormater.m__intern_thous_sep,c_NumericFormater.m__intern_dec_point);
}
function c_StringFormatter(){
	Object.call(this);
}
c_StringFormatter.m_validFormat=function(t_chr){
	return t_chr=="d" || t_chr=="f" || t_chr=="s" || t_chr=="S" || t_chr=="c" || t_chr=="x" || t_chr=="X";
}
c_StringFormatter.m_format=function(t_fmt,t_arg1,t_arg2,t_arg3,t_arg4,t_arg5,t_arg6,t_arg7,t_arg8,t_arg9,t_arg10){
	var t_args=[t_arg1,t_arg2,t_arg3,t_arg4,t_arg5,t_arg6,t_arg7,t_arg8,t_arg9,t_arg10];
	var t_argcount=0;
	for(var t_i=0;t_i<t_args.length;t_i=t_i+1){
		if(t_args[t_i]==""){
			t_argcount=t_i;
			break;
		}
	}
	var t_rv="";
	var t_formatting=false;
	var t_escapingBackslash=false;
	var t_escapingPercent=false;
	var t_ptr=0;
	var t_argnum=0;
	while(t_ptr<t_fmt.length){
		var t_chr=t_fmt.charCodeAt(t_ptr);
		t_ptr+=1;
		if(t_escapingBackslash){
			t_rv=t_rv+String.fromCharCode(t_chr);
			t_escapingBackslash=false;
		}else{
			if(t_chr==92){
				t_escapingBackslash=true;
			}else{
				if(!t_formatting && t_chr==37){
					t_formatting=true;
					t_escapingPercent=true;
				}else{
					if(t_escapingPercent && t_chr==37){
						t_rv=t_rv+String.fromCharCode(t_chr);
						t_escapingPercent=false;
						t_formatting=false;
					}else{
						if(!t_formatting){
							t_rv=t_rv+String.fromCharCode(t_chr);
						}else{
							if(t_argnum>=t_argcount){
								throw c_LException.m_new.call(new c_LException,"Error: Didn't receive enough arguments in call to Format");
							}
							var t_fmtarg=String.fromCharCode(t_chr);
							var t_foundPeriod=false;
							var t_foundMinus=false;
							var t_foundPadding=false;
							var t_formatLengthStr="";
							var t_formatLength=0;
							var t_formatDPStr="";
							var t_formatDP=0;
							var t_formatType="";
							if(!c_StringFormatter.m_validFormat(String.fromCharCode(t_chr))){
								while(t_ptr<t_fmt.length){
									t_fmtarg=t_fmtarg+t_fmt.slice(t_ptr,t_ptr+1);
									t_ptr+=1;
									if(c_StringFormatter.m_validFormat(t_fmtarg.slice(t_fmtarg.length-1))){
										break;
									}
								}
							}
							t_formatType=t_fmtarg.slice(t_fmtarg.length-1);
							if(t_formatType==""){
								throw c_LException.m_new.call(new c_LException,"Error parsing format string!");
							}
							var t_fmtargptr=0;
							if(t_fmtarg.charCodeAt(0)==45){
								t_foundMinus=true;
								t_fmtargptr+=1;
							}else{
								if(t_fmtarg.charCodeAt(t_fmtargptr)==48){
									t_foundPadding=true;
									t_fmtargptr+=1;
								}
							}
							while(t_fmtargptr<t_fmtarg.length){
								if(c_StringFormatter.m_validFormat(String(t_fmtargptr))){
									break;
								}else{
									if(bb_utils_isDigit(t_fmtarg.charCodeAt(t_fmtargptr))){
										if(!t_foundPeriod){
											t_formatLengthStr=t_formatLengthStr+t_fmtarg.slice(t_fmtargptr,t_fmtargptr+1);
										}else{
											t_formatDPStr=t_formatDPStr+t_fmtarg.slice(t_fmtargptr,t_fmtargptr+1);
										}
									}else{
										if(t_fmtarg.charCodeAt(t_fmtargptr)==46){
											t_foundPeriod=true;
										}
									}
								}
								t_fmtargptr+=1;
							}
							t_formatting=false;
							if(t_formatLengthStr!=""){
								t_formatLength=parseInt((t_formatLengthStr),10);
							}
							if(t_formatDPStr!=""){
								t_formatDP=parseInt((t_formatDPStr),10);
							}
							if(t_formatType=="d"){
								var t_ds=String(parseInt((t_args[t_argnum]),10));
								while(t_ds.length<t_formatLength){
									if(t_foundPadding){
										t_ds="0"+t_ds;
									}else{
										if(t_foundMinus){
											t_ds=t_ds+" ";
										}else{
											t_ds=" "+t_ds;
										}
									}
								}
								t_rv=t_rv+t_ds;
							}else{
								if(t_formatType=="f"){
									var t_givenformatDP=t_formatDP;
									if(t_formatDP==0){
										t_formatDP=6;
									}
									var t_whole="";
									var t_part="";
									var t_df=parseFloat(t_args[t_argnum])*Math.pow(10.0,(t_formatDP));
									var t_ds2=String(bb_utils_round(t_df));
									var t_dp=t_ds2.indexOf(".",0);
									if(t_dp>0){
										t_ds2=t_ds2.slice(0,t_dp);
									}
									if(t_ds2.length>t_formatDP){
										t_whole=t_ds2.slice(0,t_ds2.length-t_formatDP);
										t_part=t_ds2.slice(t_ds2.length-t_formatDP);
									}else{
										t_whole="0";
										while(t_part.length<t_formatDP){
											t_part=t_part+"0";
										}
										t_part=t_part+t_ds2.slice(bb_math_Max(0,t_ds2.length-t_formatDP));
										t_part=t_part.slice(t_part.length-t_formatDP);
									}
									while(t_part.length>0 && t_part.length>t_givenformatDP){
										var t_c=t_part.charCodeAt(t_part.length-1);
										if(t_c==48){
											t_part=t_part.slice(0,t_part.length-1);
										}else{
											break;
										}
									}
									t_ds2=t_whole;
									if(t_part.length>0){
										t_ds2=t_ds2+("."+t_part);
									}
									while(t_ds2.length<t_formatLength){
										if(t_foundPadding){
											t_ds2="0"+t_ds2;
										}else{
											if(t_foundMinus){
												t_ds2=t_ds2+" ";
											}else{
												t_ds2=" "+t_ds2;
											}
										}
									}
									t_rv=t_rv+t_ds2;
								}else{
									if(t_formatType=="c"){
										if(t_foundPadding || t_foundMinus){
											throw c_LException.m_new.call(new c_LException,"Error parsing format string!");
										}
										t_rv=t_rv+String.fromCharCode(parseInt((t_args[t_argnum]),10));
									}else{
										if(t_formatType=="s" || t_formatType=="S"){
											if(t_foundPadding){
												throw c_LException.m_new.call(new c_LException,"Error parsing format string!");
											}
											var t_ds3=t_args[t_argnum];
											if(t_formatType=="S"){
												t_ds3=t_ds3.toUpperCase();
											}
											while(t_ds3.length<t_formatLength){
												if(t_foundMinus){
													t_ds3=t_ds3+" ";
												}else{
													t_ds3=" "+t_ds3;
												}
											}
											t_rv=t_rv+t_ds3;
										}else{
											if(t_formatType=="x" || t_formatType=="X"){
												var t_ds4=c_HexFormatter.m_toHex(parseInt((t_args[t_argnum]),10)).toLowerCase();
												if(t_formatType=="X"){
													t_ds4=t_ds4.toUpperCase();
												}
												while(t_ds4.length<t_formatLength){
													if(t_foundPadding){
														t_ds4="0"+t_ds4;
													}else{
														if(t_foundMinus){
															t_ds4=t_ds4+" ";
														}else{
															t_ds4=" "+t_ds4;
														}
													}
												}
												t_rv=t_rv+t_ds4;
											}
										}
									}
								}
							}
							t_argnum+=1;
						}
					}
				}
			}
		}
	}
	return t_rv;
}
function bb_utils_isDigit(t_ch){
	return t_ch>=48 && t_ch<=57;
}
function c_DynamicArray(){
	Object.call(this);
	this.m__len=0;
	this.m__sz=0;
	this.m__i=[];
}
c_DynamicArray.prototype.p_clear3=function(){
	this.m__len=0;
	this.m__sz=10;
	this.m__i=new_number_array(this.m__sz);
}
c_DynamicArray.m_new=function(){
	this.p_clear3();
	return this;
}
c_DynamicArray.prototype.p_add2=function(t_elt){
	this.m__len+=1;
	if(this.m__len>this.m__sz){
		this.m__sz=this.m__sz*2;
		this.m__i=resize_number_array(this.m__i,this.m__sz);
	}
	this.m__i[this.m__len-1]=t_elt;
}
c_DynamicArray.prototype.p_getIndex=function(t_elt){
	for(var t_i=0;t_i<this.m__len;t_i=t_i+1){
		if(this.m__i[t_i]==t_elt){
			return t_i;
		}
	}
	return -1;
}
c_DynamicArray.prototype.p_contains=function(t_elt){
	if(this.p_getIndex(t_elt)>-1){
		return true;
	}
	return false;
}
c_DynamicArray.prototype.p_length=function(){
	return this.m__len;
}
c_DynamicArray.prototype.p_compareItem2=function(t_e1,t_e2){
	error("Unable to compare items");
	return 0;
}
c_DynamicArray.prototype.p_qsort=function(t_min,t_max,t_ccsgn){
	var t_mid_value=0;
	var t_hi=0;
	var t_lo=0;
	var t_i=0;
	if(t_min>=t_max){
		return;
	}
	t_i=(((t_min+t_max)/2)|0);
	t_mid_value=this.m__i[t_i];
	this.m__i[t_i]=this.m__i[t_min];
	t_lo=t_min;
	t_hi=t_max;
	do{
		while(this.p_compareItem2(this.m__i[t_hi],t_mid_value)*t_ccsgn>=0){
			t_hi=t_hi-1;
			if(t_hi<=t_lo){
				break;
			}
		}
		if(t_hi<=t_lo){
			this.m__i[t_lo]=t_mid_value;
			break;
		}
		this.m__i[t_lo]=this.m__i[t_hi];
		t_lo=t_lo+1;
		while(this.p_compareItem2(this.m__i[t_lo],t_mid_value)*t_ccsgn<0){
			t_lo=t_lo+1;
			if(t_lo>=t_hi){
				break;
			}
		}
		if(t_lo>=t_hi){
			t_lo=t_hi;
			this.m__i[t_hi]=t_mid_value;
			break;
		}
		this.m__i[t_hi]=this.m__i[t_lo];
	}while(!(false));
	this.p_qsort(t_min,t_lo-1,t_ccsgn);
	this.p_qsort(t_lo+1,t_max,t_ccsgn);
}
c_DynamicArray.prototype.p_sortArray=function(t_ascending){
	var t_ccsgn=-1;
	if(t_ascending){
		t_ccsgn=1;
	}
	this.p_qsort(0,this.p_length()-1,t_ccsgn);
}
c_DynamicArray.prototype.p_get=function(t_i){
	var t_oNULL=0;
	if(t_i>=0 && t_i<this.m__len){
		return this.m__i[t_i];
	}
	return t_oNULL;
}
function c_DynamicFloatArray(){
	c_DynamicArray.call(this);
}
c_DynamicFloatArray.prototype=extend_class(c_DynamicArray);
c_DynamicFloatArray.m_new=function(){
	c_DynamicArray.m_new.call(this);
	return this;
}
c_DynamicFloatArray.prototype.p_compareItem2=function(t_e1,t_e2){
	if(t_e1>t_e2){
		return 1;
	}
	if(t_e1<t_e2){
		return -1;
	}
	return 0;
}
function c_GridLines(){
	Object.call(this);
}
function c_PlaneStacker(){
	Object.call(this);
	this.m__data=null;
	this.m__periods=[];
}
c_PlaneStacker.m_new=function(t_data){
	this.m__data=t_data;
	var t_iSlots=this.m__data.m__maxT-this.m__data.m__minT+1;
	this.m__periods=resize_object_array(this.m__periods,t_iSlots);
	for(var t_i=0;t_i<t_iSlots;t_i=t_i+1){
		this.m__periods[t_i]=c_PeriodInfo.m_new.call(new c_PeriodInfo);
	}
	return this;
}
c_PlaneStacker.m_new2=function(){
	return this;
}
c_PlaneStacker.prototype.p_getTimeSlot=function(t_iPeriod){
	if(t_iPeriod>this.m__data.m__maxT){
		var t_slot=this.m__periods.length-1;
		this.m__periods[t_slot].p_clear3();
		return t_slot;
	}
	return t_iPeriod-this.m__data.m__minT;
}
c_PlaneStacker.prototype.p_addValueStart=function(t_iPeriod,t_rValue,t_bInPosArea){
	var t_slot=this.p_getTimeSlot(t_iPeriod);
	if(t_rValue==0.0){
		if(t_bInPosArea){
			return this.m__periods[t_slot].m__posStart;
		}
		return this.m__periods[t_slot].m__negStart;
	}
	if(t_rValue>0.0){
		this.m__periods[t_slot].m__posStart+=t_rValue;
		return this.m__periods[t_slot].m__posStart;
	}
	this.m__periods[t_slot].m__negStart+=t_rValue;
	return this.m__periods[t_slot].m__negStart;
}
c_PlaneStacker.prototype.p_setNode=function(t_iPeriod){
	this.m__periods[this.p_getTimeSlot(t_iPeriod)].m__node=true;
}
c_PlaneStacker.prototype.p_addValueEnd=function(t_iPeriod,t_rValue,t_bInPosArea){
	var t_slot=this.p_getTimeSlot(t_iPeriod);
	if(t_rValue==0.0){
		if(t_bInPosArea){
			return this.m__periods[t_slot].m__posEnd;
		}
		return this.m__periods[t_slot].m__negEnd;
	}
	if(t_rValue>0.0){
		this.m__periods[t_slot].m__posEnd+=t_rValue;
		return this.m__periods[t_slot].m__posEnd;
	}
	this.m__periods[t_slot].m__negEnd+=t_rValue;
	return this.m__periods[t_slot].m__negEnd;
}
c_PlaneStacker.prototype.p_isNode=function(t_iPeriod){
	return this.m__periods[this.p_getTimeSlot(t_iPeriod)].m__node;
}
function c_PeriodInfo(){
	Object.call(this);
	this.m__node=false;
	this.m__posStart=.0;
	this.m__posEnd=.0;
	this.m__negStart=.0;
	this.m__negEnd=.0;
}
c_PeriodInfo.prototype.p_clear3=function(){
	this.m__node=false;
	this.m__posStart=0.0;
	this.m__posEnd=0.0;
	this.m__negStart=0.0;
	this.m__negEnd=0.0;
}
c_PeriodInfo.m_new=function(){
	this.p_clear3();
	return this;
}
function c_GeneralPath(){
	Object.call(this);
	this.m__curpathset=null;
	this.m__pathsets=c_Collection.m_new.call(new c_Collection);
}
c_GeneralPath.m_new=function(){
	return this;
}
c_GeneralPath.prototype.p_getCurrentPath=function(){
	if(this.m__curpathset==null){
		this.m__curpathset=c_PathSet.m_new.call(new c_PathSet);
		this.m__pathsets.p_add(this.m__curpathset);
	}
	return this.m__curpathset;
}
c_GeneralPath.prototype.p_moveTo2=function(t_p){
	this.p_getCurrentPath().p_add3(0,t_p);
}
c_GeneralPath.prototype.p_moveTo=function(t_x,t_y){
	this.p_moveTo2(c_Point.m_new2.call(new c_Point,t_x,t_y));
}
c_GeneralPath.prototype.p_lineTo3=function(t_p,t_curved){
	var t_lastItem=this.p_getCurrentPath().p_getLast();
	if(t_lastItem!=null){
		if(t_lastItem.m__pt.m__x==t_p.m__x && t_lastItem.m__pt.m__y==t_p.m__y){
			return;
		}
	}
	if(t_curved){
		this.p_getCurrentPath().p_add3(2,t_p);
	}else{
		this.p_getCurrentPath().p_add3(1,t_p);
	}
}
c_GeneralPath.prototype.p_lineTo4=function(t_x,t_y,t_curved){
	this.p_lineTo3(c_Point.m_new2.call(new c_Point,t_x,t_y),t_curved);
}
c_GeneralPath.prototype.p_draw3=function(t_g,t_filled){
	if(t_filled){
		var t_=this.m__pathsets.p_ObjectEnumerator();
		while(t_.p_HasNext()){
			var t_o=t_.p_NextObject();
			var t_p=object_downcast((t_o),c_PathSet);
			t_p.p_draw3(t_g,true);
		}
	}else{
		t_g.p_beginPath();
		var t_2=this.m__pathsets.p_ObjectEnumerator();
		while(t_2.p_HasNext()){
			var t_o2=t_2.p_NextObject();
			var t_p2=object_downcast((t_o2),c_PathSet);
			t_p2.p_draw3(t_g,false);
		}
		t_g.p_strokePath(false);
		t_g.p_closePath();
	}
}
c_GeneralPath.prototype.p_addLineSegment=function(t_x1,t_y1,t_x2,t_y2,t_curved){
	var t_lastItem=this.p_getCurrentPath().p_getLast();
	if(t_lastItem==null){
		this.p_moveTo(t_x1,t_y1);
	}else{
		if(t_lastItem.m__pt.m__y!=t_y1){
			this.p_lineTo4(t_x1,t_y1,t_curved);
		}
	}
	this.p_lineTo4(t_x2,t_y2,t_curved);
}
c_GeneralPath.prototype.p_closePath=function(){
	this.m__curpathset=null;
}
function c_PathSet(){
	Object.call(this);
	this.m__items=c_Collection.m_new.call(new c_Collection);
}
c_PathSet.m_new=function(){
	return this;
}
c_PathSet.prototype.p_add3=function(t_t,t_pt){
	this.m__items.p_add(c_PathItem.m_new.call(new c_PathItem,t_t,t_pt));
}
c_PathSet.prototype.p_getLast=function(){
	if(this.m__items.p_length()>0){
		var t_last=object_downcast((this.m__items.p_getObject(this.m__items.p_length()-1)),c_PathItem);
		return t_last;
	}
	return null;
}
c_PathSet.prototype.p_getPolyPoints=function(){
	var t_i=0;
	var t_verts=[];
	t_verts=resize_number_array(t_verts,this.m__items.p_length()*2);
	var t_=this.m__items.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		var t_item=object_downcast((t_o),c_PathItem);
		t_verts[t_i]=t_item.m__pt.m__x;
		t_verts[t_i+1]=t_item.m__pt.m__y;
		t_i+=2;
	}
	return t_verts;
}
c_PathSet.prototype.p_draw3=function(t_g,t_filled){
	if(t_filled){
		t_g.p_drawPoly(this.p_getPolyPoints(),t_filled);
	}else{
		var t_lastPt=null;
		var t_=this.m__items.p_ObjectEnumerator();
		while(t_.p_HasNext()){
			var t_o=t_.p_NextObject();
			var t_item=object_downcast((t_o),c_PathItem);
			var t_1=t_item.m__t;
			if(t_1==0){
				t_g.p_moveTo2(t_item.m__pt);
				t_lastPt=t_item.m__pt;
			}else{
				if(t_1==1){
					if(t_lastPt!=null){
						t_g.p_lineTo2(t_item.m__pt);
					}
					t_lastPt=t_item.m__pt;
				}else{
					if(t_1==2){
						if(t_lastPt!=null){
							var t_ctrlP=t_lastPt.p_clone();
							t_ctrlP.m__x+=(t_item.m__pt.m__x-t_lastPt.m__x)/3.0*2.0;
							t_g.p_curveTo2(t_ctrlP,t_item.m__pt);
						}
						t_lastPt=t_item.m__pt;
					}
				}
			}
		}
	}
}
function c_PathItem(){
	Object.call(this);
	this.m__t=0;
	this.m__pt=null;
}
c_PathItem.m_new=function(t_t,t_pt){
	this.m__t=t_t;
	this.m__pt=t_pt.p_clone();
	return this;
}
c_PathItem.m_new2=function(){
	return this;
}
function c_Plane(){
	Object.call(this);
	this.m__paths=null;
	this.m__color=null;
}
c_Plane.m_new=function(t_shape,t_color){
	this.m__paths=t_shape;
	this.m__color=t_color;
	return this;
}
c_Plane.m_new2=function(){
	return this;
}
c_Plane.prototype.p_draw3=function(t_g,t_filled){
	this.m__paths.p_draw3(t_g,t_filled);
}
function c_LineType(){
	Object.call(this);
}
function c_GraphicHotSpot(){
	c_HotSpot.call(this);
	this.m__data=null;
	this.m__grapharea=null;
	this.m__xScaleFactor=.0;
	this.m__dragging=false;
	this.m__panelstored=false;
	this.m__paneldata=[];
	this.m__panelrect=null;
	this.m__linestored=false;
	this.m__linedata=[];
	this.m__linerect=null;
	this.m__linewidth=3.0;
	this.m__linecolor=c_Color.m_new4.call(new c_Color,0,0,0,0.5);
	this.m__inspectpanel=null;
}
c_GraphicHotSpot.prototype=extend_class(c_HotSpot);
c_GraphicHotSpot.m_new=function(t_d){
	c_HotSpot.m_new.call(this);
	this.m__data=t_d;
	return this;
}
c_GraphicHotSpot.m_new2=function(){
	c_HotSpot.m_new.call(this);
	return this;
}
c_GraphicHotSpot.prototype.p_restoreGraph=function(t_cb){
	t_cb.m__g.p_beginRender(false);
	if(this.m__panelstored){
		t_cb.m__g.p_writePixels2(this.m__paneldata,this.m__panelrect);
		this.m__paneldata=resize_number_array(this.m__paneldata,0);
	}
	this.m__panelstored=false;
	if(this.m__linestored){
		t_cb.m__g.p_writePixels2(this.m__linedata,this.m__linerect);
		this.m__linedata=resize_number_array(this.m__linedata,0);
	}
	this.m__linestored=false;
	t_cb.m__g.p_endRender();
	return 0;
}
c_GraphicHotSpot.prototype.p_storeLine=function(t_cb,t_x,t_y,t_w,t_h){
	this.m__linestored=true;
	this.m__linerect=c_Rectangle.m_new.call(new c_Rectangle,t_x-1.0,t_y-1.0,t_w+2.0,t_h+2.0);
	t_cb.m__g.p_readPixels2(this.m__linedata,this.m__linerect);
	return 0;
}
c_GraphicHotSpot.prototype.p_drawLine3=function(t_cb,t_tx){
	var t_y=this.m__bounds.m__y;
	var t_h=this.m__bounds.m__h;
	t_tx-=this.m__linewidth/2.0;
	t_tx=bb_math_Max2(t_tx,this.m__bounds.m__x);
	t_tx=bb_math_Min2(t_tx,this.m__bounds.m__x+this.m__bounds.m__w-this.m__linewidth);
	this.p_storeLine(t_cb,t_tx,t_y,this.m__linewidth,t_h);
	t_cb.m__g.p_setLineWidth(this.m__linewidth);
	t_cb.m__g.p_setColor(this.m__linecolor);
	t_cb.m__g.p_drawLine(t_tx,t_y,t_tx,t_y+t_h);
	return 0;
}
c_GraphicHotSpot.prototype.p_getPeriodAt=function(t_x){
	var t_period=0;
	if(this.m__xScaleFactor>0.0){
		t_period=(((t_x-this.m__bounds.m__x)/this.m__xScaleFactor+(this.m__data.m__minT))|0);
	}
	t_period=bb_math_Max(this.m__data.m__minT,t_period);
	t_period=bb_math_Min(this.m__data.m__maxT-1,t_period);
	return t_period;
}
c_GraphicHotSpot.prototype.p_scaleX=function(t_value){
	return this.m__bounds.m__x+(t_value-(this.m__data.m__minT))*this.m__xScaleFactor;
}
c_GraphicHotSpot.prototype.p_storePanel=function(t_cb,t_r){
	this.m__panelstored=true;
	this.m__panelrect=c_Rectangle.m_new.call(new c_Rectangle,t_r.m__x-1.0,t_r.m__y-1.0,t_r.m__w+2.0,t_r.m__h+2.0);
	t_cb.m__g.p_readPixels2(this.m__paneldata,this.m__panelrect);
	return 0;
}
c_GraphicHotSpot.prototype.p_drawPanel=function(t_cb,t_tx,t_ty){
	this.m__inspectpanel=c_InspectPanel.m_new.call(new c_InspectPanel,this,t_tx);
	this.m__inspectpanel.p_calculateDimension3(t_cb.m__g);
	this.m__inspectpanel.p_calculatePosition(this.m__grapharea,t_tx,t_ty);
	this.p_storePanel(t_cb,this.m__inspectpanel.m__bounds);
	this.m__inspectpanel.p_draw2(t_cb.m__g);
	return 0;
}
c_GraphicHotSpot.prototype.p_showInfo=function(t_cb,t_x,t_y){
	var t_tx=.0;
	var t_ty=.0;
	this.p_restoreGraph(t_cb);
	t_tx=bb_math_Max2(t_x,this.m__bounds.m__x);
	t_tx=bb_math_Min2(t_tx,this.m__bounds.m__x+this.m__bounds.m__w);
	t_ty=bb_math_Max2(t_y,this.m__bounds.m__y);
	t_ty=bb_math_Min2(t_ty,this.m__bounds.m__y+this.m__bounds.m__h);
	t_cb.m__g.p_beginRender(false);
	this.p_drawLine3(t_cb,t_tx);
	this.p_drawPanel(t_cb,t_tx,t_ty);
	t_cb.m__g.p_endRender();
	return 0;
}
c_GraphicHotSpot.prototype.p_onDown=function(t_cb,t_x,t_y){
	this.m__dragging=true;
	this.p_showInfo(object_downcast((t_cb),c_GraphEventCallback),t_x,t_y);
	return false;
}
c_GraphicHotSpot.prototype.p_onUp=function(t_cb,t_x,t_y){
	this.m__dragging=false;
	this.p_restoreGraph(object_downcast((t_cb),c_GraphEventCallback));
	this.m__inspectpanel=null;
	return false;
}
c_GraphicHotSpot.prototype.p_onMove=function(t_cb,t_x,t_y){
	if(this.m__dragging){
		this.p_showInfo(object_downcast((t_cb),c_GraphEventCallback),t_x,t_y);
	}
	return false;
}
function c_PieElement(){
	Object.call(this);
	this.m__set=null;
	this.m__color=null;
	this.m__idx=0;
	this.m__value=.0;
	this.m__pulledout=false;
	this.m__arc=.0;
	this.m__startarc=.0;
	this.m__endarc=.0;
	this.m__devstartarc=.0;
	this.m__devendarc=.0;
	this.m__middlearc=.0;
	this.m__devmiddlearc_cos_x=.0;
	this.m__devmiddlearc_sin_y=.0;
	this.m__pulled_x=.0;
	this.m__pulled_y=.0;
	this.m__ti=null;
}
c_PieElement.m_new=function(){
	return this;
}
c_PieElement.prototype.p__middlearc_quatrant=function(){
	if(this.m__middlearc>=0.0 && this.m__middlearc<90.0){
		return 1;
	}
	if(this.m__middlearc>=90.0 && this.m__middlearc<180.0){
		return 2;
	}
	if(this.m__middlearc>=180.0 && this.m__middlearc<270.0){
		return 3;
	}
	return 4;
}
function c_PieCollection(){
	c_Collection.call(this);
	this.m__sort=0;
}
c_PieCollection.prototype=extend_class(c_Collection);
c_PieCollection.m_new=function(){
	c_Collection.m_new.call(this);
	return this;
}
c_PieCollection.prototype.p_compareItem=function(t_e1,t_e2){
	var t_pe1=object_downcast((t_e1),c_PieElement);
	var t_pe2=object_downcast((t_e2),c_PieElement);
	var t_1=this.m__sort;
	if(t_1==1){
		if(t_pe1.m__value>t_pe2.m__value){
			return -1;
		}
		if(t_pe1.m__value<t_pe2.m__value){
			return 1;
		}
	}else{
		if(t_1==2){
			if(t_pe1.m__value>t_pe2.m__value){
				return 1;
			}
			if(t_pe1.m__value<t_pe2.m__value){
				return -1;
			}
		}else{
			if(t_1==3){
				if(t_pe1.m__idx>t_pe2.m__idx){
					return -1;
				}
				if(t_pe1.m__idx<t_pe2.m__idx){
					return 1;
				}
			}else{
				if(t_pe1.m__idx>t_pe2.m__idx){
					return 1;
				}
				if(t_pe1.m__idx<t_pe2.m__idx){
					return -1;
				}
			}
		}
	}
	return 0;
}
function c_ColorHLS(){
	Object.call(this);
	this.m__h=0;
	this.m__l=0;
	this.m__s=0;
}
c_ColorHLS.m_new=function(){
	return this;
}
c_ColorHLS.prototype.p_setColor4=function(t_R,t_G,t_B){
	var t_r2=(t_R)/255.0;
	var t_g2=(t_G)/255.0;
	var t_b2=(t_B)/255.0;
	var t_h=.0;
	var t_l=.0;
	var t_s=.0;
	var t_max=bb_math_Max2(bb_math_Max2(t_r2,t_g2),t_b2);
	var t_min=bb_math_Min2(bb_math_Min2(t_r2,t_g2),t_b2);
	t_l=(t_max+t_min)/2.0;
	if(t_max==t_min){
		t_h=0.0;
		t_s=0.0;
	}else{
		var t_d=t_max-t_min;
		if(t_l>0.5){
			t_s=t_d/(2.0-t_max-t_min);
		}else{
			t_s=t_d/(t_max+t_min);
		}
		if(t_max==t_r2){
			if(t_g2<t_b2){
				t_h=(t_g2-t_b2)/t_d+6.0;
			}else{
				t_h=(t_g2-t_b2)/t_d;
			}
		}else{
			if(t_max==t_g2){
				t_h=(t_b2-t_r2)/t_d+2.0;
			}else{
				if(t_max==t_b2){
					t_h=(t_r2-t_g2)/t_d+4.0;
				}
			}
		}
		t_h=t_h/6.0;
	}
	this.m__h=((bb_utils_round(t_h*255.0))|0);
	this.m__l=((bb_utils_round(t_l*255.0))|0);
	this.m__s=((bb_utils_round(t_s*255.0))|0);
}
c_ColorHLS.prototype.p_setColor=function(t_c){
	this.p_setColor4(t_c.m__r,t_c.m__g,t_c.m__b);
}
function c_EventType(){
	Object.call(this);
}
function c_MouseButton(){
	Object.call(this);
}
function bb_utils_trunc(t_x){
	var t_f=bb_math_Abs2(bb_utils_round2(t_x,0.00000001));
	return Math.floor(t_f)*bb_math_Sgn2(t_x);
}
function bb_utils_trunc2(t_x,t_factor){
	if(bb_utils_isZero(t_factor,8)){
		return t_x;
	}
	var t_f=bb_math_Abs2(bb_utils_round2(t_x,0.00000001));
	return Math.floor(t_f/t_factor)*t_factor*bb_math_Sgn2(t_x);
}
function c_EMFSetWindowOrgRecord(){
	c_EMFBinaryRecord.call(this);
	this.m__x=0;
	this.m__y=0;
}
c_EMFSetWindowOrgRecord.prototype=extend_class(c_EMFBinaryRecord);
c_EMFSetWindowOrgRecord.m_new=function(){
	c_EMFBinaryRecord.m_new.call(this,10,2);
	return this;
}
c_EMFSetWindowOrgRecord.prototype.p_write=function(t_w){
	c_EMFBinaryRecord.prototype.p_write.call(this,t_w);
	t_w.p_wI4(this.m__x);
	t_w.p_wI4(this.m__y);
}
c_EMFSetWindowOrgRecord.prototype.p_userfriendlyType=function(){
	return "setwindoworg";
}
c_EMFSetWindowOrgRecord.prototype.p_ToString=function(){
	var t_s="";
	t_s=c_EMFBinaryRecord.prototype.p_ToString.call(this);
	t_s=t_s+("pos="+String(this.m__x)+"/"+String(this.m__y));
	return t_s;
}
function c_EMFSetMapModeRecord(){
	c_EMFBinaryRecord.call(this);
	this.m__mode=0;
}
c_EMFSetMapModeRecord.prototype=extend_class(c_EMFBinaryRecord);
c_EMFSetMapModeRecord.m_new=function(){
	c_EMFBinaryRecord.m_new.call(this,17,1);
	this.m__mode=1;
	return this;
}
c_EMFSetMapModeRecord.prototype.p_write=function(t_w){
	c_EMFBinaryRecord.prototype.p_write.call(this,t_w);
	t_w.p_wI4(this.m__mode);
}
c_EMFSetMapModeRecord.prototype.p_userfriendlyType=function(){
	return "setmapmode";
}
c_EMFSetMapModeRecord.prototype.p_ToString=function(){
	var t_s="";
	t_s=c_EMFBinaryRecord.prototype.p_ToString.call(this);
	t_s=t_s+("mode="+String(this.m__mode));
	return t_s;
}
function c_EMFSetBkModeRecord(){
	c_EMFBinaryRecord.call(this);
	this.m__mode=0;
}
c_EMFSetBkModeRecord.prototype=extend_class(c_EMFBinaryRecord);
c_EMFSetBkModeRecord.m_new=function(){
	c_EMFBinaryRecord.m_new.call(this,18,1);
	this.m__mode=2;
	return this;
}
c_EMFSetBkModeRecord.prototype.p_setTransparent=function(){
	this.m__mode=1;
}
c_EMFSetBkModeRecord.prototype.p_write=function(t_w){
	c_EMFBinaryRecord.prototype.p_write.call(this,t_w);
	t_w.p_wI4(this.m__mode);
}
c_EMFSetBkModeRecord.prototype.p_userfriendlyType=function(){
	return "setbkmode";
}
c_EMFSetBkModeRecord.prototype.p_ToString=function(){
	var t_s="";
	t_s=c_EMFBinaryRecord.prototype.p_ToString.call(this);
	t_s=t_s+("mode="+String(this.m__mode));
	return t_s;
}
function c_EMFSetWindowExtRecord(){
	c_EMFBinaryRecord.call(this);
	this.m__w=0;
	this.m__h=0;
}
c_EMFSetWindowExtRecord.prototype=extend_class(c_EMFBinaryRecord);
c_EMFSetWindowExtRecord.m_new=function(){
	c_EMFBinaryRecord.m_new.call(this,9,2);
	return this;
}
c_EMFSetWindowExtRecord.prototype.p_write=function(t_w){
	c_EMFBinaryRecord.prototype.p_write.call(this,t_w);
	t_w.p_wI4(this.m__h);
	t_w.p_wI4(this.m__h);
}
c_EMFSetWindowExtRecord.prototype.p_userfriendlyType=function(){
	return "setwindowext";
}
c_EMFSetWindowExtRecord.prototype.p_ToString=function(){
	var t_s="";
	t_s=c_EMFBinaryRecord.prototype.p_ToString.call(this);
	t_s=t_s+("dim="+String(this.m__w)+"/"+String(this.m__h));
	return t_s;
}
function c_EMFCreateBrushIndirectRecord(){
	c_EMFBinaryRecord.call(this);
	this.m__col=null;
	this.m__style=0;
	this.m__hatch=0;
	this.m__intindex=0;
}
c_EMFCreateBrushIndirectRecord.prototype=extend_class(c_EMFBinaryRecord);
c_EMFCreateBrushIndirectRecord.m_new=function(){
	c_EMFBinaryRecord.m_new.call(this,39,4);
	return this;
}
c_EMFCreateBrushIndirectRecord.prototype.p_write=function(t_w){
	c_EMFBinaryRecord.prototype.p_write.call(this,t_w);
	t_w.p_wI4(this.m__intindex+1);
	t_w.p_wI4(this.m__style);
	t_w.p_wI1(this.m__col.m__r);
	t_w.p_wI1(this.m__col.m__g);
	t_w.p_wI1(this.m__col.m__b);
	t_w.p_wI1(0);
	t_w.p_wI4(this.m__hatch);
}
c_EMFCreateBrushIndirectRecord.prototype.p_userfriendlyType=function(){
	return "createbrush";
}
c_EMFCreateBrushIndirectRecord.prototype.p_ToString=function(){
	var t_s="";
	t_s=c_EMFBinaryRecord.prototype.p_ToString.call(this);
	t_s=t_s+("intindex="+String(this.m__intindex));
	t_s=t_s+("  style="+String(this.m__style));
	t_s=t_s+("  color="+this.m__col.p_ToString());
	t_s=t_s+("  hatch="+String(this.m__hatch));
	return t_s;
}
function c_EMFSelectObjectRecord(){
	c_EMFSelectObjectIndexRecord.call(this);
}
c_EMFSelectObjectRecord.prototype=extend_class(c_EMFSelectObjectIndexRecord);
c_EMFSelectObjectRecord.m_new=function(){
	c_EMFSelectObjectIndexRecord.m_new.call(this,37);
	return this;
}
c_EMFSelectObjectRecord.prototype.p_userfriendlyType=function(){
	return "selectobject";
}
function c_EMFCreatePenIndirectRecord(){
	c_EMFBinaryRecord.call(this);
	this.m__col=null;
	this.m__style=0;
	this.m__width=0;
	this.m__intindex=0;
}
c_EMFCreatePenIndirectRecord.prototype=extend_class(c_EMFBinaryRecord);
c_EMFCreatePenIndirectRecord.m_new=function(){
	c_EMFBinaryRecord.m_new.call(this,38,5);
	return this;
}
c_EMFCreatePenIndirectRecord.prototype.p_write=function(t_w){
	c_EMFBinaryRecord.prototype.p_write.call(this,t_w);
	t_w.p_wI4(this.m__intindex+1);
	t_w.p_wI4(this.m__style);
	t_w.p_wI4(this.m__width);
	t_w.p_wI4(0);
	t_w.p_wI1(this.m__col.m__r);
	t_w.p_wI1(this.m__col.m__g);
	t_w.p_wI1(this.m__col.m__b);
	t_w.p_wI1(0);
}
c_EMFCreatePenIndirectRecord.prototype.p_userfriendlyType=function(){
	return "createpen";
}
c_EMFCreatePenIndirectRecord.prototype.p_ToString=function(){
	var t_s="";
	t_s=c_EMFBinaryRecord.prototype.p_ToString.call(this);
	t_s=t_s+("intindex="+String(this.m__intindex));
	t_s=t_s+("  style="+String(this.m__style));
	t_s=t_s+("  color="+this.m__col.p_ToString());
	t_s=t_s+("  width:"+String(this.m__width));
	return t_s;
}
function c_EMFRectangleRecord(){
	c_EMFBinaryRecord.call(this);
	this.m__rect=null;
}
c_EMFRectangleRecord.prototype=extend_class(c_EMFBinaryRecord);
c_EMFRectangleRecord.m_new=function(){
	c_EMFBinaryRecord.m_new.call(this,43,4);
	return this;
}
c_EMFRectangleRecord.prototype.p_write=function(t_w){
	c_EMFBinaryRecord.prototype.p_write.call(this,t_w);
	t_w.p_wI4((this.m__rect.m__x)|0);
	t_w.p_wI4((this.m__rect.m__y)|0);
	t_w.p_wI4((this.m__rect.m__x+this.m__rect.m__w)|0);
	t_w.p_wI4((this.m__rect.m__y+this.m__rect.m__h)|0);
}
c_EMFRectangleRecord.prototype.p_userfriendlyType=function(){
	return "rectangle";
}
c_EMFRectangleRecord.prototype.p_ToString=function(){
	var t_s="";
	t_s=c_EMFBinaryRecord.prototype.p_ToString.call(this);
	t_s=t_s+("rect="+String((this.m__rect.m__x)|0)+"/"+String((this.m__rect.m__y)|0)+"/"+String((this.m__rect.m__w)|0)+"/"+String((this.m__rect.m__h)|0));
	return t_s;
}
function c_EMFMoveToRecord(){
	c_EMFBinaryRecord.call(this);
	this.m__x=0;
	this.m__y=0;
}
c_EMFMoveToRecord.prototype=extend_class(c_EMFBinaryRecord);
c_EMFMoveToRecord.m_new=function(){
	c_EMFBinaryRecord.m_new.call(this,27,2);
	return this;
}
c_EMFMoveToRecord.prototype.p_write=function(t_w){
	c_EMFBinaryRecord.prototype.p_write.call(this,t_w);
	t_w.p_wI4(this.m__x);
	t_w.p_wI4(this.m__y);
}
c_EMFMoveToRecord.prototype.p_userfriendlyType=function(){
	return "moveto";
}
c_EMFMoveToRecord.prototype.p_ToString=function(){
	var t_s="";
	t_s=c_EMFBinaryRecord.prototype.p_ToString.call(this);
	t_s=t_s+("pos="+String(this.m__x)+"/"+String(this.m__y));
	return t_s;
}
function c_EMFLineToRecord(){
	c_EMFBinaryRecord.call(this);
	this.m__x=0;
	this.m__y=0;
}
c_EMFLineToRecord.prototype=extend_class(c_EMFBinaryRecord);
c_EMFLineToRecord.m_new=function(){
	c_EMFBinaryRecord.m_new.call(this,54,2);
	return this;
}
c_EMFLineToRecord.prototype.p_write=function(t_w){
	c_EMFBinaryRecord.prototype.p_write.call(this,t_w);
	t_w.p_wI4(this.m__x);
	t_w.p_wI4(this.m__y);
}
c_EMFLineToRecord.prototype.p_userfriendlyType=function(){
	return "lineto";
}
c_EMFLineToRecord.prototype.p_ToString=function(){
	var t_s="";
	t_s=c_EMFBinaryRecord.prototype.p_ToString.call(this);
	t_s=t_s+("pos="+String(this.m__x)+"/"+String(this.m__y));
	return t_s;
}
function c_EMFPolyBaseRecord(){
	c_EMFBinaryRecord.call(this);
	this.m__points=[];
}
c_EMFPolyBaseRecord.prototype=extend_class(c_EMFBinaryRecord);
c_EMFPolyBaseRecord.m_new=function(t_t){
	c_EMFBinaryRecord.m_new.call(this,t_t,0);
	return this;
}
c_EMFPolyBaseRecord.m_new2=function(){
	c_EMFBinaryRecord.m_new2.call(this);
	return this;
}
c_EMFPolyBaseRecord.prototype.p_getBounds=function(){
	var t_rect=c_Rectangle.m_new2.call(new c_Rectangle);
	var t_x=.0;
	var t_y=.0;
	t_x=(this.m__points[0]);
	t_y=(this.m__points[1]);
	t_rect.m__x=t_x;
	t_rect.m__y=t_y;
	t_rect.m__w=1.0;
	t_rect.m__h=1.0;
	for(var t_i=2;t_i<this.m__points.length;t_i=t_i+2){
		t_x=(this.m__points[t_i]);
		t_y=(this.m__points[t_i+1]);
		t_rect.m__x=bb_math_Min2(t_x,t_rect.m__x);
		t_rect.m__y=bb_math_Min2(t_y,t_rect.m__y);
		t_rect.m__w=bb_math_Max2(t_x+1.0,t_rect.m__x+t_rect.m__w)-t_rect.m__x;
		t_rect.m__h=bb_math_Max2(t_y+1.0,t_rect.m__y+t_rect.m__h)-t_rect.m__y;
	}
	return t_rect;
}
c_EMFPolyBaseRecord.prototype.p_write=function(t_w){
	this.m__size=28+this.m__points.length*4;
	c_EMFBinaryRecord.prototype.p_write.call(this,t_w);
	var t_rect=this.p_getBounds();
	t_w.p_wI4((t_rect.m__x)|0);
	t_w.p_wI4((t_rect.m__y)|0);
	t_w.p_wI4((t_rect.m__x+t_rect.m__w)|0);
	t_w.p_wI4((t_rect.m__y+t_rect.m__h)|0);
	t_w.p_wI4((this.m__points.length/2)|0);
	for(var t_i=0;t_i<this.m__points.length;t_i=t_i+1){
		t_w.p_wI4(this.m__points[t_i]);
	}
}
c_EMFPolyBaseRecord.prototype.p_ToString=function(){
	var t_s="";
	t_s=c_EMFBinaryRecord.prototype.p_ToString.call(this);
	var t_rect=this.p_getBounds();
	t_s=t_s+("rect="+String((t_rect.m__x)|0)+"/"+String((t_rect.m__y)|0)+"/"+String((t_rect.m__w)|0)+"/"+String((t_rect.m__h)|0)+"  ");
	t_s=t_s+("points="+String((this.m__points.length/2)|0));
	for(var t_i=0;t_i<this.m__points.length;t_i=t_i+2){
		t_s=t_s+(" ["+String(this.m__points[t_i])+"/"+String(this.m__points[t_i+1])+"]");
	}
	return t_s;
}
function c_EMFPolygonRecord(){
	c_EMFPolyBaseRecord.call(this);
}
c_EMFPolygonRecord.prototype=extend_class(c_EMFPolyBaseRecord);
c_EMFPolygonRecord.m_new=function(){
	c_EMFPolyBaseRecord.m_new.call(this,3);
	return this;
}
c_EMFPolygonRecord.prototype.p_userfriendlyType=function(){
	return "polygon";
}
function c_EMFPolylineRecord(){
	c_EMFPolyBaseRecord.call(this);
}
c_EMFPolylineRecord.prototype=extend_class(c_EMFPolyBaseRecord);
c_EMFPolylineRecord.m_new=function(){
	c_EMFPolyBaseRecord.m_new.call(this,4);
	return this;
}
c_EMFPolylineRecord.prototype.p_userfriendlyType=function(){
	return "polyline";
}
function c_EMFBeginPathRecord(){
	c_EMFBinaryRecord.call(this);
}
c_EMFBeginPathRecord.prototype=extend_class(c_EMFBinaryRecord);
c_EMFBeginPathRecord.m_new=function(){
	c_EMFBinaryRecord.m_new.call(this,59,0);
	return this;
}
c_EMFBeginPathRecord.prototype.p_write=function(t_w){
	c_EMFBinaryRecord.prototype.p_write.call(this,t_w);
}
c_EMFBeginPathRecord.prototype.p_userfriendlyType=function(){
	return "beginpath";
}
c_EMFBeginPathRecord.prototype.p_ToString=function(){
	var t_s="";
	t_s=c_EMFBinaryRecord.prototype.p_ToString.call(this);
	return t_s;
}
function c_EMFEndPathRecord(){
	c_EMFBinaryRecord.call(this);
}
c_EMFEndPathRecord.prototype=extend_class(c_EMFBinaryRecord);
c_EMFEndPathRecord.m_new=function(){
	c_EMFBinaryRecord.m_new.call(this,60,0);
	return this;
}
c_EMFEndPathRecord.prototype.p_write=function(t_w){
	c_EMFBinaryRecord.prototype.p_write.call(this,t_w);
}
c_EMFEndPathRecord.prototype.p_userfriendlyType=function(){
	return "endpath";
}
c_EMFEndPathRecord.prototype.p_ToString=function(){
	var t_s="";
	t_s=c_EMFBinaryRecord.prototype.p_ToString.call(this);
	return t_s;
}
function c_EMFFillPathRecord(){
	c_EMFBinaryRecord.call(this);
}
c_EMFFillPathRecord.prototype=extend_class(c_EMFBinaryRecord);
c_EMFFillPathRecord.m_new=function(){
	c_EMFBinaryRecord.m_new.call(this,62,4);
	return this;
}
c_EMFFillPathRecord.prototype.p_write=function(t_w){
	c_EMFBinaryRecord.prototype.p_write.call(this,t_w);
	t_w.p_wRect(null);
}
c_EMFFillPathRecord.prototype.p_userfriendlyType=function(){
	return "fillpath";
}
c_EMFFillPathRecord.prototype.p_ToString=function(){
	var t_s="";
	t_s=c_EMFBinaryRecord.prototype.p_ToString.call(this);
	return t_s;
}
function c_EMFStrokePathRecord(){
	c_EMFBinaryRecord.call(this);
}
c_EMFStrokePathRecord.prototype=extend_class(c_EMFBinaryRecord);
c_EMFStrokePathRecord.m_new=function(){
	c_EMFBinaryRecord.m_new.call(this,64,4);
	return this;
}
c_EMFStrokePathRecord.prototype.p_write=function(t_w){
	c_EMFBinaryRecord.prototype.p_write.call(this,t_w);
	t_w.p_wRect(null);
}
c_EMFStrokePathRecord.prototype.p_userfriendlyType=function(){
	return "strokepath";
}
c_EMFStrokePathRecord.prototype.p_ToString=function(){
	var t_s="";
	t_s=c_EMFBinaryRecord.prototype.p_ToString.call(this);
	return t_s;
}
function c_EMFCreateFontIndirectRecord(){
	c_EMFBinaryRecord.call(this);
	this.m__height=.0;
	this.m__bold=false;
	this.m__charset=0;
	this.m__outprecision=0;
	this.m__clipprecision=0;
	this.m__quality=0;
	this.m__pitch=0;
	this.m__family=0;
	this.m__facename="";
	this.m__intindex=0;
	this.m__width=0;
	this.m__escapement=0;
	this.m__orientation=0;
	this.m__italic=false;
	this.m__underline=false;
	this.m__strikeout=false;
}
c_EMFCreateFontIndirectRecord.prototype=extend_class(c_EMFBinaryRecord);
c_EMFCreateFontIndirectRecord.m_new=function(){
	c_EMFBinaryRecord.m_new.call(this,82,0);
	this.m__height=-10.0;
	this.m__bold=false;
	this.m__charset=0;
	this.m__outprecision=7;
	this.m__clipprecision=2;
	this.m__quality=3;
	this.m__pitch=0;
	this.m__family=0;
	return this;
}
c_EMFCreateFontIndirectRecord.prototype.p_write=function(t_w){
	var t_pos_recordsize=0;
	var t_val_recordsize=0;
	var t_myw=c_EMFWriter.m_new.call(new c_EMFWriter);
	t_myw.p_wI4(this.m__type);
	t_pos_recordsize=t_myw.m__pos;
	t_myw.p_wI4(0);
	t_myw.p_wI4(this.m__intindex+1);
	t_myw.p_wI4((this.m__height)|0);
	t_myw.p_wI4(this.m__width);
	t_myw.p_wI4(this.m__escapement);
	t_myw.p_wI4(this.m__orientation);
	if(this.m__bold){
		t_myw.p_wI4(700);
	}else{
		t_myw.p_wI4(400);
	}
	t_myw.p_wBool(this.m__italic);
	t_myw.p_wBool(this.m__underline);
	t_myw.p_wBool(this.m__strikeout);
	t_myw.p_wI1(this.m__charset);
	t_myw.p_wI1(this.m__outprecision);
	t_myw.p_wI1(this.m__clipprecision);
	t_myw.p_wI1(this.m__quality);
	t_myw.p_wI1(0);
	t_myw.p_wStr(this.m__facename);
	for(var t_i=this.m__facename.length;t_i<32;t_i=t_i+1){
		t_myw.p_wI2(0);
	}
	t_val_recordsize=t_myw.m__len;
	t_myw.m__pos=t_pos_recordsize;
	t_myw.p_wI4(t_val_recordsize);
	t_w.p_wInts(t_myw.m__buf,t_myw.m__len);
}
c_EMFCreateFontIndirectRecord.prototype.p_userfriendlyType=function(){
	return "createfontindirect";
}
c_EMFCreateFontIndirectRecord.prototype.p_ToString=function(){
	var t_s="";
	t_s=c_EMFBinaryRecord.prototype.p_ToString.call(this);
	t_s=t_s+(" facename:"+this.m__facename);
	t_s=t_s+(" height:"+String(this.m__height));
	if(this.m__bold){
		t_s=t_s+" weight:700";
	}else{
		t_s=t_s+" weight:400";
	}
	return t_s;
}
function c_EMFSetTextColorRecord(){
	c_EMFBinaryRecord.call(this);
	this.m__col=null;
}
c_EMFSetTextColorRecord.prototype=extend_class(c_EMFBinaryRecord);
c_EMFSetTextColorRecord.m_new=function(){
	c_EMFBinaryRecord.m_new.call(this,24,1);
	return this;
}
c_EMFSetTextColorRecord.prototype.p_write=function(t_w){
	c_EMFBinaryRecord.prototype.p_write.call(this,t_w);
	t_w.p_wI1(this.m__col.m__r);
	t_w.p_wI1(this.m__col.m__g);
	t_w.p_wI1(this.m__col.m__b);
	t_w.p_wI1(0);
}
c_EMFSetTextColorRecord.prototype.p_userfriendlyType=function(){
	return "settextcolor";
}
c_EMFSetTextColorRecord.prototype.p_ToString=function(){
	var t_s="";
	t_s=c_EMFBinaryRecord.prototype.p_ToString.call(this);
	t_s=t_s+("color="+this.m__col.p_ToString());
	return t_s;
}
function c_EMFSetTextAlignRecord(){
	c_EMFBinaryRecord.call(this);
	this.m__mode=0;
}
c_EMFSetTextAlignRecord.prototype=extend_class(c_EMFBinaryRecord);
c_EMFSetTextAlignRecord.m_new=function(){
	c_EMFBinaryRecord.m_new.call(this,22,1);
	return this;
}
c_EMFSetTextAlignRecord.prototype.p_write=function(t_w){
	c_EMFBinaryRecord.prototype.p_write.call(this,t_w);
	t_w.p_wI4(this.m__mode);
}
c_EMFSetTextAlignRecord.prototype.p_userfriendlyType=function(){
	return "settextalign";
}
c_EMFSetTextAlignRecord.prototype.p_ToString=function(){
	var t_s="";
	t_s=c_EMFBinaryRecord.prototype.p_ToString.call(this);
	t_s=t_s+("mode="+String(this.m__mode));
	return t_s;
}
function c_EMFTextoutRecord(){
	c_EMFBinaryRecord.call(this);
	this.m__text="";
	this.m__x=0;
	this.m__y=0;
}
c_EMFTextoutRecord.prototype=extend_class(c_EMFBinaryRecord);
c_EMFTextoutRecord.m_new=function(){
	c_EMFBinaryRecord.m_new.call(this,84,0);
	return this;
}
c_EMFTextoutRecord.prototype.p_write=function(t_w){
	var t_pos_recordsize=0;
	var t_val_recordsize=0;
	var t_pos_offString=0;
	var t_val_offString=0;
	var t_myw=c_EMFWriter.m_new.call(new c_EMFWriter);
	t_myw.p_wI4(this.m__type);
	t_pos_recordsize=t_myw.m__pos;
	t_myw.p_wI4(0);
	t_myw.p_wRect(c_Rectangle.m_new2.call(new c_Rectangle));
	t_myw.p_wI4(2);
	t_myw.p_wI1(0);
	t_myw.p_wI1(0);
	t_myw.p_wI1(13);
	t_myw.p_wI1(66);
	t_myw.p_wI1(0);
	t_myw.p_wI1(0);
	t_myw.p_wI1(13);
	t_myw.p_wI1(66);
	t_myw.p_wI4(this.m__x);
	t_myw.p_wI4(this.m__y);
	t_myw.p_wI4(this.m__text.length);
	t_pos_offString=t_myw.m__pos;
	t_myw.p_wI4(0);
	t_myw.p_wI4(0);
	t_myw.p_wRect(c_Rectangle.m_new2.call(new c_Rectangle));
	t_myw.p_wI4(0);
	t_val_offString=t_myw.m__pos;
	t_myw.p_wStr(this.m__text);
	var t_padding=4-this.m__text.length % 4;
	for(var t_i=0;t_i<t_padding;t_i=t_i+1){
		t_myw.p_wI2(0);
	}
	t_val_recordsize=t_myw.m__len;
	t_myw.m__pos=t_pos_recordsize;
	t_myw.p_wI4(t_val_recordsize);
	t_myw.m__pos=t_pos_offString;
	t_myw.p_wI4(t_val_offString);
	t_w.p_wInts(t_myw.m__buf,t_myw.m__len);
}
c_EMFTextoutRecord.prototype.p_userfriendlyType=function(){
	return "textout";
}
c_EMFTextoutRecord.prototype.p_ToString=function(){
	var t_s="";
	t_s=c_EMFBinaryRecord.prototype.p_ToString.call(this);
	t_s=t_s+("text='"+this.m__text+"'");
	t_s=t_s+("  pos="+String(this.m__x)+"/"+String(this.m__y));
	return t_s;
}
function c_InspectPanel(){
	Object.call(this);
	this.m__hotspot=null;
	this.m__tx=.0;
	this.m__period=0;
	this.m__inspecitems=null;
	this.m__showEndValue=false;
	this.m__bounds=c_Rectangle.m_new2.call(new c_Rectangle);
	this.m__panelcolor=c_Color.m_new4.call(new c_Color,255,255,225,0.95);
	this.m__linecolor=c_Color.m_lightGray;
}
c_InspectPanel.prototype.p_getTitleForPeriod=function(){
	var t_prev=null;
	var t_=this.m__hotspot.m__data.m__ts.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_ots=t_.p_NextObject();
		var t_ts=object_downcast((t_ots),c_GraphicTimeSection);
		if(t_ts.m__start>this.m__period){
			break;
		}
		if(t_ts.m__inspecttitle!=""){
			t_prev=t_ts;
		}
	}
	if(t_prev!=null){
		return t_prev.m__inspecttitle;
	}
	return "";
}
c_InspectPanel.prototype.p_collectItems=function(){
	this.m__inspecitems=c_Collection.m_new.call(new c_Collection);
	var t_sTitel=this.p_getTitleForPeriod();
	if(t_sTitel!=""){
		this.m__inspecitems.p_add(c_InspectTitleItem.m_new.call(new c_InspectTitleItem,t_sTitel));
	}
	var t_=this.m__hotspot.m__data.m__sets.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_oset=t_.p_NextObject();
		var t_ds=object_downcast((t_oset),c_GraphicDataSet);
		if(t_ds.m__showinfo==false){
			continue;
		}
		if(t_ds.m__isBlankSeparator){
			this.m__inspecitems.p_add(c_InspectSeparatorItem.m_new.call(new c_InspectSeparatorItem));
		}else{
			if(t_ds.m__isLineSeparator){
				this.m__inspecitems.p_add(c_InspectLineItem.m_new.call(new c_InspectLineItem));
			}else{
				var t_period=t_ds.m__start;
				var t_2=t_ds.m__items.p_ObjectEnumerator();
				while(t_2.p_HasNext()){
					var t_oitem=t_2.p_NextObject();
					var t_item=object_downcast((t_oitem),c_GraphicItem);
					if(t_period>this.m__hotspot.m__data.m__maxT){
						break;
					}else{
						if(t_period+t_item.m__duration<this.m__hotspot.m__data.m__minT){
						}else{
							if(this.m__period>=t_period && this.m__period<t_period+t_item.m__duration){
								var t_xp1=((this.m__hotspot.p_scaleX(t_period))|0);
								var t_xp2=((this.m__hotspot.p_scaleX(t_period+t_item.m__duration))|0);
								if(bb_math_Abs2(this.m__tx-(t_xp1))<bb_math_Abs2(this.m__tx-(t_xp2))){
									this.m__inspecitems.p_add(c_InspectValueItem.m_new.call(new c_InspectValueItem,t_ds,t_item.m__start));
									this.m__showEndValue=false;
								}else{
									this.m__inspecitems.p_add(c_InspectValueItem.m_new.call(new c_InspectValueItem,t_ds,t_item.m__end));
									this.m__showEndValue=true;
								}
								break;
							}
						}
					}
					t_period+=t_item.m__duration;
				}
			}
		}
	}
}
c_InspectPanel.m_new=function(t_hotspot,t_tx){
	this.m__hotspot=t_hotspot;
	this.m__tx=t_tx;
	this.m__period=this.m__hotspot.p_getPeriodAt(this.m__tx);
	this.p_collectItems();
	return this;
}
c_InspectPanel.m_new2=function(){
	return this;
}
c_InspectPanel.prototype.p_calculateDimension3=function(t_g){
	var t_nextY=.0;
	this.m__bounds.m__w=0.0;
	this.m__bounds.m__h=0.0;
	var t_=this.m__inspecitems.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		var t_item=object_downcast((t_o),c_DrawItem);
		t_item.p_calculateDimension2(t_g,this.m__hotspot.m__data.m__options);
	}
	t_nextY=5.0;
	var t_2=this.m__inspecitems.p_ObjectEnumerator();
	while(t_2.p_HasNext()){
		var t_o2=t_2.p_NextObject();
		var t_item2=object_downcast((t_o2),c_DrawItem);
		t_item2.m__bounds.m__x=5.0;
		t_item2.m__bounds.m__y=t_nextY;
		t_nextY=t_item2.m__bounds.m__y+t_item2.m__bounds.m__h;
		this.m__bounds.m__w=bb_math_Max2(this.m__bounds.m__w,t_item2.m__bounds.m__x+t_item2.m__bounds.m__w+5.0);
		this.m__bounds.m__h=t_nextY+5.0;
	}
	var t_3=this.m__inspecitems.p_ObjectEnumerator();
	while(t_3.p_HasNext()){
		var t_o3=t_3.p_NextObject();
		var t_item3=object_downcast((t_o3),c_DrawItem);
		t_item3.p_setWidth(this.m__bounds.m__w-10.0);
	}
}
c_InspectPanel.prototype.p_calculatePosition=function(t_grapharea,t_tx,t_ty){
	this.m__bounds.m__y=t_grapharea.m__y+5.0;
	this.m__bounds.m__x=t_grapharea.m__x+5.0;
	if(t_tx<this.m__bounds.m__x+this.m__bounds.m__w+5.0){
		this.m__bounds.m__x=this.m__bounds.m__w+15.0;
	}
	if(this.m__bounds.m__x+this.m__bounds.m__w+5.0>t_grapharea.m__w){
		this.m__bounds.m__x=bb_math_Max2(0.0,t_grapharea.m__w-this.m__bounds.m__w-5.0);
	}
}
c_InspectPanel.prototype.p_draw2=function(t_gArea){
	t_gArea.p_setColor(this.m__panelcolor);
	t_gArea.p_drawRect2(this.m__bounds,true);
	t_gArea.p_setLineWidth(1.0);
	t_gArea.p_setColor(this.m__linecolor);
	t_gArea.p_drawRect2(this.m__bounds,false);
	var t_g=null;
	t_g=c_Graph2DPanel.m_new2.call(new c_Graph2DPanel,t_gArea,this.m__bounds);
	var t_=this.m__inspecitems.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		var t_item=object_downcast((t_o),c_DrawItem);
		c_ItemPainter.m_draw((t_g),t_item);
	}
}
function bbInit(){
	c_GraphController.m__panels=c_StringMap.m_new.call(new c_StringMap);
	c_Color.m_lightGray=c_Color.m_new4.call(new c_Color,192,192,192,1.0);
	c_Color.m_black=c_Color.m_new4.call(new c_Color,0,0,0,1.0);
	c_Limitation.m_limits=c_Limitation.m_new.call(new c_Limitation);
	c_Color.m_white=c_Color.m_new4.call(new c_Color,255,255,255,1.0);
	c_NumericFormater.m__intern_thous_sep=39;
	c_NumericFormater.m__intern_dec_point=46;
}
//${TRANSCODE_END}


//${TRANSCODEATEND_BEGIN}
if (typeof(ch) === "undefined") {
   ch = {};
}

if (typeof(ch.logismata) === "undefined") {
   ch.logismata = {};
}

if (typeof(ch.logismata.online) === "undefined") {
   ch.logismata.online = {};
}

if (typeof(ch.logismata.online.graph) === "undefined") {
    ch.logismata.online.graph = {
        
                      
        // creates a graph with given canvas-id and serialized data
        // parameter:   id:String           id of the canvas (searched by document.getElementById
        //              data:String         serialized graph-string (LogiGraph)
        //              bgcolor:String      background-color (f.e. "#aa00cc" or "12,12,12")
        //              mouseevents:Bool    should handle mouse events by the graph itself
        //              resizeevent:Bool    should handle resize event by the graph itself
        //                                  when resizeevent is false, on windows-resize a 
        //                                  redrawGraph is required insted
        createGraph: function(id, data, bgcolor, mouseevents, resizeevent) {  
            c_API.m_createGraph(id, data, bgcolor, mouseevents, resizeevent);
        },

        
        

        // redraws an existing graph, mainly after a screen-resize 
        // parameter:   id:String       id of the canvas (searched by document.getElementById
        redrawGraph: function(id) {  
            c_API.m_redrawGraph(id);
        },
        
        
        // release graph and all related elements 
        // parameter:   id:String       id of the canvas (searched by document.getElementById
        releaseGraph: function(id) {  
            c_API.m_releaseGraph(id);
        },

              
        // export graph as EMF
        // parameter:   id:String       id of the canvas (searched by document.getElementById
        //              realsize:Bool   should graph have same size as canvas (true)
        //                              or should it use optimized size (false)
        exportAsEMF: function(id, realsize) {  
            return c_API.m_exportAsEMF(id, realsize);
        },
        
        // dump emf-data to string
        // parameter:   id:String       id of the canvas (searched by document.getElementById
        //              realsize:Bool   should graph have same size as canvas (true)
        //                              or should it use optimized size (false)
        dumpAsEMF: function(id, realsize) {  
            return c_API.m_dumpAsEMF(id, realsize);
        }

                          
    };
   
    // initialise the package environment
    bbInit();
}

})();

//${TRANSCODEATEND_END}

