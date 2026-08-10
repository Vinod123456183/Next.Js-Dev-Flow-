import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import ROUTES from '../../constants/routes'
import TagCard from '../card/TagCard'

const hotQuestions = [
  {
    _id: '1',
    title: 'How to create hooks in React',
  },
  {
    _id: '2',
    title: 'What is the difference between useState and useReducer?',
  },
  {
    _id: '3',
    title: 'How to fetch API data in React?',
  },
  {
    _id: '4',
    title: 'How does useEffect work in React?',
  },
  {
    _id: '5',
    title: 'How to pass props between React components?',
  },
  {
    _id: '6',
    title: 'What is the difference between let, const, and var?',
  },
  {
    _id: '7',
    title: 'How to handle forms in React?',
  },
  {
    _id: '8',
    title: 'What is the difference between map and forEach in JavaScript?',
  },
  {
    _id: '9',
    title: 'How to optimize performance in a React application?',
  },
  {
    _id: '10',
    title: 'How does async and await work in JavaScript?',
  },
]

const popularTags = [
  { _id: '1', name: 'react', questions: 100 },
  { _id: '2', name: 'next.js', questions: 65 },
  { _id: '3', name: 'js', questions: 54 },
  { _id: '4', name: 'django', questions: 56 },
  { _id: '5', name: 'lindi', questions: 56 },
]

const RightSideBar = () => {
  return (
    <aside className="background-light800_dark300 sticky top-24 mt-24 w-full max-w-sm max-xl:hidden">
      <div className="background-light800_dark300 rounded-xl p-6 shadow-sm">
        <h2 className="h3-bold text-dark100_light900 mb-6">Top Questions</h2>

        <div className="flex flex-col gap-5">
          {hotQuestions.map(({ _id, title }) => (
            <Link
              key={_id}
              href={ROUTES.PROFILE(_id)}
              className="group flex items-center justify-between gap-4"
            >
              <p className="body-medium text-dark500_light700 group-hover:text-primary-500 line-clamp-2 transition-colors">
                {title}
              </p>

              <Image
                src="/icons/chevron-right.svg"
                alt="Chevron"
                width={18}
                height={18}
                className="invert-colors shrink-0 transition-transform group-hover:translate-x-1"
              />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-16 p-6">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map(({ _id, name, questions }) => (
            <TagCard
              key={_id}
              _id={_id}
              name={name}
              questions={questions}
              showCount
              compact
            />
          ))}
        </div>
      </div>
    </aside>
  )
}

export default RightSideBar
