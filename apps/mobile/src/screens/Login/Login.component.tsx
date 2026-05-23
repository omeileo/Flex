import React from 'react'

import { Pressable, ScrollView, Text, TextInput } from 'react-native'

import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import PasswordTextInput from '@shared/components/PasswordTextInput/PasswordTextInput.component'

import styles from './Login.styles'
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
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>{t('auth.login.title')}</Text>

      <Text style={styles.label}>{t('auth.login.email')}</Text>
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
            placeholder={t('auth.login.emailPlaceholder')}
          />
        )}
      />
      {errors.email ? <Text style={styles.error}>{t(String(errors.email.message))}</Text> : null}

      <Text style={styles.label}>{t('auth.login.password')}</Text>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <PasswordTextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            autoComplete="password"
            placeholder={t('auth.login.passwordPlaceholder')}
          />
        )}
      />
      {errors.password ? <Text style={styles.error}>{t(String(errors.password.message))}</Text> : null}

      <Pressable style={styles.forgotPasswordLink} onPress={() => onForgotPasswordPress(emailValue)}>
        <Text style={styles.forgotPasswordText}>{t('auth.login.forgotPassword')}</Text>
      </Pressable>

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}

      <Pressable style={styles.button} disabled={isSubmitting} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>{isSubmitting ? t('auth.login.submitting') : t('auth.login.submit')}</Text>
      </Pressable>

      <Pressable style={styles.link} onPress={onSignUpPress}>
        <Text style={styles.linkText}>{t('auth.login.goToSignUp')}</Text>
      </Pressable>
    </ScrollView>
  )
}

export default LoginComponent
