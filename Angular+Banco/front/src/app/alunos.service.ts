import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alunos } from './alunos';
import { tap, delay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})

export class AlunosService {

  readonly url = 'http://localhost:3000/alunos';

  private alunosSubject$: BehaviorSubject<Alunos[]> = new BehaviorSubject<Alunos[]>(null);

  private loaded: boolean = false;

  constructor(private http: HttpClient) { }

  get(): Observable<Alunos[]>{
    if (!this.loaded) {
      this.http.get<Alunos[]>(this.url)
      .pipe(
        tap((alunos)=> console.log(alunos)),
        delay(1000)
      )
      .subscribe(this.alunosSubject$);
      this.loaded = true
    }
    return this.alunosSubject$.asObservable();
  }

  add(a: Alunos): Observable<Alunos>{
    return this.http.post<Alunos>(this.url, a)
    .pipe(
      tap((al: Alunos)=> this.alunosSubject$.getValue().push(al))
    )
  }

  del(al: Alunos): Observable<any> {
    return this.http.delete(`${this.url}/${al._id}`)
    .pipe(
      tap(()=>{
        let alunos = this.alunosSubject$.getValue();
        let i = alunos.findIndex(a => a._id === al._id);
        if (i>=0) {
          alunos.splice(i,1)
        }
      })
    )
  }


  update(al: Alunos): Observable<Alunos> {
    return this.http.patch<Alunos>(`${this.url}/${al._id}`, al)
    .pipe(
      tap((a)=>{
        let alunos = this.alunosSubject$.getValue();
        let i = alunos.findIndex(a => a._id === al._id);
        if (i>=0) {
          alunos[i].nome = a.nome;
          alunos[i].idade = a.idade;
          alunos[i].identificacao = a.identificacao;
          alunos[i].responsavel = a.responsavel;
          alunos[i].sala = a.sala
        }
      })
    )
  }

}