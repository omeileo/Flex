import React, { useCallback, useState } from 'react'

import { Pressable, ScrollView, Text, View } from 'react-native'

import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'
import { useTranslation } from 'react-i18next'

import AuthBrandHeader from '@shared/components/AuthBrandHeader/AuthBrandHeader.component'
import FormTextField from '@shared/components/FormTextField/FormTextField.component'
import PrimaryButton from '@shared/components/PrimaryButton/PrimaryButton.component'
import VerificationCodeInput from '@shared/components/VerificationCodeInput/VerificationCodeInput.component'

import { createAuthFlowPreviewStyles } from './AuthFlowPreview.styles'
import { AuthFlowPreviewComponentProps, AuthFlowView } from './AuthFlowPreview.types'

const AuthFlowPreviewComponent = (_props: AuthFlowPreviewComponentProps) => {
  const styles = useThemedStyles(createAuthFlowPreviewStyles)
  const { t } = useTranslation()
  const [view, setView] = useState<AuthFlowView>('signIn')
  const [email, setEmail] = useState('you@example.com')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [code, setCode] = useState('ABC')

  const renderViewChip = useCallback(
    (chipView: AuthFlowView, label: string) => {
      const isActive = view === chipView

      return (
        <Pressable
          key={chipView}
          style={[styles.viewChip, isActive && styles.viewChipActive]}
          onPress={() => setView(chipView)}
        >
          <Text style={[styles.viewChipText, isActive && styles.viewChipTextActive]}>{label}</Text>
        </Pressable>
      )
    },
    [view]
  )

  const renderSignIn = () => (
    <>
      <AuthBrandHeader />
      <Text style={styles.title}>{t('auth.login.title')}</Text>
      <Text style={styles.subtitle}>{t('designPreview.auth.signInTagline')}</Text>
      <FormTextField
        label={t('auth.login.email')}
        value={email}
        onChangeText={setEmail}
        placeholder={t('auth.login.emailPlaceholder')}
        keyboardType="email-address"
        autoComplete="email"
      />
      <FormTextField
        label={t('auth.login.password')}
        value={password}
        onChangeText={setPassword}
        placeholder={t('auth.login.passwordPlaceholder')}
        secureTextEntry
        autoComplete="password"
      />
      <Pressable style={styles.forgotPasswordLink} onPress={() => undefined}>
        <Text style={styles.forgotPasswordText}>{t('auth.login.forgotPassword')}</Text>
      </Pressable>
      <PrimaryButton label={t('auth.login.submit')} onPress={() => undefined} />
      <Pressable style={styles.linkRow} onPress={() => setView('signUp')}>
        <Text style={styles.linkText}>
          {t('designPreview.auth.needAccount')}
          <Text style={styles.linkEmphasis}>{t('designPreview.auth.signUpLink')}</Text>
        </Text>
      </Pressable>
    </>
  )

  const renderSignUp = () => (
    <>
      <AuthBrandHeader />
      <Text style={styles.title}>{t('auth.signUp.title')}</Text>
      <Text style={styles.subtitle}>{t('designPreview.auth.signUpTagline')}</Text>
      <FormTextField
        label={t('auth.signUp.firstName')}
        value={firstName}
        onChangeText={setFirstName}
        autoCapitalize="words"
        autoComplete="given-name"
      />
      <FormTextField
        label={t('auth.signUp.lastName')}
        value={lastName}
        onChangeText={setLastName}
        autoCapitalize="words"
        autoComplete="family-name"
      />
      <FormTextField
        label={t('auth.signUp.email')}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoComplete="email"
      />
      <FormTextField
        label={t('auth.signUp.password')}
        value={password}
        onChangeText={setPassword}
        placeholder={t('designPreview.auth.passwordHint')}
        secureTextEntry
        autoComplete="new-password"
      />
      <PrimaryButton label={t('auth.signUp.submit')} onPress={() => setView('verify')} />
      <Pressable style={styles.linkRow} onPress={() => setView('signIn')}>
        <Text style={styles.linkText}>
          {t('designPreview.auth.haveAccount')}
          <Text style={styles.linkEmphasis}>{t('designPreview.auth.signInLink')}</Text>
        </Text>
      </Pressable>
    </>
  )

  const renderVerify = () => (
    <>
      <AuthBrandHeader />
      <Text style={styles.title}>{t('auth.verifyEmail.title')}</Text>
      <Text style={styles.subtitle}>{t('auth.verifyEmail.subtitle')}</Text>
      <FormTextField
        label={t('auth.verifyEmail.email')}
        value={email}
        onChangeText={setEmail}
        editable={false}
        keyboardType="email-address"
        autoComplete="email"
      />
      <Text style={styles.fieldLabel}>{t('auth.verifyEmail.code')}</Text>
      <VerificationCodeInput value={code} onChange={setCode} />
      <PrimaryButton label={t('auth.verifyEmail.submit')} onPress={() => undefined} />
      <View style={styles.footer}>
        <Pressable onPress={() => undefined}>
          <Text style={[styles.linkText, styles.linkEmphasis]}>{t('auth.verifyEmail.resend')}</Text>
        </Pressable>
        <Pressable onPress={() => setView('signIn')}>
          <Text style={styles.linkText}>{t('auth.verifyEmail.goToLogin')}</Text>
        </Pressable>
      </View>
    </>
  )

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.viewChips}>
        {renderViewChip('signIn', t('designPreview.auth.signInChip'))}
        {renderViewChip('signUp', t('designPreview.auth.signUpChip'))}
        {renderViewChip('verify', t('designPreview.auth.verifyChip'))}
      </View>
      {view === 'signIn' ? renderSignIn() : null}
      {view === 'signUp' ? renderSignUp() : null}
      {view === 'verify' ? renderVerify() : null}
    </ScrollView>
  )
}

export default AuthFlowPreviewComponent
