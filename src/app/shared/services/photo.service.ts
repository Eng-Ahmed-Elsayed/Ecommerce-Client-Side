import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductImage } from '../models/shared/productImageDto';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  getData() {
    return [
      {
        itemImageSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg',
        thumbnailImageSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria1s.jpg',
        alt: 'Description for Image 1',
        title: 'Title 1',
      },
      {
        itemImageSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg',
        thumbnailImageSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria2s.jpg',
        alt: 'Description for Image 2',
        title: 'Title 2',
      },
      {
        itemImageSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria3.jpg',
        thumbnailImageSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria3s.jpg',
        alt: 'Description for Image 3',
        title: 'Title 3',
      },
      {
        itemImageSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria4.jpg',
        thumbnailImageSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria4s.jpg',
        alt: 'Description for Image 4',
        title: 'Title 4',
      },
      {
        itemImageSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria5.jpg',
        thumbnailImageSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria5s.jpg',
        alt: 'Description for Image 5',
        title: 'Title 5',
      },
      {
        itemImageSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria6.jpg',
        thumbnailImageSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria6s.jpg',
        alt: 'Description for Image 6',
        title: 'Title 6',
      },
      {
        itemImageSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria7.jpg',
        thumbnailImageSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria7s.jpg',
        alt: 'Description for Image 7',
        title: 'Title 7',
      },
      {
        itemImageSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria8.jpg',
        thumbnailImageSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria8s.jpg',
        alt: 'Description for Image 8',
        title: 'Title 8',
      },
      {
        itemImageSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria9.jpg',
        thumbnailImageSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria9s.jpg',
        alt: 'Description for Image 9',
        title: 'Title 9',
      },
      {
        itemImageSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria10.jpg',
        thumbnailImageSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria10s.jpg',
        alt: 'Description for Image 10',
        title: 'Title 10',
      },
      {
        itemImageSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria11.jpg',
        thumbnailImageSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria11s.jpg',
        alt: 'Description for Image 11',
        title: 'Title 11',
      },
      {
        itemImageSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria12.jpg',
        thumbnailImageSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria12s.jpg',
        alt: 'Description for Image 12',
        title: 'Title 12',
      },
      {
        itemImageSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria13.jpg',
        thumbnailImageSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria13s.jpg',
        alt: 'Description for Image 13',
        title: 'Title 13',
      },
      {
        itemImageSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria14.jpg',
        thumbnailImageSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria14s.jpg',
        alt: 'Description for Image 14',
        title: 'Title 14',
      },
      {
        itemImageSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria15.jpg',
        thumbnailImageSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria15s.jpg',
        alt: 'Description for Image 15',
        title: 'Title 15',
      },
    ];
  }

  getImages() {
    return Promise.resolve(this.getData());
  }

  public getGalleriaProductImage(
    productImage: ProductImage[],
    productName: string
  ) {
    return productImage.map((img) => ({
      itemImageSrc: createImgPath(img.imgPath!),
      thumbnailImageSrc: createImgPath(img.imgPath!),
      alt: productName,
      title: productName,
    }));
  }
}

// Create a full image path
export function createImgPath(imgPath: string | undefined | null): string {
  return imgPath !== undefined && imgPath !== null
    ? `${environment.baseServerUrl}${imgPath}`
    : '';
}

// Generic upload Files function
export function uploadFiles(files: any, multi: boolean, url: string): any {
  if (files.length === 0) {
    return;
  }
  const formData = new FormData();
  if (multi) {
    url += 'upload-files';
    let filesToUpload: File[] = files;
    Array.from(filesToUpload).map((file, index) => {
      return formData.append('file' + index, file, file.name);
    });
  } else {
    url += 'upload-file';
    let fileToUpload = <File>files[0];
    formData.append('file', fileToUpload, fileToUpload.name);
  }
  return { url, formData };
}
