export class LoginWithEmailAndPassword {
  static readonly type = '[Auth] LoginWithEmailAndPassword';
  constructor(public readonly email: string, public readonly password: string) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}
