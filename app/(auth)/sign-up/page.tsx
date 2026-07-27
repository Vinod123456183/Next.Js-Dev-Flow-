'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { AuthForm } from '@/components/forms/AuthForm'
import type { SignupValues } from '@/components/forms/form-schema'

const SignUp = () => {
  const router = useRouter()

  const handleSignup = async (values: SignupValues) => {
    // UI-only stub — replace with your real sign-up logic later.
    await new Promise((resolve) => setTimeout(resolve, 800))

    console.log('Signup submitted:', values)
    toast.success('Account created (demo)', {
      description: `Welcome, ${values.name}`,
    })

    router.push('/sign-in')
  }

  return (
    <>
      <AuthForm mode="signup" onSubmit={handleSignup} />

      <p className="paragraph-regular text-dark400_light700 mt-6 text-center">
        Already have an account?{' '}
        <Link
          href="/sign-in"
          className="paragraph-semibold primary-text-gradient"
        >
          Sign in
        </Link>
      </p>
    </>
  )
}

export default SignUp
