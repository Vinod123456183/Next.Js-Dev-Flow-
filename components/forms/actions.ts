'use server'

import { formSchema, type FormState } from './form-schema'

export async function demoFormAction(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const values = {
    title: String(formData.get('title') ?? ''),
    description: String(formData.get('description') ?? ''),
  }

  const parsed = formSchema.safeParse(values)

  if (!parsed.success) {
    return {
      success: false,
      values,
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  // Example:
  // await prisma.bug.create({
  //   data: parsed.data,
  // });

  console.log(parsed.data)

  return {
    success: true,
    values: {
      title: '',
      description: '',
    },
    errors: null,
  }
}
