import React from 'react';
import { Pressable, ScrollView, Text, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';

import styles from './VerifyEmail.styles';
import { VerifyEmailComponentProps } from './VerifyEmail.types';

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
  onLoginPress,
}: VerifyEmailComponentProps) => {
  const { t } = useTranslation();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <Text style={styles.title}>{t('auth.verifyEmail.title')}</Text>
      <Text style={styles.subtitle}>{t('auth.verifyEmail.subtitle')}</Text>

      <Text style={styles.label}>{t('auth.verifyEmail.email')}</Text>
      <TextInput
        style={[styles.input, emailReadOnly ? styles.inputReadOnly : null]}
        value={email}
        onChangeText={onEmailChange}
        editable={!emailReadOnly}
        autoCapitalize="none"
        keyboardType="email-address"
        autoComplete="email"
      />

      <Text style={styles.label}>{t('auth.verifyEmail.code')}</Text>
      <TextInput
        style={[styles.input, styles.codeInput]}
        value={code}
        onChangeText={onCodeChange}
        autoCapitalize="characters"
        maxLength={6}
        autoComplete="one-time-code"
        textContentType="oneTimeCode"
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {resendMessage ? <Text style={styles.info}>{resendMessage}</Text> : null}

      <Pressable
        style={styles.button}
        disabled={isSubmitting}
        onPress={onSubmit}
      >
        <Text style={styles.buttonText}>
          {isSubmitting
            ? t('auth.verifyEmail.submitting')
            : t('auth.verifyEmail.submit')}
        </Text>
      </Pressable>

      <Pressable
        style={styles.link}
        disabled={isResending}
        onPress={onResendPress}
      >
        <Text style={styles.linkText}>
          {isResending
            ? t('auth.verifyEmail.resending')
            : t('auth.verifyEmail.resend')}
        </Text>
      </Pressable>

      <Pressable style={styles.link} onPress={onLoginPress}>
        <Text style={styles.linkText}>{t('auth.verifyEmail.goToLogin')}</Text>
      </Pressable>
    </ScrollView>
  );
};

export default VerifyEmailComponent;
