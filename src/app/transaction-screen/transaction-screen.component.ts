import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SharedServiceService } from '../shared-service.service';
import { GroupedData } from './transaction.model';
import { MatIconModule } from '@angular/material/icon';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-transaction-screen',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './transaction-screen.component.html',
  styleUrl: './transaction-screen.component.scss',
})
export class TransactionScreenComponent implements OnInit {
  transactionsArr: any = [];
  start: string = new Date().toISOString().slice(0, 10);
  end: string = new Date().toISOString().slice(0, 10);
  // start: string = new Date().toISOString().slice(0, 10);
  @Output() toggleDrawer: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private sharedService: SharedServiceService,
    private swPush: SwPush
  ) {}

  ngOnInit() {
    // this.sharedService.subscribeToNotifications(this.sharedService.mobileNumber);
    this.swPush.messages.subscribe((message) => {
    });

    this.sharedService
      .getMyLedger('194ab93ce0a', '2025-08-08', '2025-08-11')
      .subscribe((data: any) => {
        let transactionsData: any[] = data.responseBody.transactions;
        let groupedData: GroupedData[] = [];
        // let newDateIndex: number | null = null;
        let curr_date = ``;

        for (let i = transactionsData.length - 1; i >= 0; i--) {
          const element = transactionsData[i];

          if (curr_date === element.date) {
            groupedData[groupedData.length - 1].dr += element.dr;
            groupedData[groupedData.length - 1].cr += element.cr;
            groupedData[groupedData.length - 1].items.push({
              itemName: element.itemName,
              dr: element.dr,
              cr: element.cr,
            });
          } else {
            curr_date = element.date;
            groupedData.push({
              date: element.date,
              dr: element.dr,
              cr: element.cr,
              items: [
                { itemName: element.itemName, dr: element.dr, cr: element.cr },
              ],
            });
          }
        }
        this.transactionsArr = groupedData;
      });
  }

  getTransactionData() {
    // this.sharedService.getHelloLambda().subscribe((data: any) => {
    //   console.log('Hello Lambda response:', data);
    // });
    const vyapariId = localStorage.getItem('vyapariId'); // Example vyapariId
    if (vyapariId) {
      this.sharedService.getMyLedger(vyapariId, this.start, this.end).subscribe((data: any) => {
      });
    }else console.log("vyapariId not found in localStorage");
  }

  toggleDrawerFn() {
    this.toggleDrawer.emit(!this.toggleDrawer);
  }
}
