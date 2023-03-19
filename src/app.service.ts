import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAPIStats(): {
    status: string
    message: string
  } {
    return {
      status: "UP",
      message: "Server is up and running"
    }
  }
}
