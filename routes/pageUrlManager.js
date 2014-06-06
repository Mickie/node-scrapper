
var jsdom=require('jsdom');
var url=require('url');
var fs=require('fs');
var jquery=fs.readFileSync("public/javascripts/jquery-1.9.1.min.js", "utf-8");;

module.exports.PageUrlManager=function(){
    this.myCallbackFunction;
    this.loadUrls=function(grade,aCallback){
        this.myCallbackFunction=aCallback;
        var theGrade=grade;
        var baseURL="http://www.manfen5.com/shiti/ccz_sx/p";
        var pageUrlsArray=[];
        var count=0;
        var delegate=function(anObject,aMethod){
            return function(){
                aMethod.apply(anObject,arguments);
            }
        }

        var createExtendedDelegate = function(anObject, aMethod, anArgumentExtensionArray)
        {
            return function()
            {
                var theArgsAsArray = Array.prototype.slice.call(arguments);
                var theNewArguments = theArgsAsArray.concat(anArgumentExtensionArray)
                return aMethod.apply(anObject, theNewArguments);
            };
        }

        function doit(onloadingReady,callback){
            var thePageIwantScrap=10;
            for(var i=1;i<thePageIwantScrap;i++){
                var uri=baseURL+i+"/?GradeID="+theGrade+"&STTX=&STLeavel=";//数学－试题,7年级有2561页，8年级有
                var aPageUrl=[];
                jsdom.env({
                    //html:body,
                    url:uri,
                    src:[jquery],
//                    scripts:['//code.jquery.com/jquery-1.11.0.min.js'],//'//code.jquery.com/jquery-1.11.0.min.js'
                    done:function(err,window){//!important

                        var $=window.jQuery;
                        var inputEls=$('body').find("input[type='hidden'][name='STID']");
                        var theHref= window.location.href;
                        inputEls.each(function(j,item){
                            var theInputValue=$(item).val();
                            //here to change the object property
//                            aPageUrl[j]={
//                                href:theHref,
//                                grade:theGrade,
//                                pageUrl:"http://www.manfen5.com/cz_sx-"+theInputValue+".html"
//                            }
//                            pageUrlsArray.push(aPageUrl[j]);
//                            console.log(aPageUrl[j]);
                            var thePageUrl="http://www.manfen5.com/cz_sx-"+theInputValue+".html";
                            pageUrlsArray.push(thePageUrl);
                            console.log(thePageUrl);
                        })
                        count+=1;
                        if(count>=(thePageIwantScrap-1)){
                            onloadingReady(pageUrlsArray,callback);
                        }

                    }
                })
            }
            //this.onLoadingIsReady(pageUrlsArray);
        }
        doit(this.onLoadingIsReady,this.myCallbackFunction);
    }

    this.onLoadingIsReady=function(arrayOfResult,callback){
        console.log('the loading is ready, length '+arrayOfResult.length);
        callback(arrayOfResult);
    }
}


