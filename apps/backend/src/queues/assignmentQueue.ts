import { Queue } from "bullmq";

export const assignmentQueue = new Queue("assignment-generation", {
  connection: {
    url: process.env.REDIS_URL,
    tls: {},
  },
});