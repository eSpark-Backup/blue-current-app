import React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle, Pressable } from 'react-native';
import MyText from './MyText';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign'

export interface JobCardProps {
  title: string;
  technician: string;
  serviceType: string;
  daysRemaining: number;
  isCompleted?: boolean;
  isPending?: boolean;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  technicianStyle?: TextStyle;
  serviceTypeStyle?: TextStyle;
  daysNumberStyle?: TextStyle;
  daysTextStyle?: TextStyle;
  onStartJob?: () => void;
}

const JobCard: React.FC<JobCardProps> = ({
  title,
  technician,
  serviceType,
  daysRemaining,
  isCompleted = false,
  isPending = false,
  style,
  titleStyle,
  technicianStyle,
  serviceTypeStyle,
  daysNumberStyle,
  daysTextStyle,
  onStartJob = () => {},
}) => {
  const { colors } = useTheme();
  const styles = useStyles();
  let statusColor = colors.primary;

  return (
    <View style={[styles.jobCard, style]}>
      <View style={styles.jobInfo}>
        <MyText
          fontFamily="Gilroy-SemiBold"
          style={[styles.jobTitle, titleStyle || {}]}
        >
          {title}
        </MyText>
        <MyText
          fontFamily="Gilroy-Regular"
          style={[styles.jobTechnician, technicianStyle || {}]}
        >
          {technician}
        </MyText>
        <MyText
          fontFamily="Gilroy-Regular"
          style={[styles.jobServiceType, serviceTypeStyle || {}]}
        >
          {serviceType}
        </MyText>
      </View>
      <View style={[styles.daysContainer, isPending && styles.daysContainerPending]}>
        {isCompleted && (
          <View style={styles.completedIcon}>
            <Icon name="check" size={17} />
          </View>
        )}
        {!isPending ? (
          <>
            <MyText
              fontFamily="Gilroy-SemiBold"
              style={[
                styles.daysNumber,
                { color: statusColor },
                daysNumberStyle || {},
              ]}
            >
              {daysRemaining}
            </MyText>
            <MyText
              fontFamily="Gilroy-Regular"
              style={[
                styles.daysText,
                { color: statusColor },
                daysTextStyle || {},
              ]}
            >
              Days
            </MyText>
          </>
        ) : (
          <Pressable onPress={onStartJob} style={[styles.startJobButton, { backgroundColor: colors.primary }]}>
            <MyText fontFamily="Gilroy-SemiBold">Start Job</MyText>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default JobCard;

const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    jobCard: {
      backgroundColor: '#181A209C',
      borderWidth: 1,
      borderColor: '#9797971C',
      borderRadius: 12,
      paddingVertical: 15,
      marginBottom: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 30,
    },
    jobInfo: {
      flex: 1,
    },
    jobTitle: {
      fontSize: 18,
      color: '#FFFFFF',
      marginBottom: 4,
    },
    jobTechnician: {
      fontSize: 14,
      color: '#6B7280',
      marginBottom: 2,
    },
    jobServiceType: {
      fontSize: 14,
      color: '#6B7280',
    },
    daysContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 16,
      right: 10,
    },
    daysContainerPending: {
      right: -15,
      alignSelf: 'flex-end',
    },
    completedIcon: {
      height: 20,
      width: 20,
      backgroundColor: '#6FFF00',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      position: 'absolute',
      top: -10,
      right: -30,
    },
    startJobButton: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
    },
    daysNumber: {
      fontSize: 48,
      color: colors.primary,
      lineHeight: 48,
    },
    daysText: {
      fontSize: 14,
      color: colors.primary,
      fontWeight: '500',
    },
  });
};
