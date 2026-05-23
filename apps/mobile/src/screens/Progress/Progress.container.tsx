import React from 'react'

import { useTranslation } from 'react-i18next'

import ProgressComponent from './Progress.component'

const ProgressContainer = () => {
  const { t } = useTranslation()

  return <ProgressComponent title={t('progress.title')} message={t('progress.comingSoon')} />
}

export default ProgressContainer
