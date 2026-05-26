import React from 'react'

import { Pressable, Text, View } from 'react-native'

import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'
import { useTranslation } from 'react-i18next'

import AuthBrandHeader from '@shared/components/AuthBrandHeader/AuthBrandHeader.component'
import AuthScreenShell from '@shared/components/AuthScreenShell/AuthScreenShell.component'
import FormTextField from '@shared/components/FormTextField/FormTextField.component'
import PrimaryButton from '@shared/components/PrimaryButton/PrimaryButton.component'
import VerificationCodeInput from '@shared/components/VerificationCodeInput/VerificationCodeInput.component'

import { createVerifyEmailStyles } from './VerifyEmail.styles'
import { VerifyEmailComponentProps } from './VerifyEmail.types'

const VerifyEmailComponent = ({
  email,
  code,
  isSubmitting,
  isResending,
  error,
  resendMessage,
  emailReadOnly,
  onEmailChange,
  onCodeChange,
  onSubmit,
  onResendPress,
  onLoginPress
}: VerifyEmailComponentProps) => {
  const styles = useThemedStyles(createVerifyEmailStyles)
  const { t } = useTranslation()

  return (
    <AuthScreenShell testID="verify-email-screen">
      <AuthBrandHeader />

      <Text style={styles.title} testID="verify-email-title">
        {t('auth.verifyEmail.title')}
      </Text>

      <Text style={styles.subtitle}>
        {email ? t('auth.verifyEmail.subtitleWithEmail', { email }) : t('auth.verifyEmail.subtitle')}
      </Text>

      <FormTextField
        label={t('auth.verifyEmail.email')}
        value={email}
        onChangeText={onEmailChange}
        editable={!emailReadOnly}
        keyboardType="email-address"
        autoComplete="email"
      />

      <Text style={styles.fieldLabel}>{t('auth.verifyEmail.code')}</Text>
      <VerificationCodeInput value={code} onChange={onCodeChange} />

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {resendMessage ? <Text style={styles.info}>{resendMessage}</Text> : null}

      <PrimaryButton
        label={t('auth.verifyEmail.submit')}
        onPress={onSubmit}
        loading={isSubmitting}
        style={styles.primaryButton}
      />

      <View style={styles.footer}>
        <Pressable disabled={isResending} onPress={onResendPress}>
          <Text style={[styles.linkText, styles.linkEmphasis]}>
            {isResending ? t('auth.verifyEmail.resending') : t('auth.verifyEmail.resend')}
          </Text>
        </Pressable>

        <Pressable onPress={onLoginPress}>
          <Text style={styles.linkText}>{t('auth.verifyEmail.goToLogin')}</Text>
        </Pressable>
      </View>
    </AuthScreenShell>
  )
}

export default VerifyEmailComponent
