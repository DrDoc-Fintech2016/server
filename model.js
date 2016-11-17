
var last_paycheck=null;
var model={"CheckID":"12345",
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
module.exports.get_model = get_model;
module.exports.update_pay = update_pay;
module.exports.process_text_blob = process_text_blob;