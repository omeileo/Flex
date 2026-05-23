import React from 'react'

import { Pressable, ScrollView, Text, TextInput } from 'react-native'

import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import styles from './ForgetPassword.styles'
import { ForgetPasswordComponentProps, ForgetPasswordFormValues } from './ForgetPassword.types'
import { forgetPasswordSchema } from './ForgetPassword.validation'

const ForgetPasswordComponent = ({
  isSubmitting,
  error,
  successMessage,
  defaultEmail,
  onSubmit,
  onLoginPress
}: ForgetPasswordComponentProps) => {
  const { t } = useTranslation()
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ForgetPasswordFormValues>({
    defaultValues: {
      email: defaultEmail
    },
    resolver: yupResolver(forgetPasswordSchema)
  })

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>{t('auth.forgetPassword.title')}</Text>
      <Text style={styles.subtitle}>{t('auth.forgetPassword.subtitle')}</Text>

      <Text style={styles.label}>{t('auth.forgetPassword.email')}</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
            placeholder={t('auth.forgetPassword.emailPlaceholder')}
          />
        )}
      />
      {errors.email ? <Text style={styles.error}>{t(String(errors.email.message))}</Text> : null}

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}

      <Pressable style={styles.button} disabled={isSubmitting} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>
          {isSubmitting ? t('auth.forgetPassword.submitting') : t('auth.forgetPassword.submit')}
        </Text>
      </Pressable>

      <Pressable style={styles.link} onPress={onLoginPress}>
        <Text style={styles.linkText}>{t('auth.forgetPassword.goToLogin')}</Text>
      </Pressable>
    </ScrollView>
  )
}

export default ForgetPasswordComponent
