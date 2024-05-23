import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DepartmentService{
    constructor(private http: HttpClient) { }

  getDepartments(): Observable<any> {
    return this.http.get('https://api-colombia.com/api/v1/Department');
  }

  getCitiesByDepartment(departmentId: string): Observable<any> {
    return this.http.get('https://api-colombia.com/api/v1/Department/Department/${departmentId}/cities');
  }
}
