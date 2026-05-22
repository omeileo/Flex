import { Subject } from 'rxjs';

const SessionTimeoutSubject = new Subject<{
  reset?: boolean;
  duration?: number;
  stop?: boolean;
}>();

export default SessionTimeoutSubject;
