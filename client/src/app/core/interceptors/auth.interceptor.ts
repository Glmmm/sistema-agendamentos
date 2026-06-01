import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const token = getToken('token');

  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(clonedRequest);
  }

  return next(req);
};

function getToken(name: string): string | null {
  return localStorage.getItem('token');
}
