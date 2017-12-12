import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, NavParams, ToastController } from 'ionic-angular';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { Alert } from 'ionic-angular/components/alert/alert';
import { RecipeService } from '../../services/recipe-list';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { Recipe } from '../../models/recipe';

@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {
  mode: string = 'New';
  selectOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;
  recipe: Recipe;
  index: number;

  constructor(private navParams: NavParams,
              private actionSheetController: ActionSheetController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private recipeService: RecipeService,
              private navCtrl: NavController) {}

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    if (this.mode === 'Edit') {
      this.recipe = this.navParams.get('recipe');
      this.index = this.navParams.get('index');
    }
    this.initializeForm();
  }

  onSubmit() {
    const recipe = this.recipeForm.value;
    let ingredients = [];
    if (recipe.ingredients.length > 0) {
      ingredients = recipe.ingredients.map((ingredient) => ({name: ingredient, amount: 1}));
    }
    this.mode === 'Edit' ?
      this.recipeService.updateRecipe(this.index, recipe.title, recipe.description, recipe.difficulty, ingredients) :
      this.recipeService.addRecipe(recipe.title, recipe.description, recipe.difficulty, ingredients);
      
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }

  onManageIngredients() {
    const actionSheet = this.actionSheetController.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredients',
          handler: () => {
            this.createNewIngredientAlert().present();
          }
        },
        {
          text: 'Remove all Ingredients',
          role: 'destructive',
          handler: () => { 
            const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len = fArray.length;
            if (len > 0) {
              for (let i = len - 1; i >= 0; i--) {
                fArray.removeAt(i);
              }
              const toast = this.toastCtrl.create({
                message: 'All ingredients removed',
                duration: 1500,
                position: 'buttom'
              });
              toast.present();
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  private initializeForm() {
    let title = null;
    let description = null;
    let difficutly = 'Medium';
    let ingredients = [];

    if (this.mode === 'Edit') {
      title = this.recipe.title;
      description = this.recipe.description;
      difficutly = this.recipe.difficulty;
      for (let ingredient of this.recipe.ingredients) {
        ingredients.push(new FormControl(ingredient.name, Validators.required))
      }
    }

    this.recipeForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'difficulty': new FormControl(difficutly, Validators.required),
      'ingredients': new FormArray(ingredients)
    });
  }

  private createNewIngredientAlert(): Alert {
    return this.alertCtrl.create({
      title: 'Add Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: (data) => {
            if (data.name.trim() === '' || data.name === null) {
              const toast = this.toastCtrl.create({
                message: 'Please enter a valid ingredient',
                duration: 1500,
                position: 'buttom'
              });
              toast.present();
              return;
            }
            (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required));
            const toast = this.toastCtrl.create({
              message: `${data.name} was added`,
              duration: 1500,
              position: 'buttom'
            });
            toast.present();
          }
        }
      ]
    });
  }

}
