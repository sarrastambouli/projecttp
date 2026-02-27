import { Component, OnInit } from '@angular/core';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/services/suggestion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrls: ['./list-suggestion.component.css']
})
export class ListSuggestionComponent implements OnInit {
  searchTerm: string = '';
  favorites: Suggestion[] = [];
  showFavorites: boolean = false;
  showRefused: boolean = false;
  suggestions: Suggestion[] = [];

  constructor(
    private suggestionService: SuggestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSuggestions();
  }

  // 5. Récupérer la liste depuis le backend
loadSuggestions(): void {
  this.suggestionService.getSuggestionsList().subscribe({
    next: (data: any) => {
      this.suggestions = data; // c'est directement un tableau, pas data.suggestions
    },
    error: (error) => {
      console.error('Erreur:', error);
    }
  });
}

likeSuggestion(suggestion: Suggestion): void {
  const newLikes = suggestion.nbLikes + 1;
  suggestion.nbLikes = newLikes; // mise à jour visuelle immédiate
  this.suggestionService.updateLikes(suggestion.id, newLikes).subscribe({
    next: (data: any) => {
      console.log('LIKE REÇU:', data);
    },
    error: (error) => {
      console.error('ERREUR LIKE:', error);
      suggestion.nbLikes = newLikes - 1; // rollback
    }
  });
}

  navigateToAddForm(): void {
    this.router.navigate(['/suggestions/add']);
  }



  // 9. Supprimer une suggestion
  deleteSuggestion(suggestion: Suggestion): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer "${suggestion.title}" ?`)) {
      this.suggestionService.deleteSuggestion(suggestion.id).subscribe({
        next: () => {
          alert('✅ Suggestion supprimée avec succès !');
          this.loadSuggestions(); // Recharger la liste
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          alert('❌ Erreur lors de la suppression.');
        }
      });
    }
  }

  addToFavorites(suggestion: Suggestion): void {
    if (!this.favorites.find(fav => fav.id === suggestion.id)) {
      this.favorites.push(suggestion);
      alert(`"${suggestion.title}" a été ajouté aux favoris !`);
    } else {
      alert(`Cette suggestion est déjà dans vos favoris.`);
    }
  }

  removeFromFavorites(suggestion: Suggestion): void {
    this.favorites = this.favorites.filter(fav => fav.id !== suggestion.id);
  }

  toggleFavorites(): void {
    this.showFavorites = !this.showFavorites;
  }

  toggleRefused(): void {
    this.showRefused = !this.showRefused;
  }

  get filteredSuggestions(): Suggestion[] {
    if (!this.searchTerm) {
      return this.suggestions;
    }
    
    const searchLower = this.searchTerm.toLowerCase();
    return this.suggestions.filter(suggestion =>
      suggestion.title.toLowerCase().includes(searchLower) ||
      suggestion.category.toLowerCase().includes(searchLower)
    );
  }

  get refusedSuggestions(): Suggestion[] {
    return this.suggestions.filter(s => s.status === 'refusee');
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
        return status.toUpperCase();
    }
  }
}