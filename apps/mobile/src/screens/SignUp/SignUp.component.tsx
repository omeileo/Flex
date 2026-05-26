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

import { createSignUpStyles } from './SignUp.styles'
import { SignUpComponentProps, SignUpFormValues } from './SignUp.types'
import { signUpSchema } from './SignUp.validation'

const defaultValues: SignUpFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
}

const SignUpComponent = ({ isSubmitting, error, successMessage, onSubmit, onLoginPress }: SignUpComponentProps) => {
  const styles = useThemedStyles(createSignUpStyles)
  const { t } = useTranslation()
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpFormValues>({
    defaultValues,
    resolver: yupResolver(signUpSchema)
  })

  return (
    <AuthScreenShell testID="signup-screen">
      <AuthBrandHeader tagline={t('auth.signUp.tagline')} />

      <Text style={styles.title} testID="signup-title">
        {t('auth.signUp.title')}
      </Text>

      <Controller
        control={control}
        name="firstName"
        render={({ field: { onChange, value } }) => (
          <FormTextField
            label={t('auth.signUp.firstName')}
            value={value}
            onChangeText={onChange}
            autoCapitalize="words"
            autoComplete="given-name"
            error={errors.firstName ? t(String(errors.firstName.message)) : undefined}
          />
        )}
      />

      <Controller
        control={control}
        name="lastName"
        render={({ field: { onChange, value } }) => (
          <FormTextField
            label={t('auth.signUp.lastName')}
            value={value}
            onChangeText={onChange}
            autoCapitalize="words"
            autoComplete="family-name"
            error={errors.lastName ? t(String(errors.lastName.message)) : undefined}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <FormTextField
            label={t('auth.signUp.email')}
            value={value}
            onChangeText={onChange}
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
            label={t('auth.signUp.password')}
            value={value}
            onChangeText={onChange}
            placeholder={t('auth.signUp.passwordHint')}
            secureTextEntry
            autoComplete="new-password"
            error={errors.password ? t(String(errors.password.message)) : undefined}
          />
        )}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}

      <PrimaryButton
        label={t('auth.signUp.submit')}
        onPress={handleSubmit(onSubmit)}
        loading={isSubmitting}
        style={styles.primaryButton}
      />

      <Pressable style={styles.linkRow} onPress={onLoginPress}>
        <Text style={styles.linkText}>
          {t('auth.signUp.haveAccount')}
          <Text style={styles.linkEmphasis}>{t('auth.signUp.signInLink')}</Text>
        </Text>
      </Pressable>
    </AuthScreenShell>
  )
}

export default SignUpComponent
