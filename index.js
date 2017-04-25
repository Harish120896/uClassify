var https = require('https');

var analytics = function(read_id,write_id){

	this.config = {
		read_id : read_id,
		write_id : write_id
	}

};
//working = true
analytics.prototype.attitude_analysis = function(userdata,cb){

  var obj = JSON.stringify({texts: userdata.data});
  var gen_url = this._generateUrl(this.config.read_id,obj,'/v1/prfekt/myers-briggs-attitude/classify');
  this._doRequest(gen_url,obj,cb);

}
//working = true
analytics.prototype.news_classifier = function(userdata,cb){

    var obj = JSON.stringify({texts: userdata.data});
    var gen_url = this._generateUrl(this.config.read_id,obj,'/v1/mvazquez/news-classifier/classify');
    this._doRequest(gen_url,obj,cb);

}
//working = true
analytics.prototype.gender_classifier = function(userdata,cb){

   var obj = JSON.stringify({texts: userdata.data});
   var gen_url = this._generateUrl(this.config.read_id,obj,'/v1/uclassify/genderanalyzer_v5/classify');
   this._doRequest(gen_url,obj,cb);

}
//working = true
analytics.prototype.age_analysis = function(userdata,cb){

    var obj = JSON.stringify({texts: userdata.data});
    var gen_url = this._generateUrl(this.config.read_id,obj,'/v1/uclassify/ageanalyzer/classify');
    this._doRequest(gen_url,obj,cb);

}
//working = true
analytics.prototype.tone_analysis = function(userdata,cb){

    var obj = JSON.stringify({texts: userdata.data});
    var gen_url = this._generateUrl(this.config.read_id,obj,'/v1/prfekt/tonality/classify');
    this._doRequest(gen_url,obj,cb);

}
//working = true
analytics.prototype.subject_classifier = function(userdata,cb){

    var obj = JSON.stringify({texts: userdata.data});
    var gen_url = this._generateUrl(this.config.read_id,obj,'/v1/uclassify/topics/classify');
    this._doRequest(gen_url,obj,cb);

}
//working = true
analytics.prototype.society_categ_analysis = function(userdata,cb){

    var obj = JSON.stringify({texts: userdata.data});
    var gen_url = this._generateUrl(this.config.read_id,obj,'/v1/uclassify/society-topics/classify');
    this._doRequest(gen_url,obj,cb);

}
//working = true
analytics.prototype.language_analysis = function(userdata,cb) {

	  var obj = JSON.stringify({texts: userdata.data});
    var gen_url = this._generateUrl(this.config.read_id,obj,'/v1/uclassify/text-language/classify');
    this._doRequest(gen_url,obj,cb,'r');

} 
//working = true
analytics.prototype.sentiment_analysis = function(userdata,cb){
  
  var obj = JSON.stringify({texts: userdata.data});
  var gen_url = this._generateUrl(this.config.read_id,obj,'/v1/uclassify/sentiment/classify?');
  this._doRequest(gen_url,obj,cb);
 
}
//working = true
analytics.prototype.mood_analysis = function(userdata,cb){

    var obj = JSON.stringify({texts: userdata.data});
    var gen_url = this._generateUrl(this.config.read_id,obj,'/v1/prfekt/mood/classify');
    this._doRequest(gen_url,obj,cb);

}
//working = true
analytics.prototype.create_classifier = function(userdata,cb){

    var obj = JSON.stringify({classifierName: userdata.data.replace(" ","_")});
    var gen_url = this._generateUrl(this.config.write_id,obj,'/v1/me');
    this._doRequest(gen_url,obj,cb,'w');

}
//working = true
analytics.prototype.remove_classifier = function(userdata,cb){

    var gen_url = this._delUrl(this.config.write_id,'/v1/me/'+userdata.data.replace(" ","_"));
    console.log(gen_url);
    this._delRequest(gen_url,cb);

}
//working = true
analytics.prototype.add_class = function(userdata,cb){

    var obj = JSON.stringify({className: userdata.classname.replace(" ","_")});
    var gen_url = this._generateUrl(this.config.write_id,obj,'/v1/me/'+userdata.classifier.replace(" ","_")+'/addClass');
    this._doRequest(gen_url,obj,cb,'w');

}
//working = true
analytics.prototype.remove_class = function(userdata,cb){

    var gen_url = this._delUrl(this.config.write_id,'/v1/me/'+userdata.classifier.replace(" ","_")+'/'+userdata.classname.replace(" ","_"));
    this._delRequest(gen_url,cb);

}
//working = true
analytics.prototype.train_classifier = function(userdata,cb){

    var obj = JSON.stringify({texts:userdata.data});
    var gen_url = this._generateUrl(this.config.write_id,obj,'/v1/me/'+userdata.classifier.replace(" ","_")+'/'+userdata.classname.replace(" ","_")+'/train');
    this._doRequest(gen_url,obj,cb,'w');

}
//working = true
analytics.prototype.untrain_classifier = function(userdata,cb){

    var obj = JSON.stringify({texts:userdata.data});
    var gen_url = this._generateUrl(this.config.write_id,obj,'/v1/me/'+userdata.classifier.replace(" ","_")+'/'+userdata.classname.replace(" ","_")+'/untrain');
    this._doRequest(gen_url,obj,cb,'w');

}
//working = true
analytics.prototype.userdeveloped_classifier_analysis = function(userdata,cb){

    var obj = JSON.stringify({texts:userdata.data});
    var gen_url = this._generateUrl(this.config.read_id,obj,'/v1/'+userdata.username.replace(" ","%20")+'/'+userdata.classifier.replace(" ","_")+'/classify');
    this._doRequest(gen_url,obj,cb,'r');

}
//working = true
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
//working = true
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
//working = true
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
    post.write(obj);
    //end the request
    post.end();
    post.on('error', function(err){
        return cb(err);
    });

};
//working = true
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
//working = true
module.exports = analytics;