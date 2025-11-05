import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Simulación de usuario
        const user = { id: "1", name: "David", email: "david@riwi.com" };

        if (
          credentials?.email === "david@riwi.com" &&
          credentials?.password === "1234"
        ) {
          return user;
        }
        return null;
      },
    }),
  ],
  pages: {signIn: "/login"},
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
