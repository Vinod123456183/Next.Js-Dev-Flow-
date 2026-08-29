import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),

  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const signupSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),

    email: z
      .string()
      .min(1, 'Email is required')
      .email('Enter a valid email address'),

    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[a-z]/, 'Include at least one lowercase letter')
      .regex(/[A-Z]/, 'Include at least one uppercase letter')
      .regex(/[^a-zA-Z0-9]/, 'Include at least one special character')
      .regex(/[0-9]/, 'Include at least one number'),

    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

  

export const AskQuestionSchema = z.object({
  title: z
    .string()
    .min(5, 'Title is required.')
    .max(100, 'Title cannot exceed 100 characters.'),

  content: z.string().min(1, 'Body is required.'),

  tags: z
    .array(
      z
        .string()
        .min(1, 'Tag is required.')
        .max(30, 'Tag cannot exceed 30 characters.')
    )
    .min(1, 'At least one tag is required.')
    .max(3, 'Cannot add more than 3 tags.'),
})

export type LoginValues = z.infer<typeof loginSchema>
export type SignupValues = z.infer<typeof signupSchema>
export type AskQuestionValues = z.infer<typeof AskQuestionSchema>
