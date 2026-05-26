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

import { createLoginStyles } from './Login.styles'
import { LoginComponentProps, LoginFormValues } from './Login.types'
import { loginSchema } from './Login.validation'

const defaultValues: LoginFormValues = {
  email: '',
  password: ''
}

const LoginComponent = ({
  isSubmitting,
  error,
  successMessage,
  onSubmit,
  onSignUpPress,
  onForgotPasswordPress
}: LoginComponentProps) => {
  const styles = useThemedStyles(createLoginStyles)
  const { t } = useTranslation()
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<LoginFormValues>({
    defaultValues,
    resolver: yupResolver(loginSchema)
  })

  const emailValue = watch('email')

  return (
    <AuthScreenShell testID="login-screen">
      <AuthBrandHeader tagline={t('auth.login.tagline')} />

      <Text style={styles.title} testID="login-title">
        {t('auth.login.title')}
      </Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <FormTextField
            label={t('auth.login.email')}
            value={value}
            onChangeText={onChange}
            placeholder={t('auth.login.emailPlaceholder')}
            keyboardType="email-address"
            autoComplete="email"
            error={errors.email ? t(String(errors.email.message)) : undefined}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <FormTextField
            label={t('auth.login.password')}
            value={value}
            onChangeText={onChange}
            placeholder={t('auth.login.passwordPlaceholder')}
            secureTextEntry
            autoComplete="password"
            error={errors.password ? t(String(errors.password.message)) : undefined}
          />
        )}
      />

      <Pressable style={styles.forgotPasswordLink} onPress={() => onForgotPasswordPress(emailValue)}>
        <Text style={styles.forgotPasswordText}>{t('auth.login.forgotPassword')}</Text>
      </Pressable>

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}

      <PrimaryButton
        label={t('auth.login.submit')}
        onPress={handleSubmit(onSubmit)}
        loading={isSubmitting}
        style={styles.primaryButton}
      />

      <Pressable style={styles.linkRow} onPress={onSignUpPress}>
        <Text style={styles.linkText}>
          {t('auth.login.needAccount')}
          <Text style={styles.linkEmphasis}>{t('auth.login.signUpLink')}</Text>
        </Text>
      </Pressable>
    </AuthScreenShell>
  )
}

export default LoginComponent
