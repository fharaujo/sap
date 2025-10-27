import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export type HttpHeaders = Record<string, string>;
export type QueryParams = Record<string, string | number | boolean | null | undefined>;

interface RequestOptions {
  readonly headers?: HttpHeaders;
  readonly query?: QueryParams;
}

@Injectable()
export class HttpClientService {
  constructor(
    private readonly config: ConfigService,
    private readonly http: HttpService,
  ) {}

  async get<T>(url: string, options?: RequestOptions): Promise<T> {
    return this.request<T>('GET', url, undefined, options);
  }

  async post<T, B = unknown>(url: string, body?: B, options?: RequestOptions): Promise<T> {
    return this.request<T>('POST', url, body, options);
  }

  async put<T, B = unknown>(url: string, body?: B, options?: RequestOptions): Promise<T> {
    return this.request<T>('PUT', url, body, options);
  }

  async patch<T, B = unknown>(url: string, body?: B, options?: RequestOptions): Promise<T> {
    return this.request<T>('PATCH', url, body, options);
  }

  async delete<T, B = unknown>(url: string, body?: B, options?: RequestOptions): Promise<T> {
    return this.request<T>('DELETE', url, body, options);
  }

  private async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    url: string,
    body?: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    const config = this.buildRequestConfig(method, url, body, options);
    try {
      const obs$ = this.http.request<T>(config);
      const res: AxiosResponse<T> = await firstValueFrom(obs$);
      return res.data as T;
    } catch (e: any) {
      this.handleError(e);
    }
  }

  private buildHeaders(extra?: HttpHeaders): HttpHeaders {
    const apiKey = this.config.get<string>('X_API_KEY') || this.config.get<string>('API_KEY');
    return {
      'Content-Type': 'application/json',
      ...(apiKey ? { 'X-API-KEY': apiKey } : {}),
      ...(extra || {}),
    };
  }

  private buildRequestConfig(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    url: string,
    body?: unknown,
    options?: RequestOptions,
  ): AxiosRequestConfig {
    return {
      method,
      url,
      headers: this.buildHeaders(options?.headers),
      params: this.sanitizeQuery(options?.query),
      data: body,
      responseType: 'json',
    } as AxiosRequestConfig;
  }

  private sanitizeQuery(
    query?: QueryParams,
  ): Record<string, string | number | boolean> | undefined {
    if (!query) return undefined;
    const sanitized: Record<string, string | number | boolean> = {};
    for (const [key, value] of Object.entries(query)) {
      if (value !== null && value !== undefined) {
        sanitized[key] = value as string | number | boolean;
      }
    }
    return Object.keys(sanitized).length ? sanitized : undefined;
  }

  private handleError(error: unknown): never {
    const err = error as AxiosError;
    const status: HttpStatus = (err.response?.status as HttpStatus) ?? HttpStatus.BAD_GATEWAY;
    const data = err.response?.data as any;
    let message: string = 'HTTP request failed';
    if (typeof data === 'string' && data.trim()) {
      message = data;
    } else if (data && typeof data === 'object') {
      message = (data.message as string) || JSON.stringify(data);
    } else if (err.message) {
      message = err.message;
    }
    throw new HttpException(message, status);
  }

  // Url é passada diretamente ao HttpService, query via params
  // Método preservado apenas para compatibilidade se necessário futuramente
  private buildUrl(url: string): string {
    return url;
  }
}
