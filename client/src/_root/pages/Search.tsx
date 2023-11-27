import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom'
import searchApi from '@/api/modules/search.api'
import { useToast } from '@/components/ui/use-toast'
import Loader from '@/components/shared/Loader'

const Search = () => {
  const [searchValue, setSearchValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const onSubmit = async () => {
    if (!searchValue) return
    
    setIsLoading(true)
    const { response, error } = await searchApi.newSearch({ query: searchValue })
    setIsLoading(false)
    if (error) {
      const err = error as Error
      return toast({
        title: err.message,
      })
    }

    if (response) {
      navigate(`/${searchValue}/repositories`)
    }
  }

  return (
    <div className='flex flex-col items-center flex-1 px-5 py-10 overflow-scroll md:p-14 custom-scrollbar'>
      <div className='flex flex-col items-center w-full max-w-5xl gap-6 md:gap-9'>
        <h2 className='w-full text-center h3-bold md:h2-bold'>
          Search User
        </h2>
        <div className='flex w-full gap-1 px-4 rounded-lg bg-dark-4'>
          <img 
            src="/assets/icons/search.svg"
            width={24}
            height={24} 
            alt="search" 
          />
          <Input 
            type='text'
            placeholder='Search'
            className='explore-search'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-2/12 shad-button_primary"
          onClick={onSubmit}
        >
          {isLoading ? (
            <Loader />
          ) : (
            'Search'
          )}
        </Button>
        <Button type="submit" className="w-3/12 shad-button_secondary"
          onClick={() => navigate('/history')}
        > 
          History
        </Button>
      </div>
    </div>
  )
}

export default Search