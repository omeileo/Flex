import { Subject } from 'rxjs';

interface InAppPushNotificationConfig {
  title: string;
  body: string;
  hide?: boolean;
  image: number;
  onHide: () => void;
  onPress: () => void;
}

const InAppPushNotificationSubject = new Subject<InAppPushNotificationConfig>();

export default InAppPushNotificationSubject;
