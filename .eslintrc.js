module.exports = {
  // "extends": [""],
  rules: {
    'testing-library/no-node-access': [
      'off',
      { allowContainerFirstChild: true },
    ],
  },
};
