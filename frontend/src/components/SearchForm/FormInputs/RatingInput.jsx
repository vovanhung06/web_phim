import { values } from 'lodash' 
import React from 'react'

const RatingInput = ({ onChange, name}) => {
  return (
    <div>
        <select name={name} onChange={onChange} id="" className='border rounded-sm'>
            <option value="all">All</option>
            <option value="0-4.9">0 - 49</option>
            <option value="5.0-6.9">50 - 69</option>
            <option value="7.0-10">70 - 100</option>
        </select>
    </div>
  )
}

export default RatingInput