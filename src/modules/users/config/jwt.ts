import { JwtService } from '@nestjs/jwt';

async function assignJwtToken(
  uid: string,
  jwtService: JwtService,
): Promise<string> {
  return jwtService.sign({
    uid: uid,
  });
}

export default assignJwtToken;
