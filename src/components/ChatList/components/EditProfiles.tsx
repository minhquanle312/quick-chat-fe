import React, { useState } from 'react'

import { Button, Input } from '@common'
import { useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import useAuth from '@hooks/useAuth'
import { BsArrowLeft } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import useUserApi from '@/api/useUserApi'

interface EditProfilesProps extends React.HTMLAttributes<HTMLFormElement> {
  setEditProfiles: any
}

const schema = yup.object().shape({
  name: yup.string().required('Username is required'),
})

const EditProfiles: React.FC<EditProfilesProps> = ({ setEditProfiles }) => {
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
      await updateCurrentUser({
        name: data.name,
        avatar: avatar || null,
      })
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
    <div className="flex flex-col w-3/12 text-primary p-3">
      <div className="py-1 my-1 border-b border-gray-500">
        <div
          className="flex justify-center items-center w-10 h-10 hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer rounded-full select-none"
          onClick={() => setEditProfiles(false)}
        >
          <BsArrowLeft size={'1.2rem'} />
        </div>
      </div>
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
    </div>
  )
}

export default EditProfiles
