import { ApiResponse } from 'apisauce';
import { WorkshopsResult } from './api.types';
import { Api } from './api';
import { getGeneralApiProblem } from './api-problem-map';
import { CategoriesResult, WorkshopResult } from '.';

const API_PAGE_SIZE = 9;

type WorkshopsRequest = {
  _page?: number;
  _limit?: number;
  category?: string;
  _sort?: string;
  _order?: string;
};

export class WorkshopApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async getWorkshops({
    _page = 1,
    _limit = API_PAGE_SIZE,
    category,
    _sort = 'date',
    _order = 'asc',
  }: WorkshopsRequest): Promise<WorkshopsResult> {
    try {
      console.log(this.api);
      
      const response: ApiResponse<any> = await this.api.apisauce.get('workshops', {
        _page,
        _limit,
        category,
        _sort,
        _order
      });
      console.log(response);
      
      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }

      const workshops = response.data;

      /**
       * Parse Link header for pagination parameters
       * */
      let pagination;
      if (!!response.headers?.link) {
        const HeaderLinks = response.headers?.link.split(', ').map((linkString) => linkString.split('; '));
        pagination = Object.fromEntries(
          HeaderLinks.map(([link, postion]) => {
            const query = new URLSearchParams(link.split('?')[1].slice(0, -1));
            return [
              postion.split('"')[1],
              {
                _page: parseInt(query.get('_page') || '1'),
                _sort: query.get('_sort'),
                _order: query.get('_order'),
              },
            ];
          })
        );
      }

      return { kind: 'ok', workshops, pagination };
    } catch (e: any) {
      console.log(e.message);
      return { kind: 'bad-data' };
    }
  }

  async getCategories(): Promise<CategoriesResult> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get('categories');

      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }

      const categories = response.data;

      return { kind: 'ok', categories };
    } catch (e: any) {
      console.log(e.message);
      return { kind: 'bad-data' };
    }
  }

  async getOne(id: number): Promise<WorkshopResult> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(`workshops/${id}`);

      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }

      const workshop = response.data;

      return { kind: 'ok', workshop };
    } catch (e: any) {
      console.log(e.message);
      return { kind: 'bad-data' };
    }
  }
}
