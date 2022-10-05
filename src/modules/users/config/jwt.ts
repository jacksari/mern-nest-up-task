import { JwtService } from '@nestjs/jwt';

async function assignJwtToken(
  email: string,
  jwtService: JwtService,
): Promise<string> {
  return jwtService.sign({
    email: email,
  });
}

export default assignJwtToken;
