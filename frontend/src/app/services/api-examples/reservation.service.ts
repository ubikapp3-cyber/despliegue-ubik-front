import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

/**
 * Reservation Service Example
 * 
 * This service demonstrates how to integrate with the backend Reservation API.
 * Based on the FRONTEND_INTEGRATION_GUIDE.md specifications.
 */

export type ReservationStatus = 'PENDING' | 'CONFIRMED' | 'CHECKED_IN' | 'CHECKED_OUT' | 'CANCELLED';

export interface CreateReservationRequest {
  roomId: number;
  userId: number;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  specialRequests?: string;
}

export interface ReservationResponse {
  id: number;
  roomId: number;
  userId: number;
  checkInDate: string;
  checkOutDate: string;
  status: ReservationStatus;
  totalPrice: number;
  specialRequests: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/reservations`;

  /**
   * Get all reservations
   * Requires authentication
   * @returns Observable with array of reservations
   */
  getAllReservations(): Observable<ReservationResponse[]> {
    return this.http.get<ReservationResponse[]>(this.apiUrl);
  }

  /**
   * Get reservation by ID
   * Requires authentication
   * @param id Reservation ID
   * @returns Observable with reservation data
   */
  getReservationById(id: number): Observable<ReservationResponse> {
    return this.http.get<ReservationResponse>(`${this.apiUrl}/${id}`);
  }

  /**
   * Get reservations by user ID
   * Requires authentication
   * @param userId User ID
   * @returns Observable with array of reservations
   */
  getReservationsByUser(userId: number): Observable<ReservationResponse[]> {
    return this.http.get<ReservationResponse[]>(`${this.apiUrl}/user/${userId}`);
  }

  /**
   * Get reservations by room ID
   * Requires authentication
   * @param roomId Room ID
   * @returns Observable with array of reservations
   */
  getReservationsByRoom(roomId: number): Observable<ReservationResponse[]> {
    return this.http.get<ReservationResponse[]>(`${this.apiUrl}/room/${roomId}`);
  }

  /**
   * Get active reservations by room ID
   * Requires authentication
   * @param roomId Room ID
   * @returns Observable with array of active reservations
   */
  getActiveReservationsByRoom(roomId: number): Observable<ReservationResponse[]> {
    return this.http.get<ReservationResponse[]>(`${this.apiUrl}/room/${roomId}/active`);
  }

  /**
   * Get reservations by status
   * Requires authentication
   * @param status Reservation status
   * @returns Observable with array of reservations
   */
  getReservationsByStatus(status: ReservationStatus): Observable<ReservationResponse[]> {
    return this.http.get<ReservationResponse[]>(`${this.apiUrl}/status/${status}`);
  }

  /**
   * Check room availability for given dates
   * Requires authentication
   * @param roomId Room ID
   * @param checkIn Check-in date (ISO 8601 format)
   * @param checkOut Check-out date (ISO 8601 format)
   * @returns Observable with boolean indicating availability
   */
  checkRoomAvailability(
    roomId: number,
    checkIn: Date | string,
    checkOut: Date | string
  ): Observable<boolean> {
    const checkInStr = checkIn instanceof Date ? checkIn.toISOString() : checkIn;
    const checkOutStr = checkOut instanceof Date ? checkOut.toISOString() : checkOut;
    
    const params = new HttpParams()
      .set('checkIn', checkInStr)
      .set('checkOut', checkOutStr);
    
    return this.http.get<boolean>(
      `${this.apiUrl}/room/${roomId}/available`,
      { params }
    );
  }

  /**
   * Create a new reservation
   * Requires authentication
   * @param reservation Reservation data
   * @returns Observable with created reservation
   */
  createReservation(reservation: CreateReservationRequest): Observable<ReservationResponse> {
    return this.http.post<ReservationResponse>(this.apiUrl, reservation);
  }

  /**
   * Update an existing reservation
   * Requires authentication
   * @param id Reservation ID
   * @param reservation Updated reservation data
   * @returns Observable with updated reservation
   */
  updateReservation(id: number, reservation: CreateReservationRequest): Observable<ReservationResponse> {
    return this.http.put<ReservationResponse>(`${this.apiUrl}/${id}`, reservation);
  }

  /**
   * Confirm a reservation
   * Requires authentication
   * @param id Reservation ID
   * @returns Observable with updated reservation
   */
  confirmReservation(id: number): Observable<ReservationResponse> {
    return this.http.patch<ReservationResponse>(`${this.apiUrl}/${id}/confirm`, {});
  }

  /**
   * Cancel a reservation
   * Requires authentication
   * @param id Reservation ID
   * @returns Observable with updated reservation
   */
  cancelReservation(id: number): Observable<ReservationResponse> {
    return this.http.patch<ReservationResponse>(`${this.apiUrl}/${id}/cancel`, {});
  }

  /**
   * Check-in a reservation
   * Requires authentication
   * @param id Reservation ID
   * @returns Observable with updated reservation
   */
  checkIn(id: number): Observable<ReservationResponse> {
    return this.http.patch<ReservationResponse>(`${this.apiUrl}/${id}/checkin`, {});
  }

  /**
   * Check-out a reservation
   * Requires authentication
   * @param id Reservation ID
   * @returns Observable with updated reservation
   */
  checkOut(id: number): Observable<ReservationResponse> {
    return this.http.patch<ReservationResponse>(`${this.apiUrl}/${id}/checkout`, {});
  }

  /**
   * Delete a reservation
   * Requires authentication
   * Note: Only cancelled reservations can be deleted
   * @param id Reservation ID
   * @returns Observable with void
   */
  deleteReservation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
