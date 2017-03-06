var analytics = require('./index');

var analysis = new analytics("W5f4ruJcdeAR","wirte key");

analysis.textanalysis(["good"],function(error,res){
    console.log(res);
});