import React from 'react';
import { Pressable, Text, View } from 'react-native';

import styles from './SetRow.styles';
import { SetRowProps } from './SetRow.types';

const statusIcon = (status: SetRowProps['status']) => {
  if (status === 'completed') {
    return '✓';
  }

  if (status === 'active') {
    return '●';
  }

  if (status === 'skipped') {
    return '—';
  }

  return '○';
};

const SetRow = ({
  setNumber,
  previousLabel,
  reps,
  weightKg,
  status,
  onPress,
}: SetRowProps) => {
  const isActive = status === 'active';
  const isCompleted = status === 'completed';

  return (
    <Pressable
      style={[
        styles.row,
        isActive && styles.rowActive,
        isCompleted && styles.rowCompleted,
      ]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.statusCell}>
        <Text
          style={[
            styles.statusIcon,
            isActive && styles.statusIconActive,
            isCompleted && styles.statusIconDone,
          ]}
        >
          {statusIcon(status)}
        </Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.cellLabel}>Set</Text>
        <Text style={styles.cellValue}>{setNumber}</Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.cellLabel}>Prev</Text>
        <Text style={[styles.cellValue, styles.cellValueMuted]}>
          {previousLabel ?? '—'}
        </Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.cellLabel}>Reps</Text>
        <Text style={styles.cellValue}>{reps}</Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.cellLabel}>kg</Text>
        <Text style={styles.cellValue}>{weightKg}</Text>
      </View>
    </Pressable>
  );
};

export default SetRow;
