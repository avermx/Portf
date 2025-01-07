import React from 'react'

const Shimmer2 = () => {
  return (
    <div className='absolute translate-y-72 translate-x-72 left-80 '>
<div class="flex flex-row gap-2">
  <div class="animate-pulse bg-gray-300 w-14 h-14 rounded-lg"></div>
  <div class="flex flex-col gap-2">
    <div class="animate-pulse bg-gray-300 w-28 h-5 rounded-lg"></div>
    <div class="animate-pulse bg-gray-300 w-36 h-3 rounded-lg"></div>
    <div class="animate-pulse bg-gray-300 w-36 h-2 rounded-lg"></div>
  </div>
</div>
</div>
  )
}

export default Shimmer2