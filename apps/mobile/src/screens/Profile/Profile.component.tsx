import React from 'react'

import { ScrollView, Text, View } from 'react-native'

import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'
import { useTranslation } from 'react-i18next'

import ErrorView from '@shared/components/ErrorView/ErrorView.component'
import LoadingView from '@shared/components/LoadingView/LoadingView.component'
import ProfileSectionRow from '@shared/components/ProfileSectionRow/ProfileSectionRow.component'
import ThemeSwatchRow from '@shared/components/ThemeSwatchRow/ThemeSwatchRow.component'

import { createProfileStyles } from './Profile.styles'
import { ProfileComponentProps } from './Profile.types'

const ProfileComponent = ({
  displayName,
  initials,
  memberSince,
  goalsPreview,
  gymPreview,
  wellnessPreview,
  cyclePreview,
  excludedPreview,
  dietPreview,
  agePreview,
  themePreview,
  themeMode,
  isLoading,
  error,
  profile,
  onRefresh,
  onNavigateGoals,
  onNavigateGymLocations,
  onNavigateWellness,
  onNavigateCycle,
  onNavigateExcluded,
  onNavigateAppearance
}: ProfileComponentProps) => {
  const styles = useThemedStyles(createProfileStyles)
  const { t } = useTranslation()

  if (isLoading && !profile) {
    return <LoadingView message={t('profileSettings.loading')} />
  }

  if (error) {
    return <ErrorView message={error} onRetry={onRefresh} retryLabel={t('actions.retry')} />
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} testID="training-profile-screen">
      <Text style={styles.title} testID="training-profile-title">
        {t('profileSettings.hubTitle')}
      </Text>

      <View style={styles.hero}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <View>
          <Text style={styles.heroName}>{displayName}</Text>
          <Text style={styles.heroMeta}>{memberSince}</Text>
        </View>
      </View>

      <Text style={styles.sectionLabel}>{t('profileSettings.appSection')}</Text>
      <ProfileSectionRow
        title={t('profileSettings.appearanceRow')}
        preview={themePreview}
        onPress={onNavigateAppearance}
        testID="profile-row-appearance"
        trailing={<ThemeSwatchRow modes={['light', 'dark', 'pink']} activeMode={themeMode} />}
      />

      <Text style={styles.sectionLabel}>{t('profileSettings.trainingSection')}</Text>
      <ProfileSectionRow
        title={t('profileSettings.goalsRow')}
        preview={goalsPreview}
        onPress={onNavigateGoals}
        testID="profile-row-goals"
      />
      <ProfileSectionRow
        title={t('profileSettings.gymRow')}
        preview={gymPreview}
        onPress={onNavigateGymLocations}
        testID="profile-row-gym-locations"
      />

      <Text style={styles.sectionLabel}>{t('profileSettings.wellnessSection')}</Text>
      <ProfileSectionRow
        title={t('profileSettings.wellnessRow')}
        preview={wellnessPreview}
        onPress={onNavigateWellness}
        testID="profile-row-wellness"
      />
      <ProfileSectionRow
        title={t('profileSettings.cycleRow')}
        preview={cyclePreview}
        onPress={onNavigateCycle}
        testID="profile-row-cycle"
      />
      <ProfileSectionRow
        title={t('profileSettings.excludedRow')}
        preview={excludedPreview}
        onPress={onNavigateExcluded}
        testID="profile-row-excluded"
      />

      <Text style={styles.sectionLabel}>{t('profileSettings.bodySection')}</Text>
      <ProfileSectionRow title={t('profileSettings.dietRow')} preview={dietPreview} onPress={() => undefined} />
      <ProfileSectionRow title={t('profileSettings.ageRow')} preview={agePreview} onPress={() => undefined} />

      <Text style={styles.footerNote}>{t('profileSettings.footerNote')}</Text>
    </ScrollView>
  )
}

export default ProfileComponent
