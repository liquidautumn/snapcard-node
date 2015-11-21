'use strict';
var request = require('request'),
    Q = require('q'),
    crypto = require('crypto'),
    querystring = require('querystring'),
    SNAPCARD_BASEURL = 'https://api.snapcard.io',
    SNAPCARD_DEFAULT_API_VERSION = '2';

function Snapcard(config) {

    if(!config.apiKey || !config.secretKey)
        throw new Error('apiKey and secretKey required.');

    this.invoke = function(method, path, params, options) {

        if(!method || !path)
            throw new Error('method and path required.');

        var deferred = Q.defer();

        var requestOptions = assembleRequestOptions(method, path, params, options);

        request(requestOptions, function(error, response, body) {
            if(error)
                deferred.reject(body);
            else
                deferred.resolve(body);
        });

        return deferred.promise;
    };

    function assembleRequestOptions(method, path, params, options) {

        var requestOptions = {
            uri: SNAPCARD_BASEURL + path,
            method: method.toUpperCase(),
            headers: {
                'X-Api-Version': config.apiVersion || SNAPCARD_DEFAULT_API_VERSION,
                'X-Api-Key': config.apiKey
            },
            qs: {
                timestamp: new Date().getTime()
            },
            json: true
        };

        if(requestOptions.method === 'GET')
            requestOptions.qs = Object.assign(requestOptions.qs, params);
        else
            requestOptions.body = params;

        requestOptions = Object.assign(requestOptions, config.options);

        requestOptions = Object.assign(requestOptions, options);

        requestOptions.headers['X-Api-Signature'] = calcApiSignature(requestOptions);

        return requestOptions;
    }

    function calcApiSignature(requestOptions) {

        var uri = requestOptions.uri;
        uri += '?' + querystring.stringify(requestOptions.qs);
        if(requestOptions.body)
            uri += JSON.stringify(requestOptions.body);

        return crypto.createHmac('sha256', config.secretKey)
            .update(uri)
            .digest('hex');
    }

    return this.invoke;
}

module.exports = function(config) { return new Snapcard(config); };
