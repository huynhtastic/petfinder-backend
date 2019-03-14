if (!process.env.PET_KEY) { throw new Error('Need to define PET_KEY env variable'); }
export default {
  petKey: process.env.PET_KEY,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
};
