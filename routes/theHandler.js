//var request=require('request');
var url=require('url');
var PageUrlManager=require('./pageUrlManager');
var IndividualPageManager=require('./individualPageManager');

exports.showResult = function(req, res){
    var delegate=function(anObject,aMethod){
        return function(){
            aMethod.apply(anObject,arguments);
        }
    }
    var TheHandler=function(){
        this.request=req;
        this.response=res;
        this.grade=this.request.query.grade;
        this.pageUrlManager=new PageUrlManager.PageUrlManager();
        this.pageUrlsArray=[];
        this.individualPageManager=new IndividualPageManager.IndividualPageManager();
        this.queAnswersArray=[];

        this.getPageUrl=function(){
            var theGrade=this.grade;
            this.pageUrlManager.loadUrls(theGrade,delegate(this,this.onPageUrlManagerReady));
        }

        this.onPageUrlManagerReady=function(arrayOnResponse){
            this.pageUrlsArray=arrayOnResponse;
            this.individualPageManager.loadQueAnswers(this.pageUrlsArray,delegate(this,this.onLoadQueAnswersReady));
            //this.sendToRes();
        }

        this.onLoadQueAnswersReady=function(arrayOnResponse){
            this.queAnswersArray=arrayOnResponse;
            this.sendToRes();
        }


        this.sendToRes=function(){
            //this.response.end(JSON.stringify(this.pageUrlsArray)) ;
            this.response.end(JSON.stringify(this.queAnswersArray)) ;
        }
    }

    var handle= new TheHandler();
    handle.getPageUrl();

};
