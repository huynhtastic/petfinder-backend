if (!process.env.CLIENT_ID) { throw new Error('Need to define CLIENT_ID env variable'); }
if (!process.env.CLIENT_SECRET) { throw new Error('Need to define CLIENT_SECRET env variable'); }

export default {
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
};
