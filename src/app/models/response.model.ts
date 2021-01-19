import { Item } from './item.model';

export interface Response {
    total_count: number;
    incomplete_results: boolean;
    items: Item[];
}
