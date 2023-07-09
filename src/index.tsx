import {
  requireNativeComponent,
  UIManager,
  Platform,
  type ViewStyle,
} from 'react-native';

const LINKING_ERROR =
  `The package 'rnwpasdk' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

type RnwpasdkProps = {
  color: string;
  style: ViewStyle;
};

const ComponentName = 'RnwpasdkView';

export const RnwpasdkView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<RnwpasdkProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };

export { default as WPA } from './WPA';
