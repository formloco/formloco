import { NgModule } from '@angular/core'

import { QuillModule } from "ngx-quill"

import { AvatarModule } from 'ngx-avatar'
import { PipeModule } from '../pipe/pipe.module'
import { NgxDropzoneModule } from 'ngx-dropzone'

import { DragDropModule } from '@angular/cdk/drag-drop'

import { MaterialModule } from "./material.module"

// tenant components
import { TenantAuthComponent } from './tenant-auth/tenant-auth.component'
import { TenantLayoutComponent } from './tenant-layout/tenant-layout.component'
import { TenantNavigationComponent } from './tenant-navigation/tenant-navigation.component'

// app functional components
import { RunComponent } from './run/run.component'
import { LinkComponent } from './link/link.component'
import { LayoutComponent } from './layout/layout.component'
import { FormLaunchComponent } from './form-launch/form-launch.component'
import { SignupComponent } from './signup/signup.component'
import { DataComponent } from './data/data.component'
import { DataCardsComponent } from './data-cards/data-cards.component'
import { FormComponent } from './form/form.component'
import { FormListsComponent } from './form-lists/form-lists.component'
import { FormLibraryComponent } from './form-library/form-library.component'
import { DesktopComponent } from './desktop/desktop.component'
import { BuildComponent } from './build/build.component'
import { CanvasComponent } from './canvas/canvas.component'
import { FooterComponent } from './footer/footer.component'

import { ShareComponent } from './share/share.component'
import { MembersComponent } from './members/members.component'
import { PreviewComponent } from './preview/preview.component'

import { NavigationComponent } from './navigation/navigation.component'
import { PasswordresetComponent } from './passwordreset/passwordreset.component'

// dialogs for app functional components
import { PinComponent } from './dialogs/pin/pin.component';
import { AuthComponent } from './dialogs/auth/auth.component'
import { SaveasComponent } from './dialogs/saveas/saveas.component'
import { ExportComponent } from './dialogs/export/export.component'
import { ImportComponent } from './dialogs/import/import.component'
import { ProfileComponent } from './dialogs/profile/profile.component'
import { WelcomeComponent } from './dialogs/welcome/welcome.component'
import { ArchiveComponent } from './dialogs/archive/archive.component'
import { MessageComponent } from './dialogs/message/message.component'
import { ResetpasswordComponent } from './dialogs/resetpassword/resetpassword.component'

// form controls
import { GpsComponent } from './controls/gps/gps.component'
import { RadioComponent } from './controls/radio/radio.component'
import { LabelComponent } from './controls/label/label.component'
import { SliderComponent } from './controls/slider/slider.component'
import { ToggleComponent } from './controls/toggle/toggle.component'
import { QuillComponent } from './controls/quill/quill.component'
import { TextboxComponent } from './controls/textbox/textbox.component'
import { SelectComponent } from './controls/select/select.component'
import { SelectMultiComponent } from './controls/select-multi/select-multi.component'
import { CheckboxComponent } from './controls/checkbox/checkbox.component'
import { TextareaComponent } from './controls/textarea/textarea.component'
import { FileuploadComponent } from './controls/fileupload/fileupload.component'

//qr and barcode components
import { BarcodeComponent } from './controls/barcode/barcode.component'
import { QrcodeComponent } from './controls/qrcode/qrcode.component'
import { ScannerQrcodeComponent  } from './controls/scanner-qrcode/scanner-qrcode.component'
import { ScannerBarcodeComponent  } from './controls/scanner-barcode/scanner-barcode.component'

// run form controls
import { PhoneComponent } from './phone/phone.component'
import { PhoneAuthComponent } from './phone/phone-auth/phone-auth.component'
import { PhoneWorkspaceComponent } from './phone/phone-workspace/phone-workspace.component'
import { PhoneFormLaunchComponent } from './phone/phone-form-launch/phone-form-launch.component'

