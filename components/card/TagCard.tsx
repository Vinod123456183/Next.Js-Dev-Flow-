import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import ROUTES from '@/constants/routes'
import { getDeviconClassName } from '@/lib/utils'
import { Badge } from '../ui/badge'

interface Props {
  _id: string
  name: string
  questions?: number
  showCount?: boolean
  compact?: boolean
  isButton?: boolean
  remove?: boolean
  handleRemove?: () => void
}

const TagCard = ({
  _id,
  name,
  questions,
  showCount,
  compact,
  isButton,
  remove,
  handleRemove,
}: Props) => {
  const iconClass = getDeviconClassName(name)

  const onRemoveClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault()
    e.stopPropagation()
    handleRemove?.()
  }

  const Content = (
    <>
      <Badge className="subtle-medium background-light800_dark300 text-light400_light500 flex flex-row gap-2 rounded-md border-none px-4 py-2 uppercase">
        <div className="flex-center space-x-2">
          <i className={`${iconClass} text-sm`} />
          <span>{name}</span>
          {remove && (
            <span
              role="button"
              tabIndex={0}
              onClick={onRemoveClick}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onRemoveClick(e)
              }}
              className="ml-1 cursor-pointer text-red-500 hover:text-red-700"
            >
              <Image
                src="/icons/close.svg"
                width={12}
                height={12}
                alt="close icon"
                className="dar:invert cursor-pointer object-contain invert-0"
              />
            </span>
          )}
        </div>
      </Badge>
      {showCount && (
        <p className="small-medium text-dark500_light700">{questions}</p>
      )}
    </>
  )

  const isCompactButton = compact && isButton

  return isCompactButton ? (
    <button type="button" className="flex justify-between gap-2">
      {Content}
    </button>
  ) : (
    <Link href={ROUTES.TAGS(_id)} className="flex justify-between gap-2">
      {Content}
    </Link>
  )
}

export default TagCard
