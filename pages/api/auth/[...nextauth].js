import axios from 'axios';
import NextAuth from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import absoluteUrl from 'next-absolute-url';

export default NextAuth({
  providers: [
    CredentialProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) { 
	     
        try {
          const { origin } = absoluteUrl(req);
		  const originAuth=origin.replace('https','http')+'/api/auth'
          console.log('origin', originAuth);
          const response = await axios.post(originAuth, { email: credentials.email, password: credentials.password });
          return response.data;
        } catch (error) {
          // console.log(error);
          //   return null;
          if (error?.response?.status === 401) {
            throw new Error('Неверный пароль или email');
          } else {
            throw new Error('Произошла непредвиденая ошибка');
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, data: user };
      }

      return token;
    },

    async session({ session, token }, user) {
      session.user = token?.data;

      return session;
    },
  },

  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login',
  },
});
