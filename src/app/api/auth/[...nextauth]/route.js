import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  providers:[
    GoogleProvider({
        clientId:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: ({
    signIn: () => {
      //we can sync our backend database after signin sucess
    }
  })
})

export { handler as GET, handler as POST }