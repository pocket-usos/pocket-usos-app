interface AuthenticateRequest {
  sessionId: string;
  requestToken: string;
  verifier: string;
}

export default AuthenticateRequest;
