import { ApisauceInstance, create } from "apisauce"
import { BASE_URL } from "../../config"
import { WorkshopApi } from "./workshop-api"

export interface ApiConfig {
    url: string
    timeout: number
}

export class Api {
    apisauce!: ApisauceInstance
    config: ApiConfig

    /**
     * @param config The configuration to use.
     */
    constructor(config: ApiConfig = { url: BASE_URL, timeout: 3000 }) {
        this.config = config
    }

    setup() {
        this.apisauce = create({
            baseURL: this.config.url,
            timeout: this.config.timeout,
            headers: {
                Accept: "application/json",
            },
        })
    }

    setAuthToken = (token: string) => {
        this.apisauce.setHeader('Authorization', `Bearer ${token}`);
    }

    get workshops () {
        return new WorkshopApi(this);
    }
}
