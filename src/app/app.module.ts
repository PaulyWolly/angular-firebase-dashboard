import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
// import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { ProfileComponent } from './components/profile/profile.component';
import { ToggleDirective } from './directives/toggle/toggle.directive';
import { HighlightDirective } from './directives/highlight/highlight.directive';
import { AutoFocus } from './directives/auto-focus/auto-focus.directive';
import { HighlightTestComponent } from './components/highlight-test/highlight-test.component';

import { FileSizePipe } from './pipes/filesize.pipe';
import { TemperatureConverterPipe } from './pipes/temperature-converter.pipe';
import { WordcountPipe } from './pipes/wordcount.pipe';
import { CommonModule } from '@angular/common';
import { ConvertToSpacesPipe } from './shared/convert-to-spaces.pipe';
import { PipeDemoComponent } from './components/pipe-demo/pipe-demo.component';
import { SquarePipe } from './pipes/square.pipe';
import { DeleteCharactersPipe } from './pipes/delete-characters.pipe';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        SignupComponent,
        LoginComponent,
        ForgotPasswordComponent,
        VerifyEmailComponent,
        DashboardComponent,
        AdminDashboardComponent,
        ProfileComponent,
        ToggleDirective,
        HighlightDirective,
        AutoFocus,
        HighlightTestComponent,
        PipeDemoComponent,
        WordcountPipe,
        TemperatureConverterPipe,
        ConvertToSpacesPipe,
        SquarePipe,
        DeleteCharactersPipe

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,

        AngularFireModule.initializeApp(environment.firebase),  // imports firebase/app needed for everything
        AngularFirestoreModule,                                 // imports firebase/firestore, only needed for database features
        // AngularFireStorageModule,                            // imports firebase/storage only needed for storage features
        AngularFireDatabaseModule,

        MatAutocompleteModule,
        MatBadgeModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatStepperModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,

        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        CommonModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
