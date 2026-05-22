import React from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

import styles from './Login.styles';
import { LoginComponentProps, LoginFormValues } from './Login.types';
import { loginSchema } from './Login.validation';

const defaultValues: LoginFormValues = {
  email: '',
  password: '',
};

const LoginComponent = ({
  isSubmitting,
  error,
  successMessage,
  onSubmit,
  onSignUpPress,
}: LoginComponentProps) => {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues,
    resolver: yupResolver(loginSchema),
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
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
      {errors.email ? (
        <Text style={styles.error}>{t(String(errors.email.message))}</Text>
      ) : null}

      <Text style={styles.label}>{t('auth.login.password')}</Text>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            secureTextEntry
            autoComplete="password"
            placeholder={t('auth.login.passwordPlaceholder')}
          />
        )}
      />
      {errors.password ? (
        <Text style={styles.error}>{t(String(errors.password.message))}</Text>
      ) : null}

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {successMessage ? (
        <Text style={styles.success}>{successMessage}</Text>
      ) : null}

      <Pressable
        style={styles.button}
        disabled={isSubmitting}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.buttonText}>
          {isSubmitting ? t('auth.login.submitting') : t('auth.login.submit')}
        </Text>
      </Pressable>

      <Pressable style={styles.link} onPress={onSignUpPress}>
        <Text style={styles.linkText}>{t('auth.login.goToSignUp')}</Text>
      </Pressable>
    </ScrollView>
  );
};

export default LoginComponent;
