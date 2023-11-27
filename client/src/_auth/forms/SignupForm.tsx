import { useUserContext } from '@/context/AuthContext'
import { SignupValidation } from '@/lib/validation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Loader from '@/components/shared/Loader'
import { useState } from 'react'
import userApi from '@/api/modules/user.api'
import { useToast } from "@/components/ui/use-toast"

const SignupForm = () => {
  const { toast } = useToast()
  const { checkAuthUser, setActkn } = useUserContext()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    setIsLoading(true)
    const { response, error } = await userApi.signup(values)
    setIsLoading(false)

    if (response) {
      setActkn(response.token)
      
      const isLoggedIn = await checkAuthUser()

      if (isLoggedIn) {
        form.reset()

        navigate("/")
      }

    }

    if (error) {
      return toast({
        title: "Sign in failed. Please try again.",
      })
    }


  }

  return (
    <Form {...form}>
      <div className="flex-col sm:w-410 flex-center">
        <h2 className="pt-5 h3-bold md:h2-bold sm:pt-12">Create a new account</h2>
        <p className="text-light-3 small-medium md:base-regular">To use this app, please enter your details</p>

        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="flex flex-col w-full gap-5 mt-4"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Github Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary">
            {isLoading ? (
              <div className="gap-2 flex-center">
                <Loader /> Loading...
              </div>
            ) : "Sign up"}
          </Button>

          <p className="mt-2 text-center text-small-regular text-light-2">
            Already have an account?
            <Link 
              to="/sign-in" 
              className="ml-1 text-primary-500 text-small-semibold"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

export default SignupForm