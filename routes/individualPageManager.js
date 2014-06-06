var jsdom=require('jsdom');
var url=require('url');
var fs=require('fs');
var jquery=fs.readFileSync("public/javascripts/jquery-1.9.1.min.js","utf-8");;

module.exports.IndividualPageManager=function(){

    this.myCallbackFunction;
    this.loadQueAnswers=function(urlArray,aCallback){
        this.myCallbackFunction=aCallback;
        var urlArrays=urlArray;
        var queAnswersOfPages=[];
        var count=0;

        function handleEachPage(onLoadingIsReady,callback){
            for(var i=0;i<urlArrays.length;i++){
                var theUrl=urlArrays[i];
                var queAnswersOfonePage={};
                jsdom.env({
                    url:theUrl,
                    src:[jquery],
//                    scripts:['//code.jquery.com/jquery-1.11.0.min.js'],
                    done:function(err,window){
                        var $=window.jQuery;
                        var queDiv=$('body').find('div.sjxx > div');
                        var ansDiv=$('body').find('div.wzsr > div');
                        var queContent=queDiv.html();
                        var ansContent=ansDiv.html();
                        queAnswersOfonePage.que=queContent;
                        queAnswersOfonePage.ans=ansContent;
                        console.log(queAnswersOfonePage);
                        queAnswersOfPages.push(queAnswersOfonePage);
                        count+=1;
                        if(count>=urlArrays.length){
                            onLoadingIsReady(queAnswersOfPages,callback);
                        }
                    }

                })
            }
        }

        handleEachPage(this.onLoadingIsReady,this.myCallbackFunction);
    }

    this.onLoadingIsReady=function(arrayOfResult,callback){
        console.log('each page scrap is ready length is '+arrayOfResult.length);
        callback(arrayOfResult);
    }

}