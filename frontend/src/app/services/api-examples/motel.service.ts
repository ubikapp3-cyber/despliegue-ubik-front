import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

/**
 * Motel Service Example
 * 
 * This service demonstrates how to integrate with the backend Motel Management API.
 * Based on the FRONTEND_INTEGRATION_GUIDE.md specifications.
 */

export interface CreateMotelRequest {
  name: string;
  address: string;
  phoneNumber?: string;
  description?: string;
  city: string;
  propertyId?: number;
  imageUrls?: string[];
}

export interface MotelResponse {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  description: string;
  city: string;
  propertyId: number;
  dateCreated: string;
  imageUrls: string[];
}

@Injectable({
  providedIn: 'root'
})
export class MotelService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/motels`;

  /**
   * Get all motels
   * @returns Observable with array of motels
   */
  getAllMotels(): Observable<MotelResponse[]> {
    return this.http.get<MotelResponse[]>(this.apiUrl);
  }

  /**
   * Get motel by ID
   * @param id Motel ID
   * @returns Observable with motel data
   */
  getMotelById(id: number): Observable<MotelResponse> {
    return this.http.get<MotelResponse>(`${this.apiUrl}/${id}`);
  }

  /**
   * Get motels by city
   * @param city City name
   * @returns Observable with array of motels
   */
  getMotelsByCity(city: string): Observable<MotelResponse[]> {
    return this.http.get<MotelResponse[]>(`${this.apiUrl}/city/${city}`);
  }

  /**
   * Create a new motel
   * Requires authentication
   * @param motel Motel data
   * @returns Observable with created motel
   */
  createMotel(motel: CreateMotelRequest): Observable<MotelResponse> {
    return this.http.post<MotelResponse>(this.apiUrl, motel);
  }

  /**
   * Update an existing motel
   * Requires authentication
   * @param id Motel ID
   * @param motel Updated motel data
   * @returns Observable with updated motel
   */
  updateMotel(id: number, motel: CreateMotelRequest): Observable<MotelResponse> {
    return this.http.put<MotelResponse>(`${this.apiUrl}/${id}`, motel);
  }

  /**
   * Delete a motel
   * Requires authentication
   * @param id Motel ID
   * @returns Observable with void
   */
  deleteMotel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
