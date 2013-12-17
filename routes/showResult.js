
exports.showResult = function(req, res){
//    res.render('index', { title: 'Express' });
    var theKeyWord=req.query.keyword;


       res.write(JSON.stringify(theKeyWord));
       res.end();





};