
//${TRANSCODEATSTART_BEGIN}
var ch;
(function() {
//${TRANSCODEATSTART_END}


//${CONFIG_BEGIN}
var CFG_CD="";
var CFG_COMPILERVARS="PKGVERS=1.10.2;TAXMINVERS=24.0.0;TAXMAXVERS=25.2.0";
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

function c_API(){
	Object.call(this);
}
c_API.m_loadFrom=function(t_sPath){
	return c_StRWLoader.m_loadFrom(t_sPath);
}
c_API.m_loadFromURL=function(t_sPath){
	return c_StRWLoader.m_loadFromURL(t_sPath);
}
c_API.m_isValid=function(){
	return c_StRWLoader.m_isValid();
}
c_API.m_calcExpression=function(t_s,t_throwException,t_decDelim,t_grpDelim){
	if(t_decDelim.length==1 && t_grpDelim.length==1){
		return bb_evalexpression_evalExpression(t_s,t_throwException,t_decDelim.charCodeAt(0),t_grpDelim.charCodeAt(0),4);
	}
	return bb_evalexpression_evalExpression(t_s,t_throwException,-1,-1,4);
}
c_API.m_roundValue=function(t_v){
	return bb_utils_roundRelative(t_v);
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
c_API.m_searchLocationsAround=function(t_lat,t_lng,t_topN,t_lang,t_country){
	if(c_StRWLoader.m_isValid()){
		var t_cCalc=c_StC_natPers_BasisRechner.m_new2.call(new c_StC_natPers_BasisRechner,c_StRWLoader.m__current_rw);
		t_cCalc.p_searchSteuerortNearBy(t_lat,t_lng,10.0,t_lang,t_country,t_topN);
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
c_API.m_calcGrossIncome=function(t_kanton,t_ortid,t_alter,t_zivil,t_konf,t_kinder,t_taxinc,t_isempl){
	if(c_StRWLoader.m_isValid()){
		var t_ktid=c_StR_common.m_Kanton_CH;
		if(t_kanton){
			var t_calc=c_StC_natPers_BasisRechner.m_new2.call(new c_StC_natPers_BasisRechner,c_StRWLoader.m__current_rw);
			if(t_calc.p_loadSteuerort2(t_ortid)){
				t_ktid=t_calc.m__stort.p__ktid();
			}
		}
		var t_mvaEK=c_StMiniVAEvalEK.m_new.call(new c_StMiniVAEvalEK,c_StRWLoader.m__current_rw,t_ktid,0);
		return (t_mvaEK.p_berechneBruttoEK(((t_taxinc)|0),t_isempl,t_alter,t_zivil,t_kinder));
	}
	return 0.0;
}
c_API.m_calcTaxableFortune=function(t_ortid,t_alter,t_zivil,t_kinder,t_grossfortune){
	if(c_StRWLoader.m_isValid()){
		var t_ktid=0;
		var t_calc=c_StC_natPers_BasisRechner.m_new2.call(new c_StC_natPers_BasisRechner,c_StRWLoader.m__current_rw);
		if(t_calc.p_loadSteuerort2(t_ortid)){
			t_ktid=t_calc.m__stort.p__ktid();
		}
		var t_mvaVM=c_StMiniVAEvalVM.m_new.call(new c_StMiniVAEvalVM,c_StRWLoader.m__current_rw,t_ktid,0);
		return (t_mvaVM.p_berechneStbVM(((t_grossfortune)|0),t_alter,t_zivil,t_kinder));
	}
	return 0.0;
}
c_API.m_calcGrossFortune=function(t_ortid,t_alter,t_zivil,t_kinder,t_taxfortune){
	if(c_StRWLoader.m_isValid()){
		var t_ktid=0;
		var t_calc=c_StC_natPers_BasisRechner.m_new2.call(new c_StC_natPers_BasisRechner,c_StRWLoader.m__current_rw);
		if(t_calc.p_loadSteuerort2(t_ortid)){
			t_ktid=t_calc.m__stort.p__ktid();
		}
		var t_mvaVM=c_StMiniVAEvalVM.m_new.call(new c_StMiniVAEvalVM,c_StRWLoader.m__current_rw,t_ktid,0);
		return (t_mvaVM.p_berechneNettoVM(((t_taxfortune)|0),t_alter,t_zivil,t_kinder));
	}
	return 0.0;
}
c_API.m_calcNetIncome=function(t_bruttoek,t_alter,t_land){
	if(t_land==756){
		return (c_StMiniVAEvalEK.m_NLohn2_CH(((t_bruttoek)|0),t_alter));
	}
	if(t_land==438){
		return (c_StMiniVAEvalEK.m_NLohn2_LI((t_bruttoek)|0));
	}
	return t_bruttoek;
}
c_API.m_calcGrossIncomeFromNetIncome=function(t_nettoek,t_alter,t_land){
	var t_tmpNetInc=t_nettoek;
	var t_bruttoek=100000.0;
	if(t_land==756){
		t_tmpNetInc=(c_StMiniVAEvalEK.m_NLohn2_CH(((t_bruttoek)|0),t_alter));
	}
	if(t_land==438){
		t_tmpNetInc=(c_StMiniVAEvalEK.m_NLohn2_LI((t_bruttoek)|0));
	}
	if(t_tmpNetInc>0.0){
		return bb_utils_round(t_nettoek*100000.0/t_tmpNetInc);
	}
	return t_nettoek;
}
c_API.m_calcIncomeTax=function(t_ortid,t_alter,t_zivil,t_konf,t_kinder,t_einkommentyp,t_einkommen,t_vermoegen,t_s3asparen,t_ekdiff,t_vmdiff){
	var t_o=c_EinkommensVermoegensSteuer.m_new.call(new c_EinkommensVermoegensSteuer);
	t_o.p_berechne2(t_ortid,t_alter,t_zivil,t_konf,t_kinder,t_einkommentyp,t_einkommen,t_vermoegen,t_s3asparen,t_ekdiff,t_vmdiff,0.0);
	return t_o;
}
c_API.m_calcCapitalTax=function(t_ortid,t_zivil,t_konf,t_kinder,t_sex,t_ealter,t_year,t_capital,t_accountno){
	var t_o=c_KapitalleistungsSteuer.m_new.call(new c_KapitalleistungsSteuer);
	t_o.p_berechne5(t_ortid,t_zivil,t_konf,t_kinder,t_sex,t_ealter,t_year,t_capital,t_accountno);
	return [t_o.m__tot,t_o.m__proz];
}
c_API.m_calcSimpleHouseCosts=function(t_customizing,t_roundvalues,t_totalcosts,t_housecosts,t_owncapital,t_owncapital_hard,t_addassets,t_addassets_from_p2,t_income,t_morecosts,t_moreearnings,t_interest_m1,t_interest_m2,t_asForPension){
	var t_wk=c_Wohnkosten.m_getInstanceFor(t_customizing);
	var t_res=null;
	t_res=t_wk.p_berechne7(t_totalcosts,t_housecosts,t_owncapital,t_owncapital_hard,t_addassets,t_addassets_from_p2,t_income,t_morecosts,t_moreearnings,t_interest_m1,t_interest_m2,0.0,t_asForPension);
	t_res.p_runden2(t_customizing);
	return t_res;
}
c_API.m_calcMatchingHousevalueByIncome=function(t_customizing,t_max_cost_rate,t_income,t_addassets,t_addassets_from_p2,t_morecosts,t_moreearnings,t_interest_m1,t_interest_m2){
	var t_analyzer=c_Tragbarkeit_Analyzer.m_getInstanceFor(t_customizing);
	t_analyzer.m__zusatzsicherheiten_total=t_addassets;
	t_analyzer.m__zusatzsicherheiten_aus_s2=t_addassets_from_p2;
	t_analyzer.m__zusatzkosten=t_morecosts;
	t_analyzer.m__zusatzertrag=t_moreearnings;
	t_analyzer.m__zins_h1=t_interest_m1;
	t_analyzer.m__zins_h2=t_interest_m2;
	t_analyzer.m__einmalige_amo=0.0;
	t_analyzer.m__sicht_im_alter=false;
	return t_analyzer.p_berechneObjektwertAnhandEinkommen(t_income,t_max_cost_rate);
}
c_API.m_calcMatchingHousevalueByRentalCost=function(t_customizing,t_rentalcost,t_addassets,t_addassets_from_p2,t_morecosts,t_moreearnings,t_interest_m1,t_interest_m2){
	var t_analyzer=c_Tragbarkeit_Analyzer.m_getInstanceFor(t_customizing);
	t_analyzer.m__zusatzsicherheiten_total=t_addassets;
	t_analyzer.m__zusatzsicherheiten_aus_s2=t_addassets_from_p2;
	t_analyzer.m__zusatzkosten=t_morecosts;
	t_analyzer.m__zusatzertrag=t_moreearnings;
	t_analyzer.m__zins_h1=t_interest_m1;
	t_analyzer.m__zins_h2=t_interest_m2;
	t_analyzer.m__einmalige_amo=0.0;
	t_analyzer.m__sicht_im_alter=false;
	return t_analyzer.p_berechneObjektwertAnhandMiete(t_rentalcost);
}
c_API.m_calcMissingCapitalForAffordability=function(t_customizing,t_costrate,t_totalcosts,t_housecosts,t_owncapital,t_owncapital_hard,t_addassets,t_addassets_from_p2,t_income,t_morecosts,t_moreearnings,t_interest_m1,t_interest_m2,t_asForPension){
	var t_analyzer=c_Tragbarkeit_Analyzer.m_getInstanceFor(t_customizing);
	t_analyzer.m__gesamtkosten=t_totalcosts;
	t_analyzer.m__objektwert=t_housecosts;
	t_analyzer.m__eigenmittel=t_owncapital;
	t_analyzer.m__harte_eigenmittel=t_owncapital_hard;
	t_analyzer.m__zusatzsicherheiten_total=t_addassets;
	t_analyzer.m__zusatzsicherheiten_aus_s2=t_addassets_from_p2;
	t_analyzer.m__massgeinkommen=t_income;
	t_analyzer.m__zusatzkosten=t_morecosts;
	t_analyzer.m__zusatzertrag=t_moreearnings;
	t_analyzer.m__zins_h1=t_interest_m1;
	t_analyzer.m__zins_h2=t_interest_m2;
	t_analyzer.m__einmalige_amo=0.0;
	t_analyzer.m__sicht_im_alter=t_asForPension;
	return t_analyzer.p_fehlendeEigenmittel(t_costrate);
}
c_API.m_updateAllMortgagesAndConditions=function(t_customizing,t_children,t_mortgageJSON){
	var t_sokos=c_Sonderkonditionen.m_getInstanceFor(t_customizing);
	var t_allehypos=c_Hypotheken.m_new.call(new c_Hypotheken);
	t_allehypos.p_fromJson2(t_mortgageJSON);
	t_sokos.p_verifyHypotheken(t_children,t_allehypos);
	t_allehypos.p_prepareZeitraum(1);
	t_allehypos.p_runden3();
	return t_allehypos;
}
c_API.m_updateAllMortgagesWithAutoConditions=function(t_customizing,t_children,t_mortgageJSON,t_allowed_conditions){
	var t_sokos=c_Sonderkonditionen.m_getInstanceFor(t_customizing);
	var t_allehypos=c_Hypotheken.m_new.call(new c_Hypotheken);
	t_allehypos.p_fromJson2(t_mortgageJSON);
	t_sokos.p_dropAndAutoConditions(t_children,t_allehypos,t_allowed_conditions);
	t_allehypos.p_prepareZeitraum(1);
	t_allehypos.p_runden3();
	return t_allehypos;
}
c_API.m_calcEffectiveHouseCosts=function(t_customizing,t_roundvalues,t_children,t_totalcosts,t_housecosts,t_owncapital,t_owncapital_hard,t_addassets,t_addassets_from_p2,t_income,t_morecosts,t_moreearnings,t_amoismanual,t_amoamount,t_mortgageJSON){
	var t_wk=c_EffektiveWohnkosten.m_getInstanceFor(t_customizing);
	var t_res=null;
	t_res=t_wk.p_berechne9(t_children,t_totalcosts,t_housecosts,t_owncapital,t_owncapital_hard,t_addassets,t_addassets_from_p2,t_income,t_morecosts,t_moreearnings,t_amoismanual,t_amoamount,t_mortgageJSON,1);
	t_res.p_runden2(t_customizing);
	return (t_res);
}
c_API.m_calcDirectAmortization=function(t_customizing,t_taxbaseJSON,t_amogoal,t_duration,t_amoisdet,t_rentalval,t_maintcosts,t_newmortgages,t_mortgageJSON){
	var t_amo=c_DirekteAmortisation.m_getInstanceFor(t_customizing);
	var t_res=null;
	t_res=t_amo.p_berechne10(t_taxbaseJSON,t_amogoal,t_duration,t_amoisdet,t_rentalval,t_maintcosts,t_newmortgages,t_mortgageJSON);
	t_res.p_runden2(t_customizing);
	return t_res;
}
c_API.m_calcDirectAmortizationJSON=function(t_customizing,t_taxbaseObjJSON,t_dataObjJSON){
	var t_amo=c_DirekteAmortisation.m_getInstanceFor(t_customizing);
	var t_res=c_DirekteAmortisationResultat.m_new.call(new c_DirekteAmortisationResultat);
	try{
		var t_js=c_JsonObject.m_new3.call(new c_JsonObject,t_dataObjJSON);
		var t_amogoal=c_JSonHelper.m_F(t_js,"amortization_goal");
		var t_duration=c_JSonHelper.m_I(t_js,"duration");
		var t_amoisdet=c_JSonHelper.m_B(t_js,"has_detailed_amortization");
		var t_rentalval=c_JSonHelper.m_F(t_js,"rental_value");
		var t_maintcosts=c_JSonHelper.m_F(t_js,"maintenance_costs");
		var t_newmortgages=c_JSonHelper.m_B(t_js,"new_mortgages");
		var t_mortgageJSON="{}";
		if(c_JSonHelper.m_hasValue(t_js,"mortgages")){
			var t_a=object_downcast((t_js.p_Get("mortgages",null)),c_JsonArray);
			if(t_a!=null){
				var t_jsMortgage=c_JsonObject.m_new.call(new c_JsonObject);
				t_jsMortgage.p_Set("mortgages",(t_a));
				t_mortgageJSON=t_jsMortgage.p_ToJson();
			}
		}
		var t_taxbaseJSON="{}";
		var t_jsTaxbase=c_JsonObject.m_new.call(new c_JsonObject);
		t_jsTaxbase.p_Set("taxbase",(c_JsonObject.m_new3.call(new c_JsonObject,t_taxbaseObjJSON)));
		t_taxbaseJSON=t_jsTaxbase.p_ToJson();
		t_res=t_amo.p_berechne10(t_taxbaseJSON,t_amogoal,t_duration,t_amoisdet,t_rentalval,t_maintcosts,t_newmortgages,t_mortgageJSON);
		t_res.p_runden2(t_customizing);
	}catch(_eek_){
		if(t_ex=object_downcast(_eek_,c_JsonError)){
		}else{
			throw _eek_;
		}
	}
	return t_res;
}
c_API.m_calcIndirectAmortization=function(t_customizing,t_taxbaseJSON,t_amogoal,t_duration,t_savingtyp,t_savingrate,t_savingman,t_saveingval,t_rentalval,t_maintcosts,t_newmortgages,t_mortgageJSON){
	var t_amo=c_IndirekteAmortisation.m_getInstanceFor(t_customizing);
	var t_res=null;
	t_res=t_amo.p_berechne11(t_taxbaseJSON,t_amogoal,t_duration,t_savingtyp,t_savingrate,t_savingman,t_saveingval,t_rentalval,t_maintcosts,t_newmortgages,t_mortgageJSON);
	t_res.p_runden2(t_customizing);
	return t_res;
}
c_API.m_calcIndirectAmortizationJSON=function(t_customizing,t_taxbaseObjJSON,t_dataObjJSON){
	var t_amo=c_IndirekteAmortisation.m_getInstanceFor(t_customizing);
	var t_res=c_IndirekteAmortisationResultat.m_new.call(new c_IndirekteAmortisationResultat);
	try{
		var t_js=c_JsonObject.m_new3.call(new c_JsonObject,t_dataObjJSON);
		var t_amogoal=c_JSonHelper.m_F(t_js,"amortization_goal");
		var t_duration=c_JSonHelper.m_I(t_js,"duration");
		var t_savingtyp=c_JSonHelper.m_I(t_js,"saving_type");
		var t_savingrate=c_JSonHelper.m_F(t_js,"saving_interestrate");
		var t_savingman=c_JSonHelper.m_B(t_js,"saving_amount_manual");
		var t_saveingval=c_JSonHelper.m_F(t_js,"saving_amount");
		var t_rentalval=c_JSonHelper.m_F(t_js,"rental_value");
		var t_maintcosts=c_JSonHelper.m_F(t_js,"maintenance_costs");
		var t_newmortgages=c_JSonHelper.m_B(t_js,"new_mortgages");
		var t_mortgageJSON="{}";
		if(c_JSonHelper.m_hasValue(t_js,"mortgages")){
			var t_a=object_downcast((t_js.p_Get("mortgages",null)),c_JsonArray);
			if(t_a!=null){
				var t_jsMortgage=c_JsonObject.m_new.call(new c_JsonObject);
				t_jsMortgage.p_Set("mortgages",(t_a));
				t_mortgageJSON=t_jsMortgage.p_ToJson();
			}
		}
		var t_taxbaseJSON="{}";
		var t_jsTaxbase=c_JsonObject.m_new.call(new c_JsonObject);
		t_jsTaxbase.p_Set("taxbase",(c_JsonObject.m_new3.call(new c_JsonObject,t_taxbaseObjJSON)));
		t_taxbaseJSON=t_jsTaxbase.p_ToJson();
		t_res=t_amo.p_berechne11(t_taxbaseJSON,t_amogoal,t_duration,t_savingtyp,t_savingrate,t_savingman,t_saveingval,t_rentalval,t_maintcosts,t_newmortgages,t_mortgageJSON);
		t_res.p_runden2(t_customizing);
	}catch(_eek_){
		if(t_ex=object_downcast(_eek_,c_JsonError)){
		}else{
			throw _eek_;
		}
	}
	return t_res;
}
c_API.m_calcMatchingHousevalueByTotalMortgagesAmount=function(t_customizing,t_totalMortgagesAmount,t_interest_m1,t_interest_m2){
	var t_wk=c_Wohnkosten.m_getInstanceFor(t_customizing);
	var t_res=null;
	t_res=t_wk.p_berechne8(t_totalMortgagesAmount,0.0,t_interest_m1,t_interest_m2);
	t_res.p_runden2(t_customizing);
	return t_res;
}
c_API.m_calcSimpleSaving=function(t_invest,t_periodical,t_mon,t_duration,t_rate){
	var t_o=c_EinfachesKontoSparen.m_new.call(new c_EinfachesKontoSparen);
	return t_o.p_berechneEndkapital2((t_invest),(t_periodical),t_mon,t_duration,t_rate,true);
}
c_API.m_calcSimpleSavingInvest=function(t_invest,t_mon,t_duration,t_rate,t_endvalue){
	var t_o=c_EinfachesKontoSparen.m_new.call(new c_EinfachesKontoSparen);
	return t_o.p_berechneEinlage((t_invest),t_mon,t_duration,t_rate,(t_endvalue),true);
}
c_API.m_calcSimpleSavingDuration=function(t_invest,t_periodical,t_mon,t_rate,t_endvalue){
	var t_o=c_EinfachesKontoSparen.m_new.call(new c_EinfachesKontoSparen);
	return t_o.p_berechneDauer((t_invest),(t_periodical),t_mon,t_rate,(t_endvalue),true);
}
c_API.m_calcSaving=function(t_customizing,t_calculationType,t_dataJSON){
	var t_o=c_SparRechner.m_getInstanceFor(t_customizing);
	return t_o.p_berechne12(t_calculationType,t_dataJSON,true);
}
c_API.m_calcS3aSaving=function(t_ortid,t_zivil,t_konf,t_kinder,t_stbekkt,t_stbekbund,t_einlage,t_dauer,t_rendite,t_sex,t_ealter,t_year,t_accountno,t_initialinvest){
	var t_o=c_S3aSparen.m_new.call(new c_S3aSparen);
	t_o.p_berechne13(t_ortid,t_zivil,t_konf,t_kinder,t_stbekkt,t_stbekbund,t_einlage,t_dauer,t_rendite,t_sex,t_ealter,t_year,t_accountno,t_initialinvest);
	return t_o;
}
c_API.m_calcS2BuyIn=function(t_ortid,t_alter,t_zivil,t_konf,t_kinder,t_sex,t_einkommentyp,t_einkommen,t_bvgeinkauf,t_split,t_rendite,t_umwsatz){
	var t_o=c_BVGEinkauf.m_new.call(new c_BVGEinkauf);
	t_o.p_berechne14(t_ortid,t_alter,t_zivil,t_konf,t_kinder,t_sex,t_einkommentyp,t_einkommen,t_bvgeinkauf,t_split,t_rendite,t_umwsatz);
	return t_o;
}
c_API.m_calcInheritanceEstate=function(t_gueterstand,t_totalfortune,t_own_survived,t_own_deceased){
	var t_n=c_NachlassVermoegenRechner.m_new.call(new c_NachlassVermoegenRechner);
	return t_n.p_berechne15(t_gueterstand,t_totalfortune,t_own_survived,t_own_deceased);
}
c_API.m_calcInheritance=function(t_amount,t_locationid,t_inheritorsJSON,t_with_freeassigned_amount,t_country){
	var t_n=c_NachlassRechner.m_getInstanceFor(t_country);
	t_n.p_ladeErben(t_inheritorsJSON);
	var t_nachGesetz=t_with_freeassigned_amount==false;
	t_n.p_verteileNachlass(t_amount,t_nachGesetz,t_locationid);
	return t_n;
}
c_API.m_calcWithdrawalEndCapital=function(t_capital,t_withdrawal,t_mon,t_duration,t_yield){
	var t_br=c_BezugsRechner.m_getInstanceFor("");
	return t_br.p_berechneEndkapital2(t_capital,t_withdrawal,t_mon,t_duration,t_yield,true);
}
c_API.m_calcWithdrawalAmount=function(t_capital,t_mon,t_duration,t_yield,t_endcapital){
	var t_br=c_BezugsRechner.m_getInstanceFor("");
	return t_br.p_berechneBezug2(t_capital,t_mon,t_duration,t_yield,t_endcapital,true);
}
c_API.m_calcWithdrawalDuration=function(t_capital,t_withdrawal,t_mon,t_yield,t_endcapital){
	var t_br=c_BezugsRechner.m_getInstanceFor("");
	return t_br.p_berechneDauer(t_capital,t_withdrawal,t_mon,t_yield,t_endcapital,true);
}
c_API.m_calcWithdrawal=function(t_customizing,t_withdrawalType,t_dataJSON){
	var t_br=c_BezugsRechner.m_getInstanceFor(t_customizing);
	return t_br.p_berechne12(t_withdrawalType,t_dataJSON,true);
}
c_API.m_calcFreeAvailableFortune=function(t_startyear,t_duration,t_liqreserve,t_startvalue,t_interest,t_neg_interest,t_saving,t_changesJSON){
	var t_r=c_EinfachesFreiVerfuegbaresVM.m_new.call(new c_EinfachesFreiVerfuegbaresVM);
	return t_r.p_berechne17(t_startyear,t_duration,t_liqreserve,t_startvalue,t_interest,t_neg_interest,t_saving,t_changesJSON,true);
}
c_API.m_initPrototypes=function(){
	var t_i=0;
	if(t_i==1){
		c_API.m_loadFrom("");
		c_API.m_loadFromURL("");
		c_API.m_isValid();
		c_API.m_calcExpression("",false,"","");
		c_API.m_roundValue(0.0);
		c_API.m_getTaxBaseStand();
		c_API.m_getTaxBaseStandDate();
		c_API.m_searchLocations("",0,0);
		c_API.m_searchLocationsAround(0.0,0.0,0,0,0);
		c_API.m_getLocationInfo(0);
		c_API.m_calcTaxableIncome(true,0,0,0,0,0,0.0,true);
		c_API.m_calcGrossIncome(true,0,0,0,0,0,0.0,true);
		c_API.m_calcTaxableFortune(0,0,0,0,0.0);
		c_API.m_calcGrossFortune(0,0,0,0,0.0);
		c_API.m_calcNetIncome(0.0,0,0);
		c_API.m_calcGrossIncomeFromNetIncome(0.0,0,0);
		c_API.m_calcIncomeTax(0,0,0,0,0,0,0.0,0.0,0.0,0.0,0.0);
		c_API.m_calcCapitalTax(0,0,0,0,0,0,0,0.0,0);
		var t_cCalc=c_StC_natPers_BasisRechner.m_new2.call(new c_StC_natPers_BasisRechner,c_StRWLoader.m__current_rw);
		t_cCalc.p_loadSteuerort2(0);
		t_cCalc.p_searchSteuerort("",0,0,0);
		t_cCalc.p_searchSteuerortNearBy(0.0,0.0,0.0,0,0,0);
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
		c_API.m_calcSimpleHouseCosts("",false,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,false);
		c_API.m_calcMatchingHousevalueByIncome("",0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0);
		c_API.m_calcMatchingHousevalueByRentalCost("",0.0,0.0,0.0,0.0,0.0,0.0,0.0);
		c_API.m_calcMissingCapitalForAffordability("",0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,false);
		c_API.m_updateAllMortgagesAndConditions("",0,"");
		c_API.m_updateAllMortgagesWithAutoConditions("",0,"","");
		c_API.m_calcEffectiveHouseCosts("",false,0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,false,0.0,"");
		c_API.m_calcDirectAmortization("","",0.0,0,false,0.0,0.0,false,"");
		c_API.m_calcDirectAmortizationJSON("","","");
		c_API.m_calcIndirectAmortization("","",0.0,0,0,0.0,false,0.0,0.0,0.0,false,"");
		c_API.m_calcIndirectAmortizationJSON("","","");
		var t_indamores=c_IndirekteAmortisationResultat.m_new.call(new c_IndirekteAmortisationResultat);
		t_indamores.p_getBruttoKosten();
		t_indamores.p_getNettoKosten();
		c_API.m_calcMatchingHousevalueByTotalMortgagesAmount("",0.0,0.0,0.0);
		c_API.m_calcSimpleSaving(0,0,false,0,0.0);
		c_API.m_calcSimpleSavingInvest(0,false,0,0.0,0);
		c_API.m_calcSimpleSavingDuration(0,0,false,0.0,0);
		c_API.m_calcSaving("",0,"");
		c_API.m_calcS3aSaving(0,0,0,0,0.0,0.0,0,0,0.0,0,0,0,0,0);
		c_API.m_calcS2BuyIn(0,0,0,0,0,0,0,0.0,0.0,0,0.0,0.0);
		c_API.m_calcInheritanceEstate(0,0.0,0.0,0.0);
		c_API.m_calcInheritance(0.0,0,"",false,0);
		c_API.m_calcWithdrawalEndCapital(0.0,0.0,false,0,0.0);
		c_API.m_calcWithdrawalAmount(0.0,false,0,0.0,0.0);
		c_API.m_calcWithdrawalDuration(0.0,0.0,false,0.0,0.0);
		c_API.m_calcWithdrawal("",0,"");
		c_API.m_calcFreeAvailableFortune(0,0,0.0,0.0,0.0,0.0,0.0,"");
	}
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
c_JsonObject.prototype.p_Set=function(t_key,t_value){
	this.m__data.p_Set(t_key,t_value);
}
c_JsonObject.prototype.p_GetData=function(){
	return this.m__data;
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
c_Map.prototype.p_Keys=function(){
	return c_MapKeys.m_new.call(new c_MapKeys,this);
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
c_JsonArray.prototype.p_GetInt=function(t_index){
	return this.p_Get3(t_index).p_IntValue();
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
c_Collection.prototype.p_getIndex=function(t_elt){
	for(var t_i=0;t_i<this.m__len;t_i=t_i+1){
		if(this.m__i[t_i]==t_elt){
			return t_i;
		}
	}
	return -1;
}
c_Collection.prototype.p_remove=function(t_pos){
	if(t_pos>=0 && t_pos<this.m__len){
		for(var t_i=t_pos;t_i<this.m__len-1;t_i=t_i+1){
			this.m__i[t_i]=this.m__i[t_i+1];
		}
		this.m__i[this.m__len-1]=null;
		this.m__len-=1;
	}
}
c_Collection.prototype.p_removeObject=function(t_elt){
	var t_idx=this.p_getIndex(t_elt);
	this.p_remove(t_idx);
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
c_StRKt.prototype.p_isLI=function(){
	if(this.m__id==c_StR_common.m_Kanton_LI){
		return true;
	}
	return false;
}
c_StRKt.prototype.p_isCH=function(){
	if(this.m__id!=c_StR_common.m_Kanton_LI){
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
function bb_utils_isZero(t_f,t_precision){
	var t_r=Math.pow(10.0,(-t_precision))/2.0;
	if(bb_math_Abs2(t_f)<t_r){
		return true;
	}
	return false;
}
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
function bb_utils_round2(t_x,t_factor){
	if(bb_utils_isZero(t_factor,8)){
		return t_x;
	}
	var t_f=bb_math_Abs2(t_x);
	return Math.floor(t_f/t_factor+0.5000000001)*t_factor*bb_math_Sgn2(t_x);
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
function bb_utils_roundRelative(t_x){
	var t_f=bb_math_Abs2(t_x);
	if(t_f<1000.0){
		return bb_utils_round(t_x);
	}
	if(t_f<10000.0){
		return bb_utils_round2(t_x,10.0);
	}
	if(t_f<100000.0){
		return bb_utils_round2(t_x,100.0);
	}
	if(t_f<1000000.0){
		return bb_utils_round2(t_x,1000.0);
	}
	return bb_utils_round2(t_x,10000.0);
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
c_StC_natPers_BasisRechner.prototype.p_searchSteuerortNearBy=function(t_lat,t_lng,t_maxdistKM,t_sprache,t_country,t_maxhit){
	var t_o=null;
	var t_c=null;
	var t_p=null;
	var t_iCnt=0;
	var t_dist=.0;
	var t_curPos=c_GeoPosition.m_new2.call(new c_GeoPosition,t_lat,t_lng);
	var t_localeCond=c_StCSuch.m_new.call(new c_StCSuch,this.m__strw,"",t_country);
	this.m__liststort.p_clear();
	try{
		t_iCnt=0;
		var t_=this.m__strw.m__storte.p_Values().p_ObjectEnumerator();
		while(t_.p_HasNext()){
			var t_x=t_.p_NextObject();
			t_o=object_downcast((t_x),c_StROrt);
			t_p=t_o.p_getPer(this.m__standper);
			t_dist=t_curPos.p_getDistanceKM(t_p.m__lat,t_p.m__lng);
			if(t_dist<=t_maxdistKM){
				if(t_localeCond.p_match(t_p)){
					t_c=c_StCOrt.m_new3.call(new c_StCOrt,this.m__standper,t_o,t_p,t_sprache);
					if(t_c.p_isValid()==false){
						throw c_LException.m_new.call(new c_LException,"ung\u00fcltiger Steuerort "+String(t_o.m__id)+" f\u00fcr das Jahr "+String(this.m__standper));
					}
					t_c.m__distKM=t_dist;
					if(this.p_insertUniquetSteuerort(t_c)){
						t_iCnt=t_iCnt+1;
					}
				}
			}
		}
	}catch(_eek_){
		if(t_err1=object_downcast(_eek_,c_LException)){
			c_LDebug.m_exception("StC_natPers_BasisRechner.searchSteuerortNearBy",t_err1);
		}else if(t_err2=object_downcast(_eek_,ThrowableObject)){
			c_LDebug.m_error("unknown exception in Stc_natPers_BasisRechner.searchSteuerortNearBy");
		}else{
			throw _eek_;
		}
	}
	this.m__liststort.m__sortBy=2;
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
c_StC_natPers_BasisRechner.prototype.p_removeSteuerObjekt=function(t_iID){
	this.m__stobj.p_Remove(t_iID);
	this.m__maxstobj.p_Remove(t_iID);
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
c_StC_common.m_TaxLevel_GEMEINDE=0;
c_StC_common.m_TaxLevel_KIRCHE=0;
c_StC_common.m_TaxLevel_KANTON=0;
c_StC_common.m_TaxLevel_BUND=0;
function c_StROrtPer(){
	c_RWBasis.call(this);
	this.m__abjahr=0;
	this.m__normort="";
	this.m__plz=0;
	this.m__ktid=0;
	this.m__ort="";
	this.m__lat=.0;
	this.m__lng=.0;
	this.m__bisjahr=0;
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
function c_GeoPosition(){
	Object.call(this);
	this.m__lat=.0;
	this.m__lng=.0;
}
c_GeoPosition.m_new=function(){
	this.m__lat=0.0;
	this.m__lng=0.0;
	return this;
}
c_GeoPosition.m_new2=function(t_lat,t_lng){
	this.m__lat=t_lat;
	this.m__lng=t_lng;
	return this;
}
c_GeoPosition.prototype.p_getDistanceKM=function(t_lat,t_lng){
	var t_radlatCur=this.m__lat*3.14159265/180.0;
	var t_radlngCur=this.m__lng*3.14159265/180.0;
	var t_radlatPos=t_lat*3.14159265/180.0;
	var t_radlngPos=t_lng*3.14159265/180.0;
	var t_dlat=t_radlatPos-t_radlatCur;
	var t_dlng=t_radlngPos-t_radlngCur;
	var t_a=Math.pow(Math.sin(t_dlat/2.0),2.0)+Math.cos(t_radlatCur)*Math.cos(t_radlatPos)*Math.pow(Math.sin(t_dlng/2.0),2.0);
	var t_c=2.0*Math.atan2(Math.sqrt(t_a),Math.sqrt(1.0-t_a));
	return t_c*6373.0;
}
c_GeoPosition.prototype.p_getDistanceKM2=function(t_pos){
	return this.p_getDistanceKM(t_pos.m__lat,t_pos.m__lng);
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
	this.m__sex=0;
	this.m__stbEkBund=.0;
	this.m__satzbEkBund=.0;
	this.m__stbEkKt=.0;
	this.m__satzbEkKt=.0;
	this.m__stbEkGmd=.0;
	this.m__satzbEkGmd=.0;
	this.m__stbVmKt=.0;
	this.m__satzbVmKt=.0;
	this.m__konf1=0;
	this.m__kap=c_IntMap3.m_new.call(new c_IntMap3);
	this.m__es_gruppe=0;
	this.m__es_beguenstigter=0;
	this.m__es_summe=.0;
	this.m__es_satzbestimmend=.0;
	this.m__rentensatz=.0;
	this.m__bQualDivAnteil=false;
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
c_StC_natPers_Grundlage.prototype.p_removeKapital=function(t_cKap){
	if(t_cKap!=null){
		this.m__kap.p_Remove(t_cKap.p_getUID());
	}
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
c_StC_natPers.m_Zivilstand_LEDIG=0;
c_StC_natPers.m_Zivilstand_GESCHIEDEN=0;
c_StC_natPers.m_Zivilstand_VERWITET=0;
c_StC_natPers.m_Zivilstand_LEDIGALLEIN=0;
c_StC_natPers.m_Zivilstand_EINGETR_PARTNERSCHAFT=0;
c_StC_natPers.m_Zivilstand_VERHEIRATET=0;
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
c_StC_natPers.m_ES_GRP_GROSSELTERN=0;
c_StC_natPers.m_ES_GRP_ELTERN=0;
c_StC_natPers.m_ES_GRP_ONKELTANTEN=0;
c_StC_natPers.m_ES_GRP_EHEPARTNER=0;
c_StC_natPers.m_ES_GRP_GESCHWISTER=0;
c_StC_natPers.m_ES_GRP_KINDER=0;
c_StC_natPers.m_ES_GRP_PARTNER=0;
c_StC_natPers.m_ES_GRP_UNDEF=0;
c_StC_natPers.m_ES_GRP_UEBRIGE=0;
c_StC_natPers.m_ES_GRP_GROSSELTERN_GROSSELTERN=0;
c_StC_natPers.m_ES_GRP_ELTERN_ELTERN=0;
c_StC_natPers.m_ES_GRP_ONKELTANTEN_ONKEL=0;
c_StC_natPers.m_ES_GRP_EHEPARTNER_EHEPARTNER=0;
c_StC_natPers.m_ES_GRP_GESCHWISTER_GESCHWISTER=0;
c_StC_natPers.m_ES_GRP_ONKELTANTEN_COUSIN=0;
c_StC_natPers.m_ES_GRP_ONKELTANTEN_NEFFEN=0;
c_StC_natPers.m_ES_GRP_KINDER_KINDER=0;
c_StC_natPers.m_ES_GRP_KINDER_NACHKOMMENKINDER=0;
c_StC_natPers.m_ES_GRP_PARTNER_LEBENSPARTNER=0;
c_StC_natPers.m_CalcTyp_ERB_UND_SCHENKSTEUER=0;
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
c_StC_natPers.m_ES_GRP_UEBRIGE_UEBRIGE=0;
c_StC_natPers.m_ES_GRP_KINDER_VOLLWAISEN=0;
c_StC_natPers.m_ES_GRP_GROSSELTERN_URGROSSELTERN=0;
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
c_Map4.prototype.p_DeleteFixup=function(t_node,t_parent){
	while(t_node!=this.m_root && (!((t_node)!=null) || t_node.m_color==1)){
		if(t_node==t_parent.m_left){
			var t_sib=t_parent.m_right;
			if(t_sib.m_color==-1){
				t_sib.m_color=1;
				t_parent.m_color=-1;
				this.p_RotateLeft4(t_parent);
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
					this.p_RotateRight4(t_sib);
					t_sib=t_parent.m_right;
				}
				t_sib.m_color=t_parent.m_color;
				t_parent.m_color=1;
				t_sib.m_right.m_color=1;
				this.p_RotateLeft4(t_parent);
				t_node=this.m_root;
			}
		}else{
			var t_sib2=t_parent.m_left;
			if(t_sib2.m_color==-1){
				t_sib2.m_color=1;
				t_parent.m_color=-1;
				this.p_RotateRight4(t_parent);
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
					this.p_RotateLeft4(t_sib2);
					t_sib2=t_parent.m_left;
				}
				t_sib2.m_color=t_parent.m_color;
				t_parent.m_color=1;
				t_sib2.m_left.m_color=1;
				this.p_RotateRight4(t_parent);
				t_node=this.m_root;
			}
		}
	}
	if((t_node)!=null){
		t_node.m_color=1;
	}
	return 0;
}
c_Map4.prototype.p_RemoveNode=function(t_node){
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
c_Map4.prototype.p_Remove=function(t_key){
	var t_node=this.p_FindNode2(t_key);
	if(!((t_node)!=null)){
		return 0;
	}
	this.p_RemoveNode(t_node);
	return 1;
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
c_StMiniVAEvalEK.prototype.p_berechneBruttoEK=function(t_stbek,t_angestellt,t_alter,t_zivilstand,t_kinder){
	this.m__kinder=t_kinder;
	this.m__alter=t_alter;
	this.m__angestellt=t_angestellt;
	if(this.p_isValid()==false){
		return 0;
	}
	if(t_stbek<1000){
		return 0;
	}
	if(this.p_loadList(c_StR_natPers.m_CalcTyp_EK,t_angestellt,t_zivilstand,t_kinder)==false){
		return t_stbek;
	}
	var t_v=((bb_utils_round(this.p_approximate(0.0,(t_stbek),1.0,50000.0,150000.0)))|0);
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
c_StR_natPers.m_CalcTyp_VM=0;
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
function c_StMiniVAEvalVM(){
	c_StMiniVAEvalBase.call(this);
	this.m__kinder=0;
	this.m__alter=0;
}
c_StMiniVAEvalVM.prototype=extend_class(c_StMiniVAEvalBase);
c_StMiniVAEvalVM.m_new=function(t_strw,t_iKtID,t_jahr){
	c_StMiniVAEvalBase.m_new2.call(this,t_strw);
	this.p_loadKt(t_iKtID,t_jahr);
	return this;
}
c_StMiniVAEvalVM.m_new2=function(){
	c_StMiniVAEvalBase.m_new.call(this);
	return this;
}
c_StMiniVAEvalVM.prototype.p_berechneStbVM=function(t_nettovm,t_alter,t_zivilstand,t_kinder){
	this.m__kinder=t_kinder;
	this.m__alter=t_alter;
	if(this.p_isValid()==false){
		return 0;
	}
	if(t_nettovm<10000){
		return 0;
	}
	this.m__var.p_Clear();
	this.p_setVar("NETTOVM",String(t_nettovm));
	this.p_setVar("ANZKINDER",String(t_kinder));
	this.p_setVar("ALTER",String(t_alter));
	if(this.p_loadList(c_StR_natPers.m_CalcTyp_VM,false,t_zivilstand,t_kinder)==false){
		return t_nettovm;
	}
	this.p_runMVA();
	var t_v=this.p_getVarAsInt("STBVM");
	return t_v;
}
c_StMiniVAEvalVM.prototype.p_berechneNettoVM=function(t_stbvm,t_alter,t_zivilstand,t_kinder){
	this.m__kinder=t_kinder;
	this.m__alter=t_alter;
	if(this.p_isValid()==false){
		return 0;
	}
	if(t_stbvm<100000){
		return 0;
	}
	if(this.p_loadList(c_StR_natPers.m_CalcTyp_VM,false,t_zivilstand,t_kinder)==false){
		return t_stbvm;
	}
	var t_v=((bb_utils_round(this.p_approximate(0.0,(t_stbvm),1.0,100000.0,2000000.0)))|0);
	return t_v;
}
c_StMiniVAEvalVM.prototype.p_sample=function(t_startval,t_guess){
	this.m__var.p_Clear();
	this.p_setVar("NETTOVM",String(t_guess));
	this.p_setVar("ANZKINDER",String(this.m__kinder));
	this.p_setVar("ALTER",String(this.m__alter));
	this.p_runMVA();
	return this.p_getVarAsFloat("STBVM");
}
function c_EinkommensVermoegensSteuer(){
	Object.call(this);
	this.m__grundlage=c_EinfacheSteuergrundlage.m_new.call(new c_EinfacheSteuergrundlage);
	this.m__nlohn2=.0;
	this.m__ekgmd=.0;
	this.m__ekchr=.0;
	this.m__ekkt=.0;
	this.m__ekbund=.0;
	this.m__vmgmd=.0;
	this.m__vmkt=.0;
	this.m__vmchr=.0;
	this.m__vm=.0;
	this.m__ps=.0;
	this.m__tot=.0;
	this.m__proz=.0;
	this.m__tfd=0;
	this.m__gst=.0;
	this.m__rundung=c_StC_common.m_Rundung_Franken;
}
c_EinkommensVermoegensSteuer.m_new=function(){
	return this;
}
c_EinkommensVermoegensSteuer.prototype.p_clear=function(){
	this.m__grundlage.p_clear();
	this.m__nlohn2=0.0;
	this.m__ekgmd=0.0;
	this.m__ekchr=0.0;
	this.m__ekkt=0.0;
	this.m__ekbund=0.0;
	this.m__vmgmd=0.0;
	this.m__vmkt=0.0;
	this.m__vmchr=0.0;
	this.m__vm=0.0;
	this.m__ps=0.0;
	this.m__tot=0.0;
	this.m__proz=0.0;
	this.m__tfd=0;
	this.m__gst=0.0;
}
c_EinkommensVermoegensSteuer.prototype.p_berechneSteuern=function(){
	if(this.m__grundlage==null){
		return;
	}
	if(this.m__grundlage.m__calc==null){
		return;
	}
	this.m__grundlage.p_setBerechnungsgrundlagen(this.m__rundung);
	var t_oEK=this.m__grundlage.m__calc.p_addSteuerObjekt(c_StC_natPers.m_CalcTyp_EINKOMMENSSTEUER);
	t_oEK.p_calculate();
	var t_oVM=this.m__grundlage.m__calc.p_addSteuerObjekt(c_StC_natPers.m_CalcTyp_VERMOEGENSSTEUER);
	t_oVM.p_calculate();
	var t_oPS=this.m__grundlage.m__calc.p_addSteuerObjekt(c_StC_natPers.m_CalcTyp_PERSONALSTEUER);
	t_oPS.p_calculate();
	this.m__grundlage.m__satzek_bund=this.m__grundlage.m__calc.m__grundlage.m__satzbEkBund;
	this.m__grundlage.m__satzek_kt=this.m__grundlage.m__calc.m__grundlage.m__satzbEkKt;
	this.m__grundlage.m__satzvm=this.m__grundlage.m__calc.m__grundlage.m__satzbVmKt;
	this.m__ekgmd=t_oEK.p_getSteuer(c_StC_common.m_TaxLevel_GEMEINDE);
	this.m__ekchr=t_oEK.p_getSteuer(c_StC_common.m_TaxLevel_KIRCHE);
	this.m__ekkt=t_oEK.p_getSteuer(c_StC_common.m_TaxLevel_KANTON);
	this.m__ekbund=t_oEK.p_getSteuer(c_StC_common.m_TaxLevel_BUND);
	this.m__vmgmd=t_oVM.p_getSteuer(c_StC_common.m_TaxLevel_GEMEINDE);
	this.m__vmkt=t_oVM.p_getSteuer(c_StC_common.m_TaxLevel_KANTON);
	this.m__vmchr=t_oVM.p_getSteuer(c_StC_common.m_TaxLevel_KIRCHE);
	this.m__vm=t_oVM.p_getGesamtsteuer();
	this.m__ps=t_oPS.p_getGesamtsteuer();
	this.m__tot=t_oEK.p_getGesamtsteuer()+this.m__vm+this.m__ps;
	if(this.m__grundlage.m__satzek_kt>0.0){
		this.m__proz=this.m__tot*100.0/this.m__grundlage.m__satzek_kt;
		this.m__proz=c_StCBasisRechner.m_runden(this.m__proz,0.1,c_StC_common.m_Runden_NORMAL);
	}
	this.m__grundlage.m__calc.p_removeSteuerObjekt(t_oEK.p_getUID());
	this.m__grundlage.m__calc.p_removeSteuerObjekt(t_oVM.p_getUID());
	this.m__grundlage.m__calc.p_removeSteuerObjekt(t_oPS.p_getUID());
}
c_EinkommensVermoegensSteuer.prototype.p_berechneTaxFreedomDay=function(){
	if(this.m__grundlage.m__bruttoek>0.0 && this.m__grundlage.m__alter>0){
		var t_mvaEK=c_StMiniVAEvalEK.m_new.call(new c_StMiniVAEvalEK,c_StRWLoader.m__current_rw,this.m__grundlage.m__ktid,0);
		this.m__nlohn2=(t_mvaEK.p_NLohn2(((this.m__grundlage.m__bruttoek)|0),this.m__grundlage.m__alter));
		if(this.m__nlohn2>0.0){
			this.m__tfd=((this.m__tot/this.m__nlohn2*365.0)|0);
			if(this.m__tfd<0){
				this.m__tfd=0;
			}
		}
	}
}
c_EinkommensVermoegensSteuer.prototype.p_berechneGST=function(){
	if(this.m__grundlage==null){
		return;
	}
	if(this.m__grundlage.m__calc==null){
		return;
	}
	var t_stVorher=.0;
	var t_stNachher=.0;
	this.m__grundlage.p_setBerechnungsgrundlagen(c_StC_common.m_Rundung_Rappen);
	var t_oEK=this.m__grundlage.m__calc.p_addSteuerObjekt(c_StC_natPers.m_CalcTyp_EINKOMMENSSTEUER);
	t_oEK.p_calculate();
	t_stVorher=t_oEK.p_getGesamtsteuer();
	this.m__grundlage.m__calc.m__grundlage.m__stbEkBund=bb_math_Max2(0.0,this.m__grundlage.m__stbek_bund+1000.0);
	if(bb_utils_isNotZero(this.m__grundlage.m__satzek_bund,0)){
		this.m__grundlage.m__calc.m__grundlage.m__satzbEkBund=bb_math_Max2(0.0,this.m__grundlage.m__satzek_bund+1000.0);
	}
	this.m__grundlage.m__calc.m__grundlage.m__stbEkGmd=bb_math_Max2(0.0,this.m__grundlage.m__stbek_kt+1000.0);
	this.m__grundlage.m__calc.m__grundlage.m__stbEkKt=bb_math_Max2(0.0,this.m__grundlage.m__stbek_kt+1000.0);
	if(bb_utils_isNotZero(this.m__grundlage.m__satzek_kt,0)){
		this.m__grundlage.m__calc.m__grundlage.m__satzbEkKt=bb_math_Max2(0.0,this.m__grundlage.m__satzek_kt+1000.0);
	}
	t_oEK.p_calculate();
	t_stNachher=t_oEK.p_getGesamtsteuer();
	this.m__gst=(t_stNachher-t_stVorher)/1000.0*100.0;
	this.m__gst=bb_utils_round2(this.m__gst,0.1);
	if(bb_utils_isLZero(this.m__gst,0)==true){
		this.m__gst=0.0;
	}
	this.m__grundlage.m__calc.p_removeSteuerObjekt(t_oEK.p_getUID());
}
c_EinkommensVermoegensSteuer.prototype.p_berechne=function(t_ortid,t_zivil,t_konf,t_kinder,t_stbek_kt,t_satzek_kt,t_stbek_bund,t_satzek_bund,t_stbvm,t_satzvm){
	this.p_clear();
	this.m__grundlage.m__ortid=t_ortid;
	this.m__grundlage.m__zivilstand=t_zivil;
	this.m__grundlage.m__konfession=t_konf;
	this.m__grundlage.m__kinder=t_kinder;
	this.m__grundlage.m__stbek_kt=t_stbek_kt;
	this.m__grundlage.m__satzek_kt=t_satzek_kt;
	this.m__grundlage.m__stbek_bund=t_stbek_bund;
	this.m__grundlage.m__satzek_bund=t_satzek_bund;
	this.m__grundlage.m__stbvm=t_stbvm;
	this.m__grundlage.m__satzek_bund=t_satzvm;
	if(this.m__grundlage.p_initializeCalc()==false){
		return;
	}
	this.p_berechneSteuern();
	this.p_berechneTaxFreedomDay();
	this.p_berechneGST();
}
c_EinkommensVermoegensSteuer.prototype.p_berechne2=function(t_ortid,t_alter,t_zivil,t_konf,t_kinder,t_einkommentyp,t_einkommen,t_vermoegen,t_s3asparen,t_ekdiff,t_vmdiff,t_bvgeinkauf){
	this.p_clear();
	this.m__grundlage.m__ortid=t_ortid;
	this.m__grundlage.m__alter=t_alter;
	this.m__grundlage.m__zivilstand=t_zivil;
	this.m__grundlage.m__konfession=t_konf;
	this.m__grundlage.m__kinder=t_kinder;
	this.m__grundlage.m__wertbasis=t_einkommentyp;
	this.m__grundlage.m__bruttoek=t_einkommen;
	this.m__grundlage.m__stbek_kt=t_einkommen;
	this.m__grundlage.m__bruttovm=t_vermoegen;
	this.m__grundlage.m__stbvm=t_vermoegen;
	if(this.m__grundlage.p_initializeCalc()==false){
		return;
	}
	this.m__grundlage.p_updateEinkommen(t_ekdiff,t_s3asparen+t_bvgeinkauf);
	this.m__grundlage.p_updateVermoegen(t_vmdiff);
	this.p_berechneSteuern();
	this.p_berechneTaxFreedomDay();
	this.p_berechneGST();
}
c_EinkommensVermoegensSteuer.prototype.p_berechne3=function(t_taxbase,t_ekdiff,t_stbekdiff,t_vmdiff){
	this.p_clear();
	this.m__grundlage=t_taxbase;
	if(this.m__grundlage.p_initializeCalc()==false){
		return;
	}
	this.m__grundlage.p_updateEinkommen(t_ekdiff,t_stbekdiff);
	this.m__grundlage.p_updateVermoegen(t_vmdiff);
	this.p_berechneSteuern();
	this.p_berechneTaxFreedomDay();
	this.p_berechneGST();
}
c_EinkommensVermoegensSteuer.prototype.p_berechne4=function(t_ortid,t_zivil,t_konf,t_konf2,t_kinder,t_stbek_kt,t_satzek_kt,t_stbek_bund,t_satzek_bund,t_stbvm,t_satzvm){
	this.p_clear();
	this.m__grundlage.m__ortid=t_ortid;
	this.m__grundlage.m__zivilstand=t_zivil;
	this.m__grundlage.m__konfession=t_konf;
	this.m__grundlage.m__konfession2=t_konf2;
	this.m__grundlage.m__anteilkonf2=0;
	this.m__grundlage.m__kinder=t_kinder;
	this.m__grundlage.m__stbek_kt=t_stbek_kt;
	this.m__grundlage.m__satzek_kt=t_satzek_kt;
	this.m__grundlage.m__stbek_bund=t_stbek_bund;
	this.m__grundlage.m__satzek_bund=t_satzek_bund;
	this.m__grundlage.m__stbvm=t_stbvm;
	if(t_konf2>0){
		this.m__grundlage.m__anteilkonf2=50;
	}
	if(this.m__grundlage.p_initializeCalc()==false){
		return;
	}
	this.p_berechneSteuern();
	this.p_berechneGST();
}
function c_EinfacheSteuergrundlage(){
	Object.call(this);
	this.m__ortid=0;
	this.m__ktid=0;
	this.m__zivilstand=0;
	this.m__konfession=0;
	this.m__konfession2=0;
	this.m__anteilkonf2=0;
	this.m__kinder=0;
	this.m__wertbasis=0;
	this.m__bruttoek=.0;
	this.m__bruttovm=.0;
	this.m__alter=0;
	this.m__sex=0;
	this.m__stbek_kt=.0;
	this.m__satzek_kt=.0;
	this.m__stbek_bund=.0;
	this.m__satzek_bund=.0;
	this.m__stbvm=.0;
	this.m__satzvm=.0;
	this.m__calc=null;
	this.m__jahr=0;
}
c_EinfacheSteuergrundlage.m_new=function(){
	return this;
}
c_EinfacheSteuergrundlage.prototype.p_clear=function(){
	this.m__ortid=0;
	this.m__ktid=0;
	this.m__zivilstand=0;
	this.m__konfession=0;
	this.m__konfession2=0;
	this.m__anteilkonf2=0;
	this.m__kinder=0;
	this.m__wertbasis=0;
	this.m__bruttoek=0.0;
	this.m__bruttovm=0.0;
	this.m__alter=0;
	this.m__sex=0;
	this.m__stbek_kt=0.0;
	this.m__satzek_kt=0.0;
	this.m__stbek_bund=0.0;
	this.m__satzek_bund=0.0;
	this.m__stbvm=0.0;
	this.m__satzvm=0.0;
}
c_EinfacheSteuergrundlage.prototype.p_initializeCalc=function(){
	if(c_StRWLoader.m_isValid()==false){
		this.m__calc=null;
		return false;
	}
	if(this.m__calc==null || this.m__calc.m__standper!=this.m__jahr){
		this.m__calc=c_StC_natPers_BasisRechner.m_new3.call(new c_StC_natPers_BasisRechner,c_StRWLoader.m__current_rw,this.m__jahr);
	}
	if(this.m__calc.m__stort==null || this.m__calc.m__stort.p__id()!=this.m__ortid){
		if(this.m__calc.p_loadSteuerort2(this.m__ortid)==false){
			this.m__calc=null;
			return false;
		}
	}
	this.m__ktid=this.m__calc.m__stort.p__ktid();
	return true;
}
c_EinfacheSteuergrundlage.prototype.p_setBerechnungsgrundlagen=function(t_rundung){
	if(this.p_initializeCalc()==false){
		return;
	}
	this.m__calc.m__rundung=t_rundung;
	this.m__calc.m__grundlage.p__zivilstand2(this.m__zivilstand);
	this.m__calc.m__grundlage.m__kinder=this.m__kinder;
	this.m__calc.m__grundlage.m__sex=this.m__sex;
	this.m__calc.m__grundlage.m__stbEkBund=this.m__stbek_bund;
	this.m__calc.m__grundlage.m__satzbEkBund=this.m__satzek_bund;
	this.m__calc.m__grundlage.m__stbEkKt=this.m__stbek_kt;
	this.m__calc.m__grundlage.m__satzbEkKt=this.m__satzek_kt;
	this.m__calc.m__grundlage.m__stbEkGmd=this.m__stbek_kt;
	this.m__calc.m__grundlage.m__satzbEkGmd=this.m__satzek_kt;
	this.m__calc.m__grundlage.m__stbVmKt=this.m__stbvm;
	this.m__calc.m__grundlage.m__satzbVmKt=this.m__satzvm;
	this.m__calc.m__grundlage.m__konf1=this.m__konfession;
	this.m__calc.m__grundlage.m__konf2=this.m__konfession2;
	this.m__calc.m__grundlage.m__anteilKonf1=100-this.m__anteilkonf2;
}
c_EinfacheSteuergrundlage.prototype.p_updateEinkommen=function(t_bruttoredukt,t_stbredukt){
	if(this.p_initializeCalc()==false){
		return;
	}
	var t_mvaKt=c_StMiniVAEvalEK.m_new.call(new c_StMiniVAEvalEK,c_StRWLoader.m__current_rw,this.m__ktid,0);
	var t_mvaCH=c_StMiniVAEvalEK.m_new.call(new c_StMiniVAEvalEK,c_StRWLoader.m__current_rw,c_StR_common.m_Kanton_CH,0);
	if(this.m__wertbasis==1){
		this.m__bruttoek=bb_math_Max2(0.0,this.m__bruttoek+t_bruttoredukt);
		this.m__stbek_kt=(t_mvaKt.p_berechneStbEK(((this.m__bruttoek)|0),true,this.m__alter,this.m__zivilstand,this.m__kinder));
		this.m__stbek_bund=(t_mvaCH.p_berechneStbEK(((this.m__bruttoek)|0),true,this.m__alter,this.m__zivilstand,this.m__kinder));
	}else{
		if(this.m__wertbasis==2){
			this.m__bruttoek=(t_mvaKt.p_berechneBruttoEK(((this.m__stbek_kt)|0),true,this.m__alter,this.m__zivilstand,this.m__kinder));
			this.m__bruttoek=bb_math_Max2(0.0,this.m__bruttoek+t_bruttoredukt);
			if(bb_utils_isZero(t_bruttoredukt,0)==false || bb_utils_isZero(this.m__stbek_kt,0)){
				this.m__stbek_kt=(t_mvaKt.p_berechneStbEK(((this.m__bruttoek)|0),true,this.m__alter,this.m__zivilstand,this.m__kinder));
			}
			if(bb_utils_isZero(t_bruttoredukt,0)==false || bb_utils_isZero(this.m__stbek_bund,0)){
				this.m__stbek_bund=(t_mvaCH.p_berechneStbEK(((this.m__bruttoek)|0),true,this.m__alter,this.m__zivilstand,this.m__kinder));
			}
		}
	}
	this.m__stbek_kt=bb_math_Max2(0.0,this.m__stbek_kt-t_stbredukt);
	this.m__stbek_bund=bb_math_Max2(0.0,this.m__stbek_bund-t_stbredukt);
}
c_EinfacheSteuergrundlage.prototype.p_updateVermoegen=function(t_bruttoredukt){
	if(this.p_initializeCalc()==false){
		return;
	}
	var t_ktid=this.m__calc.m__stort.p__ktid();
	var t_mvaVM=c_StMiniVAEvalVM.m_new.call(new c_StMiniVAEvalVM,c_StRWLoader.m__current_rw,t_ktid,0);
	if(this.m__wertbasis==1){
		this.m__bruttovm=bb_math_Max2(0.0,this.m__bruttovm+t_bruttoredukt);
		this.m__stbvm=(t_mvaVM.p_berechneStbVM(((this.m__bruttovm)|0),this.m__alter,this.m__zivilstand,this.m__kinder));
	}else{
		if(this.m__wertbasis==2){
			this.m__bruttovm=(t_mvaVM.p_berechneNettoVM(((this.m__stbvm)|0),this.m__alter,this.m__zivilstand,this.m__kinder));
			this.m__bruttovm=bb_math_Max2(0.0,this.m__bruttovm+t_bruttoredukt);
			if(bb_utils_isZero(t_bruttoredukt,0)==false || bb_utils_isZero(this.m__stbvm,0)){
				this.m__stbvm=(t_mvaVM.p_berechneStbVM(((this.m__bruttovm)|0),this.m__alter,this.m__zivilstand,this.m__kinder));
			}
		}
	}
	if(this.m__calc.m__stkt.p_isLI()){
		var t_sollErtrag=this.m__stbvm*0.04;
		this.m__stbek_kt=this.m__stbek_kt+t_sollErtrag;
	}
}
c_EinfacheSteuergrundlage.prototype.p_fromJson=function(t_o){
	this.p_clear();
	this.m__ortid=c_JSonHelper.m_I(t_o,"locationid");
	this.m__jahr=c_JSonHelper.m_I(t_o,"currentyear");
	this.m__zivilstand=c_JSonHelper.m_I(t_o,"civil");
	this.m__konfession=c_JSonHelper.m_I(t_o,"confession");
	this.m__konfession2=c_JSonHelper.m_I(t_o,"confession2");
	this.m__anteilkonf2=c_JSonHelper.m_I(t_o,"part_confession2");
	this.m__kinder=c_JSonHelper.m_I(t_o,"children");
	this.m__wertbasis=c_JSonHelper.m_I(t_o,"income_type");
	this.m__bruttoek=c_JSonHelper.m_F(t_o,"gross_income");
	this.m__bruttovm=c_JSonHelper.m_F(t_o,"gross_fortune");
	this.m__alter=c_JSonHelper.m_I(t_o,"age");
	this.m__sex=c_JSonHelper.m_I(t_o,"sex");
	this.m__stbek_kt=c_JSonHelper.m_F(t_o,"taxable_income");
	this.m__satzek_kt=c_JSonHelper.m_F(t_o,"rateable_income");
	this.m__stbek_bund=c_JSonHelper.m_F(t_o,"taxable_income_country");
	this.m__satzek_bund=c_JSonHelper.m_F(t_o,"rateable_income_country");
	this.m__stbvm=c_JSonHelper.m_F(t_o,"taxable_fortune");
	this.m__satzvm=c_JSonHelper.m_F(t_o,"rateable_fortune");
}
c_EinfacheSteuergrundlage.prototype.p_fromJson2=function(t_sJson){
	this.p_clear();
	try{
		var t_js=c_JsonObject.m_new3.call(new c_JsonObject,t_sJson);
		var t_o=object_downcast((t_js.p_Get("taxbase",null)),c_JsonObject);
		if(t_o!=null){
			this.p_fromJson(t_o);
		}
		return true;
	}catch(_eek_){
		if(t_err=object_downcast(_eek_,ThrowableObject)){
		}else{
			throw _eek_;
		}
	}
	return false;
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
c_StCStObjekt.prototype.p_getSteuer=function(t_iLvl){
	return this.m__st.p__level(t_iLvl).m__steuer;
}
c_StCStObjekt.prototype.p_getGesamtsteuer=function(){
	return this.m__st.p__level(c_StC_common.m_TaxLevel_BUND).m__steuer+this.m__st.p__level(c_StC_common.m_TaxLevel_KANTON).m__steuer+this.m__st.p__level(c_StC_common.m_TaxLevel_GEMEINDE).m__steuer+this.m__st.p__level(c_StC_common.m_TaxLevel_KIRCHE).m__steuer;
}
c_StCStObjekt.prototype.p_getGesamtsteuerKt=function(){
	return this.m__st.p__level(c_StC_common.m_TaxLevel_KANTON).m__steuer+this.m__st.p__level(c_StC_common.m_TaxLevel_GEMEINDE).m__steuer+this.m__st.p__level(c_StC_common.m_TaxLevel_KIRCHE).m__steuer;
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
c_StCStObjektES.prototype.p_getInfo=function(t_iLevel,t_iInfoTyp){
	return this.m__infos.p__level(t_iLevel).p_getInfo2(t_iInfoTyp,false);
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
function c_KapitalleistungsSteuer(){
	Object.call(this);
	this.m__grundlage=c_EinfacheSteuergrundlage.m_new.call(new c_EinfacheSteuergrundlage);
	this.m__gem=.0;
	this.m__chr=.0;
	this.m__kt=.0;
	this.m__kt_tot=.0;
	this.m__bund=.0;
	this.m__tot=.0;
	this.m__proz=.0;
	this.m__rundung=c_StC_common.m_Rundung_Franken;
}
c_KapitalleistungsSteuer.m_new=function(){
	return this;
}
c_KapitalleistungsSteuer.prototype.p_clear=function(){
	this.m__grundlage.p_clear();
	this.m__gem=0.0;
	this.m__chr=0.0;
	this.m__kt=0.0;
	this.m__kt_tot=0.0;
	this.m__bund=0.0;
	this.m__tot=0.0;
	this.m__proz=0.0;
}
c_KapitalleistungsSteuer.prototype.p_berechneSteuern2=function(t_capital,t_ealter,t_accountno){
	if(this.m__grundlage==null){
		return;
	}
	if(this.m__grundlage.m__calc==null){
		return;
	}
	this.m__grundlage.p_setBerechnungsgrundlagen(this.m__rundung);
	if(t_accountno<1){
		t_accountno=1;
	}
	if(t_accountno>5){
		t_accountno=5;
	}
	var t_oKap=this.m__grundlage.m__calc.p_addSteuerObjekt(c_StC_natPers.m_CalcTyp_STEUER_SAUELE_2A3A);
	var t_k=this.m__grundlage.m__calc.m__grundlage.p_addKapital(c_StC_natPers.m_Kapital_SAEULE_3A);
	t_k.m__stbKap=t_capital/(t_accountno);
	for(var t_i=0;t_i<t_accountno;t_i=t_i+1){
		t_k.m__endalter=t_ealter-t_i;
		t_oKap.p_calculate();
		this.m__gem=this.m__gem+t_oKap.p_getSteuer(c_StC_common.m_TaxLevel_GEMEINDE);
		this.m__chr=this.m__chr+t_oKap.p_getSteuer(c_StC_common.m_TaxLevel_KIRCHE);
		this.m__kt=this.m__kt+t_oKap.p_getSteuer(c_StC_common.m_TaxLevel_KANTON);
		this.m__kt_tot=this.m__kt_tot+t_oKap.p_getGesamtsteuerKt();
		this.m__bund=this.m__bund+t_oKap.p_getSteuer(c_StC_common.m_TaxLevel_BUND);
		this.m__tot=this.m__tot+t_oKap.p_getGesamtsteuer();
	}
	if(t_capital>0.0){
		this.m__proz=this.m__tot*100.0/t_capital;
		this.m__proz=c_StCBasisRechner.m_runden(this.m__proz,0.1,c_StC_common.m_Runden_NORMAL);
	}
	this.m__grundlage.m__calc.m__grundlage.p_removeKapital(t_k);
	this.m__grundlage.m__calc.p_removeSteuerObjekt(t_oKap.p_getUID());
}
c_KapitalleistungsSteuer.prototype.p_berechne5=function(t_ortid,t_zivil,t_konf,t_kinder,t_sex,t_ealter,t_year,t_capital,t_accountno){
	this.p_clear();
	this.m__grundlage.m__ortid=t_ortid;
	this.m__grundlage.m__jahr=t_year;
	this.m__grundlage.m__zivilstand=t_zivil;
	this.m__grundlage.m__konfession=t_konf;
	this.m__grundlage.m__kinder=t_kinder;
	this.m__grundlage.m__sex=t_sex;
	if(this.m__grundlage.p_initializeCalc()==false){
		return;
	}
	this.p_berechneSteuern2(t_capital,t_ealter,t_accountno);
}
c_KapitalleistungsSteuer.prototype.p_berechne6=function(t_taxbase,t_capital,t_ealter,t_accountno){
	this.p_clear();
	this.m__grundlage=t_taxbase;
	if(this.m__grundlage.p_initializeCalc()==false){
		return;
	}
	this.p_berechneSteuern2(t_capital,t_ealter,t_accountno);
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
function c_WohnkostenResultat(){
	Object.call(this);
	this.m__gesamtkosten=.0;
	this.m__objektwert=.0;
	this.m__zusatzsicherheiten_total=.0;
	this.m__zusatzsicher_aus_s2=.0;
	this.m__zusatzsicherheiten_belehnbar=.0;
	this.m__max_nettobelehnung=.0;
	this.m__nettobelehnung=.0;
	this.m__ueberbelehnung=.0;
	this.m__ueberbelehnung_ohne_s2=.0;
	this.m__nettobelehnungs_quote=.0;
	this.m__belehnung=.0;
	this.m__belehnung_h1=.0;
	this.m__belehnung_h2=.0;
	this.m__hat_hypo2=false;
	this.m__verschuldungs_quote=.0;
	this.m__j_zinsen_h1=.0;
	this.m__j_zinsen_h2=.0;
	this.m__eigenmittel=.0;
	this.m__fehl_eigenmittel=.0;
	this.m__eigenmittel_quote=.0;
	this.m__eigenmittel_ohne_s2_quote=.0;
	this.m__amortisation_hypo=.0;
	this.m__j_amortisation=.0;
	this.m__amortisation_total=.0;
	this.m__amortisation_ueber=.0;
	this.m__amortisation_s2=.0;
	this.m__massg_einkommen=.0;
	this.m__nebenkostensatz=.0;
	this.m__j_nebenkosten=.0;
	this.m__j_weiterekosten=.0;
	this.m__j_weitereertraege=.0;
	this.m__j_wohnkosten=.0;
	this.m__m_wohnkosten=.0;
	this.m__j_belastung_proz=.0;
	this.m__j_amortisation_manuell=false;
}
c_WohnkostenResultat.m_new=function(){
	return this;
}
c_WohnkostenResultat.prototype.p_updateWohnkosten=function(t_R){
	this.m__j_wohnkosten=0.0;
	this.m__j_wohnkosten+=this.m__j_zinsen_h1;
	this.m__j_wohnkosten+=this.m__j_zinsen_h2;
	this.m__j_wohnkosten+=this.m__j_amortisation;
	this.m__j_wohnkosten+=this.m__j_nebenkosten;
	this.m__j_wohnkosten+=this.m__j_weiterekosten;
	this.m__j_wohnkosten-=this.m__j_weitereertraege;
	this.m__j_wohnkosten=bb_math_Max2(0.0,this.m__j_wohnkosten);
	this.m__m_wohnkosten=this.m__j_wohnkosten/12.0;
	if(t_R!=null){
		this.m__m_wohnkosten=t_R.p_rundeKosten(this.m__m_wohnkosten);
	}
}
c_WohnkostenResultat.prototype.p_runden=function(t_R){
	this.m__massg_einkommen=t_R.p_rundeEinkommen(this.m__massg_einkommen);
	this.m__zusatzsicherheiten_belehnbar=t_R.p_rundeBelehnung(this.m__zusatzsicherheiten_belehnbar);
	this.m__max_nettobelehnung=t_R.p_rundeBelehnung(this.m__max_nettobelehnung);
	this.m__nettobelehnung=t_R.p_rundeBelehnung(this.m__nettobelehnung);
	this.m__ueberbelehnung=t_R.p_rundeBelehnung(this.m__ueberbelehnung);
	this.m__ueberbelehnung_ohne_s2=t_R.p_rundeBelehnung(this.m__ueberbelehnung_ohne_s2);
	this.m__nettobelehnungs_quote=t_R.p_rundeQuote(this.m__nettobelehnungs_quote);
	this.m__fehl_eigenmittel=t_R.p_rundeBelehnung(this.m__fehl_eigenmittel);
	this.m__eigenmittel_quote=t_R.p_rundeEigenmittelQuote(this.m__eigenmittel_quote);
	this.m__eigenmittel_ohne_s2_quote=t_R.p_rundeEigenmittelQuote(this.m__eigenmittel_ohne_s2_quote);
	this.m__belehnung=t_R.p_rundeBelehnung(this.m__belehnung);
	this.m__belehnung_h1=t_R.p_rundeBelehnung(this.m__belehnung_h1);
	this.m__belehnung_h2=t_R.p_rundeBelehnung(this.m__belehnung_h2);
	this.m__verschuldungs_quote=t_R.p_rundeQuote(this.m__verschuldungs_quote);
	this.m__j_zinsen_h1=t_R.p_rundeZinsen(this.m__j_zinsen_h1);
	this.m__j_zinsen_h2=t_R.p_rundeZinsen(this.m__j_zinsen_h2);
	this.m__amortisation_hypo=t_R.p_rundeAmortisation(this.m__amortisation_hypo);
	this.m__amortisation_ueber=t_R.p_rundeAmortisation(this.m__amortisation_ueber);
	this.m__amortisation_s2=t_R.p_rundeAmortisation(this.m__amortisation_s2);
	this.m__amortisation_total=t_R.p_rundeAmortisation(this.m__amortisation_total);
	if(this.m__j_amortisation_manuell==false){
		this.m__j_amortisation=t_R.p_rundeJaehrlicheAmortisation(this.m__j_amortisation);
	}
	this.m__j_nebenkosten=t_R.p_rundeKosten(this.m__j_nebenkosten);
	this.m__j_weiterekosten=t_R.p_rundeKosten(this.m__j_weiterekosten);
	this.m__j_weitereertraege=t_R.p_rundeKosten(this.m__j_weitereertraege);
	this.p_updateWohnkosten(t_R);
	if(this.m__massg_einkommen>0.0){
		this.m__j_belastung_proz=this.m__j_wohnkosten*100.0/this.m__massg_einkommen;
	}
	this.m__j_belastung_proz=t_R.p_rundeKostenAnteil(this.m__j_belastung_proz);
}
c_WohnkostenResultat.prototype.p_runden2=function(t_customizing){
	var t_R=c_HausResultatRunden.m_getInstanceFor(t_customizing);
	this.p_runden(t_R);
}
function c_Wohnkosten(){
	Object.call(this);
	this.m__customizing="";
	this.m__p_maxbelehnung=80.0;
	this.m__p_max_nettobelehnung=90.0;
	this.m__p_maxbelehnung_h1=65.0;
	this.m__truncation_h1=1000.0;
	this.m__minimal_h2=10000.0;
	this.m__p_amortisationsziel=65.0;
	this.m__j_trunc_amo_unter=0.0;
	this.m__p_min_amo_von_belehnung=0.0;
	this.m__amortisationsdauer_hypo=15;
	this.m__amortisationsdauer_ueber=15;
	this.m__amortisationsdauer_s2=15;
	this.m__p_nebenkosten=1.0;
	this.m__p_zusatzsicherheiten=100.0;
	this.m__p_max_zusatzsicherheiten_ow=0.0;
}
c_Wohnkosten.m_new=function(t_c){
	this.m__customizing=t_c;
	return this;
}
c_Wohnkosten.m_new2=function(){
	return this;
}
c_Wohnkosten.m_getInstanceFor=function(t_customizing){
	var t_1=t_customizing.toUpperCase();
	if(t_1=="APPKB"){
		return (c_Wohnkosten_APPKB.m_new.call(new c_Wohnkosten_APPKB,t_customizing));
	}else{
		if(t_1=="BCVS"){
			return (c_Wohnkosten_BCVS_Principal_Financing.m_new.call(new c_Wohnkosten_BCVS_Principal_Financing,t_customizing));
		}else{
			if(t_1=="BCVSSIMPLEAFFORDABILITY"){
				return (c_Wohnkosten_BCVS_Principal_Affordability.m_new.call(new c_Wohnkosten_BCVS_Principal_Affordability,t_customizing));
			}else{
				if(t_1=="BCVS-PRINCIPAL-AFFORDABILITY"){
					return (c_Wohnkosten_BCVS_Principal_Affordability.m_new.call(new c_Wohnkosten_BCVS_Principal_Affordability,t_customizing));
				}else{
					if(t_1=="BCVS-PRINCIPAL-FINANCING"){
						return (c_Wohnkosten_BCVS_Principal_Financing.m_new.call(new c_Wohnkosten_BCVS_Principal_Financing,t_customizing));
					}else{
						if(t_1=="BCVS-SECOND-AFFORDABILITY"){
							return (c_Wohnkosten_BCVS_Second_Affordability.m_new.call(new c_Wohnkosten_BCVS_Second_Affordability,t_customizing));
						}else{
							if(t_1=="BCVS-SECOND-FINANCING"){
								return (c_Wohnkosten_BCVS_Second_Financing.m_new.call(new c_Wohnkosten_BCVS_Second_Financing,t_customizing));
							}else{
								if(t_1=="BLL"){
									return (c_Wohnkosten_BLL.m_new.call(new c_Wohnkosten_BLL,t_customizing));
								}else{
									if(t_1=="LLB"){
										return (c_Wohnkosten_LLB.m_new.call(new c_Wohnkosten_LLB,t_customizing));
									}else{
										if(t_1=="LUKB"){
											return (c_Wohnkosten_LUKB.m_new.call(new c_Wohnkosten_LUKB,t_customizing));
										}else{
											if(t_1=="MB"){
												return (c_Wohnkosten_MB.m_new.call(new c_Wohnkosten_MB,t_customizing));
											}else{
												if(t_1=="RB"){
													return (c_Wohnkosten_RB.m_new.call(new c_Wohnkosten_RB,t_customizing));
												}else{
													if(t_1=="WIR"){
														return (c_Wohnkosten_WIR.m_new.call(new c_Wohnkosten_WIR,t_customizing));
													}else{
														if(t_1=="VALIANT"){
															return (c_Wohnkosten_VALIANT.m_new.call(new c_Wohnkosten_VALIANT,t_customizing));
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
	return c_Wohnkosten.m_new.call(new c_Wohnkosten,t_customizing);
}
c_Wohnkosten.prototype.p_berechne7=function(t_gesamtkosten,t_objektwert,t_eigenmittel,t_harte_eigenmittel,t_zusatzsicherheiten_total,t_zusatzsicherheiten_aus_s2,t_massgeinkommen,t_zusatzkosten,t_zusatzertrag,t_zins_h1,t_zins_h2,t_einmaligeAmo,t_zeige_im_alter){
	var t_res=c_WohnkostenResultat.m_new.call(new c_WohnkostenResultat);
	if(t_zeige_im_alter){
		t_zusatzsicherheiten_total=0.0;
		t_zusatzsicherheiten_aus_s2=0.0;
	}
	if(t_gesamtkosten<t_objektwert){
		t_gesamtkosten=t_objektwert;
	}
	if(t_zusatzsicherheiten_total<t_zusatzsicherheiten_aus_s2){
		t_zusatzsicherheiten_total=t_zusatzsicherheiten_aus_s2;
	}
	var t_mehrKosten=bb_math_Max2(0.0,t_gesamtkosten-t_objektwert);
	var t_maxBelehnung=t_objektwert*this.m__p_maxbelehnung/100.0;
	t_res.m__gesamtkosten=t_gesamtkosten;
	t_res.m__objektwert=t_objektwert;
	t_res.m__zusatzsicherheiten_total=t_zusatzsicherheiten_total;
	t_res.m__zusatzsicher_aus_s2=t_zusatzsicherheiten_aus_s2;
	t_res.m__zusatzsicherheiten_belehnbar=t_zusatzsicherheiten_total*this.m__p_zusatzsicherheiten/100.0;
	if(bb_utils_isGZero(this.m__p_max_zusatzsicherheiten_ow,0)){
		t_res.m__zusatzsicherheiten_belehnbar=bb_math_Min2(t_res.m__zusatzsicherheiten_belehnbar,t_objektwert*this.m__p_max_zusatzsicherheiten_ow/100.0);
	}
	t_res.m__max_nettobelehnung=t_objektwert*this.m__p_max_nettobelehnung/100.0;
	t_res.m__nettobelehnung=bb_math_Max2(0.0,t_gesamtkosten-t_res.m__zusatzsicherheiten_belehnbar-t_eigenmittel);
	t_res.m__ueberbelehnung=bb_math_Max2(0.0,t_res.m__nettobelehnung-t_maxBelehnung);
	if(this.m__amortisationsdauer_s2>0){
		t_res.m__ueberbelehnung_ohne_s2=bb_math_Max2(0.0,t_res.m__ueberbelehnung-t_zusatzsicherheiten_aus_s2);
	}else{
		t_res.m__ueberbelehnung_ohne_s2=t_res.m__ueberbelehnung;
	}
	if(t_objektwert>0.0){
		t_res.m__nettobelehnungs_quote=t_res.m__nettobelehnung*100.0/t_objektwert;
	}
	if(t_zeige_im_alter){
		var t_aktBelehnung=bb_math_Max2(0.0,t_gesamtkosten-t_eigenmittel-t_einmaligeAmo);
		var t_amoZiel=bb_math_Max2(0.0,t_objektwert*this.m__p_amortisationsziel/100.0-t_einmaligeAmo);
		t_res.m__belehnung=bb_math_Min2(t_amoZiel,t_aktBelehnung);
		t_res.m__belehnung_h1=t_res.m__belehnung;
		t_res.m__belehnung_h2=0.0;
		t_res.m__hat_hypo2=false;
	}else{
		t_res.m__belehnung=bb_math_Max2(0.0,t_gesamtkosten-t_eigenmittel-t_einmaligeAmo);
		if(bb_utils_isZero(this.m__p_maxbelehnung-this.m__p_maxbelehnung_h1,6)){
			t_res.m__belehnung_h1=t_res.m__belehnung;
			t_res.m__belehnung_h2=0.0;
			t_res.m__hat_hypo2=false;
		}else{
			t_res.m__belehnung_h1=bb_math_Min2(t_res.m__belehnung,t_objektwert*this.m__p_maxbelehnung_h1/100.0+t_res.m__zusatzsicherheiten_belehnbar);
			t_res.m__belehnung_h1=bb_utils_trunc2(t_res.m__belehnung_h1,this.m__truncation_h1);
			t_res.m__belehnung_h2=bb_math_Max2(0.0,t_res.m__belehnung-t_res.m__belehnung_h1);
			if(t_res.m__belehnung_h2>0.0){
				if(t_res.m__belehnung_h2<this.m__minimal_h2){
					t_res.m__belehnung_h1+=t_res.m__belehnung_h2;
					t_res.m__belehnung_h2=0.0;
				}
			}
			if(this.m__p_maxbelehnung_h1<this.m__p_max_nettobelehnung || t_res.m__belehnung_h2>0.0){
				t_res.m__hat_hypo2=true;
			}else{
				t_res.m__hat_hypo2=false;
			}
		}
	}
	if(t_objektwert>0.0){
		t_res.m__verschuldungs_quote=t_res.m__belehnung*100.0/t_objektwert;
	}
	t_res.m__j_zinsen_h1=t_res.m__belehnung_h1*t_zins_h1/100.0;
	t_res.m__j_zinsen_h2=t_res.m__belehnung_h2*t_zins_h2/100.0;
	t_res.m__eigenmittel=t_eigenmittel;
	t_res.m__fehl_eigenmittel=bb_math_Max2(0.0,t_res.m__belehnung-t_res.m__nettobelehnung-t_res.m__zusatzsicherheiten_belehnbar);
	if(t_objektwert>0.0){
		t_res.m__eigenmittel_quote=bb_math_Max2(0.0,(t_eigenmittel+t_zusatzsicherheiten_total-t_mehrKosten)*100.0/t_objektwert);
		t_res.m__eigenmittel_ohne_s2_quote=bb_math_Max2(0.0,(t_harte_eigenmittel+t_zusatzsicherheiten_total-t_zusatzsicherheiten_aus_s2-t_mehrKosten)*100.0/t_objektwert);
	}
	if(t_zeige_im_alter==false){
		if(this.m__amortisationsdauer_hypo>0){
			t_res.m__amortisation_hypo=bb_math_Max2(0.0,t_res.m__belehnung-t_res.m__ueberbelehnung_ohne_s2-t_res.m__zusatzsicherheiten_belehnbar-t_objektwert*this.m__p_amortisationsziel/100.0);
			t_res.m__j_amortisation+=t_res.m__amortisation_hypo/(this.m__amortisationsdauer_hypo);
			t_res.m__amortisation_total+=t_res.m__amortisation_hypo;
		}
		if(this.m__amortisationsdauer_ueber>0){
			t_res.m__amortisation_ueber=t_res.m__ueberbelehnung_ohne_s2;
			t_res.m__j_amortisation+=t_res.m__amortisation_ueber/(this.m__amortisationsdauer_ueber);
			t_res.m__amortisation_total+=t_res.m__amortisation_ueber;
		}
		if(this.m__amortisationsdauer_s2>0){
			t_res.m__amortisation_s2=t_zusatzsicherheiten_aus_s2;
			t_res.m__j_amortisation+=t_res.m__amortisation_s2/(this.m__amortisationsdauer_s2);
			t_res.m__amortisation_total+=t_res.m__amortisation_s2;
		}
		if(this.m__p_min_amo_von_belehnung>0.0){
			if(t_res.m__amortisation_total>0.0){
				var t_minAmo=t_res.m__belehnung*this.m__p_min_amo_von_belehnung/100.0;
				if(t_res.m__j_amortisation<t_minAmo){
					t_res.m__j_amortisation=t_minAmo;
				}
			}
		}
		if(t_res.m__j_amortisation<this.m__j_trunc_amo_unter){
			t_res.m__j_amortisation=0.0;
		}
	}
	t_res.m__massg_einkommen=t_massgeinkommen;
	t_res.m__nebenkostensatz=this.m__p_nebenkosten;
	t_res.m__j_nebenkosten=t_objektwert*this.m__p_nebenkosten/100.0;
	t_res.m__j_weiterekosten=t_zusatzkosten;
	t_res.m__j_weitereertraege=t_zusatzertrag;
	t_res.p_updateWohnkosten(null);
	t_res.m__j_belastung_proz=0.0;
	if(t_res.m__massg_einkommen>0.0){
		t_res.m__j_belastung_proz=t_res.m__j_wohnkosten*100.0/t_res.m__massg_einkommen;
	}else{
		t_res.m__j_belastung_proz=100.0;
	}
	return t_res;
}
c_Wohnkosten.prototype.p_berechne8=function(t_gesamthypothek,t_massgeinkommen,t_zins_h1,t_zins_h2){
	var t_objektwert=t_gesamthypothek*100.0/this.m__p_maxbelehnung;
	var t_eigenmittel=t_objektwert-t_gesamthypothek;
	return this.p_berechne7(t_objektwert,t_objektwert,t_eigenmittel,t_eigenmittel,0.0,0.0,t_massgeinkommen,0.0,0.0,t_zins_h1,t_zins_h2,0.0,false);
}
function c_Wohnkosten_APPKB(){
	c_Wohnkosten.call(this);
}
c_Wohnkosten_APPKB.prototype=extend_class(c_Wohnkosten);
c_Wohnkosten_APPKB.m_new=function(t_c){
	c_Wohnkosten.m_new.call(this,t_c);
	this.m__p_maxbelehnung=80.0;
	this.m__p_max_nettobelehnung=90.0;
	this.m__p_maxbelehnung_h1=70.0;
	this.m__truncation_h1=1000.0;
	this.m__minimal_h2=10000.0;
	this.m__p_amortisationsziel=66.6;
	this.m__j_trunc_amo_unter=20.0;
	this.m__p_min_amo_von_belehnung=0.0;
	this.m__amortisationsdauer_hypo=15;
	this.m__amortisationsdauer_ueber=15;
	this.m__amortisationsdauer_s2=15;
	this.m__p_nebenkosten=0.7;
	this.m__p_zusatzsicherheiten=100.0;
	this.m__p_max_zusatzsicherheiten_ow=0.0;
	return this;
}
c_Wohnkosten_APPKB.m_new2=function(){
	c_Wohnkosten.m_new2.call(this);
	return this;
}
function c_Wohnkosten_BCVS_Principal_Financing(){
	c_Wohnkosten.call(this);
}
c_Wohnkosten_BCVS_Principal_Financing.prototype=extend_class(c_Wohnkosten);
c_Wohnkosten_BCVS_Principal_Financing.m_new=function(t_c){
	c_Wohnkosten.m_new.call(this,t_c);
	this.m__p_maxbelehnung=80.0;
	this.m__p_max_nettobelehnung=90.0;
	this.m__p_maxbelehnung_h1=90.0;
	this.m__truncation_h1=1000.0;
	this.m__minimal_h2=10000.0;
	this.m__p_amortisationsziel=66.0;
	this.m__j_trunc_amo_unter=0.0;
	this.m__p_min_amo_von_belehnung=1.0;
	this.m__amortisationsdauer_hypo=15;
	this.m__amortisationsdauer_ueber=15;
	this.m__amortisationsdauer_s2=15;
	this.m__p_nebenkosten=1.0;
	this.m__p_zusatzsicherheiten=100.0;
	this.m__p_max_zusatzsicherheiten_ow=0.0;
	return this;
}
c_Wohnkosten_BCVS_Principal_Financing.m_new2=function(){
	c_Wohnkosten.m_new2.call(this);
	return this;
}
function c_Wohnkosten_BCVS_Principal_Affordability(){
	c_Wohnkosten.call(this);
}
c_Wohnkosten_BCVS_Principal_Affordability.prototype=extend_class(c_Wohnkosten);
c_Wohnkosten_BCVS_Principal_Affordability.m_new=function(t_c){
	c_Wohnkosten.m_new.call(this,t_c);
	this.m__p_maxbelehnung=80.0;
	this.m__p_max_nettobelehnung=90.0;
	this.m__p_maxbelehnung_h1=90.0;
	this.m__truncation_h1=1000.0;
	this.m__minimal_h2=0.0;
	this.m__p_amortisationsziel=0.0;
	this.m__j_trunc_amo_unter=0.0;
	this.m__p_min_amo_von_belehnung=0.0;
	this.m__amortisationsdauer_hypo=0;
	this.m__amortisationsdauer_ueber=0;
	this.m__amortisationsdauer_s2=0;
	this.m__p_nebenkosten=0.0;
	this.m__p_zusatzsicherheiten=100.0;
	this.m__p_max_zusatzsicherheiten_ow=0.0;
	return this;
}
c_Wohnkosten_BCVS_Principal_Affordability.m_new2=function(){
	c_Wohnkosten.m_new2.call(this);
	return this;
}
function c_Wohnkosten_BCVS_Second_Affordability(){
	c_Wohnkosten.call(this);
}
c_Wohnkosten_BCVS_Second_Affordability.prototype=extend_class(c_Wohnkosten);
c_Wohnkosten_BCVS_Second_Affordability.m_new=function(t_c){
	c_Wohnkosten.m_new.call(this,t_c);
	this.m__p_maxbelehnung=70.0;
	this.m__p_max_nettobelehnung=80.0;
	this.m__p_maxbelehnung_h1=80.0;
	this.m__truncation_h1=1000.0;
	this.m__minimal_h2=0.0;
	this.m__p_amortisationsziel=0.0;
	this.m__j_trunc_amo_unter=0.0;
	this.m__p_min_amo_von_belehnung=0.0;
	this.m__amortisationsdauer_hypo=0;
	this.m__amortisationsdauer_ueber=0;
	this.m__amortisationsdauer_s2=0;
	this.m__p_nebenkosten=0.0;
	this.m__p_zusatzsicherheiten=100.0;
	this.m__p_max_zusatzsicherheiten_ow=0.0;
	return this;
}
c_Wohnkosten_BCVS_Second_Affordability.m_new2=function(){
	c_Wohnkosten.m_new2.call(this);
	return this;
}
function c_Wohnkosten_BCVS_Second_Financing(){
	c_Wohnkosten.call(this);
}
c_Wohnkosten_BCVS_Second_Financing.prototype=extend_class(c_Wohnkosten);
c_Wohnkosten_BCVS_Second_Financing.m_new=function(t_c){
	c_Wohnkosten.m_new.call(this,t_c);
	this.m__p_maxbelehnung=70.0;
	this.m__p_max_nettobelehnung=80.0;
	this.m__p_maxbelehnung_h1=80.0;
	this.m__truncation_h1=1000.0;
	this.m__minimal_h2=10000.0;
	this.m__p_amortisationsziel=66.0;
	this.m__j_trunc_amo_unter=0.0;
	this.m__p_min_amo_von_belehnung=1.0;
	this.m__amortisationsdauer_hypo=15;
	this.m__amortisationsdauer_ueber=15;
	this.m__amortisationsdauer_s2=15;
	this.m__p_nebenkosten=1.0;
	this.m__p_zusatzsicherheiten=100.0;
	this.m__p_max_zusatzsicherheiten_ow=0.0;
	return this;
}
c_Wohnkosten_BCVS_Second_Financing.m_new2=function(){
	c_Wohnkosten.m_new2.call(this);
	return this;
}
function c_Wohnkosten_BLL(){
	c_Wohnkosten.call(this);
}
c_Wohnkosten_BLL.prototype=extend_class(c_Wohnkosten);
c_Wohnkosten_BLL.m_new=function(t_c){
	c_Wohnkosten.m_new.call(this,t_c);
	this.m__p_maxbelehnung=80.0;
	this.m__p_max_nettobelehnung=90.0;
	this.m__p_maxbelehnung_h1=90.0;
	this.m__truncation_h1=1000.0;
	this.m__minimal_h2=10000.0;
	this.m__p_amortisationsziel=66.6;
	this.m__j_trunc_amo_unter=0.0;
	this.m__p_min_amo_von_belehnung=0.0;
	this.m__amortisationsdauer_hypo=15;
	this.m__amortisationsdauer_ueber=15;
	this.m__amortisationsdauer_s2=15;
	this.m__p_nebenkosten=0.8;
	this.m__p_zusatzsicherheiten=100.0;
	this.m__p_max_zusatzsicherheiten_ow=10.0;
	return this;
}
c_Wohnkosten_BLL.m_new2=function(){
	c_Wohnkosten.m_new2.call(this);
	return this;
}
function c_Wohnkosten_LLB(){
	c_Wohnkosten.call(this);
}
c_Wohnkosten_LLB.prototype=extend_class(c_Wohnkosten);
c_Wohnkosten_LLB.m_new=function(t_c){
	c_Wohnkosten.m_new.call(this,t_c);
	this.m__p_maxbelehnung=80.0;
	this.m__p_max_nettobelehnung=90.0;
	this.m__p_maxbelehnung_h1=90.0;
	this.m__truncation_h1=1000.0;
	this.m__minimal_h2=10000.0;
	this.m__p_amortisationsziel=66.6;
	this.m__j_trunc_amo_unter=0.0;
	this.m__p_min_amo_von_belehnung=0.0;
	this.m__amortisationsdauer_hypo=20;
	this.m__amortisationsdauer_ueber=20;
	this.m__amortisationsdauer_s2=20;
	this.m__p_nebenkosten=0.8;
	this.m__p_zusatzsicherheiten=100.0;
	this.m__p_max_zusatzsicherheiten_ow=10.0;
	return this;
}
c_Wohnkosten_LLB.m_new2=function(){
	c_Wohnkosten.m_new2.call(this);
	return this;
}
function c_Wohnkosten_LUKB(){
	c_Wohnkosten.call(this);
}
c_Wohnkosten_LUKB.prototype=extend_class(c_Wohnkosten);
c_Wohnkosten_LUKB.m_new=function(t_c){
	c_Wohnkosten.m_new.call(this,t_c);
	this.m__p_maxbelehnung=80.0;
	this.m__p_max_nettobelehnung=90.0;
	this.m__p_maxbelehnung_h1=66.0;
	this.m__truncation_h1=1000.0;
	this.m__minimal_h2=10000.0;
	this.m__p_amortisationsziel=66.0;
	this.m__j_trunc_amo_unter=0.0;
	this.m__p_min_amo_von_belehnung=0.0;
	this.m__amortisationsdauer_hypo=15;
	this.m__amortisationsdauer_ueber=5;
	this.m__amortisationsdauer_s2=0;
	this.m__p_nebenkosten=0.75;
	this.m__p_zusatzsicherheiten=90.0;
	this.m__p_max_zusatzsicherheiten_ow=0.0;
	return this;
}
c_Wohnkosten_LUKB.m_new2=function(){
	c_Wohnkosten.m_new2.call(this);
	return this;
}
function c_Wohnkosten_MB(){
	c_Wohnkosten.call(this);
}
c_Wohnkosten_MB.prototype=extend_class(c_Wohnkosten);
c_Wohnkosten_MB.m_new=function(t_c){
	c_Wohnkosten.m_new.call(this,t_c);
	this.m__p_maxbelehnung=80.0;
	this.m__p_max_nettobelehnung=90.0;
	this.m__p_maxbelehnung_h1=67.0;
	this.m__truncation_h1=1000.0;
	this.m__minimal_h2=10000.0;
	this.m__p_amortisationsziel=67.0;
	this.m__j_trunc_amo_unter=0.0;
	this.m__p_min_amo_von_belehnung=0.0;
	this.m__amortisationsdauer_hypo=15;
	this.m__amortisationsdauer_ueber=15;
	this.m__amortisationsdauer_s2=15;
	this.m__p_nebenkosten=1.0;
	this.m__p_zusatzsicherheiten=100.0;
	this.m__p_max_zusatzsicherheiten_ow=0.0;
	return this;
}
c_Wohnkosten_MB.m_new2=function(){
	c_Wohnkosten.m_new2.call(this);
	return this;
}
function c_Wohnkosten_RB(){
	c_Wohnkosten.call(this);
}
c_Wohnkosten_RB.prototype=extend_class(c_Wohnkosten);
c_Wohnkosten_RB.m_new=function(t_c){
	c_Wohnkosten.m_new.call(this,t_c);
	this.m__p_maxbelehnung=80.0;
	this.m__p_max_nettobelehnung=90.0;
	this.m__p_maxbelehnung_h1=65.0;
	this.m__truncation_h1=1000.0;
	this.m__minimal_h2=10000.0;
	this.m__p_amortisationsziel=80.0;
	this.m__j_trunc_amo_unter=0.0;
	this.m__p_min_amo_von_belehnung=0.0;
	this.m__amortisationsdauer_hypo=0;
	this.m__amortisationsdauer_ueber=0;
	this.m__amortisationsdauer_s2=0;
	this.m__p_nebenkosten=1.0;
	this.m__p_zusatzsicherheiten=100.0;
	this.m__p_max_zusatzsicherheiten_ow=0.0;
	return this;
}
c_Wohnkosten_RB.m_new2=function(){
	c_Wohnkosten.m_new2.call(this);
	return this;
}
function c_Wohnkosten_WIR(){
	c_Wohnkosten.call(this);
}
c_Wohnkosten_WIR.prototype=extend_class(c_Wohnkosten);
c_Wohnkosten_WIR.m_new=function(t_c){
	c_Wohnkosten.m_new.call(this,t_c);
	this.m__p_maxbelehnung=80.0;
	this.m__p_max_nettobelehnung=90.0;
	this.m__p_maxbelehnung_h1=66.0;
	this.m__truncation_h1=1000.0;
	this.m__minimal_h2=10000.0;
	this.m__p_amortisationsziel=66.0;
	this.m__j_trunc_amo_unter=0.0;
	this.m__p_min_amo_von_belehnung=0.0;
	this.m__amortisationsdauer_hypo=15;
	this.m__amortisationsdauer_ueber=15;
	this.m__amortisationsdauer_s2=15;
	this.m__p_nebenkosten=0.7;
	this.m__p_zusatzsicherheiten=100.0;
	this.m__p_max_zusatzsicherheiten_ow=0.0;
	return this;
}
c_Wohnkosten_WIR.m_new2=function(){
	c_Wohnkosten.m_new2.call(this);
	return this;
}
function c_Wohnkosten_VALIANT(){
	c_Wohnkosten.call(this);
}
c_Wohnkosten_VALIANT.prototype=extend_class(c_Wohnkosten);
c_Wohnkosten_VALIANT.m_new=function(t_c){
	c_Wohnkosten.m_new.call(this,t_c);
	this.m__p_maxbelehnung=80.0;
	this.m__p_max_nettobelehnung=90.0;
	this.m__p_maxbelehnung_h1=67.0;
	this.m__truncation_h1=1000.0;
	this.m__minimal_h2=10000.0;
	this.m__p_amortisationsziel=67.0;
	this.m__j_trunc_amo_unter=0.0;
	this.m__p_min_amo_von_belehnung=0.0;
	this.m__amortisationsdauer_hypo=15;
	this.m__amortisationsdauer_ueber=15;
	this.m__amortisationsdauer_s2=15;
	this.m__p_nebenkosten=1.0;
	this.m__p_zusatzsicherheiten=100.0;
	this.m__p_max_zusatzsicherheiten_ow=0.0;
	return this;
}
c_Wohnkosten_VALIANT.m_new2=function(){
	c_Wohnkosten.m_new2.call(this);
	return this;
}
function c_HausResultatRunden(){
	Object.call(this);
	this.m__customizing="";
}
c_HausResultatRunden.prototype.p_rundeKosten=function(t_v){
	return bb_utils_roundRelative(t_v);
}
c_HausResultatRunden.m_new=function(t_c){
	this.m__customizing=t_c;
	return this;
}
c_HausResultatRunden.m_new2=function(){
	return this;
}
c_HausResultatRunden.m_getInstanceFor=function(t_customizing){
	var t_1=t_customizing.toUpperCase();
	if(t_1=="APPKB"){
		return (c_HausResultatRunden_APPKB.m_new.call(new c_HausResultatRunden_APPKB,t_customizing));
	}else{
		if(t_1=="LUKB"){
			return (c_HausResultatRunden_LUKB.m_new.call(new c_HausResultatRunden_LUKB,t_customizing));
		}
	}
	if(string_startswith(t_customizing.toUpperCase(),"BCVS")){
		return (c_HausResultatRunden_BCVS.m_new.call(new c_HausResultatRunden_BCVS,t_customizing));
	}
	return c_HausResultatRunden.m_new.call(new c_HausResultatRunden,t_customizing);
}
c_HausResultatRunden.prototype.p_rundeEinkommen=function(t_v){
	return bb_utils_round(t_v);
}
c_HausResultatRunden.prototype.p_rundeBelehnung=function(t_v){
	return bb_utils_roundUpRelative(t_v);
}
c_HausResultatRunden.prototype.p_rundeQuote=function(t_v){
	return bb_utils_round2(t_v,0.1);
}
c_HausResultatRunden.prototype.p_rundeEigenmittelQuote=function(t_v){
	return bb_utils_trunc(t_v);
}
c_HausResultatRunden.prototype.p_rundeZinsen=function(t_v){
	return bb_utils_roundUpRelative(t_v);
}
c_HausResultatRunden.prototype.p_rundeAmortisation=function(t_v){
	return bb_utils_roundUpRelative(t_v);
}
c_HausResultatRunden.prototype.p_rundeJaehrlicheAmortisation=function(t_v){
	return bb_utils_roundUpRelative(t_v);
}
c_HausResultatRunden.prototype.p_rundeKostenAnteil=function(t_v){
	return bb_utils_roundUp(t_v);
}
c_HausResultatRunden.prototype.p_rundeZinssatz=function(t_v){
	return bb_utils_round2(t_v,0.01);
}
function c_HausResultatRunden_APPKB(){
	c_HausResultatRunden.call(this);
}
c_HausResultatRunden_APPKB.prototype=extend_class(c_HausResultatRunden);
c_HausResultatRunden_APPKB.m_new=function(t_customizing){
	c_HausResultatRunden.m_new.call(this,t_customizing);
	return this;
}
c_HausResultatRunden_APPKB.m_new2=function(){
	c_HausResultatRunden.m_new2.call(this);
	return this;
}
c_HausResultatRunden_APPKB.prototype.p_rundeBelehnung=function(t_v){
	if(t_v<1000.0){
		return bb_utils_roundUp(t_v);
	}
	return bb_utils_roundUp2(t_v,10.0);
}
c_HausResultatRunden_APPKB.prototype.p_rundeAmortisation=function(t_v){
	if(t_v<1000.0){
		return bb_utils_roundUp(t_v);
	}
	return bb_utils_roundUp2(t_v,10.0);
}
c_HausResultatRunden_APPKB.prototype.p_rundeJaehrlicheAmortisation=function(t_v){
	if(t_v<1000.0){
		return bb_utils_roundUp(t_v);
	}
	return bb_utils_roundUp2(t_v,10.0);
}
c_HausResultatRunden_APPKB.prototype.p_rundeZinsen=function(t_v){
	return bb_utils_roundUp(t_v);
}
c_HausResultatRunden_APPKB.prototype.p_rundeKosten=function(t_v){
	if(t_v<1000.0){
		return bb_utils_round(t_v);
	}
	return bb_utils_round2(t_v,10.0);
}
function c_HausResultatRunden_LUKB(){
	c_HausResultatRunden.call(this);
}
c_HausResultatRunden_LUKB.prototype=extend_class(c_HausResultatRunden);
c_HausResultatRunden_LUKB.m_new=function(t_customizing){
	c_HausResultatRunden.m_new.call(this,t_customizing);
	return this;
}
c_HausResultatRunden_LUKB.m_new2=function(){
	c_HausResultatRunden.m_new2.call(this);
	return this;
}
c_HausResultatRunden_LUKB.prototype.p_rundeBelehnung=function(t_v){
	return bb_utils_roundUp(t_v);
}
c_HausResultatRunden_LUKB.prototype.p_rundeAmortisation=function(t_v){
	return bb_utils_roundUp(t_v);
}
c_HausResultatRunden_LUKB.prototype.p_rundeJaehrlicheAmortisation=function(t_v){
	return bb_utils_roundUp2(t_v,500.0);
}
c_HausResultatRunden_LUKB.prototype.p_rundeZinsen=function(t_v){
	if(t_v<1000.0){
		return bb_utils_round(t_v);
	}
	return bb_utils_round2(t_v,10.0);
}
c_HausResultatRunden_LUKB.prototype.p_rundeZinssatz=function(t_v){
	return bb_utils_round2(t_v,0.01);
}
c_HausResultatRunden_LUKB.prototype.p_rundeQuote=function(t_v){
	return bb_utils_round2(t_v,0.1);
}
c_HausResultatRunden_LUKB.prototype.p_rundeKosten=function(t_v){
	if(t_v<1000.0){
		return bb_utils_round(t_v);
	}
	return bb_utils_round2(t_v,10.0);
}
c_HausResultatRunden_LUKB.prototype.p_rundeKostenAnteil=function(t_v){
	return bb_utils_round2(t_v,0.01);
}
function c_HausResultatRunden_BCVS(){
	c_HausResultatRunden.call(this);
}
c_HausResultatRunden_BCVS.prototype=extend_class(c_HausResultatRunden);
c_HausResultatRunden_BCVS.m_new=function(t_customizing){
	c_HausResultatRunden.m_new.call(this,t_customizing);
	return this;
}
c_HausResultatRunden_BCVS.m_new2=function(){
	c_HausResultatRunden.m_new2.call(this);
	return this;
}
c_HausResultatRunden_BCVS.prototype.p_rundeKostenAnteil=function(t_v){
	return bb_utils_trunc(t_v);
}
function bb_utils_roundUpRelative(t_x){
	var t_f=bb_math_Abs2(t_x);
	if(t_f<1000.0){
		return bb_utils_roundUp(t_x);
	}
	if(t_f<10000.0){
		return bb_utils_roundUp2(t_x,10.0);
	}
	if(t_f<100000.0){
		return bb_utils_roundUp2(t_x,100.0);
	}
	if(t_f<1000000.0){
		return bb_utils_roundUp2(t_x,1000.0);
	}
	return bb_utils_roundUp2(t_x,10000.0);
}
function c_Tragbarkeit_Analyzer(){
	c_Newton.call(this);
	this.m__customizing="";
	this.m__zusatzsicherheiten_total=.0;
	this.m__zusatzsicherheiten_aus_s2=.0;
	this.m__zusatzkosten=.0;
	this.m__zusatzertrag=.0;
	this.m__zins_h1=.0;
	this.m__zins_h2=.0;
	this.m__einmalige_amo=.0;
	this.m__sicht_im_alter=false;
	this.m__approx_methode=0;
	this.m__wk=null;
	this.m__massgeinkommen=.0;
	this.m__eigenmittel=.0;
	this.m__gesamtkosten=.0;
	this.m__objektwert=.0;
	this.m__harte_eigenmittel=.0;
}
c_Tragbarkeit_Analyzer.prototype=extend_class(c_Newton);
c_Tragbarkeit_Analyzer.m_new=function(t_c){
	c_Newton.m_new.call(this);
	this.m__customizing=t_c;
	return this;
}
c_Tragbarkeit_Analyzer.m_new2=function(){
	c_Newton.m_new.call(this);
	return this;
}
c_Tragbarkeit_Analyzer.m_getInstanceFor=function(t_customizing){
	return c_Tragbarkeit_Analyzer.m_new.call(new c_Tragbarkeit_Analyzer,t_customizing);
}
c_Tragbarkeit_Analyzer.prototype.p_berechneObjektwertAnhandEinkommen=function(t_income,t_maxKostenQuote){
	this.m__approx_methode=3;
	this.m__wk=c_Wohnkosten.m_getInstanceFor(this.m__customizing);
	this.m__massgeinkommen=t_income;
	var t_maxCosts=t_income*t_maxKostenQuote/100.0;
	var t_objektwert=bb_utils_round(this.p_approximate(0.0,t_maxCosts,1.0,100000.0,2000000.0));
	if(t_objektwert<500000.0){
		t_objektwert=bb_utils_trunc2(t_objektwert,5000.0);
	}else{
		t_objektwert=bb_utils_trunc2(t_objektwert,10000.0);
	}
	this.m__eigenmittel=bb_utils_roundUpRelative(t_objektwert*(100.0-this.m__wk.m__p_maxbelehnung)/100.0);
	return [t_objektwert,this.m__eigenmittel];
}
c_Tragbarkeit_Analyzer.prototype.p_berechneObjektwertAnhandMiete=function(t_miete){
	this.m__approx_methode=2;
	this.m__wk=c_Wohnkosten.m_getInstanceFor(this.m__customizing);
	var t_objektwert=bb_utils_round(this.p_approximate(0.0,t_miete,1.0,100000.0,2000000.0));
	if(t_objektwert<500000.0){
		t_objektwert=bb_utils_trunc2(t_objektwert,5000.0);
	}else{
		t_objektwert=bb_utils_trunc2(t_objektwert,10000.0);
	}
	this.m__eigenmittel=bb_utils_roundUpRelative(t_objektwert*(100.0-this.m__wk.m__p_maxbelehnung)/100.0);
	return [t_objektwert,this.m__eigenmittel];
}
c_Tragbarkeit_Analyzer.prototype.p_fehlendeEigenmittel=function(t_maxtragbarkeit){
	this.m__approx_methode=1;
	this.m__wk=c_Wohnkosten.m_getInstanceFor(this.m__customizing);
	var t_einmaligeAmo=this.p_approximate(0.0,t_maxtragbarkeit,0.001,10000.0,500000.0);
	var t_res=null;
	t_res=this.m__wk.p_berechne7(this.m__gesamtkosten,this.m__objektwert,this.m__eigenmittel,this.m__harte_eigenmittel,this.m__zusatzsicherheiten_total,this.m__zusatzsicherheiten_aus_s2,this.m__massgeinkommen,this.m__zusatzkosten,this.m__zusatzertrag,this.m__zins_h1,this.m__zins_h2,t_einmaligeAmo,this.m__sicht_im_alter);
	var t_fehlendeMittel=.0;
	t_fehlendeMittel=bb_utils_roundUpRelative(t_einmaligeAmo);
	if(t_fehlendeMittel<1.0){
		t_fehlendeMittel=0.0;
	}else{
		if(t_fehlendeMittel<100.0){
			t_fehlendeMittel=100.0;
		}else{
			if(t_fehlendeMittel<1000.0){
				t_fehlendeMittel=1000.0;
			}
		}
	}
	return t_fehlendeMittel;
}
c_Tragbarkeit_Analyzer.prototype.p_sample=function(t_startval,t_guess){
	var t_res=null;
	var t_2=this.m__approx_methode;
	if(t_2==1){
		t_res=this.m__wk.p_berechne7(this.m__gesamtkosten,this.m__objektwert,this.m__eigenmittel,this.m__harte_eigenmittel,this.m__zusatzsicherheiten_total,this.m__zusatzsicherheiten_aus_s2,this.m__massgeinkommen,this.m__zusatzkosten,this.m__zusatzertrag,this.m__zins_h1,this.m__zins_h2,t_guess,this.m__sicht_im_alter);
		return t_res.m__j_belastung_proz;
	}else{
		if(t_2==2){
			t_res=this.m__wk.p_berechne7(t_guess,t_guess,t_guess*(100.0-this.m__wk.m__p_maxbelehnung)/100.0,0.0,this.m__zusatzsicherheiten_total,this.m__zusatzsicherheiten_aus_s2,this.m__massgeinkommen,this.m__zusatzkosten,this.m__zusatzertrag,this.m__zins_h1,this.m__zins_h2,this.m__einmalige_amo,this.m__sicht_im_alter);
			return t_res.m__j_wohnkosten;
		}else{
			if(t_2==3){
				t_res=this.m__wk.p_berechne7(t_guess,t_guess,t_guess*(100.0-this.m__wk.m__p_maxbelehnung)/100.0,0.0,this.m__zusatzsicherheiten_total,this.m__zusatzsicherheiten_aus_s2,this.m__massgeinkommen,this.m__zusatzkosten,this.m__zusatzertrag,this.m__zins_h1,this.m__zins_h2,this.m__einmalige_amo,this.m__sicht_im_alter);
				t_res.p_runden2(this.m__customizing);
				return t_res.m__j_wohnkosten;
			}
		}
	}
	return 0.0;
}
function c_Hypotheken(){
	Object.call(this);
	this.m__hypos=c_HypothekenDynamicArray.m_new.call(new c_HypothekenDynamicArray);
}
c_Hypotheken.m_new=function(){
	return this;
}
c_Hypotheken.prototype.p_fromJson2=function(t_sJson){
	this.m__hypos.p_clear();
	try{
		var t_js=c_JsonObject.m_new3.call(new c_JsonObject,t_sJson);
		var t_a=object_downcast((t_js.p_Get("mortgages",null)),c_JsonArray);
		if(t_a!=null){
			for(var t_i=0;t_i<t_a.p_Length();t_i=t_i+1){
				var t_o=object_downcast((t_a.p_Get3(t_i)),c_JsonObject);
				if(t_o!=null){
					var t_hypo=c_Hypothekarkredit.m_new.call(new c_Hypothekarkredit);
					t_hypo.p_fromJson(t_o);
					this.m__hypos.p_add6(t_hypo);
				}
			}
		}
		return true;
	}catch(_eek_){
		if(t_err=object_downcast(_eek_,ThrowableObject)){
		}else{
			throw _eek_;
		}
	}
	return false;
}
c_Hypotheken.prototype.p_prepareZeitraum=function(t_dauer){
	var t_=this.m__hypos.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_hypo=t_.p_NextObject();
		t_hypo.p_prepareZeitraum(t_dauer);
	}
}
c_Hypotheken.prototype.p_runden3=function(){
	var t_=this.m__hypos.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_hypo=t_.p_NextObject();
		t_hypo.m__jahr1_effzinssatz=bb_utils_round2(t_hypo.m__jahr1_effzinssatz,0.01);
	}
}
c_Hypotheken.prototype.p_prepareAmortisation=function(t_amoziel,t_dauer){
	var t_sortedhypos=c_HypothekenDynamicArray.m_new.call(new c_HypothekenDynamicArray);
	t_sortedhypos.p_addAll(this.m__hypos.p_getArray());
	t_sortedhypos.m__comp=1;
	t_sortedhypos.p_sortArray(false);
	var t_=t_sortedhypos.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_hypo=t_.p_NextObject();
		t_hypo.m__amo_prio=0;
		t_hypo.m__amo_zielwert=0.0;
		t_hypo.m__amo_effbetrag=0.0;
	}
	var t_restamoziel=t_amoziel;
	var t_prio=1;
	var t_2=t_sortedhypos.p_ObjectEnumerator();
	while(t_2.p_HasNext()){
		var t_hypo2=t_2.p_NextObject();
		if(t_restamoziel<1.0){
			break;
		}
		t_hypo2.m__amo_prio=t_prio;
		t_hypo2.m__amo_zielwert=bb_math_Min2(t_restamoziel,t_hypo2.m__betrag);
		t_prio+=1;
		t_restamoziel-=t_hypo2.m__amo_zielwert;
	}
}
function c_Sonderkonditionen(){
	Object.call(this);
	this.m__customizing="";
	this.m__sokos=c_DynamicArray3.m_new.call(new c_DynamicArray3);
}
c_Sonderkonditionen.m_new=function(t_c){
	this.m__customizing=t_c;
	return this;
}
c_Sonderkonditionen.m_new2=function(){
	return this;
}
c_Sonderkonditionen.m_getInstanceFor=function(t_customizing){
	var t_1=t_customizing.toUpperCase();
	if(t_1=="APPKB"){
		return (c_Sonderkonditionen_APPKB.m_new.call(new c_Sonderkonditionen_APPKB,t_customizing));
	}
	return c_Sonderkonditionen.m_new.call(new c_Sonderkonditionen,t_customizing);
}
c_Sonderkonditionen.prototype.p_getBelehnungenRang1=function(t_hypos){
	var t_v=.0;
	var t_=t_hypos.m__hypos.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_hypo=t_.p_NextObject();
		if(t_hypo.m__rang==1){
			t_v+=t_hypo.m__betrag;
		}
	}
	return t_v;
}
c_Sonderkonditionen.prototype.p_getSonderkondition=function(t_sokoid,t_sum_h1,t_children,t_hypo){
	var t_=this.m__sokos.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_soko=t_.p_NextObject();
		if(t_soko.m__id==t_sokoid && t_soko.p_efuelltBedingungen(false,t_sum_h1,t_children,t_hypo)){
			return t_soko;
		}
	}
	return null;
}
c_Sonderkonditionen.prototype.p_validateSokos=function(t_children,t_hypos){
	var t_sum_h1=this.p_getBelehnungenRang1(t_hypos);
	var t_soko=null;
	var t_=t_hypos.m__hypos.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_hypo=t_.p_NextObject();
		for(var t_i=0;t_i<t_hypo.m__zgsokos.p_length();t_i=t_i+1){
			var t_zgsoko=object_downcast((t_hypo.m__zgsokos.p_getObject(t_i)),c_ZugewieseneSonderkondition);
			if(t_zgsoko==null){
				break;
			}
			if(t_zgsoko.p_hasSoko()==false){
				t_i-=1;
				t_hypo.m__zgsokos.p_removeObject(t_zgsoko);
				continue;
			}
			t_soko=this.p_getSonderkondition(t_zgsoko.m__soko_id,t_sum_h1,t_children,t_hypo);
			if(t_soko==null){
				t_i-=1;
				t_hypo.m__zgsokos.p_removeObject(t_zgsoko);
				continue;
			}
			t_zgsoko.p_updateBasisdaten(t_soko,t_hypo);
			t_zgsoko.m__tmp_soko=t_soko;
		}
	}
}
c_Sonderkonditionen.prototype.p_checkSokosOfStatus=function(t_hypo,t_status,t_sumsoko){
	for(var t_i=0;t_i<t_hypo.m__zgsokos.p_length();t_i=t_i+1){
		var t_zgsoko=object_downcast((t_hypo.m__zgsokos.p_getObject(t_i)),c_ZugewieseneSonderkondition);
		if(t_zgsoko==null){
			break;
		}
		if(t_zgsoko.m__status!=t_status){
			continue;
		}
		t_zgsoko.m__betrag=bb_math_Min2(t_hypo.m__betrag-t_sumsoko,t_zgsoko.m__tmp_soko.p_getOffenerBetrag());
		if(t_zgsoko.m__betrag<t_zgsoko.m__tmp_soko.m__min_tranche){
			t_i-=1;
			t_hypo.m__zgsokos.p_removeObject(t_zgsoko);
			continue;
		}
		if(t_zgsoko.m__status==3){
			t_zgsoko.m__betrag_manuell=bb_math_Max2(t_zgsoko.m__betrag_manuell,t_zgsoko.m__tmp_soko.m__min_tranche);
			t_zgsoko.m__betrag_manuell=bb_math_Min2(t_zgsoko.m__betrag_manuell,t_zgsoko.m__betrag);
			t_zgsoko.m__betrag_manuell=bb_math_Min2(t_zgsoko.m__betrag_manuell,t_zgsoko.m__tmp_soko.m__max_summe);
			t_zgsoko.m__tmp_soko.m__zugewiesenerbetrag+=t_zgsoko.m__betrag_manuell;
			t_sumsoko+=t_zgsoko.m__betrag_manuell;
		}else{
			if(t_zgsoko.m__status==2){
				t_zgsoko.m__tmp_soko.m__zugewiesenerbetrag+=t_zgsoko.m__betrag;
				t_sumsoko+=t_zgsoko.m__betrag;
			}
		}
	}
	return t_sumsoko;
}
c_Sonderkonditionen.prototype.p_isSokoUsed=function(t_sokoid,t_hypo){
	var t_=t_hypo.m__zgsokos.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_osoko=t_.p_NextObject();
		var t_zgsoko=object_downcast((t_osoko),c_ZugewieseneSonderkondition);
		if(t_zgsoko.m__soko_id==t_sokoid){
			return true;
		}
	}
	return false;
}
c_Sonderkonditionen.prototype.p_getSummeSokoBisVorPrio=function(t_hypo,t_prio){
	var t_v=.0;
	for(var t_i=0;t_i<t_hypo.m__zgsokos.p_length();t_i=t_i+1){
		var t_zgsoko=object_downcast((t_hypo.m__zgsokos.p_getObject(t_i)),c_ZugewieseneSonderkondition);
		if(t_zgsoko==null){
			break;
		}
		if(t_zgsoko.m__soko_prio<t_prio){
			if(t_zgsoko.m__status==2){
				t_v+=t_zgsoko.m__betrag;
			}
			if(t_zgsoko.m__status==3){
				t_v+=t_zgsoko.m__betrag_manuell;
			}
		}else{
			if(t_zgsoko.m__status==3){
				t_v+=t_zgsoko.m__betrag_manuell;
			}
		}
	}
	return t_v;
}
c_Sonderkonditionen.prototype.p_attachSokoToHypo=function(t_soko,t_hypo){
	var t_sumsoko=this.p_getSummeSokoBisVorPrio(t_hypo,t_soko.m__prio);
	var t_sokooffen=t_soko.p_getOffenerBetrag();
	var t_proposal=bb_math_Min2(t_hypo.m__betrag-t_sumsoko,t_sokooffen);
	if(t_proposal>=t_soko.m__min_tranche){
		var t_zgsoko=c_ZugewieseneSonderkondition.m_new.call(new c_ZugewieseneSonderkondition);
		t_zgsoko.p_updateBasisdaten(t_soko,t_hypo);
		t_zgsoko.m__status=1;
		t_zgsoko.m__betrag=t_proposal;
		t_hypo.m__zgsokos.p_add2(t_zgsoko);
		t_hypo.m__zgsokos.p_sortArray(true);
		return t_zgsoko;
	}
	return null;
}
c_Sonderkonditionen.prototype.p_createPotentialSokos=function(t_breaching,t_children,t_hypos){
	var t_sum_h1=this.p_getBelehnungenRang1(t_hypos);
	var t_soko=null;
	var t_=this.m__sokos.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		t_soko=t_.p_NextObject();
		var t_2=t_hypos.m__hypos.p_ObjectEnumerator();
		while(t_2.p_HasNext()){
			var t_hypo=t_2.p_NextObject();
			if(this.p_isSokoUsed(t_soko.m__id,t_hypo)){
				continue;
			}
			if(t_soko.p_efuelltBedingungen(t_breaching,t_sum_h1,t_children,t_hypo)){
				this.p_attachSokoToHypo(t_soko,t_hypo);
			}
		}
	}
}
c_Sonderkonditionen.prototype.p_verifyHypotheken=function(t_children,t_hypos){
	var t_=this.m__sokos.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_soko=t_.p_NextObject();
		t_soko.m__zugewiesenerbetrag=0.0;
	}
	this.p_validateSokos(t_children,t_hypos);
	var t_2=t_hypos.m__hypos.p_ObjectEnumerator();
	while(t_2.p_HasNext()){
		var t_hypo=t_2.p_NextObject();
		t_hypo.m__zgsokos.p_sortArray(true);
		var t_sumsoko=0.0;
		t_sumsoko=this.p_checkSokosOfStatus(t_hypo,3,t_sumsoko);
		t_sumsoko=this.p_checkSokosOfStatus(t_hypo,2,t_sumsoko);
	}
	this.p_createPotentialSokos(false,t_children,t_hypos);
	this.p_createPotentialSokos(true,t_children,t_hypos);
}
c_Sonderkonditionen.prototype.p_createAutoAssignedSokos=function(t_children,t_hypos,t_allowed_conditions){
	var t_sum_h1=this.p_getBelehnungenRang1(t_hypos);
	var t_soko=null;
	var t_aAllowedSokos=t_allowed_conditions.split(",");
	var t_=this.m__sokos.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		t_soko=t_.p_NextObject();
		var t_2=t_hypos.m__hypos.p_ObjectEnumerator();
		while(t_2.p_HasNext()){
			var t_hypo=t_2.p_NextObject();
			var t_allowed=false;
			var t_3=t_aAllowedSokos;
			var t_4=0;
			while(t_4<t_3.length){
				var t_s=t_3[t_4];
				t_4=t_4+1;
				t_s=string_trim(t_s);
				t_s=t_s.toUpperCase();
				if(t_s==t_soko.m__id){
					t_allowed=true;
					break;
				}
			}
			if(t_allowed==false){
				continue;
			}
			if(this.p_isSokoUsed(t_soko.m__id,t_hypo)){
				continue;
			}
			if(t_soko.p_efuelltBedingungen(false,t_sum_h1,t_children,t_hypo)){
				var t_zgsoko=null;
				t_zgsoko=this.p_attachSokoToHypo(t_soko,t_hypo);
				if(t_zgsoko!=null){
					t_zgsoko.m__status=2;
					t_soko.m__zugewiesenerbetrag+=t_zgsoko.m__betrag;
				}
			}
		}
	}
}
c_Sonderkonditionen.prototype.p_dropAndAutoConditions=function(t_children,t_hypos,t_allowed_conditions){
	var t_=this.m__sokos.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_soko=t_.p_NextObject();
		t_soko.m__zugewiesenerbetrag=0.0;
	}
	var t_2=t_hypos.m__hypos.p_ObjectEnumerator();
	while(t_2.p_HasNext()){
		var t_hypo=t_2.p_NextObject();
		t_hypo.m__zgsokos.p_clear();
	}
	this.p_createAutoAssignedSokos(t_children,t_hypos,t_allowed_conditions);
}
function c_Sonderkonditionen_APPKB(){
	c_Sonderkonditionen.call(this);
}
c_Sonderkonditionen_APPKB.prototype=extend_class(c_Sonderkonditionen);
c_Sonderkonditionen_APPKB.m_new=function(t_c){
	c_Sonderkonditionen.m_new.call(this,t_c);
	var t_skitem=null;
	t_skitem=c_Sonderkondition.m_new.call(new c_Sonderkondition);
	t_skitem.m__id="FAMILY";
	t_skitem.m__zinsreduktion=0.5;
	t_skitem.m__dauer=5;
	t_skitem.m__prio=1;
	t_skitem.m__min_h1=200000.0;
	t_skitem.m__min_children=1;
	t_skitem.m__max_children=2;
	t_skitem.m__allow_children_breaching=true;
	t_skitem.m__min_tranche=10000.0;
	t_skitem.m__max_summe=200000.0;
	t_skitem.p_addProduktbedingung(1,2,5);
	t_skitem.p_addProduktbedingung(1,1,0);
	this.m__sokos.p_add5(t_skitem);
	t_skitem=c_Sonderkondition.m_new.call(new c_Sonderkondition);
	t_skitem.m__id="FAMILY";
	t_skitem.m__zinsreduktion=0.5;
	t_skitem.m__dauer=5;
	t_skitem.m__prio=1;
	t_skitem.m__min_h1=200000.0;
	t_skitem.m__min_children=3;
	t_skitem.m__max_children=99;
	t_skitem.m__min_tranche=10000.0;
	t_skitem.m__max_summe=300000.0;
	t_skitem.p_addProduktbedingung(1,2,5);
	t_skitem.p_addProduktbedingung(1,1,0);
	this.m__sokos.p_add5(t_skitem);
	t_skitem=c_Sonderkondition.m_new.call(new c_Sonderkondition);
	t_skitem.m__id="WELLCOME";
	t_skitem.m__zinsreduktion=0.2;
	t_skitem.m__dauer=99;
	t_skitem.m__prio=2;
	t_skitem.m__min_h1=200000.0;
	t_skitem.m__min_children=0;
	t_skitem.m__max_children=99;
	t_skitem.m__min_tranche=10000.0;
	t_skitem.m__max_summe=1500000.0;
	t_skitem.p_addProduktbedingung(1,2,5);
	this.m__sokos.p_add5(t_skitem);
	return this;
}
c_Sonderkonditionen_APPKB.m_new2=function(){
	c_Sonderkonditionen.m_new2.call(this);
	return this;
}
function c_Sonderkondition(){
	Object.call(this);
	this.m__id="";
	this.m__zinsreduktion=.0;
	this.m__dauer=0;
	this.m__prio=0;
	this.m__min_h1=.0;
	this.m__min_children=0;
	this.m__max_children=0;
	this.m__allow_children_breaching=false;
	this.m__min_tranche=.0;
	this.m__max_summe=.0;
	this.m__prodconds=c_DynamicArray2.m_new.call(new c_DynamicArray2);
	this.m__zugewiesenerbetrag=.0;
}
c_Sonderkondition.m_new=function(){
	return this;
}
c_Sonderkondition.prototype.p_addProduktbedingung=function(t_rang,t_typ,t_minlaufzeit){
	var t_cond=c_SonderkonditionProduktbedingung.m_new.call(new c_SonderkonditionProduktbedingung);
	t_cond.m__rang=t_rang;
	t_cond.m__typ=t_typ;
	t_cond.m__minlaufzeit=t_minlaufzeit;
	this.m__prodconds.p_add4(t_cond);
}
c_Sonderkondition.prototype.p_erfuelltBasisBedingung=function(t_breaching,t_sum_h1,t_children){
	if(t_sum_h1<this.m__min_h1){
		return false;
	}
	if(t_breaching==true && this.m__allow_children_breaching==true && t_children==0){
	}else{
		if(t_children<this.m__min_children || t_children>this.m__max_children){
			return false;
		}
	}
	return true;
}
c_Sonderkondition.prototype.p_erfuelltProduktbedingung=function(t_breaching,t_hypo){
	if(t_hypo==null){
		return false;
	}
	var t_=this.m__prodconds.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_cond=t_.p_NextObject();
		if(t_hypo.m__rang==t_cond.m__rang && t_hypo.m__typ==t_cond.m__typ && t_hypo.m__laufzeit>=t_cond.m__minlaufzeit){
			return true;
		}
	}
	return false;
}
c_Sonderkondition.prototype.p_efuelltBedingungen=function(t_breaching,t_sum_h1,t_children,t_hypo){
	if(this.p_erfuelltBasisBedingung(t_breaching,t_sum_h1,t_children) && this.p_erfuelltProduktbedingung(t_breaching,t_hypo)){
		return true;
	}
	return false;
}
c_Sonderkondition.prototype.p_getOffenerBetrag=function(){
	return this.m__max_summe-this.m__zugewiesenerbetrag;
}
function c_Hypothekarkredit(){
	Object.call(this);
	this.m__id="";
	this.m__desc="";
	this.m__rang=0;
	this.m__typ=0;
	this.m__laufzeit=0;
	this.m__basiszinssatz=.0;
	this.m__betrag=.0;
	this.m__amo_prio=0;
	this.m__amo_zielwert=.0;
	this.m__zgsokos=c_ZugewieseneSonderkonditionCollection.m_new.call(new c_ZugewieseneSonderkonditionCollection);
	this.m__stand=c_DynamicArray5.m_new.call(new c_DynamicArray5);
	this.m__jahr1_zinsaufwand=.0;
	this.m__jahr1_effzinssatz=.0;
	this.m__amo_effbetrag=.0;
}
c_Hypothekarkredit.m_new=function(){
	return this;
}
c_Hypothekarkredit.prototype.p_fromJson=function(t_o){
	this.m__id=c_JSonHelper.m_S(t_o,"id");
	this.m__desc=c_JSonHelper.m_S(t_o,"description");
	this.m__rang=c_JSonHelper.m_I(t_o,"rang");
	this.m__typ=c_JSonHelper.m_I(t_o,"typ");
	this.m__laufzeit=c_JSonHelper.m_I(t_o,"duration");
	this.m__basiszinssatz=c_JSonHelper.m_F(t_o,"interestrate");
	this.m__betrag=c_JSonHelper.m_F(t_o,"amount");
	this.m__amo_prio=c_JSonHelper.m_I(t_o,"amortization_prio");
	this.m__amo_zielwert=c_JSonHelper.m_F(t_o,"amortization_amount");
	var t_a=object_downcast((t_o.p_Get("specialconditions",null)),c_JsonArray);
	if(t_a!=null){
		for(var t_i=0;t_i<t_a.p_Length();t_i=t_i+1){
			var t_so=object_downcast((t_a.p_Get3(t_i)),c_JsonObject);
			if(t_so!=null){
				var t_zgsoko=c_ZugewieseneSonderkondition.m_new.call(new c_ZugewieseneSonderkondition);
				t_zgsoko.p_fromJson(t_so);
				this.m__zgsokos.p_add2(t_zgsoko);
			}
		}
	}
}
c_Hypothekarkredit.prototype.p_getZinsaufwand=function(t_j){
	var t_st=this.m__stand.p_get(t_j);
	if(t_st!=null){
		return t_st.p_getZinsaufwand2();
	}
	return 0.0;
}
c_Hypothekarkredit.prototype.p_getEffektiverZinssatz=function(t_j){
	var t_st=this.m__stand.p_get(t_j);
	if(t_st!=null){
		return t_st.p_getEffektiverZinssatz2();
	}
	return 0.0;
}
c_Hypothekarkredit.prototype.p_prepareZeitraum=function(t_dauer){
	var t_j=0;
	var t_st=null;
	var t_soko=null;
	this.m__stand.p_clear();
	for(t_j=0;t_j<t_dauer;t_j=t_j+1){
		var t_sumSOKO=.0;
		t_st=c_HypothekarStand.m_new.call(new c_HypothekarStand);
		t_st.m__jahr=t_j;
		this.m__stand.p_add7(t_st);
		var t_=this.m__zgsokos.p_ObjectEnumerator();
		while(t_.p_HasNext()){
			var t_o=t_.p_NextObject();
			var t_zgsoko=object_downcast((t_o),c_ZugewieseneSonderkondition);
			if(t_zgsoko.m__soko_dauer<=t_j){
				continue;
			}
			if(t_zgsoko.m__status==3){
				t_st.p_addZinsTranche(t_zgsoko.m__soko_id,t_zgsoko.m__betrag_manuell,t_zgsoko.m__zinssatz);
				t_sumSOKO+=t_zgsoko.m__betrag_manuell;
			}else{
				if(t_zgsoko.m__status==2){
					t_st.p_addZinsTranche(t_zgsoko.m__soko_id,t_zgsoko.m__betrag,t_zgsoko.m__zinssatz);
					t_sumSOKO+=t_zgsoko.m__betrag;
				}
			}
		}
		if(this.m__betrag-t_sumSOKO>0.0){
			var t_betrag=this.m__betrag-t_sumSOKO;
			t_st.p_addZinsTranche("",t_betrag,this.m__basiszinssatz);
		}
	}
	this.m__jahr1_zinsaufwand=this.p_getZinsaufwand(0);
	if(this.m__zgsokos.p_length()>0){
		this.m__jahr1_effzinssatz=this.p_getEffektiverZinssatz(0);
	}else{
		this.m__jahr1_effzinssatz=this.m__basiszinssatz;
	}
}
c_Hypothekarkredit.prototype.p_getAusstehendeAmortisation=function(){
	return bb_math_Max2(0.0,this.m__amo_zielwert-this.m__amo_effbetrag);
}
c_Hypothekarkredit.prototype.p_amortisiereZinstranchen=function(t_curJahr,t_amobetrag){
	var t_st=null;
	var t_stN=null;
	t_st=this.m__stand.p_get(t_curJahr);
	if(t_st==null){
		return 0.0;
	}
	var t_maxamobetrag=.0;
	var t_effamobetrag=.0;
	var t_curStand=t_st.p_getBetrag();
	if(t_curStand>0.0){
		t_maxamobetrag=bb_math_Min2(t_amobetrag,t_curStand);
		var t_=t_st.m__ztranche.p_ObjectEnumerator();
		while(t_.p_HasNext()){
			var t_ztr=t_.p_NextObject();
			t_ztr.m__amobetrag=t_maxamobetrag/t_curStand*t_ztr.m__betrag;
			var t_neuerStand=bb_math_Max2(0.0,t_ztr.m__betrag-t_ztr.m__amobetrag);
			for(var t_nextJahre=t_curJahr+1;t_nextJahre<this.m__stand.p_length();t_nextJahre=t_nextJahre+1){
				t_stN=this.m__stand.p_get(t_nextJahre);
				if(t_stN!=null){
					t_stN.p_setStandTranche(t_ztr.m__tranchid,t_neuerStand);
				}
			}
		}
	}
	return t_maxamobetrag;
}
function c_SonderkonditionProduktbedingung(){
	Object.call(this);
	this.m__rang=0;
	this.m__typ=0;
	this.m__minlaufzeit=0;
}
c_SonderkonditionProduktbedingung.m_new=function(){
	return this;
}
function c_DynamicArray2(){
	Object.call(this);
	this.m__len=0;
	this.m__sz=0;
	this.m__i=[];
}
c_DynamicArray2.prototype.p_clear=function(){
	this.m__len=0;
	this.m__sz=10;
	this.m__i=new_object_array(this.m__sz);
}
c_DynamicArray2.m_new=function(){
	this.p_clear();
	return this;
}
c_DynamicArray2.prototype.p_add4=function(t_elt){
	this.m__len+=1;
	if(this.m__len>this.m__sz){
		this.m__sz=this.m__sz*2;
		this.m__i=resize_object_array(this.m__i,this.m__sz);
	}
	this.m__i[this.m__len-1]=t_elt;
}
c_DynamicArray2.prototype.p_ObjectEnumerator=function(){
	return c_DynArrayEnumerator3.m_new.call(new c_DynArrayEnumerator3,this);
}
c_DynamicArray2.prototype.p_length=function(){
	return this.m__len;
}
c_DynamicArray2.prototype.p_get=function(t_i){
	var t_oNULL=null;
	if(t_i>=0 && t_i<this.m__len){
		return this.m__i[t_i];
	}
	return t_oNULL;
}
function c_DynamicArray3(){
	Object.call(this);
	this.m__len=0;
	this.m__sz=0;
	this.m__i=[];
}
c_DynamicArray3.prototype.p_clear=function(){
	this.m__len=0;
	this.m__sz=10;
	this.m__i=new_object_array(this.m__sz);
}
c_DynamicArray3.m_new=function(){
	this.p_clear();
	return this;
}
c_DynamicArray3.prototype.p_add5=function(t_elt){
	this.m__len+=1;
	if(this.m__len>this.m__sz){
		this.m__sz=this.m__sz*2;
		this.m__i=resize_object_array(this.m__i,this.m__sz);
	}
	this.m__i[this.m__len-1]=t_elt;
}
c_DynamicArray3.prototype.p_ObjectEnumerator=function(){
	return c_DynArrayEnumerator.m_new.call(new c_DynArrayEnumerator,this);
}
c_DynamicArray3.prototype.p_length=function(){
	return this.m__len;
}
c_DynamicArray3.prototype.p_get=function(t_i){
	var t_oNULL=null;
	if(t_i>=0 && t_i<this.m__len){
		return this.m__i[t_i];
	}
	return t_oNULL;
}
function c_DynamicArray4(){
	Object.call(this);
	this.m__len=0;
	this.m__sz=0;
	this.m__i=[];
}
c_DynamicArray4.prototype.p_clear=function(){
	this.m__len=0;
	this.m__sz=10;
	this.m__i=new_object_array(this.m__sz);
}
c_DynamicArray4.m_new=function(){
	this.p_clear();
	return this;
}
c_DynamicArray4.prototype.p_add6=function(t_elt){
	this.m__len+=1;
	if(this.m__len>this.m__sz){
		this.m__sz=this.m__sz*2;
		this.m__i=resize_object_array(this.m__i,this.m__sz);
	}
	this.m__i[this.m__len-1]=t_elt;
}
c_DynamicArray4.prototype.p_ObjectEnumerator=function(){
	return c_DynArrayEnumerator2.m_new.call(new c_DynArrayEnumerator2,this);
}
c_DynamicArray4.prototype.p_length=function(){
	return this.m__len;
}
c_DynamicArray4.prototype.p_get=function(t_i){
	var t_oNULL=null;
	if(t_i>=0 && t_i<this.m__len){
		return this.m__i[t_i];
	}
	return t_oNULL;
}
c_DynamicArray4.prototype.p_getArray=function(){
	return this.m__i.slice(0,this.m__len);
}
c_DynamicArray4.prototype.p_addAll=function(t_arr){
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
c_DynamicArray4.prototype.p_compareItem2=function(t_e1,t_e2){
	error("Unable to compare items");
	return 0;
}
c_DynamicArray4.prototype.p_qsort=function(t_min,t_max,t_ccsgn){
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
c_DynamicArray4.prototype.p_sortArray=function(t_ascending){
	var t_ccsgn=-1;
	if(t_ascending){
		t_ccsgn=1;
	}
	this.p_qsort(0,this.p_length()-1,t_ccsgn);
}
function c_HypothekenDynamicArray(){
	c_DynamicArray4.call(this);
	this.m__comp=0;
}
c_HypothekenDynamicArray.prototype=extend_class(c_DynamicArray4);
c_HypothekenDynamicArray.m_new=function(){
	c_DynamicArray4.m_new.call(this);
	return this;
}
c_HypothekenDynamicArray.prototype.p_compareItem2=function(t_e1,t_e2){
	if(this.m__comp==1){
		if(t_e1.m__rang>t_e2.m__rang){
			return 1;
		}else{
			if(t_e1.m__rang<t_e2.m__rang){
				return -1;
			}
		}
		if(t_e1.m__basiszinssatz>t_e2.m__basiszinssatz){
			return 1;
		}else{
			return -1;
		}
	}
	return 0;
}
function c_JSonHelper(){
	Object.call(this);
}
c_JSonHelper.m_S=function(t_o,t_s){
	try{
		var t_v=t_o.p_Get(t_s,null);
		if(t_v!=null){
			return t_v.p_StringValue();
		}
	}catch(_eek_){
		if(t_err=object_downcast(_eek_,ThrowableObject)){
		}else{
			throw _eek_;
		}
	}
	return "";
}
c_JSonHelper.m_S2=function(t_o,t_s,t_defaultValue){
	try{
		var t_v=t_o.p_Get(t_s,null);
		if(t_v!=null){
			return t_v.p_StringValue();
		}
	}catch(_eek_){
		if(t_err=object_downcast(_eek_,ThrowableObject)){
		}else{
			throw _eek_;
		}
	}
	return t_defaultValue;
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
c_JSonHelper.m_hasValue=function(t_o,t_s){
	try{
		var t_v=t_o.p_Get(t_s,null);
		if(t_v!=null){
			return true;
		}
	}catch(_eek_){
		if(t_err=object_downcast(_eek_,ThrowableObject)){
		}else{
			throw _eek_;
		}
	}
	return false;
}
function c_ZugewieseneSonderkondition(){
	Object.call(this);
	this.m__soko_id="";
	this.m__soko_prio=0;
	this.m__soko_dauer=0;
	this.m__soko_reduktion=.0;
	this.m__status=0;
	this.m__betrag=.0;
	this.m__zinssatz=.0;
	this.m__betrag_manuell=.0;
	this.m__tmp_soko=null;
}
c_ZugewieseneSonderkondition.m_new=function(){
	return this;
}
c_ZugewieseneSonderkondition.prototype.p_fromJson=function(t_o){
	this.m__soko_id=c_JSonHelper.m_S(t_o,"id");
	this.m__soko_prio=0;
	this.m__soko_dauer=0;
	this.m__soko_reduktion=0.0;
	this.m__status=c_JSonHelper.m_I(t_o,"status");
	this.m__betrag=0.0;
	this.m__zinssatz=0.0;
	this.m__betrag_manuell=c_JSonHelper.m_F(t_o,"amount_manual");
}
c_ZugewieseneSonderkondition.prototype.p_hasSoko=function(){
	if(this.m__soko_id==""){
		return false;
	}
	if(this.m__status==2 || this.m__status==3){
		return true;
	}
	return false;
}
c_ZugewieseneSonderkondition.prototype.p_updateBasisdaten=function(t_soko,t_hypo){
	this.m__soko_id=t_soko.m__id;
	this.m__soko_prio=t_soko.m__prio;
	this.m__soko_dauer=bb_math_Min(t_soko.m__dauer,t_hypo.m__laufzeit);
	this.m__soko_reduktion=t_soko.m__zinsreduktion;
	this.m__zinssatz=bb_math_Max2(0.0,t_hypo.m__basiszinssatz-t_soko.m__zinsreduktion);
}
function c_ZugewieseneSonderkonditionCollection(){
	c_Collection.call(this);
}
c_ZugewieseneSonderkonditionCollection.prototype=extend_class(c_Collection);
c_ZugewieseneSonderkonditionCollection.m_new=function(){
	c_Collection.m_new.call(this);
	return this;
}
c_ZugewieseneSonderkonditionCollection.prototype.p_compareItem=function(t_e1,t_e2){
	var t_o1=object_downcast((t_e1),c_ZugewieseneSonderkondition);
	var t_o2=object_downcast((t_e2),c_ZugewieseneSonderkondition);
	if(t_o1.m__soko_prio>t_o2.m__soko_prio){
		return 1;
	}
	if(t_o1.m__soko_prio<t_o2.m__soko_prio){
		return -1;
	}
	return 0;
}
function c_DynArrayEnumerator(){
	Object.call(this);
	this.m__arr=null;
	this.m__curr=0;
}
c_DynArrayEnumerator.m_new=function(t_arr){
	this.m__arr=t_arr;
	this.m__curr=-1;
	return this;
}
c_DynArrayEnumerator.m_new2=function(){
	return this;
}
c_DynArrayEnumerator.prototype.p_HasNext=function(){
	if(this.m__curr+1<this.m__arr.p_length()){
		return true;
	}
	return false;
}
c_DynArrayEnumerator.prototype.p_NextObject=function(){
	this.m__curr+=1;
	return this.m__arr.p_get(this.m__curr);
}
function c_DynArrayEnumerator2(){
	Object.call(this);
	this.m__arr=null;
	this.m__curr=0;
}
c_DynArrayEnumerator2.m_new=function(t_arr){
	this.m__arr=t_arr;
	this.m__curr=-1;
	return this;
}
c_DynArrayEnumerator2.m_new2=function(){
	return this;
}
c_DynArrayEnumerator2.prototype.p_HasNext=function(){
	if(this.m__curr+1<this.m__arr.p_length()){
		return true;
	}
	return false;
}
c_DynArrayEnumerator2.prototype.p_NextObject=function(){
	this.m__curr+=1;
	return this.m__arr.p_get(this.m__curr);
}
function c_DynArrayEnumerator3(){
	Object.call(this);
	this.m__arr=null;
	this.m__curr=0;
}
c_DynArrayEnumerator3.m_new=function(t_arr){
	this.m__arr=t_arr;
	this.m__curr=-1;
	return this;
}
c_DynArrayEnumerator3.m_new2=function(){
	return this;
}
c_DynArrayEnumerator3.prototype.p_HasNext=function(){
	if(this.m__curr+1<this.m__arr.p_length()){
		return true;
	}
	return false;
}
c_DynArrayEnumerator3.prototype.p_NextObject=function(){
	this.m__curr+=1;
	return this.m__arr.p_get(this.m__curr);
}
function c_HypothekarStand(){
	Object.call(this);
	this.m__jahr=0;
	this.m__ztranche=c_DynamicArray6.m_new.call(new c_DynamicArray6);
}
c_HypothekarStand.m_new=function(){
	return this;
}
c_HypothekarStand.prototype.p_addZinsTranche=function(t_tranchid,t_betrag,t_zinssatz){
	var t_ztr=c_HypothekarStandZinstranche.m_new.call(new c_HypothekarStandZinstranche);
	t_ztr.m__tranchid=t_tranchid;
	t_ztr.m__betrag=t_betrag;
	t_ztr.m__zinssatz=t_zinssatz;
	this.m__ztranche.p_add8(t_ztr);
}
c_HypothekarStand.prototype.p_getZinsaufwand2=function(){
	var t_val=.0;
	var t_=this.m__ztranche.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_ztr=t_.p_NextObject();
		t_val+=t_ztr.p_getZinsaufwand2();
	}
	return t_val;
}
c_HypothekarStand.prototype.p_getBetrag=function(){
	var t_val=.0;
	var t_=this.m__ztranche.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_ztr=t_.p_NextObject();
		t_val+=t_ztr.m__betrag;
	}
	return t_val;
}
c_HypothekarStand.prototype.p_getEffektiverZinssatz2=function(){
	var t_val=this.p_getBetrag();
	if(t_val>0.0){
		return this.p_getZinsaufwand2()*100.0/t_val;
	}
	return 0.0;
}
c_HypothekarStand.prototype.p_setStandTranche=function(t_tranchid,t_betrag){
	var t_=this.m__ztranche.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_ztr=t_.p_NextObject();
		if(t_ztr.m__tranchid==t_tranchid){
			t_ztr.m__betrag=t_betrag;
			break;
		}
	}
}
c_HypothekarStand.prototype.p_getAmoBetrag=function(){
	var t_val=.0;
	var t_=this.m__ztranche.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_ztr=t_.p_NextObject();
		t_val+=t_ztr.m__amobetrag;
	}
	return t_val;
}
function c_DynamicArray5(){
	Object.call(this);
	this.m__len=0;
	this.m__sz=0;
	this.m__i=[];
}
c_DynamicArray5.prototype.p_clear=function(){
	this.m__len=0;
	this.m__sz=10;
	this.m__i=new_object_array(this.m__sz);
}
c_DynamicArray5.m_new=function(){
	this.p_clear();
	return this;
}
c_DynamicArray5.prototype.p_add7=function(t_elt){
	this.m__len+=1;
	if(this.m__len>this.m__sz){
		this.m__sz=this.m__sz*2;
		this.m__i=resize_object_array(this.m__i,this.m__sz);
	}
	this.m__i[this.m__len-1]=t_elt;
}
c_DynamicArray5.prototype.p_get=function(t_i){
	var t_oNULL=null;
	if(t_i>=0 && t_i<this.m__len){
		return this.m__i[t_i];
	}
	return t_oNULL;
}
c_DynamicArray5.prototype.p_length=function(){
	return this.m__len;
}
function c_HypothekarStandZinstranche(){
	Object.call(this);
	this.m__tranchid="";
	this.m__betrag=.0;
	this.m__zinssatz=.0;
	this.m__amobetrag=.0;
}
c_HypothekarStandZinstranche.m_new=function(){
	return this;
}
c_HypothekarStandZinstranche.prototype.p_getZinsaufwand2=function(){
	return this.m__betrag*this.m__zinssatz/100.0;
}
function c_DynamicArray6(){
	Object.call(this);
	this.m__len=0;
	this.m__sz=0;
	this.m__i=[];
}
c_DynamicArray6.prototype.p_clear=function(){
	this.m__len=0;
	this.m__sz=10;
	this.m__i=new_object_array(this.m__sz);
}
c_DynamicArray6.m_new=function(){
	this.p_clear();
	return this;
}
c_DynamicArray6.prototype.p_add8=function(t_elt){
	this.m__len+=1;
	if(this.m__len>this.m__sz){
		this.m__sz=this.m__sz*2;
		this.m__i=resize_object_array(this.m__i,this.m__sz);
	}
	this.m__i[this.m__len-1]=t_elt;
}
c_DynamicArray6.prototype.p_ObjectEnumerator=function(){
	return c_DynArrayEnumerator4.m_new.call(new c_DynArrayEnumerator4,this);
}
c_DynamicArray6.prototype.p_length=function(){
	return this.m__len;
}
c_DynamicArray6.prototype.p_get=function(t_i){
	var t_oNULL=null;
	if(t_i>=0 && t_i<this.m__len){
		return this.m__i[t_i];
	}
	return t_oNULL;
}
function c_DynArrayEnumerator4(){
	Object.call(this);
	this.m__arr=null;
	this.m__curr=0;
}
c_DynArrayEnumerator4.m_new=function(t_arr){
	this.m__arr=t_arr;
	this.m__curr=-1;
	return this;
}
c_DynArrayEnumerator4.m_new2=function(){
	return this;
}
c_DynArrayEnumerator4.prototype.p_HasNext=function(){
	if(this.m__curr+1<this.m__arr.p_length()){
		return true;
	}
	return false;
}
c_DynArrayEnumerator4.prototype.p_NextObject=function(){
	this.m__curr+=1;
	return this.m__arr.p_get(this.m__curr);
}
function c_EffektiveWohnkosten(){
	Object.call(this);
	this.m__customizing="";
}
c_EffektiveWohnkosten.m_new=function(t_c){
	this.m__customizing=t_c;
	return this;
}
c_EffektiveWohnkosten.m_new2=function(){
	return this;
}
c_EffektiveWohnkosten.m_getInstanceFor=function(t_customizing){
	return c_EffektiveWohnkosten.m_new.call(new c_EffektiveWohnkosten,t_customizing);
}
c_EffektiveWohnkosten.prototype.p_berechne9=function(t_kinder,t_gesamtkosten,t_objektwert,t_eigenmittel,t_harte_eigenmittel,t_zusatzsicherheiten_total,t_zusatzsicherheiten_aus_s2,t_massgeinkommen,t_zusatzkosten,t_zusatzertrag,t_amogesetzt,t_amortisation,t_mortgageJSON,t_zeithorizont){
	var t_wk=c_Wohnkosten.m_getInstanceFor(this.m__customizing);
	var t_sokos=c_Sonderkonditionen.m_getInstanceFor(this.m__customizing);
	var t_res=c_EffektiveWohnkostenResultat.m_new.call(new c_EffektiveWohnkostenResultat);
	var t_hypos=c_Hypotheken.m_new.call(new c_Hypotheken);
	t_hypos.p_fromJson2(t_mortgageJSON);
	t_sokos.p_verifyHypotheken(t_kinder,t_hypos);
	t_hypos.p_prepareZeitraum(t_zeithorizont);
	if(t_gesamtkosten<t_objektwert){
		t_gesamtkosten=t_objektwert;
	}
	if(t_zusatzsicherheiten_total<t_zusatzsicherheiten_aus_s2){
		t_zusatzsicherheiten_total=t_zusatzsicherheiten_aus_s2;
	}
	var t_mehrKosten=bb_math_Max2(0.0,t_gesamtkosten-t_objektwert);
	var t_maxBelehnung=t_objektwert*t_wk.m__p_maxbelehnung/100.0;
	t_res.m__gesamtkosten=t_gesamtkosten;
	t_res.m__objektwert=t_objektwert;
	t_res.m__zusatzsicherheiten_total=t_zusatzsicherheiten_total;
	t_res.m__zusatzsicher_aus_s2=t_zusatzsicherheiten_aus_s2;
	t_res.m__zusatzsicherheiten_belehnbar=t_zusatzsicherheiten_total*t_wk.m__p_zusatzsicherheiten/100.0;
	if(bb_utils_isGZero(t_wk.m__p_max_zusatzsicherheiten_ow,0)){
		t_res.m__zusatzsicherheiten_belehnbar=bb_math_Min2(t_res.m__zusatzsicherheiten_belehnbar,t_objektwert*t_wk.m__p_max_zusatzsicherheiten_ow/100.0);
	}
	t_res.m__max_nettobelehnung=t_objektwert*t_wk.m__p_max_nettobelehnung/100.0;
	t_res.m__nettobelehnung=bb_math_Max2(0.0,t_gesamtkosten-t_res.m__zusatzsicherheiten_belehnbar-t_eigenmittel);
	t_res.m__ueberbelehnung=bb_math_Max2(0.0,t_res.m__nettobelehnung-t_maxBelehnung);
	if(t_wk.m__amortisationsdauer_s2>0){
		t_res.m__ueberbelehnung_ohne_s2=bb_math_Max2(0.0,t_res.m__ueberbelehnung-t_zusatzsicherheiten_aus_s2);
	}else{
		t_res.m__ueberbelehnung_ohne_s2=t_res.m__ueberbelehnung;
	}
	if(t_objektwert>0.0){
		t_res.m__nettobelehnungs_quote=t_res.m__nettobelehnung*100.0/t_objektwert;
	}
	var t_=t_hypos.m__hypos.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_hypo=t_.p_NextObject();
		if(t_hypo.m__rang==1){
			t_res.m__belehnung_h1+=t_hypo.m__betrag;
			t_res.m__j_zinsen_h1+=t_hypo.m__jahr1_zinsaufwand;
			t_res.m__hypos.p_add6(t_hypo);
		}else{
			if(t_hypo.m__rang==2){
				t_res.m__belehnung_h2+=t_hypo.m__betrag;
				t_res.m__j_zinsen_h2+=t_hypo.m__jahr1_zinsaufwand;
				t_res.m__hypos.p_add6(t_hypo);
			}
		}
	}
	t_res.m__belehnung=t_res.m__belehnung_h1+t_res.m__belehnung_h2;
	if(t_objektwert>0.0){
		t_res.m__verschuldungs_quote=t_res.m__belehnung*100.0/t_objektwert;
	}
	if(t_res.m__belehnung_h1>0.0){
		t_res.m__avg_zinssatz_h1=t_res.m__j_zinsen_h1*100.0/t_res.m__belehnung_h1;
	}
	if(t_res.m__belehnung_h2>0.0){
		t_res.m__avg_zinssatz_h2=t_res.m__j_zinsen_h2*100.0/t_res.m__belehnung_h2;
	}
	if(t_res.m__belehnung>0.0){
		t_res.m__avg_zinssatz=(t_res.m__j_zinsen_h1+t_res.m__j_zinsen_h2)*100.0/t_res.m__belehnung;
	}
	if(t_wk.m__p_maxbelehnung_h1<t_wk.m__p_max_nettobelehnung || t_res.m__belehnung_h2>0.0){
		t_res.m__hat_hypo2=true;
	}
	t_res.m__eigenmittel=t_eigenmittel;
	t_res.m__fehl_eigenmittel=bb_math_Max2(0.0,t_res.m__belehnung-t_res.m__nettobelehnung-t_res.m__zusatzsicherheiten_belehnbar);
	if(t_objektwert>0.0){
		t_res.m__eigenmittel_quote=bb_math_Max2(0.0,(t_eigenmittel+t_zusatzsicherheiten_total-t_mehrKosten)*100.0/t_objektwert);
		t_res.m__eigenmittel_ohne_s2_quote=bb_math_Max2(0.0,(t_harte_eigenmittel+t_zusatzsicherheiten_total-t_zusatzsicherheiten_aus_s2-t_mehrKosten)*100.0/t_objektwert);
	}
	if(t_wk.m__amortisationsdauer_hypo>0){
		t_res.m__amortisation_hypo=bb_math_Max2(0.0,t_res.m__belehnung-t_res.m__ueberbelehnung_ohne_s2-t_res.m__zusatzsicherheiten_belehnbar-t_objektwert*t_wk.m__p_amortisationsziel/100.0);
		t_res.m__j_amortisation+=t_res.m__amortisation_hypo/(t_wk.m__amortisationsdauer_hypo);
		t_res.m__amortisation_total+=t_res.m__amortisation_hypo;
	}
	if(t_wk.m__amortisationsdauer_ueber>0){
		t_res.m__amortisation_ueber=t_res.m__ueberbelehnung_ohne_s2;
		t_res.m__j_amortisation+=t_res.m__amortisation_ueber/(t_wk.m__amortisationsdauer_ueber);
		t_res.m__amortisation_total+=t_res.m__amortisation_ueber;
	}
	if(t_wk.m__amortisationsdauer_s2>0){
		t_res.m__amortisation_s2=t_zusatzsicherheiten_aus_s2;
		t_res.m__j_amortisation+=t_res.m__amortisation_s2/(t_wk.m__amortisationsdauer_s2);
		t_res.m__amortisation_total+=t_res.m__amortisation_s2;
	}
	if(t_amogesetzt==false){
		if(t_wk.m__p_min_amo_von_belehnung>0.0){
			if(t_res.m__amortisation_total>0.0){
				var t_minAmo=t_res.m__belehnung*t_wk.m__p_min_amo_von_belehnung/100.0;
				if(t_res.m__j_amortisation<t_minAmo){
					t_res.m__j_amortisation=t_minAmo;
				}
			}
		}
		if(t_res.m__j_amortisation<t_wk.m__j_trunc_amo_unter){
			t_res.m__j_amortisation=0.0;
		}
	}else{
		t_res.m__j_amortisation=t_amortisation;
		t_res.m__j_amortisation_manuell=true;
	}
	t_res.m__massg_einkommen=t_massgeinkommen;
	t_res.m__nebenkostensatz=t_wk.m__p_nebenkosten;
	t_res.m__j_nebenkosten=t_objektwert*t_wk.m__p_nebenkosten/100.0;
	t_res.m__j_weiterekosten=t_zusatzkosten;
	t_res.m__j_weitereertraege=t_zusatzertrag;
	t_res.p_updateWohnkosten(null);
	t_res.m__j_belastung_proz=0.0;
	if(t_res.m__massg_einkommen>0.0){
		t_res.m__j_belastung_proz=t_res.m__j_wohnkosten*100.0/t_res.m__massg_einkommen;
	}else{
		t_res.m__j_belastung_proz=100.0;
	}
	return t_res;
}
function c_EffektiveWohnkostenResultat(){
	c_WohnkostenResultat.call(this);
	this.m__hypos=c_DynamicArray4.m_new.call(new c_DynamicArray4);
	this.m__avg_zinssatz_h1=.0;
	this.m__avg_zinssatz_h2=.0;
	this.m__avg_zinssatz=.0;
}
c_EffektiveWohnkostenResultat.prototype=extend_class(c_WohnkostenResultat);
c_EffektiveWohnkostenResultat.m_new=function(){
	c_WohnkostenResultat.m_new.call(this);
	return this;
}
c_EffektiveWohnkostenResultat.prototype.p_runden2=function(t_customizing){
	var t_R=c_HausResultatRunden.m_getInstanceFor(t_customizing);
	c_WohnkostenResultat.prototype.p_runden.call(this,t_R);
	this.m__avg_zinssatz_h1=t_R.p_rundeZinssatz(this.m__avg_zinssatz_h1);
	this.m__avg_zinssatz_h2=t_R.p_rundeZinssatz(this.m__avg_zinssatz_h2);
	this.m__avg_zinssatz=t_R.p_rundeZinssatz(this.m__avg_zinssatz);
	var t_=this.m__hypos.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_hypo=t_.p_NextObject();
		t_hypo.m__jahr1_zinsaufwand=t_R.p_rundeZinsen(t_hypo.m__jahr1_zinsaufwand);
		t_hypo.m__jahr1_effzinssatz=t_R.p_rundeZinssatz(t_hypo.m__jahr1_effzinssatz);
	}
}
function c_DirekteAmortisationResultat(){
	Object.call(this);
	this.m__belehnung_h1=.0;
	this.m__j_zinsen_h1=.0;
	this.m__belehnung_h2=.0;
	this.m__j_zinsen_h2=.0;
	this.m__belehnung=.0;
	this.m__avg_zinssatz_h1=.0;
	this.m__avg_zinssatz_h2=.0;
	this.m__avg_zinssatz=.0;
	this.m__hat_hypo2=false;
	this.m__j_amortisation=.0;
	this.m__amortisation_total=.0;
	this.m__zinsen_total=.0;
	this.m__steuereffekt_total=.0;
}
c_DirekteAmortisationResultat.m_new=function(){
	return this;
}
c_DirekteAmortisationResultat.prototype.p_runden=function(t_R){
	this.m__belehnung=t_R.p_rundeBelehnung(this.m__belehnung);
	this.m__belehnung_h1=t_R.p_rundeBelehnung(this.m__belehnung_h1);
	this.m__belehnung_h2=t_R.p_rundeBelehnung(this.m__belehnung_h2);
	this.m__j_zinsen_h1=t_R.p_rundeZinsen(this.m__j_zinsen_h1);
	this.m__j_zinsen_h2=t_R.p_rundeZinsen(this.m__j_zinsen_h2);
	this.m__j_amortisation=t_R.p_rundeJaehrlicheAmortisation(this.m__j_amortisation);
	this.m__amortisation_total=t_R.p_rundeAmortisation(this.m__amortisation_total);
	this.m__zinsen_total=t_R.p_rundeZinsen(this.m__zinsen_total);
	this.m__avg_zinssatz_h1=t_R.p_rundeZinssatz(this.m__avg_zinssatz_h1);
	this.m__avg_zinssatz_h2=t_R.p_rundeZinssatz(this.m__avg_zinssatz_h2);
	this.m__avg_zinssatz=t_R.p_rundeZinssatz(this.m__avg_zinssatz);
}
c_DirekteAmortisationResultat.prototype.p_runden2=function(t_customizing){
	var t_R=c_HausResultatRunden.m_getInstanceFor(t_customizing);
	this.p_runden(t_R);
}
function c_BaseAmortisation(){
	Object.call(this);
	this.m__customizing="";
}
c_BaseAmortisation.m_new=function(){
	return this;
}
c_BaseAmortisation.prototype.p_getSteuergrundlage0=function(t_taxbaseJSON,t_neueHypo,t_zinsen,t_eigenmietwert,t_ukosten){
	var t_stgrundlg=c_EinfacheSteuergrundlage.m_new.call(new c_EinfacheSteuergrundlage);
	if(t_stgrundlg.p_fromJson2(t_taxbaseJSON)){
		t_stgrundlg.p_updateEinkommen(0.0,0.0);
		var t_stbredukt=.0;
		if(t_neueHypo==false){
			if(t_stgrundlg.m__wertbasis==2){
				t_stbredukt=-t_zinsen-t_ukosten+t_eigenmietwert;
			}
		}
		if(bb_utils_isNotZero(t_stbredukt,0)){
			t_stgrundlg.p_updateEinkommen(0.0,t_stbredukt);
		}
		return t_stgrundlg;
	}
	return null;
}
c_BaseAmortisation.prototype.p_berechneEKSteuerneffekt=function(t_stgrundlg,t_zinsen,t_s3apraemie,t_eigenmietwert,t_ukosten){
	if(t_stgrundlg==null){
		return 0.0;
	}
	if(t_stgrundlg.m__calc==null){
		return 0.0;
	}
	t_stgrundlg.p_setBerechnungsgrundlagen(c_StC_common.m_Rundung_Franken);
	var t_stbredukt=t_s3apraemie+t_zinsen+t_ukosten-t_eigenmietwert;
	var t_stVorher=.0;
	var t_stNacher=.0;
	var t_oEK=t_stgrundlg.m__calc.p_addSteuerObjekt(c_StC_natPers.m_CalcTyp_EINKOMMENSSTEUER);
	t_oEK.p_calculate();
	t_stVorher=t_oEK.p_getGesamtsteuer();
	t_stgrundlg.m__calc.m__grundlage.m__stbEkBund=bb_math_Max2(0.0,t_stgrundlg.m__stbek_bund-t_stbredukt);
	if(bb_utils_isNotZero(t_stgrundlg.m__satzek_bund,0)){
		t_stgrundlg.m__calc.m__grundlage.m__satzbEkBund=bb_math_Max2(0.0,t_stgrundlg.m__satzek_bund-t_stbredukt);
	}
	t_stgrundlg.m__calc.m__grundlage.m__stbEkGmd=bb_math_Max2(0.0,t_stgrundlg.m__stbek_kt-t_stbredukt);
	t_stgrundlg.m__calc.m__grundlage.m__stbEkKt=bb_math_Max2(0.0,t_stgrundlg.m__stbek_kt-t_stbredukt);
	if(bb_utils_isNotZero(t_stgrundlg.m__satzek_kt,0)){
		t_stgrundlg.m__calc.m__grundlage.m__satzbEkKt=bb_math_Max2(0.0,t_stgrundlg.m__satzek_kt-t_stbredukt);
	}
	t_oEK.p_calculate();
	t_stNacher=t_oEK.p_getGesamtsteuer();
	t_stgrundlg.m__calc.p_removeSteuerObjekt(t_oEK.p_getUID());
	return t_stVorher-t_stNacher;
}
c_BaseAmortisation.prototype.p_berechneKapSteuer=function(t_stgrundlg,t_kapital,t_endalter){
	var t_kapst=c_KapitalleistungsSteuer.m_new.call(new c_KapitalleistungsSteuer);
	t_kapst.p_berechne6(t_stgrundlg,t_kapital,t_endalter,0);
	return t_kapst.m__tot;
}
function c_DirekteAmortisation(){
	c_BaseAmortisation.call(this);
}
c_DirekteAmortisation.prototype=extend_class(c_BaseAmortisation);
c_DirekteAmortisation.m_new=function(t_c){
	c_BaseAmortisation.m_new.call(this);
	this.m__customizing=t_c;
	return this;
}
c_DirekteAmortisation.m_new2=function(){
	c_BaseAmortisation.m_new.call(this);
	return this;
}
c_DirekteAmortisation.m_getInstanceFor=function(t_customizing){
	return c_DirekteAmortisation.m_new.call(new c_DirekteAmortisation,t_customizing);
}
c_DirekteAmortisation.prototype.p_amortisiere=function(t_amo_ziel,t_amo_pro_jahr,t_dauer,t_hypos){
	var t_curPrio=0;
	var t_curJahr=0;
	var t_restamoziel=t_amo_ziel;
	var t_nProPrio=0;
	var t_st=null;
	var t_stN=null;
	var t_minPrio=0;
	var t_maxPrio=0;
	var t_first=false;
	t_first=true;
	var t_=t_hypos.m__hypos.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_hypo=t_.p_NextObject();
		if(t_hypo.p_getAusstehendeAmortisation()>0.0){
			if(t_first){
				t_first=false;
				t_minPrio=t_hypo.m__amo_prio;
				t_maxPrio=t_hypo.m__amo_prio;
			}else{
				t_minPrio=bb_math_Min(t_minPrio,t_hypo.m__amo_prio);
				t_maxPrio=bb_math_Max(t_maxPrio,t_hypo.m__amo_prio);
			}
		}
	}
	for(t_curJahr=0;t_curJahr<t_dauer;t_curJahr=t_curJahr+1){
		if(t_restamoziel<1.0){
			break;
		}
		var t_verteileAmoProJahr=t_amo_pro_jahr;
		for(t_curPrio=t_minPrio;t_curPrio<=t_maxPrio;t_curPrio=t_curPrio+1){
			if(t_restamoziel<1.0 || t_verteileAmoProJahr<1.0){
				break;
			}
			t_nProPrio=0;
			var t_2=t_hypos.m__hypos.p_ObjectEnumerator();
			while(t_2.p_HasNext()){
				var t_hypo2=t_2.p_NextObject();
				if(t_hypo2.p_getAusstehendeAmortisation()>0.0 && t_hypo2.m__amo_prio==t_curPrio){
					t_st=t_hypo2.m__stand.p_get(t_curJahr);
					if(t_st==null){
						continue;
					}
					if(t_st.p_getBetrag()>0.0){
						t_nProPrio+=1;
					}
				}
			}
			if(t_nProPrio==0){
				continue;
			}
			var t_amobetrag=bb_math_Max2(0.0,bb_math_Min2(t_restamoziel,t_verteileAmoProJahr)/(t_nProPrio));
			var t_3=t_hypos.m__hypos.p_ObjectEnumerator();
			while(t_3.p_HasNext()){
				var t_hypo3=t_3.p_NextObject();
				if(t_restamoziel<1.0 || t_verteileAmoProJahr<1.0){
					break;
				}
				if(t_hypo3.p_getAusstehendeAmortisation()>0.0 && t_hypo3.m__amo_prio==t_curPrio){
					var t_effAmo=t_hypo3.p_amortisiereZinstranchen(t_curJahr,bb_math_Min2(t_amobetrag,t_hypo3.p_getAusstehendeAmortisation()));
					if(t_effAmo>0.0){
						t_hypo3.m__amo_effbetrag+=t_effAmo;
						t_restamoziel-=t_effAmo;
						t_verteileAmoProJahr-=t_effAmo;
					}
				}
			}
		}
	}
}
c_DirekteAmortisation.prototype.p_berechne10=function(t_taxbaseJSON,t_amo_ziel,t_dauer,t_hat_amo_details,t_eigenmietwert,t_ukosten,t_newmortgages,t_mortgageJSON){
	var t_R=c_HausResultatRunden.m_getInstanceFor(this.m__customizing);
	var t_wk=c_Wohnkosten.m_getInstanceFor(this.m__customizing);
	var t_res=c_DirekteAmortisationResultat.m_new.call(new c_DirekteAmortisationResultat);
	var t_hypos=c_Hypotheken.m_new.call(new c_Hypotheken);
	t_hypos.p_fromJson2(t_mortgageJSON);
	if(t_hat_amo_details==false){
		t_hypos.p_prepareAmortisation(t_amo_ziel,t_dauer);
	}
	t_hypos.p_prepareZeitraum(t_dauer);
	var t_=t_hypos.m__hypos.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_hypo=t_.p_NextObject();
		if(t_hypo.m__rang==1){
			t_res.m__belehnung_h1+=t_hypo.m__betrag;
			t_res.m__j_zinsen_h1+=t_hypo.m__jahr1_zinsaufwand;
		}else{
			if(t_hypo.m__rang==2){
				t_res.m__belehnung_h2+=t_hypo.m__betrag;
				t_res.m__j_zinsen_h2+=t_hypo.m__jahr1_zinsaufwand;
			}
		}
	}
	t_res.m__belehnung=t_res.m__belehnung_h1+t_res.m__belehnung_h2;
	if(t_res.m__belehnung_h1>0.0){
		t_res.m__avg_zinssatz_h1=t_res.m__j_zinsen_h1*100.0/t_res.m__belehnung_h1;
	}
	if(t_res.m__belehnung_h2>0.0){
		t_res.m__avg_zinssatz_h2=t_res.m__j_zinsen_h2*100.0/t_res.m__belehnung_h2;
	}
	if(t_res.m__belehnung>0.0){
		t_res.m__avg_zinssatz=(t_res.m__j_zinsen_h1+t_res.m__j_zinsen_h2)*100.0/t_res.m__belehnung;
	}
	if(t_wk.m__p_maxbelehnung_h1<t_wk.m__p_max_nettobelehnung || t_res.m__belehnung_h2>0.0){
		t_res.m__hat_hypo2=true;
	}
	if(t_dauer>0){
		t_res.m__j_amortisation=t_amo_ziel/(t_dauer);
		if(t_wk.m__p_min_amo_von_belehnung>0.0){
			if(t_amo_ziel>0.0){
				var t_minAmo=t_res.m__belehnung*t_wk.m__p_min_amo_von_belehnung/100.0;
				if(t_res.m__j_amortisation<t_minAmo){
					t_res.m__j_amortisation=t_minAmo;
				}
			}
		}
		if(t_res.m__j_amortisation<t_wk.m__j_trunc_amo_unter){
			t_res.m__j_amortisation=0.0;
		}
	}
	if(t_res.m__j_amortisation>0.0){
		this.p_amortisiere(t_amo_ziel,t_res.m__j_amortisation,t_dauer,t_hypos);
	}
	var t_stgrundlg=null;
	t_stgrundlg=this.p_getSteuergrundlage0(t_taxbaseJSON,t_newmortgages,t_res.m__j_zinsen_h1+t_res.m__j_zinsen_h2,t_eigenmietwert,t_ukosten);
	var t_st=null;
	for(var t_curJahr=0;t_curJahr<t_dauer;t_curJahr=t_curJahr+1){
		var t_zinsen=.0;
		var t_2=t_hypos.m__hypos.p_ObjectEnumerator();
		while(t_2.p_HasNext()){
			var t_hypo2=t_2.p_NextObject();
			t_st=t_hypo2.m__stand.p_get(t_curJahr);
			if(t_st!=null){
				t_res.m__amortisation_total+=t_st.p_getAmoBetrag();
				t_res.m__zinsen_total+=t_st.p_getZinsaufwand2();
				t_zinsen+=t_st.p_getZinsaufwand2();
			}
		}
		var t_eff=this.p_berechneEKSteuerneffekt(t_stgrundlg,t_zinsen,0.0,t_eigenmietwert,t_ukosten);
		t_res.m__steuereffekt_total+=t_eff;
	}
	return t_res;
}
function c_IndirekteAmortisationResultat(){
	Object.call(this);
	this.m__mindsparuqote=.0;
	this.m__endkap=.0;
	this.m__bruttokap=.0;
	this.m__kapsteuer=.0;
	this.m__nettokap=.0;
	this.m__steuereffekt_total=.0;
	this.m__fehlendeskap=.0;
	this.m__ueberdeckung=.0;
	this.m__zinsen_total=.0;
	this.m__einlagen_total=.0;
}
c_IndirekteAmortisationResultat.m_new=function(){
	return this;
}
c_IndirekteAmortisationResultat.prototype.p_runden=function(t_R){
	this.m__mindsparuqote=bb_utils_roundUp(this.m__mindsparuqote);
	this.m__fehlendeskap=bb_utils_roundUp(this.m__fehlendeskap);
	this.m__ueberdeckung=bb_utils_roundUp(this.m__ueberdeckung);
	this.m__endkap=bb_utils_roundUp(this.m__endkap);
	this.m__bruttokap=bb_utils_roundUp(this.m__bruttokap);
	this.m__nettokap=this.m__bruttokap-this.m__kapsteuer;
	this.m__zinsen_total=t_R.p_rundeZinsen(this.m__zinsen_total);
}
c_IndirekteAmortisationResultat.prototype.p_runden2=function(t_customizing){
	var t_R=c_HausResultatRunden.m_getInstanceFor(t_customizing);
	this.p_runden(t_R);
}
c_IndirekteAmortisationResultat.prototype.p_getBruttoKosten=function(){
	return this.m__zinsen_total+this.m__einlagen_total-this.m__steuereffekt_total;
}
c_IndirekteAmortisationResultat.prototype.p_getNettoKosten=function(){
	return this.p_getBruttoKosten()+this.m__fehlendeskap-this.m__ueberdeckung+this.m__kapsteuer;
}
function c_IndirekteAmortisation(){
	c_BaseAmortisation.call(this);
}
c_IndirekteAmortisation.prototype=extend_class(c_BaseAmortisation);
c_IndirekteAmortisation.m_new=function(t_c){
	c_BaseAmortisation.m_new.call(this);
	this.m__customizing=t_c;
	return this;
}
c_IndirekteAmortisation.m_new2=function(){
	c_BaseAmortisation.m_new.call(this);
	return this;
}
c_IndirekteAmortisation.m_getInstanceFor=function(t_customizing){
	return c_IndirekteAmortisation.m_new.call(new c_IndirekteAmortisation,t_customizing);
}
c_IndirekteAmortisation.prototype.p_berechne11=function(t_taxbaseJSON,t_amo_ziel,t_dauer,t_spartyp,t_sparzins,t_manquote,t_sparquote,t_eigenmietwert,t_ukosten,t_newmortgages,t_mortgageJSON){
	var t_R=c_HausResultatRunden.m_getInstanceFor(this.m__customizing);
	var t_res=c_IndirekteAmortisationResultat.m_new.call(new c_IndirekteAmortisationResultat);
	var t_hypos=c_Hypotheken.m_new.call(new c_Hypotheken);
	t_hypos.p_fromJson2(t_mortgageJSON);
	t_hypos.p_prepareZeitraum(1);
	var t_hypoZinsen=.0;
	var t_=t_hypos.m__hypos.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_hypo=t_.p_NextObject();
		t_hypoZinsen+=t_hypo.m__jahr1_zinsaufwand;
	}
	var t_stgrundlg=null;
	t_stgrundlg=this.p_getSteuergrundlage0(t_taxbaseJSON,t_newmortgages,t_hypoZinsen,t_eigenmietwert,t_ukosten);
	t_res.m__mindsparuqote=bb_utils_roundUp(c_EinfachesSparen.m_getEinlage(0.0,t_amo_ziel,false,t_sparzins,t_dauer,false));
	if(t_manquote==false){
		t_sparquote=t_res.m__mindsparuqote;
	}
	t_res.m__endkap=c_EinfachesSparen.m_getEndkapital(0.0,t_sparquote,false,t_sparzins,t_dauer,true);
	var t_1=t_spartyp;
	if(t_1==1){
		if(t_res.m__endkap<t_amo_ziel){
			t_res.m__bruttokap=t_res.m__endkap;
		}else{
			t_res.m__bruttokap=t_amo_ziel;
		}
		t_res.m__kapsteuer=this.p_berechneKapSteuer(t_stgrundlg,t_res.m__bruttokap,t_stgrundlg.m__alter+t_dauer);
		t_res.m__nettokap=t_res.m__bruttokap-t_res.m__kapsteuer;
		t_res.m__steuereffekt_total=this.p_berechneEKSteuerneffekt(t_stgrundlg,t_hypoZinsen,t_sparquote,t_eigenmietwert,t_ukosten)*(t_dauer);
	}else{
		if(t_1==2){
			if(t_res.m__endkap<t_amo_ziel){
				t_res.m__bruttokap=t_res.m__endkap;
			}else{
				t_res.m__bruttokap=t_amo_ziel;
			}
			t_res.m__kapsteuer=0.0;
			t_res.m__nettokap=t_res.m__bruttokap-t_res.m__kapsteuer;
			t_res.m__steuereffekt_total=this.p_berechneEKSteuerneffekt(t_stgrundlg,t_hypoZinsen,0.0,t_eigenmietwert,t_ukosten)*(t_dauer);
		}
	}
	t_res.m__fehlendeskap=bb_math_Max2(0.0,t_amo_ziel-t_res.m__endkap);
	if(t_res.m__fehlendeskap<0.5){
		t_res.m__ueberdeckung=bb_math_Max2(0.0,t_res.m__endkap-t_amo_ziel);
	}
	t_res.m__zinsen_total=t_hypoZinsen*(t_dauer);
	t_res.m__einlagen_total=t_sparquote*(t_dauer);
	return t_res;
}
function c_EinfachesSparen(){
	Object.call(this);
}
c_EinfachesSparen.m_getEinlage=function(t_startkapital,t_endkapital,t_monatlich,t_rendite,t_laufzeit,t_runden){
	if(t_laufzeit<=0){
		return 0.0;
	}
	if(bb_math_Abs2(t_rendite)<0.0001){
		if(t_monatlich){
			return (t_endkapital-t_startkapital)/(t_laufzeit)/12.0;
		}else{
			return (t_endkapital-t_startkapital)/(t_laufzeit);
		}
	}
	var t_e=c_EinfacheVerzinsung.m_getEndkapital(t_startkapital,t_rendite,t_laufzeit,false);
	t_endkapital-=t_e;
	if(t_endkapital<=0.0){
		return 0.0;
	}
	var t_p=t_rendite/100.0;
	var t_n=t_laufzeit;
	var t_f=0.0;
	var t_einlage=0.0;
	if(t_monatlich){
		var t_m=12.0;
		var t_r=t_m+t_p*(t_m+1.0)/2.0;
		t_f=(Math.pow(1.0+t_p,(t_n))-1.0)*t_r;
		t_einlage=t_endkapital*t_p/t_f;
	}else{
		t_f=(Math.pow(1.0+t_p,(t_n))-1.0)*(1.0+t_p);
		t_einlage=t_endkapital*t_p/t_f;
	}
	if(t_runden){
		return bb_utils_round(t_einlage);
	}
	return t_einlage;
}
c_EinfachesSparen.m_getEndkapital=function(t_startkapital,t_einlage,t_monatlich,t_rendite,t_laufzeit,t_runden){
	if(t_laufzeit<=0){
		return t_startkapital;
	}
	if(bb_math_Abs2(t_rendite)<0.0001){
		if(t_monatlich){
			return bb_utils_round(t_startkapital+t_einlage*12.0*(t_laufzeit));
		}else{
			return bb_utils_round(t_startkapital+t_einlage*(t_laufzeit));
		}
	}
	var t_e=c_EinfacheVerzinsung.m_getEndkapital(t_startkapital,t_rendite,t_laufzeit,t_runden);
	if(t_einlage<0.0001){
		return t_e;
	}
	var t_p=t_rendite/100.0;
	var t_n=(t_laufzeit);
	var t_k=0.0;
	if(t_monatlich){
		var t_m=12.0;
		var t_r=t_m+t_p*(t_m+1.0)/2.0;
		t_k=t_einlage*(Math.pow(1.0+t_p,t_n)-1.0)*t_r/t_p;
	}else{
		t_k=t_einlage*(Math.pow(1.0+t_p,t_n)-1.0)*(1.0+t_p)/t_p;
	}
	if(t_runden){
		return bb_utils_round(t_k+t_e);
	}
	return t_k+t_e;
}
c_EinfachesSparen.m_getDauer=function(t_startkapital,t_einlage,t_monatlich,t_rendite,t_endkapital){
	var t_y=0;
	var t_m=0;
	var t_i=0;
	var t_k1=.0;
	var t_k2=.0;
	var t_k=.0;
	var t_p=t_rendite/100.0;
	if(bb_utils_isZero(t_startkapital-t_endkapital,6)){
		return [0,0];
	}
	for(t_i=1;t_i<101;t_i=t_i+1){
		t_y=t_i;
		t_k1=c_EinfachesSparen.m_getEndkapital(t_startkapital,t_einlage,t_monatlich,t_rendite,t_i,true);
		if(t_k1>=t_endkapital){
			t_y=t_i-1;
			t_k1=c_EinfachesSparen.m_getEndkapital(t_startkapital,t_einlage,t_monatlich,t_rendite,t_y,true);
			if(t_k1>=t_endkapital){
				break;
			}
			for(t_i=1;t_i<=13;t_i=t_i+1){
				if(t_monatlich){
					t_k2=t_k1*t_p/12.0*(t_i)+t_einlage*(t_i)+(t_i+1)*t_einlage/2.0/12.0*(t_i)*t_p;
				}else{
					t_k2=t_k1*t_p/12.0*(t_i)+t_einlage+t_einlage*t_p/12.0*(t_i);
				}
				t_k=t_k1+bb_utils_round(t_k2);
				if(t_k>=t_endkapital){
					t_m=t_i;
					if(t_m>=12){
						t_y=t_y+1;
						t_m=0;
					}
					break;
				}
			}
			break;
		}
	}
	return [t_y,t_m];
}
function c_EinfacheVerzinsung(){
	Object.call(this);
}
c_EinfacheVerzinsung.m_getEndkapital=function(t_startkapital,t_rendite,t_laufzeit,t_runden){
	if(t_laufzeit<=0){
		return t_startkapital;
	}
	var t_k=t_startkapital*Math.pow(1.0+t_rendite/100.0,(t_laufzeit));
	if(t_runden){
		return bb_utils_round(t_k);
	}
	return t_k;
}
function c_EinfachesKontoSparenResultat(){
	Object.call(this);
	this.m__ersteinlage=.0;
	this.m__einlage=.0;
	this.m__monatlich=false;
	this.m__dauer_j=0;
	this.m__dauer_m=0;
	this.m__kapital=.0;
	this.m__einlagen=.0;
	this.m__stand=c_Collection.m_new.call(new c_Collection);
	this.m__zinsen=.0;
}
c_EinfachesKontoSparenResultat.m_new=function(){
	return this;
}
c_EinfachesKontoSparenResultat.prototype.p_runden4=function(t_ganzeBetraege){
	if(t_ganzeBetraege){
		this.m__kapital=bb_utils_trunc(this.m__kapital);
		this.m__einlagen=bb_utils_trunc(this.m__einlagen);
		this.m__zinsen=bb_utils_trunc(this.m__zinsen);
		var t_=this.m__stand.p_ObjectEnumerator();
		while(t_.p_HasNext()){
			var t_o=t_.p_NextObject();
			var t_s=object_downcast((t_o),c_SparenStandJahr);
			t_s.m__einlagen=bb_utils_trunc(t_s.m__einlagen);
			t_s.m__zinsen=bb_utils_trunc(t_s.m__zinsen);
			t_s.m__kapital=bb_utils_trunc(t_s.m__kapital);
		}
	}
}
function c_EinfachesKontoSparen(){
	Object.call(this);
}
c_EinfachesKontoSparen.m_new=function(){
	return this;
}
c_EinfachesKontoSparen.prototype.p_berechneEndkapital=function(t_ersteinlage,t_einlage,t_monatlich,t_jahre,t_monate,t_rendite,t_ganzeBetraege){
	var t_res=c_EinfachesKontoSparenResultat.m_new.call(new c_EinfachesKontoSparenResultat);
	if(t_jahre<1 && t_monate<1){
		return t_res;
	}
	var t_i=0;
	var t_p=t_rendite/100.0;
	var t_z=.0;
	var t_perioden=t_jahre;
	var t_zinsen=0.0;
	var t_einlagen=t_ersteinlage;
	var t_kapital=t_ersteinlage;
	if(t_monatlich==false){
		if(t_monate>0){
			t_perioden+=1;
			t_jahre+=1;
			t_monate=0;
		}
	}else{
		if(t_monate>0){
			t_perioden+=1;
		}
	}
	t_res.m__ersteinlage=t_ersteinlage;
	t_res.m__einlage=t_einlage;
	t_res.m__monatlich=t_monatlich;
	t_res.m__dauer_j=t_jahre;
	t_res.m__dauer_m=t_monate;
	t_res.m__kapital=t_ersteinlage;
	t_res.m__einlagen=t_ersteinlage;
	for(t_i=0;t_i<t_perioden;t_i=t_i+1){
		if(t_monatlich){
			if(t_i==t_perioden-1 && t_monate>0){
				var t_zkapmon=.0;
				t_zkapmon=t_kapital*t_p/12.0;
				for(var t_m=1;t_m<=t_monate;t_m=t_m+1){
					t_z=t_zkapmon+t_einlage*t_p/12.0;
					t_zinsen=t_zinsen+t_z;
					t_einlagen=t_einlagen+t_einlage;
					t_kapital=t_kapital+t_z+t_einlage;
				}
				break;
			}else{
				t_z=t_kapital*t_p+13.0*t_einlage/2.0*t_p;
				t_zinsen=t_zinsen+t_z;
				t_einlagen=t_einlagen+12.0*t_einlage;
				t_kapital=t_kapital+t_z+12.0*t_einlage;
			}
		}else{
			t_z=t_kapital*t_p+t_einlage*t_p;
			t_zinsen=t_zinsen+t_z;
			t_einlagen=t_einlagen+t_einlage;
			t_kapital=t_kapital+t_z+t_einlage;
		}
		t_res.m__stand.p_add2(c_SparenStandJahr.m_new.call(new c_SparenStandJahr,t_i+1,t_einlagen,t_zinsen,t_kapital));
	}
	t_res.m__kapital=t_kapital;
	t_res.m__einlagen=t_einlagen;
	t_res.m__zinsen=t_zinsen;
	t_res.p_runden4(t_ganzeBetraege);
	return t_res;
}
c_EinfachesKontoSparen.prototype.p_berechneEndkapital2=function(t_ersteinlage,t_einlage,t_monatlich,t_jahre,t_rendite,t_ganzeBetraege){
	return this.p_berechneEndkapital(t_ersteinlage,t_einlage,t_monatlich,t_jahre,0,t_rendite,t_ganzeBetraege);
}
c_EinfachesKontoSparen.prototype.p_berechneEinlage=function(t_ersteinlage,t_monatlich,t_jahre,t_rendite,t_endkapital,t_ganzeBetraege){
	var t_res=null;
	if(t_jahre<1 || t_ersteinlage>t_endkapital){
		return c_EinfachesKontoSparenResultat.m_new.call(new c_EinfachesKontoSparenResultat);
	}
	var t_einlage=c_EinfachesSparen.m_getEinlage(t_ersteinlage,t_endkapital,t_monatlich,t_rendite,t_jahre,false);
	if(t_ganzeBetraege){
		t_einlage=bb_utils_roundUp(t_einlage);
	}
	t_res=this.p_berechneEndkapital(t_ersteinlage,t_einlage,t_monatlich,t_jahre,0,t_rendite,t_ganzeBetraege);
	return t_res;
}
c_EinfachesKontoSparen.prototype.p_berechneDauer=function(t_ersteinlage,t_einlage,t_monatlich,t_rendite,t_endkapital,t_ganzeBetraege){
	var t_res=null;
	if(t_ersteinlage>t_endkapital){
		return c_EinfachesKontoSparenResultat.m_new.call(new c_EinfachesKontoSparenResultat);
	}
	var t_jahre=0;
	var t_dauerYM=[];
	t_dauerYM=c_EinfachesSparen.m_getDauer(t_ersteinlage,t_einlage,t_monatlich,t_rendite,t_endkapital);
	t_jahre=t_dauerYM[0];
	if(t_dauerYM[1]>0){
		t_jahre=t_jahre+1;
	}
	t_res=this.p_berechneEndkapital(t_ersteinlage,t_einlage,t_monatlich,t_jahre,0,t_rendite,t_ganzeBetraege);
	t_res.m__dauer_j=t_dauerYM[0];
	t_res.m__dauer_m=t_dauerYM[1];
	return t_res;
}
function c_SparenStandJahr(){
	Object.call(this);
	this.m__jahr=0;
	this.m__einlagen=.0;
	this.m__zinsen=.0;
	this.m__kapital=.0;
}
c_SparenStandJahr.m_new=function(t_j,t_e,t_z,t_k){
	this.m__jahr=t_j;
	this.m__einlagen=t_e;
	this.m__zinsen=t_z;
	this.m__kapital=t_k;
	return this;
}
c_SparenStandJahr.m_new2=function(){
	return this;
}
function c_SparRechnerResultat(){
	Object.call(this);
	this.m__dauer_j=0;
	this.m__dauer_m=0;
	this.m__einlage=.0;
	this.m__konto=c_BankKonto.m_new.call(new c_BankKonto);
	this.m__endkapital=.0;
	this.m__sum_einlagen=.0;
	this.m__sum_zinsen=.0;
	this.m__zsdet=null;
	this.m__avg_zinssatz=.0;
}
c_SparRechnerResultat.m_new=function(){
	return this;
}
c_SparRechnerResultat.prototype.p_runden4=function(t_ganzeBetraege){
	if(t_ganzeBetraege){
		this.m__endkapital=bb_utils_trunc(this.m__endkapital);
		this.m__sum_einlagen=bb_utils_trunc(this.m__sum_einlagen);
		this.m__sum_zinsen=bb_utils_trunc(this.m__sum_zinsen);
		this.m__einlage=bb_utils_trunc(this.m__einlage);
		if(this.m__konto!=null){
			this.m__konto.p_runden4(t_ganzeBetraege);
		}
		if(this.m__zsdet!=null){
			this.m__zsdet.p_runden4(t_ganzeBetraege);
		}
	}
}
function c_SparRechner(){
	c_Newton.call(this);
	this.m__customizing="";
	this.m__ersteinlage=.0;
	this.m__einlage=.0;
	this.m__monatlich=false;
	this.m__dauerJ=0;
	this.m__endkapital=.0;
	this.m__konto=c_BankKonto.m_new.call(new c_BankKonto);
	this.m__approx_methode=0;
	this.m__approx_kto=null;
	this.m__approx_ersteinlage=.0;
	this.m__approx_einlage=.0;
	this.m__approx_monatlich=false;
	this.m__approx_dauerJ=0;
}
c_SparRechner.prototype=extend_class(c_Newton);
c_SparRechner.m_new=function(){
	c_Newton.m_new.call(this);
	return this;
}
c_SparRechner.m_new2=function(t_c){
	c_Newton.m_new.call(this);
	this.m__customizing=t_c;
	return this;
}
c_SparRechner.m_getInstanceFor=function(t_customizing){
	return c_SparRechner.m_new2.call(new c_SparRechner,t_customizing);
}
c_SparRechner.prototype.p_reset=function(){
	this.m__ersteinlage=0.0;
	this.m__einlage=0.0;
	this.m__monatlich=false;
	this.m__dauerJ=0;
	this.m__endkapital=0.0;
	this.m__konto=c_BankKonto.m_new.call(new c_BankKonto);
}
c_SparRechner.prototype.p_fromJson=function(t_o){
	this.m__ersteinlage=c_JSonHelper.m_F(t_o,"invest");
	this.m__einlage=c_JSonHelper.m_F(t_o,"periodical");
	this.m__monatlich=c_JSonHelper.m_B(t_o,"monthlybase");
	this.m__dauerJ=c_JSonHelper.m_I(t_o,"duration");
	this.m__endkapital=c_JSonHelper.m_F(t_o,"endcapital");
	this.m__konto.p_fromJson(t_o);
}
c_SparRechner.prototype.p_basisEndkapitalInMonaten=function(t_konto,t_ersteinlage,t_einlage,t_monatlich,t_dauerInMonaten){
	var t_curJahr=null;
	var t_nextJahr=null;
	var t_i=0;
	var t_letztesJahr=false;
	var t_letztesJahrUnterjaehrig=false;
	var t_letztesJahrPerMonat=0;
	var t_endkapital=.0;
	var t_dauerJ=0;
	var t_dauerM_letztesJahr=0;
	t_dauerJ=((t_dauerInMonaten/12)|0);
	t_dauerM_letztesJahr=t_dauerInMonaten % 12;
	if(t_dauerM_letztesJahr>0){
		t_dauerJ+=1;
	}
	t_curJahr=t_konto.p_setAnfangsstandJahr1(0.0,1);
	t_curJahr.p_setVeraenderung(t_ersteinlage,0,true);
	for(t_i=0;t_i<t_dauerJ;t_i=t_i+1){
		if(t_curJahr==null){
			break;
		}
		t_letztesJahr=false;
		t_letztesJahrUnterjaehrig=false;
		if(t_i+1>=t_dauerJ){
			t_letztesJahr=true;
			if(t_dauerM_letztesJahr>0){
				t_letztesJahrUnterjaehrig=true;
				t_letztesJahrPerMonat=t_dauerM_letztesJahr-1;
			}
		}
		if(t_monatlich){
			var t_toMonat=11;
			if(t_letztesJahrUnterjaehrig){
				t_toMonat=t_letztesJahrPerMonat;
			}
			for(var t_m=0;t_m<=t_toMonat;t_m=t_m+1){
				t_curJahr.p_setVeraenderung(t_einlage,t_m,true);
			}
		}else{
			t_curJahr.p_setJaehrlicheEinlage(t_einlage,true);
		}
		if(t_letztesJahr){
			if(t_letztesJahrUnterjaehrig){
				t_curJahr.p_saldiereUnterjaehrig(t_letztesJahrPerMonat);
			}else{
				t_curJahr.p_saldiereJahr();
			}
			t_nextJahr=null;
		}else{
			t_curJahr.p_saldiereJahr();
			t_nextJahr=t_konto.p_eroeffneFolgejahr(t_curJahr);
		}
		t_endkapital=t_curJahr.m__endkapital;
		t_curJahr=t_nextJahr;
	}
	return t_endkapital;
}
c_SparRechner.prototype.p_berechneDurchschnittsrendite=function(t_ersteinlage,t_einlage,t_monatlich,t_dauerJ,t_endkapital){
	var t_rendite=.0;
	if(t_dauerJ>0){
		if(bb_utils_isNotZero(t_ersteinlage,0) || bb_utils_isNotZero(t_einlage,0) || bb_utils_isNotZero(t_endkapital,0)){
			this.m__approx_methode=2;
			this.m__approx_kto=c_BankKonto.m_new.call(new c_BankKonto);
			this.m__approx_kto.p_resetZinssaetze();
			this.m__approx_kto.p_setZinssatz(0.0);
			this.m__approx_ersteinlage=t_ersteinlage;
			this.m__approx_einlage=t_einlage;
			this.m__approx_monatlich=t_monatlich;
			this.m__approx_dauerJ=t_dauerJ;
			t_rendite=this.p_approximate(0.0,t_endkapital,0.0001,1.0,20.0);
			this.m__approx_kto=null;
		}
	}
	return t_rendite;
}
c_SparRechner.prototype.p_berechneEndkapitalInMonaten=function(t_konto,t_ganzeBetraege,t_einlage,t_dauerInMonaten){
	var t_res=c_SparRechnerResultat.m_new.call(new c_SparRechnerResultat);
	var t_zinsdetails=c_BankKontoZinsstufenDetails.m_new.call(new c_BankKontoZinsstufenDetails);
	t_res.m__dauer_j=((t_dauerInMonaten/12)|0);
	t_res.m__dauer_m=t_dauerInMonaten % 12;
	t_res.m__einlage=t_einlage;
	t_res.m__konto=t_konto;
	t_res.m__endkapital=this.p_basisEndkapitalInMonaten(this.m__konto,this.m__ersteinlage,t_einlage,this.m__monatlich,t_dauerInMonaten);
	var t_=t_konto.m__standjahr.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		var t_curJahr=object_downcast((t_o),c_BankKontoJahr);
		t_res.m__sum_einlagen=t_curJahr.m__sum_einlagen;
		t_res.m__sum_zinsen=t_curJahr.m__sum_zinsen;
		t_zinsdetails.p_collectZinsstufenDetails(t_curJahr.m__zsdet);
	}
	if(t_zinsdetails.m__details.p_length()>1){
		t_res.m__zsdet=t_zinsdetails;
	}
	t_res.m__avg_zinssatz=this.p_berechneDurchschnittsrendite(this.m__ersteinlage,t_einlage,this.m__monatlich,t_res.m__dauer_j,t_res.m__endkapital);
	t_res.m__avg_zinssatz=bb_utils_round2(t_res.m__avg_zinssatz,0.01);
	if(t_ganzeBetraege){
		t_res.p_runden4(t_ganzeBetraege);
	}
	return t_res;
}
c_SparRechner.prototype.p_berechneEndkapitalInJahren=function(t_ganzeBetraege){
	return this.p_berechneEndkapitalInMonaten(this.m__konto,t_ganzeBetraege,this.m__einlage,this.m__dauerJ*12);
}
c_SparRechner.prototype.p_berechneEinlage2=function(t_ganzeBetraege){
	this.m__approx_methode=1;
	this.m__approx_ersteinlage=this.m__ersteinlage;
	this.m__approx_einlage=this.m__einlage;
	this.m__approx_monatlich=this.m__monatlich;
	this.m__approx_dauerJ=this.m__dauerJ;
	var t_einlage=.0;
	if(this.m__dauerJ>0){
		t_einlage=this.p_approximate(0.0,this.m__endkapital,0.001,100.0,10000.0);
	}
	if(t_ganzeBetraege){
		t_einlage=bb_utils_roundUp(t_einlage);
	}
	return this.p_berechneEndkapitalInMonaten(this.m__konto,t_ganzeBetraege,t_einlage,this.m__dauerJ*12);
}
c_SparRechner.prototype.p_berechneEinlage=function(t_ersteinlage,t_monatlich,t_jahre,t_rendite,t_endkapital,t_ganzeBetraege){
	this.p_reset();
	this.m__ersteinlage=t_ersteinlage;
	this.m__monatlich=t_monatlich;
	this.m__dauerJ=t_jahre;
	this.m__endkapital=t_endkapital;
	this.m__konto.p_setZinssatz(t_rendite);
	return this.p_berechneEinlage2(t_ganzeBetraege);
}
c_SparRechner.prototype.p_berechneDauerInMonaten=function(){
	var t_monate=0;
	var t_j=0;
	var t_curJahr=c_BankKontoJahr.m_new2.call(new c_BankKontoJahr,this.m__konto);
	var t_anfangsWert=.0;
	t_anfangsWert=0.0;
	for(t_j=0;t_j<101;t_j=t_j+1){
		if(t_j>=100){
			t_monate=1200;
			break;
		}
		if(t_j==0){
			t_curJahr.p_setAnfangsstand(0.0);
			t_curJahr.p_setVeraenderung(this.m__ersteinlage,0,true);
		}else{
			t_curJahr.p_setAnfangsstand(t_anfangsWert);
		}
		if(this.m__monatlich){
			for(var t_vm=0;t_vm<=11;t_vm=t_vm+1){
				t_curJahr.p_setVeraenderung(this.m__einlage,t_vm,true);
			}
		}else{
			t_curJahr.p_setJaehrlicheEinlage(this.m__einlage,true);
		}
		t_curJahr.p_saldiereJahr();
		if(bb_utils_isLZero(t_curJahr.m__endkapital-this.m__endkapital,2)){
			t_anfangsWert=t_curJahr.m__endkapital;
			continue;
		}
		if(bb_utils_isZero(t_curJahr.m__endkapital-this.m__endkapital,2)){
			t_monate=(t_j+1)*12;
			break;
		}
		for(var t_m=0;t_m<=11;t_m=t_m+1){
			t_monate=t_j*12+(t_m+1);
			t_curJahr.p_setAnfangsstand(t_anfangsWert);
			if(this.m__monatlich){
				for(var t_vm2=0;t_vm2<=t_m;t_vm2=t_vm2+1){
					t_curJahr.p_setVeraenderung(this.m__einlage,t_vm2,true);
				}
			}else{
				t_curJahr.p_setJaehrlicheEinlage(this.m__einlage,true);
			}
			t_curJahr.p_saldiereUnterjaehrig(t_m);
			if(bb_utils_isGEZero(t_curJahr.m__endkapital-this.m__endkapital,2)){
				break;
			}
		}
		break;
	}
	return t_monate;
}
c_SparRechner.prototype.p_berechneDauer2=function(t_ganzeBetraege,t_typ){
	var t_monate=this.p_berechneDauerInMonaten();
	if(t_typ==3){
		var t_jahre=0;
		t_jahre=((t_monate/12)|0);
		if(t_monate % 12>0){
			t_jahre+=1;
		}
		var t_res=null;
		t_res=this.p_berechneEndkapitalInMonaten(this.m__konto,t_ganzeBetraege,this.m__einlage,t_jahre*12);
		t_res.m__dauer_j=((t_monate/12)|0);
		t_res.m__dauer_m=t_monate % 12;
		return t_res;
	}
	return this.p_berechneEndkapitalInMonaten(this.m__konto,t_ganzeBetraege,this.m__einlage,t_monate);
}
c_SparRechner.prototype.p_berechneDauer=function(t_ersteinlage,t_einlage,t_monatlich,t_rendite,t_endkapital,t_ganzeBetraege){
	this.p_reset();
	this.m__ersteinlage=t_ersteinlage;
	this.m__einlage=t_einlage;
	this.m__monatlich=t_monatlich;
	this.m__endkapital=t_endkapital;
	this.m__konto.p_setZinssatz(t_rendite);
	return this.p_berechneDauer2(t_ganzeBetraege,3);
}
c_SparRechner.prototype.p_berechne12=function(t_typ,t_dataAsJSon,t_ganzeBetraege){
	this.p_reset();
	var t_js=c_JsonObject.m_new3.call(new c_JsonObject,t_dataAsJSon);
	this.p_fromJson(t_js);
	var t_1=t_typ;
	if(t_1==1){
		return this.p_berechneEndkapitalInJahren(t_ganzeBetraege);
	}else{
		if(t_1==2){
			return this.p_berechneEinlage2(t_ganzeBetraege);
		}else{
			if(t_1==3){
				return this.p_berechneDauer2(t_ganzeBetraege,t_typ);
			}else{
				if(t_1==4){
					return this.p_berechneDauer2(t_ganzeBetraege,t_typ);
				}
			}
		}
	}
	return null;
}
c_SparRechner.prototype.p_sample=function(t_startval,t_guess){
	var t_2=this.m__approx_methode;
	if(t_2==1){
		return this.p_basisEndkapitalInMonaten(this.m__konto,this.m__approx_ersteinlage,t_guess,this.m__approx_monatlich,this.m__approx_dauerJ*12);
	}else{
		if(t_2==2){
			this.m__approx_kto.p_resetZinssaetze();
			this.m__approx_kto.p_setZinssatz(t_guess);
			return this.p_basisEndkapitalInMonaten(this.m__approx_kto,this.m__approx_ersteinlage,this.m__approx_einlage,this.m__approx_monatlich,this.m__approx_dauerJ*12);
		}
	}
	return 0.0;
}
function c_BankKonto(){
	Object.call(this);
	this.m__defzs=c_Collection.m_new.call(new c_Collection);
	this.m__werteliste=null;
	this.m__standjahr=c_BankKontoJahrCollection.m_new.call(new c_BankKontoJahrCollection);
}
c_BankKonto.m_new=function(){
	return this;
}
c_BankKonto.prototype.p_resetZinssaetze=function(){
	this.m__defzs.p_clear();
}
c_BankKonto.prototype.p_setZinssatz=function(t_z){
	var t_stufe=null;
	t_stufe=c_BankKontoDefZinsstufe.m_new.call(new c_BankKontoDefZinsstufe,"",t_z,0.0,c_Limitation.m_limits.m__MAX_FLOAT,false);
	this.m__defzs.p_add2(t_stufe);
}
c_BankKonto.prototype.p_setZinssatz2=function(t_id,t_z,t_untergrenze,t_obergrenze){
	var t_stufe=null;
	t_stufe=c_BankKontoDefZinsstufe.m_new.call(new c_BankKontoDefZinsstufe,t_id,t_z,t_untergrenze,t_obergrenze,false);
	t_stufe.m__erweitert=true;
	this.m__defzs.p_add2(t_stufe);
}
c_BankKonto.prototype.p_setNegativZinssatz=function(t_z){
	var t_stufe=null;
	t_stufe=c_BankKontoDefZinsstufe.m_new.call(new c_BankKontoDefZinsstufe,"",t_z,0.0,-c_Limitation.m_limits.m__MAX_FLOAT,true);
	this.m__defzs.p_add2(t_stufe);
}
c_BankKonto.prototype.p_setNegativZinssatz2=function(t_id,t_z,t_untergrenze,t_obergrenze){
	var t_stufe=null;
	t_stufe=c_BankKontoDefZinsstufe.m_new.call(new c_BankKontoDefZinsstufe,t_id,t_z,t_untergrenze,t_obergrenze,true);
	t_stufe.m__erweitert=true;
	this.m__defzs.p_add2(t_stufe);
}
c_BankKonto.prototype.p_fromJson=function(t_o){
	if(c_JSonHelper.m_hasValue(t_o,"interest")){
		this.p_resetZinssaetze();
		var t_z=.0;
		t_z=c_JSonHelper.m_F(t_o,"interest");
		this.p_setZinssatz(t_z);
		if(c_JSonHelper.m_hasValue(t_o,"neg_interest")){
			t_z=c_JSonHelper.m_F(t_o,"neg_interest");
			this.p_setNegativZinssatz(t_z);
		}else{
			this.p_setNegativZinssatz(t_z);
		}
	}
	try{
		var t_a=object_downcast((t_o.p_Get("interestranges",null)),c_JsonArray);
		if(t_a!=null){
			this.p_resetZinssaetze();
			for(var t_i=0;t_i<t_a.p_Length();t_i=t_i+1){
				var t_o2=object_downcast((t_a.p_Get3(t_i)),c_JsonObject);
				if(t_o2!=null){
					var t_zs=c_BankKontoDefZinsstufe.m_new2.call(new c_BankKontoDefZinsstufe);
					t_zs.p_fromJson(t_o2);
					this.m__defzs.p_add2(t_zs);
				}
			}
		}
	}catch(_eek_){
		if(t_err=object_downcast(_eek_,ThrowableObject)){
		}else{
			throw _eek_;
		}
	}
	this.m__werteliste=null;
	try{
		var t_jsCond=object_downcast((t_o.p_Get("specialconditions",null)),c_JsonObject);
		if(t_jsCond!=null){
			this.m__werteliste=c_BankKontoWerteListe.m_new.call(new c_BankKontoWerteListe);
			var t_=t_jsCond.p_GetData().p_Keys().p_ObjectEnumerator();
			while(t_.p_HasNext()){
				var t_s=t_.p_NextObject();
				this.m__werteliste.p_setValue(t_s,c_JSonHelper.m_B(t_jsCond,t_s));
			}
		}
	}catch(_eek_){
		if(t_err2=object_downcast(_eek_,ThrowableObject)){
		}else{
			throw _eek_;
		}
	}
}
c_BankKonto.prototype.p_setAnfangsstandJahr1=function(t_startwert,t_jahr){
	var t_curJahr=c_BankKontoJahr.m_new2.call(new c_BankKontoJahr,this);
	t_curJahr.m__jahr=t_jahr;
	t_curJahr.p_setAnfangsstand(t_startwert);
	this.m__standjahr.p_clear();
	this.m__standjahr.p_add2(t_curJahr);
	return t_curJahr;
}
c_BankKonto.prototype.p_eroeffneFolgejahr=function(t_curJahr){
	var t_neuesJahr=c_BankKontoJahr.m_new2.call(new c_BankKontoJahr,this);
	t_neuesJahr.p_setAnfangsstand2(t_curJahr);
	this.m__standjahr.p_add2(t_neuesJahr);
	this.m__standjahr.p_sortArray(true);
	return t_neuesJahr;
}
c_BankKonto.prototype.p_runden4=function(t_ganzeBetraege){
	if(t_ganzeBetraege){
		var t_=this.m__standjahr.p_ObjectEnumerator();
		while(t_.p_HasNext()){
			var t_o=t_.p_NextObject();
			var t_curJahr=object_downcast((t_o),c_BankKontoJahr);
			t_curJahr.p_runden4(t_ganzeBetraege);
		}
	}
}
function c_BankKontoDefZinsstufe(){
	Object.call(this);
	this.m__id="";
	this.m__zinssatz=.0;
	this.m__untergrenze=.0;
	this.m__obergrenze=.0;
	this.m__negbereich=false;
	this.m__erweitert=false;
	this.m__neugeld_grenzwert=.0;
	this.m__voraussetzungen=null;
}
c_BankKontoDefZinsstufe.m_new=function(t_id,t_z,t_u,t_o,t_neg){
	this.m__id=t_id;
	this.m__zinssatz=t_z;
	this.m__untergrenze=t_u;
	this.m__obergrenze=t_o;
	this.m__negbereich=t_neg;
	return this;
}
c_BankKontoDefZinsstufe.m_new2=function(){
	return this;
}
c_BankKontoDefZinsstufe.prototype.p_fromJson=function(t_o){
	this.m__erweitert=false;
	this.m__id=c_JSonHelper.m_S(t_o,"id");
	this.m__zinssatz=c_JSonHelper.m_F(t_o,"interest");
	this.m__untergrenze=c_JSonHelper.m_F(t_o,"from");
	this.m__negbereich=c_JSonHelper.m_B(t_o,"neg");
	if(c_JSonHelper.m_hasValue(t_o,"to")){
		this.m__obergrenze=c_JSonHelper.m_F(t_o,"to");
		if(bb_utils_isLZero(this.m__obergrenze,4)){
			this.m__negbereich=true;
		}
		this.m__erweitert=true;
	}else{
		this.m__obergrenze=c_Limitation.m_limits.m__MAX_FLOAT;
		if(this.m__negbereich){
			this.m__obergrenze=-c_Limitation.m_limits.m__MAX_FLOAT;
		}
	}
	this.m__neugeld_grenzwert=c_JSonHelper.m_F(t_o,"inflow_threshold");
	this.m__voraussetzungen=null;
	try{
		var t_jsCond=object_downcast((t_o.p_Get("specialconditions",null)),c_JsonObject);
		if(t_jsCond!=null){
			this.m__erweitert=true;
			this.m__voraussetzungen=c_BankKontoWerteListe.m_new.call(new c_BankKontoWerteListe);
			var t_=t_jsCond.p_GetData().p_Keys().p_ObjectEnumerator();
			while(t_.p_HasNext()){
				var t_s=t_.p_NextObject();
				this.m__voraussetzungen.p_setValue(t_s,c_JSonHelper.m_B(t_jsCond,t_s));
			}
		}
	}catch(_eek_){
		if(t_err=object_downcast(_eek_,ThrowableObject)){
		}else{
			throw _eek_;
		}
	}
	if(bb_utils_isNotZero(this.m__untergrenze,0) || bb_utils_isNotZero(this.m__neugeld_grenzwert,0) || this.m__voraussetzungen!=null){
		this.m__erweitert=true;
	}
}
c_BankKontoDefZinsstufe.prototype.p_isInRange=function(t_k){
	if(bb_utils_isLZero(t_k,4)){
		if(this.m__negbereich){
			if(t_k<=this.m__untergrenze){
				return true;
			}
		}
	}else{
		if(this.m__negbereich==false){
			if(t_k>=this.m__untergrenze){
				return true;
			}
		}
	}
	return false;
}
c_BankKontoDefZinsstufe.prototype.p_isMatchingVoraussetzungen=function(t_konto){
	if(this.m__voraussetzungen==null){
		return true;
	}
	if(t_konto==null){
		return false;
	}
	return this.m__voraussetzungen.p_isMatching(t_konto.m__werteliste);
}
c_BankKontoDefZinsstufe.prototype.p_getZinsen=function(t_k){
	var t_kz=.0;
	if(this.m__negbereich){
		t_kz=bb_math_Max2(t_k,this.m__obergrenze)-this.m__untergrenze;
	}else{
		t_kz=bb_math_Min2(t_k,this.m__obergrenze)-this.m__untergrenze;
	}
	return t_kz*this.m__zinssatz/100.0;
}
function c_BankKontoWerteListe(){
	Object.call(this);
	this.m__coll=c_Collection.m_new.call(new c_Collection);
}
c_BankKontoWerteListe.m_new=function(){
	return this;
}
c_BankKontoWerteListe.prototype.p_getCondition=function(t_attr){
	var t_o=null;
	var t_cond=null;
	var t_=this.m__coll.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		t_o=t_.p_NextObject();
		t_cond=object_downcast((t_o),c_BankKontoWerteListenEintrag);
		if(t_cond.m__attrName.toUpperCase()==t_attr.toUpperCase()){
			return t_cond;
		}
	}
	return null;
}
c_BankKontoWerteListe.prototype.p_setValue=function(t_attr,t_val){
	var t_cond=null;
	t_cond=this.p_getCondition(t_attr);
	if(t_cond==null){
		t_cond=c_BankKontoWerteListenEintrag.m_new.call(new c_BankKontoWerteListenEintrag);
		t_cond.m__attrName=t_attr;
		this.m__coll.p_add2(t_cond);
	}
	t_cond.m__value=t_val;
}
c_BankKontoWerteListe.prototype.p_isMatching=function(t_comp){
	var t_o=null;
	var t_condMe=null;
	var t_condComp=null;
	if(t_comp==null){
		return false;
	}
	var t_=this.m__coll.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		t_o=t_.p_NextObject();
		t_condMe=object_downcast((t_o),c_BankKontoWerteListenEintrag);
		t_condComp=t_comp.p_getCondition(t_condMe.m__attrName);
		if(t_condComp==null || t_condComp.m__value!=t_condMe.m__value){
			return false;
		}
	}
	return true;
}
function c_MapKeys(){
	Object.call(this);
	this.m_map=null;
}
c_MapKeys.m_new=function(t_map){
	this.m_map=t_map;
	return this;
}
c_MapKeys.m_new2=function(){
	return this;
}
c_MapKeys.prototype.p_ObjectEnumerator=function(){
	return c_KeyEnumerator.m_new.call(new c_KeyEnumerator,this.m_map.p_FirstNode());
}
function c_KeyEnumerator(){
	Object.call(this);
	this.m_node=null;
}
c_KeyEnumerator.m_new=function(t_node){
	this.m_node=t_node;
	return this;
}
c_KeyEnumerator.m_new2=function(){
	return this;
}
c_KeyEnumerator.prototype.p_HasNext=function(){
	return this.m_node!=null;
}
c_KeyEnumerator.prototype.p_NextObject=function(){
	var t_t=this.m_node;
	this.m_node=this.m_node.p_NextNode();
	return t_t.m_key;
}
function c_BankKontoWerteListenEintrag(){
	Object.call(this);
	this.m__attrName="";
	this.m__value=false;
}
c_BankKontoWerteListenEintrag.m_new=function(){
	return this;
}
function c_BankKontoZinsstufenDetails(){
	Object.call(this);
	this.m__details=c_Collection.m_new.call(new c_Collection);
}
c_BankKontoZinsstufenDetails.m_new=function(){
	return this;
}
c_BankKontoZinsstufenDetails.prototype.p_getZinsstufenDetail=function(t_zs){
	var t_o=null;
	var t_det=null;
	var t_=this.m__details.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		t_o=t_.p_NextObject();
		t_det=object_downcast((t_o),c_BankKontoZinsstufenDetail);
		if(t_det.m__zinsstufe==t_zs){
			return t_det;
		}
	}
	return null;
}
c_BankKontoZinsstufenDetails.prototype.p_getZinsstufenDetail2=function(t_id){
	var t_o=null;
	var t_det=null;
	var t_=this.m__details.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		t_o=t_.p_NextObject();
		t_det=object_downcast((t_o),c_BankKontoZinsstufenDetail);
		if(t_det.m__zinsstufe.m__id==t_id){
			return t_det;
		}
	}
	return null;
}
c_BankKontoZinsstufenDetails.prototype.p_addZinsenFuerStufe=function(t_zs,t_z){
	var t_det=null;
	if(bb_utils_isZero(t_z,4) || t_zs==null){
		return;
	}
	t_det=this.p_getZinsstufenDetail(t_zs);
	if(t_det==null){
		t_det=c_BankKontoZinsstufenDetail.m_new.call(new c_BankKontoZinsstufenDetail);
		t_det.m__zinsstufe=t_zs;
		this.m__details.p_add2(t_det);
	}
	t_det.m__zinsen+=t_z;
}
c_BankKontoZinsstufenDetails.prototype.p_collectZinsstufenDetails=function(t_details){
	var t_o=null;
	var t_det=null;
	var t_origdet=null;
	if(t_details==null){
		return;
	}
	var t_=t_details.m__details.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		t_o=t_.p_NextObject();
		t_origdet=object_downcast((t_o),c_BankKontoZinsstufenDetail);
		t_det=this.p_getZinsstufenDetail2(t_origdet.m__zinsstufe.m__id);
		if(t_det==null){
			t_det=c_BankKontoZinsstufenDetail.m_new.call(new c_BankKontoZinsstufenDetail);
			t_det.m__zinsstufe=c_BankKontoDefZinsstufe.m_new2.call(new c_BankKontoDefZinsstufe);
			t_det.m__zinsstufe.m__id=t_origdet.m__zinsstufe.m__id;
			this.m__details.p_add2(t_det);
		}
		if(t_origdet.m__zinsstufe.m__erweitert){
			t_det.m__zinsstufe.m__erweitert=true;
		}
		t_det.m__zinsen+=t_origdet.m__zinsen;
	}
}
c_BankKontoZinsstufenDetails.prototype.p_runden4=function(t_ganzeBetraege){
	if(t_ganzeBetraege){
		var t_=this.m__details.p_ObjectEnumerator();
		while(t_.p_HasNext()){
			var t_o=t_.p_NextObject();
			var t_det=object_downcast((t_o),c_BankKontoZinsstufenDetail);
			t_det.m__zinsen=bb_utils_trunc(t_det.m__zinsen);
		}
	}
}
function c_BankKontoJahr(){
	Object.call(this);
	this.m__konto=null;
	this.m__jahr=0;
	this.m__startkapital=.0;
	this.m__einlagen=.0;
	this.m__bezuege=.0;
	this.m__zinsen=.0;
	this.m__endkapital=.0;
	this.m__sum_einlagen=.0;
	this.m__sum_bezuege=.0;
	this.m__sum_zinsen=.0;
	this.m__anfangmonat=new_number_array(12);
	this.m__endemonat=new_number_array(12);
	this.m__neugeldmonat=new_number_array(12);
	this.m__zsdet=c_BankKontoZinsstufenDetails.m_new.call(new c_BankKontoZinsstufenDetails);
}
c_BankKontoJahr.m_new=function(){
	return this;
}
c_BankKontoJahr.m_new2=function(t_konto){
	this.m__konto=t_konto;
	return this;
}
c_BankKontoJahr.prototype.p_reset=function(){
	this.m__startkapital=0.0;
	this.m__einlagen=0.0;
	this.m__bezuege=0.0;
	this.m__zinsen=0.0;
	this.m__endkapital=0.0;
	this.m__sum_einlagen=0.0;
	this.m__sum_bezuege=0.0;
	this.m__sum_zinsen=0.0;
	for(var t_m=0;t_m<=11;t_m=t_m+1){
		this.m__anfangmonat[t_m]=0.0;
		this.m__endemonat[t_m]=0.0;
		this.m__neugeldmonat[t_m]=0.0;
	}
}
c_BankKontoJahr.prototype.p_setAnfangsstand=function(t_wert){
	this.p_reset();
	this.m__startkapital=t_wert;
	for(var t_m=0;t_m<=11;t_m=t_m+1){
		this.m__anfangmonat[t_m]=t_wert;
		this.m__endemonat[t_m]=t_wert;
		this.m__neugeldmonat[t_m]=0.0;
	}
}
c_BankKontoJahr.prototype.p_setAnfangsstand2=function(t_vorJahr){
	this.p_reset();
	this.m__jahr=t_vorJahr.m__jahr+1;
	this.m__startkapital=t_vorJahr.m__endkapital;
	this.m__sum_einlagen=t_vorJahr.m__sum_einlagen;
	this.m__sum_bezuege=t_vorJahr.m__sum_bezuege;
	this.m__sum_zinsen=t_vorJahr.m__sum_zinsen;
	for(var t_m=0;t_m<=11;t_m=t_m+1){
		this.m__anfangmonat[t_m]=this.m__startkapital;
		this.m__endemonat[t_m]=this.m__startkapital;
		this.m__neugeldmonat[t_m]=0.0;
	}
}
c_BankKontoJahr.prototype.p_setVeraenderung=function(t_wert,t_monat,t_vorschuessig){
	var t_m=0;
	if(t_monat<0 || t_monat>11){
		return;
	}
	if(t_vorschuessig){
		this.m__anfangmonat[t_monat]+=t_wert;
		this.m__endemonat[t_monat]+=t_wert;
		if(bb_utils_isGZero(t_wert,4)){
			this.m__neugeldmonat[t_monat]+=t_wert;
		}
	}else{
		this.m__endemonat[t_monat]+=t_wert;
		if(bb_utils_isGZero(t_wert,4) && t_monat<11){
			this.m__neugeldmonat[t_monat+1]+=t_wert;
		}
	}
	for(t_m=t_monat+1;t_m<=11;t_m=t_m+1){
		this.m__anfangmonat[t_m]=this.m__endemonat[t_monat];
		this.m__endemonat[t_m]=this.m__endemonat[t_monat];
	}
	if(bb_utils_isGZero(t_wert,0)){
		this.m__einlagen+=t_wert;
		this.m__sum_einlagen+=t_wert;
	}
	if(bb_utils_isLZero(t_wert,0)){
		this.m__bezuege+=t_wert;
		this.m__sum_bezuege+=t_wert;
	}
}
c_BankKontoJahr.prototype.p_setJaehrlicheEinlage=function(t_einlage,t_vorschuessig){
	if(t_vorschuessig){
		this.p_setVeraenderung(t_einlage,0,true);
	}else{
		this.p_setVeraenderung(t_einlage,11,false);
	}
}
c_BankKontoJahr.prototype.p_berechneZinsen=function(t_perMonat){
	var t_o=null;
	var t_zs=null;
	var t_k=.0;
	var t_z=.0;
	var t_ng=.0;
	var t_m=0;
	var t_ganzesjahr=false;
	var t_isMatching=false;
	if(t_perMonat<0 || t_perMonat>11){
		return;
	}
	if(t_perMonat<11){
		t_ganzesjahr=false;
	}else{
		t_ganzesjahr=true;
		for(t_m=0;t_m<=11;t_m=t_m+1){
			if(this.m__anfangmonat[t_m]!=this.m__anfangmonat[0]){
				t_ganzesjahr=false;
				break;
			}
		}
	}
	var t_monatSteps=0;
	var t_zinsFaktor=.0;
	if(t_ganzesjahr){
		t_monatSteps=12;
		t_zinsFaktor=1.0;
	}else{
		t_monatSteps=1;
		t_zinsFaktor=0.083333333333333329;
	}
	var t_=this.m__konto.m__defzs.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		t_o=t_.p_NextObject();
		t_zs=object_downcast((t_o),c_BankKontoDefZinsstufe);
		t_k=0.0;
		t_ng=0.0;
		t_m=0;
		while(t_m<=t_perMonat){
			t_k=this.m__anfangmonat[t_m];
			t_ng+=this.m__neugeldmonat[t_m];
			t_isMatching=true;
			if(t_zs.p_isInRange(t_k)==false){
				t_isMatching=false;
			}
			if(t_isMatching){
				if(t_zs.p_isMatchingVoraussetzungen(this.m__konto)==false){
					t_isMatching=false;
				}
			}
			if(t_isMatching){
				if(t_zs.m__neugeld_grenzwert>0.0){
					if(t_ng<t_zs.m__neugeld_grenzwert){
						t_isMatching=false;
					}
				}
			}
			if(t_isMatching){
				t_z=t_zs.p_getZinsen(t_k)*t_zinsFaktor;
				this.m__zsdet.p_addZinsenFuerStufe(t_zs,t_z);
				this.m__zinsen+=t_z;
				this.m__sum_zinsen+=t_z;
			}
			t_m+=t_monatSteps;
		}
	}
}
c_BankKontoJahr.prototype.p_saldiereUnterjaehrig=function(t_perMonat){
	if(t_perMonat<0 || t_perMonat>11){
		return;
	}
	this.p_berechneZinsen(t_perMonat);
	this.m__endkapital=this.m__endemonat[t_perMonat]+this.m__zinsen;
}
c_BankKontoJahr.prototype.p_saldiereJahr=function(){
	this.p_berechneZinsen(11);
	this.m__endkapital=this.m__endemonat[11]+this.m__zinsen;
}
c_BankKontoJahr.prototype.p_runden4=function(t_ganzeBetraege){
	if(t_ganzeBetraege){
		this.m__startkapital=bb_utils_trunc(this.m__startkapital);
		this.m__einlagen=bb_utils_trunc(this.m__einlagen);
		this.m__bezuege=bb_utils_trunc(this.m__bezuege);
		this.m__zinsen=bb_utils_trunc(this.m__zinsen);
		this.m__endkapital=bb_utils_trunc(this.m__endkapital);
		this.m__sum_einlagen=bb_utils_trunc(this.m__sum_einlagen);
		this.m__sum_bezuege=bb_utils_trunc(this.m__sum_bezuege);
		this.m__sum_zinsen=bb_utils_trunc(this.m__sum_zinsen);
		this.m__zsdet.p_runden4(t_ganzeBetraege);
	}
}
function c_BankKontoJahrCollection(){
	c_Collection.call(this);
}
c_BankKontoJahrCollection.prototype=extend_class(c_Collection);
c_BankKontoJahrCollection.m_new=function(){
	c_Collection.m_new.call(this);
	return this;
}
c_BankKontoJahrCollection.prototype.p_compareItem=function(t_o1,t_o2){
	var t_e1=object_downcast((t_o1),c_BankKontoJahr);
	var t_e2=object_downcast((t_o2),c_BankKontoJahr);
	if(t_e1.m__jahr>t_e2.m__jahr){
		return 1;
	}
	if(t_e1.m__jahr<t_e2.m__jahr){
		return -1;
	}
	return 0;
}
function c_BankKontoZinsstufenDetail(){
	Object.call(this);
	this.m__zinsstufe=null;
	this.m__zinsen=.0;
}
c_BankKontoZinsstufenDetail.m_new=function(){
	return this;
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
c_S3aSparen.prototype.p_berechne13=function(t_ortid,t_zivil,t_konf,t_kinder,t_stbekkt,t_stbekbund,t_einlage,t_dauer,t_rendite,t_sex,t_ealter,t_year,t_accountno,t_initialinvest){
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
function c_BVGEinkauf(){
	c_Newton.call(this);
	this.m__kapbrut=0;
	this.m__stersp=0;
	this.m__kapnet=0;
	this.m__duration=0;
	this.m__split=0;
	this.m__zus_akap=0;
	this.m__zus_arente=0;
	this.m__rendbrutto=.0;
	this.m__stand=c_Collection.m_new.call(new c_Collection);
}
c_BVGEinkauf.prototype=extend_class(c_Newton);
c_BVGEinkauf.m_new=function(){
	c_Newton.m_new.call(this);
	return this;
}
c_BVGEinkauf.m_law=null;
c_BVGEinkauf.prototype.p_getPensionsAlter=function(t_sex){
	var t_gender=0;
	if(t_sex==c_StC_natPers.m_Sex_MANN){
		t_gender=1;
	}else{
		t_gender=2;
	}
	if(c_BVGEinkauf.m_law==null){
		c_BVGEinkauf.m_law=c_LawbaseCH.m_new.call(new c_LawbaseCH);
	}
	return bb_ahv_werte_getPensionsalter((c_BVGEinkauf.m_law),t_gender,2000);
}
c_BVGEinkauf.prototype.p_calcEndKap=function(t_rendite,t_iDuration,t_bNettoEinkauf){
	var t_i=0;
	var t_p=t_rendite/100.0;
	var t_z=.0;
	var t_iEinkaufJahr=.0;
	if(t_bNettoEinkauf){
		t_iEinkaufJahr=(((this.m__kapbrut-this.m__stersp)/this.m__split)|0);
	}else{
		t_iEinkaufJahr=((this.m__kapbrut/this.m__split)|0);
	}
	var t_kap=.0;
	for(t_i=0;t_i<t_iDuration;t_i=t_i+1){
		if(t_i<this.m__split){
			t_z=t_kap*t_p+t_iEinkaufJahr*t_p;
			t_kap=t_kap+t_z+t_iEinkaufJahr;
		}else{
			t_kap=t_kap+t_kap*t_p;
		}
	}
	return ((bb_utils_trunc(t_kap))|0);
}
c_BVGEinkauf.prototype.p_berechne14=function(t_ortid,t_alter,t_zivil,t_konf,t_kinder,t_sex,t_einkommentyp,t_einkommen,t_bvgeinkauf,t_split,t_rendite,t_umwsatz){
	this.m__kapbrut=0;
	this.m__stersp=0;
	this.m__kapnet=0;
	this.m__duration=0;
	this.m__split=0;
	this.m__zus_akap=0;
	this.m__zus_arente=0;
	this.m__rendbrutto=0.0;
	this.m__stand.p_clear();
	if(t_bvgeinkauf<1.0){
		return;
	}
	var t_iPensionsAlter=this.p_getPensionsAlter(t_sex);
	if(t_alter<18 || t_alter>=t_iPensionsAlter){
		return;
	}
	var t_iDauer=0;
	t_iDauer=t_iPensionsAlter-t_alter;
	if(t_iDauer<1){
		return;
	}
	if(t_split<1){
		t_split=1;
	}
	if(t_split>t_iDauer){
		t_split=t_iDauer;
	}
	this.m__duration=t_iDauer;
	this.m__split=t_split;
	var t_iEinkaufJahr=t_bvgeinkauf/(this.m__split);
	var t_iStVor=0;
	var t_iStNach=0;
	var t_cSt=c_EinkommensVermoegensSteuer.m_new.call(new c_EinkommensVermoegensSteuer);
	t_cSt.p_berechne2(t_ortid,t_alter,t_zivil,t_konf,t_kinder,t_einkommentyp,t_einkommen,0.0,0.0,0.0,0.0,0.0);
	t_iStVor=((t_cSt.m__tot)|0);
	t_cSt.p_berechne2(t_ortid,t_alter,t_zivil,t_konf,t_kinder,t_einkommentyp,t_einkommen,0.0,0.0,0.0,0.0,t_iEinkaufJahr);
	t_iStNach=((t_cSt.m__tot)|0);
	this.m__stersp=bb_math_Max(0,t_iStVor-t_iStNach)*this.m__split;
	this.m__kapbrut=((t_bvgeinkauf)|0);
	this.m__kapnet=((t_bvgeinkauf-(this.m__stersp))|0);
	var t_i=0;
	var t_ka=0;
	var t_ke=0;
	for(t_i=0;t_i<this.m__duration;t_i=t_i+1){
		if(t_i<this.m__split){
			t_ka=(((t_ka)+t_iEinkaufJahr)|0);
		}
		t_ke=this.p_calcEndKap(t_rendite,t_i+1,false);
		this.m__stand.p_add2(c_BVGKapitalStand.m_new.call(new c_BVGKapitalStand,t_i+1,t_ka,t_ke));
		t_ka=t_ke;
	}
	this.m__zus_akap=this.p_calcEndKap(t_rendite,this.m__duration,false);
	this.m__zus_arente=(((this.m__zus_akap)*(t_umwsatz/100.0))|0);
	this.m__rendbrutto=this.p_approximate(0.0,(this.m__zus_akap),0.1,1.0,4.0);
}
c_BVGEinkauf.prototype.p_sample=function(t_startval,t_guess){
	return (this.p_calcEndKap(t_guess,this.m__duration,true));
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
c_Lawbase.prototype.p_liechtenstein=function(){
	return this.m_country==438;
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
function c_BVGKapitalStand(){
	Object.call(this);
	this.m__jahr=0;
	this.m__akapital=0;
	this.m__ekapital=0;
}
c_BVGKapitalStand.m_new=function(t_j,t_ak,t_ek){
	this.m__jahr=t_j;
	this.m__akapital=t_ak;
	this.m__ekapital=t_ek;
	return this;
}
c_BVGKapitalStand.m_new2=function(){
	return this;
}
function c_NachlassVermoegenRechner(){
	Object.call(this);
}
c_NachlassVermoegenRechner.m_new=function(){
	return this;
}
c_NachlassVermoegenRechner.prototype.p_berechne15=function(t_gueterstand,t_gesamt,t_eigengut,t_eigengutverstorbener){
	var t_v=.0;
	var t_5=t_gueterstand;
	if(t_5==1){
		var t_errungen=.0;
		t_errungen=bb_math_Max2(0.0,t_gesamt-t_eigengut-t_eigengutverstorbener);
		t_v=t_eigengutverstorbener+t_errungen/2.0;
	}else{
		if(t_5==2){
			var t_errungen2=.0;
			t_errungen2=bb_math_Max2(0.0,t_gesamt-t_eigengut-t_eigengutverstorbener);
			t_v=t_eigengutverstorbener+t_errungen2/2.0;
		}else{
			if(t_5==3){
				t_v=t_eigengutverstorbener;
			}
		}
	}
	return t_v;
}
function c_NachlassRechner(){
	Object.call(this);
	this.m__land=0;
	this.m__erben=c_HinterbliebenerArray.m_new.call(new c_HinterbliebenerArray);
	this.m__nachlass=.0;
	this.m__steuerortErblasser=0;
	this.m__gesamt_freiverfuebar=.0;
	this.m__unverteilt_verfuegar=.0;
}
c_NachlassRechner.m_new=function(){
	return this;
}
c_NachlassRechner.m_new2=function(t_land){
	this.m__land=t_land;
	return this;
}
c_NachlassRechner.m_getInstanceFor=function(t_land){
	var t_1=t_land;
	if(t_1==756){
		return (c_NachlassRechner_CH.m_new2.call(new c_NachlassRechner_CH,t_land));
	}else{
		if(t_1==438){
			return (c_NachlassRechner_LI.m_new2.call(new c_NachlassRechner_LI,t_land));
		}
	}
	return null;
}
c_NachlassRechner.prototype.p_addHinterbliebener=function(t_eltern,t_typ,t_tot,t_name,t_zugewiesenerAnteil,t_id,t_intern){
	var t_h=c_Hinterbliebener.m_new.call(new c_Hinterbliebener);
	if(t_id==-1){
		var t_hLastID=-1;
		var t_=this.m__erben.p_ObjectEnumerator();
		while(t_.p_HasNext()){
			var t_lh=t_.p_NextObject();
			t_hLastID=bb_math_Max(t_hLastID,t_lh.m__id);
		}
		t_id=t_hLastID+1;
	}
	t_h.m__id=t_id;
	t_h.m__typ=t_typ;
	t_h.m__tot=t_tot;
	t_h.m__name=t_name;
	t_h.m__zugewiesen=t_zugewiesenerAnteil;
	t_h.m__internal=t_intern;
	if(t_eltern!=null){
		t_h.m__eltern.p_add9(t_eltern);
	}
	t_h.m__parentel=c_NachlassTypen.m_getParentel(t_h.m__typ);
	if(t_h.m__name==""){
		t_h.m__name=c_NachlassTypen.m_toString(t_h.m__typ);
	}
	this.m__erben.p_add9(t_h);
	return t_h;
}
c_NachlassRechner.prototype.p_addHinterbliebener2=function(t_typ,t_tot,t_name,t_zugewiesenerAnteil,t_id,t_intern){
	return this.p_addHinterbliebener(null,t_typ,t_tot,t_name,t_zugewiesenerAnteil,t_id,t_intern);
}
c_NachlassRechner.prototype.p_loadErben1=function(t_aInheritors){
	try{
		for(var t_i=0;t_i<t_aInheritors.p_Length();t_i=t_i+1){
			var t_o=object_downcast((t_aInheritors.p_Get3(t_i)),c_JsonObject);
			var t_h=null;
			t_h=this.p_addHinterbliebener2(c_JSonHelper.m_I(t_o,"type"),c_JSonHelper.m_B(t_o,"dead"),c_JSonHelper.m_S(t_o,"name"),c_JSonHelper.m_F(t_o,"assigned_amount"),c_JSonHelper.m_I(t_o,"id"),false);
		}
		return true;
	}catch(_eek_){
		if(t_err=object_downcast(_eek_,ThrowableObject)){
		}else{
			throw _eek_;
		}
	}
	return false;
}
c_NachlassRechner.prototype.p_getHinterbliebener=function(t_id){
	var t_=this.m__erben.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_h=t_.p_NextObject();
		if(t_h.m__id==t_id){
			return t_h;
		}
	}
	return null;
}
c_NachlassRechner.prototype.p_loadErben2=function(t_aInheritors){
	try{
		var t_id=0;
		var t_h=null;
		var t_elternteil=null;
		for(var t_i=0;t_i<t_aInheritors.p_Length();t_i=t_i+1){
			var t_o=object_downcast((t_aInheritors.p_Get3(t_i)),c_JsonObject);
			t_id=c_JSonHelper.m_I(t_o,"id");
			t_h=this.p_getHinterbliebener(t_id);
			if(t_h==null){
				continue;
			}
			var t_aParents=object_downcast((t_o.p_Get("parents",null)),c_JsonArray);
			if(t_aParents!=null){
				for(var t_iP=0;t_iP<t_aParents.p_Length();t_iP=t_iP+1){
					var t_idParent=t_aParents.p_GetInt(t_iP);
					t_elternteil=this.p_getHinterbliebener(t_idParent);
					if(t_elternteil!=null){
						t_h.m__eltern.p_add9(t_elternteil);
					}
				}
			}
		}
		return true;
	}catch(_eek_){
		if(t_err=object_downcast(_eek_,ThrowableObject)){
		}else{
			throw _eek_;
		}
	}
	return false;
}
c_NachlassRechner.prototype.p_ladeErben=function(t_sJson){
	var t_js=null;
	var t_aInheritors=null;
	this.m__erben.p_clear();
	try{
		t_js=c_JsonObject.m_new3.call(new c_JsonObject,t_sJson);
		t_aInheritors=object_downcast((t_js.p_Get("inheritors",null)),c_JsonArray);
	}catch(_eek_){
		if(t_err=object_downcast(_eek_,ThrowableObject)){
			return false;
		}else{
			throw _eek_;
		}
	}
	if(t_aInheritors==null){
		return false;
	}
	if(this.p_loadErben1(t_aInheritors)==false){
		return false;
	}
	if(this.p_loadErben2(t_aInheritors)==false){
		return false;
	}
	return true;
}
c_NachlassRechner.prototype.p_fillHinterbliebener=function(t_typ,t_anzahl){
	var t_n=0;
	var t_=this.m__erben.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_h=t_.p_NextObject();
		if(t_h.m__typ==t_typ){
			t_n+=1;
		}
	}
	if(t_n>t_anzahl){
		return false;
	}
	for(var t_i=t_n;t_i<t_anzahl;t_i=t_i+1){
		this.p_addHinterbliebener2(t_typ,true,"",0.0,0,true);
	}
	return true;
}
c_NachlassRechner.prototype.p_hatParentel=function(t_parentel){
	var t_=this.m__erben.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_h=t_.p_NextObject();
		if(t_h.m__parentel==t_parentel && t_h.m__tot==false){
			return true;
		}
	}
	return false;
}
c_NachlassRechner.prototype.p_fillElternstamm=function(){
	if(this.p_fillHinterbliebener(100,1)==false){
		return false;
	}
	if(this.p_hatParentel(3)){
		return this.p_fillHinterbliebener(3,1) && this.p_fillHinterbliebener(4,1) && this.p_fillHinterbliebener(1,2) && this.p_fillHinterbliebener(2,2);
	}else{
		if(this.p_hatParentel(2)){
			return this.p_fillHinterbliebener(3,1) && this.p_fillHinterbliebener(4,1);
		}
	}
	return true;
}
c_NachlassRechner.prototype.p_linkElternVomTyp=function(t_h,t_elterntyp){
	if(t_h.p_hatEltern(t_elterntyp)){
		return;
	}
	var t_=this.m__erben.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_elternteil=t_.p_NextObject();
		if(t_elternteil.m__typ==t_elterntyp){
			t_h.m__eltern.p_add9(t_elternteil);
		}
	}
}
c_NachlassRechner.prototype.p_addElternteil=function(t_h,t_elterntyp){
	var t_elternteil=null;
	if(t_h.p_hatEltern(t_elterntyp)){
		return;
	}
	t_elternteil=this.p_addHinterbliebener2(t_elterntyp,true,"",0.0,0,true);
	t_h.m__eltern.p_add9(t_elternteil);
	this.p_linkMitEltern(t_elternteil);
}
c_NachlassRechner.prototype.p_linkMitEltern=function(t_h){
	var t_2=t_h.m__typ;
	if(t_2==1 || t_2==2){
	}else{
		if(t_2==3){
			this.p_linkElternVomTyp(t_h,1);
		}else{
			if(t_2==4){
				this.p_linkElternVomTyp(t_h,2);
			}else{
				if(t_2==5){
					this.p_linkElternVomTyp(t_h,1);
				}else{
					if(t_2==6){
					}else{
						if(t_2==7){
							this.p_linkElternVomTyp(t_h,3);
							this.p_linkElternVomTyp(t_h,4);
						}else{
							if(t_2==8){
								this.p_addElternteil(t_h,5);
							}else{
								if(t_2==9){
									this.p_addElternteil(t_h,7);
								}else{
									if(t_2==10){
										this.p_linkElternVomTyp(t_h,100);
										this.p_linkElternVomTyp(t_h,6);
									}else{
										if(t_2==11){
											this.p_addElternteil(t_h,10);
										}else{
											if(t_2==12){
												this.p_addElternteil(t_h,11);
											}else{
												if(t_2==13){
												}else{
													if(t_2==99){
													}else{
														if(t_2==100){
															this.p_linkElternVomTyp(t_h,3);
															this.p_linkElternVomTyp(t_h,4);
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
c_NachlassRechner.prototype.p_updateStammbaum=function(){
	if(this.p_fillElternstamm()==false){
		return false;
	}
	var t_=this.m__erben.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_h=t_.p_NextObject();
		this.p_linkMitEltern(t_h);
	}
	var t_2=this.m__erben.p_ObjectEnumerator();
	while(t_2.p_HasNext()){
		var t_h2=t_2.p_NextObject();
		var t_3=t_h2.m__eltern.p_ObjectEnumerator();
		while(t_3.p_HasNext()){
			var t_elternteil=t_3.p_NextObject();
			t_elternteil.m__kinder.p_add9(t_h2);
		}
	}
	return true;
}
c_NachlassRechner.prototype.p_setPflichtteil=function(t_h){
}
c_NachlassRechner.prototype.p_updatePflichtteile=function(){
	var t_=this.m__erben.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_h=t_.p_NextObject();
		this.p_setPflichtteil(t_h);
	}
}
c_NachlassRechner.prototype.p_verteileAnEhepartner=function(t_nachlass){
	return t_nachlass;
}
c_NachlassRechner.prototype.p_verteileAufParentel1=function(t_nachlass){
	return t_nachlass;
}
c_NachlassRechner.prototype.p_verteileAufParentel2=function(t_nachlass){
	return t_nachlass;
}
c_NachlassRechner.prototype.p_verteileAufParentel3=function(t_nachlass){
	return t_nachlass;
}
c_NachlassRechner.prototype.p_calcSteuern=function(){
	if(c_StRWLoader.m_isValid()==false){
		return;
	}
	var t_calc=c_StC_natPers_BasisRechner.m_new2.call(new c_StC_natPers_BasisRechner,c_StRWLoader.m__current_rw);
	if(t_calc.p_loadSteuerort2(this.m__steuerortErblasser)==false){
		return;
	}
	var t_cErbR=object_downcast((t_calc.p_addSteuerObjekt(c_StC_natPers.m_CalcTyp_ERBSCHAFTSSTEUER)),c_StCStObjektES);
	var t_=this.m__erben.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_erbe=t_.p_NextObject();
		t_calc.m__grundlage.m__es_gruppe=c_NachlassTypen.m_mapErbeAufStErbGruppe(t_erbe.m__typ);
		t_calc.m__grundlage.m__es_beguenstigter=c_NachlassTypen.m_mapErbeAufStErbBeguenstigte(t_erbe.m__typ);
		t_calc.m__grundlage.m__es_summe=t_erbe.m__total_erbe;
		t_calc.m__grundlage.m__es_satzbestimmend=t_erbe.m__total_erbe;
		t_cErbR.p_calculate();
		if(t_cErbR.m__calctyp==c_StC_natPers.m_CalcTyp_ERBSCHAFTSSTEUER || t_cErbR.m__calctyp==c_StC_natPers.m_CalcTyp_SCHENKUNGSSTEUER || t_cErbR.m__calctyp==c_StC_natPers.m_CalcTyp_ERB_UND_SCHENKSTEUER){
			var t_cES=t_cErbR;
			var t_s="";
			t_s=t_cES.p_getInfo(c_StC_common.m_TaxLevel_KANTON,c_StC_natPers_ES_INFO.m_FREIBETRAG);
			if(t_s!=""){
				t_erbe.m__steuern_freibetrag=parseFloat(t_s);
			}
			t_s=t_cES.p_getInfo(c_StC_common.m_TaxLevel_KANTON,c_StC_natPers_ES_INFO.m_ABZUG);
			if(t_s!=""){
				t_erbe.m__steuern_abzug=parseFloat(t_s);
			}
		}
		var t_st=t_cErbR.p_getGesamtsteuer();
		t_erbe.m__steuern=t_cErbR.p_getSteuer(c_StC_common.m_TaxLevel_KANTON)+t_cErbR.p_getSteuer(c_StC_common.m_TaxLevel_GEMEINDE);
	}
}
c_NachlassRechner.prototype.p_berechne16=function(t_nachGesetz){
	var t_restNachlass=.0;
	if(this.p_updateStammbaum()==false){
		return false;
	}
	this.p_updatePflichtteile();
	this.m__erben.p_sortArray(true);
	t_restNachlass=this.p_verteileAnEhepartner(this.m__nachlass);
	t_restNachlass=this.p_verteileAufParentel1(t_restNachlass);
	t_restNachlass=this.p_verteileAufParentel2(t_restNachlass);
	t_restNachlass=this.p_verteileAufParentel3(t_restNachlass);
	var t_tot_zugewiesen=.0;
	if(t_nachGesetz==false){
		var t_=this.m__erben.p_ObjectEnumerator();
		while(t_.p_HasNext()){
			var t_erbe=t_.p_NextObject();
			t_tot_zugewiesen+=t_erbe.m__zugewiesen;
		}
	}
	var t_2=this.m__erben.p_ObjectEnumerator();
	while(t_2.p_HasNext()){
		var t_erbe2=t_2.p_NextObject();
		if(t_nachGesetz){
			t_erbe2.m__total_erbe=t_erbe2.m__erbanspruch;
		}else{
			t_erbe2.m__total_erbe=t_erbe2.p_getGeschuetzerAnspruch()+t_erbe2.m__zugewiesen;
		}
	}
	this.m__gesamt_freiverfuebar=this.m__nachlass;
	var t_3=this.m__erben.p_ObjectEnumerator();
	while(t_3.p_HasNext()){
		var t_erbe3=t_3.p_NextObject();
		this.m__gesamt_freiverfuebar-=t_erbe3.p_getGeschuetzerAnspruch();
	}
	this.m__gesamt_freiverfuebar=bb_utils_round2(this.m__gesamt_freiverfuebar,0.05);
	this.m__unverteilt_verfuegar=bb_math_Max2(0.0,this.m__gesamt_freiverfuebar-t_tot_zugewiesen);
	var t_4=this.m__erben.p_ObjectEnumerator();
	while(t_4.p_HasNext()){
		var t_erbe4=t_4.p_NextObject();
		t_erbe4.m__erbanspruch=bb_utils_round2(t_erbe4.m__erbanspruch,0.05);
		t_erbe4.m__total_erbe=bb_utils_round2(t_erbe4.m__total_erbe,0.05);
		if(this.m__nachlass>0.0){
			t_erbe4.m__erbanspruch_proz=bb_utils_round2(t_erbe4.m__erbanspruch*100.0/this.m__nachlass,0.01);
			t_erbe4.m__total_erbe_proz=bb_utils_round2(t_erbe4.m__total_erbe*100.0/this.m__nachlass,0.01);
		}
	}
	this.p_calcSteuern();
	return true;
}
c_NachlassRechner.prototype.p_verteileNachlass=function(t_nachlass,t_nachGesetz,t_stort){
	this.m__nachlass=t_nachlass;
	this.m__steuerortErblasser=t_stort;
	this.p_berechne16(t_nachGesetz);
}
c_NachlassRechner.prototype.p_getErbenVomTyp=function(t_typ){
	var t_=this.m__erben.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_h=t_.p_NextObject();
		if(t_h.m__typ==t_typ){
			return t_h;
		}
	}
	return null;
}
function c_NachlassRechner_CH(){
	c_NachlassRechner.call(this);
}
c_NachlassRechner_CH.prototype=extend_class(c_NachlassRechner);
c_NachlassRechner_CH.m_new=function(){
	c_NachlassRechner.m_new.call(this);
	return this;
}
c_NachlassRechner_CH.m_new2=function(t_land){
	c_NachlassRechner.m_new2.call(this,t_land);
	return this;
}
c_NachlassRechner_CH.prototype.p_setPflichtteil=function(t_h){
	var t_3=t_h.m__typ;
	if(t_3==6){
		t_h.m__pflichtteil_info="1/2";
		t_h.m__pflichtteil=0.5;
	}else{
		if(t_3==10){
			t_h.m__pflichtteil_info="3/4";
			t_h.m__pflichtteil=0.75;
		}else{
			if(t_3==11){
				if(t_h.p_hatLebendeEltern(10)==false){
					t_h.m__pflichtteil_info="3/4";
					t_h.m__pflichtteil=0.75;
				}
			}else{
				if(t_3==12){
					if(t_h.p_hatLebendeEltern(11)==false){
						t_h.m__pflichtteil_info="3/4";
						t_h.m__pflichtteil=0.75;
					}
				}else{
					if(t_3==3 || t_3==4){
						t_h.m__pflichtteil_info="1/2";
						t_h.m__pflichtteil=0.5;
					}
				}
			}
		}
	}
}
c_NachlassRechner_CH.prototype.p_verteileAnEhepartner=function(t_nachlass){
	var t_z=.0;
	var t_ehegatte=this.p_getErbenVomTyp(6);
	if(t_ehegatte!=null){
		if(t_ehegatte.m__tot==false){
			if(this.p_hatParentel(1)){
				t_z=t_nachlass*0.5;
			}else{
				if(this.p_hatParentel(2) || this.p_hatParentel(3)){
					t_z=t_nachlass*0.75;
				}else{
					t_z=t_nachlass;
				}
			}
			t_ehegatte.m__erbanspruch+=t_z;
		}
	}
	return t_nachlass-t_z;
}
c_NachlassRechner_CH.prototype.p_verteileAufParentel1=function(t_nachlass){
	if(bb_utils_isZero(t_nachlass,0)){
		return 0.0;
	}
	var t_erblasser=this.p_getErbenVomTyp(100);
	if(t_erblasser!=null){
		t_nachlass=t_erblasser.p_setNachlass2(1,t_nachlass);
	}
	return t_nachlass;
}
c_NachlassRechner_CH.prototype.p_verteileAnVaterMutter=function(t_vater,t_mutter,t_parentel,t_nachlass){
	if(bb_utils_isZero(t_nachlass,0)){
		return 0.0;
	}
	if(t_vater==null || t_mutter==null){
		return t_nachlass;
	}
	if(t_vater.m__tot==true && t_vater.p_hatLebendeNachkommen(t_parentel)==false && t_mutter.m__tot==true && t_mutter.p_hatLebendeNachkommen(t_parentel)==false){
		return t_nachlass;
	}
	var t_anteilVater=t_nachlass*0.5;
	var t_anteilMutter=t_nachlass*0.5;
	if(t_vater.m__tot==true && t_vater.p_hatLebendeNachkommen(t_parentel)==false){
		t_anteilVater=0.0;
		t_anteilMutter=t_nachlass;
	}
	if(t_mutter.m__tot==true && t_mutter.p_hatLebendeNachkommen(t_parentel)==false){
		t_anteilVater=t_nachlass;
		t_anteilMutter=0.0;
	}
	t_vater.p_setNachlass2(t_parentel,t_anteilVater);
	t_mutter.p_setNachlass2(t_parentel,t_anteilMutter);
	return 0.0;
}
c_NachlassRechner_CH.prototype.p_verteileAufParentel2=function(t_nachlass){
	if(bb_utils_isZero(t_nachlass,0)){
		return 0.0;
	}
	var t_vater=this.p_getErbenVomTyp(3);
	var t_mutter=this.p_getErbenVomTyp(4);
	return this.p_verteileAnVaterMutter(t_vater,t_mutter,2,t_nachlass);
}
c_NachlassRechner_CH.prototype.p_verteileAufParentel3=function(t_nachlass){
	if(bb_utils_isZero(t_nachlass,0)){
		return 0.0;
	}
	var t_vater=this.p_getErbenVomTyp(3);
	var t_mutter=this.p_getErbenVomTyp(4);
	if(t_vater==null || t_mutter==null){
		return t_nachlass;
	}
	var t_vater_grossvater=t_vater.m__eltern.p_get(0);
	var t_vater_grossmutter=t_vater.m__eltern.p_get(1);
	var t_restVaterseite=this.p_verteileAnVaterMutter(t_vater_grossvater,t_vater_grossmutter,3,t_nachlass/2.0);
	var t_mutter_grossvater=t_mutter.m__eltern.p_get(0);
	var t_mutter_grossmutter=t_mutter.m__eltern.p_get(1);
	var t_restMutterseite=this.p_verteileAnVaterMutter(t_mutter_grossvater,t_mutter_grossmutter,3,t_nachlass/2.0);
	if(bb_utils_isGZero(t_restVaterseite,0) && bb_utils_isZero(t_restMutterseite,0)){
		this.p_verteileAnVaterMutter(t_mutter_grossvater,t_mutter_grossmutter,3,t_restVaterseite);
		return 0.0;
	}
	if(bb_utils_isGZero(t_restMutterseite,0) && bb_utils_isZero(t_restVaterseite,0)){
		this.p_verteileAnVaterMutter(t_vater_grossvater,t_vater_grossmutter,3,t_restMutterseite);
		return 0.0;
	}
	return t_nachlass;
}
function c_NachlassRechner_LI(){
	c_NachlassRechner.call(this);
}
c_NachlassRechner_LI.prototype=extend_class(c_NachlassRechner);
c_NachlassRechner_LI.m_new=function(){
	c_NachlassRechner.m_new.call(this);
	return this;
}
c_NachlassRechner_LI.m_new2=function(t_land){
	c_NachlassRechner.m_new2.call(this,t_land);
	return this;
}
c_NachlassRechner_LI.prototype.p_setPflichtteil=function(t_h){
	var t_4=t_h.m__typ;
	if(t_4==6){
		t_h.m__pflichtteil_info="1/2";
		t_h.m__pflichtteil=0.5;
	}else{
		if(t_4==10){
			t_h.m__pflichtteil_info="1/2";
			t_h.m__pflichtteil=0.5;
		}else{
			if(t_4==11){
				if(t_h.p_hatLebendeEltern(10)==false){
					t_h.m__pflichtteil_info="1/2";
					t_h.m__pflichtteil=0.5;
				}
			}else{
				if(t_4==12){
					if(t_h.p_hatLebendeEltern(11)==false){
						t_h.m__pflichtteil_info="1/2";
						t_h.m__pflichtteil=0.5;
					}
				}else{
					if(t_4==3 || t_4==4){
						t_h.m__pflichtteil_info="1/3";
						t_h.m__pflichtteil=0.33333333333333331;
					}
				}
			}
		}
	}
}
c_NachlassRechner_LI.prototype.p_verteileAnEhepartner=function(t_nachlass){
	var t_z=.0;
	var t_ehegatte=this.p_getErbenVomTyp(6);
	if(t_ehegatte!=null){
		if(t_ehegatte.m__tot==false){
			if(this.p_hatParentel(1)){
				t_z=t_nachlass*0.5;
			}else{
				if(this.p_hatParentel(2) || this.p_hatParentel(3)){
					t_z=t_nachlass*2.0/3.0;
				}else{
					t_z=t_nachlass;
				}
			}
			t_ehegatte.m__erbanspruch+=t_z;
		}
	}
	return t_nachlass-t_z;
}
c_NachlassRechner_LI.prototype.p_verteileAufParentel1=function(t_nachlass){
	if(bb_utils_isZero(t_nachlass,0)){
		return 0.0;
	}
	var t_erblasser=this.p_getErbenVomTyp(100);
	if(t_erblasser!=null){
		t_nachlass=t_erblasser.p_setNachlass2(1,t_nachlass);
	}
	return t_nachlass;
}
c_NachlassRechner_LI.prototype.p_setNachlass=function(t_h,t_ehepartner,t_parentel,t_nachlass){
	if(bb_utils_isZero(t_nachlass,0)){
		return 0.0;
	}
	if(t_h.m__tot==false && t_h.m__parentel==t_parentel){
		t_h.m__erbanspruch+=t_nachlass;
		return 0.0;
	}
	if(t_ehepartner!=null && t_ehepartner.m__tot==false){
		if(t_h.m__typ==2 || t_h.m__typ==1 || t_h.m__typ==7){
			t_ehepartner.m__erbanspruch+=t_nachlass;
			return 0.0;
		}
	}
	var t_n=0;
	var t_=t_h.m__kinder.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_k=t_.p_NextObject();
		if(t_k.m__tot==false || t_k.p_hatLebendeNachkommen(t_parentel)){
			t_n+=1;
		}
	}
	if(t_n>0){
		var t_kinderanteil=t_nachlass/(t_n);
		var t_2=t_h.m__kinder.p_ObjectEnumerator();
		while(t_2.p_HasNext()){
			var t_k2=t_2.p_NextObject();
			this.p_setNachlass(t_k2,t_ehepartner,t_parentel,t_kinderanteil);
		}
		return 0.0;
	}
	return t_nachlass;
}
c_NachlassRechner_LI.prototype.p_verteileAnVaterMutter=function(t_vater,t_mutter,t_parentel,t_nachlass){
	if(bb_utils_isZero(t_nachlass,0)){
		return 0.0;
	}
	if(t_vater==null || t_mutter==null){
		return t_nachlass;
	}
	if(t_vater.m__tot==true && t_vater.p_hatLebendeNachkommen(t_parentel)==false && t_mutter.m__tot==true && t_mutter.p_hatLebendeNachkommen(t_parentel)==false){
		return t_nachlass;
	}
	var t_ehepartner=this.p_getErbenVomTyp(6);
	var t_anteilVater=t_nachlass*0.5;
	var t_anteilMutter=t_nachlass*0.5;
	if(t_vater.m__tot==true && t_vater.p_hatLebendeNachkommen(t_parentel)==false){
		t_anteilVater=0.0;
		t_anteilMutter=t_nachlass;
	}
	if(t_mutter.m__tot==true && t_mutter.p_hatLebendeNachkommen(t_parentel)==false){
		t_anteilVater=t_nachlass;
		t_anteilMutter=0.0;
	}
	this.p_setNachlass(t_vater,t_ehepartner,t_parentel,t_anteilVater);
	this.p_setNachlass(t_mutter,t_ehepartner,t_parentel,t_anteilMutter);
	return 0.0;
}
c_NachlassRechner_LI.prototype.p_verteileAufParentel2=function(t_nachlass){
	if(bb_utils_isZero(t_nachlass,0)){
		return 0.0;
	}
	var t_vater=this.p_getErbenVomTyp(3);
	var t_mutter=this.p_getErbenVomTyp(4);
	return this.p_verteileAnVaterMutter(t_vater,t_mutter,2,t_nachlass);
}
c_NachlassRechner_LI.prototype.p_verteileAufParentel3=function(t_nachlass){
	if(bb_utils_isZero(t_nachlass,0)){
		return 0.0;
	}
	var t_vater=this.p_getErbenVomTyp(3);
	var t_mutter=this.p_getErbenVomTyp(4);
	if(t_vater==null || t_mutter==null){
		return t_nachlass;
	}
	var t_vater_grossvater=t_vater.m__eltern.p_get(0);
	var t_vater_grossmutter=t_vater.m__eltern.p_get(1);
	var t_restVaterseite=this.p_verteileAnVaterMutter(t_vater_grossvater,t_vater_grossmutter,3,t_nachlass/2.0);
	var t_mutter_grossvater=t_mutter.m__eltern.p_get(0);
	var t_mutter_grossmutter=t_mutter.m__eltern.p_get(1);
	var t_restMutterseite=this.p_verteileAnVaterMutter(t_mutter_grossvater,t_mutter_grossmutter,3,t_nachlass/2.0);
	if(bb_utils_isGZero(t_restVaterseite,0) && bb_utils_isZero(t_restMutterseite,0)){
		this.p_verteileAnVaterMutter(t_mutter_grossvater,t_mutter_grossmutter,3,t_restVaterseite);
		return 0.0;
	}
	if(bb_utils_isGZero(t_restMutterseite,0) && bb_utils_isZero(t_restVaterseite,0)){
		this.p_verteileAnVaterMutter(t_vater_grossvater,t_vater_grossmutter,3,t_restMutterseite);
		return 0.0;
	}
	return t_nachlass;
}
function c_Hinterbliebener(){
	Object.call(this);
	this.m__id=0;
	this.m__typ=0;
	this.m__tot=false;
	this.m__name="";
	this.m__zugewiesen=.0;
	this.m__internal=false;
	this.m__eltern=c_HinterbliebenerArray.m_new.call(new c_HinterbliebenerArray);
	this.m__parentel=0;
	this.m__kinder=c_HinterbliebenerArray.m_new.call(new c_HinterbliebenerArray);
	this.m__erbanspruch=.0;
	this.m__total_erbe=.0;
	this.m__pflichtteil=.0;
	this.m__erbanspruch_proz=.0;
	this.m__total_erbe_proz=.0;
	this.m__steuern_freibetrag=.0;
	this.m__steuern_abzug=.0;
	this.m__steuern=.0;
	this.m__pflichtteil_info="";
}
c_Hinterbliebener.m_new=function(){
	return this;
}
c_Hinterbliebener.prototype.p_hatEltern=function(t_typ){
	var t_=this.m__eltern.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_elternteil=t_.p_NextObject();
		if(t_elternteil.m__typ==t_typ){
			return true;
		}
	}
	return false;
}
c_Hinterbliebener.prototype.p_getGeschuetzerAnspruch=function(){
	return this.m__erbanspruch*this.m__pflichtteil;
}
c_Hinterbliebener.prototype.p_hatLebendeEltern=function(t_typ){
	var t_=this.m__eltern.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_elternteil=t_.p_NextObject();
		if(t_elternteil.m__typ==t_typ && t_elternteil.m__tot==false){
			return true;
		}
	}
	return false;
}
c_Hinterbliebener.prototype.p_hatLebendeNachkommen=function(t_iParentel){
	var t_=this.m__kinder.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_k=t_.p_NextObject();
		if(t_k.m__parentel!=t_iParentel){
			continue;
		}
		if(t_k.m__tot==false){
			return true;
		}
		if(t_k.p_hatLebendeNachkommen(t_iParentel)){
			return true;
		}
	}
	return false;
}
c_Hinterbliebener.prototype.p_setNachlass2=function(t_parentel,t_nachlass){
	if(bb_utils_isZero(t_nachlass,0)){
		return 0.0;
	}
	if(this.m__tot==false && this.m__parentel==t_parentel){
		this.m__erbanspruch+=t_nachlass;
		return 0.0;
	}
	var t_n=0;
	var t_=this.m__kinder.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_k=t_.p_NextObject();
		if(t_k.m__tot==false || t_k.p_hatLebendeNachkommen(t_parentel)){
			t_n+=1;
		}
	}
	if(t_n>0){
		var t_kinderanteil=t_nachlass/(t_n);
		var t_2=this.m__kinder.p_ObjectEnumerator();
		while(t_2.p_HasNext()){
			var t_k2=t_2.p_NextObject();
			t_k2.p_setNachlass2(t_parentel,t_kinderanteil);
		}
		return 0.0;
	}
	return t_nachlass;
}
function c_DynamicArray7(){
	Object.call(this);
	this.m__len=0;
	this.m__sz=0;
	this.m__i=[];
}
c_DynamicArray7.prototype.p_clear=function(){
	this.m__len=0;
	this.m__sz=10;
	this.m__i=new_object_array(this.m__sz);
}
c_DynamicArray7.m_new=function(){
	this.p_clear();
	return this;
}
c_DynamicArray7.prototype.p_ObjectEnumerator=function(){
	return c_DynArrayEnumerator5.m_new.call(new c_DynArrayEnumerator5,this);
}
c_DynamicArray7.prototype.p_length=function(){
	return this.m__len;
}
c_DynamicArray7.prototype.p_get=function(t_i){
	var t_oNULL=null;
	if(t_i>=0 && t_i<this.m__len){
		return this.m__i[t_i];
	}
	return t_oNULL;
}
c_DynamicArray7.prototype.p_add9=function(t_elt){
	this.m__len+=1;
	if(this.m__len>this.m__sz){
		this.m__sz=this.m__sz*2;
		this.m__i=resize_object_array(this.m__i,this.m__sz);
	}
	this.m__i[this.m__len-1]=t_elt;
}
c_DynamicArray7.prototype.p_compareItem3=function(t_e1,t_e2){
	error("Unable to compare items");
	return 0;
}
c_DynamicArray7.prototype.p_qsort=function(t_min,t_max,t_ccsgn){
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
		while(this.p_compareItem3(this.m__i[t_hi],t_mid_value)*t_ccsgn>=0){
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
		while(this.p_compareItem3(this.m__i[t_lo],t_mid_value)*t_ccsgn<0){
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
c_DynamicArray7.prototype.p_sortArray=function(t_ascending){
	var t_ccsgn=-1;
	if(t_ascending){
		t_ccsgn=1;
	}
	this.p_qsort(0,this.p_length()-1,t_ccsgn);
}
function c_HinterbliebenerArray(){
	c_DynamicArray7.call(this);
}
c_HinterbliebenerArray.prototype=extend_class(c_DynamicArray7);
c_HinterbliebenerArray.m_new=function(){
	c_DynamicArray7.m_new.call(this);
	return this;
}
c_HinterbliebenerArray.prototype.p_compareItem3=function(t_h1,t_h2){
	if(t_h1.m__parentel>t_h2.m__parentel){
		return 1;
	}
	if(t_h1.m__parentel<t_h2.m__parentel){
		return -1;
	}
	if(t_h1.m__typ>t_h2.m__typ){
		return 1;
	}
	if(t_h1.m__typ<t_h2.m__typ){
		return -1;
	}
	if(t_h1.m__id>t_h2.m__id){
		return 1;
	}
	if(t_h1.m__id<t_h2.m__id){
		return -1;
	}
	return 0;
}
function c_DynArrayEnumerator5(){
	Object.call(this);
	this.m__arr=null;
	this.m__curr=0;
}
c_DynArrayEnumerator5.m_new=function(t_arr){
	this.m__arr=t_arr;
	this.m__curr=-1;
	return this;
}
c_DynArrayEnumerator5.m_new2=function(){
	return this;
}
c_DynArrayEnumerator5.prototype.p_HasNext=function(){
	if(this.m__curr+1<this.m__arr.p_length()){
		return true;
	}
	return false;
}
c_DynArrayEnumerator5.prototype.p_NextObject=function(){
	this.m__curr+=1;
	return this.m__arr.p_get(this.m__curr);
}
function c_NachlassTypen(){
	Object.call(this);
}
c_NachlassTypen.m_getParentel=function(t_typ){
	var t_1=t_typ;
	if(t_1==1 || t_1==2){
		return 3;
	}else{
		if(t_1==3 || t_1==4){
			return 2;
		}else{
			if(t_1==5){
				return 3;
			}else{
				if(t_1==6){
					return 0;
				}else{
					if(t_1==7){
						return 2;
					}else{
						if(t_1==8){
							return 3;
						}else{
							if(t_1==9){
								return 2;
							}else{
								if(t_1==10 || t_1==11 || t_1==12){
									return 1;
								}else{
									if(t_1==13){
										return 4;
									}else{
										if(t_1==99){
											return 4;
										}else{
											if(t_1==100){
												return 0;
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
	return 4;
}
c_NachlassTypen.m_toString=function(t_typ){
	var t_2=t_typ;
	if(t_2==1){
		return "Grosselt.VS.";
	}else{
		if(t_2==2){
			return "Grosselt.MS.";
		}else{
			if(t_2==3){
				return "Vater";
			}else{
				if(t_2==4){
					return "Mutter";
				}else{
					if(t_2==5){
						return "Onkel/Tante";
					}else{
						if(t_2==6){
							return "Ehepartner";
						}else{
							if(t_2==7){
								return "Geschwister";
							}else{
								if(t_2==8){
									return "Cousin";
								}else{
									if(t_2==9){
										return "Neffe";
									}else{
										if(t_2==10){
											return "Kind";
										}else{
											if(t_2==11){
												return "Enkel";
											}else{
												if(t_2==12){
													return "Urenkel";
												}else{
													if(t_2==13){
														return "Konk.Partner";
													}else{
														if(t_2==99){
															return "\u00dcbrige";
														}else{
															if(t_2==100){
																return "Erblasser";
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
	return "\u00dcbrige";
}
c_NachlassTypen.m_mapErbeAufStErbGruppe=function(t_typ){
	var t_3=t_typ;
	if(t_3==1 || t_3==2){
		return c_StC_natPers.m_ES_GRP_GROSSELTERN;
	}else{
		if(t_3==3){
			return c_StC_natPers.m_ES_GRP_ELTERN;
		}else{
			if(t_3==4){
				return c_StC_natPers.m_ES_GRP_ELTERN;
			}else{
				if(t_3==5){
					return c_StC_natPers.m_ES_GRP_ONKELTANTEN;
				}else{
					if(t_3==6){
						return c_StC_natPers.m_ES_GRP_EHEPARTNER;
					}else{
						if(t_3==7){
							return c_StC_natPers.m_ES_GRP_GESCHWISTER;
						}else{
							if(t_3==8){
								return c_StC_natPers.m_ES_GRP_ONKELTANTEN;
							}else{
								if(t_3==9){
									return c_StC_natPers.m_ES_GRP_ONKELTANTEN;
								}else{
									if(t_3==10){
										return c_StC_natPers.m_ES_GRP_KINDER;
									}else{
										if(t_3==11){
											return c_StC_natPers.m_ES_GRP_KINDER;
										}else{
											if(t_3==12){
												return c_StC_natPers.m_ES_GRP_KINDER;
											}else{
												if(t_3==13){
													return c_StC_natPers.m_ES_GRP_PARTNER;
												}else{
													if(t_3==100){
														return c_StC_natPers.m_ES_GRP_UNDEF;
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
	return c_StC_natPers.m_ES_GRP_UEBRIGE;
}
c_NachlassTypen.m_mapErbeAufStErbBeguenstigte=function(t_typ){
	var t_4=t_typ;
	if(t_4==1 || t_4==2){
		return c_StC_natPers.m_ES_GRP_GROSSELTERN_GROSSELTERN;
	}else{
		if(t_4==3){
			return c_StC_natPers.m_ES_GRP_ELTERN_ELTERN;
		}else{
			if(t_4==4){
				return c_StC_natPers.m_ES_GRP_ELTERN_ELTERN;
			}else{
				if(t_4==5){
					return c_StC_natPers.m_ES_GRP_ONKELTANTEN_ONKEL;
				}else{
					if(t_4==6){
						return c_StC_natPers.m_ES_GRP_EHEPARTNER_EHEPARTNER;
					}else{
						if(t_4==7){
							return c_StC_natPers.m_ES_GRP_GESCHWISTER_GESCHWISTER;
						}else{
							if(t_4==8){
								return c_StC_natPers.m_ES_GRP_ONKELTANTEN_COUSIN;
							}else{
								if(t_4==9){
									return c_StC_natPers.m_ES_GRP_ONKELTANTEN_NEFFEN;
								}else{
									if(t_4==10){
										return c_StC_natPers.m_ES_GRP_KINDER_KINDER;
									}else{
										if(t_4==11){
											return c_StC_natPers.m_ES_GRP_KINDER_NACHKOMMENKINDER;
										}else{
											if(t_4==12){
												return c_StC_natPers.m_ES_GRP_KINDER_NACHKOMMENKINDER;
											}else{
												if(t_4==13){
													return c_StC_natPers.m_ES_GRP_PARTNER_LEBENSPARTNER;
												}else{
													if(t_4==100){
														return c_StC_natPers.m_ES_GRP_UNDEF;
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
	return 1;
}
function c_StC_natPers_ES_INFO(){
	Object.call(this);
}
c_StC_natPers_ES_INFO.m_FREIBETRAG=0;
c_StC_natPers_ES_INFO.m_REGEL=0;
c_StC_natPers_ES_INFO.m_KEINESTEUERN=0;
c_StC_natPers_ES_INFO.m_ABZUG=0;
c_StC_natPers_ES_INFO.m_MINDESTJAHRE=0;
c_StC_natPers_ES_INFO.m_JEELTERNTEIL=0;
c_StC_natPers_ES_INFO.m_REGEL_UNDEF="";
c_StC_natPers_ES_INFO.m_REGEL_EIGENE="";
c_StC_natPers_ES_INFO.m_REGEL_UEBRIGE="";
function c_StCESInfos(){
	Object.call(this);
	this.m__levels=c_IntMap3.m_new.call(new c_IntMap3);
}
c_StCESInfos.m_new=function(){
	return this;
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
c_StCESInfos.prototype.p_clear=function(){
	this.m__levels.p_Clear();
}
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
c_StCESInfoLevel.prototype.p_getInfo2=function(t_iInfoTyp,t_bFormated){
	var t_d=null;
	var t_sInfo="";
	if(t_iInfoTyp==-1){
		t_sInfo=this.p_getInfo2(c_StC_natPers_ES_INFO.m_REGEL,true)+this.p_getInfo2(c_StC_natPers_ES_INFO.m_KEINESTEUERN,true)+this.p_getInfo2(c_StC_natPers_ES_INFO.m_FREIBETRAG,true)+this.p_getInfo2(c_StC_natPers_ES_INFO.m_ABZUG,true)+this.p_getInfo2(c_StC_natPers_ES_INFO.m_MINDESTJAHRE,true)+this.p_getInfo2(c_StC_natPers_ES_INFO.m_JEELTERNTEIL,true);
		t_sInfo=string_trim(t_sInfo);
	}else{
		t_d=this.p__detail(t_iInfoTyp);
		t_sInfo=string_trim(t_d.m__info);
		if(t_bFormated && t_sInfo!=""){
			var t_1=t_d.m__typ;
			if(t_1==c_StC_natPers_ES_INFO.m_REGEL){
				t_sInfo="R"+t_sInfo+"  ";
			}else{
				if(t_1==c_StC_natPers_ES_INFO.m_KEINESTEUERN){
					t_sInfo="K"+t_sInfo+"  ";
				}else{
					if(t_1==c_StC_natPers_ES_INFO.m_FREIBETRAG){
						t_sInfo="F"+t_sInfo+"  ";
					}else{
						if(t_1==c_StC_natPers_ES_INFO.m_ABZUG){
							t_sInfo="A"+t_sInfo+"  ";
						}else{
							if(t_1==c_StC_natPers_ES_INFO.m_MINDESTJAHRE){
								t_sInfo="J"+t_sInfo+"  ";
							}else{
								if(t_1==c_StC_natPers_ES_INFO.m_JEELTERNTEIL){
									t_sInfo="E"+t_sInfo+"  ";
								}
							}
						}
					}
				}
			}
		}
	}
	return t_sInfo;
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
function c_BezugsRechnerResultat(){
	Object.call(this);
	this.m__dauer_j=0;
	this.m__dauer_m=0;
	this.m__bezug=.0;
	this.m__konto=c_BankKonto.m_new.call(new c_BankKonto);
	this.m__endkapital=.0;
	this.m__infinit_dauer=false;
}
c_BezugsRechnerResultat.m_new=function(){
	return this;
}
c_BezugsRechnerResultat.prototype.p_runden4=function(t_ganzeBetraege){
	if(t_ganzeBetraege){
		this.m__endkapital=bb_utils_trunc(this.m__endkapital);
		this.m__bezug=bb_utils_trunc(this.m__bezug);
		if(this.m__konto!=null){
			this.m__konto.p_runden4(t_ganzeBetraege);
		}
	}
}
function c_BezugsRechner(){
	c_Newton.call(this);
	this.m__customizing="";
	this.m__startkapital=.0;
	this.m__bezug=.0;
	this.m__monatlich=false;
	this.m__dauerJ=0;
	this.m__endkapital=.0;
	this.m__konto=c_BankKonto.m_new.call(new c_BankKonto);
	this.m__approx_methode=0;
}
c_BezugsRechner.prototype=extend_class(c_Newton);
c_BezugsRechner.m_new=function(){
	c_Newton.m_new.call(this);
	return this;
}
c_BezugsRechner.m_new2=function(t_c){
	c_Newton.m_new.call(this);
	this.m__customizing=t_c;
	return this;
}
c_BezugsRechner.m_getInstanceFor=function(t_customizing){
	return c_BezugsRechner.m_new2.call(new c_BezugsRechner,t_customizing);
}
c_BezugsRechner.prototype.p_reset=function(){
	this.m__startkapital=0.0;
	this.m__bezug=0.0;
	this.m__monatlich=false;
	this.m__dauerJ=0;
	this.m__endkapital=0.0;
	this.m__konto=c_BankKonto.m_new.call(new c_BankKonto);
}
c_BezugsRechner.prototype.p_berechneEndkapitalInMonaten2=function(t_ganzeBetraege,t_bezug,t_dauerInMonaten){
	var t_res=c_BezugsRechnerResultat.m_new.call(new c_BezugsRechnerResultat);
	var t_curJahr=null;
	var t_nextJahr=null;
	var t_i=0;
	var t_letztesJahr=false;
	var t_letztesJahrUnterjaehrig=false;
	var t_letztesJahrPerMonat=0;
	var t_dauerJ=0;
	var t_dauerM_letztesJahr=0;
	t_dauerJ=((t_dauerInMonaten/12)|0);
	t_dauerM_letztesJahr=t_dauerInMonaten % 12;
	t_res.m__dauer_j=t_dauerJ;
	t_res.m__dauer_m=t_dauerM_letztesJahr;
	t_res.m__bezug=t_bezug;
	t_res.m__konto=this.m__konto;
	if(t_dauerM_letztesJahr>0){
		t_dauerJ+=1;
	}
	t_curJahr=this.m__konto.p_setAnfangsstandJahr1(this.m__startkapital,1);
	for(t_i=0;t_i<t_dauerJ;t_i=t_i+1){
		if(t_curJahr==null){
			break;
		}
		t_letztesJahr=false;
		t_letztesJahrUnterjaehrig=false;
		if(t_i+1>=t_dauerJ){
			t_letztesJahr=true;
			if(t_dauerM_letztesJahr>0){
				t_letztesJahrUnterjaehrig=true;
				t_letztesJahrPerMonat=t_dauerM_letztesJahr-1;
			}
		}
		if(this.m__monatlich){
			var t_toMonat=11;
			if(t_letztesJahrUnterjaehrig){
				t_toMonat=t_letztesJahrPerMonat;
			}
			for(var t_m=0;t_m<=t_toMonat;t_m=t_m+1){
				t_curJahr.p_setVeraenderung(-t_bezug,t_m,false);
			}
		}else{
			t_curJahr.p_setJaehrlicheEinlage(-t_bezug,false);
		}
		if(t_letztesJahr){
			if(t_letztesJahrUnterjaehrig){
				t_curJahr.p_saldiereUnterjaehrig(t_letztesJahrPerMonat);
			}else{
				t_curJahr.p_saldiereJahr();
			}
			t_nextJahr=null;
		}else{
			t_curJahr.p_saldiereJahr();
			t_nextJahr=this.m__konto.p_eroeffneFolgejahr(t_curJahr);
		}
		t_res.m__endkapital=t_curJahr.m__endkapital;
		t_curJahr=t_nextJahr;
	}
	if(t_ganzeBetraege){
		t_res.p_runden4(t_ganzeBetraege);
	}
	return t_res;
}
c_BezugsRechner.prototype.p_berechneDauerInMonaten=function(){
	var t_monate=0;
	var t_j=0;
	var t_curJahr=c_BankKontoJahr.m_new2.call(new c_BankKontoJahr,this.m__konto);
	var t_anfangsWert=.0;
	t_anfangsWert=this.m__startkapital;
	for(t_j=0;t_j<101;t_j=t_j+1){
		if(t_j>=100){
			t_monate=-1;
			break;
		}
		t_curJahr.p_setAnfangsstand(t_anfangsWert);
		if(this.m__monatlich){
			for(var t_vm=0;t_vm<=11;t_vm=t_vm+1){
				t_curJahr.p_setVeraenderung(-this.m__bezug,t_vm,false);
			}
		}else{
			t_curJahr.p_setJaehrlicheEinlage(-this.m__bezug,false);
		}
		t_curJahr.p_saldiereJahr();
		if(bb_utils_isGZero(t_curJahr.m__endkapital-this.m__endkapital,2)){
			t_anfangsWert=t_curJahr.m__endkapital;
			continue;
		}
		if(bb_utils_isZero(t_curJahr.m__endkapital-this.m__endkapital,2)){
			t_monate=(t_j+1)*12;
			break;
		}
		if(this.m__monatlich){
			for(var t_m=0;t_m<=11;t_m=t_m+1){
				t_monate=t_j*12+(t_m+1);
				t_curJahr.p_setAnfangsstand(t_anfangsWert);
				for(var t_vm2=0;t_vm2<=t_m;t_vm2=t_vm2+1){
					t_curJahr.p_setVeraenderung(-this.m__bezug,t_vm2,false);
				}
				t_curJahr.p_saldiereUnterjaehrig(t_m);
				if(bb_utils_isLZero(t_curJahr.m__endkapital-this.m__endkapital,2)){
					t_monate+=-1;
					break;
				}
			}
		}else{
			t_monate=(t_j+1)*12;
			if(bb_utils_isLZero(t_curJahr.m__endkapital-this.m__endkapital,2)){
				t_monate=t_j*12;
			}
		}
		break;
	}
	return t_monate;
}
c_BezugsRechner.prototype.p_berechneEndkapitalInJahren2=function(t_ganzeBetraege,t_bezug,t_jahre){
	var t_res=null;
	t_res=this.p_berechneEndkapitalInMonaten2(t_ganzeBetraege,t_bezug,t_jahre*12);
	if(bb_utils_isLZero(t_res.m__endkapital,4)){
		var t_maxMonate=this.p_berechneDauerInMonaten();
		var t_ueberlauf=false;
		if(t_maxMonate<0){
			t_ueberlauf=true;
			t_maxMonate=1200;
		}
		if(this.m__monatlich){
			t_res=this.p_berechneEndkapitalInMonaten2(t_ganzeBetraege,t_bezug,t_maxMonate);
			if(t_res.m__dauer_m>0){
				t_res.m__konto.m__standjahr.p_remove(t_res.m__konto.m__standjahr.p_length()-1);
			}
		}else{
			t_jahre=((t_maxMonate/12)|0);
			t_res=this.p_berechneEndkapitalInMonaten2(t_ganzeBetraege,t_bezug,t_jahre*12);
		}
		if(t_ueberlauf){
			t_res.m__dauer_j=0;
			t_res.m__dauer_m=0;
			t_res.m__infinit_dauer=t_ueberlauf;
		}
	}
	return t_res;
}
c_BezugsRechner.prototype.p_berechneEndkapitalInJahren=function(t_ganzeBetraege){
	return this.p_berechneEndkapitalInJahren2(t_ganzeBetraege,this.m__bezug,this.m__dauerJ);
}
c_BezugsRechner.prototype.p_berechneEndkapital2=function(t_startkapital,t_bezug,t_monatlich,t_jahre,t_rendite,t_ganzeBetraege){
	this.p_reset();
	this.m__startkapital=t_startkapital;
	this.m__bezug=t_bezug;
	this.m__monatlich=t_monatlich;
	this.m__dauerJ=t_jahre;
	this.m__konto.p_setZinssatz(t_rendite);
	return this.p_berechneEndkapitalInJahren(t_ganzeBetraege);
}
c_BezugsRechner.prototype.p_berechneBezug=function(t_ganzeBetraege){
	this.m__approx_methode=1;
	var t_bezug=this.p_approximate(0.0,this.m__endkapital,0.001,100.0,10000.0);
	if(t_ganzeBetraege){
		t_bezug=bb_utils_trunc(t_bezug);
	}
	return this.p_berechneEndkapitalInJahren2(t_ganzeBetraege,t_bezug,this.m__dauerJ);
}
c_BezugsRechner.prototype.p_berechneBezug2=function(t_startkapital,t_monatlich,t_jahre,t_rendite,t_endkapital,t_ganzeBetraege){
	this.p_reset();
	this.m__startkapital=t_startkapital;
	this.m__monatlich=t_monatlich;
	this.m__dauerJ=t_jahre;
	this.m__endkapital=t_endkapital;
	this.m__konto.p_setZinssatz(t_rendite);
	return this.p_berechneBezug(t_ganzeBetraege);
}
c_BezugsRechner.prototype.p_berechneDauer2=function(t_ganzeBetraege,t_typ){
	var t_res=null;
	var t_monate=this.p_berechneDauerInMonaten();
	var t_ueberlauf=false;
	if(t_monate<0){
		t_ueberlauf=true;
		t_monate=1200;
	}
	var t_3=t_typ;
	if(t_3==3){
		var t_jahre=0;
		t_jahre=((t_monate/12)|0);
		if(t_monate % 12>0){
			t_jahre+=1;
		}
		t_res=this.p_berechneEndkapitalInJahren2(t_ganzeBetraege,this.m__bezug,t_jahre);
		t_res.m__dauer_j=((t_monate/12)|0);
		t_res.m__dauer_m=t_monate % 12;
	}else{
		if(t_3==4){
			t_res=this.p_berechneEndkapitalInMonaten2(t_ganzeBetraege,this.m__bezug,t_monate);
		}
	}
	if(t_ueberlauf && t_res!=null){
		t_res.m__dauer_j=0;
		t_res.m__dauer_m=0;
		t_res.m__infinit_dauer=t_ueberlauf;
	}
	return t_res;
}
c_BezugsRechner.prototype.p_berechneDauer=function(t_startkapital,t_bezug,t_monatlich,t_rendite,t_endkapital,t_ganzeBetraege){
	this.p_reset();
	this.m__startkapital=t_startkapital;
	this.m__bezug=t_bezug;
	this.m__monatlich=t_monatlich;
	this.m__endkapital=t_endkapital;
	this.m__konto.p_setZinssatz(t_rendite);
	return this.p_berechneDauer2(t_ganzeBetraege,3);
}
c_BezugsRechner.prototype.p_fromJson=function(t_o){
	this.m__startkapital=c_JSonHelper.m_F(t_o,"startcapital");
	this.m__bezug=c_JSonHelper.m_F(t_o,"withdrawal");
	this.m__monatlich=c_JSonHelper.m_B(t_o,"monthlybase");
	this.m__dauerJ=c_JSonHelper.m_I(t_o,"duration");
	this.m__endkapital=c_JSonHelper.m_F(t_o,"endcapital");
	this.m__konto.p_fromJson(t_o);
}
c_BezugsRechner.prototype.p_berechne12=function(t_typ,t_dataAsJSon,t_ganzeBetraege){
	this.p_reset();
	var t_js=c_JsonObject.m_new3.call(new c_JsonObject,t_dataAsJSon);
	this.p_fromJson(t_js);
	var t_1=t_typ;
	if(t_1==1){
		return this.p_berechneEndkapitalInJahren(t_ganzeBetraege);
	}else{
		if(t_1==2){
			return this.p_berechneBezug(t_ganzeBetraege);
		}else{
			if(t_1==3){
				return this.p_berechneDauer2(t_ganzeBetraege,t_typ);
			}else{
				if(t_1==4){
					return this.p_berechneDauer2(t_ganzeBetraege,t_typ);
				}
			}
		}
	}
	return null;
}
c_BezugsRechner.prototype.p_sample=function(t_startval,t_guess){
	var t_res=null;
	var t_2=this.m__approx_methode;
	if(t_2==1){
		t_res=this.p_berechneEndkapitalInJahren2(false,t_guess,this.m__dauerJ);
		return t_res.m__endkapital;
	}
	return 0.0;
}
function c_FreiVerfuegbaresVMVerlauf(){
	Object.call(this);
	this.m__startjahr=0;
	this.m__dauer=0;
	this.m__vmverlauf=null;
	this.m__liqReserve=.0;
	this.m__freiverfgbaresvm=.0;
	this.m__stand=c_Collection.m_new.call(new c_Collection);
}
c_FreiVerfuegbaresVMVerlauf.m_new=function(){
	return this;
}
function c_EinfachesFreiVerfuegbaresVM(){
	Object.call(this);
}
c_EinfachesFreiVerfuegbaresVM.m_new=function(){
	return this;
}
c_EinfachesFreiVerfuegbaresVM.prototype.p_getFreiVerfuegbaresVM=function(t_vmverlauf,t_liqReserve){
	var t_verfuegbar=0.0;
	var t_first=true;
	var t_diff=.0;
	var t_=t_vmverlauf.m__stand.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		var t_s=object_downcast((t_o),c_VMStandJahr);
		t_diff=bb_math_Min2(t_s.m__anfangsvm-t_liqReserve,t_s.m__endvm-t_liqReserve);
		if(t_diff>0.01){
			if(t_first){
				t_verfuegbar=t_diff;
				t_first=false;
			}else{
				t_verfuegbar=bb_math_Min2(t_verfuegbar,t_diff);
			}
		}else{
			t_verfuegbar=0.0;
			break;
		}
	}
	return t_verfuegbar;
}
c_EinfachesFreiVerfuegbaresVM.prototype.p_berechne17=function(t_startjahr,t_dauer,t_liqReserve,t_anfangsvm,t_zinssatz,t_neg_zinssatz,t_sparquote,t_deltaJSON,t_ganzeBetraege){
	var t_res=c_FreiVerfuegbaresVMVerlauf.m_new.call(new c_FreiVerfuegbaresVMVerlauf);
	var t_r=c_EinfacheVMEntwicklung.m_new.call(new c_EinfacheVMEntwicklung);
	t_res.m__startjahr=t_startjahr;
	t_res.m__dauer=t_dauer;
	t_res.m__vmverlauf=t_r.p_berechne18(t_startjahr,t_dauer,t_anfangsvm,t_zinssatz,t_neg_zinssatz,t_sparquote,t_deltaJSON,true);
	t_res.m__liqReserve=t_liqReserve;
	t_res.m__vmverlauf.p_runden4(t_ganzeBetraege);
	t_res.m__freiverfgbaresvm=this.p_getFreiVerfuegbaresVM(t_res.m__vmverlauf,t_liqReserve);
	var t_=t_res.m__vmverlauf.m__stand.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		var t_s=object_downcast((t_o),c_VMStandJahr);
		var t_v=c_FreiVerfuegbaresVMStandJahr.m_new.call(new c_FreiVerfuegbaresVMStandJahr);
		var t_wert=t_s.m__anfangsvm;
		t_v.m__jahr=t_s.m__jahr;
		if(t_wert<0.0){
			t_v.m__schuld=t_wert;
		}else{
			t_v.m__verfgbar=t_res.m__freiverfgbaresvm;
			t_v.m__liq=t_wert-t_v.m__verfgbar;
		}
		t_res.m__stand.p_add2(t_v);
	}
	return t_res;
}
function c_EinfacheVMEntwicklung(){
	Object.call(this);
}
c_EinfacheVMEntwicklung.m_new=function(){
	return this;
}
c_EinfacheVMEntwicklung.prototype.p_berechne18=function(t_startjahr,t_dauer,t_anfangsvm,t_zinssatz,t_neg_zinssatz,t_sparquote,t_deltaJSON,t_alleAmAnfang){
	var t_res=c_VMVerlauf.m_new.call(new c_VMVerlauf);
	t_res.p_init2(t_startjahr,t_dauer,t_anfangsvm,t_zinssatz,t_neg_zinssatz);
	for(var t_i=0;t_i<t_dauer;t_i=t_i+1){
		if(t_alleAmAnfang){
			t_res.p_setVeraenderung2(t_startjahr+t_i,t_sparquote,0.0,0.0);
		}else{
			t_res.p_setVeraenderung2(t_startjahr+t_i,0.0,t_sparquote,0.0);
		}
	}
	try{
		var t_js=c_JsonObject.m_new3.call(new c_JsonObject,t_deltaJSON);
		var t_a=object_downcast((t_js.p_Get("changes",null)),c_JsonArray);
		if(t_a!=null){
			for(var t_i2=0;t_i2<t_a.p_Length();t_i2=t_i2+1){
				var t_o=object_downcast((t_a.p_Get3(t_i2)),c_JsonObject);
				if(t_o!=null){
					var t_jahr=c_JSonHelper.m_I(t_o,"year");
					var t_value=c_JSonHelper.m_F(t_o,"amount");
					if(t_alleAmAnfang){
						t_res.p_setVeraenderung2(t_jahr,t_value,0.0,0.0);
					}else{
						if(t_value>0.0){
							t_res.p_setVeraenderung2(t_jahr,0.0,0.0,t_value);
						}else{
							t_res.p_setVeraenderung2(t_jahr,t_value,0.0,0.0);
						}
					}
				}
			}
		}
	}catch(_eek_){
		if(t_err=object_downcast(_eek_,ThrowableObject)){
		}else{
			throw _eek_;
		}
	}
	return t_res;
}
function c_VMVerlauf(){
	Object.call(this);
	this.m__startjahr=0;
	this.m__dauer=0;
	this.m__stand=c_Collection.m_new.call(new c_Collection);
}
c_VMVerlauf.m_new=function(){
	return this;
}
c_VMVerlauf.prototype.p_init2=function(t_jahr,t_dauer,t_anfangsstand,t_zinssatz,t_neg_zinssatz){
	this.m__startjahr=t_jahr;
	this.m__dauer=t_dauer;
	this.m__stand.p_clear();
	var t_s=null;
	var t_nextStartWert=t_anfangsstand;
	var t_i=0;
	for(t_i=0;t_i<t_dauer;t_i=t_i+1){
		t_s=c_VMStandJahr.m_new.call(new c_VMStandJahr,t_jahr+t_i,t_nextStartWert,t_zinssatz,t_neg_zinssatz);
		this.m__stand.p_add2(t_s);
		t_s.p_updateStand();
		t_nextStartWert=t_s.m__endvm;
	}
}
c_VMVerlauf.prototype.p_setVeraenderung2=function(t_jahr,t_vorschuessig,t_unterjaehrig,t_nachschuessig){
	var t_bUpdate=false;
	var t_nextStartWert=.0;
	var t_=this.m__stand.p_ObjectEnumerator();
	while(t_.p_HasNext()){
		var t_o=t_.p_NextObject();
		var t_s=object_downcast((t_o),c_VMStandJahr);
		if(t_bUpdate==false){
			if(t_s.m__jahr==t_jahr){
				t_s.m__delta_vorschuessig+=t_vorschuessig;
				t_s.m__delta_unterjaehrig+=t_unterjaehrig;
				t_s.m__dleta_nachschuessig+=t_nachschuessig;
				t_s.p_updateStand();
				t_nextStartWert=t_s.m__endvm;
				t_bUpdate=true;
			}
		}else{
			t_s.m__eroeffnungswert=t_nextStartWert;
			t_s.p_updateStand();
			t_nextStartWert=t_s.m__endvm;
		}
	}
}
c_VMVerlauf.prototype.p_runden4=function(t_ganzeBetraege){
	if(t_ganzeBetraege){
		var t_=this.m__stand.p_ObjectEnumerator();
		while(t_.p_HasNext()){
			var t_o=t_.p_NextObject();
			var t_s=object_downcast((t_o),c_VMStandJahr);
			t_s.m__anfangsvm=bb_utils_trunc(t_s.m__anfangsvm);
			t_s.m__zinsen=bb_utils_trunc(t_s.m__zinsen);
			t_s.m__endvm=bb_utils_trunc(t_s.m__endvm);
		}
	}
}
function c_VMStandJahr(){
	Object.call(this);
	this.m__jahr=0;
	this.m__eroeffnungswert=.0;
	this.m__zinssatz=.0;
	this.m__neg_zinssatz=.0;
	this.m__delta_vorschuessig=.0;
	this.m__anfangsvm=.0;
	this.m__zinsen=.0;
	this.m__delta_unterjaehrig=.0;
	this.m__dleta_nachschuessig=.0;
	this.m__endvm=.0;
}
c_VMStandJahr.prototype.p_updateStand=function(){
	this.m__anfangsvm=this.m__eroeffnungswert+this.m__delta_vorschuessig;
	if(this.m__anfangsvm<-0.01){
		this.m__zinsen=this.m__anfangsvm*this.m__neg_zinssatz/100.0;
	}else{
		this.m__zinsen=this.m__anfangsvm*this.m__zinssatz/100.0;
	}
	this.m__zinsen+=this.m__delta_unterjaehrig*this.m__zinssatz/100.0/2.0;
	this.m__endvm=this.m__eroeffnungswert+this.m__delta_vorschuessig+this.m__delta_unterjaehrig+this.m__dleta_nachschuessig+this.m__zinsen;
}
c_VMStandJahr.m_new=function(t_j,t_a,t_z,t_nz){
	this.m__jahr=t_j;
	this.m__eroeffnungswert=t_a;
	this.m__zinssatz=t_z;
	this.m__neg_zinssatz=t_nz;
	this.p_updateStand();
	return this;
}
c_VMStandJahr.m_new2=function(){
	return this;
}
function c_FreiVerfuegbaresVMStandJahr(){
	Object.call(this);
	this.m__jahr=0;
	this.m__schuld=.0;
	this.m__verfgbar=.0;
	this.m__liq=.0;
}
c_FreiVerfuegbaresVMStandJahr.m_new=function(){
	return this;
}
function bbMain(){
	c_API.m_initPrototypes();
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
	t_node=c_Node6.m_new.call(new c_Node6,t_key,t_value,-1,t_parent);
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
function c_Node6(){
	Object.call(this);
	this.m_key=0;
	this.m_right=null;
	this.m_left=null;
	this.m_value=false;
	this.m_color=0;
	this.m_parent=null;
}
c_Node6.m_new=function(t_key,t_value,t_color,t_parent){
	this.m_key=t_key;
	this.m_value=t_value;
	this.m_color=t_color;
	this.m_parent=t_parent;
	return this;
}
c_Node6.m_new2=function(){
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
	c_Limitation.m_limits=c_Limitation.m_new.call(new c_Limitation);
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
	c_StR_natPers.m_CalcTyp_EK=1;
	c_StC_natPers.m_Zivilstand_LEDIG=1;
	c_StC_natPers.m_Zivilstand_GESCHIEDEN=5;
	c_StC_natPers.m_Zivilstand_VERWITET=6;
	c_StC_natPers.m_Zivilstand_LEDIGALLEIN=2;
	c_StC_natPers.m_Zivilstand_EINGETR_PARTNERSCHAFT=7;
	c_StC_natPers.m_Zivilstand_VERHEIRATET=4;
	c_StC_natPers.m_Zivilstand_LEDIGKONKUBINAT=3;
	c_StR_natPers.m_Gruppe_LEDIGE_KONKUBINAT=2;
	c_StR_natPers.m_Gruppe_LEDIGE_ALLEINE=1;
	c_StR_natPers.m_Gruppe_VERHEIRATETE=4;
	c_StR_natPers.m_Gruppe_MIT_KINDER_FUER_LEDIGE=8;
	c_StR_natPers.m_Gruppe_OHNE_KINDER_FUER_LEDIGE=16;
	c_StR_natPers.m_Gruppe_MIT_KINDER_FUER_VERHEIRATETE=32;
	c_StR_natPers.m_Gruppe_OHNE_KINDER_FUER_VERHEIRATETE=64;
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
	c_StR_natPers.m_CalcTyp_VM=2;
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
	c_StC_common.m_TaxLevel_GEMEINDE=2;
	c_StC_common.m_TaxLevel_KIRCHE=3;
	c_StC_common.m_TaxLevel_KANTON=1;
	c_StC_common.m_TaxLevel_BUND=0;
	c_StC_natPers.m_Kapital_SAEULE_3A=1;
	c_StC_natPers.m_Sex_MANN=1;
	c_BVGEinkauf.m_law=null;
	c_StC_natPers.m_ES_GRP_GROSSELTERN=5;
	c_StC_natPers.m_ES_GRP_ELTERN=4;
	c_StC_natPers.m_ES_GRP_ONKELTANTEN=7;
	c_StC_natPers.m_ES_GRP_EHEPARTNER=1;
	c_StC_natPers.m_ES_GRP_GESCHWISTER=6;
	c_StC_natPers.m_ES_GRP_KINDER=3;
	c_StC_natPers.m_ES_GRP_PARTNER=2;
	c_StC_natPers.m_ES_GRP_UNDEF=0;
	c_StC_natPers.m_ES_GRP_UEBRIGE=8;
	c_StC_natPers.m_ES_GRP_GROSSELTERN_GROSSELTERN=1;
	c_StC_natPers.m_ES_GRP_ELTERN_ELTERN=1;
	c_StC_natPers.m_ES_GRP_ONKELTANTEN_ONKEL=1;
	c_StC_natPers.m_ES_GRP_EHEPARTNER_EHEPARTNER=1;
	c_StC_natPers.m_ES_GRP_GESCHWISTER_GESCHWISTER=1;
	c_StC_natPers.m_ES_GRP_ONKELTANTEN_COUSIN=32;
	c_StC_natPers.m_ES_GRP_ONKELTANTEN_NEFFEN=4;
	c_StC_natPers.m_ES_GRP_KINDER_KINDER=1;
	c_StC_natPers.m_ES_GRP_KINDER_NACHKOMMENKINDER=2;
	c_StC_natPers.m_ES_GRP_PARTNER_LEBENSPARTNER=1;
	c_StC_natPers.m_CalcTyp_ERB_UND_SCHENKSTEUER=8;
	c_StC_natPers_ES_INFO.m_FREIBETRAG=1;
	c_StC_natPers_ES_INFO.m_REGEL=6;
	c_StC_natPers_ES_INFO.m_KEINESTEUERN=5;
	c_StC_natPers_ES_INFO.m_ABZUG=2;
	c_StC_natPers_ES_INFO.m_MINDESTJAHRE=3;
	c_StC_natPers_ES_INFO.m_JEELTERNTEIL=4;
	c_StR_natPers.m_Spez_ES_WIRD_KEINE_STEUER_ERHOBEN=16;
	c_StR_natPers.m_Spez_RENTENTABELLE=8;
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
	c_StC_natPers_ES_INFO.m_REGEL_UNDEF="9";
	c_StC_natPers_ES_INFO.m_REGEL_EIGENE="1";
	c_StC_natPers.m_ES_GRP_UEBRIGE_UEBRIGE=1;
	c_StC_natPers_ES_INFO.m_REGEL_UEBRIGE="2";
	c_StC_natPers.m_ES_GRP_KINDER_VOLLWAISEN=4;
	c_StC_natPers.m_ES_GRP_GROSSELTERN_URGROSSELTERN=8;
}
//${TRANSCODE_END}


//${TRANSCODEATEND_BEGIN}

// --------------------------------------------------------------
// JS API for ch.logismata.online.calc
// --------------------------------------------------------------

if (typeof(ch) === "undefined") {
   ch = {};
}

if (typeof(ch.logismata) === "undefined") {
   ch.logismata = {};
}

if (typeof(ch.logismata.online) === "undefined") {
   ch.logismata.online = {};
}

if (typeof(ch.logismata.online.calc) === "undefined") {
    ch.logismata.online.calc = {

        // --------------------------------------------------------------
        // INITIALIZING FUNCTIONS 
                   
        // loadFrom:    initialise the tax rules from a given path/url
        // parameter:   string:url / access (folder) to the tax rule files (format .lt4 or .json)
        // result:      bool:true if successful
        loadFrom: function(path) {
            return c_API.m_loadFromURL(path);
        },
        
        // isValid:     returns true if rule base was loaded successfully
        // parameter:   none
        // result:      bool:true if successful
        isValid: function() {
            return c_API.m_isValid();
        },       
        

        // --------------------------------------------------------------
        // UTILITY FUNCTIONS 
        
        // calcExpression: calculates a simple math expression
        //                 operators like: - + * / ^
        //                 functions like: abs log exp sqrt 
        //                 others:         ( ) M T t M
        // 
        // parameter:      expr:String
        //                 throwException:Bool  - allow throwing exception
        //                 decdelimiter:String  - may be empty, max 1 char 
        //                 grpdelimiter:String  - may be empty, max 1 char
        //                                        decdelimiter and grpdelimiter must be set, otherwise default is used
        // result:         value:Float
        calcExpression: function(expression, throwException, decdelimiter, grpdelimiter) {
      		return c_API.m_calcExpression(expression, throwException, decdelimiter, grpdelimiter);
        },
        
        
        
        // roundValue: round a given value according its value 
        //              up to 1'000   - rounded to 1
        //              up to 10'000  - rounded to 10
        //              up to 100'000 - rounded to 100
        //
        // parameter:      value:Float
        // result:         value:Float
        roundValue: function(value) {
      		return c_API.m_roundValue(value);
        },

        
        
                
        // --------------------------------------------------------------
        // TAX CALCULATIONS 
           
        // DEPRECATED - use loadFrom instead    
        // initFromURL: initialise the tax rules from an url
        // parameter:   string:url access (folder) to the tax rule files (format .lt4 or .json)
        // result:      bool:true if successful
        initTaxBaseFromURL: function(path) {
            return c_API.m_loadFromURL(path);
        },


        // DEPRECATED - use isValid instead    
        // isValid: returns true if rule base was loaded successfully
        // parameter:   none
        // result:      bool:true if successful
        isTaxBaseValid: function() {
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


        // searchLocationsAround: search for tax locations around a given location (max 50 km in Distance)
        // parameter:   lat:Float       latitude of position (decimal)
        //              lng:Float       longitude of position (decimal)
        //              topN:Int        return max number of hits 
        //              country:Int     preferred country code (0=all, 756=CH only, 438=LI only)
        // result:      [{ state:String, 
        //                 id:Int,
        //                 zip:Int,
        //                 city:String,
        //                 country:Int,
        //                 dist:Float }]
        searchLocationsAround: function(lat,lng,topN,langOption,countryOption) {  
            var lang    = langOption || 0;
            var country = countryOption || 0;
            var cCalc=c_API.m_searchLocationsAround(lat,lng,topN,lang,country);
            var result = [];
            if (cCalc) {
                var t=cCalc.m__liststort.p_ObjectEnumerator();
                while(t.p_HasNext()){
                    var o=t.p_NextObject();
                    result.push({state:  o.p__kt(),
                                 id:     o.p__id(), 
                                 zip:    o.p__plz(), 
                                 city:   o.p__name(),
                                 country:o.p__land(),
                                 dist:   o.m__distKM });
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
        //                 country:Int }
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
        
                
        //-----------------------------------------------------        
        // valid values for 
        //
        // sex
        //      1 male
        //      2 female
        //
        // civil status
        //      1 single (depricated, is mapped to 2)
        //      2 single alone
        //      3 single in concubinage
        //      4 married        
        //      7 registred partnership
        //
        // confession
        //      1 reformed
        //      2 roman catholic
        //      3 christian catholic
        //      4 undenominational
        //      5 other
        //
        // incometype
        //      1 brut income, employeed 
        //      2 taxable income, employeed
        // 
        //-----------------------------------------------------        

        
        // calcTaxableIncomeState:   returns the taxable income for state (kanton) based on the yearly brut income
        // calcTaxableIncomeCountry: returns the taxable income for country (bund) based on the yearly brut income
        // parameter:   locationid:Int      - id of tax location
        //              age:Int             - age of person
        //              civil:Int           - civil status
        //              confession:Int  
        //              children:Int        - number of children 
        //              grossincome:Float   - yearly gross income
        //              isemployee:Bool     - true if person is employed
        // result:      taxableincome:Float
        calcTaxableIncomeState: function(locationid, age, civil, confession, children, grossincome, isemployee) {
      		return c_API.m_calcTaxableIncome(true, locationid, age, civil, confession, children, grossincome, isemployee);
        },
        calcTaxableIncomeCountry: function(locationid, age, civil, confession, children, grossincome, isemployee) {
      		return c_API.m_calcTaxableIncome(false, 0, age, civil, confession, children, grossincome, isemployee);
        },
        
        // calcGrossIncomeState: returns the yearly gross income for state (kanton) based the taxable income
        // calcGrossIncomeCountry: returns the yearly gross income for country (bund) based the taxable income
        // parameter:   locationid:Int      - id of tax location
        //              age:Int             - age of person
        //              civil:Int           - civil status
        //              confession:Int  
        //              children:Int        - number of children 
        //              taxableincome:Float
        //              isemployee:Bool     - true if person is employed
        // result:      grossincome:Float
        calcGrossIncomeState: function(locationid, age, civil, confession, children, taxableincome, isemployee) {
      		return c_API.m_calcGrossIncome(true, locationid, age, civil, confession, children, taxableincome, isemployee);
        },
        calcGrossIncomeCountry: function(locationid, age, civil, confession, children, taxableincome, isemployee) {
      		return c_API.m_calcGrossIncome(false, 0, age, civil, confession, children, taxableincome, isemployee);
        },
        
        
        
        // calcTaxableFortune: returns the taxable fortune based on net wealth
        // parameter:   locationid:Int      - id of tax location
        //              age:Int             - age of person
        //              civil:Int           - civil status
        //              children:Int        - number of children 
        //              grossfortune:Float
        // result:      taxablefortune:Float
        calcTaxableFortune: function(locationid, age, civil, children, grossfortune) {
      		return c_API.m_calcTaxableFortune(locationid, age, civil, children, grossfortune);
        },

                
        // calcGrossFortune: returns the gross fortune based on taxable fortune
        // parameter:   locationid:Int      - id of tax location
        //              age:Int             - age of person
        //              civil:Int           - civil status
        //              children:Int        - number of children 
        //              taxablefortune:Float
        // result:      grossfortune:Float
        calcGrossFortune: function(locationid, age, civil, children, taxfortune) {
      		return c_API.m_calcGrossFortune(locationid, age, civil, children, taxfortune);
        },


        

        // calcNetIncome:   returns the net income (after deduction of social securiteis) based on the yearly brut income
        // parameter:   grossincome:Float   - yearly gross income
        //              age:Int             - age of person
        //              country:Int         - country CH or LI
        // result:      netincome:Float
        calcNetIncome: function(grossincome, age, country) {
      		return c_API.m_calcNetIncome(grossincome, age, country);
        },
        
        // calcGrossIncomeState: returns the yearly gross income based the net income
        // parameter:   netincome:Float     - yearly net income
        //              age:Int             - age of person
        //              country:Int         - country CH or LI
        // result:      grossincome:Float
        calcGrossIncomeFromNetIncome: function(grossincome, age, country) {
      		return c_API.m_calcGrossIncomeFromNetIncome(grossincome, age, country);
        },
        // calcNetIncomeFromTaxableIncome: returns the net income based on taxable income
		// TODO: This is a temporary method, please replace it with a correct version
        calcNetIncomeFromTaxableIncome: function(locationid, age, civil, confession, children, taxableincome, isemployee, country) {
            var grossIncome = this.calcGrossIncomeState(locationid, age, civil, confession, children, taxableincome, isemployee);
            return this.calcNetIncome(grossIncome, age, country);
        },
                        
        // calcIncomeTax: returns the income and fortune tax
        // parameter:   locationid:Int      - id of tax location
        //              age:Int             - age of person
        //              civil:Int           - civil status
        //              confession:Int  
        //              children:Int        - number of children 
        //              incometype:Int      - type of income 
        //              income:Float        - 
        //              fortune:Float
        //              s3asaving:Float     - payment in 3a, taxable income change (pos value)
        //              incomechange:Float  - brut income change (neg/pos value)
        //              fortunechange:Float - brut fortune change (neg/pos value)
        //
        // result:      taxincomestate      - used taxable income canton
        //              taxincomecountry    - used taxable income country
        //              taxfortune          - used taxable fortune
        //              netincome2          - netto lohn 2 (brut income minus social charges)
        //              municipality        - income tax on municipality 
        //              church              - income tax on church
        //              state               - income tax on canton
        //              country             - income tax on country
        //              fortune             - fortune tax
        //              personal            - tax on persons/head
        //              total               - sum of all taxes
        //              percentage          - tax rate in relation to the income
        //              taxfreedomday       - tax freedom day, how long to work for the tax
        //              marginaltaxrate     - 
        calcIncomeTax: function(locationid, age, civil, confession, children,
                                incometype, income, fortune,
                                s3asaving, incomechange, fortunechange) {
      		var o=c_API.m_calcIncomeTax(locationid, age, civil, confession, children, 
                                        incometype, income, fortune,
                                        s3asaving, incomechange, fortunechange);
            return { taxincomestate:   o.m__grundlage.m__stbek_kt,
                     taxincomecountry: o.m__grundlage.m__stbek_bund,
                     taxfortune:       o.m__grundlage.m__stbvm,                     
                     netincome2:       o.m__nlohn2,
                     municipality:     o.m__ekgmd,
                     church:           o.m__ekchr, 
                     state:            o.m__ekkt, 
                     country:          o.m__ekbund, 
                     fortune:          o.m__vm, 
                     personal:         o.m__ps, 
                     total:            o.m__tot, 
                     percentage:       o.m__proz,
                     taxfreedomday:    o.m__tfd,
                     marginaltaxrate:  o.m__gst};
        },

        
        // calcCapitalTax: returns the capital tax
        // parameter:   locationid:Int      - id of tax location
        //              civil:Int           - civil status
        //              confession:Int  
        //              children:Int        - number of children 
        //              sex:Int             - sex of person
        //              endage:Int          - end age of person
        //              year:Int            - year when capital get paid out
        //              capital:Float       - capital value
        //              accountno:Int       - number of accounts/payout (default 1 payment, split from 2-5 payments)
        // result:      { float:total, float:percentage }
        //                total          - capital tax (summary)
        //                percentage,    - tax rate in relation to the capital
        calcCapitalTax: function(locationid, civil, confession, children, sex, endage, year, capital, accountno) {
      		var t=c_API.m_calcCapitalTax(locationid, civil, confession, children, sex, endage, year, capital, accountno);
            return { total:       t[0],
                     percentage:  t[1] };
        },

        

        
        // --------------------------------------------------------------
        // HOUSE AFFORDABILITY
        
        // DEPRECATED ------------------
                calcGrossHouseCosts: function(income, housevalue, owncapital, interestrate, othercostrate) {
              		var r=c_API.m_calcSimpleHouseCosts("", true,
                                                       housevalue, housevalue,
                                                       owncapital, owncapital,
                                                       0, 0,
                                                       income, 0, 0,
                                                       interestrate, interestrate, false);
                    return { costmortgage:      r.m__j_zinsen_h1 + r.m__j_zinsen_h2,  
                             costamortisation:  r.m__j_amortisation, 
                             costothers:        r.m__j_nebenkosten, 
                             maintenance_rate:  r.m__nebenkostensatz,
                             costrate:          r.m__j_belastung_proz };
                },        
               
                calcMaxHousevalueByIncome: function(income, maxaffordabilityrate, interestrate, othercostrate) {
      		        var v=c_API.m_calcMatchingHousevalueByIncome("", maxaffordabilityrate,
                                                                 income, 0, 0, 0, 0, interestrate, interestrate);
                    return v[0];
                },
                
                calcMaxHousevalueByRentalCost: function(rental, interestrate, othercostrate) {
              		var v=c_API.m_calcMatchingHousevalueByRentalCost("", rental,
                                                                     0, 0, 0, 0, interestrate, interestrate);
                    return v[0];
                },
                
                calcExtraCapitalToReachAffordability: function(income, housevalue, owncapital, interestrate, othercostrate, maxAffordabilityRate) {
              		var r=c_API.m_calcMissingCapitalForAffordability("", maxAffordabilityRate,
                                                                     housevalue, housevalue,
                                                                     owncapital, owncapital,
                                                                     0, 0, 
                                                                     income, 0, 0, 
                                                                     interestrate, interestrate, false);                
              		return r;
                },
        // DEPRECATED ------------------
        
        
        
        

        // calcHouseCosts: returns the costs and rate with a current interest rate without considering taxes
        // parameter:   customization:String
        //              data 
        //              {
        //                  totalcosts                  float: total cost to buy a house
        //                  housecosts                  float: house value
        //                  owncapital                  float: own capital to buy the house
        //                  owncapital_hard             float:     ... part of the owncapital which is "hard"
        //                  additional_assets           float: additional security/assets 
        //                  additional_assets_from_p2   float:     ... from second pillar
        //                  income                      float: total income
        //                  additional_costs            float: additional yearly costs to consider as housing costs
        //                  additional_earnings         float: additional yearly earnings to consider 
        //                  interestrate_m1             float: interest rate for mortgage 1 (f.e. 5.0)
        //                  interestrate_m2             float: interest rate for mortgage 2 (f.e. 5.5)
        //              }
        //              roundresult:Bool                bool:  round result values relative to its amount
        //              asForPension:Bool               bool:  calculates affordability for pension case
        //                                                     implies mortgage2 will be fully amortised
        //
        // result:      {
        //                  missing_capital             float: missing own capital
        //
        //                  owncapital_rate             float: own capital rate
        //                  owncapital_rate_wo_p2       float: own capital rate without second pillar security
        //
        //                  maintenance_rate            float: maintenance/other costs quote
        //
        //                  lendable_additional_costs   float: considered/lendable additional_costs
        //                  max_net_lending             float: allowed max. nettobelehnung
        //                  net_lending                 float: nettobelehnung
        //                  over_lending                float: ueberbelehnung
        //                  over_lending_wo_p2          float: ueberbelehnung without second pillar security
        //                  lending_rate                float: nettobelehnungs-quote
        //
        //                  has_mortgage_2              bool:  has mortgage of typ 2
        //                                       
        //                  mortgage_total              float: total mortgage for this house  
        //                  mortgage_1                  float: mortgage typ 1
        //                  mortgage_2                  float: mortgage typ 2
        //                  mortgage_rate               float: dept/mortgage quote
        //                  
        //                  total_amortization          float: total amount to amortize
        //                  
        //                  y_interest_m1               float: yearly interest for mortgage typ 1
        //                  y_interest_m2               float: yearly interest for mortgage typ 2
        //                  y_amortization              float: yearly amortization cost
        //                  y_maintenance_costs         float: yearly house maintenance costs
        //                  y_additional_costs          float: additional costs
        //                  y_additional_earnings       float: additional earnings
        //                  y_total_housingcosts        float: total yearly housing costs
        //                  m_total_housingcosts        float: total monthly housing costs
        //                  y_housingcosts_rate         float: housing costs rate related to the income
        //               }
        //
        calcHouseCosts: function(customizing, data, roundres, asForPensionOption) {
            var totalcosts      = data.totalcosts || 0;
            var housecosts      = data.housecosts || 0;
            var owncapital      = data.owncapital || 0;
            var owncapital_hard = data.owncapital_hard || owncapital;
            var addassets       = data.additional_assets || 0;
            var addassets_s2    = data.additional_assets_from_p2 || 0;
            var income          = data.income || 0;
            var morecosts       = data.additional_costs || 0;
            var moreearn        = data.additional_earnings || 0;
            var interest1       = data.interestrate_m1 || 0;
            var interest2       = data.interestrate_m2 || 0;
            var asForPens       = asForPensionOption || false;
            
      		var r=c_API.m_calcSimpleHouseCosts(customizing, roundres,
                                               totalcosts, housecosts,
                                               owncapital, owncapital_hard,
                                               addassets, addassets_s2,
                                               income, morecosts, moreearn,
                                               interest1, interest2,
                                               asForPens);
                                         
            return { 
                     missing_capital:       r.m__fehl_eigenmittel,
                     
                     owncapital_rate:       r.m__eigenmittel_quote,
                     owncapital_rate_wo_p2: r.m__eigenmittel_ohne_s2_quote,
                     
                     maintenance_rate:      r.m__nebenkostensatz,
                     
                     lendable_additional_costs: r.m__zusatzsicherheiten_belehnbar,
                     max_net_lending:       r.m__max_nettobelehnung,
                     net_lending:           r.m__nettobelehnung,
                     over_lending:          r.m__ueberbelehnung,
                     over_lending_wo_p2:    r.m__ueberbelehnung_ohne_s2,
                     lending_rate:          r.m__nettobelehnungs_quote,

                     has_mortgage_2:        r.m__hat_hypo2,

                     mortgage_total:        r.m__belehnung,
                     mortgage_1:            r.m__belehnung_h1,
                     mortgage_2:            r.m__belehnung_h2,
                     mortgage_rate:         r.m__verschuldungs_quote,

                     total_amortization:    r.m__amortisation_total,

                     y_interest_m1:         r.m__j_zinsen_h1,
                     y_interest_m2:         r.m__j_zinsen_h2,
                     y_amortization:        r.m__j_amortisation,
                     y_maintenance_costs:   r.m__j_nebenkosten,
                     y_additional_costs:    r.m__j_weiterekosten,
                     y_additional_earnings: r.m__j_weitereertraege,
                     y_total_housingcosts:  r.m__j_wohnkosten,
                     m_total_housingcosts:  r.m__m_wohnkosten,
                     y_housingcosts_rate:   r.m__j_belastung_proz
                   };
        },
        
        // calcMatchingHousevalueByIncome: returns the maximum object value based on an income
        // parameter:   customization:String
        //              data 
        //              {
        //                  additional_assets           float: additional security/assets 
        //                  additional_assets_from_p2   float:     ... from second pillar
        //                  additional_costs            float: additional yearly costs to consider as housing costs
        //                  additional_earnings         float: additional yearly earnings to consider 
        //                  interestrate_m1             float: interest rate for mortgage 1 (f.e. 5.0)
        //                  interestrate_m2             float: interest rate for mortgage 2 (f.e. 5.5)
        //              }
        //              max_cost_rate                   float: max cost rate (affordability), f.e. 33.0
        //
        // result:      {
        //                  max_housevalue              float: maximal housevalue for given data
        //                  required_owncapital         float: required own caital based on housevalue 
        //               }
        //
        calcMatchingHousevalueByIncome: function(customizing, data, income, max_cost_rate) {
            var addassets  = data.additional_assets || 0;
            var addassets2 = data.additional_assets_from_p2 || 0;
            var morecosts  = data.additional_costs || 0;
            var moreearn   = data.additional_earnings || 0;
            var interest1  = data.interestrate_m1 || 0;
            var interest2  = data.interestrate_m2 || 0;
            
      		var v=c_API.m_calcMatchingHousevalueByIncome(customizing, max_cost_rate, income,
                                                         addassets, addassets2,
                                                         morecosts, moreearn,
                                                         interest1, interest2);
                                                         
            return { 
                     max_housevalue:       v[0],
                     required_owncapital:  v[1]
                   };
        },        
        
        // calcMatchingHousevalueByRentalCost: returns the maximum object value based on an income
        // parameter:   customization:String
        //              data 
        //              {
        //                  additional_assets           float: additional security/assets 
        //                  additional_assets_from_p2   float:     ... from second pillar
        //                  additional_costs            float: additional yearly costs to consider as housing costs
        //                  additional_earnings         float: additional yearly earnings to consider 
        //                  interestrate_m1             float: interest rate for mortgage 1 (f.e. 5.0)
        //                  interestrate_m2             float: interest rate for mortgage 2 (f.e. 5.5)
        //              }
        //              rentalcost                      float: yearly rental cost
        //
        // result:      {
        //                  max_housevalue              float: maximal housevalue for given data
        //                  required_owncapital         float: required own caital based on housevalue 
        //               }
        //
        calcMatchingHousevalueByRentalCost: function(customizing, data, rentalcost) {
            var addassets  = data.additional_assets || 0;
            var addassets2 = data.additional_assets_from_p2 || 0;
            var morecosts  = data.additional_costs || 0;
            var moreearn   = data.additional_earnings || 0;
            var interest1  = data.interestrate_m1 || 0;
            var interest2  = data.interestrate_m2 || 0;
            
      		var v=c_API.m_calcMatchingHousevalueByRentalCost(customizing, rentalcost,
                                                             addassets, addassets2,
                                                             morecosts, moreearn,
                                                             interest1, interest2);
                                                         
            return { 
                     max_housevalue:       v[0],
                     required_owncapital:  v[1]
                   };
        },          
        
        // calcMissingCapitalForAffordability: returns the missing/additional capital to consider affordability
        // parameter:   customization:String
        //              data 
        //              {
        //                  totalcosts                  float: total cost to buy a house
        //                  housecosts                  float: house value
        //                  owncapital                  float: own capital to buy the house
        //                  owncapital_hard             float:     ... part of the owncapital which is "hard"
        //                  additional_assets           float: additional security/assets 
        //                  additional_assets_from_p2   float:     ... from second pillar
        //                  income                      float: total income
        //                  additional_costs            float: additional yearly costs to consider as housing costs
        //                  additional_earnings         float: additional yearly earnings to consider 
        //                  interestrate_m1             float: interest rate for mortgage 1 (f.e. 5.0)
        //                  interestrate_m2             float: interest rate for mortgage 2 (f.e. 5.5)
        //              }
        //              costrate                        float: max cost rate / affordability to consider
        //              asForPension:Bool               bool:  calculates affordability for pension case
        //                                                     implies mortgage2 will be fully amortised
        //
        // result:      missing capial                  float
        //
        calcMissingCapitalForAffordability: function(customizing, data, costrate, asForPensionOption) {
            var totalcosts      = data.totalcosts || 0;
            var housecosts      = data.housecosts || 0;
            var owncapital      = data.owncapital || 0;
            var owncapital_hard = data.owncapital_hard || owncapital;
            var addassets       = data.additional_assets || 0;
            var addassets_s2    = data.additional_assets_from_p2 || 0;
            var income          = data.income || 0;
            var morecosts       = data.additional_costs || 0;
            var moreearn        = data.additional_earnings || 0;
            var interest1       = data.interestrate_m1 || 0;
            var interest2       = data.interestrate_m2 || 0;
            var asForPens       = asForPensionOption || false;
            
      		var r=c_API.m_calcMissingCapitalForAffordability(customizing, costrate,
                                                             totalcosts, housecosts,
                                                             owncapital, owncapital_hard,
                                                             addassets, addassets_s2,
                                                             income, morecosts, moreearn,
                                                             interest1, interest2,
                                                             asForPens);
            return r;
        },


        

        //-----------------------------------------------------        
        // valid values for 
        //
        // rant
        //      1 mortgage #1
        //      2 mortgage #2
        //
        // typ 
        //      1 variable
        //      2 fix
        //      3 libor
        //
        // specialconditions-status
        //      0 undef
        //      1 potential conditions, not used for calculation
        //      2 assigned condition without haveing overwritten the values 
        //      3 manual/assigned and overwritten condition
        //
        //-----------------------------------------------------        

        
        // updateAllMortgagesAndConditions
        // parameter:   customization:String
        //              data 
        //              {
        //                  children:                   int: amount of children 
        //        
        //                  mortgages:                  array of mortgage
        //                  [{
        //                      id                          string: mortgage identifier
        //                      description                 string: mortgage desc
        //                      rang                        int
        //                      typ                         int
        //                      duration                    int:    duration in case of type 2 (fix)
        //                      interestrate                float:  mortgage interest rate
        //                      amount                      float:  mortgage amount
        //                      specialconditions:          array of assigned special condition
        //                      [{
        //                          id                          string: condition identifier
        //                          status                      int: 
        //                          amount                      float: max. amount for this condition (read only, ignored, will be updated in result)
        //                          interestrate                float: reduced interest for this condition (read only, ignored, will be updated in result)
        //                          amount_manual               float: used amount in case of status=3 (manual)
        //                      }]
        //                  }]
        //              }
        //
        // result:      array of all mortgages
        //              [{
        //                  id                          string: mortgage identifier
        //                  description                 string: mortgage desc
        //                  rang                        int
        //                  typ                         int
        //                  duration                    int:    duration in case of type 2 (fix)
        //                  amount                      float:  mortgage amount
        //                  interestrate                float:  given interest for calculation
        //                  eff_interestrate            float:  eff. interest rate in 1. year
        //
        //                  specialconditions:          array of assigned special condition (with range check and potential conditions)
        //                  [{
        //                      id                          string: condition identifier
        //                      status                      int: 
        //                      amount                      float: max. amount for this condition (read only)
        //                      interestrate                float: reduced interest for this condition (read only)
        //                      duration                    int: duration of this condition (read only)
        //                      ratereduction               float: reduction of interest rate (read only)
        //                      amount_manual               float: used amount in case of status=3 (manual)
        //                  }]        
        //              }]
        //
        //
        // updateMortgageAndCondition
        // paramter:    custom
        // parameter:   customization:String
        //              data (same as updateAllMortgagesAndSpecialConditions)
        //              mortgageid
        // result:      single mortgage instance (instead of an array of all mortgages)
        //
        //
        // updateAllMortgagesWithAutoConditions - rebuild a full list of new assigned conditions to the mortgages
        // parameter:   customization:String
        //              data {
        //                  ... same as updateAllMortgagesAndConditions
        //
        //                  allowed_conditions              string: csl of special-cond-id, f.e. "WELLCOME,FAMILY"
        //              }
        //
        updateAllMortgagesAndConditions: function(customizing, data) {
            var children   = data.children || 0;

            var mortgage   = data.mortgages || {};
            var mortgageJSON = JSON.stringify( { mortgages: mortgage });
            
      		var r=c_API.m_updateAllMortgagesAndConditions(customizing, 
                                                          children,
                                                          mortgageJSON);

            var allmortgages = [];
            for(var i=0;i<r.m__hypos.p_length();i=i+1){
               var mrtg=r.m__hypos.p_get(i);
               allmortgages.push(ch.logismata.online.calc.prepareMortgageToReturn(mrtg, false));
            }
            return allmortgages;
        },
        
        updateMortgageAndCondition: function(customizing, data, mortgageid) {
            var children   = data.children || 0;
            
            var mortgage   = data.mortgages || {};
            var mortgageJSON = JSON.stringify( { mortgages: mortgage });
            
      		var r=c_API.m_updateAllMortgagesAndConditions(customizing, 
                                                          children,
                                                          mortgageJSON);

        	for(var i=0;i<r.m__hypos.p_length();i=i+1){
        		var mrtg=r.m__hypos.p_get(i);
                if (mrtg.m__id === mortgageid) {
                    return ch.logismata.online.calc.prepareMortgageToReturn(mrtg, false);
                }
            }
            return {};
        },        
                
        updateAllMortgagesWithAutoConditions: function(customizing, data) {
            var children   = data.children || 0;
            var conditions = data.allowed_conditions || '';
                        
            var mortgage   = data.mortgages || {};
            var mortgageJSON = JSON.stringify( { mortgages: mortgage });
            
      		var r=c_API.m_updateAllMortgagesWithAutoConditions(customizing, 
                                                               children,
                                                               mortgageJSON,
                                                               conditions);

            var allmortgages = [];
            for(var i=0;i<r.m__hypos.p_length();i=i+1){
               var mrtg=r.m__hypos.p_get(i);
               allmortgages.push(ch.logismata.online.calc.prepareMortgageToReturn(mrtg, false));
            }
            return allmortgages;
        },

        
        
        // for internal use only
        prepareMortgageToReturn: function(mrtg, witheffcosts) {
            var m = {};
            m.id               = mrtg.m__id;
            m.description      = mrtg.m__desc;
            m.rang             = mrtg.m__rang;
            m.typ              = mrtg.m__typ;
            m.duration         = mrtg.m__laufzeit;
            m.amount           = mrtg.m__betrag;
            m.interestrate     = mrtg.m__basiszinssatz;
            m.eff_interestrate = mrtg.m__jahr1_effzinssatz;
            if ( witheffcosts === true ) {
                m.eff_interest     = mrtg.m__jahr1_zinsaufwand;
            }

            m.specialconditions = [];
        	for(var j=0;j<mrtg.m__zgsokos.p_length();j=j+1){
        		var z=mrtg.m__zgsokos.p_getObject(j);
                var s = {};
                s.id            = z.m__soko_id;
                s.status        = z.m__status;
                s.amount        = z.m__betrag;
                s.interestrate  = z.m__zinssatz;
                s.duration      = z.m__soko_dauer;
                s.ratereduction = z.m__soko_reduktion;
                s.amount_manual = z.m__betrag_manuell;
                m.specialconditions.push(s);
            }
            
            return m;       
        },

                
        // calcEffectiveHouseCosts: returns the costs and rate with a current interest rate without considering taxes
        // parameter:   customization:String
        //              data 
        //              {
        //                  children:                   int:   amount of children 
        //        
        //                  totalcosts                  float: total cost to buy a house
        //                  housecosts                  float: house value
        //                  owncapital                  float: own capital to buy the house
        //                  owncapital_hard             float:     ... part of the owncapital which is "hard"
        //                  additional_assets           float: additional security/assets 
        //                  additional_assets_from_p2   float:     ... from second pillar
        //                  income                      float: total income
        //                  additional_costs            float: additional yearly costs to consider as housing costs
        //                  additional_earnings         float: additional yearly earnings to consider 
        //
        //                  has_amortization_changed    bool:  is amortization overwritten
        //                  amortization_manual         float: changed amortization 
        //
        //                  mortgages:                  array of mortgage
        //                  [{
        //                      id                          string: mortgage identifier
        //                      description                 string: mortgage desc
        //                      rang                        int
        //                      typ                         int
        //                      duration                    int:    duration in case of type 2 (fix)
        //                      interestrate                float:  mortgage interest rate
        //                      amount                      float:  mortgage amount
        //                      specialconditions:          array of assigned special condition
        //                      [{
        //                          id                          string: condition identifier
        //                          status                      int: 
        //                          amount                      float: max. amount for this condition (read only, ignored, will be updated in result)
        //                          interestrate                float: reduced interest for this condition (read only, ignored, will be updated in result)
        //                          amount_manual               float: used amount in case of status=3 (manual)
        //                      }]
        //                  }]
        //              }
        //              roundresult:Bool                bool:  round cost values relative to its amount
        //
        // result:      {
        //                  missing_capital             float: missing own capital
        //
        //                  owncapital_rate             float: own capital rate
        //                  owncapital_rate_wo_p2       float: own capital rate without second pillar security
        //
        //                  maintenance_rate            float: maintenance/other costs quote
        //
        //                  lendable_additional_costs   float: considered/lendable additional_costs
        //                  max_net_lending             float: allowed max. nettobelehnung
        //                  net_lending                 float: nettobelehnung
        //                  over_lending                float: ueberbelehnung
        //                  over_lending_wo_p2          float: ueberbelehnung without second pillar security
        //                  lending_rate                float: nettobelehnungs-quote
        //                  
        //                  has_mortgage_2              bool:  has mortgage of typ 2
        //                                       
        //                  mortgage_total              float: total mortgage for this house  
        //                  mortgage_1                  float: mortgage typ 1
        //                  mortgage_2                  float: mortgage typ 2
        //                  mortgage_rate               float: dept/mortgage quote
        //
        //                  total_amortization          float: total amount to amortize
        //
        //                  y_interest_m1               float: yearly interest for mortgage typ 1
        //                  y_interest_m2               float: yearly interest for mortgage typ 2
        //                  y_amortization              float: yearly amortization cost
        //                  y_maintenance_costs         float: yearly house maintenance costs
        //                  y_additional_costs          float: additional costs
        //                  y_additional_earnings       float: additional earnings
        //                  y_total_housingcosts        float: total yearly housing costs
        //                  m_total_housingcosts        float: total monthly housing costs
        //                  y_housingcosts_rate         float: housing costs rate related to the income
        //                                       
        //                  avg_interestrate_m1         float: average interest in first year of mortgage typ 1
        //                  avg_interestrate_m2         float: average interest in first year of mortgage typ 2
        //                  avg_interestrate            float: average interest in first year
        //
        //                  mortgages:                  array of all mortgages
        //                  [{
        //                      id                          string: mortgage identifier
        //                      description                 string: mortgage desc
        //                      rang                        int
        //                      typ                         int
        //                      duration                    int:    duration in case of type 2 (fix)
        //                      amount                      float:  mortgage amount
        //                      interestrate                float:  given interest for calculation
        //
        //                      eff_interest                float:  eff. interest costs in 1. year
        //                      eff_interestrate            float:  eff. interest rate in 1. year
        //
        //                      specialconditions:          array of assigned special condition (with range check and potential conditions)
        //                      [{
        //                          id                          string: condition identifier
        //                          status                      int: 
        //                          amount                      float: max. amount for this condition (read only)
        //                          interestrate                float: reduced interest for this condition (read only)
        //                          duration                    int: duration of this condition (read only)
        //                          ratereduction               float: reduction of interest rate (read only)
        //                          amount_manual               float: used amount in case of status=3 (manual)
        //                      }]        
        //                  }]
        //               }
        //
        calcEffectiveHouseCosts: function(customizing, data, roundres) {
            var children        = data.children || 0;
            var totalcosts      = data.totalcosts || 0;
            var housecosts      = data.housecosts || 0;
            var owncapital      = data.owncapital || 0;
            var owncapital_hard = data.owncapital_hard || owncapital;
            var addassets       = data.additional_assets || 0;
            var addassets_s2    = data.additional_assets_from_p2 || 0;
            var income          = data.income || 0;
            var morecosts       = data.additional_costs || 0;
            var moreearn        = data.additional_earnings || 0;           
            var amoisman        = data.has_amortization_changed || false;
            var amoamount       = data.amortization_manual || 0;

            var mortgage   = data.mortgages || {};
            var mortgageJSON = JSON.stringify( { mortgages: mortgage });
            
      		var r=c_API.m_calcEffectiveHouseCosts(customizing, roundres,
                                                  children,
                                                  totalcosts, housecosts,
                                                  owncapital, owncapital_hard,
                                                  addassets, addassets_s2,
                                                  income, morecosts, moreearn,
                                                  amoisman, amoamount,
                                                  mortgageJSON);
                     
            var allmortgages = [];
            for(var i=0;i<r.m__hypos.p_length();i=i+1){
               var mrtg=r.m__hypos.p_get(i);
               allmortgages.push(ch.logismata.online.calc.prepareMortgageToReturn(mrtg, true));
            }
           
            return { 
                     missing_capital:       r.m__fehl_eigenmittel,

                     owncapital_rate:       r.m__eigenmittel_quote,
                     owncapital_rate_wo_p2: r.m__eigenmittel_ohne_s2_quote,
                     
                     maintenance_rate:      r.m__nebenkostensatz,
                     
                     lendable_additional_costs: r.m__zusatzsicherheiten_belehnbar,
                     max_net_lending:       r.m__max_nettobelehnung,
                     net_lending:           r.m__nettobelehnung,
                     over_lending:          r.m__ueberbelehnung,
                     over_lending_wo_p2:    r.m__ueberbelehnung_ohne_s2,
                     lending_rate:          r.m__nettobelehnungs_quote,

                     has_mortgage_2:        r.m__hat_hypo2,
                                          
                     mortgage_total:        r.m__belehnung,
                     mortgage_1:            r.m__belehnung_h1,
                     mortgage_2:            r.m__belehnung_h2,
                     mortgage_rate:         r.m__verschuldungs_quote,

                     total_amortization:    r.m__amortisation_total,

                     y_interest_m1:         r.m__j_zinsen_h1,
                     y_interest_m2:         r.m__j_zinsen_h2,
                     y_amortization:        r.m__j_amortisation,
                     y_maintenance_costs:   r.m__j_nebenkosten,
                     y_additional_costs:    r.m__j_weiterekosten,
                     y_additional_earnings: r.m__j_weitereertraege,
                     y_total_housingcosts:  r.m__j_wohnkosten,
                     m_total_housingcosts:  r.m__m_wohnkosten,
                     y_housingcosts_rate:   r.m__j_belastung_proz,
                     
                     avg_interestrate_m1:   r.m__avg_zinssatz_h1,
                     avg_interestrate_m2:   r.m__avg_zinssatz_h2,
                     avg_interestrate:      r.m__avg_zinssatz,
                     
                     mortgages:             allmortgages
                   };
        },
        

        // calcDirectAmortization: returns the costs and rate with a current interest rate without considering taxes
        // parameter:   customization:String
        //              taxbase {
        //                  locationid                  int: id of tax location
        //                  currentyear                 int/optional: 
        //                  civil                       int: civil status
        //                  confession                  int:
        //                  confession2                 int/optional: confession person 2
        //                  part_confession2            int/optional: portion confession person 2 (0-100)
        //                  children                    int: number of children 
        //                  age                         int: age of person (used for gross income typ)
        //                  sex                         int/optional: 
        //                  income_type                 int: type of income (gross/taxable)                 
        //
        //                                          required for gross income type
        //                  gross_income                float: gross income
        //                  gross_fortune               float: gross fortune
        //
        //                                          required for taxable income type
        //                  taxable_income              float: taxable income canton
        //                  rateable_income             float/optional: taxrateable income (satzbestimmend) canton
        //                  taxable_income_country      float/optional: taxable income country/bund
        //                  rateable_income_country     float/optional: taxrateable income (satzbestimmend) country/bund
        //                  taxable_fortune             float: taxable fortune 
        //                  rateable_fortune            float/optional: taxrateable fortune (satzbestimmend) 
        //              }
        //              data 
        //              {
        //                  amortization_goal           float: amortization goal 
        //                  duration                    int: years of amortizations
        //
        //                  has_detailed_amortization   boolean: true if manually defined amo prio and amount (in popup)
        //
        //                  rental_value                float: taxable rental value (eigenmietwert)
        //                  maintenance_costs           float: deductible maintenance costs (unterh
        //
        //                  new_mortgages               boolean: 
        //
        //                  mortgages:                  array of mortgage
        //                  [{
        //                      id                          string: mortgage identifier
        //                      description                 string: mortgage desc
        //                      rang                        int
        //                      typ                         int
        //                      duration                    int:    duration in case of type 2 (fix)
        //                      interestrate                float:  effective mortgage interest rate (including any conditions)
        //                      amount                      float:  mortgage amount
        //
        //                      amortization_prio           int:    
        //                      amortization_amount         float:
        //
        //                      specialconditions           {}
        //                  }]
        //              }
        //
        // result:      {
        //                  has_mortgage_2              bool:  has mortgage of typ 2
        //
        //                  y_interest_m1               float: yearly interest for mortgage typ 1
        //                  y_interest_m2               float: yearly interest for mortgage typ 2
        //                  y_amortization              float: yearly amortization cost
        //                                        
        //                  avg_interestrate_m1         float: average interest in first year of mortgage typ 1
        //                  avg_interestrate_m2         float: average interest in first year of mortgage typ 2
        //                  
        //                  total_interests             float: total interests over full period
        //                  total_amortization          float: total amortizations over full period
        //                  total_tax_effect            float: total tax effect (deductible interest)
        //                  total_costs                 float: total gross costs
        //                  total_net_costs             float: total net costs (incl tax effect)
        //               }        
        calcDirectAmortization: function(customizing, taxbase, data) {
            var taxbaseJSON = JSON.stringify( { taxbase: (taxbase || {}) });

            var amogoal    = data.amortization_goal || 0;
            var duration   = data.duration || 0;
            var amoisdet   = data.has_detailed_amortization || false;
            var rentalval  = data.rental_value || 0;
            var maintcosts = data.maintenance_costs || 0;
            var isnewmortg = data.new_mortgages || false;
            
            var mortgage   = data.mortgages || {};
            var mortgageJSON = JSON.stringify( { mortgages: mortgage });
            
      		var r=c_API.m_calcDirectAmortization(customizing,
                                                 taxbaseJSON,
                                                 amogoal, duration,
                                                 amoisdet, 
                                                 rentalval, maintcosts,
                                                 isnewmortg, mortgageJSON);           
            
            var result = {};
            
            result.has_mortgage_2      = r.m__hat_hypo2;
            result.y_interest_m1       = r.m__j_zinsen_h1;
            result.y_interest_m2       = r.m__j_zinsen_h2;
            result.y_amortization      = r.m__j_amortisation;
            result.avg_interestrate_m1 = r.m__avg_zinssatz_h1;
            result.avg_interestrate_m2 = r.m__avg_zinssatz_h2;
            result.total_interests     = r.m__zinsen_total;
            result.total_amortization  = r.m__amortisation_total;
            result.total_tax_effect    = r.m__steuereffekt_total;            
            result.total_costs         = r.m__zinsen_total + r.m__amortisation_total;
            result.total_net_costs     = r.m__zinsen_total + r.m__amortisation_total - r.m__steuereffekt_total;
            
            return result;
        },


        // calcIndirectAmortization: returns the costs and rate with a current interest rate without considering taxes
        // parameter:   customization:String
        //              taxbase { ... }                 same as in calcDirectAmortization
        //              data 
        //              {
        //                  amortization_goal           float: amortization goal 
        //                  duration                    int: years of amortizations
        //
        //                  saving_type                 int:  1 = saving 3a
        //                                                    2 = saving 3b/anlagen
        //
        //                  saving_interestrate         float:
        //                  saving_amount_manual        boolean: manually defined saving amount
        //                  saving_amount               float: yearly saving amount
        //
        //                  rental_value                float: taxable rental value (eigenmietwert)
        //                  maintenance_costs           float: deductible maintenance costs (unterh
        //
        //                  new_mortgages               boolean: 
        //
        //                  mortgages:                  array of mortgage
        //                  [{
        //              }
        //
        // result:      {
        //                  required_saving_amount      float: requierd saving amount to reach mortg goal (=gross_capital)
        //
        //                  end_capital                 float: saved gross capital after period
        //                  
        //                  gross_capital               float: used/needed gross capital after period for amortization
        //                  capital_tax                 float: capital tax (3a)
        //                  net_capital                 float: net capital
        //                  missing_capital             float: missing capital to reach mortg goal
        //                  overlap_capital             float: overlapping capital to cover mortg goal 
        //
        //                  total_interests             float: total interests over full period
        //                  total_savings               float: total amount of savings
        //                  total_tax_effect            float: total tax effect (deductible interest)
        //                  total_costs                 float: total gross costs
        //                  total_net_costs             float: total net costs (incl tax effect)
        //               }    
        calcIndirectAmortization: function(customizing, taxbase, data) {
            var taxbaseJSON = JSON.stringify( { taxbase: (taxbase || {}) });

            var amogoal    = data.amortization_goal || 0;
            var duration   = data.duration || 0;
            var savingtyp  = data.saving_type || 0;
            var savingrate = data.saving_interestrate || 0;
            var savingman  = data.saving_amount_manual || false;
            var saveingval = data.saving_amount || 0;
            var rentalval  = data.rental_value || 0;
            var maintcosts = data.maintenance_costs || 0;
            var isnewmortg = data.new_mortgages || false;
            var mortgage   = data.mortgages || {};
            var mortgageJSON = JSON.stringify( { mortgages: mortgage });
            
      		var r=c_API.m_calcIndirectAmortization(customizing,
                                                   taxbaseJSON,
                                                   amogoal, duration,
                                                   savingtyp, savingrate, savingman, saveingval,
                                                   rentalval, maintcosts,
                                                   isnewmortg, mortgageJSON);
        
            var result = {};

            result.required_saving_amount = r.m__mindsparuqote;
            result.end_capital      = r.m__endkap;
            result.gross_capital    = r.m__bruttokap;
            result.capital_tax      = r.m__kapsteuer;
            result.net_capital      = r.m__nettokap;
            result.missing_capital  = r.m__fehlendeskap;
            result.overlap_capital  = r.m__ueberdeckung;
            result.total_interests  = r.m__zinsen_total;
            result.total_savings    = r.m__einlagen_total;
            result.total_tax_effect = r.m__steuereffekt_total;
            result.total_costs      = r.p_getBruttoKosten();
            result.total_net_costs  = r.p_getNettoKosten();
           
            return result;
        },


        // calcMatchingHousevalueByTotalMortgagesAmount: returns the costs and rate with a current interest rate 
        // parameter:   customization:String
        //              data 
        //              {
        //                  mortgage_total              float: total of mortgages
        //                  interestrate_m1             float: interest rate for mortgage 1 (f.e. 5.0)
        //                  interestrate_m2             float: interest rate for mortgage 2 (f.e. 5.5)
        //              }
        //
        // result:      {
        //                  housevalue                  float: house value for this model
        //                  mortgage_1                  float: mortgage typ 1
        //                  mortgage_2                  float: mortgage typ 2
        //                  total_amortization          float: total amount to amortize (=mortgage goal)
        //              }            
        calcMatchingHousevalueByTotalMortgagesAmount: function(customizing, data) {
            var mortgage_total  = data.mortgage_total || 0;
            var interest1       = data.interestrate_m1 || 0;
            var interest2       = data.interestrate_m2 || 0;                                        
      		var r = c_API.m_calcMatchingHousevalueByTotalMortgagesAmount(customizing, mortgage_total, interest1, interest2 );
            return { 
               housevalue: r.m__objektwert,
               mortgage_1: r.m__belehnung_h1,
               mortgage_2: r.m__belehnung_h2,
               total_amortization: r.m__amortisation_total
            };
        },
        
         
        //-------------------------------------------------
        // SAVING CALCULATION

        
        // DEPRECATED - use calcSaving instead    
        calcSimpleSaving: function(invest, periodical, monthlybase, duration, yieldrate) {
      		var o=c_API.m_calcSimpleSaving(invest, periodical, monthlybase, duration, yieldrate);
            var v = [];
        	for(var i=0;i<o.m__stand.p_length();i=i+1){
        		var s=o.m__stand.p_getObject(i);
                v.push({year:      s.m__jahr, 
                        invest:    s.m__einlagen, 
                        interest:  s.m__zinsen, 
                        capital:   s.m__kapital } );
            }
            return { capital:   o.m__kapital,
                     invest:    o.m__einlagen,
                     interest:  o.m__zinsen,
                     data:      v };
        },
        
        
        // DEPRECATED - use calcSaving instead    
        calcSimpleSavingInvest: function(invest, monthlybase, duration, yieldrate, endvalue) {       
      		var o=c_API.m_calcSimpleSavingInvest(invest, monthlybase, duration, yieldrate, endvalue);
            var v = [];
        	for(var i=0;i<o.m__stand.p_length();i=i+1){
        		var s=o.m__stand.p_getObject(i);
                v.push({year:      s.m__jahr, 
                        invest:    s.m__einlagen, 
                        interest:  s.m__zinsen, 
                        capital:   s.m__kapital } );
            }
            return { capital:   o.m__kapital,
                     invest:    o.m__einlagen,
                     interest:  o.m__zinsen,
                     periodical:o.m__einlage,
                     data:      v };
        },

        
        // DEPRECATED - use calcSaving instead    
        calcSimpleSavingDuration: function(invest, periodical, monthlybase, yieldrate, endvalue) {   
      		var o=c_API.m_calcSimpleSavingDuration(invest, periodical, monthlybase, yieldrate, endvalue);
            var v = [];
        	for(var i=0;i<o.m__stand.p_length();i=i+1){
        		var s=o.m__stand.p_getObject(i);
                v.push({year:      s.m__jahr, 
                        invest:    s.m__einlagen, 
                        interest:  s.m__zinsen, 
                        capital:   s.m__kapital } );
            }
            return { capital:   o.m__kapital,
                     invest:    o.m__einlagen,
                     interest:  o.m__zinsen,
                     duration:  o.m__stand.p_length(),
                     years:     o.m__dauer_j,
                     months:    o.m__dauer_m,
                     data:      v };
        },
        

        //-----------------------------------------------------        
        // valid values for calcSaving
        //
        // savingType
        //      1  calculate end value
        //      2  calculate periodical investment
        //      3  calculate duration (expand last year)
        //      4  calculate duration (exact last year)
        //
        // parameter:   customization:String
        //              savingType                      int: type of saving
        //              data: { 
        //                  invest                      float: first investment in first year
        //                  periodical                  float: periodically payment (in advance)
        //                  monthlybase                 bool:  monthly base payment
        //                  duration                    int:   numbers of year to pay / duration in years
        //
        //                  interest                    float: interest rate
        //                  neg_interest                float: interest rate for neg. capital (=interest if not existing)
        //                      -- or -- 
        //                  interestranges: [{          array of interest ranges 
        //                          id                      string: identifier
        //                          interest                float:  interest rate
        //                          from                    float:  lower bound
        //                          to                      float:  upper bound (infinit if not existing)
        //                          neg                     bool:   neg. capital
        //
        //                          inflow_threshold        float:  minimal (yearly) inflow threshold for this interest
        //
        //                          specialconditions: {    all required values, attribute-name/boolean pair
        //                              ...
        //                          }
        //                  }]
        //
        //                  inflationrate               float: inflation rate, not yet supported (just prepared)
        //
        //                  endcapital                  float: endcapital
        //
        //                  specialconditions: {        attribute-name/boolean pair
        //                      --- list of parameters, customization only  ---
        //                  }
        //              }
        //        
        // result     {
        //              endcapital                      float: end capital (sum of all investments and interests)
        //
        //              sum_invests                     float: sum of all investments
        //              sum_interests                   float: sum of all interests
        //              interest_details: [{                array of intrest detail info
        //                      id                          string: identifier
        //                      sum_interests               float:  sum of all interests of this type
        //                    }]
        //
        //              avg_interestrate                float: overall interest rate
        //              
        //              periodical                      float: periodical payment
        //
        //              duration                        int: duration in years for charts/saving (maybe longer then effective duration)
        //
        //              eff_years                       int: effective duration: years and  months separated
        //              eff_months                      int: effective duration: f.e. 12y + 3m
        //
        //              data: [{                        array of "cumulated end of year values
        //                      year                        int:   current year (starting with 1) 
        //                      invest                      float: cumulated investement end of year
        //                      interest                    float: cumulated interests end of year
        //                      capital                     float: capital end of year
        //                    }] 
        //            }
        calcSaving: function(customizing, savingType, data) {
            var dataJSON   = JSON.stringify( data || {} );           
      		var o=c_API.m_calcSaving(customizing, savingType, dataJSON);
            var i;
            
            var det = [];
            if (o.m__zsdet!==null) {
            	for(i=0;i<o.m__zsdet.m__details.p_length();i=i+1){
            		var s=o.m__zsdet.m__details.p_getObject(i);
                    det.push({id:               s.m__zinsstufe.m__id, 
                              sum_interests:    s.m__zinsen } );
                }           
            }
            
            var v = [];
        	for(i=0;i<o.m__konto.m__standjahr.p_length();i=i+1){
        		var s=o.m__konto.m__standjahr.p_getObject(i);
                v.push({year:      s.m__jahr, 
                        invest:    s.m__sum_einlagen, 
                        interest:  s.m__sum_zinsen, 
                        capital:   s.m__endkapital } );
            }           

            return { endcapital:            o.m__endkapital,
                     sum_invests:           o.m__sum_einlagen,
                     sum_interests:         o.m__sum_zinsen,
                     interest_details:      det,
                     avg_interestrate:      o.m__avg_zinssatz,
                     periodical:            o.m__einlage,
                     duration:              o.m__konto.m__standjahr.p_length(),
                     eff_years:             o.m__dauer_j,
                     eff_months:            o.m__dauer_m,
                     data:                  v };
                                 
        },


        
        // calcS3aSaving: calculates pillar 3a saving with tax effect
        // parameter:   locationid:Int      - id of tax location
        //              civil:Int           - civil status
        //              confession:Int  
        //              children:Int        - number of children 
        //              taxableincomeState:Float
        //              taxableincomeCountry:Float
        //              periodical:Int      - periodically payment (in advance)
        //              duration:Int        - numbers of year to pay
        //              yieldrate:Float     - yield of investment
        //              sex:Int             - sex of person
        //              endage:Int          - end age of person
        //              year:Int            - year when capital get paid out
        //              accountno:Int       - number of accounts/payout (default 1 payment, split from 2-5 payments)
        //              initialinvest:Int   - first time invest in advance
        // result     {
        //              taxsaving:Int       - tax saving per year
        //              taxsavingtotal:Int  - tax saving total over duration
        //              grosscapital:Int    - total gross capital
        //              capitaltax:Int      - total capital taxes
        //              netcapital:Int      - total net capital 
        //              netyield:Float      - overall net yield 
        //              eqgrossyield:Float  - equivalent gross yield
        //              data: [{        - array of "cumulated yearly values
        //                      year:Int            - current year (starting with 1) 
        //
        //                      grosscapital1:Int   - cumulated gross capital at BEGIN of the year
        //                      saving1:Int         - cumulated tax savings at BEGIN of the year
        //                      netcapital1:Int     - cumulated net capital at BEGIN of the year
        //
        //                      grosscapital2:Int   - cumulated gross capital at END of the year
        //                      saving2:Int         - cumulated tax savings at END of the year
        //                      netcapital2:Int     - cumulated net capital at END of the year
        //
        //                      interest:Float      - interest for current year
        //                      interesttotal:Float - cumulated interest at END of the year
        //        
        //                      invest:Float        - invest for current year
        //                      investtotal:Float   - cumulated invests at END of the year
        //                    }] 
        //            }
        calcS3aSaving: function(locationid, civil, confession, children, taxableincomeState, taxableincomeCountry, 
                                periodical, duration, yieldrate,
                                sex, endage, year, 
                                accountno, 
                                initialinvest) {
        
      		var o=c_API.m_calcS3aSaving(locationid, civil, confession, children, taxableincomeState, taxableincomeCountry, 
                                        periodical, duration, yieldrate,
                                        sex, endage, year, 
                                        accountno,
                                        initialinvest||0);
                                          
            var v = [];
        	for(var i=0;i<o.m__stand.p_length();i=i+1){
        		var s=o.m__stand.p_getObject(i);
                v.push({year:      s.m__jahr, 
                        grosscapital1: s.m__astand, 
                        saving1:       s.m__aeinsp, 
                        netcapital1:   s.m__astand-s.m__aeinsp, 

                        grosscapital2: s.m__estand, 
                        saving2:       s.m__eeinsp, 
                        netcapital2:   s.m__estand-s.m__eeinsp,

                        interest:      s.m__jzins,
                        interesttotal: s.m__zinsen,

                        invest:        s.m__jinvest,
                        investtotal:   s.m__invest                        
                      });
            }
            return { taxsaving:     o.m__einsp,
                     taxsavingtotal:o.m__einspn,
                     grosscapital:  o.m__kapbrut,
                     capitaltax:    o.m__kapsteuer,
                     netcapital:    o.m__kapnet,
                     netyield:      o.m__rendnet,
                     eqgrossyield:  o.m__rendbrutto,
                     data:          v };
        },
      
        
        // --------------------------------------------------------------
        // BVG Einkauf
          
        // calcS2BuyIn: returns the tax effect of an buy-in into S2
        //
        // parameter:   locationid:Int       - id of tax location
        //              age:Int              - year when capital get paid out
        //              civil:Int            - civil status
        //              confession:Int  
        //              children:Int         - number of children 
        //              sex:Int              - sex of person
        //              incometype:Int       - type of income 
        //              income:Float         -        
        //              capital:Float        - total of buy-in capital value
        //              splitno:Int          - number of split (default 1 payment)
        //              yieldrate:Float      - yield of S2
        //              conversionrate:Float - pension conversion rate of capital (default 6.4)
        //
        // result:      { 
        //                grosscapital:Int   - total of buy in capital
        //                taxsaving:Int      - total income tax savings 
        //                netcapital:Int     - net invested capital 
        //                duration:Int       - duration until retirement
        //                addS2capital:Int   - additional S2 capital
        //                addS2pension:Int   - additional S2 pension
        //                netyield:Float     - overall net yield (name changed, depr.)
        //                grossyield:Float   - overall gross yield 
        //                data: [{           - array of "capital development
        //                      year:Int            - current year (starting with 1) 
        //                      capital1:Int        - cumulated gross capital at BEGIN of the year
        //                      capital2:Int        - cumulated gross capital at END of the year
        //                    }] 
        //              }
        calcS2BuyIn: function(locationid, age, civil, confession, children, sex, 
                              incometype, income, 
                              capital, splitno, yieldrate, convrate) {
      		var o=c_API.m_calcS2BuyIn(locationid, age, civil, confession, children, sex, 
                                      incometype, income, 
                                      capital, splitno, yieldrate, convrate);
            var v = [];
            for(var i=0;i<o.m__stand.p_length();i=i+1){
                var s=o.m__stand.p_getObject(i);
                v.push({year:       s.m__jahr, 
                        capital1:   s.m__akapital,
                        capital2:   s.m__ekapital
                      });
            }
            
            return { grosscapital:  o.m__kapbrut,
                     taxsaving:     o.m__stersp,
                     netcapital:    o.m__kapnet,
                     duration:      o.m__duration,
                     addS2capital:  o.m__zus_akap,
                     addS2pension:  o.m__zus_arente,
                     grossyield:    o.m__rendbrutto,
                     netyield:      o.m__rendbrutto,    // name change, depr.
                     data:          v };
        },
        
        
        
        
        // --------------------------------------------------------------
        // Nachlass / Erbschaft

        //-----------------------------------------------------        
        // valid values for 
        //
        // matrimonial property typ
        //      1   community of accrued gain (Errungenschaftsbeteiligung)
        //      2   community of goods        (Guetergemeinschaft)
        //      3   ceparation of goods       (Guetertrennung)
        //
        // inerhitor-typ
        //      1   grandparent paternal/fatherside 
        //      2   grandparent maternal/motherside
        //      3   father
        //      4   mother
        //      5   uncle or aunt
        //      6   married partner
        //      7   brother or sister
        //      8   cousin
        //      9   nephew
        //     10   child
        //     11   grandchild
        //     12   great-grandchild
        //     13   concubinage-partner
        //     99   other bequest (vermächtnis/legat)
        //
        //
        
        // calcInheritanceEstate
        // parameter:   matrimonialtype             int 
        //              totalfortune                float: sum of all fortune (Gesamtvermoegen)
        //              own_survived                float: own fortune of surviving person 
        //              own_deceased                float: own fortune of deceased person 
        //
        // result:      inheritance amount          float
        calcInheritanceEstate: function(matrimonialtype, 
                                        totalfortune, own_survived, own_deceased) {
      		var n=c_API.m_calcInheritanceEstate(matrimonialtype, totalfortune, own_survived, own_deceased);
            return n;
        },
               

        // calcSimpleInheritance
        // parameter:   inheritanceamount               float: amount of inheritance to distribute
        //              inheritors                      array of inheritors/successors
        //              [{
        //                  type                            int:    typ of inheritor
        //              }]
        //              country:Int                     country code (756=CH, 438=LI)
        //
        // result:      {
        //                  total_free_amount           float: total amount to distribute freely (freie quote)
        //
        //                  inheritors                  array of inheritors/successors
        //                  [{
        //                      type                        int:    typ of inheritor
        //                      parentel                    int:
        //                      legal_claim                 float:  amount of inheritance by law
        //                      legal_claim_perc            float:
        //                      total_claim                 float:  effective amount of inheritance (either by law or by contract with assigned amount)
        //                      total_claim_perc            float:
        //                      min_claim                   float:  minimum amount by law 
        //                      min_claim_info              string: string telling like "1/2" or so, normally shown as fraction
        //                  }]
        //               }
        //        
        calcSimpleInheritance: function(amount, inheritors, country) {
            var inheritorsJSON = JSON.stringify( { inheritors: inheritors });           
      		var n=c_API.m_calcInheritance(amount, 0, inheritorsJSON, false, country);

            var inh = [];
        	for(var i=0;i<n.m__erben.p_length();i=i+1){
        		var e=n.m__erben.p_get(i);
                if (e.m__internal===false) {
                    inh.push({ type:               e.m__typ, 
                               parentel:           e.m__parentel,
                               legal_claim:        e.m__erbanspruch,
                               legal_claim_perc:   e.m__erbanspruch_proz,
                               total_claim:        e.m__total_erbe,
                               total_claim_perc:   e.m__total_erbe_proz,                          
                               min_claim:          e.p_getGeschuetzerAnspruch(),
                               min_claim_info:     e.m__pflichtteil_info
                              });
                }
            }
                        
            return { 
                     total_free_amount:     n.m__gesamt_freiverfuebar,
                     inheritors:            inh
                   };
        },


        // calcFullInheritance
        // parameter:   inheritanceamount               float: amount of inheritance to distribute
        //              locationid                      int:   id of tax location
        //              inheritors                      array of inheritors/successors
        //              [{
        //                  id                          int:    unique id for this inheritor
        //                  type                        int:    type of inheritor
        //                  name                        string:
        //                  dead                        boolean: 
        //                  parents                     array of inheritor-ids
        //                  assigned_amount             float:  additional assigned amount (part of free amount)
        //              }]
        //              with_freeassigned_amount        boolean: 
        //              country:Int                     country code (756=CH, 438=LI)
        //
        // result:      {
        //                  total_free_amount           float: total amount to distribute freely (freie quote)
        //                  open_free_amount            float: sum of not-assigned free amount
        //
        //                  inheritors                  array of inheritors/successors
        //                  [{
        //                      id                          int:    unique id 
        //                      type                        int:    typ of inheritor
        //                      name                        string:
        //                      parentel                    int:
        //                      legal_claim                 float:  amount of inheritance by law
        //                      legal_claim_perc            float:
        //                      total_claim                 float:  effective amount of inheritance (either by law or by contract with assigned amount)
        //                      total_claim_perc            float:
        //                      min_claim                   float:  minimum amount by law 
        //                      min_claim_info              string: string telling like "1/2" or so, normally shown as fraction
        //
        //                      tax_exemption_limit         float:
        //                      tax_deduction               float:
        //                      tax                         float: 
        //                  }]
        //               }
        calcFullInheritance: function(amount, locationid, inheritors, with_freeassigned_amount, country) {
            var inheritorsJSON = JSON.stringify( { inheritors: inheritors });           
      		var n=c_API.m_calcInheritance(amount, locationid, inheritorsJSON, with_freeassigned_amount, country);

            var inh = [];
        	for(var i=0;i<n.m__erben.p_length();i=i+1){
        		var e=n.m__erben.p_get(i);
                if (e.m__internal===false) {
                    inh.push({ id:                 e.m__id,
                               type:               e.m__typ, 
                               name:               e.m__name,
                               parentel:           e.m__parentel,
                               legal_claim:        e.m__erbanspruch,
                               legal_claim_perc:   e.m__erbanspruch_proz,
                               total_claim:        e.m__total_erbe,
                               total_claim_perc:   e.m__total_erbe_proz,                          
                               min_claim:          e.p_getGeschuetzerAnspruch(),
                               min_claim_info:     e.m__pflichtteil_info,
                               tax_exemption_limit:e.m__steuern_freibetrag,
                               tax_deduction:      e.m__steuern_abzug,
                               tax:                e.m__steuern
                              });
                }
            }
            
            return { 
                     total_free_amount:     n.m__gesamt_freiverfuebar,
                     open_free_amount:      n.m__unverteilt_verfuegar,
                     inheritors:            inh
                   };
        },
        
        
        
        //-------------------------------------------------
        // WITHDRAWAL CALCULATION

        // for internal use only
        prepareWithdrawalResultReturn: function(o) {
            var i;
            
            var v = [];
        	for(i=0;i<o.m__konto.m__standjahr.p_length();i=i+1){
        		var s=o.m__konto.m__standjahr.p_getObject(i);
                v.push({year:      s.m__jahr, 
                        capital:   s.m__endkapital } );
            }           

            return { years:            o.m__dauer_j,
                     months:           o.m__dauer_m,
                     infinit_duration: o.m__infinit_dauer,
                     withdrawal:       o.m__bezug,
                     endcapital:       o.m__endkapital,
                     data:             v };
        },
        
                
        // DEPRECATED - use calcWithdrawal instead    
        calcWithdrawalEndCapital: function(capital, withdrawl, monthlybase, duration, yieldrate) {
      		var o=c_API.m_calcWithdrawalEndCapital(capital, withdrawl, monthlybase, duration, yieldrate);
            return ch.logismata.online.calc.prepareWithdrawalResultReturn(o);
        },
        
        
        // DEPRECATED - use calcWithdrawal instead    
        calcWithdrawalAmount: function(capital, monthlybase, duration, yieldrate, endcapital) {
      		var o=c_API.m_calcWithdrawalAmount(capital, monthlybase, duration, yieldrate, endcapital);
            return ch.logismata.online.calc.prepareWithdrawalResultReturn(o);
        },
                
 
        // DEPRECATED - use calcWithdrawal instead    
        calcWithdrawalDuration: function(capital, withdrawl, monthlybase, yieldrate, endcapital) {
      		var o=c_API.m_calcWithdrawalDuration(capital, withdrawl, monthlybase, yieldrate, endcapital);
            return ch.logismata.online.calc.prepareWithdrawalResultReturn(o);
        },
        

        
        //-----------------------------------------------------        
        // valid values for calcWithdrawal
        //
        // withdrawalType
        //      1  calculate end capital
        //      2  calculate periodical withdrawal
        //      3  calculate duration (expand last year)
        //      4  calculate duration (exact last year)
        //
        // parameter:   customization:String
        //              withrawalType                   int: type of withdrawal
        //              data: { 
        //                  startcapital                float: capital at the beginning
        //                  withdrawal                  float: periodically withdrawal
        //                  monthlybase                 bool:  monthly base withdrawal
        //                  duration                    int:   numbers of year to withdraw
        //
        //                  interest                    float: interest rate
        //                  neg_interest                float: interest rate for neg. capital (=interest if not existing)
        //                      -- or -- 
        //                  interestranges: [{          array of interest ranges 
        //                          id                      string: identifier
        //                          interest                float:  interest rate
        //                          from                    float:  lower bound
        //                          to                      float:  upper bound (infinit if not existing)
        //                          neg                     bool:   neg. capital
        //
        //                          inflow_threshold        float:  minimal (yearly) inflow threshold for this interest
        //
        //                          specialconditions: {    all required values, attribute-name/boolean pair
        //                              ...
        //                          }
        //                  }]
        //
        //                  inflationrate               float: inflation rate, not yet supported (just prepared)
        //
        //                  endcapital                  float: required minimal endcapital at end of withdrawal period
        //
        //                  specialconditions: {        attribute-name/boolean pair
        //                      --- list of parameters, customization only  ---
        //                  }
        //              }
        //        
        // result     {
        //              years                           int:   effective duration in years
        //              months                          int:   last year duration in months in case of monthlybase
        //              infinit_duration                bool:  overflow-indicator
        //              withdrawal                      float: periodically withdrawal
        //              endcapital                      float: remaining capital after the withdrawal period         
        //              data: [{                        array of fortune development
        //                      year                        int:   current year (starting with 1) 
        //                      capital                     float  capital at end of year
        //                    }] 
        //            }
        calcWithdrawal: function(customizing, withdrawalType, data) {
            var dataJSON   = JSON.stringify( data || {} );           
      		var o=c_API.m_calcWithdrawal(customizing, withdrawalType, dataJSON);
            var i;
            
            var v = [];
        	for(i=0;i<o.m__konto.m__standjahr.p_length();i=i+1){
        		var s=o.m__konto.m__standjahr.p_getObject(i);
                v.push({year:      s.m__jahr, 
                        capital:   s.m__endkapital } );
            }           

            return { years:            o.m__dauer_j,
                     months:           o.m__dauer_m,
                     infinit_duration: o.m__infinit_dauer,
                     withdrawal:       o.m__bezug,
                     endcapital:       o.m__endkapital,
                     data:             v };
        },
        

        // free available fortune (budget)
        // -------------------------------------------------
        
        
        // calcFreeAvailableFortune-------------------------
        // parameter:   customization:String
        //              data 
        //              {
        //                  startyear                   int: f.e. 2016
        //                  duration                    int:
        //                  liqreserve                  float: minimal amount for liq.reserve
        //                  fortune                     float: available/current fortune
        //                  interest                    float: interest rate for pos. fortune (f.e 0.5)
        //                  neg_interest                float: interest rate for neg. fortune (f.e. 10)
        //                  saving                      float: yearly saving  / sparquote
        //                  
        //                  changes: [{                 array of fortune changes
        //                      year                    int:    year when change occurs
        //                      amount                  float:  amount (pos or neg) are handled "nachschüssig"
        //                  }]
        //              }
        //              roundres                        boolean: round result
        //
        // result     {
        //              startyear                       int:
        //              duration                        int:    effective duration in years
        //              availablefortune                float:  avail. free fortune over all years
        //              data: [{                        array of fortune 
        //                      year                    int:   f.e. 2016
        //                      liquidity               float: liquidity but not free available 
        //                      freeavailable           float:
        //                      dept                    float: when value get's negative, it is shown only in dept
        //                    }] 
        //            }
        calcFreeAvailableFortune: function(customizing, data, roundres) {
            var startyear       = data.startyear || 0;
            var duration        = data.duration || 0;
            var liqreserve      = data.liqreserve || 0;
            var fortune         = data.fortune || 0;
            var interest        = data.interest || 0;
            var neg_interest    = data.neg_interest || 0;
            var saving          = data.saving || 0;
            var changesArr      = data.changes || {};
            var changesJSON     = JSON.stringify( { changes: changesArr });
                                           
      		var o=c_API.m_calcFreeAvailableFortune(startyear, duration, 
                                                   liqreserve, 
                                                   fortune, interest, neg_interest,
                                                   saving, changesJSON, roundres);
                                                   
            var v = [];
        	for(var i=0;i<o.m__stand.p_length();i=i+1){
        		var s=o.m__stand.p_getObject(i);
                v.push({year:           s.m__jahr, 
                        liquidity:      s.m__liq,
                        freeavailable:  s.m__verfgbar,
                        dept:           s.m__schuld
                        } );
            }
            return { startyear:         o.m__startjahr,
                     duration:          o.m__dauer,
                     availablefortune:  o.m__freiverfgbaresvm,
                     data:              v };
                                                   
        }


         
    };
   
    // initialise the package environment
    bbInit();
}

})();

//${TRANSCODEATEND_END}

