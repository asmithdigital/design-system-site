import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBar() {
  const [value, setValue] = useState('')
  const navigate = useNavigate()

  function handleChange(e) {
    const val = e.target.value
    setValue(val)
    if (val.trim()) {
      navigate(`/search?q=${encodeURIComponent(val.trim())}`)
    }
  }

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder="Search…"
      style={{
        width: '100%',
        padding: '12px',
        border: '1px solid #ddd8c8',
        borderRadius: '6px',
        fontFamily: 'DM Sans, sans-serif',
        fontSize: '14px',
        color: '#0f1f3d',
        backgroundColor: '#ffffff',
        outline: 'none',
      }}
    />
  )
}
