
var last_paycheck=null;
var model={}; 
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