import { ZodType, z } from "zod";

export const configSchema:ZodType<ConfigType> = z.object({
    email:z.string().email("Please enter a valid email address"),
    businessHour:z.string().min(5, "Please enter a business hour"),
    address:z.string().min(5, "Please enter a address"),
    about:z.string().min(5, "Please enter a description"),
    phoneOne:z.string().min(9, "Please enter a phone number"),
    phoneTwo:z.string().min(9, "Please enter a phone number"),
    facebook:z.string().url("Please enter a valid url"),
    instagram:z.string().url("Please enter a valid url"),
    twitter:z.string().url("Please enter a valid url"),
    embedMap:z.string().url("Please enter a valid url")
  })