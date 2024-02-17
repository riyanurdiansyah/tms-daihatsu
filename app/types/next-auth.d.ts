import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      code: number;
      message: string;
      data: {
        user_id: string;
        username: string;
        password: string;
        email: string;
      };
      accessToken: string;
    };
  }
}
