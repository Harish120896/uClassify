var https = require('https');

var analytics = function(read_id,write_id){

	this.config = {
		read_id : read_id,
		write_id : write_id
	};
};

analytics.prototype.contentanalysis = function(userdata,cb){
    var ndata = '';
    var result = this._generateUrl(ndata,'/v1/uclassify/text-language/classify');
    console.log(result);
}
analytics.prototype.toneanalysis = function(userdata,cb){
    var ndata = '';
    var result = this._generateUrl(ndata,'/v1/prfekt/tonality/classify');
}
analytics.prototype.subject_analysis = 
analytics.prototype.society_analysis = 
analytics.prototype.language_analysis = function(userdata,cb) {
	var ndata = '{"texts": ["the movie is really good 5/5","he was so rude and aggressive"]}';
	var result = this._generateUrl(ndata,'/v1/uclassify/text-language/classify');
    console.log(result);
   }; 
analytics.prototype.sentimentanalysis = function(userdata,cb){
    var ndata = '{"texts": ["the movie is really good 5/5","he was so rude and aggressive"]}';
    

}
analytics.prototype._doRequest = function(request_query, cb) {
  // Pass the requested URL as an object to the get request
  https.get(request_query, function(res) {
      var data = [];
      res
      .on('data', function(chunk) { data.push(chunk); })
      .on('end', function() {
          var dataBuff = data.join('').trim();
          var result;
          try {
            result = JSON.parse(dataBuff);
          } catch (exp) {
            result = {'status_code': 500, 'status_text': 'JSON Parse Failed'};
          }
          cb(null, result);
      });
  })
  .on('error', function(e) {
      cb(e);
  });
};

analytics.prototype._generateUrl = function(data,path) {
  //https://maps.googleapis.com/maps/api/place/search/json?
  var options = {
        host :  'api.uclassify.com',
        port : 443,
        path : path,
        method : 'POST',
        headers : {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': Buffer.byteLength(data),
                    'Authorization': 'Token '+this.config.read_id
                   }
    }
    return options;
};
//     var post = https.request(options,function(res){
//     	console.log("\nstatus code: ", res.statusCode);
//         var data = "";
//         res.on('data', function(chunk) {
//              data +=  chunk;
//         });
//         res.on('end',function(){
//             var result = JSON.parse(data);
//             console.log(result);
//             return cb(result);
//         });
//     });
    
//     post.write(ndata);
//     //end the request
//    	post.end();
//     post.on('error', function(err){
//         return err;
//     });
// };

module.exports = analytics;