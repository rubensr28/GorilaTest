import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Portifolio } from './models/portifolio';
import { Acao } from './models/acao';

const apiUrl='https://app.gorilainvest.com.br/api/';
const FundID =194004;
const JWT = getJWT();

@Injectable({
  providedIn: 'root'
})
export class ApiService{

  //injection HttpClient
  constructor(private http: HttpClient) { }

  //Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Authorization': 'Bearer ' + JWT })
  }

  getPortifolio(){
    var _date180d = new Date();
    _date180d.setDate(_date180d.getDate() - 180);
    var date180d =_date180d.toLocaleDateString() ;
    var requestUrl = apiUrl.concat(`portfolio/${FundID}/profit?periodType=DAILY&minDate=${date180d}&groupBySecurity=false&reduceProfitMaxPoints=1`);
    return this.http.get<Portifolio[]>(requestUrl, this.httpOptions ).pipe(retry(2),catchError(this.handleError));   
  }
  postAcao(acoes: Acao[]): Observable<Acao[]> {
    var requestUrl = apiUrl.concat('booker/list');
    return this.http.post<Acao[]>(requestUrl, acoes, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //erro
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}

function getJWT(){
  return "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik56UXpPRGN4UVRVeVFqRTBNRE16TURkR1FUY3dOVUl3UmtSR016azVSamxEUVRGR01qUTNOQSJ9.eyJlbWFpbCI6InJ1YmVuc19yMjhAaG90bWFpbC5jb20iLCJuYW1lIjoicnViZW5zX3IyOEBob3RtYWlsLmNvbSIsIm5pY2tuYW1lIjoicnViZW5zX3IyOCIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci9lY2FlOGYyMjAxMDViOWViMjAzMzljNzU2MDgzZjVlND9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRnJ1LnBuZyIsInVzZXJfbWV0YWRhdGEiOnsibmFtZSI6IlJ1YmVucyBSb2RyaWdvIE1hcnF1ZXMiLCJmaXJzdF9sb2dpbiI6ZmFsc2V9LCJsYXN0X3Bhc3N3b3JkX3Jlc2V0IjoiMjAyMC0wNC0yOVQyMToyNjozMi4zMTBaIiwiYXBwX21ldGFkYXRhIjp7ImZ1bmRJZCI6MTk0MDA0fSwiZnVuZElkIjoxOTQwMDQsImNsaWVudElEIjoiRVF5WjAzb3l3QW1nMUw2NzNXTDY5M1hscnlXcFFRdGoiLCJjcmVhdGVkX2F0IjoiMjAyMC0wNC0yN1QxODo1MToyOC41MzVaIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlkZW50aXRpZXMiOlt7InVzZXJfaWQiOiI1ZWE3MjliMDYwMTliYjBjZDRiYTAzNWIiLCJwcm92aWRlciI6ImF1dGgwIiwiY29ubmVjdGlvbiI6IlVzZXJuYW1lLVBhc3N3b3JkLUF1dGhlbnRpY2F0aW9uIiwiaXNTb2NpYWwiOmZhbHNlfV0sInVwZGF0ZWRfYXQiOiIyMDIwLTA0LTI5VDIxOjI2OjUwLjQxNloiLCJ1c2VyX2lkIjoiYXV0aDB8NWVhNzI5YjA2MDE5YmIwY2Q0YmEwMzViIiwiaXNzIjoiaHR0cHM6Ly9nb3JpbGFpbnZlc3QtcHJvZC5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWVhNzI5YjA2MDE5YmIwY2Q0YmEwMzViIiwiYXVkIjoiRVF5WjAzb3l3QW1nMUw2NzNXTDY5M1hscnlXcFFRdGoiLCJpYXQiOjE1ODgxOTU2MTAsImV4cCI6MTU4ODIxMzYxMH0.OmEDTYgZ18TAarXZ2vHB8t0xKqBzncEG86FE7e8H_sKDmFMzUy0E2FEgLVFs5Q9UkY333GscW6_vmHxL_toQeBOr2l4W1HOY9_T27Bf6YCj9iviQlzAN9cMOVmHBlm6NKgGZQndpYREEHfB-WK-3npMsl-ioLPGRGjxtYVagraH06GA4si2DmW5VkdbNJaaI1Y-Ud2gXiIEHEdb8faSQKsBgvSPIsQ9TIpF6kP8bZyaVz_wzcI5crsqD-9A5xPmq-iANJsWMTlIkFmyxtUdEYsfaxj89icFC3g_04kiwfJqGOl7Gfc3biP_pk0s7ZmdizRy2Kv6yuNvOy_n7sGOY9Q";
}

