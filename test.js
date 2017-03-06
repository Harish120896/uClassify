    var https = require('https');
    var querystring = require('querystring');
    var data = '{"texts": ["the movie is really good 5/5","he was so rude and aggressive"]}';
    
        
        var options = {
        host :  'api.uclassify.com',
        port : 443,
        path : '/v1/uclassify/text-language/classify',
        method : 'POST',
        headers : {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': Buffer.byteLength(data),
                    'Authorization': 'Token W5f4ruJcdeAR'
                   }
    }
    console.log("up to now ok");
 
    //making the https get call
    var getReq = https.request(options, function(res) {
        console.log("\nstatus code: ", res.statusCode);
        var data = "";
        res.on('data', function(chunk) {
             data +=  chunk;
        });
        res.on('end',function(){
            var result = JSON.parse(data);
            console.log(result);
            //callback(result.results[0].lexicalEntries[0].entries[0].senses[0].definitions);
        });
    });
    getReq.write(data);
    //end the request
    getReq.end();
    getReq.on('error', function(err){
        return err;
    });
    //initialize options values, the value of the method can be changed to POST to make https post calls
     

 


