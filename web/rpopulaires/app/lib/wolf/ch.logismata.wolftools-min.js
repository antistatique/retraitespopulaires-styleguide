// wolftools - 04.09.2017 / 1.0.0
// (C) Copyright 2017 Logismata AG, Zuerich
// http://www.logismata.ch
// Alle Rechte vorbehalten
// All rights reserved
(function(){var aD="";var c="PKGVERS=1.0.0";var J="1";var V="release";var w="winnt";var aq="js";var ax="";var av="0";var f="1";var P="html5";var r="";var o=0.017453292519943295;var aC=57.29577951308232;var ap="";var ai=[];var aA=0;function aE(){ai.push(ap)}function y(){ap=ai.pop()}function a(){if(!ap.length){return""}var aI=ap+"\n";for(var aH=ai.length-1;aH>0;--aH){aI+=ai[aH]+"\n"}return aI}function d(aI){var aH=document.getElementById("GameConsole");if(aH){aH.value+=aI+"\n";aH.scrollTop=aH.scrollHeight-aH.clientHeight}else{if(window.console!=undefined){window.console.log(aI)}}return 0}function Q(aH){if(typeof(aH)=="string"&&aH==""){return}alert("Runtime Error : "+aH.toString()+"\n\n"+a())}function ae(aH){throw aH}function O(aH){if(window.console!=undefined){window.console.log(aH)}}function p(){}function ab(aH){if(aH){return aH}ae("Null object access")}function at(aI,aH){if(aH<0||aH>=aI.length){ae("Character index out of range")}return aI.charCodeAt(aH)}function ak(aH,aI){if(aI<0||aI>=aH.length){ae("Array index out of range")}aA=aI;return aH}function l(aI){var aH=Array(aI);for(var aJ=0;aJ<aI;++aJ){aH[aJ]=false}return aH}function ay(aI){var aH=Array(aI);for(var aJ=0;aJ<aI;++aJ){aH[aJ]=0}return aH}function au(aI){var aH=Array(aI);for(var aJ=0;aJ<aI;++aJ){aH[aJ]=""}return aH}function A(aI){var aH=Array(aI);for(var aJ=0;aJ<aI;++aJ){aH[aJ]=[]}return aH}function j(aI){var aH=Array(aI);for(var aJ=0;aJ<aI;++aJ){aH[aJ]=null}return aH}function L(aI,aH){var aJ=aI.length;aI=aI.slice(0,aH);if(aH<=aJ){return aI}aI.length=aH;while(aJ<aH){aI[aJ++]=false}return aI}function Y(aI,aH){var aJ=aI.length;aI=aI.slice(0,aH);if(aH<=aJ){return aI}aI.length=aH;while(aJ<aH){aI[aJ++]=0}return aI}function S(aI,aH){var aJ=aI.length;aI=aI.slice(0,aH);if(aH<=aJ){return aI}aI.length=aH;while(aJ<aH){aI[aJ++]=""}return aI}function q(aI,aH){var aJ=aI.length;aI=aI.slice(0,aH);if(aH<=aJ){return aI}aI.length=aH;while(aJ<aH){aI[aJ++]=[]}return aI}function az(aI,aH){var aJ=aI.length;aI=aI.slice(0,aH);if(aH<=aJ){return aI}aI.length=aH;while(aJ<aH){aI[aJ++]=null}return aI}function e(aH,aL){var aK=Math.min(aH.length,aL.length),aJ,aI;for(aJ=0;aJ<aK;++aJ){aI=aH.charCodeAt(aJ)-aL.charCodeAt(aJ);if(aI){return aI}}return aH.length-aL.length}function W(aK,aJ,aI){var aH=0;for(;;){aH=aK.indexOf(aJ,aH);if(aH==-1){return aK}aK=aK.substring(0,aH)+aI+aK.substring(aH+aJ.length);aH+=aI.length}}function I(aJ){var aH=0,aI=aJ.length;while(aH<aI&&aJ.charCodeAt(aH)<=32){aH+=1}while(aI>aH&&aJ.charCodeAt(aI-1)<=32){aI-=1}return aJ.slice(aH,aI)}function aw(aI,aH){return aH.length<=aI.length&&aI.slice(0,aH.length)==aH}function an(aI,aH){return aH.length<=aI.length&&aI.slice(aI.length-aH.length,aI.length)==aH}function Z(aJ){var aH=new Array(aJ.length);for(var aI=0;aI<aJ.length;++aI){aH[aI]=aJ.charCodeAt(aI)}return aH}function aa(aI){var aJ="",aH;for(aH=0;aH<aI.length;++aH){aJ+=String.fromCharCode(aI[aH])}return aJ}function n(aH,aI){if(aH instanceof aI){return aH}return null}function v(aH,aI){if(aH&&aH.implments&&aH.implments[aI]){return aH}return null}function x(aI){var aH=function(){};aH.prototype=aI.prototype;return new aH}function H(){}H.prototype.toString=function(){return"Uncaught Exception"};function D(aN,aL){if(aN.length===0){return""}var aM=0;for(;;){if(aM>=aN.length){return""}var aJ=aN.indexOf("=",aM);if(aJ===-1){return""}var aK=aN.indexOf(";",aJ);var aI=aN.slice(aM,aJ);if(aI.length===0){return""}if(aI.toUpperCase()==aL.toUpperCase()){var aH="";if(aK===-1){aH=aN.slice(aJ+1)}else{aH=aN.slice(aJ+1,aK)}return aH}if(aK===-1){return""}aM=aK+1}return""}function m(aH){if(!aH||!(typeof aH==="string")){return""}if(typeof(c)!=="undefined"){return D(c,aH)}if(typeof(CFG_DEFAULTCOMPILERVARS)!=="undefined"){return D(CFG_DEFAULTCOMPILERVARS,aH)}return""}function B(){return new Date().getTime()}function ad(){return window.location.host}function ac(aH){if(!aH||!(typeof aH==="string")){return""}try{var aJ=new XMLHttpRequest();aJ.open("GET",aH,false);aJ.send(null);if(aJ.status==200||aJ.status==0){return aJ.responseText}}catch(aI){}return""}function t(){Object.call(this)}t.m_calcExpression=function(aI,aH,aJ,aK){if(aJ.length==1&&aK.length==1){return k(aI,aH,aJ.charCodeAt(0),aK.charCodeAt(0),4)}return k(aI,aH,-1,-1,4)};t.m_roundValue=function(aH){return af(aH)};t.m_initPrototypes=function(){var aH=0;if(aH==1){t.m_calcExpression("",false,"","");t.m_roundValue(0)}};function E(){Object.call(this);this.m__expr=[];this.m__pos=0;this.m__size=0;this.m__dec=46;this.m__grp=39;this.m__op_comp_precision=4;this.m__token=ah.m_new.call(new ah)}E.m_new=function(aJ,aK,aH,aI){this.m__expr=Z(aH);this.m__pos=0;this.m__size=this.m__expr.length;if(aJ>0){this.m__dec=aJ}if(aK>0){this.m__grp=aK}this.m__op_comp_precision=aI;return this};E.m_new2=function(){return this};E.prototype.p_nextNum=function(){var aM=false;var aL=0;var aK=0;var aO=0;var aJ=0;var aN=1;var aI=this.m__pos;while(this.m__pos<this.m__size){aL=this.m__expr[this.m__pos];this.m__pos=this.m__pos+1;if(aL>=48&&aL<=57){if(aJ==0){aK=aK*10+(aL-48)}else{aO=aO*10+(aL-48);aJ=aJ*10}}else{if(aL==this.m__dec){aJ=1}else{if(aL==this.m__grp){}else{if(aL==37){aN=0.01;break}else{if(aL==116||aL==84){aN=1000;break}else{if(aL==109||aL==77){aN=1000000;break}else{if(aL==101||aL==69){aM=true;break}else{this.m__pos=this.m__pos-1;break}}}}}}}}if(aM==false){this.m__token.m__isval=true;if(aJ>0){this.m__token.m__val=(aK+aO/(aJ))*aN}else{this.m__token.m__val=aK*aN}return}aM=false;this.m__pos=aI;while(this.m__pos<this.m__size){aL=this.m__expr[this.m__pos];if(aL>=48&&aL<=57){this.m__token.p_add(aL);this.m__pos=this.m__pos+1;aM=false}else{var aH=aL;if(aH==37){this.m__token.p_add2([69,45,50]);this.m__pos=this.m__pos+1;return}else{if(aH==101||aH==69){this.m__token.p_add(69);this.m__pos=this.m__pos+1;aM=true}else{if(aH==43||aH==45){if(aM){this.m__token.p_add(aL);this.m__pos=this.m__pos+1}else{return}aM=false}else{if(aL==this.m__dec){this.m__token.p_add(46);this.m__pos=this.m__pos+1;aM=false}else{if(aL==this.m__grp){this.m__pos=this.m__pos+1;aM=false}else{return}}}}}}}};E.prototype.p_nextAlpha=function(){var aH=0;while(this.m__pos<this.m__size){aH=this.m__expr[this.m__pos];if(aH>=65&&aH<=90||aH>=97&&aH<=122){this.m__token.p_add(aH);this.m__pos=this.m__pos+1}else{break}}};E.prototype.p_nextOP=function(){var aH=0;if(this.m__pos<this.m__size){aH=this.m__expr[this.m__pos];var aJ=aH;if(aJ==43||aJ==45||aJ==42||aJ==47||aJ==94||aJ==61||aJ==60||aJ==62){this.m__token.p_add(aH);this.m__pos=this.m__pos+1;if(this.m__pos<this.m__size){aH=this.m__expr[this.m__pos];var aI=aH;if(aI==61||aI==60||aI==62){this.m__token.p_add(aH);this.m__pos=this.m__pos+1}}}}};E.prototype.p_nextToken=function(aI){var aH=0;this.m__token.p_reset();while(this.m__pos<this.m__size){aH=this.m__expr[this.m__pos];if(aH==32||aH==9){this.m__pos=this.m__pos+1;continue}break}if(this.m__pos<this.m__size){aH=this.m__expr[this.m__pos]}else{return 5}if(aH>=48&&aH<=57||aH==this.m__dec){this.p_nextNum();return 1}if(aH==40||aH==41||aH==59){this.m__token.p_add(aH);this.m__pos=this.m__pos+1;return 4}if(aH>=65&&aH<=90||aH>=97&&aH<=122){this.p_nextAlpha()}else{this.p_nextOP()}if(aI==false){if(this.m__token.p_isOp()==true){return 2}}if(this.m__token.p_isFunc()==true){return 3}throw s.m_new.call(new s,3)};E.prototype.p_OP_div=function(aI,aH){if(aH==0){throw s.m_new.call(new s,1)}var aJ=aI/aH;return aJ};E.prototype.p_limits=function(aH){if(aH>=X.m_limits.m__MAX_FLOAT||aH<=-X.m_limits.m__MAX_FLOAT){throw s.m_new.call(new s,9)}else{if(aH==X.m_limits.m__MIN_FLOAT||aH==-X.m_limits.m__MIN_FLOAT){throw s.m_new.call(new s,10)}}};E.prototype.p_OP_pow=function(aI,aH){if(aI==0&&aH<0||aI==0&&aH==0||aI<0&&Math.floor(aH)!=aH){throw s.m_new.call(new s,7)}var aJ=Math.pow(aI,aH);this.p_limits(aJ);return aJ};E.prototype.p_OP_and=function(aI,aH){if(aI>0&&aH>0){return 1}return 0};E.prototype.p_OP_or=function(aI,aH){if(aI>0||aH>0){return 1}return 0};E.prototype.p_OP_comp=function(aJ,aL,aI,aK){var aM=0;aM=0;var aH=aJ;if(aH==20){if(u(aL-aI,aK)){aM=1}}else{if(aH==21){if(ar(aL-aI,aK)){aM=1}}else{if(aH==22){if(ao(aL-aI,aK)){aM=1}}else{if(aH==23){if(C(aL-aI,aK)){aM=1}}else{if(aH==24){if(U(aL-aI,aK)){aM=1}}else{if(aH==25){if(aF(aL-aI,aK)){aM=1}}}}}}}return aM};E.prototype.p_FNC_exp=function(aI){if(aI>X.m_limits.m__MAX_EXP){throw s.m_new.call(new s,9)}else{if(aI<X.m_limits.m__MIN_EXP){throw s.m_new.call(new s,10)}}var aH=Math.exp(aI);this.p_limits(aH);return aH};E.prototype.p_FNC_log=function(aI){if(aI<=0){throw s.m_new.call(new s,7)}var aH=Math.log(aI);return aH};E.prototype.p_FNC_sqrt=function(aI){if(aI<0){throw s.m_new.call(new s,7)}var aH=Math.sqrt(aI);return aH};E.prototype.p_readParameter=function(aK,aI){if(aK==0){return[]}var aH=ay(aK);var aJ=0;var aL=0;for(aJ=0;aJ<aK;aJ=aJ+1){aH[aJ]=0}aL=this.p_nextToken(true);if(aL!=4||this.m__token.m__chrs[0]!=40){throw s.m_new.call(new s,2)}for(aJ=0;aJ<aK;aJ=aJ+1){aH[aJ]=this.p_calc(0);aL=this.p_nextToken(true);if(aL!=4){throw s.m_new.call(new s,2)}if(aJ+1<aK){if(aI){if(this.m__token.m__chrs[0]==41){break}}if(this.m__token.m__chrs[0]!=59){throw s.m_new.call(new s,2)}}else{if(this.m__token.m__chrs[0]!=41){throw s.m_new.call(new s,2)}}}return aH};E.prototype.p_callback=function(aK,aJ,aI,aH){return 0};E.prototype.p_readSingleCallbackParam=function(){var aH=0;var aI=0;var aJ=0;aJ=this.p_nextToken(true);if(aJ!=4||this.m__token.m__chrs[0]!=40){throw s.m_new.call(new s,2)}while(this.m__pos<this.m__size){aH=this.m__expr[this.m__pos];if(aH==32||aH==9){this.m__pos=this.m__pos+1;continue}break}while(this.m__pos<this.m__size){aH=this.m__expr[this.m__pos];if(aH>=48&&aH<=57){aI=aI*10+(aH-48);this.m__pos=this.m__pos+1}else{break}}aJ=this.p_nextToken(true);if(aJ!=4||this.m__token.m__chrs[0]!=41){throw s.m_new.call(new s,2)}return aI};E.prototype.p_calc=function(aK){var aI=this.m__pos;var aL=true;var aM=0;var aQ=0;while(true){var aV=this.p_nextToken(aL);if(aV==0){return 0}else{if(aV==1){if(aL==false){throw s.m_new.call(new s,2)}aL=false;if(this.m__token.m__isval){aM=this.m__token.m__val}else{aM=this.m__token.p_ToFloat()}}else{if(aV==2){if(aL==true){throw s.m_new.call(new s,2)}var aW=this.m__token.p_getOpPrio();if(aW<=aK){this.m__pos=aI;return aM}var aT=this.m__token.m__op;var aU=aT;if(aU==1){aM=aM+this.p_calc(aW)}else{if(aU==2){aM=aM-this.p_calc(aW)}else{if(aU==3){aM=aM*this.p_calc(aW)}else{if(aU==4){aM=this.p_OP_div(aM,this.p_calc(aW))}else{if(aU==5){aM=this.p_OP_pow(aM,this.p_calc(aW))}else{if(aU==10){aM=this.p_OP_and(aM,this.p_calc(aW))}else{if(aU==11){aM=this.p_OP_or(aM,this.p_calc(aW))}else{if(aU==20||aU==21||aU==22||aU==23||aU==24||aU==25){aM=this.p_OP_comp(aT,aM,this.p_calc(aW),this.m__op_comp_precision)}}}}}}}}}else{if(aV==3){if(aL==false){throw s.m_new.call(new s,2)}aL=false;var aH=this.m__token.m__op;var aS=aH;if(aS==101){aM=-this.p_calc(9)}else{if(aS==100){aM=this.p_calc(9)}else{if(aS==103){aM=this.p_FNC_exp(this.p_calc(9))}else{if(aS==104){aM=this.p_FNC_log(this.p_calc(9))}else{if(aS==105){aM=this.p_FNC_sqrt(this.p_calc(9))}else{if(aS==102){aM=b(this.p_calc(9))}else{if(aS==106){aM=am(this.p_calc(9))}else{if(aS==107){aM=g(this.p_calc(9))}else{if(aS==108){aM=z(this.p_calc(9))}else{if(aS==199){var aJ=this.p_readParameter(4,true);aM=this.p_callback(((aJ[0])|0),((aJ[1])|0),((aJ[2])|0),((aJ[3])|0))}else{if(aS==198){aM=this.p_callback(0,this.p_readSingleCallbackParam(),0,0)}else{if(aS==109){var aP=this.p_readParameter(2,false);aM=aB(aP[0],aP[1])}else{if(aS==110){var aO=this.p_readParameter(2,false);aM=K(aO[0],aO[1])}else{if(aS==111){var aN=this.p_readParameter(3,false);aM=K(aN[0],aN[1]);aM=aB(aM,aN[2])}}}}}}}}}}}}}}}else{if(aV==4){var aR=this.m__token.m__chrs[0];if(aL==false&&aR==40||aL==true&&aR==41||aL==true&&aR==59){throw s.m_new.call(new s,2)}if(aR==40){aQ=aQ+1;aL=false;aM=this.p_calc(0)}else{if(aR==41){if(aQ==0){this.m__pos=aI;return aM}else{aQ=aQ-1}}else{if(aR==59){if(aQ!=0){throw s.m_new.call(new s,2)}this.m__pos=aI;return aM}}}}else{if(aV==5){if(aL==true){throw s.m_new.call(new s,2)}if(aQ<0){throw s.m_new.call(new s,5)}return aM}}}}}}aI=this.m__pos}};function ah(){Object.call(this);this.m__len=0;this.m__sz=0;this.m__chrs=[];this.m__op=0;this.m__isval=false;this.m__val=0}ah.m_new=function(){this.m__len=0;this.m__sz=0;this.m__chrs=[];this.m__op=0;this.m__isval=false;this.m__val=0;return this};ah.prototype.p_reset=function(){this.m__len=0;this.m__op=0;this.m__isval=false;this.m__val=0};ah.prototype.p_add=function(aH){if(this.m__sz==0||this.m__len+1>=this.m__sz){this.m__sz=this.m__sz+3;this.m__chrs=Y(this.m__chrs,this.m__sz)}this.m__chrs[this.m__len]=aH;this.m__len=this.m__len+1};ah.prototype.p_add2=function(aJ){var aH=0;var aI=aJ.length;if(this.m__sz==0||this.m__len+aI>=this.m__sz){this.m__sz=this.m__sz+aI+1;this.m__chrs=Y(this.m__chrs,this.m__sz)}for(aH=0;aH<aI;aH=aH+1){this.m__chrs[this.m__len]=aJ[aH];this.m__len=this.m__len+1}};ah.prototype.p_isOp=function(){this.m__op=0;if(this.m__len==1){var aJ=this.m__chrs[0];if(aJ==43){this.m__op=1;return true}else{if(aJ==45){this.m__op=2;return true}else{if(aJ==42){this.m__op=3;return true}else{if(aJ==47){this.m__op=4;return true}else{if(aJ==94){this.m__op=5;return true}else{if(aJ==60){this.m__op=21;return true}else{if(aJ==61){this.m__op=20;return true}else{if(aJ==62){this.m__op=22;return true}}}}}}}}}else{if(this.m__len==2){var aI=this.m__chrs[0];if(aI==111||aI==79){if(this.m__chrs[1]==114||this.m__chrs[1]==82){this.m__op=11;return true}}else{if(aI==60){if(this.m__chrs[1]==62){this.m__op=23;return true}else{if(this.m__chrs[1]==61){this.m__op=24;return true}}}else{if(aI==62){if(this.m__chrs[1]==61){this.m__op=25;return true}}}}}else{if(this.m__len==3){var aH=this.m__chrs[0];if(aH==97||aH==65){if(this.m__chrs[1]==110||this.m__chrs[1]==78){if(this.m__chrs[2]==100||this.m__chrs[2]==68){this.m__op=10;return true}}}}}}return false};ah.prototype.p_isFunc=function(){this.m__op=0;if(this.m__len==1){var aI=this.m__chrs[0];if(aI==43){this.m__op=100;return true}else{if(aI==45){this.m__op=101;return true}}}else{if(this.m__len==2){var aH=this.m__chrs[0];if(aH==99||aH==67){if(this.m__chrs[1]==98||this.m__chrs[1]==66){this.m__op=199;return true}}}else{if(this.m__len==3){var aM=this.m__chrs[0];if(aM==97||aM==65){if(this.m__chrs[1]==98||this.m__chrs[1]==66){if(this.m__chrs[2]==115||this.m__chrs[2]==83){this.m__op=102;return true}}}else{if(aM==99||aM==67){if(this.m__chrs[1]==98||this.m__chrs[1]==66){if(this.m__chrs[2]==118||this.m__chrs[2]==86){this.m__op=198;return true}}}else{if(aM==101||aM==69){if(this.m__chrs[1]==120||this.m__chrs[1]==88){if(this.m__chrs[2]==112||this.m__chrs[2]==80){this.m__op=103;return true}}}else{if(aM==108||aM==76){if(this.m__chrs[1]==111||this.m__chrs[1]==79){if(this.m__chrs[2]==103||this.m__chrs[2]==71){this.m__op=104;return true}}}else{if(aM==109||aM==77){if(this.m__chrs[1]==97||this.m__chrs[1]==65){if(this.m__chrs[2]==120||this.m__chrs[2]==88){this.m__op=110;return true}}else{if(this.m__chrs[1]==105||this.m__chrs[1]==73){if(this.m__chrs[2]==110||this.m__chrs[2]==78){this.m__op=109;return true}}}}}}}}}else{if(this.m__len==4){var aL=this.m__chrs[0];if(aL==115||aL==83){if(this.m__chrs[1]==113||this.m__chrs[1]==81){if(this.m__chrs[2]==114||this.m__chrs[2]==82){if(this.m__chrs[3]==116||this.m__chrs[3]==84){this.m__op=105;return true}}}}}else{if(this.m__len==5){var aK=this.m__chrs[0];if(aK==114||aK==82){if(this.m__chrs[1]==97||this.m__chrs[1]==65){if(this.m__chrs[2]==110||this.m__chrs[2]==78){if(this.m__chrs[3]==103||this.m__chrs[3]==71){if(this.m__chrs[4]==101||this.m__chrs[4]==69){this.m__op=111;return true}}}}else{if(this.m__chrs[1]==111||this.m__chrs[1]==79){if(this.m__chrs[2]==117||this.m__chrs[2]==85){if(this.m__chrs[3]==110||this.m__chrs[3]==78){if(this.m__chrs[4]==100||this.m__chrs[4]==68){this.m__op=106;return true}}}}}}else{if(aK==116||aK==84){if(this.m__chrs[1]==114||this.m__chrs[1]==82){if(this.m__chrs[2]==117||this.m__chrs[2]==85){if(this.m__chrs[3]==110||this.m__chrs[3]==78){if(this.m__chrs[4]==99||this.m__chrs[4]==67){this.m__op=108;return true}}}}}}}else{if(this.m__len==7){var aJ=this.m__chrs[0];if(aJ==114||aJ==82){if(this.m__chrs[1]==111||this.m__chrs[1]==79){if(this.m__chrs[2]==117||this.m__chrs[2]==85){if(this.m__chrs[3]==110||this.m__chrs[3]==78){if(this.m__chrs[4]==100||this.m__chrs[4]==68){if(this.m__chrs[5]==117||this.m__chrs[5]==85){if(this.m__chrs[6]==112||this.m__chrs[6]==80){this.m__op=107;return true}}}}}}}}}}}}}return false};ah.prototype.p_ToString=function(){return aa(this.m__chrs.slice(0,this.m__len))};ah.prototype.p_ToFloat=function(){if(this.m__isval){return this.m__val}var aH=this.p_ToString();return parseFloat(aH)};ah.prototype.p_getOpPrio=function(){var aH=this.m__op;if(aH==10||aH==11){return 1}else{if(aH==20||aH==21||aH==22||aH==23||aH==24||aH==25){return 2}else{if(aH==1||aH==2){return 3}else{if(aH==3||aH==4){return 4}else{if(aH==5){return 5}}}}}return 0};function s(){H.call(this);this.m__err=0}s.prototype=x(H);s.m_new=function(aH){this.m__err=aH;return this};s.m_new2=function(){return this};function X(){Object.call(this);this.m__MAX_FLOAT=(2-Math.pow(2,-23))*Math.pow(2,127);this.m__MIN_FLOAT=Math.pow(2,-126);this.m__MAX_EXP=1024;this.m__MIN_EXP=-1024}X.m_new=function(){return this};X.m_limits=null;function aG(aH){if(aH>=0){return aH}return -aH}function b(aH){if(aH>=0){return aH}return -aH}function u(aJ,aH){var aI=Math.pow(10,(-aH))/2;if(b(aJ)<aI){return true}return false}function ar(aI,aH){if(u(aI,aH)){return false}if(aI<0){return true}if(aI>0){return false}return true}function ao(aI,aH){if(u(aI,aH)){return false}if(aI>0){return true}if(aI<0){return false}return true}function C(aI,aH){if(u(aI,aH)==false){return true}return false}function U(aI,aH){if(u(aI,aH)){return true}if(aI<0){return true}return false}function aF(aI,aH){if(u(aI,aH)){return true}if(aI>0){return true}return false}function T(aH){if(aH<0){return -1}return((aH>0)?1:0)}function i(aH){if(aH<0){return -1}if(aH>0){return 1}return 0}function am(aH){var aI=b(aH);return Math.floor(aI+0.5000000001)*i(aH)}function M(aH,aJ){if(u(aJ,8)){return aH}var aI=b(aH);return Math.floor(aI/aJ+0.5000000001)*aJ*i(aH)}function g(aH){if(u(aH,8)){return 0}var aI=b(M(aH,1e-8));return Math.ceil(aI)*i(aH)}function R(aH,aJ){if(u(aH,8)){return 0}if(u(aJ,8)){return g(aH)}var aI=b(M(aH,1e-8));return Math.ceil(aI/aJ)*aJ*i(aH)}function z(aH){var aI=b(M(aH,1e-8));return Math.floor(aI)*i(aH)}function G(aH,aJ){if(u(aJ,8)){return aH}var aI=b(M(aH,1e-8));return Math.floor(aI/aJ)*aJ*i(aH)}function F(aI,aH){if(aI<aH){return aI}return aH}function aB(aI,aH){if(aI<aH){return aI}return aH}function ag(aI,aH){if(aI>aH){return aI}return aH}function K(aI,aH){if(aI>aH){return aI}return aH}function k(aL,aK,aM,aO,aJ){var aH=0;if(aL==""){return 0}try{var aN=E.m_new.call(new E,aM,aO,aL,aJ);aH=aN.p_calc(0);if(aN.p_nextToken(false)!=5){throw s.m_new.call(new s,2)}}catch(aI){if(t_e1=n(aI,s)){aH=0;if(aK){throw s.m_new.call(new s,t_e1.m__err)}}else{if(t_e2=n(aI,H)){aH=0;if(aK){throw s.m_new.call(new s,99)}}else{throw aI}}}return aH}function al(aJ,aI,aK,aL,aH){if(aK.length==1&&aL.length==1){return k(aJ,aI,aK.charCodeAt(0),aL.charCodeAt(0),aH)}return k(aJ,aI,-1,-1,aH)}function aj(aH){return k(aH,false,-1,-1,4)}function af(aH){var aI=b(aH);if(aI<1000){return am(aH)}if(aI<10000){return M(aH,10)}if(aI<100000){return M(aH,100)}if(aI<1000000){return M(aH,1000)}return M(aH,10000)}function h(){t.m_initPrototypes();return 0}function N(){X.m_limits=X.m_new.call(new X)}if(typeof(ch)==="undefined"){ch={}}if(typeof(ch.logismata)==="undefined"){ch.logismata={}}if(typeof(ch.logismata.wolftools)==="undefined"){ch.logismata.wolftools={calcExpression:function(aK,aH,aJ,aI){return t.m_calcExpression(aK,aH,aJ,aI)},roundValue:function(aH){return t.m_roundValue(aH)}};N()}})();