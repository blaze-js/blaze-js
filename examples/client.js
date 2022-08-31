const { BlazeJSClient } = require('../dist/packages/client');

const blaze = new BlazeJSClient('http://localhost:3000');

console.log('fetching user...');
blaze.run('user/fetch', { username: 'xencodes' }).then((profile) => {
  console.log('user profile:', profile);

  blaze.client.disconnect();
});
