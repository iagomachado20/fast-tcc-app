import { Component, Type, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilService } from 'src/app/services/util.service';
import { AuthServiceProvider } from 'src/app/services/auth.service';
import { TypeUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit{

  formClient: FormGroup;
  formEstablishment: FormGroup;
  selectedProfileType: TypeUser;
  showForm = false;
  typesUser = [
    {
      title: 'Estabelecimento',
      description: 'Promova as vagas do seu estabelecimento',
      icon: 'assets/icons/car.png',
      type: TypeUser.Establishment
    },
    {
      title: 'Cliente',
      description: 'Encontre estabelecimentos com vagas disponíveis',
      icon: 'assets/icons/client.png',
      type: TypeUser.Client
    }
  ];

  constructor(
    public fb: FormBuilder,
    private util: UtilService,
    private auth: AuthServiceProvider
  ) {}

  ngOnInit() {

    //Form Client
    this.formClient = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      placaVeiculo: ['', [ Validators.required ]],
      marcaVeiculo: ['', [ Validators.required ]],
      perfil: TypeUser.Client,
      password: ['', [Validators.required]]

    });
    
    //Form Client
    this.formEstablishment = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      numero: [0, [ Validators.required ]],
      valorhora: [0, [ Validators.required ]],
      endereco: ['', Validators.required],
      localizacao: [[-100, -100], Validators.required],
      horarioFuncionamento: ['', Validators.required],
      perfil: TypeUser.Establishment,
      observacao: ['', [Validators.required]],
      password: ['', [Validators.required]]

    });

  }

  setProfileRegister(type: TypeUser): void {
    this.selectedProfileType = type;
    this.showForm = true;
  }

}
