export interface PlantInput{
    name: string;
    price: number;
    amount?: number;
    swap: boolean;
    donate: boolean;
    description?: string;
    tags: string[];
    images: string[];
}
