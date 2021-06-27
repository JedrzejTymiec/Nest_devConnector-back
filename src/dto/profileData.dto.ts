import { IsNotEmpty } from 'class-validator';

export class ProfileDataDto {
  readonly company: string;

  readonly website: string;

  readonly location: string;

  readonly bio: string;

  @IsNotEmpty()
  readonly status: string;

  readonly githubusername: string;

  @IsNotEmpty()
  readonly skills: [string];

  readonly youtube: string;

  readonly twitter: string;

  readonly facebook: string;

  readonly linkedin: string;

  readonly instagram: string;
}
