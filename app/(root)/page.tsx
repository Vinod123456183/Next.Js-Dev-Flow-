import Link from 'next/link'
import React from 'react'

import HomeFilter from '@/components/filter/HomeFilter'
import LocalSearch from '@/components/search/LocalSearch'
import { Button } from '@/components/ui/button'
import ROUTES from '@/constants/routes'

const questions = [
  {
    _id: '1',
    title: 'How to learn React?',
    description: 'I want to learn React, can anyone help me with this?',
    tags: [
      { _id: '1', name: 'React' },
      { _id: '2', name: 'Node' },
    ],
    author: { _id: '1', name: 'John Doe' },
    upvotes: 10,
    answers: 100,
    views: 100,
    createdAt: new Date(),
  },
  {
    _id: '2',
    title: 'How to learn Java?',
    description: 'sex?',
    tags: [
      { _id: '1', name: 'Java' },
      { _id: '2', name: 'Programming' },
    ],
    author: { _id: '1', name: 'John Doe' },
    upvotes: 880,
    answers: 8800,
    views: 1088,
    createdAt: new Date(),
  },
]

interface SearchParams {
  searchParams: Promise<{
    query?: string
  }>
}

async function Home({ searchParams }: SearchParams) {
  const { query = '' } = await searchParams

  const filteredQuestions = questions.filter((question) =>
    question.title.toLowerCase().includes(query?.toLowerCase() ?? '')
  )

  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Button className="primary-gradient !text-light-900 min-h-[46px] px-4 py-3">
          <Link href={ROUTES.ASK_QUESION}>Ask a Question</Link>
        </Button>
      </section>

      <section className="mt-11">
        <LocalSearch
          route="/"
          imgSrc="/icons/search.svg"
          placeholder="Search Questions..."
          otherClasses="flex-1"
        />
      </section>

      <HomeFilter />

      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((question) => (
          <div key={question._id}>
            <h2>{question.title}</h2>
            <p>{question.description}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default Home
