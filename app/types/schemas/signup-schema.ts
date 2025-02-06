import { z } from "zod";

const signupSchema = z.object({
  first_name: z.string().min(1, "الاسم الأول مطلوب"),

  last_name: z.string().min(1, "الاسم الأخير مطلوب"),

  email: z.string().email("البريد الإلكتروني غير صالح"),

  password: z.string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل"),

  password2: z
    .string()
    .min(8, "تأكيد كلمة المرور يجب أن تكون 8 أحرف على الأقل"),
});

export default signupSchema;
