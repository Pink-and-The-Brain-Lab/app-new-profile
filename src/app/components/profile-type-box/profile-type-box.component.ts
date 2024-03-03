import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-profile-type-box',
  templateUrl: './profile-type-box.component.html',
  styleUrls: ['./profile-type-box.component.scss']
})
export class ProfileTypeBoxComponent {

  @Input() title = '';
  @Input() text = '';
  @Input() buttonText = '';
  @Input() buttonRoute = '';
  @Input() buttonType: 'primary' | 'info' = 'primary';
  @Input() disableButton = false;
  @Output() buttonEvent = new EventEmitter<string>();

  createNew() {
    this.buttonEvent.emit(this.buttonRoute);
  }

}
