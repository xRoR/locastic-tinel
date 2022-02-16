import { ApiResponse } from "apisauce"
import { UsersResult } from "."
import { Api } from "./api"
import { getGeneralApiProblem } from "./api-problem-map"

export class UsersApi {
    private api: Api

    constructor(api: Api) {
        this.api = api
    }

    async getUsers(): Promise<UsersResult> {
        try {
    
          const response: ApiResponse<any> = await this.api.apisauce.get(
            'users'
          )
    
          if (!response.ok) {
            const problem = getGeneralApiProblem(response)
            if (problem) return problem
          }
    
          const users = response.data
          
          return { kind: "ok", users };
        } catch (e: any) {
          console.log(e.message)
          return { kind: "bad-data" }
        }
      }
}