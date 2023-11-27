import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { useUserContext } from '@/context/AuthContext'

const Topbar = () => {
  const { user, logout } = useUserContext()

  return (
    <div className='top-0 w-full bg-dark-2'>
      <div className='px-5 py-4 flex-between'>
        <Link to="/" className="flex items-center gap-3" >
          <img 
            src="/assets/icons/home.svg" 
            alt="logo" 
          />
        </Link>

        <div className='flex gap-4'>
          <Button variant="ghost" className='shad-button_ghost' onClick={logout}>
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>

          <Link to={`/${user.username}`} className='gap-3 flex-center'>
            <h3 className='h3-bold'>{user.username}</h3>
            <img 
              src={user.avatarUrl || '/assets/icons/profile-placeholder.svg'} 
              alt="profile" 
              className='w-8 h-8 rounded-full'
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Topbar