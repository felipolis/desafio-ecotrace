import repositoriesApi from '@/api/modules/repositories.api'
import Loader from '@/components/shared/Loader'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import RepositoryCard from '@/components/shared/RepositoryCard'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { IRepository } from '@/types'

const Repositories = () => {
  const { username } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [repositories, setRepositories] = useState<IRepository[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const getRepositories = async () => {
      setIsLoading(true)
      const { response, error } = await repositoriesApi.getRepositories({username})
      setIsLoading(false)
      
      if (response) {
        // ordena em ordem de atualização
        response?.sort((a: { updated_at: string | number | Date }, b: { updated_at: string | number | Date }) => {
          console.log(a.updated_at)
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        })
        setRepositories(response)
      }

      if (error) {
        const err = error as Error
        return toast({
          title: err.message,
        })
      }

    }
    getRepositories()
  }, [username])

  return (
    <div className='flex flex-col flex-1 px-5 py-10 overflow-scroll gap-9 md:p-14 custom-scrollbar'>
      <div className='flex flex-col justify-between gap-5 sm:flex-row'>
        <div className='flex flex-col items-center justify-center sm:items-start'>
          <h2 className='h3-bold sm:h2-bold'>
            Public Repositories | <Link to={`/${username}`}>{username}</Link>
          </h2>
          <p className='base-semibold'>
            Total encontrado: {repositories.length}
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
          repositories.map(repository => (
            <RepositoryCard key={repository.id} repository={repository} />
          ))
        )}
      </div>
    </div>
  )
}

export default Repositories