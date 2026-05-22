import { ReactElement } from 'react';
import { Subject } from 'rxjs';

export type ModalIcon = 'info' | 'success' | 'warning' | 'error';

export interface ModalConfig {
  title?: string;
  body?: string | ReactElement;
  icon?: ModalIcon;
  imageUrl?: string;
  yesButtonText?: string;
  yesButtonAction?: () => void;
  noButtonText?: string;
  noButtonAction?: () => void;
  onDismiss?: () => void;
  isDismissible?: boolean;
  overwrite?: boolean;
  disablePrimaryButton?: boolean;
  disableBodyPadding?: boolean;
}

export const popupModal = new Subject<ModalConfig>();

export default popupModal;
