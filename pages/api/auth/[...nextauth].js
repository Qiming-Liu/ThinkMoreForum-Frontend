import NextAuth from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const secureEnv = require('secure-env');

global.env = secureEnv({ secret: 'mySecretPassword' });

const prisma = new PrismaClient();
export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    FacebookProvider({
      clientId: global.env.FACEBOOK_ID,
      clientSecret: global.env.FACEBOOK_SECRET,
    }),
    GoogleProvider({
      clientId: global.env.GOOGLE_ID,
      clientSecret: global.env.GOOGLE_SECRET,
    }),
  ],
});
