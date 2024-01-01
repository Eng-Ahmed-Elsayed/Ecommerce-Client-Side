import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductDto } from 'src/app/shared/models/shared/productDto';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { PhotoService } from 'src/app/shared/services/photo.service';
import { CustomerService } from '../../../shared/services/customer.service';
import { CartItemDto } from 'src/app/shared/models/customer/cartItemDto';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ReviewDto } from 'src/app/shared/models/shared/reviewDto';
import {
  ConfirmationService,
  MenuItem,
  MessageService,
  SelectItem,
} from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss'],
})
export class ProductOverviewComponent implements OnInit {
  orderForm!: FormGroup;
  product!: ProductDto;
  images: any[] | undefined;
  // images2: any[] | undefined;
  responsiveOptions = this.layoutService.getGalleriaResponsiveOptions();
  // From the api
  colorStateOptions: any[] = [
    { productColor: 'dark-gray', value: 'darkGray' },
    { productColor: 'green', value: 'green' },
    { productColor: 'blue', value: 'blue' },
  ];
  sizeStateOptions: any[] = [
    { label: 'XS', value: 'xs' },
    { label: 'S', value: 's' },
    { label: 'L', value: 'l' },
    { label: 'XL', value: 'xl' },
  ];
  // Review Form
  upsertReview!: string; // Add or update flag
  reviewForm!: FormGroup;
  isAuthenticated: boolean = false;
  userReview: ReviewDto | any = null;
  // Edit or delete review if userReview
  reviewMenuItems: MenuItem[] = [];
  // reviews databview
  sortOptions!: SelectItem[];
  sortOrder!: number;
  sortField!: string;
  sortKey!: string;

  constructor(
    private layoutService: LayoutService,
    private photoService: PhotoService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private authService: AuthService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.orderForm = this.fb.group({
      // color: [],
      // size: [],
      quantity: ['1'],
    });
    this.activatedRoute.data.subscribe({
      next: (data: any) => {
        this.product = data.product;
        this.images = this.photoService.getGalleriaProductImage(
          this.product.productImages!,
          this.product.name!
        );
      },
    });
    // Review
    this.authService.authChange.subscribe((value) => {
      // If user(logged in)
      if (value) {
        this.isAuthenticated = value;
        // Get user review if he has
        this.userReview = this.product.reviews?.filter(
          (r) => r.userId == this.authService.getUserId()
        )?.[0];

        // Add a form (we have to add the form here so we can reset it if the user has a review and want to update it).
        this.reviewForm = this.fb.group(
          {
            title: [
              ,
              {
                validators: [
                  Validators.minLength(5),
                  Validators.maxLength(80),
                  Validators.required,
                ],
              },
            ],

            rating: [
              ,
              {
                validators: [
                  Validators.min(1),
                  Validators.max(5),
                  Validators.required,
                ],
              },
            ],
            comment: [
              '',
              {
                validators: [
                  Validators.minLength(5),
                  Validators.maxLength(400),
                  Validators.required,
                ],
              },
            ],
          },
          { updateOn: 'blur' }
        );
        // and does not have a review for this product.
        if (this.userReview == null) {
          this.upsertReview = 'add'; // upsert flag
        }
      }
    });
    // Review menu items
    this.reviewMenuItems = [
      {
        icon: 'pi pi-pencil',
        command: () => {
          this.upsertReview = 'update'; // upsert flag
          // reset the form
          this.reviewForm.reset({
            title: this.userReview.title,
            rating: this.userReview.rating,
            comment: this.userReview.comment,
          });
        },
      },

      {
        icon: 'pi pi-trash',
        command: () => {
          // If the user has review we also check this in the ui.
          if (this.isAuthenticated && this.userReview != null) {
            // Confirmation
            this.confirmationService.confirm({
              message: 'Do you want to delete this review.',
              icon: 'pi pi-exclamation-triangle',
              accept: () => {
                // Delete API call
                this.deleteReview();
              },
            });
          }
        },
      },
    ];
    // Sort Options
    this.sortOptions = [
      { label: 'Rating High to Low', value: '!rating' },
      { label: 'Rating Low to High', value: 'rating' },
      { label: 'Recent Reviews', value: '!createdAt' },
      { label: 'Old Reviews', value: 'createdAt' },
    ];
  }

  // Add item to shopping cart
  addCartItem() {
    let cartItem: CartItemDto = this.orderForm.getRawValue();
    cartItem.productId = this.product.id;
    this.customerService.addCartItem(cartItem);
  }

  // Delete Review
  deleteReview() {
    this.customerService.deleteReview(this.userReview?.id!).subscribe({
      // If success.
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Delete review successfully!',
          detail: `Your review (${this.userReview?.title}) has been removed successfully!`,
        });
        this.product.reviews = this.product.reviews?.filter(
          (r) => r.id != this.userReview?.id
        );
        // Reset userReview, the form and upsertFlag.
        this.userReview = null;
        this.upsertReview = 'add';
        this.reviewForm.reset();
      },
      // If error
      error: (err: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Delete discount failed!',
          detail: "Cann't delete this discount please try again later.",
        });
        console.log(err);
      },
    });
  }

  // Add Review
  addReview() {
    let body: ReviewDto = this.reviewForm.getRawValue();
    body.productId = this.product.id!;
    this.customerService.AddReview(body).subscribe({
      next: (res: ReviewDto) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Add review successfully!',
          detail: `Add review: ${res.title}`,
        });
        if (res.user != undefined) {
          res.user.userName = this.authService.getUsername();
        }
        // Set userReview with the new review and push it into product reviews arr then reset the form.
        this.userReview = { ...res };
        // Copy the arr then push if u push the dataview will not change untill u press sort or page number.
        let tempArr = this.product.reviews?.slice();
        tempArr?.push(this.userReview);
        this.product.reviews = tempArr;
        this.reviewForm.reset();
      },
      error: (err: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Add review failed!',
          detail: 'Can not add a reivew, please again try later.',
        });
        console.log(err);
      },
    });
  }

  // Update review
  updateReview() {
    let body: ReviewDto = this.reviewForm.getRawValue();
    body.productId = this.product.id!;
    body.id = this.userReview.id;
    this.customerService.updateReview(body).subscribe({
      next: (res: ReviewDto) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Update review successfully!',
          detail: `Update review: ${res.title}`,
        });
        if (res.user != undefined) {
          res.user.userName = this.authService.getUsername();
        }
        // Set userReview and update it in the product reviews arr then reset the form.
        this.userReview = res;
        this.product.reviews?.forEach((r) => {
          if (r.id == this.userReview.id) {
            r.comment = this.userReview.comment;
            r.title = this.userReview.title;
            r.rating = this.userReview.rating;
          }
        });
        this.reviewForm.reset();
        this.upsertReview = 'add';
      },
      error: (err: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Update review failed!',
          detail: 'Can not update the reivew, please again try later.',
        });
        console.log(err);
      },
    });
  }

  // Data view sorting
  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
}
