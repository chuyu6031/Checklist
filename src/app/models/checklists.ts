export class Checklist {
    id: string;
    title: string;
    remainItems: number;
    hideCompletion: boolean;
    items: ChecklistItem[]; //an array of elements that have a type of ChecklistItem
}

export class ChecklistItem {
    id: string;
    title: string;
    checked: boolean;
    priority_num: any;
}

