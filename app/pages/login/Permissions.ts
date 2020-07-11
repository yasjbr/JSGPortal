import { tokenNotExpired } from 'angular2-jwt';

export class Permissions {
	canActivate(id: string): boolean {
		const token = localStorage.getItem('token');
		return token != null && this.isLoggedIn();
	} 

	private isLoggedIn() {
		return tokenNotExpired();
	}
}
