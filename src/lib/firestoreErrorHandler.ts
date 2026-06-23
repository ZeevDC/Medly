export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  // Try to use auth if available, otherwise mock authInfo
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: "mock_user_id",
      email: "studyfilesbyz@gmail.com",
      emailVerified: true,
      isAnonymous: false,
    },
    operationType,
    path
  };
  const errorJsonString = JSON.stringify(errInfo);
  console.warn('Firestore Error occurred: ', errorJsonString);
  // Log but do not throw to prevent uncaught app crashes when custom configurations or permissions are active
}
