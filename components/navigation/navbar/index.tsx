import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { Theme } from './Theme'

function Navbar() {
  return (
    <nav className="flex-between background-light900_dark200 shadow-light-300 fixed z-50 w-full p-4 sm:px-12 dark:shadow-none">
      <Link href={'/'} className="flex items-center gap-1">
        <Image
          src="/public/window.svg"
          alt="DevFlow Logo"
          height={23}
          width={23}
        />
        <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Dev <span className="text-primary-500">Flow</span>
        </p>
      </Link>

      <p>Search</p>
      <div className="flex-between gap-5">
        <Theme />
      </div>
    </nav>
  )
}

export default Navbar
