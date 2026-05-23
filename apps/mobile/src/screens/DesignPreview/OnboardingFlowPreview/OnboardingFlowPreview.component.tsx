import React, { useCallback, useMemo, useState } from 'react'

import { ActivityIndicator, Pressable, ScrollView, Text, TextInput, View } from 'react-native'

import {
  commonEquipmentIds,
  equipmentPickerCategories,
  locationPresetOptions,
  predefinedEquipmentCatalog
} from '@shared/dictionary/equipmentCatalog.dictionary'
import { colors } from '@shared/styles/StyleConstants'
import { EquipmentPresetType, WorkoutLocation } from '@shared/types/workoutEquipment.types'
import { useTranslation } from 'react-i18next'

import CoachNote from '@shared/components/CoachNote/CoachNote.component'
import CustomEquipmentInput from '@shared/components/CustomEquipmentInput/CustomEquipmentInput.component'
import EquipmentPickerSheet from '@shared/components/EquipmentPickerSheet/EquipmentPickerSheet.component'
import LocationCard from '@shared/components/LocationCard/LocationCard.component'
import PrimaryButton from '@shared/components/PrimaryButton/PrimaryButton.component'
import ProgressHeader from '@shared/components/ProgressHeader/ProgressHeader.component'
import SelectionCard from '@shared/components/SelectionCard/SelectionCard.component'

import {
  ageBands,
  dietPreferences,
  injuryAreas,
  injuryStateOptions,
  onboardingGoals,
  restrictionMovements
} from '../designPreviewMock.data'
import styles from './OnboardingFlowPreview.styles'
import { InjuryStateId, OnboardingFlowPreviewComponentProps } from './OnboardingFlowPreview.types'

const TOTAL_STEPS = 11
const PROFILE_GYM_STEPS = 9
const FITNESS_LEVELS = ['Beginner', 'Intermediate', 'Advanced']
const LOADER_STEP = 10

