'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useRef } from 'react'
import dynamic from 'next/dynamic'

import { Button } from '@/components/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { AskQuestionSchema, type AskQuestionValues } from './form-schema'
import TagCard from '../card/TagCard'

const Editor = dynamic(() => import('@/components/editor'), {
  ssr: false,
})

const QuestionForm = () => {
  const editorRef = useRef<MDXEditorMethod>(null)

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    setError,
    clearErrors,
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

    editorRef.current?.setMarkdown?.('')
  }

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    tags: string[]
  ) => {
    if (e.key !== 'Enter') return

    e.preventDefault()

    const tagInput = e.currentTarget.value.trim()

    if (!tagInput) return

    // Tag length validation
    if (tagInput.length >= 15) {
      setError('tags', {
        type: 'manual',
        message: 'Tags should be less than 15 characters',
      })
      return
    }

    // Duplicate validation
    if (tags.includes(tagInput)) {
      setError('tags', {
        type: 'manual',
        message: 'Tag already exists',
      })
      return
    }

    // Add tag
    setValue('tags', [...tags, tagInput], {
      shouldValidate: true,
      shouldDirty: true,
    })

    // Clear input
    e.currentTarget.value = ''

    // Clear error
    clearErrors('tags')
  }

  const handleTagRemove = (tagToRemove: string, tags: string[]) => {
    setValue(
      'tags',
      tags.filter((tag) => tag !== tagToRemove),
      {
        shouldValidate: true,
        shouldDirty: true,
      }
    )

    clearErrors('tags')
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

          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <>
                <Input
                  id="tags"
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                  placeholder="Add tags...."
                  onKeyDown={(e) => handleInputKeyDown(e, field.value)}
                />

                {/* Tags */}
                {field.value.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-2.5">
                    {field.value.map((tag) => (
                      <TagCard
                        key={tag}
                        _id={tag}
                        name={tag}
                        compact
                        remove
                        isButton
                        handleRemove={() => handleTagRemove(tag, field.value)}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
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
