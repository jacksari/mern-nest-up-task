import { JwtService } from '@nestjs/jwt';
declare function assignJwtToken(uid: string, jwtService: JwtService): Promise<string>;
export default assignJwtToken;
