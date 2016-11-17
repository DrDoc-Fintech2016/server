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
var transaction_info=null;

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
get_transaction_info();

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