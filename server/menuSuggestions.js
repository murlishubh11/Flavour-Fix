const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const classifier = new natural.BayesClassifier();

// Train the classifier on some sample menu items
classifier.addDocument('chicken biryani with raita', 'biriyani');
classifier.addDocument('spicy lamb curry', 'curry');
classifier.addDocument('veggie pizza', 'pizza');
classifier.addDocument('chocolate cake', 'dessert');
classifier.train();

// Analyze the user feedback and extract relevant keywords
const feedback = 'I like spicy food but don\'t like meat';
const tokens = tokenizer.tokenize(feedback);
const keywords = [];

tokens.forEach((token) => {
  const category = classifier.classify(token);
  if (category !== 'none' && !keywords.includes(category)) {
    keywords.push(category);
  }
});

// Use the extracted keywords to suggest menu items
const suggestions = [];

keywords.forEach((keyword) => {
  switch (keyword) {
    case 'biriyani':
      suggestions.push('chicken biryani');
      break;
    case 'curry':
      suggestions.push('lamb curry');
      break;
    case 'pizza':
      suggestions.push('veggie pizza');
      break;
    case 'dessert':
      suggestions.push('chocolate cake');
      break;
    default:
      break;
  }
});

console.log(`Based on your feedback, we suggest the following menu items: ${suggestions.join(', ')}`);
