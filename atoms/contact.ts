import { atomWithStorage } from "jotai/utils";
import { z } from "zod";
import { contactSchema } from "@/types";

const savedContactSchema = z.object({
  version: z.literal(1),
  data: contactSchema,
});

type ContactState = z.infer<typeof savedContactSchema>;

export const contactAtom = atomWithStorage<ContactState>("contact", {
  version: 1,
  data: {
    name: "",
    address: "",
  },
});
