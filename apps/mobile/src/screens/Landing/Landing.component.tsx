import React from 'react'

import { Pressable, Text, View } from 'react-native'

import { useTranslation } from 'react-i18next'

import styles from './Landing.styles'
import { LandingComponentProps } from './Landing.types'

const LandingComponent = ({ onLogin, onSignUp, onDesignPreview, showDesignPreview }: LandingComponentProps) => {
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <Text style={styles.brand}>{t('landing.brand')}</Text>
      <Text style={styles.tagline}>{t('landing.tagline')}</Text>

      <Pressable style={styles.primaryButton} onPress={onLogin}>
        <Text style={styles.primaryButtonText}>{t('landing.login')}</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={onSignUp}>
        <Text style={styles.secondaryButtonText}>{t('landing.signUp')}</Text>
      </Pressable>

      {showDesignPreview && onDesignPreview ? (
        <Pressable style={styles.devButton} onPress={onDesignPreview}>
          <Text style={styles.devButtonText}>{t('landing.designPreview')}</Text>
        </Pressable>
      ) : null}
    </View>
  )
}

export default LandingComponent
