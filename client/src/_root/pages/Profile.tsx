import { Button } from '@/components/ui/button'
import { useUserContext } from '@/context/AuthContext'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Loader from '@/components/shared/Loader'
import { useEffect, useState } from 'react'
import { EditProfileValidation } from '@/lib/validation'
import userApi from '@/api/modules/user.api'
import { useToast } from '@/components/ui/use-toast'
import { Link, useParams } from 'react-router-dom'
import { IGithubUser } from '@/types'

const Profile = () => {
  const { username = '' } = useParams()
  const { toast } = useToast()
  const { user, checkAuthUser } = useUserContext()
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [profileUser, setProfileUser] = useState<IGithubUser | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true)
      const { response, error } = await userApi.getUser({username})
      setIsLoading(false)
      if (response) {
        setProfileUser(response)
      }
      if (error) {
        console.log(error)
      }
    }

    fetchUser()
  }, [username])

  // 1. Define your form.
  const form = useForm<z.infer<typeof EditProfileValidation>>({
    resolver: zodResolver(EditProfileValidation),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof EditProfileValidation>) {
    setIsLoading(true)
    // envia apenas os campos que o valor for diferente de ""
    const { response, error } = await userApi.updateInfo({
      username: values.username !== "" ? values.username : undefined,
      email: values.email !== "" ? values.email : undefined,
      password: values.password !== "" ? values.password : undefined,
    })
    setIsLoading(false)
    form.reset()
    setOpen(false)
    checkAuthUser()
    

    if (response) {
      return toast({
        title: 'Profile updated successfully!',
      })
    }

    if (error) {
      const err = error as Error
      return toast({
        title: err.message,
      })
    }
  }
  
  return (
    <div className='flex flex-col flex-1 gap-[8rem] py-20 px-5 overflow-scroll y-10 lg:p-14 custom-scrollbar'>
      <div className='flex flex-col items-center justify-between gap-5 px-20 lg:flex-row'>
        <div className='flex flex-col items-center justify-between gap-5 lg:flex-row'>
          <img 
            src={profileUser?.avatar_url || '/assets/icons/profile-placeholder.svg'} 
            alt="profile" 
            className='w-32 h-32 rounded-full'
          />
          <div className='flex flex-col items-center gap-1 lg:items-start'>
            <h1 className='text-center h2-bold lg:text-left'>{profileUser?.name}</h1>
            <p className='text-gray-400 base-semibold'>{profileUser?.login}</p>
          </div>
        </div>
        <div className='flex justify-between gap-8'>
          <p className='text-center base-semibold'>
            {profileUser?.followers} followers
          </p>
          <p className='text-center base-semibold'>
            {profileUser?.following} following
          </p>
          <Link to={`/${profileUser?.login}/repositories`} className='text-center base-semibold'>
            {profileUser?.public_repos} repositories
          </Link>
        </div>
        {user?.username === username && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="ghost_details-delete_btn"
              >
                <img
                    src="/assets/icons/edit.svg"
                    width={36}
                    height={36}
                    alt="edit"
                  />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className='h2-bold'>Edit profile</DialogTitle>
                <DialogDescription>
                Make changes to your profile here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
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
                  
                  <Button type="submit" className="w-5/12 shad-button_primary">
                    {isLoading ? (
                      <Loader />
                    ) : (
                      'Save Changes'
                    )}
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <hr 
        className='w-full border-gray-300 border-opacity-50'
      />
      
      {/* BIO */}
      <div className='flex flex-col items-center justify-between gap-5 px-20 lg:items-start'>
        <h1 className='text-center h2-bold lg:text-left'>
          Bio
        </h1>
        <p className='text-center base-semibold lg:text-left'>
        {profileUser?.bio || 'No bio yet.'}
        </p>
      </div>

      <hr 
        className='w-full border-gray-300 border-opacity-50'
      />

      {/* OTHER INFOS */}
      <div className='flex flex-col items-center justify-between px-20 lg:justify-start lg:gap-[5rem] lg:flex-row pb-[6rem]'>
        {profileUser?.email && (
          <p className='small-semibold text-center'>
            {profileUser?.email}
          </p>
        )}
        {profileUser?.twitter_username && (
          <p className='small-semibold text-center'>
            {profileUser?.twitter_username}
          </p>
        )}
        {profileUser?.company && (
          <p className='small-semibold text-center'>
            {profileUser?.company}
          </p>
        )}
        {profileUser?.blog && (
          <p className='small-semibold text-center'>
            {profileUser?.blog}
          </p>
        )}



      </div>

    </div>
    
  )
}

export default Profile