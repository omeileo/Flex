import React from 'react'
import { Pressable, ScrollView, Text, TextInput } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'react-i18next'

import styles from './SignUp.styles'
import { SignUpComponentProps, SignUpFormValues } from './SignUp.types'
import { signUpSchema } from './SignUp.validation'

const defaultValues: SignUpFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
}

const SignUpComponent = ({
  isSubmitting,
  error,
  successMessage,
  onSubmit,
  onLoginPress
}: SignUpComponentProps) => {
  const { t } = useTranslation()
  const { control, handleSubmit, formState: { errors } } = useForm<SignUpFormValues>({
    defaultValues,
    resolver: yupResolver(signUpSchema)
  })

  return (
    <ScrollView style={ styles.container } contentContainerStyle={{ paddingBottom: 48 }}>
      <Text style={ styles.title }>{ t('auth.signUp.title') }</Text>

      <Text style={ styles.label }>{ t('auth.signUp.firstName') }</Text>
      <Controller
        control={ control }
        name='firstName'
        render={ ({ field: { onChange, value } }) => (
          <TextInput
            style={ styles.input }
            value={ value }
            onChangeText={ onChange }
            autoComplete='given-name'
          />
        ) }
      />
      { errors.firstName ? <Text style={ styles.error }>{ t(String(errors.firstName.message)) }</Text> : null }

      <Text style={ styles.label }>{ t('auth.signUp.lastName') }</Text>
      <Controller
        control={ control }
        name='lastName'
        render={ ({ field: { onChange, value } }) => (
          <TextInput
            style={ styles.input }
            value={ value }
            onChangeText={ onChange }
            autoComplete='family-name'
          />
        ) }
      />
      { errors.lastName ? <Text style={ styles.error }>{ t(String(errors.lastName.message)) }</Text> : null }

      <Text style={ styles.label }>{ t('auth.signUp.email') }</Text>
      <Controller
        control={ control }
        name='email'
        render={ ({ field: { onChange, value } }) => (
          <TextInput
            style={ styles.input }
            value={ value }
            onChangeText={ onChange }
            autoCapitalize='none'
            keyboardType='email-address'
            autoComplete='email'
          />
        ) }
      />
      { errors.email ? <Text style={ styles.error }>{ t(String(errors.email.message)) }</Text> : null }

      <Text style={ styles.label }>{ t('auth.signUp.password') }</Text>
      <Controller
        control={ control }
        name='password'
        render={ ({ field: { onChange, value } }) => (
          <TextInput
            style={ styles.input }
            value={ value }
            onChangeText={ onChange }
            secureTextEntry
            autoComplete='new-password'
          />
        ) }
      />
      { errors.password ? <Text style={ styles.error }>{ t(String(errors.password.message)) }</Text> : null }

      { error ? <Text style={ styles.error }>{ error }</Text> : null }
      { successMessage ? <Text style={ styles.success }>{ successMessage }</Text> : null }

      <Pressable style={ styles.button } disabled={ isSubmitting } onPress={ handleSubmit(onSubmit) }>
        <Text style={ styles.buttonText }>
          { isSubmitting ? t('auth.signUp.submitting') : t('auth.signUp.submit') }
        </Text>
      </Pressable>

      <Pressable style={ styles.link } onPress={ onLoginPress }>
        <Text style={ styles.linkText }>{ t('auth.signUp.goToLogin') }</Text>
      </Pressable>
    </ScrollView>
  )
}

export default SignUpComponent
