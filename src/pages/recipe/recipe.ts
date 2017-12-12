import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Recipe } from '../../models/recipe';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { RecipeService } from '../../services/recipe-list';
import { ShoppingListService } from '../../services/shopping-list';

@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage {
  recipe: Recipe;
  index: number;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private recipeService: RecipeService,
              private toastCtrl: ToastController,
              private shoppingListService: ShoppingListService) {
  }

  ionViewWillLoad() {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

  onAddIngredients() {
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'Edit', recipe: this.recipe, index: this.index});
  }

  onDeleteRecipe() {
    this.recipeService.removeRecipe(this.index);
    this.toastCtrl.create({
      message: `${this.recipe.title} has been deleted`,
      duration: 1500
    }).present();
    this.navCtrl.popToRoot();
  }

}
