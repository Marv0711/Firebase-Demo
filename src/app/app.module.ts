import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteComponent } from './note-list/note/note.component';
import { FormsModule } from '@angular/forms';
import { AddNoteDialogComponent } from './add-note-dialog/add-note-dialog.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NoteListComponent,
    NoteComponent,
    AddNoteDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    //provideFirebaseApp(() => initializeApp({"projectId":"da-keep-b4a9b","appId":"1:342848032853:web:d99c7d115ffe8a4623c4dc","storageBucket":"da-keep-b4a9b.appspot.com","apiKey":"AIzaSyCOLxypxtKALkOjSYXBgT6kCO1NzxGFPB0","authDomain":"da-keep-b4a9b.firebaseapp.com","messagingSenderId":"342848032853"})),
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() => initializeApp({"projectId":"danotes-4a5b2","appId":"1:821880224006:web:ec1aa70cff793883788687","storageBucket":"danotes-4a5b2.appspot.com","apiKey":"AIzaSyDMwgCQEcneEve061wpsof-ANC9sEMWdUk","authDomain":"danotes-4a5b2.firebaseapp.com","messagingSenderId":"821880224006","measurementId":"G-6VY31D3C3E"}))
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
