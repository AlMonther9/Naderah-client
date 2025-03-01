import { z } from "zod";

const signupSchema = z.object({
  first_name: z.string().min(1, "الاسم الأول مطلوب"),

  last_name: z.string().min(1, "الاسم الأخير مطلوب"),

  email: z.string().email("البريد الإلكتروني غير صالح"),

  password: z
    .string()
    .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
    .max(20, "كلمة المرور يجب أن تكون أقل من 20 حرفًا.")
    .regex(/^(?=.*[a-z])/, {
      message: "كلمة المرور يجب أن تحتوي على حرف صغير واحد على الأقل.",
    })
    .regex(/^(?=.*[A-Z])/, {
      message: "كلمة المرور يجب أن تحتوي على حرف كبير واحد على الأقل.",
    })
    .regex(/^(?=.*\d)/, {
      message: "كلمة المرور يجب أن تحتوي على رقم واحد على الأقل.",
    })
    .regex(/^(?=.*[@$!%*?&])/, {
      message: "كلمة المرور يجب أن تحتوي على رمز خاص واحد على الأقل (@$!%*?&).",
    })
    .regex(/^\S*$/, {
      message: "كلمة المرور يجب ألا تحتوي على مسافات.",
    }),

  password2: z
    .string()
    .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
    .max(20, "كلمة المرور يجب أن تكون أقل من 20 حرفًا.")
    .regex(/^(?=.*[a-z])/, {
      message: "كلمة المرور يجب أن تحتوي على حرف صغير واحد على الأقل.",
    })
    .regex(/^(?=.*[A-Z])/, {
      message: "كلمة المرور يجب أن تحتوي على حرف كبير واحد على الأقل.",
    })
    .regex(/^(?=.*\d)/, {
      message: "كلمة المرور يجب أن تحتوي على رقم واحد على الأقل.",
    })
    .regex(/^(?=.*[@$!%*?&])/, {
      message: "كلمة المرور يجب أن تحتوي على رمز خاص واحد على الأقل (@$!%*?&).",
    })
    .regex(/^\S*$/, {
      message: "كلمة المرور يجب ألا تحتوي على مسافات.",
    }),
});

export default signupSchema;
