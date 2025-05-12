// you can put your types here
export type Country = {
   id: number,
   name: string,
   code: number,
   emoji: string,
   continent?: string
}

export type formInput = {
   name: string,
   code: number,
   emoji: string,
   continent?: number
}

export type Continent = {
   id: number,
   name: string
}