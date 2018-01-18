let request = require('request');
let fs = require('fs');
let https = require('https');

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

    let tempPath = __dirname + '/Temp/' + getHash(URL);

    let stream = request.get(URL).on('error', function (error) {
      return error;
    }).pipe(fs.createWriteStream(tempPath, function (error) {
      return error;
    }));
    stream.on('finish', function () {
      capellaSDK.uploadImageToCapella(tempPath, function (err, resp, body) {
        callback(err, resp, body);
        fs.unlink(tempPath, function (error) {
          return error;
        });
      });
    });
  };

  let getHash = function (str) {
    var hash = 0;
    if (str.length == 0) return hash;
    for (i = 0; i < str.length; i++) {
      char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  };

  return capellaSDK;
}({});