

// eslint-disable-next-line react/prop-types
export const InputBox = ({label,placeholder , onChange}) => {
  return (
    <div>
        <div className="text-sm font-medium text-left py-2">
            {label}
        </div>
        <input onChange={onChange} placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-100"/>
    </div>
  )
}
