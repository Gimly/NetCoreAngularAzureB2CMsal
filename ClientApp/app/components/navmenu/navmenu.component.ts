import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent {
    constructor(private authService: AuthenticationService) { }

    login(): void {
        this.authService.login();
    }

    logout(): void {
        this.authService.logout();
    }

    get isOnline(): boolean {
        return this.authService.isOnline();
    }

    get user(): string {
        return this.authService.getUser().name;
    }
}
