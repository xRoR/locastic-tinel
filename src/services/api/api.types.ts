import { User } from "../../models/user/user";
import { Workshop } from "../../models/workshop/workshop";
import { GeneralApiProblem } from "./api-problem-map"


export type WorkshopsResult = { kind: "ok"; workshops: Workshop[], pagination: any } | GeneralApiProblem;
export type CategoriesResult = { kind: "ok"; categories: string[] } | GeneralApiProblem;

export type OrderResult = {kind: "ok"} | GeneralApiProblem;

export type WorkshopResult = { kind: "ok"; workshop: Workshop } | GeneralApiProblem;
export type UsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem;