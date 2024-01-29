import { createUserSchema } from "@dto/user.schema";
import { z } from "zod";


export type createUserType = z.infer<typeof createUserSchema>;