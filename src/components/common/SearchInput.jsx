import { Search } from 'lucide-react'
import { Input } from '../ui/Input'

export function SearchInput({ value, onChange, placeholder = 'Search…', className }) {
  return (
    <Input icon={Search} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={className} />
  )
}