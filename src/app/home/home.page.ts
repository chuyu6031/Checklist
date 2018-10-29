import { Component, OnInit } from '@angular/core';
import { ChecklistdataService } from '../services/checklistdata.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  listTitle: string = "";

  constructor(public dataService: ChecklistdataService,
    private alterCtrl: AlertController,
    private router: Router) {
  }


  selectList(checklist): void {
    console.log(checklist);
    this.router.navigate(['/checklists', checklist.id])
  }

  addChecklist(): void {
    this.dataService.createChecklist(this.listTitle);
  }

  removeChecklist(checklist): void {
    this.dataService.removeChecklist(checklist);
  }

  resetInput(): void {
    this.listTitle = "";
  }

  sortByRemainDes(): void {
    var list = this.dataService.checklists;
    list.sort(function (a, b) {
      var rA = a.remainItems;
      var rB = b.remainItems;
      if (rA > rB) {
        return -1;
      }
      if (rA < rB) {
        return 1;
      }
      // names must be equal
      return 0;
    });
  }

  sortByRemainAsc(): void {
    var list = this.dataService.checklists;
    list.sort(function (a, b) {
      var rA = a.remainItems;
      var rB = b.remainItems;
      if (rA < rB) {
        return -1;
      }
      if (rA > rB) {
        return 1;
      }
      // names must be equal
      return 0;
    });
  }

}
