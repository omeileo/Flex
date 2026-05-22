import React, { useCallback, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import ConditionCard from '@shared/components/ConditionCard/ConditionCard.component';
import PrimaryButton from '@shared/components/PrimaryButton/PrimaryButton.component';
import ProfileSectionRow from '@shared/components/ProfileSectionRow/ProfileSectionRow.component';
import SelectionCard from '@shared/components/SelectionCard/SelectionCard.component';
import StatusSegment from '@shared/components/StatusSegment/StatusSegment.component';

import styles from './ProfileSettingsFlowPreview.styles';
import {
  MockCondition,
  ProfileSettingsFlowPreviewComponentProps,
  ProfileSettingsView,
} from './ProfileSettingsFlowPreview.types';

const mockConditions: MockCondition[] = [
  {
    id: 'shoulder',
    title: 'Left shoulder',
    status: 'managing',
    subtitle: '3 aggravating exercises · Overhead pressing',
  },
  {
    id: 'back',
    title: 'Lower back',
    status: 'flareUp',
    subtitle: '2 aggravating exercises · Deep flexion',
  },
];

const goalOptions = [
  'Build muscle',
  'Lose fat',
  'Endurance',
  'Return from injury',
];
const aggravatingExercises = ['Overhead press', 'Arnold press', 'Upright row'];
const excludedExercises = ['Barbell back squat', 'Upright row', 'Box jumps'];

const ProfileSettingsFlowPreviewComponent = (
  _props: ProfileSettingsFlowPreviewComponentProps,
) => {
  const { t } = useTranslation();
  const [view, setView] = useState<ProfileSettingsView>('hub');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([
    'Build muscle',
  ]);
  const [conditionStatus, setConditionStatus] = useState<
    'recovered' | 'managing' | 'flareUp'
  >('managing');

  const toggleGoal = useCallback((goal: string) => {
    setSelectedGoals(current => {
      if (current.includes(goal)) {
        return current.filter(item => item !== goal);
      }

      return [...current, goal];
    });
  }, []);

  const renderViewChip = useCallback(
    (chipView: ProfileSettingsView, label: string) => {
      const isActive = view === chipView;

      return (
        <Pressable
          key={chipView}
          style={[styles.viewChip, isActive && styles.viewChipActive]}
          onPress={() => setView(chipView)}
        >
          <Text
            style={[styles.viewChipText, isActive && styles.viewChipTextActive]}
          >
            {label}
          </Text>
        </Pressable>
      );
    },
    [view],
  );

  const renderHub = () => (
    <>
      <Text style={styles.title}>
        {t('designPreview.profileSettings.hubTitle')}
      </Text>
      <View style={styles.hero}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>OM</Text>
        </View>
        <View>
          <Text style={styles.heroName}>Omar M.</Text>
          <Text style={styles.heroMeta}>
            {t('designPreview.profileSettings.memberSince')}
          </Text>
        </View>
      </View>
      <Text style={styles.sectionLabel}>
        {t('designPreview.profileSettings.trainingSection')}
      </Text>
      <ProfileSectionRow
        title={t('designPreview.profileSettings.goalsRow')}
        preview={t('designPreview.profileSettings.goalsPreview')}
        onPress={() => setView('goals')}
      />
      <ProfileSectionRow
        title={t('designPreview.profileSettings.gymRow')}
        preview={t('designPreview.profileSettings.gymPreview')}
        onPress={() => undefined}
      />
      <Text style={styles.sectionLabel}>
        {t('designPreview.profileSettings.wellnessSection')}
      </Text>
      <ProfileSectionRow
        title={t('designPreview.profileSettings.wellnessRow')}
        preview={t('designPreview.profileSettings.wellnessPreview')}
        onPress={() => setView('wellness')}
      />
      <ProfileSectionRow
        title={t('designPreview.profileSettings.excludedRow')}
        preview={t('designPreview.profileSettings.excludedPreview')}
        onPress={() => setView('excluded')}
      />
      <Text style={styles.sectionLabel}>
        {t('designPreview.profileSettings.bodySection')}
      </Text>
      <ProfileSectionRow
        title={t('designPreview.profileSettings.dietRow')}
        preview={t('designPreview.profileSettings.dietPreview')}
        onPress={() => undefined}
      />
      <ProfileSectionRow
        title={t('designPreview.profileSettings.ageRow')}
        preview={t('designPreview.profileSettings.agePreview')}
        onPress={() => undefined}
      />
      <Text style={styles.footerNote}>
        {t('designPreview.profileSettings.footerNote')}
      </Text>
    </>
  );

  const renderGoals = () => (
    <>
      <Text style={styles.title}>
        {t('designPreview.profileSettings.goalsTitle')}
      </Text>
      <Text style={styles.fieldLabel}>
        {t('designPreview.profileSettings.goalsLabel')}
      </Text>
      <View style={styles.chipRow}>
        {goalOptions.map(goal => (
          <Pressable
            key={goal}
            style={[
              styles.chip,
              !selectedGoals.includes(goal) && styles.chipInactive,
            ]}
            onPress={() => toggleGoal(goal)}
          >
            <Text style={styles.chipText}>{goal}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.fieldLabel}>
        {t('designPreview.profileSettings.experienceLabel')}
      </Text>
      <SelectionCard label="Intermediate" selected onPress={() => undefined} />
      <Text style={styles.subtitle}>
        {t('designPreview.profileSettings.schedulePreview')}
      </Text>
      <PrimaryButton
        label={t('designPreview.profileSettings.save')}
        onPress={() => setView('readapt')}
      />
    </>
  );

  const renderWellness = () => (
    <>
      <Text style={styles.title}>
        {t('designPreview.profileSettings.wellnessTitle')}
      </Text>
      <Text style={styles.subtitle}>
        {t('designPreview.profileSettings.wellnessSubtitle')}
      </Text>
      {mockConditions.map(condition => (
        <ConditionCard
          key={condition.id}
          title={condition.title}
          status={condition.status}
          subtitle={condition.subtitle}
          onPress={() => setView('conditionDetail')}
        />
      ))}
      <PrimaryButton
        label={t('designPreview.profileSettings.addCondition')}
        onPress={() => undefined}
      />
    </>
  );

  const renderConditionDetail = () => (
    <>
      <Text style={styles.title}>
        {t('designPreview.profileSettings.conditionTitle')}
      </Text>
      <Text style={styles.fieldLabel}>
        {t('designPreview.profileSettings.statusLabel')}
      </Text>
      <StatusSegment value={conditionStatus} onChange={setConditionStatus} />
      <Text style={styles.fieldLabel}>
        {t('designPreview.profileSettings.restrictionsLabel')}
      </Text>
      <View style={styles.chipRow}>
        {['Overhead pressing', 'Pull-ups'].map(tag => (
          <View key={tag} style={styles.chip}>
            <Text style={styles.chipText}>{tag}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.fieldLabel}>
        {t('designPreview.profileSettings.aggravatorsLabel')}
      </Text>
      <Text style={styles.subtitle}>
        {t('designPreview.profileSettings.aggravatorsSubtitle')}
      </Text>
      {aggravatingExercises.map(exercise => (
        <View key={exercise} style={styles.exerciseRow}>
          <Text style={styles.exerciseName}>{exercise}</Text>
          <Text style={styles.remove}>×</Text>
        </View>
      ))}
      <Text style={[styles.fieldLabel, styles.fieldLabelNoTop]}>
        {t('designPreview.profileSettings.addExercise')}
      </Text>
      <View style={styles.coachCard}>
        <Text style={styles.coachLabel}>
          {t('designPreview.profileSettings.coachLabel')}
        </Text>
        <Text style={styles.coachText}>
          {t('designPreview.profileSettings.coachInsight')}
        </Text>
      </View>
      <View style={styles.footer}>
        <PrimaryButton
          label={t('designPreview.profileSettings.saveChanges')}
          onPress={() => setView('readapt')}
        />
      </View>
    </>
  );

  const renderExcluded = () => (
    <>
      <Text style={styles.title}>
        {t('designPreview.profileSettings.excludedTitle')}
      </Text>
      <Text style={styles.subtitle}>
        {t('designPreview.profileSettings.excludedSubtitle')}
      </Text>
      {excludedExercises.map(exercise => (
        <View key={exercise} style={styles.exerciseRow}>
          <Text style={styles.exerciseName}>{exercise}</Text>
          <Text style={styles.remove}>✓</Text>
        </View>
      ))}
      <Text style={styles.footerNote}>
        {t('designPreview.profileSettings.excludedLink')}
      </Text>
    </>
  );

  const renderReadapt = () => (
    <View style={styles.deleteSheetContainer}>
      <Text style={styles.title}>
        {t('designPreview.profileSettings.wellnessTitle')}
      </Text>
      <View style={styles.overlay} />
      <View style={styles.sheet}>
        <Text style={styles.sheetTitle}>
          {t('designPreview.profileSettings.readaptTitle')}
        </Text>
        <Text style={styles.subtitle}>
          {t('designPreview.profileSettings.readaptSubtitle')}
        </Text>
        <PrimaryButton
          label={t('designPreview.profileSettings.readaptCta')}
          onPress={() => setView('hub')}
        />
        <Pressable onPress={() => setView('hub')}>
          <Text style={styles.linkText}>
            {t('designPreview.profileSettings.readaptSkip')}
          </Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.viewChips}>
        {renderViewChip('hub', t('designPreview.profileSettings.hubChip'))}
        {renderViewChip('goals', t('designPreview.profileSettings.goalsChip'))}
        {renderViewChip(
          'wellness',
          t('designPreview.profileSettings.wellnessChip'),
        )}
        {renderViewChip(
          'conditionDetail',
          t('designPreview.profileSettings.conditionChip'),
        )}
        {renderViewChip(
          'excluded',
          t('designPreview.profileSettings.excludedChip'),
        )}
        {renderViewChip(
          'readapt',
          t('designPreview.profileSettings.readaptChip'),
        )}
      </View>
      {view === 'hub' ? renderHub() : null}
      {view === 'goals' ? renderGoals() : null}
      {view === 'wellness' ? renderWellness() : null}
      {view === 'conditionDetail' ? renderConditionDetail() : null}
      {view === 'excluded' ? renderExcluded() : null}
      {view === 'readapt' ? renderReadapt() : null}
    </ScrollView>
  );
};

export default ProfileSettingsFlowPreviewComponent;
