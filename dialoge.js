console.log("hello");
const readline = require('readline');

//dict=[{"q":"hi","a":"bye"},{"q":"hello","a":"see you later"}];
dict=[{"q":"what is my salary?","a":"salary"},{"q":"what is my pay?","a":"pay"},{"q":"what is the tax?","a":"tax"}];
//dict=[{"q":"what is my salary","a":"salary"},{"q":"what is my pay","a":"pay"},{"q":"what is the tax?,"a":"tax"}];

function dictquestion(myQ)
{
	for (var key in dict) 
	{
		possilbeQ=dict[key];
		if (possilbeQ.q==myQ)
		{
			return possilbeQ.a;
		}
	}
	return "I dont know";
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What do you want to know ? ', (question) => {
  // TODO: Log the question in a database
  //console.log('Q)', question);
  //process.stdout.write("you wrote "+question);
  rl.close();
  console.log('Q)', question);
  var answer = dictquestion(question) 
  process.stdout.write("A)"+answer);
});
