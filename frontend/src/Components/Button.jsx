import React from 'react'

export default function Button({children,
type='button',
bgColor='bg-black',
textColor='text-white',
className='',
...props}) {
  return (
    <button className={`btn btn-primary px-4 py-2 m-2 rounded-lg  ${className} ${bgColor} ${textColor}`} {...props}>
      {children}
    </button>
  )
}
