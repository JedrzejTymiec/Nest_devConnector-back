import { IsNotEmpty } from 'class-validator';

export class EducationDto {
  @IsNotEmpty()
  readonly school: string;

  @IsNotEmpty()
  readonly degree: string;

  @IsNotEmpty()
  readonly fieldofstudy: string;

  @IsNotEmpty()
  readonly from: Date;

  readonly to: Date;

  readonly current: boolean;

  readonly description: string;
}
