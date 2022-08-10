export const constants = {
  ROLES: {
    ADMIN: "admin",
    CLIENT: "client",
  },
  JWT_SECRET: process.env.JWT_SECRET || "secret",
  ADMIN: {
    USERNAME: process.env.ADMIN_USERNAME || "admin",
    PASSWORD: process.env.ADMIN_PASSWORD || "admin",
    NAME: process.env.ADMIN_NAME || "admin",
    LAST_NAME: process.env.ADMIN_LAST_NAME || "",
    BIRTH_DATE: new Date(process.env.ADMIN_BIRTH_DATE || "2000-01-01"),
    PHONE: process.env.ADMIN_PHONE || "",
    DIRECTION: process.env.ADMIN_DIRECTION || [],
    EMAIL: process.env.ADMIN_EMAIL || "admin@example.com",
  }

}
