

import React from 'react'
import { useState, useEffect } from 'react'

function App() {

    const [repositories, setRepositories] = useState([])

    useEffect(()=>{

      async function searchRepositories(){
        const response = await fetch('https://api.github.com/users/MatheusMottaGit/repos')
        const data = await response.json()

      setRepositories(data)
      }

      searchRepositories()
    }, [])

    useEffect(()=>{
      const count = repositories.filter(repo=>repo.favorite)
        document.title = `${count.length} favoritos`
    }, [repositories])

    function addFavorite(id){
      const favorites = repositories.map(
        repo => {
          return repo.id == id ? {...repo, favorite: !repo.favorite} : repo
        }
      )

      setRepositories(favorites)
    }

    return(
      <>
      <h1>Listagem repositórios</h1>
        <ul>
          {repositories.map(
            repo => (
            <li key={repo.id}>
            {repo.name}
            {repo.favorite && <span>(Favorito)</span>}
            <button onClick={()=>addFavorite(repo.id)}>Favoritar</button>
            </li>
            )
          )}
        </ul>
      </>
    )
}

export default App
