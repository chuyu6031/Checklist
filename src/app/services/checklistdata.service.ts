import { Injectable } from '@angular/core';
import { Checklist } from '../models/checklists';
import { Storage } from '@ionic/storage';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ChecklistdataService {
  public checklists: Checklist[] = [];
  public loaded: boolean = false;
  private theObservable: Observable<Object>;
  private theObserver: Observer<Object>;

  constructor(private storage: Storage) {

    this.storage.get('checklists').then((checklists) => {
      if (checklists != null) {
        this.checklists = checklists;
      }
      this.updateSubscribers();
      console.log('Service Constructor!')
    })

  }

  // load_try(): Promise<any> {
  //   return this.storage.get('checklists');
  // }

  // load(): Promise<boolean> {
  //   return new Promise((resolve) => {
  //     this.storage.get('checklists').then((checklists) => {

  //       // check if this is not empty
  //       if (checklists != null) {
  //         this.checklists = checklists;
  //       }

  //       // return its own promise that resolves after the call to storage resolves
  //       // BETTER WAY TO USE OBSERVABLE!
  //       this.loaded = true;
  //       resolve(true);
  //     });
  //   });
  // }


  getObservable(): Observable<Object> {
    if (this.theObservable === undefined) {
      this.theObservable = Observable.create(observer =>
        this.theObserver = observer);
    }
    return this.theObservable;
  }


  updateSubscribers() {
    if (this.theObserver) {
      this.theObserver.next(true);
    }
  }

  save(): void {
    this.storage.set('checklists', this.checklists);
    this.updateSubscribers();
  }

  createChecklist(data): void {
    this.checklists.push({
      id: this.generateSlug(data),
      title: data,
      remainItems: 0,
      hideCompletion: false,
      items: []
    });

    this.save();
  }

  removeChecklist(checklist): void {
    let index = this.checklists.indexOf(checklist);

    if (index > -1) {
      this.checklists.splice(index, 1);
      this.save();
    }
  }

  getChecklist(id): Checklist {
    return this.checklists.find(checklist => checklist.id === id);
  }

  addItem(checklistId, data): void {
    let checklist = this.getChecklist(checklistId);
    checklist.items.push({
      id: this.generateSlug(data),
      title: data,
      checked: false,
      priority_num: "c"
    });
    checklist.remainItems++;

    this.save();
  }

  removeItem(checklist, item): void {
    let index = checklist.items.indexOf(item);

    if (index > -1) {
      checklist.items.splice(index, 1);
      checklist.remainItems--;
      this.save();
    }
  }

  renameItem(item, data): void {
    if (data != "") {
      item.title = data;
      item.id = this.generateSlug(data);
      this.save();
    }
  }

  hideItem(checklistId): void {
    let checklist = this.getChecklist(checklistId);
    checklist.hideCompletion = !checklist.hideCompletion;
    this.save();
  }

  toggleItem(checklistId, item): void {
    let checklist = this.getChecklist(checklistId);
    item.checked = !item.checked;
    if (item.checked) {
      checklist.remainItems--;
    } else {
      checklist.remainItems++;
    }

    this.save();
  }

  priorityItem(item, data): void {
    item.priority_num = data;
    this.save();
  }

  generateSlug(title): string {

    // simplistic slug generator and won't handel things like special characters
    let slug = title.toLowerCase().replace(/\s+/g, '-');

    // check if the slug already exists
    let exists = this.checklists.filter((checklist) => {
      return checklist.id.substring(0, slug.length) === slug;
    });

    // if the title is already being used, add a number to make it unique
    if (exists.length > 0) {
      slug = slug + exists.length.toString();
    }

    return slug;

  }

}
