let request = require('request');
let fs = require('fs');

/**
 * Add link to the Capella repository
 *
 * @module Capella module. Upload file and return response from server
 * @copyright CodeX Team 2018
 */
class Capella {
    /**
     * Define endpoint URL for Capella uploader
     */
    constructor() {
        this.endpoint = 'https://capella.pics/upload';
    }

    /**
     * Get and parse response from server
     *
     * @param {String} json - JSON string with the server response
     * @return {object|string} - parsed response or error message
     */
    parseResponse(json) {
        json = JSON.parse(json);

        if (json.success == false) {
            return json.message;
        } else {
            return json;
        }
    };

    /**
     * Create request for post image to Capella
     *
     * Callback argument description
     * On error
     * {
     *    "success": false,
     *    "message": <message>
     * }
     * On success
     * {
     *    "success": true,
     *    "message": <message>,
     *    "id": <id>,
     *    "url": <url>
     * }
     *
     * @param {Function} callback - callback action after upload picture.
     * Callback argument has format
     * @return {Function} - request query
     */
    createRequest(callback) {
        let req = request.post(this.endpoint, (error, resp, body) => {
            if (error != null) {
                error = {
                    'success': false,
                    'message': error.code + ' ' + error.message
                };
                callback(error);
                return;
            }
            let response;

            try {
                response = this.parseResponse(body);
            } catch (exception) {
                response = {
                    'success': false,
                    'message': 'Incorrect response from Capella'
                };
            }
            callback(response);
        });

        return req;
    }

    /**
     * Use Capella API for the image uploading
     *
     * {@link https://github.com/codex-team/capella}
     *
     * @param {String} imagePath - local path to image
     * @param {Function} callback - action after upload picture
     */
    uploadFile(imagePath, callback) {
        let req = this.createRequest(callback);
        let form = req.form();

        form.append('file', fs.createReadStream(imagePath));
    };

    /**
     * Use Capella API for the image uploading
     *
     * {@link https://github.com/codex-team/capella}
     *
     * @param {String} URL - URL url path to image
     * @param {Function} callback - action after upload picture
     */
    uploadFileByURL(URL, callback) {
        let req = this.createRequest(callback);
        let form = req.form();

        form.append('link', URL);
    };
}

module.exports = Capella;
