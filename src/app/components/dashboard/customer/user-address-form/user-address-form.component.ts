import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Country } from 'src/app/shared/models/country';
import { UserAddressDto } from 'src/app/shared/models/userAddressDto';
import { CustomerService } from '../../admin/services/customer.service';
import { HttpErrorResponse } from '@angular/common/http';

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
    // If add add new
    if (!this.isUpdate) {
      this.userAddressForm = this.fb.group({
        firstName: [''],
        lastName: [''],
        addressLine1: [''],
        addressLine2: [''],
        country: [''],
        state: [''],
        city: [''],
        postalCode: [],
        telephone: [],
        mobile: [],
      });
    }
    // Update
    else {
      // Get Country and state to the form
      // and set Selected State and Selected Country
      let formCountry, formState;
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
      this.userAddressForm = this.fb.group({
        id: [this.userAddress.id],
        firstName: [this.userAddress.firstName],
        lastName: [this.userAddress.lastName],
        addressLine1: [this.userAddress.addressLine1],
        addressLine2: [this.userAddress.addressLine2],
        country: [formCountry],
        state: [formState],
        city: [this.userAddress.city],
        postalCode: [this.userAddress.postalCode],
        telephone: [this.userAddress.telephone],
        mobile: [this.userAddress.mobile],
      });
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
    // If add add new
    if (!this.isUpdate) {
      this.customerService.addUserAddress(body).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Added new address successfully!',
            detail: 'You have just added a new address method successfully.',
          });
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
