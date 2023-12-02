import React from 'react'

const Primary = ({ title = 'Button', className, type = 'button', disabled = false }) => {
  return <button disabled={disabled} type={type} className={`bg-indigo-700 w-[100%] disabled:bg-disabled rounded-xl p-2 ${className}`}>{title}</button>
}

export default Primary