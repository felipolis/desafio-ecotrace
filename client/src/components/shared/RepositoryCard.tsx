import { IRepository } from '@/types'
import { Link } from 'react-router-dom'

const RepositoryCard = (
  { repository }: { repository: IRepository }
) => {

  const date = new Date(repository.updated_at)
  const day = date.toLocaleDateString('pt-BR')
  const hour = date.toLocaleTimeString('pt-BR')

  return (
    <Link to={repository.html_url} className='flex flex-row items-start justify-between w-full px-4 py-6 bg-dark-4 rounded-xl'>
      <div className='flex flex-col gap-5'>
        {/* nome de usuario */}
        <p className='w-full text-start body-bold'>
          {repository.name}
        </p>
        {/* hora da pesquisa */}
        <p className='w-full text-start subtle-semibold'>
          {repository.description || 'No description yet.'}
        </p>
        {/* total de repositorios */}
        <p className='w-full text-start small-regular'>
          {repository.language || 'No language defined!'} | Ultima atualização em {day} às {hour}
        </p>
      </div>
    </Link>
  )
}

export default RepositoryCard