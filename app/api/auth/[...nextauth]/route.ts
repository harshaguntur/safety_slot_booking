// /app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createClient } from "@sanity/client";
import bcrypt from "bcryptjs";

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_WRITE_TOKEN,
});

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        emp_no: { label: "Emp No", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const query = `*[_type == "user" && emp_no == $emp_no][0]`;
        const user = await sanity.fetch(query, {
          emp_no: parseInt(credentials?.emp_no || "0"),
        });

        if (!user) return null;

        const isValid = bcrypt.compareSync(credentials?.password || "", user.password);
        if (!isValid) return null;

        return {
          id: user._id,
          emp_no: user.emp_no,
          name: user.name,
          designation: user.designation,
          department: user.department,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      if (token?.user) session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
