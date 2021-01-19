import { RepositoryItem } from './repository-item.model';

export interface Repository {
    total_count: number;
    incomplete_results: boolean;
    items: RepositoryItem[];
}