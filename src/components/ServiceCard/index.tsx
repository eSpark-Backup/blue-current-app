import type React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  type ViewStyle,
} from 'react-native';
import Checkbox from '../Checkbox';
import MyText from '../MyText';

export interface Service {
  id: string;
  name: string;
  details: string;
  isSelected: boolean;
}

export interface ServiceCardProps {
  service: Service;
  onToggle: (id: string) => void;
  style?: ViewStyle;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onToggle,
  style,
}) => {
  const handlePress = () => {
    onToggle(service.id);
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <MyText fontFamily='Outfit-Regular' style={styles.serviceName}>{service.name}</MyText>
          <MyText fontFamily='Outfit-Regular' style={styles.serviceDetails}>{service.details}</MyText>
        </View>
        <Checkbox
          value={service.isSelected}
          onChange={() => onToggle(service.id)}
          size="large"
          color="#004F65"
          borderColor="#3A3A3C"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#181818',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  serviceName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  serviceDetails: {
    color: '#8E8E93',
    fontSize: 11,
  },
});

export default ServiceCard;