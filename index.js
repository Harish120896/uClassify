var https = require('https');

var analytics = function(read_id,write_id){
//for setting up the credentials..
	this.config = {
		read_id : read_id,
		write_id : write_id
	}

};

analytics.prototype.attitude_analysis = function(userdata,cb){

//given a data it make analysis over it and tells the respective probablities..

  var obj = JSON.stringify({texts: userdata.data});
  var gen_url = this._generateUrl(this.config.read_id,obj,'/v1/prfekt/myers-briggs-attitude/classify');
  this._doRequest(gen_url,obj,cb);

}

analytics.prototype.news_classifier = function(userdata,cb){

//this classifier tries to classify the data into different category of news..

    var obj = JSON.stringify({texts: userdata.data});
    var gen_url = this._generateUrl(this.config.read_id,obj,'/v1/mvazquez/news-classifier/classify');
    this._doRequest(gen_url,obj,cb);

}

analytics.prototype.gender_classifier = function(userdata,cb){

//This classifier tries to figure out if a text is written by a male or female.

   var obj = JSON.stringify({texts: userdata.data});
   var gen_url = this._generateUrl(this.config.read_id,obj,'/v1/uclassify/genderanalyzer_v5/classify');
   this._doRequest(gen_url,obj,cb);

}

analytics.prototype.age_analysis = function(userdata,cb){

//This classifier tries to estimate to which age group a blog belongs.

    var obj = JSON.stringify({texts: userdata.data});
    var gen_url = this._generateUrl(this.config.read_id,obj,'/v1/uclassify/ageanalyzer/classify');
    this._doRequest(gen_url,obj,cb);

}

analytics.prototype.tone_analysis = function(userdata,cb){

    var obj = JSON.stringify({texts: userdata.data});
    var gen_url = this._generateUrl(this.config.read_id,obj,'/v1/prfekt/tonality/classify');
    this._doRequest(gen_url,obj,cb);

}

analytics.prototype.subject_classifier = function(userdata,cb){

    var obj = JSON.stringify({texts: userdata.data});
    var gen_url = this._generateUrl(this.config.read_id,obj,'/v1/uclassify/topics/classify');
    this._doRequest(gen_url,obj,cb);

}

analytics.prototype.society_categ_analysis = function(userdata,cb){

    var obj = JSON.stringify({texts: userdata.data});
    var gen_url = this._generateUrl(this.config.read_id,obj,'/v1/uclassify/society-topics/classify');
    this._doRequest(gen_url,obj,cb);

}

analytics.prototype.language_analysis = function(userdata,cb) {

//Classifies the language of a text by looking on about 4000 commonly used words per language. It works best with clean texts but can also be used for HTML pages.

	  var obj = JSON.stringify({texts: userdata.data});
    var gen_url = this._generateUrl(this.config.read_id,obj,'/v1/uclassify/text-language/classify');
    this._doRequest(gen_url,obj,cb,'r');

} 

analytics.prototype.sentiment_analysis = function(userdata,cb){
  
//This classifier determines if a text is positive or negative. It is well suited for both short and long texts (tweets, Facebook statuses, blog posts, product reviews etc).

  var obj = JSON.stringify({texts: userdata.data});
  var gen_url = this._generateUrl(this.config.read_id,obj,'/v1/uclassify/sentiment/classify?');
  this._doRequest(gen_url,obj,cb);
 
}

analytics.prototype.mood_analysis = function(userdata,cb){

//This classifier predicts the state of mind of the writer - upset or happy.

    var obj = JSON.stringify({texts: userdata.data});
    var gen_url = this._generateUrl(this.config.read_id,obj,'/v1/prfekt/mood/classify');
    this._doRequest(gen_url,obj,cb);

}

analytics.prototype.create_classifier = function(userdata,cb){

//this function helps you to create your own classifier..

    var obj = JSON.stringify({classifierName: userdata.classifier.replace(" ","_")});
    var gen_url = this._generateUrl(this.config.write_id,obj,'/v1/me');
    this._doRequest(gen_url,obj,cb,'w');

}

