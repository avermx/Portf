import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Pokecard from '../components/pokecard'
import Pokedetails from '../components/Pokedetails'

const Routing = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Pokecard/>
    },
    {
      path: '/pokedetails/:id',
      element: <Pokedetails/>
    }
  ])
  return (
    <RouterProvider router={router}/>
  )
}

export default Routing
