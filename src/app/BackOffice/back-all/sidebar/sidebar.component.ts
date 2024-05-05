import { Component } from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  role!:string;
  constructor(private authService:AuthService) {
    this.role = this.authService.getFromLocalStorage('role')!;
  }

  logout() {
    this.authService.logout();
  }
  menuItems: any[] = [
    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] ,
      items: [
        { label: 'Competition Sales', icon: 'pi pi-fw pi-building', routerLink: ['/admin/totStat'] },
       
      ]
    },
    {
      label: 'Management', icon: 'pi pi-fw pi-sitemap',
      items: [
        { label: 'Accounts', icon: 'pi pi-fw pi-users', routerLink: ['/accounts'] },
        { label: 'Settings', icon: 'pi pi-fw pi-cog', routerLink: ['/settings'] }
      ]
    },
    {
      label: 'Profile', icon: 'pi pi-fw pi-user', routerLink: ['/profile']
    },
    {
      label: 'Tickets Management', icon: 'pi pi-fw pi-ticket',
      items: [
        { label: 'Tickets', icon: 'pi pi-fw pi-plus', routerLink: ['/admin/Ticket'] },
        { label: 'Tickets Card', icon: 'pi pi-fw pi-list', routerLink: ['/admin/TicketCard'] },
        { label: 'Price', icon: 'pi pi-fw pi-list', routerLink: ['/admin/Price'] }
      ]
    },
    {
      label: 'Venue Management', icon: 'pi pi-fw pi-cog', 
      items: [
        { label: 'Venue', icon: 'pi pi-fw pi-building', routerLink: ['/admin/add-town-and-venues'] },
        { label: 'Venue Plan', icon: 'pi pi-fw pi-sitemap', routerLink: ['/admin/VenuePlan'] },
        { label: 'Place', icon: 'pi pi-fw pi-map-marker', routerLink: ['/admin/Place'] },
      ]
    },
    {
      label: 'Store Management', icon: 'pi pi-fw pi-cog', 
      items: [
        { label: 'Products', icon: 'pi pi-fw pi-building', routerLink: ['/admin/products'] },
        { label: 'Products Add', icon: 'pi pi-fw pi-sitemap', routerLink: ['/admin/products/add'] },
        { label: 'Categories', icon: 'pi pi-fw pi-map-marker', routerLink: ['/admin/categorys'] },
        { label: 'Product Sales', icon: 'pi pi-fw pi-map-marker', routerLink: ['/admin/ProductSales'] },
      ]
    },
    
    
  ];



  toggleMenu(index: number): void {
    this.menuItems[index].expanded = !this.menuItems[index].expanded;
    // Optionally collapse other menus
    this.menuItems.forEach((item, idx) => {
      if (idx !== index) item.expanded = false;
    });
  }
}
