import React from 'react'

import { Pressable, ScrollView, Text, TextInput, View } from 'react-native'

import { yupResolver } from '@hookform/resolvers/yup'
import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { createProfileOnboardingStyles } from './ProfileOnboarding.styles'
import { ProfileOnboardingComponentProps, ProfileOnboardingFormValues } from './ProfileOnboarding.types'
import { profileOnboardingSchema } from './ProfileOnboarding.validation'

const defaultValues: ProfileOnboardingFormValues = {
  goal: '',
  experienceLevel: 'beginner',
  daysPerWeek: 3,
  sessionMinutes: 45,
  equipment: [],
  injuries: []
}

const ProfileOnboardingComponent = ({ isSubmitting, error, onSubmit }: ProfileOnboardingComponentProps) => {
  const styles = useThemedStyles(createProfileOnboardingStyles)
  const { t } = useTranslation()
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ProfileOnboardingFormValues>({
    defaultValues,
    resolver: yupResolver(profileOnboardingSchema)
  })

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>{t('profileOnboarding.title')}</Text>
      <Text style={styles.label}>{t('profileOnboarding.goal')}</Text>
      <Controller
        control={control}
        name="goal"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            placeholder={t('profileOnboarding.goalPlaceholder')}
          />
        )}
      />
      {errors.goal ? <Text style={styles.error}>{t(String(errors.goal.message))}</Text> : null}

      <Text style={styles.label}>{t('profileOnboarding.experience')}</Text>
      <Controller
        control={control}
        name="experienceLevel"
        render={({ field: { onChange, value } }) => (
          <View style={styles.experienceRow}>
            {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
              <Pressable
                key={level}
                style={[styles.input, value === level ? styles.experienceOptionSelected : styles.experienceOption]}
                onPress={() => onChange(level)}
              >
                <Text>{t(`profileOnboarding.experienceLevels.${level}`)}</Text>
              </Pressable>
            ))}
          </View>
        )}
      />

      <Text style={styles.label}>{t('profileOnboarding.daysPerWeek')}</Text>
      <Controller
        control={control}
        name="daysPerWeek"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={String(value)}
            onChangeText={(text) => onChange(Number(text) || 0)}
          />
        )}
      />

      <Text style={styles.label}>{t('profileOnboarding.sessionMinutes')}</Text>
      <Controller
        control={control}
        name="sessionMinutes"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={String(value)}
            onChangeText={(text) => onChange(Number(text) || 0)}
          />
        )}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable style={styles.button} disabled={isSubmitting} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>
          {isSubmitting ? t('profileOnboarding.saving') : t('profileOnboarding.submit')}
        </Text>
      </Pressable>
    </ScrollView>
  )
}

export default ProfileOnboardingComponent
