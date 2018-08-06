const Sentiment = require('sentiment');

module.exports.analyzeSentiment = (description) => {
    const newSentiment = new Sentiment();
    return newSentiment.analyze(description);
}