export interface Address {
  cep: string
  logradouro: string
  complemento: string
  unidade: string
  bairro: string
  uf: string
  estado: string
  localidade: string
}

export interface UserAddress {
  cep: string
  street: string
  complement: string
  number: string
  neighborhood: string
  state: string
  city: string
  location: string
}


export interface Contact {
  cpf: string
  id: number
  name: string
  phone: string
  user: {
    id: number
    email: string
  }
  address: UserAddress
}