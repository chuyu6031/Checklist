import { Component, OnInit } from '@angular/core';
import { Checklist } from '../models/checklists';
import { ChecklistdataService } from '../services/checklistdata.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.page.html',
  styleUrls: ['./checklist.page.scss'],
})


export class ChecklistPage implements OnInit {
  private slug: string;
  public checklist: Checklist;
  itemTitle: string = "";
  itemPriority: number;

  constructor(
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    private dataService: ChecklistdataService,
    public alertController: AlertController,
    public router: Router,
  ) {

    dataService.getObservable().subscribe(() => {
      this.checklist = this.dataService.getChecklist(this.slug);
      console.log('in checklists constructor, checklists updated!');
    })


  }

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('id');
    this.checklist = this.dataService.getChecklist(this.slug);
  }

  // call the getChecklist function from Service and supply it with the id of the checklist
  // will then assign the result to the class member this.checklist
  // loadChecklist() {
  //   if (this.dataService.loaded) {
  //     
  //   } else {
  //     this.dataService.load().then(() => {
  //       this.checklist =
  //         this.dataService.getChecklist(this.slug);
  //     });
  //   }

  // }

  sortPriority(): void {
    var list_items = this.checklist.items;
    list_items.sort(function (a, b) {
      var pA = a.priority_num;
      var pB = b.priority_num;
      if (pA < pB) {
        return -1;
      }
      if (pA > pB) {
        return 1;
      }
      // names must be equal
      return 0;
    });
  }

  sortAlphabet(): void {
    var list_items = this.checklist.items;
    list_items.sort(function (a, b) {
      var pA = a.title.toUpperCase();
      var pB = b.title.toUpperCase();
      if (pA < pB) {
        return -1;
      }
      if (pA > pB) {
        return 1;
      }
      // names must be equal
      return 0;
    });
  }

  backHome(): void {
    this.router.navigate(['']);
  }

  addItem(): void {
    this.dataService.addItem(this.checklist.id, this.itemTitle);
  }

  removeItem(item): void {
    this.dataService.removeItem(this.checklist, item)
  }

  renameItem(item, data): void {
    this.dataService.renameItem(item, data)
  }

  resetInput(): void {
    this.itemTitle = "";
  }

  toggleItem(item): void {
    this.dataService.toggleItem(this.checklist.id, item);
  }

  priorityItem(item, data): void {
    this.dataService.priorityItem(item, data);
  }

  test(item): void {
    console.log(item);
  }

  async editWindow(item) {
    const alert = await this.alertController.create({
      header: 'Edit Checklist Item',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: item.title
        }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Remove',
          handler: () => {
            this.removeItem(item);
            console.log('Remove Item');
          }
        }, {
          text: 'Okay',
          cssClass: 'primary',
          handler: data => {
            this.renameItem(item, data.title);
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

  // greyOut(item, checkboxValue) {
  //   var itemId = item.id;
  //   // console.log(itemId);
  //   var x = document.getElementById(itemId);
  //   // console.log(x);
  //   if (checkboxValue) {
  //     x.style.opacity = "0.5";
  //   } else {
  //     x.style.opacity = "1";
  //   }
  // }

  changeHide() {
    this.dataService.hideItem(this.slug);
  }

  // hideCompletion(checked) {
  //   var len = this.checklist.items.length;
  //   for (var i = 0; i < len; i++) {
  //     var thisItem = this.checklist.items[i];
  //     var itemId = thisItem.id;
  //     var x = document.getElementById(itemId);

  //     if (checked) {
  //       if (thisItem.checked) {
  //         x.style.display = "none";
  //       } else {
  //         x.style.display = "block";
  //       }
  //     } else {
  //       x.style.display = "block";
  //     }
  //   }
  // }



}
