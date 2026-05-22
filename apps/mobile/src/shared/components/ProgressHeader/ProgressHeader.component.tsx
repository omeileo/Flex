import React from 'react';
import { Text, View } from 'react-native';

import styles from './ProgressHeader.styles';
import { ProgressHeaderProps } from './ProgressHeader.types';

const ProgressHeader = ({
  currentStep,
  totalSteps,
  stepLabel,
}: ProgressHeaderProps) => {
  const progress = Math.min(Math.max(currentStep / totalSteps, 0), 1);

  return (
    <View style={styles.container}>
      <Text style={styles.stepText}>
        {stepLabel ?? `Step ${currentStep} of ${totalSteps}`}
      </Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${progress * 100}%` }]} />
      </View>
    </View>
  );
};

export default ProgressHeader;
