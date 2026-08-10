import React, { ReactNode } from 'react'

import LeftsideBar from '@/components/navigation/LeftsideBar'
import Navbar from '@/components/navigation/navbar'
import RightSideBar from '@/components/navigation/RightSideBar'

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <main className="background-light850_dark100 relative">
      <Navbar />
      <div className="flex">
        <LeftsideBar />
        {/* sextion / div  , max-md */}
        <section className="flex min-h-screen flex-1 flex-col px-2 pt-24 pb-6 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        <RightSideBar />
      </div>
    </main>
  )
}

export default RootLayout
