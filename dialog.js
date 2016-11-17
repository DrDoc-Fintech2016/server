/**
 * Created by czarfati on 11/16/2016.
 */
var apiai = require('apiai');
var hardcoded_client_access_token = 'c421d45054224c8180fe4c4d9f42335e';
var hardcoded_dev_access_token = '479321d10339462da4eb43cced9ad629';


function ApiAiHandler(access_token) {
    this.app = apiai(access_token);

    this.send_query = function (text_query) {
        var request = this.app.textRequest(text_query);

        request.on('response', function (response) {
            //TODO enter state machine
            //switch (expression) {
            //   case condition 1: statement(s)
            //   break;
            //
            //   case condition 2: statement(s)
            //   break;
            //
            //   case condition n: statement(s)
            //   break;
            //
            //   default: statement(s)
            //}
            console.log(response);
        });
        request.on('error', function (error) {
            console.log(error);
        });
        request.end();
    }
}

function DialogManager(){
    this.apiai_handler = ApiAiHandler(hardcoded_access_token);

    var process_question = function(question){
        this.apiai_handler.send_query(question);
    };
}

var ai_handler = new ApiAiHandler(hardcoded_client_access_token);
ai_handler.send_query("what was my salary this month");