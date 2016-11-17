/**
 * Created by czarfati on 11/16/2016.
 */
https = require('https');
var print_debug = function(str){console.log("[DEBUG]:" + str );}

function RuleHandler(){
    print_debug("RuleHandler() creating DummyAccountHandler");
    this.account_handler = new DummyAccountHandler();

    this.upload_paycheck = function(paycheck_model){
    //    TODO get paycheck model, upload to user data base and run checks
    };

    this.check_balance = function(){
    //    TODO check balance information return OK/WRONG (for minus or low budget) and amount
    };
    this.check_tax_payment = function(){
    //    TODO check tax payments and return OK/WRONG and amount
    };
    this.check_salary_deposit = function(){
    //    TODO compare salary and real deposit and return OK/WRONG and amount
        return false;
    };
    this.run_checks = function(){
    //    TODO run all checks, push alerts if necessary
        if (!this.check_balance()) report_alert("Your balance is negative");
        if (!this.check_salary_deposit()) report_alert("Your salary deposit has not arrived as expected");
        if (!this.check_tax_payment()) report_alert("Your tax payment is not as expected");
    }
};

function report_alert(alert)
{
    if (typeof(alert_callback)=="function")
        alert_callback(alert);
}
var process_paycheck=function(model)
{
    console.log("Processing:"+JSON.stringify(paycheck_model));
    print_debug("process_paycheck() " + "calling alert engine");
    alert_engine = new RuleHandler(model);
    alert_engine.run_checks(model);
};

var alert_callback=null;
module.exports.process_paycheck = process_paycheck;
module.exports.on_alert=alert_callback;


