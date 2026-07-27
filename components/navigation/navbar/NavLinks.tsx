'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'

const NavLinks = ({ isMobileNav = false }: { isMobileNav?: boolean }) => {
  const pathname = usePathname()
  const userId = 11

  return (
    <>
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route

        // don't mutate the shared item — compute a local route instead
        let route = item.route
        if (route === '/profile') {
          if (!userId) return null // hide Profile link if not logged in
          route = `${route}/${userId}`
        }

        return (
          <Link
            href={route}
            key={item.label}
            className={`flex items-center gap-4 rounded-lg p-3 ${
              isActive
                ? 'primary-gradient text-light-900 rounded-lg'
                : 'text-dark300_light900'
            }`}
          >
            <Image
              src={item.imgURL}
              alt={item.label}
              width={20}
              height={20}
              className={cn({ 'invert-colors': !isActive })}
            />
            <p
              className={cn(
                isActive ? 'base-bold' : 'base-medium',
                !isMobileNav && 'max-lg:hidden'
              )}
            >
              {item.label}
            </p>
          </Link>
        )
      })}
    </>
  )
}

export default NavLinks