const OnboardingFlowPreviewComponent = ({ onComplete, onViewPlan }: OnboardingFlowPreviewComponentProps) => {
  const { t } = useTranslation()
  const [step, setStep] = useState(1)
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [selectedInjuries, setSelectedInjuries] = useState<string[]>([])
  const [injuryState, setInjuryState] = useState<InjuryStateId | null>(null)
  const [restrictions, setRestrictions] = useState<string[]>([])
  const [selectedDiet, setSelectedDiet] = useState<string | null>(null)
  const [calorieTarget, setCalorieTarget] = useState('')
  const [selectedAge, setSelectedAge] = useState<string | null>(null)
  const [fitnessLevel, setFitnessLevel] = useState(1)
  const [locationName, setLocationName] = useState('')
  const [locationPreset, setLocationPreset] = useState<EquipmentPresetType | null>(null)
  const [selectedEquipmentIds, setSelectedEquipmentIds] = useState<string[]>([])
  const [customEquipmentLabels, setCustomEquipmentLabels] = useState<string[]>([])
  const [equipmentCategory, setEquipmentCategory] = useState('All')
  const [savedLocations, setSavedLocations] = useState<WorkoutLocation[]>([])
  const [defaultLocationId, setDefaultLocationId] = useState<string | null>(null)
  const [customModalOpen, setCustomModalOpen] = useState(false)

  const toggleSelection = useCallback((value: string, list: string[], setter: (next: string[]) => void) => {
    if (list.includes(value)) {
      setter(list.filter((item) => item !== value))

      return
    }

    setter([...list, value])
  }, [])

  const toggleGoal = useCallback(
    (goal: string) => {
      toggleSelection(goal, selectedGoals, setSelectedGoals)
    },
    [selectedGoals, toggleSelection]
  )

  const toggleInjury = useCallback(
    (area: string) => {
      if (area === 'None') {
        setSelectedInjuries(['None'])

        return
      }

      const withoutNone = selectedInjuries.filter((item) => item !== 'None')
      toggleSelection(area, withoutNone, setSelectedInjuries)
    },
    [selectedInjuries, toggleSelection]
  )

  const toggleRestriction = useCallback(
    (movement: string) => {
      toggleSelection(movement, restrictions, setRestrictions)
    },
    [restrictions, toggleSelection]
  )

  const toggleEquipment = useCallback(
    (id: string) => {
      toggleSelection(id, selectedEquipmentIds, setSelectedEquipmentIds)
    },
    [selectedEquipmentIds, toggleSelection]
  )

  const saveCurrentLocation = useCallback(() => {
    const trimmed = locationName.trim()

    if (!trimmed || !locationPreset) {
      return null
    }

    const id = `loc-${Date.now()}`
    const location: WorkoutLocation = {
      id,
      name: trimmed,
      presetType: locationPreset,
      isDefault: savedLocations.length === 0,
      equipment: [
        ...selectedEquipmentIds.map((predefinedId) => ({
          predefinedId,
          categoryTags: [predefinedEquipmentCatalog.find((e) => e.id === predefinedId)?.category ?? 'Accessories']
        })),
        ...customEquipmentLabels.map((customLabel) => ({
          customLabel,
          categoryTags: ['Accessories']
        }))
      ]
    }

    setSavedLocations((current) => [...current, location])

    if (!defaultLocationId) {
      setDefaultLocationId(id)
    }

    return location
  }, [
    customEquipmentLabels,
    defaultLocationId,
    locationName,
    locationPreset,
    savedLocations.length,
    selectedEquipmentIds
  ])

  const resetLocationForm = useCallback(() => {
    setLocationName('')
    setLocationPreset(null)
    setSelectedEquipmentIds([])
    setCustomEquipmentLabels([])
    setEquipmentCategory('All')
  }, [])

  const canContinue = useMemo(() => {
    switch (step) {
      case 1:
        return selectedGoals.length > 0
      case 3:
        return injuryState !== null
      case 5:
        return selectedAge !== null
      case 7:
        return locationName.trim().length > 0 && locationPreset !== null
      case 9:
        return savedLocations.length > 0 && defaultLocationId !== null
      default:
        return true
    }
  }, [
    defaultLocationId,
    injuryState,
    locationName,
    locationPreset,
    savedLocations.length,
    selectedAge,
    selectedGoals.length,
    step
  ])

  const handleContinue = useCallback(() => {
    if (step < TOTAL_STEPS) {
      setStep((current) => current + 1)

      return
    }

    onComplete()
  }, [onComplete, step])

  const handleSkipInjury = useCallback(() => {
    setSelectedInjuries(['None'])
    setStep(3)
  }, [])

  const handleSaveEquipment = useCallback(() => {
    saveCurrentLocation()
    setStep(9)
  }, [saveCurrentLocation])

  const handleAddAnotherLocation = useCallback(() => {
    saveCurrentLocation()
    resetLocationForm()
    setStep(7)
  }, [resetLocationForm, saveCurrentLocation])

  const renderProgress = (current: number) =>
    current <= PROFILE_GYM_STEPS ? <ProgressHeader currentStep={current} totalSteps={PROFILE_GYM_STEPS} /> : null

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            {renderProgress(1)}
            <Text style={styles.headline}>{t('designPreview.onboarding.goalHeadline')}</Text>
            <Text style={styles.subcopy}>{t('designPreview.onboarding.goalSubcopy')}</Text>
            <View style={styles.chipGrid}>
              {onboardingGoals.map((goal) => (
                <SelectionCard
                  key={goal}
                  label={goal}
                  selected={selectedGoals.includes(goal)}
                  onPress={() => toggleGoal(goal)}
                  style={styles.chip}
                />
              ))}
            </View>
          </>
        )

      case 2:
        return (
          <>
            {renderProgress(2)}
            <Text style={styles.headline}>{t('designPreview.onboarding.injuryHeadline')}</Text>
            <View style={styles.chipGrid}>
              {injuryAreas.map((area) => (
                <SelectionCard
                  key={area}
                  label={area}
                  selected={selectedInjuries.includes(area)}
                  onPress={() => toggleInjury(area)}
                  style={styles.chip}
                />
              ))}
            </View>
            <Text style={styles.sectionLabel}>{t('designPreview.onboarding.flareUpLabel')}</Text>
            <TextInput
              style={styles.input}
              placeholder={t('designPreview.onboarding.flareUpPlaceholder')}
              placeholderTextColor={colors.textSecondary}
            />
            <Pressable style={styles.skipLink} onPress={handleSkipInjury}>
              <Text style={styles.skipText}>{t('designPreview.onboarding.skipInjury')}</Text>
            </Pressable>
          </>
        )

      case 3:
        return (
          <>
            {renderProgress(3)}
            <Text style={styles.headline}>{t('designPreview.onboarding.stateHeadline')}</Text>
            <View style={styles.radioStack}>
              {injuryStateOptions.map((option) => (
                <SelectionCard
                  key={option.id}
                  label={option.label}
                  description={option.description}
                  selected={injuryState === option.id}
                  onPress={() => setInjuryState(option.id as InjuryStateId)}
                />
              ))}
            </View>
            {injuryState === 'managing' || injuryState === 'acute' ? (
              <>
                <Text style={styles.sectionLabel}>{t('designPreview.onboarding.restrictionsLabel')}</Text>
                <View style={styles.chipGrid}>
                  {restrictionMovements.map((movement) => (
                    <SelectionCard
                      key={movement}
                      label={movement}
                      selected={restrictions.includes(movement)}
                      onPress={() => toggleRestriction(movement)}
                      style={styles.chip}
                    />
                  ))}
                </View>
              </>
            ) : null}
          </>
        )

      case 4:
        return (
          <>
            {renderProgress(4)}
            <Text style={styles.headline}>{t('designPreview.onboarding.dietHeadline')}</Text>
            <View style={styles.chipGrid}>
              {dietPreferences.map((diet) => (
                <SelectionCard
                  key={diet}
                  label={diet}
                  selected={selectedDiet === diet}
                  onPress={() => setSelectedDiet(diet)}
                  style={styles.chip}
                />
              ))}
            </View>
            <Text style={styles.sectionLabel}>{t('designPreview.onboarding.calorieLabel')}</Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              value={calorieTarget}
              onChangeText={setCalorieTarget}
              placeholder={t('designPreview.onboarding.caloriePlaceholder')}
              placeholderTextColor={colors.textSecondary}
            />
          </>
        )

      case 5:
        return (
          <>
            {renderProgress(5)}
            <Text style={styles.headline}>{t('designPreview.onboarding.profileHeadline')}</Text>
            <Text style={styles.sectionLabel}>{t('designPreview.onboarding.ageLabel')}</Text>
            <View style={styles.ageRow}>
              {ageBands.map((band) => (
                <SelectionCard
                  key={band}
                  label={band}
                  selected={selectedAge === band}
                  onPress={() => setSelectedAge(band)}
                  style={styles.chip}
                />
              ))}
            </View>
            <Text style={styles.sectionLabel}>{t('designPreview.onboarding.fitnessLabel')}</Text>
            <View style={styles.sliderRow}>
              {FITNESS_LEVELS.map((level, index) => (
                <Text key={level} style={[styles.sliderLabel, index === fitnessLevel && { color: colors.textPrimary }]}>
                  {level}
                </Text>
              ))}
            </View>
            <View style={styles.sliderTrack}>
              {FITNESS_LEVELS.map((level, index) => (
                <Pressable
                  key={level}
                  style={[styles.sliderSegment, index <= fitnessLevel && styles.sliderSegmentActive]}
                  onPress={() => setFitnessLevel(index)}
                />
              ))}
            </View>
          </>
        )

      case 6:
        return (
          <>
            {renderProgress(6)}
            <Text style={styles.headline}>{t('designPreview.onboarding.locationsIntroHeadline')}</Text>
            <Text style={styles.subcopy}>{t('designPreview.onboarding.locationsIntroSubcopy')}</Text>
            <CoachNote message={t('designPreview.onboarding.locationsIntroCoach')} />
          </>
        )

      case 7:
        return (
          <>
            {renderProgress(7)}
            <Text style={styles.headline}>{t('designPreview.onboarding.locationNameHeadline')}</Text>
            <TextInput
              style={styles.input}
              value={locationName}
              onChangeText={setLocationName}
              placeholder={t('designPreview.onboarding.locationNamePlaceholder')}
              placeholderTextColor={colors.textSecondary}
            />
            <Text style={styles.sectionLabel}>{t('designPreview.onboarding.locationPresetLabel')}</Text>
            <View style={styles.chipGrid}>
              {locationPresetOptions.map((preset) => (
                <SelectionCard
                  key={preset.id}
                  label={preset.label}
                  selected={locationPreset === preset.id}
                  onPress={() => setLocationPreset(preset.id)}
                  style={styles.chip}
                />
              ))}
            </View>
          </>
        )

      case 8:
        return (
          <>
            {renderProgress(8)}
            <Text style={styles.headline}>{t('designPreview.onboarding.equipmentHeadline')}</Text>
            <EquipmentPickerSheet
              locationName={locationName.trim() || t('designPreview.onboarding.locationFallback')}
              categories={equipmentPickerCategories}
              activeCategory={equipmentCategory}
              onCategoryChange={setEquipmentCategory}
              equipment={predefinedEquipmentCatalog}
              selectedIds={selectedEquipmentIds}
              customLabels={customEquipmentLabels}
              onToggleEquipment={toggleEquipment}
              onAddCustomPress={() => setCustomModalOpen(true)}
              onSelectCommon={() => setSelectedEquipmentIds(commonEquipmentIds)}
              onBodyweightOnly={() => {
                setSelectedEquipmentIds([])
                setCustomEquipmentLabels([])
              }}
            />
          </>
        )

      case 9: {
        const pendingLocation =
          locationName.trim() && locationPreset
            ? {
                id: 'pending',
                name: locationName.trim(),
                presetType: locationPreset,
                isDefault: false,
                equipment: []
              }
            : null

        const displayLocations =
          pendingLocation && !savedLocations.find((l) => l.name === pendingLocation.name)
            ? [...savedLocations, { ...pendingLocation, equipment: [] }]
            : savedLocations

        return (
          <>
            {renderProgress(9)}
            <Text style={styles.headline}>{t('designPreview.onboarding.multiLocationHeadline')}</Text>
            <Text style={styles.subcopy}>{t('designPreview.onboarding.multiLocationSubcopy')}</Text>
            {displayLocations.map((loc) => (
              <LocationCard
                key={loc.id}
                name={loc.name}
                presetType={loc.presetType}
                equipmentCount={loc.equipment.length || selectedEquipmentIds.length + customEquipmentLabels.length}
                isDefault={defaultLocationId === loc.id || (loc.isDefault && !defaultLocationId)}
                onPress={() => setDefaultLocationId(loc.id)}
              />
            ))}
            <Pressable style={styles.skipLink} onPress={handleAddAnotherLocation}>
              <Text style={styles.skipText}>{t('designPreview.onboarding.addAnotherLocation')}</Text>
            </Pressable>
          </>
        )
      }

      case LOADER_STEP:
        return (
          <View style={styles.loaderCenter}>
            <CoachNote message={t('designPreview.onboarding.generatingCoach')} />
            <ActivityIndicator size="large" color={colors.accent} style={styles.loaderSpinner} />
            <Text style={styles.loaderTitle}>{t('designPreview.onboarding.generatingTitle')}</Text>
            <Text style={styles.loaderBullet}>{t('designPreview.onboarding.generatingGoals')}</Text>
            <Text style={styles.loaderBullet}>{t('designPreview.onboarding.generatingInjuries')}</Text>
            <Text style={styles.loaderBullet}>{t('designPreview.onboarding.generatingEquipment')}</Text>
            <Text style={styles.loaderBullet}>{t('designPreview.onboarding.generatingSchedule')}</Text>
          </View>
        )

      case 11: {
        const defaultLocation = savedLocations.find((loc) => loc.id === defaultLocationId)

        return (
          <>
            <View style={styles.revealCard}>
              <Text style={styles.revealTitle}>{t('designPreview.onboarding.revealTitle')}</Text>
              <Text style={styles.revealStats}>{t('designPreview.onboarding.revealStats')}</Text>
              {defaultLocation ? (
                <Text style={styles.revealStats}>
                  {t('designPreview.onboarding.revealLocation', {
                    name: defaultLocation.name
                  })}
                </Text>
              ) : null}
            </View>
            <CoachNote message={t('designPreview.onboarding.revealCoach')} />
          </>
        )
      }

      default:
        return null
    }
  }

  const primaryLabel = useMemo(() => {
    if (step === 5) return t('designPreview.onboarding.continue')
    if (step === 6) return t('designPreview.onboarding.setupFirstLocation')
    if (step === 8) return t('designPreview.onboarding.saveEquipment')
    if (step === 9) return t('designPreview.onboarding.continueToPlan')
    if (step === 11) return t('designPreview.onboarding.viewPlan')
    if (step === LOADER_STEP) return t('designPreview.onboarding.continue')

    return t('designPreview.onboarding.continue')
  }, [step, t])

  const handlePrimaryPress = useCallback(() => {
    if (step === 11) {
      onViewPlan()

      return
    }

    if (step === LOADER_STEP) {
      setStep(11)

      return
    }

    if (step === 8) {
      handleSaveEquipment()

      return
    }

    if (step === 9) {
      if (savedLocations.length === 0) {
        saveCurrentLocation()
      }

      setStep(LOADER_STEP)

      return
    }

    handleContinue()
  }, [handleContinue, handleSaveEquipment, onViewPlan, saveCurrentLocation, savedLocations.length, step])

  const showLoaderLayout = step === LOADER_STEP

  return (
    <View style={styles.container}>
      {showLoaderLayout ? (
        renderStepContent()
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>{renderStepContent()}</ScrollView>
      )}

      <View style={styles.footer}>
        <PrimaryButton
          label={primaryLabel}
          onPress={handlePrimaryPress}
          disabled={!canContinue && step !== LOADER_STEP && step !== 11}
        />
      </View>

      <CustomEquipmentInput
        visible={customModalOpen}
        onAdd={(name) => setCustomEquipmentLabels((current) => [...current, name])}
        onClose={() => setCustomModalOpen(false)}
      />
    </View>
  )
}

export default OnboardingFlowPreviewComponent
