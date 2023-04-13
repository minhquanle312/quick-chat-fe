interface ToggleProps {
  checked?: Boolean
  onChange?: () => void
}

const Toggle = ({ checked = false, onChange }: ToggleProps) => {
  const toggleId = new Date().toISOString()

  return (
    <div className="relative flex w-9 align-middle my-2 mx-4 select-none">
      <label
        onClick={(e) => e.stopPropagation()}
        htmlFor={toggleId}
        className={`${
          checked
            ? 'bg-blue-500 dark:bg-violet-500'
            : 'bg-slate-700 dark:bg-slate-100'
        } w-9 h-4 cursor-pointer rounded-full`}
      />
      <input
        id={toggleId}
        type="checkbox"
        className={`toggle-checkbox absolute top-1/2 -translate-y-1/2 transition-transform duration-150 ${
          checked ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'
        } ${
          checked
            ? 'border-blue-500 dark:border-violet-500'
            : 'border-slate-700 dark:bg-slate-100'
        } block w-6 h-6 bg-white rounded-full border-2 appearance-none cursor-pointer`}
        defaultChecked={!!checked}
        onChange={onChange}
      />
    </div>
  )
}

export default Toggle
