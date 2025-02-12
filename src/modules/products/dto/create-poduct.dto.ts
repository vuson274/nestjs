import { IsNumber, IsString, Length } from 'class-validator';
export class ProductDto {
  @IsString({ message: 'Ten phai la ký tư' })
  @Length(1, 255, { message: 'Ten bat buoc phai nhap' })
  name: string;
  @IsString()
  description: string;
  @IsNumber()
  price: number;
}
