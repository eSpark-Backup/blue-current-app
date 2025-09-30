import type { StackNavigationProp } from '@react-navigation/stack';

export type EngineerStackParamList = {
  Notification: undefined;
  Profile: undefined;
  Home: undefined;
  Firmware: undefined;
  Scan: undefined;
  Explore: undefined;
  Settings: undefined;
  DeviceCheckInScreen: undefined;
  ServiceHubScreen: undefined;
  CompleteJobs: undefined;
  UserNotes: undefined;
  DeviceVersion: undefined;
  LogSets: undefined;
  ServiceSetting: undefined;
  WorkSheet: undefined;
  DeviceOverview: undefined;
  CalculatorsScreen: undefined;
  FlowRateCalculator: undefined;
  DeviceSettingController: { title?: string };
  ResinUsageCalculator: undefined;
  WasteUsageCalculator: undefined;
};

export type UserStackParamList = {
  Notification: undefined;
  Profile: undefined;
  Home: undefined;
  Firmware: { fromRequestEngineer?: boolean }; // ✅ flag
  DeviceOverview: undefined;
  Updates: undefined;
  Settings: undefined;
  AppSettings: undefined;
  RequestEngineer: { selectedLog?: string }; // ✅ return log
  DeviceSettingController: { title?: string };
};
