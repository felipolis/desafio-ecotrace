import searchApi from '@/api/modules/search.api'
import HistoryCard from '@/components/shared/HistoryCard'
import Loader from '@/components/shared/Loader'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useUserContext } from '@/context/AuthContext'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const History = () => {

  // pega o parametro da url
  const { user } = useUserContext()
  const { history, setHistory } = useUserContext()
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const getHistory = async () => {
      setIsLoading(true)
      const { response, error } = await searchApi.getHistory()

      if (response) {
        response?.sort((a: { createdAt: string | number | Date }, b: { createdAt: string | number | Date }) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        })
        setHistory(response)
        setIsLoading(false)
      }

      if (error) {
        setIsLoading(false)
        return toast({
          title: "Sign in failed. Please try again.",
        })
      }
    }

    getHistory()
  }, [user])


  return (
    <div className='flex flex-col flex-1 px-5 py-10 overflow-scroll gap-9 md:p-14 custom-scrollbar'>
      <div className='flex flex-col justify-between gap-5 sm:flex-row'>
        <div className='flex flex-col items-center justify-center sm:items-start'>
          <h2 className='h3-bold sm:h2-bold'>
            Search History | <Link to={`/${user.username}`}>{user.username}</Link>
          </h2>
          <p className='base-semibold'>
            Total encontrado: {history.length}
          </p>
        </div>
        <Link to="/" className='flex items-center justify-center'>
          <Button
            variant="ghost"
            className="shad-button_primary"
          >
            Search by name
          </Button>
        </Link>
      </div>

      <div className='flex flex-col gap-5 pb-[4rem]'>
        {isLoading ? (
          <div className='flex items-center justify-center'>
            <Loader />
          </div>
        ) : (
          history.map((search) => (
            <HistoryCard key={search.id} search={search} />
          ))
        )}
      </div>
    </div>
  )
}

export default History