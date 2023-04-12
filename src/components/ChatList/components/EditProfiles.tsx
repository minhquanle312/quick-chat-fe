import React, { useState } from 'react'

import { Button, Input } from '@common'
import { useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import useAuth from '@hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import useUserApi from '@/api/useUserApi'
import WrapperLeftMenu from './WrapperLeftMenu'
import { toast } from 'react-toastify'

interface EditProfilesProps extends React.HTMLAttributes<HTMLFormElement> {
  setMenuPage: any
}

const schema = yup.object().shape({
  name: yup.string().required('Username is required'),
})

const EditProfiles: React.FC<EditProfilesProps> = ({ setMenuPage }) => {
  const { userData, updateInfo } = useAuth()
  const { updateCurrentUser } = useUserApi()
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const [avatar, setAvatar] = useState<string | undefined>(undefined)

  const onSubmit = async (data: any) => {
    try {
      await toast.promise(
        updateCurrentUser({
          name: data.name,
          avatar: avatar || null,
        }),
        {
          pending: 'Updating your info',
          error: 'Error',
          success: 'Your info have been updated',
        }
      )
      updateInfo({ name: data.name, avatar: avatar || null })
    } catch (error) {
      console.log(error)
    }
  }

  if (!userData) {
    navigate('/', { replace: true })
    return null
  }

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0]
    if (!file) return
    setFileToBase(file)
  }

  const setFileToBase = (file: File) => {
    const render = new FileReader()
    render.readAsDataURL(file)
    render.onloadend = () => {
      setAvatar((render?.result as string) || undefined)
    }
  }

  return (
    <WrapperLeftMenu setMenuPage={setMenuPage} title="Edit Profiles">
      <form className="flex flex-col mt-3" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="file"
          accept="image/*"
          id="avatar-input"
          hidden
          onChange={handleSelectImage}
        />
        <label htmlFor="avatar-input" className="self-center cursor-pointer">
          {userData.avatar ? (
            <img
              src={avatar ?? userData.avatar}
              alt={userData.name}
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full flex justify-center items-center bg-blue-500 text-white text-xl font-medium">
              {userData.name.slice(0, 1)}
            </div>
          )}
        </label>
        <Input
          control={control}
          name="name"
          label="Username"
          error={errors.name?.message as string | undefined}
          defaultValue={userData.name}
        />
        <Button type="submit" className="py-2 mt-10">
          Submit
        </Button>
      </form>
    </WrapperLeftMenu>
  )
}

export default EditProfiles
