import { IRequestCounter } from "../models/RequestCounter";
export class RequestCounterDto {
    userId: string;
    counts: {
        GET: number;
        POST: number;
        PUT: number;
        DELETE: number;
    }
    constructor(requestCounter: IRequestCounter)
    {
        this.userId = requestCounter.userId;
        this.counts = requestCounter.counts;
    }
}