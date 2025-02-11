import RequestCounter, { IRequestCounter } from '../models/RequestCounter';
import { RequestCounterDto } from '../dtos/RequestCounterDto';
import {GetRequestCounterDto} from '../dtos/GetRequestCounterDto';

export const getRequestCounter = async (request: GetRequestCounterDto): Promise<RequestCounterDto | null> => {
    const response: IRequestCounter | null = await RequestCounter.findOne({userId: request.userId}); 
    return response ? new RequestCounterDto(response): null; 
}