import { ISearch } from '@/types'
import { Button } from '../ui/button'
import { useToast } from '../ui/use-toast'
import { useState } from 'react'
import searchApi from '@/api/modules/search.api'
import { useUserContext } from '@/context/AuthContext'
import { Link } from 'react-router-dom'

const HistoryCard = ({
  search
}: {
  search: ISearch
}) => {

  const [isLoading, setIsLoading] = useState(false)
  const { history, setHistory } = useUserContext()
  const { toast } = useToast()

  const onDelete = async () => {
    setIsLoading(true)
    const { response, error } = await searchApi.deleteSearch({ id: search.id.toString()})
    if (error) {
      setIsLoading(false)
      const err = error as Error
      return toast({
        title: err.message,
      })
    }

    if  (response) {
      toast({
        title: 'Search deleted successfully',
      })

      const newHistory = history.filter((item) => item.id !== search.id)
      setHistory(newHistory)
      setIsLoading(false)
    }
  }

  const date = new Date(search.createdAt)
  const day = date.toLocaleDateString('pt-BR')
  const hour = date.toLocaleTimeString('pt-BR')
  
  return (
    <div className='flex flex-row items-start justify-between w-full px-4 py-6 bg-dark-4 rounded-xl'>
      <div className='flex flex-col gap-5'>
        {/* nome de usuario */}
        <Link to={`/${search.username}`} className='w-full text-start body-bold'>
          {search.username}
        </Link>
        {/* pesquisa feita com sucesso ou erro */}
        <p className='w-full text-start subtle-semibold'>
          { search.status === true ?
            `Search completed on ${day} at ${hour}` :
            `Search failed on ${day} at ${hour}`
          }
        </p>
        {/* total de repositorios */}
        <Link to={`/${search.username}/repositories`} className='w-full text-start small-regular'>
        Total repositories found: {search.repositories}
        </Link>
      </div>

      <Button
        variant="ghost"
        className="ghost_details-delete_btn"
        onClick={onDelete}
      >
        <img src="/assets/icons/delete.svg" width={24} height={24} alt="delete"/>
      </Button>

    </div>
  )
}

export default HistoryCard