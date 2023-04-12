import useUserApi from '@/api/useUserApi'
import { Button, Input, Modal } from '@common'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as yup from 'yup'

interface AddContactModalProps {
  open: Boolean
  onClose: () => void
  currentUserData: any
}

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
})

const AddContactModal = ({
  open,
  onClose,
  currentUserData,
}: AddContactModalProps) => {
  const { addContact } = useUserApi()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onsubmit = ({ email }: any) => {
    const contactsEmailList = currentUserData.contacts.map(
      (contact: any) => contact.email
    )
    if (email === currentUserData.email)
      return toast.error('This email must be different your email')

    if (contactsEmailList.includes(email))
      return toast.error('This user already exists in your contacts')

    toast.promise(addContact(email), {
      pending: 'Loading',
      success: 'Success',
      error: {
        render({ data }: any) {
          return data?.message as string | 'Error'
        },
      },
    })
  }

  return (
    <Modal open={open} onClose={onClose} title="Add Contact" className="w-80">
      <form className="mt-3 flex flex-col" onSubmit={handleSubmit(onsubmit)}>
        <Input
          className="mt-2"
          control={control}
          name="email"
          label="Email"
          id="email"
          error={errors.email?.message as string}
        />
        <Button
          type="submit"
          className="mt-3 py-2 hover:bg-blue-500 dark:hover:bg-blue-400"
        >
          Add
        </Button>
      </form>
    </Modal>
  )
}

export default AddContactModal
