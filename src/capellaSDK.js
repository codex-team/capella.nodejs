let request = require('request');
let fs = require('fs');

/**
 * Capella upload module
 *
 * @module Capella module. Upload file and return response from server
 * @copyright CodeX Team 2018
 */

module.exports = function (capellaSDK) {

  /**
   * Use Capella API for the image uploading
   *
   * {@link https://github.com/codex-team/capella}
   *
   * @param {String} imagePath local path to image
   * @param {Function} callback action after upload picture
   */
  capellaSDK.uploadImageToCapella = function (imagePath, callback) {
    try {
      let req = request.post('https://capella.pics/upload', callback);
      let form = req.form();
      form.append('file', fs.createReadStream(imagePath));
    }
    catch (exception) {
      return exception;
    }
  };

  /**
   * Use Capella API for the image uploading
   *
   * {@link https://github.com/codex-team/capella}
   *
   * @param {String} URL url path to image
   * @param {Function} callback action after upload picture
   */
  capellaSDK.uploadImageToCapellaURL = function (URL, callback) {
    try {
      let req = request.post('https://capella.pics/upload', callback);
      let form = req.form();
      form.append('link', URL);
    }
    catch (exception) {
      return exception;
    }
  };

  return capellaSDK;
}({});