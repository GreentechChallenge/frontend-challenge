import { FormChallengeComponent } from './form-challenge/form-challenge.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { RegisterChallengeComponent } from './register-challenge/register-challenge.component';
/*import { ModuleWithProviders } from '@angular/compiler/src/core';*/

const routes: Routes = [
  { path: '', component: FormChallengeComponent },
  { path: 'register-challenge', component: RegisterChallengeComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
