import AuthLayout from './_auth/AuthLayout'
import SigninForm from './_auth/forms/SigninForm'
import SignupForm from './_auth/forms/SignupForm'
import RootLayout from './_root/RootLayout'
import History from './_root/pages/History'
import Profile from './_root/pages/Profile'
import Repositories from './_root/pages/Repositories'
import Search from './_root/pages/Search'
import './globals.css'
import { Routes, Route } from 'react-router-dom'

import { Toaster } from "@/components/ui/toaster"


const App = () => {
  return (
    <main className='flex h-screen overflow-hidden'>
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path='/sign-in' element={<SigninForm />} />
          <Route path='/sign-up' element={<SignupForm />} />
        </Route>


        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route path='/' element={<Search />} />
          <Route path='/history' element={<History />} />
          <Route path='/:username' element={<Profile />} />
          <Route path='/:username/repositories' element={<Repositories />} />
          
        </Route>
      </Routes>

      <Toaster />
    </main>
  )
}

export default App