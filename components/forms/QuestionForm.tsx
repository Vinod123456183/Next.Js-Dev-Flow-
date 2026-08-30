'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useRef } from 'react'

import { Button } from '@/components/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { AskQuestionSchema, type AskQuestionValues } from './form-schema'
import dynamic from 'next/dynamic'

// This is the only place InitializedMDXEditor is imported directly.
const Editor = dynamic(() => import('@/components/editor'), {
  // Make sure we turn SSR off
  ssr: false,
})

const QuestionForm = () => {
  const editorRef = useRef<MDXEditorMethod>(null)

  const {
    register,
    control,
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

    reset()

    // If your Editor exposes a clear/reset method:
    editorRef.current?.setMarkdown?.('')
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
          <FieldLabel>Question Details</FieldLabel>

          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <Editor
                value={field.value}
                fieldChange={field.onChange}
                editorRef={editorRef}
              />
            )}
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

        {/* Submit */}
        <Button
          className="primary-gradient !text-light-900 w-full p-2 px-3"
          type="submit"
        >
          Ask A Question
        </Button>
      </FieldGroup>
    </form>
  )
}

export default QuestionForm
