import { z } from "zod";

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.url("DATABASE_URL is missing or invalid"),
    BETTER_AUTH_SECRET: z.string().min(32, "BETTER_AUTH_SECRET must be at least 32 characters for security"),
    BETTER_AUTH_URL: z.url("BETTER_AUTH_URL is missing or invalid"),
    REDIS_URL: z.url("REDIS_URL is missing or invalid"),
    MINIO_ENDPOINT: z.string().min(1, "MINIO_ENDPOINT is required"),
    MINIO_PORT: z.coerce.number().default(9000),
    MINIO_ROOT_USER: z.string().min(1, "MINIO_ROOT_USER is required"),
    MINIO_ROOT_PASSWORD: z.string().min(8, "MINIO_ROOT_PASSWORD must be at least 8 characters"),
    MINIO_USE_SSL: z.enum(["true", "false"]).default("false").transform((val: string) => val === "true"),
    RESEND_API_KEY: z.string().startsWith("re_", "RESEND_API_KEY must start with 're_'")
});

export type Env = z.infer<typeof envSchema>;

export const ENV = envSchema.parse(process.env);