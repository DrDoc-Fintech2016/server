/**
 * Created by czarfati on 11/16/2016.
 */

function AccountHandler(user, creds){
    var dev_key = "934277168b7c4aeaa4f7237b3de786f4";
    this.user_id = user;
    this.user_creds = creds;
    this.account_dict = new dict();

    var connect_user = function (){
    //    TODO connect user to BlueBank API

    };
    var get_user_account = function (){
    //    TODO retrieval of account details (i.e balance
    };
};

function RuleHandler(account_handler){
    this.account_handler = account_handler;

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
    };
    this.run_checks = function(){
    //    TODO run all checks, push alerts if necessary
        if (!this.check_balance()) report_alert("Your balance is negative");
        if (!this.check_salary_deposit()) report_alert("Your salary deposit is not as expected");
    }
};

function DbHandler(){

    var update_user_account = function (){
    //    TODO update our DB with user account data
    };

    var update_user_paycheck = function (){
    //    TODO update our DB with user paycheck
    };
};

function report_alert(alert)
{
    if (typeof(alert_callback)=="function")
        alert_callback(alert);
}
var process_paycheck=function(paycheck_model)
{
    console.log("Processing:"+JSON.stringify(paycheck_model));
    report_alert("dummy alert!!!");

};
var alert_callback=null;
module.exports.process_paycheck = process_paycheck;
module.exports.on_alert=alert_callback;


