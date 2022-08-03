export const constants = {
  ROLES: {
    ADMIN: "admin",
    CLIENT: "client",
  },
  JWT_SECRET: process.env.JWT_SECRET || "secret",
}
