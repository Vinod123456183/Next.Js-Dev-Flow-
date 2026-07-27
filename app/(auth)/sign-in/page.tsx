'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { AuthForm } from '@/components/forms/AuthForm'
import type { LoginValues } from '@/components/forms/form-schema'

const SignIn = () => {
  const router = useRouter()

  const handleLogin = async (values: LoginValues) => {
    // UI-only stub — replace with your real sign-in logic later.
    await new Promise((resolve) => setTimeout(resolve, 800))

    console.log('Login submitted:', values)
    toast.success('Signed in (demo)', {
      description: `Welcome back, ${values.email}`,
    })

    router.push('/')
  }

  return (
    <>
      <AuthForm mode="login" onSubmit={handleLogin} />

      <p className="paragraph-regular text-dark400_light700 mt-6 text-center">
        Don&apos;t have an account?{' '}
        <Link
          href="/sign-up"
          className="paragraph-semibold primary-text-gradient"
        >
          Sign up
        </Link>
      </p>
    </>
  )
}

export default SignIn
