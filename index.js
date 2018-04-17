const Clarifai = require("clarifai");
var dataParser = require("./lib/dataparser");

/**
 * @typedef Prediction
 * @property {boolean} sfw Is the image safe for work?
 * @property {number} confidence The AI's confidence in the result. (between 1 and 0)
 */

/**
 * @typedef PredictOptions
 * @property {boolean} video Is this a video?
 */

/**
 * @promise PredictPromise
 * @fulfill {(Prediction|Prediction[])} The prediction's result.
 * @reject {Object} The error.
 */

class nsfai {
    /**
     * Creates an nsfai instance.
     * @param {string} apiKey Your Clarifai API key.
     */
    constructor(apiKey) {
        this.app = new Clarifai.App({ // Create a Clarifai App instance
            apiKey
        });
    }

    /**
     * Predict an image's NSFWness.
     * @param {string} data Your URL/Data URL/Base64 string.
     * @param {PredictOptions} options Prediction options.
     * @returns {PredictPromise}
     */
<<<<<<< HEAD
<<<<<<< HEAD
    predict(data, cb) {
=======
    predict(data, options) {
>>>>>>> 2e4d0c0 (Removed the cb argument from predict. 🤦)
        var app = this.app;
        return new Promise(function(resolve, reject) {
            try {
<<<<<<< HEAD
                app.models.predict(Clarifai.NSFW_MODEL, dataParser(data)).then(
=======
                if (!options) {
                    options = {};
                }
                var _options = Object.assign({
                    video: false
                }, options);
                var dataObject = dataParser(data);
                var isVideo = options.video || dataObject.video;
                app.models.predict(Clarifai.NSFW_MODEL, dataObject, { video: isVideo }).then(
>>>>>>> 8dd05e8 (Added better video support: returns an array of results for every second of the video.)
                    function(response) {
                        if (isVideo) {
                            var resultArray = response.outputs[0].data.frames.map(function(x) {
                                return {
                                    sfw: x.data.concepts[0].name === "sfw",
                                    confidence: x.data.concepts[0].value
                                };
                            });
                            resolve(resultArray);
                        } else {
                            resolve({
                                sfw: response.outputs[0].data.concepts[0].name === "sfw",
                                confidence: response.outputs[0].data.concepts[0].value // confidence (0-1) about the result
                            });
                        }
                    },
                    function (err) {
                        reject(err);
                    }
                ).catch(function (err) {
                    reject(err);
                });
            } catch(err) {
                reject(err);
            }
        });
=======
    predict(data, cb, options) {
        try {
            if (!options) {
                options = {};
            }
            var _options = Object.assign({
                video: false
            }, options);
            var dataObject = dataParser(data);
            this.app.models.predict(Clarifai.NSFW_MODEL, dataObject, { video: options.video || dataObject.video }).then(
                function(response) {
                    cb(null, {
                        sfw: response.outputs[0].data.concepts[0].name === "sfw",
                        confidence: response.outputs[0].data.concepts[0].value // confidence (0-1) about the result
                    });
                },
                function (err) {
                    cb(err, null);
                }
            );
        } catch(err) {
            cb(err, null);
        }
>>>>>>> 467aca1 (Added video support to predict().)
    }
}

module.exports = nsfai;
