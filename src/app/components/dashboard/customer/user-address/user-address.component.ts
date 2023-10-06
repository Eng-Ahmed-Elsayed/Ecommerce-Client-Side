import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country } from 'src/app/shared/models/country';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.scss'],
})
export class UserAddressComponent implements OnInit {
  userAddressForm!: FormGroup;
  products!: Product[];
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
    private productService: ProductService
  ) {}

  ngOnInit(): void {
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

    this.productService.getProductsSmall().then((products) => {
      this.products = products.slice(0, 3);
    });
  }

  onCountryChange(event: any) {
    this.selectedCountry = event.value.name;
  }

  onStateChange(event: any) {
    this.selectedState = event.value.name;
  }
}
