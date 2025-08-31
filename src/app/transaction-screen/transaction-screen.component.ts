import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../shared-service.service';
import { GroupedData } from './transaction.model';

@Component({
  selector: 'app-transaction-screen',
  standalone: true,
  imports: [],
  templateUrl: './transaction-screen.component.html',
  styleUrl: './transaction-screen.component.scss',
})
export class TransactionScreenComponent implements OnInit {
  transactionsArr: any = [];

  constructor(private sharedService: SharedServiceService) {}

  ngOnInit() {
    this.sharedService.subscribeToNotifications(this.sharedService.mobileNumber);

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
    this.sharedService.getHelloLambda().subscribe((data: any) => {
      console.log('Hello Lambda response:', data);
    });
  }
}
