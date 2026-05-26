import React from 'react'

import { Pressable, Text, View } from 'react-native'

import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'
import { useTranslation } from 'react-i18next'

import AuthBrandHeader from '@shared/components/AuthBrandHeader/AuthBrandHeader.component'
import AuthScreenShell from '@shared/components/AuthScreenShell/AuthScreenShell.component'
import PrimaryButton from '@shared/components/PrimaryButton/PrimaryButton.component'

import { createLandingStyles } from './Landing.styles'
import { LandingComponentProps } from './Landing.types'

const LandingComponent = ({ onLogin, onSignUp, onDesignPreview, showDesignPreview }: LandingComponentProps) => {
  const styles = useThemedStyles(createLandingStyles)
  const { t } = useTranslation()

  return (
    <AuthScreenShell testID="landing-screen" variant="hero">
      <View style={styles.hero}>
        <AuthBrandHeader tagline={t('landing.tagline')} />
      </View>

      <PrimaryButton label={t('landing.login')} onPress={onLogin} style={styles.primaryButton} />

      <Pressable style={styles.secondaryButton} onPress={onSignUp}>
        <Text style={styles.secondaryButtonText}>{t('landing.signUp')}</Text>
      </Pressable>

      {showDesignPreview && onDesignPreview ? (
        <Pressable style={styles.devButton} onPress={onDesignPreview}>
          <Text style={styles.devButtonText}>{t('landing.designPreview')}</Text>
        </Pressable>
      ) : null}
    </AuthScreenShell>
  )
}

export default LandingComponent
