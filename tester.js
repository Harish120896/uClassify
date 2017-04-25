var analytics = require('./index');

var analysis = new analytics("W5f4ruJcdeAR","2mqfMVU3n3ou");


analysis.userdeveloped_classifier_analysis({"username":"Harish Kumar","classifier":"fantasy","data":["Iw bIQtqDaq bIlengjaj 'ej pa'"]},function(err,data){
	if(err){console.log(err);
	}
	else{
		console.log(data);
	}
});
// analysis.add_class({"classifier":"Fantasy","className":"name_of_the_new_class"},function(err,data){
// 	if(err){console.log(err);}
// 	else{
// 		console.log(data);
// 	}
// 	console.log("haha");
// });
// analysis.sentiment_analysis(["the movie is really good 5/5","he was so rude and aggressive"],function(error,res){
//     console.log(res);
//     console.log("haha");
// });

// analysis.create_classifier("Fantasy",function(err,data){

// 	if(err){console.log(err);}
// 	else{
// 		console.log(data);
// 	}
// })

// analysis.remove_classifier("Fantasy",function(err,data){
// 	// if(err){console.log(err);}
// 	// else{
// 	// 	console.log(data);
// 	// }
// })