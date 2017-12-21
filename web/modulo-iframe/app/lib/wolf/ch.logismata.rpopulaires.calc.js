
//${TRANSCODEATSTART_BEGIN}
var ch;
(function() {
//${TRANSCODEATSTART_END}


//${CONFIG_BEGIN}
var CFG_CD="";
var CFG_COMPILERVARS="PKGVERS=1.0.0";
var CFG_COMPILERVARS_IMPLEMENTED="1";
var CFG_CONFIG="release";
var CFG_HOST="winnt";
var CFG_LANG="js";
var CFG_MODPATH="";
var CFG_SAFEMODE="0";
var CFG_STC_TRACE="0";
var CFG_STMVA_LOG="0";
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

function c_API(){
	Object.call(this);
}
c_API.m_loadFrom=function(t_url){
	return c_StRWLoader.m_loadFromURL(t_url) && c_LawbaseLoader.m_loadFrom(t_url);
}
c_API.m_isValid=function(){
	return c_StRWLoader.m_isValid() && c_LawbaseLoader.m_isValid();
}
c_API.m_getBsvLaw=function(){
	if(c_LawbaseLoader.m_isValid()){
		return c_LawbaseLoader.m__current_bsv_ch;
	}else{
		return c_LawbaseCH.m_new.call(new c_LawbaseCH);
	}
}
c_API.m_getTaxBaseStand=function(){
	if(c_StRWLoader.m_isValid()){
		return c_StRWLoader.m__current_rw.m__ststand;
	}
	return "";
}
c_API.m_getTaxBaseStandDate=function(){
	if(c_StRWLoader.m_isValid()){
		return c_StRWLoader.m__current_rw.m__stdatum;
	}
	return "";
}
c_API.m_searchLocations=function(t_search,t_lang,t_country){
	if(c_StRWLoader.m_isValid()){
		var t_cCalc=c_StC_natPers_BasisRechner.m_new2.call(new c_StC_natPers_BasisRechner,c_StRWLoader.m__current_rw);
		t_cCalc.p_searchSteuerort(t_search,t_lang,t_country,50);
		return t_cCalc;
	}
	return null;
}
c_API.m_getLocationInfo=function(t_ortid){
	if(c_StRWLoader.m_isValid()){
		var t_calc=c_StC_natPers_BasisRechner.m_new2.call(new c_StC_natPers_BasisRechner,c_StRWLoader.m__current_rw);
		if(t_calc.p_loadSteuerort2(t_ortid)){
			return t_calc;
		}
	}
	return null;
}
c_API.m_getMax3AmitBVG=function(){
	return c_API.m_getBsvLaw().m_max3AmitBVG;
}
c_API.m_getMax3AohneBVG=function(){
	return c_API.m_getBsvLaw().m_max3AohneBVG;
}
c_API.m_calcTaxableIncome=function(t_kanton,t_ortid,t_alter,t_zivil,t_konf,t_kinder,t_brutinc,t_isempl){
	if(c_StRWLoader.m_isValid()){
		var t_ktid=c_StR_common.m_Kanton_CH;
		if(t_kanton){
			var t_calc=c_StC_natPers_BasisRechner.m_new2.call(new c_StC_natPers_BasisRechner,c_StRWLoader.m__current_rw);
			if(t_calc.p_loadSteuerort2(t_ortid)){
				t_ktid=t_calc.m__stort.p__ktid();
			}
		}
		var t_mvaEK=c_StMiniVAEvalEK.m_new.call(new c_StMiniVAEvalEK,c_StRWLoader.m__current_rw,t_ktid,0);
		return (t_mvaEK.p_berechneStbEK(((t_brutinc)|0),t_isempl,t_alter,t_zivil,t_kinder));
	}
	return 0.0;
}
c_API.m_calcSparen=function(t_year,t_union,t_gender,t_age,t_children,t_income,t_is_empl,t_has_bvg,t_locality,t_premium,t_interest){
	var t_zivil=0;
	var t_konf=0;
	if(t_union==2){
		t_zivil=c_StC_natPers.m_Zivilstand_VERHEIRATET;
	}else{
		if(t_union==4){
			t_zivil=c_StC_natPers.m_Zivilstand_EINGETR_PARTNERSCHAFT;
		}else{
			t_zivil=c_StC_natPers.m_Zivilstand_LEDIG;
		}
	}
	t_konf=c_StC_natPers.m_Konfession_KONFESSIONSLOS;
	var t_stEkBund=c_API.m_calcTaxableIncome(false,t_locality,t_age,t_zivil,t_konf,t_children,t_income,t_is_empl);
	var t_stEkKant=c_API.m_calcTaxableIncome(true,t_locality,t_age,t_zivil,t_konf,t_children,t_income,t_is_empl);
	var t_pension=bb_ahv_werte_getPensionsalter((c_API.m_getBsvLaw()),t_gender,t_year-t_age);
	var t_dauer=t_pension-t_age;
	if(t_dauer<1 || t_premium<1.0){
		return [0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0];
	}
	var t_rechner=c_S3aSparen.m_new.call(new c_S3aSparen);
	t_rechner.p_berechne(t_locality,t_zivil,t_konf,t_children,t_stEkKant,t_stEkBund,((t_premium)|0),t_dauer,t_interest,t_gender,t_pension,t_year,0,0);
	var t_index=t_rechner.m__stand.p_length()-1;
	var t_stand=object_downcast((t_rechner.m__stand.p_getObject(t_index)),c_S3aStandJahr);
	return [t_premium*(t_dauer),t_stand.m__zinsen,t_rechner.m__einspn,t_rechner.m__kapbrut,t_rechner.m__kapsteuer,t_rechner.m__kapnet,t_rechner.m__rendnet,(t_dauer)];
}
c_API.m_calcSparenJSON=function(t_data){
	try{
		var t_js=c_JsonObject.m_new3.call(new c_JsonObject,t_data);
		var t_year=c_JSonHelper.m_I(t_js,"year");
		var t_union=c_JSonHelper.m_I(t_js,"union");
		var t_gender=c_JSonHelper.m_I(t_js,"gender");
		var t_age=c_JSonHelper.m_I(t_js,"age");
		var t_children=c_JSonHelper.m_I(t_js,"children");
		var t_income=c_JSonHelper.m_F(t_js,"income");
		var t_is_empl=c_JSonHelper.m_B(t_js,"is_empl");
		var t_has_bvg=c_JSonHelper.m_B(t_js,"has_bvg");
		var t_locality=c_JSonHelper.m_I(t_js,"locality");
		var t_premium=c_JSonHelper.m_F(t_js,"premium");
		var t_interest=c_JSonHelper.m_F(t_js,"interest");
		return c_API.m_calcSparen(t_year,t_union,t_gender,t_age,t_children,t_income,t_is_empl,t_has_bvg,t_locality,t_premium,t_interest);
	}catch(_eek_){
		if(t_ex=object_downcast(_eek_,c_JsonError)){
		}else{
			throw _eek_;
		}
	}
	return [0.0,0.0,0.0,0.0,0.0,0.0,0.0];
}
c_API.m_calcSparenJSON2=function(t_data){
	var t_v=c_API.m_calcSparenJSON(t_data);
	var t_result=c_JsonObject.m_new.call(new c_JsonObject);
	t_result.p_SetFloat("deposit_sum",t_v[0]);
	t_result.p_SetFloat("yield_sum",t_v[1]);
	t_result.p_SetFloat("tax_gain_sum",t_v[2]);
	t_result.p_SetFloat("capital_gross",t_v[3]);
	t_result.p_SetFloat("capital_tax",t_v[4]);
	t_result.p_SetFloat("capital_net",t_v[5]);
	t_result.p_SetFloat("yield_net",t_v[6]);
	t_result.p_SetFloat("duration",t_v[7]);
	return t_result.p_ToJson();
}
c_API.m_calcRisiko=function(t_year,t_union,t_gender,t_age,t_children,t_income,t_is_empl,t_has_bvg,t_need_disab,t_need_death){
	var t_calculator=null;
	var t_analyser=null;
	var t_birth=t_year-t_age;
	var t_eu_iv=.0;
	var t_eu_bvg=.0;
	var t_eu_sum=.0;
	var t_eu_miss=.0;
	t_calculator=c_PrecautionCalculatorV2.m_new.call(new c_PrecautionCalculatorV2,t_year,1,0,3,2,(c_API.m_getBsvLaw()));
	t_calculator.p_setPerson(0,t_gender,t_birth,t_income,false);
	t_calculator.p_setChildren(0,t_children,t_children);
	t_calculator.p_setAHVmode(0,5,0.0,0.0);
	if(t_has_bvg){
		t_calculator.p_setBVGlimit(0,1,0.0,0.0);
	}else{
		t_calculator.p_setBVGlimit(0,0,0.0,0.0);
	}
	if(t_calculator.p_validScenario()){
		t_calculator.p_calculateAll();
		t_analyser=c_PrecautionAnalyserV2.m_new.call(new c_PrecautionAnalyserV2,t_calculator,t_need_disab,0.0,0.0,false);
		t_eu_iv=t_analyser.m_rente_iv;
		t_eu_bvg=t_analyser.m_rente_bvg;
		t_eu_sum=t_eu_iv+t_eu_bvg;
		t_eu_miss=t_need_disab-t_eu_sum;
		if(t_eu_miss<0.0){
			t_eu_miss=0.0;
		}
	}
	var t_tod_ahv=.0;
	var t_tod_bvg=.0;
	var t_tod_sum=.0;
	var t_tod_miss=.0;
	t_calculator=c_PrecautionCalculatorV2.m_new.call(new c_PrecautionCalculatorV2,t_year,t_union,t_year-5,5,2,(c_API.m_getBsvLaw()));
	t_calculator.p_setPerson(0,t_gender,t_birth,t_income,false);
	t_calculator.p_setChildren(0,t_children,t_children);
	t_calculator.p_setAHVmode(0,5,0.0,0.0);
	t_calculator.p_setBVGlimit(0,1,0.0,0.0);
	if(t_union!=1){
		var t_gender2=0;
		if(t_gender==1){
			t_gender2=2;
		}else{
			t_gender2=1;
		}
		t_calculator.p_setPerson(1,t_gender2,t_birth,0.0,false);
		t_calculator.p_setChildren(1,t_children,t_children);
		t_calculator.p_setAHVmode(1,5,0.0,0.0);
		t_calculator.p_setBVGlimit(1,0,0.0,0.0);
	}
	if(t_calculator.p_validScenario()){
		t_calculator.p_calculateAll();
		t_analyser=c_PrecautionAnalyserV2.m_new.call(new c_PrecautionAnalyserV2,t_calculator,t_need_death,0.0,0.0,false);
		t_tod_ahv=t_analyser.m_rente_ahv;
		t_tod_bvg=t_analyser.m_rente_bvg;
		t_tod_sum=t_tod_ahv+t_tod_bvg;
		t_tod_miss=t_need_death-t_tod_sum;
		if(t_tod_miss<0.0){
			t_tod_miss=0.0;
		}
	}
	return [t_eu_iv,t_eu_bvg,t_eu_sum,t_eu_miss,t_tod_ahv,t_tod_bvg,t_tod_sum,t_tod_miss];
}
c_API.m_calcRisikoJSON=function(t_data){
	try{
		var t_js=c_JsonObject.m_new3.call(new c_JsonObject,t_data);
		var t_year=c_JSonHelper.m_I(t_js,"year");
		var t_union=c_JSonHelper.m_I(t_js,"union");
		var t_gender=c_JSonHelper.m_I(t_js,"gender");
		var t_age=c_JSonHelper.m_I(t_js,"age");
		var t_children=c_JSonHelper.m_I(t_js,"children");
		var t_income=c_JSonHelper.m_F(t_js,"income");
		var t_is_empl=c_JSonHelper.m_B(t_js,"is_empl");
		var t_has_bvg=c_JSonHelper.m_B(t_js,"has_bvg");
		var t_need_disab=c_JSonHelper.m_F(t_js,"need_disab");
		var t_need_death=c_JSonHelper.m_F(t_js,"need_death");
		return c_API.m_calcRisiko(t_year,t_union,t_gender,t_age,t_children,t_income,t_is_empl,t_has_bvg,t_need_disab,t_need_death);
	}catch(_eek_){
		if(t_ex=object_downcast(_eek_,c_JsonError)){
		}else{
			throw _eek_;
		}
	}
	return [0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0];
}
c_API.m_calcRisikoJSON2=function(t_data){
	var t_v=c_API.m_calcRisikoJSON(t_data);
	var t_result=c_JsonObject.m_new.call(new c_JsonObject);
	t_result.p_SetFloat("disab_iv",t_v[0]);
	t_result.p_SetFloat("disab_bvg",t_v[1]);
	t_result.p_SetFloat("disab_sum",t_v[2]);
	t_result.p_SetFloat("disab_miss",t_v[3]);
	t_result.p_SetFloat("death_ahv",t_v[4]);
	t_result.p_SetFloat("death_bvg",t_v[5]);
	t_result.p_SetFloat("death_sum",t_v[6]);
	t_result.p_SetFloat("death_miss",t_v[7]);
	return t_result.p_ToJson();
}
c_API.m_initPrototypes=function(){
	var t_i=0;
	if(t_i==1){
		c_API.m_loadFrom("");
		c_API.m_isValid();
		c_API.m_getBsvLaw();
		c_API.m_getTaxBaseStand();
		c_API.m_getTaxBaseStandDate();
		c_API.m_searchLocations("",0,0);
		c_API.m_getLocationInfo(0);
		var t_cCalc=c_StC_natPers_BasisRechner.m_new2.call(new c_StC_natPers_BasisRechner,c_StRWLoader.m__current_rw);
		t_cCalc.p_loadSteuerort2(0);
		t_cCalc.p_searchSteuerort("",0,0,0);
		var t_=t_cCalc.m__liststort.p_ObjectEnumerator();
		while(t_.p_HasNext()){
			var t_objct=t_.p_NextObject();
		}
		var t_o=c_StCOrt.m_new4.call(new c_StCOrt);
		t_o.p__kt();
		t_o.p__id();
		t_o.p__name();
		t_o.p__plz();
		t_o.p__land();
		c_API.m_getMax3AmitBVG();
		c_API.m_getMax3AohneBVG();
		c_API.m_calcSparenJSON("");
		c_API.m_calcSparenJSON2("");
		c_API.m_calcSparen(0,0,0,0,0,0.0,true,true,0,0.0,0.0);
		c_API.m_calcTaxableIncome(true,0,0,0,0,0,0.0,true);
		c_API.m_calcRisikoJSON("");
		c_API.m_calcRisikoJSON2("");
		c_API.m_calcRisiko(0,0,0,0,0,0.0,true,true,0.0,0.0);
	}
}
c_API.m_new=function(){
	return this;
}
function c_StRWLoader(){
	Object.call(this);
}
c_StRWLoader.m__last_base="";
c_StRWLoader.m__last_remote=false;
c_StRWLoader.m__st_vers="";
c_StRWLoader.m__st_minvers="";
c_StRWLoader.m__st_maxvers="";
c_StRWLoader.m_reset=function(){
	c_StRWLoader.m__last_base="";
	c_StRWLoader.m__last_remote=false;
	c_StRWLoader.m__st_vers="";
	c_StRWLoader.m__st_minvers=c_CompilerVars.m_get("TAXMINVERS");
	c_StRWLoader.m__st_maxvers=c_CompilerVars.m_get("TAXMAXVERS");
}
c_StRWLoader.m_initVersion=function(t_sContent){
	if(t_sContent!=""){
		try{
			var t_js=c_JsonObject.m_new3.call(new c_JsonObject,t_sContent);
			var t_v=t_js.p_Get("version",null);
			if(t_v!=null){
				c_StRWLoader.m__st_vers=t_v.p_StringValue();
				return true;
			}
		}catch(_eek_){
			if(t_err=object_downcast(_eek_,ThrowableObject)){
			}else{
				throw _eek_;
			}
		}
	}
	return false;
}
c_StRWLoader.m_readVersion=function(){
	if(c_StRWLoader.m_initVersion(bb_systools_getFileContentFromLT4(c_StRWLoader.m__last_base+"tax_version.lt4"))){
		return true;
	}
	if(c_StRWLoader.m_initVersion(bb_systools_getFileContent(c_StRWLoader.m__last_base+"tax_version.json"))){
		return true;
	}
	return false;
}
c_StRWLoader.m__current_rw=null;
c_StRWLoader.m_executeLoad=function(){
	try{
		if(c_StRWLoader.m_readVersion()==false){
			return false;
		}
		var t_n="";
		if(c_StRWLoader.m__last_remote==false){
			t_n=c_StRWLoader.m__last_base+"tax_"+c_StRWLoader.m__st_vers+"_full";
		}else{
			t_n=c_StRWLoader.m__last_base+"tax_"+c_StRWLoader.m__st_vers+"_pbase";
		}
		c_LDebug.m_info("version "+c_StRWLoader.m__st_vers);
		var t_mustDecodeUTF8=true;
		var t_sContent="";
		t_sContent=bb_systools_getFileContentFromLT4(t_n+".lt4");
		if(t_sContent==""){
			t_mustDecodeUTF8=false;
			t_sContent=bb_systools_getFileContent(t_n+".json");
		}
		if(t_sContent!=""){
			var t_strw=c_StRWerk.m_new.call(new c_StRWerk);
			if(t_strw.p_init(t_sContent,t_mustDecodeUTF8)){
				c_StRWLoader.m__current_rw=t_strw;
				return true;
			}
		}
	}catch(_eek_){
		if(t_err=object_downcast(_eek_,ThrowableObject)){
			c_LDebug.m_error("StRWLoader.loadFrom - unknown exception");
		}else{
			throw _eek_;
		}
	}
	return false;
}
c_StRWLoader.m_loadFromURL=function(t_sPath){
	c_StRWLoader.m_reset();
	c_LDebug.m_info("StRWLoader.loadFromURL "+t_sPath);
	c_StRWLoader.m__last_remote=true;
	c_StRWLoader.m__last_base=t_sPath+"/";
	return c_StRWLoader.m_executeLoad();
}
c_StRWLoader.m_isValid=function(){
	if(c_StRWLoader.m__current_rw!=null){
		if(c_StRWLoader.m__current_rw.p_isValid()){
			return true;
		}
	}
	return false;
}
c_StRWLoader.m_lazyloadKt=function(t_strw,t_idkt,t_sKt){
	if(c_StRWLoader.m_isValid()==false){
		return false;
	}
	c_LDebug.m_info("StRWLoader.lazyloadKt "+t_sKt);
	try{
		var t_n=c_StRWLoader.m__last_base+"tax_"+c_StRWLoader.m__st_vers+"_p"+t_sKt.toLowerCase();
		var t_mustDecodeUTF8=true;
		var t_sContent="";
		t_sContent=bb_systools_getFileContentFromLT4(t_n+".lt4");
		if(t_sContent==""){
			t_mustDecodeUTF8=false;
			t_sContent=bb_systools_getFileContent(t_n+".json");
		}
		if(t_sContent!=""){
			return c_StRWLoader.m__current_rw.p_initKt(t_sContent,t_idkt,t_mustDecodeUTF8);
		}
	}catch(_eek_){
		if(t_err=object_downcast(_eek_,ThrowableObject)){
			c_LDebug.m_error("lazyloadKt - unknown exception");
		}else{
			throw _eek_;
		}
	}
	return false;
}
c_StRWLoader.m_clear=function(){
	c_StRWLoader.m_reset();
	c_StRWLoader.m__current_rw=null;
}
c_StRWLoader.m_loadFrom=function(t_sPath){
	c_StRWLoader.m_reset();
	c_LDebug.m_info("StRWLoader.loadFrom "+t_sPath);
	if(string_startswith(t_sPath,"http:") || string_startswith(t_sPath,"https:")){
		c_StRWLoader.m__last_remote=true;
		c_StRWLoader.m__last_base=t_sPath+"/";
	}else{
		c_StRWLoader.m__last_remote=false;
		c_StRWLoader.m__last_base=t_sPath+"\\";
	}
	return c_StRWLoader.m_executeLoad();
}
function c_CompilerVars(){
	Object.call(this);
}
c_CompilerVars.m_get=function(t_sKey){
	return jsCompilerVarGet(t_sKey);
}
function c_LDebug(){
	Object.call(this);
}
c_LDebug.m__printlevel=0;
c_LDebug.m_out=function(t_s,t_level){
	if(c_LDebug.m__printlevel>=t_level){
		print(t_s);
	}
}
c_LDebug.m_info=function(t_s){
	c_LDebug.m_out(t_s,3);
}
c_LDebug.m__lasterror="";
c_LDebug.m_error=function(t_s){
	c_LDebug.m__lasterror="ERROR: "+t_s;
	if(c_LDebug.m__printlevel>=1){
		print(c_LDebug.m__lasterror);
	}
}
c_LDebug.m_stop=function(){
}
c_LDebug.m_exception=function(t_scope,t_e){
	c_LDebug.m__lasterror=t_scope+" EXCEPTION: "+t_e.m__error;
	if(c_LDebug.m__printlevel>=1){
		print(c_LDebug.m__lasterror);
	}
}
function bb_systools_getFileContent(t_sFile){
	try{
		return jsLoadStringFromURL(t_sFile);
	}catch(_eek_){
		if(t_err=object_downcast(_eek_,ThrowableObject)){
			c_LDebug.m_error("unknown exception in getFileContent");
		}else{
			throw _eek_;
		}
	}
	return "";
}
function c_Base64(){
	Object.call(this);
}
c_Base64.m_Dime=[];
c_Base64.m_MIME="";
c_Base64.m_decode=function(t_mime){
	if(!((c_Base64.m_Dime).length!=0)){
		c_Base64.m_Dime=new_number_array(256);
		for(var t_i=0;t_i<=63;t_i=t_i+1){
			c_Base64.m_Dime[c_Base64.m_MIME.charCodeAt(t_i)]=t_i;
		}
	}
	var t_bytes=[];
	var t_length=t_mime.length;
	var t_pad=0;
	var t_i2=0;
	var t_p=0;
	if(t_mime.charCodeAt(t_length-1)==61){
		t_pad=1;
		if(t_mime.charCodeAt(t_length-2)==61){
			t_pad=2;
		}
	}
	t_length=((t_length/4)|0)*3;
	t_bytes=new_number_array(t_length);
	while(t_i2<t_length){
		var t_b0=c_Base64.m_Dime[t_mime.charCodeAt(t_p)];
		var t_b1=c_Base64.m_Dime[t_mime.charCodeAt(t_p+1)];
		var t_b2=c_Base64.m_Dime[t_mime.charCodeAt(t_p+2)];
		var t_b3=c_Base64.m_Dime[t_mime.charCodeAt(t_p+3)];
		var t_b24=t_b0<<18|t_b1<<12|t_b2<<6|t_b3;
		t_bytes[t_i2+0]=t_b24>>16&255;
		t_bytes[t_i2+1]=t_b24>>8&255;
		t_bytes[t_i2+2]=t_b24&255;
		t_p+=4;
		t_i2+=3;
	}
	if((t_pad)!=0){
		t_bytes=resize_number_array(t_bytes,t_length-t_pad);
	}
	return t_bytes;
}
function c_LZ4(){
	Object.call(this);
}
c_LZ4.m_decompress=function(t_input){
	var t_i=0;
	var t_n=0;
	var t_output=c_DynamicArray.m_new.call(new c_DynamicArray);
	t_i=0;
	t_n=t_input.length;
	while(t_i<t_n){
		var t_token=t_input.charCodeAt(t_i);
		t_i=t_i+1;
		var t_literals_length=t_token>>4;
		if(t_literals_length>0){
			var t_l=t_literals_length+240;
			while(t_l==255){
				t_l=t_input.charCodeAt(t_i);
				t_i=t_i+1;
				t_literals_length+=t_l;
			}
			var t__end=t_i+t_literals_length;
			while(t_i<t__end && t_i<t_n){
				t_output.p_add(t_input.charCodeAt(t_i));
				t_i=t_i+1;
			}
			if(t_i==t_n){
				return string_fromchars(t_output.p_getArray());
			}
		}
		var t_offset=t_input.charCodeAt(t_i)|t_input.charCodeAt(t_i+1)<<8;
		t_i=t_i+2;
		if(t_offset==0 || t_offset>t_output.p_length()){
			print("Fehler an Position "+String(t_i-2)+", offset = "+String(t_offset)+", j = "+String(t_output.p_length()));
			return "";
		}
		var t_match_length=t_token&15;
		var t_l2=t_match_length+240;
		while(t_l2==255){
			t_l2=t_input.charCodeAt(t_i);
			t_i=t_i+1;
			t_match_length+=t_l2;
		}
		var t_pos=t_output.p_length()-t_offset;
		var t__end2=t_output.p_length()+t_match_length+4;
		while(t_output.p_length()<t__end2){
			t_output.p_add(t_output.p_get(t_pos));
			t_pos=t_pos+1;
		}
	}
	return string_fromchars(t_output.p_getArray());
}
c_LZ4.m_decompress2=function(t_input){
	return c_LZ4.m_decompress(string_fromchars(t_input));
}
function c_DynamicArray(){
	Object.call(this);
	this.m__len=0;
	this.m__sz=0;
	this.m__i=[];
}
c_DynamicArray.prototype.p_clear=function(){
	this.m__len=0;
	this.m__sz=10;
	this.m__i=new_number_array(this.m__sz);
}
c_DynamicArray.m_new=function(){
	this.p_clear();
	return this;
}
c_DynamicArray.prototype.p_add=function(t_elt){
	this.m__len+=1;
	if(this.m__len>this.m__sz){
		this.m__sz=this.m__sz*2;
		this.m__i=resize_number_array(this.m__i,this.m__sz);
	}
	this.m__i[this.m__len-1]=t_elt;
}
c_DynamicArray.prototype.p_getArray=function(){
	return this.m__i.slice(0,this.m__len);
}
c_DynamicArray.prototype.p_length=function(){
	return this.m__len;
}
c_DynamicArray.prototype.p_get=function(t_i){
	var t_oNULL=0;
	if(t_i>=0 && t_i<this.m__len){
		return this.m__i[t_i];
	}
	return t_oNULL;
}
function bb_systools_getFileContentFromLT4(t_sFile){
	var t_str=bb_systools_getFileContent(t_sFile);
	if(t_str!=""){
		return c_LZ4.m_decompress2(c_Base64.m_decode(t_str));
	}
	return "";
}
function c_JsonValue(){
	Object.call(this);
}
c_JsonValue.m_new=function(){
	return this;
}
c_JsonValue.prototype.p_StringValue=function(){
	bb_json_ThrowError();
	return "";
}
c_JsonValue.prototype.p_IntValue=function(){
	bb_json_ThrowError();
	return 0;
}
c_JsonValue.prototype.p_FloatValue=function(){
	bb_json_ThrowError();
	return 0;
}
c_JsonValue.prototype.p_BoolValue=function(){
	bb_json_ThrowError();
	return false;
}
c_JsonValue.prototype.p_PushJson=function(t_buf){
	t_buf.p_Push(this.p_ToJson());
}
c_JsonValue.prototype.p_ToJson=function(){
	var t_buf=c_StringStack.m_new2.call(new c_StringStack);
	this.p_PushJson(t_buf);
	return t_buf.p_Join("");
}
function c_JsonObject(){
	c_JsonValue.call(this);
	this.m__data=null;
}
c_JsonObject.prototype=extend_class(c_JsonValue);
c_JsonObject.m_new=function(){
	c_JsonValue.m_new.call(this);
	this.m__data=c_StringMap.m_new.call(new c_StringMap);
	return this;
}
c_JsonObject.m_new2=function(t_data){
	c_JsonValue.m_new.call(this);
	this.m__data=t_data;
	return this;
}
c_JsonObject.m_new3=function(t_json){
	c_JsonValue.m_new.call(this);
	this.m__data=(c_JsonParser.m_new.call(new c_JsonParser,t_json)).p_ParseObject();
	return this;
}
c_JsonObject.prototype.p_Get=function(t_key,t_defval){
	if(!this.m__data.p_Contains(t_key)){
		return t_defval;
	}
	var t_val=this.m__data.p_Get2(t_key);
	if((t_val)!=null){
		return t_val;
	}
	return (c_JsonNull.m_Instance());
}
c_JsonObject.prototype.p_GetInt=function(t_key,t_defval){
	if(!this.m__data.p_Contains(t_key)){
		return t_defval;
	}
	return this.p_Get(t_key,null).p_IntValue();
}
c_JsonObject.prototype.p_GetFloat=function(t_key,t_defval){
	if(!this.m__data.p_Contains(t_key)){
		return t_defval;
	}
	return this.p_Get(t_key,null).p_FloatValue();
}
c_JsonObject.prototype.p_GetBool=function(t_key,t_defval){
	if(!this.m__data.p_Contains(t_key)){
		return t_defval;
	}
	return this.p_Get(t_key,null).p_BoolValue();
}
c_JsonObject.prototype.p_Set=function(t_key,t_value){
	this.m__data.p_Set(t_key,t_value);
}
c_JsonObject.prototype.p_SetFloat=function(t_key,t_value){
	this.p_Set(t_key,(c_JsonNumber.m_new.call(new c_JsonNumber,String(t_value))));
}
c_JsonObject.prototype.p_PushJson=function(t_buf){
	t_buf.p_Push("{");
	var t_t=false;
	var t_=this.m__data.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_it=t_.p_NextObject();
		if(t_t){
			t_buf.p_Push(",");
		}
		t_buf.p_Push("\""+string_replace(t_it.p_Key(),"\"","\\\"")+"\":");
		if(t_it.p_Value()!=null){
			t_it.p_Value().p_PushJson(t_buf);
		}else{
			t_buf.p_Push("null");
		}
		t_t=true;
	}
	t_buf.p_Push("}");
}
function c_Map(){
	Object.call(this);
	this.m_root=null;
}
c_Map.m_new=function(){
	return this;
}
c_Map.prototype.p_Compare=function(t_lhs,t_rhs){
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
c_Map.prototype.p_Set=function(t_key,t_value){
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
				t_node.m_value=t_value;
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
c_Map.prototype.p_Contains=function(t_key){
	return this.p_FindNode(t_key)!=null;
}
c_Map.prototype.p_Get2=function(t_key){
	var t_node=this.p_FindNode(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return null;
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
c_Map.prototype.p_ObjectEnumerator=function(){
	return c_NodeEnumerator.m_new.call(new c_NodeEnumerator,this.p_FirstNode());
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
function c_JsonParser(){
	Object.call(this);
	this.m__text="";
	this.m__pos=0;
	this.m__toke="";
	this.m__type=0;
}
c_JsonParser.prototype.p_GetChar=function(){
	if(this.m__pos==this.m__text.length){
		bb_json_ThrowError();
	}
	this.m__pos+=1;
	return this.m__text.charCodeAt(this.m__pos-1);
}
c_JsonParser.prototype.p_CParseDigits=function(){
	var t_p=this.m__pos;
	while(this.m__pos<this.m__text.length && this.m__text.charCodeAt(this.m__pos)>=48 && this.m__text.charCodeAt(this.m__pos)<=57){
		this.m__pos+=1;
	}
	return this.m__pos>t_p;
}
c_JsonParser.prototype.p_CParseChar=function(t_chr){
	if(this.m__pos>=this.m__text.length || this.m__text.charCodeAt(this.m__pos)!=t_chr){
		return false;
	}
	this.m__pos+=1;
	return true;
}
c_JsonParser.prototype.p_PeekChar=function(){
	if(this.m__pos==this.m__text.length){
		return 0;
	}
	return this.m__text.charCodeAt(this.m__pos);
}
c_JsonParser.prototype.p_Bump=function(){
	while(this.m__pos<this.m__text.length && this.m__text.charCodeAt(this.m__pos)<=32){
		this.m__pos+=1;
	}
	if(this.m__pos==this.m__text.length){
		this.m__toke="";
		this.m__type=0;
		return this.m__toke;
	}
	var t_pos=this.m__pos;
	var t_chr=this.p_GetChar();
	if(t_chr==34){
		do{
			var t_chr2=this.p_GetChar();
			if(t_chr2==34){
				break;
			}
			if(t_chr2==92){
				this.p_GetChar();
			}
		}while(!(false));
		this.m__type=1;
	}else{
		if(t_chr==45 || t_chr>=48 && t_chr<=57){
			if(t_chr==45){
				t_chr=this.p_GetChar();
				if(t_chr<48 || t_chr>57){
					bb_json_ThrowError();
				}
			}
			if(t_chr!=48){
				this.p_CParseDigits();
			}
			if(this.p_CParseChar(46)){
				this.p_CParseDigits();
			}
			if(this.p_CParseChar(69) || this.p_CParseChar(101)){
				if(this.p_PeekChar()==43 || this.p_PeekChar()==45){
					this.p_GetChar();
				}
				if(!this.p_CParseDigits()){
					bb_json_ThrowError();
				}
			}
			this.m__type=2;
		}else{
			if(t_chr>=65 && t_chr<91 || t_chr>=97 && t_chr<123){
				t_chr=this.p_PeekChar();
				while(t_chr>=65 && t_chr<91 || t_chr>=97 && t_chr<123){
					this.p_GetChar();
					t_chr=this.p_PeekChar();
				}
				this.m__type=4;
			}else{
				this.m__type=3;
			}
		}
	}
	this.m__toke=this.m__text.slice(t_pos,this.m__pos);
	return this.m__toke;
}
c_JsonParser.m_new=function(t_json){
	this.m__text=t_json;
	this.p_Bump();
	return this;
}
c_JsonParser.m_new2=function(){
	return this;
}
c_JsonParser.prototype.p_CParse=function(t_toke){
	if(t_toke!=this.m__toke){
		return false;
	}
	this.p_Bump();
	return true;
}
c_JsonParser.prototype.p_Parse=function(t_toke){
	if(!this.p_CParse(t_toke)){
		bb_json_ThrowError();
	}
}
c_JsonParser.prototype.p_TokeType=function(){
	return this.m__type;
}
c_JsonParser.prototype.p_Toke=function(){
	return this.m__toke;
}
c_JsonParser.prototype.p_ParseString=function(){
	if(this.p_TokeType()!=1){
		bb_json_ThrowError();
	}
	var t_toke=this.p_Toke().slice(1,-1);
	var t_i=t_toke.indexOf("\\",0);
	if(t_i!=-1){
		var t_frags=c_StringStack.m_new2.call(new c_StringStack);
		var t_p=0;
		var t_esc="";
		do{
			if(t_i+1>=t_toke.length){
				bb_json_ThrowError();
			}
			t_frags.p_Push(t_toke.slice(t_p,t_i));
			var t_1=t_toke.charCodeAt(t_i+1);
			if(t_1==34){
				t_esc="\"";
			}else{
				if(t_1==92){
					t_esc="\\";
				}else{
					if(t_1==47){
						t_esc="/";
					}else{
						if(t_1==98){
							t_esc=String.fromCharCode(8);
						}else{
							if(t_1==102){
								t_esc=String.fromCharCode(12);
							}else{
								if(t_1==114){
									t_esc=String.fromCharCode(13);
								}else{
									if(t_1==110){
										t_esc=String.fromCharCode(10);
									}else{
										if(t_1==117){
											if(t_i+6>t_toke.length){
												bb_json_ThrowError();
											}
											var t_val=0;
											for(var t_j=2;t_j<6;t_j=t_j+1){
												var t_chr=t_toke.charCodeAt(t_i+t_j);
												if(t_chr>=48 && t_chr<58){
													t_val=t_val<<4|t_chr-48;
												}else{
													if(t_chr>=65 && t_chr<123){
														t_chr&=31;
														if(t_chr<1 || t_chr>6){
															bb_json_ThrowError();
														}
														t_val=t_val<<4|t_chr+9;
													}else{
														bb_json_ThrowError();
													}
												}
											}
											t_esc=String.fromCharCode(t_val);
											t_i+=4;
										}else{
											bb_json_ThrowError();
										}
									}
								}
							}
						}
					}
				}
			}
			t_frags.p_Push(t_esc);
			t_p=t_i+2;
			t_i=t_toke.indexOf("\\",t_p);
			if(t_i!=-1){
				continue;
			}
			t_frags.p_Push(t_toke.slice(t_p));
			break;
		}while(!(false));
		t_toke=t_frags.p_Join("");
	}
	this.p_Bump();
	return t_toke;
}
c_JsonParser.prototype.p_ParseNumber=function(){
	if(this.p_TokeType()!=2){
		bb_json_ThrowError();
	}
	var t_toke=this.p_Toke();
	this.p_Bump();
	return t_toke;
}
c_JsonParser.prototype.p_ParseArray=function(){
	this.p_Parse("[");
	if(this.p_CParse("]")){
		return [];
	}
	var t_stack=c_Stack2.m_new.call(new c_Stack2);
	do{
		var t_value=this.p_ParseValue();
		t_stack.p_Push4(t_value);
	}while(!(!this.p_CParse(",")));
	this.p_Parse("]");
	return t_stack.p_ToArray();
}
c_JsonParser.prototype.p_ParseValue=function(){
	if(this.p_TokeType()==1){
		return (c_JsonString.m_Instance(this.p_ParseString()));
	}
	if(this.p_TokeType()==2){
		return (c_JsonNumber.m_Instance(this.p_ParseNumber()));
	}
	if(this.p_Toke()=="{"){
		return (c_JsonObject.m_new2.call(new c_JsonObject,this.p_ParseObject()));
	}
	if(this.p_Toke()=="["){
		return (c_JsonArray.m_new2.call(new c_JsonArray,this.p_ParseArray()));
	}
	if(this.p_CParse("true")){
		return (c_JsonBool.m_Instance(true));
	}
	if(this.p_CParse("false")){
		return (c_JsonBool.m_Instance(false));
	}
	if(this.p_CParse("null")){
		return (c_JsonNull.m_Instance());
	}
	bb_json_ThrowError();
	return null;
}
c_JsonParser.prototype.p_ParseObject=function(){
	this.p_Parse("{");
	var t_map=c_StringMap.m_new.call(new c_StringMap);
	if(this.p_CParse("}")){
		return t_map;
	}
	do{
		var t_name=this.p_ParseString();
		this.p_Parse(":");
		var t_value=this.p_ParseValue();
		t_map.p_Set(t_name,t_value);
	}while(!(!this.p_CParse(",")));
	this.p_Parse("}");
	return t_map;
}
function c_JsonError(){
	ThrowableObject.call(this);
}
c_JsonError.prototype=extend_class(ThrowableObject);
c_JsonError.m_new=function(){
	return this;
}
function bb_json_ThrowError(){
	throw c_JsonError.m_new.call(new c_JsonError);
}
function c_Stack(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack.m_new=function(){
	return this;
}
c_Stack.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack.prototype.p_Push=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_string_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack.prototype.p_Push2=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push(t_values[t_offset+t_i]);
	}
}
c_Stack.prototype.p_Push3=function(t_values,t_offset){
	this.p_Push2(t_values,t_offset,t_values.length-t_offset);
}
c_Stack.prototype.p_ToArray=function(){
	var t_t=new_string_array(this.m_length);
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		t_t[t_i]=this.m_data[t_i];
	}
	return t_t;
}
function c_StringStack(){
	c_Stack.call(this);
}
c_StringStack.prototype=extend_class(c_Stack);
c_StringStack.m_new=function(t_data){
	c_Stack.m_new2.call(this,t_data);
	return this;
}
c_StringStack.m_new2=function(){
	c_Stack.m_new.call(this);
	return this;
}
c_StringStack.prototype.p_Join=function(t_separator){
	return this.p_ToArray().join(t_separator);
}
function c_JsonString(){
	c_JsonValue.call(this);
	this.m__value="";
}
c_JsonString.prototype=extend_class(c_JsonValue);
c_JsonString.m_new=function(t_value){
	c_JsonValue.m_new.call(this);
	this.m__value=t_value;
	return this;
}
c_JsonString.m_new2=function(){
	c_JsonValue.m_new.call(this);
	return this;
}
c_JsonString.m__null=null;
c_JsonString.m_Instance=function(t_value){
	if((t_value).length!=0){
		return c_JsonString.m_new.call(new c_JsonString,t_value);
	}
	return c_JsonString.m__null;
}
c_JsonString.prototype.p_StringValue=function(){
	return this.m__value;
}
c_JsonString.prototype.p_ToJson=function(){
	return "\""+string_replace(this.m__value,"\"","\\\"")+"\"";
}
function c_JsonNumber(){
	c_JsonValue.call(this);
	this.m__value="";
}
c_JsonNumber.prototype=extend_class(c_JsonValue);
c_JsonNumber.m_new=function(t_value){
	c_JsonValue.m_new.call(this);
	this.m__value=t_value;
	return this;
}
c_JsonNumber.m_new2=function(){
	c_JsonValue.m_new.call(this);
	return this;
}
c_JsonNumber.m__zero=null;
c_JsonNumber.m_Instance=function(t_value){
	if(t_value!="0"){
		return c_JsonNumber.m_new.call(new c_JsonNumber,t_value);
	}
	return c_JsonNumber.m__zero;
}
c_JsonNumber.prototype.p_IntValue=function(){
	return parseInt((this.m__value),10);
}
c_JsonNumber.prototype.p_FloatValue=function(){
	return parseFloat(this.m__value);
}
c_JsonNumber.prototype.p_ToJson=function(){
	return this.m__value;
}
function c_JsonArray(){
	c_JsonValue.call(this);
	this.m__data=[];
}
c_JsonArray.prototype=extend_class(c_JsonValue);
c_JsonArray.m_new=function(t_length){
	c_JsonValue.m_new.call(this);
	this.m__data=new_object_array(t_length);
	return this;
}
c_JsonArray.m_new2=function(t_data){
	c_JsonValue.m_new.call(this);
	this.m__data=t_data;
	return this;
}
c_JsonArray.m_new3=function(){
	c_JsonValue.m_new.call(this);
	return this;
}
c_JsonArray.prototype.p_Length=function(){
	return this.m__data.length;
}
c_JsonArray.prototype.p_Get3=function(t_index){
	if(t_index<0 || t_index>=this.m__data.length){
		bb_json_ThrowError();
	}
	var t_val=this.m__data[t_index];
	if((t_val)!=null){
		return t_val;
	}
	return (c_JsonNull.m_Instance());
}
c_JsonArray.prototype.p_GetFloat2=function(t_index){
	return this.p_Get3(t_index).p_FloatValue();
}
c_JsonArray.prototype.p_PushJson=function(t_buf){
	t_buf.p_Push("[");
	var t_t=false;
	var t_=this.m__data;
	var t_2=0;
	while(t_2<t_.length){
		var t_value=t_[t_2];
		t_2=t_2+1;
		if(t_t){
			t_buf.p_Push(",");
		}
		if(t_value!=null){
			t_value.p_PushJson(t_buf);
		}else{
			t_buf.p_Push("null");
		}
		t_t=true;
	}
	t_buf.p_Push("]");
}
function c_Stack2(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack2.m_new=function(){
	return this;
}
c_Stack2.m_new2=function(t_data){
	this.m_data=t_data.slice(0);
	this.m_length=t_data.length;
	return this;
}
c_Stack2.prototype.p_Push4=function(t_value){
	if(this.m_length==this.m_data.length){
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	this.m_data[this.m_length]=t_value;
	this.m_length+=1;
}
c_Stack2.prototype.p_Push5=function(t_values,t_offset,t_count){
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		this.p_Push4(t_values[t_offset+t_i]);
	}
}
c_Stack2.prototype.p_Push6=function(t_values,t_offset){
	this.p_Push5(t_values,t_offset,t_values.length-t_offset);
}
c_Stack2.prototype.p_ToArray=function(){
	var t_t=new_object_array(this.m_length);
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		t_t[t_i]=this.m_data[t_i];
	}
	return t_t;
}
function c_JsonBool(){
	c_JsonValue.call(this);
	this.m__value=false;
}
c_JsonBool.prototype=extend_class(c_JsonValue);
c_JsonBool.m_new=function(t_value){
	c_JsonValue.m_new.call(this);
	this.m__value=t_value;
	return this;
}
c_JsonBool.m_new2=function(){
	c_JsonValue.m_new.call(this);
	return this;
}
c_JsonBool.m__true=null;
c_JsonBool.m__false=null;
c_JsonBool.m_Instance=function(t_value){
	if(t_value){
		return c_JsonBool.m__true;
	}
	return c_JsonBool.m__false;
}
c_JsonBool.prototype.p_BoolValue=function(){
	return this.m__value;
}
c_JsonBool.prototype.p_ToJson=function(){
	if(this.m__value){
		return "true";
	}
	return "false";
}
function c_JsonNull(){
	c_JsonValue.call(this);
}
c_JsonNull.prototype=extend_class(c_JsonValue);
c_JsonNull.m_new=function(){
	c_JsonValue.m_new.call(this);
	return this;
}
c_JsonNull.m__instance=null;
c_JsonNull.m_Instance=function(){
	return c_JsonNull.m__instance;
}
c_JsonNull.prototype.p_ToJson=function(){
	return "null";
}
function c_Node(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
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
c_Node.prototype.p_Key=function(){
	return this.m_key;
}
c_Node.prototype.p_Value=function(){
	return this.m_value;
}
function c_RWBasis(){
	Object.call(this);
	this.m__uid=0;
	this.m__parent=null;
}
c_RWBasis.m__last_uid=0;
c_RWBasis.m_new=function(){
	c_RWBasis.m__last_uid=c_RWBasis.m__last_uid+1;
	this.m__uid=c_RWBasis.m__last_uid;
	return this;
}
c_RWBasis.m_S=function(t_o,t_s){
	try{
		var t_v=t_o.p_Get(t_s,null);
		if(t_v!=null){
			return t_v.p_StringValue();
		}
	}catch(_eek_){
		if(t_err=object_downcast(_eek_,ThrowableObject)){
			c_LDebug.m_error("RWBasis - "+t_s+" is not a string value");
		}else{
			throw _eek_;
		}
	}
	return "";
}
c_RWBasis.m_I=function(t_o,t_s){
	try{
		var t_v=t_o.p_Get(t_s,null);
		if(t_v!=null){
			return t_v.p_IntValue();
		}
	}catch(_eek_){
		if(t_err=object_downcast(_eek_,ThrowableObject)){
			c_LDebug.m_error("RWBasis - "+t_s+" is not an int value");
		}else{
			throw _eek_;
		}
	}
	return 0;
}
c_RWBasis.prototype.p_getNew=function(){
	throw c_LException.m_new.call(new c_LException,"RWBasis.getNew not implemented - must be inherited");
}
c_RWBasis.prototype.p_from=function(t_mustDecodeUTF8,t_o){
	throw c_LException.m_new.call(new c_LException,"RWBasis.from not implemented - must be inherited");
}
c_RWBasis.prototype.p_getUID=function(){
	return this.m__uid;
}
c_RWBasis.prototype.p_fromArray=function(t_mustDecodeUTF8,t_js,t_s,t_m,t_f,t_clearmap){
	if(t_clearmap){
		t_m.p_Clear();
	}
	var t_a=object_downcast((t_js.p_Get(t_s,null)),c_JsonArray);
	if(t_a!=null){
		for(var t_i=0;t_i<t_a.p_Length();t_i=t_i+1){
			var t_o=object_downcast((t_a.p_Get3(t_i)),c_JsonObject);
			if(t_o!=null){
				var t_p=t_f.p_getNew();
				t_p.m__parent=this;
				t_p.p_from(t_mustDecodeUTF8,t_o);
				if(t_m.p_Add(t_p.p_getUID(),t_p)==false){
					c_LDebug.m_error("Error adding in RWBasis.fromArray, "+t_s+" with UID "+String(t_p.p_getUID())+" already exists in map ");
				}
			}
		}
	}
}
c_RWBasis.prototype.p_fromArray2=function(t_mustDecodeUTF8,t_js,t_s,t_coll,t_f,t_clearcoll){
	if(t_clearcoll){
		t_coll.p_clear();
	}
	var t_a=object_downcast((t_js.p_Get(t_s,null)),c_JsonArray);
	if(t_a!=null){
		for(var t_i=0;t_i<t_a.p_Length();t_i=t_i+1){
			var t_o=object_downcast((t_a.p_Get3(t_i)),c_JsonObject);
			if(t_o!=null){
				var t_p=t_f.p_getNew();
				t_p.m__parent=this;
				t_p.p_from(t_mustDecodeUTF8,t_o);
				t_coll.p_add2(t_p);
			}
		}
		t_coll.p_sortArray(true);
	}
}
c_RWBasis.m_Sdecode=function(t_bDecode,t_o,t_s){
	if(t_bDecode){
		return c_UTF8.m_decodeString(c_RWBasis.m_S(t_o,t_s));
	}else{
		return c_RWBasis.m_S(t_o,t_s);
	}
}
c_RWBasis.m_F=function(t_o,t_s){
	try{
		var t_v=t_o.p_Get(t_s,null);
		if(t_v!=null){
			return t_v.p_FloatValue();
		}
	}catch(_eek_){
		if(t_err=object_downcast(_eek_,ThrowableObject)){
			c_LDebug.m_error("RWBasis - "+t_s+" is not a float value");
		}else{
			throw _eek_;
		}
	}
	return 0.0;
}
function c_StRWerk(){
	c_RWBasis.call(this);
	this.m__isInit=false;
	this.m__isFailed=false;
	this.m__storte=c_IntMap.m_new.call(new c_IntMap);
	this.m__stkt=c_IntMap.m_new.call(new c_IntMap);
	this.m__stgmd=c_IntMap.m_new.call(new c_IntMap);
	this.m__np_stprogr=c_IntMap.m_new.call(new c_IntMap);
	this.m__np_stabzug=c_IntMap.m_new.call(new c_IntMap);
	this.m__np_sts3bee=c_IntMap.m_new.call(new c_IntMap);
	this.m__np_strtab=c_IntMap.m_new.call(new c_IntMap);
	this.m__jp_stprogr=c_IntMap.m_new.call(new c_IntMap);
	this.m__jp_stabzug=c_IntMap.m_new.call(new c_IntMap);
	this.m__sprachcluster=c_IntMap.m_new.call(new c_IntMap);
	this.m__ststand="";
	this.m__stdatum="";
	this.m__erstesjahr=0;
	this.m__defaultjahr=0;
	this.m__stprogr=c_IntMap.m_new.call(new c_IntMap);
}
c_StRWerk.prototype=extend_class(c_RWBasis);
c_StRWerk.m_new=function(){
	c_RWBasis.m_new.call(this);
	return this;
}
c_StRWerk.prototype.p_clear=function(){
	this.m__isInit=false;
	this.m__isFailed=false;
	this.m__storte.p_Clear();
	this.m__stkt.p_Clear();
	this.m__stgmd.p_Clear();
	this.m__np_stprogr.p_Clear();
	this.m__np_stabzug.p_Clear();
	this.m__np_sts3bee.p_Clear();
	this.m__np_strtab.p_Clear();
	this.m__jp_stprogr.p_Clear();
	this.m__jp_stabzug.p_Clear();
	this.m__sprachcluster.p_Clear();
}
c_StRWerk.prototype.p_initSprachcluster=function(){
	var t_o=null;
	var t_cluster=null;
	var t_=this.m__storte.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_x=t_.p_NextObject();
		t_o=object_downcast((t_x),c_StROrt);
		if(t_o.m__sprachclusterid>0){
			t_cluster=object_downcast((this.m__sprachcluster.p_Get3(t_o.m__sprachclusterid)),c_StRSprachCluster);
			if(t_cluster==null){
				t_cluster=c_StRSprachCluster.m_new.call(new c_StRSprachCluster);
				t_cluster.m__sprachclusterid=t_o.m__sprachclusterid;
				this.m__sprachcluster.p_Add(t_cluster.p_getUID(),(t_cluster));
			}
			t_o.m__sprachcluster=t_cluster;
			t_cluster.m__storte.p_Add(t_o.p_getUID(),(t_o));
		}
	}
}
c_StRWerk.prototype.p_fill_jurPers=function(t_jp_stprogr){
	var t_stprogr=c_StRProgr.m_new.call(new c_StRProgr);
	t_stprogr.m__id=t_jp_stprogr.m__id;
	t_stprogr.m__typ=t_jp_stprogr.m__typ;
	t_stprogr.m__rtyp_steuerbar=t_jp_stprogr.m__rtyp_steuerbar;
	t_stprogr.m__rtyp_satzbest=t_jp_stprogr.m__rtyp_satzbest;
	t_stprogr.m__rbetr=t_jp_stprogr.m__rbetr;
	t_stprogr.m__pstep=t_jp_stprogr.m__pstep;
	var t_=t_jp_stprogr.m__werte.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_x=t_.p_NextObject();
		var t_jp_stprogr_wert=object_downcast((t_x),c_StR_jurPers_ProgrWert);
		if(t_jp_stprogr_wert!=null){
			var t_stprogr_wert=c_StRProgrWert.m_new.call(new c_StRProgrWert);
			t_stprogr_wert.m__num=t_jp_stprogr_wert.m__num;
			t_stprogr_wert.m__wert=t_jp_stprogr_wert.m__wert;
			t_stprogr_wert.m__prozent=t_jp_stprogr_wert.m__prozent;
			t_stprogr_wert.m__steuer=t_jp_stprogr_wert.m__steuer;
			t_stprogr_wert.m__formel=t_jp_stprogr_wert.m__formel;
			t_stprogr.m__werte.p_Add(t_jp_stprogr_wert.p_getUID(),(t_stprogr_wert));
		}
	}
	return t_stprogr;
}
c_StRWerk.prototype.p_fill_natPers=function(t_np_stprogr){
	var t_stprogr=c_StRProgr.m_new.call(new c_StRProgr);
	t_stprogr.m__id=t_np_stprogr.m__id;
	t_stprogr.m__typ=t_np_stprogr.m__typ;
	t_stprogr.m__rtyp_steuerbar=t_np_stprogr.m__rtyp_steuerbar;
	t_stprogr.m__rtyp_satzbest=t_np_stprogr.m__rtyp_satzbest;
	t_stprogr.m__rbetr=t_np_stprogr.m__rbetr;
	t_stprogr.m__pstep=t_np_stprogr.m__pstep;
	var t_=t_np_stprogr.m__werte.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_x=t_.p_NextObject();
		var t_np_stprogr_wert=object_downcast((t_x),c_StR_natPers_ProgrWert);
		if(t_np_stprogr_wert!=null){
			var t_stprogr_wert=c_StRProgrWert.m_new.call(new c_StRProgrWert);
			t_stprogr_wert.m__num=t_np_stprogr_wert.m__num;
			t_stprogr_wert.m__wert=t_np_stprogr_wert.m__wert;
			t_stprogr_wert.m__prozent=t_np_stprogr_wert.m__prozent;
			t_stprogr_wert.m__steuer=t_np_stprogr_wert.m__steuer;
			t_stprogr_wert.m__formel=t_np_stprogr_wert.m__formel;
			t_stprogr.m__werte.p_Add(t_np_stprogr_wert.p_getUID(),(t_stprogr_wert));
		}
	}
	return t_stprogr;
}
c_StRWerk.prototype.p_erstelleProgr=function(t__np_stprogr,t__jp_stprogr,t__stprogr){
	var t_=t__jp_stprogr.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_x=t_.p_NextObject();
		var t_o=object_downcast((t_x),c_StR_jurPers_Progr);
		var t_stprogr=null;
		c_StRProgr.m_new.call(new c_StRProgr);
		var t_jp_stprogr=object_downcast((t__jp_stprogr.p_Get3(t_o.m__id)),c_StR_jurPers_Progr);
		if(t_jp_stprogr!=null){
			t_stprogr=this.p_fill_jurPers(t_jp_stprogr);
			t__stprogr.p_Add(t_jp_stprogr.p_getUID(),(t_stprogr));
		}
	}
	var t_2=t__np_stprogr.p_Values().p_ObjectEnumerator();
	while(t_2.p_HasNext()){
		var t_x2=t_2.p_NextObject();
		var t_o2=object_downcast((t_x2),c_StR_natPers_Progr);
		var t_stprogr2=null;
		c_StRProgr.m_new.call(new c_StRProgr);
		var t_np_stprogr=object_downcast((t__np_stprogr.p_Get3(t_o2.m__id)),c_StR_natPers_Progr);
		if(t_np_stprogr!=null){
			t_stprogr2=this.p_fill_natPers(t_np_stprogr);
			t__stprogr.p_Add(t_np_stprogr.p_getUID(),(t_stprogr2));
		}
	}
}
c_StRWerk.prototype.p_init=function(t_sRWDataJson,t_mustDecodeUTF8){
	this.p_clear();
	if(t_sRWDataJson==""){
		this.m__isFailed=true;
		return false;
	}
	try{
		var t_js=c_JsonObject.m_new3.call(new c_JsonObject,t_sRWDataJson);
		this.m__ststand=c_RWBasis.m_S(t_js,"std");
		this.m__stdatum=c_RWBasis.m_S(t_js,"stddat");
		this.m__erstesjahr=c_RWBasis.m_I(t_js,"1jahr");
		this.m__defaultjahr=c_RWBasis.m_I(t_js,"defjahr");
		this.p_fromArray(t_mustDecodeUTF8,t_js,"StOrt",this.m__storte,(c_StROrt.m_new.call(new c_StROrt)),true);
		this.p_fromArray(t_mustDecodeUTF8,t_js,"Kt",this.m__stkt,(c_StRKt.m_new.call(new c_StRKt)),true);
		this.p_fromArray(t_mustDecodeUTF8,t_js,"Gmd",this.m__stgmd,(c_StRGmd.m_new.call(new c_StRGmd)),true);
		this.p_fromArray(t_mustDecodeUTF8,t_js,"natPers_Prog",this.m__np_stprogr,(c_StR_natPers_Progr.m_new.call(new c_StR_natPers_Progr)),true);
		this.p_fromArray(t_mustDecodeUTF8,t_js,"natPers_Abzg",this.m__np_stabzug,(c_StR_natPers_Abzg.m_new.call(new c_StR_natPers_Abzg)),true);
		this.p_fromArray(t_mustDecodeUTF8,t_js,"natPers_S3bEE",this.m__np_sts3bee,(c_StR_natPers_S3bEE.m_new.call(new c_StR_natPers_S3bEE)),true);
		this.p_fromArray(t_mustDecodeUTF8,t_js,"natPers_RTab",this.m__np_strtab,(c_StR_natPers_RTab.m_new.call(new c_StR_natPers_RTab)),true);
		this.p_fromArray(t_mustDecodeUTF8,t_js,"jurPers_Prog",this.m__jp_stprogr,(c_StR_jurPers_Progr.m_new.call(new c_StR_jurPers_Progr)),true);
		this.p_fromArray(t_mustDecodeUTF8,t_js,"jurPers_Abzg",this.m__jp_stabzug,(c_StR_jurPers_Abzg.m_new.call(new c_StR_jurPers_Abzg)),true);
		this.p_initSprachcluster();
		this.p_erstelleProgr(this.m__np_stprogr,this.m__jp_stprogr,this.m__stprogr);
		this.m__isInit=true;
		return true;
	}catch(_eek_){
		if(t_err1=object_downcast(_eek_,c_LException)){
			c_LDebug.m_exception("StRWerk.init",t_err1);
		}else if(t_err2=object_downcast(_eek_,ThrowableObject)){
			c_LDebug.m_error("StRWerk.init - unknown exception parsing json-data");
		}else{
			throw _eek_;
		}
	}
	this.p_clear();
	this.m__isFailed=true;
	return false;
}
c_StRWerk.prototype.p_isValid=function(){
	if(this.m__isInit==true && this.m__isFailed==false){
		return true;
	}
	return false;
}
c_StRWerk.prototype.p_clampJahr=function(t_jahr){
	if(t_jahr<1950){
		t_jahr=this.m__defaultjahr;
	}
	if(t_jahr<this.m__erstesjahr){
		t_jahr=this.m__erstesjahr;
	}
	return t_jahr;
}
c_StRWerk.prototype.p_getKtID=function(t_s){
	var t_k=null;
	var t_o=null;
	var t_=this.m__stkt.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		t_o=t_.p_NextObject();
		t_k=object_downcast((t_o),c_StRKt);
		if(t_k.m__kt==t_s){
			return t_k.m__id;
		}
	}
	return 0;
}
c_StRWerk.prototype.p_getSteuerort=function(t_iID){
	return object_downcast((this.m__storte.p_Get3(t_iID)),c_StROrt);
}
c_StRWerk.prototype.p_initKt=function(t_sRWDataJson,t_idkt,t_mustDecodeUTF8){
	if(t_sRWDataJson==""){
		return false;
	}
	try{
		var t_js=c_JsonObject.m_new3.call(new c_JsonObject,t_sRWDataJson);
		var t_aKt=object_downcast((t_js.p_Get("Kt",null)),c_JsonArray);
		if(t_aKt!=null){
			var t_o=object_downcast((t_aKt.p_Get3(0)),c_JsonObject);
			if(t_o!=null){
				var t_kt=object_downcast((this.m__stkt.p_Get3(t_idkt)),c_StRKt);
				t_kt.p_from(t_mustDecodeUTF8,t_o);
			}
		}
		this.p_fromArray(t_mustDecodeUTF8,t_js,"Gmd",this.m__stgmd,(c_StRGmd.m_new.call(new c_StRGmd)),false);
		return true;
	}catch(_eek_){
		if(t_err1=object_downcast(_eek_,c_LException)){
			c_LDebug.m_exception("StRWerk.initKt",t_err1);
		}else if(t_err2=object_downcast(_eek_,ThrowableObject)){
			c_LDebug.m_error("StRWerk.initKt - unknown exception parsing json-data");
		}else{
			throw _eek_;
		}
	}
	return false;
}
c_StRWerk.prototype.p_getKt=function(t_iID,t_shallow){
	var t_kt=object_downcast((this.m__stkt.p_Get3(t_iID)),c_StRKt);
	if(t_shallow==false){
		if(t_kt.m__loaded==false){
			c_StRWLoader.m_lazyloadKt(this,t_kt.m__id,t_kt.m__kt);
			return object_downcast((this.m__stkt.p_Get3(t_iID)),c_StRKt);
		}
	}
	return t_kt;
}
c_StRWerk.prototype.p_getGmd=function(t_iID){
	return object_downcast((this.m__stgmd.p_Get3(t_iID)),c_StRGmd);
}
c_StRWerk.prototype.p_isNatPersGruppe=function(t_iGrpID,t_iCurrentGrpID){
	if(t_iGrpID==0){
		return true;
	}
	if((t_iCurrentGrpID&c_StR_natPers.m_Gruppe_LEDIGE_ALLEINE)!=0){
		if((t_iGrpID&c_StR_natPers.m_Gruppe_LEDIGE_ALLEINE)==0){
			return false;
		}
		if(((t_iGrpID&c_StR_natPers.m_Gruppe_MIT_KINDER_FUER_LEDIGE)!=0) && (t_iCurrentGrpID&c_StR_natPers.m_Gruppe_MIT_KINDER_FUER_LEDIGE)==0){
			return false;
		}
		if(((t_iGrpID&c_StR_natPers.m_Gruppe_OHNE_KINDER_FUER_LEDIGE)!=0) && (t_iCurrentGrpID&c_StR_natPers.m_Gruppe_OHNE_KINDER_FUER_LEDIGE)==0){
			return false;
		}
	}
	if((t_iCurrentGrpID&c_StR_natPers.m_Gruppe_LEDIGE_KONKUBINAT)!=0){
		if((t_iGrpID&c_StR_natPers.m_Gruppe_LEDIGE_KONKUBINAT)==0){
			return false;
		}
		if(((t_iGrpID&c_StR_natPers.m_Gruppe_MIT_KINDER_FUER_LEDIGE)!=0) && (t_iCurrentGrpID&c_StR_natPers.m_Gruppe_MIT_KINDER_FUER_LEDIGE)==0){
			return false;
		}
		if(((t_iGrpID&c_StR_natPers.m_Gruppe_OHNE_KINDER_FUER_LEDIGE)!=0) && (t_iCurrentGrpID&c_StR_natPers.m_Gruppe_OHNE_KINDER_FUER_LEDIGE)==0){
			return false;
		}
	}
	if((t_iCurrentGrpID&c_StR_natPers.m_Gruppe_VERHEIRATETE)!=0){
		if((t_iGrpID&c_StR_natPers.m_Gruppe_VERHEIRATETE)==0){
			return false;
		}
		if(((t_iGrpID&c_StR_natPers.m_Gruppe_MIT_KINDER_FUER_VERHEIRATETE)!=0) && (t_iCurrentGrpID&c_StR_natPers.m_Gruppe_MIT_KINDER_FUER_VERHEIRATETE)==0){
			return false;
		}
		if(((t_iGrpID&c_StR_natPers.m_Gruppe_OHNE_KINDER_FUER_VERHEIRATETE)!=0) && (t_iCurrentGrpID&c_StR_natPers.m_Gruppe_OHNE_KINDER_FUER_VERHEIRATETE)==0){
			return false;
		}
	}
	return true;
}
c_StRWerk.prototype.p_getNatPersRentensatz=function(t_iJahr,t_iAlter,t_bMale){
	var t_o=null;
	var t_r=null;
	var t_w=null;
	t_o=this.m__np_strtab.p_Get3(t_iJahr);
	if(t_o==null){
		return 0.0;
	}
	t_r=object_downcast((t_o),c_StR_natPers_RTab);
	t_o=t_r.m__werte.p_Get3(t_iAlter);
	if(t_o==null){
		return 0.0;
	}
	t_w=object_downcast((t_o),c_StR_natPers_RTabWert);
	if(t_bMale){
		return t_w.m__mann;
	}
	return t_w.m__frau;
}
c_StRWerk.prototype.p_isNatPersAuszahlungsGrund=function(t_iAuszGrundID,t_iCurrentAuszGrund){
	if(t_iCurrentAuszGrund==c_StR_natPers.m_AuszhlgGrund_UNBEKANNT || t_iAuszGrundID==c_StR_natPers.m_AuszhlgGrund_UNBEKANNT){
		return true;
	}
	if((t_iAuszGrundID&t_iCurrentAuszGrund)!=0){
		return true;
	}
	return false;
}
c_StRWerk.prototype.p_isNatPersKirche=function(t_iKircheTyp,t_iKonfession){
	var t_1=t_iKonfession;
	if(t_1==c_StC_natPers.m_Konfession_REFORMIERT){
		if((t_iKircheTyp&c_StR_natPers.m_Kirchen_REFORMIERT)!=0){
			return true;
		}
	}else{
		if(t_1==c_StC_natPers.m_Konfession_ROEMISCH){
			if((t_iKircheTyp&c_StR_natPers.m_Kirchen_ROEMISCH_KATHOLISCH)!=0){
				return true;
			}
		}else{
			if(t_1==c_StC_natPers.m_Konfession_CHRISTLICH){
				if((t_iKircheTyp&c_StR_natPers.m_Kirchen_CHRISTLICH_KATHOLISCH)!=0){
					return true;
				}
			}
		}
	}
	return false;
}
function c_Map2(){
	Object.call(this);
	this.m_root=null;
}
c_Map2.m_new=function(){
	return this;
}
c_Map2.prototype.p_Clear=function(){
	this.m_root=null;
	return 0;
}
c_Map2.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map2.prototype.p_RotateLeft2=function(t_node){
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
c_Map2.prototype.p_RotateRight2=function(t_node){
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
c_Map2.prototype.p_InsertFixup2=function(t_node){
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
					this.p_RotateLeft2(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight2(t_node.m_parent.m_parent);
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
					this.p_RotateRight2(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft2(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map2.prototype.p_Add=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare2(t_key,t_node.m_key);
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
	t_node=c_Node2.m_new.call(new c_Node2,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup2(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
c_Map2.prototype.p_Values=function(){
	return c_MapValues.m_new.call(new c_MapValues,this);
}
c_Map2.prototype.p_FirstNode=function(){
	if(!((this.m_root)!=null)){
		return null;
	}
	var t_node=this.m_root;
	while((t_node.m_left)!=null){
		t_node=t_node.m_left;
	}
	return t_node;
}
c_Map2.prototype.p_FindNode2=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare2(t_key,t_node.m_key);
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
c_Map2.prototype.p_Get3=function(t_key){
	var t_node=this.p_FindNode2(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return null;
}
c_Map2.prototype.p_Count=function(){
	if((this.m_root)!=null){
		return this.m_root.p_Count2(0);
	}
	return 0;
}
function c_IntMap(){
	c_Map2.call(this);
}
c_IntMap.prototype=extend_class(c_Map2);
c_IntMap.m_new=function(){
	c_Map2.m_new.call(this);
	return this;
}
c_IntMap.prototype.p_Compare2=function(t_lhs,t_rhs){
	return t_lhs-t_rhs;
}
function c_Node2(){
	Object.call(this);
	this.m_key=0;
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node2.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node2.m_new2=function(){
	return this;
}
c_Node2.prototype.p_NextNode=function(){
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
c_Node2.prototype.p_Count2=function(t_n){
	if((this.m_left)!=null){
		t_n=this.m_left.p_Count2(t_n);
	}
	if((this.m_right)!=null){
		t_n=this.m_right.p_Count2(t_n);
	}
	return t_n+1;
}
function c_StROrt(){
	c_RWBasis.call(this);
	this.m__sprachclusterid=0;
	this.m__sprachcluster=null;
	this.m__id=0;
	this.m__per=c_IntMap.m_new.call(new c_IntMap);
	this.m__zugmd=c_IntMap.m_new.call(new c_IntMap);
	this.m__sprachcode=0;
}
c_StROrt.prototype=extend_class(c_RWBasis);
c_StROrt.m_new=function(){
	c_RWBasis.m_new.call(this);
	return this;
}
c_StROrt.prototype.p_getUID=function(){
	return this.m__id;
}
c_StROrt.prototype.p_getPer=function(t_iStandPer){
	var t_p=null;
	var t_=this.m__per.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_x=t_.p_NextObject();
		var t_o=object_downcast((t_x),c_StROrtPer);
		if(t_p==null){
			t_p=t_o;
		}
		if(t_o.m__abjahr<=t_iStandPer){
			t_p=t_o;
		}
	}
	return t_p;
}
c_StROrt.prototype.p_getGmdPer=function(t_iStandPer){
	var t_g=null;
	var t_=this.m__zugmd.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_x=t_.p_NextObject();
		var t_o=object_downcast((t_x),c_StROrtZuGmd);
		if(t_g==null){
			t_g=t_o;
		}
		if(t_o.m__abjahr<=t_iStandPer){
			t_g=t_o;
		}
	}
	return t_g;
}
c_StROrt.prototype.p_getOrtOfLanguage=function(t_lang){
	var t_o=null;
	if(this.m__sprachcluster!=null){
		t_o=this.m__sprachcluster.p_getOrt(t_lang);
	}
	if(t_o==null){
		t_o=this;
	}
	return t_o;
}
c_StROrt.prototype.p_getNew=function(){
	return (c_StROrt.m_new.call(new c_StROrt));
}
c_StROrt.prototype.p_from=function(t_mustDecodeUTF8,t_o){
	this.m__id=c_RWBasis.m_I(t_o,"id");
	this.m__sprachcode=c_RWBasis.m_I(t_o,"s");
	this.m__sprachclusterid=c_RWBasis.m_I(t_o,"scid");
	this.p_fromArray(t_mustDecodeUTF8,t_o,"per",this.m__per,(c_StROrtPer.m_new.call(new c_StROrtPer)),true);
	this.p_fromArray(t_mustDecodeUTF8,t_o,"gmd",this.m__zugmd,(c_StROrtZuGmd.m_new.call(new c_StROrtZuGmd)),true);
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
function c_Collection(){
	Object.call(this);
	this.m__len=0;
	this.m__i=[];
	this.m__sz=0;
}
c_Collection.prototype.p_clear=function(){
	this.m__len=0;
	for(var t_i=0;t_i<this.m__len;t_i=t_i+1){
		this.m__i[t_i]=null;
	}
}
c_Collection.prototype.p_add2=function(t_elt){
	this.m__len+=1;
	if(this.m__len>this.m__sz){
		this.m__sz=this.m__sz*2;
		this.m__i=resize_object_array(this.m__i,this.m__sz);
	}
	this.m__i[this.m__len-1]=t_elt;
}
c_Collection.prototype.p_length=function(){
	return this.m__len;
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
c_Collection.m_new=function(){
	this.m__len=0;
	this.m__sz=5;
	this.m__i=new_object_array(this.m__sz);
	return this;
}
c_Collection.prototype.p_ObjectEnumerator=function(){
	return c_CollectionEnumerator.m_new.call(new c_CollectionEnumerator,this);
}
c_Collection.prototype.p_getObject=function(t_i){
	if(t_i>=0 && t_i<this.m__len){
		return this.m__i[t_i];
	}
	return null;
}
c_Collection.prototype.p_setLength=function(t_l){
	if(t_l>=this.m__sz){
		this.m__sz=t_l+1;
		this.m__i=resize_object_array(this.m__i,this.m__sz);
	}
	this.m__len=t_l;
}
function c_StRKt(){
	c_RWBasis.call(this);
	this.m__kt="";
	this.m__id=0;
	this.m__loaded=false;
	this.m__neuestesgesetzjahr=0;
	this.m__per=c_IntMap.m_new.call(new c_IntMap);
	this.m__np_soberkt=c_IntMap.m_new.call(new c_IntMap);
	this.m__np_sobergmd=c_IntMap.m_new.call(new c_IntMap);
	this.m__np_soberchr=c_IntMap.m_new.call(new c_IntMap);
	this.m__np_s3beekt=c_IntMap.m_new.call(new c_IntMap);
	this.m__np_s3beegmd=c_IntMap.m_new.call(new c_IntMap);
	this.m__np_s3beechr=c_IntMap.m_new.call(new c_IntMap);
	this.m__np_abzgkt=c_IntMap.m_new.call(new c_IntMap);
	this.m__np_abzggmd=c_IntMap.m_new.call(new c_IntMap);
	this.m__np_abzgchr=c_IntMap.m_new.call(new c_IntMap);
	this.m__np_mva=c_IntMap.m_new.call(new c_IntMap);
	this.m__np_esinfo=c_IntMap.m_new.call(new c_IntMap);
	this.m__jp_soberkt=c_IntMap.m_new.call(new c_IntMap);
	this.m__jp_sobergmd=c_IntMap.m_new.call(new c_IntMap);
	this.m__jp_abzgkt=c_IntMap.m_new.call(new c_IntMap);
	this.m__jp_abzggmd=c_IntMap.m_new.call(new c_IntMap);
}
c_StRKt.prototype=extend_class(c_RWBasis);
c_StRKt.m_new=function(){
	c_RWBasis.m_new.call(this);
	return this;
}
c_StRKt.prototype.p_from=function(t_mustDecodeUTF8,t_o){
	this.m__id=c_RWBasis.m_I(t_o,"id");
	this.m__kt=c_RWBasis.m_S(t_o,"k");
	this.m__neuestesgesetzjahr=c_RWBasis.m_I(t_o,"gjahr");
	this.p_fromArray(t_mustDecodeUTF8,t_o,"per",this.m__per,(c_StRKtPer.m_new.call(new c_StRKtPer)),true);
	this.p_fromArray(t_mustDecodeUTF8,t_o,"np_k_ber",this.m__np_soberkt,(c_StR_natPers_SoBerKt.m_new.call(new c_StR_natPers_SoBerKt)),true);
	this.p_fromArray(t_mustDecodeUTF8,t_o,"np_g_ber",this.m__np_sobergmd,(c_StR_natPers_SoBerGmd.m_new.call(new c_StR_natPers_SoBerGmd)),true);
	this.p_fromArray(t_mustDecodeUTF8,t_o,"np_c_ber",this.m__np_soberchr,(c_StR_natPers_SoBerChr.m_new.call(new c_StR_natPers_SoBerChr)),true);
	this.p_fromArray(t_mustDecodeUTF8,t_o,"np_k_s3bee",this.m__np_s3beekt,(c_StR_natPers_S3bEEPer.m_new.call(new c_StR_natPers_S3bEEPer)),true);
	this.p_fromArray(t_mustDecodeUTF8,t_o,"np_g_s3bee",this.m__np_s3beegmd,(c_StR_natPers_S3bEEPer.m_new.call(new c_StR_natPers_S3bEEPer)),true);
	this.p_fromArray(t_mustDecodeUTF8,t_o,"np_c_s3bee",this.m__np_s3beechr,(c_StR_natPers_S3bEEPer.m_new.call(new c_StR_natPers_S3bEEPer)),true);
	this.p_fromArray(t_mustDecodeUTF8,t_o,"np_k_abzg",this.m__np_abzgkt,(c_StR_natPers_AbzgPer.m_new.call(new c_StR_natPers_AbzgPer)),true);
	this.p_fromArray(t_mustDecodeUTF8,t_o,"np_g_abzg",this.m__np_abzggmd,(c_StR_natPers_AbzgPer.m_new.call(new c_StR_natPers_AbzgPer)),true);
	this.p_fromArray(t_mustDecodeUTF8,t_o,"np_c_abzg",this.m__np_abzgchr,(c_StR_natPers_AbzgPer.m_new.call(new c_StR_natPers_AbzgPer)),true);
	this.p_fromArray(t_mustDecodeUTF8,t_o,"np_mva",this.m__np_mva,(c_StR_natPers_KtMVAPer.m_new.call(new c_StR_natPers_KtMVAPer)),true);
	this.p_fromArray(t_mustDecodeUTF8,t_o,"np_esinfo",this.m__np_esinfo,(c_StR_natPers_ESInfo.m_new.call(new c_StR_natPers_ESInfo)),true);
	this.p_fromArray(t_mustDecodeUTF8,t_o,"jp_k_ber",this.m__jp_soberkt,(c_StR_jurPers_SoBerKt.m_new.call(new c_StR_jurPers_SoBerKt)),true);
	this.p_fromArray(t_mustDecodeUTF8,t_o,"jp_g_ber",this.m__jp_sobergmd,(c_StR_jurPers_SoBerGmd.m_new.call(new c_StR_jurPers_SoBerGmd)),true);
	this.p_fromArray(t_mustDecodeUTF8,t_o,"jp_k_abzg",this.m__jp_abzgkt,(c_StR_jurPers_AbzgPer.m_new.call(new c_StR_jurPers_AbzgPer)),true);
	this.p_fromArray(t_mustDecodeUTF8,t_o,"jp_g_abzg",this.m__jp_abzggmd,(c_StR_jurPers_AbzgPer.m_new.call(new c_StR_jurPers_AbzgPer)),true);
	if(this.m__per.p_Count()>0){
		this.m__loaded=true;
	}
}
c_StRKt.prototype.p_getPer=function(t_iStandPer){
	var t_p=null;
	var t_=this.m__per.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_x=t_.p_NextObject();
		var t_o=object_downcast((t_x),c_StRKtPer);
		if(t_p==null){
			t_p=t_o;
		}
		if(t_o.m__abjahr<=t_iStandPer){
			t_p=t_o;
		}
	}
	return t_p;
}
c_StRKt.prototype.p_isCH=function(){
	if(this.m__id!=c_StR_common.m_Kanton_LI){
		return true;
	}
	return false;
}
c_StRKt.prototype.p_isLI=function(){
	if(this.m__id==c_StR_common.m_Kanton_LI){
		return true;
	}
	return false;
}
c_StRKt.prototype.p_getNew=function(){
	return (c_StRKt.m_new.call(new c_StRKt));
}
c_StRKt.prototype.p_getUID=function(){
	return this.m__id;
}
c_StRKt.prototype.p_getNatPersSoBerKtMap=function(t_rw,t_iCalcTyp,t_iStandJahr,t_iGrp){
	var t_m=c_IntMap.m_new.call(new c_IntMap);
	var t_=this.m__np_soberkt.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_x=t_.p_NextObject();
		var t_o=object_downcast((t_x),c_StR_natPers_SoBerKt);
		if(t_o.m__objtyp==t_iCalcTyp && t_o.m__abjahr==t_iStandJahr && t_rw.p_isNatPersGruppe(t_o.m__id_grp,t_iGrp)){
			if(t_o.m__id>=9900 && t_o.m__id<9951){
				continue;
			}
			t_m.p_Add(t_o.p_getUID(),(t_o));
		}
	}
	return t_m;
}
c_StRKt.prototype.p_getNatPersAbzgMap=function(t_rw,t_iStandJahr,t_iSoBerID,t_iGrp){
	var t_m=c_IntMap.m_new.call(new c_IntMap);
	var t_=this.m__np_abzgkt.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_x=t_.p_NextObject();
		var t_o=object_downcast((t_x),c_StR_natPers_AbzgPer);
		if(t_o.m__soberid==t_iSoBerID && t_o.m__abjahr==t_iStandJahr && t_rw.p_isNatPersGruppe(t_o.m__id_grp,t_iGrp)){
			var t_a=object_downcast((t_rw.m__np_stabzug.p_Get3(t_o.m__abzugid)),c_StR_natPers_Abzg);
			if(t_a!=null){
				t_m.p_Add(t_a.p_getQualifiedSortID(t_o.m__sort),(t_a));
			}
		}
	}
	return t_m;
}
c_StRKt.prototype.p_getNatPersSoBerKt=function(t_rw,t_iCalcTyp,t_iStandJahr,t_iGrp,t_iAuszGrund){
	var t_m=this.p_getNatPersSoBerKtMap(t_rw,t_iCalcTyp,t_iStandJahr,t_iGrp);
	var t_=t_m.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_x=t_.p_NextObject();
		var t_o=object_downcast((t_x),c_StR_natPers_SoBerKt);
		if(t_iAuszGrund>-1 || t_rw.p_isNatPersAuszahlungsGrund(t_o.m__id_auszgrund,t_iAuszGrund)){
			return t_o;
		}
	}
	return null;
}
c_StRKt.prototype.p_getNatPersS3bEEMap=function(t_rw,t_iStandJahr,t_iSoBerID){
	var t_m=c_IntMap.m_new.call(new c_IntMap);
	var t_=this.m__np_s3beekt.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_x=t_.p_NextObject();
		var t_o=object_downcast((t_x),c_StR_natPers_S3bEEPer);
		if(t_o.m__soberid==t_iSoBerID && t_o.m__abjahr==t_iStandJahr){
			var t_s=object_downcast((t_rw.m__np_sts3bee.p_Get3(t_o.m__s3beeid)),c_StR_natPers_S3bEE);
			if(t_s!=null){
				t_m.p_Add(t_s.p_getUID(),(t_s));
			}
		}
	}
	return t_m;
}
function c_StRGmd(){
	c_RWBasis.call(this);
	this.m__per=c_IntMap.m_new.call(new c_IntMap);
	this.m__id=0;
	this.m__name="";
	this.m__ktid=0;
	this.m__np_sobergmd=c_IntMap.m_new.call(new c_IntMap);
	this.m__np_soberchr=c_IntMap.m_new.call(new c_IntMap);
	this.m__np_s3beegmd=c_IntMap.m_new.call(new c_IntMap);
	this.m__np_s3beechr=c_IntMap.m_new.call(new c_IntMap);
	this.m__np_abzggmd=c_IntMap.m_new.call(new c_IntMap);
	this.m__np_abzgchr=c_IntMap.m_new.call(new c_IntMap);
	this.m__jp_sobergmd=c_IntMap.m_new.call(new c_IntMap);
	this.m__jp_abzggmd=c_IntMap.m_new.call(new c_IntMap);
}
c_StRGmd.prototype=extend_class(c_RWBasis);
c_StRGmd.m_new=function(){
	c_RWBasis.m_new.call(this);
	return this;
}
c_StRGmd.prototype.p_getPer=function(t_iStandPer){
	var t_p=null;
	var t_=this.m__per.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_x=t_.p_NextObject();
		var t_o=object_downcast((t_x),c_StRGmdPer);
		if(t_p==null){
			t_p=t_o;
		}
		if(t_o.m__abjahr<=t_iStandPer){
			t_p=t_o;
		}
	}
	return t_p;
}
c_StRGmd.prototype.p_getNew=function(){
	return (c_StRGmd.m_new.call(new c_StRGmd));
}
c_StRGmd.prototype.p_getUID=function(){
	return this.m__id;
}
c_StRGmd.prototype.p_from=function(t_mustDecodeUTF8,t_o){
	this.m__id=c_RWBasis.m_I(t_o,"id");
	this.m__name=c_RWBasis.m_Sdecode(t_mustDecodeUTF8,t_o,"n");
	this.m__ktid=c_RWBasis.m_I(t_o,"k");
	this.p_fromArray(t_mustDecodeUTF8,t_o,"per",this.m__per,(c_StRGmdPer.m_new.call(new c_StRGmdPer)),true);
	this.p_fromArray(t_mustDecodeUTF8,t_o,"np_g_ber",this.m__np_sobergmd,(c_StR_natPers_SoBerGmd.m_new.call(new c_StR_natPers_SoBerGmd)),true);
	this.p_fromArray(t_mustDecodeUTF8,t_o,"np_c_ber",this.m__np_soberchr,(c_StR_natPers_SoBerChr.m_new.call(new c_StR_natPers_SoBerChr)),true);
	this.p_fromArray(t_mustDecodeUTF8,t_o,"np_g_s3bee",this.m__np_s3beegmd,(c_StR_natPers_S3bEEPer.m_new.call(new c_StR_natPers_S3bEEPer)),true);
	this.p_fromArray(t_mustDecodeUTF8,t_o,"np_c_s3bee",this.m__np_s3beechr,(c_StR_natPers_S3bEEPer.m_new.call(new c_StR_natPers_S3bEEPer)),true);
	this.p_fromArray(t_mustDecodeUTF8,t_o,"np_g_abzg",this.m__np_abzggmd,(c_StR_natPers_AbzgPer.m_new.call(new c_StR_natPers_AbzgPer)),true);
	this.p_fromArray(t_mustDecodeUTF8,t_o,"np_c_abzg",this.m__np_abzgchr,(c_StR_natPers_AbzgPer.m_new.call(new c_StR_natPers_AbzgPer)),true);
	this.p_fromArray(t_mustDecodeUTF8,t_o,"jp_g_ber",this.m__jp_sobergmd,(c_StR_jurPers_SoBerGmd.m_new.call(new c_StR_jurPers_SoBerGmd)),true);
	this.p_fromArray(t_mustDecodeUTF8,t_o,"jp_g_abzg",this.m__jp_abzggmd,(c_StR_jurPers_AbzgPer.m_new.call(new c_StR_jurPers_AbzgPer)),true);
}
c_StRGmd.prototype.p_getNatPersSoBerGmdMap=function(t_rw,t_iCalcTyp,t_iStandJahr,t_iGrp){
	var t_m=c_IntMap.m_new.call(new c_IntMap);
	var t_=this.m__np_sobergmd.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_x=t_.p_NextObject();
		var t_o=object_downcast((t_x),c_StR_natPers_SoBerGmd);
		if(t_o.m__objtyp==t_iCalcTyp && t_o.m__abjahr==t_iStandJahr && t_rw.p_isNatPersGruppe(t_o.m__id_grp,t_iGrp)){
			t_m.p_Add(t_o.p_getUID(),(t_o));
		}
	}
	var t_kt=t_rw.p_getKt(this.m__ktid,false);
	if(t_kt!=null){
		var t_2=t_kt.m__np_sobergmd.p_Values().p_ObjectEnumerator();
		while(t_2.p_HasNext()){
			var t_x2=t_2.p_NextObject();
			var t_o2=object_downcast((t_x2),c_StR_natPers_SoBerGmd);
			if(t_o2.m__objtyp==t_iCalcTyp && t_o2.m__abjahr==t_iStandJahr && t_rw.p_isNatPersGruppe(t_o2.m__id_grp,t_iGrp)){
				t_m.p_Add(t_o2.p_getUID(),(t_o2));
			}
		}
	}
	return t_m;
}
c_StRGmd.prototype.p_getNatPersAbzgGmdMap=function(t_rw,t_iStandJahr,t_iSoBerID,t_iGrp){
	var t_m=c_IntMap.m_new.call(new c_IntMap);
	var t_=this.m__np_abzggmd.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_x=t_.p_NextObject();
		var t_o=object_downcast((t_x),c_StR_natPers_AbzgPer);
		if(t_o.m__soberid==t_iSoBerID && t_o.m__abjahr==t_iStandJahr && t_rw.p_isNatPersGruppe(t_o.m__id_grp,t_iGrp)){
			var t_a=object_downcast((t_rw.m__np_stabzug.p_Get3(t_o.m__abzugid)),c_StR_natPers_Abzg);
			if(t_a!=null){
				t_m.p_Add(t_a.p_getQualifiedSortID(t_o.m__sort),(t_a));
			}
		}
	}
	var t_kt=t_rw.p_getKt(this.m__ktid,false);
	if(t_kt!=null){
		var t_2=t_kt.m__np_abzggmd.p_Values().p_ObjectEnumerator();
		while(t_2.p_HasNext()){
			var t_x2=t_2.p_NextObject();
			var t_o2=object_downcast((t_x2),c_StR_natPers_AbzgPer);
			if(t_o2.m__soberid==t_iSoBerID && t_o2.m__abjahr==t_iStandJahr && t_rw.p_isNatPersGruppe(t_o2.m__id_grp,t_iGrp)){
				var t_a2=object_downcast((t_rw.m__np_stabzug.p_Get3(t_o2.m__abzugid)),c_StR_natPers_Abzg);
				if(t_a2!=null){
					t_m.p_Add(t_a2.p_getQualifiedSortID(t_o2.m__sort),(t_a2));
				}
			}
		}
	}
	return t_m;
}
c_StRGmd.prototype.p_getNatPersSoBerChrMap=function(t_rw,t_iCalcTyp,t_iStandJahr,t_iGrp,t_iKonfession){
	var t_m=c_IntMap.m_new.call(new c_IntMap);
	var t_=this.m__np_soberchr.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_x=t_.p_NextObject();
		var t_o=object_downcast((t_x),c_StR_natPers_SoBerChr);
		if(t_o.m__objtyp==t_iCalcTyp && t_o.m__abjahr==t_iStandJahr && t_rw.p_isNatPersGruppe(t_o.m__id_grp,t_iGrp) && t_rw.p_isNatPersKirche(t_o.m__typkirche,t_iKonfession)){
			t_m.p_Add(t_o.p_getUID(),(t_o));
		}
	}
	var t_kt=t_rw.p_getKt(this.m__ktid,false);
	if(t_kt!=null){
		var t_2=t_kt.m__np_soberchr.p_Values().p_ObjectEnumerator();
		while(t_2.p_HasNext()){
			var t_x2=t_2.p_NextObject();
			var t_o2=object_downcast((t_x2),c_StR_natPers_SoBerChr);
			if(t_o2.m__objtyp==t_iCalcTyp && t_o2.m__abjahr==t_iStandJahr && t_rw.p_isNatPersGruppe(t_o2.m__id_grp,t_iGrp) && t_rw.p_isNatPersKirche(t_o2.m__typkirche,t_iKonfession)){
				t_m.p_Add(t_o2.p_getUID(),(t_o2));
			}
		}
	}
	return t_m;
}
c_StRGmd.prototype.p_getNatPersAbzgChrMap=function(t_rw,t_iStandJahr,t_iSoBerID,t_iGrp){
	var t_m=c_IntMap.m_new.call(new c_IntMap);
	var t_=this.m__np_abzgchr.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_x=t_.p_NextObject();
		var t_o=object_downcast((t_x),c_StR_natPers_AbzgPer);
		if(t_o.m__soberid==t_iSoBerID && t_o.m__abjahr==t_iStandJahr && t_rw.p_isNatPersGruppe(t_o.m__id_grp,t_iGrp)){
			var t_a=object_downcast((t_rw.m__np_stabzug.p_Get3(t_o.m__abzugid)),c_StR_natPers_Abzg);
			if(t_a!=null){
				t_m.p_Add(t_a.p_getQualifiedSortID(t_o.m__sort),(t_a));
			}
		}
	}
	var t_kt=t_rw.p_getKt(this.m__ktid,false);
	if(t_kt!=null){
		var t_2=t_kt.m__np_abzgchr.p_Values().p_ObjectEnumerator();
		while(t_2.p_HasNext()){
			var t_x2=t_2.p_NextObject();
			var t_o2=object_downcast((t_x2),c_StR_natPers_AbzgPer);
			if(t_o2.m__soberid==t_iSoBerID && t_o2.m__abjahr==t_iStandJahr && t_rw.p_isNatPersGruppe(t_o2.m__id_grp,t_iGrp)){
				var t_a2=object_downcast((t_rw.m__np_stabzug.p_Get3(t_o2.m__abzugid)),c_StR_natPers_Abzg);
				if(t_a2!=null){
					t_m.p_Add(t_a2.p_getQualifiedSortID(t_o2.m__sort),(t_a2));
				}
			}
		}
	}
	return t_m;
}
c_StRGmd.prototype.p_getNatPersSoBerGmd=function(t_rw,t_iCalcTyp,t_iStandJahr,t_iGrp,t_iAuszGrund){
	var t_m=this.p_getNatPersSoBerGmdMap(t_rw,t_iCalcTyp,t_iStandJahr,t_iGrp);
	var t_=t_m.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_x=t_.p_NextObject();
		var t_o=object_downcast((t_x),c_StR_natPers_SoBerGmd);
		if(t_iAuszGrund>-1 || t_rw.p_isNatPersAuszahlungsGrund(t_o.m__id_auszgrund,t_iAuszGrund)){
			return t_o;
		}
	}
	return null;
}
c_StRGmd.prototype.p_getNatPersS3bEEGmdMap=function(t_rw,t_iStandJahr,t_iSoBerID){
	var t_m=c_IntMap.m_new.call(new c_IntMap);
	var t_=this.m__np_s3beegmd.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_x=t_.p_NextObject();
		var t_o=object_downcast((t_x),c_StR_natPers_S3bEEPer);
		if(t_o.m__soberid==t_iSoBerID && t_o.m__abjahr==t_iStandJahr){
			var t_s=object_downcast((t_rw.m__np_sts3bee.p_Get3(t_o.m__s3beeid)),c_StR_natPers_S3bEE);
			if(t_s!=null){
				t_m.p_Add(t_s.p_getUID(),(t_s));
			}
		}
	}
	var t_kt=t_rw.p_getKt(this.m__ktid,false);
	if(t_kt!=null){
		var t_2=t_kt.m__np_s3beegmd.p_Values().p_ObjectEnumerator();
		while(t_2.p_HasNext()){
			var t_x2=t_2.p_NextObject();
			var t_o2=object_downcast((t_x2),c_StR_natPers_S3bEEPer);
			if(t_o2.m__soberid==t_iSoBerID && t_o2.m__abjahr==t_iStandJahr){
				var t_s2=object_downcast((t_rw.m__np_sts3bee.p_Get3(t_o2.m__s3beeid)),c_StR_natPers_S3bEE);
				if(t_s2!=null){
					t_m.p_Add(t_s2.p_getUID(),(t_s2));
				}
			}
		}
	}
	return t_m;
}
c_StRGmd.prototype.p_getNatPersSoBerChr=function(t_rw,t_iCalcTyp,t_iStandJahr,t_iGrp,t_iKonfession,t_iAuszGrund){
	var t_m=this.p_getNatPersSoBerChrMap(t_rw,t_iCalcTyp,t_iStandJahr,t_iGrp,t_iKonfession);
	var t_=t_m.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_x=t_.p_NextObject();
		var t_o=object_downcast((t_x),c_StR_natPers_SoBerChr);
		if(t_iAuszGrund>-1 || t_rw.p_isNatPersAuszahlungsGrund(t_o.m__id_auszgrund,t_iAuszGrund)){
			return t_o;
		}
	}
	return null;
}
c_StRGmd.prototype.p_getNatPersS3bEEChrMap=function(t_rw,t_iStandJahr,t_iSoBerID){
	var t_m=c_IntMap.m_new.call(new c_IntMap);
	var t_=this.m__np_s3beechr.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_x=t_.p_NextObject();
		var t_o=object_downcast((t_x),c_StR_natPers_S3bEEPer);
		if(t_o.m__soberid==t_iSoBerID && t_o.m__abjahr==t_iStandJahr){
			var t_s=object_downcast((t_rw.m__np_sts3bee.p_Get3(t_o.m__s3beeid)),c_StR_natPers_S3bEE);
			if(t_s!=null){
				t_m.p_Add(t_s.p_getUID(),(t_s));
			}
		}
	}
	var t_kt=t_rw.p_getKt(this.m__ktid,false);
	if(t_kt!=null){
		var t_2=t_kt.m__np_s3beechr.p_Values().p_ObjectEnumerator();
		while(t_2.p_HasNext()){
			var t_x2=t_2.p_NextObject();
			var t_o2=object_downcast((t_x2),c_StR_natPers_S3bEEPer);
			if(t_o2.m__soberid==t_iSoBerID && t_o2.m__abjahr==t_iStandJahr){
				var t_s2=object_downcast((t_rw.m__np_sts3bee.p_Get3(t_o2.m__s3beeid)),c_StR_natPers_S3bEE);
				if(t_s2!=null){
					t_m.p_Add(t_s2.p_getUID(),(t_s2));
				}
			}
		}
	}
	return t_m;
}
function c_StR_natPers_Progr(){
	c_RWBasis.call(this);
	this.m__id=0;
	this.m__typ=0;
	this.m__rtyp_steuerbar=0;
	this.m__rtyp_satzbest=0;
	this.m__rbetr=.0;
	this.m__pstep=.0;
	this.m__werte=c_IntMap.m_new.call(new c_IntMap);
}
c_StR_natPers_Progr.prototype=extend_class(c_RWBasis);
c_StR_natPers_Progr.m_new=function(){
	c_RWBasis.m_new.call(this);
	return this;
}
c_StR_natPers_Progr.prototype.p_getUID=function(){
	return this.m__id;
}
c_StR_natPers_Progr.prototype.p_getNew=function(){
	return (c_StR_natPers_Progr.m_new.call(new c_StR_natPers_Progr));
}
c_StR_natPers_Progr.prototype.p_from=function(t_mustDecodeUTF8,t_o){
	this.m__id=c_RWBasis.m_I(t_o,"id");
	this.m__typ=c_RWBasis.m_I(t_o,"typ");
	this.m__rtyp_steuerbar=c_RWBasis.m_I(t_o,"rtyp_stb");
	this.m__rtyp_satzbest=c_RWBasis.m_I(t_o,"rtyp_satz");
	this.m__rbetr=c_RWBasis.m_F(t_o,"rbetr");
	this.m__pstep=c_RWBasis.m_F(t_o,"pstep");
	this.p_fromArray(t_mustDecodeUTF8,t_o,"np_v",this.m__werte,(c_StR_natPers_ProgrWert.m_new.call(new c_StR_natPers_ProgrWert)),true);
}
function c_StR_natPers_Abzg(){
	c_RWBasis.call(this);
	this.m__id=0;
	this.m__typ=0;
	this.m__wert=.0;
	this.m__progid=0;
	this.m__grtyp=0;
	this.m__minst=.0;
	this.m__maxst=.0;
}
c_StR_natPers_Abzg.prototype=extend_class(c_RWBasis);
c_StR_natPers_Abzg.m_new=function(){
	c_RWBasis.m_new.call(this);
	return this;
}
c_StR_natPers_Abzg.prototype.p_getNew=function(){
	return (c_StR_natPers_Abzg.m_new.call(new c_StR_natPers_Abzg));
}
c_StR_natPers_Abzg.prototype.p_getUID=function(){
	return this.m__id;
}
c_StR_natPers_Abzg.prototype.p_from=function(t_mustDecodeUTF8,t_o){
	this.m__id=c_RWBasis.m_I(t_o,"id");
	this.m__typ=c_RWBasis.m_I(t_o,"t");
	this.m__wert=c_RWBasis.m_F(t_o,"w");
	this.m__progid=c_RWBasis.m_I(t_o,"p");
	this.m__grtyp=c_RWBasis.m_I(t_o,"g");
	this.m__minst=c_RWBasis.m_F(t_o,"mi");
	this.m__maxst=c_RWBasis.m_F(t_o,"mx");
}
c_StR_natPers_Abzg.prototype.p_getQualifiedSortID=function(t_iSort){
	return t_iSort*(c_RWBasis.m__last_uid+1)+this.m__id;
}
function c_StR_natPers_S3bEE(){
	c_RWBasis.call(this);
	this.m__id=0;
	this.m__abjahr=0;
	this.m__bisjahr=0;
	this.m__abalter=0;
	this.m__dauer=0;
	this.m__endalter=0;
	this.m__spez=0;
}
c_StR_natPers_S3bEE.prototype=extend_class(c_RWBasis);
c_StR_natPers_S3bEE.m_new=function(){
	c_RWBasis.m_new.call(this);
	return this;
}
c_StR_natPers_S3bEE.prototype.p_getNew=function(){
	return (c_StR_natPers_S3bEE.m_new.call(new c_StR_natPers_S3bEE));
}
c_StR_natPers_S3bEE.prototype.p_getUID=function(){
	return this.m__id;
}
c_StR_natPers_S3bEE.prototype.p_from=function(t_mustDecodeUTF8,t_o){
	this.m__id=c_RWBasis.m_I(t_o,"id");
	this.m__abjahr=c_RWBasis.m_I(t_o,"ab");
	this.m__bisjahr=c_RWBasis.m_I(t_o,"bis");
	this.m__abalter=c_RWBasis.m_I(t_o,"abalter");
	this.m__dauer=c_RWBasis.m_I(t_o,"dauer");
	this.m__endalter=c_RWBasis.m_I(t_o,"endalter");
	this.m__spez=c_RWBasis.m_I(t_o,"spez");
}
function c_StR_natPers_RTab(){
	c_RWBasis.call(this);
	this.m__jahr=0;
	this.m__werte=c_IntMap.m_new.call(new c_IntMap);
}
c_StR_natPers_RTab.prototype=extend_class(c_RWBasis);
c_StR_natPers_RTab.m_new=function(){
	c_RWBasis.m_new.call(this);
	return this;
}
c_StR_natPers_RTab.prototype.p_getNew=function(){
	return (c_StR_natPers_RTab.m_new.call(new c_StR_natPers_RTab));
}
c_StR_natPers_RTab.prototype.p_getUID=function(){
	return this.m__jahr;
}
c_StR_natPers_RTab.prototype.p_from=function(t_mustDecodeUTF8,t_o){
	this.m__jahr=c_RWBasis.m_I(t_o,"j");
	this.p_fromArray(t_mustDecodeUTF8,t_o,"np_r",this.m__werte,(c_StR_natPers_RTabWert.m_new.call(new c_StR_natPers_RTabWert)),true);
}
function c_StR_jurPers_Progr(){
	c_RWBasis.call(this);
	this.m__id=0;
	this.m__typ=0;
	this.m__rtyp_steuerbar=0;
	this.m__rtyp_satzbest=0;
	this.m__rbetr=.0;
	this.m__pstep=.0;
	this.m__werte=c_IntMap.m_new.call(new c_IntMap);
}
c_StR_jurPers_Progr.prototype=extend_class(c_RWBasis);
c_StR_jurPers_Progr.m_new=function(){
	c_RWBasis.m_new.call(this);
	return this;
}
c_StR_jurPers_Progr.prototype.p_getUID=function(){
	return this.m__id;
}
c_StR_jurPers_Progr.prototype.p_getNew=function(){
	return (c_StR_jurPers_Progr.m_new.call(new c_StR_jurPers_Progr));
}
c_StR_jurPers_Progr.prototype.p_from=function(t_mustDecodeUTF8,t_o){
	this.m__id=c_RWBasis.m_I(t_o,"id");
	this.m__typ=c_RWBasis.m_I(t_o,"typ");
	this.m__rtyp_steuerbar=c_RWBasis.m_I(t_o,"rtyp_stb");
	this.m__rtyp_satzbest=c_RWBasis.m_I(t_o,"rtyp_satz");
	this.m__rbetr=c_RWBasis.m_F(t_o,"rbetr");
	this.m__pstep=c_RWBasis.m_F(t_o,"pstep");
	this.p_fromArray(t_mustDecodeUTF8,t_o,"jp_v",this.m__werte,(c_StR_jurPers_ProgrWert.m_new.call(new c_StR_jurPers_ProgrWert)),true);
}
function c_StR_jurPers_Abzg(){
	c_RWBasis.call(this);
	this.m__id=0;
	this.m__typ=0;
	this.m__wert=.0;
	this.m__progid=0;
	this.m__grtyp=0;
	this.m__minst=.0;
	this.m__maxst=.0;
}
c_StR_jurPers_Abzg.prototype=extend_class(c_RWBasis);
c_StR_jurPers_Abzg.m_new=function(){
	c_RWBasis.m_new.call(this);
	return this;
}
c_StR_jurPers_Abzg.prototype.p_getNew=function(){
	return (c_StR_jurPers_Abzg.m_new.call(new c_StR_jurPers_Abzg));
}
c_StR_jurPers_Abzg.prototype.p_getUID=function(){
	return this.m__id;
}
c_StR_jurPers_Abzg.prototype.p_from=function(t_mustDecodeUTF8,t_o){
	this.m__id=c_RWBasis.m_I(t_o,"id");
	this.m__typ=c_RWBasis.m_I(t_o,"t");
	this.m__wert=c_RWBasis.m_F(t_o,"w");
	this.m__progid=c_RWBasis.m_I(t_o,"p");
	this.m__grtyp=c_RWBasis.m_I(t_o,"g");
	this.m__minst=c_RWBasis.m_F(t_o,"mi");
	this.m__maxst=c_RWBasis.m_F(t_o,"mx");
}
function c_StRSprachCluster(){
	c_RWBasis.call(this);
	this.m__sprachclusterid=0;
	this.m__storte=c_IntMap.m_new.call(new c_IntMap);
}
c_StRSprachCluster.prototype=extend_class(c_RWBasis);
c_StRSprachCluster.m_new=function(){
	c_RWBasis.m_new.call(this);
	return this;
}
c_StRSprachCluster.prototype.p_getUID=function(){
	return this.m__sprachclusterid;
}
c_StRSprachCluster.prototype.p_getOrt=function(t_lang){
	var t_o=null;
	var t_=this.m__storte.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_x=t_.p_NextObject();
		t_o=object_downcast((t_x),c_StROrt);
		if(t_o.m__sprachcode==t_lang){
			return t_o;
		}
	}
	return null;
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
function c_StRProgr(){
	c_RWBasis.call(this);
	this.m__id=0;
	this.m__typ=0;
	this.m__rtyp_steuerbar=0;
	this.m__rtyp_satzbest=0;
	this.m__rbetr=.0;
	this.m__pstep=.0;
	this.m__werte=c_IntMap.m_new.call(new c_IntMap);
}
c_StRProgr.prototype=extend_class(c_RWBasis);
c_StRProgr.m_new=function(){
	c_RWBasis.m_new.call(this);
	return this;
}
c_StRProgr.prototype.p_getNew=function(){
	return (c_StRProgr.m_new.call(new c_StRProgr));
}
c_StRProgr.prototype.p_getUID=function(){
	return this.m__id;
}
function c_StR_jurPers_ProgrWert(){
	c_RWBasis.call(this);
	this.m__num=0;
	this.m__wert=.0;
	this.m__prozent=.0;
	this.m__steuer=.0;
	this.m__formel="";
}
c_StR_jurPers_ProgrWert.prototype=extend_class(c_RWBasis);
c_StR_jurPers_ProgrWert.prototype.p_getUID=function(){
	return this.m__num;
}
c_StR_jurPers_ProgrWert.m_new=function(){
	c_RWBasis.m_new.call(this);
	return this;
}
c_StR_jurPers_ProgrWert.prototype.p_getNew=function(){
	return (c_StR_jurPers_ProgrWert.m_new.call(new c_StR_jurPers_ProgrWert));
}
c_StR_jurPers_ProgrWert.prototype.p_from=function(t_mustDecodeUTF8,t_o){
	this.m__num=c_RWBasis.m_I(t_o,"n");
	this.m__wert=c_RWBasis.m_F(t_o,"w");
	this.m__prozent=c_RWBasis.m_F(t_o,"p");
	this.m__steuer=c_RWBasis.m_F(t_o,"s");
	this.m__formel=c_RWBasis.m_S(t_o,"f");
}
function c_StRProgrWert(){
	c_RWBasis.call(this);
	this.m__num=0;
	this.m__wert=.0;
	this.m__prozent=.0;
	this.m__steuer=.0;
	this.m__formel="";
}
c_StRProgrWert.prototype=extend_class(c_RWBasis);
c_StRProgrWert.m_new=function(){
	c_RWBasis.m_new.call(this);
	return this;
}
c_StRProgrWert.prototype.p_getUID=function(){
	return this.m__num;
}
c_StRProgrWert.prototype.p_getNew=function(){
	return (c_StRProgrWert.m_new.call(new c_StRProgrWert));
}
function c_StR_natPers_ProgrWert(){
	c_RWBasis.call(this);
	this.m__num=0;
	this.m__wert=.0;
	this.m__prozent=.0;
	this.m__steuer=.0;
	this.m__formel="";
}
c_StR_natPers_ProgrWert.prototype=extend_class(c_RWBasis);
c_StR_natPers_ProgrWert.prototype.p_getUID=function(){
	return this.m__num;
}
c_StR_natPers_ProgrWert.m_new=function(){
	c_RWBasis.m_new.call(this);
	return this;
}
c_StR_natPers_ProgrWert.prototype.p_getNew=function(){
	return (c_StR_natPers_ProgrWert.m_new.call(new c_StR_natPers_ProgrWert));
}
c_StR_natPers_ProgrWert.prototype.p_from=function(t_mustDecodeUTF8,t_o){
	this.m__num=c_RWBasis.m_I(t_o,"n");
	this.m__wert=c_RWBasis.m_F(t_o,"w");
	this.m__prozent=c_RWBasis.m_F(t_o,"p");
	this.m__steuer=c_RWBasis.m_F(t_o,"s");
	this.m__formel=c_RWBasis.m_S(t_o,"f");
}
function c_LawbaseLoader(){
	Object.call(this);
}
c_LawbaseLoader.m__last_base="";
c_LawbaseLoader.m__last_remote=false;
c_LawbaseLoader.m__bsv_vers="";
c_LawbaseLoader.m_reset=function(){
	c_LawbaseLoader.m__last_base="";
	c_LawbaseLoader.m__last_remote=false;
	c_LawbaseLoader.m__bsv_vers="";
}
c_LawbaseLoader.m_initVersion=function(t_sContent){
	if(t_sContent!=""){
		try{
			var t_js=c_JsonObject.m_new3.call(new c_JsonObject,t_sContent);
			var t_v=t_js.p_Get("version",null);
			if(t_v!=null){
				c_LawbaseLoader.m__bsv_vers=t_v.p_StringValue();
				return true;
			}
		}catch(_eek_){
			if(t_err=object_downcast(_eek_,ThrowableObject)){
			}else{
				throw _eek_;
			}
		}
	}
	return false;
}
c_LawbaseLoader.m_readVersion=function(){
	if(c_LawbaseLoader.m_initVersion(bb_systools_getFileContentFromLT4(c_LawbaseLoader.m__last_base+"bsv_version.lt4"))){
		return true;
	}
	if(c_LawbaseLoader.m_initVersion(bb_systools_getFileContent(c_LawbaseLoader.m__last_base+"bsv_version.json"))){
		return true;
	}
	return false;
}
c_LawbaseLoader.m__current_bsv_ch=null;
c_LawbaseLoader.m__current_bsv_li=null;
c_LawbaseLoader.m_initLawBases=function(t_sContent){
	if(t_sContent!=""){
		var t_bsvch=c_LawbaseCH.m_new.call(new c_LawbaseCH);
		if(t_bsvch.p_parseValues(t_sContent)){
			c_LawbaseLoader.m__current_bsv_ch=t_bsvch;
		}
		var t_bsvli=c_LawbaseLI.m_new.call(new c_LawbaseLI);
		if(t_bsvli.p_parseValues(t_sContent)){
			c_LawbaseLoader.m__current_bsv_li=t_bsvli;
		}
	}
}
c_LawbaseLoader.m_isValid=function(){
	if(c_LawbaseLoader.m__current_bsv_ch!=null && c_LawbaseLoader.m__current_bsv_li!=null){
		return true;
	}
	return false;
}
c_LawbaseLoader.m_executeLoad=function(){
	try{
		if(c_LawbaseLoader.m_readVersion()==false){
			return false;
		}
		var t_n="";
		t_n=c_LawbaseLoader.m__last_base+"bsv_"+c_LawbaseLoader.m__bsv_vers;
		c_LDebug.m_info("version "+c_LawbaseLoader.m__bsv_vers);
		var t_mustDecodeUTF8=true;
		var t_sContent="";
		t_sContent=bb_systools_getFileContentFromLT4(t_n+".lt4");
		if(t_sContent==""){
			t_mustDecodeUTF8=false;
			t_sContent=bb_systools_getFileContent(t_n+".json");
		}
		c_LawbaseLoader.m_initLawBases(t_sContent);
	}catch(_eek_){
		if(t_err=object_downcast(_eek_,ThrowableObject)){
			c_LDebug.m_error("LawbaseLoader.loadFrom - unknown exception");
		}else{
			throw _eek_;
		}
	}
	return c_LawbaseLoader.m_isValid();
}
c_LawbaseLoader.m_loadFrom=function(t_sPath){
	c_LawbaseLoader.m_reset();
	c_LDebug.m_info("VaRWLoader.loadFrom "+t_sPath);
	if(string_startswith(t_sPath,"http:") || string_startswith(t_sPath,"https:")){
		c_LawbaseLoader.m__last_remote=true;
		c_LawbaseLoader.m__last_base=t_sPath+"/";
	}else{
		c_LawbaseLoader.m__last_remote=false;
		c_LawbaseLoader.m__last_base=t_sPath+"\\";
	}
	return c_LawbaseLoader.m_executeLoad();
}
function c_Lawbase(){
	Object.call(this);
	this.m_country=0;
	this.m_forYear=0;
	this.m_version=0;
	this.m_ahvMinAltersrente=.0;
	this.m_ahvMinBeitragErwerbslos=.0;
	this.m_ahvMaxBeitragErwerbslos=.0;
	this.m_beitragssatzAngestellt=.0;
	this.m_minBeitragAngestellt=.0;
	this.m_minBeitragSelbstaendig=.0;
	this.m_minBeitragErwerbslos=.0;
	this.m_maxUVGlohn=.0;
	this.m_aufwertungsstart=0;
	this.m_aufwertungsfaktoren=[];
	this.m_max3AmitBVG=.0;
	this.m_max3AohneBVG=.0;
	this.m_sparzinsBPV=.0;
	this.m_umwandlungBPV=.0;
	this.m_prognoseBVG=false;
	this.m_sparzinsBVG=.0;
	this.m_umwandlungBVG=.0;
}
c_Lawbase.m_new=function(){
	return this;
}
c_Lawbase.prototype.p_setDefaults=function(){
}
c_Lawbase.prototype.p_parseValues=function(t_data){
	var t_json=null;
	var t_mainb=null;
	var t_block=null;
	var t_floats=null;
	var t_i=0;
	try{
		t_json=c_JsonParser.m_new.call(new c_JsonParser,t_data);
		t_mainb=object_downcast((t_json.p_ParseValue()),c_JsonObject);
		if(this.m_country==756){
			t_block=object_downcast((t_mainb.p_Get("CH",null)),c_JsonObject);
		}else{
			if(this.m_country==438){
				t_block=object_downcast((t_mainb.p_Get("LI",null)),c_JsonObject);
			}else{
				return false;
			}
		}
		var t_bForYear=t_block.p_GetInt("forYear",0);
		var t_bVersion=t_block.p_GetInt("version",0);
		if(t_bForYear<this.m_forYear || t_bForYear==this.m_forYear && t_bVersion<=this.m_version){
			return true;
		}
		this.m_forYear=t_bForYear;
		this.m_version=t_bVersion;
		this.m_ahvMinAltersrente=t_block.p_GetFloat("ahvMinAltersrente",0.0);
		this.m_ahvMinBeitragErwerbslos=t_block.p_GetFloat("ahvMinBeitragErwerbslos",0.0);
		this.m_ahvMaxBeitragErwerbslos=t_block.p_GetFloat("ahvMaxBeitragErwerbslos",0.0);
		this.m_beitragssatzAngestellt=t_block.p_GetFloat("beitragssatzAngestellt",0.0);
		this.m_minBeitragAngestellt=t_block.p_GetFloat("minBeitragAngestellt",0.0);
		this.m_minBeitragSelbstaendig=t_block.p_GetFloat("minBeitragSelbstaendig",0.0);
		this.m_minBeitragErwerbslos=t_block.p_GetFloat("minBeitragErwerbslos",0.0);
		this.m_maxUVGlohn=t_block.p_GetFloat("maxUVGlohn",0.0);
		this.m_aufwertungsstart=t_block.p_GetInt("aufwertungsstart",0);
		t_floats=object_downcast((t_block.p_Get("aufwertungsfaktoren",null)),c_JsonArray);
		if(t_floats!=null){
			this.m_aufwertungsfaktoren=new_number_array(t_floats.p_Length());
			for(t_i=0;t_i<t_floats.p_Length();t_i=t_i+1){
				this.m_aufwertungsfaktoren[t_i]=t_floats.p_GetFloat2(t_i);
			}
		}
		if(this.m_version>=2){
			this.m_max3AmitBVG=t_block.p_GetFloat("max3AmitBVG",0.0);
			this.m_max3AohneBVG=t_block.p_GetFloat("max3AohneBVG",0.0);
		}
		if(this.m_version>=3){
			this.m_sparzinsBPV=t_block.p_GetFloat("sparzinsBPV",0.0);
			this.m_umwandlungBPV=t_block.p_GetFloat("umwandlungBPV",0.0);
		}
		if(this.m_version>=4){
			this.m_prognoseBVG=t_block.p_GetBool("prognoseBVG",false);
			this.m_sparzinsBVG=t_block.p_GetFloat("sparzinsBVG",0.0);
			this.m_umwandlungBVG=t_block.p_GetFloat("umwandlungBVG",0.0);
		}
	}catch(_eek_){
		if(t_ex=object_downcast(_eek_,c_JsonError)){
			return false;
		}else{
			throw _eek_;
		}
	}
	return true;
}
c_Lawbase.prototype.p_liechtenstein=function(){
	return this.m_country==438;
}
c_Lawbase.prototype.p_schweiz=function(){
	return this.m_country==756;
}
function c_LawbaseCH(){
	c_Lawbase.call(this);
}
c_LawbaseCH.prototype=extend_class(c_Lawbase);
c_LawbaseCH.prototype.p_setDefaults=function(){
	this.m_country=756;
	this.m_forYear=2018;
	this.m_version=4;
	this.m_ahvMinAltersrente=14100.0;
	this.m_ahvMinBeitragErwerbslos=478.0;
	this.m_ahvMaxBeitragErwerbslos=23900.0;
	this.m_beitragssatzAngestellt=10.25;
	this.m_minBeitragAngestellt=4667.0;
	this.m_minBeitragSelbstaendig=9400.0;
	this.m_minBeitragErwerbslos=4667.0;
	this.m_maxUVGlohn=148200.0;
	this.m_aufwertungsstart=1969;
	this.m_aufwertungsfaktoren=[1.196,1.179,1.162,1.146,1.131,1.116,1.103,1.091,1.078,1.065,1.053,1.040,1.028,1.016,1.006];
	this.m_max3AmitBVG=6768.0;
	this.m_max3AohneBVG=33840.0;
	this.m_sparzinsBPV=0.0;
	this.m_umwandlungBPV=0.0;
	this.m_prognoseBVG=false;
	this.m_sparzinsBVG=1.0;
	this.m_umwandlungBVG=6.8;
}
c_LawbaseCH.m_new=function(){
	c_Lawbase.m_new.call(this);
	this.m_country=756;
	this.p_setDefaults();
	return this;
}
function c_LawbaseLI(){
	c_Lawbase.call(this);
}
c_LawbaseLI.prototype=extend_class(c_Lawbase);
c_LawbaseLI.prototype.p_setDefaults=function(){
	this.m_country=438;
	this.m_forYear=2018;
	this.m_version=2;
	this.m_ahvMinAltersrente=13920.0;
	this.m_ahvMinBeitragErwerbslos=350.4;
	this.m_ahvMaxBeitragErwerbslos=11670.4;
	this.m_beitragssatzAngestellt=11.6704;
	this.m_minBeitragAngestellt=4667.0;
	this.m_minBeitragSelbstaendig=6000.0;
	this.m_minBeitragErwerbslos=3824.0;
	this.m_maxUVGlohn=148200.0;
	this.m_aufwertungsstart=0;
	this.m_aufwertungsfaktoren=[2.1];
	this.m_max3AmitBVG=0.0;
	this.m_max3AohneBVG=0.0;
	this.m_sparzinsBPV=1.5;
	this.m_umwandlungBPV=5.6;
	this.m_prognoseBVG=false;
	this.m_sparzinsBVG=0.0;
	this.m_umwandlungBVG=0.0;
}
c_LawbaseLI.m_new=function(){
	c_Lawbase.m_new.call(this);
	this.m_country=438;
	this.p_setDefaults();
	return this;
}
function c_StCBasis(){
	Object.call(this);
	this.m__uid=0;
}
c_StCBasis.m__last_uid=0;
c_StCBasis.m_new=function(){
	c_StCBasis.m__last_uid=c_StCBasis.m__last_uid+1;
	this.m__uid=c_StCBasis.m__last_uid;
	return this;
}
c_StCBasis.prototype.p_getUID=function(){
	return this.m__uid;
}
function c_StC_natPers_BasisRechner(){
	c_StCBasis.call(this);
	this.m__strw=null;
	this.m__standper=0;
	this.m__rundung=0;
	this.m__liststort=c_StCOrtListe.m_new.call(new c_StCOrtListe);
	this.m__stort=null;
	this.m__mustUpdateZusaetze=true;
	this.m__stbund=null;
	this.m__stkt=null;
	this.m__stgmd=null;
	this.m__grundlage=c_StC_natPers_Grundlage.m_new.call(new c_StC_natPers_Grundlage);
	this.m__stobj=c_IntMap3.m_new.call(new c_IntMap3);
	this.m__maxstobj=c_IntMap3.m_new.call(new c_IntMap3);
}
c_StC_natPers_BasisRechner.prototype=extend_class(c_StCBasis);
c_StC_natPers_BasisRechner.m_new=function(){
	c_StCBasis.m_new.call(this);
	throw c_LException.m_new.call(new c_LException,"StC_natPers_BasisRechner:New() nicht implementiert, muss mit RW instanziiert werden");
}
c_StC_natPers_BasisRechner.m_new2=function(t_strw){
	c_StCBasis.m_new.call(this);
	this.m__strw=t_strw;
	this.m__standper=this.m__strw.m__defaultjahr;
	this.m__rundung=c_StC_common.m_Rundung_Franken;
	return this;
}
c_StC_natPers_BasisRechner.m_new3=function(t_strw,t_iStandPer){
	c_StCBasis.m_new.call(this);
	this.m__strw=t_strw;
	this.m__standper=this.m__strw.p_clampJahr(t_iStandPer);
	this.m__rundung=c_StC_common.m_Rundung_Franken;
	return this;
}
c_StC_natPers_BasisRechner.prototype.p_insertUniquetSteuerort=function(t_o){
	var t_=this.m__liststort.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_item=t_.p_NextObject();
		var t_curort=object_downcast((t_item),c_StCOrt);
		if(t_curort.p__plz()==t_o.p__plz() && t_curort.p__name()==t_o.p__name()){
			return false;
		}
	}
	this.m__liststort.p_add2(t_o);
	return true;
}
c_StC_natPers_BasisRechner.prototype.p_searchSteuerort=function(t_s,t_sprache,t_country,t_maxhit){
	var t_o=null;
	var t_p=null;
	var t_c=null;
	var t_iCnt=0;
	var t_search=c_StCSuch.m_new.call(new c_StCSuch,this.m__strw,t_s,t_country);
	this.m__liststort.p_clear();
	if(t_search.p_isValid()==false){
		c_LDebug.m_error("invalid search criteria");
		return 0;
	}
	try{
		t_iCnt=0;
		var t_=this.m__strw.m__storte.p_Values().p_ObjectEnumerator();
		while(t_.p_HasNext()){
			var t_x=t_.p_NextObject();
			t_o=object_downcast((t_x),c_StROrt);
			t_p=t_o.p_getPer(this.m__standper);
			if(t_search.p_match(t_p)){
				t_c=c_StCOrt.m_new3.call(new c_StCOrt,this.m__standper,t_o,t_p,t_sprache);
				if(t_c.p_isValid()==false){
					throw c_LException.m_new.call(new c_LException,"ung\u00fcltiger Steuerort "+String(t_o.m__id)+" f\u00fcr das Jahr "+String(this.m__standper));
				}
				if(this.p_insertUniquetSteuerort(t_c)){
					t_iCnt=t_iCnt+1;
					if(t_maxhit!=-1 && t_iCnt>=t_maxhit*2){
						break;
					}
				}
			}
		}
	}catch(_eek_){
		if(t_err1=object_downcast(_eek_,c_LException)){
			c_LDebug.m_exception("StC_natPers_BasisRechner.searchSteuerort",t_err1);
		}else if(t_err2=object_downcast(_eek_,ThrowableObject)){
			c_LDebug.m_error("unknown exception in Stc_natPers_BasisRechner.searchSteuerort");
		}else{
			throw _eek_;
		}
	}
	this.m__liststort.m__sortBy=1;
	this.m__liststort.p_sortArray(true);
	if(t_maxhit!=-1 && this.m__liststort.p_length()>t_maxhit){
		this.m__liststort.p_setLength(t_maxhit);
	}
	return this.m__liststort.p_length();
}
c_StC_natPers_BasisRechner.prototype.p_isValid=function(){
	if(this.m__stort==null){
		return false;
	}
	return this.m__stort.p_isValid();
}
c_StC_natPers_BasisRechner.prototype.p_clear=function(){
	this.m__stort=null;
	this.m__stbund=null;
	this.m__stkt=null;
	this.m__stgmd=null;
	this.m__grundlage=c_StC_natPers_Grundlage.m_new.call(new c_StC_natPers_Grundlage);
	this.m__stobj.p_Clear();
	this.m__maxstobj.p_Clear();
	this.m__mustUpdateZusaetze=true;
}
c_StC_natPers_BasisRechner.prototype.p_setStandPer=function(t_iStandPer){
	var t_ok=true;
	if(this.m__standper==t_iStandPer){
		return t_ok;
	}
	this.m__standper=this.m__strw.p_clampJahr(t_iStandPer);
	this.m__mustUpdateZusaetze=true;
	try{
		if(this.p_isValid()==false){
			return true;
		}
		this.m__stort=c_StCOrt.m_new.call(new c_StCOrt,this.m__standper,this.m__strw.p_getSteuerort(this.m__stort.p__id()));
		if(this.m__stort.p_isValid()==false){
			throw c_LException.m_new.call(new c_LException,"ung\u00fcltiger Steuerort "+String(this.m__stort.p__id())+" f\u00fcr das Jahr "+String(this.m__standper));
		}
		this.m__stbund=c_StC_natPers_Kt.m_new.call(new c_StC_natPers_Kt,this.m__standper,this.m__strw.p_getKt(c_StR_common.m_Kanton_CH,false));
		if(this.m__stbund.p_isValid()==false){
			throw c_LException.m_new.call(new c_LException,"ung\u00fcltige Grundlage f\u00fcr Bund f\u00fcr das Jahr "+String(this.m__standper));
		}
		this.m__stkt=c_StC_natPers_Kt.m_new.call(new c_StC_natPers_Kt,this.m__standper,this.m__strw.p_getKt(this.m__stort.p__ktid(),false));
		if(this.m__stkt.p_isValid()==false){
			throw c_LException.m_new.call(new c_LException,"ung\u00fcltige Grundlage f\u00fcr Kanton "+this.m__stort.p__kt()+" f\u00fcr das Jahr "+String(this.m__standper));
		}
		this.m__stgmd=c_StC_natPers_Gmd.m_new.call(new c_StC_natPers_Gmd,this.m__stkt.p__gesetzjahr(),this.m__strw.p_getGmd(this.m__stort.p__gmdid()));
		if(this.m__stgmd.p_isValid()==false){
			throw c_LException.m_new.call(new c_LException,"ung\u00fcltige Grundlage f\u00fcr Gemeinde "+String(this.m__stort.p__gmdid())+" f\u00fcr das Jahr "+String(this.m__standper));
		}
		if(this.m__stkt.p__gesetzjahr()!=this.m__standper){
			this.m__stort=c_StCOrt.m_new.call(new c_StCOrt,this.m__stkt.p__gesetzjahr(),this.m__strw.p_getSteuerort(this.m__stort.p__id()));
			if(this.m__stort.p_isValid()==false){
				throw c_LException.m_new.call(new c_LException,"ung\u00fcltiger Steuerort "+String(this.m__stort.p__id())+" f\u00fcr das Jahr "+String(this.m__stkt.p__gesetzjahr()));
			}
		}
	}catch(_eek_){
		if(t_err1=object_downcast(_eek_,c_LException)){
			this.p_clear();
			t_ok=false;
			c_LDebug.m_exception("StC_natPers_BasisRechner.setStandPer",t_err1);
		}else if(t_err2=object_downcast(_eek_,ThrowableObject)){
			this.p_clear();
			t_ok=false;
			c_LDebug.m_error("unknown Exception in StC_natPers_BasisRechner.setStandPer");
		}else{
			throw _eek_;
		}
	}
	return t_ok;
}
c_StC_natPers_BasisRechner.prototype.p_loadSteuerort=function(t_iOrtsID,t_iStandPer){
	this.m__standper=0;
	if(t_iOrtsID<=0){
		this.m__stort=null;
		return false;
	}
	this.m__stort=c_StCOrt.m_new.call(new c_StCOrt,t_iStandPer,this.m__strw.p_getSteuerort(t_iOrtsID));
	if(this.m__stort.p_isValid()==false){
		return false;
	}
	return this.p_setStandPer(t_iStandPer);
}
c_StC_natPers_BasisRechner.prototype.p_loadSteuerort2=function(t_iOrtsID){
	return this.p_loadSteuerort(t_iOrtsID,this.m__standper);
}
c_StC_natPers_BasisRechner.prototype.p_addSteuerObjekt=function(t_iTyp){
	var t_o=null;
	var t_3=t_iTyp;
	if(t_3==c_StC_natPers.m_CalcTyp_EINKOMMENSSTEUER){
		t_o=(c_StCStObjektEK.m_new.call(new c_StCStObjektEK,this));
	}else{
		if(t_3==c_StC_natPers.m_CalcTyp_VERMOEGENSSTEUER){
			t_o=(c_StCStObjektVM.m_new.call(new c_StCStObjektVM,this));
		}else{
			if(t_3==c_StC_natPers.m_CalcTyp_PERSONALSTEUER){
				t_o=(c_StCStObjektPS.m_new.call(new c_StCStObjektPS,this));
			}else{
				if(t_3==c_StC_natPers.m_CalcTyp_STEUER_SAUELE_2A3A){
					t_o=(c_StCStObjektKapital.m_new.call(new c_StCStObjektKapital,this,true));
				}else{
					if(t_3==c_StC_natPers.m_CalcTyp_STEUER_SAUELE_3B){
						t_o=(c_StCStObjektKapital.m_new.call(new c_StCStObjektKapital,this,false));
					}else{
						if(t_3==c_StC_natPers.m_CalcTyp_ERBSCHAFTSSTEUER){
							t_o=(c_StCStObjektES.m_new.call(new c_StCStObjektES,this,c_StC_natPers.m_CalcTyp_ERBSCHAFTSSTEUER));
						}else{
							if(t_3==c_StC_natPers.m_CalcTyp_SCHENKUNGSSTEUER){
								t_o=(c_StCStObjektES.m_new.call(new c_StCStObjektES,this,c_StC_natPers.m_CalcTyp_SCHENKUNGSSTEUER));
							}
						}
					}
				}
			}
		}
	}
	this.m__stobj.p_Add2(t_o.p_getUID(),(t_o));
	return t_o;
}
function c_StC_common(){
	Object.call(this);
}
c_StC_common.m_Rundung_Franken=0;
c_StC_common.m_Runden_AB=0;
c_StC_common.m_Runden_AUF=0;
c_StC_common.m_Runden_NORMAL=0;
c_StC_common.m_Rundung_KEIN=0;
c_StC_common.m_Rundung_Rappen=0;
c_StC_common.m_TaxLevel_BUND=0;
c_StC_common.m_TaxLevel_KANTON=0;
c_StC_common.m_TaxLevel_GEMEINDE=0;
c_StC_common.m_TaxLevel_KIRCHE=0;
function c_StROrtPer(){
	c_RWBasis.call(this);
	this.m__abjahr=0;
	this.m__normort="";
	this.m__plz=0;
	this.m__ktid=0;
	this.m__ort="";
	this.m__bisjahr=0;
	this.m__lat=.0;
	this.m__lng=.0;
	this.m__sprachcode=0;
}
c_StROrtPer.prototype=extend_class(c_RWBasis);
c_StROrtPer.m_new=function(){
	c_RWBasis.m_new.call(this);
	return this;
}
c_StROrtPer.prototype.p_getNew=function(){
	return (c_StROrtPer.m_new.call(new c_StROrtPer));
}
c_StROrtPer.prototype.p_getUID=function(){
	return this.m__abjahr;
}
c_StROrtPer.prototype.p_from=function(t_mustDecodeUTF8,t_o){
	this.m__abjahr=c_RWBasis.m_I(t_o,"a");
	if(this.m__abjahr==0){
		this.m__abjahr=2008;
	}
	this.m__bisjahr=c_RWBasis.m_I(t_o,"b");
	if(this.m__bisjahr==0){
		this.m__bisjahr=9999;
	}
	this.m__plz=c_RWBasis.m_I(t_o,"p");
	if(this.m__plz==0){
		this.m__plz=((object_downcast((this.m__parent),c_StROrt).m__id/100000)|0);
	}
	this.m__ort=c_RWBasis.m_Sdecode(t_mustDecodeUTF8,t_o,"o");
	this.m__normort=c_StCSuch.m_norm(this.m__ort);
	this.m__ktid=c_RWBasis.m_I(t_o,"k");
	this.m__lat=c_RWBasis.m_F(t_o,"x");
	this.m__lng=c_RWBasis.m_F(t_o,"y");
	this.m__sprachcode=c_RWBasis.m_I(t_o,"s");
}
function c_StCOrt(){
	Object.call(this);
	this.m__standper=0;
	this.m__strort=null;
	this.m__strortper=null;
	this.m__strortgmd=null;
	this.m__distKM=.0;
}
c_StCOrt.m_new=function(t_iStandPer,t_o){
	this.m__standper=t_iStandPer;
	this.m__strort=t_o;
	if(this.m__strort!=null){
		this.m__strortper=this.m__strort.p_getPer(this.m__standper);
		this.m__strortgmd=this.m__strort.p_getGmdPer(this.m__standper);
	}
	return this;
}
c_StCOrt.m_new2=function(t_iStandPer,t_o,t_p){
	this.m__standper=t_iStandPer;
	this.m__strort=t_o;
	this.m__strortper=t_p;
	if(this.m__strort!=null){
		this.m__strortgmd=this.m__strort.p_getGmdPer(this.m__standper);
	}
	return this;
}
c_StCOrt.prototype.p_isValid=function(){
	if(this.m__strort==null || this.m__strortgmd==null || this.m__strortper==null){
		return false;
	}
	return true;
}
c_StCOrt.m_new3=function(t_iStandPer,t_o,t_p,t_lang){
	this.m__standper=t_iStandPer;
	if(t_o!=null && t_lang>0 && t_o.m__sprachcluster!=null){
		var t_o2=t_o.p_getOrtOfLanguage(t_lang);
		if(t_o2!=null && t_o!=t_o2){
			this.m__strort=t_o2;
			this.m__strortper=this.m__strort.p_getPer(this.m__standper);
			this.m__strortgmd=this.m__strort.p_getGmdPer(this.m__standper);
		}
	}
	if(this.p_isValid()==false){
		this.m__strort=t_o;
		this.m__strortper=t_p;
		if(this.m__strort!=null){
			this.m__strortgmd=this.m__strort.p_getGmdPer(this.m__standper);
		}
	}
	return this;
}
c_StCOrt.m_new4=function(){
	return this;
}
c_StCOrt.prototype.p__plz=function(){
	return this.m__strortper.m__plz;
}
c_StCOrt.prototype.p__name=function(){
	return this.m__strortper.m__ort;
}
c_StCOrt.prototype.p__id=function(){
	return this.m__strort.m__id;
}
c_StCOrt.prototype.p__ktid=function(){
	return this.m__strortper.m__ktid;
}
c_StCOrt.prototype.p__kt=function(){
	var t_kt=c_StRWLoader.m__current_rw.p_getKt(this.p__ktid(),true);
	if(t_kt!=null){
		return t_kt.m__kt;
	}
	return "";
}
c_StCOrt.prototype.p__gmdid=function(){
	return this.m__strortgmd.m__gmdid;
}
c_StCOrt.prototype.p__land=function(){
	var t_kt=c_StRWLoader.m__current_rw.p_getKt(this.p__ktid(),true);
	if(t_kt.p_isCH()){
		return 756;
	}
	if(t_kt.p_isLI()){
		return 438;
	}
	return 9999;
}
function c_StCSuch(){
	Object.call(this);
	this.m__c=0;
	this.m__o="";
	this.m__p=0;
	this.m__k=0;
}
c_StCSuch.m_norm=function(t_search){
	var t_s=c_StringStack.m_new2.call(new c_StringStack);
	var t_=t_search;
	var t_2=0;
	while(t_2<t_.length){
		var t_c=t_.charCodeAt(t_2);
		t_2=t_2+1;
		if(bb_utils_isAlpha(t_c) || bb_utils_isSpace(t_c)){
			t_s.p_Push(String.fromCharCode(t_c));
		}else{
			if(bb_utils_isSonderA(t_c)){
				t_s.p_Push("A");
			}else{
				if(bb_utils_isSonderE(t_c)){
					t_s.p_Push("E");
				}else{
					if(bb_utils_isSonderI(t_c)){
						t_s.p_Push("I");
					}else{
						if(bb_utils_isSonderO(t_c)){
							t_s.p_Push("O");
						}else{
							if(bb_utils_isSonderU(t_c)){
								t_s.p_Push("U");
							}else{
								if(bb_utils_isSonderC(t_c)){
									t_s.p_Push("C");
								}
							}
						}
					}
				}
			}
		}
	}
	var t_str="";
	t_str=t_s.p_Join("").toUpperCase();
	return t_str;
}
c_StCSuch.m_new=function(t_rw,t_search,t_country){
	var t_s=string_trim(t_search.toUpperCase());
	var t_sTok=[];
	var t_i=0;
	this.m__c=t_country;
	if(t_s==""){
		return this;
	}
	this.m__o=t_s;
	if(this.m__o=="LOGISMATA"){
		this.m__o=c_StCSuch.m_norm("Z\u00fcrich");
		this.m__p=8005;
		return this;
	}
	if(this.m__o=="ZETTLER"){
		this.m__o=c_StCSuch.m_norm("Winterthur");
		this.m__p=8400;
		return this;
	}
	t_sTok=t_s.split(",");
	if(t_sTok.length==0){
		return this;
	}
	if(t_sTok.length==2){
		this.m__o=t_sTok[0];
		this.m__k=t_rw.p_getKtID(string_trim(t_sTok[1].toUpperCase()));
	}
	t_sTok=this.m__o.split(" ");
	if(t_sTok.length>0 && bb_utils_isDigit(t_sTok[0].charCodeAt(0))){
		this.m__p=parseInt((t_sTok[0]),10);
		this.m__o="";
		if(t_sTok.length>1){
			this.m__o=string_trim(t_sTok[1]);
			for(t_i=2;t_i<t_sTok.length;t_i=t_i+1){
				if(this.m__o.length>0){
					this.m__o=this.m__o+" ";
				}
				this.m__o=this.m__o+string_trim(t_sTok[t_i]);
				this.m__o=string_trim(this.m__o);
			}
		}
	}
	this.m__o=c_StCSuch.m_norm(this.m__o);
	return this;
}
c_StCSuch.m_new2=function(){
	return this;
}
c_StCSuch.prototype.p_isValid=function(){
	if(this.m__o.length>1){
		return true;
	}
	if(this.m__p>9){
		return true;
	}
	if(this.m__p>1 && this.m__o.length>0){
		return true;
	}
	if(this.m__k>0){
		return true;
	}
	if(this.m__c==438){
		return true;
	}
	return false;
}
c_StCSuch.prototype.p_match=function(t_p){
	if(t_p==null){
		return false;
	}
	if(this.m__o.length>0){
		if(string_startswith(t_p.m__normort,this.m__o)==false){
			return false;
		}
	}
	if(this.m__p>=1 && this.m__p<10 && ((t_p.m__plz/1000)|0)!=this.m__p){
		return false;
	}
	if(this.m__p>=10 && this.m__p<100 && ((t_p.m__plz/100)|0)!=this.m__p){
		return false;
	}
	if(this.m__p>=100 && this.m__p<1000 && ((t_p.m__plz/10)|0)!=this.m__p){
		return false;
	}
	if(this.m__p>=1000 && t_p.m__plz!=this.m__p){
		return false;
	}
	if(this.m__k>0 && t_p.m__ktid!=this.m__k){
		return false;
	}
	if(this.m__c!=0){
		if(this.m__c==756){
			if(t_p.m__ktid==c_StR_common.m_Kanton_LI){
				return false;
			}
		}
		if(this.m__c==438){
			if(t_p.m__ktid!=c_StR_common.m_Kanton_LI){
				return false;
			}
		}
	}
	return true;
}
function bb_utils_isAlpha(t_ch){
	return t_ch>=65 && t_ch<=90 || t_ch>=97 && t_ch<=122;
}
function bb_utils_isSpace(t_ch){
	return t_ch<=32;
}
function bb_utils_isSonderA(t_ch){
	return t_ch>=192 && t_ch<=198 || t_ch>=224 && t_ch<=230;
}
function bb_utils_isSonderE(t_ch){
	return t_ch>=200 && t_ch<=203 || t_ch>=232 && t_ch<=235;
}
function bb_utils_isSonderI(t_ch){
	return t_ch>=204 && t_ch<=207 || t_ch>=236 && t_ch<=239;
}
function bb_utils_isSonderO(t_ch){
	return t_ch>=210 && t_ch<=214 || t_ch>=242 && t_ch<=246;
}
function bb_utils_isSonderU(t_ch){
	return t_ch>=217 && t_ch<=220 || t_ch>=249 && t_ch<=252;
}
function bb_utils_isSonderC(t_ch){
	return t_ch==199 || t_ch==231;
}
function bb_utils_isDigit(t_ch){
	return t_ch>=48 && t_ch<=57;
}
function c_StCOrtListe(){
	c_Collection.call(this);
	this.m__sortBy=0;
}
c_StCOrtListe.prototype=extend_class(c_Collection);
c_StCOrtListe.m_new=function(){
	c_Collection.m_new.call(this);
	return this;
}
c_StCOrtListe.prototype.p_compareItem=function(t_o1,t_o2){
	var t_e1=object_downcast((t_o1),c_StCOrt);
	var t_e2=object_downcast((t_o2),c_StCOrt);
	if(this.m__sortBy==1){
		if(t_e1.p__plz()>t_e2.p__plz()){
			return 1;
		}
		if(t_e1.p__plz()<t_e2.p__plz()){
			return -1;
		}
		if(t_e1.p__name()>t_e2.p__name()){
			return 1;
		}
		if(t_e1.p__name()<t_e2.p__name()){
			return -1;
		}
	}else{
		if(this.m__sortBy==2){
			if(t_e1.m__distKM>t_e2.m__distKM){
				return 1;
			}
			if(t_e1.m__distKM<t_e2.m__distKM){
				return -1;
			}
			if(t_e1.p__plz()>t_e2.p__plz()){
				return 1;
			}
			if(t_e1.p__plz()<t_e2.p__plz()){
				return -1;
			}
			if(t_e1.p__name()>t_e2.p__name()){
				return 1;
			}
			if(t_e1.p__name()<t_e2.p__name()){
				return -1;
			}
		}else{
			if(t_e1.p__id()>t_e2.p__id()){
				return 1;
			}
			if(t_e1.p__id()<t_e2.p__id()){
				return -1;
			}
		}
	}
	return 0;
}
function c_StR_common(){
	Object.call(this);
}
c_StR_common.m_Kanton_LI=0;
c_StR_common.m_Kanton_CH=0;
c_StR_common.m_ProgrTyp_G_A=0;
c_StR_common.m_ProgrTyp_G_B=0;
c_StR_common.m_ProgrTyp_G_A_OHNE_RABATT=0;
c_StR_common.m_ProgrTyp_SOURCE=0;
c_StR_common.m_ProgrTyp_FIX=0;
c_StR_common.m_ProgrTyp_DEF=0;
c_StR_common.m_ProgrTyp_B=0;
c_StR_common.m_ProgrTyp_FORMEL=0;
c_StR_common.m_ProgrTyp_F=0;
c_StR_common.m_ProgrTyp_Z=0;
c_StR_common.m_ProgrTyp_R=0;
c_StR_common.m_ProgrTyp_K=0;
c_StR_common.m_ProgrTyp_TIEF_EK=0;
c_StR_common.m_RundungTyp_DOWN=0;
c_StR_common.m_RundungTyp_UP=0;
c_StR_common.m_RundungTyp_NEXT=0;
c_StR_common.m_RundungTyp_VORABZUG=0;
c_StR_common.m_RundungTyp_NACHABZUG=0;
function c_StROrtZuGmd(){
	c_RWBasis.call(this);
	this.m__abjahr=0;
	this.m__gmdid=0;
	this.m__bisjahr=0;
}
c_StROrtZuGmd.prototype=extend_class(c_RWBasis);
c_StROrtZuGmd.m_new=function(){
	c_RWBasis.m_new.call(this);
	return this;
}
c_StROrtZuGmd.prototype.p_getNew=function(){
	return (c_StROrtZuGmd.m_new.call(new c_StROrtZuGmd));
}
c_StROrtZuGmd.prototype.p_getUID=function(){
	return this.m__abjahr;
}
c_StROrtZuGmd.prototype.p_from=function(t_mustDecodeUTF8,t_o){
	this.m__abjahr=c_RWBasis.m_I(t_o,"a");
	if(this.m__abjahr==0){
		this.m__abjahr=2008;
	}
	this.m__bisjahr=c_RWBasis.m_I(t_o,"b");
	if(this.m__bisjahr==0){
		this.m__bisjahr=9999;
	}
	this.m__gmdid=c_RWBasis.m_I(t_o,"g");
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
function c_StC_natPers_Kt(){
	Object.call(this);
	this.m__standper=0;
	this.m__strkt=null;
	this.m__strktper=null;
	this.m__stfuss_ek=.0;
	this.m__stfuss_vm=.0;
}
c_StC_natPers_Kt.m_new=function(t_iStandPer,t_o){
	this.m__standper=t_iStandPer;
	this.m__strkt=t_o;
	if(this.m__strkt!=null){
		this.m__strktper=this.m__strkt.p_getPer(this.m__standper);
		if(this.m__strktper!=null){
			this.m__stfuss_ek=this.m__strktper.m__stfuss_ek;
			this.m__stfuss_vm=this.m__strktper.m__stfuss_vm;
		}
	}
	return this;
}
c_StC_natPers_Kt.m_new2=function(){
	return this;
}
c_StC_natPers_Kt.prototype.p_isValid=function(){
	if(this.m__strkt==null || this.m__strktper==null){
		return false;
	}
	return true;
}
c_StC_natPers_Kt.prototype.p__gesetzjahr=function(){
	return this.m__strktper.m__abjahr;
}
c_StC_natPers_Kt.prototype.p_isLI=function(){
	return this.m__strkt.p_isLI();
}
c_StC_natPers_Kt.prototype.p__id=function(){
	return this.m__strkt.m__id;
}
c_StC_natPers_Kt.prototype.p__idxabzug=function(){
	return this.m__strktper.m__idxabzug;
}
c_StC_natPers_Kt.prototype.p__rtabjahr=function(){
	return this.m__strktper.m__rtabjahr;
}
c_StC_natPers_Kt.prototype.p__kopfsteuer=function(){
	return ((this.m__strktper.m__ps)|0);
}
function c_StRKtPer(){
	c_RWBasis.call(this);
	this.m__abjahr=0;
	this.m__stfuss_ek=.0;
	this.m__stfuss_vm=.0;
	this.m__stand="";
	this.m__ps=.0;
	this.m__idxabzug=0;
	this.m__rtabjahr=0;
	this.m__kapges_stfuss_gew=.0;
	this.m__kapges_stfuss_kap=.0;
	this.m__domhold_stfuss_gew=.0;
	this.m__domhold_stfuss_kap=.0;
	this.m__jurpers_spez_fag=0;
	this.m__jurpers_fag_faktor=.0;
	this.m__jurpers_stand="";
	this.m__jurpers_spez_rueckstellung=0;
	this.m__kapges_minst_typ=0;
	this.m__kapges_minst=.0;
	this.m__genoss_minst_typ=0;
	this.m__genoss_minst=.0;
	this.m__kapges_maxst_typ=0;
	this.m__kapges_maxst_rg=.0;
	this.m__kapges_maxst_kap=.0;
	this.m__hold_minst_typ=0;
	this.m__hold_minst=.0;
	this.m__hold_maxst_typ=0;
	this.m__hold_maxst_rg=.0;
	this.m__hold_maxst_kap=.0;
}
c_StRKtPer.prototype=extend_class(c_RWBasis);
c_StRKtPer.m_new=function(){
	c_RWBasis.m_new.call(this);
	return this;
}
c_StRKtPer.prototype.p_getNew=function(){
	return (c_StRKtPer.m_new.call(new c_StRKtPer));
}
c_StRKtPer.prototype.p_getUID=function(){
	return this.m__abjahr;
}
c_StRKtPer.prototype.p_from=function(t_mustDecodeUTF8,t_o){
	this.m__abjahr=c_RWBasis.m_I(t_o,"ab");
	this.m__stand=c_RWBasis.m_S(t_o,"std");
	this.m__stfuss_ek=c_RWBasis.m_F(t_o,"f1");
	this.m__stfuss_vm=c_RWBasis.m_F(t_o,"f2");
	this.m__ps=c_RWBasis.m_F(t_o,"ps");
	this.m__idxabzug=c_RWBasis.m_I(t_o,"idxabzg");
	this.m__rtabjahr=c_RWBasis.m_I(t_o,"rtabjahr");
	this.m__kapges_stfuss_gew=c_RWBasis.m_F(t_o,"f3");
	this.m__kapges_stfuss_kap=c_RWBasis.m_F(t_o,"f4");
	this.m__domhold_stfuss_gew=c_RWBasis.m_F(t_o,"f5");
	this.m__domhold_stfuss_kap=c_RWBasis.m_F(t_o,"f6");
	this.m__jurpers_spez_fag=c_RWBasis.m_I(t_o,"jspzfag");
	this.m__jurpers_fag_faktor=c_RWBasis.m_F(t_o,"jfaktfag");
	this.m__jurpers_stand=c_RWBasis.m_S(t_o,"jstd");
	this.m__jurpers_spez_rueckstellung=c_RWBasis.m_I(t_o,"jspzru");
	this.m__kapges_minst_typ=c_RWBasis.m_I(t_o,"kgmint");
	this.m__kapges_minst=c_RWBasis.m_F(t_o,"kgminst");
	this.m__genoss_minst_typ=c_RWBasis.m_I(t_o,"gmint");
	this.m__genoss_minst=c_RWBasis.m_F(t_o,"gminst");
	this.m__kapges_maxst_typ=c_RWBasis.m_I(t_o,"kgmaxt");
	this.m__kapges_maxst_rg=c_RWBasis.m_F(t_o,"kgmaxrg");
	this.m__kapges_maxst_kap=c_RWBasis.m_F(t_o,"kgmaxkap");
	this.m__hold_minst_typ=c_RWBasis.m_I(t_o,"hmint");
	this.m__hold_minst=c_RWBasis.m_F(t_o,"hminst");
	this.m__hold_maxst_typ=c_RWBasis.m_I(t_o,"hmaxt");
	this.m__hold_maxst_rg=c_RWBasis.m_F(t_o,"hmaxrg");
	this.m__hold_maxst_kap=c_RWBasis.m_F(t_o,"hmaxkap");
}
function c_StR_natPers_SoBerKt(){
	c_RWBasis.call(this);
	this.m__id=0;
	this.m__abjahr=0;
	this.m__objtyp=0;
	this.m__id_grp=0;
	this.m__id_auszgrund=0;
	this.m__spez=0;
	this.m__minsttyp=0;
	this.m__minst=.0;
	this.m__maxsttyp=0;
	this.m__maxst=.0;
	this.m__progid=0;
	this.m__freibetr=.0;
	this.m__bteil=.0;
	this.m__divisor=.0;
	this.m__es_grp=0;
	this.m__es_beguenst=0;
	this.m__es_faktor=.0;
	this.m__es_info="";
}
c_StR_natPers_SoBerKt.prototype=extend_class(c_RWBasis);
c_StR_natPers_SoBerKt.m_new=function(){
	c_RWBasis.m_new.call(this);
	return this;
}
c_StR_natPers_SoBerKt.prototype.p_getNew=function(){
	return (c_StR_natPers_SoBerKt.m_new.call(new c_StR_natPers_SoBerKt));
}
c_StR_natPers_SoBerKt.prototype.p_from=function(t_mustDecodeUTF8,t_o){
	this.m__id=c_RWBasis.m_I(t_o,"id");
	this.m__abjahr=c_RWBasis.m_I(t_o,"ab");
	this.m__objtyp=c_RWBasis.m_I(t_o,"obj");
	this.m__id_grp=c_RWBasis.m_I(t_o,"grp");
	this.m__id_auszgrund=c_RWBasis.m_I(t_o,"aszg");
	this.m__spez=c_RWBasis.m_I(t_o,"spz");
	this.m__minsttyp=c_RWBasis.m_I(t_o,"minstt");
	this.m__minst=c_RWBasis.m_F(t_o,"minst");
	this.m__maxsttyp=c_RWBasis.m_I(t_o,"maxstt");
	this.m__maxst=c_RWBasis.m_F(t_o,"maxst");
	this.m__progid=c_RWBasis.m_I(t_o,"prog");
	this.m__freibetr=c_RWBasis.m_F(t_o,"freib");
	this.m__bteil=c_RWBasis.m_F(t_o,"bteil");
	this.m__divisor=c_RWBasis.m_F(t_o,"div");
	this.m__es_grp=c_RWBasis.m_I(t_o,"es_grp");
	this.m__es_beguenst=c_RWBasis.m_I(t_o,"es_beg");
	this.m__es_faktor=c_RWBasis.m_F(t_o,"es_fak");
	this.m__es_info=c_RWBasis.m_S(t_o,"es_info");
}
function c_StR_natPers_SoBerGmd(){
	c_RWBasis.call(this);
	this.m__id=0;
	this.m__abjahr=0;
	this.m__basis=0;
	this.m__objtyp=0;
	this.m__id_grp=0;
	this.m__id_auszgrund=0;
	this.m__spez=0;
	this.m__minsttyp=0;
	this.m__minst=.0;
	this.m__maxsttyp=0;
	this.m__maxst=.0;
	this.m__progid=0;
	this.m__freibetr=.0;
	this.m__bteil=.0;
	this.m__divisor=.0;
	this.m__es_grp=0;
	this.m__es_beguenst=0;
	this.m__es_faktor=.0;
	this.m__es_info="";
}
c_StR_natPers_SoBerGmd.prototype=extend_class(c_RWBasis);
c_StR_natPers_SoBerGmd.m_new=function(){
	c_RWBasis.m_new.call(this);
	return this;
}
c_StR_natPers_SoBerGmd.prototype.p_getNew=function(){
	return (c_StR_natPers_SoBerGmd.m_new.call(new c_StR_natPers_SoBerGmd));
}
c_StR_natPers_SoBerGmd.prototype.p_from=function(t_mustDecodeUTF8,t_o){
	this.m__id=c_RWBasis.m_I(t_o,"id");
	this.m__abjahr=c_RWBasis.m_I(t_o,"ab");
	this.m__basis=c_RWBasis.m_I(t_o,"bas");
	this.m__objtyp=c_RWBasis.m_I(t_o,"obj");
	this.m__id_grp=c_RWBasis.m_I(t_o,"grp");
	this.m__id_auszgrund=c_RWBasis.m_I(t_o,"aszg");
	this.m__spez=c_RWBasis.m_I(t_o,"spz");
	this.m__minsttyp=c_RWBasis.m_I(t_o,"minstt");
	this.m__minst=c_RWBasis.m_F(t_o,"minst");
	this.m__maxsttyp=c_RWBasis.m_I(t_o,"maxstt");
	this.m__maxst=c_RWBasis.m_F(t_o,"maxst");
	this.m__progid=c_RWBasis.m_I(t_o,"prog");
	this.m__freibetr=c_RWBasis.m_F(t_o,"freib");
	this.m__bteil=c_RWBasis.m_F(t_o,"bteil");
	this.m__divisor=c_RWBasis.m_F(t_o,"div");
	this.m__es_grp=c_RWBasis.m_I(t_o,"es_grp");
	this.m__es_beguenst=c_RWBasis.m_I(t_o,"es_beg");
	this.m__es_faktor=c_RWBasis.m_F(t_o,"es_fak");
	this.m__es_info=c_RWBasis.m_S(t_o,"es_info");
}
function c_StR_natPers_SoBerChr(){
	c_RWBasis.call(this);
	this.m__id=0;
	this.m__abjahr=0;
	this.m__basis=0;
	this.m__typkirche=0;
	this.m__objtyp=0;
	this.m__id_grp=0;
	this.m__id_auszgrund=0;
	this.m__spez=0;
	this.m__minsttyp=0;
	this.m__minst=.0;
	this.m__maxsttyp=0;
	this.m__maxst=.0;
	this.m__progid=0;
	this.m__bteil=.0;
	this.m__divisor=.0;
}
c_StR_natPers_SoBerChr.prototype=extend_class(c_RWBasis);
c_StR_natPers_SoBerChr.m_new=function(){
	c_RWBasis.m_new.call(this);
	return this;
}
c_StR_natPers_SoBerChr.prototype.p_getNew=function(){
	return (c_StR_natPers_SoBerChr.m_new.call(new c_StR_natPers_SoBerChr));
}
c_StR_natPers_SoBerChr.prototype.p_from=function(t_mustDecodeUTF8,t_o){
	this.m__id=c_RWBasis.m_I(t_o,"id");
	this.m__abjahr=c_RWBasis.m_I(t_o,"ab");
	this.m__basis=c_RWBasis.m_I(t_o,"bas");
	this.m__typkirche=c_RWBasis.m_I(t_o,"typ");
	this.m__objtyp=c_RWBasis.m_I(t_o,"obj");
	this.m__id_grp=c_RWBasis.m_I(t_o,"grp");
	this.m__id_auszgrund=c_RWBasis.m_I(t_o,"aszg");
	this.m__spez=c_RWBasis.m_I(t_o,"spz");
	this.m__minsttyp=c_RWBasis.m_I(t_o,"minstt");
	this.m__minst=c_RWBasis.m_F(t_o,"minst");
	this.m__maxsttyp=c_RWBasis.m_I(t_o,"maxstt");
	this.m__maxst=c_RWBasis.m_F(t_o,"maxst");
	this.m__progid=c_RWBasis.m_I(t_o,"prog");
	this.m__bteil=c_RWBasis.m_F(t_o,"bteil");
	this.m__divisor=c_RWBasis.m_F(t_o,"div");
}
function c_StR_natPers_S3bEEPer(){
	c_RWBasis.call(this);
	this.m__soberid=0;
	this.m__abjahr=0;
	this.m__s3beeid=0;
}
c_StR_natPers_S3bEEPer.prototype=extend_class(c_RWBasis);
c_StR_natPers_S3bEEPer.m_new=function(){
	c_RWBasis.m_new.call(this);
	return this;
}
c_StR_natPers_S3bEEPer.prototype.p_getNew=function(){
	return (c_StR_natPers_S3bEEPer.m_new.call(new c_StR_natPers_S3bEEPer));
}
c_StR_natPers_S3bEEPer.prototype.p_from=function(t_mustDecodeUTF8,t_o){
	this.m__soberid=c_RWBasis.m_I(t_o,"id");
	this.m__abjahr=c_RWBasis.m_I(t_o,"ab");
	this.m__s3beeid=c_RWBasis.m_I(t_o,"s3bee");
}
function c_StR_natPers_AbzgPer(){
	c_RWBasis.call(this);
	this.m__soberid=0;
	this.m__abjahr=0;
	this.m__id_grp=0;
	this.m__abzugid=0;
	this.m__sort=0;
}
c_StR_natPers_AbzgPer.prototype=extend_class(c_RWBasis);
c_StR_natPers_AbzgPer.m_new=function(){
	c_RWBasis.m_new.call(this);
	return this;
}
c_StR_natPers_AbzgPer.prototype.p_getNew=function(){
	return (c_StR_natPers_AbzgPer.m_new.call(new c_StR_natPers_AbzgPer));
}
c_StR_natPers_AbzgPer.prototype.p_from=function(t_mustDecodeUTF8,t_o){
	this.m__soberid=c_RWBasis.m_I(t_o,"id");
	this.m__abjahr=c_RWBasis.m_I(t_o,"ab");
	this.m__id_grp=c_RWBasis.m_I(t_o,"grp");
	this.m__abzugid=c_RWBasis.m_I(t_o,"abzg");
	this.m__sort=c_RWBasis.m_I(t_o,"sort");
}
function c_StR_natPers_KtMVAPer(){
	c_RWBasis.call(this);
	this.m__objtyp=0;
	this.m__abjahr=0;
	this.m__bisjahr=0;
	this.m__id_grp=0;
	this.m__id_eart=0;
	this.m__var="";
	this.m__cond="";
	this.m__func="";
	this.m__minFr=0;
	this.m__maxFr=0;
	this.m__pos=0;
}
c_StR_natPers_KtMVAPer.prototype=extend_class(c_RWBasis);
c_StR_natPers_KtMVAPer.m_new=function(){
	c_RWBasis.m_new.call(this);
	return this;
}
c_StR_natPers_KtMVAPer.prototype.p_getNew=function(){
	return (c_StR_natPers_KtMVAPer.m_new.call(new c_StR_natPers_KtMVAPer));
}
c_StR_natPers_KtMVAPer.prototype.p_from=function(t_mustDecodeUTF8,t_o){
	this.m__abjahr=c_RWBasis.m_I(t_o,"ab");
	if(this.m__abjahr==0){
		this.m__abjahr=2008;
	}
	this.m__bisjahr=c_RWBasis.m_I(t_o,"bis");
	if(this.m__bisjahr==0){
		this.m__bisjahr=9999;
	}
	this.m__objtyp=c_RWBasis.m_I(t_o,"obj");
	this.m__pos=c_RWBasis.m_I(t_o,"pos");
	this.m__id_eart=c_RWBasis.m_I(t_o,"eart");
	this.m__id_grp=c_RWBasis.m_I(t_o,"grp");
	this.m__var=c_RWBasis.m_S(t_o,"v").toUpperCase();
	this.m__func=c_RWBasis.m_S(t_o,"f").toUpperCase();
	this.m__cond=c_RWBasis.m_S(t_o,"c").toUpperCase();
	this.m__minFr=c_RWBasis.m_I(t_o,"min");
	this.m__maxFr=c_RWBasis.m_I(t_o,"max");
}
function c_StR_natPers_ESInfo(){
	c_RWBasis.call(this);
	this.m__id=0;
	this.m__spr=0;
	this.m__txt="";
}
c_StR_natPers_ESInfo.prototype=extend_class(c_RWBasis);
c_StR_natPers_ESInfo.m_new=function(){
	c_RWBasis.m_new.call(this);
	return this;
}
c_StR_natPers_ESInfo.prototype.p_getUID=function(){
	return this.m__id*100+this.m__spr;
}
c_StR_natPers_ESInfo.prototype.p_getNew=function(){
	return (c_StR_natPers_ESInfo.m_new.call(new c_StR_natPers_ESInfo));
}
c_StR_natPers_ESInfo.prototype.p_from=function(t_mustDecodeUTF8,t_o){
	this.m__spr=c_RWBasis.m_I(t_o,"spr");
	this.m__id=c_RWBasis.m_I(t_o,"id");
	this.m__txt=c_RWBasis.m_Sdecode(t_mustDecodeUTF8,t_o,"txt");
}
function c_StR_jurPers_SoBerKt(){
	c_RWBasis.call(this);
	this.m__id=0;
	this.m__abjahr=0;
	this.m__objtyp=0;
	this.m__idobjtyp=0;
	this.m__spez=0;
	this.m__spez_ertrintens=0;
	this.m__basis_stranr=0;
	this.m__spez_stranr=0;
	this.m__max_stranr=.0;
	this.m__spez_fag=0;
	this.m__fag_faktor=.0;
	this.m__fag_zuschlag=.0;
	this.m__spez_kultursteuer=0;
	this.m__kultur_zuschlag=.0;
	this.m__progid=0;
	this.m__spez_qualanteil=0;
	this.m__minsttyp=0;
	this.m__minst=.0;
	this.m__maxsttyp=0;
	this.m__maxst=.0;
}
c_StR_jurPers_SoBerKt.prototype=extend_class(c_RWBasis);
c_StR_jurPers_SoBerKt.m_new=function(){
	c_RWBasis.m_new.call(this);
	return this;
}
c_StR_jurPers_SoBerKt.prototype.p_getNew=function(){
	return (c_StR_jurPers_SoBerKt.m_new.call(new c_StR_jurPers_SoBerKt));
}
c_StR_jurPers_SoBerKt.prototype.p_from=function(t_mustDecodeUTF8,t_o){
	this.m__id=c_RWBasis.m_I(t_o,"id");
	this.m__abjahr=c_RWBasis.m_I(t_o,"ab");
	this.m__objtyp=c_RWBasis.m_I(t_o,"obj");
	this.m__idobjtyp=c_RWBasis.m_I(t_o,"idobj");
	this.m__spez=c_RWBasis.m_I(t_o,"spz");
	this.m__spez_ertrintens=c_RWBasis.m_I(t_o,"spzertr");
	this.m__basis_stranr=c_RWBasis.m_I(t_o,"banr");
	this.m__spez_stranr=c_RWBasis.m_I(t_o,"spzanr");
	this.m__max_stranr=c_RWBasis.m_F(t_o,"maxanr");
	this.m__spez_fag=c_RWBasis.m_I(t_o,"spzfag");
	this.m__fag_faktor=c_RWBasis.m_F(t_o,"fagfakt");
	this.m__fag_zuschlag=c_RWBasis.m_F(t_o,"fagzus");
	this.m__spez_kultursteuer=c_RWBasis.m_I(t_o,"spzkult");
	this.m__kultur_zuschlag=c_RWBasis.m_F(t_o,"kultzus");
	this.m__progid=c_RWBasis.m_I(t_o,"prog");
	this.m__spez_qualanteil=c_RWBasis.m_I(t_o,"spzqant");
	this.m__minsttyp=c_RWBasis.m_I(t_o,"minstt");
	this.m__minst=c_RWBasis.m_F(t_o,"minst");
	this.m__maxsttyp=c_RWBasis.m_I(t_o,"maxstt");
	this.m__maxst=c_RWBasis.m_F(t_o,"maxst");
}
function c_StR_jurPers_SoBerGmd(){
	c_RWBasis.call(this);
	this.m__id=0;
	this.m__abjahr=0;
	this.m__objtyp=0;
	this.m__idobjtyp=0;
	this.m__basis=0;
	this.m__spez=0;
	this.m__basis_stranr=0;
	this.m__spez_stranr=0;
	this.m__max_stranr=.0;
	this.m__spez_fag=0;
	this.m__fag_faktor=.0;
	this.m__fag_zuschlag=.0;
	this.m__spez_kultursteuer=0;
	this.m__kultur_zuschlag=.0;
	this.m__spez_prog=0;
	this.m__progid=0;
	this.m__spez_qualanteil=0;
	this.m__minsttyp=0;
	this.m__minst=.0;
	this.m__maxsttyp=0;
	this.m__maxst=.0;
}
c_StR_jurPers_SoBerGmd.prototype=extend_class(c_RWBasis);
c_StR_jurPers_SoBerGmd.m_new=function(){
	c_RWBasis.m_new.call(this);
	return this;
}
c_StR_jurPers_SoBerGmd.prototype.p_getNew=function(){
	return (c_StR_jurPers_SoBerGmd.m_new.call(new c_StR_jurPers_SoBerGmd));
}
c_StR_jurPers_SoBerGmd.prototype.p_from=function(t_mustDecodeUTF8,t_o){
	this.m__id=c_RWBasis.m_I(t_o,"id");
	this.m__abjahr=c_RWBasis.m_I(t_o,"ab");
	this.m__objtyp=c_RWBasis.m_I(t_o,"obj");
	this.m__idobjtyp=c_RWBasis.m_I(t_o,"idobj");
	this.m__basis=c_RWBasis.m_I(t_o,"bas");
	this.m__spez=c_RWBasis.m_I(t_o,"spz");
	this.m__basis_stranr=c_RWBasis.m_I(t_o,"banr");
	this.m__spez_stranr=c_RWBasis.m_I(t_o,"spzanr");
	this.m__max_stranr=c_RWBasis.m_F(t_o,"maxstt");
	this.m__spez_fag=c_RWBasis.m_I(t_o,"spzfag");
	this.m__fag_faktor=c_RWBasis.m_F(t_o,"fagfakt");
	this.m__fag_zuschlag=c_RWBasis.m_F(t_o,"fagzus");
	this.m__spez_kultursteuer=c_RWBasis.m_I(t_o,"spzkult");
	this.m__kultur_zuschlag=c_RWBasis.m_F(t_o,"kultzus");
	this.m__spez_prog=c_RWBasis.m_I(t_o,"sprog");
	this.m__progid=c_RWBasis.m_I(t_o,"prog");
	this.m__spez_qualanteil=c_RWBasis.m_I(t_o,"spzqant");
	this.m__minsttyp=c_RWBasis.m_I(t_o,"minstt");
	this.m__minst=c_RWBasis.m_F(t_o,"minst");
	this.m__maxsttyp=c_RWBasis.m_I(t_o,"maxstt");
	this.m__maxst=c_RWBasis.m_F(t_o,"maxst");
}
function c_StR_jurPers_AbzgPer(){
	c_RWBasis.call(this);
	this.m__soberid=0;
	this.m__abjahr=0;
	this.m__obj=0;
	this.m__idobj=0;
	this.m__abzugid=0;
	this.m__sort=0;
}
c_StR_jurPers_AbzgPer.prototype=extend_class(c_RWBasis);
c_StR_jurPers_AbzgPer.m_new=function(){
	c_RWBasis.m_new.call(this);
	return this;
}
c_StR_jurPers_AbzgPer.prototype.p_getNew=function(){
	return (c_StR_jurPers_AbzgPer.m_new.call(new c_StR_jurPers_AbzgPer));
}
c_StR_jurPers_AbzgPer.prototype.p_from=function(t_mustDecodeUTF8,t_o){
	this.m__soberid=c_RWBasis.m_I(t_o,"id");
	this.m__abjahr=c_RWBasis.m_I(t_o,"ab");
	this.m__obj=c_RWBasis.m_I(t_o,"obj");
	this.m__idobj=c_RWBasis.m_I(t_o,"idobj");
	this.m__abzugid=c_RWBasis.m_I(t_o,"abzg");
	this.m__sort=c_RWBasis.m_I(t_o,"sort");
}
function c_StC_natPers_Gmd(){
	Object.call(this);
	this.m__standper=0;
	this.m__strgmd=null;
	this.m__strgmdper=null;
	this.m__gmd_stfuss_ek=.0;
	this.m__gmd_stfuss_vm=.0;
	this.m__chr_stfuss1_ek=.0;
	this.m__chr_stfuss2_ek=.0;
	this.m__chr_stfuss3_ek=.0;
	this.m__chr_stfuss1_vm=.0;
	this.m__chr_stfuss2_vm=.0;
	this.m__chr_stfuss3_vm=.0;
	this.m__ES_stfuss1=.0;
	this.m__ES_stfuss2=.0;
	this.m__ES_stfuss3=.0;
	this.m__ES_stfuss4=.0;
}
c_StC_natPers_Gmd.m_new=function(t_iStandPer,t_o){
	this.m__standper=t_iStandPer;
	this.m__strgmd=t_o;
	if((this.m__strgmd)!=null){
		this.m__strgmdper=this.m__strgmd.p_getPer(this.m__standper);
		this.m__gmd_stfuss_ek=this.m__strgmdper.m__gmd_stfuss_ek;
		this.m__gmd_stfuss_vm=this.m__strgmdper.m__gmd_stfuss_vm;
		this.m__chr_stfuss1_ek=this.m__strgmdper.m__chr_stfuss1_ek;
		this.m__chr_stfuss2_ek=this.m__strgmdper.m__chr_stfuss2_ek;
		this.m__chr_stfuss3_ek=this.m__strgmdper.m__chr_stfuss3_ek;
		this.m__chr_stfuss1_vm=this.m__strgmdper.m__chr_stfuss1_vm;
		this.m__chr_stfuss2_vm=this.m__strgmdper.m__chr_stfuss2_vm;
		this.m__chr_stfuss3_vm=this.m__strgmdper.m__chr_stfuss3_vm;
		this.m__ES_stfuss1=this.m__strgmdper.m__es_grad1;
		this.m__ES_stfuss2=this.m__strgmdper.m__es_grad2;
		this.m__ES_stfuss3=this.m__strgmdper.m__es_grad3;
		this.m__ES_stfuss4=this.m__strgmdper.m__es_grad4;
	}
	return this;
}
c_StC_natPers_Gmd.m_new2=function(){
	return this;
}
c_StC_natPers_Gmd.prototype.p_isValid=function(){
	if(this.m__strgmd==null || this.m__strgmdper==null){
		return false;
	}
	return true;
}
c_StC_natPers_Gmd.prototype.p__gmd_basis=function(){
	return this.m__strgmdper.m__gmd_basis;
}
c_StC_natPers_Gmd.prototype.p__idxabzug=function(){
	return this.m__strgmdper.m__idxabzug;
}
c_StC_natPers_Gmd.prototype.p__chr_basis=function(){
	return this.m__strgmdper.m__chr_basis;
}
c_StC_natPers_Gmd.prototype.p_getKirchenStFussEK=function(t_iKonf){
	if(t_iKonf==c_StC_natPers.m_Konfession_REFORMIERT){
		return this.m__chr_stfuss1_ek;
	}
	if(t_iKonf==c_StC_natPers.m_Konfession_ROEMISCH){
		return this.m__chr_stfuss2_ek;
	}
	if(t_iKonf==c_StC_natPers.m_Konfession_CHRISTLICH){
		return this.m__chr_stfuss3_ek;
	}
	return 0.0;
}
c_StC_natPers_Gmd.prototype.p_getKirchenStFussVM=function(t_iKonf){
	if(t_iKonf==c_StC_natPers.m_Konfession_REFORMIERT){
		return this.m__chr_stfuss1_vm;
	}
	if(t_iKonf==c_StC_natPers.m_Konfession_ROEMISCH){
		return this.m__chr_stfuss2_vm;
	}
	if(t_iKonf==c_StC_natPers.m_Konfession_CHRISTLICH){
		return this.m__chr_stfuss3_vm;
	}
	return 0.0;
}
c_StC_natPers_Gmd.prototype.p__gmd_kopfsteuer=function(){
	return this.m__strgmdper.m__gmd_ps;
}
c_StC_natPers_Gmd.prototype.p__chr_kopfsteuer=function(){
	return this.m__strgmdper.m__chr_ps;
}
c_StC_natPers_Gmd.prototype.p__es_basis=function(){
	return this.m__strgmdper.m__es_basis;
}
c_StC_natPers_Gmd.prototype.p_getESStFuss=function(t_iVerwGrad){
	if(t_iVerwGrad==1){
		return this.m__ES_stfuss1;
	}
	if(t_iVerwGrad==2){
		return this.m__ES_stfuss2;
	}
	if(t_iVerwGrad==3){
		return this.m__ES_stfuss3;
	}
	if(t_iVerwGrad==4){
		return this.m__ES_stfuss4;
	}
	return 0.0;
}
function c_StRGmdPer(){
	c_RWBasis.call(this);
	this.m__abjahr=0;
	this.m__gmd_stfuss_ek=.0;
	this.m__gmd_stfuss_vm=.0;
	this.m__chr_stfuss1_ek=.0;
	this.m__chr_stfuss2_ek=.0;
	this.m__chr_stfuss3_ek=.0;
	this.m__chr_stfuss1_vm=.0;
	this.m__chr_stfuss2_vm=.0;
	this.m__chr_stfuss3_vm=.0;
	this.m__es_grad1=.0;
	this.m__es_grad2=.0;
	this.m__es_grad3=.0;
	this.m__es_grad4=.0;
	this.m__gmd_stand="";
	this.m__gmd_basis=0;
	this.m__gmd_ps=.0;
	this.m__chr_stand="";
	this.m__chr_basis=0;
	this.m__chr_ps=.0;
	this.m__idxabzug=0;
	this.m__ortzuschlag=.0;
	this.m__es_stand="";
	this.m__es_basis=0;
	this.m__kapges_spez=0;
	this.m__kapges_basis=0;
	this.m__kapges_stfuss_gew=.0;
	this.m__kapges_stfuss_kap=.0;
	this.m__hold_spez=0;
	this.m__hold_basis=0;
	this.m__hold_stfuss_gew=.0;
	this.m__hold_stfuss_kap=.0;
	this.m__jurpers_spez_kirche=0;
	this.m__jurpers_proz_ref=.0;
	this.m__jurpers_proz_roem_kath=.0;
	this.m__jurpers_proz_christ_kath=.0;
	this.m__jurpers_basis_kirche=0;
	this.m__jurpers_stfuss_kirchegew=.0;
	this.m__jurpers_stfuss_kirchekap=.0;
	this.m__hold_spez_kirche=0;
	this.m__hold_basis_kirche=0;
	this.m__hold_stfuss_kirchegew=.0;
	this.m__hold_stfuss_kirchekap=.0;
	this.m__dom_spez_kirche=0;
	this.m__jurpers_stand="";
	this.m__jurpers_stsatzkirche_gewinn=.0;
	this.m__jurpers_stsatz_gewinn=.0;
	this.m__jurpers_stsatz_kapital=.0;
}
c_StRGmdPer.prototype=extend_class(c_RWBasis);
c_StRGmdPer.m_new=function(){
	c_RWBasis.m_new.call(this);
	return this;
}
c_StRGmdPer.prototype.p_getNew=function(){
	return (c_StRGmdPer.m_new.call(new c_StRGmdPer));
}
c_StRGmdPer.prototype.p_getUID=function(){
	return this.m__abjahr;
}
c_StRGmdPer.prototype.p_from=function(t_mustDecodeUTF8,t_o){
	this.m__abjahr=c_RWBasis.m_I(t_o,"ab");
	this.m__gmd_stand=c_RWBasis.m_S(t_o,"g_std");
	this.m__gmd_basis=c_RWBasis.m_I(t_o,"g_bas");
	this.m__gmd_stfuss_ek=c_RWBasis.m_F(t_o,"g_f1");
	this.m__gmd_stfuss_vm=c_RWBasis.m_F(t_o,"g_f2");
	this.m__gmd_ps=c_RWBasis.m_F(t_o,"g_ps");
	this.m__chr_stand=c_RWBasis.m_S(t_o,"c_std");
	this.m__chr_basis=c_RWBasis.m_I(t_o,"c_bas");
	this.m__chr_stfuss1_ek=c_RWBasis.m_F(t_o,"c_f11");
	this.m__chr_stfuss2_ek=c_RWBasis.m_F(t_o,"c_f12");
	this.m__chr_stfuss3_ek=c_RWBasis.m_F(t_o,"c_f13");
	this.m__chr_stfuss1_vm=c_RWBasis.m_F(t_o,"c_f21");
	this.m__chr_stfuss2_vm=c_RWBasis.m_F(t_o,"c_f22");
	this.m__chr_stfuss3_vm=c_RWBasis.m_F(t_o,"c_f23");
	this.m__chr_ps=c_RWBasis.m_F(t_o,"c_ps");
	this.m__idxabzug=c_RWBasis.m_I(t_o,"idxabzg");
	this.m__ortzuschlag=c_RWBasis.m_F(t_o,"ortzsg");
	this.m__es_stand=c_RWBasis.m_S(t_o,"es_std");
	this.m__es_basis=c_RWBasis.m_I(t_o,"es_bas");
	this.m__es_grad1=c_RWBasis.m_F(t_o,"es_s1");
	this.m__es_grad2=c_RWBasis.m_F(t_o,"es_s2");
	this.m__es_grad3=c_RWBasis.m_F(t_o,"es_s3");
	this.m__es_grad4=c_RWBasis.m_F(t_o,"es_s4");
	this.m__kapges_spez=c_RWBasis.m_I(t_o,"k_spz");
	this.m__kapges_basis=c_RWBasis.m_I(t_o,"k_bas");
	this.m__kapges_stfuss_gew=c_RWBasis.m_F(t_o,"k_f1");
	this.m__kapges_stfuss_kap=c_RWBasis.m_F(t_o,"k_f2");
	this.m__hold_spez=c_RWBasis.m_I(t_o,"h_spz");
	this.m__hold_basis=c_RWBasis.m_I(t_o,"h_bas");
	this.m__hold_stfuss_gew=c_RWBasis.m_F(t_o,"h_f1");
	this.m__hold_stfuss_kap=c_RWBasis.m_F(t_o,"h_f2");
	this.m__jurpers_spez_kirche=c_RWBasis.m_I(t_o,"jc_spz");
	this.m__jurpers_proz_ref=c_RWBasis.m_F(t_o,"jc_pref");
	this.m__jurpers_proz_roem_kath=c_RWBasis.m_F(t_o,"jc_prkat");
	this.m__jurpers_proz_christ_kath=c_RWBasis.m_F(t_o,"jc_pckat");
	this.m__jurpers_basis_kirche=c_RWBasis.m_I(t_o,"jc_bas");
	this.m__jurpers_stfuss_kirchegew=c_RWBasis.m_F(t_o,"jc_f1");
	this.m__jurpers_stfuss_kirchekap=c_RWBasis.m_F(t_o,"jc_f2");
	this.m__hold_spez_kirche=c_RWBasis.m_I(t_o,"hc_spz");
	this.m__hold_basis_kirche=c_RWBasis.m_I(t_o,"hc_bas");
	this.m__hold_stfuss_kirchegew=c_RWBasis.m_F(t_o,"hc_f1");
	this.m__hold_stfuss_kirchekap=c_RWBasis.m_F(t_o,"hc_f2");
	this.m__dom_spez_kirche=c_RWBasis.m_I(t_o,"dc_spz");
	this.m__jurpers_stand=c_RWBasis.m_S(t_o,"j_std");
	this.m__jurpers_stsatzkirche_gewinn=c_RWBasis.m_F(t_o,"jstskg");
	this.m__jurpers_stsatz_gewinn=c_RWBasis.m_F(t_o,"jstsg");
	this.m__jurpers_stsatz_kapital=c_RWBasis.m_F(t_o,"jstsk");
}
function c_StC_natPers_Grundlage(){
	Object.call(this);
	this.m__valZusaetze=c_IntMap2.m_new.call(new c_IntMap2);
	this.m__kinder=0;
	this.m__h_zivil=0;
	this.m__anteilKonf1=0;
	this.m__konf2=0;
	this.m__stbEkBund=.0;
	this.m__stbEkKt=.0;
	this.m__stbEkGmd=.0;
	this.m__konf1=0;
	this.m__sex=0;
	this.m__kap=c_IntMap3.m_new.call(new c_IntMap3);
	this.m__satzbEkBund=.0;
	this.m__rentensatz=.0;
	this.m__bQualDivAnteil=false;
	this.m__satzbEkKt=.0;
	this.m__satzbVmKt=.0;
	this.m__stbVmKt=.0;
	this.m__satzbEkGmd=.0;
	this.m__es_gruppe=0;
	this.m__es_beguenstigter=0;
	this.m__es_summe=.0;
	this.m__es_satzbestimmend=.0;
}
c_StC_natPers_Grundlage.prototype.p_setZusatz=function(t_i,t_r){
	this.m__valZusaetze.p_Set2(t_i,t_r);
}
c_StC_natPers_Grundlage.m_new=function(){
	this.p_setZusatz(c_StC_natPers.m_Zusatz_VM_ERTRAG,-1.0);
	this.p_setZusatz(c_StC_natPers.m_Zusatz_REIN_EK,-1.0);
	this.p_setZusatz(c_StC_natPers.m_Zusatz_REIN_VM,-1.0);
	this.p_setZusatz(c_StC_natPers.m_Zusatz_QUALBET_GEWINN,-1.0);
	this.p_setZusatz(c_StC_natPers.m_Zusatz_QUALBET_GEWINN_GMD,-1.0);
	this.p_setZusatz(c_StC_natPers.m_Zusatz_QUALBET_VERKEHRSWERT,-1.0);
	this.p_setZusatz(c_StC_natPers.m_Zusatz_QUALBET_VERKEHRSWERT_GMD,-1.0);
	this.p_setZusatz(c_StC_natPers.m_Zusatz_QUALBET_GEWINN_BUND,-1.0);
	this.p_setZusatz(c_StC_natPers.m_Zusatz_SOZABZUG,-1.0);
	this.p_setZusatz(c_StC_natPers.m_Zusatz_TOTAL_AKTIVE,-1.0);
	this.p_setZusatz(c_StC_natPers.m_Zusatz_LIEGENSCHAFTS_UNTERH_CH,0.0);
	this.p_setZusatz(c_StC_natPers.m_Zusatz_BVG_EINKAUF,0.0);
	return this;
}
c_StC_natPers_Grundlage.prototype.p__zivilstand=function(){
	return this.m__h_zivil;
}
c_StC_natPers_Grundlage.prototype.p__zivilstand2=function(t_i){
	if(t_i==c_StC_natPers.m_Zivilstand_LEDIG || t_i==c_StC_natPers.m_Zivilstand_GESCHIEDEN || t_i==c_StC_natPers.m_Zivilstand_VERWITET){
		t_i=c_StC_natPers.m_Zivilstand_LEDIGALLEIN;
	}else{
		if(t_i==c_StC_natPers.m_Zivilstand_EINGETR_PARTNERSCHAFT){
			t_i=c_StC_natPers.m_Zivilstand_VERHEIRATET;
		}
	}
	this.m__h_zivil=t_i;
	if(this.m__h_zivil!=c_StC_natPers.m_Zivilstand_VERHEIRATET && this.m__kinder==0){
		this.m__anteilKonf1=100;
		this.m__konf2=c_StC_natPers.m_Konfession_KEIN;
	}
}
c_StC_natPers_Grundlage.prototype.p_addKapital=function(t_iKapTyp){
	var t_k=c_StC_natPers_Kapital.m_new.call(new c_StC_natPers_Kapital,t_iKapTyp);
	this.m__kap.p_Add2(t_k.p_getUID(),(t_k));
	return t_k;
}
c_StC_natPers_Grundlage.prototype.p__id_grp=function(){
	var t_ledig=true;
	var t_grp=0;
	var t_1=this.p__zivilstand();
	if(t_1==c_StC_natPers.m_Zivilstand_LEDIGKONKUBINAT){
		t_grp=c_StR_natPers.m_Gruppe_LEDIGE_KONKUBINAT;
	}else{
		if(t_1==c_StC_natPers.m_Zivilstand_LEDIGALLEIN){
			t_grp=c_StR_natPers.m_Gruppe_LEDIGE_ALLEINE;
		}else{
			if(t_1==c_StC_natPers.m_Zivilstand_VERHEIRATET){
				t_grp=c_StR_natPers.m_Gruppe_VERHEIRATETE;
				t_ledig=false;
			}
		}
	}
	if(t_ledig){
		if(this.m__kinder>0){
			t_grp=t_grp|c_StR_natPers.m_Gruppe_MIT_KINDER_FUER_LEDIGE;
		}else{
			t_grp=t_grp|c_StR_natPers.m_Gruppe_OHNE_KINDER_FUER_LEDIGE;
		}
	}else{
		if(this.m__kinder>0){
			t_grp=t_grp|c_StR_natPers.m_Gruppe_MIT_KINDER_FUER_VERHEIRATETE;
		}else{
			t_grp=t_grp|c_StR_natPers.m_Gruppe_OHNE_KINDER_FUER_VERHEIRATETE;
		}
	}
	return t_grp;
}
c_StC_natPers_Grundlage.prototype.p__istMann=function(){
	if(this.m__sex==c_StC_natPers.m_Sex_MANN){
		return true;
	}
	return false;
}
c_StC_natPers_Grundlage.prototype.p_getZusatz=function(t_i){
	if(this.m__valZusaetze.p_Contains2(t_i)){
		return this.m__valZusaetze.p_Get3(t_i);
	}
	return 0.0;
}
c_StC_natPers_Grundlage.prototype.p_getKonfessionOf=function(t_p){
	if(t_p==1){
		return this.m__konf1;
	}
	return this.m__konf2;
}
c_StC_natPers_Grundlage.prototype.p__anteilKonf2=function(){
	return 100-this.m__anteilKonf1;
}
c_StC_natPers_Grundlage.prototype.p_getKonfessionsAnteilOf=function(t_p){
	if(t_p==1){
		return this.m__anteilKonf1;
	}
	return this.p__anteilKonf2();
}
function c_StC_natPers(){
	Object.call(this);
}
c_StC_natPers.m_Zusatz_VM_ERTRAG=0;
c_StC_natPers.m_Zusatz_REIN_EK=0;
c_StC_natPers.m_Zusatz_REIN_VM=0;
c_StC_natPers.m_Zusatz_QUALBET_GEWINN=0;
c_StC_natPers.m_Zusatz_QUALBET_GEWINN_GMD=0;
c_StC_natPers.m_Zusatz_QUALBET_VERKEHRSWERT=0;
c_StC_natPers.m_Zusatz_QUALBET_VERKEHRSWERT_GMD=0;
c_StC_natPers.m_Zusatz_QUALBET_GEWINN_BUND=0;
c_StC_natPers.m_Zusatz_SOZABZUG=0;
c_StC_natPers.m_Zusatz_TOTAL_AKTIVE=0;
c_StC_natPers.m_Zusatz_LIEGENSCHAFTS_UNTERH_CH=0;
c_StC_natPers.m_Zusatz_BVG_EINKAUF=0;
c_StC_natPers.m_Zivilstand_VERHEIRATET=0;
c_StC_natPers.m_Zivilstand_EINGETR_PARTNERSCHAFT=0;
c_StC_natPers.m_Zivilstand_LEDIG=0;
c_StC_natPers.m_Konfession_KONFESSIONSLOS=0;
c_StC_natPers.m_Zivilstand_GESCHIEDEN=0;
c_StC_natPers.m_Zivilstand_VERWITET=0;
c_StC_natPers.m_Zivilstand_LEDIGALLEIN=0;
c_StC_natPers.m_Zivilstand_LEDIGKONKUBINAT=0;
c_StC_natPers.m_Konfession_KEIN=0;
c_StC_natPers.m_CalcTyp_EINKOMMENSSTEUER=0;
c_StC_natPers.m_CalcTyp_KEIN=0;
c_StC_natPers.m_CalcTyp_VERMOEGENSSTEUER=0;
c_StC_natPers.m_CalcTyp_PERSONALSTEUER=0;
c_StC_natPers.m_CalcTyp_STEUER_SAUELE_2A3A=0;
c_StC_natPers.m_CalcTyp_STEUER_SAUELE_3B=0;
c_StC_natPers.m_CalcTyp_ERBSCHAFTSSTEUER=0;
c_StC_natPers.m_CalcTyp_SCHENKUNGSSTEUER=0;
c_StC_natPers.m_Kapital_SAEULE_3A=0;
c_StC_natPers.m_Sex_MANN=0;
c_StC_natPers.m_Konfession_REFORMIERT=0;
c_StC_natPers.m_Konfession_ROEMISCH=0;
c_StC_natPers.m_Konfession_CHRISTLICH=0;
c_StC_natPers.m_Kapital_SAEULE_2A=0;
c_StC_natPers.m_Kapital_SAEULE_3BEE=0;
c_StC_natPers.m_Kapital_SAEULE_3B=0;
c_StC_natPers.m_AuszhlgGrund_PENSIONIERUNG=0;
c_StC_natPers.m_AuszhlgGrund_WOHNEIGENTUMSFOERDERUNG=0;
c_StC_natPers.m_AuszhlgGrund_VORZEITIGE_AUSZAHLUNG=0;
c_StC_natPers.m_AuszhlgGrund_INFOLGE_TOD_ODER_INVALIDITAET=0;
c_StC_natPers.m_CalcTyp_ERB_UND_SCHENKSTEUER=0;
c_StC_natPers.m_ES_GRP_UEBRIGE=0;
c_StC_natPers.m_ES_GRP_UEBRIGE_UEBRIGE=0;
c_StC_natPers.m_ES_GRP_EHEPARTNER=0;
c_StC_natPers.m_ES_GRP_KINDER=0;
c_StC_natPers.m_ES_GRP_KINDER_KINDER=0;
c_StC_natPers.m_ES_GRP_KINDER_NACHKOMMENKINDER=0;
c_StC_natPers.m_ES_GRP_KINDER_VOLLWAISEN=0;
c_StC_natPers.m_ES_GRP_ELTERN=0;
c_StC_natPers.m_ES_GRP_ELTERN_ELTERN=0;
c_StC_natPers.m_ES_GRP_GROSSELTERN=0;
c_StC_natPers.m_ES_GRP_GROSSELTERN_GROSSELTERN=0;
c_StC_natPers.m_ES_GRP_GROSSELTERN_URGROSSELTERN=0;
c_StC_natPers.m_ES_GRP_GESCHWISTER=0;
c_StC_natPers.m_ES_GRP_GESCHWISTER_GESCHWISTER=0;
c_StC_natPers.m_ES_GRP_ONKELTANTEN=0;
function c_Map3(){
	Object.call(this);
	this.m_root=null;
}
c_Map3.m_new=function(){
	return this;
}
c_Map3.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map3.prototype.p_RotateLeft3=function(t_node){
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
c_Map3.prototype.p_RotateRight3=function(t_node){
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
c_Map3.prototype.p_InsertFixup3=function(t_node){
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
					this.p_RotateLeft3(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight3(t_node.m_parent.m_parent);
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
					this.p_RotateRight3(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft3(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map3.prototype.p_Set2=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare2(t_key,t_node.m_key);
		if(t_cmp>0){
			t_node=t_node.m_right;
		}else{
			if(t_cmp<0){
				t_node=t_node.m_left;
			}else{
				t_node.m_value=t_value;
				return false;
			}
		}
	}
	t_node=c_Node3.m_new.call(new c_Node3,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup3(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
c_Map3.prototype.p_FindNode2=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare2(t_key,t_node.m_key);
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
c_Map3.prototype.p_Contains2=function(t_key){
	return this.p_FindNode2(t_key)!=null;
}
c_Map3.prototype.p_Get3=function(t_key){
	var t_node=this.p_FindNode2(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return 0;
}
function c_IntMap2(){
	c_Map3.call(this);
}
c_IntMap2.prototype=extend_class(c_Map3);
c_IntMap2.m_new=function(){
	c_Map3.m_new.call(this);
	return this;
}
c_IntMap2.prototype.p_Compare2=function(t_lhs,t_rhs){
	return t_lhs-t_rhs;
}
function c_Node3(){
	Object.call(this);
	this.m_key=0;
	this.m_right=null;
	this.m_left=null;
	this.m_value=0;
	this.m_color=0;
	this.m_parent=null;
}
c_Node3.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node3.m_new2=function(){
	return this;
}
function c_Map4(){
	Object.call(this);
	this.m_root=null;
}
c_Map4.m_new=function(){
	return this;
}
c_Map4.prototype.p_Clear=function(){
	this.m_root=null;
	return 0;
}
c_Map4.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map4.prototype.p_RotateLeft4=function(t_node){
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
c_Map4.prototype.p_RotateRight4=function(t_node){
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
c_Map4.prototype.p_InsertFixup4=function(t_node){
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
					this.p_RotateLeft4(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight4(t_node.m_parent.m_parent);
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
					this.p_RotateRight4(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft4(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map4.prototype.p_Add2=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare2(t_key,t_node.m_key);
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
	t_node=c_Node4.m_new.call(new c_Node4,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup4(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
c_Map4.prototype.p_Values=function(){
	return c_MapValues2.m_new.call(new c_MapValues2,this);
}
c_Map4.prototype.p_FirstNode=function(){
	if(!((this.m_root)!=null)){
		return null;
	}
	var t_node=this.m_root;
	while((t_node.m_left)!=null){
		t_node=t_node.m_left;
	}
	return t_node;
}
c_Map4.prototype.p_FindNode2=function(t_key){
	var t_node=this.m_root;
	while((t_node)!=null){
		var t_cmp=this.p_Compare2(t_key,t_node.m_key);
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
c_Map4.prototype.p_Get3=function(t_key){
	var t_node=this.p_FindNode2(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return null;
}
c_Map4.prototype.p_Count=function(){
	if((this.m_root)!=null){
		return this.m_root.p_Count2(0);
	}
	return 0;
}
function c_IntMap3(){
	c_Map4.call(this);
}
c_IntMap3.prototype=extend_class(c_Map4);
c_IntMap3.m_new=function(){
	c_Map4.m_new.call(this);
	return this;
}
c_IntMap3.prototype.p_Compare2=function(t_lhs,t_rhs){
	return t_lhs-t_rhs;
}
function c_Node4(){
	Object.call(this);
	this.m_key=0;
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node4.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node4.m_new2=function(){
	return this;
}
c_Node4.prototype.p_NextNode=function(){
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
c_Node4.prototype.p_Count2=function(t_n){
	if((this.m_left)!=null){
		t_n=this.m_left.p_Count2(t_n);
	}
	if((this.m_right)!=null){
		t_n=this.m_right.p_Count2(t_n);
	}
	return t_n+1;
}
function c_JSonHelper(){
	Object.call(this);
}
c_JSonHelper.m_I=function(t_o,t_s){
	try{
		var t_v=t_o.p_Get(t_s,null);
		if(t_v!=null){
			return t_v.p_IntValue();
		}
	}catch(_eek_){
		if(t_err=object_downcast(_eek_,ThrowableObject)){
		}else{
			throw _eek_;
		}
	}
	return 0;
}
c_JSonHelper.m_I2=function(t_o,t_s,t_defaultValue){
	try{
		var t_v=t_o.p_Get(t_s,null);
		if(t_v!=null){
			return t_v.p_IntValue();
		}
	}catch(_eek_){
		if(t_err=object_downcast(_eek_,ThrowableObject)){
		}else{
			throw _eek_;
		}
	}
	return t_defaultValue;
}
c_JSonHelper.m_F=function(t_o,t_s){
	try{
		var t_v=t_o.p_Get(t_s,null);
		if(t_v!=null){
			return t_v.p_FloatValue();
		}
	}catch(_eek_){
		if(t_err=object_downcast(_eek_,ThrowableObject)){
		}else{
			throw _eek_;
		}
	}
	return 0.0;
}
c_JSonHelper.m_F2=function(t_o,t_s,t_defaultValue){
	try{
		var t_v=t_o.p_Get(t_s,null);
		if(t_v!=null){
			return t_v.p_FloatValue();
		}
	}catch(_eek_){
		if(t_err=object_downcast(_eek_,ThrowableObject)){
		}else{
			throw _eek_;
		}
	}
	return t_defaultValue;
}
c_JSonHelper.m_B=function(t_o,t_s){
	try{
		var t_v=t_o.p_Get(t_s,null);
		if(t_v!=null){
			return t_v.p_BoolValue();
		}
	}catch(_eek_){
		if(t_err=object_downcast(_eek_,ThrowableObject)){
		}else{
			throw _eek_;
		}
	}
	try{
		var t_v2=t_o.p_Get(t_s,null);
		if(t_v2!=null){
			var t_i=t_v2.p_IntValue();
			if(t_i==0){
				return true;
			}
			if(t_i==1){
				return true;
			}
		}
	}catch(_eek_){
		if(t_err2=object_downcast(_eek_,ThrowableObject)){
		}else{
			throw _eek_;
		}
	}
	try{
		var t_v3=t_o.p_Get(t_s,null);
		if(t_v3!=null){
			var t_i2=t_v3.p_StringValue();
			if(t_i2.toUpperCase()=="TRUE"){
				return true;
			}
			if(t_i2.toUpperCase()=="FALSE"){
				return false;
			}
			if(t_i2=="1"){
				return true;
			}
			if(t_i2=="0"){
				return false;
			}
		}
	}catch(_eek_){
		if(t_err3=object_downcast(_eek_,ThrowableObject)){
		}else{
			throw _eek_;
		}
	}
	return false;
}
function c_Newton(){
	Object.call(this);
}
c_Newton.m_new=function(){
	return this;
}
c_Newton.prototype.p_sample=function(t_startval,t_guess){
	return 0.0;
}
c_Newton.prototype.p_approximate=function(t_startval,t_endval,t_margin,t_guess1,t_guess2){
	var t_x1=.0;
	var t_y1=.0;
	var t_x2=.0;
	var t_y2=.0;
	var t_yN=.0;
	t_margin=bb_math_Abs2(t_margin);
	t_y1=t_guess1;
	t_y2=t_guess2;
	t_x2=this.p_sample(t_startval,t_y2);
	for(var t_i=0;t_i<30;t_i=t_i+1){
		t_x1=this.p_sample(t_startval,t_y1);
		var t_d1=bb_math_Abs2(t_x1-t_endval);
		var t_d2=bb_math_Abs2(t_x2-t_endval);
		if(t_d1<t_d2){
			if(t_i==29 || t_d1<t_margin){
				return t_y1;
			}
			t_yN=bb_utils_intersect(t_x1,t_y1,t_x2,t_y2,t_endval);
			t_x2=t_x1;
			t_y2=t_y1;
			t_y1=t_yN;
		}else{
			if(t_i==29 || t_d2<t_margin){
				return t_y2;
			}
			t_y1=bb_utils_intersect(t_x1,t_y1,t_x2,t_y2,t_endval);
		}
	}
	return 0.0;
}
function c_StMiniVAEvalBase(){
	c_Newton.call(this);
	this.m__strw=null;
	this.m__standper=0;
	this.m__stkt=null;
	this.m__var=c_StringMap2.m_new.call(new c_StringMap2);
	this.m__list=c_MVAListe.m_new.call(new c_MVAListe);
}
c_StMiniVAEvalBase.prototype=extend_class(c_Newton);
c_StMiniVAEvalBase.m_new=function(){
	c_Newton.m_new.call(this);
	throw c_LException.m_new.call(new c_LException,"StMiniVAEvalBase:New() nicht implementiert, muss mit RW instanziiert werden");
}
c_StMiniVAEvalBase.m_new2=function(t_strw){
	c_Newton.m_new.call(this);
	this.m__strw=t_strw;
	return this;
}
c_StMiniVAEvalBase.prototype.p_loadKt=function(t_ktid,t_iStandPer){
	this.m__standper=this.m__strw.p_clampJahr(t_iStandPer);
	this.m__stkt=c_StC_natPers_Kt.m_new.call(new c_StC_natPers_Kt,this.m__standper,this.m__strw.p_getKt(t_ktid,false));
	this.m__standper=this.m__stkt.p__gesetzjahr();
}
c_StMiniVAEvalBase.prototype.p_isValid=function(){
	if(this.m__strw!=null){
		if(this.m__stkt!=null){
			return this.m__stkt.p_isValid();
		}
	}
	return false;
}
c_StMiniVAEvalBase.prototype.p_setVar=function(t_varname,t_value){
	if(this.m__var.p_Contains(t_varname)){
		this.m__var.p_Set3(t_varname,t_value);
	}else{
		this.m__var.p_Add3(t_varname,t_value);
	}
}
c_StMiniVAEvalBase.prototype.p_getGrpID=function(t_zivilstand,t_kinder){
	var t_ledig=true;
	var t_grp=0;
	if(t_zivilstand==c_StC_natPers.m_Zivilstand_LEDIG || t_zivilstand==c_StC_natPers.m_Zivilstand_GESCHIEDEN || t_zivilstand==c_StC_natPers.m_Zivilstand_VERWITET){
		t_zivilstand=c_StC_natPers.m_Zivilstand_LEDIGALLEIN;
	}else{
		if(t_zivilstand==c_StC_natPers.m_Zivilstand_EINGETR_PARTNERSCHAFT){
			t_zivilstand=c_StC_natPers.m_Zivilstand_VERHEIRATET;
		}
	}
	var t_1=t_zivilstand;
	if(t_1==c_StC_natPers.m_Zivilstand_LEDIGKONKUBINAT){
		t_grp=c_StR_natPers.m_Gruppe_LEDIGE_KONKUBINAT;
	}else{
		if(t_1==c_StC_natPers.m_Zivilstand_LEDIGALLEIN){
			t_grp=c_StR_natPers.m_Gruppe_LEDIGE_ALLEINE;
		}else{
			if(t_1==c_StC_natPers.m_Zivilstand_VERHEIRATET){
				t_grp=c_StR_natPers.m_Gruppe_VERHEIRATETE;
				t_ledig=false;
			}
		}
	}
	if(t_ledig){
		if(t_kinder>0){
			t_grp=t_grp|c_StR_natPers.m_Gruppe_MIT_KINDER_FUER_LEDIGE;
		}else{
			t_grp=t_grp|c_StR_natPers.m_Gruppe_OHNE_KINDER_FUER_LEDIGE;
		}
	}else{
		if(t_kinder>0){
			t_grp=t_grp|c_StR_natPers.m_Gruppe_MIT_KINDER_FUER_VERHEIRATETE;
		}else{
			t_grp=t_grp|c_StR_natPers.m_Gruppe_OHNE_KINDER_FUER_VERHEIRATETE;
		}
	}
	return t_grp;
}
c_StMiniVAEvalBase.m_isErwerbsart=function(t_iEA,t_angestellt){
	if(t_iEA==0){
		return true;
	}
	if(t_angestellt){
		if((t_iEA&1)!=0){
			return true;
		}
	}else{
		if((t_iEA&2)!=0){
			return true;
		}
	}
	return false;
}
c_StMiniVAEvalBase.prototype.p_loadList=function(t_iObjTyp,t_angestellt,t_zivilstand,t_kinder){
	var t_iGrp=this.p_getGrpID(t_zivilstand,t_kinder);
	this.m__list.p_clear();
	var t_=this.m__stkt.m__strkt.m__np_mva.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_x=t_.p_NextObject();
		var t_o=object_downcast((t_x),c_StR_natPers_KtMVAPer);
		if(t_o.m__objtyp==t_iObjTyp && t_o.m__abjahr<=this.m__standper && t_o.m__bisjahr>=this.m__standper && (t_o.m__id_grp==0 || this.m__strw.p_isNatPersGruppe(t_o.m__id_grp,t_iGrp)) && c_StMiniVAEvalBase.m_isErwerbsart(t_o.m__id_eart,t_angestellt)){
			this.m__list.p_add2(t_o);
		}
	}
	this.m__list.p_sortArray(true);
	if(this.m__list.p_length()==0){
		return false;
	}
	return true;
}
c_StMiniVAEvalBase.prototype.p_getVar=function(t_varname){
	if(this.m__var.p_Contains(t_varname)){
		return this.m__var.p_Get2(t_varname);
	}
	return "0.0";
}
c_StMiniVAEvalBase.prototype.p_expVars=function(t_str){
	var t_expr=t_str;
	var t_varname="";
	var t_value="";
	var t_i1=0;
	var t_i2=0;
	if(t_expr==""){
		return t_expr;
	}
	t_i1=0;
	t_i2=0;
	for(var t_i=0;t_i<20;t_i=t_i+1){
		t_i1=t_expr.indexOf("$",t_i1);
		if(t_i1==-1){
			break;
		}
		t_i2=t_expr.indexOf("$",t_i1+1);
		if(t_i2==-1){
			break;
		}
		t_varname=t_expr.slice(t_i1+1,t_i2);
		t_value=this.p_getVar(t_varname);
		t_expr=string_replace(t_expr,"$"+t_varname+"$",t_value);
		t_i1=t_i1+t_value.length;
	}
	return t_expr;
}
c_StMiniVAEvalBase.prototype.p_match2=function(t_o){
	var t_cond=t_o.m__cond;
	if(t_cond==""){
		return true;
	}
	t_cond=this.p_expVars(t_cond);
	if(bb_evalexpression_evalExpression3(t_cond)>0.5){
		return true;
	}
	return false;
}
c_StMiniVAEvalBase.prototype.p_getVarAsFloat=function(t_varname){
	var t_v=this.p_getVar(t_varname);
	return parseFloat(t_v);
}
c_StMiniVAEvalBase.prototype.p_expProg=function(t_str){
	var t_expr=t_str;
	var t_prog="";
	var t_progid=0;
	var t_progval="";
	var t_value="";
	var t_cProg=null;
	var t_i1=0;
	var t_i2=0;
	if(t_expr==""){
		return t_expr;
	}
	t_i1=0;
	t_i2=0;
	for(var t_i=0;t_i<20;t_i=t_i+1){
		t_i1=t_expr.indexOf("PROG",t_i1);
		if(t_i1==-1){
			break;
		}
		t_i2=-1;
		for(var t_j=t_i1+4;t_j<t_expr.length;t_j=t_j+1){
			var t_c=t_expr.charCodeAt(t_j);
			if(t_c==40){
				var t_k=t_j+1;
				for(t_j=t_j+1;t_j<t_expr.length;t_j=t_j+1){
					t_c=t_expr.charCodeAt(t_j);
					if(t_c==44){
						t_progid=parseInt((t_expr.slice(t_k,t_j)),10);
						t_k=t_j+1;
					}else{
						if(t_c==41){
							t_progval=t_expr.slice(t_k,t_j);
							t_i2=t_j+1;
							break;
						}
					}
				}
				break;
			}
		}
		if(t_i2==-1){
			break;
		}
		t_value="0";
		t_cProg=c_StCProgr.m_new4.call(new c_StCProgr,this.m__strw,t_progid,((this.p_getVarAsFloat("ANZKINDER"))|0),0.0);
		if(t_cProg.p_isValid()){
			t_value=String(t_cProg.p_berechneSt(bb_evalexpression_evalExpression3(t_progval)));
		}
		t_prog=t_expr.slice(t_i1,t_i2);
		t_expr=string_replace(t_expr,t_prog,t_value);
		t_i1=t_i1+t_value.length;
	}
	return t_expr;
}
c_StMiniVAEvalBase.prototype.p_runMVA=function(){
	var t_func="";
	var t_value=.0;
	var t_=this.m__list.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_x=t_.p_NextObject();
		var t_o=object_downcast((t_x),c_StR_natPers_KtMVAPer);
		if(t_o.m__var==""){
			continue;
		}
		if(this.p_match2(t_o)==false){
			continue;
		}
		t_func=this.p_expVars(t_o.m__func);
		t_func=this.p_expProg(t_func);
		t_value=bb_evalexpression_evalExpression3(t_func);
		if(t_value<0.0){
			t_value=0.0;
		}
		if(t_o.m__minFr!=0){
			t_value=bb_math_Max2(t_value,1.0*(t_o.m__minFr));
		}
		if(t_o.m__maxFr!=0){
			t_value=bb_math_Min2(t_value,1.0*(t_o.m__maxFr));
		}
		this.p_setVar(t_o.m__var,String(t_value));
	}
}
c_StMiniVAEvalBase.prototype.p_getVarAsInt=function(t_varname){
	var t_v=this.p_getVar(t_varname);
	return ((bb_utils_round(parseFloat(t_v)))|0);
}
function c_StMiniVAEvalEK(){
	c_StMiniVAEvalBase.call(this);
	this.m__kinder=0;
	this.m__alter=0;
	this.m__angestellt=false;
}
c_StMiniVAEvalEK.prototype=extend_class(c_StMiniVAEvalBase);
c_StMiniVAEvalEK.m_new=function(t_strw,t_iKtID,t_jahr){
	c_StMiniVAEvalBase.m_new2.call(this,t_strw);
	this.p_loadKt(t_iKtID,t_jahr);
	return this;
}
c_StMiniVAEvalEK.m_new2=function(){
	c_StMiniVAEvalBase.m_new.call(this);
	return this;
}
c_StMiniVAEvalEK.m_NLohn2_LI=function(t_bruttoek){
	var t_ahv=(t_bruttoek)*4.55/100.0;
	var t_bvg=(t_bruttoek)*8.0/100.0;
	t_bvg=t_bvg/2.0;
	return ((bb_utils_round((t_bruttoek)-t_ahv-t_bvg))|0);
}
c_StMiniVAEvalEK.m_NLohn2_CH=function(t_bruttoek,t_alter){
	var t_ahv=(t_bruttoek)*6.05/100.0;
	var t_bvg=.0;
	if(t_alter>=25 && t_alter<35){
		t_bvg=(t_bruttoek)*7.0/100.0;
	}else{
		if(t_alter>=35 && t_alter<45){
			t_bvg=(t_bruttoek)*10.0/100.0;
		}else{
			if(t_alter>=45 && t_alter<55){
				t_bvg=(t_bruttoek)*15.0/100.0;
			}else{
				if(t_alter>=55){
					t_bvg=(t_bruttoek)*18.0/100.0;
				}
			}
		}
	}
	t_bvg=t_bvg/2.0;
	return ((bb_utils_round((t_bruttoek)-t_ahv-t_bvg))|0);
}
c_StMiniVAEvalEK.prototype.p_NLohn2=function(t_bruttoek,t_alter){
	if(this.m__stkt.p_isLI()){
		return c_StMiniVAEvalEK.m_NLohn2_LI(t_bruttoek);
	}
	return c_StMiniVAEvalEK.m_NLohn2_CH(t_bruttoek,t_alter);
}
c_StMiniVAEvalEK.prototype.p_berechneStbEK=function(t_bruttoek,t_angestellt,t_alter,t_zivilstand,t_kinder){
	this.m__kinder=t_kinder;
	this.m__alter=t_alter;
	this.m__angestellt=t_angestellt;
	if(this.p_isValid()==false){
		return 0;
	}
	if(t_bruttoek<1000){
		return 0;
	}
	this.m__var.p_Clear();
	this.p_setVar("BRUTTOEK",String(t_bruttoek));
	this.p_setVar("ANZKINDER",String(t_kinder));
	this.p_setVar("ALTER",String(t_alter));
	if(this.m__angestellt==true){
		this.p_setVar("NETTOLOHN2",String(this.p_NLohn2(t_bruttoek,t_alter)));
	}else{
		this.p_setVar("NETTOLOHN2",String(t_bruttoek));
	}
	if(this.p_loadList(c_StR_natPers.m_CalcTyp_EK,t_angestellt,t_zivilstand,t_kinder)==false){
		return t_bruttoek;
	}
	this.p_runMVA();
	var t_v=this.p_getVarAsInt("STBEK");
	return t_v;
}
c_StMiniVAEvalEK.prototype.p_sample=function(t_startval,t_guess){
	this.m__var.p_Clear();
	this.p_setVar("BRUTTOEK",String(t_guess));
	this.p_setVar("ANZKINDER",String(this.m__kinder));
	this.p_setVar("ALTER",String(this.m__alter));
	if(this.m__angestellt){
		this.p_setVar("NETTOLOHN2",String(this.p_NLohn2(((t_guess)|0),this.m__alter)));
	}else{
		this.p_setVar("NETTOLOHN2",String(t_guess));
	}
	this.p_runMVA();
	return this.p_getVarAsFloat("STBEK");
}
function c_Map5(){
	Object.call(this);
	this.m_root=null;
}
c_Map5.m_new=function(){
	return this;
}
c_Map5.prototype.p_Clear=function(){
	this.m_root=null;
	return 0;
}
c_Map5.prototype.p_Compare=function(t_lhs,t_rhs){
}
c_Map5.prototype.p_FindNode=function(t_key){
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
c_Map5.prototype.p_Contains=function(t_key){
	return this.p_FindNode(t_key)!=null;
}
c_Map5.prototype.p_RotateLeft5=function(t_node){
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
c_Map5.prototype.p_RotateRight5=function(t_node){
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
c_Map5.prototype.p_InsertFixup5=function(t_node){
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
					this.p_RotateLeft5(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight5(t_node.m_parent.m_parent);
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
					this.p_RotateRight5(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft5(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map5.prototype.p_Set3=function(t_key,t_value){
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
				t_node.m_value=t_value;
				return false;
			}
		}
	}
	t_node=c_Node5.m_new.call(new c_Node5,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup5(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
c_Map5.prototype.p_Add3=function(t_key,t_value){
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
	t_node=c_Node5.m_new.call(new c_Node5,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup5(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
c_Map5.prototype.p_Get2=function(t_key){
	var t_node=this.p_FindNode(t_key);
	if((t_node)!=null){
		return t_node.m_value;
	}
	return "";
}
function c_StringMap2(){
	c_Map5.call(this);
}
c_StringMap2.prototype=extend_class(c_Map5);
c_StringMap2.m_new=function(){
	c_Map5.m_new.call(this);
	return this;
}
c_StringMap2.prototype.p_Compare=function(t_lhs,t_rhs){
	return string_compare(t_lhs,t_rhs);
}
function c_Node5(){
	Object.call(this);
	this.m_key="";
	this.m_right=null;
	this.m_left=null;
	this.m_value="";
	this.m_color=0;
	this.m_parent=null;
}
c_Node5.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node5.m_new2=function(){
	return this;
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
function c_StR_natPers(){
	Object.call(this);
}
c_StR_natPers.m_CalcTyp_EK=0;
c_StR_natPers.m_Gruppe_LEDIGE_KONKUBINAT=0;
c_StR_natPers.m_Gruppe_LEDIGE_ALLEINE=0;
c_StR_natPers.m_Gruppe_VERHEIRATETE=0;
c_StR_natPers.m_Gruppe_MIT_KINDER_FUER_LEDIGE=0;
c_StR_natPers.m_Gruppe_OHNE_KINDER_FUER_LEDIGE=0;
c_StR_natPers.m_Gruppe_MIT_KINDER_FUER_VERHEIRATETE=0;
c_StR_natPers.m_Gruppe_OHNE_KINDER_FUER_VERHEIRATETE=0;
c_StR_natPers.m_Spez_ES_WIRD_KEINE_STEUER_ERHOBEN=0;
c_StR_natPers.m_Spez_RENTENTABELLE=0;
c_StR_natPers.m_Abzug_BASIS_EINF_STEUER=0;
c_StR_natPers.m_Abzug_EINF_STAAT_ST=0;
c_StR_natPers.m_Abzug_EFF_STAAT_ST=0;
c_StR_natPers.m_Abzug_ST_EKVM=0;
c_StR_natPers.m_Abzug_BASIS_QUALBET_GEWINN=0;
c_StR_natPers.m_Abzug_SATZBEST_TIEFEREN_NETTOEK=0;
c_StR_natPers.m_Abzug_DIVISOR=0;
c_StR_natPers.m_AbzugGrTyp_MAX_IN_FR=0;
c_StR_natPers.m_Abzug_PROGRESS=0;
c_StR_natPers.m_Abzug_PROZENT=0;
c_StR_natPers.m_Abzug_FRANKEN=0;
c_StR_natPers.m_AbzugGrTyp_MIN_IN_PROZENT=0;
c_StR_natPers.m_AbzugGrTyp_MIN_IN_FR=0;
c_StR_natPers.m_AbzugGrTyp_MAX_IN_PROZENT=0;
c_StR_natPers.m_Abzug_BASIS_QUALBET_VKWERT=0;
c_StR_natPers.m_Abzug_SATZBEST=0;
c_StR_natPers.m_Abzug_BASIS_BRUTTOSTEUERWERT=0;
c_StR_natPers.m_MinMax_EINFACHE_MINIMALSTEUER_IN_FR=0;
c_StR_natPers.m_MinMax_EINFACHE_MININALSTEUER_IN_PROZ=0;
c_StR_natPers.m_MinMax_MINIMALANSATZ_WIE_FUER_BETRAG_VON_FR=0;
c_StR_natPers.m_MinMax_EFFEKTIVE_MINIMALSTEUER_IN_FR=0;
c_StR_natPers.m_MinMax_EFFEKTIVE_MINIMALSTEUER_IN_PROZ=0;
c_StR_natPers.m_MinMax_EINFACHE_MAXIMALSTEUER_IN_FR=0;
c_StR_natPers.m_MinMax_EINFACHE_MAXINALSTEUER_IN_PROZ=0;
c_StR_natPers.m_MinMax_MAXIMALANSATZ_WIE_FUER_BETRAG_VON_FR=0;
c_StR_natPers.m_MinMax_EFFEKTIVE_MAXIMALSTEUER_IN_FR=0;
c_StR_natPers.m_MinMax_EFFEKTIVE_MAXIMALSTEUER_IN_PROZ=0;
c_StR_natPers.m_SoBerBasis_SONDERBERECHNUNG=0;
c_StR_natPers.m_SoBerBasis_AUF_STEUERB_EKVM_GMD=0;
c_StR_natPers.m_SoBerBasis_AUF_STEUERB_EKVM_KT=0;
c_StR_natPers.m_SoBerBasis_AUF_EINF_STAATSSTEUER=0;
c_StR_natPers.m_SoBerBasis_AUF_EFF_STAATSSTEUER=0;
c_StR_natPers.m_AuszhlgGrund_UNBEKANNT=0;
c_StR_natPers.m_Kirchen_REFORMIERT=0;
c_StR_natPers.m_Kirchen_ROEMISCH_KATHOLISCH=0;
c_StR_natPers.m_Kirchen_CHRISTLICH_KATHOLISCH=0;
c_StR_natPers.m_SoBerBasis_AUF_GEMEINDESTEUER=0;
c_StR_natPers.m_SoBerBasis_AUF_EINF_GEMEINDESTEUER=0;
c_StR_natPers.m_Spez_STEUER_PRO_KOPF=0;
c_StR_natPers.m_AuszhlgGrund_PENSIONIERUNG=0;
c_StR_natPers.m_AuszhlgGrund_WOHNEIGENTUMSFOERDERUNG=0;
c_StR_natPers.m_AuszhlgGrund_VORZEITIGE_AUSZAHLUNG=0;
c_StR_natPers.m_AuszhlgGrund_INFOLGE_TOD_ODER_INVALIDITAET=0;
c_StR_natPers.m_Spez_NUR_EINE_BED_F_STEURFREIH_MUSS_ERFULLT_S=0;
c_StR_natPers.m_Spez_BEIDE_BED_MUSSEN_ERFULLT_S=0;
c_StR_natPers.m_Spez_STFUESSE_IMMER_100=0;
c_StR_natPers.m_Spez_FUER_STEURSATZ_NOCH_EK_ADDIEREN=0;
function c_MVAListe(){
	c_Collection.call(this);
}
c_MVAListe.prototype=extend_class(c_Collection);
c_MVAListe.m_new=function(){
	c_Collection.m_new.call(this);
	return this;
}
c_MVAListe.prototype.p_compareItem=function(t_o1,t_o2){
	var t_e1=object_downcast((t_o1),c_StR_natPers_KtMVAPer);
	var t_e2=object_downcast((t_o2),c_StR_natPers_KtMVAPer);
	if(t_e1.m__pos>t_e2.m__pos){
		return 1;
	}
	if(t_e1.m__pos<t_e2.m__pos){
		return -1;
	}
	return 0;
}
function c_LcEvalExpression(){
	Object.call(this);
	this.m__expr=[];
	this.m__pos=0;
	this.m__size=0;
	this.m__dec=46;
	this.m__grp=39;
	this.m__op_comp_precision=4;
	this.m__token=c_LcEvalToken.m_new.call(new c_LcEvalToken);
}
c_LcEvalExpression.m_new=function(t_decDelim,t_grpDelim,t_expr,t_opcomp_precision){
	this.m__expr=string_tochars(t_expr);
	this.m__pos=0;
	this.m__size=this.m__expr.length;
	if(t_decDelim>0){
		this.m__dec=t_decDelim;
	}
	if(t_grpDelim>0){
		this.m__grp=t_grpDelim;
	}
	this.m__op_comp_precision=t_opcomp_precision;
	return this;
}
c_LcEvalExpression.m_new2=function(){
	return this;
}
c_LcEvalExpression.prototype.p_nextNum=function(){
	var t_exp=false;
	var t_c=0;
	var t_r1=0.0;
	var t_r2=0.0;
	var t_iDecDiv=0;
	var t_inNDec=0;
	var t_f=1.0;
	var t_oldpos=this.m__pos;
	var t_MAX_DECIMALS=8;
	while(this.m__pos<this.m__size){
		t_c=this.m__expr[this.m__pos];
		this.m__pos=this.m__pos+1;
		if(t_c>=48 && t_c<=57){
			if(t_iDecDiv==0){
				t_r1=t_r1*10.0+(t_c-48);
			}else{
				t_inNDec=t_inNDec+1;
				if(t_inNDec<=t_MAX_DECIMALS){
					t_r2=t_r2*10.0+(t_c-48);
					t_iDecDiv=t_iDecDiv*10;
				}
			}
		}else{
			if(t_c==this.m__dec){
				t_iDecDiv=1;
			}else{
				if(t_c==this.m__grp){
				}else{
					if(t_c==37){
						t_f=0.01;
						break;
					}else{
						if(t_c==116 || t_c==84){
							t_f=1000.0;
							break;
						}else{
							if(t_c==109 || t_c==77){
								t_f=1000000.0;
								break;
							}else{
								if(t_c==101 || t_c==69){
									t_exp=true;
									break;
								}else{
									this.m__pos=this.m__pos-1;
									break;
								}
							}
						}
					}
				}
			}
		}
	}
	if(t_exp==false){
		this.m__token.m__isval=true;
		if(t_iDecDiv>0){
			this.m__token.m__val=(t_r1+t_r2/(t_iDecDiv))*t_f;
		}else{
			this.m__token.m__val=t_r1*t_f;
		}
		return;
	}
	var t_isDecimal=false;
	t_inNDec=0;
	t_exp=false;
	this.m__pos=t_oldpos;
	while(this.m__pos<this.m__size){
		t_c=this.m__expr[this.m__pos];
		if(t_c>=48 && t_c<=57){
			if(t_isDecimal==false){
				this.m__token.p_add(t_c);
			}else{
				t_inNDec=t_inNDec+1;
				if(t_inNDec<=t_MAX_DECIMALS){
					this.m__token.p_add(t_c);
				}
			}
			this.m__pos=this.m__pos+1;
			t_exp=false;
		}else{
			var t_13=t_c;
			if(t_13==37){
				this.m__token.p_add3([69,45,50]);
				this.m__pos=this.m__pos+1;
				return;
			}else{
				if(t_13==101 || t_13==69){
					this.m__token.p_add(69);
					this.m__pos=this.m__pos+1;
					t_exp=true;
				}else{
					if(t_13==43 || t_13==45){
						if(t_exp){
							this.m__token.p_add(t_c);
							this.m__pos=this.m__pos+1;
						}else{
							return;
						}
						t_exp=false;
					}else{
						if(t_c==this.m__dec){
							this.m__token.p_add(46);
							this.m__pos=this.m__pos+1;
							t_exp=false;
							t_isDecimal=true;
						}else{
							if(t_c==this.m__grp){
								this.m__pos=this.m__pos+1;
								t_exp=false;
							}else{
								return;
							}
						}
					}
				}
			}
		}
	}
}
c_LcEvalExpression.prototype.p_nextAlpha=function(){
	var t_c=0;
	while(this.m__pos<this.m__size){
		t_c=this.m__expr[this.m__pos];
		if(t_c>=65 && t_c<=90 || t_c>=97 && t_c<=122){
			this.m__token.p_add(t_c);
			this.m__pos=this.m__pos+1;
		}else{
			break;
		}
	}
}
c_LcEvalExpression.prototype.p_nextOP=function(){
	var t_c=0;
	if(this.m__pos<this.m__size){
		t_c=this.m__expr[this.m__pos];
		var t_14=t_c;
		if(t_14==43 || t_14==45 || t_14==42 || t_14==47 || t_14==94 || t_14==61 || t_14==60 || t_14==62){
			this.m__token.p_add(t_c);
			this.m__pos=this.m__pos+1;
			if(this.m__pos<this.m__size){
				t_c=this.m__expr[this.m__pos];
				var t_15=t_c;
				if(t_15==61 || t_15==60 || t_15==62){
					this.m__token.p_add(t_c);
					this.m__pos=this.m__pos+1;
				}
			}
		}
	}
}
c_LcEvalExpression.prototype.p_nextToken=function(t_expressionStart){
	var t_c=0;
	this.m__token.p_reset();
	while(this.m__pos<this.m__size){
		t_c=this.m__expr[this.m__pos];
		if(t_c==32 || t_c==9){
			this.m__pos=this.m__pos+1;
			continue;
		}
		break;
	}
	if(this.m__pos<this.m__size){
		t_c=this.m__expr[this.m__pos];
	}else{
		return 5;
	}
	if(t_c>=48 && t_c<=57 || t_c==this.m__dec){
		this.p_nextNum();
		return 1;
	}
	if(t_c==40 || t_c==41 || t_c==59){
		this.m__token.p_add(t_c);
		this.m__pos=this.m__pos+1;
		return 4;
	}
	if(t_c>=65 && t_c<=90 || t_c>=97 && t_c<=122){
		this.p_nextAlpha();
	}else{
		this.p_nextOP();
	}
	if(t_expressionStart==false){
		if(this.m__token.p_isOp()==true){
			return 2;
		}
	}
	if(this.m__token.p_isFunc()==true){
		return 3;
	}
	throw c_EvalException.m_new.call(new c_EvalException,3);
}
c_LcEvalExpression.prototype.p_OP_div=function(t_num1,t_num2){
	if(t_num2==0.0){
		throw c_EvalException.m_new.call(new c_EvalException,1);
	}
	var t_r=t_num1/t_num2;
	return t_r;
}
c_LcEvalExpression.prototype.p_limits=function(t_result){
	if(t_result>=c_Limitation.m_limits.m__MAX_FLOAT || t_result<=-c_Limitation.m_limits.m__MAX_FLOAT){
		throw c_EvalException.m_new.call(new c_EvalException,9);
	}else{
		if(t_result==c_Limitation.m_limits.m__MIN_FLOAT || t_result==-c_Limitation.m_limits.m__MIN_FLOAT){
			throw c_EvalException.m_new.call(new c_EvalException,10);
		}
	}
}
c_LcEvalExpression.prototype.p_OP_pow=function(t_num1,t_num2){
	if(t_num1==0.0 && t_num2<0.0 || t_num1==0.0 && t_num2==0.0 || t_num1<0.0 && Math.floor(t_num2)!=t_num2){
		throw c_EvalException.m_new.call(new c_EvalException,7);
	}
	var t_r=Math.pow(t_num1,t_num2);
	this.p_limits(t_r);
	return t_r;
}
c_LcEvalExpression.prototype.p_OP_and=function(t_num1,t_num2){
	if(t_num1>0.0 && t_num2>0.0){
		return 1.0;
	}
	return 0.0;
}
c_LcEvalExpression.prototype.p_OP_or=function(t_num1,t_num2){
	if(t_num1>0.0 || t_num2>0.0){
		return 1.0;
	}
	return 0.0;
}
c_LcEvalExpression.prototype.p_OP_comp=function(t_compTyp,t_num1,t_num2,t_precision){
	var t_r=.0;
	t_r=0.0;
	var t_12=t_compTyp;
	if(t_12==20){
		if(bb_utils_isZero(t_num1-t_num2,t_precision)){
			t_r=1.0;
		}
	}else{
		if(t_12==21){
			if(bb_utils_isLZero(t_num1-t_num2,t_precision)){
				t_r=1.0;
			}
		}else{
			if(t_12==22){
				if(bb_utils_isGZero(t_num1-t_num2,t_precision)){
					t_r=1.0;
				}
			}else{
				if(t_12==23){
					if(bb_utils_isNotZero(t_num1-t_num2,t_precision)){
						t_r=1.0;
					}
				}else{
					if(t_12==24){
						if(bb_utils_isLEZero(t_num1-t_num2,t_precision)){
							t_r=1.0;
						}
					}else{
						if(t_12==25){
							if(bb_utils_isGEZero(t_num1-t_num2,t_precision)){
								t_r=1.0;
							}
						}
					}
				}
			}
		}
	}
	return t_r;
}
c_LcEvalExpression.prototype.p_FNC_exp=function(t_number){
	if(t_number>c_Limitation.m_limits.m__MAX_EXP){
		throw c_EvalException.m_new.call(new c_EvalException,9);
	}else{
		if(t_number<c_Limitation.m_limits.m__MIN_EXP){
			throw c_EvalException.m_new.call(new c_EvalException,10);
		}
	}
	var t_r=Math.exp(t_number);
	this.p_limits(t_r);
	return t_r;
}
c_LcEvalExpression.prototype.p_FNC_log=function(t_number){
	if(t_number<=0.0){
		throw c_EvalException.m_new.call(new c_EvalException,7);
	}
	var t_r=Math.log(t_number);
	return t_r;
}
c_LcEvalExpression.prototype.p_FNC_sqrt=function(t_number){
	if(t_number<0.0){
		throw c_EvalException.m_new.call(new c_EvalException,7);
	}
	var t_r=Math.sqrt(t_number);
	return t_r;
}
c_LcEvalExpression.prototype.p_readParameter=function(t_iCnt,t_bAllowLess){
	if(t_iCnt==0){
		return [];
	}
	var t_aParam=new_number_array(t_iCnt);
	var t_i=0;
	var t_tokenTyp=0;
	for(t_i=0;t_i<t_iCnt;t_i=t_i+1){
		t_aParam[t_i]=0.0;
	}
	t_tokenTyp=this.p_nextToken(true);
	if(t_tokenTyp!=4 || this.m__token.m__chrs[0]!=40){
		throw c_EvalException.m_new.call(new c_EvalException,2);
	}
	for(t_i=0;t_i<t_iCnt;t_i=t_i+1){
		t_aParam[t_i]=this.p_calc(0);
		t_tokenTyp=this.p_nextToken(true);
		if(t_tokenTyp!=4){
			throw c_EvalException.m_new.call(new c_EvalException,2);
		}
		if(t_i+1<t_iCnt){
			if(t_bAllowLess){
				if(this.m__token.m__chrs[0]==41){
					break;
				}
			}
			if(this.m__token.m__chrs[0]!=59){
				throw c_EvalException.m_new.call(new c_EvalException,2);
			}
		}else{
			if(this.m__token.m__chrs[0]!=41){
				throw c_EvalException.m_new.call(new c_EvalException,2);
			}
		}
	}
	return t_aParam;
}
c_LcEvalExpression.prototype.p_callback=function(t_i1,t_i2,t_i3,t_i4){
	return 0.0;
}
c_LcEvalExpression.prototype.p_readSingleCallbackParam=function(){
	var t_c=0;
	var t_val=0;
	var t_tokenTyp=0;
	t_tokenTyp=this.p_nextToken(true);
	if(t_tokenTyp!=4 || this.m__token.m__chrs[0]!=40){
		throw c_EvalException.m_new.call(new c_EvalException,2);
	}
	while(this.m__pos<this.m__size){
		t_c=this.m__expr[this.m__pos];
		if(t_c==32 || t_c==9){
			this.m__pos=this.m__pos+1;
			continue;
		}
		break;
	}
	while(this.m__pos<this.m__size){
		t_c=this.m__expr[this.m__pos];
		if(t_c>=48 && t_c<=57){
			t_val=t_val*10+(t_c-48);
			this.m__pos=this.m__pos+1;
		}else{
			break;
		}
	}
	t_tokenTyp=this.p_nextToken(true);
	if(t_tokenTyp!=4 || this.m__token.m__chrs[0]!=41){
		throw c_EvalException.m_new.call(new c_EvalException,2);
	}
	return t_val;
}
c_LcEvalExpression.prototype.p_calc=function(t_priority){
	var t_oldPtr=this.m__pos;
	var t_exprStart=true;
	var t_num=0.0;
	var t_hasPar=0;
	while(true){
		var t_16=this.p_nextToken(t_exprStart);
		if(t_16==0){
			return 0.0;
		}else{
			if(t_16==1){
				if(t_exprStart==false){
					throw c_EvalException.m_new.call(new c_EvalException,2);
				}
				t_exprStart=false;
				if(this.m__token.m__isval){
					t_num=this.m__token.m__val;
				}else{
					t_num=this.m__token.p_ToFloat();
				}
			}else{
				if(t_16==2){
					if(t_exprStart==true){
						throw c_EvalException.m_new.call(new c_EvalException,2);
					}
					var t_iOpPrio=this.m__token.p_getOpPrio();
					if(t_iOpPrio<=t_priority){
						this.m__pos=t_oldPtr;
						return t_num;
					}
					var t_op=this.m__token.m__op;
					var t_17=t_op;
					if(t_17==1){
						t_num=t_num+this.p_calc(t_iOpPrio);
					}else{
						if(t_17==2){
							t_num=t_num-this.p_calc(t_iOpPrio);
						}else{
							if(t_17==3){
								t_num=t_num*this.p_calc(t_iOpPrio);
							}else{
								if(t_17==4){
									t_num=this.p_OP_div(t_num,this.p_calc(t_iOpPrio));
								}else{
									if(t_17==5){
										t_num=this.p_OP_pow(t_num,this.p_calc(t_iOpPrio));
									}else{
										if(t_17==10){
											t_num=this.p_OP_and(t_num,this.p_calc(t_iOpPrio));
										}else{
											if(t_17==11){
												t_num=this.p_OP_or(t_num,this.p_calc(t_iOpPrio));
											}else{
												if(t_17==20 || t_17==21 || t_17==22 || t_17==23 || t_17==24 || t_17==25){
													t_num=this.p_OP_comp(t_op,t_num,this.p_calc(t_iOpPrio),this.m__op_comp_precision);
												}
											}
										}
									}
								}
							}
						}
					}
				}else{
					if(t_16==3){
						if(t_exprStart==false){
							throw c_EvalException.m_new.call(new c_EvalException,2);
						}
						t_exprStart=false;
						var t_op2=this.m__token.m__op;
						var t_18=t_op2;
						if(t_18==101){
							t_num=-this.p_calc(9);
						}else{
							if(t_18==100){
								t_num=this.p_calc(9);
							}else{
								if(t_18==103){
									t_num=this.p_FNC_exp(this.p_calc(9));
								}else{
									if(t_18==104){
										t_num=this.p_FNC_log(this.p_calc(9));
									}else{
										if(t_18==105){
											t_num=this.p_FNC_sqrt(this.p_calc(9));
										}else{
											if(t_18==102){
												t_num=bb_math_Abs2(this.p_calc(9));
											}else{
												if(t_18==106){
													t_num=bb_utils_round(this.p_calc(9));
												}else{
													if(t_18==107){
														t_num=bb_utils_roundUp(this.p_calc(9));
													}else{
														if(t_18==108){
															t_num=bb_utils_trunc(this.p_calc(9));
														}else{
															if(t_18==199){
																var t_param=this.p_readParameter(4,true);
																t_num=this.p_callback(((t_param[0])|0),((t_param[1])|0),((t_param[2])|0),((t_param[3])|0));
															}else{
																if(t_18==198){
																	t_num=this.p_callback(0,this.p_readSingleCallbackParam(),0,0);
																}else{
																	if(t_18==109){
																		var t_param2=this.p_readParameter(2,false);
																		t_num=bb_math_Min2(t_param2[0],t_param2[1]);
																	}else{
																		if(t_18==110){
																			var t_param3=this.p_readParameter(2,false);
																			t_num=bb_math_Max2(t_param3[0],t_param3[1]);
																		}else{
																			if(t_18==111){
																				var t_param4=this.p_readParameter(3,false);
																				t_num=bb_math_Max2(t_param4[0],t_param4[1]);
																				t_num=bb_math_Min2(t_num,t_param4[2]);
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}else{
						if(t_16==4){
							var t_c=this.m__token.m__chrs[0];
							if(t_exprStart==false && t_c==40 || t_exprStart==true && t_c==41 || t_exprStart==true && t_c==59){
								throw c_EvalException.m_new.call(new c_EvalException,2);
							}
							if(t_c==40){
								t_hasPar=t_hasPar+1;
								t_exprStart=false;
								t_num=this.p_calc(0);
							}else{
								if(t_c==41){
									if(t_hasPar==0){
										this.m__pos=t_oldPtr;
										return t_num;
									}else{
										t_hasPar=t_hasPar-1;
									}
								}else{
									if(t_c==59){
										if(t_hasPar!=0){
											throw c_EvalException.m_new.call(new c_EvalException,2);
										}
										this.m__pos=t_oldPtr;
										return t_num;
									}
								}
							}
						}else{
							if(t_16==5){
								if(t_exprStart==true){
									throw c_EvalException.m_new.call(new c_EvalException,2);
								}
								if(t_hasPar<0){
									throw c_EvalException.m_new.call(new c_EvalException,5);
								}
								return t_num;
							}
						}
					}
				}
			}
		}
		t_oldPtr=this.m__pos;
	}
}
function c_LcEvalToken(){
	Object.call(this);
	this.m__len=0;
	this.m__sz=0;
	this.m__chrs=[];
	this.m__op=0;
	this.m__isval=false;
	this.m__val=.0;
}
c_LcEvalToken.m_new=function(){
	this.m__len=0;
	this.m__sz=0;
	this.m__chrs=[];
	this.m__op=0;
	this.m__isval=false;
	this.m__val=0.0;
	return this;
}
c_LcEvalToken.prototype.p_reset=function(){
	this.m__len=0;
	this.m__op=0;
	this.m__isval=false;
	this.m__val=0.0;
}
c_LcEvalToken.prototype.p_add=function(t_char){
	if(this.m__sz==0 || this.m__len+1>=this.m__sz){
		this.m__sz=this.m__sz+3;
		this.m__chrs=resize_number_array(this.m__chrs,this.m__sz);
	}
	this.m__chrs[this.m__len]=t_char;
	this.m__len=this.m__len+1;
}
c_LcEvalToken.prototype.p_add3=function(t_char){
	var t_i=0;
	var t_sz=t_char.length;
	if(this.m__sz==0 || this.m__len+t_sz>=this.m__sz){
		this.m__sz=this.m__sz+t_sz+1;
		this.m__chrs=resize_number_array(this.m__chrs,this.m__sz);
	}
	for(t_i=0;t_i<t_sz;t_i=t_i+1){
		this.m__chrs[this.m__len]=t_char[t_i];
		this.m__len=this.m__len+1;
	}
}
c_LcEvalToken.prototype.p_isOp=function(){
	this.m__op=0;
	if(this.m__len==1){
		var t_2=this.m__chrs[0];
		if(t_2==43){
			this.m__op=1;
			return true;
		}else{
			if(t_2==45){
				this.m__op=2;
				return true;
			}else{
				if(t_2==42){
					this.m__op=3;
					return true;
				}else{
					if(t_2==47){
						this.m__op=4;
						return true;
					}else{
						if(t_2==94){
							this.m__op=5;
							return true;
						}else{
							if(t_2==60){
								this.m__op=21;
								return true;
							}else{
								if(t_2==61){
									this.m__op=20;
									return true;
								}else{
									if(t_2==62){
										this.m__op=22;
										return true;
									}
								}
							}
						}
					}
				}
			}
		}
	}else{
		if(this.m__len==2){
			var t_3=this.m__chrs[0];
			if(t_3==111 || t_3==79){
				if(this.m__chrs[1]==114 || this.m__chrs[1]==82){
					this.m__op=11;
					return true;
				}
			}else{
				if(t_3==60){
					if(this.m__chrs[1]==62){
						this.m__op=23;
						return true;
					}else{
						if(this.m__chrs[1]==61){
							this.m__op=24;
							return true;
						}
					}
				}else{
					if(t_3==62){
						if(this.m__chrs[1]==61){
							this.m__op=25;
							return true;
						}
					}
				}
			}
		}else{
			if(this.m__len==3){
				var t_4=this.m__chrs[0];
				if(t_4==97 || t_4==65){
					if(this.m__chrs[1]==110 || this.m__chrs[1]==78){
						if(this.m__chrs[2]==100 || this.m__chrs[2]==68){
							this.m__op=10;
							return true;
						}
					}
				}
			}
		}
	}
	return false;
}
c_LcEvalToken.prototype.p_isFunc=function(){
	this.m__op=0;
	if(this.m__len==1){
		var t_6=this.m__chrs[0];
		if(t_6==43){
			this.m__op=100;
			return true;
		}else{
			if(t_6==45){
				this.m__op=101;
				return true;
			}
		}
	}else{
		if(this.m__len==2){
			var t_7=this.m__chrs[0];
			if(t_7==99 || t_7==67){
				if(this.m__chrs[1]==98 || this.m__chrs[1]==66){
					this.m__op=199;
					return true;
				}
			}
		}else{
			if(this.m__len==3){
				var t_8=this.m__chrs[0];
				if(t_8==97 || t_8==65){
					if(this.m__chrs[1]==98 || this.m__chrs[1]==66){
						if(this.m__chrs[2]==115 || this.m__chrs[2]==83){
							this.m__op=102;
							return true;
						}
					}
				}else{
					if(t_8==99 || t_8==67){
						if(this.m__chrs[1]==98 || this.m__chrs[1]==66){
							if(this.m__chrs[2]==118 || this.m__chrs[2]==86){
								this.m__op=198;
								return true;
							}
						}
					}else{
						if(t_8==101 || t_8==69){
							if(this.m__chrs[1]==120 || this.m__chrs[1]==88){
								if(this.m__chrs[2]==112 || this.m__chrs[2]==80){
									this.m__op=103;
									return true;
								}
							}
						}else{
							if(t_8==108 || t_8==76){
								if(this.m__chrs[1]==111 || this.m__chrs[1]==79){
									if(this.m__chrs[2]==103 || this.m__chrs[2]==71){
										this.m__op=104;
										return true;
									}
								}
							}else{
								if(t_8==109 || t_8==77){
									if(this.m__chrs[1]==97 || this.m__chrs[1]==65){
										if(this.m__chrs[2]==120 || this.m__chrs[2]==88){
											this.m__op=110;
											return true;
										}
									}else{
										if(this.m__chrs[1]==105 || this.m__chrs[1]==73){
											if(this.m__chrs[2]==110 || this.m__chrs[2]==78){
												this.m__op=109;
												return true;
											}
										}
									}
								}
							}
						}
					}
				}
			}else{
				if(this.m__len==4){
					var t_9=this.m__chrs[0];
					if(t_9==115 || t_9==83){
						if(this.m__chrs[1]==113 || this.m__chrs[1]==81){
							if(this.m__chrs[2]==114 || this.m__chrs[2]==82){
								if(this.m__chrs[3]==116 || this.m__chrs[3]==84){
									this.m__op=105;
									return true;
								}
							}
						}
					}
				}else{
					if(this.m__len==5){
						var t_10=this.m__chrs[0];
						if(t_10==114 || t_10==82){
							if(this.m__chrs[1]==97 || this.m__chrs[1]==65){
								if(this.m__chrs[2]==110 || this.m__chrs[2]==78){
									if(this.m__chrs[3]==103 || this.m__chrs[3]==71){
										if(this.m__chrs[4]==101 || this.m__chrs[4]==69){
											this.m__op=111;
											return true;
										}
									}
								}
							}else{
								if(this.m__chrs[1]==111 || this.m__chrs[1]==79){
									if(this.m__chrs[2]==117 || this.m__chrs[2]==85){
										if(this.m__chrs[3]==110 || this.m__chrs[3]==78){
											if(this.m__chrs[4]==100 || this.m__chrs[4]==68){
												this.m__op=106;
												return true;
											}
										}
									}
								}
							}
						}else{
							if(t_10==116 || t_10==84){
								if(this.m__chrs[1]==114 || this.m__chrs[1]==82){
									if(this.m__chrs[2]==117 || this.m__chrs[2]==85){
										if(this.m__chrs[3]==110 || this.m__chrs[3]==78){
											if(this.m__chrs[4]==99 || this.m__chrs[4]==67){
												this.m__op=108;
												return true;
											}
										}
									}
								}
							}
						}
					}else{
						if(this.m__len==7){
							var t_11=this.m__chrs[0];
							if(t_11==114 || t_11==82){
								if(this.m__chrs[1]==111 || this.m__chrs[1]==79){
									if(this.m__chrs[2]==117 || this.m__chrs[2]==85){
										if(this.m__chrs[3]==110 || this.m__chrs[3]==78){
											if(this.m__chrs[4]==100 || this.m__chrs[4]==68){
												if(this.m__chrs[5]==117 || this.m__chrs[5]==85){
													if(this.m__chrs[6]==112 || this.m__chrs[6]==80){
														this.m__op=107;
														return true;
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	return false;
}
c_LcEvalToken.prototype.p_ToString=function(){
	return string_fromchars(this.m__chrs.slice(0,this.m__len));
}
c_LcEvalToken.prototype.p_ToFloat=function(){
	if(this.m__isval){
		return this.m__val;
	}
	var t_s=this.p_ToString();
	return parseFloat(t_s);
}
c_LcEvalToken.prototype.p_getOpPrio=function(){
	var t_5=this.m__op;
	if(t_5==10 || t_5==11){
		return 1;
	}else{
		if(t_5==20 || t_5==21 || t_5==22 || t_5==23 || t_5==24 || t_5==25){
			return 2;
		}else{
			if(t_5==1 || t_5==2){
				return 3;
			}else{
				if(t_5==3 || t_5==4){
					return 4;
				}else{
					if(t_5==5){
						return 5;
					}
				}
			}
		}
	}
	return 0;
}
function c_EvalException(){
	ThrowableObject.call(this);
	this.m__err=0;
}
c_EvalException.prototype=extend_class(ThrowableObject);
c_EvalException.m_new=function(t_error){
	this.m__err=t_error;
	return this;
}
c_EvalException.m_new2=function(){
	return this;
}
function c_Limitation(){
	Object.call(this);
	this.m__MAX_FLOAT=(2.0-Math.pow(2.0,-23.0))*Math.pow(2.0,127.0);
	this.m__MIN_FLOAT=Math.pow(2.0,-126.0);
	this.m__MAX_EXP=1024.0;
	this.m__MIN_EXP=-1024.0;
}
c_Limitation.m_new=function(){
	return this;
}
c_Limitation.m_limits=null;
function bb_utils_isLZero(t_f,t_precision){
	if(bb_utils_isZero(t_f,t_precision)){
		return false;
	}
	if(t_f<0.0){
		return true;
	}
	if(t_f>0.0){
		return false;
	}
	return true;
}
function bb_utils_isGZero(t_f,t_precision){
	if(bb_utils_isZero(t_f,t_precision)){
		return false;
	}
	if(t_f>0.0){
		return true;
	}
	if(t_f<0.0){
		return false;
	}
	return true;
}
function bb_utils_isNotZero(t_f,t_precision){
	if(bb_utils_isZero(t_f,t_precision)==false){
		return true;
	}
	return false;
}
function bb_utils_isLEZero(t_f,t_precision){
	if(bb_utils_isZero(t_f,t_precision)){
		return true;
	}
	if(t_f<0.0){
		return true;
	}
	return false;
}
function bb_utils_isGEZero(t_f,t_precision){
	if(bb_utils_isZero(t_f,t_precision)){
		return true;
	}
	if(t_f>0.0){
		return true;
	}
	return false;
}
function bb_utils_roundUp(t_x){
	if(bb_utils_isZero(t_x,8)){
		return 0.0;
	}
	var t_f=bb_math_Abs2(bb_utils_round2(t_x,0.00000001));
	return Math.ceil(t_f)*bb_math_Sgn2(t_x);
}
function bb_utils_roundUp2(t_x,t_factor){
	if(bb_utils_isZero(t_x,8)){
		return 0.0;
	}
	if(bb_utils_isZero(t_factor,8)){
		return bb_utils_roundUp(t_x);
	}
	var t_f=bb_math_Abs2(bb_utils_round2(t_x,0.00000001));
	return Math.ceil(t_f/t_factor)*t_factor*bb_math_Sgn2(t_x);
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
function bb_evalexpression_evalExpression(t_sExpr,t_bThrowException,t_decDelim,t_grpDelim,t_opcomp_precision){
	var t_value=0.0;
	if(t_sExpr==""){
		return 0.0;
	}
	try{
		var t_cExpr=c_LcEvalExpression.m_new.call(new c_LcEvalExpression,t_decDelim,t_grpDelim,t_sExpr,t_opcomp_precision);
		t_value=t_cExpr.p_calc(0);
		if(t_cExpr.p_nextToken(false)!=5){
			throw c_EvalException.m_new.call(new c_EvalException,2);
		}
	}catch(_eek_){
		if(t_e1=object_downcast(_eek_,c_EvalException)){
			t_value=0.0;
			if(t_bThrowException){
				throw c_EvalException.m_new.call(new c_EvalException,t_e1.m__err);
			}
		}else if(t_e2=object_downcast(_eek_,ThrowableObject)){
			t_value=0.0;
			if(t_bThrowException){
				throw c_EvalException.m_new.call(new c_EvalException,99);
			}
		}else{
			throw _eek_;
		}
	}
	return t_value;
}
function bb_evalexpression_evalExpression2(t_sExpr,t_bThrowException,t_decDelim,t_grpDelim,t_opcomp_precision){
	if(t_decDelim.length==1 && t_grpDelim.length==1){
		return bb_evalexpression_evalExpression(t_sExpr,t_bThrowException,t_decDelim.charCodeAt(0),t_grpDelim.charCodeAt(0),t_opcomp_precision);
	}
	return bb_evalexpression_evalExpression(t_sExpr,t_bThrowException,-1,-1,t_opcomp_precision);
}
function bb_evalexpression_evalExpression3(t_sExpr){
	return bb_evalexpression_evalExpression(t_sExpr,false,-1,-1,4);
}
function c_StCProgr(){
	Object.call(this);
	this.m__id=0;
	this.m__freibetrag=.0;
	this.m__prg=null;
	this.m__kinder=0;
}
c_StCProgr.m_new=function(t_calc,t_id,t_freibetrag){
	if(t_calc!=null){
	}
	this.m__id=t_id;
	this.m__freibetrag=t_freibetrag;
	if(this.m__id>0){
		this.m__prg=object_downcast((t_calc.m__strw.m__stprogr.p_Get3(this.m__id)),c_StRProgr);
	}
	return this;
}
c_StCProgr.m_new2=function(t_calc,t_id,t_freibetrag){
	if(t_calc!=null){
		this.m__kinder=t_calc.m__grundlage.m__kinder;
	}
	this.m__id=t_id;
	this.m__freibetrag=t_freibetrag;
	if(this.m__id>0){
		this.m__prg=object_downcast((t_calc.m__strw.m__stprogr.p_Get3(this.m__id)),c_StRProgr);
	}
	return this;
}
c_StCProgr.m_new3=function(t_rw,t_id){
	this.m__id=t_id;
	this.m__kinder=0;
	this.m__freibetrag=0.0;
	if(this.m__id>0){
		this.m__prg=object_downcast((t_rw.m__stprogr.p_Get3(this.m__id)),c_StRProgr);
	}
	return this;
}
c_StCProgr.m_new4=function(t_rw,t_id,t_kinder,t_freibetrag){
	this.m__id=t_id;
	this.m__kinder=t_kinder;
	this.m__freibetrag=t_freibetrag;
	if(this.m__id>0){
		this.m__prg=object_downcast((t_rw.m__stprogr.p_Get3(this.m__id)),c_StRProgr);
	}
	return this;
}
c_StCProgr.m_new5=function(){
	return this;
}
c_StCProgr.prototype.p_isValid=function(){
	if(this.m__prg==null){
		return false;
	}
	return true;
}
c_StCProgr.prototype.p_nurKopfInformationen=function(){
	var t_pType=0;
	if(this.m__prg.m__werte.p_Count()==0){
		t_pType=this.m__prg.m__typ;
		if(t_pType!=c_StR_common.m_ProgrTyp_G_A && t_pType!=c_StR_common.m_ProgrTyp_G_B && t_pType!=c_StR_common.m_ProgrTyp_G_A_OHNE_RABATT && t_pType!=c_StR_common.m_ProgrTyp_SOURCE){
			return true;
		}
	}
	return false;
}
c_StCProgr.prototype.p_getWertKey=function(t_rWert){
	var t_iNum=0;
	var t_=this.m__prg.m__werte.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_x=t_.p_NextObject();
		var t_o=object_downcast((t_x),c_StRProgrWert);
		if(t_o.m__wert>t_rWert){
			break;
		}
		t_iNum=t_o.m__num;
	}
	return t_iNum;
}
c_StCProgr.prototype.p_getWertByValue=function(t_rWert){
	return object_downcast((this.m__prg.m__werte.p_Get3(this.p_getWertKey(t_rWert))),c_StRProgrWert);
}
c_StCProgr.prototype.p_getWertByIdx=function(t_iPos){
	var t_i=0;
	var t_=this.m__prg.m__werte.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_x=t_.p_NextObject();
		if(t_i==t_iPos){
			return object_downcast((t_x),c_StRProgrWert);
		}
		t_i=t_i+1;
	}
	return null;
}
c_StCProgr.prototype.p_evalFormula=function(t_cProgWert,t_rWert){
	var t_sWert="";
	var t_sFormel="";
	t_sWert=String(bb_utils_round(t_rWert));
	if(t_sWert==""){
		t_sWert="0";
	}
	t_sFormel=t_cProgWert.m__formel;
	t_sFormel=string_replace(t_sFormel,"$wert$",t_sWert);
	return bb_evalexpression_evalExpression3(t_sFormel);
}
c_StCProgr.prototype.p_getWertPos=function(t_rWert){
	var t_i=0;
	var t_=this.m__prg.m__werte.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_x=t_.p_NextObject();
		var t_o=object_downcast((t_x),c_StRProgrWert);
		if(t_o.m__wert>t_rWert){
			break;
		}
		t_i=t_i+1;
	}
	return t_i-1;
}
c_StCProgr.prototype.p_berechneSt=function(t_rEinkommen){
	var t_rWert=0.0;
	var t_rSteuer=0.0;
	var t_rProz=.0;
	var t_rEKgerundet=.0;
	var t_iWertPosition=0;
	var t_cProgWert=null;
	var t_cNextProgWert=null;
	var t_rLastProgWert=0.0;
	if(this.p_nurKopfInformationen()){
		return 0.0;
	}
	var t_1=this.m__prg.m__typ;
	if(t_1==c_StR_common.m_ProgrTyp_FIX){
		if(bb_utils_isLEZero(t_rEinkommen,0)){
			return 0.0;
		}
		t_cProgWert=this.p_getWertByValue(t_rEinkommen);
		if(t_cProgWert.m__wert<t_rEinkommen){
			var t_iUID=t_cProgWert.p_getUID();
			t_iUID=t_iUID+1;
			t_cProgWert=this.p_getWertByIdx(t_iUID);
		}
		t_rSteuer=t_rEinkommen*t_cProgWert.m__prozent/100.0;
	}else{
		if(t_1==c_StR_common.m_ProgrTyp_DEF){
			return 0.0;
		}else{
			if(t_1==c_StR_common.m_ProgrTyp_B){
				t_cProgWert=this.p_getWertByValue(t_rEinkommen);
				t_rSteuer=t_cProgWert.m__steuer;
				t_rSteuer=t_rSteuer+(t_rEinkommen-t_cProgWert.m__wert)*t_cProgWert.m__prozent/100.0;
			}else{
				if(t_1==c_StR_common.m_ProgrTyp_FORMEL){
					t_cProgWert=this.p_getWertByValue(t_rEinkommen);
					t_rSteuer=this.p_evalFormula(t_cProgWert,t_rEinkommen);
				}else{
					if(t_1==c_StR_common.m_ProgrTyp_F){
						t_iWertPosition=this.p_getWertPos(t_rEinkommen);
						t_cProgWert=this.p_getWertByIdx(t_iWertPosition);
						t_cNextProgWert=this.p_getWertByIdx(t_iWertPosition+1);
						if(t_cNextProgWert==null){
							t_cNextProgWert=t_cProgWert;
						}
						t_rEKgerundet=c_StCBasisRechner.m_runden(t_rEinkommen,1.0,c_StC_common.m_Runden_AB);
						t_rProz=t_cProgWert.m__prozent;
						if(t_cNextProgWert.m__wert!=t_cProgWert.m__wert){
							t_rProz=t_rProz+(t_rEKgerundet-t_cProgWert.m__wert)*(t_cNextProgWert.m__prozent-t_cProgWert.m__prozent)/(t_cNextProgWert.m__wert-t_cProgWert.m__wert);
						}
						t_rSteuer=t_rEinkommen*t_rProz/100.0;
					}else{
						if(t_1==c_StR_common.m_ProgrTyp_Z){
							var t_=this.m__prg.m__werte.p_Values().p_ObjectEnumerator();
							while(t_.p_HasNext()){
								var t_x=t_.p_NextObject();
								t_cProgWert=object_downcast((t_x),c_StRProgrWert);
								t_rLastProgWert=t_rLastProgWert+t_cProgWert.m__wert;
								if(t_rEinkommen>t_rWert+t_cProgWert.m__wert){
									t_rWert=t_rWert+t_cProgWert.m__wert;
									t_rSteuer=t_rSteuer+t_cProgWert.m__wert*t_cProgWert.m__prozent/100.0;
								}else{
									t_rSteuer=t_rSteuer+(t_rEinkommen-t_rWert)*t_cProgWert.m__prozent/100.0;
									break;
								}
							}
							if(t_rEinkommen>t_rLastProgWert){
								t_rSteuer=t_rSteuer+(t_rEinkommen-t_rWert)*t_cProgWert.m__prozent/100.0;
							}
						}else{
							if(t_1==c_StR_common.m_ProgrTyp_R){
								t_cProgWert=this.p_getWertByIdx(0);
								t_cNextProgWert=this.p_getWertByIdx(1);
								if(t_cNextProgWert==null){
									t_cNextProgWert=t_cProgWert;
								}
								t_rEinkommen=bb_math_Max2(t_rEinkommen,0.0);
								if(bb_utils_isGZero(t_rEinkommen,0)){
									t_rSteuer=(t_cProgWert.m__wert*t_rEinkommen-t_cProgWert.m__prozent)/(t_rEinkommen+t_cProgWert.m__steuer);
									t_rSteuer=bb_math_Min2(t_rSteuer,t_cNextProgWert.m__wert/100.0);
									t_rSteuer=bb_math_Max2(t_rSteuer,t_cNextProgWert.m__prozent/100.0);
									t_rSteuer=t_rSteuer*t_rEinkommen;
								}
							}else{
								if(t_1==c_StR_common.m_ProgrTyp_K){
									var t_rest=(this.m__kinder);
									var t_i=0;
									while(bb_utils_isGZero(t_rest,0)){
										t_cProgWert=this.p_getWertByIdx(t_i);
										if(t_cProgWert==null){
											break;
										}
										t_rSteuer=t_rSteuer+bb_math_Min2(t_rest,t_cProgWert.m__wert)*t_cProgWert.m__prozent;
										t_rest=t_rest-t_cProgWert.m__wert;
										t_i=t_i+1;
									}
								}else{
									if(t_1==c_StR_common.m_ProgrTyp_G_A){
									}else{
										if(t_1==c_StR_common.m_ProgrTyp_G_B){
										}else{
											if(t_1==c_StR_common.m_ProgrTyp_G_A_OHNE_RABATT){
											}else{
												if(t_1==c_StR_common.m_ProgrTyp_TIEF_EK){
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	return t_rSteuer;
}
c_StCProgr.prototype.p_rundePreStWert=function(t_rSteuerbar){
	var t_iRndMask=c_StR_common.m_RundungTyp_DOWN|c_StR_common.m_RundungTyp_UP|c_StR_common.m_RundungTyp_NEXT;
	if((this.m__prg.m__rtyp_steuerbar&c_StR_common.m_RundungTyp_VORABZUG)!=0){
		t_rSteuerbar=c_StCBasisRechner.m_runden(t_rSteuerbar,this.m__prg.m__rbetr,this.m__prg.m__rtyp_steuerbar&t_iRndMask);
	}
	return t_rSteuerbar;
}
c_StCProgr.prototype.p_rundePreSatz=function(t_rSatzbestimmend){
	var t_iRndMask=c_StR_common.m_RundungTyp_DOWN|c_StR_common.m_RundungTyp_UP|c_StR_common.m_RundungTyp_NEXT;
	if((this.m__prg.m__rtyp_satzbest&c_StR_common.m_RundungTyp_VORABZUG)!=0){
		t_rSatzbestimmend=c_StCBasisRechner.m_runden(t_rSatzbestimmend,this.m__prg.m__rbetr,this.m__prg.m__rtyp_satzbest&t_iRndMask);
	}
	return t_rSatzbestimmend;
}
c_StCProgr.prototype.p_rundePostSatz=function(t_rSatzbestimmend){
	var t_iRndMask=c_StR_common.m_RundungTyp_DOWN|c_StR_common.m_RundungTyp_UP|c_StR_common.m_RundungTyp_NEXT;
	if((this.m__prg.m__rtyp_satzbest&c_StR_common.m_RundungTyp_NACHABZUG)!=0){
		t_rSatzbestimmend=c_StCBasisRechner.m_runden(t_rSatzbestimmend,this.m__prg.m__rbetr,this.m__prg.m__rtyp_satzbest&t_iRndMask);
	}
	return t_rSatzbestimmend;
}
c_StCProgr.prototype.p_rundePostStWert=function(t_rSteuerbar){
	var t_iRndMask=c_StR_common.m_RundungTyp_DOWN|c_StR_common.m_RundungTyp_UP|c_StR_common.m_RundungTyp_NEXT;
	if((this.m__prg.m__rtyp_steuerbar&c_StR_common.m_RundungTyp_NACHABZUG)!=0){
		t_rSteuerbar=c_StCBasisRechner.m_runden(t_rSteuerbar,this.m__prg.m__rbetr,this.m__prg.m__rtyp_steuerbar&t_iRndMask);
	}
	return t_rSteuerbar;
}
function c_StC_jurPers_BasisRechner(){
	Object.call(this);
	this.m__strw=null;
}
function c_StCBasisRechner(){
	Object.call(this);
	this.m__rundung=0;
}
c_StCBasisRechner.m_runden=function(t_rWert,t_rSchritt,t_eTyp){
	var t_1=t_eTyp;
	if(t_1==c_StC_common.m_Runden_AB){
		return bb_utils_trunc2(t_rWert,t_rSchritt);
	}else{
		if(t_1==c_StC_common.m_Runden_AUF){
			return bb_utils_roundUp2(t_rWert,t_rSchritt);
		}else{
			if(t_1==c_StC_common.m_Runden_NORMAL){
				return bb_utils_round2(t_rWert,t_rSchritt);
			}
		}
	}
	return t_rWert;
}
c_StCBasisRechner.m_new=function(){
	this.m__rundung=c_StC_common.m_Rundung_Franken;
	return this;
}
c_StCBasisRechner.prototype.p_rundeWert=function(t_rWert){
	var t_2=this.m__rundung;
	if(t_2==c_StC_common.m_Rundung_KEIN){
	}else{
		if(t_2==c_StC_common.m_Rundung_Franken){
			return c_StCBasisRechner.m_runden(t_rWert,1.0,c_StC_common.m_Runden_NORMAL);
		}else{
			if(t_2==c_StC_common.m_Rundung_Rappen){
				return c_StCBasisRechner.m_runden(t_rWert,0.05,c_StC_common.m_Runden_NORMAL);
			}
		}
	}
	return t_rWert;
}
function bb_ahv_werte_getPensionsalter(t_land,t_geschlecht,t_jahrgang){
	var t_mann=t_geschlecht==1;
	if(t_land.p_liechtenstein()){
		if(t_jahrgang>=1958){
			return 65;
		}else{
			return 64;
		}
	}else{
		if(t_mann){
			return 65;
		}else{
			if(t_jahrgang+62<2001){
				return 62;
			}else{
				if(t_jahrgang+63<2005){
					return 63;
				}else{
					return 64;
				}
			}
		}
	}
}
function c_S3aSparen(){
	c_Newton.call(this);
	this.m__rundung=0;
	this.m__ekst0=.0;
	this.m__ekst1=.0;
	this.m__einsp=.0;
	this.m__einspn=.0;
	this.m__kapsteuer_ersteinlage=.0;
	this.m__kapbrut=.0;
	this.m__kapsteuer=.0;
	this.m__kapnet=.0;
	this.m__rendnet=.0;
	this.m__rendbrutto=.0;
	this.m__konti=c_Collection.m_new.call(new c_Collection);
	this.m__stand=c_Collection.m_new.call(new c_Collection);
}
c_S3aSparen.prototype=extend_class(c_Newton);
c_S3aSparen.m_new=function(){
	c_Newton.m_new.call(this);
	this.m__rundung=c_StC_common.m_Rundung_Franken;
	return this;
}
c_S3aSparen.prototype.p_calcEKTax=function(t_ortid,t_zivil,t_konf,t_kinder,t_stbekkt,t_stbekbund,t_year,t_einlage){
	if(c_StRWLoader.m_isValid()==false){
		return;
	}
	var t_calc=c_StC_natPers_BasisRechner.m_new3.call(new c_StC_natPers_BasisRechner,c_StRWLoader.m__current_rw,t_year);
	if(t_calc.p_loadSteuerort2(t_ortid)==false){
		return;
	}
	t_calc.m__rundung=this.m__rundung;
	t_calc.m__grundlage.p__zivilstand2(t_zivil);
	t_calc.m__grundlage.m__kinder=t_kinder;
	t_calc.m__grundlage.m__stbEkBund=t_stbekbund;
	t_calc.m__grundlage.m__stbEkKt=t_stbekkt;
	t_calc.m__grundlage.m__stbEkGmd=t_stbekkt;
	t_calc.m__grundlage.m__konf1=t_konf;
	t_calc.m__grundlage.m__anteilKonf1=100;
	var t_oEK=t_calc.p_addSteuerObjekt(c_StC_natPers.m_CalcTyp_EINKOMMENSSTEUER);
	var t_oPS=t_calc.p_addSteuerObjekt(c_StC_natPers.m_CalcTyp_PERSONALSTEUER);
	t_oEK.p_calculate();
	t_oPS.p_calculate();
	this.m__ekst0=t_oEK.p_getGesamtsteuer()+t_oPS.p_getGesamtsteuer();
	t_calc.m__grundlage.m__stbEkBund=bb_math_Max2(0.0,t_stbekbund-(t_einlage));
	t_calc.m__grundlage.m__stbEkKt=bb_math_Max2(0.0,t_stbekkt-(t_einlage));
	t_oEK.p_calculate();
	t_oPS.p_calculate();
	this.m__ekst1=t_oEK.p_getGesamtsteuer()+t_oPS.p_getGesamtsteuer();
}
c_S3aSparen.prototype.p_fillKonto=function(t_einlage,t_dauer,t_accountno){
	var t_i=0;
	var t_c=0;
	var t_cmax=0;
	var t_f=.0;
	t_f=1.0;
	if(t_einlage>0){
		t_f=1.0*((t_einlage)-this.m__einsp)/(t_einlage);
	}
	var t_yeinlage=new_number_array(5);
	var t_sumceinlage=0;
	t_cmax=t_accountno;
	for(t_c=0;t_c<t_cmax;t_c=t_c+1){
		t_yeinlage[t_c]=((t_einlage/t_cmax)|0);
		t_sumceinlage=t_sumceinlage+t_yeinlage[t_c];
	}
	t_yeinlage[0]=t_yeinlage[0]-(t_sumceinlage-t_einlage);
	for(t_i=0;t_i<t_dauer;t_i=t_i+1){
		t_cmax=t_accountno;
		if(t_i>t_dauer-t_accountno){
			t_cmax=t_dauer-t_i;
			t_sumceinlage=0;
			for(t_c=0;t_c<t_cmax;t_c=t_c+1){
				t_yeinlage[t_c]=((t_einlage/t_cmax)|0);
				t_sumceinlage=t_sumceinlage+t_yeinlage[t_c];
			}
			t_yeinlage[0]=t_yeinlage[0]-(t_sumceinlage-t_einlage);
		}
		for(t_c=0;t_c<t_cmax;t_c=t_c+1){
			var t_kto=object_downcast((this.m__konti.p_getObject(t_c)),c_S3aKonto);
			t_kto.p_setEinzahlung(t_i,t_yeinlage[t_c],(t_yeinlage[t_c])*t_f);
		}
	}
}
c_S3aSparen.prototype.p_rundeWert=function(t_rWert){
	var t_1=this.m__rundung;
	if(t_1==c_StC_common.m_Rundung_KEIN){
	}else{
		if(t_1==c_StC_common.m_Rundung_Franken){
			return bb_utils_round2(t_rWert,1.0);
		}else{
			if(t_1==c_StC_common.m_Rundung_Rappen){
				return bb_utils_round2(t_rWert,0.05);
			}
		}
	}
	return t_rWert;
}
c_S3aSparen.prototype.p_collectStand=function(t_dauer,t_rendite,t_accountno){
	var t_i=0;
	var t_aeinsp=.0;
	var t_eeinsp=.0;
	var t_astand=.0;
	var t_estand=.0;
	var t_z=.0;
	var t_inv=.0;
	var t_p=t_rendite/100.0;
	var t_e=.0;
	var t_stand=null;
	var t_einl=null;
	var t_kto=null;
	t_aeinsp=0.0;
	for(t_i=0;t_i<t_dauer;t_i=t_i+1){
		t_eeinsp=t_aeinsp+this.m__einsp;
		this.m__stand.p_add2(c_S3aStandJahr.m_new.call(new c_S3aStandJahr,t_i+1,this.p_rundeWert(t_aeinsp),this.p_rundeWert(t_eeinsp)));
		t_aeinsp=t_eeinsp;
	}
	var t_=this.m__konti.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		t_kto=object_downcast((t_o),c_S3aKonto);
		t_astand=t_kto.m__astand;
		for(t_i=0;t_i<t_dauer;t_i=t_i+1){
			t_stand=object_downcast((this.m__stand.p_getObject(t_i)),c_S3aStandJahr);
			t_einl=object_downcast((t_kto.m__zhlg.p_getObject(t_i)),c_S3aZhlg);
			if(t_stand==null || t_einl==null){
				break;
			}
			t_e=(t_einl.m__e);
			t_z=t_astand*t_p+t_e*t_p;
			t_estand=t_astand+t_z+t_e;
			t_stand.m__astand=t_stand.m__astand+t_astand;
			t_stand.m__estand=t_stand.m__estand+t_estand;
			t_stand.m__jinvest=t_stand.m__jinvest+t_e;
			t_stand.m__jzins=t_stand.m__jzins+t_z;
			t_astand=t_estand;
		}
	}
	t_z=0.0;
	t_inv=0.0;
	for(t_i=0;t_i<t_dauer;t_i=t_i+1){
		t_stand=object_downcast((this.m__stand.p_getObject(t_i)),c_S3aStandJahr);
		t_z=t_z+t_stand.m__jzins;
		t_inv=t_inv+t_stand.m__jinvest;
		t_stand.m__astand=this.p_rundeWert(t_stand.m__astand);
		t_stand.m__estand=this.p_rundeWert(t_stand.m__estand);
		t_stand.m__jinvest=this.p_rundeWert(t_stand.m__jinvest);
		t_stand.m__jzins=this.p_rundeWert(t_stand.m__jzins);
		t_stand.m__zinsen=this.p_rundeWert(t_z);
		t_stand.m__invest=this.p_rundeWert(t_inv);
	}
}
c_S3aSparen.prototype.p_calcKapTax=function(t_ortid,t_zivil,t_konf,t_kinder,t_dauer,t_sex,t_ealter,t_year,t_accountno,t_initialinvest){
	if(c_StRWLoader.m_isValid()==false){
		return;
	}
	var t_calc=c_StC_natPers_BasisRechner.m_new3.call(new c_StC_natPers_BasisRechner,c_StRWLoader.m__current_rw,t_year);
	if(t_calc.p_loadSteuerort2(t_ortid)==false){
		return;
	}
	t_calc.m__rundung=this.m__rundung;
	t_calc.m__grundlage.p__zivilstand2(t_zivil);
	t_calc.m__grundlage.m__kinder=t_kinder;
	t_calc.m__grundlage.m__sex=t_sex;
	t_calc.m__grundlage.m__konf1=t_konf;
	t_calc.m__grundlage.m__anteilKonf1=100;
	var t_oKap=t_calc.p_addSteuerObjekt(c_StC_natPers.m_CalcTyp_STEUER_SAUELE_2A3A);
	var t_k=t_calc.m__grundlage.p_addKapital(c_StC_natPers.m_Kapital_SAEULE_3A);
	var t_c=0;
	if(t_initialinvest>0){
		t_k.m__stbKap=(t_initialinvest);
		t_k.m__endalter=t_ealter;
		t_oKap.p_calculate();
		this.m__kapsteuer_ersteinlage=t_oKap.p_getGesamtsteuer();
	}
	for(t_c=0;t_c<t_accountno;t_c=t_c+1){
		var t_kto=object_downcast((this.m__konti.p_getObject(t_c)),c_S3aKonto);
		t_k.m__stbKap=t_kto.p_calcKap2();
		t_k.m__endalter=t_ealter-(t_dauer-t_kto.m__lz);
		t_oKap.p_calculate();
		t_kto.m__kapsteuer=t_oKap.p_getGesamtsteuer();
		t_kto.m__ealter=t_k.m__endalter;
	}
}
c_S3aSparen.prototype.p_summary=function(t_einlage,t_accountno,t_initialinvest){
	var t_kto=null;
	var t_=this.m__konti.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		t_kto=object_downcast((t_o),c_S3aKonto);
		this.m__kapbrut=this.m__kapbrut+t_kto.p_calcKap2();
		this.m__kapsteuer=this.m__kapsteuer+t_kto.m__kapsteuer;
	}
	this.m__kapbrut=this.p_rundeWert(this.m__kapbrut);
	this.m__kapnet=this.m__kapbrut-this.m__kapsteuer;
	if(t_initialinvest>0){
		var t_2=this.m__konti.p_ObjectEnumerator();
		while(t_2.p_HasNext()){
			var t_o2=t_2.p_NextObject();
			t_kto=object_downcast((t_o2),c_S3aKonto);
			t_kto.m__astand=((t_initialinvest)-this.m__kapsteuer_ersteinlage)/(t_accountno);
		}
		this.m__rendnet=this.p_approximate(0.0,this.m__kapnet,0.1,1.0,4.0);
		var t_3=this.m__konti.p_ObjectEnumerator();
		while(t_3.p_HasNext()){
			var t_o3=t_3.p_NextObject();
			t_kto=object_downcast((t_o3),c_S3aKonto);
			t_kto.m__astand=((t_initialinvest/t_accountno)|0);
		}
	}else{
		this.m__rendnet=this.p_approximate(0.0,this.m__kapnet,0.1,1.0,4.0);
	}
	var t_stvorteil=this.m__einsp/t_einlage;
	if(t_stvorteil>0.0){
		this.m__rendbrutto=this.m__rendnet/(1.0-t_stvorteil);
	}
}
c_S3aSparen.prototype.p_berechne=function(t_ortid,t_zivil,t_konf,t_kinder,t_stbekkt,t_stbekbund,t_einlage,t_dauer,t_rendite,t_sex,t_ealter,t_year,t_accountno,t_initialinvest){
	this.m__ekst0=0.0;
	this.m__ekst1=0.0;
	this.m__einsp=0.0;
	this.m__einspn=0.0;
	this.m__kapsteuer_ersteinlage=0.0;
	this.m__kapbrut=0.0;
	this.m__kapsteuer=0.0;
	this.m__kapnet=0.0;
	this.m__rendnet=0.0;
	this.m__rendbrutto=0.0;
	this.m__konti.p_clear();
	this.m__stand.p_clear();
	if(t_dauer<1 || t_einlage<1 && t_initialinvest<1){
		return;
	}
	if(t_accountno<1){
		t_accountno=1;
	}
	if(t_accountno>5){
		t_accountno=5;
	}
	if(t_accountno>t_dauer){
		t_accountno=t_dauer;
	}
	for(var t_i=0;t_i<t_accountno;t_i=t_i+1){
		this.m__konti.p_add2(c_S3aKonto.m_new.call(new c_S3aKonto,t_i+1,((t_initialinvest/t_accountno)|0),t_rendite));
	}
	this.p_calcEKTax(t_ortid,t_zivil,t_konf,t_kinder,t_stbekkt,t_stbekbund,t_year,t_einlage);
	this.m__einsp=bb_math_Max2(0.0,this.m__ekst0-this.m__ekst1);
	this.m__einspn=this.m__einsp*(t_dauer);
	this.p_fillKonto(t_einlage,t_dauer,t_accountno);
	this.p_collectStand(t_dauer,t_rendite,t_accountno);
	this.p_calcKapTax(t_ortid,t_zivil,t_konf,t_kinder,t_dauer,t_sex,t_ealter,t_year,t_accountno,t_initialinvest);
	this.p_summary((t_einlage),t_accountno,t_initialinvest);
}
c_S3aSparen.prototype.p_sample=function(t_startval,t_guess){
	var t_kto=null;
	var t_kap=.0;
	var t_=this.m__konti.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		t_kto=object_downcast((t_o),c_S3aKonto);
		t_kap=t_kap+t_kto.p_calcKap(t_guess,true);
	}
	return t_kap;
}
function c_S3aKonto(){
	c_Newton.call(this);
	this.m__nr=0;
	this.m__astand=.0;
	this.m__r=.0;
	this.m__lz=0;
	this.m__zhlg=c_Collection.m_new.call(new c_Collection);
	this.m__kapsteuer=.0;
	this.m__ealter=0;
}
c_S3aKonto.prototype=extend_class(c_Newton);
c_S3aKonto.m_new=function(t_nr,t_anfangsstand,t_rendite){
	c_Newton.m_new.call(this);
	this.m__nr=t_nr;
	this.m__astand=(t_anfangsstand);
	this.m__r=t_rendite;
	return this;
}
c_S3aKonto.m_new2=function(){
	c_Newton.m_new.call(this);
	return this;
}
c_S3aKonto.prototype.p_setEinzahlung=function(t_jahr,t_einlage,t_nettoeinlage){
	this.m__lz=t_jahr+1;
	this.m__zhlg.p_add2(c_S3aZhlg.m_new.call(new c_S3aZhlg,t_einlage,t_nettoeinlage));
}
c_S3aKonto.prototype.p_calcKap=function(t_rendite,t_bNettoEinlage){
	var t_kap=.0;
	var t_einl=null;
	var t_e=.0;
	var t_p=t_rendite/100.0;
	var t_z=.0;
	t_kap=this.m__astand;
	var t_=this.m__zhlg.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		t_einl=object_downcast((t_o),c_S3aZhlg);
		if(t_bNettoEinlage){
			t_e=t_einl.m__enet;
		}else{
			t_e=(t_einl.m__e);
		}
		t_z=t_kap*t_p+t_e*t_p;
		t_kap=t_kap+t_z+t_e;
	}
	return t_kap;
}
c_S3aKonto.prototype.p_calcKap2=function(){
	var t_kap=this.p_calcKap(this.m__r,false);
	return t_kap;
}
c_S3aKonto.prototype.p_sample=function(t_startval,t_guess){
	var t_kap=this.p_calcKap(t_guess,true);
	return t_kap;
}
function c_StCStObjekt(){
	c_StCBasis.call(this);
	this.m__calctyp=0;
	this.m__calc=null;
	this.m__st=c_StC_natPers_Steuern.m_new.call(new c_StC_natPers_Steuern);
	this.m__calcbasis=c_StCBasisRechner.m_new.call(new c_StCBasisRechner);
}
c_StCStObjekt.prototype=extend_class(c_StCBasis);
c_StCStObjekt.m_new=function(){
	c_StCBasis.m_new.call(this);
	this.m__calctyp=c_StC_natPers.m_CalcTyp_KEIN;
	return this;
}
c_StCStObjekt.prototype.p_calcSpezifisch=function(){
	throw c_LException.m_new.call(new c_LException,"calcSpezifisch not implemented - must be inherited");
}
c_StCStObjekt.prototype.p_calculate=function(){
	this.m__st.p_clear();
	if(this.m__calc.p_isValid()==false){
		return;
	}
	this.p_calcSpezifisch();
	this.m__st.p_steuer_not_rounded();
	this.m__st.p_rundeAlles(this.m__calcbasis);
}
c_StCStObjekt.prototype.p_getGesamtsteuer=function(){
	return this.m__st.p__level(c_StC_common.m_TaxLevel_BUND).m__steuer+this.m__st.p__level(c_StC_common.m_TaxLevel_KANTON).m__steuer+this.m__st.p__level(c_StC_common.m_TaxLevel_GEMEINDE).m__steuer+this.m__st.p__level(c_StC_common.m_TaxLevel_KIRCHE).m__steuer;
}
c_StCStObjekt.prototype.p_getStBasis=function(t_bFuerBund,t_cProg,t_pcCollAbzuege,t_iIndexAbzug,t_iSpez,t_iEndAlter,t_iRentenJahr,t_rSteuerwert,t_rSatzbestimmend){
	var t_rSteuerwertVorAbzuege=.0;
	var t_rAbzugSteuerwert=.0;
	var t_rAbzugSatzbestimmend=.0;
	var t_cAbzug=c_StC_natPers_Abzug.m_new.call(new c_StC_natPers_Abzug,this.m__calctyp,this.m__calc);
	if(bb_utils_isGZero(t_rSatzbestimmend,0) && ((t_iSpez&c_StR_natPers.m_Spez_RENTENTABELLE)!=0)){
		t_rSatzbestimmend=t_rSatzbestimmend*this.m__calc.m__strw.p_getNatPersRentensatz(t_iRentenJahr,t_iEndAlter,this.m__calc.m__grundlage.p__istMann())/1000.0;
		if(bb_utils_isGZero(this.m__calc.m__grundlage.m__rentensatz,0)){
			t_rSatzbestimmend=this.m__calc.m__grundlage.m__rentensatz;
		}
	}
	t_rAbzugSteuerwert=0.0;
	t_rAbzugSatzbestimmend=0.0;
	t_rSteuerwertVorAbzuege=t_cProg.p_rundePreStWert(t_rSteuerwert);
	var t_bFuerSatzbest=false;
	var t_=t_pcCollAbzuege.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_x=t_.p_NextObject();
		var t_a=object_downcast((t_x),c_StR_natPers_Abzg);
		var t_f=[];
		t_f=t_cAbzug.p_berechnePreAbzug(t_rSteuerwertVorAbzuege,t_a,t_bFuerBund,t_bFuerSatzbest);
		t_rAbzugSteuerwert=t_rAbzugSteuerwert+t_f[0];
		t_rSteuerwertVorAbzuege=t_rSteuerwertVorAbzuege-t_f[0];
	}
	t_rSteuerwertVorAbzuege=t_cProg.p_rundePreSatz(t_rSteuerwert);
	t_bFuerSatzbest=true;
	var t_2=t_pcCollAbzuege.p_Values().p_ObjectEnumerator();
	while(t_2.p_HasNext()){
		var t_x2=t_2.p_NextObject();
		var t_a2=object_downcast((t_x2),c_StR_natPers_Abzg);
		var t_f2=[];
		t_f2=t_cAbzug.p_berechnePreAbzug(t_rSteuerwertVorAbzuege,t_a2,t_bFuerBund,t_bFuerSatzbest);
		t_rAbzugSatzbestimmend=t_rAbzugSatzbestimmend+t_f2[1];
		t_rSteuerwertVorAbzuege=t_rSteuerwertVorAbzuege-t_f2[0];
	}
	t_rSteuerwert=t_rSteuerwert-t_rAbzugSteuerwert;
	t_rSteuerwert=bb_math_Max2(0.0,t_rSteuerwert);
	if(bb_utils_isZero(t_rSatzbestimmend,0)){
		t_rSatzbestimmend=t_cProg.p_rundePreSatz(t_rSteuerwert);
		t_rSatzbestimmend=t_rSatzbestimmend-t_rAbzugSatzbestimmend;
		t_rSatzbestimmend=bb_math_Max2(0.0,t_rSatzbestimmend);
		if(t_iIndexAbzug>0 && bb_utils_isGZero(t_rSatzbestimmend,0)){
			if(this.m__calctyp!=c_StC_natPers.m_CalcTyp_VERMOEGENSSTEUER){
				var t_r=.0;
				var t_rSollWert=t_rSatzbestimmend;
				for(t_r=(t_iIndexAbzug)/100.0;t_r>1.0;t_r=t_r+-0.1){
					t_rSollWert/=1.1;
				}
				if(bb_utils_isNotZero(t_r,0)){
					t_rSollWert/=t_r;
				}
				t_rSatzbestimmend=t_rSollWert;
			}
		}
		t_rSatzbestimmend=t_cProg.p_rundePostSatz(t_rSatzbestimmend);
	}else{
		t_rSteuerwertVorAbzuege=t_cProg.p_rundePreSatz(t_rSatzbestimmend);
		t_rAbzugSteuerwert=0.0;
		t_rAbzugSatzbestimmend=0.0;
		t_bFuerSatzbest=true;
		var t_3=t_pcCollAbzuege.p_Values().p_ObjectEnumerator();
		while(t_3.p_HasNext()){
			var t_x3=t_3.p_NextObject();
			var t_a3=object_downcast((t_x3),c_StR_natPers_Abzg);
			var t_f3=[];
			t_f3=t_cAbzug.p_berechnePreAbzug(t_rSteuerwertVorAbzuege,t_a3,t_bFuerBund,t_bFuerSatzbest);
			t_rAbzugSteuerwert=t_rAbzugSteuerwert+t_f3[0];
			t_rAbzugSatzbestimmend=t_rAbzugSatzbestimmend+t_f3[1];
			t_rSteuerwertVorAbzuege=t_rSteuerwertVorAbzuege-t_f3[0];
		}
		t_rSatzbestimmend=t_rSatzbestimmend-t_rAbzugSteuerwert;
		t_rSatzbestimmend=bb_math_Max2(0.0,t_rSatzbestimmend);
		t_rSatzbestimmend=t_cProg.p_rundePreSatz(t_rSatzbestimmend);
		t_rSatzbestimmend=t_rSatzbestimmend-t_rAbzugSatzbestimmend;
		t_rSatzbestimmend=bb_math_Max2(0.0,t_rSatzbestimmend);
		if(t_iIndexAbzug>0 && bb_utils_isGZero(t_rSatzbestimmend,0)){
			if(this.m__calctyp!=c_StC_natPers.m_CalcTyp_VERMOEGENSSTEUER){
				var t_r2=.0;
				var t_rSollWert2=t_rSatzbestimmend;
				for(t_r2=(t_iIndexAbzug)/100.0;t_r2>1.0;t_r2=t_r2+-0.1){
					t_rSollWert2/=1.1;
				}
				if(bb_utils_isNotZero(t_r2,0)){
					t_rSollWert2/=t_r2;
				}
				t_rSatzbestimmend=t_rSollWert2;
			}
		}
		t_rSatzbestimmend=t_cProg.p_rundePostSatz(t_rSatzbestimmend);
	}
	t_rSteuerwert=t_cProg.p_rundePostStWert(t_rSteuerwert);
	return [t_rSteuerwert,t_rSatzbestimmend];
}
c_StCStObjekt.prototype.p_Divisor=function(t_value,t_div){
	if(bb_utils_isGZero(t_div,0)){
		return t_value/t_div;
	}
	return t_value;
}
c_StCStObjekt.prototype.p_berechneSt2=function(t_iProgID,t_rEinkommen,t_rFreiBetrag){
	var t_cProg=null;
	t_cProg=c_StCProgr.m_new2.call(new c_StCProgr,this.m__calc,t_iProgID,t_rFreiBetrag);
	if(t_cProg.p_isValid()){
		return t_cProg.p_berechneSt(t_rEinkommen);
	}
	return 0.0;
}
c_StCStObjekt.prototype.p_setMinMax=function(t_rSteuerwert,t_rSteuerfuss,t_iProgID,t_rFreiBetrag,t_iMinStTyp,t_rMinStWert,t_iMaxStTyp,t_rMaxStWert,t_cRes){
	var t_r=.0;
	var t_1=t_iMinStTyp;
	if(t_1==c_StR_natPers.m_MinMax_EINFACHE_MINIMALSTEUER_IN_FR){
		if(t_cRes.m__einfsteuer<t_rMinStWert){
			t_cRes.m__einfsteuer=t_rMinStWert;
			t_cRes.m__steuer=t_cRes.m__einfsteuer*t_rSteuerfuss/100.0;
			t_cRes.m__steuersatz=0.0;
		}
	}else{
		if(t_1==c_StR_natPers.m_MinMax_EINFACHE_MININALSTEUER_IN_PROZ){
			t_r=t_rSteuerwert*t_rMinStWert/100.0;
			if(t_cRes.m__einfsteuer<t_r){
				t_cRes.m__einfsteuer=t_r;
				t_cRes.m__steuer=t_cRes.m__einfsteuer*t_rSteuerfuss/100.0;
				t_cRes.m__steuersatz=t_rMinStWert;
			}
		}else{
			if(t_1==c_StR_natPers.m_MinMax_MINIMALANSATZ_WIE_FUER_BETRAG_VON_FR){
				if(bb_utils_isNotZero(t_rMinStWert,0)){
					t_r=this.p_berechneSt2(t_iProgID,t_rMinStWert,0.0);
					if(this.m__calctyp==c_StC_natPers.m_CalcTyp_VERMOEGENSSTEUER){
						t_r=t_r/t_rMinStWert*1000.0;
					}else{
						t_r=t_r/t_rMinStWert*100.0;
					}
					if(t_cRes.m__steuersatz<t_r){
						t_cRes.m__steuersatz=t_r;
						t_cRes.m__einfsteuer=t_r*t_rSteuerwert/100.0;
						t_cRes.m__steuer=t_cRes.m__einfsteuer*t_rSteuerfuss/100.0;
					}
				}
			}else{
				if(t_1==c_StR_natPers.m_MinMax_EFFEKTIVE_MINIMALSTEUER_IN_FR){
					if(t_cRes.m__steuer<t_rMinStWert){
						t_cRes.m__steuer=t_rMinStWert;
					}
				}else{
					if(t_1==c_StR_natPers.m_MinMax_EFFEKTIVE_MINIMALSTEUER_IN_PROZ){
						t_r=t_rSteuerwert*t_rMinStWert/100.0;
						if(t_cRes.m__steuer<t_r){
							t_cRes.m__steuer=t_r;
						}
					}
				}
			}
		}
	}
	var t_2=t_iMaxStTyp;
	if(t_2==c_StR_natPers.m_MinMax_EINFACHE_MAXIMALSTEUER_IN_FR){
		if(t_cRes.m__einfsteuer>t_rMaxStWert){
			t_cRes.m__einfsteuer=t_rMaxStWert;
			t_cRes.m__steuer=t_cRes.m__einfsteuer*t_rSteuerfuss/100.0;
			t_cRes.m__steuersatz=0.0;
		}
	}else{
		if(t_2==c_StR_natPers.m_MinMax_EINFACHE_MAXINALSTEUER_IN_PROZ){
			t_r=t_rSteuerwert*t_rMaxStWert/100.0;
			if(t_cRes.m__einfsteuer>t_r){
				t_cRes.m__einfsteuer=t_r;
				t_cRes.m__steuer=t_cRes.m__einfsteuer*t_rSteuerfuss/100.0;
				t_cRes.m__steuersatz=t_rMaxStWert;
			}
		}else{
			if(t_2==c_StR_natPers.m_MinMax_MAXIMALANSATZ_WIE_FUER_BETRAG_VON_FR){
				if(bb_utils_isNotZero(t_rMaxStWert,0)){
					t_r=this.p_berechneSt2(t_iProgID,t_rMaxStWert,0.0);
					if(this.m__calctyp==c_StC_natPers.m_CalcTyp_VERMOEGENSSTEUER){
						t_r=t_r/t_rMinStWert*1000.0;
					}else{
						t_r=t_r/t_rMinStWert*100.0;
					}
					if(t_cRes.m__steuersatz>t_r){
						t_cRes.m__steuersatz=t_r;
						t_cRes.m__einfsteuer=t_r*t_rSteuerwert/100.0;
						t_cRes.m__steuer=t_cRes.m__einfsteuer*t_rSteuerfuss/100.0;
					}
				}
			}else{
				if(t_2==c_StR_natPers.m_MinMax_EFFEKTIVE_MAXIMALSTEUER_IN_FR){
					if(t_cRes.m__steuer>t_rMaxStWert){
						t_cRes.m__steuer=t_rMaxStWert;
					}
				}else{
					if(t_2==c_StR_natPers.m_MinMax_EFFEKTIVE_MAXIMALSTEUER_IN_PROZ){
						t_r=t_rSteuerwert*t_rMaxStWert/100.0;
						if(t_cRes.m__steuer>t_r){
							t_cRes.m__steuer=t_r;
						}
					}
				}
			}
		}
	}
}
c_StCStObjekt.prototype.p_setMinMax2=function(t_rSteuerwert,t_rSteuerfuss,t_pcBerech,t_cRes){
	if(t_pcBerech!=null){
		this.p_setMinMax(t_rSteuerwert,t_rSteuerfuss,t_pcBerech.m__progid,0.0,t_pcBerech.m__minsttyp,t_pcBerech.m__minst,t_pcBerech.m__maxsttyp,t_pcBerech.m__maxst,t_cRes);
	}
}
c_StCStObjekt.prototype.p_setMinMax3=function(t_rSteuerwert,t_rSteuerfuss,t_pcBerech,t_cRes){
	if(t_pcBerech!=null){
		this.p_setMinMax(t_rSteuerwert,t_rSteuerfuss,t_pcBerech.m__progid,t_pcBerech.m__freibetr,t_pcBerech.m__minsttyp,t_pcBerech.m__minst,t_pcBerech.m__maxsttyp,t_pcBerech.m__maxst,t_cRes);
	}
}
c_StCStObjekt.prototype.p_setMinMax4=function(t_rSteuerwert,t_rSteuerfuss,t_pcBerech,t_cRes){
	if(t_pcBerech!=null){
		this.p_setMinMax(t_rSteuerwert,t_rSteuerfuss,t_pcBerech.m__progid,t_pcBerech.m__freibetr,t_pcBerech.m__minsttyp,t_pcBerech.m__minst,t_pcBerech.m__maxsttyp,t_pcBerech.m__maxst,t_cRes);
	}
}
c_StCStObjekt.prototype.p_berechneSoBerBund=function(t_pcKtBerech,t_iEndAlter,t_rSteuerwert,t_rSatzbestimmend,t_rSteuerfuss,t_bEndsteuerRunden,t_cStResultat){
	var t_cProg=null;
	var t_rSteuerwertVorAbzuege=t_rSteuerwert;
	var t_pcCollAbzuege=null;
	var t_cAbzug=c_StC_natPers_Abzug.m_new.call(new c_StC_natPers_Abzug,this.m__calctyp,this.m__calc);
	if((t_pcKtBerech.m__spez&c_StR_natPers.m_Spez_ES_WIRD_KEINE_STEUER_ERHOBEN)!=0){
		return true;
	}
	t_cProg=c_StCProgr.m_new2.call(new c_StCProgr,this.m__calc,t_pcKtBerech.m__progid,t_pcKtBerech.m__freibetr);
	if(t_cProg.p_isValid()==false){
		return false;
	}
	t_pcCollAbzuege=this.m__calc.m__stbund.m__strkt.p_getNatPersAbzgMap(this.m__calc.m__strw,this.m__calc.m__stbund.p__gesetzjahr(),t_pcKtBerech.m__id,this.m__calc.m__grundlage.p__id_grp());
	var t_f=[];
	t_f=this.p_getStBasis(true,t_cProg,t_pcCollAbzuege,this.m__calc.m__stbund.p__idxabzug(),t_pcKtBerech.m__spez,t_iEndAlter,this.m__calc.m__stbund.p__rtabjahr(),t_rSteuerwert,t_rSatzbestimmend);
	t_rSteuerwert=t_f[0];
	t_rSatzbestimmend=t_f[1];
	t_cStResultat.m__satzbestimmend=t_rSatzbestimmend;
	t_cStResultat.m__steuerbar=t_rSteuerwert;
	t_cStResultat.m__einfsteuer=t_cProg.p_berechneSt(t_rSatzbestimmend);
	t_cStResultat.m__einfsteuer=bb_math_Max2(0.0,t_cStResultat.m__einfsteuer);
	t_cStResultat.m__einfsteuer=this.p_Divisor(t_cStResultat.m__einfsteuer,t_pcKtBerech.m__divisor);
	if(bb_utils_isNotZero(t_cStResultat.m__satzbestimmend,0)){
		t_cStResultat.m__steuersatz=100.0*t_cStResultat.m__einfsteuer/t_cStResultat.m__satzbestimmend;
	}
	if(t_rSatzbestimmend!=t_rSteuerwert && bb_utils_isNotZero(t_rSatzbestimmend,0)){
		t_cStResultat.m__einfsteuer=t_cStResultat.m__einfsteuer/t_rSatzbestimmend*t_rSteuerwert;
	}
	t_cStResultat.m__steuer=t_cStResultat.m__einfsteuer*t_rSteuerfuss/100.0;
	t_cAbzug.p_berechnePostAbzug(t_pcCollAbzuege,true,t_rSteuerfuss,t_cStResultat,t_rSteuerwert,t_rSteuerwertVorAbzuege,t_cStResultat.m__satzbestimmend,t_cStResultat.m__steuersatz,t_cStResultat.m__einfsteuer,t_cStResultat.m__steuer);
	if(t_bEndsteuerRunden){
		this.p_setMinMax4(t_rSteuerwert,t_rSteuerfuss,t_pcKtBerech,t_cStResultat);
	}
	return true;
}
c_StCStObjekt.prototype.p_berechneBund=function(t_cSt,t_rSteuerwert,t_rSatzbestimmend,t_rSteuerfuss){
	var t_m=null;
	var t_b=null;
	var t_ok=false;
	t_m=this.m__calc.m__stbund.m__strkt.p_getNatPersSoBerKtMap(this.m__calc.m__strw,this.m__calctyp,this.m__calc.m__stbund.p__gesetzjahr(),this.m__calc.m__grundlage.p__id_grp());
	if(t_m.p_Count()==0){
		return false;
	}
	var t_=t_m.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		t_b=object_downcast((t_o),c_StR_natPers_SoBerKt);
		if(this.p_berechneSoBerBund(t_b,0,t_rSteuerwert,t_rSatzbestimmend,t_rSteuerfuss,true,t_cSt)){
			t_ok=true;
			break;
		}
	}
	return t_ok;
}
c_StCStObjekt.prototype.p_berechneSoBerKt=function(t_pcKtBerech,t_iEndAlter,t_rSteuerwert,t_rSatzbestimmend,t_rSteuerfuss,t_bEndsteuerRunden,t_cStResultat){
	var t_cProg=null;
	var t_rSteuerwertVorAbzuege=t_rSteuerwert;
	var t_pcCollAbzuege=null;
	var t_cAbzug=c_StC_natPers_Abzug.m_new.call(new c_StC_natPers_Abzug,this.m__calctyp,this.m__calc);
	if((t_pcKtBerech.m__spez&c_StR_natPers.m_Spez_ES_WIRD_KEINE_STEUER_ERHOBEN)!=0){
		return true;
	}
	t_cProg=c_StCProgr.m_new2.call(new c_StCProgr,this.m__calc,t_pcKtBerech.m__progid,t_pcKtBerech.m__freibetr);
	if(t_cProg.p_isValid()==false){
		return false;
	}
	t_pcCollAbzuege=this.m__calc.m__stkt.m__strkt.p_getNatPersAbzgMap(this.m__calc.m__strw,this.m__calc.m__stkt.p__gesetzjahr(),t_pcKtBerech.m__id,this.m__calc.m__grundlage.p__id_grp());
	var t_f=[];
	t_f=this.p_getStBasis(false,t_cProg,t_pcCollAbzuege,this.m__calc.m__stkt.p__idxabzug(),t_pcKtBerech.m__spez,t_iEndAlter,this.m__calc.m__stkt.p__rtabjahr(),t_rSteuerwert,t_rSatzbestimmend);
	t_rSteuerwert=t_f[0];
	t_rSatzbestimmend=t_f[1];
	t_cStResultat.m__satzbestimmend=t_rSatzbestimmend;
	t_cStResultat.m__steuerbar=t_rSteuerwert;
	t_cStResultat.m__einfsteuer=t_cProg.p_berechneSt(t_rSatzbestimmend);
	t_cStResultat.m__einfsteuer=bb_math_Max2(0.0,t_cStResultat.m__einfsteuer);
	t_cStResultat.m__einfsteuer=this.p_Divisor(t_cStResultat.m__einfsteuer,t_pcKtBerech.m__divisor);
	if(bb_utils_isNotZero(t_cStResultat.m__satzbestimmend,0)){
		t_cStResultat.m__steuersatz=100.0*t_cStResultat.m__einfsteuer/t_cStResultat.m__satzbestimmend;
	}
	if(t_rSatzbestimmend!=t_rSteuerwert && bb_utils_isNotZero(t_rSatzbestimmend,0)){
		t_cStResultat.m__einfsteuer=t_cStResultat.m__einfsteuer/t_rSatzbestimmend*t_rSteuerwert;
	}
	t_cStResultat.m__steuer=t_cStResultat.m__einfsteuer*t_rSteuerfuss/100.0;
	t_cAbzug.p_berechnePostAbzug(t_pcCollAbzuege,false,t_rSteuerfuss,t_cStResultat,t_rSteuerwert,t_rSteuerwertVorAbzuege,t_cStResultat.m__satzbestimmend,t_cStResultat.m__steuersatz,t_cStResultat.m__einfsteuer,t_cStResultat.m__steuer);
	if(t_bEndsteuerRunden){
		this.p_setMinMax4(t_rSteuerwert,t_rSteuerfuss,t_pcKtBerech,t_cStResultat);
	}
	return true;
}
c_StCStObjekt.prototype.p_berechneKt=function(t_cSt,t_rSteuerwert,t_rSatzbestimmend,t_rSteuerfuss){
	var t_m=null;
	var t_b=null;
	var t_ok=false;
	t_m=this.m__calc.m__stkt.m__strkt.p_getNatPersSoBerKtMap(this.m__calc.m__strw,this.m__calctyp,this.m__calc.m__stkt.p__gesetzjahr(),this.m__calc.m__grundlage.p__id_grp());
	if(t_m.p_Count()==0){
		return false;
	}
	var t_=t_m.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		t_b=object_downcast((t_o),c_StR_natPers_SoBerKt);
		if(this.p_berechneSoBerKt(t_b,0,t_rSteuerwert,t_rSatzbestimmend,t_rSteuerfuss,true,t_cSt)){
			t_ok=true;
			break;
		}
	}
	return t_ok;
}
c_StCStObjekt.prototype.p_takeStFussEK=function(){
	return false;
}
c_StCStObjekt.prototype.p_berechneSoBerGmd=function(t_pcGmdBerech,t_iEndAlter,t_rSteuerwert,t_rSatzbestimmend,t_rSteuerfuss,t_bEndsteuerRunden,t_cStResultat){
	var t_cProg=null;
	var t_rSteuerwertVorAbzuege=t_rSteuerwert;
	var t_pcCollAbzuege=null;
	var t_cAbzug=c_StC_natPers_Abzug.m_new.call(new c_StC_natPers_Abzug,this.m__calctyp,this.m__calc);
	if((t_pcGmdBerech.m__spez&c_StR_natPers.m_Spez_ES_WIRD_KEINE_STEUER_ERHOBEN)!=0){
		return true;
	}
	t_cProg=c_StCProgr.m_new2.call(new c_StCProgr,this.m__calc,t_pcGmdBerech.m__progid,t_pcGmdBerech.m__freibetr);
	if(t_cProg.p_isValid()==false){
		return false;
	}
	t_pcCollAbzuege=this.m__calc.m__stgmd.m__strgmd.p_getNatPersAbzgGmdMap(this.m__calc.m__strw,this.m__calc.m__stkt.p__gesetzjahr(),t_pcGmdBerech.m__id,this.m__calc.m__grundlage.p__id_grp());
	var t_f=[];
	t_f=this.p_getStBasis(false,t_cProg,t_pcCollAbzuege,this.m__calc.m__stgmd.p__idxabzug(),t_pcGmdBerech.m__spez,t_iEndAlter,this.m__calc.m__stkt.p__rtabjahr(),t_rSteuerwert,t_rSatzbestimmend);
	t_rSteuerwert=t_f[0];
	t_rSatzbestimmend=t_f[1];
	t_cStResultat.m__satzbestimmend=t_rSatzbestimmend;
	t_cStResultat.m__steuerbar=t_rSteuerwert;
	t_cStResultat.m__einfsteuer=t_cProg.p_berechneSt(t_rSatzbestimmend);
	t_cStResultat.m__einfsteuer=bb_math_Max2(0.0,t_cStResultat.m__einfsteuer);
	t_cStResultat.m__einfsteuer=this.p_Divisor(t_cStResultat.m__einfsteuer,t_pcGmdBerech.m__divisor);
	if(bb_utils_isNotZero(t_cStResultat.m__satzbestimmend,0)){
		t_cStResultat.m__steuersatz=100.0*t_cStResultat.m__einfsteuer/t_cStResultat.m__satzbestimmend;
	}
	if(t_rSatzbestimmend!=t_rSteuerwert && bb_utils_isNotZero(t_rSatzbestimmend,0)){
		t_cStResultat.m__einfsteuer=t_cStResultat.m__einfsteuer/t_rSatzbestimmend*t_rSteuerwert;
	}
	t_cStResultat.m__steuer=t_cStResultat.m__einfsteuer*t_rSteuerfuss/100.0;
	t_cAbzug.p_berechnePostAbzug(t_pcCollAbzuege,false,t_rSteuerfuss,t_cStResultat,t_rSteuerwert,t_rSteuerwertVorAbzuege,t_cStResultat.m__satzbestimmend,t_cStResultat.m__steuersatz,t_cStResultat.m__einfsteuer,t_cStResultat.m__steuer);
	if(t_bEndsteuerRunden){
		this.p_setMinMax3(t_rSteuerwert,t_rSteuerfuss,t_pcGmdBerech,t_cStResultat);
	}
	return true;
}
c_StCStObjekt.prototype.p_berechneGmd=function(t_cSt){
	var t_m=null;
	var t_b=null;
	var t_rSteuerfuss=.0;
	var t_rSteuerwertKt=.0;
	var t_rSatzbestimmendKt=.0;
	var t_rSteuerwertGmd=.0;
	var t_rSatzbestimmendGmd=.0;
	var t_ok=false;
	t_m=this.m__calc.m__stgmd.m__strgmd.p_getNatPersSoBerGmdMap(this.m__calc.m__strw,this.m__calctyp,this.m__calc.m__stkt.p__gesetzjahr(),this.m__calc.m__grundlage.p__id_grp());
	if(t_m.p_Count()==0){
		return false;
	}
	if(this.p_takeStFussEK()){
		t_rSteuerfuss=this.m__calc.m__stgmd.m__gmd_stfuss_ek;
		t_rSteuerwertKt=this.m__calc.m__grundlage.m__stbEkKt;
		t_rSteuerwertGmd=this.m__calc.m__grundlage.m__stbEkGmd;
		t_rSatzbestimmendKt=this.m__calc.m__grundlage.m__satzbEkKt;
		t_rSatzbestimmendGmd=this.m__calc.m__grundlage.m__satzbEkGmd;
	}else{
		t_rSteuerfuss=this.m__calc.m__stgmd.m__gmd_stfuss_vm;
		t_rSteuerwertKt=this.m__calc.m__grundlage.m__stbVmKt;
		t_rSteuerwertGmd=this.m__calc.m__grundlage.m__stbVmKt;
		t_rSatzbestimmendKt=this.m__calc.m__grundlage.m__satzbVmKt;
		t_rSatzbestimmendGmd=this.m__calc.m__grundlage.m__satzbVmKt;
	}
	var t_=t_m.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		t_b=object_downcast((t_o),c_StR_natPers_SoBerGmd);
		if(t_b.m__basis==c_StR_natPers.m_SoBerBasis_AUF_STEUERB_EKVM_GMD){
			if(this.p_berechneSoBerGmd(t_b,0,t_rSteuerwertGmd,t_rSatzbestimmendGmd,t_rSteuerfuss,true,t_cSt)){
				t_ok=true;
				break;
			}
		}else{
			if(t_b.m__basis==c_StR_natPers.m_SoBerBasis_AUF_STEUERB_EKVM_KT){
				if(this.p_berechneSoBerGmd(t_b,0,t_rSteuerwertKt,t_rSatzbestimmendKt,t_rSteuerfuss,true,t_cSt)){
					t_ok=true;
					break;
				}
			}
		}
	}
	return t_ok;
}
c_StCStObjekt.prototype.p_berechneGmd2=function(t_cStKtResult,t_cSt){
	var t_iTyp=0;
	var t_rSteuerfuss=.0;
	var t_rSteuerwertKt=.0;
	var t_rSatzbestimmendKt=.0;
	var t_rSteuerwertGmd=.0;
	var t_rSatzbestimmendGmd=.0;
	t_iTyp=this.m__calc.m__stgmd.p__gmd_basis();
	if((t_iTyp&c_StR_natPers.m_SoBerBasis_SONDERBERECHNUNG)!=0){
		if(this.p_berechneGmd(t_cSt)){
			return true;
		}
		t_iTyp=t_iTyp-c_StR_natPers.m_SoBerBasis_SONDERBERECHNUNG;
	}
	if(this.p_takeStFussEK()){
		t_rSteuerfuss=this.m__calc.m__stgmd.m__gmd_stfuss_ek;
		t_rSteuerwertKt=this.m__calc.m__grundlage.m__stbEkKt;
		t_rSteuerwertGmd=this.m__calc.m__grundlage.m__stbEkGmd;
		t_rSatzbestimmendKt=this.m__calc.m__grundlage.m__satzbEkKt;
		t_rSatzbestimmendGmd=this.m__calc.m__grundlage.m__satzbEkGmd;
	}else{
		t_rSteuerfuss=this.m__calc.m__stgmd.m__gmd_stfuss_vm;
		t_rSteuerwertKt=this.m__calc.m__grundlage.m__stbVmKt;
		t_rSteuerwertGmd=this.m__calc.m__grundlage.m__stbVmKt;
		t_rSatzbestimmendKt=this.m__calc.m__grundlage.m__satzbVmKt;
		t_rSatzbestimmendGmd=this.m__calc.m__grundlage.m__satzbVmKt;
	}
	if(t_iTyp==c_StR_natPers.m_SoBerBasis_AUF_EINF_STAATSSTEUER){
		t_cSt.p_set(t_cStKtResult);
		t_cSt.m__steuer=t_cStKtResult.m__einfsteuer*t_rSteuerfuss/100.0;
	}else{
		if(t_iTyp==c_StR_natPers.m_SoBerBasis_AUF_EFF_STAATSSTEUER){
			t_cSt.p_set(t_cStKtResult);
			var t_fBetrag=this.m__calcbasis.p_rundeWert(t_cStKtResult.m__steuer);
			t_cSt.m__steuer=t_fBetrag*t_rSteuerfuss/100.0;
		}
	}
	var t_pcKtBerech=this.m__calc.m__stkt.m__strkt.p_getNatPersSoBerKt(this.m__calc.m__strw,this.m__calctyp,this.m__calc.m__stkt.p__gesetzjahr(),this.m__calc.m__grundlage.p__id_grp(),0);
	this.p_setMinMax4(t_rSteuerwertKt,t_rSteuerfuss,t_pcKtBerech,t_cSt);
	return true;
}
c_StCStObjekt.prototype.p_berechneSoBerChr=function(t_pcChrBerech,t_iEndAlter,t_rSteuerwert,t_rSatzbestimmend,t_rSteuerfuss,t_bEndsteuerRunden,t_cStResultat){
	var t_cProg=null;
	var t_rSteuerwertVorAbzuege=t_rSteuerwert;
	var t_pcCollAbzuege=null;
	var t_cAbzug=c_StC_natPers_Abzug.m_new.call(new c_StC_natPers_Abzug,this.m__calctyp,this.m__calc);
	if((t_pcChrBerech.m__spez&c_StR_natPers.m_Spez_ES_WIRD_KEINE_STEUER_ERHOBEN)!=0){
		return true;
	}
	t_cProg=c_StCProgr.m_new2.call(new c_StCProgr,this.m__calc,t_pcChrBerech.m__progid,0.0);
	if(t_cProg.p_isValid()==false){
		return false;
	}
	t_pcCollAbzuege=this.m__calc.m__stgmd.m__strgmd.p_getNatPersAbzgChrMap(this.m__calc.m__strw,this.m__calc.m__stkt.p__gesetzjahr(),t_pcChrBerech.m__id,this.m__calc.m__grundlage.p__id_grp());
	var t_f=[];
	t_f=this.p_getStBasis(false,t_cProg,t_pcCollAbzuege,this.m__calc.m__stgmd.p__idxabzug(),t_pcChrBerech.m__spez,t_iEndAlter,this.m__calc.m__stkt.p__rtabjahr(),t_rSteuerwert,t_rSatzbestimmend);
	t_rSteuerwert=t_f[0];
	t_rSatzbestimmend=t_f[1];
	t_cStResultat.m__satzbestimmend=t_rSatzbestimmend;
	t_cStResultat.m__steuerbar=t_rSteuerwert;
	t_cStResultat.m__einfsteuer=t_cProg.p_berechneSt(t_rSatzbestimmend);
	t_cStResultat.m__einfsteuer=bb_math_Max2(0.0,t_cStResultat.m__einfsteuer);
	t_cStResultat.m__einfsteuer=this.p_Divisor(t_cStResultat.m__einfsteuer,t_pcChrBerech.m__divisor);
	if(bb_utils_isNotZero(t_cStResultat.m__satzbestimmend,0)){
		t_cStResultat.m__steuersatz=100.0*t_cStResultat.m__einfsteuer/t_cStResultat.m__satzbestimmend;
	}
	if(t_rSatzbestimmend!=t_rSteuerwert && bb_utils_isNotZero(t_rSatzbestimmend,0)){
		t_cStResultat.m__einfsteuer=t_cStResultat.m__einfsteuer/t_rSatzbestimmend*t_rSteuerwert;
	}
	t_cStResultat.m__steuer=t_cStResultat.m__einfsteuer*t_rSteuerfuss/100.0;
	t_cAbzug.p_berechnePostAbzug(t_pcCollAbzuege,false,t_rSteuerfuss,t_cStResultat,t_rSteuerwert,t_rSteuerwertVorAbzuege,t_cStResultat.m__satzbestimmend,t_cStResultat.m__steuersatz,t_cStResultat.m__einfsteuer,t_cStResultat.m__steuer);
	if(t_bEndsteuerRunden){
		this.p_setMinMax2(t_rSteuerwert,t_rSteuerfuss,t_pcChrBerech,t_cStResultat);
	}
	return true;
}
c_StCStObjekt.prototype.p_berechneChr=function(t_person,t_cSt){
	var t_m=null;
	var t_b=null;
	var t_rSteuerfuss=.0;
	var t_rSteuerwertKt=.0;
	var t_rSatzbestimmendKt=.0;
	var t_rSteuerwertGmd=.0;
	var t_rSatzbestimmendGmd=.0;
	var t_iKonf=0;
	var t_ok=false;
	t_iKonf=this.m__calc.m__grundlage.p_getKonfessionOf(t_person);
	t_m=this.m__calc.m__stgmd.m__strgmd.p_getNatPersSoBerChrMap(this.m__calc.m__strw,this.m__calctyp,this.m__calc.m__stkt.p__gesetzjahr(),this.m__calc.m__grundlage.p__id_grp(),t_iKonf);
	if(t_m.p_Count()==0){
		return false;
	}
	if(this.p_takeStFussEK()){
		t_rSteuerfuss=this.m__calc.m__stgmd.p_getKirchenStFussEK(t_iKonf);
		t_rSteuerwertKt=this.m__calc.m__grundlage.m__stbEkKt;
		t_rSteuerwertGmd=this.m__calc.m__grundlage.m__stbEkGmd;
		t_rSatzbestimmendKt=this.m__calc.m__grundlage.m__satzbEkKt;
		t_rSatzbestimmendGmd=this.m__calc.m__grundlage.m__satzbEkGmd;
	}else{
		t_rSteuerfuss=this.m__calc.m__stgmd.p_getKirchenStFussVM(t_iKonf);
		t_rSteuerwertKt=this.m__calc.m__grundlage.m__stbVmKt;
		t_rSteuerwertGmd=this.m__calc.m__grundlage.m__stbVmKt;
		t_rSatzbestimmendKt=this.m__calc.m__grundlage.m__satzbVmKt;
		t_rSatzbestimmendGmd=this.m__calc.m__grundlage.m__satzbVmKt;
	}
	var t_=t_m.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		t_b=object_downcast((t_o),c_StR_natPers_SoBerChr);
		if(t_b.m__basis==c_StR_natPers.m_SoBerBasis_AUF_GEMEINDESTEUER){
			if(this.p_berechneSoBerChr(t_b,0,t_rSteuerwertGmd,t_rSatzbestimmendGmd,t_rSteuerfuss,true,t_cSt)){
				t_ok=true;
				break;
			}
		}else{
			if(t_b.m__basis==c_StR_natPers.m_SoBerBasis_AUF_STEUERB_EKVM_KT){
				if(this.p_berechneSoBerChr(t_b,0,t_rSteuerwertKt,t_rSatzbestimmendKt,t_rSteuerfuss,true,t_cSt)){
					t_ok=true;
					break;
				}
			}
		}
	}
	return t_ok;
}
c_StCStObjekt.prototype.p_berechneChr2=function(t_person,t_cStKtSteuer,t_cStGmdSteuer){
	var t_iTyp=0;
	var t_iKonf=0;
	var t_rSteuerfuss=.0;
	var t_rSteuerwertKt=.0;
	var t_rSteuerwertGmd=.0;
	var t_rSatzbestimmendKt=.0;
	var t_rSatzbestimmendGmd=.0;
	var t_rAnteil=.0;
	var t_rStResultat=0.0;
	t_iKonf=this.m__calc.m__grundlage.p_getKonfessionOf(t_person);
	t_rAnteil=(this.m__calc.m__grundlage.p_getKonfessionsAnteilOf(t_person));
	if(t_rAnteil==0.0){
		return t_rStResultat;
	}
	t_iTyp=this.m__calc.m__stgmd.p__chr_basis();
	if((t_iTyp&c_StR_natPers.m_SoBerBasis_SONDERBERECHNUNG)!=0){
		var t_cStChrSteuer=c_StC_natPers_StLevel.m_new.call(new c_StC_natPers_StLevel);
		if(this.p_berechneChr(t_person,t_cStChrSteuer)){
			t_rStResultat=t_cStChrSteuer.m__steuer*t_rAnteil/100.0;
			return t_rStResultat;
		}
		t_iTyp=t_iTyp-c_StR_natPers.m_SoBerBasis_SONDERBERECHNUNG;
	}
	if(this.p_takeStFussEK()){
		t_rSteuerfuss=this.m__calc.m__stgmd.p_getKirchenStFussEK(t_iKonf);
		t_rSteuerwertKt=this.m__calc.m__grundlage.m__stbEkKt;
		t_rSteuerwertGmd=this.m__calc.m__grundlage.m__stbEkGmd;
		t_rSatzbestimmendKt=this.m__calc.m__grundlage.m__satzbEkKt;
		t_rSatzbestimmendGmd=this.m__calc.m__grundlage.m__satzbEkGmd;
	}else{
		t_rSteuerfuss=this.m__calc.m__stgmd.p_getKirchenStFussVM(t_iKonf);
		t_rSteuerwertKt=this.m__calc.m__grundlage.m__stbVmKt;
		t_rSteuerwertGmd=this.m__calc.m__grundlage.m__stbVmKt;
		t_rSatzbestimmendKt=this.m__calc.m__grundlage.m__satzbVmKt;
		t_rSatzbestimmendGmd=this.m__calc.m__grundlage.m__satzbVmKt;
	}
	if(t_iTyp==c_StR_natPers.m_SoBerBasis_AUF_EINF_STAATSSTEUER){
		t_rStResultat=t_cStKtSteuer.m__einfsteuer*t_rSteuerfuss/100.0;
	}else{
		if(t_iTyp==c_StR_natPers.m_SoBerBasis_AUF_EFF_STAATSSTEUER){
			var t_fBetrag=this.m__calcbasis.p_rundeWert(t_cStKtSteuer.m__steuer);
			t_rStResultat=t_fBetrag*t_rSteuerfuss/100.0;
		}else{
			if(t_iTyp==c_StR_natPers.m_SoBerBasis_AUF_GEMEINDESTEUER){
				var t_fBetrag2=this.m__calcbasis.p_rundeWert(t_cStGmdSteuer.m__steuer);
				t_rStResultat=t_fBetrag2*t_rSteuerfuss/100.0;
			}else{
				if(t_iTyp==c_StR_natPers.m_SoBerBasis_AUF_EINF_GEMEINDESTEUER){
					t_rStResultat=t_cStGmdSteuer.m__einfsteuer*t_rSteuerfuss/100.0;
				}
			}
		}
	}
	t_rStResultat=t_rStResultat*t_rAnteil/100.0;
	return t_rStResultat;
}
c_StCStObjekt.prototype.p_berechneChr3=function(t_cStKtSteuer,t_cStGmdSteuer,t_cSt){
	var t_iTyp=0;
	var t_rSteuer1=.0;
	var t_rSteuer2=.0;
	t_rSteuer1=this.p_berechneChr2(1,t_cStKtSteuer,t_cStGmdSteuer);
	t_rSteuer2=this.p_berechneChr2(2,t_cStKtSteuer,t_cStGmdSteuer);
	t_cSt.m__steuer=this.m__calcbasis.p_rundeWert(t_rSteuer1+t_rSteuer2);
	t_iTyp=this.m__calc.m__stgmd.p__chr_basis();
	if(t_iTyp==c_StR_natPers.m_SoBerBasis_AUF_EINF_STAATSSTEUER || t_iTyp==c_StR_natPers.m_SoBerBasis_AUF_EFF_STAATSSTEUER){
		t_cSt.m__steuerbar=t_cStKtSteuer.m__steuerbar;
		t_cSt.m__satzbestimmend=t_cStKtSteuer.m__satzbestimmend;
	}else{
		if(t_iTyp==c_StR_natPers.m_SoBerBasis_AUF_GEMEINDESTEUER){
			t_cSt.m__steuerbar=t_cStGmdSteuer.m__steuerbar;
			t_cSt.m__satzbestimmend=t_cStGmdSteuer.m__satzbestimmend;
		}
	}
	return true;
}
function c_StCStObjektEK(){
	c_StCStObjekt.call(this);
}
c_StCStObjektEK.prototype=extend_class(c_StCStObjekt);
c_StCStObjektEK.m_new=function(t_calc){
	c_StCStObjekt.m_new.call(this);
	this.m__calc=t_calc;
	this.m__calctyp=c_StC_natPers.m_CalcTyp_EINKOMMENSSTEUER;
	return this;
}
c_StCStObjektEK.m_new2=function(){
	c_StCStObjekt.m_new.call(this);
	return this;
}
c_StCStObjektEK.prototype.p_calcSpezifisch=function(){
	if(this.m__calc.m__stkt.p__id()!=c_StR_common.m_Kanton_LI){
		this.p_berechneBund(this.m__st.p__level(c_StC_common.m_TaxLevel_BUND),this.m__calc.m__grundlage.m__stbEkBund,this.m__calc.m__grundlage.m__satzbEkBund,this.m__calc.m__stbund.m__stfuss_ek);
	}
	this.p_berechneKt(this.m__st.p__level(c_StC_common.m_TaxLevel_KANTON),this.m__calc.m__grundlage.m__stbEkKt,this.m__calc.m__grundlage.m__satzbEkKt,this.m__calc.m__stkt.m__stfuss_ek);
	this.p_berechneGmd2(this.m__st.p__level(c_StC_common.m_TaxLevel_KANTON),this.m__st.p__level(c_StC_common.m_TaxLevel_GEMEINDE));
	this.p_berechneChr3(this.m__st.p__level(c_StC_common.m_TaxLevel_KANTON),this.m__st.p__level(c_StC_common.m_TaxLevel_GEMEINDE),this.m__st.p__level(c_StC_common.m_TaxLevel_KIRCHE));
}
c_StCStObjektEK.prototype.p_takeStFussEK=function(){
	return true;
}
function c_StCStObjektVM(){
	c_StCStObjekt.call(this);
}
c_StCStObjektVM.prototype=extend_class(c_StCStObjekt);
c_StCStObjektVM.m_new=function(t_calc){
	c_StCStObjekt.m_new.call(this);
	this.m__calc=t_calc;
	this.m__calctyp=c_StC_natPers.m_CalcTyp_VERMOEGENSSTEUER;
	return this;
}
c_StCStObjektVM.m_new2=function(){
	c_StCStObjekt.m_new.call(this);
	return this;
}
c_StCStObjektVM.prototype.p_calcSpezifisch=function(){
	this.p_berechneKt(this.m__st.p__level(c_StC_common.m_TaxLevel_KANTON),this.m__calc.m__grundlage.m__stbVmKt,this.m__calc.m__grundlage.m__satzbVmKt,this.m__calc.m__stkt.m__stfuss_vm);
	this.p_berechneGmd2(this.m__st.p__level(c_StC_common.m_TaxLevel_KANTON),this.m__st.p__level(c_StC_common.m_TaxLevel_GEMEINDE));
	this.p_berechneChr3(this.m__st.p__level(c_StC_common.m_TaxLevel_KANTON),this.m__st.p__level(c_StC_common.m_TaxLevel_GEMEINDE),this.m__st.p__level(c_StC_common.m_TaxLevel_KIRCHE));
}
function c_StCStObjektPS(){
	c_StCStObjekt.call(this);
}
c_StCStObjektPS.prototype=extend_class(c_StCStObjekt);
c_StCStObjektPS.m_new=function(t_calc){
	c_StCStObjekt.m_new.call(this);
	this.m__calc=t_calc;
	this.m__calctyp=c_StC_natPers.m_CalcTyp_PERSONALSTEUER;
	return this;
}
c_StCStObjektPS.m_new2=function(){
	c_StCStObjekt.m_new.call(this);
	return this;
}
c_StCStObjektPS.prototype.p_berechnePSBund=function(t_cSt){
	var t_m=null;
	var t_b=null;
	t_m=this.m__calc.m__stbund.m__strkt.p_getNatPersSoBerKtMap(this.m__calc.m__strw,this.m__calctyp,this.m__calc.m__stbund.p__gesetzjahr(),this.m__calc.m__grundlage.p__id_grp());
	if(t_m.p_Count()==0){
		return false;
	}
	var t_=t_m.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		t_b=object_downcast((t_o),c_StR_natPers_SoBerKt);
		if((t_b.m__spez&c_StR_natPers.m_Spez_ES_WIRD_KEINE_STEUER_ERHOBEN)!=0){
			return true;
		}
		t_cSt.m__steuer=(this.m__calc.m__stbund.p__kopfsteuer());
		if(((t_b.m__spez&c_StR_natPers.m_Spez_STEUER_PRO_KOPF)!=0) && this.m__calc.m__grundlage.p__zivilstand()==c_StC_natPers.m_Zivilstand_VERHEIRATET){
			t_cSt.m__steuer=t_cSt.m__steuer*2.0;
		}
		t_cSt.m__steuer=this.m__calcbasis.p_rundeWert(t_cSt.m__steuer);
		return true;
	}
	return false;
}
c_StCStObjektPS.prototype.p_berechnePSKt=function(t_cSt){
	var t_m=null;
	var t_b=null;
	t_m=this.m__calc.m__stkt.m__strkt.p_getNatPersSoBerKtMap(this.m__calc.m__strw,this.m__calctyp,this.m__calc.m__stkt.p__gesetzjahr(),this.m__calc.m__grundlage.p__id_grp());
	if(t_m.p_Count()==0){
		return false;
	}
	var t_=t_m.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		t_b=object_downcast((t_o),c_StR_natPers_SoBerKt);
		if((t_b.m__spez&c_StR_natPers.m_Spez_ES_WIRD_KEINE_STEUER_ERHOBEN)!=0){
			return true;
		}
		t_cSt.m__steuer=(this.m__calc.m__stkt.p__kopfsteuer());
		if(((t_b.m__spez&c_StR_natPers.m_Spez_STEUER_PRO_KOPF)!=0) && this.m__calc.m__grundlage.p__zivilstand()==c_StC_natPers.m_Zivilstand_VERHEIRATET){
			t_cSt.m__steuer=t_cSt.m__steuer*2.0;
		}
		t_cSt.m__steuer=this.m__calcbasis.p_rundeWert(t_cSt.m__steuer);
		return true;
	}
	return false;
}
c_StCStObjektPS.prototype.p_berechnePSGmd=function(t_cSt){
	var t_m=null;
	var t_b=null;
	t_m=this.m__calc.m__stgmd.m__strgmd.p_getNatPersSoBerGmdMap(this.m__calc.m__strw,this.m__calctyp,this.m__calc.m__stkt.p__gesetzjahr(),this.m__calc.m__grundlage.p__id_grp());
	if(t_m.p_Count()==0){
		return false;
	}
	var t_=t_m.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		t_b=object_downcast((t_o),c_StR_natPers_SoBerGmd);
		if((t_b.m__spez&c_StR_natPers.m_Spez_ES_WIRD_KEINE_STEUER_ERHOBEN)!=0){
			return true;
		}
		t_cSt.m__steuer=this.m__calc.m__stgmd.p__gmd_kopfsteuer();
		if(((t_b.m__spez&c_StR_natPers.m_Spez_STEUER_PRO_KOPF)!=0) && this.m__calc.m__grundlage.p__zivilstand()==c_StC_natPers.m_Zivilstand_VERHEIRATET){
			t_cSt.m__steuer=t_cSt.m__steuer*2.0;
		}
		t_cSt.m__steuer=this.m__calcbasis.p_rundeWert(t_cSt.m__steuer);
		return true;
	}
	return false;
}
c_StCStObjektPS.prototype.p_berechnePSChr=function(t_cSt){
	var t_m=null;
	var t_b=null;
	t_m=this.m__calc.m__stgmd.m__strgmd.p_getNatPersSoBerChrMap(this.m__calc.m__strw,this.m__calctyp,this.m__calc.m__stkt.p__gesetzjahr(),this.m__calc.m__grundlage.p__id_grp(),this.m__calc.m__grundlage.m__konf1);
	if(t_m.p_Count()==0){
		return false;
	}
	var t_=t_m.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		t_b=object_downcast((t_o),c_StR_natPers_SoBerChr);
		if((t_b.m__spez&c_StR_natPers.m_Spez_ES_WIRD_KEINE_STEUER_ERHOBEN)!=0){
			return true;
		}
		t_cSt.m__steuer=this.m__calc.m__stgmd.p__chr_kopfsteuer();
		if(((t_b.m__spez&c_StR_natPers.m_Spez_STEUER_PRO_KOPF)!=0) && this.m__calc.m__grundlage.p__zivilstand()==c_StC_natPers.m_Zivilstand_VERHEIRATET){
			t_cSt.m__steuer=t_cSt.m__steuer*2.0;
		}
		t_cSt.m__steuer=this.m__calcbasis.p_rundeWert(t_cSt.m__steuer);
		return true;
	}
	return false;
}
c_StCStObjektPS.prototype.p_calcSpezifisch=function(){
	this.p_berechnePSBund(this.m__st.p__level(c_StC_common.m_TaxLevel_BUND));
	this.p_berechnePSKt(this.m__st.p__level(c_StC_common.m_TaxLevel_KANTON));
	this.p_berechnePSGmd(this.m__st.p__level(c_StC_common.m_TaxLevel_GEMEINDE));
	this.p_berechnePSChr(this.m__st.p__level(c_StC_common.m_TaxLevel_KIRCHE));
}
function c_StCStObjektKapital(){
	c_StCStObjekt.call(this);
}
c_StCStObjektKapital.prototype=extend_class(c_StCStObjekt);
c_StCStObjektKapital.m_new=function(t_calc,t_gebunden){
	c_StCStObjekt.m_new.call(this);
	this.m__calc=t_calc;
	if(t_gebunden==true){
		this.m__calctyp=c_StC_natPers.m_CalcTyp_STEUER_SAUELE_2A3A;
	}else{
		this.m__calctyp=c_StC_natPers.m_CalcTyp_STEUER_SAUELE_3B;
	}
	return this;
}
c_StCStObjektKapital.m_new2=function(){
	c_StCStObjekt.m_new.call(this);
	return this;
}
c_StCStObjektKapital.prototype.p_getKapitalien=function(){
	var t_m=c_IntMap3.m_new.call(new c_IntMap3);
	var t_=this.m__calc.m__grundlage.m__kap.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		var t_k=object_downcast((t_o),c_StC_natPers_Kapital);
		if(t_k.p_matchCalcTyp(this.m__calctyp)){
			t_m.p_Add2(t_k.m__uid,(t_k));
		}
	}
	return t_m;
}
c_StCStObjektKapital.prototype.p_checkVorsorge=function(t_m,t_k){
	var t_bVorsorgeErfuellt=false;
	if(t_m.p_Count()==0){
		return true;
	}
	t_bVorsorgeErfuellt=true;
	if(t_k.p__auszgrund2()==c_StR_natPers.m_AuszhlgGrund_INFOLGE_TOD_ODER_INVALIDITAET){
		t_bVorsorgeErfuellt=false;
	}
	var t_=t_m.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_x=t_.p_NextObject();
		var t_s=object_downcast((t_x),c_StR_natPers_S3bEE);
		if(t_s.m__abjahr>0 && t_k.m__beginn.p_getYear()<t_s.m__abjahr){
			continue;
		}
		if(t_s.m__bisjahr>0 && t_k.m__beginn.p_getYear()>t_s.m__bisjahr){
			continue;
		}
		if(t_k.m__endalter-t_k.m__laufzeit>=t_s.m__abalter){
			t_bVorsorgeErfuellt=false;
		}else{
			var t_bKrit1=false;
			var t_bKrit2=false;
			if(t_k.m__laufzeit>=t_s.m__dauer){
				t_bKrit1=true;
			}
			if(t_k.m__endalter>=t_s.m__endalter){
				t_bKrit2=true;
			}
			t_bVorsorgeErfuellt=false;
			if((t_s.m__spez&c_StR_natPers.m_Spez_NUR_EINE_BED_F_STEURFREIH_MUSS_ERFULLT_S)!=0){
				if(t_bKrit1 || t_bKrit2){
					t_bVorsorgeErfuellt=true;
				}
			}else{
				if((t_s.m__spez&c_StR_natPers.m_Spez_BEIDE_BED_MUSSEN_ERFULLT_S)!=0){
					if(t_bKrit1 && t_bKrit2){
						t_bVorsorgeErfuellt=true;
					}
				}
			}
		}
		break;
	}
	return t_bVorsorgeErfuellt;
}
c_StCStObjektKapital.prototype.p_berechneKapSoBerBund=function(t_pcKtBerech,t_iEndAlter,t_rKapBestimmend,t_rKapSatzBestimmend,t_rSteuerwert,t_rSatzbestimmend,t_rSteuerfuss,t_cStResult){
	if((t_pcKtBerech.m__spez&c_StR_natPers.m_Spez_FUER_STEURSATZ_NOCH_EK_ADDIEREN)!=0){
		var t_cStEK=c_StC_natPers_StLevel.m_new.call(new c_StC_natPers_StLevel);
		var t_cStKapMitEK=c_StC_natPers_StLevel.m_new.call(new c_StC_natPers_StLevel);
		this.p_berechneSoBerBund(t_pcKtBerech,t_iEndAlter,t_rSteuerwert,t_rSatzbestimmend,t_rSteuerfuss,false,t_cStEK);
		t_rSteuerwert=t_rSteuerwert+t_pcKtBerech.m__bteil*t_rKapBestimmend;
		if(bb_utils_isGZero(t_rSatzbestimmend,0)){
			t_rSatzbestimmend=t_rSatzbestimmend+t_pcKtBerech.m__bteil*t_rKapBestimmend;
		}
		this.p_berechneSoBerBund(t_pcKtBerech,t_iEndAlter,t_rSteuerwert,t_rSatzbestimmend,t_rSteuerfuss,false,t_cStKapMitEK);
		t_cStResult.p_set(t_cStKapMitEK);
		t_cStResult.m__steuer=t_cStResult.m__steuer-t_cStEK.m__steuer;
		t_cStResult.m__steuer=this.p_Divisor(t_cStResult.m__steuer,t_pcKtBerech.m__divisor);
		t_cStResult.m__einfsteuer=t_cStResult.m__einfsteuer-t_cStEK.m__einfsteuer;
		t_cStResult.m__einfsteuer=this.p_Divisor(t_cStResult.m__einfsteuer,t_pcKtBerech.m__divisor);
	}else{
		if(bb_utils_isZero(t_rKapSatzBestimmend,0)){
			t_rKapSatzBestimmend=t_rKapBestimmend;
		}
		t_rKapBestimmend=t_rKapSatzBestimmend;
		t_rSatzbestimmend=t_rKapSatzBestimmend*t_pcKtBerech.m__bteil;
		t_rSteuerwert=t_rKapBestimmend;
		this.p_berechneSoBerBund(t_pcKtBerech,t_iEndAlter,t_rSteuerwert,t_rSatzbestimmend,t_rSteuerfuss,false,t_cStResult);
	}
	this.p_setMinMax4(t_rKapBestimmend,t_rSteuerfuss,t_pcKtBerech,t_cStResult);
	return true;
}
c_StCStObjektKapital.prototype.p_berechneKapBund=function(t_kap,t_cStResult,t_rSteuerwert,t_rSatzbestimmend,t_rSteuerfuss){
	var t_k=null;
	var t_b=null;
	var t_kapsumme=.0;
	var t_kapsatzbestimmend=.0;
	var t_iEndAlter=0;
	t_k=object_downcast((t_kap.p_Values().p_ObjectEnumerator().p_NextObject()),c_StC_natPers_Kapital);
	t_iEndAlter=t_k.m__endalter;
	t_kapsatzbestimmend=t_k.m__satzbKap;
	t_b=this.m__calc.m__stbund.m__strkt.p_getNatPersSoBerKt(this.m__calc.m__strw,this.m__calctyp,this.m__calc.m__stbund.p__gesetzjahr(),this.m__calc.m__grundlage.p__id_grp(),t_k.p__auszgrund2());
	if(t_b==null){
		return false;
	}
	if((t_b.m__spez&c_StR_natPers.m_Spez_ES_WIRD_KEINE_STEUER_ERHOBEN)!=0){
		return true;
	}
	t_kapsumme=0.0;
	var t_=t_kap.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		var t_k2=object_downcast((t_o),c_StC_natPers_Kapital);
		if(this.m__calctyp==c_StC_natPers.m_CalcTyp_STEUER_SAUELE_3B){
			var t_m=null;
			t_m=this.m__calc.m__stbund.m__strkt.p_getNatPersS3bEEMap(this.m__calc.m__strw,this.m__calc.m__stbund.p__gesetzjahr(),t_b.m__id);
			if(this.p_checkVorsorge(t_m,t_k2)==true){
				t_k2.p_setVorsorge(c_StC_common.m_TaxLevel_BUND);
				continue;
			}
		}
		t_kapsumme=t_kapsumme+t_k2.m__stbKap;
	}
	if((t_b.m__spez&c_StR_natPers.m_Spez_STFUESSE_IMMER_100)!=0){
		t_rSteuerfuss=100.0;
	}
	this.p_berechneKapSoBerBund(t_b,t_iEndAlter,t_kapsumme,t_kapsatzbestimmend,t_rSteuerwert,t_rSatzbestimmend,t_rSteuerfuss,t_cStResult);
	return true;
}
c_StCStObjektKapital.prototype.p_berechneKapSoBerKt=function(t_pcKtBerech,t_iEndAlter,t_rKapBestimmend,t_rKapSatzBestimmend,t_rSteuerwert,t_rSatzbestimmend,t_rSteuerfuss,t_cStResult){
	if((t_pcKtBerech.m__spez&c_StR_natPers.m_Spez_FUER_STEURSATZ_NOCH_EK_ADDIEREN)!=0){
		var t_cStEK=c_StC_natPers_StLevel.m_new.call(new c_StC_natPers_StLevel);
		var t_cStKapMitEK=c_StC_natPers_StLevel.m_new.call(new c_StC_natPers_StLevel);
		this.p_berechneSoBerKt(t_pcKtBerech,t_iEndAlter,t_rSteuerwert,t_rSatzbestimmend,t_rSteuerfuss,false,t_cStEK);
		t_rSteuerwert=t_rSteuerwert+t_pcKtBerech.m__bteil*t_rKapBestimmend;
		if(bb_utils_isGZero(t_rSatzbestimmend,0)){
			t_rSatzbestimmend=t_rSatzbestimmend+t_pcKtBerech.m__bteil*t_rKapBestimmend;
		}
		this.p_berechneSoBerKt(t_pcKtBerech,t_iEndAlter,t_rSteuerwert,t_rSatzbestimmend,t_rSteuerfuss,false,t_cStKapMitEK);
		t_cStResult.p_set(t_cStKapMitEK);
		t_cStResult.m__steuer=t_cStResult.m__steuer-t_cStEK.m__steuer;
		t_cStResult.m__steuer=this.p_Divisor(t_cStResult.m__steuer,t_pcKtBerech.m__divisor);
		t_cStResult.m__einfsteuer=t_cStResult.m__einfsteuer-t_cStEK.m__einfsteuer;
		t_cStResult.m__einfsteuer=this.p_Divisor(t_cStResult.m__einfsteuer,t_pcKtBerech.m__divisor);
	}else{
		if(bb_utils_isZero(t_rKapSatzBestimmend,0)){
			t_rKapSatzBestimmend=t_rKapBestimmend;
		}
		t_rSatzbestimmend=bb_utils_round2(t_rKapSatzBestimmend*bb_utils_round2(t_pcKtBerech.m__bteil,0.000001),0.00001);
		t_rSteuerwert=t_rKapBestimmend;
		this.p_berechneSoBerKt(t_pcKtBerech,t_iEndAlter,t_rSteuerwert,t_rSatzbestimmend,t_rSteuerfuss,false,t_cStResult);
	}
	this.p_setMinMax4(t_rKapBestimmend,t_rSteuerfuss,t_pcKtBerech,t_cStResult);
	return true;
}
c_StCStObjektKapital.prototype.p_berechneKapKt=function(t_kap,t_cStResult,t_rSteuerwert,t_rSatzbestimmend,t_rSteuerfuss){
	var t_k=null;
	var t_b=null;
	var t_kapsumme=.0;
	var t_kapsatzbestimmend=.0;
	var t_iEndAlter=0;
	t_k=object_downcast((t_kap.p_Values().p_ObjectEnumerator().p_NextObject()),c_StC_natPers_Kapital);
	t_iEndAlter=t_k.m__endalter;
	t_kapsatzbestimmend=t_k.m__satzbKap;
	t_b=this.m__calc.m__stkt.m__strkt.p_getNatPersSoBerKt(this.m__calc.m__strw,this.m__calctyp,this.m__calc.m__stkt.p__gesetzjahr(),this.m__calc.m__grundlage.p__id_grp(),t_k.p__auszgrund2());
	if(t_b==null){
		return false;
	}
	if((t_b.m__spez&c_StR_natPers.m_Spez_ES_WIRD_KEINE_STEUER_ERHOBEN)!=0){
		return true;
	}
	t_kapsumme=0.0;
	var t_=t_kap.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		var t_k2=object_downcast((t_o),c_StC_natPers_Kapital);
		if(this.m__calctyp==c_StC_natPers.m_CalcTyp_STEUER_SAUELE_3B){
			var t_m=null;
			t_m=this.m__calc.m__stkt.m__strkt.p_getNatPersS3bEEMap(this.m__calc.m__strw,this.m__calc.m__stkt.p__gesetzjahr(),t_b.m__id);
			if(this.p_checkVorsorge(t_m,t_k2)==true){
				t_k2.p_setVorsorge(c_StC_common.m_TaxLevel_KANTON);
				continue;
			}
		}
		t_kapsumme=t_kapsumme+t_k2.m__stbKap;
	}
	if((t_b.m__spez&c_StR_natPers.m_Spez_STFUESSE_IMMER_100)!=0){
		t_rSteuerfuss=100.0;
	}
	this.p_berechneKapSoBerKt(t_b,t_iEndAlter,t_kapsumme,t_kapsatzbestimmend,t_rSteuerwert,t_rSatzbestimmend,t_rSteuerfuss,t_cStResult);
	return true;
}
c_StCStObjektKapital.prototype.p_berechneKapSoBerGmd=function(t_pcGmdBerech,t_iEndAlter,t_rKapBestimmend,t_rKapSatzBestimmend,t_rSteuerwert,t_rSatzbestimmend,t_rSteuerfuss,t_cStResult){
	if((t_pcGmdBerech.m__spez&c_StR_natPers.m_Spez_FUER_STEURSATZ_NOCH_EK_ADDIEREN)!=0){
		var t_cStEK=c_StC_natPers_StLevel.m_new.call(new c_StC_natPers_StLevel);
		var t_cStKapMitEK=c_StC_natPers_StLevel.m_new.call(new c_StC_natPers_StLevel);
		this.p_berechneSoBerGmd(t_pcGmdBerech,t_iEndAlter,t_rSteuerwert,t_rSatzbestimmend,t_rSteuerfuss,false,t_cStEK);
		t_rSteuerwert=t_rSteuerwert+t_pcGmdBerech.m__bteil*t_rKapBestimmend;
		if(bb_utils_isGZero(t_rSatzbestimmend,0)){
			t_rSatzbestimmend=t_rSatzbestimmend+t_pcGmdBerech.m__bteil*t_rKapBestimmend;
		}
		this.p_berechneSoBerGmd(t_pcGmdBerech,t_iEndAlter,t_rSteuerwert,t_rSatzbestimmend,t_rSteuerfuss,false,t_cStKapMitEK);
		t_cStResult.p_set(t_cStKapMitEK);
		t_cStResult.m__steuer=t_cStResult.m__steuer-t_cStEK.m__steuer;
		t_cStResult.m__steuer=this.p_Divisor(t_cStResult.m__steuer,t_pcGmdBerech.m__divisor);
		t_cStResult.m__einfsteuer=t_cStResult.m__einfsteuer-t_cStEK.m__einfsteuer;
	}else{
		if(bb_utils_isZero(t_rKapSatzBestimmend,0)){
			t_rKapSatzBestimmend=t_rKapBestimmend;
		}
		t_rSatzbestimmend=t_rKapSatzBestimmend*t_pcGmdBerech.m__bteil;
		t_rSteuerwert=t_rKapBestimmend;
		this.p_berechneSoBerGmd(t_pcGmdBerech,t_iEndAlter,t_rSteuerwert,t_rSatzbestimmend,t_rSteuerfuss,false,t_cStResult);
	}
	this.p_setMinMax3(t_rKapBestimmend,t_rSteuerfuss,t_pcGmdBerech,t_cStResult);
	return true;
}
c_StCStObjektKapital.prototype.p_berechneKapGmd=function(t_kap,t_cStResult){
	var t_b=null;
	var t_rSteuerfuss=.0;
	var t_rSteuerwertKt=.0;
	var t_rSatzbestimmendKt=.0;
	var t_rSteuerwertGmd=.0;
	var t_rSatzbestimmendGmd=.0;
	var t_k=null;
	var t_kapsumme=.0;
	var t_kapsatzbestimmend=.0;
	var t_iEndAlter=0;
	t_rSteuerfuss=this.m__calc.m__stgmd.m__gmd_stfuss_ek;
	t_rSteuerwertKt=this.m__calc.m__grundlage.m__stbEkKt;
	t_rSteuerwertGmd=this.m__calc.m__grundlage.m__stbEkGmd;
	t_rSatzbestimmendKt=this.m__calc.m__grundlage.m__satzbEkKt;
	t_rSatzbestimmendGmd=this.m__calc.m__grundlage.m__satzbEkGmd;
	t_k=object_downcast((t_kap.p_Values().p_ObjectEnumerator().p_NextObject()),c_StC_natPers_Kapital);
	t_iEndAlter=t_k.m__endalter;
	t_kapsatzbestimmend=t_k.m__satzbKap;
	t_b=this.m__calc.m__stgmd.m__strgmd.p_getNatPersSoBerGmd(this.m__calc.m__strw,this.m__calctyp,this.m__calc.m__stkt.p__gesetzjahr(),this.m__calc.m__grundlage.p__id_grp(),t_k.p__auszgrund2());
	if(t_b==null){
		return false;
	}
	if((t_b.m__spez&c_StR_natPers.m_Spez_ES_WIRD_KEINE_STEUER_ERHOBEN)!=0){
		return true;
	}
	t_kapsumme=0.0;
	var t_=t_kap.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		var t_k2=object_downcast((t_o),c_StC_natPers_Kapital);
		if(this.m__calctyp==c_StC_natPers.m_CalcTyp_STEUER_SAUELE_3B){
			var t_m=null;
			t_m=this.m__calc.m__stgmd.m__strgmd.p_getNatPersS3bEEGmdMap(this.m__calc.m__strw,this.m__calc.m__stkt.p__gesetzjahr(),t_b.m__id);
			if(this.p_checkVorsorge(t_m,t_k2)==true){
				t_k2.p_setVorsorge(c_StC_common.m_TaxLevel_GEMEINDE);
				continue;
			}
		}
		t_kapsumme=t_kapsumme+t_k2.m__stbKap;
	}
	if((t_b.m__spez&c_StR_natPers.m_Spez_STFUESSE_IMMER_100)!=0){
		t_rSteuerfuss=100.0;
	}
	if(t_b.m__basis==c_StR_natPers.m_SoBerBasis_AUF_STEUERB_EKVM_GMD){
		this.p_berechneKapSoBerGmd(t_b,t_iEndAlter,t_kapsumme,t_kapsatzbestimmend,t_rSteuerwertGmd,t_rSatzbestimmendGmd,t_rSteuerfuss,t_cStResult);
	}else{
		if(t_b.m__basis==c_StR_natPers.m_SoBerBasis_AUF_STEUERB_EKVM_KT){
			this.p_berechneKapSoBerGmd(t_b,t_iEndAlter,t_kapsumme,t_kapsatzbestimmend,t_rSteuerwertKt,t_rSatzbestimmendKt,t_rSteuerfuss,t_cStResult);
		}
	}
	return true;
}
c_StCStObjektKapital.prototype.p_berechneKapGmd2=function(t_kap,t_cStKtResult,t_cStResult){
	var t_iTyp=0;
	var t_rSteuerfuss=.0;
	var t_rSteuerwertKt=.0;
	var t_rSatzbestimmendKt=.0;
	var t_rSteuerwertGmd=.0;
	var t_rSatzbestimmendGmd=.0;
	t_iTyp=this.m__calc.m__stgmd.p__gmd_basis();
	if((t_iTyp&c_StR_natPers.m_SoBerBasis_SONDERBERECHNUNG)!=0){
		if(this.p_berechneKapGmd(t_kap,t_cStResult)){
			return true;
		}
		t_iTyp=t_iTyp-c_StR_natPers.m_SoBerBasis_SONDERBERECHNUNG;
	}
	t_rSteuerfuss=this.m__calc.m__stgmd.m__gmd_stfuss_ek;
	t_rSteuerwertKt=this.m__calc.m__grundlage.m__stbEkKt;
	t_rSteuerwertGmd=this.m__calc.m__grundlage.m__stbEkGmd;
	t_rSatzbestimmendKt=this.m__calc.m__grundlage.m__satzbEkKt;
	t_rSatzbestimmendGmd=this.m__calc.m__grundlage.m__satzbEkGmd;
	if(t_iTyp==c_StR_natPers.m_SoBerBasis_AUF_EINF_STAATSSTEUER){
		t_cStResult.p_set(t_cStKtResult);
		t_cStResult.m__steuer=t_cStKtResult.m__einfsteuer*t_rSteuerfuss/100.0;
	}else{
		if(t_iTyp==c_StR_natPers.m_SoBerBasis_AUF_EFF_STAATSSTEUER){
			t_cStResult.p_set(t_cStKtResult);
			var t_fBetrag=this.m__calcbasis.p_rundeWert(t_cStKtResult.m__steuer);
			t_cStResult.m__steuer=t_fBetrag*t_rSteuerfuss/100.0;
		}
	}
	return true;
}
c_StCStObjektKapital.prototype.p_berechneKapSoBerChr=function(t_pcChrBerech,t_iEndAlter,t_rKapBestimmend,t_rKapSatzBestimmend,t_rSteuerwert,t_rSatzbestimmend,t_rSteuerfuss,t_cStResult){
	if((t_pcChrBerech.m__spez&c_StR_natPers.m_Spez_FUER_STEURSATZ_NOCH_EK_ADDIEREN)!=0){
		var t_cStEK=c_StC_natPers_StLevel.m_new.call(new c_StC_natPers_StLevel);
		var t_cStKapMitEK=c_StC_natPers_StLevel.m_new.call(new c_StC_natPers_StLevel);
		this.p_berechneSoBerChr(t_pcChrBerech,t_iEndAlter,t_rSteuerwert,t_rSatzbestimmend,t_rSteuerfuss,false,t_cStEK);
		t_rSteuerwert=t_rSteuerwert+t_pcChrBerech.m__bteil*t_rKapBestimmend;
		if(bb_utils_isGZero(t_rSatzbestimmend,0)){
			t_rSatzbestimmend=t_rSatzbestimmend+t_pcChrBerech.m__bteil*t_rKapBestimmend;
		}
		this.p_berechneSoBerChr(t_pcChrBerech,t_iEndAlter,t_rSteuerwert,t_rSatzbestimmend,t_rSteuerfuss,false,t_cStKapMitEK);
		t_cStResult.p_set(t_cStKapMitEK);
		t_cStResult.m__steuer=t_cStResult.m__steuer-t_cStEK.m__steuer;
		t_cStResult.m__steuer=this.p_Divisor(t_cStResult.m__steuer,t_pcChrBerech.m__divisor);
		if(bb_utils_isNotZero(t_rSteuerfuss,0)){
			t_cStResult.m__einfsteuer=t_cStResult.m__steuer*100.0/t_rSteuerfuss;
		}
	}else{
		if(bb_utils_isZero(t_rKapSatzBestimmend,0)){
			t_rKapSatzBestimmend=t_rKapBestimmend;
		}
		t_rSteuerwert=t_rKapBestimmend*t_pcChrBerech.m__bteil;
		t_rKapSatzBestimmend=0.0;
		this.p_berechneSoBerChr(t_pcChrBerech,t_iEndAlter,t_rSteuerwert,t_rSatzbestimmend,t_rSteuerfuss,false,t_cStResult);
	}
	this.p_setMinMax2(t_rKapBestimmend,t_rSteuerfuss,t_pcChrBerech,t_cStResult);
	return true;
}
c_StCStObjektKapital.prototype.p_berechneKapChr=function(t_person,t_kap,t_cStResult){
	var t_b=null;
	var t_rSteuerfuss=.0;
	var t_rSteuerwertKt=.0;
	var t_rSatzbestimmendKt=.0;
	var t_rSteuerwertGmd=.0;
	var t_rSatzbestimmendGmd=.0;
	var t_iKonf=0;
	var t_k=null;
	var t_iEndAlter=0;
	var t_kapsumme=.0;
	var t_kapsatzbestimmend=.0;
	t_iKonf=this.m__calc.m__grundlage.p_getKonfessionOf(t_person);
	t_rSteuerfuss=this.m__calc.m__stgmd.p_getKirchenStFussEK(t_iKonf);
	t_rSteuerwertKt=this.m__calc.m__grundlage.m__stbEkKt;
	t_rSteuerwertGmd=this.m__calc.m__grundlage.m__stbEkGmd;
	t_rSatzbestimmendKt=this.m__calc.m__grundlage.m__satzbEkKt;
	t_rSatzbestimmendGmd=this.m__calc.m__grundlage.m__satzbEkGmd;
	t_k=object_downcast((t_kap.p_Values().p_ObjectEnumerator().p_NextObject()),c_StC_natPers_Kapital);
	t_iEndAlter=t_k.m__endalter;
	t_kapsatzbestimmend=t_k.m__satzbKap;
	t_b=this.m__calc.m__stgmd.m__strgmd.p_getNatPersSoBerChr(this.m__calc.m__strw,this.m__calctyp,this.m__calc.m__stbund.p__gesetzjahr(),this.m__calc.m__grundlage.p__id_grp(),t_iKonf,t_k.p__auszgrund2());
	if(t_b==null){
		return false;
	}
	if((t_b.m__spez&c_StR_natPers.m_Spez_ES_WIRD_KEINE_STEUER_ERHOBEN)!=0){
		return true;
	}
	t_kapsumme=0.0;
	var t_=t_kap.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		var t_k2=object_downcast((t_o),c_StC_natPers_Kapital);
		if(this.m__calctyp==c_StC_natPers.m_CalcTyp_STEUER_SAUELE_3B){
			var t_m=null;
			t_m=this.m__calc.m__stgmd.m__strgmd.p_getNatPersS3bEEChrMap(this.m__calc.m__strw,this.m__calc.m__stkt.p__gesetzjahr(),t_b.m__id);
			if(this.p_checkVorsorge(t_m,t_k2)==true){
				t_k2.p_setVorsorge(c_StC_common.m_TaxLevel_KIRCHE);
				continue;
			}
		}
		t_kapsumme=t_kapsumme+t_k2.m__stbKap;
	}
	if((t_b.m__spez&c_StR_natPers.m_Spez_STFUESSE_IMMER_100)!=0){
		t_rSteuerfuss=100.0;
	}
	if(t_b.m__basis==c_StR_natPers.m_SoBerBasis_AUF_GEMEINDESTEUER){
		this.p_berechneKapSoBerChr(t_b,0,t_kapsumme,t_kapsatzbestimmend,t_rSteuerwertGmd,t_rSatzbestimmendGmd,t_rSteuerfuss,t_cStResult);
	}else{
		if(t_b.m__basis==c_StR_natPers.m_SoBerBasis_AUF_STEUERB_EKVM_KT){
			this.p_berechneKapSoBerChr(t_b,0,t_kapsumme,t_kapsatzbestimmend,t_rSteuerwertKt,t_rSatzbestimmendKt,t_rSteuerfuss,t_cStResult);
		}
	}
	return true;
}
c_StCStObjektKapital.prototype.p_berechneKapChr2=function(t_person,t_kap,t_cStKt,t_cStGmd){
	var t_iTyp=0;
	var t_iKonf=0;
	var t_rAnteil=.0;
	var t_rSteuerfuss=.0;
	var t_rSteuerwertKt=.0;
	var t_rSatzbestimmendKt=.0;
	var t_rSteuerwertGmd=.0;
	var t_rSatzbestimmendGmd=.0;
	var t_rStResultat=0.0;
	t_iKonf=this.m__calc.m__grundlage.p_getKonfessionOf(t_person);
	t_rAnteil=(this.m__calc.m__grundlage.p_getKonfessionsAnteilOf(t_person));
	if(t_rAnteil==0.0){
		return t_rStResultat;
	}
	t_iTyp=this.m__calc.m__stgmd.p__chr_basis();
	if((t_iTyp&c_StR_natPers.m_SoBerBasis_SONDERBERECHNUNG)!=0){
		var t_cStChrSteuer=c_StC_natPers_StLevel.m_new.call(new c_StC_natPers_StLevel);
		if(this.p_berechneKapChr(t_person,t_kap,t_cStChrSteuer)){
			t_rStResultat=t_cStChrSteuer.m__steuer*t_rAnteil/100.0;
			return t_rStResultat;
		}
		t_iTyp=t_iTyp-c_StR_natPers.m_SoBerBasis_SONDERBERECHNUNG;
	}
	t_rSteuerfuss=this.m__calc.m__stgmd.p_getKirchenStFussEK(t_iKonf);
	t_rSteuerwertKt=this.m__calc.m__grundlage.m__stbEkKt;
	t_rSteuerwertGmd=this.m__calc.m__grundlage.m__stbEkGmd;
	t_rSatzbestimmendKt=this.m__calc.m__grundlage.m__satzbEkKt;
	t_rSatzbestimmendGmd=this.m__calc.m__grundlage.m__satzbEkGmd;
	if(t_iTyp==c_StR_natPers.m_SoBerBasis_AUF_EINF_STAATSSTEUER){
		t_rStResultat=t_cStKt.m__einfsteuer*t_rSteuerfuss/100.0;
	}else{
		if(t_iTyp==c_StR_natPers.m_SoBerBasis_AUF_EFF_STAATSSTEUER){
			var t_fBetrag=this.m__calcbasis.p_rundeWert(t_cStKt.m__steuer);
			t_rStResultat=t_fBetrag*t_rSteuerfuss/100.0;
		}else{
			if(t_iTyp==c_StR_natPers.m_SoBerBasis_AUF_GEMEINDESTEUER){
				var t_fBetrag2=this.m__calcbasis.p_rundeWert(t_cStGmd.m__steuer);
				t_rStResultat=t_fBetrag2*t_rSteuerfuss/100.0;
			}else{
				if(t_iTyp==c_StR_natPers.m_SoBerBasis_AUF_EINF_GEMEINDESTEUER){
					t_rStResultat=t_cStGmd.m__einfsteuer*t_rSteuerfuss/100.0;
				}
			}
		}
	}
	t_rStResultat=t_rStResultat*t_rAnteil/100.0;
	return t_rStResultat;
}
c_StCStObjektKapital.prototype.p_berechneKapChr3=function(t_kap,t_cStKt,t_cStGmd,t_cSt){
	var t_rSteuer1=.0;
	var t_rSteuer2=.0;
	t_rSteuer1=this.p_berechneKapChr2(1,t_kap,t_cStKt,t_cStGmd);
	t_rSteuer2=this.p_berechneKapChr2(2,t_kap,t_cStKt,t_cStGmd);
	t_cSt.m__steuer=this.m__calcbasis.p_rundeWert(t_rSteuer1+t_rSteuer2);
	return true;
}
c_StCStObjektKapital.prototype.p_calcSpezifisch=function(){
	var t_kap=null;
	t_kap=this.p_getKapitalien();
	if(t_kap.p_Count()==0){
		return;
	}
	if(this.m__calc.m__stkt.p__id()!=c_StR_common.m_Kanton_LI){
		this.p_berechneKapBund(t_kap,this.m__st.p__level(c_StC_common.m_TaxLevel_BUND),this.m__calc.m__grundlage.m__stbEkBund,this.m__calc.m__grundlage.m__satzbEkBund,this.m__calc.m__stbund.m__stfuss_ek);
	}
	this.p_berechneKapKt(t_kap,this.m__st.p__level(c_StC_common.m_TaxLevel_KANTON),this.m__calc.m__grundlage.m__stbEkKt,this.m__calc.m__grundlage.m__satzbEkKt,this.m__calc.m__stkt.m__stfuss_ek);
	this.p_berechneKapGmd2(t_kap,this.m__st.p__level(c_StC_common.m_TaxLevel_KANTON),this.m__st.p__level(c_StC_common.m_TaxLevel_GEMEINDE));
	this.p_berechneKapChr3(t_kap,this.m__st.p__level(c_StC_common.m_TaxLevel_KANTON),this.m__st.p__level(c_StC_common.m_TaxLevel_GEMEINDE),this.m__st.p__level(c_StC_common.m_TaxLevel_KIRCHE));
}
c_StCStObjektKapital.prototype.p_takeStFussEK=function(){
	return true;
}
function c_StCStObjektES(){
	c_StCStObjekt.call(this);
	this.m__infos=c_StCESInfos.m_new.call(new c_StCESInfos);
}
c_StCStObjektES.prototype=extend_class(c_StCStObjekt);
c_StCStObjektES.m_new=function(t_calc,t_iCalcTyp){
	c_StCStObjekt.m_new.call(this);
	this.m__calc=t_calc;
	this.m__calctyp=t_iCalcTyp;
	return this;
}
c_StCStObjektES.m_new2=function(){
	c_StCStObjekt.m_new.call(this);
	return this;
}
c_StCStObjektES.prototype.p_setInfo=function(t_iLevel,t_iInfoTyp,t_sText){
	this.m__infos.p__level(t_iLevel).p_setInfo2(t_iInfoTyp,t_sText);
}
c_StCStObjektES.prototype.p_FreiBetrag=function(t_cProg,t_rSteuerwert,t_rSatzbestimmend){
	var t_rFreiBetrag=t_cProg.m__freibetrag;
	if(bb_utils_isGZero(t_rFreiBetrag,0)==true){
		if(bb_utils_isGZero(t_rSatzbestimmend,0)==true){
			if(t_rSatzbestimmend<=t_rFreiBetrag){
				return true;
			}
		}else{
			if(t_rSteuerwert<=t_rFreiBetrag){
				return true;
			}
		}
	}
	return false;
}
c_StCStObjektES.prototype.p_parseInfo=function(t_iLevel,t_sInfo){
	this.m__infos.p__level(t_iLevel).p_parseInfo2(t_sInfo);
}
c_StCStObjektES.prototype.p_berechneEsSteuerKt=function(t_iCalcTyp,t_pcKtBerech,t_bEndsteuerRunden,t_cStResult){
	var t_cProg=null;
	var t_pcCollAbzuege=null;
	var t_cAbzug=c_StC_natPers_Abzug.m_new.call(new c_StC_natPers_Abzug,this.m__calctyp,this.m__calc);
	var t_rSteuerwert=this.m__calc.m__grundlage.m__es_summe;
	var t_rSteuerwertVorAbzuege=t_rSteuerwert;
	var t_rSatzbestimmend=this.m__calc.m__grundlage.m__es_satzbestimmend;
	var t_rFaktor=t_pcKtBerech.m__es_faktor;
	if((t_pcKtBerech.m__spez&c_StR_natPers.m_Spez_ES_WIRD_KEINE_STEUER_ERHOBEN)!=0){
		this.p_setInfo(c_StC_common.m_TaxLevel_KANTON,c_StC_natPers_ES_INFO.m_KEINESTEUERN,"1");
		return true;
	}
	t_cProg=c_StCProgr.m_new2.call(new c_StCProgr,this.m__calc,t_pcKtBerech.m__progid,t_pcKtBerech.m__freibetr);
	if(t_cProg.p_isValid()==false){
		return false;
	}
	if(this.p_FreiBetrag(t_cProg,t_rSteuerwert,t_rSatzbestimmend)==true){
		this.p_parseInfo(c_StC_common.m_TaxLevel_KANTON,t_pcKtBerech.m__es_info);
		return true;
	}
	t_pcCollAbzuege=this.m__calc.m__stkt.m__strkt.p_getNatPersAbzgMap(this.m__calc.m__strw,this.m__calc.m__stkt.p__gesetzjahr(),t_pcKtBerech.m__id,this.m__calc.m__grundlage.p__id_grp());
	var t_f=[];
	t_f=this.p_getStBasis(false,t_cProg,t_pcCollAbzuege,0,t_pcKtBerech.m__spez,0,this.m__calc.m__stkt.p__rtabjahr(),t_rSteuerwert,t_rSatzbestimmend);
	t_rSteuerwert=t_f[0];
	t_rSatzbestimmend=t_f[1];
	this.p_parseInfo(c_StC_common.m_TaxLevel_KANTON,t_pcKtBerech.m__es_info);
	t_cStResult.m__satzbestimmend=t_rSatzbestimmend;
	t_cStResult.m__steuerbar=t_rSteuerwert;
	t_cStResult.m__einfsteuer=t_cProg.p_berechneSt(t_rSatzbestimmend);
	t_cStResult.m__einfsteuer=bb_math_Max2(0.0,t_cStResult.m__einfsteuer);
	t_cStResult.m__einfsteuer=this.p_Divisor(t_cStResult.m__einfsteuer,t_pcKtBerech.m__divisor);
	if(bb_utils_isNotZero(t_cStResult.m__satzbestimmend,0)){
		t_cStResult.m__steuersatz=100.0*t_cStResult.m__einfsteuer/t_cStResult.m__satzbestimmend;
	}
	if(t_rSatzbestimmend!=t_rSteuerwert && bb_utils_isNotZero(t_rSatzbestimmend,0)){
		t_cStResult.m__einfsteuer=t_cStResult.m__einfsteuer/t_rSatzbestimmend*t_rSteuerwert;
	}
	t_cStResult.m__steuer=t_cStResult.m__einfsteuer*t_rFaktor;
	t_cAbzug.p_berechnePostAbzug(t_pcCollAbzuege,false,t_rFaktor*100.0,t_cStResult,t_rSteuerwert,t_rSteuerwertVorAbzuege,t_cStResult.m__satzbestimmend,t_cStResult.m__steuersatz,t_cStResult.m__einfsteuer,t_cStResult.m__steuer);
	if(t_bEndsteuerRunden){
		this.p_setMinMax4(t_rSteuerwert,t_rFaktor*100.0,t_pcKtBerech,t_cStResult);
	}
	return true;
}
c_StCStObjektES.prototype.p_berechneSoBerEsKt=function(t_iCalcTyp,t_iEsGrp,t_iEsBeguenst,t_cSt){
	var t_m=null;
	var t_b=null;
	var t_bOk=false;
	t_m=this.m__calc.m__stkt.m__strkt.p_getNatPersSoBerKtMap(this.m__calc.m__strw,t_iCalcTyp,this.m__calc.m__stkt.p__gesetzjahr(),this.m__calc.m__grundlage.p__id_grp());
	if(t_m.p_Count()==0){
		return false;
	}
	var t_=t_m.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		t_b=object_downcast((t_o),c_StR_natPers_SoBerKt);
		if(t_b.m__es_grp==t_iEsGrp && ((t_b.m__es_beguenst&t_iEsBeguenst)!=0)){
			if(this.p_berechneEsSteuerKt(t_iCalcTyp,t_b,true,t_cSt)==true){
				t_bOk=true;
			}
		}
	}
	return t_bOk;
}
c_StCStObjektES.prototype.p_berechneEsKt=function(t_cSt){
	if(this.p_berechneSoBerEsKt(this.m__calctyp,this.m__calc.m__grundlage.m__es_gruppe,this.m__calc.m__grundlage.m__es_beguenstigter,t_cSt)){
		this.p_setInfo(c_StC_common.m_TaxLevel_KANTON,c_StC_natPers_ES_INFO.m_REGEL,c_StC_natPers_ES_INFO.m_REGEL_EIGENE);
	}else{
		if(this.p_berechneSoBerEsKt(c_StC_natPers.m_CalcTyp_ERB_UND_SCHENKSTEUER,this.m__calc.m__grundlage.m__es_gruppe,this.m__calc.m__grundlage.m__es_beguenstigter,t_cSt)){
			this.p_setInfo(c_StC_common.m_TaxLevel_KANTON,c_StC_natPers_ES_INFO.m_REGEL,c_StC_natPers_ES_INFO.m_REGEL_EIGENE);
		}else{
			if(this.p_berechneSoBerEsKt(this.m__calctyp,c_StC_natPers.m_ES_GRP_UEBRIGE,c_StC_natPers.m_ES_GRP_UEBRIGE_UEBRIGE,t_cSt)){
				this.p_setInfo(c_StC_common.m_TaxLevel_KANTON,c_StC_natPers_ES_INFO.m_REGEL,c_StC_natPers_ES_INFO.m_REGEL_UEBRIGE);
			}else{
				if(this.p_berechneSoBerEsKt(c_StC_natPers.m_CalcTyp_ERB_UND_SCHENKSTEUER,c_StC_natPers.m_ES_GRP_UEBRIGE,c_StC_natPers.m_ES_GRP_UEBRIGE_UEBRIGE,t_cSt)){
					this.p_setInfo(c_StC_common.m_TaxLevel_KANTON,c_StC_natPers_ES_INFO.m_REGEL,c_StC_natPers_ES_INFO.m_REGEL_UEBRIGE);
				}
			}
		}
	}
	return;
}
c_StCStObjektES.prototype.p_berechneEsSteuerGmd=function(t_iCalcTyp,t_pcGmdBerech,t_bEndsteuerRunden,t_cStResult){
	var t_cProg=null;
	var t_pcCollAbzuege=null;
	var t_cAbzug=c_StC_natPers_Abzug.m_new.call(new c_StC_natPers_Abzug,this.m__calctyp,this.m__calc);
	var t_rSteuerwert=this.m__calc.m__grundlage.m__es_summe;
	var t_rSteuerwertVorAbzuege=t_rSteuerwert;
	var t_rSatzbestimmend=this.m__calc.m__grundlage.m__es_satzbestimmend;
	var t_rFaktor=t_pcGmdBerech.m__es_faktor;
	if((t_pcGmdBerech.m__spez&c_StR_natPers.m_Spez_ES_WIRD_KEINE_STEUER_ERHOBEN)!=0){
		this.p_setInfo(c_StC_common.m_TaxLevel_GEMEINDE,c_StC_natPers_ES_INFO.m_KEINESTEUERN,"1");
		return true;
	}
	t_cProg=c_StCProgr.m_new2.call(new c_StCProgr,this.m__calc,t_pcGmdBerech.m__progid,t_pcGmdBerech.m__freibetr);
	if(t_cProg.p_isValid()==false){
		return false;
	}
	if(this.p_FreiBetrag(t_cProg,t_rSteuerwert,t_rSatzbestimmend)==true){
		this.p_parseInfo(c_StC_common.m_TaxLevel_GEMEINDE,t_pcGmdBerech.m__es_info);
		return true;
	}
	t_pcCollAbzuege=this.m__calc.m__stgmd.m__strgmd.p_getNatPersAbzgGmdMap(this.m__calc.m__strw,this.m__calc.m__stkt.p__gesetzjahr(),t_pcGmdBerech.m__id,this.m__calc.m__grundlage.p__id_grp());
	var t_f=[];
	t_f=this.p_getStBasis(false,t_cProg,t_pcCollAbzuege,0,t_pcGmdBerech.m__spez,0,this.m__calc.m__stkt.p__rtabjahr(),t_rSteuerwert,t_rSatzbestimmend);
	t_rSteuerwert=t_f[0];
	t_rSatzbestimmend=t_f[1];
	this.p_parseInfo(c_StC_common.m_TaxLevel_GEMEINDE,t_pcGmdBerech.m__es_info);
	t_cStResult.m__satzbestimmend=t_rSatzbestimmend;
	t_cStResult.m__steuerbar=t_rSteuerwert;
	t_cStResult.m__einfsteuer=t_cProg.p_berechneSt(t_rSatzbestimmend);
	t_cStResult.m__einfsteuer=bb_math_Max2(0.0,t_cStResult.m__einfsteuer);
	t_cStResult.m__einfsteuer=this.p_Divisor(t_cStResult.m__einfsteuer,t_pcGmdBerech.m__divisor);
	if(bb_utils_isNotZero(t_cStResult.m__satzbestimmend,0)){
		t_cStResult.m__steuersatz=100.0*t_cStResult.m__einfsteuer/t_cStResult.m__satzbestimmend;
	}
	if(t_rSatzbestimmend!=t_rSteuerwert && bb_utils_isNotZero(t_rSatzbestimmend,0)){
		t_cStResult.m__einfsteuer=t_cStResult.m__einfsteuer/t_rSatzbestimmend*t_rSteuerwert;
	}
	t_cStResult.m__steuer=t_cStResult.m__einfsteuer*t_rFaktor;
	t_cAbzug.p_berechnePostAbzug(t_pcCollAbzuege,false,t_rFaktor*100.0,t_cStResult,t_rSteuerwert,t_rSteuerwertVorAbzuege,t_cStResult.m__satzbestimmend,t_cStResult.m__steuersatz,t_cStResult.m__einfsteuer,t_cStResult.m__steuer);
	if(t_bEndsteuerRunden){
		this.p_setMinMax3(t_rSteuerwert,t_rFaktor*100.0,t_pcGmdBerech,t_cStResult);
	}
	return true;
}
c_StCStObjektES.prototype.p_berechneSoBerEsGmd=function(t_iCalcTyp,t_iEsGrp,t_iEsBeguenst,t_cSt){
	var t_m=null;
	var t_b=null;
	var t_bOk=false;
	t_m=this.m__calc.m__stgmd.m__strgmd.p_getNatPersSoBerGmdMap(this.m__calc.m__strw,t_iCalcTyp,this.m__calc.m__stkt.p__gesetzjahr(),this.m__calc.m__grundlage.p__id_grp());
	if(t_m.p_Count()==0){
		return false;
	}
	var t_=t_m.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		t_b=object_downcast((t_o),c_StR_natPers_SoBerGmd);
		if(t_b.m__es_grp==t_iEsGrp && ((t_b.m__es_beguenst&t_iEsBeguenst)!=0)){
			if(this.p_berechneEsSteuerGmd(t_iCalcTyp,t_b,true,t_cSt)==true){
				t_bOk=true;
			}
		}
	}
	return t_bOk;
}
c_StCStObjektES.prototype.p_bestimmeVerwGrad=function(t_iES_Gruppe,t_iES_Beguenstigter){
	var t_iVerwGrad=4;
	var t_4=t_iES_Gruppe;
	if(t_4==c_StC_natPers.m_ES_GRP_EHEPARTNER){
		t_iVerwGrad=0;
	}else{
		if(t_4==c_StC_natPers.m_ES_GRP_KINDER){
			var t_5=t_iES_Beguenstigter;
			if(t_5==c_StC_natPers.m_ES_GRP_KINDER_KINDER || t_5==c_StC_natPers.m_ES_GRP_KINDER_NACHKOMMENKINDER || t_5==c_StC_natPers.m_ES_GRP_KINDER_VOLLWAISEN){
				t_iVerwGrad=2;
			}
		}else{
			if(t_4==c_StC_natPers.m_ES_GRP_ELTERN){
				var t_6=t_iES_Beguenstigter;
				if(t_6==c_StC_natPers.m_ES_GRP_ELTERN_ELTERN){
					t_iVerwGrad=1;
				}
			}else{
				if(t_4==c_StC_natPers.m_ES_GRP_GROSSELTERN){
					var t_7=t_iES_Beguenstigter;
					if(t_7==c_StC_natPers.m_ES_GRP_GROSSELTERN_GROSSELTERN || t_7==c_StC_natPers.m_ES_GRP_GROSSELTERN_URGROSSELTERN){
						t_iVerwGrad=1;
					}
				}else{
					if(t_4==c_StC_natPers.m_ES_GRP_GESCHWISTER){
						var t_8=t_iES_Beguenstigter;
						if(t_8==c_StC_natPers.m_ES_GRP_GESCHWISTER_GESCHWISTER){
							t_iVerwGrad=3;
						}
					}else{
						if(t_4==c_StC_natPers.m_ES_GRP_ONKELTANTEN){
							t_iVerwGrad=3;
						}
					}
				}
			}
		}
	}
	return t_iVerwGrad;
}
c_StCStObjektES.prototype.p_berechneEsGmd=function(t_cSt){
	var t_iTyp=this.m__calc.m__stgmd.p__es_basis();
	if(t_iTyp==c_StR_natPers.m_SoBerBasis_SONDERBERECHNUNG){
		if(this.p_berechneSoBerEsGmd(this.m__calctyp,this.m__calc.m__grundlage.m__es_gruppe,this.m__calc.m__grundlage.m__es_beguenstigter,t_cSt)){
			this.p_setInfo(c_StC_common.m_TaxLevel_GEMEINDE,c_StC_natPers_ES_INFO.m_REGEL,c_StC_natPers_ES_INFO.m_REGEL_EIGENE);
		}else{
			if(this.p_berechneSoBerEsGmd(c_StC_natPers.m_CalcTyp_ERB_UND_SCHENKSTEUER,this.m__calc.m__grundlage.m__es_gruppe,this.m__calc.m__grundlage.m__es_beguenstigter,t_cSt)){
				this.p_setInfo(c_StC_common.m_TaxLevel_GEMEINDE,c_StC_natPers_ES_INFO.m_REGEL,c_StC_natPers_ES_INFO.m_REGEL_EIGENE);
			}else{
				if(this.p_berechneSoBerEsGmd(this.m__calctyp,c_StC_natPers.m_ES_GRP_UEBRIGE,c_StC_natPers.m_ES_GRP_UEBRIGE_UEBRIGE,t_cSt)){
					this.p_setInfo(c_StC_common.m_TaxLevel_GEMEINDE,c_StC_natPers_ES_INFO.m_REGEL,c_StC_natPers_ES_INFO.m_REGEL_UEBRIGE);
				}else{
					if(this.p_berechneSoBerEsGmd(c_StC_natPers.m_CalcTyp_ERB_UND_SCHENKSTEUER,c_StC_natPers.m_ES_GRP_UEBRIGE,c_StC_natPers.m_ES_GRP_UEBRIGE_UEBRIGE,t_cSt)){
						this.p_setInfo(c_StC_common.m_TaxLevel_GEMEINDE,c_StC_natPers_ES_INFO.m_REGEL,c_StC_natPers_ES_INFO.m_REGEL_UEBRIGE);
					}
				}
			}
		}
	}else{
		if(t_iTyp==c_StR_natPers.m_SoBerBasis_AUF_EINF_STAATSSTEUER){
			var t_iVerwGrad=this.p_bestimmeVerwGrad(this.m__calc.m__grundlage.m__es_gruppe,this.m__calc.m__grundlage.m__es_beguenstigter);
			var t_rES_Stf=this.m__calc.m__stgmd.p_getESStFuss(t_iVerwGrad);
			t_cSt.m__steuer=this.m__st.p__level(c_StC_common.m_TaxLevel_KANTON).m__steuer;
			t_cSt.m__steuer=bb_utils_round2(t_cSt.m__steuer*t_rES_Stf/100.00,1.0);
			this.p_setInfo(c_StC_common.m_TaxLevel_GEMEINDE,c_StC_natPers_ES_INFO.m_REGEL,c_StC_natPers_ES_INFO.m_REGEL_EIGENE);
			if(bb_utils_isZero(t_rES_Stf,0)==true){
				this.p_setInfo(c_StC_common.m_TaxLevel_GEMEINDE,c_StC_natPers_ES_INFO.m_KEINESTEUERN,"1");
			}
		}else{
			if(t_iTyp==c_StR_natPers.m_SoBerBasis_AUF_EFF_STAATSSTEUER){
				var t_iVerwGrad2=this.p_bestimmeVerwGrad(this.m__calc.m__grundlage.m__es_gruppe,this.m__calc.m__grundlage.m__es_beguenstigter);
				var t_rES_Stf2=this.m__calc.m__stgmd.p_getESStFuss(t_iVerwGrad2);
				t_cSt.m__steuer=this.m__st.p__level(c_StC_common.m_TaxLevel_KANTON).m__steuer;
				t_cSt.m__steuer=bb_utils_round2(t_cSt.m__steuer*t_rES_Stf2/100.00,1.0);
				this.p_setInfo(c_StC_common.m_TaxLevel_GEMEINDE,c_StC_natPers_ES_INFO.m_REGEL,c_StC_natPers_ES_INFO.m_REGEL_EIGENE);
				if(bb_utils_isZero(t_rES_Stf2,0)==true){
					this.p_setInfo(c_StC_common.m_TaxLevel_GEMEINDE,c_StC_natPers_ES_INFO.m_KEINESTEUERN,"1");
				}
			}
		}
	}
}
c_StCStObjektES.prototype.p_calcSpezifisch=function(){
	this.m__infos.p_clear();
	this.p_setInfo(c_StC_common.m_TaxLevel_KANTON,c_StC_natPers_ES_INFO.m_REGEL,c_StC_natPers_ES_INFO.m_REGEL_UNDEF);
	this.p_setInfo(c_StC_common.m_TaxLevel_GEMEINDE,c_StC_natPers_ES_INFO.m_REGEL,c_StC_natPers_ES_INFO.m_REGEL_UNDEF);
	this.p_berechneEsKt(this.m__st.p__level(c_StC_common.m_TaxLevel_KANTON));
	this.p_berechneEsGmd(this.m__st.p__level(c_StC_common.m_TaxLevel_GEMEINDE));
}
function c_StC_natPers_Steuern(){
	Object.call(this);
	this.m__levels=c_IntMap3.m_new.call(new c_IntMap3);
}
c_StC_natPers_Steuern.m_new=function(){
	return this;
}
c_StC_natPers_Steuern.prototype.p_clear=function(){
	this.m__levels.p_Clear();
}
c_StC_natPers_Steuern.prototype.p_steuer_not_rounded=function(){
	var t_=this.m__levels.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		var t_p=object_downcast((t_o),c_StC_natPers_StLevel);
		t_p.p_steuer_not_rounded();
	}
}
c_StC_natPers_Steuern.prototype.p_rundeAlles=function(t_c){
	var t_=this.m__levels.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		var t_p=object_downcast((t_o),c_StC_natPers_StLevel);
		t_p.p_rundeAlles(t_c);
	}
}
c_StC_natPers_Steuern.prototype.p__level=function(t_iLvl){
	var t_o=null;
	t_o=this.m__levels.p_Get3(t_iLvl);
	if(t_o==null){
		t_o=(c_StC_natPers_StLevel.m_new.call(new c_StC_natPers_StLevel));
		this.m__levels.p_Add2(t_iLvl,t_o);
	}
	return object_downcast((t_o),c_StC_natPers_StLevel);
}
function c_MapValues2(){
	Object.call(this);
	this.m_map=null;
}
c_MapValues2.m_new=function(t_map){
	this.m_map=t_map;
	return this;
}
c_MapValues2.m_new2=function(){
	return this;
}
c_MapValues2.prototype.p_ObjectEnumerator=function(){
	return c_ValueEnumerator2.m_new.call(new c_ValueEnumerator2,this.m_map.p_FirstNode());
}
function c_ValueEnumerator2(){
	Object.call(this);
	this.m_node=null;
}
c_ValueEnumerator2.m_new=function(t_node){
	this.m_node=t_node;
	return this;
}
c_ValueEnumerator2.m_new2=function(){
	return this;
}
c_ValueEnumerator2.prototype.p_HasNext=function(){
	return this.m_node!=null;
}
c_ValueEnumerator2.prototype.p_NextObject=function(){
	var t_t=this.m_node;
	this.m_node=this.m_node.p_NextNode();
	return t_t.m_value;
}
function c_StC_natPers_StLevel(){
	c_StCBasis.call(this);
	this.m__steuer=.0;
	this.m__steuer_not_rounded=.0;
	this.m__einfsteuer=.0;
	this.m__steuersatz=.0;
	this.m__satzbestimmend=.0;
	this.m__steuerbar=.0;
}
c_StC_natPers_StLevel.prototype=extend_class(c_StCBasis);
c_StC_natPers_StLevel.prototype.p_steuer_not_rounded=function(){
	this.m__steuer_not_rounded=this.m__steuer;
}
c_StC_natPers_StLevel.prototype.p_rundeAlles=function(t_c){
	this.m__steuer=t_c.p_rundeWert(this.m__steuer);
	this.m__einfsteuer=t_c.p_rundeWert(this.m__einfsteuer);
	this.m__steuersatz=c_StCBasisRechner.m_runden(this.m__steuersatz,0.0001,c_StC_common.m_Runden_NORMAL);
}
c_StC_natPers_StLevel.m_new=function(){
	c_StCBasis.m_new.call(this);
	return this;
}
c_StC_natPers_StLevel.prototype.p_set=function(t_src){
	this.m__steuersatz=t_src.m__steuersatz;
	this.m__satzbestimmend=t_src.m__satzbestimmend;
	this.m__steuerbar=t_src.m__steuerbar;
	this.m__einfsteuer=t_src.m__einfsteuer;
	this.m__steuer=t_src.m__steuer;
	this.m__steuer_not_rounded=t_src.m__steuer_not_rounded;
}
function c_S3aZhlg(){
	Object.call(this);
	this.m__e=0;
	this.m__enet=.0;
}
c_S3aZhlg.m_new=function(t_einlage,t_nettoeinlage){
	this.m__e=t_einlage;
	this.m__enet=t_nettoeinlage;
	return this;
}
c_S3aZhlg.m_new2=function(){
	return this;
}
function c_S3aStandJahr(){
	Object.call(this);
	this.m__jahr=0;
	this.m__aeinsp=.0;
	this.m__eeinsp=.0;
	this.m__astand=.0;
	this.m__estand=.0;
	this.m__jinvest=.0;
	this.m__jzins=.0;
	this.m__zinsen=.0;
	this.m__invest=.0;
}
c_S3aStandJahr.m_new=function(t_j,t_ae,t_ee){
	this.m__jahr=t_j;
	this.m__aeinsp=t_ae;
	this.m__eeinsp=t_ee;
	return this;
}
c_S3aStandJahr.m_new2=function(){
	return this;
}
function c_StC_natPers_Kapital(){
	c_StCBasis.call(this);
	this.m__typ=0;
	this.m__stbKap=.0;
	this.m__endalter=0;
	this.m__satzbKap=.0;
	this.m__h_auszgrund=0;
	this.m__beginn=c_Date.m_new.call(new c_Date);
	this.m__laufzeit=0;
	this.m__h_vorsorge=c_IntMap4.m_new.call(new c_IntMap4);
}
c_StC_natPers_Kapital.prototype=extend_class(c_StCBasis);
c_StC_natPers_Kapital.m_new=function(t_iTyp){
	c_StCBasis.m_new.call(this);
	this.m__typ=t_iTyp;
	return this;
}
c_StC_natPers_Kapital.m_new2=function(){
	c_StCBasis.m_new.call(this);
	this.m__typ=-1;
	return this;
}
c_StC_natPers_Kapital.prototype.p_matchCalcTyp=function(t_iCalcTyp){
	if(t_iCalcTyp==c_StC_natPers.m_CalcTyp_STEUER_SAUELE_2A3A){
		if(this.m__typ==c_StC_natPers.m_Kapital_SAEULE_2A || this.m__typ==c_StC_natPers.m_Kapital_SAEULE_3A){
			return true;
		}
	}else{
		if(t_iCalcTyp==c_StC_natPers.m_CalcTyp_STEUER_SAUELE_3B){
			if(this.m__typ==c_StC_natPers.m_Kapital_SAEULE_3BEE || this.m__typ==c_StC_natPers.m_Kapital_SAEULE_3B){
				return true;
			}
		}
	}
	return false;
}
c_StC_natPers_Kapital.prototype.p__auszgrund=function(t_i){
	this.m__h_auszgrund=c_StR_natPers.m_AuszhlgGrund_UNBEKANNT;
	var t_12=t_i;
	if(t_12==c_StC_natPers.m_AuszhlgGrund_PENSIONIERUNG){
		this.m__h_auszgrund=c_StR_natPers.m_AuszhlgGrund_PENSIONIERUNG;
	}else{
		if(t_12==c_StC_natPers.m_AuszhlgGrund_WOHNEIGENTUMSFOERDERUNG){
			this.m__h_auszgrund=c_StR_natPers.m_AuszhlgGrund_WOHNEIGENTUMSFOERDERUNG;
		}else{
			if(t_12==c_StC_natPers.m_AuszhlgGrund_VORZEITIGE_AUSZAHLUNG){
				this.m__h_auszgrund=c_StR_natPers.m_AuszhlgGrund_VORZEITIGE_AUSZAHLUNG;
			}else{
				if(t_12==c_StC_natPers.m_AuszhlgGrund_INFOLGE_TOD_ODER_INVALIDITAET){
					this.m__h_auszgrund=c_StR_natPers.m_AuszhlgGrund_INFOLGE_TOD_ODER_INVALIDITAET;
				}
			}
		}
	}
}
c_StC_natPers_Kapital.prototype.p__auszgrund2=function(){
	return this.m__h_auszgrund;
}
c_StC_natPers_Kapital.prototype.p_setVorsorge=function(t_iLvl){
	if(this.m__typ==c_StC_natPers.m_Kapital_SAEULE_3BEE || this.m__typ==c_StC_natPers.m_Kapital_SAEULE_3B){
		this.m__h_vorsorge.p_Add4(t_iLvl,true);
	}
}
function bb_utils_intersect(t_x1,t_y1,t_x2,t_y2,t_x3){
	var t_m=.0;
	var t_h=.0;
	if(t_x1==t_x2){
		return (t_y1+t_y2)/2.0;
	}
	t_m=(t_y2-t_y1)/(t_x2-t_x1);
	if(t_x1!=0.0){
		t_h=t_y1-t_m*t_x1;
	}else{
		t_h=t_y2-t_m*t_x2;
	}
	return t_m*t_x3+t_h;
}
function c_PrecautionCalculatorV2(){
	Object.call(this);
	this.m_land=null;
	this.m_mpcUmfeld=null;
	this.m_miEhejahr=0;
	this.m_meRunden=0;
	this.m_s1_edited=new_bool_array(2);
	this.m_s2_edited=new_bool_array(2);
	this.m_s1_netto=new_bool_array(2);
	this.m_s2_netto=new_bool_array(2);
	this.m_s1_adult=new_number_array(2);
	this.m_s1_child=new_number_array(2);
	this.m_s2_adult=new_number_array(2);
	this.m_s2_child=new_number_array(2);
	this.m_uvg_hp=false;
	this.m_uvg_lp=false;
	this.m_mpcAHVRechner=null;
	this.m_mpcUVGRechner=null;
	this.m_mpcBVGRechner=null;
	this.implments={c_Loggable:1};
}
c_PrecautionCalculatorV2.m_new=function(t_currentYear,t_union,t_marriageYear,t_scenario,t_rounding,t_base){
	if(t_base!=null){
		this.m_land=t_base;
	}else{
		this.m_land=(c_LawbaseCH.m_new.call(new c_LawbaseCH));
	}
	this.m_mpcUmfeld=c_Umfeld.m_new.call(new c_Umfeld,this.m_land);
	this.m_mpcUmfeld.m_mdBerechnung.p_setDate2(t_currentYear);
	this.m_mpcUmfeld.m_miWartefrist=2;
	this.m_mpcUmfeld.m_meBeziehung=t_union;
	this.m_mpcUmfeld.m_meSzenario=t_scenario;
	if(t_union==1){
		this.m_mpcUmfeld.p_addPerson();
	}else{
		this.m_mpcUmfeld.p_addPerson();
		this.m_mpcUmfeld.p_addPerson();
	}
	this.m_miEhejahr=t_marriageYear;
	this.m_meRunden=t_rounding;
	for(var t_i=0;t_i<2;t_i=t_i+1){
		this.m_s1_edited[t_i]=false;
		this.m_s2_edited[t_i]=false;
		this.m_s1_netto[t_i]=false;
		this.m_s2_netto[t_i]=false;
		this.m_s1_adult[t_i]=0.0;
		this.m_s1_child[t_i]=0.0;
		this.m_s2_adult[t_i]=0.0;
		this.m_s2_child[t_i]=0.0;
	}
	return this;
}
c_PrecautionCalculatorV2.m_new2=function(){
	return this;
}
c_PrecautionCalculatorV2.prototype.p_roundEK=function(t_x){
	return bb_utils_roundYearly(t_x,this.m_meRunden);
}
c_PrecautionCalculatorV2.prototype.p_setPerson=function(t_p,t_gender,t_birthYear,t_income,t_with_uvg){
	var t_person=this.m_mpcUmfeld.p_getPerson(t_p);
	if(t_person==null){
		return;
	}
	var t_newBirthYear=t_birthYear-1;
	var t_newBirthMonth=12;
	if(t_birthYear<9999){
		t_person.m_mdGeburtsdatum.p_setDate(1,t_newBirthMonth,t_newBirthYear);
		t_person.m_mdZivildatum.p_setDate(1,t_newBirthMonth,t_newBirthYear+18);
		t_person.m_mdEinreisedatum.p_setDate(1,t_newBirthMonth,t_newBirthYear);
	}else{
		t_person.m_mdGeburtsdatum.p_setDate2(t_birthYear);
		t_person.m_mdZivildatum.p_setDate2(t_birthYear);
		t_person.m_mdEinreisedatum.p_setDate2(t_birthYear);
	}
	t_person.m_meGeschlecht=t_gender;
	t_person.m_mdPensionsdatum=bb_ahv_werte_getPensionsdatum(this.m_land,t_gender,t_person.m_mdGeburtsdatum);
	t_person.m_mdErwerbsaufgabe.p_setDate3(t_person.m_mdPensionsdatum);
	t_person.m_mrEinkommen=bb_utils_roundYearly(t_income,this.m_meRunden);
	if(t_income<1.0){
		t_person.m_meErwerbsart=4;
	}else{
		t_person.m_meErwerbsart=1;
	}
	var t_1=this.m_mpcUmfeld.m_meBeziehung;
	if(t_1==1){
		t_person.m_meZivilstand=1;
	}else{
		if(t_1==2){
			t_person.m_meZivilstand=2;
		}else{
			if(t_1==3){
				t_person.m_meZivilstand=1;
			}else{
				if(t_1==4){
					t_person.m_meZivilstand=7;
				}
			}
		}
	}
	if(this.m_mpcUmfeld.m_meBeziehung==2 || this.m_mpcUmfeld.m_meBeziehung==4){
		if(t_birthYear<9999){
			t_person.m_mdZivildatum.p_setDate(1,t_newBirthMonth,this.m_miEhejahr);
		}else{
			t_person.m_mdZivildatum.p_setDate2(this.m_miEhejahr);
		}
	}
	t_person.m_mrUVGEinkommen=this.p_roundEK(t_income);
	t_person.m_mrUVGAnteil1=1.0;
	t_person.m_mrUVGAnteil2=0.0;
	t_person.m_mrUVGAnteil3=0.0;
	if(t_person.m_mrUVGEinkommen>bb_uvg_werte_getMaxUVGLohn(this.m_land)){
		t_person.m_mrUVGEinkommen=bb_uvg_werte_getMaxUVGLohn(this.m_land);
	}
	if(t_p==0){
		this.m_uvg_hp=t_with_uvg;
	}else{
		this.m_uvg_lp=t_with_uvg;
	}
}
c_PrecautionCalculatorV2.prototype.p_setChildren=function(t_p,t_children,t_students){
	var t_kind=null;
	var t_k=0;
	for(t_k=0;t_k<t_children;t_k=t_k+1){
		t_kind=this.m_mpcUmfeld.p_addKind();
		if(t_k<t_students){
			t_kind.m_mdGeburtsdatum.p_setDate(1,1,this.m_mpcUmfeld.m_mdBerechnung.p_getYear()-t_k-1);
			t_kind.m_meHaushalt=3;
		}else{
			t_kind.m_mdGeburtsdatum.p_setDate(1,1,this.m_mpcUmfeld.m_mdBerechnung.p_getYear()-t_k-25);
			t_kind.m_meHaushalt=4;
		}
		t_kind.m_mdAusbildungsende.p_setDate3(t_kind.m_mdGeburtsdatum);
		t_kind.m_mdAusbildungsende.p_addYears(18);
		t_kind.m_mdAusbildungsende.p_setLastOfPrevMonth();
		if(this.m_mpcUmfeld.m_meBeziehung==1 || t_p==0){
			t_kind.m_meZugehoerigkeit=1;
		}else{
			t_kind.m_meZugehoerigkeit=2;
		}
	}
}
c_PrecautionCalculatorV2.prototype.p_setAHVmode=function(t_p,t_mode,t_adult_pension,t_child_pension){
	var t_person=this.m_mpcUmfeld.p_getPerson(t_p);
	if(t_person==null){
		return;
	}
	t_person.m_mbDurchschnitt=false;
	t_person.m_mbIKErfassung=false;
	t_person.m_miErstesBeitragsjahr=t_person.m_mdGeburtsdatum.p_getYear()+21;
	this.m_s1_edited[t_p]=false;
	this.m_s1_netto[t_p]=false;
	this.m_s1_adult[t_p]=t_adult_pension;
	this.m_s1_child[t_p]=t_child_pension;
	if(t_mode==9 || t_mode==10){
		t_mode=1;
		this.m_s1_edited[t_p]=true;
	}
	if(t_mode==10){
		this.m_s1_netto[t_p]=true;
	}
	if(t_mode==1){
		t_person.m_mbDurchgehend=true;
		t_person.m_mbDurchschnitt=true;
		t_person.m_mrDurchschnittsEK=0.0;
	}else{
		if(t_mode==2){
			t_person.m_mbDurchgehend=true;
			t_person.m_mbDurchschnitt=true;
			t_person.m_mrDurchschnittsEK=200000.0;
		}else{
			if(t_mode==4){
				t_person.m_mbDurchgehend=true;
				t_person.m_mbDurchschnitt=true;
				t_person.m_mrDurchschnittsEK=-1.0;
			}else{
				t_person.p_erzeugeAHVLohnkurve(this.m_land,this.m_mpcUmfeld.m_mdBerechnung);
				t_person.m_mbIKErfassung=true;
				t_person.m_mbDurchschnitt=false;
				t_person.m_mrDurchschnittsEK=bb_utils_roundYearly(t_person.m_mrDurchschnittsEK,this.m_meRunden);
			}
		}
	}
	if(t_mode!=7){
		t_person.m_mbNettofehljahre=true;
	}
}
c_PrecautionCalculatorV2.prototype.p_setBVGlimit=function(t_p,t_limit,t_adult_pension,t_child_pension){
	var t_person=this.m_mpcUmfeld.p_getPerson(t_p);
	if(t_person==null){
		return;
	}
	this.m_s2_edited[t_p]=false;
	this.m_s2_netto[t_p]=false;
	this.m_s2_adult[t_p]=t_adult_pension;
	this.m_s2_child[t_p]=t_child_pension;
	if(t_limit==4 || t_limit==5){
		this.m_s2_edited[t_p]=!this.m_mpcUmfeld.p_istUnfall();
		if(t_limit==5){
			this.m_s2_netto[t_p]=!this.m_mpcUmfeld.p_istUnfall();
		}
		if(t_adult_pension==0.0 && t_child_pension==0.0){
			this.m_s2_edited[t_p]=true;
		}
		t_limit=1;
	}
	if(this.m_mpcUmfeld.p_istUnfall()){
		t_limit=1;
	}
	t_person.m_meBVGLohn=t_limit;
	t_person.m_mrTeuerung=1.0;
	t_person.p_erzeugeBVGLohnkurve(this.m_land,this.m_mpcUmfeld.m_mdBerechnung,0.0,0.0,true);
}
c_PrecautionCalculatorV2.prototype.p_validScenario=function(){
	var t_person=null;
	var t_partner=null;
	var t_heute=0;
	var t_pension=0;
	var t_frist=0;
	var t_marge=0;
	t_heute=this.m_mpcUmfeld.m_mdBerechnung.p_getYear();
	t_marge=1;
	if(this.m_mpcUmfeld.p_istEU()){
		t_frist=2;
	}else{
		t_frist=0;
	}
	if(this.m_mpcUmfeld.p_istHP()){
		t_person=this.m_mpcUmfeld.p_getPerson(0);
		t_partner=this.m_mpcUmfeld.p_getPerson(1);
	}else{
		t_person=this.m_mpcUmfeld.p_getPerson(1);
		t_partner=this.m_mpcUmfeld.p_getPerson(0);
	}
	t_pension=t_person.m_mdPensionsdatum.p_getYear();
	if(t_pension<=t_heute+t_frist+t_marge){
		return false;
	}
	if(t_partner!=null){
		t_pension=t_partner.m_mdPensionsdatum.p_getYear();
		if(t_pension<=t_heute+t_frist+t_marge){
			return false;
		}
	}
	if(this.m_mpcUmfeld.p_istTod() && t_partner==null && this.m_mpcUmfeld.m_maKinder.p_size()==0){
		return false;
	}
	return true;
}
c_PrecautionCalculatorV2.prototype.p_setS1Renten=function(t_p){
	if(this.m_mpcUmfeld.p_istEU()){
		this.m_mpcUmfeld.p_ueberschreibe(t_p,2,false,this.m_s1_adult[t_p]);
		this.m_mpcUmfeld.p_ueberschreibe(t_p,2,true,this.m_s1_child[t_p]);
	}else{
		this.m_mpcUmfeld.p_ueberschreibe(t_p,1,false,this.m_s1_adult[t_p]);
		this.m_mpcUmfeld.p_ueberschreibe(t_p,1,true,this.m_s1_child[t_p]);
	}
	this.m_mpcAHVRechner.p_setRechner(t_p,11,true);
}
c_PrecautionCalculatorV2.prototype.p_setS2Renten=function(t_p){
	this.m_mpcUmfeld.p_ueberschreibe(t_p,4,false,this.m_s2_adult[t_p]);
	this.m_mpcUmfeld.p_ueberschreibe(t_p,4,true,this.m_s2_child[t_p]);
}
c_PrecautionCalculatorV2.prototype.p_calculateAll=function(){
	this.m_mpcUmfeld.p_setRechner(0,5,this.p_validScenario());
	this.m_mpcUmfeld.p_setRechner(1,5,this.p_validScenario());
	this.m_mpcUmfeld.p_setRechner(0,7,this.m_uvg_hp && this.p_validScenario());
	this.m_mpcUmfeld.p_setRechner(1,7,this.m_uvg_lp && this.p_validScenario());
	this.m_mpcUmfeld.p_setRechner(0,2,!this.m_s1_netto[0] && this.p_validScenario());
	this.m_mpcUmfeld.p_setRechner(1,2,!this.m_s1_netto[1] && this.p_validScenario());
	this.m_mpcUmfeld.p_setRechner(0,6,!this.m_s2_netto[0] && this.p_validScenario());
	this.m_mpcUmfeld.p_setRechner(1,6,!this.m_s2_netto[1] && this.p_validScenario());
	this.m_mpcUmfeld.p_initialize();
	this.m_mpcAHVRechner=c_AHVKuerzung.m_new.call(new c_AHVKuerzung,this.m_mpcUmfeld);
	this.m_mpcUVGRechner=c_UVGKuerzung.m_new.call(new c_UVGKuerzung,this.m_mpcUmfeld);
	this.m_mpcBVGRechner=c_BVGKuerzung.m_new.call(new c_BVGKuerzung,this.m_mpcUmfeld);
	if(this.p_validScenario()){
		this.m_mpcBVGRechner.m_mbBVGExtra[0]=this.m_s2_edited[0];
		this.m_mpcBVGRechner.m_mbBVGExtra[1]=this.m_s2_edited[1];
		this.m_mpcAHVRechner.p_berechneLeistungen();
		this.m_mpcUVGRechner.p_berechneLeistungen();
		this.m_mpcBVGRechner.p_berechneLeistungen();
		for(var t_i=0;t_i<2;t_i=t_i+1){
			if(this.m_s1_edited[t_i]){
				this.p_setS1Renten(t_i);
			}
			if(this.m_s2_edited[t_i]){
				this.p_setS2Renten(t_i);
			}
		}
	}
	this.m_mpcUmfeld.p_berechnePerioden();
	if(this.p_validScenario()){
		this.m_mpcAHVRechner.p_berechneKuerzungen();
		this.m_mpcUVGRechner.p_berechneKuerzungen();
		this.m_mpcBVGRechner.p_berechneKuerzungen();
	}
}
c_PrecautionCalculatorV2.prototype.p_getErwerb=function(t_p){
	var t_person=this.m_mpcUmfeld.p_getPerson(t_p);
	if(t_person!=null){
		return t_person.m_mrEinkommen;
	}else{
		return 0.0;
	}
}
c_PrecautionCalculatorV2.prototype.p_getDetailliert=function(t_p,t_vart,t_child,t_raw){
	return this.m_mpcUmfeld.p_getDetailliert(t_p,t_vart,t_child,t_raw);
}
c_PrecautionCalculatorV2.prototype.p_getAbfindung=function(t_p,t_vart){
	return this.m_mpcUmfeld.p_getAbfindung(t_p,t_vart);
}
c_PrecautionCalculatorV2.prototype.p_getAltersrenten=function(t_p,t_saeule,t_vart,t_fall){
	return this.m_mpcUmfeld.p_getAltersrenten(t_p,t_saeule,t_vart,t_fall);
}
c_PrecautionCalculatorV2.prototype.p_getAltersrenten2=function(t_p,t_vart){
	return this.m_mpcUmfeld.p_getAltersrenten(t_p,0,t_vart,-1);
}
c_PrecautionCalculatorV2.prototype.p_getGruende=function(t_p,t_vart,t_child){
	return this.m_mpcUmfeld.p_getGruende(t_p,t_vart,t_child);
}
c_PrecautionCalculatorV2.prototype.p_getBeginn=function(){
	return this.m_mpcUmfeld.m_mpcZeitachse.m_mdBeginn;
}
c_PrecautionCalculatorV2.prototype.p_getAblauf=function(){
	return this.m_mpcUmfeld.m_mpcZeitachse.m_mdAblauf;
}
c_PrecautionCalculatorV2.prototype.p_getMitte=function(){
	return this.m_mpcUmfeld.m_mpcZeitachse.m_mdMitte;
}
function c_PrecautionAnalyserV2(){
	Object.call(this);
	this.m_rechner=null;
	this.m_erwerb_hp=.0;
	this.m_erwerb_lp=.0;
	this.m_bedarf_pz=.0;
	this.m_rente_ahv=.0;
	this.m_rente_iv=.0;
	this.m_rente_bvg=.0;
	this.m_rente_uvg=.0;
	this.m_rente_zusatz=.0;
	this.m_rente_privat=.0;
	this.m_abfindung_bvg=.0;
	this.m_abfindung_uvg=.0;
	this.m_rente_ahv1_hp=.0;
	this.m_rente_ahv1_lp=.0;
	this.m_rente_ahv2_hp=.0;
	this.m_rente_ahv2_lp=.0;
	this.m_rente_bvg_hp=.0;
	this.m_rente_bvg_lp=.0;
	this.m_kind_ahv=.0;
	this.m_kind_iv=.0;
	this.m_kind_bvg=.0;
	this.m_kind_uvg=.0;
	this.m_raw_rente_ahv=.0;
	this.m_raw_rente_iv=.0;
	this.m_raw_rente_bvg=.0;
	this.m_raw_rente_uvg=.0;
	this.m_raw_rente_uvgz=.0;
	this.m_raw_kind_ahv=.0;
	this.m_raw_kind_iv=.0;
	this.m_raw_kind_bvg=.0;
	this.m_raw_kind_uvg=.0;
	this.m_grund_zusatz=0;
	this.m_grund_subsid=0;
	this.m_bedarf=.0;
	this.m_erwerb=.0;
	this.m_partner=.0;
	this.m_deckung=.0;
	this.m_luecke=.0;
	this.m_zuviel=.0;
	this.m_kapital=.0;
	this.m_kinder=false;
	this.m_abfindung=.0;
	this.m_grund_rente_ahv=[];
	this.m_grund_rente_iv=[];
	this.m_grund_rente_bvg=[];
	this.m_grund_rente_uvg=[];
	this.m_grund_kind_ahv=[];
	this.m_grund_kind_iv=[];
	this.m_grund_kind_bvg=[];
	this.m_grund_kind_uvg=[];
	this.m_monate=0;
	this.m_jahre=0;
	this.m_spardauer=0;
	this.m_monate1=0;
	this.m_monate2=0;
	this.implments={c_Loggable:1};
}
c_PrecautionAnalyserV2.prototype.p_roundEK=function(t_x){
	return bb_utils_roundYearly(t_x,this.m_rechner.m_meRunden);
}
c_PrecautionAnalyserV2.prototype.p_istLP=function(){
	return this.m_rechner.m_mpcUmfeld.p_istLP();
}
c_PrecautionAnalyserV2.prototype.p_istErl=function(){
	return this.m_rechner.m_mpcUmfeld.p_istPension();
}
c_PrecautionAnalyserV2.prototype.p_istHP=function(){
	return this.m_rechner.m_mpcUmfeld.p_istHP();
}
c_PrecautionAnalyserV2.prototype.p_getMonate=function(t_von,t_bis){
	if(t_von.p_afterOrSame(t_bis)){
		return 0;
	}
	var t_y0=t_von.p_getYear();
	var t_y1=t_bis.p_getYear();
	var t_m0=t_von.p_getMonth();
	var t_m1=t_bis.p_getMonth();
	var t_anzahl=0;
	if(t_y0==t_y1){
		t_anzahl=t_m1-t_m0+1;
	}else{
		t_anzahl=13-t_m0+t_m1;
	}
	if(t_y1-t_y0>1){
		t_anzahl+=12*(t_y1-t_y0-1);
	}
	return t_anzahl;
}
c_PrecautionAnalyserV2.prototype.p_istEU=function(){
	return this.m_rechner.m_mpcUmfeld.p_istEU();
}
c_PrecautionAnalyserV2.prototype.p_getPaidIncome=function(){
	if(this.p_istHP()){
		return this.p_roundEK(this.m_erwerb_lp);
	}else{
		return this.p_roundEK(this.m_erwerb_hp);
	}
}
c_PrecautionAnalyserV2.prototype.p_getCoverage=function(){
	var t_deckung=0.0;
	t_deckung=this.m_rente_ahv+this.m_rente_bvg+this.m_rente_iv+this.m_rente_uvg+this.m_rente_zusatz+this.m_rente_privat;
	t_deckung+=this.m_kind_ahv+this.m_kind_iv+this.m_kind_bvg+this.m_kind_uvg;
	t_deckung+=this.p_getPaidIncome();
	return this.p_roundEK(t_deckung);
}
c_PrecautionAnalyserV2.prototype.p_getPensionGap=function(){
	var t_luecke=this.m_bedarf-this.p_getCoverage();
	if(t_luecke<0.0){
		t_luecke=0.0;
	}
	return this.p_roundEK(t_luecke);
}
c_PrecautionAnalyserV2.prototype.p_getPensionExcess=function(){
	var t_ueberschuss=this.p_getCoverage()-this.m_bedarf;
	if(t_ueberschuss<0.0){
		t_ueberschuss=0.0;
	}
	return this.p_roundEK(t_ueberschuss);
}
c_PrecautionAnalyserV2.prototype.p_roundVM=function(t_x){
	return bb_utils_roundUnique(t_x,this.m_rechner.m_meRunden);
}
c_PrecautionAnalyserV2.prototype.p_getCapitalGap=function(t_luecke,t_gain){
	if(t_luecke<100.0){
		return 0.0;
	}
	if(this.m_jahre<1){
		return 0.0;
	}
	if(t_gain<=0.0){
		return this.p_roundVM(t_luecke*(this.m_jahre));
	}
	var t_q=1.0+t_gain/100.0;
	var t_qm=Math.pow(t_q,(this.m_jahre));
	var t_qm1=t_qm-1.0;
	var t_q1=t_gain/100.0;
	var t_kapital=t_luecke*t_qm1/t_q1/t_qm;
	return this.p_roundVM(t_kapital);
}
c_PrecautionAnalyserV2.m_new=function(t_calculator,t_need_value,t_complement,t_pillar3,t_gruende){
	this.m_rechner=t_calculator;
	this.m_erwerb_hp=this.p_roundEK(this.m_rechner.p_getErwerb(0));
	this.m_erwerb_lp=this.p_roundEK(this.m_rechner.p_getErwerb(1));
	this.m_bedarf_pz=t_need_value;
	this.m_rente_ahv=0.0;
	this.m_rente_iv=0.0;
	this.m_rente_bvg=0.0;
	this.m_rente_uvg=0.0;
	this.m_rente_zusatz=0.0;
	this.m_rente_privat=t_pillar3;
	this.m_abfindung_bvg=0.0;
	this.m_abfindung_uvg=0.0;
	this.m_rente_ahv=0.0;
	this.m_rente_iv=0.0;
	this.m_rente_bvg=0.0;
	this.m_rente_uvg=0.0;
	this.m_rente_ahv1_hp=0.0;
	this.m_rente_ahv1_lp=0.0;
	this.m_rente_ahv2_hp=0.0;
	this.m_rente_ahv2_lp=0.0;
	this.m_rente_bvg_hp=0.0;
	this.m_rente_bvg_lp=0.0;
	this.m_kind_ahv=0.0;
	this.m_kind_iv=0.0;
	this.m_kind_bvg=0.0;
	this.m_kind_uvg=0.0;
	this.m_raw_rente_ahv=0.0;
	this.m_raw_rente_iv=0.0;
	this.m_raw_rente_bvg=0.0;
	this.m_raw_rente_uvg=0.0;
	this.m_raw_rente_uvgz=t_complement;
	this.m_raw_kind_ahv=0.0;
	this.m_raw_kind_iv=0.0;
	this.m_raw_kind_bvg=0.0;
	this.m_raw_kind_uvg=0.0;
	this.m_grund_zusatz=0;
	this.m_grund_subsid=0;
	this.m_bedarf=0.0;
	this.m_erwerb=0.0;
	this.m_partner=0.0;
	this.m_deckung=0.0;
	this.m_luecke=0.0;
	this.m_zuviel=0.0;
	this.m_kapital=0.0;
	if(this.m_rechner.m_mpcUmfeld.m_meSzenario!=4 && this.m_rechner.m_mpcUmfeld.m_meSzenario!=9){
		this.m_raw_rente_uvgz=0.0;
	}
	if(!this.m_rechner.p_validScenario()){
		this.m_rente_privat=0.0;
		this.m_raw_rente_uvgz=0.0;
		return this;
	}
	var t_ADULT=false;
	var t_CHILD=true;
	var t_p=0;
	if(this.p_istLP()){
		t_p=1;
	}
	this.m_kinder=this.m_rechner.m_mpcUmfeld.p_getNbKinder()>0;
	this.m_rente_ahv=this.p_roundEK(this.m_rechner.p_getDetailliert(t_p,1,t_ADULT,false));
	this.m_rente_iv=this.p_roundEK(this.m_rechner.p_getDetailliert(t_p,2,t_ADULT,false));
	this.m_rente_bvg=this.p_roundEK(this.m_rechner.p_getDetailliert(t_p,4,t_ADULT,false));
	this.m_rente_uvg=this.p_roundEK(this.m_rechner.p_getDetailliert(t_p,3,t_ADULT,false));
	this.m_abfindung_bvg=this.p_roundEK(this.m_rechner.p_getAbfindung(t_p,4));
	this.m_abfindung_uvg=this.p_roundEK(this.m_rechner.p_getAbfindung(t_p,3));
	this.m_abfindung=this.m_abfindung_bvg+this.m_abfindung_uvg;
	if(this.m_kinder){
		this.m_kind_ahv=this.p_roundEK(this.m_rechner.p_getDetailliert(t_p,1,t_CHILD,false));
		this.m_kind_iv=this.p_roundEK(this.m_rechner.p_getDetailliert(t_p,2,t_CHILD,false));
		this.m_kind_bvg=this.p_roundEK(this.m_rechner.p_getDetailliert(t_p,4,t_CHILD,false));
		this.m_kind_uvg=this.p_roundEK(this.m_rechner.p_getDetailliert(t_p,3,t_CHILD,false));
	}
	if(this.p_istErl()){
		this.m_rente_ahv1_hp=this.p_roundEK(this.m_rechner.p_getAltersrenten(0,0,1,1));
		this.m_rente_ahv1_lp=this.p_roundEK(this.m_rechner.p_getAltersrenten(1,0,1,1));
		this.m_rente_ahv2_hp=this.p_roundEK(this.m_rechner.p_getAltersrenten(0,0,1,2));
		this.m_rente_ahv2_lp=this.p_roundEK(this.m_rechner.p_getAltersrenten(1,0,1,2));
		this.m_rente_bvg_hp=this.p_roundEK(this.m_rechner.p_getAltersrenten2(0,4));
		this.m_rente_bvg_lp=this.p_roundEK(this.m_rechner.p_getAltersrenten2(1,4));
	}
	if(t_gruende){
		this.m_grund_rente_ahv=this.m_rechner.p_getGruende(t_p,1,t_ADULT);
		this.m_grund_rente_iv=this.m_rechner.p_getGruende(t_p,2,t_ADULT);
		this.m_grund_rente_bvg=this.m_rechner.p_getGruende(t_p,4,t_ADULT);
		this.m_grund_rente_uvg=this.m_rechner.p_getGruende(t_p,3,t_ADULT);
		if(this.m_kinder){
			this.m_grund_kind_ahv=this.m_rechner.p_getGruende(t_p,1,t_CHILD);
			this.m_grund_kind_iv=this.m_rechner.p_getGruende(t_p,2,t_CHILD);
			this.m_grund_kind_bvg=this.m_rechner.p_getGruende(t_p,4,t_CHILD);
			this.m_grund_kind_uvg=this.m_rechner.p_getGruende(t_p,3,t_CHILD);
		}
	}
	this.m_raw_rente_ahv=this.p_roundEK(this.m_rechner.p_getDetailliert(t_p,1,t_ADULT,true));
	this.m_raw_rente_iv=this.p_roundEK(this.m_rechner.p_getDetailliert(t_p,2,t_ADULT,true));
	this.m_raw_rente_bvg=this.p_roundEK(this.m_rechner.p_getDetailliert(t_p,4,t_ADULT,true));
	this.m_raw_rente_uvg=this.p_roundEK(this.m_rechner.p_getDetailliert(t_p,3,t_ADULT,true));
	if(this.m_kinder){
		this.m_raw_kind_ahv=this.p_roundEK(this.m_rechner.p_getDetailliert(t_p,1,t_CHILD,true));
		this.m_raw_kind_iv=this.p_roundEK(this.m_rechner.p_getDetailliert(t_p,2,t_CHILD,true));
		this.m_raw_kind_bvg=this.p_roundEK(this.m_rechner.p_getDetailliert(t_p,4,t_CHILD,true));
		this.m_raw_kind_uvg=this.p_roundEK(this.m_rechner.p_getDetailliert(t_p,3,t_CHILD,true));
	}
	if(this.m_raw_rente_uvgz>0.0){
		this.m_deckung=this.m_rente_ahv+this.m_rente_iv+this.m_rente_uvg;
		this.m_deckung+=this.m_kind_ahv+this.m_kind_iv+this.m_kind_uvg;
		this.m_deckung=this.p_roundEK(this.m_deckung);
		var t_grenze=.0;
		if(this.p_istHP()){
			t_grenze=this.p_roundEK(0.9*this.m_erwerb_hp);
		}else{
			t_grenze=this.p_roundEK(0.9*this.m_erwerb_lp);
		}
		if(this.m_deckung>=t_grenze){
			this.m_rente_zusatz=0.0;
			this.m_grund_zusatz=61;
		}else{
			if(this.m_deckung+this.m_raw_rente_uvgz>t_grenze){
				this.m_rente_zusatz=t_grenze-this.m_deckung;
				this.m_grund_zusatz=60;
			}else{
				this.m_rente_zusatz=this.m_raw_rente_uvgz;
				this.m_grund_zusatz=62;
			}
		}
		if(this.m_rente_bvg>0.0 || this.m_kind_bvg>0.0){
			this.m_deckung+=this.m_rente_zusatz;
			if(this.m_deckung>=t_grenze){
				this.m_rente_bvg=0.0;
				this.m_kind_bvg=0.0;
				this.m_grund_subsid=53;
			}else{
				if(this.m_deckung+this.m_rente_bvg+this.m_kind_bvg>t_grenze){
					if(this.m_deckung+this.m_rente_bvg>=t_grenze){
						this.m_kind_bvg=0.0;
						this.m_rente_bvg=t_grenze-this.m_deckung;
						this.m_grund_subsid=52;
					}else{
						this.m_kind_bvg=t_grenze-this.m_deckung;
						this.m_grund_subsid=52;
					}
				}
			}
		}
	}
	var t_beginn=this.m_rechner.p_getBeginn();
	var t_ablauf=this.m_rechner.p_getAblauf();
	var t_mitte=this.m_rechner.p_getMitte();
	this.m_monate=this.p_getMonate(t_beginn,t_ablauf);
	this.m_jahre=((bb_utils_round((this.m_monate)/12.0))|0);
	this.m_spardauer=0;
	if(t_mitte.p_isValid()){
		this.m_monate1=this.p_getMonate(t_beginn,t_mitte)-1;
		this.m_monate2=this.p_getMonate(t_mitte,t_ablauf);
	}else{
		this.m_monate1=this.m_monate;
		this.m_monate2=0;
	}
	if(this.p_istEU()){
		this.m_jahre-=2;
	}else{
		if(this.p_istErl()){
			this.m_spardauer=this.p_getMonate(this.m_rechner.m_mpcUmfeld.m_mdBerechnung,t_beginn);
			this.m_spardauer=((bb_utils_round((this.m_spardauer)/12.0))|0);
		}
	}
	if(t_need_value<200.0){
		this.m_bedarf=(this.m_erwerb_hp+this.m_erwerb_lp)*t_need_value/100.0;
	}else{
		this.m_bedarf=t_need_value;
	}
	this.m_bedarf=this.p_roundEK(this.m_bedarf);
	this.m_erwerb=this.m_erwerb_hp+this.m_erwerb_lp;
	this.m_partner=this.p_getPaidIncome();
	this.m_deckung=this.p_getCoverage();
	this.m_luecke=this.p_getPensionGap();
	this.m_zuviel=this.p_getPensionExcess();
	this.m_kapital=this.p_getCapitalGap(this.m_luecke,0.0);
	return this;
}
c_PrecautionAnalyserV2.m_new2=function(){
	return this;
}
function c_Umfeld(){
	Object.call(this);
	this.m_land=null;
	this.m_meBeziehung=0;
	this.m_meSzenario=0;
	this.m_miWartefrist=0;
	this.m_mdBerechnung=null;
	this.m_mpcZeitachse=null;
	this.m_maPersonen=null;
	this.m_maKinder=null;
	this.m_mdOrdDatum=new_object_array(2);
	this.m_mdErlDatum=new_object_array(2);
	this.m_mdInvDatum=new_object_array(2);
	this.m_mdTodDatum=new_object_array(2);
	this.m_mbInvUnfall=new_bool_array(2);
	this.m_mbTodUnfall=new_bool_array(2);
	this.m_mbAHVLeistung=new_bool_array(2);
	this.m_mbAHVKuerzung=new_bool_array(2);
	this.m_mbIVLeistung=new_bool_array(2);
	this.m_mbIVKuerzung=new_bool_array(2);
	this.m_mbBVGLeistung=new_bool_array(2);
	this.m_mbBVGKuerzung=new_bool_array(2);
	this.m_mbUVGLeistung=new_bool_array(2);
	this.m_mbUVGKuerzung=new_bool_array(2);
	this.m_mbLFZLeistung=new_bool_array(2);
	this.m_mbLFZKuerzung=new_bool_array(2);
	this.m_mbMaxEinkommen=new_bool_array(2);
	this.m_mbBVGExtra=new_bool_array(2);
	this.implments={c_Loggable:1};
}
c_Umfeld.m_new=function(t_land){
	this.m_land=t_land;
	this.m_meBeziehung=1;
	this.m_meSzenario=1;
	this.m_miWartefrist=2;
	this.m_mdBerechnung=c_Date.m_new.call(new c_Date);
	this.m_mpcZeitachse=c_Zeitachse.m_new.call(new c_Zeitachse);
	this.m_maPersonen=c_VPerson.m_new.call(new c_VPerson);
	this.m_maKinder=c_VKind.m_new.call(new c_VKind);
	for(var t_i=0;t_i<2;t_i=t_i+1){
		this.m_mdOrdDatum[t_i]=c_Date.m_new.call(new c_Date);
		this.m_mdErlDatum[t_i]=c_Date.m_new.call(new c_Date);
		this.m_mdInvDatum[t_i]=c_Date.m_new.call(new c_Date);
		this.m_mdTodDatum[t_i]=c_Date.m_new.call(new c_Date);
		this.m_mbInvUnfall[t_i]=false;
		this.m_mbTodUnfall[t_i]=false;
		this.m_mbAHVLeistung[t_i]=true;
		this.m_mbAHVKuerzung[t_i]=true;
		this.m_mbIVLeistung[t_i]=true;
		this.m_mbIVKuerzung[t_i]=true;
		this.m_mbBVGLeistung[t_i]=false;
		this.m_mbBVGKuerzung[t_i]=true;
		this.m_mbUVGLeistung[t_i]=true;
		this.m_mbUVGKuerzung[t_i]=true;
		this.m_mbLFZLeistung[t_i]=false;
		this.m_mbLFZKuerzung[t_i]=true;
		this.m_mbMaxEinkommen[t_i]=false;
		this.m_mbBVGExtra[t_i]=false;
	}
	return this;
}
c_Umfeld.m_new2=function(t_src){
	this.m_land=t_src.m_land;
	this.m_meBeziehung=t_src.m_meBeziehung;
	this.m_meSzenario=t_src.m_meSzenario;
	this.m_miWartefrist=t_src.m_miWartefrist;
	this.m_mdBerechnung=t_src.m_mdBerechnung;
	this.m_mpcZeitachse=t_src.m_mpcZeitachse;
	this.m_maPersonen=t_src.m_maPersonen;
	this.m_maKinder=t_src.m_maKinder;
	for(var t_i=0;t_i<2;t_i=t_i+1){
		this.m_mdOrdDatum[t_i]=t_src.m_mdOrdDatum[t_i];
		this.m_mdErlDatum[t_i]=t_src.m_mdErlDatum[t_i];
		this.m_mdInvDatum[t_i]=t_src.m_mdInvDatum[t_i];
		this.m_mdTodDatum[t_i]=t_src.m_mdTodDatum[t_i];
		this.m_mbInvUnfall[t_i]=t_src.m_mbInvUnfall[t_i];
		this.m_mbTodUnfall[t_i]=t_src.m_mbTodUnfall[t_i];
		this.m_mbAHVLeistung[t_i]=t_src.m_mbAHVLeistung[t_i];
		this.m_mbAHVKuerzung[t_i]=t_src.m_mbAHVKuerzung[t_i];
		this.m_mbIVLeistung[t_i]=t_src.m_mbIVLeistung[t_i];
		this.m_mbIVKuerzung[t_i]=t_src.m_mbIVKuerzung[t_i];
		this.m_mbBVGLeistung[t_i]=t_src.m_mbBVGLeistung[t_i];
		this.m_mbBVGKuerzung[t_i]=t_src.m_mbBVGKuerzung[t_i];
		this.m_mbUVGLeistung[t_i]=t_src.m_mbUVGLeistung[t_i];
		this.m_mbUVGKuerzung[t_i]=t_src.m_mbUVGKuerzung[t_i];
		this.m_mbLFZLeistung[t_i]=t_src.m_mbLFZLeistung[t_i];
		this.m_mbLFZKuerzung[t_i]=t_src.m_mbLFZKuerzung[t_i];
		this.m_mbMaxEinkommen[t_i]=t_src.m_mbMaxEinkommen[t_i];
		this.m_mbBVGExtra[t_i]=t_src.m_mbBVGExtra[t_i];
	}
	return this;
}
c_Umfeld.m_new3=function(){
	return this;
}
c_Umfeld.prototype.p_addPerson=function(){
	var t_person=c_Person.m_new.call(new c_Person);
	this.m_maPersonen.p_add7(t_person);
	return t_person;
}
c_Umfeld.prototype.p_getPerson=function(t_p){
	return this.m_maPersonen.p_get(t_p);
}
c_Umfeld.prototype.p_addKind=function(){
	var t_kind=c_Kind.m_new.call(new c_Kind);
	t_kind.m_miReferenz=this.m_maKinder.p_size()+2;
	this.m_maKinder.p_add8(t_kind);
	return t_kind;
}
c_Umfeld.prototype.p_istUnfall=function(){
	return this.m_meSzenario==4 || this.m_meSzenario==9 || this.m_meSzenario==6 || this.m_meSzenario==11;
}
c_Umfeld.prototype.p_istEU=function(){
	return this.m_meSzenario==3 || this.m_meSzenario==4 || this.m_meSzenario==8 || this.m_meSzenario==9;
}
c_Umfeld.prototype.p_istHP=function(){
	return this.m_meSzenario==1 || this.m_meSzenario==2 || this.m_meSzenario==3 || this.m_meSzenario==4 || this.m_meSzenario==5 || this.m_meSzenario==6;
}
c_Umfeld.prototype.p_istTod=function(){
	return this.m_meSzenario==5 || this.m_meSzenario==6 || this.m_meSzenario==10 || this.m_meSzenario==11;
}
c_Umfeld.prototype.p_setRechner=function(t_p,t_rechner,t_an){
	var t_2=t_rechner;
	if(t_2==1){
		this.m_mbAHVLeistung[t_p]=t_an;
	}else{
		if(t_2==2){
			this.m_mbAHVKuerzung[t_p]=t_an;
		}else{
			if(t_2==3){
				this.m_mbIVLeistung[t_p]=t_an;
			}else{
				if(t_2==4){
					this.m_mbIVKuerzung[t_p]=t_an;
				}else{
					if(t_2==5){
						this.m_mbBVGLeistung[t_p]=t_an;
					}else{
						if(t_2==6){
							this.m_mbBVGKuerzung[t_p]=t_an;
						}else{
							if(t_2==7){
								this.m_mbUVGLeistung[t_p]=t_an;
							}else{
								if(t_2==8){
									this.m_mbUVGKuerzung[t_p]=t_an;
								}else{
									if(t_2==9){
										this.m_mbLFZLeistung[t_p]=t_an;
									}else{
										if(t_2==10){
											this.m_mbLFZKuerzung[t_p]=t_an;
										}else{
											if(t_2==11){
												this.m_mbMaxEinkommen[t_p]=t_an;
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
}
c_Umfeld.prototype.p_getNbPersonen=function(){
	return this.m_maPersonen.p_size();
}
c_Umfeld.prototype.p_initialize=function(){
	this.m_mdBerechnung.p_setFirstOfMonth();
	if(this.m_miWartefrist<1){
		this.m_miWartefrist=1;
	}else{
		if(this.m_miWartefrist>2){
			this.m_miWartefrist=2;
		}
	}
	var t_datum=null;
	var t_person=null;
	var t_kind=null;
	var t_i=0;
	for(t_i=0;t_i<this.p_getNbPersonen();t_i=t_i+1){
		t_person=this.p_getPerson(t_i);
		t_person.p_initialize2(this.m_land);
		t_datum=bb_ahv_werte_getPensionsdatum(this.m_land,t_person.m_meGeschlecht,t_person.m_mdGeburtsdatum);
		this.m_mdOrdDatum[t_i].p_setDate3(t_datum);
		this.m_mdErlDatum[t_i].p_setDate3(t_datum);
	}
	var t_=this.m_maKinder.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		t_kind=t_.p_NextObject();
		t_kind.p_initialize();
	}
	this.m_maKinder.p_sort();
	var t_ereignis=c_Date.m_new.call(new c_Date);
	t_ereignis.p_setDate3(this.m_mdBerechnung);
	t_ereignis.p_setFirstOfNextMonth();
	if(this.m_meSzenario==1 || this.m_meSzenario==2){
		t_person=this.p_getPerson(0);
		this.m_mdErlDatum[0].p_setDate3(t_person.m_mdPensionsdatum);
	}
	t_person=this.p_getPerson(1);
	if(t_person!=null){
		if(this.m_meSzenario==1 || this.m_meSzenario==7){
			t_person=this.p_getPerson(1);
			this.m_mdErlDatum[1].p_setDate3(t_person.m_mdPensionsdatum);
		}
	}
	var t_1=this.m_meSzenario;
	if(t_1==3){
		this.m_mdInvDatum[0].p_setDate3(t_ereignis);
		this.m_mbInvUnfall[0]=false;
	}else{
		if(t_1==4){
			this.m_mdInvDatum[0].p_setDate3(t_ereignis);
			this.m_mbInvUnfall[0]=true;
		}else{
			if(t_1==5){
				this.m_mdTodDatum[0].p_setDate3(t_ereignis);
				this.m_mbTodUnfall[0]=false;
			}else{
				if(t_1==6){
					this.m_mdTodDatum[0].p_setDate3(t_ereignis);
					this.m_mbTodUnfall[0]=true;
				}else{
					if(t_1==8){
						this.m_mdInvDatum[1].p_setDate3(t_ereignis);
						this.m_mbInvUnfall[1]=false;
					}else{
						if(t_1==9){
							this.m_mdInvDatum[1].p_setDate3(t_ereignis);
							this.m_mbInvUnfall[1]=true;
						}else{
							if(t_1==10){
								this.m_mdTodDatum[1].p_setDate3(t_ereignis);
								this.m_mbTodUnfall[1]=false;
							}else{
								if(t_1==11){
									this.m_mdTodDatum[1].p_setDate3(t_ereignis);
									this.m_mbTodUnfall[1]=true;
								}
							}
						}
					}
				}
			}
		}
	}
}
c_Umfeld.prototype.p_istGebunden=function(){
	return this.m_meBeziehung==2 || this.m_meBeziehung==4;
}
c_Umfeld.prototype.p_istTodNachPension=function(){
	return this.m_meSzenario==12 || this.m_meSzenario==13 || this.m_meSzenario==14 || this.m_meSzenario==15;
}
c_Umfeld.prototype.p_mitPartner=function(){
	return this.m_maPersonen.p_size()>1;
}
c_Umfeld.prototype.p_getNbKinder=function(){
	return this.m_maKinder.p_size();
}
c_Umfeld.prototype.p_addLeistung=function(){
	var t_leistung=c_Leistung.m_new.call(new c_Leistung);
	t_leistung.m_miReferenz=this.m_mpcZeitachse.m_maLeistungen.p_size();
	this.m_mpcZeitachse.m_maLeistungen.p_add5(t_leistung);
	return t_leistung;
}
c_Umfeld.prototype.p_addLeistung2=function(t_leistung){
	t_leistung.m_miReferenz=this.m_mpcZeitachse.m_maLeistungen.p_size();
	this.m_mpcZeitachse.m_maLeistungen.p_add5(t_leistung);
}
c_Umfeld.prototype.p_istLiechtenstein=function(){
	return this.m_land.p_liechtenstein();
}
c_Umfeld.prototype.p_istTodWitwe45=function(){
	return this.m_meSzenario==14 || this.m_meSzenario==15;
}
c_Umfeld.prototype.p_istPartnerschaft=function(){
	return this.m_meBeziehung==4;
}
c_Umfeld.prototype.p_istAlleine=function(){
	return this.m_meBeziehung==1;
}
c_Umfeld.prototype.p_istKonkubinat=function(){
	return this.m_meBeziehung==3;
}
c_Umfeld.prototype.p_istVerheiratet=function(){
	return this.m_meBeziehung==2;
}
c_Umfeld.prototype.p_ueberschreibe=function(t_p,t_vart,t_kind,t_betrag){
	var t_leistung=null;
	var t_=this.m_mpcZeitachse.m_maLeistungen.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		t_leistung=t_.p_NextObject();
		if(t_leistung.m_miVersichert==t_p && t_leistung.m_meVersicherungsart==t_vart && t_leistung.p_istKinderrente()==t_kind){
			t_leistung.m_mrBetrag=t_betrag;
		}
	}
}
c_Umfeld.prototype.p_ueberschreibe2=function(t_p,t_vart,t_lart,t_splitting,t_betrag){
	if(t_vart==1 && t_lart==2){
		var t_person=this.p_getPerson(t_p);
		if(t_splitting){
			t_person.m_mrAHVflexSplit=t_betrag;
		}else{
			t_person.m_mrAHVflexEigen=t_betrag;
		}
	}
	var t_leistung=null;
	var t_=this.m_mpcZeitachse.m_maLeistungen.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		t_leistung=t_.p_NextObject();
		if(t_leistung.m_miVersichert==t_p && t_leistung.m_meVersicherungsart==t_vart && t_leistung.m_meLeistungsart==t_lart && t_leistung.m_mbSplitting==t_splitting){
			t_leistung.m_mrBetrag=t_betrag;
		}
	}
}
c_Umfeld.prototype.p_istPension=function(){
	return this.m_meSzenario==1 || this.m_meSzenario==2 || this.m_meSzenario==7;
}
c_Umfeld.prototype.p_istRisiko=function(){
	return !this.p_istPension();
}
c_Umfeld.prototype.p_setzePension=function(){
	var t_person=null;
	var t_i=0;
	var t_=this.m_maPersonen.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		t_person=t_.p_NextObject();
		this.m_mpcZeitachse.p_addDatum(t_person.m_mdErwerbsaufgabe);
		this.m_mpcZeitachse.p_addDatum(t_person.m_mdPensionsdatum);
		this.m_mpcZeitachse.p_addDatum(this.m_mdOrdDatum[t_i]);
		t_i+=1;
	}
}
c_Umfeld.prototype.p_berechnePerioden=function(){
	var t_dMin=c_Date.m_new.call(new c_Date);
	var t_dMax=c_Date.m_new.call(new c_Date);
	var t_dMid=c_Date.m_new.call(new c_Date);
	var t_hp=this.p_getPerson(0);
	var t_lp=this.p_getPerson(1);
	if(this.p_istRisiko()){
		t_dMin.p_setDate3(this.m_mdBerechnung);
		t_dMin.p_setFirstOfNextMonth();
		if(this.p_istAlleine()){
			if(this.p_istEU()){
				t_dMax.p_setDate3(this.m_mdOrdDatum[0]);
			}else{
				t_dMax.p_setDate3(t_dMin);
				t_dMax.p_addYears(10);
			}
		}else{
			if(this.p_istEU()){
				if(this.p_istHP()){
					t_dMax.p_setDate3(this.m_mdOrdDatum[0]);
				}else{
					t_dMax.p_setDate3(this.m_mdOrdDatum[1]);
				}
			}else{
				if(this.p_istHP()){
					t_dMax.p_setDate3(this.m_mdOrdDatum[1]);
				}else{
					t_dMax.p_setDate3(this.m_mdOrdDatum[0]);
				}
			}
		}
	}else{
		if(this.p_istAlleine()){
			t_dMin.p_setDate3(this.m_mdErlDatum[0]);
			t_dMax.p_setRoundedDateAt(88,t_hp.m_mdGeburtsdatum);
		}else{
			if(this.m_mdErlDatum[0].p_beforeOrSame(this.m_mdErlDatum[1])){
				t_dMin.p_setDate3(this.m_mdErlDatum[0]);
				t_dMid.p_setDate3(this.m_mdErlDatum[1]);
				t_dMax.p_setRoundedDateAt(88,t_lp.m_mdGeburtsdatum);
			}else{
				t_dMin.p_setDate3(this.m_mdErlDatum[1]);
				t_dMid.p_setDate3(this.m_mdErlDatum[0]);
				t_dMax.p_setRoundedDateAt(88,t_hp.m_mdGeburtsdatum);
			}
		}
	}
	if(t_dMin.p_afterOrSame(t_dMax)){
		t_dMax.p_setDate3(t_dMin);
		t_dMax.p_addYears(10);
	}
	this.m_mpcZeitachse.p_setBereich(t_dMin,t_dMax,t_dMid);
	if(this.p_istPension()){
		this.p_setzePension();
	}
	this.m_mpcZeitachse.p_berechnePerioden();
}
c_Umfeld.prototype.p_istLP=function(){
	return this.m_meSzenario==1 || this.m_meSzenario==7 || this.m_meSzenario==8 || this.m_meSzenario==9 || this.m_meSzenario==10 || this.m_meSzenario==11;
}
c_Umfeld.prototype.p_getDetailliert=function(t_p,t_vart,t_kind,t_ungekuerzt){
	var t_periode=null;
	var t_element=null;
	var t_messung=null;
	var t_renten=.0;
	t_messung=c_Date.m_new.call(new c_Date);
	t_renten=0.0;
	if(this.p_istPension()){
		if(this.p_istAlleine()){
			t_messung.p_setDate3(this.p_getPerson(0).m_mdPensionsdatum);
		}else{
			if(t_p==0){
				t_messung.p_setDate3(this.p_getPerson(0).m_mdPensionsdatum);
			}else{
				t_messung.p_setDate3(this.p_getPerson(1).m_mdPensionsdatum);
			}
		}
	}else{
		if(this.m_mdInvDatum[0].p_isValid()){
			t_messung.p_setDate3(this.m_mdInvDatum[0]);
			t_messung.p_addYears(this.m_miWartefrist);
		}else{
			if(this.m_mdTodDatum[0].p_isValid()){
				t_messung.p_setDate3(this.m_mdTodDatum[0]);
			}else{
				if(this.p_mitPartner() && this.m_mdInvDatum[1].p_isValid()){
					t_messung.p_setDate3(this.m_mdInvDatum[1]);
					t_messung.p_addYears(this.m_miWartefrist);
				}else{
					if(this.p_mitPartner() && this.m_mdTodDatum[1].p_isValid()){
						t_messung.p_setDate3(this.m_mdTodDatum[1]);
					}else{
						return 0.0;
					}
				}
			}
		}
	}
	var t_=this.m_mpcZeitachse.m_maPerioden.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		t_periode=t_.p_NextObject();
		if(t_periode.m_mdBeginn.p_same(t_messung)){
			var t_2=t_periode.m_maElemente.p_ObjectEnumerator();
			while(t_2.p_HasNext()){
				t_element=t_2.p_NextObject();
				var t_leistung=t_element.m_mpcLeistung;
				if(t_leistung.m_miVersichert==t_p && t_leistung.m_meVersicherungsart==t_vart && t_leistung.m_meLeistungsart!=65 && t_leistung.p_istKinderrente()==t_kind){
					if(t_ungekuerzt){
						t_renten=t_leistung.m_mrBetrag;
					}else{
						t_renten+=t_element.p_getNettoBetrag();
					}
				}
			}
			break;
		}else{
			if(t_periode.m_mdBeginn.p_after(t_messung)){
				break;
			}
		}
	}
	return t_renten;
}
c_Umfeld.prototype.p_getAbfindung=function(t_p,t_vart){
	var t_periode=null;
	var t_element=null;
	var t_=this.m_mpcZeitachse.m_maPerioden.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		t_periode=t_.p_NextObject();
		var t_2=t_periode.m_maElemente.p_ObjectEnumerator();
		while(t_2.p_HasNext()){
			t_element=t_2.p_NextObject();
			var t_leistung=t_element.m_mpcLeistung;
			if(t_leistung.m_miVersichert==t_p && t_leistung.m_meVersicherungsart==t_vart && t_leistung.m_meLeistungsart==65){
				return t_element.p_getNettoBetrag();
			}
		}
	}
	return 0.0;
}
c_Umfeld.prototype.p_getAltersrenten=function(t_person,t_saeule,t_vart,t_fall){
	var t_periode=null;
	var t_element=null;
	var t_messung=null;
	var t_renten=.0;
	var t_per=0;
	if(this.p_istAlleine() && t_fall==2){
		return 0.0;
	}
	if(this.p_istAlleine() && t_person!=0){
		return 0.0;
	}
	t_renten=0.0;
	if(t_fall==-1){
		t_per=this.m_mpcZeitachse.p_getNbPerioden()-1;
		t_periode=this.m_mpcZeitachse.p_getPeriode(t_per);
		var t_=t_periode.m_maElemente.p_ObjectEnumerator();
		while(t_.p_HasNext()){
			t_element=t_.p_NextObject();
			if(t_element.m_mpcLeistung.m_miVersichert!=t_person){
				continue;
			}
			if(t_saeule>0){
				if(t_element.m_mpcLeistung.p_getSaeule()==t_saeule){
					t_renten+=t_element.p_getNettoBetrag();
				}
			}else{
				if(t_vart==t_element.m_mpcLeistung.m_meVersicherungsart){
					t_renten+=t_element.p_getNettoBetrag();
				}
			}
		}
		return t_renten;
	}
	t_messung=c_Date.m_new.call(new c_Date);
	if(this.p_istAlleine()){
		t_messung.p_setDate3(this.p_getPerson(0).m_mdPensionsdatum);
	}else{
		if(t_fall==1){
			if(this.p_getPerson(0).m_mdPensionsdatum.p_beforeOrSame(this.p_getPerson(1).m_mdPensionsdatum)){
				t_messung.p_setDate3(this.p_getPerson(0).m_mdPensionsdatum);
			}else{
				t_messung.p_setDate3(this.p_getPerson(1).m_mdPensionsdatum);
			}
		}else{
			if(t_fall==2){
				if(this.p_getPerson(0).m_mdPensionsdatum.p_beforeOrSame(this.p_getPerson(1).m_mdPensionsdatum)){
					t_messung.p_setDate3(this.p_getPerson(1).m_mdPensionsdatum);
				}else{
					t_messung.p_setDate3(this.p_getPerson(0).m_mdPensionsdatum);
				}
			}
		}
	}
	var t_2=this.m_mpcZeitachse.m_maPerioden.p_ObjectEnumerator();
	while(t_2.p_HasNext()){
		t_periode=t_2.p_NextObject();
		if(t_periode.m_mdBeginn.p_same(t_messung)){
			var t_3=t_periode.m_maElemente.p_ObjectEnumerator();
			while(t_3.p_HasNext()){
				t_element=t_3.p_NextObject();
				if(t_element.m_mpcLeistung.m_miVersichert!=t_person){
					continue;
				}
				if(t_saeule>0){
					if(t_element.m_mpcLeistung.p_getSaeule()==t_saeule){
						t_renten+=t_element.p_getNettoBetrag();
					}
				}else{
					if(t_vart==t_element.m_mpcLeistung.m_meVersicherungsart){
						t_renten+=t_element.p_getNettoBetrag();
					}
				}
			}
			break;
		}else{
			if(t_periode.m_mdBeginn.p_after(t_messung)){
				break;
			}
		}
	}
	return t_renten;
}
c_Umfeld.prototype.p_getGruende=function(t_p,t_vart,t_kind){
	var t_periode=null;
	var t_element=null;
	var t_messung=null;
	var t_gruende=new_number_array(20);
	var t_grund=null;
	var t_anzahl=0;
	var t_i=0;
	t_messung=c_Date.m_new.call(new c_Date);
	if(this.m_mdInvDatum[0].p_isValid()){
		t_messung.p_setDate3(this.m_mdInvDatum[0]);
		t_messung.p_addYears(this.m_miWartefrist);
	}else{
		if(this.m_mdTodDatum[0].p_isValid()){
			t_messung.p_setDate3(this.m_mdTodDatum[0]);
		}else{
			if(this.p_mitPartner() && this.m_mdInvDatum[1].p_isValid()){
				t_messung.p_setDate3(this.m_mdInvDatum[1]);
				t_messung.p_addYears(this.m_miWartefrist);
			}else{
				if(this.p_mitPartner() && this.m_mdTodDatum[1].p_isValid()){
					t_messung.p_setDate3(this.m_mdTodDatum[1]);
				}else{
					return resize_number_array(t_gruende,0);
				}
			}
		}
	}
	var t_=this.m_mpcZeitachse.m_maPerioden.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		t_periode=t_.p_NextObject();
		if(t_periode.m_mdBeginn.p_same(t_messung)){
			var t_2=t_periode.m_maElemente.p_ObjectEnumerator();
			while(t_2.p_HasNext()){
				t_element=t_2.p_NextObject();
				var t_leistung=t_element.m_mpcLeistung;
				if(t_leistung.m_miVersichert==t_p && t_leistung.m_meVersicherungsart==t_vart && t_leistung.m_meLeistungsart!=65 && t_leistung.p_istKinderrente()==t_kind){
					var t_3=t_element.m_maGruende.p_ObjectEnumerator();
					while(t_3.p_HasNext()){
						t_grund=t_3.p_NextObject();
						if(t_grund.m_miType>1){
							for(t_i=0;t_i<t_anzahl;t_i=t_i+1){
								if(t_gruende[t_i]==t_grund.m_miType){
									break;
								}
							}
						}
						if(t_i==t_anzahl && t_anzahl<20){
							t_gruende[t_anzahl]=t_grund.m_miType;
							t_anzahl+=1;
						}
					}
				}
			}
			break;
		}else{
			if(t_periode.m_mdBeginn.p_after(t_messung)){
				break;
			}
		}
	}
	return resize_number_array(t_gruende,t_anzahl);
}
function c_Date(){
	Object.call(this);
	this.m_day=0;
	this.m_month=0;
	this.m_year=0;
}
c_Date.m_new=function(){
	this.m_day=0;
	this.m_month=0;
	this.m_year=0;
	return this;
}
c_Date.prototype.p_setDate=function(t_d,t_m,t_y){
	this.m_day=t_d;
	this.m_month=t_m;
	this.m_year=t_y;
}
c_Date.prototype.p_setDate2=function(t_f){
	if(t_f<9999){
		this.m_day=1;
		this.m_month=1;
		this.m_year=t_f;
	}else{
		if(t_f<999999){
			var t_mmORyy=((t_f/10000)|0);
			if(t_mmORyy>12){
				this.m_day=1;
				this.m_month=t_f % 100;
				this.m_year=((t_f/100)|0);
			}else{
				this.m_day=1;
				this.m_month=((t_f/10000)|0);
				this.m_year=t_f % 10000;
			}
		}else{
			var t_mmORyy2=((t_f/100)|0) % 100;
			if(t_mmORyy2<=12){
				this.m_day=t_f % 100;
				this.m_month=((t_f/100)|0) % 100;
				this.m_year=((t_f/10000)|0);
			}else{
				this.m_day=((t_f/1000000)|0);
				this.m_month=((t_f/10000)|0) % 100;
				this.m_year=t_f % 10000;
			}
		}
	}
}
c_Date.prototype.p_setUndefined=function(){
	this.m_day=0;
	this.m_month=0;
	this.m_year=0;
}
c_Date.prototype.p_setDate3=function(t_src){
	if(t_src==null){
		this.p_setUndefined();
	}else{
		this.m_day=t_src.m_day;
		this.m_month=t_src.m_month;
		this.m_year=t_src.m_year;
	}
}
c_Date.m_new2=function(t_d,t_m,t_y){
	this.p_setDate(t_d,t_m,t_y);
	return this;
}
c_Date.m_new3=function(t_s){
	var t_aTok=[];
	t_aTok=t_s.split(".");
	if(t_aTok.length==3){
		this.m_day=parseInt((t_aTok[0]),10);
		this.m_month=parseInt((t_aTok[1]),10);
		this.m_year=parseInt((t_aTok[2]),10);
	}else{
		this.p_setUndefined();
	}
	return this;
}
c_Date.m_new4=function(t_src){
	this.p_setDate3(t_src);
	return this;
}
c_Date.m_new5=function(t_f){
	this.p_setDate2(t_f);
	return this;
}
c_Date.prototype.p_getYear=function(){
	return this.m_year;
}
c_Date.prototype.p_getMonth=function(){
	return this.m_month;
}
c_Date.prototype.p_isValid=function(){
	return this.m_day>=1 && this.m_day<=31 && this.m_month>=1 && this.m_month<=12 && this.m_year>=1900 && this.m_year<=2200;
}
c_Date.prototype.p_isLeapYear=function(){
	if(this.m_year>=1582){
		if(this.m_year % 4==0 && this.m_year % 100!=0 || this.m_year % 400==0){
			return true;
		}
	}else{
		if(this.m_year % 4==0){
			return true;
		}
	}
	return false;
}
c_Date.prototype.p_daysInMonth=function(){
	if(this.m_month<1 || this.m_month>12){
		return 0;
	}
	var t_lastDay=[31,28,31,30,31,30,31,31,30,31,30,31];
	var t_dim=t_lastDay[this.m_month-1];
	if(this.m_month==2 && this.p_isLeapYear()){
		t_dim+=1;
	}
	return t_dim;
}
c_Date.prototype.p_addMonths=function(t_m){
	if(this.p_isValid()){
		this.m_month+=t_m;
		while(this.m_month<1){
			this.m_month+=12;
			this.m_year-=1;
		}
		while(this.m_month>12){
			this.m_month-=12;
			this.m_year+=1;
		}
		if(this.m_day>=28){
			this.m_day=this.p_daysInMonth();
		}
	}
}
c_Date.prototype.p_setLastOfMonth=function(){
	if(this.p_isValid()){
		this.m_day=this.p_daysInMonth();
	}
}
c_Date.prototype.p_addYears=function(t_y){
	if(this.p_isValid()){
		this.m_year+=t_y;
		if(this.m_day>=28){
			this.p_setLastOfMonth();
		}
	}
}
c_Date.prototype.p_setLastOfPrevMonth=function(){
	if(this.p_isValid()){
		this.p_addMonths(-1);
		this.p_setLastOfMonth();
	}
}
c_Date.prototype.p_notValid=function(){
	return !this.p_isValid();
}
c_Date.prototype.p_getRoundedAgeAt=function(t_date){
	if(this.p_notValid() || t_date.p_notValid()){
		return 0;
	}
	var t_bmonth=this.m_month+1;
	var t_byear=this.m_year;
	if(t_bmonth>12){
		t_bmonth=1;
		t_byear+=1;
	}
	var t_age=t_date.p_getYear()-t_byear;
	if(t_date.p_getMonth()>=t_bmonth){
		return t_age;
	}
	return t_age-1;
}
c_Date.prototype.p_setFirstOfMonth=function(){
	if(this.p_isValid()){
		this.m_day=1;
	}
}
c_Date.prototype.p_setFirstOfNextMonth=function(){
	if(this.p_isValid()){
		this.m_day=1;
		this.m_month+=1;
		if(this.m_month==13){
			this.m_month=1;
			this.m_year+=1;
		}
	}
}
c_Date.prototype.p_getAsCalendar=function(){
	var t_a=0;
	var t_b=0;
	var t_work_day=this.m_day;
	var t_work_month=this.m_month;
	var t_work_year=this.m_year;
	if(t_work_year<0){
		t_work_year+=1;
	}
	if(t_work_month<=2){
		t_work_year-=1;
		t_work_month+=12;
	}
	if((t_work_year)*10000.0+(t_work_month)*100.0+(t_work_day)>=15821015.0){
		t_a=((t_work_year/100)|0);
		t_b=2-t_a+((t_a/4)|0);
	}
	var t_julian=((365.25*(t_work_year))|0)+((30.6001*(t_work_month+1))|0)+t_work_day+1720994+t_b;
	return t_julian;
}
c_Date.prototype.p_getDaysFromOrigin=function(){
	if(this.p_isValid()){
		return this.p_getAsCalendar();
	}
	return 0;
}
c_Date.prototype.p_after=function(t_date){
	if(this.p_notValid() || t_date==null || t_date.p_notValid()){
		return false;
	}
	var t_d0=this.p_getDaysFromOrigin();
	var t_d1=t_date.p_getDaysFromOrigin();
	return t_d0>t_d1;
}
c_Date.prototype.p_getDay=function(){
	return this.m_day;
}
c_Date.prototype.p_same=function(t_date){
	if(this.p_notValid() || t_date==null || t_date.p_notValid()){
		return false;
	}
	return this.m_day==t_date.p_getDay() && this.m_month==t_date.p_getMonth() && this.m_year==t_date.p_getYear();
}
c_Date.prototype.p_before=function(t_date){
	if(this.p_notValid() || t_date==null || t_date.p_notValid()){
		return false;
	}
	var t_d0=this.p_getDaysFromOrigin();
	var t_d1=t_date.p_getDaysFromOrigin();
	return t_d0<t_d1;
}
c_Date.prototype.p_beforeOrSame=function(t_date){
	if(this.p_same(t_date)){
		return true;
	}
	return this.p_before(t_date);
}
c_Date.prototype.p_setBefore=function(t_src){
	if(t_src==null){
		this.p_setUndefined();
	}else{
		this.m_day=t_src.m_day;
		this.m_month=t_src.m_month;
		this.m_year=t_src.m_year;
		this.p_setLastOfPrevMonth();
	}
}
c_Date.prototype.p_setForever=function(){
	this.m_day=99;
	this.m_month=99;
	this.m_year=9999;
}
c_Date.prototype.p_isUndefined=function(){
	return this.m_day==0 && this.m_month==0 && this.m_year==0;
}
c_Date.prototype.p_isForever=function(){
	return this.m_day==99 && this.m_month==99 && this.m_year==9999;
}
c_Date.prototype.p_setFromCalendar=function(t_julian){
	var t_a=0;
	var t_b=0;
	var t_c=0;
	var t_d=0;
	var t_e=0;
	var t_z=0;
	var t_alpha=0;
	t_z=t_julian+1;
	if(t_z<2299161){
		t_a=t_z;
	}else{
		t_alpha=((((t_z)-1867216.25)/36524.25)|0);
		t_a=t_z+1+t_alpha-((t_alpha/4)|0);
	}
	if(t_a>1721423){
		t_b=t_a+1524;
	}else{
		t_b=t_a+1158;
	}
	t_c=((((t_b)-122.1)/365.25)|0);
	t_d=((365.25*(t_c))|0);
	t_e=(((t_b-t_d)/30.6001)|0);
	this.m_day=t_b-t_d-((30.6001*(t_e))|0);
	if(t_e<14){
		this.m_month=t_e-1;
	}else{
		this.m_month=t_e-13;
	}
	if(this.m_month>2){
		this.m_year=t_c-4716;
	}else{
		this.m_year=t_c-4715;
	}
}
c_Date.prototype.p_addDays=function(t_d){
	if(this.p_isValid()){
		var t_j=this.p_getAsCalendar();
		this.p_setFromCalendar(t_j+t_d);
	}
}
c_Date.prototype.p_afterOrSame=function(t_date){
	if(this.p_same(t_date)){
		return true;
	}
	return this.p_after(t_date);
}
c_Date.prototype.p_getExactAgeAt=function(t_date){
	if(this.p_notValid() || t_date.p_notValid()){
		return 0;
	}
	var t_age=t_date.p_getYear()-this.m_year;
	if(t_date.p_getMonth()>this.m_month){
		return t_age;
	}
	if(t_date.p_getMonth()==this.m_month && t_date.p_getDay()>=this.m_day){
		return t_age;
	}
	return t_age-1;
}
c_Date.prototype.p_getDaysFrom=function(t_past){
	if(this.p_isValid() && t_past.p_isValid()){
		var t_d1=this.p_getDaysFromOrigin();
		var t_d2=t_past.p_getDaysFromOrigin();
		return t_d1-t_d2;
	}
	return 0;
}
c_Date.prototype.p_setRoundedDateAt=function(t_age,t_dayOfbirth){
	this.p_setDate3(t_dayOfbirth);
	this.p_setFirstOfMonth();
	this.p_addYears(t_age);
	this.p_setFirstOfNextMonth();
}
c_Date.prototype.p_isLastOfMonth=function(){
	if(this.p_isValid()){
		return this.m_day>=28;
	}
	return false;
}
function c_Zeitachse(){
	Object.call(this);
	this.m_mdBeginn=null;
	this.m_mdAblauf=null;
	this.m_mdMitte=null;
	this.m_maPerioden=null;
	this.m_maLeistungen=null;
	this.m_maZeitpunkte=null;
	this.implments={c_Loggable:1};
}
c_Zeitachse.m_new=function(){
	this.m_mdBeginn=c_Date.m_new.call(new c_Date);
	this.m_mdAblauf=c_Date.m_new.call(new c_Date);
	this.m_mdMitte=c_Date.m_new.call(new c_Date);
	this.m_maPerioden=c_VPeriode.m_new.call(new c_VPeriode);
	this.m_maLeistungen=c_VLeistung.m_new.call(new c_VLeistung);
	this.m_maZeitpunkte=c_VDate.m_new.call(new c_VDate);
	return this;
}
c_Zeitachse.prototype.p_setBereich=function(t_dMin,t_dMax,t_dMid){
	this.m_mdBeginn.p_setDate3(t_dMin);
	this.m_mdAblauf.p_setDate3(t_dMax);
	this.m_mdMitte.p_setDate3(t_dMid);
	if(this.m_mdBeginn.p_getDay()!=1){
		this.m_mdBeginn.p_setFirstOfNextMonth();
	}
	if(this.m_mdAblauf.p_getDay()==1){
		this.m_mdAblauf.p_setLastOfPrevMonth();
	}
}
c_Zeitachse.prototype.p_addTag=function(t_tag){
	var t_zeitpunkt=null;
	var t_=this.m_maZeitpunkte.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		t_zeitpunkt=t_.p_NextObject();
		if(t_zeitpunkt.p_same(t_tag)){
			return;
		}
	}
	this.m_maZeitpunkte.p_add6(t_tag);
}
c_Zeitachse.prototype.p_addDatum=function(t_dDatum){
	if(t_dDatum.p_isValid() && t_dDatum.p_after(this.m_mdBeginn) && t_dDatum.p_before(this.m_mdAblauf)){
		this.p_addTag(t_dDatum);
	}
}
c_Zeitachse.prototype.p_addPeriode=function(t_dBeginn,t_dAblauf){
	if(t_dBeginn.p_afterOrSame(t_dAblauf)){
		return;
	}
	if(t_dBeginn.p_isValid() && t_dBeginn.p_afterOrSame(this.m_mdBeginn)){
		this.p_addTag(t_dBeginn);
	}
	if(t_dAblauf.p_isValid() && t_dAblauf.p_beforeOrSame(this.m_mdAblauf)){
		var t_d=c_Date.m_new4.call(new c_Date,t_dAblauf);
		if(t_d.p_isLastOfMonth()){
			t_d.p_setFirstOfNextMonth();
		}
		this.p_addTag(t_d);
	}
}
c_Zeitachse.prototype.p_addPeriodeGenau=function(t_dBeginn,t_dAblauf){
	if(t_dBeginn.p_afterOrSame(t_dAblauf)){
		return;
	}
	if(t_dBeginn.p_isValid() && t_dBeginn.p_afterOrSame(this.m_mdBeginn)){
		this.p_addTag(t_dBeginn);
	}
	if(t_dAblauf.p_isValid() && t_dAblauf.p_beforeOrSame(this.m_mdAblauf)){
		var t_d=c_Date.m_new4.call(new c_Date,t_dAblauf);
		t_d.p_addDays(1);
		this.p_addTag(t_d);
	}
}
c_Zeitachse.prototype.p_berechnePerioden=function(){
	var t_pcPeriode=null;
	var t_pcLeistung=null;
	var t_tag=null;
	var t_prev=null;
	var t_now=null;
	this.p_addPeriode(this.m_mdBeginn,this.m_mdAblauf);
	var t_=this.m_maLeistungen.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		t_pcLeistung=t_.p_NextObject();
		if(t_pcLeistung.m_mbTagGenau){
			this.p_addPeriodeGenau(t_pcLeistung.m_mdBeginn,t_pcLeistung.m_mdAblauf);
		}else{
			this.p_addPeriode(t_pcLeistung.m_mdBeginn,t_pcLeistung.m_mdAblauf);
		}
	}
	this.m_maZeitpunkte.p_sort();
	var t_2=this.m_maZeitpunkte.p_ObjectEnumerator();
	while(t_2.p_HasNext()){
		t_tag=t_2.p_NextObject();
		if(t_tag.p_before(this.m_mdAblauf)){
			t_now=c_Periode.m_new.call(new c_Periode);
			t_now.m_mdBeginn.p_setDate3(t_tag);
			this.m_maPerioden.p_add4(t_now);
		}
	}
	this.m_maPerioden.p_sort();
	t_prev=null;
	var t_3=this.m_maPerioden.p_ObjectEnumerator();
	while(t_3.p_HasNext()){
		t_now=t_3.p_NextObject();
		if(t_prev!=null){
			if(t_now.m_mdBeginn.p_getDay()==1){
				t_prev.m_mdAblauf.p_setBefore(t_now.m_mdBeginn);
			}else{
				t_prev.m_mdAblauf.p_setDate3(t_now.m_mdBeginn);
				t_prev.m_mdAblauf.p_addDays(-1);
			}
		}
		t_prev=t_now;
	}
	if(t_prev!=null){
		t_prev.m_mdAblauf.p_setDate3(this.m_mdAblauf);
	}
	var t_4=this.m_maPerioden.p_ObjectEnumerator();
	while(t_4.p_HasNext()){
		t_pcPeriode=t_4.p_NextObject();
		var t_5=this.m_maLeistungen.p_ObjectEnumerator();
		while(t_5.p_HasNext()){
			t_pcLeistung=t_5.p_NextObject();
			if(t_pcLeistung.m_mbKapital){
				if(t_pcLeistung.m_mdBeginn.p_afterOrSame(t_pcPeriode.m_mdBeginn) && t_pcLeistung.m_mdBeginn.p_beforeOrSame(t_pcPeriode.m_mdAblauf)){
					t_pcPeriode.p_addLeistung2(t_pcLeistung);
				}
			}else{
				if(t_pcLeistung.m_mdBeginn.p_beforeOrSame(t_pcPeriode.m_mdBeginn) && (t_pcLeistung.m_mdAblauf.p_isForever() || t_pcLeistung.m_mdAblauf.p_afterOrSame(t_pcPeriode.m_mdAblauf))){
					t_pcPeriode.p_addLeistung2(t_pcLeistung);
				}
			}
		}
	}
}
c_Zeitachse.prototype.p_getNbPerioden=function(){
	return this.m_maPerioden.p_size();
}
c_Zeitachse.prototype.p_getPeriode=function(t_i){
	return this.m_maPerioden.p_get(t_i);
}
function c_Periode(){
	Object.call(this);
	this.m_mdBeginn=null;
	this.m_mdAblauf=null;
	this.m_maElemente=null;
	this.implments={c_Loggable:1};
}
c_Periode.m_new=function(){
	this.m_mdBeginn=c_Date.m_new.call(new c_Date);
	this.m_mdAblauf=c_Date.m_new.call(new c_Date);
	this.m_maElemente=c_VElement.m_new.call(new c_VElement);
	return this;
}
c_Periode.prototype.p_addLeistung2=function(t_pcLeistung){
	var t_pcElement=null;
	t_pcElement=c_Element.m_new.call(new c_Element,t_pcLeistung);
	this.m_maElemente.p_add11(t_pcElement);
}
c_Periode.prototype.p_getMonate2=function(){
	var t_iMonate=0;
	var t_iJahre=this.m_mdAblauf.p_getYear()-this.m_mdBeginn.p_getYear();
	if(this.m_mdAblauf.p_getMonth()<this.m_mdBeginn.p_getMonth()){
		t_iJahre-=1;
		t_iMonate=this.m_mdAblauf.p_getMonth()+12-this.m_mdBeginn.p_getMonth();
	}else{
		t_iMonate=this.m_mdAblauf.p_getMonth()-this.m_mdBeginn.p_getMonth();
	}
	return t_iJahre*12+t_iMonate+1;
}
function c_List(){
	Object.call(this);
	this.m__head=(c_HeadNode.m_new.call(new c_HeadNode));
}
c_List.m_new=function(){
	return this;
}
c_List.prototype.p_AddLast=function(t_data){
	return c_Node6.m_new.call(new c_Node6,this.m__head,this.m__head.m__pred,t_data);
}
c_List.m_new2=function(t_data){
	var t_=t_data;
	var t_2=0;
	while(t_2<t_.length){
		var t_t=t_[t_2];
		t_2=t_2+1;
		this.p_AddLast(t_t);
	}
	return this;
}
c_List.prototype.p_Compare3=function(t_lhs,t_rhs){
	error("Unable to compare items");
	return 0;
}
c_List.prototype.p_Sort=function(t_ascending){
	var t_ccsgn=-1;
	if((t_ascending)!=0){
		t_ccsgn=1;
	}
	var t_insize=1;
	do{
		var t_merges=0;
		var t_tail=this.m__head;
		var t_p=this.m__head.m__succ;
		while(t_p!=this.m__head){
			t_merges+=1;
			var t_q=t_p.m__succ;
			var t_qsize=t_insize;
			var t_psize=1;
			while(t_psize<t_insize && t_q!=this.m__head){
				t_psize+=1;
				t_q=t_q.m__succ;
			}
			do{
				var t_t=null;
				if(((t_psize)!=0) && ((t_qsize)!=0) && t_q!=this.m__head){
					var t_cc=this.p_Compare3(t_p.m__data,t_q.m__data)*t_ccsgn;
					if(t_cc<=0){
						t_t=t_p;
						t_p=t_p.m__succ;
						t_psize-=1;
					}else{
						t_t=t_q;
						t_q=t_q.m__succ;
						t_qsize-=1;
					}
				}else{
					if((t_psize)!=0){
						t_t=t_p;
						t_p=t_p.m__succ;
						t_psize-=1;
					}else{
						if(((t_qsize)!=0) && t_q!=this.m__head){
							t_t=t_q;
							t_q=t_q.m__succ;
							t_qsize-=1;
						}else{
							break;
						}
					}
				}
				t_t.m__pred=t_tail;
				t_tail.m__succ=t_t;
				t_tail=t_t;
			}while(!(false));
			t_p=t_q;
		}
		t_tail.m__succ=this.m__head;
		this.m__head.m__pred=t_tail;
		if(t_merges<=1){
			return 0;
		}
		t_insize*=2;
	}while(!(false));
}
c_List.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator7.m_new.call(new c_Enumerator7,this);
}
c_List.prototype.p_Count=function(){
	var t_n=0;
	var t_node=this.m__head.m__succ;
	while(t_node!=this.m__head){
		t_node=t_node.m__succ;
		t_n+=1;
	}
	return t_n;
}
c_List.prototype.p_ToArray=function(){
	var t_arr=new_object_array(this.p_Count());
	var t_i=0;
	var t_=this.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_t=t_.p_NextObject();
		t_arr[t_i]=t_t;
		t_i+=1;
	}
	return t_arr;
}
function c_Vector(){
	c_List.call(this);
	this.m_updated=false;
	this.m_items=[];
}
c_Vector.prototype=extend_class(c_List);
c_Vector.m_new=function(){
	c_List.m_new.call(this);
	this.m_updated=false;
	return this;
}
c_Vector.prototype.p_add4=function(t_elt){
	this.p_AddLast(t_elt);
	this.m_updated=false;
}
c_Vector.prototype.p_sort=function(){
	this.p_Sort(1);
	this.m_updated=false;
}
c_Vector.prototype.p_size=function(){
	if(this.m_updated){
		return this.m_items.length;
	}else{
		return this.p_Count();
	}
}
c_Vector.prototype.p_get=function(t_i){
	if(t_i<0 || t_i>=this.p_size()){
		return null;
	}
	if(!this.m_updated){
		this.m_items=this.p_ToArray();
		this.m_updated=true;
	}
	return this.m_items[t_i];
}
function c_VPeriode(){
	c_Vector.call(this);
	this.implments={c_Loggable:1};
}
c_VPeriode.prototype=extend_class(c_Vector);
c_VPeriode.m_new=function(){
	c_Vector.m_new.call(this);
	return this;
}
c_VPeriode.prototype.p_Compare3=function(t_lhs,t_rhs){
	if(t_lhs.m_mdBeginn.p_before(t_rhs.m_mdBeginn)){
		return -1;
	}else{
		if(t_lhs.m_mdBeginn.p_after(t_rhs.m_mdBeginn)){
			return 1;
		}
	}
	return 0;
}
function c_Node6(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node6.m_new=function(t_succ,t_pred,t_data){
	this.m__succ=t_succ;
	this.m__pred=t_pred;
	this.m__succ.m__pred=this;
	this.m__pred.m__succ=this;
	this.m__data=t_data;
	return this;
}
c_Node6.m_new2=function(){
	return this;
}
function c_HeadNode(){
	c_Node6.call(this);
}
c_HeadNode.prototype=extend_class(c_Node6);
c_HeadNode.m_new=function(){
	c_Node6.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
	return this;
}
function c_Leistung(){
	Object.call(this);
	this.m_miReferenz=0;
	this.m_miVersichert=0;
	this.m_miBeguenstigt=0;
	this.m_miErwerb=0;
	this.m_mdBeginn=null;
	this.m_mdAblauf=null;
	this.m_mdWechsel=null;
	this.m_miTagVon=0;
	this.m_miTagBis=0;
	this.m_meVersicherungsart=0;
	this.m_meLeistungsart=0;
	this.m_mrBetrag=.0;
	this.m_mrOriginal=.0;
	this.m_mbBestand=false;
	this.m_mbOfferte=false;
	this.m_mbTagGenau=false;
	this.m_mbErsetzt=false;
	this.m_mbSplitting=false;
	this.m_mbKapital=false;
	this.m_mbSubsidiaer=false;
	this.implments={c_Loggable:1};
}
c_Leistung.prototype.p_init2=function(){
	this.m_miReferenz=0;
	this.m_miVersichert=0;
	this.m_miBeguenstigt=0;
	this.m_miErwerb=0;
	this.m_mdBeginn=c_Date.m_new.call(new c_Date);
	this.m_mdAblauf=c_Date.m_new.call(new c_Date);
	this.m_mdWechsel=c_Date.m_new.call(new c_Date);
	this.m_miTagVon=0;
	this.m_miTagBis=0;
	this.m_meVersicherungsart=0;
	this.m_meLeistungsart=0;
	this.m_mrBetrag=0.0;
	this.m_mrOriginal=0.0;
	this.m_mbBestand=false;
	this.m_mbOfferte=false;
	this.m_mbTagGenau=false;
	this.m_mbErsetzt=false;
	this.m_mbSplitting=false;
	this.m_mbKapital=false;
	this.m_mbSubsidiaer=false;
}
c_Leistung.m_new=function(){
	this.p_init2();
	return this;
}
c_Leistung.m_new2=function(t_vart,t_lart,t_versichert,t_beguenstigt,t_rente,t_beginn,t_ablauf,t_gesplittet){
	this.p_init2();
	this.m_meVersicherungsart=t_vart;
	this.m_meLeistungsart=t_lart;
	this.m_miVersichert=t_versichert;
	this.m_miBeguenstigt=t_beguenstigt;
	this.m_mrBetrag=t_rente;
	this.m_mdBeginn.p_setDate3(t_beginn);
	this.m_mdAblauf.p_setDate3(t_ablauf);
	this.m_mbSplitting=t_gesplittet;
	return this;
}
c_Leistung.m_new3=function(t_src){
	this.p_init2();
	this.m_miVersichert=t_src.m_miVersichert;
	this.m_miBeguenstigt=t_src.m_miBeguenstigt;
	this.m_meVersicherungsart=t_src.m_meVersicherungsart;
	this.m_meLeistungsart=t_src.m_meLeistungsart;
	this.m_mdBeginn.p_setDate3(t_src.m_mdBeginn);
	this.m_mdAblauf.p_setDate3(t_src.m_mdAblauf);
	this.m_mdWechsel.p_setDate3(t_src.m_mdWechsel);
	this.m_miTagVon=t_src.m_miTagVon;
	this.m_miTagBis=t_src.m_miTagBis;
	this.m_mrBetrag=t_src.m_mrBetrag;
	this.m_mrOriginal=t_src.m_mrOriginal;
	this.m_mbBestand=t_src.m_mbBestand;
	this.m_mbOfferte=t_src.m_mbOfferte;
	this.m_mbTagGenau=t_src.m_mbTagGenau;
	this.m_mbErsetzt=t_src.m_mbErsetzt;
	this.m_mbSplitting=t_src.m_mbSplitting;
	this.m_mbKapital=t_src.m_mbKapital;
	return this;
}
c_Leistung.prototype.p_istKinderrente=function(){
	return this.m_meLeistungsart==50 || this.m_meLeistungsart==31 || this.m_meLeistungsart==51 || this.m_meLeistungsart==52 || this.m_meLeistungsart==53;
}
c_Leistung.prototype.p_istKapital=function(){
	return this.m_mbKapital;
}
c_Leistung.prototype.p_istAHV=function(){
	return this.m_meVersicherungsart==1;
}
c_Leistung.prototype.p_istAHVKinderrente=function(){
	return this.m_meLeistungsart==50;
}
c_Leistung.prototype.p_istWaisenrente=function(){
	return this.m_meLeistungsart==51 || this.m_meLeistungsart==52 || this.m_meLeistungsart==53;
}
c_Leistung.prototype.p_istIV=function(){
	return this.m_meVersicherungsart==2;
}
c_Leistung.prototype.p_istIVKinderrente=function(){
	return this.m_meLeistungsart==31;
}
c_Leistung.prototype.p_istAltersleistung=function(){
	return this.m_meLeistungsart==2 || this.m_meLeistungsart==10 || this.m_meLeistungsart==4 || this.m_meLeistungsart==50;
}
c_Leistung.prototype.p_istWitwenleistung=function(){
	return this.m_meLeistungsart==63 || this.m_meLeistungsart==64 || this.m_meLeistungsart==62;
}
c_Leistung.prototype.p_istEULeistung=function(){
	return this.m_meLeistungsart==40 || this.m_meLeistungsart==30 || this.m_meLeistungsart==31 || this.m_meLeistungsart==5;
}
c_Leistung.prototype.p_istTodesleistung=function(){
	return this.m_meLeistungsart==63 || this.m_meLeistungsart==64 || this.m_meLeistungsart==62 || this.m_meLeistungsart==51 || this.m_meLeistungsart==52 || this.m_meLeistungsart==53;
}
c_Leistung.prototype.p_getSaeule=function(){
	if(this.m_meVersicherungsart==1 || this.m_meVersicherungsart==2){
		return 1;
	}
	if(this.m_meVersicherungsart==4 || this.m_meVersicherungsart==3 || this.m_meVersicherungsart==5){
		return 2;
	}
	return 3;
}
function c_List2(){
	Object.call(this);
	this.m__head=(c_HeadNode2.m_new.call(new c_HeadNode2));
}
c_List2.m_new=function(){
	return this;
}
c_List2.prototype.p_AddLast2=function(t_data){
	return c_Node7.m_new.call(new c_Node7,this.m__head,this.m__head.m__pred,t_data);
}
c_List2.m_new2=function(t_data){
	var t_=t_data;
	var t_2=0;
	while(t_2<t_.length){
		var t_t=t_[t_2];
		t_2=t_2+1;
		this.p_AddLast2(t_t);
	}
	return this;
}
c_List2.prototype.p_Count=function(){
	var t_n=0;
	var t_node=this.m__head.m__succ;
	while(t_node!=this.m__head){
		t_node=t_node.m__succ;
		t_n+=1;
	}
	return t_n;
}
c_List2.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator5.m_new.call(new c_Enumerator5,this);
}
function c_Vector2(){
	c_List2.call(this);
	this.m_updated=false;
	this.m_items=[];
}
c_Vector2.prototype=extend_class(c_List2);
c_Vector2.m_new=function(){
	c_List2.m_new.call(this);
	this.m_updated=false;
	return this;
}
c_Vector2.prototype.p_size=function(){
	if(this.m_updated){
		return this.m_items.length;
	}else{
		return this.p_Count();
	}
}
c_Vector2.prototype.p_add5=function(t_elt){
	this.p_AddLast2(t_elt);
	this.m_updated=false;
}
function c_VLeistung(){
	c_Vector2.call(this);
	this.implments={c_Loggable:1};
}
c_VLeistung.prototype=extend_class(c_Vector2);
c_VLeistung.m_new=function(){
	c_Vector2.m_new.call(this);
	return this;
}
function c_Node7(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node7.m_new=function(t_succ,t_pred,t_data){
	this.m__succ=t_succ;
	this.m__pred=t_pred;
	this.m__succ.m__pred=this;
	this.m__pred.m__succ=this;
	this.m__data=t_data;
	return this;
}
c_Node7.m_new2=function(){
	return this;
}
function c_HeadNode2(){
	c_Node7.call(this);
}
c_HeadNode2.prototype=extend_class(c_Node7);
c_HeadNode2.m_new=function(){
	c_Node7.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
	return this;
}
function c_List3(){
	Object.call(this);
	this.m__head=(c_HeadNode3.m_new.call(new c_HeadNode3));
}
c_List3.m_new=function(){
	return this;
}
c_List3.prototype.p_AddLast3=function(t_data){
	return c_Node8.m_new.call(new c_Node8,this.m__head,this.m__head.m__pred,t_data);
}
c_List3.m_new2=function(t_data){
	var t_=t_data;
	var t_2=0;
	while(t_2<t_.length){
		var t_t=t_[t_2];
		t_2=t_2+1;
		this.p_AddLast3(t_t);
	}
	return this;
}
c_List3.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator6.m_new.call(new c_Enumerator6,this);
}
c_List3.prototype.p_Compare4=function(t_lhs,t_rhs){
	error("Unable to compare items");
	return 0;
}
c_List3.prototype.p_Sort=function(t_ascending){
	var t_ccsgn=-1;
	if((t_ascending)!=0){
		t_ccsgn=1;
	}
	var t_insize=1;
	do{
		var t_merges=0;
		var t_tail=this.m__head;
		var t_p=this.m__head.m__succ;
		while(t_p!=this.m__head){
			t_merges+=1;
			var t_q=t_p.m__succ;
			var t_qsize=t_insize;
			var t_psize=1;
			while(t_psize<t_insize && t_q!=this.m__head){
				t_psize+=1;
				t_q=t_q.m__succ;
			}
			do{
				var t_t=null;
				if(((t_psize)!=0) && ((t_qsize)!=0) && t_q!=this.m__head){
					var t_cc=this.p_Compare4(t_p.m__data,t_q.m__data)*t_ccsgn;
					if(t_cc<=0){
						t_t=t_p;
						t_p=t_p.m__succ;
						t_psize-=1;
					}else{
						t_t=t_q;
						t_q=t_q.m__succ;
						t_qsize-=1;
					}
				}else{
					if((t_psize)!=0){
						t_t=t_p;
						t_p=t_p.m__succ;
						t_psize-=1;
					}else{
						if(((t_qsize)!=0) && t_q!=this.m__head){
							t_t=t_q;
							t_q=t_q.m__succ;
							t_qsize-=1;
						}else{
							break;
						}
					}
				}
				t_t.m__pred=t_tail;
				t_tail.m__succ=t_t;
				t_tail=t_t;
			}while(!(false));
			t_p=t_q;
		}
		t_tail.m__succ=this.m__head;
		this.m__head.m__pred=t_tail;
		if(t_merges<=1){
			return 0;
		}
		t_insize*=2;
	}while(!(false));
}
function c_Vector3(){
	c_List3.call(this);
	this.m_updated=false;
}
c_Vector3.prototype=extend_class(c_List3);
c_Vector3.m_new=function(){
	c_List3.m_new.call(this);
	this.m_updated=false;
	return this;
}
c_Vector3.prototype.p_add6=function(t_elt){
	this.p_AddLast3(t_elt);
	this.m_updated=false;
}
c_Vector3.prototype.p_sort=function(){
	this.p_Sort(1);
	this.m_updated=false;
}
function c_VDate(){
	c_Vector3.call(this);
}
c_VDate.prototype=extend_class(c_Vector3);
c_VDate.m_new=function(){
	c_Vector3.m_new.call(this);
	return this;
}
c_VDate.prototype.p_Compare4=function(t_lhs,t_rhs){
	if(t_lhs.p_before(t_rhs)){
		return -1;
	}else{
		if(t_lhs.p_after(t_rhs)){
			return 1;
		}
	}
	return 0;
}
function c_Node8(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node8.m_new=function(t_succ,t_pred,t_data){
	this.m__succ=t_succ;
	this.m__pred=t_pred;
	this.m__succ.m__pred=this;
	this.m__pred.m__succ=this;
	this.m__data=t_data;
	return this;
}
c_Node8.m_new2=function(){
	return this;
}
function c_HeadNode3(){
	c_Node8.call(this);
}
c_HeadNode3.prototype=extend_class(c_Node8);
c_HeadNode3.m_new=function(){
	c_Node8.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
	return this;
}
function c_Person(){
	Object.call(this);
	this.m_mdGeburtsdatum=null;
	this.m_mdZivildatum=null;
	this.m_mdEinreisedatum=null;
	this.m_mdPensionsdatum=null;
	this.m_mdErwerbsaufgabe=null;
	this.m_maEintrag=null;
	this.m_maPrognose=null;
	this.m_miAbJahr=0;
	this.m_miJahre=0;
	this.m_meGeschlecht=0;
	this.m_meZivilstand=0;
	this.m_meErwerbsart=0;
	this.m_mrEinkommen=.0;
	this.m_mrWitwexrente=.0;
	this.m_mrTeilzeit=[];
	this.m_miTeilzeitVon=[];
	this.m_miTeilzeitBis=[];
	this.m_mbStufen=false;
	this.m_miStart=0;
	this.m_miHeute=0;
	this.m_mrLohn1=.0;
	this.m_mrLohn2=.0;
	this.m_mrLohn3=.0;
	this.m_mbDurchschnitt=false;
	this.m_mbDurchgehend=false;
	this.m_mbIKErfassung=false;
	this.m_miErstesBeitragsjahr=0;
	this.m_miAnzahlFehljahre=0;
	this.m_mbNettofehljahre=false;
	this.m_mrDurchschnittsEK=.0;
	this.m_mrMassgebendesEK=.0;
	this.m_mbAHVBezueger=false;
	this.m_mbIVBezueger=false;
	this.m_mrBestehend=.0;
	this.m_mrTeilfaktor=.0;
	this.m_miTeilskala=0;
	this.m_miBezugsjahr=0;
	this.m_mbIVHalbiert=false;
	this.m_meIVGrad=0;
	this.m_mrUVGEinkommen=.0;
	this.m_mrUVGAnteil1=.0;
	this.m_mrUVGAnteil2=.0;
	this.m_mrUVGAnteil3=.0;
	this.m_mbBVGManuell=false;
	this.m_meBVGLohn=0;
	this.m_mbBVGohne=false;
	this.m_mrTeuerung=.0;
	this.m_mrBVGAltersrente=.0;
	this.m_mrBVGAlterskapital=.0;
	this.m_mrBVGAltersverzehr=.0;
	this.m_mrBVGDeckungsrente=.0;
	this.m_mrBVGDeckungskapital=.0;
	this.m_mrBVGDeckungsverzehr=.0;
	this.m_mrBVGVerrentungssatz=.0;
	this.m_mrBVGRententeil=.0;
	this.m_mrBVGGrenze=.0;
	this.m_mrKaderGrenze=.0;
	this.m_mrUVGZGrenze=.0;
	this.m_mrAHVflexEigen=.0;
	this.m_mrAHVflexSplit=.0;
	this.implments={c_Loggable:1};
}
c_Person.m_new=function(){
	this.m_mdGeburtsdatum=c_Date.m_new.call(new c_Date);
	this.m_mdZivildatum=c_Date.m_new.call(new c_Date);
	this.m_mdEinreisedatum=c_Date.m_new.call(new c_Date);
	this.m_mdPensionsdatum=c_Date.m_new.call(new c_Date);
	this.m_mdErwerbsaufgabe=c_Date.m_new.call(new c_Date);
	this.m_maEintrag=c_VEintrag.m_new.call(new c_VEintrag);
	this.m_maPrognose=c_VEintrag.m_new.call(new c_VEintrag);
	this.m_miAbJahr=0;
	this.m_miJahre=0;
	this.m_meGeschlecht=1;
	this.m_meZivilstand=1;
	this.m_meErwerbsart=1;
	this.m_mrEinkommen=0.0;
	this.m_mrWitwexrente=0.0;
	this.m_mrTeilzeit=[];
	this.m_miTeilzeitVon=[];
	this.m_miTeilzeitBis=[];
	this.m_mbStufen=false;
	this.m_miStart=0;
	this.m_miHeute=0;
	this.m_mrLohn1=0.0;
	this.m_mrLohn2=0.0;
	this.m_mrLohn3=0.0;
	this.m_mbDurchschnitt=false;
	this.m_mbDurchgehend=false;
	this.m_mbIKErfassung=false;
	this.m_miErstesBeitragsjahr=0;
	this.m_miAnzahlFehljahre=0;
	this.m_mbNettofehljahre=false;
	this.m_mrDurchschnittsEK=0.0;
	this.m_mrMassgebendesEK=0.0;
	this.m_mbAHVBezueger=false;
	this.m_mbIVBezueger=false;
	this.m_mrBestehend=0.0;
	this.m_mrTeilfaktor=0.0;
	this.m_miTeilskala=0;
	this.m_miBezugsjahr=0;
	this.m_mbIVHalbiert=false;
	this.m_meIVGrad=1;
	this.m_mrUVGEinkommen=0.0;
	this.m_mrUVGAnteil1=0.0;
	this.m_mrUVGAnteil2=0.0;
	this.m_mrUVGAnteil3=0.0;
	this.m_mbBVGManuell=false;
	this.m_meBVGLohn=1;
	this.m_mbBVGohne=false;
	this.m_mrTeuerung=1.0;
	this.m_mrBVGAltersrente=0.0;
	this.m_mrBVGAlterskapital=0.0;
	this.m_mrBVGAltersverzehr=0.0;
	this.m_mrBVGDeckungsrente=0.0;
	this.m_mrBVGDeckungskapital=0.0;
	this.m_mrBVGDeckungsverzehr=0.0;
	this.m_mrBVGVerrentungssatz=0.068;
	this.m_mrBVGRententeil=1.0;
	this.m_mrBVGGrenze=90.0;
	this.m_mrKaderGrenze=100.0;
	this.m_mrUVGZGrenze=90.0;
	this.m_mrAHVflexEigen=0.0;
	this.m_mrAHVflexSplit=0.0;
	return this;
}
c_Person.prototype.p_getAlterAm=function(t_datum){
	return this.m_mdGeburtsdatum.p_getRoundedAgeAt(t_datum);
}
c_Person.prototype.p_istVerheiratet=function(){
	return this.m_meZivilstand==2;
}
c_Person.prototype.p_addEintrag=function(){
	var t_e=c_Eintrag.m_new.call(new c_Eintrag);
	this.m_maEintrag.p_add9(t_e);
	return t_e;
}
c_Person.prototype.p_erzeugeAHVLohnkurve=function(t_land,t_dBerechnung){
	var t_aKurve=[];
	var t_iJahr21=0;
	var t_iAlter=0;
	var t_rechner=null;
	var t_i=0;
	t_iJahr21=this.m_mdGeburtsdatum.p_getYear()+21;
	t_iAlter=this.p_getAlterAm(t_dBerechnung);
	t_rechner=c_Lohnkurve.m_new.call(new c_Lohnkurve,t_land);
	if(this.m_mbStufen){
		var t_iHeirat=0;
		if(this.p_istVerheiratet()){
			t_iHeirat=this.m_mdZivildatum.p_getYear();
		}
		t_aKurve=t_rechner.p_fuelleLohnstufe(21,t_iHeirat,t_iAlter,this.m_mrLohn1,this.m_mrLohn2);
	}else{
		t_aKurve=t_rechner.p_fuelleLohnkurve(21,t_iAlter,36000.0,this.m_mrEinkommen,this.m_mrTeuerung);
	}
	if(this.m_mrTeilzeit.length>0){
		t_rechner.p_fuehreTeilzeit(t_iJahr21,t_aKurve,this.m_mrTeilzeit,this.m_miTeilzeitVon,this.m_miTeilzeitBis);
	}
	this.m_mrDurchschnittsEK=0.0;
	for(t_i=0;t_i<t_aKurve.length;t_i=t_i+1){
		this.m_mrDurchschnittsEK+=t_aKurve[t_i];
	}
	if(t_aKurve.length>1){
		this.m_mrDurchschnittsEK=this.m_mrDurchschnittsEK/(t_aKurve.length);
		this.m_mrDurchschnittsEK=bb_utils_round(this.m_mrDurchschnittsEK);
	}
	var t_eintrag=null;
	var t_iJahr=0;
	this.m_maEintrag.p_clear();
	for(t_i=0;t_i<t_aKurve.length;t_i=t_i+1){
		t_iJahr=t_iJahr21+t_i;
		t_eintrag=this.p_addEintrag();
		t_eintrag.m_miJahr=t_iJahr;
		t_eintrag.m_miMonate=12;
		t_eintrag.m_meErwerbsart=this.m_meErwerbsart;
		t_eintrag.m_mrEinkommen=t_aKurve[t_i];
		if(t_eintrag.m_mrEinkommen<1.0){
			t_eintrag.m_meErwerbsart=5;
		}else{
			if(t_eintrag.m_mrEinkommen<bb_ahv_werte_getMinErwerbslosEK(t_land,t_iJahr)){
				t_eintrag.m_meErwerbsart=3;
			}
		}
	}
}
c_Person.prototype.p_erzeugeBVGLohnkurve=function(t_land,t_dBerechnung,t_rKapital,t_rRente,t_bStand65){
	var t_aKurve=[];
	var t_aVermoegen=[];
	var t_iJahr21=0;
	var t_iAlter=0;
	var t_iPension=0;
	var t_iOrdentlich=0;
	var t_lohnrechner=null;
	var t_kaprechner=null;
	var t_i=0;
	t_iJahr21=this.m_mdGeburtsdatum.p_getYear()+21;
	t_iAlter=this.p_getAlterAm(t_dBerechnung);
	t_iPension=this.p_getAlterAm(this.m_mdErwerbsaufgabe);
	t_iOrdentlich=bb_ahv_werte_getPensionsalter(t_land,this.m_meGeschlecht,this.m_mdGeburtsdatum.p_getYear());
	t_lohnrechner=c_Lohnkurve.m_new.call(new c_Lohnkurve,t_land);
	if(this.m_mbStufen){
		var t_iHeirat=0;
		if(this.p_istVerheiratet()){
			t_iHeirat=this.m_mdZivildatum.p_getYear();
		}
		t_aKurve=t_lohnrechner.p_fuelleLohnstufe(21,t_iHeirat,t_iAlter,this.m_mrLohn1,this.m_mrLohn2);
	}else{
		t_aKurve=t_lohnrechner.p_fuelleLohnkurve(21,t_iAlter,36000.0,this.m_mrEinkommen,this.m_mrTeuerung);
	}
	if(this.m_mrTeilzeit.length>0){
		t_lohnrechner.p_fuehreTeilzeit(t_iJahr21,t_aKurve,this.m_mrTeilzeit,this.m_miTeilzeitVon,this.m_miTeilzeitBis);
	}
	t_kaprechner=c_BVGKapital.m_new.call(new c_BVGKapital,t_land);
	t_kaprechner.m_meGeschlecht=this.m_meGeschlecht;
	t_kaprechner.m_mdGeburtsdatum=this.m_mdGeburtsdatum;
	t_kaprechner.m_miStartalter=21;
	t_kaprechner.m_miPensionsalter=t_iPension;
	t_kaprechner.m_meGrenze=this.m_meBVGLohn;
	t_kaprechner.m_mrLohnkurve=t_aKurve;
	t_kaprechner.m_miStandjahr=t_dBerechnung.p_getYear();
	t_kaprechner.m_mrEinkommen=this.m_mrEinkommen;
	t_kaprechner.m_mbVermoegen=true;
	t_kaprechner.p_berechne2(null);
	this.m_mrBVGVerrentungssatz=bb_bvg_werte_getVerrentungssatz2(t_land,t_iPension-t_iOrdentlich);
	var t_rDifferenz=0.0;
	if(t_iPension!=t_iOrdentlich && t_bStand65 && t_rKapital>0.0 && t_rRente>0.0){
		var t_ordrechner=c_BVGKapital.m_new.call(new c_BVGKapital,t_land);
		t_ordrechner.m_meGeschlecht=this.m_meGeschlecht;
		t_ordrechner.m_mdGeburtsdatum=this.m_mdGeburtsdatum;
		t_ordrechner.m_miStartalter=21;
		t_ordrechner.m_miPensionsalter=t_iOrdentlich;
		t_ordrechner.m_meGrenze=this.m_meBVGLohn;
		t_ordrechner.m_mrLohnkurve=t_aKurve;
		t_ordrechner.m_miStandjahr=t_dBerechnung.p_getYear();
		t_ordrechner.m_mrEinkommen=this.m_mrEinkommen;
		t_ordrechner.m_mbVermoegen=false;
		t_ordrechner.p_berechne2(null);
		var t_rUserSatz=t_rRente/t_rKapital;
		var t_rDefaultSatz=bb_bvg_werte_getVerrentungssatz(t_land,this.m_mdGeburtsdatum.p_getYear(),this.m_meGeschlecht==1);
		t_rDifferenz=t_rKapital-t_ordrechner.m_mrAlterskapital;
		this.m_mrBVGVerrentungssatz+=t_rUserSatz-t_rDefaultSatz;
		t_kaprechner.m_mrAlterskapital+=t_rDifferenz;
		if(t_kaprechner.m_mrAlterskapital<0.0){
			t_kaprechner.m_mrAlterskapital=0.0;
		}
	}else{
		if(t_rKapital>0.0 && t_rRente>0.0){
			t_rDifferenz=t_rKapital-t_kaprechner.m_mrAlterskapital;
			this.m_mrBVGVerrentungssatz=t_rRente/t_rKapital;
		}
	}
	var t_n=t_kaprechner.m_mrVermoegen.length;
	var t_l=t_kaprechner.m_mrVermoegen[t_n-1];
	var t_f=1.0;
	if(t_rDifferenz!=0.0 && t_rKapital>0.0 && t_l>0.0){
		for(t_i=0;t_i<t_n;t_i=t_i+1){
			t_f=t_kaprechner.m_mrVermoegen[t_i]/t_l;
			t_kaprechner.m_mrVermoegen[t_i]+=bb_utils_round(t_f*t_rDifferenz);
			if(t_kaprechner.m_mrVermoegen[t_i]<0.0){
				t_kaprechner.m_mrVermoegen[t_i]=0.0;
			}
		}
	}
	if(!this.m_mbBVGManuell){
		if(t_iPension==t_iOrdentlich && t_rKapital>0.0 && t_rRente>0.0){
			this.m_mrBVGAltersrente=bb_utils_round(t_rRente);
			this.m_mrBVGAlterskapital=bb_utils_round(t_rKapital);
		}else{
			this.m_mrBVGAltersrente=bb_utils_round(t_kaprechner.m_mrAlterskapital*this.m_mrBVGVerrentungssatz);
			this.m_mrBVGAlterskapital=bb_utils_round(t_kaprechner.m_mrAlterskapital);
		}
	}
	this.m_mrBVGDeckungsrente=bb_utils_round(t_kaprechner.m_mrDeckungskapital*this.m_mrBVGVerrentungssatz);
	this.m_mrBVGDeckungskapital=bb_utils_round(t_kaprechner.m_mrDeckungskapital);
	if(this.m_mrEinkommen<=bb_bvg_werte_getMinVersicherbar(t_land,2200)){
		this.m_mbBVGohne=true;
		this.m_mrBVGAltersrente=0.0;
		this.m_mrBVGAlterskapital=0.0;
		this.m_mrBVGDeckungsrente=0.0;
		this.m_mrBVGDeckungskapital=0.0;
		for(t_i=0;t_i<t_n;t_i=t_i+1){
			t_kaprechner.m_mrVermoegen[t_i]=0.0;
		}
	}
	return t_kaprechner.m_mrVermoegen;
}
c_Person.prototype.p_getEintrag=function(t_i){
	return this.m_maEintrag.p_get(t_i);
}
c_Person.prototype.p_initialize2=function(t_land){
	if(this.m_mbIKErfassung){
		this.m_maEintrag.p_sort();
		var t_eintrag=this.p_getEintrag(0);
		this.m_miErstesBeitragsjahr=t_eintrag.m_miJahr;
	}else{
		if(this.m_mbStufen){
			this.m_miErstesBeitragsjahr=this.m_miStart;
		}else{
			this.m_miErstesBeitragsjahr=this.m_mdGeburtsdatum.p_getYear()+21;
		}
	}
	this.m_maPrognose.p_sort();
	this.m_miJahre=this.m_maPrognose.p_size();
	if(this.m_miJahre>0){
		var t_eintrag2=this.m_maPrognose.p_get(0);
		this.m_miAbJahr=t_eintrag2.m_miJahr;
	}
	if(!this.m_mbIVBezueger && !this.m_mbAHVBezueger){
		return;
	}
	var t_rechner=null;
	if(this.m_mbIVBezueger || this.m_mbAHVBezueger){
		t_rechner=c_Teilrechner.m_new.call(new c_Teilrechner,t_land);
	}
	if(this.m_mbIVBezueger){
		t_rechner.p_calcDurchschnittIV(this.m_mrBestehend,this.m_meIVGrad,this.m_mdGeburtsdatum.p_getYear(),this.m_miBezugsjahr,this.m_miAnzahlFehljahre);
		this.m_mrMassgebendesEK=t_rechner.m_mrMassgebend;
		this.m_mrTeilfaktor=t_rechner.m_mrTeilfaktor;
		this.m_miTeilskala=t_rechner.m_miTeilskala;
		this.m_mbIVHalbiert=this.m_meIVGrad==2 || this.m_meIVGrad==3;
	}
	if(this.m_mbAHVBezueger){
		t_rechner.p_calcDurchschnittAHV(this.m_mrBestehend,this.m_mdGeburtsdatum.p_getYear(),this.m_miBezugsjahr,this.m_miAnzahlFehljahre);
		this.m_mrMassgebendesEK=t_rechner.m_mrMassgebend;
		this.m_mrTeilfaktor=t_rechner.m_mrTeilfaktor;
		this.m_miTeilskala=t_rechner.m_miTeilskala;
	}
}
c_Person.prototype.p_getBeitragsart=function(){
	var t_2=this.m_meErwerbsart;
	if(t_2==1){
		return 1;
	}else{
		if(t_2==2){
			return 2;
		}else{
			if(t_2==4){
				return 4;
			}
		}
	}
	return 1;
}
c_Person.prototype.p_mitPrognose=function(t_jahr){
	if(this.m_mbStufen){
		return t_jahr>0 && t_jahr>this.m_miHeute;
	}else{
		return t_jahr>0 && t_jahr>=this.m_miAbJahr && t_jahr<this.m_miAbJahr+this.m_miJahre;
	}
}
c_Person.prototype.p_getPrognose=function(t_jahr){
	if(this.m_mbStufen){
		if(t_jahr<this.m_miHeute){
			return 0.0;
		}else{
			return this.m_mrLohn3;
		}
	}else{
		if(t_jahr<this.m_miAbJahr || t_jahr>=this.m_miAbJahr+this.m_miJahre){
			return 0.0;
		}
		var t_eintrag=this.m_maPrognose.p_get(t_jahr-this.m_miAbJahr);
		return t_eintrag.m_mrEinkommen;
	}
}
c_Person.prototype.p_istFrau=function(){
	return this.m_meGeschlecht==2;
}
c_Person.prototype.p_istMann=function(){
	return this.m_meGeschlecht==1;
}
c_Person.prototype.p_getHeiratsdatum=function(){
	return this.m_mdZivildatum;
}
c_Person.prototype.p_istVerwitwet=function(){
	return this.m_meZivilstand==4;
}
c_Person.prototype.p_getGenauesAlter=function(t_datum){
	return this.m_mdGeburtsdatum.p_getExactAgeAt(t_datum);
}
c_Person.prototype.p_getAnteilIVGrad=function(){
	var t_1=this.m_meIVGrad;
	if(t_1==1){
		return 0.0;
	}else{
		if(t_1==2){
			return 0.4;
		}else{
			if(t_1==3){
				return 0.5;
			}else{
				if(t_1==4){
					return 0.75;
				}else{
					if(t_1==5){
						return 1.0;
					}
				}
			}
		}
	}
	return 0.0;
}
function c_List4(){
	Object.call(this);
	this.m__head=(c_HeadNode4.m_new.call(new c_HeadNode4));
}
c_List4.m_new=function(){
	return this;
}
c_List4.prototype.p_AddLast4=function(t_data){
	return c_Node9.m_new.call(new c_Node9,this.m__head,this.m__head.m__pred,t_data);
}
c_List4.m_new2=function(t_data){
	var t_=t_data;
	var t_2=0;
	while(t_2<t_.length){
		var t_t=t_[t_2];
		t_2=t_2+1;
		this.p_AddLast4(t_t);
	}
	return this;
}
c_List4.prototype.p_Count=function(){
	var t_n=0;
	var t_node=this.m__head.m__succ;
	while(t_node!=this.m__head){
		t_node=t_node.m__succ;
		t_n+=1;
	}
	return t_n;
}
c_List4.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator.m_new.call(new c_Enumerator,this);
}
c_List4.prototype.p_ToArray=function(){
	var t_arr=new_object_array(this.p_Count());
	var t_i=0;
	var t_=this.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_t=t_.p_NextObject();
		t_arr[t_i]=t_t;
		t_i+=1;
	}
	return t_arr;
}
function c_Vector4(){
	c_List4.call(this);
	this.m_updated=false;
	this.m_items=[];
}
c_Vector4.prototype=extend_class(c_List4);
c_Vector4.m_new=function(){
	c_List4.m_new.call(this);
	this.m_updated=false;
	return this;
}
c_Vector4.prototype.p_add7=function(t_elt){
	this.p_AddLast4(t_elt);
	this.m_updated=false;
}
c_Vector4.prototype.p_size=function(){
	if(this.m_updated){
		return this.m_items.length;
	}else{
		return this.p_Count();
	}
}
c_Vector4.prototype.p_get=function(t_i){
	if(t_i<0 || t_i>=this.p_size()){
		return null;
	}
	if(!this.m_updated){
		this.m_items=this.p_ToArray();
		this.m_updated=true;
	}
	return this.m_items[t_i];
}
function c_VPerson(){
	c_Vector4.call(this);
	this.implments={c_Loggable:1};
}
c_VPerson.prototype=extend_class(c_Vector4);
c_VPerson.m_new=function(){
	c_Vector4.m_new.call(this);
	return this;
}
function c_Node9(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node9.m_new=function(t_succ,t_pred,t_data){
	this.m__succ=t_succ;
	this.m__pred=t_pred;
	this.m__succ.m__pred=this;
	this.m__pred.m__succ=this;
	this.m__data=t_data;
	return this;
}
c_Node9.m_new2=function(){
	return this;
}
function c_HeadNode4(){
	c_Node9.call(this);
}
c_HeadNode4.prototype=extend_class(c_Node9);
c_HeadNode4.m_new=function(){
	c_Node9.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
	return this;
}
function c_Kind(){
	Object.call(this);
	this.m_mdGeburtsdatum=null;
	this.m_mdAusbildungsende=null;
	this.m_mdAusbildungsende18=null;
	this.m_mdAusbildungsende20=null;
	this.m_mdAusbildungsende25=null;
	this.m_miReferenz=0;
	this.m_meZugehoerigkeit=0;
	this.m_meHaushalt=0;
	this.implments={c_Loggable:1};
}
c_Kind.m_new=function(){
	this.m_mdGeburtsdatum=c_Date.m_new.call(new c_Date);
	this.m_mdAusbildungsende=c_Date.m_new.call(new c_Date);
	this.m_mdAusbildungsende18=c_Date.m_new.call(new c_Date);
	this.m_mdAusbildungsende20=c_Date.m_new.call(new c_Date);
	this.m_mdAusbildungsende25=c_Date.m_new.call(new c_Date);
	this.m_miReferenz=0;
	this.m_meZugehoerigkeit=1;
	this.m_meHaushalt=3;
	return this;
}
c_Kind.prototype.p_initialize=function(){
	this.m_mdAusbildungsende18.p_setDate3(this.m_mdGeburtsdatum);
	this.m_mdAusbildungsende25.p_setDate3(this.m_mdGeburtsdatum);
	this.m_mdAusbildungsende18.p_setFirstOfMonth();
	this.m_mdAusbildungsende18.p_addYears(18);
	this.m_mdAusbildungsende18.p_setLastOfMonth();
	this.m_mdAusbildungsende25.p_setFirstOfMonth();
	this.m_mdAusbildungsende25.p_addYears(25);
	this.m_mdAusbildungsende25.p_setLastOfMonth();
	this.m_mdAusbildungsende.p_setLastOfMonth();
}
c_Kind.prototype.p_istKindVon=function(t_p){
	var t_1=this.m_meZugehoerigkeit;
	if(t_1==1){
		return t_p==0;
	}else{
		if(t_1==2){
			return t_p==1;
		}else{
			if(t_1==3){
				return true;
			}
		}
	}
	return false;
}
c_Kind.prototype.p_getLeistungsfenster=function(t_dBeginn,t_dAblauf,t_max20){
	if(t_dBeginn.p_notValid() || t_dAblauf.p_isUndefined()){
		return false;
	}
	if(t_dBeginn.p_before(this.m_mdGeburtsdatum)){
		t_dBeginn.p_setDate3(this.m_mdGeburtsdatum);
		t_dBeginn.p_setFirstOfNextMonth();
	}
	if(t_dAblauf.p_isForever() || t_dAblauf.p_after(this.m_mdAusbildungsende)){
		t_dAblauf.p_setDate3(this.m_mdAusbildungsende);
	}
	if(t_dAblauf.p_before(this.m_mdAusbildungsende18)){
		t_dAblauf.p_setDate3(this.m_mdAusbildungsende18);
	}
	if(t_max20){
		if(t_dAblauf.p_after(this.m_mdAusbildungsende20)){
			t_dAblauf.p_setDate3(this.m_mdAusbildungsende20);
		}
	}else{
		if(t_dAblauf.p_after(this.m_mdAusbildungsende25)){
			t_dAblauf.p_setDate3(this.m_mdAusbildungsende25);
		}
	}
	return t_dBeginn.p_before(t_dAblauf);
}
function c_List5(){
	Object.call(this);
	this.m__head=(c_HeadNode5.m_new.call(new c_HeadNode5));
}
c_List5.m_new=function(){
	return this;
}
c_List5.prototype.p_AddLast5=function(t_data){
	return c_Node10.m_new.call(new c_Node10,this.m__head,this.m__head.m__pred,t_data);
}
c_List5.m_new2=function(t_data){
	var t_=t_data;
	var t_2=0;
	while(t_2<t_.length){
		var t_t=t_[t_2];
		t_2=t_2+1;
		this.p_AddLast5(t_t);
	}
	return this;
}
c_List5.prototype.p_Count=function(){
	var t_n=0;
	var t_node=this.m__head.m__succ;
	while(t_node!=this.m__head){
		t_node=t_node.m__succ;
		t_n+=1;
	}
	return t_n;
}
c_List5.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator3.m_new.call(new c_Enumerator3,this);
}
c_List5.prototype.p_Compare5=function(t_lhs,t_rhs){
	error("Unable to compare items");
	return 0;
}
c_List5.prototype.p_Sort=function(t_ascending){
	var t_ccsgn=-1;
	if((t_ascending)!=0){
		t_ccsgn=1;
	}
	var t_insize=1;
	do{
		var t_merges=0;
		var t_tail=this.m__head;
		var t_p=this.m__head.m__succ;
		while(t_p!=this.m__head){
			t_merges+=1;
			var t_q=t_p.m__succ;
			var t_qsize=t_insize;
			var t_psize=1;
			while(t_psize<t_insize && t_q!=this.m__head){
				t_psize+=1;
				t_q=t_q.m__succ;
			}
			do{
				var t_t=null;
				if(((t_psize)!=0) && ((t_qsize)!=0) && t_q!=this.m__head){
					var t_cc=this.p_Compare5(t_p.m__data,t_q.m__data)*t_ccsgn;
					if(t_cc<=0){
						t_t=t_p;
						t_p=t_p.m__succ;
						t_psize-=1;
					}else{
						t_t=t_q;
						t_q=t_q.m__succ;
						t_qsize-=1;
					}
				}else{
					if((t_psize)!=0){
						t_t=t_p;
						t_p=t_p.m__succ;
						t_psize-=1;
					}else{
						if(((t_qsize)!=0) && t_q!=this.m__head){
							t_t=t_q;
							t_q=t_q.m__succ;
							t_qsize-=1;
						}else{
							break;
						}
					}
				}
				t_t.m__pred=t_tail;
				t_tail.m__succ=t_t;
				t_tail=t_t;
			}while(!(false));
			t_p=t_q;
		}
		t_tail.m__succ=this.m__head;
		this.m__head.m__pred=t_tail;
		if(t_merges<=1){
			return 0;
		}
		t_insize*=2;
	}while(!(false));
}
function c_Vector5(){
	c_List5.call(this);
	this.m_updated=false;
	this.m_items=[];
}
c_Vector5.prototype=extend_class(c_List5);
c_Vector5.m_new=function(){
	c_List5.m_new.call(this);
	this.m_updated=false;
	return this;
}
c_Vector5.prototype.p_size=function(){
	if(this.m_updated){
		return this.m_items.length;
	}else{
		return this.p_Count();
	}
}
c_Vector5.prototype.p_add8=function(t_elt){
	this.p_AddLast5(t_elt);
	this.m_updated=false;
}
c_Vector5.prototype.p_sort=function(){
	this.p_Sort(1);
	this.m_updated=false;
}
function c_VKind(){
	c_Vector5.call(this);
	this.implments={c_Loggable:1};
}
c_VKind.prototype=extend_class(c_Vector5);
c_VKind.m_new=function(){
	c_Vector5.m_new.call(this);
	return this;
}
c_VKind.prototype.p_Compare5=function(t_lhs,t_rhs){
	if(t_lhs.m_mdGeburtsdatum.p_before(t_rhs.m_mdGeburtsdatum)){
		return -1;
	}else{
		if(t_lhs.m_mdGeburtsdatum.p_after(t_rhs.m_mdGeburtsdatum)){
			return 1;
		}
	}
	if(t_lhs.m_miReferenz<t_rhs.m_miReferenz){
		return -1;
	}else{
		if(t_lhs.m_miReferenz>t_rhs.m_miReferenz){
			return 1;
		}
	}
	return 0;
}
function c_Node10(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node10.m_new=function(t_succ,t_pred,t_data){
	this.m__succ=t_succ;
	this.m__pred=t_pred;
	this.m__succ.m__pred=this;
	this.m__pred.m__succ=this;
	this.m__data=t_data;
	return this;
}
c_Node10.m_new2=function(){
	return this;
}
function c_HeadNode5(){
	c_Node10.call(this);
}
c_HeadNode5.prototype=extend_class(c_Node10);
c_HeadNode5.m_new=function(){
	c_Node10.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
	return this;
}
function c_Eintrag(){
	Object.call(this);
	this.m_miJahr=0;
	this.m_miMonate=0;
	this.m_meErwerbsart=0;
	this.m_mrEinkommen=.0;
	this.implments={c_Loggable:1};
}
c_Eintrag.m_new=function(){
	this.m_miJahr=0;
	this.m_miMonate=0;
	this.m_meErwerbsart=4;
	this.m_mrEinkommen=0.0;
	return this;
}
function c_List6(){
	Object.call(this);
	this.m__head=(c_HeadNode6.m_new.call(new c_HeadNode6));
}
c_List6.m_new=function(){
	return this;
}
c_List6.prototype.p_AddLast6=function(t_data){
	return c_Node11.m_new.call(new c_Node11,this.m__head,this.m__head.m__pred,t_data);
}
c_List6.m_new2=function(t_data){
	var t_=t_data;
	var t_2=0;
	while(t_2<t_.length){
		var t_t=t_[t_2];
		t_2=t_2+1;
		this.p_AddLast6(t_t);
	}
	return this;
}
c_List6.prototype.p_Clear=function(){
	this.m__head.m__succ=this.m__head;
	this.m__head.m__pred=this.m__head;
	return 0;
}
c_List6.prototype.p_Compare6=function(t_lhs,t_rhs){
	error("Unable to compare items");
	return 0;
}
c_List6.prototype.p_Sort=function(t_ascending){
	var t_ccsgn=-1;
	if((t_ascending)!=0){
		t_ccsgn=1;
	}
	var t_insize=1;
	do{
		var t_merges=0;
		var t_tail=this.m__head;
		var t_p=this.m__head.m__succ;
		while(t_p!=this.m__head){
			t_merges+=1;
			var t_q=t_p.m__succ;
			var t_qsize=t_insize;
			var t_psize=1;
			while(t_psize<t_insize && t_q!=this.m__head){
				t_psize+=1;
				t_q=t_q.m__succ;
			}
			do{
				var t_t=null;
				if(((t_psize)!=0) && ((t_qsize)!=0) && t_q!=this.m__head){
					var t_cc=this.p_Compare6(t_p.m__data,t_q.m__data)*t_ccsgn;
					if(t_cc<=0){
						t_t=t_p;
						t_p=t_p.m__succ;
						t_psize-=1;
					}else{
						t_t=t_q;
						t_q=t_q.m__succ;
						t_qsize-=1;
					}
				}else{
					if((t_psize)!=0){
						t_t=t_p;
						t_p=t_p.m__succ;
						t_psize-=1;
					}else{
						if(((t_qsize)!=0) && t_q!=this.m__head){
							t_t=t_q;
							t_q=t_q.m__succ;
							t_qsize-=1;
						}else{
							break;
						}
					}
				}
				t_t.m__pred=t_tail;
				t_tail.m__succ=t_t;
				t_tail=t_t;
			}while(!(false));
			t_p=t_q;
		}
		t_tail.m__succ=this.m__head;
		this.m__head.m__pred=t_tail;
		if(t_merges<=1){
			return 0;
		}
		t_insize*=2;
	}while(!(false));
}
c_List6.prototype.p_Count=function(){
	var t_n=0;
	var t_node=this.m__head.m__succ;
	while(t_node!=this.m__head){
		t_node=t_node.m__succ;
		t_n+=1;
	}
	return t_n;
}
c_List6.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator2.m_new.call(new c_Enumerator2,this);
}
c_List6.prototype.p_ToArray=function(){
	var t_arr=new_object_array(this.p_Count());
	var t_i=0;
	var t_=this.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_t=t_.p_NextObject();
		t_arr[t_i]=t_t;
		t_i+=1;
	}
	return t_arr;
}
function c_Vector6(){
	c_List6.call(this);
	this.m_updated=false;
	this.m_items=[];
}
c_Vector6.prototype=extend_class(c_List6);
c_Vector6.m_new=function(){
	c_List6.m_new.call(this);
	this.m_updated=false;
	return this;
}
c_Vector6.prototype.p_clear=function(){
	this.p_Clear();
	this.m_updated=false;
}
c_Vector6.prototype.p_add9=function(t_elt){
	this.p_AddLast6(t_elt);
	this.m_updated=false;
}
c_Vector6.prototype.p_sort=function(){
	this.p_Sort(1);
	this.m_updated=false;
}
c_Vector6.prototype.p_size=function(){
	if(this.m_updated){
		return this.m_items.length;
	}else{
		return this.p_Count();
	}
}
c_Vector6.prototype.p_get=function(t_i){
	if(t_i<0 || t_i>=this.p_size()){
		return null;
	}
	if(!this.m_updated){
		this.m_items=this.p_ToArray();
		this.m_updated=true;
	}
	return this.m_items[t_i];
}
function c_VEintrag(){
	c_Vector6.call(this);
	this.implments={c_Loggable:1};
}
c_VEintrag.prototype=extend_class(c_Vector6);
c_VEintrag.m_new=function(){
	c_Vector6.m_new.call(this);
	return this;
}
c_VEintrag.prototype.p_Compare6=function(t_lhs,t_rhs){
	if(t_lhs.m_miJahr<t_rhs.m_miJahr){
		return -1;
	}else{
		if(t_lhs.m_miJahr>t_rhs.m_miJahr){
			return 1;
		}
	}
	return 0;
}
function c_Node11(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node11.m_new=function(t_succ,t_pred,t_data){
	this.m__succ=t_succ;
	this.m__pred=t_pred;
	this.m__succ.m__pred=this;
	this.m__pred.m__succ=this;
	this.m__data=t_data;
	return this;
}
c_Node11.m_new2=function(){
	return this;
}
function c_HeadNode6(){
	c_Node11.call(this);
}
c_HeadNode6.prototype=extend_class(c_Node11);
c_HeadNode6.m_new=function(){
	c_Node11.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
	return this;
}
function c_Enumerator(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator.m_new=function(t_list){
	this.m__list=t_list;
	this.m__curr=t_list.m__head.m__succ;
	return this;
}
c_Enumerator.m_new2=function(){
	return this;
}
c_Enumerator.prototype.p_HasNext=function(){
	while(this.m__curr.m__succ.m__pred!=this.m__curr){
		this.m__curr=this.m__curr.m__succ;
	}
	return this.m__curr!=this.m__list.m__head;
}
c_Enumerator.prototype.p_NextObject=function(){
	var t_data=this.m__curr.m__data;
	this.m__curr=this.m__curr.m__succ;
	return t_data;
}
function bb_ahv_werte_getPensionsdatum(t_land,t_geschlecht,t_geburtsdatum){
	var t_pensionsdatum=c_Date.m_new.call(new c_Date);
	var t_pensionsalter=bb_ahv_werte_getPensionsalter(t_land,t_geschlecht,t_geburtsdatum.p_getYear());
	t_pensionsdatum.p_setDate(1,t_geburtsdatum.p_getMonth(),t_geburtsdatum.p_getYear()+t_pensionsalter);
	t_pensionsdatum.p_addMonths(1);
	return t_pensionsdatum;
}
function bb_utils_roundYearly(t_value,t_rounding){
	var t_2=t_rounding;
	if(t_2==1){
		return t_value;
	}else{
		if(t_2==2){
			return bb_utils_round(t_value);
		}else{
			if(t_2==3){
				return bb_utils_round(t_value/10.0)*10.0;
			}else{
				if(t_2==4){
					return bb_utils_round(t_value/100.0)*100.0;
				}else{
					if(t_2==5){
						return bb_utils_round(t_value/10.0)*10.0;
					}else{
						if(t_2==6){
							return bb_utils_round(t_value/100.0)*100.0;
						}
					}
				}
			}
		}
	}
	return t_value;
}
function bb_uvg_werte_getMaxUVGLohn(t_law){
	return t_law.m_maxUVGlohn;
}
function c_Lohnkurve(){
	c_Newton.call(this);
	this.m_land=null;
	this.m_miStartalter=0;
	this.m_miEndalter=0;
	this.m_mrEndlohn=.0;
	this.m_mrTeuerung=.0;
}
c_Lohnkurve.prototype=extend_class(c_Newton);
c_Lohnkurve.m_new=function(t_land){
	c_Newton.m_new.call(this);
	this.m_land=t_land;
	return this;
}
c_Lohnkurve.m_new2=function(){
	c_Newton.m_new.call(this);
	return this;
}
c_Lohnkurve.prototype.p_fuelleLohnstufe=function(t_startalter,t_heirat,t_endalter,t_vorHeirat,t_nachHeirat){
	var t_size=t_endalter-t_startalter+1;
	var t_alter=0;
	var t_i=0;
	if(t_size<1){
		t_size=1;
	}
	var t_kurve=new_number_array(t_size);
	t_i=0;
	for(t_alter=t_startalter;t_alter<=t_endalter;t_alter=t_alter+1){
		if(t_heirat>0){
			if(t_alter<=t_heirat){
				t_kurve[t_i]=t_vorHeirat;
			}else{
				t_kurve[t_i]=t_nachHeirat;
			}
		}else{
			t_kurve[t_i]=t_vorHeirat;
		}
		t_i+=1;
	}
	return t_kurve;
}
c_Lohnkurve.prototype.p_getIndexierung=function(t_startalter,t_endalter,t_startlohn,t_endlohn,t_teuerung){
	this.m_miStartalter=t_startalter;
	this.m_miEndalter=t_endalter;
	this.m_mrEndlohn=t_endlohn;
	this.m_mrTeuerung=t_teuerung;
	if(t_startalter>=t_endalter){
		return 0.0;
	}
	return this.p_approximate(t_endlohn,t_startlohn,100.0,-10.0,20.0);
}
c_Lohnkurve.prototype.p_fuelleLohnkurve=function(t_startalter,t_endalter,t_startlohn,t_endlohn,t_teuerung){
	var t_size=t_endalter-t_startalter+1;
	var t_alter=0;
	var t_steigung=.0;
	var t_i=0;
	if(t_size<1){
		t_size=1;
	}
	var t_kurve=new_number_array(t_size);
	if(t_startlohn>=t_endlohn){
		for(t_i=0;t_i<t_size;t_i=t_i+1){
			t_kurve[t_i]=t_endlohn;
		}
	}else{
		var t_indexierung=this.p_getIndexierung(t_startalter,t_endalter,t_startlohn,t_endlohn,t_teuerung);
		for(t_alter=t_endalter;t_alter>=t_startalter;t_alter=t_alter+-1){
			if(t_endlohn<1.0){
				t_endlohn=0.0;
			}
			t_size-=1;
			t_kurve[t_size]=bb_utils_round2(t_endlohn,100.0);
			t_steigung=(t_teuerung+bb_ahv_werte_getKarrierezuschlag(this.m_land,t_alter)*t_indexierung)/100.0;
			t_endlohn/=1.0+t_steigung;
		}
	}
	return t_kurve;
}
c_Lohnkurve.prototype.p_fuehreTeilzeit=function(t_startjahr,t_kurve,t_teilzeit,t_teilzeit_von,t_teilzeit_bis){
	var t_j=0;
	var t_t=0;
	var t_i=0;
	if(t_teilzeit.length==0){
		return;
	}
	for(t_t=0;t_t<t_teilzeit.length;t_t=t_t+1){
		for(t_j=t_teilzeit_von[t_t];t_j<=t_teilzeit_bis[t_t];t_j=t_j+1){
			t_i=t_j-t_startjahr;
			if(t_i>=0 && t_i<t_kurve.length){
				t_kurve[t_i]=bb_utils_round2(t_kurve[t_i]*t_teilzeit[t_t]/100.0,100.0);
			}
		}
	}
}
c_Lohnkurve.prototype.p_sample=function(t_startval,t_guess){
	var t_alter=0;
	var t_steigung=.0;
	var t_startlohn=.0;
	var t_endlohn=this.m_mrEndlohn;
	for(t_alter=this.m_miEndalter;t_alter>=this.m_miStartalter;t_alter=t_alter+-1){
		t_startlohn=t_endlohn;
		t_steigung=(this.m_mrTeuerung+bb_ahv_werte_getKarrierezuschlag(this.m_land,t_alter)*t_guess)/100.0;
		t_endlohn/=1.0+t_steigung;
	}
	return t_startlohn;
}
function bb_ahv_werte_getKarrierezuschlag(t_land,t_iAlter){
	if(t_land.p_liechtenstein()){
		return 0.0;
	}
	if(t_iAlter<=22){
		return 1.0;
	}
	if(t_iAlter==23){
		return 0.9;
	}
	if(t_iAlter==24){
		return 0.8;
	}
	if(t_iAlter==25){
		return 0.7;
	}
	if(t_iAlter==26){
		return 0.6;
	}
	if(t_iAlter==27){
		return 0.5;
	}
	if(t_iAlter<=29){
		return 0.4;
	}
	if(t_iAlter<=31){
		return 0.3;
	}
	if(t_iAlter<=34){
		return 0.2;
	}
	if(t_iAlter<=38){
		return 0.1;
	}
	if(t_iAlter<=45){
		return 0.05;
	}
	return 0.0;
}
function bb_ahv_werte_getMinAngestelltEK(t_land,t_iJahr){
	if(t_land.p_liechtenstein()){
		return 3824.0;
	}
	if(t_iJahr<=1968){
		return 276.0;
	}
	if(t_iJahr<=1972){
		return 710.0;
	}
	if(t_iJahr<=1978){
		return 917.0;
	}
	if(t_iJahr<=1981){
		return 1834.0;
	}
	if(t_iJahr<=1985){
		return 2292.0;
	}
	if(t_iJahr<=1989){
		return 2751.0;
	}
	if(t_iJahr<=1991){
		return 2938.0;
	}
	if(t_iJahr<=1995){
		return 3268.0;
	}
	if(t_iJahr<=2002){
		return 3543.0;
	}
	if(t_iJahr<=2006){
		return 4208.0;
	}
	if(t_iJahr<=2008){
		return 4406.0;
	}
	if(t_iJahr<=2010){
		return 4554.0;
	}
	if(t_iJahr<=2012){
		return 4612.0;
	}
	if(t_iJahr<=2015){
		return 4667.0;
	}
	return t_land.m_minBeitragAngestellt;
}
function bb_ahv_werte_getMinErwerbslosEK(t_land,t_iJahr){
	return bb_ahv_werte_getMinAngestelltEK(t_land,t_iJahr);
}
function c_BVGKapital(){
	Object.call(this);
	this.m_land=null;
	this.m_meGeschlecht=0;
	this.m_mdGeburtsdatum=null;
	this.m_miStartalter=0;
	this.m_miPensionsalter=0;
	this.m_meGrenze=0;
	this.m_miStandjahr=0;
	this.m_mrEinkommen=.0;
	this.m_mbVermoegen=false;
	this.m_mrAlterskapital=.0;
	this.m_mrDeckungskapital=.0;
	this.m_mrSubsidkapital=.0;
	this.m_mrLohnkurve=[];
	this.m_mrVermoegen=[];
}
c_BVGKapital.m_new=function(t_land){
	this.m_land=t_land;
	this.m_meGeschlecht=0;
	this.m_mdGeburtsdatum=null;
	this.m_miStartalter=0;
	this.m_miPensionsalter=0;
	this.m_meGrenze=0;
	this.m_miStandjahr=0;
	this.m_mrEinkommen=0.0;
	this.m_mbVermoegen=false;
	this.m_mrAlterskapital=0.0;
	this.m_mrDeckungskapital=0.0;
	this.m_mrSubsidkapital=0.0;
	return this;
}
c_BVGKapital.m_new2=function(){
	return this;
}
c_BVGKapital.prototype.p_berechne2=function(t_log){
	var t_rLohn=.0;
	var t_rAbzug=.0;
	var t_rMinLohn=.0;
	var t_rMinVers=.0;
	var t_rMaxAHV=.0;
	var t_rMaxUVG=.0;
	var t_rLohnO=.0;
	var t_rLohnU=.0;
	var t_rBeitragO=.0;
	var t_rBeitragU=.0;
	var t_rSatzO=.0;
	var t_rZinsO=.0;
	var t_rSatzU=.0;
	var t_rZinsU=.0;
	var t_rAlterskapO=.0;
	var t_rAlterskapU=.0;
	var t_rDeckungskapO=.0;
	var t_rDeckungskapU=.0;
	var t_iJahr=0;
	var t_i=0;
	var t_s="";
	var t_iStartjahr=this.m_miStartalter+this.m_mdGeburtsdatum.p_getYear();
	var t_iPensionsjahr=this.m_miPensionsalter+this.m_mdGeburtsdatum.p_getYear();
	var t_iAnzahljahre=t_iPensionsjahr-t_iStartjahr+1;
	t_rMaxUVG=bb_uvg_werte_getMaxUVGLohn(this.m_land);
	t_rAlterskapO=0.0;
	t_rAlterskapU=0.0;
	t_rDeckungskapO=0.0;
	t_rDeckungskapU=0.0;
	this.m_mrAlterskapital=0.0;
	this.m_mrDeckungskapital=0.0;
	this.m_mrSubsidkapital=0.0;
	if(this.m_mbVermoegen){
		this.m_mrVermoegen=new_number_array(t_iAnzahljahre);
		for(t_i=0;t_i<t_iAnzahljahre;t_i=t_i+1){
			this.m_mrVermoegen[t_i]=0.0;
		}
	}
	t_i=0;
	for(t_iJahr=t_iStartjahr;t_iJahr<=t_iPensionsjahr;t_iJahr=t_iJahr+1){
		if(t_log!=null){
			t_log.p_writeNewline();
			t_log.p_writeSeparator();
			t_log.p_writeInt("Jahr",t_iJahr);
			t_log.p_writeInt("Alter",this.m_miStartalter+t_i);
		}
		t_rAbzug=bb_bvg_werte_getKoordinationsabzug(this.m_land,t_iJahr);
		t_rMinLohn=bb_bvg_werte_getMinVersicherbar(this.m_land,t_iJahr);
		t_rMinVers=bb_bvg_werte_getMinVersichert(this.m_land,t_iJahr);
		t_rMaxAHV=bb_bvg_werte_getMaxVersichert(this.m_land,t_iJahr);
		if(t_i<this.m_mrLohnkurve.length && t_iJahr<this.m_miStandjahr){
			t_rLohn=this.m_mrLohnkurve[t_i];
		}else{
			t_rLohn=this.m_mrEinkommen;
		}
		if(t_log!=null){
			t_log.p_writeNewline();
			t_log.p_writeInt("Mindest Lohn      ",((t_rMinLohn)|0));
			t_log.p_writeInt("Max. versicherbar ",((t_rMaxAHV)|0));
			t_log.p_writeInt("Koordinationsabzug",((t_rAbzug)|0));
			t_log.p_writeInt("Min. versichert   ",((t_rMinVers)|0));
		}
		if(t_rLohn<=t_rMinLohn){
			if(t_log!=null){
				t_log.p_writeNewline();
				t_log.p_writeInt("Lohn zu tief",((t_rLohn)|0));
			}
			if(this.m_mbVermoegen){
				this.m_mrVermoegen[t_i]=this.m_mrAlterskapital;
			}
			t_i+=1;
			continue;
		}
		if(this.m_meGrenze==1 && t_rLohn>t_rMaxAHV){
			t_rLohn=t_rMaxAHV;
		}
		if(this.m_meGrenze==2 && t_rLohn>t_rMaxUVG){
			t_rLohn=t_rMaxUVG;
		}
		t_rSatzO=bb_bvg_werte_getBeitragssatz(this.m_land,t_iJahr,this.m_mdGeburtsdatum.p_getYear(),this.m_meGeschlecht==1);
		t_rSatzU=bb_bvg_werte_getUeberbeitrag(this.m_land,t_iJahr,this.m_mdGeburtsdatum.p_getYear(),this.m_meGeschlecht==1);
		t_rZinsO=bb_bvg_werte_getSparzins(this.m_land,t_iJahr)/100.0;
		t_rZinsU=bb_bvg_werte_getUeberzins(this.m_land,t_iJahr)/100.0;
		if(t_rLohn>t_rMaxAHV){
			t_rLohnO=t_rMaxAHV;
			t_rLohnU=t_rLohn-t_rMaxAHV;
		}else{
			t_rLohnO=t_rLohn;
			t_rLohnU=0.0;
		}
		if(t_log!=null){
			t_log.p_writeNewline();
			t_log.p_writeInt("Versicherter Lohn",((t_rLohn)|0));
			t_log.p_writeInt("Teil Obligatorium",((t_rLohnO)|0));
			t_log.p_writeInt("Teil Ueberobligat",((t_rLohnU)|0));
		}
		t_rLohnO-=t_rAbzug;
		if(t_rLohnO<t_rMinVers){
			t_rLohnO=t_rMinVers;
		}
		t_rBeitragO=bb_utils_round(t_rSatzO*t_rLohnO);
		t_rBeitragU=bb_utils_round(t_rSatzU*t_rLohnU);
		if(t_log!=null){
			t_log.p_writeNewline();
			t_log.p_writeInt("Anrechenbar O.",((t_rLohnO)|0));
			t_log.p_writeInt("Anrechenbar U.",((t_rLohnU)|0));
			t_log.p_writeInt("Beitrag Obli  ",((t_rBeitragO)|0));
			t_log.p_writeInt("Beitrag Ueber ",((t_rBeitragU)|0));
		}
		if(t_iJahr<this.m_miStandjahr){
			this.m_mrSubsidkapital+=bb_utils_round(this.m_mrSubsidkapital*t_rZinsO);
		}
		this.m_mrSubsidkapital+=t_rBeitragO;
		t_rAlterskapO+=bb_utils_round(t_rAlterskapO*t_rZinsO);
		t_rAlterskapU+=bb_utils_round(t_rAlterskapU*t_rZinsU);
		if(t_iJahr<this.m_miStandjahr){
			t_rDeckungskapO+=bb_utils_round(t_rDeckungskapO*t_rZinsO);
			t_rDeckungskapU+=bb_utils_round(t_rDeckungskapU*t_rZinsU);
		}
		t_rAlterskapO+=t_rBeitragO;
		t_rAlterskapU+=t_rBeitragU;
		t_rDeckungskapO+=t_rBeitragO;
		t_rDeckungskapU+=t_rBeitragU;
		if(t_log!=null){
			t_log.p_writeNewline();
			t_log.p_writeInt("Alterskapital O.",((t_rAlterskapO)|0));
			t_log.p_writeInt("Alterskapital U.",((t_rAlterskapU)|0));
			t_log.p_writeFloat("Sparzins Obli.",t_rZinsO*100.0);
			t_log.p_writeFloat("Sparzins Ueber",t_rZinsU*100.0);
		}
		if(this.m_mbVermoegen){
			this.m_mrVermoegen[t_i]=t_rAlterskapO+t_rAlterskapU;
		}
		t_i+=1;
	}
	this.m_mrAlterskapital=t_rAlterskapO+t_rAlterskapU;
	this.m_mrDeckungskapital=t_rDeckungskapO+t_rDeckungskapU;
	if(t_log!=null){
		t_log.p_writeNewline();
		t_log.p_writeSeparator();
		t_log.p_writeInt("Alterskapital  ",((this.m_mrAlterskapital)|0));
		t_log.p_writeInt("Deckungskapital",((this.m_mrDeckungskapital)|0));
		t_log.p_writeInt("Subsidkapital  ",((this.m_mrSubsidkapital)|0));
	}
}
function c_Logging(){
	Object.call(this);
	this.m_file=null;
}
c_Logging.prototype.p_logString=function(t_s){
	if(this.m_file==null){
		return;
	}
}
c_Logging.prototype.p_writeNewline=function(){
	if(this.m_file==null){
		return;
	}
	this.p_logString("\n");
}
c_Logging.prototype.p_writeSeparator=function(){
	if(this.m_file==null){
		return;
	}
	this.p_logString("\n");
	this.p_logString("==============================\n");
	this.p_logString("\n");
}
c_Logging.prototype.p_writeInt=function(t_label,t_value){
	if(this.m_file==null){
		return;
	}
	this.p_logString(t_label+":  ");
	this.p_logString(String(t_value)+"\n");
}
c_Logging.prototype.p_writeFloat=function(t_label,t_value){
	if(this.m_file==null){
		return;
	}
	this.p_logString(t_label+":  ");
	this.p_logString(bb_utils_floatToString(t_value,2)+"\n");
}
function bb_ahv_werte_getMaxAltersrente(t_land){
	return t_land.m_ahvMinAltersrente*2.0;
}
function bb_bvg_werte_getMaxAHVRente(t_land,t_iJahr){
	if(t_iJahr<1998){
		return 23880.0;
	}
	if(t_iJahr<2001){
		return 24120.0;
	}
	if(t_iJahr<2003){
		return 24720.0;
	}
	if(t_iJahr<2009){
		return 25320.0;
	}
	if(t_iJahr<2011){
		return 27360.0;
	}
	if(t_iJahr<2012){
		return 27840.0;
	}
	if(t_iJahr<2015){
		return 28080.0;
	}
	return bb_ahv_werte_getMaxAltersrente(t_land);
}
function bb_bvg_werte_getKoordinationsabzug(t_land,t_iJahr){
	var t_rMaxRente=bb_bvg_werte_getMaxAHVRente(t_land,t_iJahr);
	if(t_land.p_liechtenstein()){
		return bb_utils_round(0.500*t_rMaxRente);
	}else{
		if(t_iJahr<2005){
			return bb_utils_round(t_rMaxRente);
		}else{
			return bb_utils_round(0.875*t_rMaxRente);
		}
	}
}
function bb_bvg_werte_getMinVersicherbar(t_land,t_iJahr){
	var t_rMaxRente=bb_bvg_werte_getMaxAHVRente(t_land,t_iJahr);
	if(t_iJahr<2005){
		return bb_utils_round(t_rMaxRente);
	}
	return bb_utils_round(0.75*t_rMaxRente);
}
function bb_bvg_werte_getMinVersichert(t_land,t_iJahr){
	var t_rMaxRente=bb_bvg_werte_getMaxAHVRente(t_land,t_iJahr);
	if(t_land.p_liechtenstein()){
		return bb_utils_round(0.250*t_rMaxRente);
	}else{
		return bb_utils_round(0.125*t_rMaxRente);
	}
}
function bb_bvg_werte_getMaxVersichert(t_land,t_iJahr){
	var t_rMaxRente=bb_bvg_werte_getMaxAHVRente(t_land,t_iJahr);
	return bb_utils_round(3.0*t_rMaxRente);
}
function bb_bvg_werte_getBeitragssatz(t_land,t_iJahr,t_iJahrgang,t_bMann){
	var t_iAlter=t_iJahr-t_iJahrgang;
	var t_rPz=0.0;
	if(t_land.p_liechtenstein()){
		if(t_iAlter>=24){
			return 0.08;
		}else{
			return 0.0;
		}
	}
	if(t_bMann || t_iJahr>=2005){
		if(t_iAlter>=25 && t_iAlter<35){
			t_rPz=7.0;
		}else{
			if(t_iAlter>=35 && t_iAlter<45){
				t_rPz=10.0;
			}else{
				if(t_iAlter>=45 && t_iAlter<55){
					t_rPz=15.0;
				}else{
					if(t_iAlter>=55){
						t_rPz=18.0;
					}
				}
			}
		}
	}else{
		if(t_iAlter>=25 && t_iAlter<32){
			t_rPz=7.0;
		}else{
			if(t_iAlter>=32 && t_iAlter<42){
				t_rPz=10.0;
			}else{
				if(t_iAlter>=42 && t_iAlter<52){
					t_rPz=15.0;
				}else{
					if(t_iAlter>=52){
						t_rPz=18.0;
					}
				}
			}
		}
	}
	return t_rPz/100.0;
}
function bb_bvg_werte_getUeberbeitrag(t_land,t_iJahr,t_iJahrgang,t_bMann){
	return 0.070000000000000007;
}
function bb_bvg_werte_getSparzins(t_land,t_iJahr){
	if(t_land.p_liechtenstein()){
		return t_land.m_sparzinsBPV;
	}
	if(t_land.m_prognoseBVG){
		return t_land.m_sparzinsBVG;
	}
	if(t_iJahr<2002){
		return 4.0;
	}
	if(t_iJahr<2009){
		return 2.75;
	}
	if(t_iJahr<2012){
		return 2.0;
	}
	if(t_iJahr<2015){
		return 1.75;
	}
	if(t_iJahr<2016){
		return 1.5;
	}
	if(t_iJahr<2017){
		return 1.25;
	}
	return 1.0;
}
function bb_bvg_werte_getUeberzins(t_land,t_iJahr){
	if(t_land.m_prognoseBVG){
		return t_land.m_sparzinsBVG;
	}
	return 1.0;
}
function bb_utils_floatToString(t_num,t_places){
	if(t_places==0){
		return String((bb_utils_round(t_num))|0);
	}
	var t_s=String(t_num);
	var t_p=t_s.indexOf(".",0);
	var t_maxLength=t_p+1+t_places;
	if(t_p==-1 || t_maxLength>=t_s.length){
		return t_s;
	}
	var t_ints=t_s.slice(0,t_p)+t_s.slice(t_p+1,t_maxLength);
	var t_length=t_ints.length;
	var t_chars=new_number_array(t_length);
	var t_i=t_length-1;
	var t_roundNext=false;
	while(t_i>=0){
		var t_char=t_ints.charCodeAt(t_i);
		if(t_roundNext){
			t_char+=1;
			if(t_char>57){
				t_char=48;
				t_roundNext=true;
			}else{
				t_roundNext=false;
			}
			t_chars[t_i]=t_char;
		}else{
			if(t_i==t_length-1 && t_char>=53){
				t_char+=1;
				if(t_char>57){
					t_char=48;
					t_roundNext=true;
				}
				t_chars[t_i]=t_char;
			}else{
				t_roundNext=false;
				break;
			}
		}
		t_i-=1;
	}
	if(t_roundNext){
		t_ints="1"+string_fromchars(t_chars);
		t_p+=1;
		return t_ints.slice(0,t_p)+".0";
	}else{
		if(t_i!=t_length-1){
			t_ints=t_ints.slice(0,t_i+1)+string_fromchars(t_chars.slice(t_i+1,t_i+2));
		}
	}
	return t_ints.slice(0,t_p)+"."+t_ints.slice(t_p);
}
function bb_bvg_werte_getVerrentungssatz(t_land,t_iJahrgang,t_bMann){
	if(t_land.p_liechtenstein()){
		return t_land.m_umwandlungBPV/100.0;
	}
	if(t_land.m_prognoseBVG){
		return t_land.m_umwandlungBVG/100.0;
	}
	if(t_bMann){
		if(t_iJahrgang<=1939){
			return 0.072000000000000008;
		}
		var t_1=t_iJahrgang;
		if(t_1==1940){
			return 0.071500000000000008;
		}else{
			if(t_1==1941){
				return 0.070999999999999994;
			}else{
				if(t_1==1942){
					return 0.070999999999999994;
				}else{
					if(t_1==1943){
						return 0.070499999999999993;
					}else{
						if(t_1==1944){
							return 0.070499999999999993;
						}else{
							if(t_1==1945){
								return 0.070000000000000007;
							}else{
								if(t_1==1946){
									return 0.069500000000000006;
								}else{
									if(t_1==1947){
										return 0.069000000000000006;
									}else{
										if(t_1==1948){
											return 0.068499999999999991;
										}else{
											if(t_1==1949){
												return 0.068000000000000005;
											}else{
												return 0.068000000000000005;
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}else{
		if(t_iJahrgang<=1942){
			return 0.072000000000000008;
		}
		var t_2=t_iJahrgang;
		if(t_2==1943){
			return 0.071500000000000008;
		}else{
			if(t_2==1944){
				return 0.070999999999999994;
			}else{
				if(t_2==1945){
					return 0.070000000000000007;
				}else{
					if(t_2==1946){
						return 0.069500000000000006;
					}else{
						if(t_2==1947){
							return 0.069000000000000006;
						}else{
							if(t_2==1948){
								return 0.068499999999999991;
							}else{
								if(t_2==1949){
									return 0.068000000000000005;
								}else{
									return 0.068000000000000005;
								}
							}
						}
					}
				}
			}
		}
	}
}
function bb_bvg_werte_getVerrentungssatz2(t_land,t_delta){
	var t_Tabelle=[5.89,6.03,6.19,6.37,6.55,6.80,6.96,7.19,7.44,7.70];
	if(t_delta>4){
		t_delta=4;
	}
	if(t_delta<-5){
		t_delta=-5;
	}
	if(t_land.p_liechtenstein() || t_land.m_prognoseBVG){
		var t_vsatz=bb_bvg_werte_getVerrentungssatz(t_land,2200,true);
		var t_dsatz=t_Tabelle[5+t_delta]-t_Tabelle[5];
		return t_vsatz+t_dsatz/100.0;
	}
	return t_Tabelle[5+t_delta]/100.0;
}
function c_Enumerator2(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator2.m_new=function(t_list){
	this.m__list=t_list;
	this.m__curr=t_list.m__head.m__succ;
	return this;
}
c_Enumerator2.m_new2=function(){
	return this;
}
c_Enumerator2.prototype.p_HasNext=function(){
	while(this.m__curr.m__succ.m__pred!=this.m__curr){
		this.m__curr=this.m__curr.m__succ;
	}
	return this.m__curr!=this.m__list.m__head;
}
c_Enumerator2.prototype.p_NextObject=function(){
	var t_data=this.m__curr.m__data;
	this.m__curr=this.m__curr.m__succ;
	return t_data;
}
function c_Teilrechner(){
	Object.call(this);
	this.m_land=null;
	this.m_mrTeilrente=.0;
	this.m_mrSkalennummer=.0;
	this.m_mrMassgebend=.0;
	this.m_mrTeilfaktor=.0;
	this.m_miTeilskala=0;
	this.m_maTeilrenten=[0.00,2.28,2.27,1.0,2.28,4.55,4.55,2.0,4.55,6.82,6.82,3.0,6.82,9.10,9.09,4.0,9.10,11.37,11.36,5.0,11.37,13.64,13.64,6.0,13.64,15.91,15.91,7.0,15.91,18.19,18.18,8.0,18.19,20.46,20.45,9.0,20.46,22.73,22.73,10.0,22.73,25.01,25.00,11.0,25.01,27.28,27.27,12.0,27.28,29.55,29.55,13.0,29.55,31.82,31.82,14.0,31.82,34.10,34.09,15.0,34.10,36.37,36.36,16.0,36.37,38.64,38.64,17.0,38.64,40.91,40.91,18.0,40.91,43.19,43.18,19.0,43.19,45.46,45.45,20.0,45.46,47.73,47.73,21.0,47.73,50.01,50.00,22.0,50.01,52.28,52.27,23.0,52.28,54.55,54.55,24.0,54.55,56.82,56.82,25.0,56.82,59.10,59.09,26.0,59.10,61.37,61.36,27.0,61.37,63.64,63.64,28.0,63.64,65.91,65.91,29.0,65.91,68.19,68.18,30.0,68.19,70.46,70.45,31.0,70.46,72.73,72.73,32.0,72.73,75.01,75.00,33.0,75.01,77.28,77.27,34.0,77.28,79.55,79.55,35.0,79.55,81.82,81.82,36.0,81.82,84.10,84.09,37.0,84.10,86.37,86.36,38.0,86.37,88.64,88.64,39.0,88.64,90.91,90.91,40.0,90.91,93.19,93.18,41.0,93.19,95.46,95.45,42.0,95.46,97.73,97.73,43.0,97.73,100.00,100.00,44.0,-1.0];
}
c_Teilrechner.m_new=function(t_land){
	this.m_land=t_land;
	this.m_mrTeilrente=0.0;
	this.m_mrSkalennummer=0.0;
	this.m_mrMassgebend=0.0;
	this.m_mrTeilfaktor=0.0;
	this.m_miTeilskala=0;
	return this;
}
c_Teilrechner.m_new2=function(){
	return this;
}
c_Teilrechner.prototype.p_calcTeilrenteSkala=function(t_teilrente,t_solljahre,t_fehljahre){
	var t_rJahresrente=.0;
	var t_iIstTotal=0;
	var t_j=0;
	this.m_mrTeilrente=t_teilrente;
	this.m_mrMassgebend=0.0;
	this.m_mrTeilfaktor=1.0;
	this.m_miTeilskala=0;
	if(t_fehljahre>0){
		t_iIstTotal=t_solljahre-t_fehljahre;
	}
	if(t_iIstTotal<0){
		t_iIstTotal=0;
	}
	this.m_mrTeilfaktor=bb_utils_trunc2(100.0*(t_iIstTotal)/(t_solljahre),0.0001);
	this.m_mrTeilfaktor=bb_utils_round(this.m_mrTeilfaktor*100.0)/100.0;
	do{
		if(this.m_mrTeilfaktor>=this.m_maTeilrenten[t_j] && this.m_mrTeilfaktor<this.m_maTeilrenten[t_j+1]){
			this.m_mrTeilfaktor=this.m_maTeilrenten[t_j+2];
			this.m_miTeilskala=((this.m_maTeilrenten[t_j+3])|0);
			break;
		}
		t_j+=4;
	}while(!(this.m_maTeilrenten[t_j]==-1.0));
	this.m_mrTeilfaktor=bb_utils_trunc2(this.m_mrTeilfaktor/100.0,0.0001);
	if(this.m_mrTeilfaktor<=0.0){
		this.m_mrTeilfaktor=1.0;
	}
	t_rJahresrente=bb_utils_round(this.m_mrTeilrente/this.m_mrTeilfaktor);
	this.m_mrMassgebend=bb_ahv_werte_getSkala44Altersrente(this.m_land,t_rJahresrente);
}
c_Teilrechner.prototype.p_calcDurchschnittIV=function(t_invrente,t_invgrad,t_geburtsjahr,t_invjahr,t_fehljahre){
	var t_iSolljahre=t_invjahr-t_geburtsjahr-21;
	if(t_iSolljahre<=1){
		t_iSolljahre=1;
		t_fehljahre=0;
	}
	var t_2=t_invgrad;
	if(t_2==1){
		t_invrente=0.0;
	}else{
		if(t_2==2){
			t_invrente=bb_utils_round(t_invrente/0.4);
		}else{
			if(t_2==3){
				t_invrente=bb_utils_round(t_invrente/0.5);
			}else{
				if(t_2==4){
					t_invrente=bb_utils_round(t_invrente/0.75);
				}else{
					if(t_2==5){
						t_invrente=bb_utils_round(t_invrente);
					}
				}
			}
		}
	}
	this.p_calcTeilrenteSkala(t_invrente,t_iSolljahre,t_fehljahre);
}
c_Teilrechner.prototype.p_calcDurchschnittAHV=function(t_altersrente,t_geburtsjahr,t_pensionsjahr,t_fehljahre){
	var t_iSolljahre=t_pensionsjahr-t_geburtsjahr-21;
	if(t_iSolljahre<=1){
		t_iSolljahre=1;
		t_fehljahre=0;
	}
	this.p_calcTeilrenteSkala(t_altersrente,t_iSolljahre,t_fehljahre);
}
c_Teilrechner.prototype.p_getTeilskala=function(t_teilrente){
	var t_j=0;
	this.m_mrTeilrente=t_teilrente;
	this.m_mrSkalennummer=44.0;
	do{
		if(this.m_mrTeilrente>=this.m_maTeilrenten[t_j] && this.m_mrTeilrente<this.m_maTeilrenten[t_j+1]){
			this.m_mrTeilrente=this.m_maTeilrenten[t_j+2];
			this.m_mrSkalennummer=this.m_maTeilrenten[t_j+3];
			break;
		}
		t_j+=4;
	}while(!(this.m_maTeilrenten[t_j]==-1.0));
}
function bb_ahv_werte_getMinAltersrente(t_land){
	return t_land.m_ahvMinAltersrente;
}
function bb_ahv_werte_getSkala44Altersrente(t_land,t_rMassEinkommen){
	if(t_rMassEinkommen<=bb_ahv_werte_getMinAltersrente(t_land)){
		return bb_ahv_werte_getMinAltersrente(t_land);
	}else{
		if(t_rMassEinkommen>=6.0*bb_ahv_werte_getMinAltersrente(t_land)){
			return 2.0*bb_ahv_werte_getMinAltersrente(t_land);
		}else{
			if(t_rMassEinkommen<=3.0*bb_ahv_werte_getMinAltersrente(t_land)){
				return 12.0*bb_utils_trunc2(0.74*bb_ahv_werte_getMinAltersrente(t_land)/12.0+13.0*t_rMassEinkommen/600.0,0.1);
			}else{
				return 12.0*bb_utils_trunc2(1.04*bb_ahv_werte_getMinAltersrente(t_land)/12.0+8.0*t_rMassEinkommen/600.0,0.1);
			}
		}
	}
}
function c_Enumerator3(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator3.m_new=function(t_list){
	this.m__list=t_list;
	this.m__curr=t_list.m__head.m__succ;
	return this;
}
c_Enumerator3.m_new2=function(){
	return this;
}
c_Enumerator3.prototype.p_HasNext=function(){
	while(this.m__curr.m__succ.m__pred!=this.m__curr){
		this.m__curr=this.m__curr.m__succ;
	}
	return this.m__curr!=this.m__list.m__head;
}
c_Enumerator3.prototype.p_NextObject=function(){
	var t_data=this.m__curr.m__data;
	this.m__curr=this.m__curr.m__succ;
	return t_data;
}
function c_AHVBasis(){
	c_Umfeld.call(this);
	this.m_miSplitStart=0;
	this.m_miSplitEnde=new_number_array(2);
	this.m_mdSplitting=null;
	this.m_maRisiko=new_object_array(2);
	this.m_maPension=new_object_array(2);
	this.m_maUpdate=new_object_array(2);
	this.implments={c_Loggable:1};
}
c_AHVBasis.prototype=extend_class(c_Umfeld);
c_AHVBasis.prototype.p_bestimmeSplitting=function(){
	if(!this.p_istGebunden()){
		return;
	}
	var t_p=0;
	var t_a=0;
	for(t_p=0;t_p<2;t_p=t_p+1){
		t_a=(t_p+1) % 2;
		if(this.m_mdInvDatum[t_p].p_isValid()){
			if(this.p_getPerson(t_a).m_miBezugsjahr>0){
				this.m_mdSplitting.p_setDate3(this.m_mdInvDatum[t_p]);
			}else{
				this.m_mdSplitting.p_setDate3(this.m_mdOrdDatum[t_a]);
			}
			break;
		}else{
			if(this.m_mdTodDatum[t_p].p_isValid()){
				if(this.p_getPerson(t_a).m_miBezugsjahr>0){
					this.m_mdSplitting.p_setDate3(this.m_mdTodDatum[t_p]);
				}else{
					if(this.p_istTodNachPension()){
						this.m_mdSplitting.p_setDate3(this.m_mdErlDatum[t_a]);
					}else{
						this.m_mdSplitting.p_setDate3(this.m_mdOrdDatum[t_a]);
					}
				}
				break;
			}
		}
	}
	var t_dPension=new_object_array(2);
	t_dPension[0]=c_Date.m_new.call(new c_Date);
	t_dPension[1]=c_Date.m_new.call(new c_Date);
	for(t_p=0;t_p<2;t_p=t_p+1){
		if(this.m_mdErlDatum[t_p].p_isValid()){
			t_dPension[t_p].p_setDate3(this.m_mdErlDatum[t_p]);
		}else{
			if(this.p_getPerson(t_p).m_mbAHVBezueger){
				var t_iMonth=this.m_mdOrdDatum[t_p].p_getMonth();
				var t_iYear=this.p_getPerson(t_p).m_miBezugsjahr;
				t_dPension[t_p].p_setDate(1,t_iMonth,t_iYear);
			}else{
				t_dPension[t_p].p_setDate3(this.m_mdOrdDatum[t_p]);
			}
		}
	}
	var t_HP=this.p_getPerson(0);
	var t_LP=this.p_getPerson(1);
	if(this.m_mdInvDatum[0].p_notValid() && this.m_mdInvDatum[1].p_notValid() && this.m_mdTodDatum[0].p_notValid() && this.m_mdTodDatum[1].p_notValid()){
		if(t_HP.m_miBezugsjahr>0){
			this.m_mdSplitting.p_setDate3(t_dPension[1]);
		}else{
			if(t_LP.m_miBezugsjahr>0){
				this.m_mdSplitting.p_setDate3(t_dPension[0]);
			}else{
				if(t_dPension[0].p_beforeOrSame(t_dPension[1])){
					this.m_mdSplitting.p_setDate3(t_dPension[1]);
				}else{
					this.m_mdSplitting.p_setDate3(t_dPension[0]);
				}
			}
		}
	}
	var t_iHP21=t_HP.m_mdGeburtsdatum.p_getYear()+21;
	var t_iLP21=t_LP.m_mdGeburtsdatum.p_getYear()+21;
	if(t_iHP21<t_iLP21){
		this.m_miSplitStart=t_iLP21;
	}else{
		this.m_miSplitStart=t_iHP21;
	}
	var t_iEhe=t_HP.m_mdZivildatum.p_getYear()+1;
	if(this.m_miSplitStart<t_iEhe){
		this.m_miSplitStart=t_iEhe;
	}
	var t_iEinreise0=t_HP.m_mdEinreisedatum.p_getYear();
	var t_iEinreise1=t_LP.m_mdEinreisedatum.p_getYear();
	if(this.m_miSplitStart<t_iEinreise0){
		this.m_miSplitStart=t_iEinreise0;
	}
	if(this.m_miSplitStart<t_iEinreise1){
		this.m_miSplitStart=t_iEinreise1;
	}
	var t_dEreignis=c_Date.m_new.call(new c_Date);
	for(t_p=0;t_p<2;t_p=t_p+1){
		t_a=(t_p+1) % 2;
		if(this.m_mdTodDatum[t_a].p_isValid()){
			t_dEreignis.p_setBefore(this.m_mdTodDatum[t_a]);
			this.m_miSplitEnde[t_p]=t_dEreignis.p_getYear()-1;
		}else{
			if(this.m_mdTodDatum[t_p].p_isValid()){
				this.m_miSplitEnde[t_p]=0;
			}else{
				if(t_dPension[t_p].p_beforeOrSame(t_dPension[t_a])){
					t_dEreignis.p_setBefore(t_dPension[t_p]);
					this.m_miSplitEnde[t_p]=t_dEreignis.p_getYear()-1;
				}else{
					t_dEreignis.p_setBefore(t_dPension[t_a]);
					this.m_miSplitEnde[t_p]=t_dEreignis.p_getYear()-1;
				}
			}
		}
	}
}
c_AHVBasis.prototype.p_setGrundPart=function(t_pcLage){
	if(t_pcLage==null){
		return;
	}
	var t_p=t_pcLage.m_uPerson;
	var t_a=(t_p+1) % 2;
	var t_se=0;
	var t_n=0;
	var t_s=0;
	var t_i=0;
	var t_sd=0;
	var t_d=new_number_array(3);
	var t_e=new_number_array(3);
	t_pcLage.m_iGrundPart=0;
	t_n=0;
	if(this.m_maRisiko[t_a].p_isValid()){
		t_d[t_n]=this.m_maRisiko[t_a].m_dMessung.p_getDaysFromOrigin();
		t_e[t_n]=1;
		t_n+=1;
	}
	if(this.m_maPension[t_a].p_isValid()){
		t_d[t_n]=this.m_maPension[t_a].m_dMessung.p_getDaysFromOrigin();
		t_e[t_n]=2;
		t_n+=1;
	}
	if(this.m_maUpdate[t_a].p_isValid()){
		t_d[t_n]=this.m_maUpdate[t_a].m_dMessung.p_getDaysFromOrigin();
		t_e[t_n]=3;
		t_n+=1;
	}
	for(t_i=0;t_i<2;t_i=t_i+1){
		for(t_s=1;t_s<t_n;t_s=t_s+1){
			if(t_d[t_s-1]>t_d[t_s]){
				t_sd=t_d[t_s-1];
				t_d[t_s-1]=t_d[t_s];
				t_d[t_s]=t_sd;
				t_se=t_e[t_s-1];
				t_e[t_s-1]=t_e[t_s];
				t_e[t_s]=t_se;
			}
		}
	}
	for(t_s=0;t_s<t_n;t_s=t_s+1){
		if(t_d[t_s]>=t_pcLage.m_dMessung.p_getDaysFromOrigin()){
			t_pcLage.m_iGrundPart=t_e[t_s];
			return;
		}
	}
	if(t_n>0){
		t_pcLage.m_iGrundPart=t_e[t_n-1];
	}
}
c_AHVBasis.prototype.p_erzeugeGrundlagen=function(){
	var t_p=0;
	var t_a=0;
	var t_dEreignis=c_Date.m_new.call(new c_Date);
	var t_dBezug=c_Date.m_new.call(new c_Date);
	for(t_p=0;t_p<this.p_getNbPersonen();t_p=t_p+1){
		if(this.m_mdInvDatum[t_p].p_isValid()){
			t_dEreignis.p_setBefore(this.m_mdInvDatum[t_p]);
			this.m_maRisiko[t_p].m_uPerson=t_p;
			this.m_maRisiko[t_p].m_dMessung.p_setDate3(t_dEreignis);
			this.m_maRisiko[t_p].m_dEreignis.p_setDate3(t_dEreignis);
			this.m_maRisiko[t_p].m_bEU=true;
			this.m_maRisiko[t_p].m_bSplitting=this.m_mdSplitting.p_isValid() && this.m_mdSplitting.p_beforeOrSame(this.m_mdInvDatum[t_p]);
			this.m_maRisiko[t_p].m_iGrundPers=1;
		}else{
			if(this.m_mdTodDatum[t_p].p_isValid()){
				t_dEreignis.p_setBefore(this.m_mdTodDatum[t_p]);
				this.m_maRisiko[t_p].m_uPerson=t_p;
				this.m_maRisiko[t_p].m_dMessung.p_setDate3(t_dEreignis);
				this.m_maRisiko[t_p].m_dEreignis.p_setDate3(t_dEreignis);
				this.m_maRisiko[t_p].m_bTod=true;
				this.m_maRisiko[t_p].m_bSplitting=this.m_mdSplitting.p_isValid() && this.m_mdSplitting.p_beforeOrSame(this.m_mdTodDatum[t_p]);
				this.m_maRisiko[t_p].m_iGrundPers=1;
			}
		}
		if(this.m_mdErlDatum[t_p].p_isValid() && this.m_mdTodDatum[t_p].p_notValid()){
			t_dEreignis.p_setBefore(this.m_mdErlDatum[t_p]);
			this.m_maPension[t_p].m_uPerson=t_p;
			this.m_maPension[t_p].m_dMessung.p_setDate3(t_dEreignis);
			this.m_maPension[t_p].m_dEreignis.p_setDate3(t_dEreignis);
			this.m_maPension[t_p].m_bErl=true;
			this.m_maPension[t_p].m_bSplitting=this.m_mdSplitting.p_isValid() && this.m_mdSplitting.p_beforeOrSame(this.m_mdErlDatum[t_p]);
			this.m_maPension[t_p].m_iGrundPers=2;
		}
	}
	var t_HP=this.p_getPerson(0);
	var t_LP=this.p_getPerson(1);
	var t_bBezueger=t_HP.m_mbIVBezueger || t_HP.m_mbAHVBezueger;
	if(this.p_mitPartner() && (t_LP.m_mbIVBezueger || t_LP.m_mbAHVBezueger)){
		t_bBezueger=true;
	}
	if(!t_bBezueger && this.p_istGebunden()){
		for(t_p=0;t_p<2;t_p=t_p+1){
			t_a=(t_p+1) % 2;
			if(this.m_mdInvDatum[t_p].p_isValid() && this.m_mdOrdDatum[t_p].p_isValid() && this.m_mdOrdDatum[t_a].p_isValid() && this.m_mdInvDatum[t_p].p_before(this.m_mdOrdDatum[t_a]) && this.m_mdOrdDatum[t_p].p_after(this.m_mdOrdDatum[t_a]) && this.m_mdOrdDatum[t_a].p_same(this.m_mdSplitting)){
				this.m_maUpdate[t_p].m_uPerson=t_p;
				this.m_maUpdate[t_p].m_dMessung.p_setBefore(this.m_mdOrdDatum[t_a]);
				this.m_maUpdate[t_p].m_dEreignis.p_setBefore(this.m_mdInvDatum[t_p]);
				this.m_maUpdate[t_p].m_bEU=true;
				this.m_maUpdate[t_p].m_bSplitting=true;
				this.m_maUpdate[t_p].m_iGrundPers=3;
			}
			if(this.m_maUpdate[t_p].p_notValid() && this.m_mdInvDatum[t_p].p_isValid() && this.m_mdOrdDatum[t_p].p_isValid() && this.m_mdOrdDatum[t_a].p_isValid() && this.m_mdOrdDatum[t_p].p_before(this.m_mdOrdDatum[t_a]) && this.m_mdOrdDatum[t_a].p_same(this.m_mdSplitting)){
				this.m_maUpdate[t_p].m_uPerson=t_p;
				this.m_maUpdate[t_p].m_dMessung.p_setBefore(this.m_mdOrdDatum[t_a]);
				this.m_maUpdate[t_p].m_dEreignis.p_setBefore(this.m_mdOrdDatum[t_p]);
				this.m_maUpdate[t_p].m_bErl=true;
				this.m_maUpdate[t_p].m_bSplitting=true;
				this.m_maUpdate[t_p].m_iGrundPers=3;
			}
			if(this.m_mdInvDatum[t_a].p_isValid()){
				t_dEreignis.p_setDate3(this.m_mdInvDatum[t_a]);
			}else{
				if(this.m_mdTodDatum[t_a].p_isValid()){
					t_dEreignis.p_setDate3(this.m_mdTodDatum[t_a]);
				}else{
					t_dEreignis.p_setDate3(this.m_mdErlDatum[t_a]);
				}
			}
			if(this.m_maUpdate[t_p].p_notValid() && t_dEreignis.p_isValid() && this.m_mdErlDatum[t_p].p_beforeOrSame(t_dEreignis)){
				this.m_maUpdate[t_p].m_uPerson=t_p;
				this.m_maUpdate[t_p].m_dMessung.p_setBefore(t_dEreignis);
				this.m_maUpdate[t_p].m_dEreignis.p_setBefore(this.m_mdErlDatum[t_p]);
				this.m_maUpdate[t_p].m_bErl=true;
				this.m_maUpdate[t_p].m_bSplitting=true;
				this.m_maUpdate[t_p].m_iGrundPers=3;
			}
		}
	}
	if(t_bBezueger && this.p_istGebunden()){
		for(t_p=0;t_p<2;t_p=t_p+1){
			t_a=(t_p+1) % 2;
			if(!this.p_getPerson(t_p).m_mbIVBezueger && !this.p_getPerson(t_p).m_mbAHVBezueger){
				continue;
			}
			if(this.m_mdInvDatum[t_a].p_isValid()){
				t_dEreignis.p_setDate3(this.m_mdInvDatum[t_a]);
				t_dBezug.p_setDate3(t_dEreignis);
				t_dBezug.p_addYears(this.m_miWartefrist);
			}else{
				if(this.m_mdTodDatum[t_a].p_isValid()){
					t_dEreignis.p_setDate3(this.m_mdTodDatum[t_a]);
					t_dBezug.p_setDate3(t_dEreignis);
				}else{
					if(this.m_mdErlDatum[t_a].p_isValid()){
						t_dEreignis.p_setDate3(this.m_mdErlDatum[t_a]);
						t_dBezug.p_setDate3(t_dEreignis);
					}else{
						continue;
					}
				}
			}
			if(t_dEreignis.p_isValid()){
				this.m_maUpdate[t_p].m_uPerson=t_p;
				this.m_maUpdate[t_p].m_dMessung.p_setBefore(t_dEreignis);
				this.m_maUpdate[t_p].m_dEreignis.p_setDate(1,6,this.p_getPerson(t_p).m_miBezugsjahr);
				this.m_maUpdate[t_p].m_dBezug.p_setDate3(t_dBezug);
				this.m_maUpdate[t_p].m_bErl=this.p_getPerson(t_p).m_mbAHVBezueger;
				this.m_maUpdate[t_p].m_bEU=this.p_getPerson(t_p).m_mbIVBezueger;
				this.m_maUpdate[t_p].m_bSplitting=true;
				this.m_maUpdate[t_p].m_iGrundPers=3;
				if(this.m_maRisiko[t_a].p_isValid()){
					this.m_maUpdate[t_p].m_iGrundPart=1;
					this.m_maRisiko[t_a].m_iGrundPart=3;
				}
			}
		}
	}
	for(t_p=0;t_p<2;t_p=t_p+1){
		if(this.m_maRisiko[t_p].p_isValid() && this.m_maRisiko[t_p].m_iGrundPart==0){
			this.p_setGrundPart(this.m_maRisiko[t_p]);
		}
		if(this.m_maPension[t_p].p_isValid() && this.m_maPension[t_p].m_iGrundPart==0){
			this.p_setGrundPart(this.m_maPension[t_p]);
		}
		if(this.m_maUpdate[t_p].p_isValid() && this.m_maUpdate[t_p].m_iGrundPart==0){
			this.p_setGrundPart(this.m_maUpdate[t_p]);
		}
	}
}
c_AHVBasis.prototype.p_getEndpunkt=function(t_pcLage){
	var t_p=t_pcLage.m_uPerson;
	var t_dDatum=c_Date.m_new.call(new c_Date);
	if(t_pcLage==this.m_maUpdate[t_p] && t_pcLage.m_bEU){
		t_dDatum.p_setDate3(t_pcLage.m_dMessung);
	}else{
		t_dDatum.p_setDate3(t_pcLage.m_dEreignis);
	}
	return t_dDatum;
}
c_AHVBasis.prototype.p_berechneSollZeiten=function(t_pcLage){
	if(t_pcLage==null || t_pcLage.p_notValid()){
		return;
	}
	var t_p=t_pcLage.m_uPerson;
	var t_dDatum=this.p_getEndpunkt(t_pcLage);
	t_pcLage.m_iSollErsterBeitrag=this.p_getPerson(t_p).m_mdGeburtsdatum.p_getYear()+21;
	t_pcLage.m_iSollLetzterBeitrag=t_dDatum.p_getYear()-1;
	t_pcLage.m_iSollBeitragsjahre=t_pcLage.m_iSollLetzterBeitrag-t_pcLage.m_iSollErsterBeitrag+1;
}
c_AHVBasis.prototype.p_erzeugeTabelle=function(t_pcLage){
	if(t_pcLage==null || t_pcLage.p_notValid()){
		return;
	}
	var t_p=t_pcLage.m_uPerson;
	var t_pcPerson=null;
	var t_pcBeitrag=null;
	var t_iAlter18=0;
	var t_iAlter21=0;
	var t_i=0;
	var t_n=0;
	t_pcPerson=this.p_getPerson(t_p);
	t_iAlter18=t_pcPerson.m_mdGeburtsdatum.p_getYear()+18;
	t_iAlter21=t_pcPerson.m_mdGeburtsdatum.p_getYear()+21;
	t_pcLage.m_iErsterEintrag=t_pcPerson.m_miErstesBeitragsjahr;
	if(t_pcLage.m_iErsterEintrag<t_iAlter18){
		t_pcLage.m_iErsterEintrag=t_iAlter18;
	}
	if(t_pcLage.m_iErsterEintrag>t_iAlter21){
		t_pcLage.m_iErsterEintrag=t_iAlter21;
	}
	t_pcLage.m_iLetzterEintrag=t_pcLage.m_dMessung.p_getYear();
	t_n=t_pcLage.m_iLetzterEintrag-t_pcLage.m_iErsterEintrag+1;
	if(t_n<1){
		t_n=1;
	}
	t_pcLage.m_iAnzahlEintraege=t_n;
	for(t_i=0;t_i<t_n;t_i=t_i+1){
		t_pcBeitrag=c_Beitrag.m_new.call(new c_Beitrag);
		t_pcLage.m_aBeitrag.p_add10(t_pcBeitrag);
	}
}
c_AHVBasis.prototype.p_fuelleVersichert=function(t_pcLage){
	if(t_pcLage==null || t_pcLage.p_notValid()){
		return;
	}
	var t_p=t_pcLage.m_uPerson;
	var t_pcPerson=null;
	var t_pcBeitrag=null;
	var t_i=0;
	var t_j=0;
	var t_f=0;
	var t_iJahr=0;
	var t_iMonate=0;
	var t_iFehlt=0;
	var t_iEinreiseJ=0;
	var t_iEinreiseM=0;
	var t_iEreignisJ=0;
	var t_iEreignisM=0;
	t_pcPerson=this.p_getPerson(t_p);
	t_iEinreiseJ=t_pcPerson.m_mdEinreisedatum.p_getYear();
	t_iEinreiseM=t_pcPerson.m_mdEinreisedatum.p_getMonth();
	var t_dEreignis=this.p_getEndpunkt(t_pcLage);
	t_dEreignis.p_setFirstOfNextMonth();
	t_iEreignisJ=t_dEreignis.p_getYear();
	t_iEreignisM=t_dEreignis.p_getMonth();
	for(t_i=0;t_i<t_pcLage.m_aBeitrag.p_size();t_i=t_i+1){
		t_pcBeitrag=t_pcLage.m_aBeitrag.p_get(t_i);
		t_iJahr=t_pcLage.m_iErsterEintrag+t_i;
		t_pcBeitrag.m_iJahr=t_iJahr;
		if(t_iJahr==t_iEinreiseJ){
			t_pcBeitrag.m_iMtVersichert=12-t_iEinreiseM+1;
		}else{
			if(t_iJahr==t_iEreignisJ){
				t_pcBeitrag.m_iMtVersichert=t_iEreignisM-1;
			}else{
				if(t_iJahr>t_iEinreiseJ && t_iJahr<t_iEreignisJ){
					t_pcBeitrag.m_iMtVersichert=12;
				}else{
					t_pcBeitrag.m_iMtVersichert=0;
				}
			}
		}
	}
	if(t_pcPerson.m_mbDurchschnitt && t_pcPerson.m_miAnzahlFehljahre>0){
		t_iFehlt=t_pcPerson.m_miAnzahlFehljahre;
		for(t_f=0;t_f<t_iFehlt;t_f=t_f+1){
			if(t_iEinreiseJ>=t_pcLage.m_iSollErsterBeitrag){
				t_i=t_f+t_iEinreiseJ-t_pcLage.m_iErsterEintrag;
			}else{
				t_i=t_f+t_pcLage.m_iSollErsterBeitrag-t_pcLage.m_iErsterEintrag;
			}
			if(t_i>=0 && t_i<t_pcLage.m_iAnzahlEintraege){
				t_pcBeitrag=t_pcLage.p_getBeitrag(t_i);
				t_pcBeitrag.m_iMtVersichert=0;
			}
		}
	}
	var t_pcEintrag=null;
	if(t_pcPerson.m_mbIKErfassung){
		var t_=t_pcPerson.m_maEintrag.p_ObjectEnumerator();
		while(t_.p_HasNext()){
			t_pcEintrag=t_.p_NextObject();
			if(t_pcEintrag.m_meErwerbsart!=7){
				continue;
			}
			t_iJahr=t_pcEintrag.m_miJahr;
			if(t_iJahr>t_iEreignisJ){
				continue;
			}
			t_i=t_iJahr-t_pcLage.m_iErsterEintrag;
			if(t_i<0 || t_i>=t_pcLage.m_iAnzahlEintraege){
				continue;
			}
			t_pcBeitrag=t_pcLage.p_getBeitrag(t_i);
			if(t_pcBeitrag.m_iMtVersichert==0){
				continue;
			}
			if(t_iJahr<t_iEreignisJ || t_pcEintrag.m_miMonate<=t_iEreignisM-1){
				t_iMonate=t_pcEintrag.m_miMonate;
			}else{
				t_iMonate=t_iEreignisM-1;
			}
			t_pcBeitrag.m_iMtVersichert-=t_iMonate;
			if(t_pcBeitrag.m_iMtVersichert<0){
				t_pcBeitrag.m_iMtVersichert=0;
			}
		}
	}
}
c_AHVBasis.prototype.p_fuelleEintrag=function(t_pcLage,t_i,t_iJahr,t_iMonate,t_eErwerbsart,t_rBetrag){
	if(t_pcLage==null || t_pcLage.p_notValid()){
		return;
	}
	var t_rSatz=.0;
	var t_rEinkommen=.0;
	var t_rBeitraege=.0;
	var t_iErfuellt=0;
	t_rSatz=bb_ahv_werte_getBeitragssatz(this.m_land,t_iJahr,t_eErwerbsart);
	var t_pcBeitrag=null;
	t_pcBeitrag=t_pcLage.p_getBeitrag(t_i);
	t_pcBeitrag.m_iJahr=t_iJahr;
	if(t_pcBeitrag.m_iErwerbsMt<t_iMonate){
		t_pcBeitrag.m_iErwerbsMt=t_iMonate;
		t_pcBeitrag.m_eErwerbsart=t_eErwerbsart;
	}
	t_rEinkommen=t_rBetrag;
	t_rBeitraege=bb_utils_round(t_rEinkommen*t_rSatz/100.0);
	if(t_eErwerbsart==5){
		if(t_rBetrag<1.0){
			t_rEinkommen=bb_ahv_werte_getMinErwerbslosEK(this.m_land,t_iJahr);
			t_iErfuellt=12;
		}else{
			t_iErfuellt=bb_ahv_werte_getAngestelltErfuellteMonate(this.m_land,t_iJahr,t_rEinkommen);
		}
	}else{
		if(t_eErwerbsart==3){
			var t_rMin=bb_ahv_werte_getMinErwerbslosEK(this.m_land,t_iJahr);
			if(t_rEinkommen<t_rMin){
				t_rEinkommen=t_rMin;
			}
			t_iErfuellt=12;
		}else{
			if(t_eErwerbsart==7){
				t_rEinkommen=0.0;
				t_iErfuellt=0;
			}else{
				if(t_eErwerbsart==1){
					t_iErfuellt=bb_ahv_werte_getAngestelltErfuellteMonate(this.m_land,t_iJahr,t_rEinkommen);
					if(t_rEinkommen>=2.0*bb_ahv_werte_getMinAngestelltEK(this.m_land,t_iJahr)){
						t_pcBeitrag.m_bDoppelt=true;
					}
				}else{
					if(t_eErwerbsart==2){
						t_iErfuellt=bb_ahv_werte_getSelbstaendigErfuellteMonate(this.m_land,t_iJahr,t_rBeitraege);
						if(t_rEinkommen>=2.0*bb_ahv_werte_getMinSelbstaendigEK(this.m_land,t_iJahr)){
							t_pcBeitrag.m_bDoppelt=true;
						}
					}else{
						t_iErfuellt=bb_ahv_werte_getErwerbslosErfuellteMonate(this.m_land,t_iJahr,t_rEinkommen);
					}
				}
			}
		}
	}
	t_pcBeitrag.m_iMtBeitragen+=t_iErfuellt;
	t_pcBeitrag.m_iMtErfuellt+=t_iErfuellt;
	t_pcBeitrag.m_rEigenEinkommen+=t_rEinkommen;
	if(t_pcBeitrag.m_iMtBeitragen>12){
		t_pcBeitrag.m_iMtBeitragen=12;
	}
	if(t_pcBeitrag.m_iMtErfuellt>12){
		t_pcBeitrag.m_iMtErfuellt=12;
	}
}
c_AHVBasis.prototype.p_fuelleTabelle=function(t_pcLage){
	if(t_pcLage==null || t_pcLage.p_notValid()){
		return;
	}
	var t_p=t_pcLage.m_uPerson;
	var t_pcPerson=null;
	var t_pcBeitrag=null;
	var t_pcEintrag=null;
	var t_i=0;
	var t_j=0;
	var t_iJahr=0;
	var t_iLetzt=0;
	var t_iHeute=0;
	var t_iMonate=0;
	var t_iEreignisJ=0;
	var t_iEreignisM=0;
	var t_iKeinLohnJ=0;
	var t_iKeinLohnM=0;
	var t_rBetrag=.0;
	var t_rEinkommen=.0;
	var t_rLetzt=.0;
	var t_rMassEKInv=.0;
	var t_bSplitting=false;
	var t_eErwerb=0;
	t_pcPerson=this.p_getPerson(t_p);
	var t_dEreignis=this.p_getEndpunkt(t_pcLage);
	t_dEreignis.p_setFirstOfNextMonth();
	t_iEreignisJ=t_dEreignis.p_getYear();
	t_iEreignisM=t_dEreignis.p_getMonth();
	t_iHeute=this.m_mdBerechnung.p_getYear();
	t_iKeinLohnJ=9999;
	t_iKeinLohnM=0;
	t_rMassEKInv=0.0;
	if(this.m_mdInvDatum[t_p].p_isValid()){
		t_iKeinLohnJ=this.m_mdInvDatum[t_p].p_getYear();
		t_iKeinLohnM=this.m_mdInvDatum[t_p].p_getMonth();
		if(t_pcLage!=this.m_maRisiko[t_p] && this.m_maRisiko[t_p].m_bEU){
			t_rMassEKInv=this.m_maRisiko[t_p].m_rMassEinkommen44;
		}
	}else{
		if(this.m_mdTodDatum[t_p].p_isValid()){
			t_iKeinLohnJ=this.m_mdTodDatum[t_p].p_getYear();
			t_iKeinLohnM=this.m_mdTodDatum[t_p].p_getMonth();
		}
	}
	if(t_pcPerson.m_mbIKErfassung){
		t_iLetzt=-1;
		t_rLetzt=0.0;
		var t_=t_pcPerson.m_maEintrag.p_ObjectEnumerator();
		while(t_.p_HasNext()){
			t_pcEintrag=t_.p_NextObject();
			t_iJahr=t_pcEintrag.m_miJahr;
			if(t_iJahr>t_iEreignisJ){
				continue;
			}
			t_i=t_iJahr-t_pcLage.m_iErsterEintrag;
			if(t_i<0 || t_i>=t_pcLage.m_iAnzahlEintraege){
				continue;
			}
			t_pcBeitrag=t_pcLage.p_getBeitrag(t_i);
			if(t_pcBeitrag.m_iMtVersichert==0){
				continue;
			}
			if(t_iLetzt<t_iJahr){
				t_iLetzt=t_iJahr;
				t_rLetzt=t_pcEintrag.m_mrEinkommen;
			}
			if(t_iJahr<t_iEreignisJ || t_pcEintrag.m_miMonate<=t_iEreignisM-1){
				t_iMonate=t_pcEintrag.m_miMonate;
				t_rBetrag=t_pcEintrag.m_mrEinkommen;
			}else{
				t_iMonate=t_iEreignisM-1;
				t_rBetrag=bb_utils_round((t_iMonate)*t_pcEintrag.m_mrEinkommen/(t_pcEintrag.m_miMonate));
			}
			this.p_fuelleEintrag(t_pcLage,t_i,t_iJahr,t_iMonate,t_pcEintrag.m_meErwerbsart,t_rBetrag);
		}
		for(t_iJahr=t_iLetzt+1;t_iJahr<=t_iEreignisJ;t_iJahr=t_iJahr+1){
			t_i=t_iJahr-t_pcLage.m_iErsterEintrag;
			if(t_i<0 || t_i>=t_pcLage.m_iAnzahlEintraege){
				continue;
			}
			t_pcBeitrag=t_pcLage.p_getBeitrag(t_i);
			if(t_pcBeitrag.m_iMtVersichert==0){
				continue;
			}
			if(t_pcPerson.m_mbIVBezueger && t_iJahr>=t_pcPerson.m_miBezugsjahr){
				t_iMonate=12;
				t_rBetrag=t_pcPerson.m_mrMassgebendesEK;
				t_eErwerb=4;
			}else{
				if(t_iJahr==t_iKeinLohnJ){
					if(this.m_mdTodDatum[t_p].p_isValid()){
						t_iMonate=t_iKeinLohnM-1;
						t_rBetrag=bb_utils_round((t_iMonate)*t_pcPerson.m_mrEinkommen/12.0);
						t_eErwerb=t_pcPerson.p_getBeitragsart();
					}else{
						t_iMonate=12;
						t_rBetrag=bb_utils_round((t_iKeinLohnM-1)*t_pcPerson.m_mrEinkommen/12.0+(12-t_iKeinLohnM+1)*t_rMassEKInv/12.0);
						if(t_iKeinLohnM<=8){
							t_eErwerb=t_pcPerson.p_getBeitragsart();
						}else{
							t_eErwerb=4;
						}
					}
				}else{
					if(t_iJahr>t_iKeinLohnJ){
						t_iMonate=12;
						t_rBetrag=t_rMassEKInv;
						t_eErwerb=4;
					}else{
						if(t_iJahr<t_iEreignisJ){
							if(t_iLetzt>t_iHeute){
								t_iMonate=12;
								t_rBetrag=t_rLetzt;
								t_eErwerb=t_pcPerson.p_getBeitragsart();
							}else{
								t_iMonate=12;
								t_rBetrag=t_pcPerson.m_mrEinkommen;
								t_eErwerb=t_pcPerson.p_getBeitragsart();
							}
							if(t_pcPerson.p_mitPrognose(t_iJahr)){
								t_rBetrag=t_pcPerson.p_getPrognose(t_iJahr);
							}
						}else{
							t_iMonate=t_iEreignisM-1;
							t_eErwerb=t_pcPerson.p_getBeitragsart();
							if(t_iLetzt>t_iHeute){
								t_rBetrag=bb_utils_round((t_iMonate)*t_rLetzt/12.0);
							}else{
								t_rBetrag=bb_utils_round((t_iMonate)*t_pcPerson.m_mrEinkommen/12.0);
							}
							if(t_pcPerson.p_mitPrognose(t_iJahr)){
								t_rBetrag=t_pcPerson.p_getPrognose(t_iJahr);
							}
						}
					}
				}
			}
			t_bSplitting=this.m_miSplitStart>0 && this.m_miSplitEnde[t_p]>0 && t_iJahr>=this.m_miSplitStart && t_iJahr<=this.m_miSplitEnde[t_p];
			if(bb_utils_round(t_rBetrag)==0.0 && !t_bSplitting){
				t_rBetrag=bb_ahv_werte_getMinErwerbslosEK(this.m_land,t_iJahr);
				t_eErwerb=4;
			}
			this.p_fuelleEintrag(t_pcLage,t_i,t_iJahr,t_iMonate,t_eErwerb,t_rBetrag);
		}
	}else{
		if(t_pcPerson.m_mbDurchschnitt){
			for(t_iJahr=t_pcPerson.m_miErstesBeitragsjahr;t_iJahr<=t_iEreignisJ;t_iJahr=t_iJahr+1){
				t_i=t_iJahr-t_pcLage.m_iErsterEintrag;
				if(t_i<0 || t_i>=t_pcLage.m_iAnzahlEintraege){
					continue;
				}
				t_pcBeitrag=t_pcLage.p_getBeitrag(t_i);
				if(t_pcBeitrag.m_iMtVersichert==0){
					continue;
				}
				t_bSplitting=this.m_miSplitStart>0 && this.m_miSplitEnde[t_p]>0 && t_iJahr>=this.m_miSplitStart;
				if(t_pcPerson.m_mbIVBezueger && t_iJahr>=t_pcPerson.m_miBezugsjahr){
					t_rEinkommen=t_pcPerson.m_mrMassgebendesEK;
				}else{
					if(t_iJahr>t_iKeinLohnJ){
						t_rEinkommen=t_rMassEKInv;
					}else{
						if(t_iJahr<t_iHeute || t_pcPerson.m_mbDurchgehend){
							t_rEinkommen=t_pcPerson.m_mrDurchschnittsEK;
						}else{
							t_rEinkommen=t_pcPerson.m_mrEinkommen;
						}
					}
				}
				if(t_pcPerson.m_mbIVBezueger && t_iJahr>=t_pcPerson.m_miBezugsjahr){
					t_iMonate=12;
					t_rBetrag=t_rEinkommen;
					t_eErwerb=4;
				}else{
					if(t_iJahr==t_iKeinLohnJ){
						if(this.m_mdTodDatum[t_p].p_isValid()){
							t_iMonate=t_iKeinLohnM-1;
							t_rBetrag=bb_utils_round((t_iMonate)*t_rEinkommen/12.0);
							t_eErwerb=t_pcPerson.p_getBeitragsart();
						}else{
							t_iMonate=12;
							t_rBetrag=bb_utils_round((t_iKeinLohnM-1)*t_rEinkommen/12.0+(12-t_iKeinLohnM+1)*t_rMassEKInv/12.0);
							if(t_iKeinLohnM<=8){
								t_eErwerb=t_pcPerson.p_getBeitragsart();
							}else{
								t_eErwerb=4;
							}
						}
					}else{
						if(t_iJahr<t_iEreignisJ){
							t_iMonate=12;
							t_rBetrag=t_rEinkommen;
							t_eErwerb=t_pcPerson.p_getBeitragsart();
							if(t_pcPerson.p_mitPrognose(t_iJahr)){
								t_rBetrag=t_pcPerson.p_getPrognose(t_iJahr);
							}
						}else{
							t_iMonate=t_iEreignisM-1;
							t_rBetrag=bb_utils_round((t_iMonate)*t_rEinkommen/12.0);
							t_eErwerb=t_pcPerson.p_getBeitragsart();
							if(t_pcPerson.p_mitPrognose(t_iJahr)){
								t_rBetrag=t_pcPerson.p_getPrognose(t_iJahr);
							}
						}
					}
				}
				t_bSplitting=this.m_miSplitStart>0 && this.m_miSplitEnde[t_p]>0 && t_iJahr>=this.m_miSplitStart && t_iJahr<=this.m_miSplitEnde[t_p];
				if(bb_utils_round(t_rBetrag)==0.0 && !t_bSplitting && t_iJahr>=t_iHeute){
					t_rBetrag=bb_ahv_werte_getMinErwerbslosEK(this.m_land,t_iJahr);
					t_eErwerb=4;
				}
				this.p_fuelleEintrag(t_pcLage,t_i,t_iJahr,t_iMonate,t_eErwerb,t_rBetrag);
			}
		}
	}
}
c_AHVBasis.prototype.p_getGrundPart=function(t_pcLage){
	if(t_pcLage==null || t_pcLage.p_notValid()){
		return null;
	}
	var t_p=t_pcLage.m_uPerson;
	var t_a=(t_p+1) % 2;
	var t_1=t_pcLage.m_iGrundPart;
	if(t_1==0){
		return null;
	}else{
		if(t_1==1){
			return this.m_maRisiko[t_a];
		}else{
			if(t_1==2){
				return this.m_maPension[t_a];
			}else{
				if(t_1==3){
					return this.m_maUpdate[t_a];
				}
			}
		}
	}
	return null;
}
c_AHVBasis.prototype.p_berechneErziehung=function(t_pcLage,t_pcPart){
	if(t_pcLage==null || t_pcLage.p_notValid()){
		return;
	}
	var t_p=t_pcLage.m_uPerson;
	var t_a=(t_p+1) % 2;
	var t_pcPerson=null;
	var t_pcPartner=null;
	var t_pcKind=null;
	var t_pcBeitrag=null;
	var t_i=0;
	var t_j=0;
	var t_k=0;
	var t_iJahr=0;
	var t_iHaelften=0;
	var t_iBezugAb=new_number_array(2);
	var t_iMinErziehung=0;
	var t_iMaxErziehung=0;
	var t_rGutschrift=.0;
	var t_dEreignis=null;
	var t_bPartnerNV=false;
	t_dEreignis=c_Date.m_new.call(new c_Date);
	t_rGutschrift=3.0*bb_ahv_werte_getMinAltersrente(this.m_land);
	t_iBezugAb[0]=3000;
	t_iBezugAb[1]=3000;
	if(this.p_istGebunden()){
		for(t_i=0;t_i<this.p_getNbPersonen();t_i=t_i+1){
			t_pcPerson=this.p_getPerson(t_i);
			if(t_pcPerson.m_mbAHVBezueger && t_pcPerson.m_miBezugsjahr>0){
				t_iBezugAb[t_i]=t_pcPerson.m_miBezugsjahr;
			}else{
				if(this.m_mdOrdDatum[t_i].p_isValid()){
					t_dEreignis.p_setBefore(this.m_mdOrdDatum[t_i]);
					t_iBezugAb[t_i]=t_dEreignis.p_getYear();
				}
			}
		}
	}
	t_pcPerson=this.p_getPerson(t_p);
	t_pcPartner=this.p_getPerson(t_a);
	var t_=this.m_maKinder.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		t_pcKind=t_.p_NextObject();
		t_iMinErziehung=t_pcKind.m_mdGeburtsdatum.p_getYear()+1;
		t_iMaxErziehung=t_pcKind.m_mdGeburtsdatum.p_getYear()+16;
		for(t_iJahr=t_iMinErziehung;t_iJahr<=t_iMaxErziehung;t_iJahr=t_iJahr+1){
			t_i=t_iJahr-t_pcLage.m_iErsterEintrag;
			if(t_i<0 || t_i>=t_pcLage.m_iAnzahlEintraege){
				continue;
			}
			if(t_iJahr>=t_iBezugAb[t_p]){
				continue;
			}
			t_bPartnerNV=false;
			if(this.p_mitPartner()){
				if(t_pcPart!=null){
					t_j=t_iJahr-t_pcPart.m_iErsterEintrag;
					if(t_j<0){
						t_bPartnerNV=true;
					}
				}
				if(t_iJahr>=t_iBezugAb[t_a]){
					t_bPartnerNV=true;
				}
			}
			t_iHaelften=0;
			var t_2=this.m_meBeziehung;
			if(t_2==3){
				if(t_pcKind.p_istKindVon(t_p) && t_pcKind.p_istKindVon(t_a)){
					if(t_bPartnerNV){
						t_iHaelften=2;
					}else{
						if(t_pcPerson.p_istFrau() && t_pcPartner.p_istMann()){
							t_iHaelften=2;
						}else{
							t_iHaelften=0;
						}
					}
					if(t_bPartnerNV){
						t_iHaelften=2;
					}else{
						t_iHaelften=1;
					}
				}else{
					if(t_pcKind.p_istKindVon(t_p)){
						var t_3=t_pcPerson.m_meZivilstand;
						if(t_3==1){
							if(t_pcKind.m_meHaushalt!=3){
								t_iHaelften=0;
							}else{
								t_iHaelften=2;
							}
						}else{
							if(t_3==2 || t_3==7){
								if(t_iJahr<t_pcPerson.m_mdZivildatum.p_getYear()){
									if(t_pcKind.m_meHaushalt!=3){
										t_iHaelften=0;
									}else{
										t_iHaelften=2;
									}
								}else{
									t_iHaelften=1;
								}
							}else{
								if(t_3==3){
									if(t_iJahr<t_pcPerson.m_mdZivildatum.p_getYear()){
										t_iHaelften=1;
									}else{
										if(t_pcKind.m_meHaushalt==5){
											t_iHaelften=0;
										}else{
											if(t_pcKind.m_meHaushalt==4){
												if(t_pcPerson.p_istFrau()){
													t_iHaelften=2;
												}else{
													t_iHaelften=0;
												}
											}else{
												t_iHaelften=2;
											}
										}
									}
								}else{
									if(t_3==4){
										if(t_iJahr<t_pcPerson.m_mdZivildatum.p_getYear()){
											t_iHaelften=1;
										}else{
											if(t_pcKind.m_meHaushalt==5){
												t_iHaelften=0;
											}else{
												if(t_pcKind.m_meHaushalt==4){
													t_iHaelften=2;
												}else{
													t_iHaelften=2;
												}
											}
										}
									}else{
										if(t_3==5 || t_3==8){
											t_iHaelften=1;
										}
									}
								}
							}
						}
					}else{
						continue;
					}
				}
			}else{
				if(t_2==1){
					var t_4=t_pcPerson.m_meZivilstand;
					if(t_4==1){
						if(t_pcKind.m_meHaushalt!=3){
							t_iHaelften=0;
						}else{
							t_iHaelften=2;
						}
					}else{
						if(t_4==2 || t_4==7){
							if(t_iJahr<t_pcPerson.m_mdZivildatum.p_getYear()){
								if(t_pcKind.m_meHaushalt!=3){
									t_iHaelften=0;
								}else{
									t_iHaelften=2;
								}
							}else{
								t_iHaelften=1;
							}
						}else{
							if(t_4==3){
								if(t_iJahr<t_pcPerson.m_mdZivildatum.p_getYear()){
									t_iHaelften=1;
								}else{
									if(t_pcKind.m_meHaushalt==5){
										t_iHaelften=0;
									}else{
										if(t_pcKind.m_meHaushalt==4){
											if(t_pcPerson.p_istFrau()){
												t_iHaelften=2;
											}else{
												t_iHaelften=0;
											}
										}else{
											t_iHaelften=2;
										}
									}
								}
							}else{
								if(t_4==4){
									if(t_iJahr<t_pcPerson.m_mdZivildatum.p_getYear()){
										t_iHaelften=1;
									}else{
										if(t_pcKind.m_meHaushalt==5){
											t_iHaelften=0;
										}else{
											if(t_pcKind.m_meHaushalt==4){
												t_iHaelften=2;
											}else{
												t_iHaelften=2;
											}
										}
									}
								}else{
									if(t_4==5 || t_4==8){
										t_iHaelften=1;
									}
								}
							}
						}
					}
				}else{
					if(t_iJahr<t_pcPerson.m_mdZivildatum.p_getYear()){
						if(t_pcKind.p_istKindVon(t_p) && t_pcKind.p_istKindVon(t_a)){
							if(t_bPartnerNV){
								t_iHaelften=2;
							}else{
								t_iHaelften=1;
							}
						}else{
							if(t_pcKind.p_istKindVon(t_p)){
								if(t_pcKind.m_meHaushalt==5){
									t_iHaelften=1;
								}else{
									if(t_pcKind.m_meHaushalt==4){
										t_iHaelften=2;
									}else{
										t_iHaelften=2;
									}
								}
							}else{
								continue;
							}
						}
					}else{
						if(t_pcKind.m_meHaushalt!=3){
							t_iHaelften=0;
						}else{
							if(t_bPartnerNV){
								t_iHaelften=2;
							}else{
								if(t_iJahr<t_iBezugAb[t_a]){
									t_iHaelften=1;
								}
							}
						}
					}
				}
			}
			t_pcBeitrag=t_pcLage.p_getBeitrag(t_i);
			if(t_pcBeitrag.m_iMtVersichert==12){
				if(t_iHaelften==1){
					t_pcBeitrag.m_rErziehungsGuts=bb_utils_round(t_rGutschrift/2.0);
				}else{
					if(t_iHaelften==2){
						t_pcBeitrag.m_rErziehungsGuts=bb_utils_round(t_rGutschrift);
					}
				}
			}
		}
	}
}
c_AHVBasis.prototype.p_uebernehmeErziehung=function(t_pcLage){
	if(t_pcLage==null || t_pcLage.p_notValid()){
		return;
	}
	var t_p=t_pcLage.m_uPerson;
	var t_a=(t_p+1) % 2;
	var t_pcPerson=null;
	var t_pcKind=null;
	var t_pcBeitrag=null;
	var t_pcEintrag=null;
	var t_i=0;
	var t_iJahr=0;
	var t_rGutschrift=.0;
	t_pcPerson=this.p_getPerson(t_p);
	if(!t_pcPerson.m_mbIKErfassung){
		return;
	}
	t_rGutschrift=3.0*bb_ahv_werte_getMinAltersrente(this.m_land);
	var t_=t_pcPerson.m_maEintrag.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		t_pcEintrag=t_.p_NextObject();
		t_iJahr=t_pcEintrag.m_miJahr;
		t_i=t_iJahr-t_pcLage.m_iErsterEintrag;
		if(t_i<0 || t_i>=t_pcLage.m_iAnzahlEintraege){
			continue;
		}
		t_pcBeitrag=t_pcLage.p_getBeitrag(t_i);
		if(t_pcEintrag.m_meErwerbsart==8){
			t_pcBeitrag.m_rErziehungsGuts=0.0;
		}else{
			if(t_pcEintrag.m_meErwerbsart==9){
				t_pcBeitrag.m_rErziehungsGuts=bb_utils_round(t_rGutschrift/4.0);
			}else{
				if(t_pcEintrag.m_meErwerbsart==10){
					t_pcBeitrag.m_rErziehungsGuts=bb_utils_round(t_rGutschrift/2.0);
				}else{
					if(t_pcEintrag.m_meErwerbsart==11){
						t_pcBeitrag.m_rErziehungsGuts=bb_utils_round(t_rGutschrift);
					}
				}
			}
		}
	}
}
c_AHVBasis.prototype.p_erfuelleErziehung=function(t_pcLage){
	if(t_pcLage==null || t_pcLage.p_notValid()){
		return;
	}
	var t_pcBeitrag=null;
	var t_=t_pcLage.m_aBeitrag.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		t_pcBeitrag=t_.p_NextObject();
		if(t_pcBeitrag.m_rErziehungsGuts>0.0){
			t_pcBeitrag.m_iMtBeitragen=12;
			t_pcBeitrag.m_iMtErfuellt=12;
		}
	}
}
c_AHVBasis.prototype.p_erfuellePartner=function(t_pcLage,t_pcPart){
	if(t_pcLage==null || t_pcLage.p_notValid()){
		return;
	}
	if(t_pcPart==null || t_pcPart.p_notValid()){
		return;
	}
	if(!this.p_istGebunden()){
		return;
	}
	var t_p=t_pcLage.m_uPerson;
	var t_a=(t_p+1) % 2;
	var t_iMin=0;
	var t_iMax=0;
	var t_iJahr=0;
	var t_i=0;
	var t_j=0;
	t_iMin=this.p_getPerson(t_p).p_getHeiratsdatum().p_getYear();
	t_iMax=t_pcLage.m_dMessung.p_getYear();
	var t_pcBeitragPerson=null;
	var t_pcBeitragPartner=null;
	for(t_iJahr=t_iMin;t_iJahr<=t_iMax;t_iJahr=t_iJahr+1){
		t_i=t_iJahr-t_pcLage.m_iErsterEintrag;
		t_j=t_iJahr-t_pcPart.m_iErsterEintrag;
		if(t_i<0 || t_i>=t_pcLage.m_iAnzahlEintraege){
			continue;
		}
		if(t_j<0 || t_j>=t_pcPart.m_iAnzahlEintraege){
			continue;
		}
		t_pcBeitragPerson=t_pcLage.p_getBeitrag(t_i);
		t_pcBeitragPartner=t_pcPart.p_getBeitrag(t_j);
		if(t_pcBeitragPartner.m_bDoppelt){
			t_pcBeitragPerson.m_iMtErfuellt=12;
		}
	}
}
c_AHVBasis.prototype.p_begrenzeErfuellung=function(t_pcLage){
	if(t_pcLage==null || t_pcLage.p_notValid()){
		return;
	}
	var t_pcBeitrag=null;
	var t_=t_pcLage.m_aBeitrag.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		t_pcBeitrag=t_.p_NextObject();
		if(t_pcBeitrag.m_iMtBeitragen>t_pcBeitrag.m_iMtVersichert){
			t_pcBeitrag.m_iMtBeitragen=t_pcBeitrag.m_iMtVersichert;
		}
		if(t_pcBeitrag.m_iMtErfuellt>t_pcBeitrag.m_iMtVersichert){
			t_pcBeitrag.m_iMtErfuellt=t_pcBeitrag.m_iMtVersichert;
		}
	}
}
c_AHVBasis.prototype.p_berechneUebergang=function(t_pcLage){
	if(t_pcLage==null || t_pcLage.p_notValid()){
		return;
	}
	var t_p=t_pcLage.m_uPerson;
	var t_a=(t_p+1) % 2;
	var t_pcPerson=null;
	var t_pcBeitrag=null;
	var t_eZivilstand=0;
	var t_rGutschrift=.0;
	var t_iErzGuts=0;
	var t_iUebGuts=0;
	var t_iMin=0;
	var t_iMax=0;
	var t_iJahr=0;
	var t_i=0;
	t_pcPerson=this.p_getPerson(t_p);
	t_eZivilstand=t_pcPerson.m_meZivilstand;
	if((t_eZivilstand==3 || t_eZivilstand==4) && t_pcPerson.m_mdGeburtsdatum.p_getYear()<1953){
		t_iErzGuts=0;
		t_rGutschrift=3.0*bb_ahv_werte_getMinAltersrente(this.m_land)/2.0;
		t_iMin=t_pcPerson.m_miErstesBeitragsjahr;
		t_iMax=t_pcLage.m_iSollLetzterBeitrag+1;
		for(t_iJahr=t_iMin;t_iJahr<=t_iMax;t_iJahr=t_iJahr+1){
			t_i=t_iJahr-t_pcLage.m_iErsterEintrag;
			if(t_i<0 || t_i>=t_pcLage.m_iAnzahlEintraege){
				continue;
			}
			t_pcBeitrag=t_pcLage.p_getBeitrag(t_i);
			if(t_pcBeitrag.m_rErziehungsGuts>0.0){
				t_iErzGuts+=1;
			}
		}
		if(t_iErzGuts<16){
			var t_5=t_pcPerson.m_mdGeburtsdatum.p_getYear();
			if(t_5==1952){
				t_iUebGuts=2;
			}else{
				if(t_5==1951){
					t_iUebGuts=4;
				}else{
					if(t_5==1950){
						t_iUebGuts=6;
					}else{
						if(t_5==1949){
							t_iUebGuts=8;
						}else{
							if(t_5==1948){
								t_iUebGuts=10;
							}else{
								if(t_5==1947){
									t_iUebGuts=12;
								}else{
									if(t_5==1946){
										t_iUebGuts=14;
									}else{
										t_iUebGuts=16;
									}
								}
							}
						}
					}
				}
			}
			if(t_iErzGuts+t_iUebGuts>=16){
				t_iUebGuts=16-t_iErzGuts;
			}
			t_pcLage.m_rSummeUebergang=(t_iUebGuts)*t_rGutschrift;
		}
	}
}
c_AHVBasis.prototype.p_fuelleAusJungendjahre=function(t_pcLage){
	if(t_pcLage==null || t_pcLage.p_notValid()){
		return;
	}
	var t_iVorhanden=0;
	var t_rVorhanden=.0;
	var t_rMonatlich=.0;
	var t_iLuecke=0;
	var t_rLuecke=.0;
	var t_iNehmen=0;
	var t_iGeben=0;
	var t_iN=0;
	var t_iG=0;
	var t_pcBeitrag=null;
	for(t_iNehmen=t_pcLage.m_iSollErsterBeitrag-1;t_iNehmen>=t_pcLage.m_iErsterEintrag;t_iNehmen=t_iNehmen+-1){
		t_iN=t_iNehmen-t_pcLage.m_iErsterEintrag;
		if(t_iN<0 || t_iN>=t_pcLage.m_iAnzahlEintraege){
			continue;
		}
		t_pcBeitrag=t_pcLage.p_getBeitrag(t_iN);
		t_iVorhanden=t_pcBeitrag.m_iMtBeitragen;
		if(t_iVorhanden<=0){
			continue;
		}
		t_rVorhanden=t_pcBeitrag.m_rEigenEinkommen;
		t_rMonatlich=t_rVorhanden/(t_iVorhanden);
		for(t_iGeben=t_pcLage.m_iSollErsterBeitrag;t_iGeben<=t_pcLage.m_iSollLetzterBeitrag;t_iGeben=t_iGeben+1){
			t_iG=t_iGeben-t_pcLage.m_iErsterEintrag;
			if(t_iG<0 || t_iG>=t_pcLage.m_iAnzahlEintraege){
				continue;
			}
			if(t_iVorhanden<=0){
				break;
			}
			t_pcBeitrag=t_pcLage.p_getBeitrag(t_iG);
			t_iLuecke=t_pcBeitrag.m_iMtVersichert-t_pcBeitrag.m_iMtErfuellt;
			t_rLuecke=bb_utils_round((t_iLuecke)*t_rMonatlich);
			if(t_iLuecke>0){
				if(t_iLuecke>=t_iVorhanden){
					t_pcBeitrag.m_iMtErfuellt+=t_iVorhanden;
					t_pcBeitrag.m_iMtEingefuegt+=t_iVorhanden;
					t_pcBeitrag.m_rEKEingefuegt+=t_rVorhanden;
					t_iVorhanden=0;
					t_rVorhanden=0.0;
					break;
				}else{
					t_pcBeitrag.m_iMtErfuellt+=t_iLuecke;
					t_pcBeitrag.m_iMtEingefuegt+=t_iLuecke;
					t_pcBeitrag.m_rEKEingefuegt+=t_rLuecke;
					t_iVorhanden-=t_iLuecke;
					t_rVorhanden-=t_rLuecke;
				}
			}
		}
		t_pcBeitrag=t_pcLage.p_getBeitrag(t_iN);
		t_pcBeitrag.m_iMtVerschoben=t_pcBeitrag.m_iMtBeitragen-t_iVorhanden;
		t_pcBeitrag.m_rEKVerschoben=t_pcBeitrag.m_rEigenEinkommen-t_rVorhanden;
	}
}
c_AHVBasis.prototype.p_splitteBeitraege=function(t_pcLage,t_pcPart){
	if(t_pcLage==null || t_pcLage.p_notValid()){
		return;
	}
	if(t_pcPart==null || t_pcPart.p_notValid()){
		return;
	}
	var t_p=t_pcLage.m_uPerson;
	var t_a=(t_p+1) % 2;
	var t_pcPerson=null;
	var t_pcPartner=null;
	var t_pcBeitrag=null;
	var t_pcBeitrag1=null;
	var t_pcBeitrag2=null;
	var t_i=0;
	var t_j=0;
	var t_iJahr=0;
	var t_r1=.0;
	var t_r2=.0;
	var t_rEK1=.0;
	var t_rEK2=.0;
	t_pcPerson=this.p_getPerson(t_p);
	var t_=t_pcLage.m_aBeitrag.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		t_pcBeitrag=t_.p_NextObject();
		t_pcBeitrag.m_rGesplittetesEK=t_pcBeitrag.m_rEigenEinkommen+t_pcBeitrag.m_rEKEingefuegt;
	}
	if(!this.p_istGebunden()){
		return;
	}
	if(this.m_miSplitStart==0 || this.m_miSplitEnde[t_p]==0){
		return;
	}
	t_pcPartner=this.p_getPerson(t_a);
	for(t_iJahr=this.m_miSplitStart;t_iJahr<=this.m_miSplitEnde[t_p];t_iJahr=t_iJahr+1){
		t_i=t_iJahr-t_pcLage.m_iErsterEintrag;
		t_j=t_iJahr-t_pcPart.m_iErsterEintrag;
		if(t_i<0 || t_i>=t_pcLage.m_iAnzahlEintraege){
			continue;
		}
		if(t_j<0 || t_j>=t_pcPart.m_iAnzahlEintraege){
			continue;
		}
		t_pcBeitrag1=t_pcLage.p_getBeitrag(t_i);
		t_pcBeitrag2=t_pcPart.p_getBeitrag(t_j);
		t_r1=1.0;
		t_r2=1.0;
		if(t_pcPerson.m_mbIVBezueger && t_pcPerson.m_mbIVHalbiert && t_pcPerson.m_miBezugsjahr<=t_iJahr){
			t_r1=0.5;
		}
		if(t_pcPartner.m_mbIVBezueger && t_pcPartner.m_mbIVHalbiert && t_pcPartner.m_miBezugsjahr<=t_iJahr){
			t_r2=0.5;
		}
		t_rEK1=t_pcBeitrag1.m_rEigenEinkommen+t_pcBeitrag1.m_rEKEingefuegt;
		t_rEK2=t_pcBeitrag2.m_rEigenEinkommen+t_pcBeitrag2.m_rEKEingefuegt;
		t_pcBeitrag1.m_rGesplittetesEK=bb_utils_round((t_r1*t_rEK1+t_r2*t_rEK2)/2.0);
	}
}
c_AHVBasis.prototype.p_fuelleAusZusatzmonate=function(t_pcLage){
	if(t_pcLage==null || t_pcLage.p_notValid()){
		return;
	}
	var t_iMtErfuellt=0;
	var t_iJhErfuellt=0;
	var t_iVorhanden=0;
	var t_iLuecke=0;
	var t_iJahr=0;
	var t_i=0;
	var t_pcBeitrag=null;
	t_iMtErfuellt=0;
	for(t_iJahr=t_pcLage.m_iSollErsterBeitrag;t_iJahr<=t_pcLage.m_iSollLetzterBeitrag+1;t_iJahr=t_iJahr+1){
		t_i=t_iJahr-t_pcLage.m_iErsterEintrag;
		if(t_i<0 || t_i>=t_pcLage.m_iAnzahlEintraege){
			continue;
		}
		t_pcBeitrag=t_pcLage.p_getBeitrag(t_i);
		t_iMtErfuellt+=t_pcBeitrag.m_iMtErfuellt;
	}
	t_iJhErfuellt=((t_iMtErfuellt/12)|0);
	if(t_iJhErfuellt>=20 && t_iJhErfuellt<=26){
		t_pcLage.m_iIstZusatzmonate=12;
	}
	if(t_iJhErfuellt>=27 && t_iJhErfuellt<=33){
		t_pcLage.m_iIstZusatzmonate=24;
	}
	if(t_iJhErfuellt>=34){
		t_pcLage.m_iIstZusatzmonate=36;
	}
	t_iVorhanden=t_pcLage.m_iIstZusatzmonate;
	if(t_iVorhanden<=0){
		return;
	}
	for(t_iJahr=1978;t_iJahr>=t_pcLage.m_iSollErsterBeitrag;t_iJahr=t_iJahr+-1){
		t_i=t_iJahr-t_pcLage.m_iErsterEintrag;
		if(t_i<0 || t_i>=t_pcLage.m_iAnzahlEintraege){
			continue;
		}
		if(t_iVorhanden<=0){
			break;
		}
		t_pcBeitrag=t_pcLage.p_getBeitrag(t_i);
		t_iLuecke=t_pcBeitrag.m_iMtVersichert-t_pcBeitrag.m_iMtErfuellt;
		if(t_iLuecke>0){
			if(t_iLuecke>=t_iVorhanden){
				t_pcBeitrag.m_iMtErfuellt+=t_iVorhanden;
				t_pcBeitrag.m_iMtGeschenkt+=t_iVorhanden;
				break;
			}else{
				t_pcBeitrag.m_iMtErfuellt+=t_iLuecke;
				t_pcBeitrag.m_iMtGeschenkt+=t_iLuecke;
				t_iVorhanden-=t_iLuecke;
			}
		}
	}
}
c_AHVBasis.prototype.p_fuelleAusEreignisjahr=function(t_pcLage){
	if(t_pcLage==null || t_pcLage.p_notValid()){
		return;
	}
	var t_iEreignisJ=0;
	var t_iEreignisI=0;
	var t_iLuecke=0;
	var t_iVorhanden=0;
	var t_iJahr=0;
	var t_i=0;
	var t_pcBeitrag=null;
	var t_dEreignis=this.p_getEndpunkt(t_pcLage);
	t_iEreignisJ=t_dEreignis.p_getYear();
	t_iEreignisI=t_iEreignisJ-t_pcLage.m_iErsterEintrag;
	if(t_iEreignisI<0 || t_iEreignisI>=t_pcLage.m_iAnzahlEintraege){
		return;
	}
	t_pcBeitrag=t_pcLage.p_getBeitrag(t_iEreignisI);
	t_iVorhanden=t_pcBeitrag.m_iMtBeitragen;
	if(t_iVorhanden<=0){
		return;
	}
	for(t_iJahr=t_pcLage.m_iSollLetzterBeitrag;t_iJahr>=t_pcLage.m_iSollErsterBeitrag;t_iJahr=t_iJahr+-1){
		t_i=t_iJahr-t_pcLage.m_iErsterEintrag;
		if(t_i<0 || t_i>=t_pcLage.m_iAnzahlEintraege){
			continue;
		}
		if(t_iVorhanden<=0){
			break;
		}
		t_pcBeitrag=t_pcLage.p_getBeitrag(t_i);
		t_iLuecke=t_pcBeitrag.m_iMtVersichert-t_pcBeitrag.m_iMtErfuellt;
		if(t_iLuecke>0){
			if(t_iLuecke>=t_iVorhanden){
				t_pcBeitrag.m_iMtErfuellt+=t_iVorhanden;
				t_pcBeitrag.m_iMtEingefuegt+=t_iVorhanden;
				t_iVorhanden=0;
				break;
			}else{
				t_pcBeitrag.m_iMtErfuellt+=t_iLuecke;
				t_pcBeitrag.m_iMtEingefuegt+=t_iLuecke;
				t_iVorhanden-=t_iLuecke;
			}
		}
	}
	t_pcBeitrag=t_pcLage.p_getBeitrag(t_iEreignisI);
	t_pcBeitrag.m_iMtVerschoben=t_pcBeitrag.m_iMtBeitragen-t_iVorhanden;
}
c_AHVBasis.prototype.p_berechneIstZeiten=function(t_pcLage){
	if(t_pcLage==null || t_pcLage.p_notValid()){
		return;
	}
	var t_p=t_pcLage.m_uPerson;
	var t_pcPerson=null;
	var t_pcBeitrag=null;
	var t_i=0;
	var t_iJahr=0;
	var t_iMonate=0;
	var t_iEinreiseJ=0;
	t_pcPerson=this.p_getPerson(t_p);
	t_pcLage.m_iIstErsterBeitrag=t_pcPerson.m_miErstesBeitragsjahr;
	if(t_pcLage.m_iIstErsterBeitrag<t_pcLage.m_iErsterEintrag){
		t_pcLage.m_iIstErsterBeitrag=t_pcLage.m_iErsterEintrag;
	}
	if(t_pcPerson.m_mbIKErfassung){
		for(t_iJahr=t_pcLage.m_iSollErsterBeitrag;t_iJahr<=t_pcLage.m_iSollLetzterBeitrag;t_iJahr=t_iJahr+1){
			t_i=t_iJahr-t_pcLage.m_iErsterEintrag;
			if(t_i<0 || t_i>=t_pcLage.m_iAnzahlEintraege){
				continue;
			}
			t_pcBeitrag=t_pcLage.p_getBeitrag(t_i);
			if(t_pcBeitrag.m_iMtErfuellt>0){
				t_pcLage.m_iIstErsterAnrechenbar=t_iJahr;
				break;
			}
		}
		if(t_pcLage.m_iIstErsterAnrechenbar==0){
			t_pcLage.m_iIstErsterAnrechenbar=t_pcLage.m_iSollErsterBeitrag;
		}
		t_iMonate=0;
		for(t_iJahr=t_pcLage.m_iSollErsterBeitrag;t_iJahr<=t_pcLage.m_iSollLetzterBeitrag;t_iJahr=t_iJahr+1){
			t_i=t_iJahr-t_pcLage.m_iErsterEintrag;
			if(t_i<0 || t_i>=t_pcLage.m_iAnzahlEintraege){
				continue;
			}
			t_pcBeitrag=t_pcLage.p_getBeitrag(t_i);
			t_iMonate+=t_pcBeitrag.m_iMtErfuellt;
		}
		t_pcLage.m_iIstBeitragsmonate=t_iMonate;
		t_pcLage.m_iIstBeitragsjahre=((bb_utils_round((t_iMonate)/12.0))|0);
		t_pcLage.m_iIstFehljahre=t_pcLage.m_iSollBeitragsjahre-t_pcLage.m_iIstBeitragsjahre;
		if(t_pcPerson.m_mbNettofehljahre){
			t_pcLage.m_iIstFehljahre=t_pcPerson.m_miAnzahlFehljahre;
		}
		if(t_pcLage.m_iIstFehljahre>t_pcLage.m_iSollBeitragsjahre){
			t_pcLage.m_iIstFehljahre=t_pcLage.m_iSollBeitragsjahre;
		}
	}
	if(t_pcPerson.m_mbDurchschnitt){
		t_pcLage.m_iIstErsterAnrechenbar=t_pcLage.m_iIstErsterBeitrag;
		if(t_pcLage.m_iIstErsterAnrechenbar<t_pcLage.m_iSollErsterBeitrag){
			t_pcLage.m_iIstErsterAnrechenbar=t_pcLage.m_iSollErsterBeitrag;
		}
		t_pcLage.m_iIstFehljahre=t_pcPerson.m_miAnzahlFehljahre;
		t_iEinreiseJ=t_pcPerson.m_mdEinreisedatum.p_getYear();
		if(t_pcPerson.m_mdEinreisedatum.p_getMonth()==1){
			t_iEinreiseJ-=1;
		}
		if(t_iEinreiseJ>=t_pcLage.m_iSollErsterBeitrag){
			t_pcLage.m_iIstFehljahre+=t_iEinreiseJ-t_pcLage.m_iSollErsterBeitrag+1;
		}
		if(t_pcPerson.m_mbNettofehljahre){
			t_pcLage.m_iIstFehljahre=t_pcPerson.m_miAnzahlFehljahre;
		}
		if(t_pcLage.m_iIstFehljahre>t_pcLage.m_iSollBeitragsjahre){
			t_pcLage.m_iIstFehljahre=t_pcLage.m_iSollBeitragsjahre;
		}
		t_pcLage.m_iIstBeitragsjahre=t_pcLage.m_iSollBeitragsjahre-t_pcLage.m_iIstFehljahre;
		t_pcLage.m_iIstBeitragsmonate=t_pcLage.m_iIstBeitragsjahre*12;
		if(t_pcLage.m_iIstBeitragsjahre<0){
			t_pcLage.m_iIstBeitragsjahre=0;
			t_pcLage.m_iIstBeitragsmonate=0;
		}
	}
}
c_AHVBasis.prototype.p_setzeBeitragsinfo=function(t_pcLage){
	if(t_pcLage==null || t_pcLage.p_notValid()){
		return;
	}
	var t_p=t_pcLage.m_uPerson;
	var t_a=(t_p+1) % 2;
	var t_pcBeitrag=null;
	var t_iJahr=0;
	var t_i=0;
	for(t_iJahr=t_pcLage.m_iSollErsterBeitrag;t_iJahr<=t_pcLage.m_iSollLetzterBeitrag;t_iJahr=t_iJahr+1){
		t_i=t_iJahr-t_pcLage.m_iErsterEintrag;
		if(t_i<0 || t_i>=t_pcLage.m_iAnzahlEintraege){
			continue;
		}
		t_pcBeitrag=t_pcLage.p_getBeitrag(t_i);
		t_pcBeitrag.m_bFehljahr=t_pcBeitrag.m_iMtErfuellt==0;
	}
	for(t_iJahr=t_pcLage.m_iErsterEintrag;t_iJahr<t_pcLage.m_iSollErsterBeitrag;t_iJahr=t_iJahr+1){
		t_i=t_iJahr-t_pcLage.m_iErsterEintrag;
		if(t_i<0 || t_i>=t_pcLage.m_iAnzahlEintraege){
			continue;
		}
		t_pcBeitrag=t_pcLage.p_getBeitrag(t_i);
		t_pcBeitrag.m_bJugend=true;
	}
	for(t_iJahr=this.m_miSplitStart;t_iJahr<=this.m_miSplitEnde[t_p];t_iJahr=t_iJahr+1){
		t_i=t_iJahr-t_pcLage.m_iErsterEintrag;
		if(t_i<0 || t_i>=t_pcLage.m_iAnzahlEintraege){
			continue;
		}
		t_pcBeitrag=t_pcLage.p_getBeitrag(t_i);
		t_pcBeitrag.m_bSplitting=true;
	}
}
c_AHVBasis.prototype.p_berechneMassgebend=function(t_pcLage){
	if(t_pcLage==null || t_pcLage.p_notValid()){
		return;
	}
	var t_p=t_pcLage.m_uPerson;
	var t_a=(t_p+1) % 2;
	var t_iMin=0;
	var t_iMax=0;
	var t_iJahr=0;
	var t_i=0;
	var t_pcBeitrag=null;
	t_iMin=t_pcLage.m_iSollErsterBeitrag;
	t_iMax=t_pcLage.m_iSollLetzterBeitrag;
	for(t_iJahr=t_iMin;t_iJahr<=t_iMax;t_iJahr=t_iJahr+1){
		t_i=t_iJahr-t_pcLage.m_iErsterEintrag;
		if(t_i<0 || t_i>=t_pcLage.m_iAnzahlEintraege){
			continue;
		}
		t_pcBeitrag=t_pcLage.p_getBeitrag(t_i);
		if(t_pcLage.m_bSplitting && t_iJahr>=this.m_miSplitStart && t_iJahr<=this.m_miSplitEnde[t_p]){
			t_pcLage.m_rSummeEinkommen+=t_pcBeitrag.m_rGesplittetesEK;
		}else{
			t_pcLage.m_rSummeEinkommen+=t_pcBeitrag.m_rEigenEinkommen+t_pcBeitrag.m_rEKEingefuegt;
		}
		t_pcLage.m_rTotalEinkommen+=t_pcBeitrag.m_rEigenEinkommen+t_pcBeitrag.m_rEKEingefuegt;
	}
	if(t_pcLage.m_iIstBeitragsjahre>0){
		t_pcLage.m_rDurchEinkommen=bb_utils_round(t_pcLage.m_rSummeEinkommen*12.0/(t_pcLage.m_iIstBeitragsmonate));
	}
	if(t_pcLage.m_iIstErsterAnrechenbar!=0){
		t_pcLage.m_rAufwertungsfaktor=bb_ahv_werte_getAufwertungsfaktor(this.m_land,t_pcLage.m_iIstErsterAnrechenbar);
	}else{
		t_pcLage.m_rAufwertungsfaktor=1.0;
	}
	t_pcLage.m_rDurchAufgewertet=t_pcLage.m_rDurchEinkommen*t_pcLage.m_rAufwertungsfaktor;
	if(t_pcLage.m_bTod){
		var t_iAlter=this.p_getPerson(t_p).p_getAlterAm(t_pcLage.m_dEreignis);
		t_pcLage.m_rKarrierefaktor=bb_ahv_werte_getKarrierezuschlag(this.m_land,t_iAlter);
		t_pcLage.m_rKarriereprozent=bb_utils_round(t_pcLage.m_rKarrierefaktor*100.0);
		t_pcLage.m_rDurchAufgewertet*=1.0+t_pcLage.m_rKarrierefaktor;
	}
	t_pcLage.m_rDurchAufgewertet=bb_utils_round(t_pcLage.m_rDurchAufgewertet);
	for(t_iJahr=t_iMin;t_iJahr<=t_iMax;t_iJahr=t_iJahr+1){
		t_i=t_iJahr-t_pcLage.m_iErsterEintrag;
		if(t_i<0 || t_i>=t_pcLage.m_iAnzahlEintraege){
			continue;
		}
		t_pcBeitrag=t_pcLage.p_getBeitrag(t_i);
		t_pcLage.m_rSummeErziehung+=t_pcBeitrag.m_rErziehungsGuts;
	}
	if(t_pcLage.m_iIstBeitragsjahre>0){
		t_pcLage.m_rDurchErziehung=bb_utils_round(t_pcLage.m_rSummeErziehung/(t_pcLage.m_iIstBeitragsjahre));
		t_pcLage.m_rDurchSchriften=bb_utils_round((t_pcLage.m_rSummeUebergang+t_pcLage.m_rSummeErziehung)/(t_pcLage.m_iIstBeitragsjahre));
	}
	t_pcLage.m_rMassEinkommen=bb_utils_round(t_pcLage.m_rDurchAufgewertet+t_pcLage.m_rDurchSchriften);
	var t_rMaximiert=t_pcLage.m_rMassEinkommen;
	if(t_rMaximiert>3.0*bb_ahv_werte_getMaxAltersrente(this.m_land)){
		t_rMaximiert=3.0*bb_ahv_werte_getMaxAltersrente(this.m_land);
	}
	t_pcLage.m_rMassEinkommen44=bb_ahv_werte_getSkala44Einkommen(this.m_land,t_rMaximiert);
}
c_AHVBasis.prototype.p_berechneTeilrente=function(t_pcLage){
	if(t_pcLage==null || t_pcLage.p_notValid()){
		return;
	}
	var t_p=t_pcLage.m_uPerson;
	var t_pcPerson=this.p_getPerson(t_p);
	var t_rSkalennummer=.0;
	var t_rTeilrente=.0;
	if(t_pcLage.m_iGrundPers==3){
		var t_pcVorher=null;
		t_pcLage.m_iIstBeitragsjahre=t_pcLage.m_iSollBeitragsjahre-t_pcLage.m_iIstFehljahre;
		if(t_pcLage.m_bEU){
			t_pcVorher=this.m_maRisiko[t_p];
		}else{
			if(t_pcLage.m_bErl){
				t_pcVorher=this.m_maPension[t_p];
			}else{
				t_pcVorher=null;
			}
		}
		if(t_pcVorher!=null && t_pcVorher.p_isValid()){
			t_pcLage.m_iTeilskala=t_pcVorher.m_iTeilskala;
			t_pcLage.m_rTeilfaktor=t_pcVorher.m_rTeilfaktor;
			t_pcLage.m_rTeilprozent=t_pcVorher.m_rTeilprozent;
		}else{
			if(t_pcPerson.m_miBezugsjahr>0){
				t_pcLage.m_iTeilskala=t_pcPerson.m_miTeilskala;
				t_pcLage.m_rTeilfaktor=t_pcPerson.m_mrTeilfaktor;
				t_pcLage.m_rTeilprozent=bb_utils_round(t_pcLage.m_rTeilfaktor*100.0);
			}
		}
		return;
	}
	if(t_pcLage.m_iIstFehljahre<=0 || t_pcLage.m_iSollBeitragsjahre<=0){
		t_pcLage.m_iTeilskala=44;
		t_pcLage.m_rTeilfaktor=1.0;
		t_pcLage.m_rTeilprozent=100.0;
		return;
	}
	t_pcLage.m_iIstBeitragsjahre=t_pcLage.m_iSollBeitragsjahre-t_pcLage.m_iIstFehljahre;
	t_rTeilrente=bb_utils_trunc2(100.0*(t_pcLage.m_iIstBeitragsjahre)/(t_pcLage.m_iSollBeitragsjahre),4.0);
	if(t_rTeilrente==0.0){
		t_rSkalennummer=0.0;
	}else{
		var t_teilrechner=c_Teilrechner.m_new.call(new c_Teilrechner,this.m_land);
		t_teilrechner.p_getTeilskala(t_rTeilrente);
		t_rTeilrente=t_teilrechner.m_mrTeilrente;
		t_rSkalennummer=t_teilrechner.m_mrSkalennummer;
	}
	t_pcLage.m_iTeilskala=((bb_utils_round(t_rSkalennummer))|0);
	t_pcLage.m_rTeilfaktor=bb_utils_trunc2(t_rTeilrente/100.0,0.0001);
	t_pcLage.m_rTeilprozent=t_pcLage.m_rTeilfaktor*100.0;
	if(t_pcLage.m_rTeilfaktor<0.0){
		t_pcLage.m_rTeilfaktor=0.0;
	}
	if(t_pcLage.m_rTeilfaktor>1.0){
		t_pcLage.m_rTeilfaktor=1.0;
	}
	if(t_pcLage.m_rTeilprozent<0.0){
		t_pcLage.m_rTeilprozent=0.0;
	}
	if(t_pcLage.m_rTeilprozent>100.0){
		t_pcLage.m_rTeilprozent=100.0;
	}
}
c_AHVBasis.prototype.p_setzeGrundleistung=function(t_pcLage){
	if(t_pcLage==null || t_pcLage.p_notValid()){
		return;
	}
	var t_p=t_pcLage.m_uPerson;
	var t_a=(t_p+1) % 2;
	t_pcLage.m_rVollrente=bb_utils_round(bb_ahv_werte_getSkala44Altersrente(this.m_land,t_pcLage.m_rMassEinkommen44));
	t_pcLage.m_rTeilrente=bb_utils_round(t_pcLage.m_rTeilfaktor*t_pcLage.m_rVollrente);
	t_pcLage.m_dBeginn.p_setDate3(t_pcLage.m_dMessung);
	t_pcLage.m_dBeginn.p_setFirstOfNextMonth();
	t_pcLage.m_dAblauf.p_setForever();
	if(t_pcLage.m_bEU){
		if(t_pcLage==this.m_maRisiko[t_p]){
			t_pcLage.m_dBeginn.p_addYears(this.m_miWartefrist);
		}
		if(this.m_maUpdate[t_p]!=null && this.m_maUpdate[t_p]!=t_pcLage && this.m_maUpdate[t_p].p_isValid() && this.m_maUpdate[t_p].m_bEU && this.m_maUpdate[t_p].m_dMessung.p_after(this.m_maRisiko[t_p].m_dMessung)){
			t_pcLage.m_dAblauf.p_setDate3(this.m_maUpdate[t_p].m_dMessung);
		}
	}else{
		if(t_pcLage.m_bErl){
			if(this.m_maUpdate[t_p]!=null && this.m_maUpdate[t_p]!=t_pcLage && this.m_maUpdate[t_p].p_isValid() && this.m_maUpdate[t_p].m_bErl){
				t_pcLage.m_dAblauf.p_setDate3(this.m_maUpdate[t_p].m_dMessung);
			}
		}
	}
	if(t_pcLage.m_dAblauf.p_before(t_pcLage.m_dBeginn) || t_pcLage.m_dAblauf.p_notValid()){
		t_pcLage.m_dAblauf.p_setForever();
	}
}
c_AHVBasis.prototype.p_berechneBasis=function(){
	var t_n=this.p_getNbPersonen();
	var t_p=0;
	var t_dBackup=new_object_array(2);
	for(t_p=0;t_p<t_n;t_p=t_p+1){
		t_dBackup[t_p]=c_Date.m_new.call(new c_Date);
		t_dBackup[t_p].p_setDate3(this.m_mdErlDatum[t_p]);
		if(this.m_mdErlDatum[t_p].p_after(this.m_mdOrdDatum[t_p])){
			this.m_mdErlDatum[t_p].p_setDate3(this.m_mdOrdDatum[t_p]);
		}
	}
	this.p_bestimmeSplitting();
	this.p_erzeugeGrundlagen();
	for(t_p=0;t_p<t_n;t_p=t_p+1){
		if(this.m_maRisiko[t_p].p_isValid()){
			this.p_berechneSollZeiten(this.m_maRisiko[t_p]);
		}
		if(this.m_maPension[t_p].p_isValid()){
			this.p_berechneSollZeiten(this.m_maPension[t_p]);
		}
		if(this.m_maUpdate[t_p].p_isValid()){
			this.p_berechneSollZeiten(this.m_maUpdate[t_p]);
		}
	}
	for(t_p=0;t_p<t_n;t_p=t_p+1){
		if(this.m_maRisiko[t_p].p_isValid()){
			this.p_erzeugeTabelle(this.m_maRisiko[t_p]);
		}
		if(this.m_maPension[t_p].p_isValid()){
			this.p_erzeugeTabelle(this.m_maPension[t_p]);
		}
		if(this.m_maUpdate[t_p].p_isValid()){
			this.p_erzeugeTabelle(this.m_maUpdate[t_p]);
		}
	}
	for(t_p=0;t_p<t_n;t_p=t_p+1){
		if(this.m_maRisiko[t_p].p_isValid()){
			this.p_fuelleVersichert(this.m_maRisiko[t_p]);
		}
		if(this.m_maPension[t_p].p_isValid()){
			this.p_fuelleVersichert(this.m_maPension[t_p]);
		}
		if(this.m_maUpdate[t_p].p_isValid()){
			this.p_fuelleVersichert(this.m_maUpdate[t_p]);
		}
	}
	var t_pcGrundPart=null;
	t_pcGrundPart=null;
	for(t_p=0;t_p<t_n;t_p=t_p+1){
		if(this.m_maRisiko[t_p].p_isValid()){
			this.p_fuelleTabelle(this.m_maRisiko[t_p]);
			this.p_berechneErziehung(this.m_maRisiko[t_p],this.p_getGrundPart(this.m_maRisiko[t_p]));
			this.p_uebernehmeErziehung(this.m_maRisiko[t_p]);
			this.p_erfuelleErziehung(this.m_maRisiko[t_p]);
			if(this.p_mitPartner()){
				t_pcGrundPart=this.p_getGrundPart(this.m_maRisiko[t_p]);
				this.p_fuelleTabelle(t_pcGrundPart);
				this.p_erfuellePartner(this.m_maRisiko[t_p],t_pcGrundPart);
			}
			this.p_begrenzeErfuellung(this.m_maRisiko[t_p]);
			this.p_berechneUebergang(this.m_maRisiko[t_p]);
			this.p_fuelleAusJungendjahre(this.m_maRisiko[t_p]);
			this.p_splitteBeitraege(this.m_maRisiko[t_p],this.p_getGrundPart(this.m_maRisiko[t_p]));
			this.p_fuelleAusZusatzmonate(this.m_maRisiko[t_p]);
			this.p_fuelleAusEreignisjahr(this.m_maRisiko[t_p]);
			this.p_berechneIstZeiten(this.m_maRisiko[t_p]);
			this.p_setzeBeitragsinfo(this.m_maRisiko[t_p]);
			this.p_berechneMassgebend(this.m_maRisiko[t_p]);
		}
	}
	for(t_p=0;t_p<t_n;t_p=t_p+1){
		if(this.m_maPension[t_p].p_isValid() && this.m_maPension[t_p]!=t_pcGrundPart){
			this.p_fuelleTabelle(this.m_maPension[t_p]);
		}
		if(this.m_maUpdate[t_p].p_isValid() && this.m_maUpdate[t_p]!=t_pcGrundPart){
			this.p_fuelleTabelle(this.m_maUpdate[t_p]);
		}
	}
	for(t_p=0;t_p<t_n;t_p=t_p+1){
		if(this.m_maPension[t_p].p_isValid()){
			this.p_berechneErziehung(this.m_maPension[t_p],this.p_getGrundPart(this.m_maPension[t_p]));
		}
		if(this.m_maUpdate[t_p].p_isValid()){
			this.p_berechneErziehung(this.m_maUpdate[t_p],this.p_getGrundPart(this.m_maUpdate[t_p]));
		}
		if(this.m_maPension[t_p].p_isValid()){
			this.p_uebernehmeErziehung(this.m_maPension[t_p]);
		}
		if(this.m_maUpdate[t_p].p_isValid()){
			this.p_uebernehmeErziehung(this.m_maUpdate[t_p]);
		}
		if(this.m_maPension[t_p].p_isValid()){
			this.p_erfuelleErziehung(this.m_maPension[t_p]);
		}
		if(this.m_maUpdate[t_p].p_isValid()){
			this.p_erfuelleErziehung(this.m_maUpdate[t_p]);
		}
		if(this.m_maPension[t_p].p_isValid()){
			this.p_erfuellePartner(this.m_maPension[t_p],this.p_getGrundPart(this.m_maPension[t_p]));
		}
		if(this.m_maUpdate[t_p].p_isValid()){
			this.p_erfuellePartner(this.m_maUpdate[t_p],this.p_getGrundPart(this.m_maUpdate[t_p]));
		}
		if(this.m_maPension[t_p].p_isValid()){
			this.p_begrenzeErfuellung(this.m_maPension[t_p]);
		}
		if(this.m_maUpdate[t_p].p_isValid()){
			this.p_begrenzeErfuellung(this.m_maUpdate[t_p]);
		}
		if(this.m_maPension[t_p].p_isValid()){
			this.p_berechneUebergang(this.m_maPension[t_p]);
		}
		if(this.m_maUpdate[t_p].p_isValid()){
			this.p_berechneUebergang(this.m_maUpdate[t_p]);
		}
		if(this.m_maPension[t_p].p_isValid()){
			this.p_fuelleAusJungendjahre(this.m_maPension[t_p]);
		}
		if(this.m_maUpdate[t_p].p_isValid()){
			this.p_fuelleAusJungendjahre(this.m_maUpdate[t_p]);
		}
		if(this.m_maPension[t_p].p_isValid()){
			this.p_splitteBeitraege(this.m_maPension[t_p],this.p_getGrundPart(this.m_maPension[t_p]));
		}
		if(this.m_maUpdate[t_p].p_isValid()){
			this.p_splitteBeitraege(this.m_maUpdate[t_p],this.p_getGrundPart(this.m_maUpdate[t_p]));
		}
		if(this.m_maPension[t_p].p_isValid()){
			this.p_fuelleAusZusatzmonate(this.m_maPension[t_p]);
		}
		if(this.m_maUpdate[t_p].p_isValid()){
			this.p_fuelleAusZusatzmonate(this.m_maUpdate[t_p]);
		}
		if(this.m_maPension[t_p].p_isValid()){
			this.p_fuelleAusEreignisjahr(this.m_maPension[t_p]);
		}
		if(this.m_maUpdate[t_p].p_isValid()){
			this.p_fuelleAusEreignisjahr(this.m_maUpdate[t_p]);
		}
		if(this.m_maPension[t_p].p_isValid()){
			this.p_berechneIstZeiten(this.m_maPension[t_p]);
		}
		if(this.m_maUpdate[t_p].p_isValid()){
			this.p_berechneIstZeiten(this.m_maUpdate[t_p]);
		}
		if(this.m_maPension[t_p].p_isValid()){
			this.p_setzeBeitragsinfo(this.m_maPension[t_p]);
		}
		if(this.m_maUpdate[t_p].p_isValid()){
			this.p_setzeBeitragsinfo(this.m_maUpdate[t_p]);
		}
		if(this.m_maPension[t_p].p_isValid()){
			this.p_berechneMassgebend(this.m_maPension[t_p]);
		}
		if(this.m_maUpdate[t_p].p_isValid()){
			this.p_berechneMassgebend(this.m_maUpdate[t_p]);
		}
	}
	for(t_p=0;t_p<t_n;t_p=t_p+1){
		if(this.m_maRisiko[t_p].p_isValid()){
			this.p_berechneTeilrente(this.m_maRisiko[t_p]);
		}
		if(this.m_maPension[t_p].p_isValid()){
			this.p_berechneTeilrente(this.m_maPension[t_p]);
		}
		if(this.m_maUpdate[t_p].p_isValid()){
			this.p_berechneTeilrente(this.m_maUpdate[t_p]);
		}
	}
	for(t_p=0;t_p<t_n;t_p=t_p+1){
		if(this.m_maRisiko[t_p].p_isValid()){
			this.p_setzeGrundleistung(this.m_maRisiko[t_p]);
		}
		if(this.m_maPension[t_p].p_isValid()){
			this.p_setzeGrundleistung(this.m_maPension[t_p]);
		}
		if(this.m_maUpdate[t_p].p_isValid()){
			this.p_setzeGrundleistung(this.m_maUpdate[t_p]);
		}
	}
	for(t_p=0;t_p<t_n;t_p=t_p+1){
		this.m_mdErlDatum[t_p].p_setDate3(t_dBackup[t_p]);
	}
}
c_AHVBasis.m_new=function(t_umfeld){
	c_Umfeld.m_new2.call(this,t_umfeld);
	this.m_miSplitStart=0;
	this.m_miSplitEnde[0]=0;
	this.m_miSplitEnde[1]=0;
	this.m_mdSplitting=c_Date.m_new.call(new c_Date);
	for(var t_i=0;t_i<2;t_i=t_i+1){
		this.m_maRisiko[t_i]=c_Grundlagen.m_new.call(new c_Grundlagen);
		this.m_maPension[t_i]=c_Grundlagen.m_new.call(new c_Grundlagen);
		this.m_maUpdate[t_i]=c_Grundlagen.m_new.call(new c_Grundlagen);
	}
	this.p_berechneBasis();
	return this;
}
c_AHVBasis.m_new2=function(){
	c_Umfeld.m_new3.call(this);
	return this;
}
function c_AHVLeistung(){
	c_AHVBasis.call(this);
	this.implments={c_Loggable:1};
}
c_AHVLeistung.prototype=extend_class(c_AHVBasis);
c_AHVLeistung.m_new=function(t_umfeld){
	c_AHVBasis.m_new.call(this,t_umfeld);
	return this;
}
c_AHVLeistung.m_new2=function(){
	c_AHVBasis.m_new2.call(this);
	return this;
}
c_AHVLeistung.prototype.p_erzeugeAltersrente=function(t_pcLage){
	if(t_pcLage==null || t_pcLage.p_notValid()){
		return;
	}
	var t_p=t_pcLage.m_uPerson;
	var t_a=(t_p+1) % 2;
	var t_person=this.p_getPerson(t_p);
	if(t_pcLage.m_rTeilrente<1.0){
		return;
	}
	var t_pcLeistung=null;
	var t_rRente=t_pcLage.m_rTeilrente;
	if(t_person.p_istVerwitwet() || this.p_istGebunden() && this.m_mdTodDatum[t_a].p_isValid()){
		t_rRente=bb_utils_round(1.2*t_rRente);
	}
	if(t_rRente>bb_ahv_werte_getMaxAltersrente(this.m_land)){
		t_rRente=bb_ahv_werte_getMaxAltersrente(this.m_land);
	}
	t_rRente=bb_utils_round(t_rRente/12.0)*12.0;
	var t_dBeginn=c_Date.m_new.call(new c_Date);
	t_dBeginn.p_setDate3(t_pcLage.m_dBeginn);
	if(this.m_mdOrdDatum[t_p].p_before(this.m_mdErlDatum[t_p]) && t_dBeginn.p_before(this.m_mdErlDatum[t_p])){
		t_dBeginn.p_setDate3(this.m_mdErlDatum[t_p]);
	}
	t_pcLeistung=c_Leistung.m_new2.call(new c_Leistung,1,2,t_p,t_p,t_rRente,t_dBeginn,t_pcLage.m_dAblauf,t_pcLage.m_bSplitting);
	if(t_pcLage.m_bSplitting){
		t_person.m_mrAHVflexSplit=t_rRente;
	}else{
		t_person.m_mrAHVflexEigen=t_rRente;
	}
	this.p_addLeistung2(t_pcLeistung);
}
c_AHVLeistung.prototype.p_erzeugeKinderrente=function(t_pcLage){
	if(t_pcLage==null || t_pcLage.p_notValid()){
		return;
	}
	var t_p=t_pcLage.m_uPerson;
	var t_a=(t_p+1) % 2;
	if(t_pcLage.m_rTeilrente<1.0){
		return;
	}
	var t_pcLeistung=null;
	var t_rRente=.0;
	t_rRente=bb_utils_round(0.4*t_pcLage.m_rTeilrente);
	t_rRente=bb_utils_round(t_rRente/12.0)*12.0;
	var t_pcKind=null;
	var t_dGrenzdatum=c_Date.m_new.call(new c_Date);
	var t_dBeginn=c_Date.m_new.call(new c_Date);
	var t_dAblauf=c_Date.m_new.call(new c_Date);
	if(this.m_mdErlDatum[t_p].p_before(this.m_mdOrdDatum[t_p])){
		t_dGrenzdatum.p_setDate3(this.m_mdOrdDatum[t_p]);
	}else{
		t_dGrenzdatum.p_setDate3(this.m_mdErlDatum[t_p]);
	}
	if(this.p_istLiechtenstein()){
		t_dGrenzdatum.p_setDate3(this.m_mdErlDatum[t_p]);
	}
	if(t_dGrenzdatum.p_before(t_pcLage.m_dBeginn)){
		t_dGrenzdatum.p_setDate3(t_pcLage.m_dBeginn);
	}
	var t_=this.m_maKinder.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		t_pcKind=t_.p_NextObject();
		if(!t_pcKind.p_istKindVon(t_p)){
			continue;
		}
		t_dBeginn.p_setDate3(t_dGrenzdatum);
		t_dAblauf.p_setDate3(t_pcLage.m_dAblauf);
		if(!t_pcKind.p_getLeistungsfenster(t_dBeginn,t_dAblauf,this.p_istLiechtenstein())){
			continue;
		}
		t_pcLeistung=c_Leistung.m_new2.call(new c_Leistung,1,50,t_p,t_pcKind.m_miReferenz,t_rRente,t_dBeginn,t_dAblauf,t_pcLage.m_bSplitting);
		this.p_addLeistung2(t_pcLeistung);
	}
}
c_AHVLeistung.prototype.p_erzeugeWaisenrente=function(t_pcLage){
	if(t_pcLage==null || t_pcLage.p_notValid()){
		return;
	}
	var t_p=t_pcLage.m_uPerson;
	var t_a=(t_p+1) % 2;
	var t_person=this.p_getPerson(t_p);
	if(t_pcLage.m_rTeilrente<1.0){
		return;
	}
	var t_pcLeistung=null;
	var t_rRente=.0;
	t_rRente=bb_utils_round(0.4*t_pcLage.m_rTeilrente);
	t_rRente=bb_utils_round(t_rRente/12.0)*12.0;
	var t_pcKind=null;
	var t_dBeginn=c_Date.m_new.call(new c_Date);
	var t_dAblauf=c_Date.m_new.call(new c_Date);
	var t_=this.m_maKinder.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		t_pcKind=t_.p_NextObject();
		if(t_person.p_istFrau() && t_pcKind.m_mdGeburtsdatum.p_after(t_pcLage.m_dEreignis)){
			continue;
		}
		if(!t_pcKind.p_istKindVon(t_p)){
			continue;
		}
		var t_dEreignis=c_Date.m_new.call(new c_Date);
		t_dEreignis.p_setDate3(t_pcLage.m_dEreignis);
		t_dEreignis.p_addDays(300);
		if(t_person.p_istMann() && t_pcKind.m_mdGeburtsdatum.p_afterOrSame(t_dEreignis)){
			continue;
		}
		t_dBeginn.p_setDate3(t_pcLage.m_dBeginn);
		t_dAblauf.p_setDate3(t_pcLage.m_dAblauf);
		if(!t_pcKind.p_getLeistungsfenster(t_dBeginn,t_dAblauf,false)){
			continue;
		}
		if(t_dBeginn.p_before(t_pcLage.m_dBeginn)){
			t_dBeginn.p_setDate3(t_pcLage.m_dBeginn);
		}
		if(!t_pcLage.m_dAblauf.p_isForever()){
			if(t_dAblauf.p_after(t_pcLage.m_dAblauf)){
				t_dAblauf.p_setDate3(t_pcLage.m_dAblauf);
			}
		}
		t_pcLeistung=c_Leistung.m_new2.call(new c_Leistung,1,51,t_p,t_pcKind.m_miReferenz,t_rRente,t_dBeginn,t_dAblauf,false);
		this.p_addLeistung2(t_pcLeistung);
	}
}
c_AHVLeistung.prototype.p_erzeugeWitwenrente=function(t_pcLage){
	if(t_pcLage==null || t_pcLage.p_notValid()){
		return;
	}
	var t_p=t_pcLage.m_uPerson;
	var t_a=(t_p+1) % 2;
	var t_partner=this.p_getPerson(t_a);
	if(t_pcLage.m_rTeilrente<1.0){
		return;
	}
	if(!this.p_mitPartner()){
		return;
	}
	if(!this.p_istGebunden()){
		return;
	}
	var t_pcLeistung=null;
	var t_rRente=.0;
	t_rRente=bb_utils_round(0.8*t_pcLage.m_rTeilrente);
	t_rRente=bb_utils_round(t_rRente/12.0)*12.0;
	var t_pcKind=null;
	var t_hatKind=false;
	var t_=this.m_maKinder.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		t_pcKind=t_.p_NextObject();
		if(!t_pcKind.p_istKindVon(t_a) && t_pcKind.m_meHaushalt!=3){
			continue;
		}
		if(t_pcKind.m_mdGeburtsdatum.p_before(t_pcLage.m_dEreignis)){
			t_hatKind=true;
			break;
		}
		var t_dEreignis=c_Date.m_new.call(new c_Date);
		t_dEreignis.p_setDate3(t_pcLage.m_dEreignis);
		t_dEreignis.p_addDays(300);
		if(t_partner.p_istFrau() && t_pcKind.m_meZugehoerigkeit==3 && t_pcKind.m_mdGeburtsdatum.p_before(t_dEreignis)){
			t_hatKind=true;
			break;
		}
	}
	if(!t_hatKind && !this.p_istTodWitwe45()){
		if(t_partner.p_istMann()){
			return;
		}
		if(!this.p_istLiechtenstein() && this.p_istPartnerschaft()){
			return;
		}
		var t_dHeirat5=c_Date.m_new.call(new c_Date);
		t_dHeirat5.p_setDate3(t_partner.m_mdZivildatum);
		t_dHeirat5.p_addYears(5);
		if(t_partner.p_getGenauesAlter(t_pcLage.m_dBeginn)<45 || t_dHeirat5.p_after(t_pcLage.m_dBeginn)){
			return;
		}
	}
	var t_dBeginn=c_Date.m_new.call(new c_Date);
	var t_dAblauf=c_Date.m_new.call(new c_Date);
	t_dBeginn.p_setDate3(t_pcLage.m_dBeginn);
	t_dAblauf.p_setDate3(t_pcLage.m_dAblauf);
	if(t_pcKind!=null && !this.p_istLiechtenstein() && (t_partner.p_istMann() || this.p_istPartnerschaft())){
		t_dAblauf.p_setDate(1,1,1950);
		var t_2=this.m_maKinder.p_ObjectEnumerator();
		while(t_2.p_HasNext()){
			t_pcKind=t_2.p_NextObject();
			if(t_dAblauf.p_before(t_pcKind.m_mdAusbildungsende18)){
				t_dAblauf.p_setDate3(t_pcKind.m_mdAusbildungsende18);
			}
		}
	}
	var t_eLeistungsart=0;
	if(t_partner.p_istMann()){
		t_eLeistungsart=63;
	}else{
		t_eLeistungsart=64;
	}
	t_pcLeistung=c_Leistung.m_new2.call(new c_Leistung,1,t_eLeistungsart,t_p,t_a,t_rRente,t_dBeginn,t_dAblauf,false);
	this.p_addLeistung2(t_pcLeistung);
}
c_AHVLeistung.prototype.p_erzeugeIVRente=function(t_pcLage){
	if(t_pcLage==null || t_pcLage.p_notValid()){
		return;
	}
	var t_p=t_pcLage.m_uPerson;
	var t_a=(t_p+1) % 2;
	var t_pcPerson=this.p_getPerson(t_p);
	var t_ausserordentlich=false;
	if(t_pcLage.m_iIstBeitragsjahre<3 && t_pcPerson.m_mdEinreisedatum.p_beforeOrSame(t_pcPerson.m_mdGeburtsdatum)){
		t_ausserordentlich=true;
	}
	if(t_pcLage.m_rTeilrente<1.0 && !t_ausserordentlich){
		return;
	}
	if(t_pcLage.m_iIstBeitragsjahre<3 && !t_ausserordentlich){
		return;
	}
	var t_pcLeistung=null;
	var t_pcBestand=null;
	var t_rRente=.0;
	var t_rMinRente=.0;
	t_rRente=t_pcLage.m_rTeilrente;
	if(t_pcPerson.p_getAlterAm(t_pcLage.m_dEreignis)<25 && t_pcLage.m_iIstBeitragsjahre>=t_pcLage.m_iSollBeitragsjahre){
		t_rMinRente=bb_ahv_werte_getIVRentenanspruchVor25(this.m_land)*bb_ahv_werte_getMinAltersrente(this.m_land)/100.0;
		t_rMinRente=bb_utils_round(t_rMinRente);
	}else{
		if(t_ausserordentlich){
			t_rMinRente=bb_ahv_werte_getMinAltersrente(this.m_land);
		}else{
			t_rMinRente=0.0;
		}
	}
	if(t_rRente<t_rMinRente){
		t_rRente=t_rMinRente;
	}
	if(t_pcPerson.m_meZivilstand==4 || this.p_istGebunden() && this.m_mdTodDatum[t_a].p_isValid()){
		t_rRente=bb_utils_round(1.2*t_rRente);
	}
	if(t_rRente>bb_ahv_werte_getMaxAltersrente(this.m_land)){
		t_rRente=bb_ahv_werte_getMaxAltersrente(this.m_land);
	}
	if(t_pcPerson.m_mbIVBezueger){
		t_rRente=bb_utils_round(t_rRente*t_pcPerson.p_getAnteilIVGrad());
	}
	t_rRente=bb_utils_round(t_rRente/12.0)*12.0;
	t_pcLeistung=c_Leistung.m_new2.call(new c_Leistung,2,30,t_p,t_p,t_rRente,t_pcLage.m_dBeginn,t_pcLage.m_dAblauf,t_pcLage.m_bSplitting);
	this.p_addLeistung2(t_pcLeistung);
	var t_=this.m_mpcZeitachse.m_maLeistungen.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		t_pcBestand=t_.p_NextObject();
		if(t_pcBestand.m_mbBestand && t_pcBestand.m_meVersicherungsart==2 && t_pcBestand.m_meLeistungsart==30 && t_pcBestand.m_miVersichert==t_p && (t_pcBestand.m_mdAblauf.p_isForever() || t_pcBestand.m_mdAblauf.p_afterOrSame(t_pcLage.m_dBeginn))){
			t_pcBestand.m_mbErsetzt=true;
			t_pcBestand.m_mdAblauf.p_setBefore(t_pcLage.m_dBeginn);
			t_pcLeistung.m_mrOriginal=t_pcBestand.m_mrBetrag;
			t_pcLeistung.m_mdWechsel.p_setDate3(t_pcLage.m_dBezug);
		}
	}
}
c_AHVLeistung.prototype.p_erzeugeIVKinder=function(t_pcLage){
	if(t_pcLage==null || t_pcLage.p_notValid()){
		return;
	}
	var t_p=t_pcLage.m_uPerson;
	var t_a=(t_p+1) % 2;
	var t_pcPerson=this.p_getPerson(t_p);
	var t_ausserordentlich=false;
	if(t_pcLage.m_iIstBeitragsjahre<3 && t_pcPerson.m_mdEinreisedatum.p_beforeOrSame(t_pcPerson.m_mdGeburtsdatum)){
		t_ausserordentlich=true;
	}
	if(t_pcLage.m_rTeilrente<1.0 && !t_ausserordentlich){
		return;
	}
	if(t_pcLage.m_iIstBeitragsjahre<3 && !t_ausserordentlich){
		return;
	}
	var t_pcLeistung=null;
	var t_pcBestand=null;
	var t_rRente=.0;
	var t_rMinRente=.0;
	var t_rHoehe=.0;
	if(this.p_istLiechtenstein()){
		t_rHoehe=0.2;
	}else{
		t_rHoehe=0.4;
	}
	if(t_ausserordentlich){
		t_rRente=bb_utils_round(t_rHoehe*bb_ahv_werte_getMinAltersrente(this.m_land));
	}else{
		t_rRente=bb_utils_round(t_rHoehe*t_pcLage.m_rTeilrente);
	}
	if(t_pcPerson.p_getAlterAm(t_pcLage.m_dEreignis)<25 && t_pcLage.m_iIstBeitragsjahre>=t_pcLage.m_iSollBeitragsjahre){
		t_rMinRente=bb_ahv_werte_getIVRentenanspruchVor25(this.m_land)*bb_ahv_werte_getMinAltersrente(this.m_land)/100.0;
		t_rMinRente=bb_utils_round(t_rMinRente);
	}else{
		t_rMinRente=0.0;
	}
	if(t_rRente<t_rMinRente){
		t_rRente=t_rMinRente;
	}
	if(t_pcPerson.m_mbIVBezueger){
		t_rRente=bb_utils_round(t_rRente*t_pcPerson.p_getAnteilIVGrad());
	}
	t_rRente=bb_utils_round(t_rRente/12.0)*12.0;
	var t_pcKind=null;
	var t_dBeginn=c_Date.m_new.call(new c_Date);
	var t_dAblauf=c_Date.m_new.call(new c_Date);
	var t_=this.m_maKinder.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		t_pcKind=t_.p_NextObject();
		if(!t_pcKind.p_istKindVon(t_p)){
			continue;
		}
		t_dBeginn.p_setDate3(t_pcLage.m_dBeginn);
		t_dAblauf.p_setDate3(t_pcLage.m_dAblauf);
		if(!t_pcKind.p_getLeistungsfenster(t_dBeginn,t_dAblauf,this.p_istLiechtenstein())){
			continue;
		}
		if(t_dBeginn.p_before(t_pcLage.m_dBeginn)){
			t_dBeginn.p_setDate3(t_pcLage.m_dBeginn);
		}
		if(!t_pcLage.m_dAblauf.p_isForever()){
			if(t_dAblauf.p_after(t_pcLage.m_dAblauf)){
				t_dAblauf.p_setDate3(t_pcLage.m_dAblauf);
			}
		}
		t_pcLeistung=c_Leistung.m_new2.call(new c_Leistung,2,31,t_p,t_pcKind.m_miReferenz,t_rRente,t_dBeginn,t_dAblauf,t_pcLage.m_bSplitting);
		this.p_addLeistung2(t_pcLeistung);
		var t_pcBestand2=null;
		var t_2=this.m_mpcZeitachse.m_maLeistungen.p_ObjectEnumerator();
		while(t_2.p_HasNext()){
			t_pcBestand2=t_2.p_NextObject();
			if(t_pcBestand2.m_mbBestand && t_pcBestand2.m_meVersicherungsart==2 && t_pcBestand2.m_meLeistungsart==31 && t_pcBestand2.m_miVersichert==t_p && (t_pcBestand2.m_mdAblauf.p_isForever() || t_pcBestand2.m_mdAblauf.p_afterOrSame(t_pcLage.m_dBeginn))){
				t_pcBestand2.m_mbErsetzt=true;
				t_pcBestand2.m_mdAblauf.p_setBefore(t_pcLage.m_dBeginn);
				t_pcLeistung.m_mrOriginal=t_pcBestand2.m_mrBetrag;
				t_pcLeistung.m_mdWechsel.p_setDate3(t_pcLage.m_dBezug);
			}
		}
	}
}
c_AHVLeistung.prototype.p_berechneLeistungen=function(){
	var t_n=this.p_getNbPersonen();
	var t_p=0;
	var t_dBackup=new_object_array(2);
	for(t_p=0;t_p<t_n;t_p=t_p+1){
		t_dBackup[t_p]=c_Date.m_new.call(new c_Date);
		t_dBackup[t_p].p_setDate3(this.m_mdErlDatum[t_p]);
		if(this.m_mdErlDatum[t_p].p_after(this.m_mdOrdDatum[t_p])){
			this.m_mdErlDatum[t_p].p_setDate3(this.m_mdOrdDatum[t_p]);
		}
	}
	for(t_p=0;t_p<t_n;t_p=t_p+1){
		if(!this.m_mbAHVLeistung[t_p]){
			continue;
		}
		if(this.m_maPension[t_p].p_isValid()){
			if(this.m_maUpdate[t_p].p_notValid() || !this.m_maUpdate[t_p].m_bErl || this.m_maUpdate[t_p].m_dBeginn.p_after(this.m_maPension[t_p].m_dBeginn)){
				this.p_erzeugeAltersrente(this.m_maPension[t_p]);
				this.p_erzeugeKinderrente(this.m_maPension[t_p]);
			}
		}
		if(this.m_maUpdate[t_p].p_isValid() && this.m_maUpdate[t_p].m_bErl){
			this.p_erzeugeAltersrente(this.m_maUpdate[t_p]);
			this.p_erzeugeKinderrente(this.m_maUpdate[t_p]);
		}
		if(this.m_maRisiko[t_p].p_isValid() && this.m_maRisiko[t_p].m_bTod){
			this.p_erzeugeWaisenrente(this.m_maRisiko[t_p]);
			this.p_erzeugeWitwenrente(this.m_maRisiko[t_p]);
		}
	}
	for(t_p=0;t_p<t_n;t_p=t_p+1){
		if(!this.m_mbIVLeistung[t_p]){
			continue;
		}
		var t_dAnfang=c_Date.m_new.call(new c_Date);
		t_dAnfang.p_setDate3(this.m_mdInvDatum[t_p]);
		t_dAnfang.p_addYears(this.m_miWartefrist);
		if(this.m_maRisiko[t_p].p_isValid() && this.m_maRisiko[t_p].m_bEU){
			if(this.m_maRisiko[t_p].m_bSplitting && this.m_maRisiko[t_p].m_dBeginn.p_before(t_dAnfang)){
				continue;
			}
			this.p_erzeugeIVRente(this.m_maRisiko[t_p]);
			this.p_erzeugeIVKinder(this.m_maRisiko[t_p]);
		}
		if(this.m_maUpdate[t_p].p_isValid() && this.m_maUpdate[t_p].m_bEU){
			if(this.m_maUpdate[t_p].m_bSplitting && this.m_maUpdate[t_p].m_dBeginn.p_before(t_dAnfang)){
				continue;
			}
			this.p_erzeugeIVRente(this.m_maUpdate[t_p]);
			this.p_erzeugeIVKinder(this.m_maUpdate[t_p]);
		}
	}
	for(t_p=0;t_p<t_n;t_p=t_p+1){
		this.m_mdErlDatum[t_p].p_setDate3(t_dBackup[t_p]);
	}
}
function c_AHVKuerzung(){
	c_AHVLeistung.call(this);
	this.m_bestand=new_object_array(2);
	this.m_erzeugt=new_object_array(2);
	this.m_flex=new_object_array(2);
	this.m_dEreignis=new_array_array(2);
	this.m_rFaktor=new_array_array(2);
	this.m_rMassEk=new_array_array(2);
	this.m_iEreignisse=new_number_array(2);
	this.m_mrMassEinkommen=new_number_array(2);
	this.m_mrTeilfaktor=new_number_array(2);
	this.implments={c_Loggable:1};
}
c_AHVKuerzung.prototype=extend_class(c_AHVLeistung);
c_AHVKuerzung.m_new=function(t_umfeld){
	c_AHVLeistung.m_new.call(this,t_umfeld);
	this.m_bestand[0]=c_AHVStand.m_new.call(new c_AHVStand,true,0,t_umfeld.p_getNbKinder());
	this.m_erzeugt[0]=c_AHVStand.m_new.call(new c_AHVStand,false,0,t_umfeld.p_getNbKinder());
	this.m_flex[0]=c_AHVFlex.m_new.call(new c_AHVFlex,t_umfeld.m_land);
	if(this.p_mitPartner()){
		this.m_bestand[1]=c_AHVStand.m_new.call(new c_AHVStand,true,1,t_umfeld.p_getNbKinder());
		this.m_erzeugt[1]=c_AHVStand.m_new.call(new c_AHVStand,false,1,t_umfeld.p_getNbKinder());
		this.m_flex[1]=c_AHVFlex.m_new.call(new c_AHVFlex,t_umfeld.m_land);
	}else{
		this.m_bestand[1]=null;
		this.m_erzeugt[1]=null;
		this.m_flex[1]=null;
	}
	return this;
}
c_AHVKuerzung.m_new2=function(){
	c_AHVLeistung.m_new2.call(this);
	return this;
}
c_AHVKuerzung.prototype.p_sortiereEreignisse=function(t_p){
	var t_person=null;
	var t_d=c_Date.m_new.call(new c_Date);
	var t_r=0.0;
	var t_n=0;
	var t_i=0;
	this.m_dEreignis[t_p]=new_object_array(4);
	this.m_rFaktor[t_p]=new_number_array(4);
	this.m_rMassEk[t_p]=new_number_array(4);
	for(t_i=0;t_i<4;t_i=t_i+1){
		this.m_dEreignis[t_p][t_i]=c_Date.m_new.call(new c_Date);
		this.m_rFaktor[t_p][t_i]=0.0;
		this.m_rMassEk[t_p][t_i]=0.0;
	}
	t_person=this.p_getPerson(t_p);
	t_n=0;
	if(t_person.m_miBezugsjahr>0){
		this.m_dEreignis[t_p][t_n].p_setDate(1,1,t_person.m_miBezugsjahr);
		this.m_rFaktor[t_p][t_n]=t_person.m_mrTeilfaktor;
		this.m_rMassEk[t_p][t_n]=t_person.m_mrMassgebendesEK;
		t_n+=1;
	}
	if(this.m_maRisiko[t_p].p_isValid()){
		this.m_dEreignis[t_p][t_n].p_setDate3(this.m_maRisiko[t_p].m_dEreignis);
		this.m_dEreignis[t_p][t_n].p_setFirstOfNextMonth();
		this.m_rFaktor[t_p][t_n]=this.m_maRisiko[t_p].m_rTeilfaktor;
		this.m_rMassEk[t_p][t_n]=this.m_maRisiko[t_p].m_rMassEinkommen44;
		t_n+=1;
	}
	if(this.m_maPension[t_p].p_isValid()){
		this.m_dEreignis[t_p][t_n].p_setDate3(this.m_maPension[t_p].m_dEreignis);
		this.m_dEreignis[t_p][t_n].p_setFirstOfNextMonth();
		this.m_rFaktor[t_p][t_n]=this.m_maPension[t_p].m_rTeilfaktor;
		this.m_rMassEk[t_p][t_n]=this.m_maPension[t_p].m_rMassEinkommen44;
		t_n+=1;
	}
	if(this.m_maUpdate[t_p].p_isValid()){
		this.m_dEreignis[t_p][t_n].p_setDate3(this.m_maUpdate[t_p].m_dMessung);
		this.m_dEreignis[t_p][t_n].p_setFirstOfNextMonth();
		this.m_rFaktor[t_p][t_n]=this.m_maUpdate[t_p].m_rTeilfaktor;
		this.m_rMassEk[t_p][t_n]=this.m_maUpdate[t_p].m_rMassEinkommen44;
		t_n+=1;
		if(t_n>=2 && this.m_dEreignis[t_p][t_n-2].p_after(this.m_dEreignis[t_p][t_n-1])){
			t_d.p_setDate3(this.m_dEreignis[t_p][t_n-2]);
			this.m_dEreignis[t_p][t_n-2].p_setDate3(this.m_dEreignis[t_p][t_n-1]);
			this.m_dEreignis[t_p][t_n-1].p_setDate3(t_d);
			t_r=this.m_rFaktor[t_p][t_n-2];
			this.m_rFaktor[t_p][t_n-2]=this.m_rFaktor[t_p][t_n-1];
			this.m_rFaktor[t_p][t_n-1]=t_r;
			t_r=this.m_rMassEk[t_p][t_n-2];
			this.m_rMassEk[t_p][t_n-2]=this.m_rMassEk[t_p][t_n-1];
			this.m_rMassEk[t_p][t_n-1]=t_r;
		}
	}
	this.m_iEreignisse[t_p]=t_n;
}
c_AHVKuerzung.prototype.p_sammleRenten=function(t_periode){
	var t_element=null;
	var t_i=0;
	for(t_i=0;t_i<this.p_getNbPersonen();t_i=t_i+1){
		this.m_bestand[t_i].p_clear();
		this.m_erzeugt[t_i].p_clear();
	}
	var t_=t_periode.m_maElemente.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		t_element=t_.p_NextObject();
		for(t_i=0;t_i<this.p_getNbPersonen();t_i=t_i+1){
			if(this.m_bestand[t_i].p_store(t_element)){
				break;
			}
			if(this.m_erzeugt[t_i].p_store(t_element)){
				break;
			}
		}
	}
}
c_AHVKuerzung.prototype.p_letztesEreignis=function(t_p,t_periode){
	if(this.m_mbMaxEinkommen[t_p]){
		this.m_mrMassEinkommen[t_p]=bb_ahv_werte_getSkala44Einkommen(this.m_land,3.0*bb_ahv_werte_getMaxAltersrente(this.m_land));
		this.m_mrTeilfaktor[t_p]=1.0;
	}else{
		for(var t_j=this.m_iEreignisse[t_p]-1;t_j>=0;t_j=t_j+-1){
			if(this.m_dEreignis[t_p][t_j].p_beforeOrSame(t_periode.m_mdBeginn)){
				this.m_mrTeilfaktor[t_p]=this.m_rFaktor[t_p][t_j];
				this.m_mrMassEinkommen[t_p]=this.m_rMassEk[t_p][t_j];
				break;
			}
		}
	}
}
c_AHVKuerzung.prototype.p_ersetzeRenten=function(t_i){
	var t_eltBestand=null;
	var t_eltErzeugt=null;
	t_eltBestand=this.m_bestand[t_i].m_Altersrente;
	t_eltErzeugt=this.m_erzeugt[t_i].m_Altersrente;
	if(t_eltBestand!=null && t_eltErzeugt!=null){
		t_eltBestand.p_setGekuerzt(0.0,10);
	}
	t_eltBestand=this.m_bestand[t_i].m_Invalidrente;
	t_eltErzeugt=this.m_erzeugt[t_i].m_Invalidrente;
	if(t_eltBestand!=null && t_eltErzeugt!=null){
		t_eltBestand.p_setGekuerzt(0.0,10);
	}
	for(var t_k=0;t_k<this.p_getNbKinder();t_k=t_k+1){
		t_eltBestand=this.m_bestand[t_i].m_AHVKinderrente[t_k];
		t_eltErzeugt=this.m_erzeugt[t_i].m_AHVKinderrente[t_k];
		if(t_eltBestand!=null && t_eltErzeugt!=null){
			t_eltBestand.p_setGekuerzt(0.0,10);
		}
		t_eltBestand=this.m_bestand[t_i].m_IVKinderrente[t_k];
		t_eltErzeugt=this.m_erzeugt[t_i].m_IVKinderrente[t_k];
		if(t_eltBestand!=null && t_eltErzeugt!=null){
			t_eltBestand.p_setGekuerzt(0.0,10);
		}
	}
}
c_AHVKuerzung.prototype.p_ersetzeBetrag=function(t_ref,t_ab,t_wert,t_grund){
	if(t_ref==null || t_ab==null){
		return;
	}
	var t_element=null;
	var t_periode=null;
	var t_found=false;
	var t_=this.m_mpcZeitachse.m_maPerioden.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		t_periode=t_.p_NextObject();
		if(t_periode==t_ab){
			t_found=true;
		}
		if(t_found){
			var t_2=t_periode.m_maElemente.p_ObjectEnumerator();
			while(t_2.p_HasNext()){
				t_element=t_2.p_NextObject();
				if(t_element.m_mpcLeistung==t_ref.m_mpcLeistung){
					t_element.p_setGekuerzt(t_wert,t_grund);
				}
			}
		}
	}
}
c_AHVKuerzung.prototype.p_treffeRenten=function(t_periode,t_elt0,t_elt1){
	if(t_elt0==null || t_elt1==null){
		return;
	}
	if(t_elt0.m_mpcLeistung.m_miBeguenstigt!=t_elt1.m_mpcLeistung.m_miBeguenstigt){
		return;
	}
	var t_netto0=t_elt0.p_getNettoBetrag();
	var t_netto1=t_elt1.p_getNettoBetrag();
	if(t_netto0==0.0 || t_netto1==0.0 || t_netto0==t_netto1){
		return;
	}
	var t_bestand0=t_elt0.m_mpcLeistung.m_mbBestand;
	var t_bestand1=t_elt1.m_mpcLeistung.m_mbBestand;
	var t_erl0=t_elt0.m_mpcLeistung.p_istAltersleistung();
	var t_eu0=t_elt0.m_mpcLeistung.p_istEULeistung();
	var t_tod0=t_elt0.m_mpcLeistung.p_istTodesleistung();
	var t_erl1=t_elt1.m_mpcLeistung.p_istAltersleistung();
	var t_eu1=t_elt1.m_mpcLeistung.p_istEULeistung();
	var t_tod1=t_elt1.m_mpcLeistung.p_istTodesleistung();
	var t_bErl=this.p_istPension();
	var t_bEU=this.p_istEU();
	var t_bTod=this.p_istTod();
	var t_nehme0=false;
	var t_nehme1=false;
	var t_grund=11;
	var t_wert=bb_math_Max2(t_netto0,t_netto1);
	if(t_bErl){
		if(t_erl0 && t_erl1){
			if(t_bestand0){
				t_nehme1=true;
			}else{
				t_nehme0=true;
			}
		}else{
			if(t_erl0){
				t_nehme0=true;
			}else{
				if(t_erl1){
					t_nehme1=true;
				}
			}
		}
	}else{
		if(t_bEU){
			if(t_eu0 && t_eu1){
				if(t_bestand0){
					t_nehme1=true;
				}else{
					t_nehme0=true;
				}
			}else{
				if(t_eu0){
					t_nehme0=true;
				}else{
					if(t_eu1){
						t_nehme1=true;
					}
				}
			}
		}else{
			if(t_bTod){
				if(t_tod0 && t_tod1){
					if(t_bestand0){
						t_nehme1=true;
					}else{
						t_nehme0=true;
					}
				}else{
					if(t_tod0){
						t_nehme0=true;
					}else{
						if(t_tod1){
							t_nehme1=true;
						}
					}
				}
			}
		}
	}
	if(t_nehme0){
		this.p_ersetzeBetrag(t_elt0,t_periode,t_wert,t_grund);
		this.p_ersetzeBetrag(t_elt1,t_periode,0.0,t_grund);
	}
	if(t_nehme1){
		this.p_ersetzeBetrag(t_elt0,t_periode,0.0,t_grund);
		this.p_ersetzeBetrag(t_elt1,t_periode,t_wert,t_grund);
	}
}
c_AHVKuerzung.prototype.p_treffeElternrenten=function(t_i,t_periode){
	this.p_treffeRenten(t_periode,this.m_erzeugt[t_i].m_Altersrente,this.m_erzeugt[t_i].m_Invalidrente);
	this.p_treffeRenten(t_periode,this.m_erzeugt[t_i].m_Altersrente,this.m_erzeugt[t_i].m_Witwenrente);
	this.p_treffeRenten(t_periode,this.m_erzeugt[t_i].m_Altersrente,this.m_bestand[t_i].m_Invalidrente);
	this.p_treffeRenten(t_periode,this.m_erzeugt[t_i].m_Altersrente,this.m_bestand[t_i].m_Witwenrente);
	this.p_treffeRenten(t_periode,this.m_erzeugt[t_i].m_Invalidrente,this.m_bestand[t_i].m_Witwenrente);
	this.p_treffeRenten(t_periode,this.m_erzeugt[t_i].m_Witwenrente,this.m_bestand[t_i].m_Invalidrente);
}
c_AHVKuerzung.prototype.p_treffeKinderrenten=function(t_i,t_periode){
	for(var t_k=0;t_k<this.p_getNbKinder();t_k=t_k+1){
		this.p_treffeRenten(t_periode,this.m_erzeugt[t_i].m_AHVKinderrente[t_k],this.m_erzeugt[t_i].m_IVKinderrente[t_k]);
		this.p_treffeRenten(t_periode,this.m_erzeugt[t_i].m_AHVKinderrente[t_k],this.m_erzeugt[t_i].m_AHVWaisenrente[t_k]);
		this.p_treffeRenten(t_periode,this.m_erzeugt[t_i].m_AHVKinderrente[t_k],this.m_bestand[t_i].m_IVKinderrente[t_k]);
		this.p_treffeRenten(t_periode,this.m_erzeugt[t_i].m_AHVKinderrente[t_k],this.m_bestand[t_i].m_AHVWaisenrente[t_k]);
		this.p_treffeRenten(t_periode,this.m_erzeugt[t_i].m_IVKinderrente[t_k],this.m_bestand[t_i].m_AHVWaisenrente[t_k]);
		this.p_treffeRenten(t_periode,this.m_erzeugt[t_i].m_AHVWaisenrente[t_k],this.m_bestand[t_i].m_IVKinderrente[t_k]);
	}
}
c_AHVKuerzung.prototype.p_blockiereWartezeit=function(t_i,t_vart,t_periode){
	var t_j=(t_i+1) % 2;
	if(this.p_istAlleine() || this.p_istKonkubinat() || this.m_mdInvDatum[t_j].p_notValid()){
		return;
	}
	var t_IVBezug=c_Date.m_new.call(new c_Date);
	t_IVBezug.p_setDate3(this.m_mdInvDatum[t_j]);
	t_IVBezug.p_addYears(this.m_miWartefrist);
	if(t_periode==null || t_periode.m_mdAblauf.p_after(t_IVBezug)){
		return;
	}
	var t_eltBestand=null;
	var t_eltErzeugt=null;
	var t_lstBestand=null;
	var t_lstErzeugt=null;
	var t_delta=0.0;
	var t_found=false;
	var t_k=0;
	if(t_vart==1){
		t_eltBestand=this.m_bestand[t_i].m_Altersrente;
		t_eltErzeugt=this.m_erzeugt[t_i].m_Altersrente;
	}else{
		t_eltBestand=this.m_bestand[t_i].m_Invalidrente;
		t_eltErzeugt=this.m_erzeugt[t_i].m_Invalidrente;
	}
	if(t_eltBestand!=null && t_eltErzeugt!=null){
		t_found=true;
		t_lstBestand=t_eltBestand.m_mpcLeistung;
		t_lstErzeugt=t_eltErzeugt.m_mpcLeistung;
	}else{
		t_found=false;
	}
	if(t_found && t_lstErzeugt.m_mbSplitting){
		t_delta=t_eltErzeugt.p_getNettoBetrag()-t_lstBestand.m_mrBetrag;
		if(t_delta>=1.0){
			t_eltErzeugt.p_setKuerzung(t_delta,23);
		}else{
			if(t_delta<=-1.0){
				t_eltErzeugt.p_setZuschlag(-t_delta,23);
			}
		}
	}
	for(t_k=0;t_k<this.p_getNbKinder();t_k=t_k+1){
		if(t_vart==1){
			t_eltBestand=this.m_bestand[t_i].m_AHVKinderrente[t_k];
			t_eltErzeugt=this.m_erzeugt[t_i].m_AHVKinderrente[t_k];
		}else{
			t_eltBestand=this.m_bestand[t_i].m_IVKinderrente[t_k];
			t_eltErzeugt=this.m_erzeugt[t_i].m_IVKinderrente[t_k];
		}
		if(t_eltBestand!=null && t_eltErzeugt!=null){
			t_found=true;
			t_lstBestand=t_eltBestand.m_mpcLeistung;
			t_lstErzeugt=t_eltErzeugt.m_mpcLeistung;
		}else{
			t_found=false;
		}
		if(t_found && t_lstErzeugt.m_mbSplitting){
			t_delta=t_eltErzeugt.p_getNettoBetrag()-t_lstBestand.m_mrBetrag;
			if(t_delta>=1.0){
				t_eltErzeugt.p_setKuerzung(t_delta,23);
			}else{
				if(t_delta<=-1.0){
					t_eltErzeugt.p_setZuschlag(-t_delta,23);
				}
			}
		}
	}
}
c_AHVKuerzung.prototype.p_verteile=function(t_betrag){
	var t_faktor=.0;
	var t_skala=.0;
	if(this.p_istAlleine()){
		if(this.m_mrTeilfaktor[0]>=1.0){
			return bb_utils_round(t_betrag);
		}
		t_faktor=(this.m_mrTeilfaktor[0]+2.0)/3.0;
	}else{
		if(this.m_mrTeilfaktor[0]>=1.0 && this.m_mrTeilfaktor[1]>=1.0){
			return bb_utils_round(t_betrag);
		}
		if(this.m_mrTeilfaktor[0]<this.m_mrTeilfaktor[1]){
			t_faktor=(this.m_mrTeilfaktor[0]+2.0*this.m_mrTeilfaktor[1])/3.0;
		}else{
			t_faktor=(this.m_mrTeilfaktor[1]+2.0*this.m_mrTeilfaktor[0])/3.0;
		}
	}
	t_faktor=bb_utils_trunc2(t_faktor,0.0001);
	t_skala=bb_utils_trunc(t_faktor*44.0+0.9999);
	t_faktor=bb_utils_trunc2(10000.0*t_skala/44.0,0.1);
	t_faktor=bb_utils_round(t_faktor);
	t_faktor=bb_utils_trunc2(t_faktor/10000.0,0.0001);
	return bb_utils_round(t_faktor*t_betrag);
}
c_AHVKuerzung.prototype.p_verteile2=function(t_i,t_betrag){
	var t_faktor=.0;
	var t_skala=.0;
	if(this.m_mrTeilfaktor[t_i]>=1.0){
		return bb_utils_round(t_betrag);
	}
	t_faktor=(this.m_mrTeilfaktor[t_i]+2.0)/3.0;
	t_faktor=bb_utils_trunc2(t_faktor,0.0001);
	t_skala=bb_utils_trunc(t_faktor*44.0+0.9999);
	t_faktor=bb_utils_trunc2(10000.0*t_skala/44.0,0.1);
	t_faktor=bb_utils_round(t_faktor);
	t_faktor=bb_utils_trunc2(t_faktor/10000.0,0.0001);
	return bb_utils_round(t_faktor*t_betrag);
}
c_AHVKuerzung.prototype.p_kuerzeRente=function(t_ref,t_summe,t_maximum,t_grund){
	if(t_ref==null){
		return;
	}
	var t_netto=t_ref.p_getNettoBetrag();
	var t_betrag=.0;
	if(t_summe>t_maximum && t_netto>0.0){
		t_betrag=1.0-t_maximum/t_summe;
		t_betrag=bb_utils_round(t_betrag*t_netto);
		t_ref.p_addKuerzung(t_betrag,t_grund);
	}
}
c_AHVKuerzung.prototype.p_elternAuf150=function(t_elt0,t_elt1){
	var t_maximum=.0;
	var t_summe=.0;
	var t_netto0=.0;
	var t_netto1=.0;
	if(t_elt0!=null && t_elt1!=null){
		t_netto0=t_elt0.p_getNettoBetrag();
		t_netto1=t_elt1.p_getNettoBetrag();
		if(t_netto0>0.0 && t_netto1>0.0){
			t_maximum=this.p_verteile(3.0*bb_ahv_werte_getMinAltersrente(this.m_land));
			t_summe=t_netto0+t_netto1;
			this.p_kuerzeRente(t_elt0,t_summe,t_maximum,12);
			this.p_kuerzeRente(t_elt1,t_summe,t_maximum,12);
		}
	}
}
c_AHVKuerzung.prototype.p_ehepaarrenteMax150=function(){
	if(this.p_istAlleine() || this.p_istKonkubinat()){
		return;
	}
	if(!this.m_mbAHVKuerzung[0] || !this.m_mbAHVKuerzung[1]){
		return;
	}
	this.p_elternAuf150(this.m_erzeugt[0].m_Altersrente,this.m_erzeugt[1].m_Altersrente);
	this.p_elternAuf150(this.m_erzeugt[0].m_Altersrente,this.m_bestand[1].m_Altersrente);
	this.p_elternAuf150(this.m_bestand[0].m_Altersrente,this.m_erzeugt[1].m_Altersrente);
	this.p_elternAuf150(this.m_bestand[0].m_Altersrente,this.m_bestand[1].m_Altersrente);
	this.p_elternAuf150(this.m_erzeugt[0].m_Altersrente,this.m_erzeugt[1].m_Invalidrente);
	this.p_elternAuf150(this.m_erzeugt[0].m_Altersrente,this.m_bestand[1].m_Invalidrente);
	this.p_elternAuf150(this.m_bestand[0].m_Altersrente,this.m_erzeugt[1].m_Invalidrente);
	this.p_elternAuf150(this.m_bestand[0].m_Altersrente,this.m_bestand[1].m_Invalidrente);
	this.p_elternAuf150(this.m_erzeugt[0].m_Invalidrente,this.m_erzeugt[1].m_Altersrente);
	this.p_elternAuf150(this.m_erzeugt[0].m_Invalidrente,this.m_bestand[1].m_Altersrente);
	this.p_elternAuf150(this.m_bestand[0].m_Invalidrente,this.m_erzeugt[1].m_Altersrente);
	this.p_elternAuf150(this.m_bestand[0].m_Invalidrente,this.m_bestand[1].m_Altersrente);
	this.p_elternAuf150(this.m_erzeugt[0].m_Invalidrente,this.m_bestand[1].m_Invalidrente);
	this.p_elternAuf150(this.m_bestand[0].m_Invalidrente,this.m_erzeugt[1].m_Invalidrente);
}
c_AHVKuerzung.prototype.p_kinderAuf60=function(t_elt0,t_elt1){
	var t_maximum=.0;
	var t_summe=.0;
	var t_netto0=.0;
	var t_netto1=.0;
	var t_grund=0;
	if(t_elt0!=null && t_elt1!=null){
		t_netto0=t_elt0.p_getNettoBetrag();
		t_netto1=t_elt1.p_getNettoBetrag();
		if(t_netto0>0.0 && t_netto1>0.0){
			if(this.m_land.p_liechtenstein()){
				t_maximum=this.p_verteile(0.4*bb_ahv_werte_getMaxAltersrente(this.m_land));
				t_grund=30;
			}else{
				t_maximum=this.p_verteile(0.6*bb_ahv_werte_getMaxAltersrente(this.m_land));
				t_grund=13;
			}
			t_summe=t_netto0+t_netto1;
			this.p_kuerzeRente(t_elt0,t_summe,t_maximum,t_grund);
			this.p_kuerzeRente(t_elt1,t_summe,t_maximum,t_grund);
		}
	}
}
c_AHVKuerzung.prototype.p_kinderrentenMax60=function(){
	if(this.p_istAlleine() || this.p_getNbKinder()==0){
		return;
	}
	if(!this.m_mbAHVKuerzung[0] || !this.m_mbAHVKuerzung[1]){
		return;
	}
	for(var t_k=0;t_k<this.p_getNbKinder();t_k=t_k+1){
		this.p_kinderAuf60(this.m_erzeugt[0].m_AHVKinderrente[t_k],this.m_erzeugt[1].m_AHVKinderrente[t_k]);
		this.p_kinderAuf60(this.m_erzeugt[0].m_AHVKinderrente[t_k],this.m_bestand[1].m_AHVKinderrente[t_k]);
		this.p_kinderAuf60(this.m_bestand[0].m_AHVKinderrente[t_k],this.m_erzeugt[1].m_AHVKinderrente[t_k]);
		this.p_kinderAuf60(this.m_bestand[0].m_AHVKinderrente[t_k],this.m_bestand[1].m_AHVKinderrente[t_k]);
		this.p_kinderAuf60(this.m_erzeugt[0].m_AHVWaisenrente[t_k],this.m_bestand[1].m_AHVWaisenrente[t_k]);
		this.p_kinderAuf60(this.m_bestand[0].m_AHVWaisenrente[t_k],this.m_erzeugt[1].m_AHVWaisenrente[t_k]);
		this.p_kinderAuf60(this.m_erzeugt[0].m_IVKinderrente[t_k],this.m_bestand[1].m_IVKinderrente[t_k]);
		this.p_kinderAuf60(this.m_bestand[0].m_IVKinderrente[t_k],this.m_erzeugt[1].m_IVKinderrente[t_k]);
	}
}
c_AHVKuerzung.prototype.p_kinderrentenVariabel=function(t_i){
	var t_iKinder=0;
	var t_k=0;
	for(t_k=0;t_k<this.p_getNbKinder();t_k=t_k+1){
		if(this.m_erzeugt[t_i].m_AHVKinderrente[t_k]!=null || this.m_erzeugt[t_i].m_AHVWaisenrente[t_k]!=null || this.m_erzeugt[t_i].m_IVKinderrente[t_k]!=null){
			t_iKinder+=1;
		}
	}
	if(t_iKinder==0){
		return;
	}
	var t_rTeilfaktor=0.0;
	var t_rMaxBetrag=0.0;
	t_rTeilfaktor=this.m_mrTeilfaktor[t_i];
	t_rMaxBetrag=0.9*this.m_mrMassEinkommen[t_i];
	t_rMaxBetrag=bb_utils_round(t_rMaxBetrag*t_rTeilfaktor);
	var t_rMinBetrag=0.0;
	t_rMinBetrag=1.5*bb_ahv_werte_getMinAltersrente(this.m_land)+1.2000000000000002*bb_ahv_werte_getMinAltersrente(this.m_land);
	if(t_iKinder>3){
		t_rMinBetrag+=(t_iKinder-3)*2.0*bb_ahv_werte_getMinAltersrente(this.m_land)/12.0;
	}
	t_rMinBetrag=bb_utils_round(t_rMinBetrag);
	if(t_rMaxBetrag<t_rMinBetrag){
		t_rMaxBetrag=t_rMinBetrag;
	}
	var t_rSummeEltern=0.0;
	var t_rSummeKinder=0.0;
	var t_rSummeRenten=0.0;
	if(this.m_erzeugt[t_i].m_Invalidrente!=null){
		t_rSummeEltern=this.m_erzeugt[t_i].m_Invalidrente.p_getNettoBetrag();
	}else{
		if(this.m_erzeugt[t_i].m_Altersrente!=null){
			t_rSummeEltern=this.m_erzeugt[t_i].m_Altersrente.p_getNettoBetrag();
		}else{
			if(this.m_erzeugt[t_i].m_Witwenrente!=null){
				t_rSummeEltern=this.m_erzeugt[t_i].m_Witwenrente.p_getNettoBetrag();
			}else{
				t_rSummeEltern=0.0;
			}
		}
	}
	for(t_k=0;t_k<this.p_getNbKinder();t_k=t_k+1){
		if(this.m_erzeugt[t_i].m_AHVKinderrente[t_k]!=null){
			t_rSummeKinder+=this.m_erzeugt[t_i].m_AHVKinderrente[t_k].p_getNettoBetrag();
		}
		if(this.m_erzeugt[t_i].m_AHVWaisenrente[t_k]!=null){
			t_rSummeKinder+=this.m_erzeugt[t_i].m_AHVWaisenrente[t_k].p_getNettoBetrag();
		}
		if(this.m_erzeugt[t_i].m_IVKinderrente[t_k]!=null){
			t_rSummeKinder+=this.m_erzeugt[t_i].m_IVKinderrente[t_k].p_getNettoBetrag();
		}
	}
	t_rSummeRenten=t_rSummeKinder+t_rSummeEltern;
	if(t_rSummeRenten>t_rMaxBetrag){
		var t_rMaximum=t_rMaxBetrag-t_rSummeEltern;
		for(t_k=0;t_k<this.p_getNbKinder();t_k=t_k+1){
			this.p_kuerzeRente(this.m_erzeugt[t_i].m_AHVKinderrente[t_k],t_rSummeKinder,t_rMaximum,15);
			this.p_kuerzeRente(this.m_erzeugt[t_i].m_IVKinderrente[t_k],t_rSummeKinder,t_rMaximum,15);
			this.p_kuerzeRente(this.m_erzeugt[t_i].m_AHVWaisenrente[t_k],t_rSummeKinder,t_rMaximum,15);
		}
	}
}
c_AHVKuerzung.prototype.p_kinderBestandVariabel=function(t_i){
	var t_iKinder=0;
	var t_k=0;
	for(t_k=0;t_k<this.p_getNbKinder();t_k=t_k+1){
		if(this.m_bestand[t_i].m_AHVWaisenrente[t_k]!=null){
			t_iKinder+=1;
		}
	}
	if(t_iKinder==0){
		return;
	}
	var t_person=this.p_getPerson(t_i);
	if(!t_person.m_mbAHVBezueger || t_person.m_mrWitwexrente<=0.0){
		return;
	}
	var t_rMassgebend=.0;
	var t_rMaxBetrag=.0;
	t_rMassgebend=bb_ahv_werte_getSkala44Altersrente(this.m_land,t_person.m_mrWitwexrente/0.8);
	t_rMaxBetrag=bb_utils_round(t_rMassgebend*0.9);
	var t_rMinBetrag=0.0;
	t_rMinBetrag=1.5*bb_ahv_werte_getMinAltersrente(this.m_land)+1.2000000000000002*bb_ahv_werte_getMinAltersrente(this.m_land);
	if(t_iKinder>3){
		t_rMinBetrag+=(t_iKinder-3)*2.0*bb_ahv_werte_getMinAltersrente(this.m_land)/12.0;
	}
	t_rMinBetrag=bb_utils_round(t_rMinBetrag);
	if(t_rMaxBetrag<t_rMinBetrag){
		t_rMaxBetrag=t_rMinBetrag;
	}
	var t_rSummeEltern=0.0;
	var t_rSummeKinder=0.0;
	var t_rSummeRenten=0.0;
	if(this.m_bestand[t_i].m_Witwenrente!=null){
		t_rSummeEltern=this.m_bestand[t_i].m_Witwenrente.p_getNettoBetrag();
	}
	for(t_k=0;t_k<this.p_getNbKinder();t_k=t_k+1){
		if(this.m_erzeugt[t_i].m_AHVWaisenrente[t_k]!=null){
			t_rSummeKinder+=this.m_erzeugt[t_i].m_AHVWaisenrente[t_k].p_getNettoBetrag();
		}
	}
	t_rSummeRenten=t_rSummeKinder+t_rSummeEltern;
	if(t_rSummeRenten>t_rMaxBetrag){
		var t_rMaximum=t_rMaxBetrag-t_rSummeEltern;
		for(t_k=0;t_k<this.p_getNbKinder();t_k=t_k+1){
			this.p_kuerzeRente(this.m_bestand[t_i].m_AHVWaisenrente[t_k],t_rSummeKinder,t_rMaximum,16);
		}
	}
}
c_AHVKuerzung.prototype.p_schiebeBestandVor=function(t_i){
	var t_pcPeriode=null;
	var t_rTotalAltersrenten=0.0;
	var t_rTotalKinderrenten=0.0;
	var t_iMonateVorbezug=0;
	var t_rBetrag=0.0;
	var t_iKinder=0;
	var t_k=0;
	if(!this.m_flex[t_i].m_istBestand){
		return;
	}
	if(!this.p_istGebunden()){
		return;
	}
	var t_a=(t_i+1) % 2;
	var t_partner=this.p_getPerson(t_a);
	var t_person=this.p_getPerson(t_i);
	if(t_partner.m_mbAHVBezueger){
		return;
	}
	t_iMonateVorbezug=this.m_mdOrdDatum[t_i].p_getYear()-t_person.m_miBezugsjahr;
	t_iMonateVorbezug*=12;
	if(t_iMonateVorbezug<=0){
		return;
	}
	if(this.m_flex[t_i].m_satzVorbezug==1.0){
		return;
	}
	t_pcPeriode=this.m_mpcZeitachse.m_maPerioden.p_get(0);
	this.p_sammleRenten(t_pcPeriode);
	if(this.m_bestand[t_i].m_Altersrente!=null){
		t_rBetrag=bb_utils_round(this.m_flex[t_i].m_satzVorbezug*this.m_bestand[t_i].m_Altersrente.p_getNettoBetrag()/(1.0-this.m_flex[t_i].m_satzVorbezug));
		t_rTotalAltersrenten=bb_utils_round(t_rBetrag*(t_iMonateVorbezug)/12.0);
		if(this.m_land.p_schweiz()){
			for(t_k=0;t_k<this.p_getNbKinder();t_k=t_k+1){
				if(this.m_bestand[t_i].m_AHVKinderrente[t_k]!=null){
					t_rBetrag=bb_utils_round(this.m_flex[t_i].m_satzVorbezug*this.m_bestand[t_i].m_AHVKinderrente[t_k].p_getNettoBetrag()/(1.0-this.m_flex[t_i].m_satzVorbezug));
					t_rTotalKinderrenten+=bb_utils_round(t_rBetrag*(t_iMonateVorbezug)/12.0);
					t_iKinder+=1;
				}
			}
		}
	}
	var t_rAlterskuerzung=bb_utils_round(t_rTotalAltersrenten*12.0/(t_iMonateVorbezug));
	var t_rKinderkuerzung=bb_utils_round(t_rTotalKinderrenten*12.0/(t_iMonateVorbezug));
	var t_=this.m_mpcZeitachse.m_maPerioden.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		t_pcPeriode=t_.p_NextObject();
		if(t_pcPeriode.m_mdBeginn.p_before(this.m_mdErlDatum[t_a])){
			continue;
		}
		this.p_sammleRenten(t_pcPeriode);
		if(this.m_bestand[t_i].m_Altersrente!=null){
			this.m_bestand[t_i].m_Altersrente.p_addKuerzung(t_rAlterskuerzung,21);
			if(this.m_land.p_schweiz() && t_iKinder>0){
				for(t_k=0;t_k<this.p_getNbKinder();t_k=t_k+1){
					if(this.m_bestand[t_i].m_AHVKinderrente[t_k]!=null){
						t_rBetrag=bb_utils_round(t_rKinderkuerzung/(t_iKinder));
						this.m_bestand[t_i].m_AHVKinderrente[t_k].p_addKuerzung(t_rBetrag,21);
					}
				}
			}
		}
	}
}
c_AHVKuerzung.prototype.p_schiebeErzeugtVor=function(t_i){
	var t_pcPeriode=null;
	var t_rTotalAltersrenten=0.0;
	var t_rTotalKinderrenten=0.0;
	var t_iMonateVorbezug=0;
	var t_iMonate=0;
	var t_rBetrag=0.0;
	var t_iKinder=0;
	var t_bFirstE=true;
	var t_bFirstS=true;
	var t_person=this.p_getPerson(t_i);
	var t_k=0;
	if(this.m_flex[t_i].m_istBestand){
		return;
	}
	var t_=this.m_mpcZeitachse.m_maPerioden.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		t_pcPeriode=t_.p_NextObject();
		if(t_pcPeriode.m_mdBeginn.p_before(this.m_mdErlDatum[t_i])){
			continue;
		}else{
			if(t_pcPeriode.m_mdBeginn.p_afterOrSame(this.m_mdOrdDatum[t_i])){
				break;
			}
		}
		this.p_sammleRenten(t_pcPeriode);
		if(this.m_erzeugt[t_i].m_Altersrente!=null){
			t_iMonate=t_pcPeriode.p_getMonate2();
			t_iMonateVorbezug+=t_iMonate;
			t_rBetrag=bb_utils_round(this.m_erzeugt[t_i].m_Altersrente.p_getNettoBetrag()*this.m_flex[t_i].m_satzVorbezug);
			t_rTotalAltersrenten+=bb_utils_round(t_rBetrag*(t_iMonate)/12.0);
			this.m_erzeugt[t_i].m_Altersrente.p_addKuerzung(t_rBetrag,17);
			if(this.m_erzeugt[t_i].m_Altersrente.m_mpcLeistung.m_mbSplitting){
				if(t_bFirstS){
					t_person.m_mrAHVflexSplit=this.m_erzeugt[t_i].m_Altersrente.m_mpcLeistung.m_mrBetrag-t_rBetrag;
					t_bFirstS=false;
				}
			}else{
				if(t_bFirstE){
					t_person.m_mrAHVflexEigen=this.m_erzeugt[t_i].m_Altersrente.m_mpcLeistung.m_mrBetrag-t_rBetrag;
					t_bFirstE=false;
				}
			}
			for(t_k=0;t_k<this.p_getNbKinder();t_k=t_k+1){
				if(this.m_erzeugt[t_i].m_AHVKinderrente[t_k]!=null){
					if(this.p_istLiechtenstein()){
						this.m_erzeugt[t_i].m_AHVKinderrente[t_k].p_setGekuerzt(0.0,31);
					}else{
						t_rBetrag=bb_utils_round(this.m_erzeugt[t_i].m_AHVKinderrente[t_k].p_getNettoBetrag()*this.m_flex[t_i].m_satzVorbezug);
						t_rTotalKinderrenten+=bb_utils_round(t_rBetrag*(t_iMonate)/12.0);
						this.m_erzeugt[t_i].m_AHVKinderrente[t_k].p_addKuerzung(t_rBetrag,17);
						t_iKinder+=1;
					}
				}
			}
		}
	}
	if(t_iMonateVorbezug==0){
		return;
	}
	var t_rAlterskuerzung=bb_utils_round(t_rTotalAltersrenten*12.0/(t_iMonateVorbezug));
	var t_rKinderkuerzung=bb_utils_round(t_rTotalKinderrenten*12.0/(t_iMonateVorbezug));
	var t_2=this.m_mpcZeitachse.m_maPerioden.p_ObjectEnumerator();
	while(t_2.p_HasNext()){
		t_pcPeriode=t_2.p_NextObject();
		if(t_pcPeriode.m_mdBeginn.p_before(this.m_mdOrdDatum[t_i])){
			continue;
		}
		this.p_sammleRenten(t_pcPeriode);
		if(this.m_erzeugt[t_i].m_Altersrente!=null){
			this.m_erzeugt[t_i].m_Altersrente.p_addKuerzung(t_rAlterskuerzung,18);
			if(this.m_erzeugt[t_i].m_Altersrente.m_mpcLeistung.m_mbSplitting){
				if(t_bFirstS){
					t_person.m_mrAHVflexSplit=this.m_erzeugt[t_i].m_Altersrente.m_mpcLeistung.m_mrBetrag-t_rAlterskuerzung;
					t_bFirstS=false;
				}
			}else{
				if(t_bFirstE){
					t_person.m_mrAHVflexEigen=this.m_erzeugt[t_i].m_Altersrente.m_mpcLeistung.m_mrBetrag-t_rAlterskuerzung;
					t_bFirstE=false;
				}
			}
			if(!this.p_istLiechtenstein() && t_iKinder>0){
				for(t_k=0;t_k<this.p_getNbKinder();t_k=t_k+1){
					if(this.m_erzeugt[t_i].m_AHVKinderrente[t_k]!=null){
						t_rBetrag=bb_utils_round(t_rKinderkuerzung/(t_iKinder));
						this.m_erzeugt[t_i].m_AHVKinderrente[t_k].p_addKuerzung(t_rBetrag,18);
					}
				}
			}
		}
	}
}
c_AHVKuerzung.prototype.p_schiebeBestandAuf=function(t_i){
	var t_pcPeriode=null;
	var t_rTotalAltersrenten=0.0;
	var t_rTotalKinderrenten=0.0;
	var t_iMonateAufschub=0;
	var t_rBetrag=0.0;
	var t_iKinder=0;
	var t_k=0;
	if(!this.m_flex[t_i].m_istBestand){
		return;
	}
	if(!this.p_istGebunden()){
		return;
	}
	var t_a=(t_i+1) % 2;
	var t_partner=this.p_getPerson(t_a);
	var t_person=this.p_getPerson(t_i);
	if(t_partner.m_mbAHVBezueger){
		return;
	}
	t_iMonateAufschub=t_person.m_miBezugsjahr-this.m_mdOrdDatum[t_i].p_getYear();
	t_iMonateAufschub*=12;
	if(t_iMonateAufschub<=0){
		return;
	}
	if(this.m_flex[t_i].m_satzAufschub==1.0){
		return;
	}
	t_pcPeriode=this.m_mpcZeitachse.m_maPerioden.p_get(0);
	this.p_sammleRenten(t_pcPeriode);
	if(this.m_bestand[t_i].m_Altersrente!=null){
		t_rBetrag=bb_utils_round(this.m_flex[t_i].m_satzAufschub*this.m_bestand[t_i].m_Altersrente.p_getNettoBetrag()/(1.0+this.m_flex[t_i].m_satzAufschub));
		t_rTotalAltersrenten=bb_utils_round(t_rBetrag*(t_iMonateAufschub)/12.0);
		for(t_k=0;t_k<this.p_getNbKinder();t_k=t_k+1){
			if(this.m_bestand[t_i].m_AHVKinderrente[t_k]!=null){
				t_rBetrag=bb_utils_round(this.m_flex[t_i].m_satzAufschub*this.m_bestand[t_i].m_AHVKinderrente[t_k].p_getNettoBetrag()/(1.0+this.m_flex[t_i].m_satzAufschub));
				t_rTotalKinderrenten+=bb_utils_round(t_rBetrag*(t_iMonateAufschub)/12.0);
				t_iKinder+=1;
			}
		}
	}
	var t_rAlterszuschlag=bb_utils_round(t_rTotalAltersrenten*12.0/(t_iMonateAufschub));
	var t_rKinderzuschlag=bb_utils_round(t_rTotalKinderrenten*12.0/(t_iMonateAufschub));
	var t_=this.m_mpcZeitachse.m_maPerioden.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		t_pcPeriode=t_.p_NextObject();
		if(t_pcPeriode.m_mdBeginn.p_before(this.m_mdErlDatum[t_a])){
			continue;
		}
		this.p_sammleRenten(t_pcPeriode);
		if(this.m_bestand[t_i].m_Altersrente!=null){
			this.m_bestand[t_i].m_Altersrente.p_addZuschlag(t_rAlterszuschlag,22);
			if(t_iKinder>0){
				for(t_k=0;t_k<this.p_getNbKinder();t_k=t_k+1){
					if(this.m_bestand[t_i].m_AHVKinderrente[t_k]!=null){
						t_rBetrag=bb_utils_round(t_rKinderzuschlag/(t_iKinder));
						this.m_bestand[t_i].m_AHVKinderrente[t_k].p_addZuschlag(t_rBetrag,22);
					}
				}
			}
		}
	}
}
c_AHVKuerzung.prototype.p_schiebeErzeugtAuf=function(t_i){
	var t_pcPeriode=null;
	var t_rTotalAltersrenten=0.0;
	var t_rTotalKinderrenten=0.0;
	var t_iMonateAufschub=0;
	var t_iMonate=0;
	var t_rBetrag=0.0;
	var t_iKinder=0;
	var t_bFirstE=true;
	var t_bFirstS=true;
	var t_person=this.p_getPerson(t_i);
	var t_k=0;
	if(this.m_flex[t_i].m_istBestand){
		return;
	}
	var t_=this.m_mpcZeitachse.m_maPerioden.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		t_pcPeriode=t_.p_NextObject();
		if(t_pcPeriode.m_mdBeginn.p_afterOrSame(this.m_mdErlDatum[t_i])){
			break;
		}
		this.p_sammleRenten(t_pcPeriode);
		if(this.m_erzeugt[t_i].m_Altersrente!=null){
			t_iMonate=t_pcPeriode.p_getMonate2();
			t_iMonateAufschub+=t_iMonate;
			t_rBetrag=bb_utils_round(this.m_erzeugt[t_i].m_Altersrente.p_getNettoBetrag());
			t_rTotalAltersrenten+=bb_utils_round(t_rBetrag*(t_iMonate)/12.0);
			this.m_erzeugt[t_i].m_Altersrente.p_setGekuerzt(0.0,19);
			for(t_k=0;t_k<this.p_getNbKinder();t_k=t_k+1){
				if(this.m_erzeugt[t_i].m_AHVKinderrente[t_k]!=null){
					t_rBetrag=bb_utils_round(this.m_erzeugt[t_i].m_AHVKinderrente[t_k].p_getNettoBetrag());
					t_rTotalKinderrenten+=bb_utils_round(t_rBetrag*(t_iMonate)/12.0);
					this.m_erzeugt[t_i].m_AHVKinderrente[t_k].p_setGekuerzt(0.0,19);
					t_iKinder+=1;
				}
			}
		}
	}
	if(t_iMonateAufschub==0){
		return;
	}
	var t_rAlterszuschlag=bb_utils_round(this.m_flex[t_i].m_satzAufschub*t_rTotalAltersrenten*12.0/(t_iMonateAufschub));
	var t_rKinderzuschlag=bb_utils_round(this.m_flex[t_i].m_satzAufschub*t_rTotalKinderrenten*12.0/(t_iMonateAufschub));
	var t_2=this.m_mpcZeitachse.m_maPerioden.p_ObjectEnumerator();
	while(t_2.p_HasNext()){
		t_pcPeriode=t_2.p_NextObject();
		if(t_pcPeriode.m_mdBeginn.p_before(this.m_mdErlDatum[t_i])){
			continue;
		}
		this.p_sammleRenten(t_pcPeriode);
		if(this.m_erzeugt[t_i].m_Altersrente!=null){
			this.m_erzeugt[t_i].m_Altersrente.p_setZuschlag(t_rAlterszuschlag,20);
			if(this.m_erzeugt[t_i].m_Altersrente.m_mpcLeistung.m_mbSplitting){
				if(t_bFirstS){
					t_person.m_mrAHVflexSplit=this.m_erzeugt[t_i].m_Altersrente.m_mpcLeistung.m_mrBetrag+t_rAlterszuschlag;
					t_bFirstS=false;
				}
			}else{
				if(t_bFirstE){
					t_person.m_mrAHVflexEigen=this.m_erzeugt[t_i].m_Altersrente.m_mpcLeistung.m_mrBetrag+t_rAlterszuschlag;
					t_bFirstE=false;
				}
			}
			if(t_iKinder>0){
				for(t_k=0;t_k<this.p_getNbKinder();t_k=t_k+1){
					if(this.m_erzeugt[t_i].m_AHVKinderrente[t_k]!=null){
						t_rBetrag=bb_utils_round(t_rKinderzuschlag/(t_iKinder));
						this.m_erzeugt[t_i].m_AHVKinderrente[t_k].p_setZuschlag(t_rBetrag,20);
					}
				}
			}
		}
	}
}
c_AHVKuerzung.prototype.p_zuschlagWeihnachtsgeld=function(t_i){
	var t_k=0;
	var t_betrag=.0;
	if(this.m_erzeugt[t_i].m_Altersrente!=null){
		t_betrag=this.m_erzeugt[t_i].m_Altersrente.p_getNettoBetrag();
		this.m_erzeugt[t_i].m_Altersrente.p_addZuschlag(t_betrag/12.0,32);
	}
	if(this.m_erzeugt[t_i].m_Invalidrente!=null){
		t_betrag=this.m_erzeugt[t_i].m_Invalidrente.p_getNettoBetrag();
		this.m_erzeugt[t_i].m_Invalidrente.p_addZuschlag(t_betrag/12.0,32);
	}
	if(this.m_erzeugt[t_i].m_Witwenrente!=null){
		t_betrag=this.m_erzeugt[t_i].m_Witwenrente.p_getNettoBetrag();
		this.m_erzeugt[t_i].m_Witwenrente.p_addZuschlag(t_betrag/12.0,32);
	}
	for(t_k=0;t_k<this.p_getNbKinder();t_k=t_k+1){
		if(this.m_erzeugt[t_i].m_AHVKinderrente[t_k]!=null){
			t_betrag=this.m_erzeugt[t_i].m_AHVKinderrente[t_k].p_getNettoBetrag();
			this.m_erzeugt[t_i].m_AHVKinderrente[t_k].p_addZuschlag(t_betrag/12.0,32);
		}
		if(this.m_erzeugt[t_i].m_IVKinderrente[t_k]!=null){
			t_betrag=this.m_erzeugt[t_i].m_IVKinderrente[t_k].p_getNettoBetrag();
			this.m_erzeugt[t_i].m_IVKinderrente[t_k].p_addZuschlag(t_betrag/12.0,32);
		}
		if(this.m_erzeugt[t_i].m_AHVWaisenrente[t_k]!=null){
			t_betrag=this.m_erzeugt[t_i].m_AHVWaisenrente[t_k].p_getNettoBetrag();
			this.m_erzeugt[t_i].m_AHVWaisenrente[t_k].p_addZuschlag(t_betrag/12.0,32);
		}
	}
}
c_AHVKuerzung.prototype.p_berechneKuerzungen=function(){
	var t_person=null;
	var t_periode=null;
	var t_datum=c_Date.m_new.call(new c_Date);
	var t_i=0;
	var t_j=0;
	this.p_sortiereEreignisse(0);
	if(this.p_mitPartner()){
		this.p_sortiereEreignisse(1);
	}
	var t_=this.m_mpcZeitachse.m_maPerioden.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		t_periode=t_.p_NextObject();
		this.p_sammleRenten(t_periode);
		for(t_i=0;t_i<this.p_getNbPersonen();t_i=t_i+1){
			if(!this.m_mbAHVKuerzung[t_i]){
				continue;
			}
			this.p_letztesEreignis(t_i,t_periode);
			this.p_ersetzeRenten(t_i);
			this.p_treffeElternrenten(t_i,t_periode);
			this.p_treffeKinderrenten(t_i,t_periode);
			this.p_blockiereWartezeit(t_i,1,t_periode);
			this.p_blockiereWartezeit(t_i,2,t_periode);
		}
		if(!this.p_istLiechtenstein()){
			this.p_ehepaarrenteMax150();
		}
		this.p_kinderrentenMax60();
		for(t_i=0;t_i<this.p_getNbPersonen();t_i=t_i+1){
			if(!this.m_mbAHVKuerzung[t_i]){
				continue;
			}
			this.p_kinderrentenVariabel(t_i);
			this.p_kinderBestandVariabel(t_i);
		}
	}
	for(t_i=0;t_i<this.p_getNbPersonen();t_i=t_i+1){
		if(!this.m_mbAHVKuerzung[t_i]){
			continue;
		}
		t_person=this.p_getPerson(t_i);
		this.m_flex[t_i].p_pruefeAusBestand(t_person);
		this.m_flex[t_i].p_setzeBezugsalter(t_person,this.m_mdErlDatum[t_i]);
		if(this.m_flex[t_i].m_mitVorbezug){
			if(this.m_flex[t_i].m_istBestand){
				this.p_schiebeBestandVor(t_i);
			}else{
				this.p_schiebeErzeugtVor(t_i);
			}
		}else{
			if(this.m_flex[t_i].m_mitAufschub){
				if(this.m_flex[t_i].m_istBestand){
					this.p_schiebeBestandAuf(t_i);
				}else{
					this.p_schiebeErzeugtAuf(t_i);
				}
			}
		}
	}
	if(this.p_istLiechtenstein()){
		var t_2=this.m_mpcZeitachse.m_maPerioden.p_ObjectEnumerator();
		while(t_2.p_HasNext()){
			t_periode=t_2.p_NextObject();
			this.p_sammleRenten(t_periode);
			for(t_i=0;t_i<this.p_getNbPersonen();t_i=t_i+1){
				if(!this.m_mbAHVKuerzung[t_i]){
					continue;
				}
				this.p_zuschlagWeihnachtsgeld(t_i);
			}
		}
	}
}
function c_Grundlagen(){
	Object.call(this);
	this.m_dMessung=null;
	this.m_dEreignis=null;
	this.m_dBezug=null;
	this.m_dBeginn=null;
	this.m_dAblauf=null;
	this.m_uPerson=0;
	this.m_bErl=false;
	this.m_bEU=false;
	this.m_bTod=false;
	this.m_bSplitting=false;
	this.m_iGrundPers=0;
	this.m_iGrundPart=0;
	this.m_iSollErsterBeitrag=0;
	this.m_iSollLetzterBeitrag=0;
	this.m_iSollBeitragsjahre=0;
	this.m_iIstErsterBeitrag=0;
	this.m_iIstErsterAnrechenbar=0;
	this.m_iIstBeitragsmonate=0;
	this.m_iIstBeitragsjahre=0;
	this.m_iIstFehljahre=0;
	this.m_iIstZusatzmonate=0;
	this.m_rSummeUebergang=.0;
	this.m_rSummeErziehung=.0;
	this.m_rSummeEinkommen=.0;
	this.m_rDurchErziehung=.0;
	this.m_rDurchSchriften=.0;
	this.m_rDurchEinkommen=.0;
	this.m_rDurchAufgewertet=.0;
	this.m_rMassEinkommen=.0;
	this.m_rMassEinkommen44=.0;
	this.m_rAufwertungsfaktor=.0;
	this.m_rKarrierefaktor=.0;
	this.m_rKarriereprozent=.0;
	this.m_iTeilskala=0;
	this.m_rTeilfaktor=.0;
	this.m_rTeilprozent=.0;
	this.m_rVollrente=.0;
	this.m_rTeilrente=.0;
	this.m_iErsterEintrag=0;
	this.m_iLetzterEintrag=0;
	this.m_iAnzahlEintraege=0;
	this.m_aBeitrag=null;
	this.m_rTotalEinkommen=.0;
	this.m_rTotalEingabe=.0;
	this.implments={c_Loggable:1};
}
c_Grundlagen.m_new=function(){
	this.m_dMessung=c_Date.m_new.call(new c_Date);
	this.m_dEreignis=c_Date.m_new.call(new c_Date);
	this.m_dBezug=c_Date.m_new.call(new c_Date);
	this.m_dBeginn=c_Date.m_new.call(new c_Date);
	this.m_dAblauf=c_Date.m_new.call(new c_Date);
	this.m_uPerson=0;
	this.m_bErl=false;
	this.m_bEU=false;
	this.m_bTod=false;
	this.m_bSplitting=false;
	this.m_iGrundPers=0;
	this.m_iGrundPart=0;
	this.m_iSollErsterBeitrag=0;
	this.m_iSollLetzterBeitrag=0;
	this.m_iSollBeitragsjahre=0;
	this.m_iIstErsterBeitrag=0;
	this.m_iIstErsterAnrechenbar=0;
	this.m_iIstBeitragsmonate=0;
	this.m_iIstBeitragsjahre=0;
	this.m_iIstFehljahre=0;
	this.m_iIstZusatzmonate=0;
	this.m_rSummeUebergang=0.0;
	this.m_rSummeErziehung=0.0;
	this.m_rSummeEinkommen=0.0;
	this.m_rDurchErziehung=0.0;
	this.m_rDurchSchriften=0.0;
	this.m_rDurchEinkommen=0.0;
	this.m_rDurchAufgewertet=0.0;
	this.m_rMassEinkommen=0.0;
	this.m_rMassEinkommen44=0.0;
	this.m_rAufwertungsfaktor=0.0;
	this.m_rKarrierefaktor=0.0;
	this.m_rKarriereprozent=0.0;
	this.m_iTeilskala=0;
	this.m_rTeilfaktor=0.0;
	this.m_rTeilprozent=0.0;
	this.m_rVollrente=0.0;
	this.m_rTeilrente=0.0;
	this.m_iErsterEintrag=0;
	this.m_iLetzterEintrag=0;
	this.m_iAnzahlEintraege=0;
	this.m_aBeitrag=c_VBeitrag.m_new.call(new c_VBeitrag);
	this.m_rTotalEinkommen=0.0;
	this.m_rTotalEingabe=0.0;
	return this;
}
c_Grundlagen.prototype.p_notValid=function(){
	return this.m_dMessung.p_notValid();
}
c_Grundlagen.prototype.p_isValid=function(){
	return this.m_dMessung.p_isValid();
}
c_Grundlagen.prototype.p_getBeitrag=function(t_i){
	return this.m_aBeitrag.p_get(t_i);
}
function c_Beitrag(){
	Object.call(this);
	this.m_iJahr=0;
	this.m_bDoppelt=false;
	this.m_eErwerbsart=0;
	this.m_iErwerbsMt=0;
	this.m_bJugend=false;
	this.m_bSplitting=false;
	this.m_bFehljahr=false;
	this.m_iMtVersichert=0;
	this.m_iMtBeitragen=0;
	this.m_iMtErfuellt=0;
	this.m_rEigenEinkommen=.0;
	this.m_rGesplittetesEK=.0;
	this.m_rErziehungsGuts=.0;
	this.m_iMtVerschoben=0;
	this.m_rEKVerschoben=.0;
	this.m_iMtEingefuegt=0;
	this.m_rEKEingefuegt=.0;
	this.m_iMtGeschenkt=0;
	this.implments={c_Loggable:1};
}
c_Beitrag.m_new=function(){
	this.m_iJahr=0;
	this.m_bDoppelt=false;
	this.m_eErwerbsart=4;
	this.m_iErwerbsMt=0;
	this.m_bJugend=false;
	this.m_bSplitting=false;
	this.m_bFehljahr=false;
	this.m_iMtVersichert=0;
	this.m_iMtBeitragen=0;
	this.m_iMtErfuellt=0;
	this.m_rEigenEinkommen=0.0;
	this.m_rGesplittetesEK=0.0;
	this.m_rErziehungsGuts=0.0;
	this.m_iMtVerschoben=0;
	this.m_rEKVerschoben=0.0;
	this.m_iMtEingefuegt=0;
	this.m_rEKEingefuegt=0.0;
	this.m_iMtGeschenkt=0;
	return this;
}
function c_List7(){
	Object.call(this);
	this.m__head=(c_HeadNode7.m_new.call(new c_HeadNode7));
}
c_List7.m_new=function(){
	return this;
}
c_List7.prototype.p_AddLast7=function(t_data){
	return c_Node12.m_new.call(new c_Node12,this.m__head,this.m__head.m__pred,t_data);
}
c_List7.m_new2=function(t_data){
	var t_=t_data;
	var t_2=0;
	while(t_2<t_.length){
		var t_t=t_[t_2];
		t_2=t_2+1;
		this.p_AddLast7(t_t);
	}
	return this;
}
c_List7.prototype.p_Count=function(){
	var t_n=0;
	var t_node=this.m__head.m__succ;
	while(t_node!=this.m__head){
		t_node=t_node.m__succ;
		t_n+=1;
	}
	return t_n;
}
c_List7.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator4.m_new.call(new c_Enumerator4,this);
}
c_List7.prototype.p_ToArray=function(){
	var t_arr=new_object_array(this.p_Count());
	var t_i=0;
	var t_=this.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_t=t_.p_NextObject();
		t_arr[t_i]=t_t;
		t_i+=1;
	}
	return t_arr;
}
function c_Vector7(){
	c_List7.call(this);
	this.m_updated=false;
	this.m_items=[];
}
c_Vector7.prototype=extend_class(c_List7);
c_Vector7.m_new=function(){
	c_List7.m_new.call(this);
	this.m_updated=false;
	return this;
}
c_Vector7.prototype.p_add10=function(t_elt){
	this.p_AddLast7(t_elt);
	this.m_updated=false;
}
c_Vector7.prototype.p_size=function(){
	if(this.m_updated){
		return this.m_items.length;
	}else{
		return this.p_Count();
	}
}
c_Vector7.prototype.p_get=function(t_i){
	if(t_i<0 || t_i>=this.p_size()){
		return null;
	}
	if(!this.m_updated){
		this.m_items=this.p_ToArray();
		this.m_updated=true;
	}
	return this.m_items[t_i];
}
function c_VBeitrag(){
	c_Vector7.call(this);
	this.implments={c_Loggable:1};
}
c_VBeitrag.prototype=extend_class(c_Vector7);
c_VBeitrag.m_new=function(){
	c_Vector7.m_new.call(this);
	return this;
}
function c_Node12(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node12.m_new=function(t_succ,t_pred,t_data){
	this.m__succ=t_succ;
	this.m__pred=t_pred;
	this.m__succ.m__pred=this;
	this.m__pred.m__succ=this;
	this.m__data=t_data;
	return this;
}
c_Node12.m_new2=function(){
	return this;
}
function c_HeadNode7(){
	c_Node12.call(this);
}
c_HeadNode7.prototype=extend_class(c_Node12);
c_HeadNode7.m_new=function(){
	c_Node12.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
	return this;
}
function c_Enumerator4(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator4.m_new=function(t_list){
	this.m__list=t_list;
	this.m__curr=t_list.m__head.m__succ;
	return this;
}
c_Enumerator4.m_new2=function(){
	return this;
}
c_Enumerator4.prototype.p_HasNext=function(){
	while(this.m__curr.m__succ.m__pred!=this.m__curr){
		this.m__curr=this.m__curr.m__succ;
	}
	return this.m__curr!=this.m__list.m__head;
}
c_Enumerator4.prototype.p_NextObject=function(){
	var t_data=this.m__curr.m__data;
	this.m__curr=this.m__curr.m__succ;
	return t_data;
}
function bb_ahv_werte_getBeitragssatz(t_land,t_iJahr,t_eArt){
	var t_rAngestellte_Pz=0.0;
	var t_rSelbstaendige_Pz=0.0;
	if(t_iJahr<1948){
		return 0.0;
	}else{
		if(t_land.p_liechtenstein()){
			t_rAngestellte_Pz=9.0999999999999996;
			t_rSelbstaendige_Pz=9.0999999999999996;
		}else{
			if(t_iJahr>=1948 && t_iJahr<1960){
				t_rAngestellte_Pz=4.0;
				t_rSelbstaendige_Pz=4.0;
			}else{
				if(t_iJahr>=1960 && t_iJahr<1968){
					t_rAngestellte_Pz=4.8000000000000007;
					t_rSelbstaendige_Pz=4.8000000000000007;
				}else{
					if(t_iJahr>=1968 && t_iJahr<1969){
						t_rAngestellte_Pz=4.9000000000000004;
						t_rSelbstaendige_Pz=4.9000000000000004;
					}else{
						if(t_iJahr>=1969 && t_iJahr<1973){
							t_rAngestellte_Pz=6.2000000000000002;
							t_rSelbstaendige_Pz=5.5999999999999996;
						}else{
							if(t_iJahr>=1973 && t_iJahr<1975){
								t_rAngestellte_Pz=9.0;
								t_rSelbstaendige_Pz=8.0;
							}else{
								if(t_iJahr>=1975 && t_iJahr<1977){
									t_rAngestellte_Pz=10.0;
									t_rSelbstaendige_Pz=8.9000000000000004;
								}else{
									if(t_iJahr>=1977 && t_iJahr<1979){
										t_rAngestellte_Pz=10.0;
										t_rSelbstaendige_Pz=8.9000000000000004;
									}else{
										if(t_iJahr>=1979 && t_iJahr<1980){
											t_rAngestellte_Pz=10.0;
											t_rSelbstaendige_Pz=9.4000000000000004;
										}else{
											if(t_iJahr>=1980 && t_iJahr<1982){
												t_rAngestellte_Pz=10.0;
												t_rSelbstaendige_Pz=9.4000000000000004;
											}else{
												if(t_iJahr>=1982 && t_iJahr<1984){
													t_rAngestellte_Pz=10.0;
													t_rSelbstaendige_Pz=9.4000000000000004;
												}else{
													if(t_iJahr>=1984 && t_iJahr<1986){
														t_rAngestellte_Pz=10.0;
														t_rSelbstaendige_Pz=9.4000000000000004;
													}else{
														if(t_iJahr>=1986 && t_iJahr<1988){
															t_rAngestellte_Pz=10.0;
															t_rSelbstaendige_Pz=9.4000000000000004;
														}else{
															if(t_iJahr>=1988 && t_iJahr<1990){
																t_rAngestellte_Pz=10.1;
																t_rSelbstaendige_Pz=9.5;
															}else{
																if(t_iJahr>=1990 && t_iJahr<1992){
																	t_rAngestellte_Pz=10.1;
																	t_rSelbstaendige_Pz=9.5;
																}else{
																	if(t_iJahr>=1992 && t_iJahr<1993){
																		t_rAngestellte_Pz=10.1;
																		t_rSelbstaendige_Pz=9.5;
																	}else{
																		if(t_iJahr>=1993 && t_iJahr<1995){
																			t_rAngestellte_Pz=10.1;
																			t_rSelbstaendige_Pz=9.5;
																		}else{
																			if(t_iJahr>=1995 && t_iJahr<1996){
																				t_rAngestellte_Pz=10.100000000000001;
																				t_rSelbstaendige_Pz=9.5;
																			}else{
																				if(t_iJahr>=1996 && t_iJahr<2003){
																					t_rAngestellte_Pz=10.100000000000001;
																					t_rSelbstaendige_Pz=9.5;
																				}else{
																					if(t_iJahr>=2003 && t_iJahr<2007){
																						t_rAngestellte_Pz=10.100000000000001;
																						t_rSelbstaendige_Pz=9.5;
																					}else{
																						if(t_iJahr>=2007 && t_iJahr<2009){
																							t_rAngestellte_Pz=10.100000000000001;
																							t_rSelbstaendige_Pz=9.5;
																						}else{
																							if(t_iJahr>=2009 && t_iJahr<2011){
																								t_rAngestellte_Pz=10.100000000000001;
																								t_rSelbstaendige_Pz=9.5;
																							}else{
																								if(t_iJahr>=2011 && t_iJahr<2016){
																									t_rAngestellte_Pz=10.300000000000001;
																									t_rSelbstaendige_Pz=9.6999999999999993;
																								}else{
																									t_rAngestellte_Pz=10.25;
																									t_rSelbstaendige_Pz=9.6499999999999986;
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	if(t_eArt==2){
		return t_rSelbstaendige_Pz;
	}else{
		return t_rAngestellte_Pz;
	}
}
function bb_ahv_werte_getFulfilledMonths(t_a,t_iIncome){
	if(t_iIncome>=t_a[11]){
		return 12;
	}
	if(t_iIncome==0){
		return 0;
	}
	for(var t_i=9;t_i>=0;t_i=t_i+-1){
		if(t_iIncome>t_a[t_i]){
			return t_i+2;
		}
	}
	return 1;
}
function bb_ahv_werte_getAngestelltErfuellteMonate(t_land,t_iJahr,t_rEinkommen){
	var t_a_1968=[25,50,75,100,125,150,175,200,225,250,275,276];
	var t_a_1972=[64,129,193,258,322,387,451,516,580,645,709,710];
	var t_a_1978=[83,166,250,333,416,500,583,666,750,833,916,917];
	var t_a_1981=[166,333,500,666,833,1000,1166,1333,1500,1666,1833,1834];
	var t_a_1985=[208,416,625,833,1041,1250,1458,1666,1875,2083,2291,2292];
	var t_a_1989=[250,500,750,1000,1250,1500,1750,2000,2250,2500,2750,2751];
	var t_a_1991=[267,534,801,1068,1335,1602,1869,2136,2403,2670,2937,2938];
	var t_a_1995=[297,594,891,1188,1485,1782,2079,2376,2673,2970,3267,3268];
	var t_a_2002=[322,644,966,1288,1610,1932,2254,2576,2898,3220,3542,3543];
	var t_a_2006=[351,702,1053,1404,1755,2106,2457,2808,3159,3510,3861,3862];
	var t_a_2008=[367,734,1101,1468,1835,2202,2569,2936,3303,3670,4037,4038];
	var t_a_2010=[380,760,1140,1520,1900,2280,2660,3040,3420,3800,4180,4181];
	var t_a_2012=[384,768,1152,1536,1920,2304,2688,3072,3456,3840,4224,4225];
	var t_a_2015=[389,778,1167,1556,1945,2334,2723,3112,3501,3890,4279,4280];
	var t_iIncome=bb_utils_trunc(t_rEinkommen);
	if(t_iJahr<=1968){
		return bb_ahv_werte_getFulfilledMonths(t_a_1968,((t_iIncome)|0));
	}
	if(t_iJahr<=1972){
		return bb_ahv_werte_getFulfilledMonths(t_a_1972,((t_iIncome)|0));
	}
	if(t_iJahr<=1978){
		return bb_ahv_werte_getFulfilledMonths(t_a_1978,((t_iIncome)|0));
	}
	if(t_iJahr<=1981){
		return bb_ahv_werte_getFulfilledMonths(t_a_1981,((t_iIncome)|0));
	}
	if(t_iJahr<=1985){
		return bb_ahv_werte_getFulfilledMonths(t_a_1985,((t_iIncome)|0));
	}
	if(t_iJahr<=1989){
		return bb_ahv_werte_getFulfilledMonths(t_a_1989,((t_iIncome)|0));
	}
	if(t_iJahr<=1991){
		return bb_ahv_werte_getFulfilledMonths(t_a_1991,((t_iIncome)|0));
	}
	if(t_iJahr<=1995){
		return bb_ahv_werte_getFulfilledMonths(t_a_1995,((t_iIncome)|0));
	}
	if(t_iJahr<=2002){
		return bb_ahv_werte_getFulfilledMonths(t_a_2002,((t_iIncome)|0));
	}
	if(t_iJahr<=2006){
		return bb_ahv_werte_getFulfilledMonths(t_a_2006,((t_iIncome)|0));
	}
	if(t_iJahr<=2008){
		return bb_ahv_werte_getFulfilledMonths(t_a_2008,((t_iIncome)|0));
	}
	if(t_iJahr<=2010){
		return bb_ahv_werte_getFulfilledMonths(t_a_2010,((t_iIncome)|0));
	}
	if(t_iJahr<=2012){
		return bb_ahv_werte_getFulfilledMonths(t_a_2012,((t_iIncome)|0));
	}
	return bb_ahv_werte_getFulfilledMonths(t_a_2015,((t_iIncome)|0));
}
function bb_ahv_werte_getSelbstaendigErfuellteMonate(t_land,t_iJahr,t_rBeitrag){
	var t_a_1959=[1,2,3,4,5,6,7,8,9,10,11,12];
	var t_a_1968=[1,2,3,4,6,7,8,9,10,12,13,14];
	var t_a_1972=[4,8,12,16,20,24,28,32,36,40,44,45];
	var t_a_1975=[7,15,22,30,37,45,52,60,67,75,82,83];
	var t_a_1978=[8,16,25,33,41,50,58,66,75,83,91,92];
	var t_a_1981=[16,33,50,66,83,100,116,133,150,166,183,184];
	var t_a_1985=[20,41,62,83,104,125,145,166,187,208,229,230];
	var t_a_1989=[25,50,75,100,125,150,175,200,225,250,275,276];
	var t_a_1991=[27,54,81,108,135,162,189,216,243,270,297,298];
	var t_a_1995=[30,60,90,120,150,180,210,240,270,300,330,331];
	var t_a_2002=[32,65,97,130,162,195,227,260,292,325,357,358];
	var t_a_2006=[35,70,106,141,177,212,247,283,318,354,389,390];
	var t_a_2008=[37,74,111,148,185,222,259,296,333,370,407,408];
	var t_a_2010=[38,76,115,153,191,230,268,306,345,383,421,422];
	var t_a_2012=[39,79,118,158,197,237,277,316,356,395,435,436];
	var t_a_2015=[40,80,120,160,200,240,280,320,360,400,440,441];
	var t_iBeitrag=bb_utils_trunc(t_rBeitrag);
	if(t_iJahr<=1959){
		return bb_ahv_werte_getFulfilledMonths(t_a_1959,((t_iBeitrag)|0));
	}
	if(t_iJahr<=1968){
		return bb_ahv_werte_getFulfilledMonths(t_a_1968,((t_iBeitrag)|0));
	}
	if(t_iJahr<=1972){
		return bb_ahv_werte_getFulfilledMonths(t_a_1972,((t_iBeitrag)|0));
	}
	if(t_iJahr<=1975){
		return bb_ahv_werte_getFulfilledMonths(t_a_1975,((t_iBeitrag)|0));
	}
	if(t_iJahr<=1978){
		return bb_ahv_werte_getFulfilledMonths(t_a_1978,((t_iBeitrag)|0));
	}
	if(t_iJahr<=1981){
		return bb_ahv_werte_getFulfilledMonths(t_a_1981,((t_iBeitrag)|0));
	}
	if(t_iJahr<=1985){
		return bb_ahv_werte_getFulfilledMonths(t_a_1985,((t_iBeitrag)|0));
	}
	if(t_iJahr<=1989){
		return bb_ahv_werte_getFulfilledMonths(t_a_1989,((t_iBeitrag)|0));
	}
	if(t_iJahr<=1991){
		return bb_ahv_werte_getFulfilledMonths(t_a_1991,((t_iBeitrag)|0));
	}
	if(t_iJahr<=1995){
		return bb_ahv_werte_getFulfilledMonths(t_a_1995,((t_iBeitrag)|0));
	}
	if(t_iJahr<=2002){
		return bb_ahv_werte_getFulfilledMonths(t_a_2002,((t_iBeitrag)|0));
	}
	if(t_iJahr<=2006){
		return bb_ahv_werte_getFulfilledMonths(t_a_2006,((t_iBeitrag)|0));
	}
	if(t_iJahr<=2008){
		return bb_ahv_werte_getFulfilledMonths(t_a_2008,((t_iBeitrag)|0));
	}
	if(t_iJahr<=2010){
		return bb_ahv_werte_getFulfilledMonths(t_a_2010,((t_iBeitrag)|0));
	}
	if(t_iJahr<=2012){
		return bb_ahv_werte_getFulfilledMonths(t_a_2012,((t_iBeitrag)|0));
	}
	return bb_ahv_werte_getFulfilledMonths(t_a_2015,((t_iBeitrag)|0));
}
function bb_ahv_werte_getMinSelbstaendigEK(t_land,t_iJahr){
	if(t_land.p_liechtenstein()){
		return 6000.0;
	}
	if(t_iJahr<=1968){
		return 600.0;
	}
	if(t_iJahr<=1972){
		return 1600.0;
	}
	if(t_iJahr<=1978){
		return 2000.0;
	}
	if(t_iJahr<=1981){
		return 4200.0;
	}
	if(t_iJahr<=1985){
		return 5100.0;
	}
	if(t_iJahr<=1989){
		return 6100.0;
	}
	if(t_iJahr<=1991){
		return 6500.0;
	}
	if(t_iJahr<=1995){
		return 7200.0;
	}
	if(t_iJahr<=2002){
		return 7800.0;
	}
	if(t_iJahr<=2006){
		return 8500.0;
	}
	if(t_iJahr<=2008){
		return 8900.0;
	}
	if(t_iJahr<=2010){
		return 9200.0;
	}
	if(t_iJahr<=2012){
		return 9300.0;
	}
	if(t_iJahr<=2015){
		return 9400.0;
	}
	return t_land.m_minBeitragSelbstaendig;
}
function bb_ahv_werte_getErwerbslosErfuellteMonate(t_land,t_iJahr,t_rEinkommen){
	return bb_ahv_werte_getAngestelltErfuellteMonate(t_land,t_iJahr,t_rEinkommen);
}
function bb_ahv_werte_getAufwertungsfaktor(t_land,t_jahrgang){
	if(t_land.p_liechtenstein()){
		return t_land.m_aufwertungsfaktoren[0];
	}
	var t_i=t_jahrgang-t_land.m_aufwertungsstart;
	if(t_i>=0 && t_i<t_land.m_aufwertungsfaktoren.length){
		return t_land.m_aufwertungsfaktoren[t_i];
	}
	return 1.0;
}
function bb_ahv_werte_getSkala44Einkommen(t_land,t_rEinkommen){
	if(t_rEinkommen<=bb_ahv_werte_getMinAltersrente(t_land)){
		return bb_ahv_werte_getMinAltersrente(t_land);
	}else{
		if(t_rEinkommen>=6.0*bb_ahv_werte_getMinAltersrente(t_land)){
			return 6.0*bb_ahv_werte_getMinAltersrente(t_land);
		}else{
			t_rEinkommen/=1.2;
			t_rEinkommen/=bb_ahv_werte_getMinAltersrente(t_land)/12.0;
			t_rEinkommen=bb_utils_trunc(t_rEinkommen+0.9999);
			t_rEinkommen*=1.2;
			t_rEinkommen*=bb_ahv_werte_getMinAltersrente(t_land)/12.0;
			t_rEinkommen=bb_utils_trunc(t_rEinkommen+0.9999);
			return t_rEinkommen;
		}
	}
}
function c_AHVStand(){
	Object.call(this);
	this.m_istBestand=false;
	this.m_idxPerson=0;
	this.m_nbKinder=0;
	this.m_AHVKinderrente=[];
	this.m_AHVWaisenrente=[];
	this.m_IVKinderrente=[];
	this.m_Altersrente=null;
	this.m_Witwenrente=null;
	this.m_Invalidrente=null;
}
c_AHVStand.m_new=function(t_istBestand,t_idxPerson,t_nbKinder){
	this.m_istBestand=t_istBestand;
	this.m_idxPerson=t_idxPerson;
	this.m_nbKinder=t_nbKinder;
	if(t_nbKinder>0){
		this.m_AHVKinderrente=new_object_array(t_nbKinder);
		this.m_AHVWaisenrente=new_object_array(t_nbKinder);
		this.m_IVKinderrente=new_object_array(t_nbKinder);
	}
	return this;
}
c_AHVStand.m_new2=function(){
	return this;
}
c_AHVStand.prototype.p_clear=function(){
	this.m_Altersrente=null;
	this.m_Witwenrente=null;
	this.m_Invalidrente=null;
	for(var t_i=0;t_i<this.m_nbKinder;t_i=t_i+1){
		this.m_AHVKinderrente[t_i]=null;
		this.m_AHVWaisenrente[t_i]=null;
		this.m_IVKinderrente[t_i]=null;
	}
}
c_AHVStand.prototype.p_store=function(t_elt){
	var t_leistung=null;
	t_leistung=t_elt.m_mpcLeistung;
	if(this.m_istBestand!=t_leistung.m_mbBestand || this.m_idxPerson!=t_leistung.m_miVersichert){
		return false;
	}
	if(t_leistung.p_istKapital()){
		return false;
	}
	if(t_leistung.p_istKinderrente()){
		var t_k=t_leistung.m_miBeguenstigt-2;
		if(t_k<0 || t_k>=this.m_nbKinder){
			return false;
		}
		if(t_leistung.p_istAHV() && t_leistung.p_istAHVKinderrente()){
			this.m_AHVKinderrente[t_k]=t_elt;
			return true;
		}
		if(t_leistung.p_istAHV() && t_leistung.p_istWaisenrente()){
			this.m_AHVWaisenrente[t_k]=t_elt;
			return true;
		}
		if(t_leistung.p_istIV() && t_leistung.p_istIVKinderrente()){
			this.m_IVKinderrente[t_k]=t_elt;
			return true;
		}
		return false;
	}
	if(t_leistung.p_istAHV() && t_leistung.p_istAltersleistung()){
		this.m_Altersrente=t_elt;
		return true;
	}
	if(t_leistung.p_istAHV() && t_leistung.p_istWitwenleistung()){
		this.m_Witwenrente=t_elt;
		return true;
	}
	if(t_leistung.p_istIV() && t_leistung.p_istEULeistung()){
		this.m_Invalidrente=t_elt;
		return true;
	}
	if(!t_leistung.p_istKinderrente()){
		return false;
	}
	return false;
}
function c_Element(){
	Object.call(this);
	this.m_mpcLeistung=null;
	this.m_mrBetrag=.0;
	this.m_mrKuerzung=.0;
	this.m_mrZuschlag=.0;
	this.m_miReferenz=0;
	this.m_miErwerb=0;
	this.m_maGruende=null;
	this.implments={c_Loggable:1};
}
c_Element.m_new=function(t_pcLeistung){
	this.m_mpcLeistung=t_pcLeistung;
	this.m_mrBetrag=t_pcLeistung.m_mrBetrag;
	this.m_mrKuerzung=0.0;
	this.m_mrZuschlag=0.0;
	this.m_miReferenz=0;
	this.m_miErwerb=0;
	this.m_maGruende=c_VGrund.m_new.call(new c_VGrund);
	return this;
}
c_Element.m_new2=function(){
	return this;
}
c_Element.prototype.p_setGekuerzt=function(t_rBetrag,t_iGrund){
	this.m_mrKuerzung=this.m_mrBetrag+this.m_mrZuschlag-t_rBetrag;
	if(String(t_iGrund)!=""){
		var t_cGrund=c_Grund.m_new.call(new c_Grund,this.m_mrKuerzung,t_iGrund,0);
		this.m_maGruende.p_add12(t_cGrund);
	}
}
c_Element.prototype.p_getNettoBetrag=function(){
	var t_r=this.m_mrBetrag+this.m_mrZuschlag-this.m_mrKuerzung;
	if(t_r<0.0){
		return 0.0;
	}
	return t_r;
}
c_Element.prototype.p_setKuerzung=function(t_rBetrag,t_iGrund){
	this.m_mrKuerzung=t_rBetrag;
	if(String(t_iGrund)!=""){
		var t_cGrund=c_Grund.m_new.call(new c_Grund,t_rBetrag,t_iGrund,1);
		this.m_maGruende.p_add12(t_cGrund);
	}
}
c_Element.prototype.p_setZuschlag=function(t_rBetrag,t_iGrund){
	this.m_mrZuschlag=t_rBetrag;
	if(String(t_iGrund)!=""){
		var t_cGrund=c_Grund.m_new.call(new c_Grund,t_rBetrag,t_iGrund,3);
		this.m_maGruende.p_add12(t_cGrund);
	}
}
c_Element.prototype.p_addKuerzung=function(t_rBetrag,t_iGrund){
	if(bb_utils_round(t_rBetrag)==0.0){
		return;
	}
	this.m_mrKuerzung+=t_rBetrag;
	if(String(t_iGrund)!=""){
		var t_cGrund=c_Grund.m_new.call(new c_Grund,t_rBetrag,t_iGrund,2);
		this.m_maGruende.p_add12(t_cGrund);
	}
}
c_Element.prototype.p_addZuschlag=function(t_rBetrag,t_iGrund){
	if(bb_utils_round(t_rBetrag)==0.0){
		return;
	}
	this.m_mrZuschlag+=t_rBetrag;
	if(String(t_iGrund)!=""){
		var t_cGrund=c_Grund.m_new.call(new c_Grund,t_rBetrag,t_iGrund,4);
		this.m_maGruende.p_add12(t_cGrund);
	}
}
function c_AHVFlex(){
	Object.call(this);
	this.m_land=null;
	this.m_istBestand=false;
	this.m_mitVorbezug=false;
	this.m_mitAufschub=false;
	this.m_satzVorbezug=.0;
	this.m_satzAufschub=.0;
}
c_AHVFlex.m_new=function(t_land){
	this.m_land=t_land;
	this.m_istBestand=false;
	this.m_mitVorbezug=false;
	this.m_mitAufschub=false;
	this.m_satzVorbezug=0.0;
	this.m_satzAufschub=0.0;
	return this;
}
c_AHVFlex.m_new2=function(){
	return this;
}
c_AHVFlex.prototype.p_pruefeAusBestand=function(t_person){
	var t_dOrd=bb_ahv_werte_getPensionsdatum(this.m_land,t_person.m_meGeschlecht,(c_Date.m_new5.call(new c_Date,t_person.m_mdGeburtsdatum.p_getYear())));
	if(t_person.m_mbAHVBezueger && t_person.m_miBezugsjahr!=t_dOrd.p_getYear()){
		this.m_istBestand=true;
	}else{
		this.m_istBestand=false;
	}
}
c_AHVFlex.prototype.p_setzeBezugsalter=function(t_person,t_bezug){
	var t_alter=t_person.p_getAlterAm(t_bezug);
	var t_jahrgang=t_person.m_mdGeburtsdatum.p_getYear();
	var t_minAlter=bb_ahv_werte_getMinPensionsalter(this.m_land,t_person.m_meGeschlecht,t_jahrgang);
	var t_maxAlter=bb_ahv_werte_getMaxPensionsalter(this.m_land,t_person.m_meGeschlecht,t_jahrgang);
	var t_ordAlter=bb_ahv_werte_getPensionsalter(this.m_land,t_person.m_meGeschlecht,t_jahrgang);
	var t_ordDatum=bb_ahv_werte_getPensionsdatum(this.m_land,t_person.m_meGeschlecht,t_person.m_mdGeburtsdatum);
	if(t_alter<t_minAlter){
		t_alter=t_minAlter;
	}else{
		if(t_alter>t_maxAlter){
			t_alter=t_maxAlter;
		}
	}
	this.m_mitVorbezug=false;
	this.m_mitAufschub=false;
	this.m_satzVorbezug=0.0;
	this.m_satzAufschub=0.0;
	if(t_alter<t_ordAlter){
		this.m_mitVorbezug=true;
		this.m_satzVorbezug=bb_ahv_werte_getVorbezugsatz(this.m_land,t_bezug,t_ordDatum,t_jahrgang);
	}else{
		if(t_alter>t_ordAlter){
			this.m_mitAufschub=true;
			this.m_satzAufschub=bb_ahv_werte_getAufschubsatz(this.m_land,t_bezug,t_ordDatum,t_jahrgang);
		}
	}
}
function c_UVGLeistung(){
	c_Umfeld.call(this);
	this.m_mitWaisenrente=new_bool_array(2);
	this.m_mitEhegattenrente=new_bool_array(2);
	this.implments={c_Loggable:1};
}
c_UVGLeistung.prototype=extend_class(c_Umfeld);
c_UVGLeistung.m_new=function(t_umfeld){
	c_Umfeld.m_new2.call(this,t_umfeld);
	return this;
}
c_UVGLeistung.m_new2=function(){
	c_Umfeld.m_new3.call(this);
	return this;
}
c_UVGLeistung.prototype.p_erzeugeTaggeld=function(t_uPerson){
	if(!this.m_mdInvDatum[t_uPerson].p_isValid() || !this.m_mbInvUnfall[t_uPerson]){
		return;
	}
	var t_pcLeistung=null;
	var t_dBeginn=null;
	var t_dAblauf=null;
	t_dBeginn=c_Date.m_new.call(new c_Date);
	t_dAblauf=c_Date.m_new.call(new c_Date);
	t_dBeginn.p_setDate3(this.m_mdInvDatum[t_uPerson]);
	t_dBeginn.p_addDays(2);
	t_dAblauf.p_setDate3(this.m_mdInvDatum[t_uPerson]);
	t_dAblauf.p_addYears(this.m_miWartefrist);
	if(this.m_mdTodDatum[t_uPerson].p_isValid() && this.m_mdTodDatum[t_uPerson].p_before(t_dAblauf)){
		t_dAblauf.p_setDate3(this.m_mdTodDatum[t_uPerson]);
	}
	t_dAblauf.p_setLastOfPrevMonth();
	t_pcLeistung=c_Leistung.m_new2.call(new c_Leistung,3,40,t_uPerson,t_uPerson,bb_utils_round(0.8*this.p_getPerson(t_uPerson).m_mrUVGEinkommen),t_dBeginn,t_dAblauf,false);
	this.p_addLeistung2(t_pcLeistung);
}
c_UVGLeistung.prototype.p_erzeugeInvalidenrente=function(t_uPerson){
	if(!this.m_mdInvDatum[t_uPerson].p_isValid() || !this.m_mbInvUnfall[t_uPerson]){
		return;
	}
	var t_pcLeistung=null;
	var t_dBeginn=null;
	var t_dAblauf=null;
	t_dBeginn=c_Date.m_new.call(new c_Date);
	t_dAblauf=c_Date.m_new.call(new c_Date);
	t_dBeginn.p_setDate3(this.m_mdInvDatum[t_uPerson]);
	t_dBeginn.p_addYears(this.m_miWartefrist);
	if(this.m_mdTodDatum[t_uPerson].p_isValid()){
		t_dAblauf.p_setBefore(this.m_mdTodDatum[t_uPerson]);
	}else{
		t_dAblauf.p_setForever();
	}
	t_pcLeistung=c_Leistung.m_new2.call(new c_Leistung,3,30,t_uPerson,t_uPerson,bb_utils_round(0.8*this.p_getPerson(t_uPerson).m_mrUVGEinkommen),t_dBeginn,t_dAblauf,false);
	this.p_addLeistung2(t_pcLeistung);
}
c_UVGLeistung.prototype.p_erzeugeWaisenrenten=function(t_uPerson){
	if(!this.m_mdTodDatum[t_uPerson].p_isValid() || !this.m_mbTodUnfall[t_uPerson]){
		return;
	}
	var t_pcKind=null;
	var t_pcLeistung=null;
	var t_bIstHalbwaise=false;
	var t_bIstVollwaise=false;
	var t_bPartnerLebt=false;
	var t_bPartnerStirbt=false;
	var t_bFall1=false;
	var t_bFall2=false;
	var t_uPartner=0;
	var t_dBeginn=c_Date.m_new.call(new c_Date);
	var t_dAblauf=c_Date.m_new.call(new c_Date);
	var t_dTransition=c_Date.m_new.call(new c_Date);
	var t_dAnfang1=c_Date.m_new.call(new c_Date);
	var t_dAnfang2=c_Date.m_new.call(new c_Date);
	var t_dEnde1=c_Date.m_new.call(new c_Date);
	var t_dEnde2=c_Date.m_new.call(new c_Date);
	t_uPartner=(t_uPerson+1) % 2;
	if(this.p_mitPartner()){
		t_bPartnerLebt=this.m_mdTodDatum[t_uPartner].p_isUndefined() || this.m_mdTodDatum[t_uPartner].p_after(this.m_mdTodDatum[t_uPerson]);
		t_bPartnerStirbt=this.m_mdTodDatum[t_uPartner].p_isValid() && this.m_mdTodDatum[t_uPartner].p_after(this.m_mdTodDatum[t_uPerson]);
	}else{
		t_bPartnerLebt=false;
		t_bPartnerStirbt=false;
	}
	var t_dEreignis=c_Date.m_new.call(new c_Date);
	t_dEreignis.p_setDate3(this.m_mdTodDatum[t_uPerson]);
	t_dEreignis.p_addDays(300);
	var t_=this.m_maKinder.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		t_pcKind=t_.p_NextObject();
		if(t_pcKind.m_mdGeburtsdatum.p_afterOrSame(t_dEreignis)){
			continue;
		}
		if(t_pcKind.m_mdAusbildungsende25.p_beforeOrSame(this.m_mdTodDatum[t_uPerson])){
			continue;
		}
		if(!t_pcKind.p_istKindVon(t_uPerson)){
			continue;
		}
		if(this.p_getPerson(t_uPartner)!=null && t_pcKind.p_istKindVon(t_uPartner)){
			this.m_mitWaisenrente[t_uPerson]=true;
		}else{
			if(t_pcKind.m_meHaushalt==3){
				this.m_mitWaisenrente[t_uPerson]=true;
			}
		}
		t_bIstHalbwaise=false;
		t_bIstVollwaise=false;
		t_dBeginn.p_setDate3(this.m_mdTodDatum[t_uPerson]);
		t_dTransition.p_setUndefined();
		t_dAblauf.p_setDate3(t_pcKind.m_mdAusbildungsende25);
		t_dAnfang1.p_setDate3(t_dBeginn);
		t_dEnde1.p_setDate3(t_dAblauf);
		t_dAnfang2.p_setDate3(t_dBeginn);
		t_dEnde2.p_setDate3(t_dAblauf);
		t_bFall1=this.p_istAlleine() || this.p_istKonkubinat() && !t_pcKind.p_istKindVon(t_uPartner);
		t_bFall2=this.p_istGebunden() && !t_pcKind.p_istKindVon(t_uPartner);
		var t_person=this.p_getPerson(t_uPerson);
		if(t_bFall1){
			if(t_person.p_istVerwitwet()){
				t_bIstVollwaise=true;
			}else{
				t_bIstHalbwaise=true;
			}
		}else{
			if(t_bFall2){
				t_bIstHalbwaise=true;
			}else{
				t_bIstHalbwaise=t_bPartnerLebt;
				t_bIstVollwaise=!t_bPartnerLebt || t_bPartnerStirbt;
				if(t_bIstHalbwaise && t_bIstVollwaise){
					t_dTransition.p_setDate3(this.m_mdTodDatum[t_uPartner]);
					if(t_dAblauf.p_beforeOrSame(t_dTransition)){
						t_bIstVollwaise=false;
					}else{
						t_dAnfang1.p_setDate3(t_dBeginn);
						t_dEnde1.p_setDate3(t_dTransition);
						t_dEnde1.p_setLastOfPrevMonth();
						t_dAnfang2.p_setDate3(t_dTransition);
						t_dEnde2.p_setDate3(t_dAblauf);
					}
				}
			}
		}
		if(t_bIstHalbwaise){
			t_pcLeistung=c_Leistung.m_new2.call(new c_Leistung,3,52,t_uPerson,t_pcKind.m_miReferenz,bb_utils_round(0.15*this.p_getPerson(t_uPerson).m_mrUVGEinkommen),t_dAnfang1,t_dEnde1,false);
			this.p_addLeistung2(t_pcLeistung);
		}
		if(t_bIstVollwaise){
			t_pcLeistung=c_Leistung.m_new2.call(new c_Leistung,3,53,t_uPerson,t_pcKind.m_miReferenz,bb_utils_round(0.25*this.p_getPerson(t_uPerson).m_mrUVGEinkommen),t_dAnfang2,t_dEnde2,false);
			this.p_addLeistung2(t_pcLeistung);
		}
	}
}
c_UVGLeistung.prototype.p_erzeugeEhegattenrente=function(t_uPerson){
	var t_pcKind=null;
	var t_pcLeistung=null;
	var t_uPartner=0;
	var t_bLesben=0;
	var t_eLart=0;
	t_uPartner=(t_uPerson+1) % 2;
	if(this.m_mdTodDatum[t_uPerson].p_notValid() || !this.m_mbTodUnfall[t_uPerson] || !this.p_istGebunden()){
		return;
	}
	if(this.m_mdTodDatum[t_uPartner].p_isValid() && this.m_mdTodDatum[t_uPartner].p_beforeOrSame(this.m_mdTodDatum[t_uPerson])){
		return;
	}
	var t_dBeginn=c_Date.m_new.call(new c_Date);
	var t_dAblauf=c_Date.m_new.call(new c_Date);
	var t_dGrenze=c_Date.m_new.call(new c_Date);
	t_dBeginn.p_setDate3(this.m_mdTodDatum[t_uPerson]);
	if(this.m_mdTodDatum[t_uPartner].p_isValid()){
		t_dAblauf.p_setBefore(this.m_mdTodDatum[t_uPartner]);
	}else{
		t_dAblauf.p_setForever();
	}
	if(this.m_mitWaisenrente[t_uPerson]){
		this.m_mitEhegattenrente[t_uPerson]=true;
	}
	t_bLesben=((this.p_getPerson(0).p_istFrau() && this.p_getPerson(1).p_istFrau())?1:0);
	if(!((t_bLesben)!=0) && !this.m_mitEhegattenrente[t_uPerson] && this.p_getPerson(t_uPartner).p_istFrau() && this.p_getPerson(t_uPartner).p_getAlterAm(t_dBeginn)>=45){
		this.m_mitEhegattenrente[t_uPerson]=true;
	}
	if(!((t_bLesben)!=0) && !this.m_mitEhegattenrente[t_uPerson] && this.p_getPerson(t_uPartner).p_istFrau()){
		var t_=this.m_maKinder.p_ObjectEnumerator();
		while(t_.p_HasNext()){
			t_pcKind=t_.p_NextObject();
			if(t_pcKind.p_istKindVon(t_uPartner)){
				this.m_mitEhegattenrente[t_uPerson]=true;
				break;
			}
		}
	}
	if(!this.m_mitEhegattenrente[t_uPerson] && this.m_mdInvDatum[t_uPartner].p_isValid()){
		t_dGrenze.p_setDate3(this.m_mdTodDatum[t_uPerson]);
		t_dGrenze.p_addYears(2);
		if(this.m_mdInvDatum[t_uPartner].p_before(t_dGrenze)){
			t_dBeginn.p_setDate3(this.m_mdInvDatum[t_uPartner]);
			this.m_mitEhegattenrente[t_uPerson]=true;
		}
	}
	if(this.m_mitEhegattenrente[t_uPerson]){
		if(this.p_getPerson(t_uPartner).p_istMann()){
			t_eLart=63;
		}else{
			t_eLart=64;
		}
		t_pcLeistung=c_Leistung.m_new2.call(new c_Leistung,3,t_eLart,t_uPerson,t_uPartner,bb_utils_round(0.4*this.p_getPerson(t_uPerson).m_mrUVGEinkommen),t_dBeginn,t_dAblauf,false);
		this.p_addLeistung2(t_pcLeistung);
	}
}
c_UVGLeistung.prototype.p_erzeugeWitwenabfindung=function(t_uPerson){
	if(this.p_istLiechtenstein()){
		return;
	}
	var t_pcLeistung=null;
	var t_uPartner=0;
	var t_iEhejahre=0;
	var t_rBetrag=.0;
	t_uPartner=(t_uPerson+1) % 2;
	if(this.m_mitEhegattenrente[t_uPerson]){
		return;
	}
	if(this.m_mdTodDatum[t_uPerson].p_notValid() || !this.m_mbTodUnfall[t_uPerson] || !this.p_istVerheiratet()){
		return;
	}
	if(this.p_getPerson(t_uPartner).p_istMann()){
		return;
	}
	if(this.m_mdTodDatum[t_uPartner].p_isValid() && this.m_mdTodDatum[t_uPartner].p_beforeOrSame(this.m_mdTodDatum[t_uPerson])){
		return;
	}
	var t_dBeginn=c_Date.m_new.call(new c_Date);
	var t_dAblauf=c_Date.m_new.call(new c_Date);
	var t_dGrenze=c_Date.m_new.call(new c_Date);
	t_dBeginn.p_setDate3(this.m_mdTodDatum[t_uPerson]);
	if(this.m_mdTodDatum[t_uPartner].p_isValid()){
		t_dAblauf.p_setBefore(this.m_mdTodDatum[t_uPartner]);
	}else{
		t_dAblauf.p_setForever();
	}
	t_rBetrag=bb_utils_round(0.4*this.p_getPerson(t_uPerson).m_mrUVGEinkommen);
	t_dGrenze.p_setDate3(this.p_getPerson(t_uPerson).p_getHeiratsdatum());
	t_iEhejahre=((this.m_mdTodDatum[t_uPerson].p_getDaysFrom(t_dGrenze)/365)|0);
	if(t_iEhejahre>=5){
		t_rBetrag=t_rBetrag*5.0;
	}else{
		if(t_iEhejahre>=1){
			t_rBetrag=t_rBetrag*3.0;
		}
	}
	t_pcLeistung=c_Leistung.m_new2.call(new c_Leistung,3,65,t_uPerson,t_uPartner,t_rBetrag,t_dBeginn,t_dAblauf,false);
	t_pcLeistung.m_mbKapital=true;
	this.p_addLeistung2(t_pcLeistung);
}
c_UVGLeistung.prototype.p_berechneLeistungen=function(){
	var t_person=null;
	var t_i=0;
	for(t_i=0;t_i<2;t_i=t_i+1){
		this.m_mitWaisenrente[t_i]=false;
		this.m_mitEhegattenrente[t_i]=false;
	}
	for(t_i=0;t_i<this.p_getNbPersonen();t_i=t_i+1){
		if(!this.m_mbUVGLeistung[t_i]){
			continue;
		}
		t_person=this.p_getPerson(t_i);
		if(t_person.m_mrUVGEinkommen<1.0){
			continue;
		}
		this.p_erzeugeTaggeld(t_i);
		this.p_erzeugeInvalidenrente(t_i);
		if(this.p_getNbKinder()>0){
			this.p_erzeugeWaisenrenten(t_i);
		}
		if(this.p_mitPartner()){
			this.p_erzeugeEhegattenrente(t_i);
			this.p_erzeugeWitwenabfindung(t_i);
		}
	}
}
function c_UVGKuerzung(){
	c_UVGLeistung.call(this);
	this.m_mbErsteInv=false;
	this.m_mbErsteAng=false;
	this.m_mrInvRente=.0;
	this.m_mrAngRente=.0;
	this.m_miBeguenstigt_AHV=0;
	this.m_miBeguenstigt_IV=0;
	this.m_miBeguenstigt_UVG=0;
	this.m_mrInvGrenze=new_number_array(3);
	this.m_mrTodGrenze=new_number_array(3);
	this.implments={c_Loggable:1};
}
c_UVGKuerzung.prototype=extend_class(c_UVGLeistung);
c_UVGKuerzung.m_new=function(t_umfeld){
	c_UVGLeistung.m_new.call(this,t_umfeld);
	this.m_mbErsteInv=false;
	this.m_mbErsteAng=false;
	this.m_mrInvRente=0.0;
	this.m_mrAngRente=0.0;
	this.m_miBeguenstigt_AHV=0;
	this.m_miBeguenstigt_IV=0;
	this.m_miBeguenstigt_UVG=0;
	return this;
}
c_UVGKuerzung.m_new2=function(){
	c_UVGLeistung.m_new2.call(this);
	return this;
}
c_UVGKuerzung.prototype.p_kuerze=function(t_pcPeriode,t_uPerson){
	var t_aBeguenstigt_AHV=[];
	var t_aBeguenstigt_IV=[];
	var t_aBeguenstigt_UVG=[];
	var t_pcPerson=null;
	var t_pcLeistung=null;
	var t_pcElement=null;
	var t_bUVGTaggeld=false;
	var t_bIVTaggeld=false;
	var t_rTotalEK=.0;
	var t_rTotalAHV=.0;
	var t_rTotalIV=.0;
	var t_rTotalUVG=.0;
	var t_rATotalAHV=.0;
	var t_rATotalIV=.0;
	var t_rATotalUVG=.0;
	var t_rGrenze=.0;
	var t_rBetrag=.0;
	var t_rBezahlt=.0;
	var t_iAngehoerige=0;
	var t_iAngehoerige_AHV=0;
	var t_iAngehoerige_IV=0;
	var t_iAngehoerige_UVG=0;
	var t_bEU=false;
	var t_i=0;
	t_pcPerson=this.p_getPerson(t_uPerson);
	t_rTotalEK=0.0;
	t_rTotalAHV=0.0;
	t_rTotalIV=0.0;
	t_rTotalUVG=0.0;
	t_rATotalAHV=0.0;
	t_rATotalIV=0.0;
	t_rATotalUVG=0.0;
	t_iAngehoerige=2+this.p_getNbKinder();
	t_aBeguenstigt_AHV=new_number_array(t_iAngehoerige);
	t_aBeguenstigt_IV=new_number_array(t_iAngehoerige);
	t_aBeguenstigt_UVG=new_number_array(t_iAngehoerige);
	for(t_i=0;t_i<t_iAngehoerige;t_i=t_i+1){
		t_aBeguenstigt_AHV[t_i]=-1;
		t_aBeguenstigt_IV[t_i]=-1;
		t_aBeguenstigt_UVG[t_i]=-1;
	}
	t_iAngehoerige_AHV=0;
	t_iAngehoerige_IV=0;
	t_iAngehoerige_UVG=0;
	t_bUVGTaggeld=false;
	t_bIVTaggeld=false;
	t_bEU=false;
	var t_=t_pcPeriode.m_maElemente.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		t_pcElement=t_.p_NextObject();
		t_pcLeistung=t_pcElement.m_mpcLeistung;
		if(t_pcLeistung.p_istKapital()){
			continue;
		}
		if(t_pcLeistung.m_miBeguenstigt==t_uPerson){
			if(t_pcLeistung.m_meVersicherungsart==2 && t_pcLeistung.m_meLeistungsart==40){
				t_bIVTaggeld=true;
			}
			if(t_pcLeistung.m_meVersicherungsart==3 && t_pcLeistung.m_meLeistungsart==40){
				t_bUVGTaggeld=true;
			}
		}
		if(t_pcLeistung.m_mbBestand && t_pcLeistung.p_istTodesleistung()){
			continue;
		}
		if(t_pcLeistung.m_mbBestand && t_pcLeistung.p_istAltersleistung()){
			continue;
		}
		if(t_pcLeistung.m_miVersichert!=t_uPerson){
			continue;
		}
		if(t_pcLeistung.m_mbBestand){
			if(t_pcLeistung.m_meVersicherungsart==2){
				t_rTotalEK+=t_pcElement.p_getNettoBetrag();
			}
			if(t_pcLeistung.m_meVersicherungsart!=3){
				continue;
			}
		}
		if(t_pcLeistung.m_mbBestand && t_pcLeistung.m_meVersicherungsart==3){
			if(this.m_mdErlDatum[t_uPerson].p_isValid() && this.m_mdInvDatum[t_uPerson].p_notValid() && this.m_mdErlDatum[t_uPerson].p_after(t_pcPeriode.m_mdAblauf)){
				continue;
			}
		}
		if(t_pcLeistung.m_meVersicherungsart==1){
			t_rTotalAHV+=t_pcElement.p_getNettoBetrag();
		}
		if(t_pcLeistung.m_meVersicherungsart==2){
			t_rTotalIV+=t_pcElement.p_getNettoBetrag();
		}
		if(t_pcLeistung.m_meVersicherungsart==3){
			t_rTotalUVG+=t_pcElement.p_getNettoBetrag();
		}
		if(t_pcLeistung.m_miBeguenstigt==t_uPerson && t_pcLeistung.p_istEULeistung()){
			t_bEU=true;
		}
		if(t_pcLeistung.m_miBeguenstigt!=t_uPerson){
			if(t_pcLeistung.m_meVersicherungsart==1){
				t_rATotalAHV+=t_pcElement.p_getNettoBetrag();
				if(t_pcElement.p_getNettoBetrag()>0.0){
					for(t_i=0;t_i<t_iAngehoerige_AHV;t_i=t_i+1){
						if(t_aBeguenstigt_AHV[t_i]==t_pcLeistung.m_miBeguenstigt){
							break;
						}
					}
					if(t_i==t_iAngehoerige_AHV){
						t_aBeguenstigt_AHV[t_iAngehoerige_AHV]=t_pcLeistung.m_miBeguenstigt;
						t_iAngehoerige_AHV+=1;
					}
				}
			}
			if(t_pcLeistung.m_meVersicherungsart==2){
				t_rATotalIV+=t_pcElement.p_getNettoBetrag();
				if(t_pcElement.p_getNettoBetrag()>0.0){
					for(t_i=0;t_i<t_iAngehoerige_IV;t_i=t_i+1){
						if(t_aBeguenstigt_IV[t_i]==t_pcLeistung.m_miBeguenstigt){
							break;
						}
					}
					if(t_i==t_iAngehoerige_IV){
						t_aBeguenstigt_IV[t_iAngehoerige_IV]=t_pcLeistung.m_miBeguenstigt;
						t_iAngehoerige_IV+=1;
					}
				}
			}
			if(t_pcLeistung.m_meVersicherungsart==3){
				t_rATotalUVG+=t_pcElement.p_getNettoBetrag();
				if(t_pcElement.p_getNettoBetrag()>0.0){
					for(t_i=0;t_i<t_iAngehoerige_UVG;t_i=t_i+1){
						if(t_aBeguenstigt_UVG[t_i]==t_pcLeistung.m_miBeguenstigt){
							break;
						}
					}
					if(t_i==t_iAngehoerige_UVG){
						t_aBeguenstigt_UVG[t_iAngehoerige_UVG]=t_pcLeistung.m_miBeguenstigt;
						t_iAngehoerige_UVG+=1;
					}
				}
			}
		}
	}
	if(t_bUVGTaggeld && t_bIVTaggeld){
		var t_2=t_pcPeriode.m_maElemente.p_ObjectEnumerator();
		while(t_2.p_HasNext()){
			t_pcElement=t_2.p_NextObject();
			t_pcLeistung=t_pcElement.m_mpcLeistung;
			if(t_pcLeistung.m_mbKapital){
				continue;
			}
			if(t_pcLeistung.m_miBeguenstigt!=t_uPerson){
				continue;
			}
			if(t_pcLeistung.m_meVersicherungsart==3 && t_pcLeistung.m_meLeistungsart==40){
				t_pcElement.p_setGekuerzt(0.0,40);
			}
		}
	}
	if(t_bUVGTaggeld){
		if(t_rTotalEK>0.5){
			var t_3=t_pcPeriode.m_maElemente.p_ObjectEnumerator();
			while(t_3.p_HasNext()){
				t_pcElement=t_3.p_NextObject();
				t_pcLeistung=t_pcElement.m_mpcLeistung;
				if(t_pcLeistung.m_meVersicherungsart==3 && t_pcLeistung.m_meLeistungsart==40 && t_pcLeistung.m_miBeguenstigt==t_uPerson){
					t_pcElement.p_setGekuerzt(t_rTotalUVG-t_rTotalEK,41);
				}
			}
		}
		return;
	}
	var t_grund=0;
	if(t_bEU){
		if(this.m_mbErsteInv && t_rTotalUVG>0.0){
			this.m_miBeguenstigt_AHV=t_iAngehoerige_AHV;
			this.m_miBeguenstigt_IV=t_iAngehoerige_IV;
			this.m_miBeguenstigt_UVG=t_iAngehoerige_UVG;
			if(t_pcPeriode.m_mdBeginn.p_before(this.m_mdErlDatum[t_uPerson])){
				this.m_mrInvRente=bb_utils_round(0.9*t_pcPerson.m_mrUVGEinkommen)-t_rTotalAHV-t_rTotalIV-t_rTotalEK;
				if(bb_utils_round(this.m_mrInvRente)<=0.0){
					this.m_mrInvRente=0.0;
					t_grund=42;
				}else{
					if(bb_utils_round(t_rTotalUVG)>bb_utils_round(this.m_mrInvRente)){
						t_grund=43;
					}else{
						this.m_mrInvRente=t_rTotalUVG;
						t_grund=46;
					}
				}
			}
		}
		var t_4=t_pcPeriode.m_maElemente.p_ObjectEnumerator();
		while(t_4.p_HasNext()){
			t_pcElement=t_4.p_NextObject();
			t_pcLeistung=t_pcElement.m_mpcLeistung;
			if(t_pcLeistung.m_mbKapital){
				continue;
			}
			if(t_pcLeistung.m_mbBestand && t_pcLeistung.p_istTodesleistung()){
				continue;
			}
			if(t_pcLeistung.m_mbBestand && t_pcLeistung.p_istAltersleistung()){
				continue;
			}
			if(t_pcLeistung.m_meVersicherungsart==3 && t_pcLeistung.m_meLeistungsart==30 && t_pcLeistung.m_miBeguenstigt==t_uPerson && bb_utils_round(this.m_mrInvRente)>=0.0){
				t_pcElement.p_setGekuerzt(this.m_mrInvRente,t_grund);
			}
		}
		return;
	}
	this.m_mbErsteAng=true;
	t_grund=0;
	if(this.m_mbErsteAng && t_rATotalUVG>0.0){
		this.m_mbErsteAng=false;
		this.m_miBeguenstigt_AHV=t_iAngehoerige_AHV;
		this.m_miBeguenstigt_IV=t_iAngehoerige_IV;
		this.m_miBeguenstigt_UVG=t_iAngehoerige_UVG;
		this.m_mrAngRente=bb_utils_round(0.9*t_pcPerson.m_mrUVGEinkommen)-t_rATotalAHV-t_rATotalIV-t_rTotalEK;
		if(this.m_mrAngRente>t_rATotalUVG){
			this.m_mrAngRente=t_rATotalUVG;
		}else{
			t_grund=43;
		}
		if(this.m_mrAngRente<0.0){
			this.m_mrAngRente=0.0;
		}
	}
	if(t_rTotalUVG<1.0 && t_rATotalUVG<1.0){
		return;
	}
	t_rGrenze=bb_utils_round(0.7*t_pcPerson.m_mrUVGEinkommen);
	if(t_rGrenze<1.0){
		return;
	}
	if(this.m_mrAngRente>t_rGrenze){
		this.m_mrAngRente=t_rGrenze;
		if(t_grund==0){
			t_grund=44;
		}else{
			t_grund=45;
		}
	}
	if(t_rATotalUVG<=this.m_mrAngRente){
		return;
	}
	var t_rKuerzungKinder=0.0;
	var t_5=t_pcPeriode.m_maElemente.p_ObjectEnumerator();
	while(t_5.p_HasNext()){
		t_pcElement=t_5.p_NextObject();
		t_pcLeistung=t_pcElement.m_mpcLeistung;
		if(t_pcLeistung.m_mbKapital){
			continue;
		}
		if(t_pcLeistung.m_mbBestand && t_pcLeistung.p_istTodesleistung()){
			continue;
		}
		if(t_pcLeistung.m_miVersichert==t_uPerson && t_pcLeistung.m_meVersicherungsart==3 && (t_pcLeistung.m_meLeistungsart==52 || t_pcLeistung.m_meLeistungsart==53)){
			t_rBetrag=t_pcElement.p_getNettoBetrag();
			t_rBetrag*=1.0-this.m_mrAngRente/t_rATotalUVG;
			t_rBetrag=bb_utils_round(t_rBetrag);
			if(t_rBetrag>=t_pcElement.p_getNettoBetrag()){
				t_grund=42;
			}
			t_pcElement.p_addKuerzung(t_rBetrag,t_grund);
			t_rKuerzungKinder+=t_rBetrag;
		}
	}
	var t_6=t_pcPeriode.m_maElemente.p_ObjectEnumerator();
	while(t_6.p_HasNext()){
		t_pcElement=t_6.p_NextObject();
		t_pcLeistung=t_pcElement.m_mpcLeistung;
		if(t_pcLeistung.m_mbKapital){
			continue;
		}
		if(t_pcLeistung.m_mbBestand && t_pcLeistung.p_istTodesleistung()){
			continue;
		}
		if(t_pcLeistung.m_miVersichert==t_uPerson && t_pcLeistung.m_meVersicherungsart==3 && (t_pcLeistung.m_meLeistungsart==64 || t_pcLeistung.m_meLeistungsart==63 || t_pcLeistung.m_meLeistungsart==62)){
			t_rBetrag=t_rATotalUVG-this.m_mrAngRente-t_rKuerzungKinder;
			if(t_rBetrag>=t_pcElement.p_getNettoBetrag()){
				t_grund=42;
			}
			t_pcElement.p_addKuerzung(bb_utils_round(t_rBetrag),t_grund);
		}
	}
}
c_UVGKuerzung.prototype.p_kuerzeZusatz=function(t_pcPeriode,t_uPerson){
	var t_pcPerson=null;
	var t_pcLeistung=null;
	var t_pcRente=null;
	var t_pcElement=null;
	var t_rTotalAHV=0.0;
	var t_rTotalIV=0.0;
	var t_rTotalUVG=0.0;
	var t_rGrenze=.0;
	t_pcPerson=this.p_getPerson(t_uPerson);
	t_pcRente=null;
	var t_=t_pcPeriode.m_maElemente.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		t_pcElement=t_.p_NextObject();
		t_pcLeistung=t_pcElement.m_mpcLeistung;
		if(t_pcLeistung.p_istKapital()){
			continue;
		}
		if(t_pcLeistung.m_meVersicherungsart==1){
			t_rTotalAHV+=t_pcElement.p_getNettoBetrag();
		}
		if(t_pcLeistung.m_meVersicherungsart==2){
			t_rTotalIV+=t_pcElement.p_getNettoBetrag();
		}
		if(t_pcLeistung.m_meVersicherungsart==3){
			t_rTotalUVG+=t_pcElement.p_getNettoBetrag();
		}
		if(t_pcLeistung.m_meVersicherungsart==8 && t_pcLeistung.m_miVersichert==t_uPerson){
			t_pcRente=t_pcElement;
		}
	}
	if(t_pcRente!=null){
		t_rGrenze=bb_utils_round(t_pcPerson.m_mrUVGZGrenze*t_pcPerson.m_mrEinkommen/100.0)-t_rTotalAHV-t_rTotalIV-t_rTotalUVG;
		if(t_rGrenze<0.0){
			t_rGrenze=0.0;
		}
		if(t_pcRente.p_getNettoBetrag()>t_rGrenze){
			t_pcRente.p_setGekuerzt(t_rGrenze,0);
		}
	}
}
c_UVGKuerzung.prototype.p_berechneKuerzungen=function(){
	var t_pcPeriode=null;
	var t_i=0;
	var t_k=0;
	for(t_i=0;t_i<this.p_getNbPersonen();t_i=t_i+1){
		this.m_mbErsteInv=true;
		this.m_mbErsteAng=true;
		this.m_mrInvRente=-1.0;
		this.m_mrAngRente=-1.0;
		this.m_miBeguenstigt_AHV=0;
		this.m_miBeguenstigt_IV=0;
		this.m_miBeguenstigt_UVG=0;
		if(!this.m_mbUVGKuerzung[t_i]){
			continue;
		}
		var t_=this.m_mpcZeitachse.m_maPerioden.p_ObjectEnumerator();
		while(t_.p_HasNext()){
			t_pcPeriode=t_.p_NextObject();
			this.p_kuerze(t_pcPeriode,t_i);
		}
	}
	for(t_i=0;t_i<this.p_getNbPersonen();t_i=t_i+1){
		if(!this.m_mbUVGKuerzung[t_i]){
			continue;
		}
		for(t_k=0;t_k<3;t_k=t_k+1){
			if(t_k==0){
				this.m_mrInvGrenze[t_k]=bb_utils_round(this.p_getPerson(t_i).m_mrUVGZGrenze*this.p_getPerson(t_i).m_mrEinkommen/100.0);
				this.m_mrTodGrenze[t_k]=bb_utils_round(this.p_getPerson(t_i).m_mrUVGZGrenze*this.p_getPerson(t_i).m_mrEinkommen/100.0);
			}else{
				this.m_mrInvGrenze[t_k]=0.0;
				this.m_mrTodGrenze[t_k]=0.0;
			}
		}
		var t_2=this.m_mpcZeitachse.m_maPerioden.p_ObjectEnumerator();
		while(t_2.p_HasNext()){
			t_pcPeriode=t_2.p_NextObject();
			this.p_kuerzeZusatz(t_pcPeriode,t_i);
		}
	}
}
function c_BVGLeistung(){
	c_Umfeld.call(this);
	this.m_mitWitwenrente=new_bool_array(2);
	this.m_mbSubsidiaer=false;
	this.implments={c_Loggable:1};
}
c_BVGLeistung.prototype=extend_class(c_Umfeld);
c_BVGLeistung.m_new=function(t_umfeld){
	c_Umfeld.m_new2.call(this,t_umfeld);
	return this;
}
c_BVGLeistung.m_new2=function(){
	c_Umfeld.m_new3.call(this);
	return this;
}
c_BVGLeistung.prototype.p_erzeugeAltersrente2=function(t_uPerson){
	if(this.m_mdErlDatum[t_uPerson].p_notValid()){
		return;
	}
	if(this.m_mdInvDatum[t_uPerson].p_isValid() || this.m_mdTodDatum[t_uPerson].p_isValid()){
		return;
	}
	var t_pcLeistung=null;
	var t_dBeginn=c_Date.m_new.call(new c_Date);
	var t_dAblauf=c_Date.m_new.call(new c_Date);
	t_dBeginn.p_setDate3(this.m_mdErlDatum[t_uPerson]);
	if(this.m_mdTodDatum[t_uPerson].p_isUndefined()){
		t_dAblauf.p_setForever();
	}else{
		t_dAblauf.p_setBefore(this.m_mdTodDatum[t_uPerson]);
	}
	t_pcLeistung=c_Leistung.m_new2.call(new c_Leistung,4,10,t_uPerson,t_uPerson,this.p_getPerson(t_uPerson).m_mrBVGAltersrente,t_dBeginn,t_dAblauf,false);
	this.p_addLeistung2(t_pcLeistung);
}
c_BVGLeistung.prototype.p_erzeugeInvalidenrente=function(t_uPerson){
	if(this.m_mdInvDatum[t_uPerson].p_notValid()){
		return;
	}
	var t_pcLeistung=null;
	var t_dBeginn=c_Date.m_new.call(new c_Date);
	var t_dAblauf=c_Date.m_new.call(new c_Date);
	t_dBeginn.p_setDate3(this.m_mdInvDatum[t_uPerson]);
	t_dBeginn.p_addYears(this.m_miWartefrist);
	if(this.m_mdTodDatum[t_uPerson].p_isValid()){
		t_dAblauf.p_setBefore(this.m_mdTodDatum[t_uPerson]);
	}else{
		t_dAblauf.p_setForever();
	}
	var t_person=this.p_getPerson(t_uPerson);
	var t_rRente=0.0;
	var t_rVLohn=0.0;
	if(this.p_istLiechtenstein()){
		t_rVLohn=bb_bvg_werte_getVersichert(this.m_land,t_person.m_mrEinkommen,t_person.m_meBVGLohn);
		t_rRente=bb_utils_round(0.3*t_rVLohn);
	}else{
		t_rRente=t_person.m_mrBVGDeckungsrente;
	}
	t_pcLeistung=c_Leistung.m_new2.call(new c_Leistung,4,30,t_uPerson,t_uPerson,t_rRente,t_dBeginn,t_dAblauf,false);
	t_pcLeistung.m_mbSubsidiaer=this.m_mbSubsidiaer;
	this.p_addLeistung2(t_pcLeistung);
}
c_BVGLeistung.prototype.p_erzeugeKinderrenten=function(t_uPerson){
	if(this.m_mdErlDatum[t_uPerson].p_notValid()){
		return;
	}
	if(this.m_mdInvDatum[t_uPerson].p_isValid() || this.m_mdTodDatum[t_uPerson].p_isValid()){
		return;
	}
	var t_pcKind=null;
	var t_pcLeistung=null;
	var t_dBeginn=c_Date.m_new.call(new c_Date);
	var t_dAblauf=c_Date.m_new.call(new c_Date);
	var t_dKindAnfang=c_Date.m_new.call(new c_Date);
	var t_dKindEnde=c_Date.m_new.call(new c_Date);
	t_dBeginn.p_setDate3(this.m_mdErlDatum[t_uPerson]);
	if(this.m_mdTodDatum[t_uPerson].p_isUndefined()){
		t_dAblauf.p_setForever();
	}else{
		t_dAblauf.p_setBefore(this.m_mdTodDatum[t_uPerson]);
	}
	var t_=this.m_maKinder.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		t_pcKind=t_.p_NextObject();
		if(!t_pcKind.p_istKindVon(t_uPerson)){
			continue;
		}
		t_dKindAnfang.p_setDate3(t_dBeginn);
		t_dKindEnde.p_setDate3(t_dAblauf);
		if(!t_pcKind.p_getLeistungsfenster(t_dKindAnfang,t_dKindEnde,this.p_istLiechtenstein())){
			continue;
		}
		t_pcLeistung=c_Leistung.m_new2.call(new c_Leistung,4,50,t_uPerson,t_pcKind.m_miReferenz,bb_utils_round(0.2*this.p_getPerson(t_uPerson).m_mrBVGAltersrente),t_dKindAnfang,t_dKindEnde,false);
		this.p_addLeistung2(t_pcLeistung);
	}
}
c_BVGLeistung.prototype.p_erzeugeIVKinderrenten=function(t_uPerson){
	if(this.m_mdInvDatum[t_uPerson].p_notValid()){
		return;
	}
	var t_pcKind=null;
	var t_pcLeistung=null;
	var t_dBeginn=c_Date.m_new.call(new c_Date);
	var t_dAblauf=c_Date.m_new.call(new c_Date);
	var t_dKindAnfang=c_Date.m_new.call(new c_Date);
	var t_dKindEnde=c_Date.m_new.call(new c_Date);
	t_dBeginn.p_setDate3(this.m_mdInvDatum[t_uPerson]);
	t_dBeginn.p_addYears(this.m_miWartefrist);
	if(this.m_mdErlDatum[t_uPerson].p_isValid()){
		t_dAblauf.p_setBefore(this.m_mdErlDatum[t_uPerson]);
	}else{
		if(this.m_mdTodDatum[t_uPerson].p_isValid()){
			t_dAblauf.p_setBefore(this.m_mdTodDatum[t_uPerson]);
		}else{
			t_dAblauf.p_setForever();
		}
	}
	var t_person=this.p_getPerson(t_uPerson);
	var t_rRente=0.0;
	var t_rVLohn=0.0;
	if(this.p_istLiechtenstein()){
		t_rVLohn=bb_bvg_werte_getVersichert(this.m_land,t_person.m_mrEinkommen,t_person.m_meBVGLohn);
		t_rRente=bb_utils_round(0.06*t_rVLohn);
	}else{
		t_rRente=bb_utils_round(0.2*t_person.m_mrBVGDeckungsrente);
	}
	var t_=this.m_maKinder.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		t_pcKind=t_.p_NextObject();
		if(!t_pcKind.p_istKindVon(t_uPerson)){
			continue;
		}
		t_dKindAnfang.p_setDate3(t_dBeginn);
		t_dKindEnde.p_setDate3(t_dAblauf);
		if(!t_pcKind.p_getLeistungsfenster(t_dKindAnfang,t_dKindEnde,this.p_istLiechtenstein())){
			continue;
		}
		t_pcLeistung=c_Leistung.m_new2.call(new c_Leistung,4,31,t_uPerson,t_pcKind.m_miReferenz,t_rRente,t_dKindAnfang,t_dKindEnde,false);
		t_pcLeistung.m_mbSubsidiaer=this.m_mbSubsidiaer;
		this.p_addLeistung2(t_pcLeistung);
	}
}
c_BVGLeistung.prototype.p_erzeugeWaisenrenten=function(t_uPerson){
	if(this.m_mdTodDatum[t_uPerson].p_notValid()){
		return;
	}
	var t_pcKind=null;
	var t_pcLeistung=null;
	var t_dBeginn=c_Date.m_new.call(new c_Date);
	var t_dAblauf=c_Date.m_new.call(new c_Date);
	var t_person=this.p_getPerson(t_uPerson);
	var t_rRente=0.0;
	var t_rVLohn=0.0;
	if(this.p_istLiechtenstein()){
		t_rVLohn=bb_bvg_werte_getVersichert(this.m_land,t_person.m_mrEinkommen,t_person.m_meBVGLohn);
		t_rRente=bb_utils_round(0.06*t_rVLohn);
	}else{
		t_rRente=bb_utils_round(0.2*t_person.m_mrBVGDeckungsrente);
	}
	var t_=this.m_maKinder.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		t_pcKind=t_.p_NextObject();
		if(!t_pcKind.p_istKindVon(t_uPerson)){
			continue;
		}
		t_dBeginn.p_setDate3(this.m_mdTodDatum[t_uPerson]);
		t_dAblauf.p_setForever();
		if(!t_pcKind.p_getLeistungsfenster(t_dBeginn,t_dAblauf,false)){
			continue;
		}
		t_pcLeistung=c_Leistung.m_new2.call(new c_Leistung,4,51,t_uPerson,t_pcKind.m_miReferenz,t_rRente,t_dBeginn,t_dAblauf,false);
		t_pcLeistung.m_mbSubsidiaer=this.m_mbSubsidiaer;
		this.p_addLeistung2(t_pcLeistung);
	}
}
c_BVGLeistung.prototype.p_erzeugeWitwenrente2=function(t_uPerson){
	if(this.m_mdTodDatum[t_uPerson].p_notValid()){
		return;
	}
	if(!this.p_istGebunden() && !this.m_mbBVGExtra[t_uPerson]){
		return;
	}
	var t_uPartner=(t_uPerson+1) % 2;
	if(this.m_mdTodDatum[t_uPartner].p_isValid() && this.m_mdTodDatum[t_uPartner].p_beforeOrSame(this.m_mdTodDatum[t_uPerson])){
		return;
	}
	var t_pcKind=null;
	var t_pcLeistung=null;
	var t_dBeginn=c_Date.m_new.call(new c_Date);
	var t_dAblauf=c_Date.m_new.call(new c_Date);
	t_dBeginn.p_setDate3(this.m_mdTodDatum[t_uPerson]);
	if(this.m_mdTodDatum[t_uPartner].p_isValid()){
		t_dAblauf.p_setBefore(this.m_mdTodDatum[t_uPartner]);
	}else{
		t_dAblauf.p_setForever();
	}
	this.m_mitWitwenrente[t_uPerson]=false;
	if(this.m_mbBVGExtra[t_uPerson]){
		this.m_mitWitwenrente[t_uPerson]=true;
	}
	var t_dHeirat5=c_Date.m_new.call(new c_Date);
	t_dHeirat5.p_setDate3(this.p_getPerson(t_uPartner).m_mdZivildatum);
	t_dHeirat5.p_addYears(5);
	if(this.p_getPerson(t_uPartner).p_getGenauesAlter(t_dBeginn)>=45 && t_dHeirat5.p_beforeOrSame(t_dBeginn)){
		this.m_mitWitwenrente[t_uPerson]=true;
	}
	if(!this.m_mitWitwenrente[t_uPerson]){
		var t_=this.m_maKinder.p_ObjectEnumerator();
		while(t_.p_HasNext()){
			t_pcKind=t_.p_NextObject();
			if(t_pcKind.m_mdAusbildungsende25.p_after(t_dBeginn)){
				this.m_mitWitwenrente[t_uPerson]=true;
				break;
			}
		}
	}
	if(this.m_mitWitwenrente[t_uPerson]){
		var t_lart=64;
		if(this.p_getPerson(t_uPartner).p_istMann()){
			t_lart=63;
		}
		var t_person=this.p_getPerson(t_uPerson);
		var t_rRente=0.0;
		var t_rVLohn=0.0;
		if(this.p_istLiechtenstein()){
			t_rVLohn=bb_bvg_werte_getVersichert(this.m_land,t_person.m_mrEinkommen,t_person.m_meBVGLohn);
			t_rRente=bb_utils_round(0.18*t_rVLohn);
		}else{
			t_rRente=bb_utils_round(0.6*t_person.m_mrBVGDeckungsrente);
		}
		t_pcLeistung=c_Leistung.m_new2.call(new c_Leistung,4,t_lart,t_uPerson,t_uPartner,t_rRente,t_dBeginn,t_dAblauf,false);
		t_pcLeistung.m_mbSubsidiaer=this.m_mbSubsidiaer;
		this.p_addLeistung2(t_pcLeistung);
	}
}
c_BVGLeistung.prototype.p_erzeugeWitwenabfindung=function(t_uPerson){
	if(this.p_istLiechtenstein()){
		return;
	}
	if(this.m_mbTodUnfall[t_uPerson]){
		return;
	}
	if(this.m_mitWitwenrente[t_uPerson]){
		return;
	}
	if(this.m_mdTodDatum[t_uPerson].p_notValid()){
		return;
	}
	if(!this.p_istGebunden() && !this.m_mbBVGExtra[t_uPerson]){
		return;
	}
	var t_uPartner=0;
	var t_pcLeistung=null;
	var t_dBeginn=c_Date.m_new.call(new c_Date);
	var t_dAblauf=c_Date.m_new.call(new c_Date);
	t_uPartner=(t_uPerson+1) % 2;
	if(this.m_mdTodDatum[t_uPartner].p_isValid() && this.m_mdTodDatum[t_uPartner].p_beforeOrSame(this.m_mdTodDatum[t_uPerson])){
		return;
	}
	t_dBeginn.p_setDate3(this.m_mdTodDatum[t_uPerson]);
	if(this.m_mdTodDatum[t_uPartner].p_isValid()){
		t_dAblauf.p_setBefore(this.m_mdTodDatum[t_uPartner]);
	}else{
		t_dAblauf.p_setForever();
	}
	t_pcLeistung=c_Leistung.m_new2.call(new c_Leistung,4,65,t_uPerson,t_uPartner,bb_utils_round(1.7999999999999998*this.p_getPerson(t_uPerson).m_mrBVGDeckungsrente),t_dBeginn,t_dAblauf,false);
	t_pcLeistung.m_mbKapital=true;
	t_pcLeistung.m_mbSubsidiaer=this.m_mbSubsidiaer;
	this.p_addLeistung2(t_pcLeistung);
}
c_BVGLeistung.prototype.p_berechneLeistungen=function(){
	var t_i=0;
	this.m_mitWitwenrente[0]=false;
	this.m_mitWitwenrente[1]=false;
	this.m_mbSubsidiaer=false;
	for(t_i=0;t_i<this.p_getNbPersonen();t_i=t_i+1){
		if(!this.m_mbBVGLeistung[t_i]){
			continue;
		}
		this.m_mbSubsidiaer=this.m_mbInvUnfall[t_i] || this.m_mbTodUnfall[t_i];
		if(bb_utils_round(this.p_getPerson(t_i).m_mrBVGAltersrente)==0.0 && bb_utils_round(this.p_getPerson(t_i).m_mrBVGDeckungsrente)==0.0){
			continue;
		}
		this.p_erzeugeAltersrente2(t_i);
		this.p_erzeugeInvalidenrente(t_i);
		if(this.p_getNbKinder()>0){
			this.p_erzeugeKinderrenten(t_i);
			this.p_erzeugeIVKinderrenten(t_i);
			this.p_erzeugeWaisenrenten(t_i);
		}
		if(this.p_mitPartner()){
			this.p_erzeugeWitwenrente2(t_i);
			this.p_erzeugeWitwenabfindung(t_i);
		}
	}
}
function c_BVGKuerzung(){
	c_BVGLeistung.call(this);
	this.m_mrInvGrenze=new_number_array(3);
	this.m_mrTodGrenze=new_number_array(3);
	this.implments={c_Loggable:1};
}
c_BVGKuerzung.prototype=extend_class(c_BVGLeistung);
c_BVGKuerzung.m_new=function(t_umfeld){
	c_BVGLeistung.m_new.call(this,t_umfeld);
	return this;
}
c_BVGKuerzung.m_new2=function(){
	c_BVGLeistung.m_new2.call(this);
	return this;
}
c_BVGKuerzung.prototype.p_getRente=function(t_liste,t_erwerb){
	var t_pcRente=null;
	var t_=t_liste.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		t_pcRente=t_.p_NextObject();
		if(t_pcRente.m_miErwerb==t_erwerb){
			return t_pcRente;
		}
	}
	return null;
}
c_BVGKuerzung.prototype.p_kuerze2=function(t_pcPeriode,t_uPerson,t_eVart){
	var t_pcLeistung=null;
	var t_pcElement=null;
	var t_pcRente=null;
	var t_aERente=null;
	var t_aKRente=null;
	var t_aBRente=null;
	var t_rTotalAHV=.0;
	var t_rTotalIV=.0;
	var t_rTotalUVG=.0;
	var t_rTotalBVG=new_number_array(3);
	var t_rGrenze=.0;
	var t_rRente=.0;
	var t_rVorher=.0;
	var t_rKuerzung=.0;
	var t_rAnteil=.0;
	var t_rVerteilen=.0;
	var t_rGekuerzt=.0;
	var t_bTod=false;
	var t_bErl=false;
	var t_i=0;
	if(this.m_mdInvDatum[t_uPerson].p_notValid() && this.m_mdTodDatum[t_uPerson].p_notValid()){
		return;
	}
	t_bErl=this.m_mdInvDatum[t_uPerson].p_isValid() && this.m_mdErlDatum[t_uPerson].p_isValid() && this.m_mdErlDatum[t_uPerson].p_beforeOrSame(t_pcPeriode.m_mdBeginn);
	if(t_eVart==9 && t_bErl){
		return;
	}
	t_rTotalAHV=0.0;
	t_rTotalIV=0.0;
	t_rTotalUVG=0.0;
	for(t_i=0;t_i<3;t_i=t_i+1){
		t_rTotalBVG[t_i]=0.0;
	}
	t_aERente=c_VElement.m_new.call(new c_VElement);
	t_aKRente=c_VElement.m_new.call(new c_VElement);
	t_aBRente=c_VElement.m_new.call(new c_VElement);
	var t_=t_pcPeriode.m_maElemente.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		t_pcElement=t_.p_NextObject();
		t_pcLeistung=t_pcElement.m_mpcLeistung;
		if(t_pcLeistung.m_mbKapital){
			continue;
		}
		if(t_pcLeistung.m_miVersichert!=t_uPerson){
			continue;
		}
		if(t_pcLeistung.m_mbBestand && t_pcLeistung.p_istTodesleistung()){
			continue;
		}
		if(t_pcLeistung.m_meVersicherungsart==t_eVart){
			t_pcElement.m_miErwerb=t_pcLeistung.m_miErwerb;
			if(t_pcLeistung.p_istKinderrente()){
				t_aKRente.p_add11(t_pcElement);
			}else{
				if(t_pcLeistung.m_meLeistungsart==32){
					t_aBRente.p_add11(t_pcElement);
				}else{
					t_aERente.p_add11(t_pcElement);
				}
			}
		}else{
			if(t_pcLeistung.m_meVersicherungsart==1){
				t_rTotalAHV+=t_pcElement.p_getNettoBetrag();
			}else{
				if(t_pcLeistung.m_meVersicherungsart==2){
					t_rTotalIV+=t_pcElement.p_getNettoBetrag();
				}else{
					if(t_pcLeistung.m_meVersicherungsart==3 || t_pcLeistung.m_meVersicherungsart==8){
						t_rTotalUVG+=t_pcElement.p_getNettoBetrag();
					}else{
						if(t_pcLeistung.m_meVersicherungsart==4){
							t_i=t_pcLeistung.m_miErwerb;
							t_rTotalBVG[t_i]+=t_pcElement.p_getNettoBetrag();
						}
					}
				}
			}
		}
	}
	t_bTod=this.m_mdInvDatum[t_uPerson].p_notValid() || this.m_mdTodDatum[t_uPerson].p_isValid() && this.m_mdTodDatum[t_uPerson].p_beforeOrSame(t_pcPeriode.m_mdBeginn);
	var t_bSubsid=t_eVart==4 && (this.m_mbInvUnfall[t_uPerson] || this.m_mbTodUnfall[t_uPerson]);
	var t_bGeneriert=false;
	var t_grund=0;
	for(t_i=0;t_i<3;t_i=t_i+1){
		t_rRente=0.0;
		t_bGeneriert=false;
		t_pcRente=this.p_getRente(t_aERente,t_i);
		if(t_pcRente!=null){
			t_rRente=t_pcRente.p_getNettoBetrag();
			t_bGeneriert=t_pcRente.m_mpcLeistung.m_mbSubsidiaer;
		}
		t_pcRente=this.p_getRente(t_aBRente,t_i);
		if(t_pcRente!=null){
			t_rRente=t_pcRente.p_getNettoBetrag();
		}
		var t_2=t_aKRente.p_ObjectEnumerator();
		while(t_2.p_HasNext()){
			t_pcRente=t_2.p_NextObject();
			if(t_pcRente.m_miErwerb==t_i){
				t_rRente+=t_pcRente.p_getNettoBetrag();
				if(t_pcRente.m_mpcLeistung.m_mbSubsidiaer){
					t_bGeneriert=true;
				}
			}
		}
		if(t_bGeneriert && t_bSubsid && t_i>0){
			break;
		}
		if(t_rRente<1.0){
			continue;
		}
		t_rVorher=t_rRente;
		if(t_i>0){
			t_rTotalAHV=0.0;
			t_rTotalIV=0.0;
			t_rTotalUVG=0.0;
		}
		if(t_bSubsid && t_bGeneriert){
			t_rGrenze=bb_utils_round(0.9*this.p_getPerson(t_uPerson).m_mrEinkommen);
		}else{
			if(t_bTod){
				t_rGrenze=this.m_mrTodGrenze[t_i];
			}else{
				t_rGrenze=this.m_mrInvGrenze[t_i];
			}
		}
		if(t_eVart==4 || t_bErl){
			t_rGrenze-=t_rTotalAHV+t_rTotalIV+t_rTotalUVG;
		}else{
			t_rGrenze-=t_rTotalAHV+t_rTotalIV+t_rTotalUVG+t_rTotalBVG[t_i];
		}
		if(t_rGrenze<5.0){
			t_rGrenze=0.0;
		}
		if(t_rVorher<=t_rGrenze){
			continue;
		}
		if(t_rGrenze==0.0){
			t_grund=51;
		}else{
			t_grund=50;
		}
		if(t_aBRente.p_size()==0 && t_aKRente.p_size()==0){
			t_pcRente=this.p_getRente(t_aERente,t_i);
			if(t_pcRente!=null){
				t_pcRente.p_setKuerzung(bb_utils_round(t_rVorher-t_rGrenze),t_grund);
			}
		}else{
			if(t_aERente.p_size()==0 && t_aKRente.p_size()==0){
				t_pcRente=this.p_getRente(t_aBRente,t_i);
				if(t_pcRente!=null){
					t_pcRente.p_setKuerzung(bb_utils_round(t_rVorher-t_rGrenze),t_grund);
				}
			}else{
				t_rVerteilen=bb_utils_round(t_rVorher-t_rGrenze);
				t_pcRente=this.p_getRente(t_aBRente,t_i);
				if(t_pcRente!=null){
					if(t_pcRente.p_getNettoBetrag()>=t_rVerteilen){
						t_pcRente.p_setKuerzung(t_rVerteilen,t_grund);
						t_rVerteilen=0.0;
					}else{
						t_rVerteilen-=t_pcRente.p_getNettoBetrag();
						t_rVorher-=t_pcRente.p_getNettoBetrag();
						t_pcRente.p_setGekuerzt(0.0,t_grund);
					}
				}
				if(t_rVerteilen>0.0){
					t_rGekuerzt=0.0;
					var t_3=t_aKRente.p_ObjectEnumerator();
					while(t_3.p_HasNext()){
						t_pcRente=t_3.p_NextObject();
						if(t_pcRente.m_miErwerb!=t_i){
							continue;
						}
						t_rAnteil=t_pcRente.p_getNettoBetrag()/t_rVorher;
						t_rKuerzung=bb_utils_round(t_rAnteil*t_rVerteilen);
						t_rGekuerzt+=t_rKuerzung;
						t_pcRente.p_setKuerzung(t_rKuerzung,t_grund);
					}
					t_rVerteilen-=t_rGekuerzt;
					if(t_rVerteilen>0.0){
						t_pcRente=this.p_getRente(t_aERente,t_i);
						if(t_pcRente!=null){
							t_pcRente.p_setKuerzung(t_rVerteilen,t_grund);
						}
					}
				}
			}
		}
	}
}
c_BVGKuerzung.prototype.p_berechneKuerzungen=function(){
	var t_pcPeriode=null;
	var t_i=0;
	var t_j=0;
	var t_k=0;
	var t_p=0;
	for(t_i=0;t_i<this.p_getNbPersonen();t_i=t_i+1){
		if(!this.m_mbBVGKuerzung[t_i]){
			continue;
		}
		for(t_j=0;t_j<2;t_j=t_j+1){
			for(t_k=0;t_k<3;t_k=t_k+1){
				if(t_j==0){
					if(t_k==0){
						this.m_mrInvGrenze[t_k]=bb_utils_round(this.p_getPerson(t_i).m_mrBVGGrenze*this.p_getPerson(t_i).m_mrEinkommen/100.0);
						this.m_mrTodGrenze[t_k]=bb_utils_round(this.p_getPerson(t_i).m_mrBVGGrenze*this.p_getPerson(t_i).m_mrEinkommen/100.0);
					}else{
						this.m_mrInvGrenze[t_k]=0.0;
						this.m_mrTodGrenze[t_k]=0.0;
					}
				}else{
					if(t_k==0){
						this.m_mrInvGrenze[t_k]=bb_utils_round(this.p_getPerson(t_i).m_mrKaderGrenze*this.p_getPerson(t_i).m_mrEinkommen/100.0);
						this.m_mrTodGrenze[t_k]=bb_utils_round(this.p_getPerson(t_i).m_mrKaderGrenze*this.p_getPerson(t_i).m_mrEinkommen/100.0);
					}else{
						this.m_mrInvGrenze[t_k]=0.0;
						this.m_mrTodGrenze[t_k]=0.0;
					}
				}
			}
			var t_=this.m_mpcZeitachse.m_maPerioden.p_ObjectEnumerator();
			while(t_.p_HasNext()){
				t_pcPeriode=t_.p_NextObject();
				if(t_j==0){
					this.p_kuerze2(t_pcPeriode,t_i,4);
				}else{
					this.p_kuerze2(t_pcPeriode,t_i,9);
				}
			}
		}
	}
}
function bb_ahv_werte_getIVRentenanspruchVor25(t_land){
	return 133.33333333333334;
}
function c_Enumerator5(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator5.m_new=function(t_list){
	this.m__list=t_list;
	this.m__curr=t_list.m__head.m__succ;
	return this;
}
c_Enumerator5.m_new2=function(){
	return this;
}
c_Enumerator5.prototype.p_HasNext=function(){
	while(this.m__curr.m__succ.m__pred!=this.m__curr){
		this.m__curr=this.m__curr.m__succ;
	}
	return this.m__curr!=this.m__list.m__head;
}
c_Enumerator5.prototype.p_NextObject=function(){
	var t_data=this.m__curr.m__data;
	this.m__curr=this.m__curr.m__succ;
	return t_data;
}
function bb_bvg_werte_getVersichert(t_land,t_rEinkommen,t_eGrenze){
	var t_rAbzug=bb_bvg_werte_getKoordinationsabzug(t_land,t_land.m_forYear);
	var t_rMinLohn=bb_bvg_werte_getMinVersicherbar(t_land,t_land.m_forYear);
	var t_rMinVers=bb_bvg_werte_getMinVersichert(t_land,t_land.m_forYear);
	var t_rMaxAHV=bb_bvg_werte_getMaxVersichert(t_land,t_land.m_forYear);
	var t_rMaxUVG=bb_uvg_werte_getMaxUVGLohn(t_land);
	if(t_rEinkommen<=t_rMinLohn){
		return 0.0;
	}
	if(t_eGrenze==1 && t_rEinkommen>t_rMaxAHV){
		t_rEinkommen=t_rMaxAHV;
	}
	if(t_eGrenze==2 && t_rEinkommen>t_rMaxUVG){
		t_rEinkommen=t_rMaxUVG;
	}
	t_rEinkommen-=t_rAbzug;
	if(t_rEinkommen<t_rMinVers){
		t_rEinkommen=t_rMinVers;
	}
	return t_rEinkommen;
}
function c_Enumerator6(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator6.m_new=function(t_list){
	this.m__list=t_list;
	this.m__curr=t_list.m__head.m__succ;
	return this;
}
c_Enumerator6.m_new2=function(){
	return this;
}
c_Enumerator6.prototype.p_HasNext=function(){
	while(this.m__curr.m__succ.m__pred!=this.m__curr){
		this.m__curr=this.m__curr.m__succ;
	}
	return this.m__curr!=this.m__list.m__head;
}
c_Enumerator6.prototype.p_NextObject=function(){
	var t_data=this.m__curr.m__data;
	this.m__curr=this.m__curr.m__succ;
	return t_data;
}
function c_List8(){
	Object.call(this);
	this.m__head=(c_HeadNode8.m_new.call(new c_HeadNode8));
}
c_List8.m_new=function(){
	return this;
}
c_List8.prototype.p_AddLast8=function(t_data){
	return c_Node13.m_new.call(new c_Node13,this.m__head,this.m__head.m__pred,t_data);
}
c_List8.m_new2=function(t_data){
	var t_=t_data;
	var t_2=0;
	while(t_2<t_.length){
		var t_t=t_[t_2];
		t_2=t_2+1;
		this.p_AddLast8(t_t);
	}
	return this;
}
c_List8.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator8.m_new.call(new c_Enumerator8,this);
}
c_List8.prototype.p_Count=function(){
	var t_n=0;
	var t_node=this.m__head.m__succ;
	while(t_node!=this.m__head){
		t_node=t_node.m__succ;
		t_n+=1;
	}
	return t_n;
}
function c_Vector8(){
	c_List8.call(this);
	this.m_updated=false;
	this.m_items=[];
}
c_Vector8.prototype=extend_class(c_List8);
c_Vector8.m_new=function(){
	c_List8.m_new.call(this);
	this.m_updated=false;
	return this;
}
c_Vector8.prototype.p_add11=function(t_elt){
	this.p_AddLast8(t_elt);
	this.m_updated=false;
}
c_Vector8.prototype.p_size=function(){
	if(this.m_updated){
		return this.m_items.length;
	}else{
		return this.p_Count();
	}
}
function c_VElement(){
	c_Vector8.call(this);
	this.implments={c_Loggable:1};
}
c_VElement.prototype=extend_class(c_Vector8);
c_VElement.m_new=function(){
	c_Vector8.m_new.call(this);
	return this;
}
function c_Node13(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node13.m_new=function(t_succ,t_pred,t_data){
	this.m__succ=t_succ;
	this.m__pred=t_pred;
	this.m__succ.m__pred=this;
	this.m__pred.m__succ=this;
	this.m__data=t_data;
	return this;
}
c_Node13.m_new2=function(){
	return this;
}
function c_HeadNode8(){
	c_Node13.call(this);
}
c_HeadNode8.prototype=extend_class(c_Node13);
c_HeadNode8.m_new=function(){
	c_Node13.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
	return this;
}
function c_Enumerator7(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator7.m_new=function(t_list){
	this.m__list=t_list;
	this.m__curr=t_list.m__head.m__succ;
	return this;
}
c_Enumerator7.m_new2=function(){
	return this;
}
c_Enumerator7.prototype.p_HasNext=function(){
	while(this.m__curr.m__succ.m__pred!=this.m__curr){
		this.m__curr=this.m__curr.m__succ;
	}
	return this.m__curr!=this.m__list.m__head;
}
c_Enumerator7.prototype.p_NextObject=function(){
	var t_data=this.m__curr.m__data;
	this.m__curr=this.m__curr.m__succ;
	return t_data;
}
function c_Grund(){
	Object.call(this);
	this.m_mrDelta=.0;
	this.m_miType=0;
	this.m_miFnTyp=0;
	this.m_msText="";
	this.implments={c_Loggable:1};
}
c_Grund.m_new=function(t_d,t_t,t_f){
	this.m_mrDelta=t_d;
	this.m_miType=t_t;
	this.m_miFnTyp=t_f;
	var t_1=this.m_miType;
	if(t_1==10){
		this.m_msText="Ersetzt durch gesplittete Rente";
	}else{
		if(t_1==11){
			this.m_msText="Zusammentreffen von AHV und IV Renten";
		}else{
			if(t_1==12){
				this.m_msText="Ehepaar-Rente ist max 150%";
			}else{
				if(t_1==13){
					this.m_msText="Summe der Kinderrenten ist max. 60%";
				}else{
					if(t_1==15){
						this.m_msText="Variable Plafonierung Kinderrenten (AHVV Art. 54bis)";
					}else{
						if(t_1==16){
							this.m_msText="Variable Plafonierung Kinderrenten mit Bestand (AHVV Art. 54bis)";
						}else{
							if(t_1==17){
								this.m_msText="Vorbezug: Kuerzung waehrend Vorbezugszeit";
							}else{
								if(t_1==18){
									this.m_msText="Vorbezug: Kuerzung nach ordentlicher Pension";
								}else{
									if(t_1==19){
										this.m_msText="Aufschub: Kuerzung waehrend Aufschubszeit";
									}else{
										if(t_1==20){
											this.m_msText="Aufschub: Zuschlag nach Pension";
										}else{
											if(t_1==21){
												this.m_msText="Vorbezug aus Bestand: Kuerzung, nach Splitting";
											}else{
												if(t_1==22){
													this.m_msText="Aufschub aus Bestand: Zuschlag, nach Splitting";
												}else{
													if(t_1==23){
														this.m_msText="Rentenanpassung wegen Splitting nach Wartefirst EU Partner";
													}else{
														if(t_1==30){
															this.m_msText="Summe der Kinderrenten ist max. 40%";
														}else{
															if(t_1==31){
																this.m_msText="Vorbezug: Keine Kuerzung in Vorbezugszseit";
															}else{
																if(t_1==32){
																	this.m_msText="Zuschlag Weihnachtsgeld (13. Monatsrente)";
																}else{
																	if(t_1==40){
																		this.m_msText="UVG: IV Taggelder werden schon bezahlt";
																	}else{
																		if(t_1==41){
																			this.m_msText="UVG: Eine Rente existiert schon";
																		}else{
																			if(t_1==42){
																				this.m_msText="UVG: AHV und IV Renten sind bereits ueber 90% UVG Lohn";
																			}else{
																				if(t_1==43){
																					this.m_msText="UVG: Komplementaerrente bis 90% UVG Lohn";
																				}else{
																					if(t_1==44){
																						this.m_msText="UVG: Summe der Renten ueber 70% UVG Lohn";
																					}else{
																						if(t_1==45){
																							this.m_msText="UVG: Komplementaerrente bis 90% und Renten ueber 70% UVG Lohn";
																						}else{
																							if(t_1==46){
																								this.m_msText="UVG: Keine Kuerzung noetig";
																							}else{
																								if(t_1==50){
																									this.m_msText="BVG: Komplementaerrente bis x% vom BVG Lohn";
																								}else{
																									if(t_1==51){
																										this.m_msText="BVG: Andere Renten sind bereits ueber x% vom BVG Lohn";
																									}else{
																										if(t_1==52){
																											this.m_msText="BVG: Subsidiaerleistung sind komplementaer zu UVGZ";
																										}else{
																											if(t_1==53){
																												this.m_msText="BVG: Subsidiaerleistung werden nicht gebraucht da UVGZ ueber 90% Lohn";
																											}else{
																												if(t_1==60){
																													this.m_msText="UVGZ: Komplementaerrente bis x% vom Lohn";
																												}else{
																													if(t_1==61){
																														this.m_msText="UVGZ: Andere Renten sind bereits ueber x% vom Lohn";
																													}else{
																														if(t_1==62){
																															this.m_msText="UVGZ: Keine Kuerzung noetig";
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	return this;
}
c_Grund.m_new2=function(){
	return this;
}
function c_List9(){
	Object.call(this);
	this.m__head=(c_HeadNode9.m_new.call(new c_HeadNode9));
}
c_List9.m_new=function(){
	return this;
}
c_List9.prototype.p_AddLast9=function(t_data){
	return c_Node14.m_new.call(new c_Node14,this.m__head,this.m__head.m__pred,t_data);
}
c_List9.m_new2=function(t_data){
	var t_=t_data;
	var t_2=0;
	while(t_2<t_.length){
		var t_t=t_[t_2];
		t_2=t_2+1;
		this.p_AddLast9(t_t);
	}
	return this;
}
c_List9.prototype.p_ObjectEnumerator=function(){
	return c_Enumerator9.m_new.call(new c_Enumerator9,this);
}
function c_Vector9(){
	c_List9.call(this);
	this.m_updated=false;
}
c_Vector9.prototype=extend_class(c_List9);
c_Vector9.m_new=function(){
	c_List9.m_new.call(this);
	this.m_updated=false;
	return this;
}
c_Vector9.prototype.p_add12=function(t_elt){
	this.p_AddLast9(t_elt);
	this.m_updated=false;
}
function c_VGrund(){
	c_Vector9.call(this);
	this.implments={c_Loggable:1};
}
c_VGrund.prototype=extend_class(c_Vector9);
c_VGrund.m_new=function(){
	c_Vector9.m_new.call(this);
	return this;
}
function c_Node14(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node14.m_new=function(t_succ,t_pred,t_data){
	this.m__succ=t_succ;
	this.m__pred=t_pred;
	this.m__succ.m__pred=this;
	this.m__pred.m__succ=this;
	this.m__data=t_data;
	return this;
}
c_Node14.m_new2=function(){
	return this;
}
function c_HeadNode9(){
	c_Node14.call(this);
}
c_HeadNode9.prototype=extend_class(c_Node14);
c_HeadNode9.m_new=function(){
	c_Node14.m_new2.call(this);
	this.m__succ=(this);
	this.m__pred=(this);
	return this;
}
function c_Enumerator8(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator8.m_new=function(t_list){
	this.m__list=t_list;
	this.m__curr=t_list.m__head.m__succ;
	return this;
}
c_Enumerator8.m_new2=function(){
	return this;
}
c_Enumerator8.prototype.p_HasNext=function(){
	while(this.m__curr.m__succ.m__pred!=this.m__curr){
		this.m__curr=this.m__curr.m__succ;
	}
	return this.m__curr!=this.m__list.m__head;
}
c_Enumerator8.prototype.p_NextObject=function(){
	var t_data=this.m__curr.m__data;
	this.m__curr=this.m__curr.m__succ;
	return t_data;
}
function bb_ahv_werte_getMinPensionsalter(t_land,t_geschlecht,t_jahrgang){
	var t_frau=t_geschlecht==2;
	if(t_land.p_liechtenstein()){
		return 60;
	}else{
		if(t_frau){
			return 62;
		}else{
			if(t_jahrgang<1933){
				return 65;
			}else{
				if(t_jahrgang<1938){
					return 64;
				}else{
					return 63;
				}
			}
		}
	}
}
function bb_ahv_werte_getMaxPensionsalter(t_land,t_geschlecht,t_jahrgang){
	var t_mann=t_geschlecht==1;
	if(t_land.p_liechtenstein()){
		return 70;
	}else{
		if(t_mann){
			return 70;
		}else{
			if(t_jahrgang>=1942){
				return 69;
			}else{
				if(t_jahrgang>=1939){
					return 68;
				}else{
					return 67;
				}
			}
		}
	}
}
function bb_ahv_werte_getVorbezugsatzCH(t_dPension,t_dOrdentlich,t_iJahrgang){
	var t_rSatz=0.068;
	var t_iJahre=t_dOrdentlich.p_getYear()-t_dPension.p_getYear();
	t_rSatz=t_rSatz*(t_iJahre);
	return t_rSatz;
}
function bb_ahv_werte_getVorbezugsatzLI(t_dPension,t_dOrdentlich,t_iJahrgang){
	var t_r1Jahr=3.0;
	var t_r2Jahre=7.0;
	var t_r3Jahre=11.5;
	var t_r4Jahre=16.5;
	var t_r5Jahre=0.0;
	if(t_iJahrgang==1956 || t_iJahrgang==1957){
		t_r1Jahr=5.5;
		t_r2Jahre=10.6;
		t_r3Jahre=15.2;
		t_r4Jahre=19.5;
		t_r5Jahre=0.0;
	}
	if(t_iJahrgang>=1958){
		t_r1Jahr=5.0;
		t_r2Jahre=9.7;
		t_r3Jahre=14.0;
		t_r4Jahre=18.0;
		t_r5Jahre=21.8;
	}
	var t_iMonateO=0;
	var t_iMonateP=0;
	var t_iMonate=0;
	t_iMonateO=t_dOrdentlich.p_getMonth()+12*t_dOrdentlich.p_getYear();
	t_iMonateP=t_dPension.p_getMonth()+12*t_dPension.p_getYear();
	t_iMonate=t_iMonateO-t_iMonateP;
	if(t_iMonate<=0){
		return 0.0;
	}else{
		if(t_iMonate>=1 && t_iMonate<=12){
			return bb_utils_trunc2((t_iMonate)*t_r1Jahr/12.0,0.01)/100.0;
		}else{
			if(t_iMonate>=13 && t_iMonate<=24){
				return bb_utils_trunc2(t_r1Jahr+(t_iMonate-12)*(t_r2Jahre-t_r1Jahr)/12.0,0.01)/100.0;
			}else{
				if(t_iMonate>=25 && t_iMonate<=36){
					return bb_utils_trunc2(t_r2Jahre+(t_iMonate-24)*(t_r3Jahre-t_r2Jahre)/12.0,0.01)/100.0;
				}else{
					if(t_iMonate>=37 && t_iMonate<=48){
						return bb_utils_trunc2(t_r3Jahre+(t_iMonate-36)*(t_r4Jahre-t_r3Jahre)/12.0,0.01)/100.0;
					}else{
						if(t_iMonate>=49 && t_iMonate<=60){
							return bb_utils_trunc2(t_r4Jahre+(t_iMonate-48)*(t_r5Jahre-t_r4Jahre)/12.0,0.01)/100.0;
						}
					}
				}
			}
		}
	}
	return 0.0;
}
function bb_ahv_werte_getVorbezugsatz(t_land,t_dPension,t_dOrdentlich,t_iJahrgang){
	if(t_land.p_schweiz()){
		return bb_ahv_werte_getVorbezugsatzCH(t_dPension,t_dOrdentlich,t_iJahrgang);
	}else{
		return bb_ahv_werte_getVorbezugsatzLI(t_dPension,t_dOrdentlich,t_iJahrgang);
	}
}
function bb_ahv_werte_getAufschubsatzCH(t_dPension,t_dOrdentlich,t_iJahrgang){
	var t_iJahre=0;
	var t_iMonate=0;
	var t_rSatz=.0;
	t_iJahre=t_dPension.p_getYear()-t_dOrdentlich.p_getYear();
	if(t_dPension.p_getMonth()<t_dOrdentlich.p_getMonth()){
		t_iJahre-=1;
		t_iMonate=t_dPension.p_getMonth()+12-t_dOrdentlich.p_getMonth();
	}else{
		t_iMonate=t_dPension.p_getMonth()-t_dOrdentlich.p_getMonth();
	}
	var t_1=t_iJahre;
	if(t_1==1){
		if(t_iMonate<3){
			t_rSatz=5.2;
		}else{
			if(t_iMonate<6){
				t_rSatz=6.6;
			}else{
				if(t_iMonate<9){
					t_rSatz=8.0;
				}else{
					t_rSatz=9.4;
				}
			}
		}
	}else{
		if(t_1==2){
			if(t_iMonate<3){
				t_rSatz=10.8;
			}else{
				if(t_iMonate<6){
					t_rSatz=12.3;
				}else{
					if(t_iMonate<9){
						t_rSatz=13.9;
					}else{
						t_rSatz=15.5;
					}
				}
			}
		}else{
			if(t_1==3){
				if(t_iMonate<3){
					t_rSatz=17.1;
				}else{
					if(t_iMonate<6){
						t_rSatz=18.8;
					}else{
						if(t_iMonate<9){
							t_rSatz=20.5;
						}else{
							t_rSatz=22.2;
						}
					}
				}
			}else{
				if(t_1==4){
					if(t_iMonate<3){
						t_rSatz=24.0;
					}else{
						if(t_iMonate<6){
							t_rSatz=25.8;
						}else{
							if(t_iMonate<9){
								t_rSatz=27.7;
							}else{
								t_rSatz=29.6;
							}
						}
					}
				}else{
					if(t_1==5){
						t_rSatz=31.5;
					}else{
						t_rSatz=0.0;
					}
				}
			}
		}
	}
	return t_rSatz/100.0;
}
function bb_ahv_werte_getAufschubsatzLI_nach1958(t_dPension,t_dOrdentlich){
	var t_r1Jahr=4.5;
	var t_r2Jahre=9.3;
	var t_r3Jahre=14.4;
	var t_r4Jahre=20.1;
	var t_r5Jahre=26.1;
	var t_iMonateO=0;
	var t_iMonateP=0;
	var t_iMonate=0;
	t_iMonateO=t_dOrdentlich.p_getMonth()+12*t_dOrdentlich.p_getYear();
	t_iMonateP=t_dPension.p_getMonth()+12*t_dPension.p_getYear();
	t_iMonate=t_iMonateP-t_iMonateO;
	if(t_iMonate<12){
		return 0.0;
	}
	if(t_iMonate==12){
		return t_r1Jahr/100.0;
	}
	if(t_iMonate==24){
		return t_r2Jahre/100.0;
	}
	if(t_iMonate==36){
		return t_r3Jahre/100.0;
	}
	if(t_iMonate==48){
		return t_r4Jahre/100.0;
	}
	if(t_iMonate==60){
		return t_r5Jahre/100.0;
	}
	if(t_iMonate>12 && t_iMonate<24){
		return bb_utils_trunc2(t_r1Jahr+(t_iMonate-12)*(t_r2Jahre-t_r1Jahr)/12.0,0.01)/100.0;
	}else{
		if(t_iMonate>24 && t_iMonate<36){
			return bb_utils_trunc2(t_r2Jahre+(t_iMonate-24)*(t_r3Jahre-t_r2Jahre)/12.0,0.01)/100.0;
		}else{
			if(t_iMonate>36 && t_iMonate<48){
				return bb_utils_trunc2(t_r3Jahre+(t_iMonate-36)*(t_r4Jahre-t_r3Jahre)/12.0,0.01)/100.0;
			}else{
				if(t_iMonate>48 && t_iMonate<60){
					return bb_utils_trunc2(t_r4Jahre+(t_iMonate-48)*(t_r5Jahre-t_r4Jahre)/12.0,0.01)/100.0;
				}
			}
		}
	}
	return 0.0;
}
function bb_ahv_werte_getAufschubsatzLI_vor1958(t_dPension,t_dOrdentlich){
	var t_rSatzFL=[5.22,5.70,6.18,6.65,7.13,7.61,8.09,8.57,9.04,9.52,10.00,10.48,10.95,11.48,12.01,12.53,13.06,13.59,14.12,14.64,15.17,15.70,16.22,16.75,17.28,17.86,18.44,19.03,19.61,20.19,20.77,21.36,21.94,22.52,23.11,23.69,24.27,24.92,25.57,26.21,26.86,27.51,28.16,28.81,29.45,30.10,30.75,31.40,32.04,32.77,33.49,34.21,34.93,35.66,36.38,37.10,37.82,38.55,39.27,39.99];
	var t_iMonateO=0;
	var t_iMonateP=0;
	var t_iMonate=0;
	t_iMonateO=t_dOrdentlich.p_getMonth()+12*t_dOrdentlich.p_getYear();
	t_iMonateP=t_dPension.p_getMonth()+12*t_dPension.p_getYear();
	t_iMonate=t_iMonateP-t_iMonateO;
	if(t_iMonate<12){
		return 0.0;
	}else{
		if(t_iMonate>=12 && t_iMonate<=71){
			return t_rSatzFL[t_iMonate-12]/100.0;
		}else{
			return 0.40710000000000002;
		}
	}
}
function bb_ahv_werte_getAufschubsatzLI(t_dPension,t_dOrdentlich,t_iJahrgang){
	if(t_iJahrgang>=1958){
		return bb_ahv_werte_getAufschubsatzLI_nach1958(t_dPension,t_dOrdentlich);
	}else{
		return bb_ahv_werte_getAufschubsatzLI_vor1958(t_dPension,t_dOrdentlich);
	}
}
function bb_ahv_werte_getAufschubsatz(t_land,t_dPension,t_dOrdentlich,t_iJahrgang){
	if(t_land.p_schweiz()){
		return bb_ahv_werte_getAufschubsatzCH(t_dPension,t_dOrdentlich,t_iJahrgang);
	}else{
		return bb_ahv_werte_getAufschubsatzLI(t_dPension,t_dOrdentlich,t_iJahrgang);
	}
}
function c_Enumerator9(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator9.m_new=function(t_list){
	this.m__list=t_list;
	this.m__curr=t_list.m__head.m__succ;
	return this;
}
c_Enumerator9.m_new2=function(){
	return this;
}
c_Enumerator9.prototype.p_HasNext=function(){
	while(this.m__curr.m__succ.m__pred!=this.m__curr){
		this.m__curr=this.m__curr.m__succ;
	}
	return this.m__curr!=this.m__list.m__head;
}
c_Enumerator9.prototype.p_NextObject=function(){
	var t_data=this.m__curr.m__data;
	this.m__curr=this.m__curr.m__succ;
	return t_data;
}
function bb_utils_roundUnique(t_value,t_rounding){
	var t_3=t_rounding;
	if(t_3==1){
		return t_value;
	}else{
		if(t_3==2){
			return bb_utils_round(t_value);
		}else{
			if(t_3==3){
				return bb_utils_round(t_value/10.0)*10.0;
			}else{
				if(t_3==4){
					return bb_utils_round(t_value/100.0)*100.0;
				}else{
					if(t_3==5){
						return bb_utils_round(t_value/100.0)*100.0;
					}else{
						if(t_3==6){
							return bb_utils_round(t_value/1000.0)*1000.0;
						}
					}
				}
			}
		}
	}
	return t_value;
}
function bb_modulo_test_moduloTest(){
	var t_api=c_API.m_new.call(new c_API);
	c_API.m_initPrototypes();
	c_StRWLoader.m_clear();
	c_StRWLoader.m_loadFrom("https://services.logismata.ch/components/wolf");
	if(c_API.m_isValid()){
		print("valid");
	}else{
		print("abort");
	}
	print("Stand    "+c_API.m_getTaxBaseStand());
	print("Mit BVG  "+String(c_API.m_getMax3AmitBVG()));
	print("Ohne BVG "+String(c_API.m_getMax3AohneBVG()));
	print("");
	var t_sparen=c_API.m_calcSparen(2017,2,1,53,2,120000.0,true,true,800000000,0.0,1.75);
	print("deposit_sum:  "+String(t_sparen[0]));
	print("yield_sum:    "+String(t_sparen[1]));
	print("tax_gain_sum: "+String(t_sparen[2]));
	print("capital_gross:"+String(t_sparen[3]));
	print("capital_tax:  "+String(t_sparen[4]));
	print("capital_net:  "+String(t_sparen[5]));
	print("yield_net:    "+String(t_sparen[6]));
	print("duration:     "+String(t_sparen[7]));
	print("");
	var t_risiko=c_API.m_calcRisiko(2017,2,1,53,2,120000.0,true,true,90000.0,70000.0);
	print("disab_iv   "+String(t_risiko[0]));
	print("disab_bvg  "+String(t_risiko[1]));
	print("disab_sum  "+String(t_risiko[2]));
	print("disab_miss "+String(t_risiko[3]));
	print("death_ahv  "+String(t_risiko[4]));
	print("death_bvg  "+String(t_risiko[5]));
	print("death_sum  "+String(t_risiko[6]));
	print("death_miss "+String(t_risiko[7]));
	print("");
}
function bbMain(){
	c_API.m_initPrototypes();
	bb_modulo_test_moduloTest();
	return 0;
}
function c_NodeEnumerator(){
	Object.call(this);
	this.m_node=null;
}
c_NodeEnumerator.m_new=function(t_node){
	this.m_node=t_node;
	return this;
}
c_NodeEnumerator.m_new2=function(){
	return this;
}
c_NodeEnumerator.prototype.p_HasNext=function(){
	return this.m_node!=null;
}
c_NodeEnumerator.prototype.p_NextObject=function(){
	var t_t=this.m_node;
	this.m_node=this.m_node.p_NextNode();
	return t_t;
}
function c_UTF8(){
	Object.call(this);
}
c_UTF8.m_decode=function(t_bytes){
	var t_data=c_DynamicArray.m_new.call(new c_DynamicArray);
	var t_in=0;
	var t_len=t_bytes.length;
	while(t_in<t_len){
		var t_d=t_bytes[t_in];
		t_in=t_in+1;
		if((t_d&128)==0){
		}else{
			if((t_d&224)==192){
				if(t_in<t_len){
					t_d=(t_d&31)<<6|t_bytes[t_in]&63;
					t_in=t_in+1;
				}
			}else{
				if((t_d&240)==224){
					if(t_in+1<t_len){
						t_d=(t_d&15)<<12|(t_bytes[t_in]&63)<<6|t_bytes[t_in+1]&63;
						t_in=t_in+2;
					}
				}else{
					if((t_d&248)==240){
						if(t_in+2<t_len){
							t_d=(t_d&7)<<18|(t_bytes[t_in]&63)<<12|(t_bytes[t_in+1]&63)<<6|t_bytes[t_in+2]&63;
							t_in=t_in+3;
						}
					}else{
						if((t_d&252)==248){
							if(t_in+3<t_len){
								t_d=(t_d&3)<<24|(t_bytes[t_in]&63)<<18|(t_bytes[t_in+1]&63)<<12|(t_bytes[t_in+2]&63)<<6|t_bytes[t_in+3]&63;
								t_in=t_in+4;
							}
						}else{
							if(t_in+4<t_len){
								t_d=(t_d&3)<<30|(t_bytes[t_in]&63)<<24|(t_bytes[t_in+1]&63)<<18|(t_bytes[t_in+2]&63)<<12|(t_bytes[t_in+3]&63)<<6|t_bytes[t_in+4]&63;
								t_in=t_in+5;
							}
						}
					}
				}
			}
		}
		t_data.p_add(t_d);
	}
	return t_data.p_getArray();
}
c_UTF8.m_decodeString=function(t_s){
	return string_fromchars(c_UTF8.m_decode(string_tochars(t_s)));
}
function c_StR_natPers_RTabWert(){
	c_RWBasis.call(this);
	this.m__mann=.0;
	this.m__frau=.0;
	this.m__alter=0;
}
c_StR_natPers_RTabWert.prototype=extend_class(c_RWBasis);
c_StR_natPers_RTabWert.m_new=function(){
	c_RWBasis.m_new.call(this);
	return this;
}
c_StR_natPers_RTabWert.prototype.p_getNew=function(){
	return (c_StR_natPers_RTabWert.m_new.call(new c_StR_natPers_RTabWert));
}
c_StR_natPers_RTabWert.prototype.p_getUID=function(){
	return this.m__alter;
}
c_StR_natPers_RTabWert.prototype.p_from=function(t_mustDecodeUTF8,t_o){
	this.m__alter=c_RWBasis.m_I(t_o,"a");
	this.m__mann=c_RWBasis.m_F(t_o,"m");
	this.m__frau=c_RWBasis.m_F(t_o,"w");
}
function c_StC_natPers_Abzug(){
	Object.call(this);
	this.m__calctyp=0;
	this.m__calc=null;
}
c_StC_natPers_Abzug.m_new=function(t_calctyp,t_calc){
	this.m__calctyp=t_calctyp;
	this.m__calc=t_calc;
	return this;
}
c_StC_natPers_Abzug.m_new2=function(){
	return this;
}
c_StC_natPers_Abzug.prototype.p_berechneSt3=function(t_iProgID,t_rEinkommen){
	var t_cProg=null;
	t_cProg=c_StCProgr.m_new2.call(new c_StCProgr,this.m__calc,t_iProgID,0.0);
	if(t_cProg.p_isValid()){
		return t_cProg.p_berechneSt(t_rEinkommen);
	}
	return 0.0;
}
c_StC_natPers_Abzug.prototype.p_Abzg=function(t_rSteuerwert,t_pcAbzug){
	var t_rAbzug=0.0;
	var t_iTyp=0;
	var t_iGrTyp=0;
	if(t_pcAbzug==null){
		return 0.0;
	}
	t_iTyp=t_pcAbzug.m__typ;
	t_iGrTyp=t_pcAbzug.m__grtyp;
	if((t_iTyp&c_StR_natPers.m_Abzug_SATZBEST_TIEFEREN_NETTOEK)!=0){
	}
	if((t_iTyp&c_StR_natPers.m_Abzug_DIVISOR)!=0){
		var t_iProgID=t_pcAbzug.m__progid;
		var t_rFactor=.0;
		var t_cProg=c_StCProgr.m_new2.call(new c_StCProgr,this.m__calc,t_iProgID,0.0);
		if(t_cProg.p_isValid()){
			t_rFactor=t_pcAbzug.m__wert+this.p_berechneSt3(t_pcAbzug.m__progid,t_rSteuerwert);
			if(t_rFactor>1.0){
				t_rAbzug=t_rSteuerwert-t_rSteuerwert/t_rFactor;
				if((t_iGrTyp&c_StR_natPers.m_AbzugGrTyp_MAX_IN_FR)!=0){
					var t_rMaxBetrag=.0;
					t_rMaxBetrag=t_pcAbzug.m__maxst+(this.m__calc.m__grundlage.m__kinder-1)*t_cProg.m__prg.m__pstep;
					if(t_rSteuerwert>t_rMaxBetrag){
						t_rAbzug=t_rSteuerwert-(t_rSteuerwert-t_rMaxBetrag)/t_pcAbzug.m__wert-t_rMaxBetrag/t_rFactor;
					}
				}
			}
			return t_rAbzug;
		}else{
			t_rFactor=t_pcAbzug.m__wert;
			if(bb_utils_isNotZero(t_rFactor,0)){
				t_rAbzug=t_rSteuerwert-t_rSteuerwert/t_rFactor;
			}
		}
	}else{
		if(((t_iTyp&c_StR_natPers.m_Abzug_PROGRESS)!=0) && ((t_iTyp&c_StR_natPers.m_Abzug_PROZENT)!=0)){
			t_rAbzug=this.p_berechneSt3(t_pcAbzug.m__progid,t_rSteuerwert);
		}else{
			if(((t_iTyp&c_StR_natPers.m_Abzug_PROGRESS)!=0) && ((t_iTyp&c_StR_natPers.m_Abzug_FRANKEN)!=0)){
				t_rAbzug=this.p_berechneSt3(t_pcAbzug.m__progid,t_rSteuerwert);
			}else{
				if((t_iTyp&c_StR_natPers.m_Abzug_PROZENT)!=0){
					t_rAbzug=t_pcAbzug.m__wert*t_rSteuerwert/100.0;
				}else{
					if((t_iTyp&c_StR_natPers.m_Abzug_FRANKEN)!=0){
						t_rAbzug=t_pcAbzug.m__wert;
					}else{
						if((t_iTyp&c_StR_natPers.m_Abzug_PROGRESS)!=0){
							t_rAbzug=this.p_berechneSt3(t_pcAbzug.m__progid,t_rSteuerwert);
						}
					}
				}
			}
		}
	}
	if((t_iGrTyp&c_StR_natPers.m_AbzugGrTyp_MIN_IN_PROZENT)!=0){
		t_rAbzug=bb_math_Max2(t_rAbzug,t_rSteuerwert*t_pcAbzug.m__minst/100.0);
	}else{
		if((t_iGrTyp&c_StR_natPers.m_AbzugGrTyp_MIN_IN_FR)!=0){
			t_rAbzug=bb_math_Max2(t_rAbzug,t_pcAbzug.m__minst);
		}
	}
	if((t_iGrTyp&c_StR_natPers.m_AbzugGrTyp_MAX_IN_PROZENT)!=0){
		t_rAbzug=bb_math_Min2(t_rAbzug,t_rSteuerwert*t_pcAbzug.m__maxst/100.0);
	}else{
		if((t_iGrTyp&c_StR_natPers.m_AbzugGrTyp_MAX_IN_FR)!=0){
			t_rAbzug=bb_math_Min2(t_rAbzug,t_pcAbzug.m__maxst);
		}
	}
	return t_rAbzug;
}
c_StC_natPers_Abzug.prototype.p_berechnePreAbzug=function(t_rSteuerwertVorAbzuege,t_pcAbzug,t_bFuerBund,t_bFuerSatzbest){
	var t_rAbzugSteuerwert=0.0;
	var t_rAbzugSatzbestimmend=0.0;
	if((t_pcAbzug.m__typ&(c_StR_natPers.m_Abzug_BASIS_EINF_STEUER|c_StR_natPers.m_Abzug_EINF_STAAT_ST|c_StR_natPers.m_Abzug_EFF_STAAT_ST))!=0){
		return [t_rAbzugSteuerwert,t_rAbzugSatzbestimmend];
	}
	if((t_pcAbzug.m__typ&c_StR_natPers.m_Abzug_ST_EKVM)!=0){
		if((t_pcAbzug.m__typ&c_StR_natPers.m_Abzug_BASIS_QUALBET_GEWINN)!=0){
			if(t_bFuerBund){
				var t_rGewinnBund=.0;
				t_rGewinnBund=this.m__calc.m__grundlage.p_getZusatz(c_StC_natPers.m_Zusatz_QUALBET_GEWINN_BUND);
				if(bb_utils_isGZero(t_rGewinnBund,0)){
					if(this.m__calc.m__grundlage.m__bQualDivAnteil==false){
						t_rAbzugSteuerwert=this.p_Abzg(t_rGewinnBund,t_pcAbzug);
					}
				}
			}else{
				if(t_bFuerSatzbest==false){
					var t_rGewinnGmd=.0;
					var t_rGewinn=.0;
					if(this.m__calc.m__grundlage.m__bQualDivAnteil==false){
						t_rGewinnGmd=this.m__calc.m__grundlage.p_getZusatz(c_StC_natPers.m_Zusatz_QUALBET_GEWINN_GMD);
						t_rGewinn=this.m__calc.m__grundlage.p_getZusatz(c_StC_natPers.m_Zusatz_QUALBET_GEWINN);
						if(bb_utils_isGEZero(t_rGewinnGmd,0)){
							t_rAbzugSteuerwert=this.p_Abzg(t_rGewinnGmd,t_pcAbzug);
						}else{
							if(bb_utils_isGEZero(t_rGewinn,0)){
								t_rAbzugSteuerwert=this.p_Abzg(t_rGewinn,t_pcAbzug);
							}
						}
					}
				}else{
					var t_rGewinn2=.0;
					t_rGewinn2=this.m__calc.m__grundlage.p_getZusatz(c_StC_natPers.m_Zusatz_QUALBET_GEWINN);
					if(bb_utils_isGZero(t_rGewinn2,0)){
						if(this.m__calc.m__grundlage.m__bQualDivAnteil==false){
							t_rAbzugSteuerwert=this.p_Abzg(t_rGewinn2,t_pcAbzug);
						}
					}
				}
			}
		}else{
			if((t_pcAbzug.m__typ&c_StR_natPers.m_Abzug_BASIS_QUALBET_VKWERT)!=0){
				if(t_bFuerSatzbest==false){
					var t_rVKWertGmd=.0;
					var t_rVKWert=.0;
					if(this.m__calc.m__grundlage.m__bQualDivAnteil==false){
						t_rVKWertGmd=this.m__calc.m__grundlage.p_getZusatz(c_StC_natPers.m_Zusatz_QUALBET_VERKEHRSWERT_GMD);
						t_rVKWert=this.m__calc.m__grundlage.p_getZusatz(c_StC_natPers.m_Zusatz_QUALBET_VERKEHRSWERT);
						if(bb_utils_isGZero(t_rVKWertGmd,0)){
							t_rAbzugSteuerwert=this.p_Abzg(t_rVKWertGmd,t_pcAbzug);
						}else{
							if(bb_utils_isGZero(t_rVKWert,0)){
								t_rAbzugSteuerwert=this.p_Abzg(t_rVKWert,t_pcAbzug);
							}
						}
					}
				}else{
					var t_rVKWert2=.0;
					if(this.m__calc.m__grundlage.m__bQualDivAnteil==false){
						t_rVKWert2=this.m__calc.m__grundlage.p_getZusatz(c_StC_natPers.m_Zusatz_QUALBET_VERKEHRSWERT);
						if(bb_utils_isGZero(t_rVKWert2,0)){
							t_rAbzugSteuerwert=this.p_Abzg(t_rVKWert2,t_pcAbzug);
						}
					}
				}
			}else{
				t_rAbzugSteuerwert=this.p_Abzg(t_rSteuerwertVorAbzuege,t_pcAbzug);
			}
		}
	}
	if((t_pcAbzug.m__typ&c_StR_natPers.m_Abzug_SATZBEST)!=0){
		if((t_pcAbzug.m__typ&c_StR_natPers.m_Abzug_BASIS_QUALBET_GEWINN)!=0){
			if(t_bFuerBund){
				var t_rGewinnBund2=.0;
				if(this.m__calc.m__grundlage.m__bQualDivAnteil==false){
					t_rGewinnBund2=this.m__calc.m__grundlage.p_getZusatz(c_StC_natPers.m_Zusatz_QUALBET_GEWINN_BUND);
					if(bb_utils_isGZero(t_rGewinnBund2,0)){
						t_rAbzugSatzbestimmend=this.p_Abzg(t_rGewinnBund2,t_pcAbzug);
					}
				}
			}else{
				var t_rGewinn3=.0;
				if(this.m__calc.m__grundlage.m__bQualDivAnteil==false){
					t_rGewinn3=this.m__calc.m__grundlage.p_getZusatz(c_StC_natPers.m_Zusatz_QUALBET_GEWINN);
					if(bb_utils_isGZero(t_rGewinn3,0)){
						t_rAbzugSatzbestimmend=this.p_Abzg(t_rGewinn3,t_pcAbzug);
					}
				}
			}
		}else{
			if((t_pcAbzug.m__typ&c_StR_natPers.m_Abzug_BASIS_QUALBET_VKWERT)!=0){
				var t_rVKWert3=.0;
				if(this.m__calc.m__grundlage.m__bQualDivAnteil==false){
					t_rVKWert3=this.m__calc.m__grundlage.p_getZusatz(c_StC_natPers.m_Zusatz_QUALBET_VERKEHRSWERT);
					if(bb_utils_isGZero(t_rVKWert3,0)){
						t_rAbzugSatzbestimmend=this.p_Abzg(t_rVKWert3,t_pcAbzug);
					}
				}
			}else{
				t_rAbzugSatzbestimmend=this.p_Abzg(t_rSteuerwertVorAbzuege,t_pcAbzug);
			}
		}
	}
	return [t_rAbzugSteuerwert,t_rAbzugSatzbestimmend];
}
c_StC_natPers_Abzug.prototype.p_PostAbzgEinf=function(t_pcAbzug,t_bFuerBund,t_rSteuerfuss,t_cStResultat,t_rSteuerwert,t_rSteuerwertBrutto,t_rSatzbestimmend,t_rSteuerSatz,t_rEinfacheSteuer,t_rEffSteuer){
	var t_iTyp=0;
	var t_rAbzug=0.0;
	t_iTyp=t_pcAbzug.m__typ;
	if((t_iTyp&c_StR_natPers.m_Abzug_EINF_STAAT_ST)==0){
		return;
	}
	if((t_iTyp&c_StR_natPers.m_Abzug_SATZBEST)!=0){
		if((t_iTyp&c_StR_natPers.m_Abzug_BASIS_BRUTTOSTEUERWERT)!=0){
			t_rAbzug=this.p_Abzg(t_rSteuerwertBrutto,t_pcAbzug);
		}else{
			t_rAbzug=this.p_Abzg(t_rSteuerwert,t_pcAbzug);
		}
	}else{
		if((t_iTyp&c_StR_natPers.m_Abzug_ST_EKVM)!=0){
			t_rAbzug=this.p_Abzg(t_rSatzbestimmend,t_pcAbzug);
		}else{
			if((t_iTyp&c_StR_natPers.m_Abzug_BASIS_EINF_STEUER)!=0){
				t_rAbzug=this.p_Abzg(t_rEinfacheSteuer,t_pcAbzug);
			}else{
				if((t_iTyp&c_StR_natPers.m_Abzug_BASIS_QUALBET_GEWINN)!=0){
					if(t_bFuerBund){
						var t_rGewinnBund=.0;
						t_rGewinnBund=this.m__calc.m__grundlage.p_getZusatz(c_StC_natPers.m_Zusatz_QUALBET_GEWINN_BUND);
						if(bb_utils_isGZero(t_rGewinnBund,0)){
							if(t_rSteuerwert<t_rGewinnBund){
								t_rGewinnBund=t_rSteuerwert;
							}
							t_rAbzug=this.p_Abzg(t_rGewinnBund*t_rSteuerSatz/100.0,t_pcAbzug);
						}
					}else{
						var t_rGewinn=.0;
						t_rGewinn=this.m__calc.m__grundlage.p_getZusatz(c_StC_natPers.m_Zusatz_QUALBET_GEWINN);
						if(bb_utils_isGZero(t_rGewinn,0)){
							if(t_rSteuerwert<t_rGewinn){
								t_rGewinn=t_rSteuerwert;
							}
							t_rAbzug=this.p_Abzg(t_rGewinn*t_rSteuerSatz/100.0,t_pcAbzug);
						}
					}
				}else{
					if((t_iTyp&c_StR_natPers.m_Abzug_BASIS_QUALBET_VKWERT)!=0){
						var t_rVKWert=.0;
						t_rVKWert=this.m__calc.m__grundlage.p_getZusatz(c_StC_natPers.m_Zusatz_QUALBET_VERKEHRSWERT);
						if(bb_utils_isGZero(t_rVKWert,0)){
							if(t_rSteuerwert<t_rVKWert){
								t_rVKWert=t_rSteuerwert;
							}
							t_rAbzug=this.p_Abzg(t_rVKWert*t_rSteuerSatz/100.0,t_pcAbzug);
						}
					}else{
						t_rAbzug=this.p_Abzg(t_rEinfacheSteuer,t_pcAbzug);
					}
				}
			}
		}
	}
	if(((t_iTyp&c_StR_natPers.m_Abzug_PROGRESS)!=0) && ((t_iTyp&c_StR_natPers.m_Abzug_PROZENT)!=0)){
		t_rAbzug=t_rAbzug*t_rEinfacheSteuer/100.0;
	}
	if(bb_utils_isNotZero(t_rAbzug,0)){
		t_cStResultat.m__einfsteuer=t_cStResultat.m__einfsteuer-t_rAbzug;
		t_cStResultat.m__einfsteuer=bb_math_Max2(0.0,t_cStResultat.m__einfsteuer);
		if(bb_utils_isNotZero(t_cStResultat.m__satzbestimmend,0)){
			t_cStResultat.m__steuersatz=100.0*t_cStResultat.m__einfsteuer/t_cStResultat.m__satzbestimmend;
		}
		t_cStResultat.m__steuer=t_cStResultat.m__einfsteuer*t_rSteuerfuss/100.0;
	}
}
c_StC_natPers_Abzug.prototype.p_PostAbzgEff=function(t_pcAbzug,t_bFuerBund,t_rSteuerfuss,t_cStResultat,t_rSteuerwert,t_rSteuerwertBrutto,t_rSatzbestimmend,t_rSteuerSatz,t_rEinfacheSteuer,t_rEffSteuer){
	var t_iTyp=0;
	var t_rAbzug=0.0;
	t_iTyp=t_pcAbzug.m__typ;
	if((t_iTyp&c_StR_natPers.m_Abzug_EFF_STAAT_ST)==0){
		return;
	}
	if((t_iTyp&c_StR_natPers.m_Abzug_SATZBEST)!=0){
		if((t_iTyp&c_StR_natPers.m_Abzug_BASIS_BRUTTOSTEUERWERT)!=0){
			t_rAbzug=this.p_Abzg(t_rSteuerwertBrutto,t_pcAbzug);
		}else{
			t_rAbzug=this.p_Abzg(t_rSteuerwert,t_pcAbzug);
		}
	}else{
		if((t_iTyp&c_StR_natPers.m_Abzug_ST_EKVM)!=0){
			t_rAbzug=this.p_Abzg(t_rSatzbestimmend,t_pcAbzug);
		}else{
			if((t_iTyp&c_StR_natPers.m_Abzug_BASIS_EINF_STEUER)!=0){
				t_rAbzug=this.p_Abzg(t_rEinfacheSteuer,t_pcAbzug);
			}else{
				if((t_iTyp&c_StR_natPers.m_Abzug_BASIS_QUALBET_GEWINN)!=0){
					if(t_bFuerBund){
						var t_rGewinnBund=.0;
						t_rGewinnBund=this.m__calc.m__grundlage.p_getZusatz(c_StC_natPers.m_Zusatz_QUALBET_GEWINN_BUND);
						if(bb_utils_isGZero(t_rGewinnBund,0)){
							t_rAbzug=this.p_Abzg(t_rGewinnBund*t_rSteuerSatz/100.0,t_pcAbzug);
						}
					}else{
						var t_rGewinn=.0;
						t_rGewinn=this.m__calc.m__grundlage.p_getZusatz(c_StC_natPers.m_Zusatz_QUALBET_GEWINN);
						if(bb_utils_isGZero(t_rGewinn,0)){
							t_rAbzug=this.p_Abzg(t_rGewinn*t_rSteuerSatz/100.0,t_pcAbzug);
						}
					}
				}else{
					if((t_iTyp&c_StR_natPers.m_Abzug_BASIS_QUALBET_VKWERT)!=0){
						var t_rVKWert=.0;
						t_rVKWert=this.m__calc.m__grundlage.p_getZusatz(c_StC_natPers.m_Zusatz_QUALBET_VERKEHRSWERT);
						if(bb_utils_isGZero(t_rVKWert,0)){
							t_rAbzug=this.p_Abzg(t_rVKWert*t_rSteuerSatz/100.0,t_pcAbzug);
						}
					}else{
						t_rAbzug=this.p_Abzg(t_rEffSteuer,t_pcAbzug);
					}
				}
			}
		}
	}
	if(((t_iTyp&c_StR_natPers.m_Abzug_PROGRESS)!=0) && ((t_iTyp&c_StR_natPers.m_Abzug_PROZENT)!=0)){
		t_rAbzug=t_rAbzug*t_cStResultat.m__steuer/100.0;
	}
	if(bb_utils_isNotZero(t_rAbzug,0)){
		if(this.m__calctyp==c_StC_natPers.m_CalcTyp_EINKOMMENSSTEUER){
			if(t_bFuerBund){
				if(this.m__calc.m__grundlage.m__satzbEkBund>this.m__calc.m__grundlage.m__stbEkBund && bb_utils_isNotZero(this.m__calc.m__grundlage.m__satzbEkBund,0)){
					t_rAbzug=t_rAbzug/this.m__calc.m__grundlage.m__satzbEkBund*this.m__calc.m__grundlage.m__stbEkBund;
				}
			}else{
				if(this.m__calc.m__grundlage.m__satzbEkKt>this.m__calc.m__grundlage.m__stbEkKt && bb_utils_isNotZero(this.m__calc.m__grundlage.m__satzbEkKt,0)){
					t_rAbzug=t_rAbzug/this.m__calc.m__grundlage.m__satzbEkKt*this.m__calc.m__grundlage.m__stbEkKt;
				}
			}
		}
		if(this.m__calctyp==c_StC_natPers.m_CalcTyp_VERMOEGENSSTEUER){
			if(this.m__calc.m__grundlage.m__satzbVmKt>this.m__calc.m__grundlage.m__stbVmKt && bb_utils_isNotZero(this.m__calc.m__grundlage.m__satzbVmKt,0)){
				t_rAbzug=t_rAbzug/this.m__calc.m__grundlage.m__satzbVmKt*this.m__calc.m__grundlage.m__stbVmKt;
			}
		}
		t_cStResultat.m__steuer=t_cStResultat.m__steuer-t_rAbzug;
		t_cStResultat.m__steuer=bb_math_Max2(0.0,t_cStResultat.m__steuer);
	}
}
c_StC_natPers_Abzug.prototype.p_berechnePostAbzug=function(t_pcCollAbzuege,t_bFuerBund,t_rSteuerfuss,t_cStResultat,t_rSteuerwert,t_rSteuerwertBrutto,t_rSatzbestimmend,t_rSteuerSatz,t_rEinfacheSteuer,t_rEffSteuer){
	if(t_pcCollAbzuege==null || t_pcCollAbzuege.p_Count()==0){
		return;
	}
	var t_=t_pcCollAbzuege.p_Values().p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_x=t_.p_NextObject();
		this.p_PostAbzgEinf(object_downcast((t_x),c_StR_natPers_Abzg),t_bFuerBund,t_rSteuerfuss,t_cStResultat,t_rSteuerwert,t_rSteuerwertBrutto,t_rSatzbestimmend,t_rSteuerSatz,t_rEinfacheSteuer,t_rEffSteuer);
	}
	t_rSatzbestimmend=t_cStResultat.m__satzbestimmend;
	t_rSteuerSatz=t_cStResultat.m__steuersatz;
	t_rEinfacheSteuer=t_cStResultat.m__einfsteuer;
	t_rEffSteuer=t_cStResultat.m__steuer;
	var t_2=t_pcCollAbzuege.p_Values().p_ObjectEnumerator();
	while(t_2.p_HasNext()){
		var t_x2=t_2.p_NextObject();
		this.p_PostAbzgEff(object_downcast((t_x2),c_StR_natPers_Abzg),t_bFuerBund,t_rSteuerfuss,t_cStResultat,t_rSteuerwert,t_rSteuerwertBrutto,t_rSatzbestimmend,t_rSteuerSatz,t_rEinfacheSteuer,t_rEffSteuer);
	}
}
function c_Map6(){
	Object.call(this);
	this.m_root=null;
}
c_Map6.m_new=function(){
	return this;
}
c_Map6.prototype.p_Compare2=function(t_lhs,t_rhs){
}
c_Map6.prototype.p_RotateLeft6=function(t_node){
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
c_Map6.prototype.p_RotateRight6=function(t_node){
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
c_Map6.prototype.p_InsertFixup6=function(t_node){
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
					this.p_RotateLeft6(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateRight6(t_node.m_parent.m_parent);
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
					this.p_RotateRight6(t_node);
				}
				t_node.m_parent.m_color=1;
				t_node.m_parent.m_parent.m_color=-1;
				this.p_RotateLeft6(t_node.m_parent.m_parent);
			}
		}
	}
	this.m_root.m_color=1;
	return 0;
}
c_Map6.prototype.p_Add4=function(t_key,t_value){
	var t_node=this.m_root;
	var t_parent=null;
	var t_cmp=0;
	while((t_node)!=null){
		t_parent=t_node;
		t_cmp=this.p_Compare2(t_key,t_node.m_key);
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
	t_node=c_Node15.m_new.call(new c_Node15,t_key,t_value,-1,t_parent);
	if((t_parent)!=null){
		if(t_cmp>0){
			t_parent.m_right=t_node;
		}else{
			t_parent.m_left=t_node;
		}
		this.p_InsertFixup6(t_node);
	}else{
		this.m_root=t_node;
	}
	return true;
}
function c_IntMap4(){
	c_Map6.call(this);
}
c_IntMap4.prototype=extend_class(c_Map6);
c_IntMap4.m_new=function(){
	c_Map6.m_new.call(this);
	return this;
}
c_IntMap4.prototype.p_Compare2=function(t_lhs,t_rhs){
	return t_lhs-t_rhs;
}
function c_Node15(){
	Object.call(this);
	this.m_key=0;
	this.m_right=null;
	this.m_left=null;
	this.m_value=false;
	this.m_color=0;
	this.m_parent=null;
}
c_Node15.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node15.m_new2=function(){
	return this;
}
function c_StCESInfos(){
	Object.call(this);
	this.m__levels=c_IntMap3.m_new.call(new c_IntMap3);
}
c_StCESInfos.m_new=function(){
	return this;
}
c_StCESInfos.prototype.p_clear=function(){
	this.m__levels.p_Clear();
}
c_StCESInfos.prototype.p__level=function(t_iLvl){
	var t_o=null;
	t_o=this.m__levels.p_Get3(t_iLvl);
	if(t_o==null){
		t_o=(c_StCESInfoLevel.m_new.call(new c_StCESInfoLevel));
		this.m__levels.p_Add2(t_iLvl,t_o);
	}
	return object_downcast((t_o),c_StCESInfoLevel);
}
function c_StC_natPers_ES_INFO(){
	Object.call(this);
}
c_StC_natPers_ES_INFO.m_REGEL=0;
c_StC_natPers_ES_INFO.m_REGEL_UNDEF="";
c_StC_natPers_ES_INFO.m_KEINESTEUERN=0;
c_StC_natPers_ES_INFO.m_FREIBETRAG=0;
c_StC_natPers_ES_INFO.m_ABZUG=0;
c_StC_natPers_ES_INFO.m_MINDESTJAHRE=0;
c_StC_natPers_ES_INFO.m_JEELTERNTEIL=0;
c_StC_natPers_ES_INFO.m_REGEL_EIGENE="";
c_StC_natPers_ES_INFO.m_REGEL_UEBRIGE="";
function c_StCESInfoLevel(){
	c_StCBasis.call(this);
	this.m__details=c_IntMap3.m_new.call(new c_IntMap3);
}
c_StCESInfoLevel.prototype=extend_class(c_StCBasis);
c_StCESInfoLevel.m_new=function(){
	c_StCBasis.m_new.call(this);
	return this;
}
c_StCESInfoLevel.prototype.p__detail=function(t_iInfoTyp){
	var t_d=null;
	t_d=object_downcast((this.m__details.p_Get3(t_iInfoTyp)),c_StCESInfoDetail);
	if(t_d==null){
		t_d=c_StCESInfoDetail.m_new.call(new c_StCESInfoDetail);
		t_d.m__typ=t_iInfoTyp;
		this.m__details.p_Add2(t_iInfoTyp,(t_d));
	}
	return t_d;
}
c_StCESInfoLevel.prototype.p_setInfo2=function(t_iInfoTyp,t_sInfo){
	var t_d=null;
	t_d=this.p__detail(t_iInfoTyp);
	t_d.m__info=t_sInfo;
}
c_StCESInfoLevel.prototype.p_parseInfo2=function(t_sInfo){
	var t_attrs=t_sInfo.split(";");
	var t_=t_attrs;
	var t_2=0;
	while(t_2<t_.length){
		var t_s=t_[t_2];
		t_2=t_2+1;
		t_s=string_trim(t_s);
		if(t_s.length>0){
			var t_22=t_s.charCodeAt(0);
			if(t_22==82){
				this.p_setInfo2(c_StC_natPers_ES_INFO.m_REGEL,t_s.slice(1));
			}else{
				if(t_22==75){
					this.p_setInfo2(c_StC_natPers_ES_INFO.m_KEINESTEUERN,t_s.slice(1));
				}else{
					if(t_22==70){
						this.p_setInfo2(c_StC_natPers_ES_INFO.m_FREIBETRAG,t_s.slice(1));
					}else{
						if(t_22==65){
							this.p_setInfo2(c_StC_natPers_ES_INFO.m_ABZUG,t_s.slice(1));
						}else{
							if(t_22==74){
								this.p_setInfo2(c_StC_natPers_ES_INFO.m_MINDESTJAHRE,t_s.slice(1));
							}else{
								if(t_22==69){
									this.p_setInfo2(c_StC_natPers_ES_INFO.m_JEELTERNTEIL,t_s.slice(1));
								}
							}
						}
					}
				}
			}
		}
	}
}
function c_StCESInfoDetail(){
	c_StCBasis.call(this);
	this.m__typ=0;
	this.m__info="";
}
c_StCESInfoDetail.prototype=extend_class(c_StCBasis);
c_StCESInfoDetail.m_new=function(){
	c_StCBasis.m_new.call(this);
	return this;
}
function bbInit(){
	c_StRWLoader.m__last_base="";
	c_StRWLoader.m__last_remote=false;
	c_StRWLoader.m__st_vers="";
	c_StRWLoader.m__st_minvers="";
	c_StRWLoader.m__st_maxvers="";
	c_LDebug.m__printlevel=2;
	c_LDebug.m__lasterror="";
	c_Base64.m_Dime=[];
	c_Base64.m_MIME="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	c_JsonString.m__null=c_JsonString.m_new.call(new c_JsonString,"");
	c_JsonNumber.m__zero=c_JsonNumber.m_new.call(new c_JsonNumber,"0");
	c_JsonBool.m__true=c_JsonBool.m_new.call(new c_JsonBool,true);
	c_JsonBool.m__false=c_JsonBool.m_new.call(new c_JsonBool,false);
	c_JsonNull.m__instance=c_JsonNull.m_new.call(new c_JsonNull);
	c_RWBasis.m__last_uid=0;
	c_StRWLoader.m__current_rw=null;
	c_LawbaseLoader.m__last_base="";
	c_LawbaseLoader.m__last_remote=false;
	c_LawbaseLoader.m__bsv_vers="";
	c_LawbaseLoader.m__current_bsv_ch=null;
	c_LawbaseLoader.m__current_bsv_li=null;
	c_StCBasis.m__last_uid=0;
	c_StC_common.m_Rundung_Franken=1;
	c_StR_common.m_Kanton_LI=27;
	c_StR_common.m_Kanton_CH=99;
	c_StC_natPers.m_Zusatz_VM_ERTRAG=1;
	c_StC_natPers.m_Zusatz_REIN_EK=2;
	c_StC_natPers.m_Zusatz_REIN_VM=3;
	c_StC_natPers.m_Zusatz_QUALBET_GEWINN=4;
	c_StC_natPers.m_Zusatz_QUALBET_GEWINN_GMD=5;
	c_StC_natPers.m_Zusatz_QUALBET_VERKEHRSWERT=6;
	c_StC_natPers.m_Zusatz_QUALBET_VERKEHRSWERT_GMD=7;
	c_StC_natPers.m_Zusatz_QUALBET_GEWINN_BUND=8;
	c_StC_natPers.m_Zusatz_SOZABZUG=9;
	c_StC_natPers.m_Zusatz_TOTAL_AKTIVE=10;
	c_StC_natPers.m_Zusatz_LIEGENSCHAFTS_UNTERH_CH=11;
	c_StC_natPers.m_Zusatz_BVG_EINKAUF=12;
	c_StC_natPers.m_Zivilstand_VERHEIRATET=4;
	c_StC_natPers.m_Zivilstand_EINGETR_PARTNERSCHAFT=7;
	c_StC_natPers.m_Zivilstand_LEDIG=1;
	c_StC_natPers.m_Konfession_KONFESSIONSLOS=4;
	c_StR_natPers.m_CalcTyp_EK=1;
	c_StC_natPers.m_Zivilstand_GESCHIEDEN=5;
	c_StC_natPers.m_Zivilstand_VERWITET=6;
	c_StC_natPers.m_Zivilstand_LEDIGALLEIN=2;
	c_StC_natPers.m_Zivilstand_LEDIGKONKUBINAT=3;
	c_StR_natPers.m_Gruppe_LEDIGE_KONKUBINAT=2;
	c_StR_natPers.m_Gruppe_LEDIGE_ALLEINE=1;
	c_StR_natPers.m_Gruppe_VERHEIRATETE=4;
	c_StR_natPers.m_Gruppe_MIT_KINDER_FUER_LEDIGE=8;
	c_StR_natPers.m_Gruppe_OHNE_KINDER_FUER_LEDIGE=16;
	c_StR_natPers.m_Gruppe_MIT_KINDER_FUER_VERHEIRATETE=32;
	c_StR_natPers.m_Gruppe_OHNE_KINDER_FUER_VERHEIRATETE=64;
	c_Limitation.m_limits=c_Limitation.m_new.call(new c_Limitation);
	c_StR_common.m_ProgrTyp_G_A=5;
	c_StR_common.m_ProgrTyp_G_B=6;
	c_StR_common.m_ProgrTyp_G_A_OHNE_RABATT=10;
	c_StR_common.m_ProgrTyp_SOURCE=12;
	c_StR_common.m_ProgrTyp_FIX=14;
	c_StR_common.m_ProgrTyp_DEF=8;
	c_StR_common.m_ProgrTyp_B=0;
	c_StR_common.m_ProgrTyp_FORMEL=11;
	c_StR_common.m_ProgrTyp_F=2;
	c_StC_common.m_Runden_AB=1;
	c_StC_common.m_Runden_AUF=2;
	c_StC_common.m_Runden_NORMAL=3;
	c_StR_common.m_ProgrTyp_Z=1;
	c_StR_common.m_ProgrTyp_R=3;
	c_StR_common.m_ProgrTyp_K=4;
	c_StR_common.m_ProgrTyp_TIEF_EK=7;
	c_StC_natPers.m_Konfession_KEIN=0;
	c_StC_natPers.m_CalcTyp_EINKOMMENSSTEUER=1;
	c_StC_natPers.m_CalcTyp_KEIN=0;
	c_StC_natPers.m_CalcTyp_VERMOEGENSSTEUER=2;
	c_StC_natPers.m_CalcTyp_PERSONALSTEUER=3;
	c_StC_natPers.m_CalcTyp_STEUER_SAUELE_2A3A=4;
	c_StC_natPers.m_CalcTyp_STEUER_SAUELE_3B=5;
	c_StC_natPers.m_CalcTyp_ERBSCHAFTSSTEUER=6;
	c_StC_natPers.m_CalcTyp_SCHENKUNGSSTEUER=7;
	c_StC_common.m_Rundung_KEIN=0;
	c_StC_common.m_Rundung_Rappen=2;
	c_StC_common.m_TaxLevel_BUND=0;
	c_StC_common.m_TaxLevel_KANTON=1;
	c_StC_common.m_TaxLevel_GEMEINDE=2;
	c_StC_common.m_TaxLevel_KIRCHE=3;
	c_StC_natPers.m_Kapital_SAEULE_3A=1;
	c_StR_natPers.m_Spez_ES_WIRD_KEINE_STEUER_ERHOBEN=16;
	c_StR_natPers.m_Spez_RENTENTABELLE=8;
	c_StC_natPers.m_Sex_MANN=1;
	c_StR_common.m_RundungTyp_DOWN=1;
	c_StR_common.m_RundungTyp_UP=2;
	c_StR_common.m_RundungTyp_NEXT=4;
	c_StR_common.m_RundungTyp_VORABZUG=32;
	c_StR_natPers.m_Abzug_BASIS_EINF_STEUER=512;
	c_StR_natPers.m_Abzug_EINF_STAAT_ST=4;
	c_StR_natPers.m_Abzug_EFF_STAAT_ST=8;
	c_StR_natPers.m_Abzug_ST_EKVM=1;
	c_StR_natPers.m_Abzug_BASIS_QUALBET_GEWINN=2048;
	c_StR_natPers.m_Abzug_SATZBEST_TIEFEREN_NETTOEK=16;
	c_StR_natPers.m_Abzug_DIVISOR=32;
	c_StR_natPers.m_AbzugGrTyp_MAX_IN_FR=32;
	c_StR_natPers.m_Abzug_PROGRESS=256;
	c_StR_natPers.m_Abzug_PROZENT=64;
	c_StR_natPers.m_Abzug_FRANKEN=128;
	c_StR_natPers.m_AbzugGrTyp_MIN_IN_PROZENT=4;
	c_StR_natPers.m_AbzugGrTyp_MIN_IN_FR=8;
	c_StR_natPers.m_AbzugGrTyp_MAX_IN_PROZENT=16;
	c_StR_natPers.m_Abzug_BASIS_QUALBET_VKWERT=4096;
	c_StR_natPers.m_Abzug_SATZBEST=2;
	c_StR_common.m_RundungTyp_NACHABZUG=64;
	c_StR_natPers.m_Abzug_BASIS_BRUTTOSTEUERWERT=1024;
	c_StR_natPers.m_MinMax_EINFACHE_MINIMALSTEUER_IN_FR=1;
	c_StR_natPers.m_MinMax_EINFACHE_MININALSTEUER_IN_PROZ=4;
	c_StR_natPers.m_MinMax_MINIMALANSATZ_WIE_FUER_BETRAG_VON_FR=16;
	c_StR_natPers.m_MinMax_EFFEKTIVE_MINIMALSTEUER_IN_FR=2;
	c_StR_natPers.m_MinMax_EFFEKTIVE_MINIMALSTEUER_IN_PROZ=8;
	c_StR_natPers.m_MinMax_EINFACHE_MAXIMALSTEUER_IN_FR=1;
	c_StR_natPers.m_MinMax_EINFACHE_MAXINALSTEUER_IN_PROZ=4;
	c_StR_natPers.m_MinMax_MAXIMALANSATZ_WIE_FUER_BETRAG_VON_FR=16;
	c_StR_natPers.m_MinMax_EFFEKTIVE_MAXIMALSTEUER_IN_FR=2;
	c_StR_natPers.m_MinMax_EFFEKTIVE_MAXIMALSTEUER_IN_PROZ=8;
	c_StR_natPers.m_SoBerBasis_SONDERBERECHNUNG=8;
	c_StR_natPers.m_SoBerBasis_AUF_STEUERB_EKVM_GMD=4;
	c_StR_natPers.m_SoBerBasis_AUF_STEUERB_EKVM_KT=2;
	c_StR_natPers.m_SoBerBasis_AUF_EINF_STAATSSTEUER=0;
	c_StR_natPers.m_SoBerBasis_AUF_EFF_STAATSSTEUER=1;
	c_StR_natPers.m_AuszhlgGrund_UNBEKANNT=0;
	c_StC_natPers.m_Konfession_REFORMIERT=1;
	c_StR_natPers.m_Kirchen_REFORMIERT=1;
	c_StC_natPers.m_Konfession_ROEMISCH=2;
	c_StR_natPers.m_Kirchen_ROEMISCH_KATHOLISCH=2;
	c_StC_natPers.m_Konfession_CHRISTLICH=3;
	c_StR_natPers.m_Kirchen_CHRISTLICH_KATHOLISCH=4;
	c_StR_natPers.m_SoBerBasis_AUF_GEMEINDESTEUER=16;
	c_StR_natPers.m_SoBerBasis_AUF_EINF_GEMEINDESTEUER=32;
	c_StR_natPers.m_Spez_STEUER_PRO_KOPF=32;
	c_StC_natPers.m_Kapital_SAEULE_2A=0;
	c_StC_natPers.m_Kapital_SAEULE_3BEE=2;
	c_StC_natPers.m_Kapital_SAEULE_3B=3;
	c_StC_natPers.m_AuszhlgGrund_PENSIONIERUNG=1;
	c_StR_natPers.m_AuszhlgGrund_PENSIONIERUNG=1;
	c_StC_natPers.m_AuszhlgGrund_WOHNEIGENTUMSFOERDERUNG=2;
	c_StR_natPers.m_AuszhlgGrund_WOHNEIGENTUMSFOERDERUNG=2;
	c_StC_natPers.m_AuszhlgGrund_VORZEITIGE_AUSZAHLUNG=3;
	c_StR_natPers.m_AuszhlgGrund_VORZEITIGE_AUSZAHLUNG=4;
	c_StC_natPers.m_AuszhlgGrund_INFOLGE_TOD_ODER_INVALIDITAET=4;
	c_StR_natPers.m_AuszhlgGrund_INFOLGE_TOD_ODER_INVALIDITAET=8;
	c_StR_natPers.m_Spez_NUR_EINE_BED_F_STEURFREIH_MUSS_ERFULLT_S=2;
	c_StR_natPers.m_Spez_BEIDE_BED_MUSSEN_ERFULLT_S=4;
	c_StR_natPers.m_Spez_STFUESSE_IMMER_100=64;
	c_StR_natPers.m_Spez_FUER_STEURSATZ_NOCH_EK_ADDIEREN=1;
	c_StC_natPers_ES_INFO.m_REGEL=6;
	c_StC_natPers_ES_INFO.m_REGEL_UNDEF="9";
	c_StC_natPers_ES_INFO.m_KEINESTEUERN=5;
	c_StC_natPers_ES_INFO.m_FREIBETRAG=1;
	c_StC_natPers_ES_INFO.m_ABZUG=2;
	c_StC_natPers_ES_INFO.m_MINDESTJAHRE=3;
	c_StC_natPers_ES_INFO.m_JEELTERNTEIL=4;
	c_StC_natPers_ES_INFO.m_REGEL_EIGENE="1";
	c_StC_natPers.m_CalcTyp_ERB_UND_SCHENKSTEUER=8;
	c_StC_natPers.m_ES_GRP_UEBRIGE=8;
	c_StC_natPers.m_ES_GRP_UEBRIGE_UEBRIGE=1;
	c_StC_natPers_ES_INFO.m_REGEL_UEBRIGE="2";
	c_StC_natPers.m_ES_GRP_EHEPARTNER=1;
	c_StC_natPers.m_ES_GRP_KINDER=3;
	c_StC_natPers.m_ES_GRP_KINDER_KINDER=1;
	c_StC_natPers.m_ES_GRP_KINDER_NACHKOMMENKINDER=2;
	c_StC_natPers.m_ES_GRP_KINDER_VOLLWAISEN=4;
	c_StC_natPers.m_ES_GRP_ELTERN=4;
	c_StC_natPers.m_ES_GRP_ELTERN_ELTERN=1;
	c_StC_natPers.m_ES_GRP_GROSSELTERN=5;
	c_StC_natPers.m_ES_GRP_GROSSELTERN_GROSSELTERN=1;
	c_StC_natPers.m_ES_GRP_GROSSELTERN_URGROSSELTERN=8;
	c_StC_natPers.m_ES_GRP_GESCHWISTER=6;
	c_StC_natPers.m_ES_GRP_GESCHWISTER_GESCHWISTER=1;
	c_StC_natPers.m_ES_GRP_ONKELTANTEN=7;
}
//${TRANSCODE_END}


//${TRANSCODEATEND_BEGIN}
if (typeof(ch) === "undefined") {
   ch = {};
}

if (typeof(ch.logismata) === "undefined") {
   ch.logismata = {};
}

if (typeof(ch.logismata.rpopulaires) === "undefined") {
   ch.logismata.rpopulaires = {};
}

if (typeof(ch.logismata.rpopulaires.modulo) === "undefined") {
    ch.logismata.rpopulaires.modulo = {


        // loadFrom:    initialise the social rules from a given path/url
        // parameter:   string:url / access (folder) to the social rule files (format .lt4 or .json)
        // result:      bool:true if successful
        loadFrom: function(path) {
           return c_API.m_loadFrom(path)
        },

        
        // isValid:     returns true if rule base was loaded successfully
        // parameter:   none
        // result:      bool:true if successful
        isValid: function() {
           return c_API.m_isValid();
        },

        
        // getStand: returns tax rule version
        // parameter:   none
        // result:      string
        getTaxBaseStand: c_API.m_getTaxBaseStand,

        
        // getStandDate: returns the tax value date
        // parameter:   none
        // result:      string
        getTaxBaseStandDate: c_API.m_getTaxBaseStandDate,
        
        
        // searchLocations: search for tax locations (max 50 hits)
        // parameter:   search:String   valid format is "[ZIP ] location [, canton]"
        //                              the zip is only considered when length>=2
        //              language:Int    preferred language code (0=all, 1=german, 2=ital., 3=french)
        //              country:Int     preferred country code (0=all, 756=CH only, 438=LI only)
        //
        // result:      [{ state:String, 
        //                 id:Int,
        //                 zip:Int,
        //                 city:String,
        //                 country:Int }] 
        searchLocations: function(search, langOption, countryOption) {  
            var lang    = langOption || 0;
            var country = countryOption || 0;
            var cCalc=c_API.m_searchLocations(search, lang, country);
            var result = [];
            if (cCalc) {
                var t=cCalc.m__liststort.p_ObjectEnumerator();
                while(t.p_HasNext()){
                    var o=t.p_NextObject();
                    result.push({state:  o.p__kt(),
                                 id:     o.p__id(), 
                                 zip:    o.p__plz(), 
                                 city:   o.p__name(),
                                 country:o.p__land() 
                                });
                }
            }
            return result;
        },

        
        // getLocationInfo: get location info about location-id
        // parameter:   locationid:Int      - locationid
        // result:      { state:String, 
        //                id:Int,
        //                zip:Int,
        //                city:String,
        //                country:Int }
        getLocationInfo: function(locationid) {  
            var cCalc=c_API.m_getLocationInfo(locationid);
            var result = {};
            if (cCalc) {
                var o = cCalc.m__stort;
                result = {state:  o.p__kt(),
                          id:     o.p__id(), 
                          zip:    o.p__plz(), 
                          city:   o.p__name(),
                          country:o.p__land()
                           };
            }
            return result;
        },

        
        // getMax3aPremiumWithBVG: get the highest bound provision premium for people having a BVG contract.
        getMax3aPremiumWithBVG: function() {
      		return c_API.m_getMax3AmitBVG();
        },
        
        
        // getMax3aPremiumWithoutBVG: get the highest bound provision premium for people without BVG contract.
        getMax3aPremiumWithoutBVG: function() {
      		return c_API.m_getMax3AohneBVG();
        },


        // calcSparenJSON: calculate 3a savings with tax benefits. Input and output are JSON structures.
        // Input (data):
        //      year:Int            current year
        //      union:Int           1:none, 2:married, 3:cohabiting
        //      gender:Int          1:male, 2:female
        //      age:Int             current age
        //      children:Int        number of children in scolarity
        //      income:Float        gross income
        //      is_empl:Bool        is employed
        //      has_bvg:Bool        has a second pillar bvg
        //      locality:Int        tax locality id
        //      premium:Float       monthly investment
        //      interest:Float      interest in percent
        // Output:
        //      deposit_sum:Float     accumulated premium (without interest)
        //      yield_sum:Float       accumulated interests
        //      tax_gain_sum: Float   sum of all yearly tax reductions
        //      capital_gross:Float   capital before tax
        //      capital_tax:Float     unique capital tax
        //      capital_net:Float     end capital after taxes
        //      yield_net:Float       return of investment after taxes, in percent     
        //      duration:Int          duration in years of the saving part
        calcSparenJSON: function(data) {
            var v = c_API.m_calcSparenJSON(data);
            var result = JSON.stringify(
                {
                    deposit_sum:   v[0],                
                    yield_sum:     v[1],                
                    tax_gain_sum:  v[2],                
                    capital_gross: v[3],                
                    capital_tax:   v[4],                
                    capital_net:   v[5],                
                    yield_net:     v[6],                
                    duration:      v[7]                
                });
            return result;
        },


        // calcRisikoJSON: calculate pillar 1 and 2 benefits in case of disability and death. Input and output are JSON structures.
        // Input (data):
        //      year:Int            current year
        //      union:Int           1:none, 2:married, 3:cohabiting
        //      gender:Int          1:male, 2:female
        //      age:Int             current age
        //      children:Int        number of children in scolarity
        //      income:Float        gross income
        //      is_empl:Bool        is employed
        //      has_bvg:Bool        has a second pillar bvg
        //      need_disab:Float    need as yearly amount (not percent)
        //      need_death:Float    need as yearly amount (not percent)
        // Output:
        //      disab_iv:Float      pension from the first pillar (IV)
        //      disab_bvg:Float     pension from the second pillar (BVG)
        //      disab_sum:Float     sum of both pensions
        //      disab_miss:Float    missing yearly amount (need - pensions)
        //      death_ahv:Float     same as above but for the death case
        //      death_bvg:Float
        //      death_sum:Float
        //      death_miss:Float
        calcRisikoJSON: function(data) {
            var v = c_API.m_calcRisikoJSON(data);
            var result = JSON.stringify(
                {
                    disab_iv:   v[0],
                    disab_bvg:  v[1],
                    disab_sum:  v[2],
                    disab_miss: v[3],
                    death_ahv:  v[4],
                    death_bvg:  v[5],
                    death_sum:  v[6],
                    death_miss: v[7]
                });
            return result;
        }
        
    };  // ch.logismata.rpopulaires.modulo
   
    // initialise the package environment
    bbInit();
}

})();
        
//${TRANSCODEATEND_END}

