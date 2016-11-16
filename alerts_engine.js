/**
 * Created by czarfati on 11/16/2016.
 */

function AccountHandler(user, creds){
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

    var upload_paycheck = function(paycheck_model){
    //    TODO get paycheck model, upload to user data base and run checks
    };

    var check_balance = function(){
    //    TODO check balance information return OK/WRONG (for minus or low budget) and amount
    };
    var check_tax_payment = function(){
    //    TODO check tax payments and return OK/WRONG and amount
    };
    var check_salary_deposit = function(){
    //    TODO compare salary and real deposit and return OK/WRONG and amount
    };
    var push_alert = function(){

    };
};

function DbHandler(){

    var update_user_account = function (){
    //    TODO update our DB with user account data
    };

    var update_user_paycheck = function (){
    //    TODO update our DB with user paycheck
    };
}



