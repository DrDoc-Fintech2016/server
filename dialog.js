/**
 * Created by czarfati on 11/16/2016.
 */
var apiai = require('apiai');
var hardcoded_access_token = 'c421d45054224c8180fe4c4d9f42335e';

function ApiAiHandler(access_token) {
    this.app = apiai(access_token);

    this.send_query = function (text_query) {
        var request = app.textRequest(text_query);
        request.on('response', function (response) {
            //TODO enter state machine

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