import React from 'react'
import {Link} from 'react-router-dom'

function PageNotFound() {
  return (
    <div>
        <h1>Page non trouvée :/</h1>
        <h3>
    
            Allez à la Page d'Acceuil:  <Link to="/">Acceuil</Link>   </h3>

        </div>
  )
}

export default PageNotFound