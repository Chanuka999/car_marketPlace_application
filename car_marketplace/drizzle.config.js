/**@type{import("drizzle-kit").Config} */
export default {
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_iwzvQeFEm02B@ep-tiny-bread-a4hh7922-pooler.us-east-1.aws.neon.tech/car_marketPlace?sslmode=require",
  },
};
