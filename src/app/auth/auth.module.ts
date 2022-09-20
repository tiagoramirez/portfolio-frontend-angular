import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { LoginComponent } from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component'
import { AuthService } from './services/auth.service'
import { TokenService } from './services/token.service'
import { UserListComponent } from './components/user-list/user-list.component'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    AuthService,
    TokenService
  ]
})
export class AuthModule { }
