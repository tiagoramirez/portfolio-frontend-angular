import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  roles: string[] = []

  public setToken (token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY)
    window.sessionStorage.setItem(TOKEN_KEY, token)
  }

  public getToken (): string | null {
    return sessionStorage.getItem(TOKEN_KEY)
  }

  public setUserId (userId: number): void {
    sessionStorage.removeItem(USER_ID_KEY)
    sessionStorage.setItem(USER_ID_KEY, userId.toString())
  }

  public getUserId (): number {
    return parseInt(sessionStorage.getItem(USER_ID_KEY) ?? '')
  }

  public setUsername (username: string): void {
    window.sessionStorage.removeItem(USERNAME_KEY)
    window.sessionStorage.setItem(USERNAME_KEY, username)
  }

  public getUsername (): string | null {
    return sessionStorage.getItem(USERNAME_KEY)
  }

  public setAuthorities (authorities: string[]): void {
    window.sessionStorage.removeItem(AUTHORITIES_KEY)
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities))
  }

  public getAuthorities (): string[] {
    this.roles = []
    if (sessionStorage.getItem(AUTHORITIES_KEY) !== null) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY) ?? '{}').forEach((authority: string) => {
        this.roles.push(authority)
      })
    }
    return this.roles
  }

  public logOut (): void {
    window.sessionStorage.clear()
  }
}

const TOKEN_KEY = 'AuthToken'
const USERNAME_KEY = 'AuthUsername'
const USER_ID_KEY = 'AuthUserId'
const AUTHORITIES_KEY = 'AuthAuthorities'
