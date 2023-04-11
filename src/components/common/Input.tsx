import {
  useController,
  Control,
  FieldError,
  FieldValues,
} from 'react-hook-form'

interface InputProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  // control: Control
  control: Control<FieldValues, object>
  name: string
  label: string
  error?: string | FieldError
  type?: 'text' | 'password'
  // required?: boolean
  defaultValue?: string | undefined
}

const Input = ({
  className,
  control,
  name,
  label,
  error,
  type,
  defaultValue = '',
}: InputProps) => {
  const {
    field: { ref, ...inputProps },
    // fieldState: { invalid, error },
  } = useController({
    name,
    control,
    // rules: { required },
    defaultValue: defaultValue,
  })

  return (
    <div className={`flex flex-col ${className || ''}`}>
      <label
        htmlFor={name}
        className={`${error ? 'text-red-600' : 'text-primary'}`}
      >
        {label}
      </label>
      <input
        id={name}
        ref={ref}
        type={type}
        className={`text-primary bg-transparent px-3 py-2 border ${
          error
            ? 'border-red-600 outline-none'
            : 'border-gray-800 dark:border-gray-200'
        }  rounded-md`}
        {...inputProps}
      />
      {/* {invalid && <span>{error?.message}</span>} */}
      {error && (
        <span className="text-red-600 text-sm">
          {typeof error === 'string' ? error : error.message}
        </span>
      )}
    </div>
  )
}

export default Input
