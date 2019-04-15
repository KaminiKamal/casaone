var requestModule = require('request-promise-native');
var j = requestModule.jar()
var request = requestModule.defaults({ jar: j })
const loggerUtil = require(__base + 'modules/loggerUtil').loggerUtil;

const fetchData = {
    makeRequest: function (reqObj) {
        // dispatch(loadingAction(true));
        return new Promise((resolve, reject) => {
            loggerUtil.log(reqObj);
            request(reqObj, (error, response, body) => {
                if(response && response.statusCode == 200) {
                    if(reqObj.sendFullResponse) {
                        resolve(response);
                    } else {
                        loggerUtil.log(body);
                        resolve(body);
                    }
                } else {
                    if(reqObj.sendFullResponse) {
                        loggerUtil.log(response);
                        reject(response);
                    } else {
                        loggerUtil.log(body);
                        reject(body);
                    }
                }
                if(error) {
                    loggerUtil.log(error);
                    reject(error);
                }   
                })
        })
    },
    displayError: function(errorMsg){
        return fetchData.makeRequest(reqObj);
    },
    postJson: function(url, data, validateParams){
        return fetchData.makeRequest(reqObj);
    }
}

module.exports = fetchData;