import React, { useCallback } from 'react'

import { useNavigation } from '@react-navigation/native'
import { RootState } from '@redux/store/store.types'
import { ProfileNavigation } from '@router/navigators/ProfileStack.types'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import ConditionCard from '@shared/components/ConditionCard/ConditionCard.component'
import FlowScreenScaffold from '@shared/components/FlowScreenScaffold/FlowScreenScaffold.component'
import PrimaryButton from '@shared/components/PrimaryButton/PrimaryButton.component'

const WellnessOverviewContainer = () => {
  const { t } = useTranslation()
  const navigation = useNavigation<ProfileNavigation>()
  const conditions = useSelector((state: RootState) => state.wellness.conditions)

  const activeConditions = conditions.filter((condition) => condition.status !== 'recovered')

  const openCondition = useCallback(
    (conditionId: string) => {
      navigation.navigate('ConditionDetail', { conditionId })
    },
    [navigation]
  )

  return (
    <FlowScreenScaffold
      title={t('profileSettings.wellnessTitle')}
      subtitle={t('profileSettings.wellnessSubtitle')}
      testID="wellness-overview-screen"
      footer={<PrimaryButton label={t('profileSettings.addCondition')} onPress={() => undefined} />}
    >
      {activeConditions.map((condition) => (
        <ConditionCard
          key={condition.id}
          title={condition.label ?? condition.bodyArea}
          status={condition.status}
          subtitle={t('profileSettings.conditionSubtitle', {
            count: condition.aggravatingExercises.length
          })}
          onPress={() => openCondition(condition.id)}
        />
      ))}
    </FlowScreenScaffold>
  )
}

export default WellnessOverviewContainer
