/**
 * Created by czarfati on 11/16/2016.
 */
var apiai = require('apiai');
var hardcoded_client_access_token = 'b4356a5564ff459b856f1554ccf0da2f';
var hardcoded_dev_access_token = '8216d67a7be64541ae931d15e758a262';


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

