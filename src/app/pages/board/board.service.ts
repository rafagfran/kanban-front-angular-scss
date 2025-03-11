import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Columns } from '@type/types';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class BoardService {
	url = 'http://localhost:3000/column/with-cards';
	constructor(private http: HttpClient) {}

	fetchColumnsWithCards(){
		return this.http.get<Columns[]>(this.url);
	}
}
