var analytics = require('uclassify');

var analysis = new analytics("read_api_key","write_api_key");// The read and write api key can be obtained by creating an uclassify account in the https://www.uclassify.com for free..
//they provide 500 request for free daily..

//Ex: Here shown is a short news data that is being passed on and the response is as shown..
analysis.news_classifier({"data":["Genetic Factors May Contribute to Adverse Effects Produced by Synthetic Cannabinoids"]},function(err,data){
	if(err){console.log(err);
	}
	else{
		console.log(data);
	}
});

//Response: 
/*
[
  {
    "textCoverage": 0.818182,
    "classification": [
      {
        "className": "Business",
        "p": 7.29068e-7
      },
      {
        "className": "Entertainment",
        "p": 2.3082e-7
      },
      {
        "className": "Fashion",
        "p": 2.86937e-7
      },
      {
        "className": "Finance",
        "p": 2.72049e-7
      },
      {
        "className": "Food",
        "p": 0.0000305918
      },
      {
        "className": "Global",
        "p": 4.29919e-7
      },
      {
        "className": "Health",
        "p": 0.999962
      },
      {
        "className": "Home",
        "p": 0.00000118741
      },
      {
        "className": "Men",
        "p": 0.00000209058
      },
      {
        "className": "Parents",
        "p": 4.27748e-7
      },
      {
        "className": "Sports",
        "p": 2.48894e-7
      },
      {
        "className": "Technology",
        "p": 3.53696e-7
      },
      {
        "className": "US",
        "p": 8.36654e-7
      },
      {
        "className": "Women",
        "p": 3.83611e-7
      }
    ]
  }
]
*/
