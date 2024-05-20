export interface Task {
    id: string;
    name: string;
    description?: string;
    order?: number;

    // frontend
    isNew?: boolean;
}
