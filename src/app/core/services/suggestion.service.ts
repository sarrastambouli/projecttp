import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Suggestion } from '../../models/suggestion';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {
  // URL du backend
  private suggestionUrl = 'http://localhost:3000/suggestions';

  constructor(private http: HttpClient) { }

getSuggestionsList(): Observable<any> {
  return this.http.get<any>(this.suggestionUrl);
}

getSuggestionById(id: number): Observable<any> {
  return this.http.get<any>(`${this.suggestionUrl}/${id}`);
}

updateLikes(id: number, nbLikes: number): Observable<any> {
  return this.http.post<any>(`${this.suggestionUrl}/${id}/like`, {});
}

deleteSuggestion(id: number): Observable<any> {
  return this.http.delete<any>(`${this.suggestionUrl}/${id}`);
}

addSuggestion(suggestion: Suggestion): Observable<any> {
  return this.http.post<any>(this.suggestionUrl, suggestion);
}

updateSuggestion(id: number, suggestion: Suggestion): Observable<any> {
  return this.http.put<any>(`${this.suggestionUrl}/${id}`, suggestion);
}
}