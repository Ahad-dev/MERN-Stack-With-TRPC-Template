declare namespace NodeJS {
  interface ProcessEnv {
    PORT:string
    MONGO_URI:string
    JWT_SECRET:string
    CLIENT_URL:string
    BETTER_AUTH_SECRET:string
    BETTER_AUTH_URL:string
    GOOGLE_CLIENT_ID:string
    GOOGLE_CLIENT_SECRET:string
  }
}
