import dotenv from 'dotenv'

dotenv.config();

export default {
  port: 1337,
  dbUri: process.env.DB_URL,
  saltWorkFactor: 10,
  accessTokenTtl: "600m",
  refreshTokenTtl: "1y",
  accessTokenPrivateKey: ``,
  accessTokenPublicKey: ``,
  refreshTokenPrivateKey: ``,
  refreshTokenPublicKey: ``,
};
