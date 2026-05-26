import React from 'react'

import { Pressable, Text } from 'react-native'

import { yupResolver } from '@hookform/resolvers/yup'
import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import AuthBrandHeader from '@shared/components/AuthBrandHeader/AuthBrandHeader.component'
import AuthScreenShell from '@shared/components/AuthScreenShell/AuthScreenShell.component'
import FormTextField from '@shared/components/FormTextField/FormTextField.component'
import PrimaryButton from '@shared/components/PrimaryButton/PrimaryButton.component'

import { createForgetPasswordStyles } from './ForgetPassword.styles'
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
  const styles = useThemedStyles(createForgetPasswordStyles)
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
    <AuthScreenShell testID="forget-password-screen">
      <AuthBrandHeader tagline={t('auth.forgetPassword.tagline')} />

      <Text style={styles.title} testID="forget-password-title">
        {t('auth.forgetPassword.title')}
      </Text>

      <Text style={styles.subtitle}>{t('auth.forgetPassword.subtitle')}</Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <FormTextField
            label={t('auth.forgetPassword.email')}
            value={value}
            onChangeText={onChange}
            placeholder={t('auth.forgetPassword.emailPlaceholder')}
            keyboardType="email-address"
            autoComplete="email"
            error={errors.email ? t(String(errors.email.message)) : undefined}
          />
        )}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}

      <PrimaryButton
        label={t('auth.forgetPassword.submit')}
        onPress={handleSubmit(onSubmit)}
        loading={isSubmitting}
        style={styles.primaryButton}
      />

      <Pressable style={styles.linkRow} onPress={onLoginPress}>
        <Text style={styles.linkText}>{t('auth.forgetPassword.goToLogin')}</Text>
      </Pressable>
    </AuthScreenShell>
  )
}

export default ForgetPasswordComponent
