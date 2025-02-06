import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address.').max(255, 'Email must be less than 255 characters.'),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .max(20, 'Password must be less than 20 characters long.')
    .regex(/^(?=.*[a-z])/, {
      message: 'Password must contain at least one lowercase letter.'
    })
    .regex(/^(?=.*[A-Z])/, {
      message: 'Password must contain at least one uppercase letter.'
    })
    .regex(/^(?=.*\d)/, {
      message: 'Password must contain at least one number.'
    })
    .regex(/^(?=.*[@$!%*?&])/, {
      message: 'Password must contain at least one special character (@$!%*?&).'
    })
    .regex(/^\S*$/, {
      message: 'Password must not contain spaces.'
    })
});

export default loginSchema;
