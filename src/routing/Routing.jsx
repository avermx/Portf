import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Pokecard from '../components/pokecard'
import Pokedetails from '../components/Pokedetails'
import Shimmer from '../components/shimmer'
import Shimmer2 from '../components/Shimmer2'

const Routing = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Pokecard/>
    },
    {
      path: '/pokedetails/:id',
      element: <Pokedetails/>
    },
    {
      path: '/shimmer',
      element: <Shimmer2/>
    },


  ])
  return (
    <RouterProvider router={router}/>
  )
}

export default Routing
