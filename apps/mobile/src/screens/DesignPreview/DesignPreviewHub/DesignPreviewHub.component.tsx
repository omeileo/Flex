import React from 'react'

import { ScrollView, Text, View } from 'react-native'

import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'
import { useTranslation } from 'react-i18next'

import PrimaryButton from '@shared/components/PrimaryButton/PrimaryButton.component'

import { createDesignPreviewHubStyles } from './DesignPreviewHub.styles'
import { DesignPreviewHubComponentProps } from './DesignPreviewHub.types'

const contentPaddingBottom = 48

const DesignPreviewHubComponent = ({
  onOpenOnboarding,
  onOpenTrainingPlan,
  onOpenPlanDetail,
  onOpenActiveWorkout,
  onOpenGymLocations,
  onOpenAuth,
  onOpenProfileSettings
}: DesignPreviewHubComponentProps) => {
  const styles = useThemedStyles(createDesignPreviewHubStyles)
  const { t } = useTranslation()

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: contentPaddingBottom }}>
      <Text style={styles.title}>{t('designPreview.hub.title')}</Text>
      <Text style={styles.subtitle}>{t('designPreview.hub.subtitle')}</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t('designPreview.hub.onboardingTitle')}</Text>
        <Text style={styles.cardMeta}>{t('designPreview.hub.onboardingMeta')}</Text>
        <PrimaryButton label={t('designPreview.hub.openFlow')} onPress={onOpenOnboarding} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t('designPreview.hub.trainingPlanTitle')}</Text>
        <Text style={styles.cardMeta}>{t('designPreview.hub.trainingPlanMeta')}</Text>
        <PrimaryButton label={t('designPreview.hub.openFlow')} onPress={onOpenTrainingPlan} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t('designPreview.hub.planDetailTitle')}</Text>
        <Text style={styles.cardMeta}>{t('designPreview.hub.planDetailMeta')}</Text>
        <PrimaryButton label={t('designPreview.hub.openFlow')} onPress={onOpenPlanDetail} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t('designPreview.hub.activeWorkoutTitle')}</Text>
        <Text style={styles.cardMeta}>{t('designPreview.hub.activeWorkoutMeta')}</Text>
        <PrimaryButton label={t('designPreview.hub.openFlow')} onPress={onOpenActiveWorkout} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t('designPreview.hub.gymLocationsTitle')}</Text>
        <Text style={styles.cardMeta}>{t('designPreview.hub.gymLocationsMeta')}</Text>
        <PrimaryButton label={t('designPreview.hub.openFlow')} onPress={onOpenGymLocations} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t('designPreview.hub.authTitle')}</Text>
        <Text style={styles.cardMeta}>{t('designPreview.hub.authMeta')}</Text>
        <PrimaryButton label={t('designPreview.hub.openFlow')} onPress={onOpenAuth} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t('designPreview.hub.profileSettingsTitle')}</Text>
        <Text style={styles.cardMeta}>{t('designPreview.hub.profileSettingsMeta')}</Text>
        <PrimaryButton label={t('designPreview.hub.openFlow')} onPress={onOpenProfileSettings} />
      </View>
    </ScrollView>
  )
}

export default DesignPreviewHubComponent
