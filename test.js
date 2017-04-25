//https://maps.googleapis.com/maps/api/place/search/json?

    var https = require('https');
    var querystring = require('querystring');
    var data = '{"texts": ["the movie is really good 5/5","he was so rude and aggressive"]}';
    
        
        var options = {
        host :  'api.uclassify.com',
        port : 443,
        path : '/v1/uclassify/text-language/classify',
        method : 'POST',
        headers : {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(data),
                    'Authorization': 'Token W5f4ruJcdeAR'
                   }
    }
    console.log("up to now ok");
    console.log(options);
 
    //making the https get call
    // var getReq = https.request(options, function(res) {
    //     console.log("\nstatus code: ", res.statusCode);
    //     var data = "";
    //     res.on('data', function(chunk) {
    //          data +=  chunk;
    //     });
    //     res.on('end',function(){
    //         var result = JSON.parse(data);
    //         console.log(result);
    //         //callback(result.results[0].lexicalEntries[0].entries[0].senses[0].definitions);
    //     });
    // });
    // getReq.write(data);
    // //end the request
    // getReq.end();
    // getReq.on('error', function(err){
    //     return err;
    // });
    // //initialize options values, the value of the method can be changed to POST to make https post calls
     

 
// analytics.prototype._doRequest = function(request_query,ob, cb) {
//   // Pass the requested URL as an object to the get request
//   var nndata = '{"texts": ["the movie is really good 5/5","he was so rude and aggressive"]}';  //var nnda = JSON.stringify(ob);
//   //console.log(JSON.stringify(ob));
//   //var po = JSON.stringify({"texts":["text 1 to process","text 2 to process"]});
//   //console.log(nnda);
//   //var nndata = ob;
//   console.log("upto here ok");
//   var post = https.request(request_query, function(res) {
//       var data =  [];
//       console.log("came in");
//       res
//       .on('data', function(chunk) { data.push(chunk); })
//       .on('end', function() {
//           // var dataBuff = data.join('').trim();
//           var result = JSON.parse(dataBuff);
//           // try {
//           //   result = JSON.parse(dataBuff);
//           // } catch (exp) {
//           //   result = {'status_code': 500, 'status_text': 'JSON Parse Failed'};
//           // }
//           console.log(result);
//           return cb(null, result);
//       });
//   });
//   post.write(nndata);
//   post.on('error', function(e) {
//       console.log(e);
//       return cb(e);
//   });
// };


