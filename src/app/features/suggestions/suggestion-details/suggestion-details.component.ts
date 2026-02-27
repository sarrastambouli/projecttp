import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/services/suggestion.service';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrls: ['./suggestion-details.component.css']
})
export class SuggestionDetailsComponent implements OnInit {
  suggestionId!: number;
  suggestion!: Suggestion;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private suggestionService: SuggestionService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.suggestionId = +params['id'];
      this.loadSuggestion();
    });
  }

  // 7. Récupérer les détails d'une suggestion
loadSuggestion(): void {
  this.suggestionService.getSuggestionById(this.suggestionId).subscribe({
    next: (data: any) => {
      this.suggestion = data.suggestion; 
    },
    error: (error) => {
      console.error('Erreur:', error);
    }
  });
}

  backToList(): void {
    this.router.navigate(['/suggestions']);
  }

  // 13. Naviguer vers le formulaire de modification
  editSuggestion(): void {
    this.router.navigate(['/suggestions/edit', this.suggestionId]);
  }

likeSuggestion(): void {
  const newLikes = this.suggestion.nbLikes + 1;
  this.suggestion.nbLikes = newLikes; // mise à jour visuelle immédiate
  this.suggestionService.updateLikes(this.suggestion.id, newLikes).subscribe({
    next: (data: any) => {
      console.log('LIKE REÇU:', data);
    },
    error: (error) => {
      console.error('ERREUR LIKE:', error);
      this.suggestion.nbLikes = newLikes - 1; // rollback
    }
  });
}

  getStatusClass(status: string): string {
    switch (status) {
      case 'acceptee':
        return 'status-accepted';
      case 'refusee':
        return 'status-refused';
      case 'en_attente':
        return 'status-pending';
      default:
        return '';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'acceptee':
        return 'ACCEPTÉE';
      case 'refusee':
        return 'REFUSÉE';
      case 'en_attente':
        return 'EN ATTENTE';
      default:
        if (!status) return 'Unknown'; // or return '' or whatever default makes sense
  return status.toUpperCase();
    }
  }
}