import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import styles from './RestTimerBar.styles';
import { RestTimerBarProps } from './RestTimerBar.types';

const formatRest = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const RestTimerBar = ({
  secondsRemaining,
  nextSetLabel,
  onSkip,
  onAdjust,
}: RestTimerBarProps) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.handle} />

      <View style={styles.headerRow}>
        <Text style={styles.title}>
          {t('designPreview.activeWorkout.restTitle')}
        </Text>
        <Pressable style={styles.skipButton} onPress={onSkip}>
          <Text style={styles.skipLabel}>
            {t('designPreview.activeWorkout.skipRest')}
          </Text>
        </Pressable>
      </View>

      <Text style={styles.timer}>{formatRest(secondsRemaining)}</Text>

      <View style={styles.adjustRow}>
        <Pressable style={styles.adjustButton} onPress={() => onAdjust(-10)}>
          <Text style={styles.adjustLabel}>
            {t('designPreview.activeWorkout.restMinus')}
          </Text>
        </Pressable>
        <Pressable style={styles.adjustButton} onPress={() => onAdjust(10)}>
          <Text style={styles.adjustLabel}>
            {t('designPreview.activeWorkout.restPlus')}
          </Text>
        </Pressable>
      </View>

      <Text style={styles.nextLabel}>{nextSetLabel}</Text>
    </View>
  );
};

export default RestTimerBar;
