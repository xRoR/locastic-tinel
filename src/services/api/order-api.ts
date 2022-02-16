import { ApiResponse } from 'apisauce';
import { OrderResult } from '.';
import { Workshop } from '../../models/workshop/workshop';
import { Api } from './api';
import { getGeneralApiProblem } from './api-problem-map';

export class OrderApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async sendOrder(form: any, products: Workshop[]): Promise<OrderResult> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post('orders', {
        products,
        form,
      });

      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }

      // const order = response.data;

      return { kind: 'ok' };
    } catch (e: any) {
      console.log(e.message);
      return { kind: 'bad-data' };
    }
  }
}
