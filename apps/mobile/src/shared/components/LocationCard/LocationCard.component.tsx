import React from 'react';
import { Pressable, Text, View } from 'react-native';

import styles from './LocationCard.styles';
import { LocationCardProps } from './LocationCard.types';

const presetLabels: Record<LocationCardProps['presetType'], string> = {
  home: 'Home',
  commercial: 'Gym',
  travel: 'Travel',
  custom: 'Custom',
};

const LocationCard = ({
  name,
  presetType,
  equipmentCount,
  isDefault,
  onPress,
}: LocationCardProps) => (
  <Pressable
    style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    onPress={onPress}
    accessibilityRole="button"
  >
    <View style={styles.left}>
      <View style={styles.nameRow}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.badge}>{presetLabels[presetType]}</Text>
      </View>
      <View style={styles.nameRow}>
        <Text style={styles.meta}>
          {equipmentCount} {equipmentCount === 1 ? 'item' : 'items'}
        </Text>
        {isDefault ? <Text style={styles.defaultLabel}>· Default</Text> : null}
      </View>
    </View>
    <Text style={styles.chevron}>›</Text>
  </Pressable>
);

export default LocationCard;