import { GpsRunComponent } from './run-controls/gps-run/gps-run.component'
import { ListRunComponent } from './run-controls/list-run/list-run.component'
import { LabelRunComponent } from './run-controls/label-run/label-run.component'
import { RadioRunComponent } from './run-controls/radio-run/radio-run.component'
import { SliderRunComponent } from './run-controls/slider-run/slider-run.component'
import { ToggleRunComponent } from './run-controls/toggle-run/toggle-run.component'
import { TextboxRunComponent } from './run-controls/textbox-run/textbox-run.component'
import { QuillRunComponent } from './run-controls/quill-run/quill-run.component'
import { CheckboxRunComponent } from './run-controls/checkbox-run/checkbox-run.component'
import { SelectRunComponent } from './run-controls/select-run/select-run.component'
import { TextareaRunComponent } from './run-controls/textarea-run/textarea-run.component'
import { FileuploadRunComponent } from './run-controls/fileupload-run/fileupload-run.component'
import { QrcodeRunComponent } from './run-controls/qrcode-run/qrcode-run.component'
import { BarcodeRunComponent } from './run-controls/barcode-run/barcode-run.component'
import { ScannerBarcodeRunComponent } from './run-controls/scanner-barcode-run/scanner-barcode-run.component'
import { ScannerQrcodeRunComponent } from './run-controls/scanner-qrcode-run/scanner-qrcode-run.component'

// form detail configuration
import { DetailsComponent } from './details/details.component'
import { LabelDetailsComponent } from './details/label-details/label-details.component'
import { RadioDetailsComponent } from './details/radio-details/radio-details.component'
import { SliderDetailsComponent } from './details/slider-details/slider-details.component'
import { ToggleDetailsComponent } from './details/toggle-details/toggle-details.component'
import { TextboxDetailsComponent } from './details/textbox-details/textbox-details.component'
// import { WysiwygDetailsComponent } from './details/wysiwyg-details/wysiwyg-details.component'
import { BarcodeDetailsComponent } from './details/barcode-details/barcode-details.component'
import { CheckboxDetailsComponent } from './details/checkbox-details/checkbox-details.component'
import { SelectDetailsComponent } from './details/select-details/select-details.component'
import { TextareaDetailsComponent } from './details/textarea-details/textarea-details.component'
import { FileuploadDetailsComponent } from './details/fileupload-details/fileupload-details.component'
// conectors
import { WaveComponent } from './connectors/wave/wave.component'
import { Oauth2Component } from './connectors/oauth2/oauth2.component'
import { ConnectorsComponent } from './connectors/connectors.component'
import { ConnectorComponent } from './controls/connector/connector.component'
import { GoogleMapsComponent } from './connectors/google-maps/google-maps.component'

// apps
import { AppsComponent } from './apps/apps.component'
import { UserComponent } from './apps/user/user.component'
import { SettingsComponent } from './apps/settings/settings.component'
import { FormDataComponent } from './apps/form-data/form-data.component'
import { DataFormsComponent } from './apps/data-forms/data-forms.component'

// micro-apps
import { MicroAppComponent } from './controls/micro-app/micro-app.component'
import { MicroAppRunComponent } from './run-controls/micro-app-run/micro-app-run.component'

