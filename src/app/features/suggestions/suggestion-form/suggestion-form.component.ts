import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuggestionService } from '../../../core/services/suggestion.service';
import { Suggestion } from '../../../models/suggestion';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css']
})
export class SuggestionFormComponent implements OnInit {
  suggestionForm!: FormGroup;
  isEditMode: boolean = false;
  suggestionId!: number;
  
  categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre'
  ];

  constructor(
    private fb: FormBuilder,
    private suggestionService: SuggestionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    
    // 13. Vérifier si on est en mode édition
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.suggestionId = +params['id'];
        this.loadSuggestion();
      }
    });
  }

  initForm(): void {
    const today = new Date().toISOString().split('T')[0];
    
    this.suggestionForm = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(/^[A-Z][a-zA-Z\s]*$/)
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(30)
      ]],
      category: ['', Validators.required],
      date: [{ value: today, disabled: true }],
      status: [{ value: 'en attente', disabled: true }]
    });
  }

  // 13. Charger la suggestion à modifier
  loadSuggestion(): void {
    this.suggestionService.getSuggestionById(this.suggestionId).subscribe({
      next: (data) => {
        const dateStr = new Date(data.date).toISOString().split('T')[0];
        
        this.suggestionForm.patchValue({
          title: data.title,
          description: data.description,
          category: data.category,
          date: dateStr,
          status: data.status
        });
      },
      error: (error) => {
        console.error('Erreur:', error);
        alert('Erreur lors du chargement.');
        this.router.navigate(['/suggestions']);
      }
    });
  }

  get title() {
    return this.suggestionForm.get('title');
  }

  get description() {
    return this.suggestionForm.get('description');
  }

  get category() {
    return this.suggestionForm.get('category');
  }

  // 11 et 14. Soumettre le formulaire (ADD ou UPDATE)
  onSubmit(): void {
    if (this.suggestionForm.valid) {
      const formValue = this.suggestionForm.getRawValue();
      
      const suggestionData: any = {
        title: formValue.title,
        description: formValue.description,
        category: formValue.category,
        date: new Date(formValue.date),
        status: this.isEditMode ? formValue.status : 'en_attente'
      };

      if (this.isEditMode) {
        // 14. Mode UPDATE
        this.suggestionService.updateSuggestion(this.suggestionId, suggestionData).subscribe({
          next: () => {
            alert('✅ Suggestion modifiée avec succès !');
            this.router.navigate(['/suggestions']);
          },
          error: (error) => {
            console.error('Erreur:', error);
            alert('❌ Erreur lors de la modification.');
          }
        });
      } else {
        // 11. Mode ADD
        suggestionData.nbLikes = 0;
        
        this.suggestionService.addSuggestion(suggestionData).subscribe({
          next: () => {
            alert('✅ Suggestion ajoutée avec succès !');
            this.router.navigate(['/suggestions']);
          },
          error: (error) => {
            console.error('Erreur:', error);
            alert('❌ Erreur lors de l\'ajout.');
          }
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/suggestions']);
  }
}