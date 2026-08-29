'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { AskQuestionSchema, type AskQuestionValues } from './form-schema'

const QuestionForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AskQuestionValues>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: '',
      content: '',
      tags: [],
    },
  })

  const onSubmit = (values: AskQuestionValues) => {
    console.log(values)

    // Clear the form after successful submission
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FieldGroup>
        {/* Title */}
        <Field data-invalid={!!errors.title}>
          <FieldLabel htmlFor="title">Question Title</FieldLabel>

          <Input
            id="title"
            placeholder="Enter your question title"
            aria-invalid={!!errors.title}
            {...register('title')}
          />

          {errors.title && <FieldError>{errors.title.message}</FieldError>}
        </Field>

        {/* Content */}
        <Field data-invalid={!!errors.content}>
          <FieldLabel htmlFor="content">Question Details</FieldLabel>

          <p>Editor</p>
          <Textarea
            id="content"
            placeholder="Explain you'r question in detail..."
            className="min-h-40"
            aria-invalid={!!errors.content}
            {...register('content')}
          />

          {errors.content && <FieldError>{errors.content.message}</FieldError>}
        </Field>
        {/* Tags */}
        <Field data-invalid={!!errors.tags}>
          <FieldLabel htmlFor="tags">Tags</FieldLabel>

          <Input
            id="tags"
            placeholder="react, nextjs, typescript"
            aria-invalid={!!errors.tags}
            {...register('tags', {
              setValueAs: (value) => {
                if (Array.isArray(value)) {
                  return value
                }

                return String(value)
                  .split(',')
                  .map((tag) => tag.trim())
                  .filter(Boolean)
              },
            })}
          />

          {errors.tags && <FieldError>{errors.tags.message}</FieldError>}
        </Field>
        <Button
          className={'primary-gradient !text-light-900 w-full p-2 px-3'}
          type="submit"
        >
          Ask A Question
        </Button>
      </FieldGroup>
    </form>
  )
}

export default QuestionForm
