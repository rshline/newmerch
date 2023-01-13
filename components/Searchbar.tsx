import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import React, { useCallback, useRef, useState } from 'react'

function Searchbar() {

    const searchRef: React.Ref<any> = useRef<any>(null)
    const [query, setQuery] = useState<string>('')
    const [active, setActive] = useState<Boolean>(false)
    const [results, setResults] = useState<any[]>([])

    const searchEndpoint = (query: string) => `/api/search?q=${query}`

    const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value
        setQuery(query)
        if (query.length) {
        fetch(searchEndpoint(query))
            .then((res) => res.json())
            .then((res) => {
            setResults(res.results)
            })
        } else {
        setResults([])
        }
    }, [])

    const onFocus = useCallback(() => {
        setActive(true)
        window.addEventListener('click', onClick)
    }, [])

    const onClick = useCallback((event: any) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setActive(false)
            window.removeEventListener('click', onClick)
        }
    }, [])

  return (
    <div className='hidden relative lg:flex m-1 rounded-full btn-navbar h-7' ref={searchRef}>
        <MagnifyingGlassIcon className='m-1 h-5 rounded-l-full' />
        <input type="text" name='search'  
            onChange={onChange}
            onFocus={onFocus}
            value={query}
            className='rounded-r-full bg-transparent border-transparent focus:border-transparent focus:ring-0 focus:drop-shadow-lg'
        />
        {active && results.length > 0 && (
            <ul className='list-none absolute left-5 right-3 top-full z-50'>
                {results.map(({_id, name}, i) => (
                    <li className='p-1 bg-white border-b border-primary-violet' key={i}>
                        <Link href={`/product/${_id}`} className='hover:underline'>
                            {name}
                        </Link>
                    </li>
                ))}
            </ul>
      )}
    </div>
  )
}

export default Searchbar