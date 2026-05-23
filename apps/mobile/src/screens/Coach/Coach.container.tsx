import React from 'react'

import { useTranslation } from 'react-i18next'

import CoachComponent from './Coach.component'

const CoachContainer = () => {
  const { t } = useTranslation()

  return <CoachComponent title={t('coach.title')} message={t('coach.comingSoon')} />
}

export default CoachContainer
