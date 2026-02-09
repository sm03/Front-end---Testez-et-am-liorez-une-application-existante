import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentRequestDTO, StudentResponseDTO } from '../models/student.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = '/api/students';

  constructor(private http: HttpClient) {}

  // Ajouter étudiant
  createStudent(student: StudentRequestDTO): Observable<StudentResponseDTO> {
    return this.http.post<StudentResponseDTO>(this.apiUrl, student);
  }

  // Liste étudiants
  getStudents(): Observable<StudentResponseDTO[]> {
    return this.http.get<StudentResponseDTO[]>(this.apiUrl);
  }

  // Détail étudiant
  getStudent(id: number): Observable<StudentResponseDTO> {
    return this.http.get<StudentResponseDTO>(`${this.apiUrl}/${id}`);
  }

  // Modifier étudiant
  updateStudent(id: number, student: StudentRequestDTO): Observable<StudentResponseDTO> {
    return this.http.put<StudentResponseDTO>(`${this.apiUrl}/${id}`, student);
  }

  // Supprimer étudiant
  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
