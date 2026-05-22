import React from 'react'
import { Text, View } from 'react-native'
import { useTranslation } from 'react-i18next'

import ErrorView from '@shared/components/ErrorView/ErrorView.component'
import LoadingView from '@shared/components/LoadingView/LoadingView.component'

import styles from './Profile.styles'
import { ProfileComponentProps } from './Profile.types'

const ProfileComponent = ({ profile, isLoading, error, onRefresh }: ProfileComponentProps) => {
  const { t } = useTranslation()

  if (isLoading && !profile) {
    return <LoadingView message={ t('profile.loading') } />
  }

  if (error) {
    return <ErrorView message={ error } onRetry={ onRefresh } retryLabel={ t('actions.retry') } />
  }

  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>{ t('profile.title') }</Text>
      <View style={ styles.card }>
        <Text style={ styles.label }>{ t('profile.goal') }</Text>
        <Text style={ styles.value }>{ profile?.goal ?? '-' }</Text>
      </View>
      <View style={ styles.card }>
        <Text style={ styles.label }>{ t('profile.experience') }</Text>
        <Text style={ styles.value }>{ profile?.experienceLevel ?? '-' }</Text>
      </View>
      <View style={ styles.card }>
        <Text style={ styles.label }>{ t('profile.schedule') }</Text>
        <Text style={ styles.value }>
          { t('profile.scheduleValue', {
            days: profile?.daysPerWeek ?? 0,
            minutes: profile?.sessionMinutes ?? 0,
          }) }
        </Text>
      </View>
    </View>
  )
}

export default ProfileComponent
