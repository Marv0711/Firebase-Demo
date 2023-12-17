import { Injectable, SimpleChanges } from '@angular/core';
import { Note } from '../interfaces/note.interface';
import { inject } from '@angular/core';
import { Firestore, collection, doc, collectionData, onSnapshot, addDoc, updateDoc, deleteDoc, orderBy, limit, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { NoteComponent } from '../note-list/note/note.component';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {

  trashNotes: Note[] = [];
  normalNotes: Note[] = [];
  normalMarkedNotes: Note[] = [];
  unsubNote;
  unsubTrash;
  unsubMarkedNotes;

  firestore: Firestore = inject(Firestore);

  constructor() {
    this.unsubTrash = this.subTrashList();
    this.unsubNote = this.subNoteList();
    this.unsubMarkedNotes = this.subMarkedList();
  }

   subTrashList(){
    return onSnapshot(this.getTrashRef(), (list) => {
      this.trashNotes = [];
      list.forEach(element => {
        this.trashNotes.push(this.setNoteObject(element.data(), element.id));
      });
    });
   }

   subNoteList(){
    const q = query(this.getNotesRef(), limit(100))
    return onSnapshot(q, (list) => {
      this.normalNotes = [];
      list.forEach(element => {
        this.normalNotes.push(this.setNoteObject(element.data(), element.id));
      });
      list.docChanges().forEach((change) => {
        if (change.type === "added") {
            console.log("New Note: ", change.doc.data());
        }
        if (change.type === "modified") {
            console.log("Modified Note: ", change.doc.data());
        }
        if (change.type === "removed") {
            console.log("Removed Note: ", change.doc.data());
        }
      });
    });
   }

   subMarkedList(){
    const q = query(this.getNotesRef(),where("marked","==",true));
    return onSnapshot(q, (list) => {
      this.normalMarkedNotes = [];
      list.forEach(element => {
        this.normalMarkedNotes.push(this.setNoteObject(element.data(), element.id));
      });
    });
   }

   setNoteObject(obj: any, id: string): Note{
    return{
      id: id,
      type: obj.type || "",
      title: obj.title || "",
      content: obj.content || "",
      marked: obj.marked || false 
    }
   }

   ngOnDestroy(){
    this.unsubNote();
    this.unsubTrash();
    this.unsubMarkedNotes();
   }

  getNotesRef(){
    return collection(this.firestore, 'Notes');
  }

  getTrashRef(){
    return collection(this.firestore, 'trash');
  }

  getSingelDocRef(colId:string, docID:string){
    return doc(collection(this.firestore, colId), docID);
  }

  async addNote(item: Note, colId: "trash" | "Notes"){
    if(colId == "Notes"){
      await addDoc(this.getNotesRef(), item).catch(
        (err) => { console.error(err)}
      )
    }
    else{
      await addDoc(this.getTrashRef(), item).catch(
        (err) => { console.error(err)}
      )
    }
  }

  async updateNote(note:Note){
    if(note.id){
      let docRef = this.getSingelDocRef(this.getColIdFromNote(note), note.id);
      await updateDoc(docRef, this.getcleanJSON(note)).catch(
        (err) => { console.error(err) }
      );
    }
  }

  getcleanJSON(note: Note){
    return {
      type: note.type,
      title: note.title,
      content: note.content,
      marked: note.marked,
    }
  }

  getColIdFromNote(note: Note){
    if(note.type == 'note'){
      return 'Notes'
    }
    else{
      return 'trash'
    }
  }

  async deleteNote(colId:string, docID:string){
    await deleteDoc(this.getSingelDocRef(colId, docID)).catch(
      (err) => {console.error(err)}
      )
  }

}
