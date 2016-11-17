https = require('https');

var print_debug = function(str){console.log("[DEBUG]:" + str );}
var last_paycheck=null;

var dev_key = "934277168b7c4aeaa4f7237b3de786f4";
var bearer_key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdXN0b21lcklkIjoiNTgyMGFjOGViN2E2ZDM2MjBiN2U0YTA5Iiwicm9sZSI6InVzZXIiLCJwcmltYXJ5U3Vic2NyaWJlcktleSI6IjkzNDI3NzE2OGI3YzRhZWFhNGY3MjM3YjNkZTc4NmY0IiwiaWF0IjoxNDc5Mzc5NjEwfQ.BIpPp-yfNKcGmFjeWgF4nyFKNQZIjBLBkai_m8wA_qI"
var user_id = "5820ac8eb7a6d3620b7e4a09";
var account_id = "5820ac8eb7a6d3620b7e4a0a";

var get_json = function(path,call_back){
    print_debug("get_json() " + path);
    var https_host = "bluebank.azure-api.net";
    var options = {
          host: https_host,
          port: 443,
          path: path,
          method: 'GET',
          headers: {
                'Ocp-Apim-Subscription-Key': dev_key,
                'bearer': bearer_key
            }
    };
    var req = https.request(options, function(res) {
      print_debug("get_json(), request callback - status code" + res.statusCode);
      res.on('data', function(d) {
            print_debug(d);
            if (typeof(call_back)=="function")
              call_back(JSON.parse(d));
      });
    });
    req.end();

}

