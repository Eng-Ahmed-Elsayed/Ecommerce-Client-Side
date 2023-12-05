import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Country } from 'src/app/shared/models/shared/country';
import { UserAddressDto } from 'src/app/shared/models/customer/userAddressDto';
import { CustomerService } from '../../../../../shared/services/customer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { State } from 'src/app/shared/models/shared/state';

@Component({
  selector: 'app-user-address-form',
  templateUrl: './user-address-form.component.html',
  styleUrls: ['./user-address-form.component.scss'],
})
export class UserAddressFormComponent implements OnInit {
  @Input() checkOut: boolean = false;
  userAddressForm!: FormGroup;
  @Input() userAddress!: UserAddressDto;
  @Input() isUpdate: boolean = false;
  @Output() newUserAddressEvent = new EventEmitter<UserAddressDto>();
  // Have to put this in the form before the API call.
  selectedCountry: any;
  selectedState: any;
  countries: Country[] = [
    {
      name: 'Australia',
      states: [
        {
          name: 'New South Wales',
          cities: ['Sydney', 'Newcastle', 'Wollongong'],
        },
        {
          name: 'Queensland',
          cities: ['Brisbane', 'Townsville'],
        },
      ],
    },
    {
      name: 'Canada',
      states: [
        {
          name: 'Quebec',
          cities: ['Montreal', 'Quebec City'],
        },
        {
          name: 'Ontario',
          cities: ['Ottawa', 'Toronto'],
        },
      ],
    },
    {
      name: 'United States',
      states: [
        {
          name: 'California',
          cities: ['Los Angeles', 'San Diego', 'San Francisco'],
        },
        {
          name: 'Florida',
          cities: ['Jacksonville', 'Miami', 'Tampa', 'Orlando'],
        },
        {
          name: 'Texas',
          cities: ['Austin', 'Dallas', 'Houston'],
        },
      ],
    },
  ];

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    // If add new.
    this.userAddressForm = this.fb.group({
      firstName: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(20),
          ],
        },
      ],
      lastName: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(20),
          ],
        },
      ],
      addressLine1: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(80),
          ],
        },
      ],
      addressLine2: [
        '',
        {
          validators: [Validators.minLength(2), Validators.maxLength(80)],
        },
      ],
      country: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(40),
          ],
        },
      ],
      state: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(40),
          ],
        },
      ],
      city: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(40),
          ],
        },
      ],
      postalCode: [
        ,
        {
          validators: [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(10),
          ],
        },
      ],
      telephone: [
        ,
        {
          validators: [Validators.minLength(4), Validators.maxLength(25)],
        },
      ],
      mobile: [
        ,
        {
          validators: [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(25),
          ],
        },
      ],
    });
    // Update
    if (this.isUpdate) {
      // Get Country and state to the form
      // and set Selected State and Selected Country
      let formCountry!: Country, formState!: State;
      this.countries.forEach((country) => {
        if (country.name == this.userAddress.country) {
          this.selectedCountry = this.userAddress.country;
          formCountry = country;
          country.states.forEach((state) => {
            if (state.name == this.userAddress.state) {
              this.selectedState = this.userAddress.state;
              formState = state;
            }
          });
        }
      });
      this.userAddressForm.reset({
        firstName: this.userAddress.firstName,
        lastName: this.userAddress.lastName,
        addressLine1: this.userAddress.addressLine1,
        addressLine2: this.userAddress.addressLine2,
        country: formCountry,
        state: formState,
        city: this.userAddress.city,
        postalCode: this.userAddress.postalCode,
        telephone: this.userAddress.telephone,
        mobile: this.userAddress.mobile,
      });
      this.userAddressForm.addControl(
        'id',
        new FormControl(this.userAddress.id)
      );
    }
  }

  onCountryChange(event: any) {
    this.selectedCountry = event.value.name;
  }

  onStateChange(event: any) {
    this.selectedState = event.value.name;
  }

  upsertAddress() {
    // Modify State and Country
    let body: UserAddressDto = this.userAddressForm.getRawValue();
    body.country = this.selectedCountry;
    body.state = this.selectedState;
    // body.postalCode = body.postalCode?.replaceAll('_', '');
    // body.telephone = body.mobile?.replaceAll('_', '');
    // body.mobile = body.mobile?.replaceAll('_', '');
    console.log(body);

    // If add new address
    if (!this.isUpdate) {
      this.customerService.addUserAddress(body).subscribe({
        next: (res: UserAddressDto) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Added new address successfully!',
            detail: 'You have just added a new address method successfully.',
          });
          this.newUserAddressEvent.emit(res);
          this.userAddressForm.reset();
        },
        error: (err: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Add address failed!',
            detail: 'Faild to add new address method.',
          });
          console.log(err);
        },
      });
      // Update address
    } else {
      this.customerService.updateUserAddress(body).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Update address successfully!',
            detail: 'You have just updated your address method successfully.',
          });
        },
        error: (err: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Update address failed!',
            detail: 'Faild to update your address method.',
          });
          console.log(err);
        },
      });
    }
  }
}
