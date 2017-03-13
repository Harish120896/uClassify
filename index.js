var https = require('https');

var analytics = function(read_id,write_id){

	this.config = {
		read_id : read_id,
		write_id : write_id
	}

};

analytics.prototype.attitude_analysis = function(userdata,cb){

  var obj = {texts: userdata};
  var gen_url = this._generateUrl(this.config.read_id,obj,'/v1/prfekt/myers-briggs-attitude/classify');
  this._doRequest(gen_url,obj,cb);

}

analytics.prototype.news_classifier = function(userdata,cb){

    var obj = {texts: userdata};
    var gen_url = this._generateUrl(this.config.read_id,obj,'/v1/mvazquez/news-classifier/classify');
    this._doRequest(gen_url,obj,cb);

}

analytics.prototype.gender_classfier = function(userdata,cb){

   var obj = {texts: userdata};
   var gen_url = this._generateUrl(this.config.read_id,obj,'/v1/uclassify/genderanalyzer_v5/classify');
   this._doRequest(gen_url,obj,cb);

}

analytics.prototype.age_analysis = function(userdata,cb){

    var obj = {texts: userdata};
    var gen_url = this._generateUrl(this.config.read_id,obj,'/v1/uclassify/ageanalyzer/classify');
    this._doRequest(gen_url,obj,cb);

}

analytics.prototype.tone_analysis = function(userdata,cb){

    var obj = {texts: userdata};
    var gen_url = this._generateUrl(this.config.read_id,obj,'/v1/prfekt/tonality/classify');
    this._doRequest(gen_url,obj,cb);

}

analytics.prototype.subject_classfier = function(userdata,cb){

    var obj = {texts: userdata};
    var gen_url = this._generateUrl(this.config.read_id,obj,'/v1/uclassify/topics/classify');
    this._doRequest(gen_url,obj,cb);

}

analytics.prototype.society_categ_analysis = function(userdata,cb){

    var obj = {texts: userdata};
    var gen_url = this._generateUrl(this.config.read_id,obj,'/v1/uclassify/society-topics/classify');
    this._doRequest(gen_url,obj,cb);

}

analytics.prototype.language_analysis = function(userdata,cb) {

	  var obj = {texts: userdata};
    var gen_url = this._generateUrl(this.config.read_id,obj,'/v1/uclassify/text-language/classify');
    this._doRequest(gen_url,obj,cb);

} 

analytics.prototype.sentiment_analysis = function(userdata,cb){
  
  var obj = {texts: userdata};
  var gen_url = this._generateUrl(this.config.read_id,obj,'/v1/uclassify/text-language/classify');
  this._doRequest(gen_url,obj,cb);
 
}

analytics.prototype.mood_analysis = function(userdata,cb){

    var obj = {texts: userdata};
    var gen_url = this._generateUrl(this.config.read_id,obj,'/v1/prfekt/mood/classify');
    this._doRequest(gen_url,obj,cb);

}

analytics.prototype.create_classifier = function(userdata,cb){

    var obj = {classifierName: userdata};
    var gen_url = this._generateUrl(this.config.write_id,obj,'/v1/me');
    this._doRequest(gen_url,obj,cb,'w');

}

analytics.prototype.remove_classifier = function(userdata,cb){

    var gen_url = this._delUrl(this.config.write_id,'/v1/me/'+userdata);
    this._delRequest(gen_url,cb);

}

analytics.prototype.add_class = function(userdata,cb){

    var obj = {className: userdata.className};
    var gen_url = this._generateUrl(this.config.write_id,obj,'/v1/me/'+userdata.classifier+'/addClass');
    this._doRequest(gen_url,obj,cb,'w');
}

analytics.prototype.remove_class = function(userdata,cb){

    var gen_url = this._delUrl(this.config.write_id,'/v1/me/'+userdata.classifier+'/'+userdata.className);
    this._delRequest(gen_url,cb);

}

analytics.prototype.train_classifier = function(userdata,cb){

    var obj = {texts:userdata.data};
    var gen_url = this._generateUrl(this.config.write_id,obj,'/v1/me/'+userdata.classifier+'/'+userdata.className+'/train');
    this._doRequest(gen_url,obj,cb,'w');
}

analytics.prototype.untrain_classifier = function(userdata,cb){

    var obj = {texts:userdata.data};
    var gen_url = this._generateUrl(this.config.write_id,obj,'/v1/me/'+userdata.classifier+'/'+userdata.className+'/untrain');
    this._doRequest(gen_url,obj,cb,'w');

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
    console.log(res.statusCode);
    var data = [];
    res.on('data',function(chunk){
      data += chunk;
    });
    res.on('end',function(){
      return cb(null,"deleted successfully");
    });
  });
  req.end();
  req.on('error',function(err){
      return cb(err);
    });

}

analytics.prototype._doRequest = function(options, obj, cb,call_type) {
  // Pass the requested URL as an objject to the get request
    
    var post = https.request(options, function(res) {
        console.log("\nstatus code: ", res.statusCode);
        if(call_type == 'w' && res.statusCode == 200){
          res.on('data', function(chunk) {
             data +=  chunk;
          });
          res.on('end',function(){
            return cb(null,"created successfully");
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
    post.write(JSON.stringify(obj));
    //end the request
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
                    'Content-Length': Buffer.byteLength(JSON.stringify(data)),
                    'Authorization': 'Token '+access_key
                   }
    }

    return options;

};

module.exports = analytics;