analytics.prototype.remove_classifier = function(userdata,cb){

//this function is used to remove a user developed classifier by specifying the classifier name..

    var gen_url = this._delUrl(this.config.write_id,'/v1/me/'+userdata.classifier.replace(" ","_"));
    console.log(gen_url);
    this._delRequest(gen_url,cb);

}

analytics.prototype.add_class = function(userdata,cb){

//this function helps you to add classes to your classifier..
//for further info refer https://www.uclassify.com/docs/restapi#example-fantasy

    var obj = JSON.stringify({className: userdata.classname.replace(" ","_")});
    var gen_url = this._generateUrl(this.config.write_id,obj,'/v1/me/'+userdata.classifier.replace(" ","_")+'/addClass');
    this._doRequest(gen_url,obj,cb,'w');

}

analytics.prototype.remove_class = function(userdata,cb){

//this function helps you to remove a particular class from a classifier..

    var gen_url = this._delUrl(this.config.write_id,'/v1/me/'+userdata.classifier.replace(" ","_")+'/'+userdata.classname.replace(" ","_"));
    this._delRequest(gen_url,cb);

}

analytics.prototype.train_classifier = function(userdata,cb){

//this function is used to train your classifier..

    var obj = JSON.stringify({texts:userdata.data});
    var gen_url = this._generateUrl(this.config.write_id,obj,'/v1/me/'+userdata.classifier.replace(" ","_")+'/'+userdata.classname.replace(" ","_")+'/train');
    this._doRequest(gen_url,obj,cb,'w');

}

analytics.prototype.untrain_classifier = function(userdata,cb){

//this function helps you to untrain wrong data that has been trained by the user for a particular class.

    var obj = JSON.stringify({texts:userdata.data});
    var gen_url = this._generateUrl(this.config.write_id,obj,'/v1/me/'+userdata.classifier.replace(" ","_")+'/'+userdata.classname.replace(" ","_")+'/untrain');
    this._doRequest(gen_url,obj,cb,'w');

}

analytics.prototype.userdeveloped_classifier_analysis = function(userdata,cb){

//helps user to access user defined classifier..

    var obj = JSON.stringify({texts:userdata.data});
    var gen_url = this._generateUrl(this.config.read_id,obj,'/v1/'+userdata.username.replace(" ","%20")+'/'+userdata.classifier.replace(" ","_")+'/classify');
    this._doRequest(gen_url,obj,cb,'r');

}

analytics.prototype._delUrl = function(access_key,path){
 
  var options = {
        host : 'api.uclassify.com',
        port : 443,
        path : path,
        method : 'DELETE',
        headers : {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token '+access_key
                   }
    }
    return options;    

}

analytics.prototype._delRequest = function(options,cb){

  var req = https.request(options,function(res){
    var data = [];
    res.on('data',function(chunk){
      data += chunk;
    });
    res.on('end',function(){
      return cb(null,"success");
    });
  });
  req.end();
  req.on('error',function(err){
      return cb(err);
    });

}

analytics.prototype._doRequest = function(options, obj, cb,call_type) {
    
    var post = https.request(options, function(res) {
        if(call_type == 'w' && res.statusCode == 200){
          res.on('data', function(chunk) {
             data +=  chunk;
          });
          res.on('end',function(){
            return cb(null,"success");
           }); 
        }
        else{
          var data = "";
          res.on('data', function(chunk) {
             data +=  chunk;
          });
          res.on('end',function(){
            var result = JSON.parse(data);
            return cb(null,result);
           });  
        }
    });
    post.write(obj);
    
    post.end();
    post.on('error', function(err){
        return cb(err);
    });

};

analytics.prototype._generateUrl = function(access_key,data,path) {

     var options = {
        host :  'api.uclassify.com',
        port : 443,
        path : path,
        method : 'POST',
        headers : {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(data),
                    'Authorization': 'Token '+access_key
                   }
    }
    return options;

};

module.exports = analytics;