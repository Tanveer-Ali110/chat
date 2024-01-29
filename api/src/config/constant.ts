/* eslint-disable node/no-process-env */
export default {
    NODE_ENV: (process.env.NODE_ENV ?? ''),
    PORT: (Number(process.env.PORT) ?? 0),
} as const;