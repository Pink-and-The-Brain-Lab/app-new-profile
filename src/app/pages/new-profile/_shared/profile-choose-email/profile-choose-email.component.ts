import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { Store } from '@ngxs/store';
import { ProfileState } from 'src/app/states/state/profile.state';
import { UpdateProfileAction } from 'src/app/states/actions/update-profile.action';

@Component({
  selector: 'app-profile-choose-email',
  templateUrl: './profile-choose-email.component.html',
  styleUrls: ['./profile-choose-email.component.scss']
})
export class ProfileChooseEmailComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<boolean>();
  canUseEmail = false;
  hasEmailChecked = false;
  availableEmails: string[] = [];
  allTestedEmails: string[] = [];
  isLoading = false;
  emailValidationMessage = 'Email is invalid';

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.email?.valueChanges
    .pipe(
      takeUntil(this.destroy$),
      debounceTime(300),
      distinctUntilChanged()
    )
    .subscribe(
      () => this.checkEmail()
    );
  }

  get email(): AbstractControl | null {
    return this.form.get('email');
  }

  checkEmail() {
    this.emailValidationMessage = 'Email is invalid';
    if (this.allTestedEmails.includes(this.email?.value)) {
      this.hasEmailChecked = true;
      if (this.availableEmails.includes(this.email?.value)) this.canUseEmail = true;
      else {
        this.canUseEmail = false;
        this.setFormError();
      }
      return;
    }
    
    this.canUseEmail = false;
    this.hasEmailChecked = false;
  }

  setFormError() {
    this.email?.setErrors({ email: true });
    this.emailValidationMessage = 'Email unavailable';
  }

  validateEmail() {
    this.isLoading = true;
    /**
     * aqui é onde será enviado o email ao backend para validação, caso o email esteja disponivel para uso, 
     * salvamos o email em um array, e setamos a variavel canUseEmail para true
     */
    setTimeout(() => {
      this.isLoading = false;
      // em toda vez que chamar a API para validar um email, salvar esse email nessa lista
      this.allTestedEmails.push(this.email?.value);
      this.hasEmailChecked = true;
      this.canUseEmail = true;
      // salvar nessa lista somente os emails disponiveis
      this.availableEmails.push(this.email?.value);
      // e quando a API retornar um email indisponivel, chamar esse método
      // this.setFormError();
    }, 3000);
  }

  next() {
    const profile = this.store.selectSnapshot(ProfileState);
    const profileUpdated = {
      ...profile,
      email: this.email?.value,
    };
    this.store.dispatch( new UpdateProfileAction(profileUpdated) );
    this.router.navigate(['/new-profile/choose-phone-number']);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
