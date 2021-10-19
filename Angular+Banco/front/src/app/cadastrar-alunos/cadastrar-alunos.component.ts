import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Alunos } from '../alunos';
import { AlunosService } from '../alunos.service';

@Component({
  selector: 'app-cadastrar-alunos',
  templateUrl: './cadastrar-alunos.component.html',
  styleUrls: ['./cadastrar-alunos.component.css']
})
export class CadastrarAlunosComponent implements OnInit {


  alNome: string = '';
  alIdade: number = 0;
  alResp: string = '';
  alIdent: string = '';
  alSala: string = '';

  alunos: Alunos[] = [];
  alEdit: Alunos = null;

  private unSubscribe$: Subject<any> = new Subject();

  constructor(private alunosService: AlunosService) { }

  ngOnInit(): void {
    this.alunosService.get()
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe((als) => this.alunos = als);

  }


  save() {
    if (this.alEdit && this.alNome.length !== 0) {
      this.alunosService.update(
        { nome: this.alNome,
          _id: this.alEdit._id,
          sala: this.alEdit.sala,
          idade:this.alEdit.idade, 
          responsavel: this.alEdit.responsavel, 
          identificacao: this.alEdit.identificacao
         })
        .subscribe(
          (al) => {
            this.notify('Updated!');
          },
          (err) => {
            this.notify('Error');
            console.error(err);
          }
        )
    } else {
      if (this.alNome.length > 0) {
        this.alunosService.add({ 
          nome: this.alNome,
          sala: this.alSala,
          idade:this.alIdade, 
          responsavel: this.alResp, 
          identificacao: this.alIdent
        
        })
          .subscribe(
            (al) => {
              console.log(al);
              this.notify('INSERTED!');
            },
            (err) => {
              console.error(err);
            }
          )
        this.clearFields();
      } else {
        this.cancel();

      }
    }

  }


  edit(al: Alunos) {
    this.alNome = al.nome;
    this.alEdit = al
  }


  clearFields() {
    this.alNome = '';
    this.alIdade = 0;
    this.alResp = '';
    this.alIdent  = '';
    this.alSala = '';
    this.alEdit = null;
  }

  cancel() {
    this.clearFields();
  }

  notify(msg: string) {
    console.log("Notificação: ", msg);
  }

  ngOnDestroy() {
    this.unSubscribe$.next();
  }
}
