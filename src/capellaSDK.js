let request = require('request');
let fs = require('fs');

/**
 * Capella upload module
 *
 * @module Capella module. Upload file and return response from server
 * @copyright CodeX Team 2018
 */

module.exports = function (capellaSDK) {

  let getAnswer = function (json) {
    try {
      json = JSON.parse(json);

      if (json.success == false) {
        return json.message;
      }
      else {
        return json;
      }
    }
    catch (exception) {
      throw exception;
    }
  };

  /**
   * Use Capella API for the image uploading
   *
   * {@link https://github.com/codex-team/capella}
   *
   * @param {String} - imagePath local path to image
   * @param {Function} - callback action after upload picture
   */
  capellaSDK.uploadFile = function (imagePath, callback) {
    try {
      let req = request.post('https://capella.pics/upload', function (error, resp, body) {

        if (error != null) {
          throw error;
        }
        callback(getAnswer(body));
      });
      let form = req.form();
      form.append('file', fs.createReadStream(imagePath));
    }
    catch (exception) {
      throw  exception;
    }
  };

  /**
   * Use Capella API for the image uploading
   *
   * {@link https://github.com/codex-team/capella}
   *
   * @param {String} - URL url path to image
   * @param {Function} - callback action after upload picture
   */
  capellaSDK.uploadFileByURL = function (URL, callback) {
    try {
      let req = request.post('https://capella.pics/upload', function (error, resp, body) {
        if (error != null) {
          throw error;
        }
        callback(getAnswer(body));
      });
      let form = req.form();
      form.append('link', URL);
    }
    catch (exception) {
      throw exception;
    }
  };

  return capellaSDK;
}({});