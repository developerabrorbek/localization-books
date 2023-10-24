import { Catch, ExceptionFilter } from "@nestjs/common";
import { Observable, throwError } from 'rxjs'

@Catch()
export class RcpExceptionFilter implements ExceptionFilter {
  catch(exception: any): Observable<any> {
      return throwError(() => exception.response)
  }
}