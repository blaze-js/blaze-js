const { BlazeJS } = require('../dist/packages/core');
const server = new BlazeJS();

const db = {
  fetchUser: ({ username }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 1,
          username,
          email: `${username}@domain.com`,
        });
      }, 3000);
    });
  },
};

server.addService('user/fetch', ({ username }) => {
  return db.fetchUser({ username });
});

server.listen(3000);
