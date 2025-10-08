import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SharedServiceService } from '../shared-service.service';
import { GroupedData } from './transaction.model';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms'
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-transaction-screen',
  standalone: true,
  imports: [MatIconModule, FormsModule],
  templateUrl: './transaction-screen.component.html',
  styleUrl: './transaction-screen.component.scss',
})
export class TransactionScreenComponent implements OnInit {
  transactionsArr: any = [];
  start: string = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().slice(0, 10);
  end: string = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().slice(0, 10);
  today = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];
  @Output() toggleDrawer: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private sharedService: SharedServiceService,
    private swPush: SwPush
  ) { }

  ngOnInit() {
    this.swPush.messages.subscribe((message) => {
      if (message) {
        this.getTransactionData();
      }
    });

    this.getTransactionData();
  }

  getTransactionData() {
    const partyId = localStorage.getItem('partyId');
    if (partyId) {
      this.sharedService.getMyLedger(partyId, this.start, this.end).subscribe((data: any) => {
        let transactionsData: any[] = data.responseBody.transactions;
        let groupedData: GroupedData[] = [];
        let curr_date = ``;

        for (let i = transactionsData.length - 1; i >= 0; i--) {
          const element = transactionsData[i];

          if (curr_date === element.date) {
            groupedData[groupedData.length - 1].dr += element.dr;
            groupedData[groupedData.length - 1].cr += element.cr;
            groupedData[groupedData.length - 1].items.push({
              itemName: element.itemName,
              dr: element.dr ? element.dr : "",
              cr: element.cr ? element.cr : "",
              remark: element.remark ? ` | ${element.remark}` : "",
            });
          } else {
            curr_date = element.date;
            groupedData.push({
              date: element.date,
              dr: element.dr,
              cr: element.cr,
              items: [
                { itemName: element.itemName, dr: element.dr ? element.dr : "", cr: element.cr ? element.cr : "",remark: element.remark ? ` | ${element.remark}` : "" },
              ],
            });
          }
        }
        this.transactionsArr = groupedData;

      });
    } else console.log("partyId not found in localStorage");
  }

  toggleDrawerFn() {
    this.toggleDrawer.emit(!this.toggleDrawer);
  }
}
