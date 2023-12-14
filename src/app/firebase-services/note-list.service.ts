import { Injectable } from '@angular/core';
import { Note } from '../interfaces/note.interface';
import { inject } from '@angular/core';
import { Firestore, collection, doc, collectionData, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {

  trashNotes: Note[] = [];
  normalNotes: Note[] = [];
  items$;
  items;
  unsubList;
  unsubSingel;

  firestore: Firestore = inject(Firestore);

  constructor() {
    this.unsubList = onSnapshot(this.getNotesRef(), (list) => {
      list.forEach(element => {
        console.log(element);
      });
    });

    this.unsubSingel = onSnapshot(this.getSingelDocRef("notes", "a364627348929274"), (element) => {})

    this.unsubList();
    this.unsubSingel();

     this.items$ = collectionData(this.getNotesRef());
     this.items = this.items$.subscribe( (list) => {
       list.forEach(element => {
         console.log(element);
       });
     });
     this.items.unsubscribe();
   }

  itemCollection = collection(this.firestore, 'items');

  getNotesRef(){
    return collection(this.firestore, 'Notes');
  }

  getTrashRef(){
    return collection(this.firestore, 'trash');
  }

  getSingelDocRef(colId:string, docID:string){
    return doc(collection(this.firestore, colId), docID);
  }
}
