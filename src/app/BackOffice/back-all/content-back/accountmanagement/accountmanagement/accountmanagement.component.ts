import {Component, OnInit} from '@angular/core';
import {UserDTO} from "../../../../../core/models/userDTO";
import {AccountService} from "../../../../../core/services/account.service";
import {MessageService} from "primeng/api";
import {Table} from "primeng/table";
import {SignupRequest} from "../../../../../core/models/signupRequest";

@Component({
  selector: 'app-accountmanagement',
  templateUrl: './accountmanagement.component.html',
  styleUrls: ['./accountmanagement.component.css'],
  providers: [MessageService]
})
export class AccountmanagementComponent implements OnInit {

  accountsList!: UserDTO[];
  displayBanAccount: boolean = false;
  displayEnableAccount: boolean = false;
  userName!: string;
  signupDialog: boolean = false;
  submitted: boolean = false;
  signupRequest: SignupRequest = {};
  option!: string[];

  constructor(private accountService: AccountService, private messageService: MessageService) {
    this.option = ['admin', 'jury', 'dancer', 'school', 'registred_user', 'coach'];
  }

  ngOnInit(): void {
    this.getListAccounts();
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  getListAccounts() {
    this.accountService.listAccounts().subscribe({
      next: (data) => {
        this.accountsList = data.reverse();
      },
      error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Server error', life: 3000});
      }
    })
  }

  confirmBanAccount() {
    this.accountService.banAccount(this.userName).subscribe({
      next: (data) => {
        this.displayBanAccount = false;
        this.getListAccounts();
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Account disabled', life: 3000});
      }, error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Server error', life: 3000});
      }
    });
  }

  confirmEnableAccount() {
    this.accountService.enableAccount(this.userName).subscribe({
      next: (data) => {
        this.displayEnableAccount = false;
        this.getListAccounts();
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Account enabled', life: 3000});
      }, error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Server error', life: 3000});
      }
    });
  }

  createAccount() {
    this.submitted = true;
    if (this.signupRequest.username && this.signupRequest.email && this.signupRequest.password && this.signupRequest.firstName
      && this.signupRequest.lastName && this.signupRequest.role) {
      this.accountService.createAccount(this.signupRequest).subscribe({
        next: (data) => {
          this.messageService.add({severity: 'success', summary: 'Successful', detail: data.message, life: 3000});
          this.signupDialog = false;
          this.submitted = false;
          this.getListAccounts();
        },
        error: (err) => {
          this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.message, life: 3000});
          this.signupDialog = false;
          this.submitted = false;
        }
      });
    }
  }
}
