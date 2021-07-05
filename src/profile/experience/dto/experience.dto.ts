import { IsNotEmpty } from 'class-validator';

export class ExperienceDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly company: string;

  readonly location: string;

  @IsNotEmpty()
  readonly from: Date;

  readonly to: Date;

  readonly current: boolean;

  readonly description: string;
}