var customer_info=null;
var account_info=null;
var transaction_info=[{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-01-15T23:32:15.237Z","transactionAmount":5890.23,"accountBalance":17001.23,"transactionType":"","transactionDescription":"SALARY","id":"5820ac8d59c9a806e44bbc55"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-01-22T23:32:15.238Z","transactionAmount":1.05,"accountBalance":17002.28,"transactionType":"INT","transactionDescription":"INTEREST","id":"5820ac8d59c9a806e44bbc56"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-01-29T23:32:15.238Z","transactionAmount":-3000,"accountBalance":14002.28,"transactionType":"S/O","transactionDescription":"JOINT ACCOUNT","id":"5820ac8d59c9a806e44bbc57"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-02-05T21:32:15.239Z","transactionAmount":-34.56,"accountBalance":13967.72,"transactionType":"D/D","transactionDescription":"DIRECT LINE INS","id":"5820ac8d59c9a806e44bbc58"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-02-05T22:32:15.239Z","transactionAmount":-54.32,"accountBalance":13913.4,"transactionType":"D/D","transactionDescription":"DIRECT LINE INS","id":"5820ac8d59c9a806e44bbc59"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-02-05T23:32:15.239Z","transactionAmount":-26.98,"accountBalance":13886.42,"transactionType":"D/D","transactionDescription":"O2 MOBILE","id":"5820ac8d59c9a806e44bbc5a"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-02-06T19:32:15.24Z","transactionAmount":-200,"accountBalance":13686.42,"transactionType":"C/L","transactionDescription":"ROYAL BANK","id":"5820ac8d59c9a806e44bbc5b"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-02-06T20:32:15.24Z","transactionAmount":-499.99,"accountBalance":13186.43,"transactionType":"POS","transactionDescription":"HARVEY NICHOLS EDINBURGH GB","id":"5820ac8d59c9a806e44bbc5c"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-02-06T21:32:15.241Z","transactionAmount":-345.67,"accountBalance":12840.76,"transactionType":"DPC","transactionDescription":"NATWEST 545454","id":"5820ac8d59c9a806e44bbc5d"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-02-06T22:32:15.241Z","transactionAmount":-250,"accountBalance":12590.76,"transactionType":"C/L","transactionDescription":"HSBC","id":"5820ac8d59c9a806e44bbc5e"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-02-06T23:32:15.241Z","transactionAmount":-199.99,"accountBalance":12390.77,"transactionType":"POS","transactionDescription":"JOHN LEWIS EDINBURGH GB","id":"5820ac8d59c9a806e44bbc5f"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-02-07T23:32:15.242Z","transactionAmount":-20,"accountBalance":12370.77,"transactionType":"S/O","transactionDescription":"CANCER RESEARCH","id":"5820ac8d59c9a806e44bbc60"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-02-13T23:32:15.242Z","transactionAmount":-300,"accountBalance":12070.77,"transactionType":"C/L","transactionDescription":"LLOYDS","id":"5820ac8d59c9a806e44bbc61"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-02-14T23:32:15.242Z","transactionAmount":-150,"accountBalance":11920.77,"transactionType":"POS","transactionDescription":"MASSONI CUCINA EDINBURGH GB","id":"5820ac8d59c9a806e44bbc62"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-02-15T23:32:15.243Z","transactionAmount":5678.91,"accountBalance":17599.68,"transactionType":"","transactionDescription":"SALARY","id":"5820ac8d59c9a806e44bbc63"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-02-22T23:32:15.243Z","transactionAmount":1.55,"accountBalance":17601.23,"transactionType":"INT","transactionDescription":"INTEREST","id":"5820ac8d59c9a806e44bbc64"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-02-29T23:32:15.244Z","transactionAmount":-3000,"accountBalance":14601.23,"transactionType":"S/O","transactionDescription":"JOINT ACCOUNT","id":"5820ac8d59c9a806e44bbc65"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-03-07T21:32:15.244Z","transactionAmount":-34.56,"accountBalance":14566.67,"transactionType":"D/D","transactionDescription":"DIRECT LINE INS","id":"5820ac8d59c9a806e44bbc66"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-03-07T22:32:15.247Z","transactionAmount":-54.32,"accountBalance":14512.35,"transactionType":"D/D","transactionDescription":"DIRECT LINE INS","id":"5820ac8d59c9a806e44bbc67"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-03-07T23:32:15.25Z","transactionAmount":-25.55,"accountBalance":14486.8,"transactionType":"D/D","transactionDescription":"O2 MOBILE","id":"5820ac8d59c9a806e44bbc68"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-03-08T19:32:15.25Z","transactionAmount":-200,"accountBalance":14286.8,"transactionType":"C/L","transactionDescription":"ROYAL BANK","id":"5820ac8d59c9a806e44bbc69"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-03-08T20:32:15.251Z","transactionAmount":-299.99,"accountBalance":13986.81,"transactionType":"POS","transactionDescription":"HARVEY NICHOLS EDINBURGH GB","id":"5820ac8d59c9a806e44bbc6a"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-03-08T21:32:15.251Z","transactionAmount":-543.21,"accountBalance":13443.6,"transactionType":"DPC","transactionDescription":"NATWEST 545454","id":"5820ac8d59c9a806e44bbc6b"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-03-08T22:32:15.251Z","transactionAmount":-250,"accountBalance":13193.6,"transactionType":"C/L","transactionDescription":"LLOYDS","id":"5820ac8d59c9a806e44bbc6c"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-03-08T23:32:15.252Z","transactionAmount":-1265.99,"accountBalance":11927.61,"transactionType":"POS","transactionDescription":"JOHN LEWIS EDINBURGH GB","id":"5820ac8d59c9a806e44bbc6d"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-03-09T23:32:15.252Z","transactionAmount":-20,"accountBalance":11907.61,"transactionType":"S/O","transactionDescription":"CANCER RESEARCH","id":"5820ac8d59c9a806e44bbc6e"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-03-15T23:32:15.252Z","transactionAmount":-300,"accountBalance":11607.61,"transactionType":"C/L","transactionDescription":"CLYDESDALE","id":"5820ac8d59c9a806e44bbc6f"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-03-16T23:32:15.252Z","transactionAmount":-150,"accountBalance":11457.61,"transactionType":"POS","transactionDescription":"HOWIES RESTAURANT EDINBURGH GB","id":"5820ac8d59c9a806e44bbc70"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-03-17T23:32:15.255Z","transactionAmount":5678.91,"accountBalance":17136.52,"transactionType":"","transactionDescription":"SALARY","id":"5820ac8d59c9a806e44bbc71"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-03-24T23:32:15.255Z","transactionAmount":1.23,"accountBalance":17137.75,"transactionType":"INT","transactionDescription":"INTEREST","id":"5820ac8d59c9a806e44bbc72"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-03-30T22:32:15.255Z","transactionAmount":-3000,"accountBalance":14137.75,"transactionType":"S/O","transactionDescription":"JOINT ACCOUNT","id":"5820ac8d59c9a806e44bbc73"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-04-06T20:32:15.256Z","transactionAmount":-34.56,"accountBalance":14103.19,"transactionType":"D/D","transactionDescription":"DIRECT LINE INS","id":"5820ac8d59c9a806e44bbc74"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-04-06T21:32:15.256Z","transactionAmount":-54.32,"accountBalance":14048.87,"transactionType":"D/D","transactionDescription":"DIRECT LINE INS","id":"5820ac8d59c9a806e44bbc75"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-04-06T22:32:15.256Z","transactionAmount":-23.45,"accountBalance":14025.42,"transactionType":"D/D","transactionDescription":"O2 MOBILE","id":"5820ac8d59c9a806e44bbc76"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-04-07T18:32:15.257Z","transactionAmount":-200,"accountBalance":13825.42,"transactionType":"C/L","transactionDescription":"ROYAL BANK","id":"5820ac8d59c9a806e44bbc77"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-04-07T19:32:15.257Z","transactionAmount":-199.99,"accountBalance":13625.43,"transactionType":"POS","transactionDescription":"JOHN LEWIS EDINBURGH GB","id":"5820ac8d59c9a806e44bbc78"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-04-07T20:32:15.257Z","transactionAmount":-543.21,"accountBalance":13082.22,"transactionType":"DPC","transactionDescription":"NATWEST 545454","id":"5820ac8d59c9a806e44bbc79"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-04-07T21:32:15.258Z","transactionAmount":-250,"accountBalance":12832.22,"transactionType":"C/L","transactionDescription":"HSBC","id":"5820ac8d59c9a806e44bbc7a"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-04-07T22:32:15.258Z","transactionAmount":-351.23,"accountBalance":12480.99,"transactionType":"POS","transactionDescription":"HARVEY NICHOLS EDINBURGH GB","id":"5820ac8d59c9a806e44bbc7b"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-04-08T22:32:15.258Z","transactionAmount":-20,"accountBalance":12460.99,"transactionType":"S/O","transactionDescription":"CANCER RESEARCH","id":"5820ac8d59c9a806e44bbc7c"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-04-14T22:32:15.258Z","transactionAmount":-200,"accountBalance":12260.99,"transactionType":"C/L","transactionDescription":"CLYDESDALE","id":"5820ac8d59c9a806e44bbc7d"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-04-15T22:32:15.259Z","transactionAmount":-150,"accountBalance":12110.99,"transactionType":"POS","transactionDescription":"THE WITCHERY EDINBURGH GB","id":"5820ac8d59c9a806e44bbc7e"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-04-16T22:32:15.259Z","transactionAmount":5678.91,"accountBalance":17789.9,"transactionType":"","transactionDescription":"SALARY","id":"5820ac8d59c9a806e44bbc7f"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-04-23T22:32:15.259Z","transactionAmount":1.23,"accountBalance":17791.13,"transactionType":"INT","transactionDescription":"INTEREST","id":"5820ac8d59c9a806e44bbc80"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-04-30T22:32:15.26Z","transactionAmount":-3000,"accountBalance":14791.13,"transactionType":"S/O","transactionDescription":"JOINT ACCOUNT","id":"5820ac8d59c9a806e44bbc81"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-05-07T20:32:15.26Z","transactionAmount":-34.56,"accountBalance":14756.57,"transactionType":"D/D","transactionDescription":"DIRECT LINE INS","id":"5820ac8d59c9a806e44bbc82"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-05-07T21:32:15.26Z","transactionAmount":-54.32,"accountBalance":14702.25,"transactionType":"D/D","transactionDescription":"DIRECT LINE INS","id":"5820ac8d59c9a806e44bbc83"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-05-07T22:32:15.261Z","transactionAmount":-32.98,"accountBalance":14669.27,"transactionType":"D/D","transactionDescription":"O2 MOBILE","id":"5820ac8d59c9a806e44bbc84"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-05-08T18:32:15.261Z","transactionAmount":-200,"accountBalance":14469.27,"transactionType":"C/L","transactionDescription":"ROYAL BANK","id":"5820ac8d59c9a806e44bbc85"},{"accountId":"5820ac8eb7a6d3620b7e4a0a","transactionDateTime":"2016-05-08T19:32:15.262Z","transactionAmount":-699.99,"accountBalance":13769.28,"transactionType":"POS","transactionDescription":"HARVEY NICHOLS EDINBURGH GB","id":"5820ac8d59c9a806e44bbc86"}];

var get_customer_info = function(){
  get_json("/api/v0.6.3/customers",function(customers){
    print_debug("get_customer_info() Got customer info-"+JSON.stringify(customers));
    customer_info = customers;
  });
};

var get_account_info = function(){
  get_json("/api/v0.6.3/accounts/5820ac8eb7a6d3620b7e4a0a/",function(account){
    print_debug("get_account_info() Got account info-"+JSON.stringify(account));
    account_info = account;
  });
};

var get_transaction_info = function(){
  get_json("/api/v0.6.3/accounts/5820ac8eb7a6d3620b7e4a0a/transactions",function(transaction){
    print_debug("get_transaction_info() Got transaction info-"+JSON.stringify(transaction));
    transaction_info = transaction;
  });
};

get_customer_info();
get_account_info();
//get_transaction_info(); #FIXME there's a bug here on JSON.parse(d) when d is list of 

var pay_model={"CheckID":"12345",
  "Date":"July31,20xx",
  "Payment":1834,
  "Gross Earnings":3000,
  "Federal Income Tax":349,
  "State Income Tax":117,
  "Social Security Tax":180,
  "Medicare Tax":45,
  "Insurence":175,
  "Retirement Saving Plan":200,
  "Charity":25,
  "Child Care Plan":75,
  "Net Pay":1834,
};

var model={};
model.paycheck=pay_model;
model.customer=customer_info;
model.account_info=account_info;
model.transaction_info=transaction_info;

var update_pay=function(paycheck_json)
{
	last_paycheck=paycheck_json;
};
var process_text_blob=function(blob) //convert blob into paycheck model. 
{
	return model; 
};
var get_model=function()
{
	return model; 
}

module.exports.model = model;

module.exports.get_model = get_model;
module.exports.update_pay = update_pay;
module.exports.process_text_blob = process_text_blob;