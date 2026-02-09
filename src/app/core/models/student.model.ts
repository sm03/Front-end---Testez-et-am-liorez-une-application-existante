export interface StudentRequestDTO {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

export interface StudentResponseDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}
