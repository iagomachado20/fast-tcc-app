import { ErrorRequest, SuccessRequest } from './../../models/errors.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilService } from 'src/app/services/util.service';
import { AuthServiceProvider } from 'src/app/services/auth.service';
import { TypeUser } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit{

  userType = TypeUser;
  form: FormGroup;
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
    private auth: AuthServiceProvider,
    private router: Router
  ) {}

  ngOnInit() {}

  setProfileRegister(type: TypeUser): void {
    this.form = this.setFormByUser(type);
    this.selectedProfileType = type;
    this.showForm = true;

  }

  private navigate() {

    this.router.navigate(['/']);

  }

  private setFormByUser(type: TypeUser): FormGroup {

    if (type === TypeUser.Establishment) {

      return this.fb.group({
        nome: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        numero: [0, [ Validators.required ]],
        valorhora: [0, [ Validators.required ]],
        endereco: ['', Validators.required],
        localizacao: [[-100, -100], Validators.required],
        horarioFuncionamento: ['', Validators.required],
        perfil: TypeUser.Establishment,
        observacao: ['', [Validators.required]],
        telefone: ['', [Validators.required]],
        password: ['', [Validators.required]]
      });

    }

    return this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      placaVeiculo: ['', [ Validators.required ]],
      marcaVeiculo: ['', [ Validators.required ]],
      perfil: TypeUser.Client,
      telefone: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

  }

  resetCycle() {
    this.showForm = false;
    this.selectedProfileType = null;
    this.form = null;

    this.navigate();

  }

  register() {

    if (this.form.invalid) { return false; }

    const { value } = this.form;

    this.util.showLoading();

    this.auth.registerUser(value)
    .subscribe((response: SuccessRequest) => {

      this.util.hideLoading();
      this.util.showToast(response.message);

      this.navigate();

    }, (error: ErrorRequest) => {

      this.util.hideLoading();
      this.util.showToast(error.error.message);

    });

  }

}
