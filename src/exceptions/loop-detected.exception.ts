import { AppException } from './app.exception';

// 508 Loop Detected
export class LoopDetectedException extends AppException {
  constructor() {
    super('PAGINA EM LOOP!', 508);
  }
}