@NgModule({
  declarations: [
    RunComponent,
    AppsComponent,
    DataFormsComponent,
    FormDataComponent,
    SettingsComponent,
    UserComponent,
    LinkComponent,
    LayoutComponent,
    PhoneComponent,
    PhoneAuthComponent,
    PhoneWorkspaceComponent,
    FormLaunchComponent,
    DataComponent,
    DesktopComponent,
    PinComponent,
    AuthComponent,
    BuildComponent,
    RadioComponent,
    LabelComponent,
    SaveasComponent,
    ExportComponent,
    ImportComponent,
    SliderComponent,
    ToggleComponent,
    CanvasComponent,
    FooterComponent,
    QuillComponent,
    ArchiveComponent,
    DetailsComponent,
    TextboxComponent,
    LabelRunComponent,
    RadioRunComponent,
    CheckboxComponent,
    TextareaComponent,
    ToggleRunComponent,
    SliderRunComponent,
    FileuploadComponent,
    QuillRunComponent,
    TextboxRunComponent,
    NavigationComponent,
    CheckboxRunComponent,
    SelectRunComponent,
    TextareaRunComponent,
    LabelDetailsComponent,
    RadioDetailsComponent,
    FileuploadRunComponent,
    SliderDetailsComponent,
    ToggleDetailsComponent,
    TextboxDetailsComponent,
    TextareaDetailsComponent,
    CheckboxDetailsComponent,
    SelectComponent,
    SelectMultiComponent,
    SelectDetailsComponent,
    FileuploadDetailsComponent,
    FileuploadDetailsComponent,
    ShareComponent,
    MembersComponent,
    PreviewComponent,
    MessageComponent,
    PasswordresetComponent,
    ResetpasswordComponent,
    DataCardsComponent,
    FormLibraryComponent,
    WelcomeComponent,
    ProfileComponent,
    SignupComponent,
    FormComponent,
    FormListsComponent,
    ConnectorComponent,
    ConnectorsComponent,
    GoogleMapsComponent,
    Oauth2Component,
    WaveComponent,
    PhoneFormLaunchComponent,
    GpsComponent,
    GpsRunComponent,
    QrcodeComponent,
    BarcodeComponent,
    ScannerQrcodeComponent,
    ScannerBarcodeComponent,
    QrcodeRunComponent,
    BarcodeRunComponent,
    ScannerBarcodeRunComponent,
    ScannerQrcodeRunComponent,
    ListRunComponent,
    MicroAppComponent,
    MicroAppRunComponent,
    BarcodeDetailsComponent,
    TenantAuthComponent,
    TenantLayoutComponent,
    TenantNavigationComponent
  ],
  imports: [
    PipeModule,
    AvatarModule,
    MaterialModule,
    DragDropModule,
    NgxDropzoneModule, 
    QuillModule.forRoot()   
  ],
  exports:[
    PinComponent,
    PipeModule,
    RunComponent,
    AppsComponent,
    DataFormsComponent,
    FormDataComponent,
    SettingsComponent,
    UserComponent,
    LinkComponent,
    LayoutComponent,
    PhoneComponent,
    PhoneAuthComponent,
    PhoneWorkspaceComponent,
    FormLaunchComponent,
    DataComponent,
    DesktopComponent,
    BuildComponent,
    RadioComponent,
    LabelComponent,
    CanvasComponent,
    FooterComponent,
    ShareComponent,
    SliderComponent,
    ToggleComponent,
    MembersComponent,
    PreviewComponent,
    DetailsComponent,
    TextboxComponent,
    LabelRunComponent,
    RadioRunComponent,
    CheckboxComponent,
    SelectComponent,
    SelectMultiComponent,
    SelectDetailsComponent,
    TextareaComponent,
    ToggleRunComponent,
    SliderRunComponent,
    NavigationComponent,
    TextboxRunComponent,
    CheckboxRunComponent,
    SelectRunComponent,
    TextareaRunComponent,
    TextboxDetailsComponent,
    DataCardsComponent,
    FormLibraryComponent,
    WelcomeComponent,
    ProfileComponent,
    SignupComponent,
    FormComponent,
    FormListsComponent,
    ConnectorComponent,
    ConnectorsComponent,
    GoogleMapsComponent,
    Oauth2Component,
    WaveComponent,
    PhoneFormLaunchComponent,
    GpsComponent,
    GpsRunComponent,
    QrcodeComponent,
    BarcodeComponent,
    ScannerQrcodeComponent,
    ScannerBarcodeComponent,
    QrcodeRunComponent,
    BarcodeRunComponent,
    ScannerBarcodeRunComponent,
    ScannerQrcodeRunComponent,
    ListRunComponent,
    MicroAppComponent,
    MicroAppRunComponent,
    BarcodeDetailsComponent,
    TenantAuthComponent,
    TenantLayoutComponent,
    TenantNavigationComponent
  ],
  entryComponents: [
    PinComponent,
    AuthComponent,
    SaveasComponent,
    ExportComponent,
    ImportComponent,
    ArchiveComponent,
    MessageComponent,
    ResetpasswordComponent,
    WelcomeComponent,
    ProfileComponent
  ]
})
export class ComponentModule { }
