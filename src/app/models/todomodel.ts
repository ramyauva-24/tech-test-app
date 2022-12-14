export const defaultEditItem: Item = {
    id: null,
    label: '',
    description: '',
    category: '',
    done: false
  };
  
  export interface Item {
    id: Number,
    label: string,
    description: string;
    category: string;
    done: boolean;
  }
  