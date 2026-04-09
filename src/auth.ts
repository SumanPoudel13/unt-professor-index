import NextAuth from 'next-auth';
import MicrosoftEntraID from 'next-auth/providers/microsoft-entra-id';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    MicrosoftEntraID({
      clientId: process.env.AUTH_MICROSOFT_ID!,
      clientSecret: process.env.AUTH_MICROSOFT_SECRET!,
      tenantId: 'common',
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      const email = (profile?.email ?? profile?.preferred_username ?? '') as string;
      return email.endsWith('@my.unt.edu');
    },
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
});