import React, { useCallback, useEffect } from 'react'

import { getProfile } from '@redux/states/profile/getProfile/getProfile.slice'
import { AppDispatch, RootState } from '@redux/store/store.types'
import { useDispatch, useSelector } from 'react-redux'

import ProfileComponent from './Profile.component'

const ProfileContainer = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { loading, success, error } = useSelector((state: RootState) => state.getProfile)

  const loadProfile = useCallback(() => {
    dispatch(getProfile())
  }, [dispatch])

  useEffect(() => {
    loadProfile()
  }, [loadProfile])

  return <ProfileComponent profile={success} isLoading={loading} error={error} onRefresh={loadProfile} />
}

export default ProfileContainer
