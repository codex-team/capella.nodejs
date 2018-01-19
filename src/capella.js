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
     * Define endpoint URL fo Capella uploader
     *
     */
    constructor() {
        this.endpoint = 'https://capella.pics/upload';
    }

    /**
   * Get and parse answer from server
   *
   * @param {String} json - json JSON string with the server response
   * @return {object|string} - parsed response or error message
   */
    parseResponse(json) {
        try {
            json = JSON.parse(json);

            if (json.success == false) {
                return json.message;
            } else {
                return json;
            }
        } catch (exception) {
            throw exception;
        }
    };

    /**
   * Create request for post image to Capella
   *
   * @param callback - callback action after upload picture
   * @return {Function} - request query
   */
    createRequest(callback) {
        let req = request.post(this.endpoint, (error, resp, body) => {
            if (error != null) {
                throw error;
            }
            let response = this.parseResponse(body);

            callback(response);
        });

        return req;
    }

    /**
   * Use Capella API for the image uploading
   *
   * {@link https://github.com/codex-team/capella}
   *
   * @param {String} - imagePath local path to image
   * @param {Function} - callback action after upload picture
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
   * @param {String} - URL url path to image
   * @param {Function} - callback action after upload picture
   */
    uploadFileByURL(URL, callback) {
        let req = this.createRequest(callback);
        let form = req.form();

        form.append('link', URL);
    };
}

module.exports = Capella;