import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from 'axios';

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

  async get<TResult>(url: string, options?: RequestOptions | AxiosRequestConfig): Promise<TResult> {
    return this.request<TResult>('GET', url, undefined, options);
  }

  async post<TResult>(
    url: string,
    body?: unknown,
    options?: RequestOptions | AxiosRequestConfig,
  ): Promise<TResult> {
    return this.request<TResult>('POST', url, body, options);
  }

  async put<TResult>(
    url: string,
    body?: unknown,
    options?: RequestOptions | AxiosRequestConfig,
  ): Promise<TResult> {
    return this.request<TResult>('PUT', url, body, options);
  }

  async patch<TResult>(
    url: string,
    body?: unknown,
    options?: RequestOptions | AxiosRequestConfig,
  ): Promise<TResult> {
    return this.request<TResult>('PATCH', url, body, options);
  }

  async delete<TResult>(
    url: string,
    body?: unknown,
    options?: RequestOptions | AxiosRequestConfig,
  ): Promise<TResult> {
    return this.request<TResult>('DELETE', url, body, options);
  }

  private async request<TResult>(
    method: Method,
    url: string,
    body?: unknown,
    options?: RequestOptions | AxiosRequestConfig,
  ): Promise<TResult> {
    const config = this.buildRequestConfig(method, url, body, options);
    try {
      const obs$ = this.http.request<TResult>(config);
      const res: AxiosResponse<TResult> = await firstValueFrom(obs$);
      return res.data as TResult;
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
    method: Method,
    url: string,
    body?: unknown,
    options?: RequestOptions | AxiosRequestConfig,
  ): AxiosRequestConfig {
    const isRequestOptions = (opt: any): opt is RequestOptions => !!opt && 'query' in opt;

    if (isRequestOptions(options)) {
      return {
        method,
        url,
        headers: this.buildHeaders(options?.headers),
        params: this.sanitizeQuery(options?.query),
        data: body,
        responseType: 'json',
      };
    }

    const axiosConfig = (options as AxiosRequestConfig) || {};
    return {
      method,
      url,
      data: body,
      responseType: 'json',
      headers: this.buildHeaders(axiosConfig.headers as HttpHeaders | undefined),
      params: axiosConfig.params,
      ...axiosConfig,
    };
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
}
